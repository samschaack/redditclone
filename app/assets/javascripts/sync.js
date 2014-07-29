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
    var tabSize = 18;
    var initLeft = 50; //17
    var color = "#BBB";
    
    $('.nav-tab-section').html('<style>.triangle-up { position: absolute; width: 0; height: 0; border-left: ' + tabSize + 'px solid transparent; border-right: ' + tabSize + 'px solid transparent; border-bottom: ' + tabSize + 'px solid ' + color + '; }</style>');
    $('.nav-tab-section').append('<style>.triangle-down { position: absolute; width: 0; height: 0; top: .3px; border-left: ' + tabSize + 'px solid transparent; border-right: ' + tabSize + 'px solid transparent; border-top: ' + tabSize + 'px solid ' + color + '; }</style>');
    
    _(Sync.tabs).each(function(url, index) {
      initLeft = 50 + (index * 4);
      // $('.nav-tab-section').append('<div class="nav-tab" data-url="' + url + '" style="position:absolute; left: ' + initLeft + '%; top: 6.65rem;"><div class="triangle-down" style="left: ' + (tabSize * 3 - 1) + 'px" data-url="' + url + '"></div><div class="triangle-down" style="left: ' + (tabSize + 1) + 'px" data-url="' + url + '"></div><div class="triangle-up" style="left: ' + tabSize * 2 + 'px;" data-url="' + url + '"><span class="invis-text"></span></div></div>');
      $('.nav-tab-section').append('<div class="nav-tab" data-url="' + url + '" style="position:absolute; left: ' + initLeft + '%; top: 100%;"><div class="triangle-down" style="left: ' + (tabSize * 3 - 1) + 'px" data-url="' + url + '"></div><div class="triangle-down" style="left: ' + (tabSize + 1) + 'px" data-url="' + url + '"></div><div class="triangle-up" style="left: ' + tabSize * 2 + 'px;" data-url="' + url + '"><span class="invis-text"></span></div></div>');
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
    Sync.setMessage('++tab');
  },
  
  renderTabs: function() {
    var numTabs = Sync.tabs.length;
    var tabSize = 15;
    var initLeft = 50;
    var color = "#BBB";
    
    $('.nav-tab-section').html('<style>.triangle-up { position: absolute; width: 0; height: 0; border-left: ' + tabSize + 'px solid transparent; border-right: ' + tabSize + 'px solid transparent; border-bottom: ' + tabSize + 'px solid ' + color + '; }</style>');
    $('.nav-tab-section').append('<style>.triangle-down { position: absolute; width: 0; height: 0; top: .3px; border-left: ' + tabSize + 'px solid transparent; border-right: ' + tabSize + 'px solid transparent; border-top: ' + tabSize + 'px solid ' + color + '; }</style>');
    
    _(Sync.tabs).each(function(url, index) {
      initLeft = 50 + (index * 3);
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
  
  vote: function(id, type, upordown, options) {
    $.ajax({
      type: 'POST',
      url: '/api/votes',
      data: { vote:
        {
          upordown: upordown,
          voteable_id: id,
          voteable_type: type
        }
      },
      success: function(data) {
        if (type === "Post") {
          //post vote
          var post = Sync.Collections.posts.findWhere({ id: id });

          if (!post) {
            post = options.post;
          }
        
          if (data.status === "1") {
            //set vote
            if (upordown === 1) {
              post.set('upvotes', post.attributes.upvotes + 1);
              Sync.Collections.votes.getOrFetch(data.id)
            } else {
              post.set('downvotes', post.attributes.downvotes + 1);
              Sync.Collections.votes.getOrFetch(data.id)
            }
          } else if (data.status === "2") {
            //reverse vote
            if (upordown === 1) {
              post.set('upvotes', post.attributes.upvotes + 1);
              post.set('downvotes', post.attributes.downvotes - 1);
              Sync.Collections.votes.getOrFetch(data.id)
            } else {
              post.set('upvotes', post.attributes.upvotes - 1);
              post.set('downvotes', post.attributes.downvotes + 1);
              Sync.Collections.votes.getOrFetch(data.id)
            }
          
            Sync.Collections.votes.remove(Sync.Collections.votes.findWhere({
              voteable_type: type, 
              voteable_id: id, 
              upordown: upordown * -1
            }))
          } else if (data.status === "3") {
            //nullify vote
            if (upordown === 1) {
              post.set('upvotes', post.attributes.upvotes - 1);
            } else {
              post.set('downvotes', post.attributes.downvotes - 1);
            }
          
            Sync.Collections.votes.remove(Sync.Collections.votes.findWhere({
              voteable_type: type, 
              voteable_id: id, 
              upordown: upordown
            }))
          }
          post.save();
        } else {
          var comment = options.comment;
          
          //comment vote
          if (data.status === "1") {
            //set vote
            if (upordown === 1) {
              $("span.upvote[data-id='" + id + "']").addClass('upvoted');
              comment.set("upvotes", comment.attributes.upvotes + 1);
            } else {
              $("span.downvote[data-id='" + id + "']").addClass('downvoted');
              comment.set("downvotes", comment.attributes.downvotes + 1);
            }
          } else if (data.status === "2") {
            //reverse vote
            if (upordown === 1) {
              $("span.upvote[data-id='" + id + "']").addClass('upvoted');
              $("span.downvote[data-id='" + id + "']").removeClass('downvoted');
              comment.set("upvotes", comment.attributes.upvotes + 1);
              comment.set("downvotes", comment.attributes.downvotes - 1);
            } else {
              $("span.upvote[data-id='" + id + "']").removeClass('upvoted');
              $("span.downvote[data-id='" + id + "']").addClass('downvoted');
              comment.set("upvotes", comment.attributes.upvotes - 1);
              comment.set("downvotes", comment.attributes.downvotes + 1);
            }
          } else if (data.status === "3") {
            //nullify vote
            if (upordown === 1) {
              $("span.upvote[data-id='" + id + "']").removeClass('upvoted');
              comment.set("upvotes", comment.attributes.upvotes - 1);
            } else {
              $("span.downvote[data-id='" + id + "']").removeClass('downvoted');
              comment.set("downvotes", comment.attributes.downvotes - 1);
            }
          }
          $("span.comment-score[data-id='" + id + "']").text(comment.attributes.upvotes - comment.attributes.downvotes);
        }
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
    
    Sync.tabs.splice(0, Sync.tabs.length);
    Sync.renderTabs();
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
      } else if (command == "q/a") {
        Sync.tabs.splice(0, Sync.tabs.length);
        Sync.renderTabs();
        $('#sub-navigate').val('');
      } else if (command.slice(0, 2) == "q/") {
        var tabNum = command.slice(2, 3);
        Sync.tabs.splice(tabNum - 1, 1);
        Sync.renderTabs();
        $('#sub-navigate').val('');
      } else if ([1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(parseInt(command)) !== -1) {
        if (Sync.tabs.length >= parseInt(command)) {
          Backbone.history.navigate("#/" + Sync.tabs[parseInt(command) - 1], { trigger: true });
        } else {
          Backbone.history.navigate(Backbone.history.fragment, { trigger: true });
        }
      } else {
        Backbone.history.navigate("#/" + $("#sub-navigate").val());
      }
    }
  });
  //Sync.Models.user = 
  
  // $('#last-page-button').on('click', navToLastPage);
});