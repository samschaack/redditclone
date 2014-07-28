window.Sync = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(user) {
    new Sync.Routers.Router();
    Backbone.history.start();
    var userInfo = user.info;
    Sync.tabs = [];
    
    if (userInfo !== "none") {
      Sync.Models.session = {};
      Sync.Models.session.username = userInfo.split(" ")[0];
      Sync.Models.session.points = userInfo.split(" ")[1];
      Sync.Models.session.email = userInfo.split(" ")[2];
    }
  },
  
  setSession: function(user) {
    var userInfo = user.info;
    
    if (userInfo !== "none") {
      Sync.Models.session = {};
      Sync.Models.session.username = userInfo.split(" ")[0];
      Sync.Models.session.points = userInfo.split(" ")[1];
      Sync.Models.session.email = userInfo.split(" ")[2];
    }
  },
  
  setAlert: function(message) {
    $('.alerts').text(message);
    
    setTimeout(function() {
      $('.alerts').text("");
    }, 3000)
  },
  
  setMessage: function(message) {
    $('.messages').text(message);
    
    setTimeout(function() {
      $('.messages').text("");
    }, 3000)
  },
  
  createTab: function(url) {
    Sync.tabs.push(url);
    var numTabs = Sync.tabs.length;
    var tabSize = 15;
    var initLeft = 17;
    var color = "#BBB";
    
    $('.nav-tab-section').html('<style>.triangle-up { position: absolute; width: 0; height: 0; border-left: ' + tabSize + 'px solid transparent; border-right: ' + tabSize + 'px solid transparent; border-bottom: ' + tabSize + 'px solid ' + color + '; }</style>');
    $('.nav-tab-section').append('<style>.triangle-down { position: absolute; width: 0; height: 0; top: .3px; border-left: ' + tabSize + 'px solid transparent; border-right: ' + tabSize + 'px solid transparent; border-top: ' + tabSize + 'px solid ' + color + '; }</style>');
    
    _(Sync.tabs).each(function(url, index) {
      initLeft = 17 + (index * 3);
      $('.nav-tab-section').append('<div class="nav-tab" data-url="' + url + '" style="position:absolute; left: ' + initLeft + '%; top: 6.65rem;"><div class="triangle-down" style="left: ' + (tabSize * 3 - 1) + 'px" data-url="' + url + '"></div><div class="triangle-down" style="left: ' + (tabSize + 1) + 'px" data-url="' + url + '"></div><div class="triangle-up" style="left: ' + tabSize * 2 + 'px;" data-url="' + url + '"><span class="invis-text"></span></div></div>');
    })
    
    $('.nav-tab').on("click", function(event) { Backbone.history.navigate("#/" + $(event.target).data('url'), { trigger: true }); })
    $('.triangle-up').on("click", function(event) { Backbone.history.navigate("#/" + $(event.target).data('url'), { trigger: true }); })
    $('.triangle-down').on("click", function(event) { Backbone.history.navigate("#/" + $(event.target).data('url'), { trigger: true }); })
    
    $('.nav-tab').mouseenter(function(event) {
      if ($(event.target).data('url') === "") {
        $('.messages').text("front page") 
      } else {
        $('.messages').text($(event.target).data('url')) 
      }
    });
    $('.nav-tab').mouseleave(function(event) { $('.messages').text('') });
  },
  
  tabCurrent: function() {
    var url = Backbone.history.fragment;
    
    if (url.slice(0, 1) === "p" && url.slice(0, 3) !== "p/c") {
      url = "p/c/" + $('.post-show').data('id');
      Sync.createTab(url);
      $('#sub-navigate').val('');
    } else {
      Sync.createTab(url);
      $('#sub-navigate').val('');
    }
  },
  
  tabUrl: function(url) {
    var path = Backbone.history.fragment;
    Sync.createTab(path);
    Backbone.history.navigate("#/" + url);
    $('#sub-navigate').val('');
  },
  
  vote: function(event, id, type, upordown) {
    event.preventDefault();
    
    $.ajax({
      type: 'POST',
      url: '/api/votes',
      data: { user:
        {
          upordown: upordown,
          voteableid: id,
          voteabletype: type
        }
      },
      success: function(data) {
        var post = Sync.Collections.posts.findWhere({ id: id });
        post.set('score', post.score + upordown);
        post.save();
      },
      error: function(data) {
        //delete upvote
        $.ajax({
          type: 'DELETE',
          url: '/api/votes/' + type + '/' + id,
          data: { user:
            {
              voteableid: id,
              voteabletype: type
            }
          },
          success: function(data) {
            post.set('score', post.score - upordown);
            post.save();
          }
        });
      }
    });
  }
};

$(document).ajaxSend(function (e, xhr, options) {
  var token = $("meta[name='csrf-token']").attr("content");
  xhr.setRequestHeader("X-CSRF-Token", token);
});

$(document).ready(function(){
  function makePost() {
    Backbone.history.navigate("#/p", { trigger: true });
  };
  
  function gotoSignUp(event) {
    event.preventDefault();
    
    Backbone.history.navigate('#/u/n');
  }
  
  function gotoSignIn(event) {
    event.preventDefault();
    
    Backbone.history.navigate('#/u');
  }
  
  function signOut(event) {
    event.preventDefault();
    Sync.Models.user.signOut();
    $('.sign-out-button').toggleClass('invisible');
    $('.profile-header').toggleClass('invisible');
    $('.sign-in-button').toggleClass('invisible');
    $('.sign-up-button').toggleClass('invisible');
    
    Sync.Models.session = null;
    
    
    Sync.setMessage("success");
  }
  
  function navToLastPage() {
    // Backbone.history.navigate(window.Sync.lastPage);
  }
  
  $('#make-post').on('click', makePost);
  
  $('.sign-up-button').on('click', gotoSignUp);
  
  $('.sign-in-button').on('click', gotoSignIn);
  
  $('.sign-out-button').on('click', signOut);
  
  $('#sub-navigate').keypress(function(e) {
    var command = $('#sub-navigate').val();
    
    if (e.which == 13) {
      e.preventDefault();
      if (command == "f") {
        Backbone.history.navigate("#", { trigger: true });
      } else if (command[0] == "t") {
        if (command.length === 1) {
          Sync.tabCurrent();
        } else {
          Sync.tabUrl(command.slice(2, command.length));
        }
      } else if (command == "b") {
        Backbone.history.navigate("#/" + Sync.tabs[Sync.tabs.length - 1], { trigger: true });
      } else if ([1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(parseInt(command)) !== -1) {
        Backbone.history.navigate("#/" + Sync.tabs[parseInt(command) - 1], { trigger: true });
      } else {
        Backbone.history.navigate("#/" + $("#sub-navigate").val());
      }
    }
  });
  //Sync.Models.user = 
  
  // $('#last-page-button').on('click', navToLastPage);
});