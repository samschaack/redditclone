window.Sync = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Sync.tabs = [];
    Sync.setSession();
  },
  
  setSession: function() {
    $.ajax({
      type: 'GET',
      url: '/api/users/get_session',
      success: function(data) {
        Sync.Models.session = {};
        Sync.Models.session.username = data.username;
        Sync.Models.session.points = data.points;
        Sync.Models.session.email = data.email;
        new Sync.Routers.Router();
        Backbone.history.start();
      },
      error: function(data) {
        Sync.Models.session = null;
        new Sync.Routers.Router();
        Backbone.history.start();
      }
    });
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
    
    $('.nav-tab-section').html('<style>.triangle-up { position: absolute; width: 0; height: 0; border-radius: 2px; border-left: ' + tabSize + 'px solid transparent; border-right: ' + tabSize + 'px solid transparent; border-bottom: ' + tabSize + 'px solid ' + color + '; }</style>');
    $('.nav-tab-section').append('<style>.triangle-down { position: absolute; width: 0; height: 0; border-radius: 2px; top: .3px; border-left: ' + tabSize + 'px solid transparent; border-right: ' + tabSize + 'px solid transparent; border-top: ' + tabSize + 'px solid ' + color + '; }</style>');
    
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
          var post = options.post;
          
          if (data.status === "1") {
            if (upordown === 1) {
              $("span.upvote[data-id='" + id + "']").addClass('upvoted');
              post.set('upvotes', post.attributes.upvotes + 1);
            } else {
              $("span.downvote[data-id='" + id + "']").addClass('downvoted');
              post.set('downvotes', post.attributes.downvotes + 1);
            }
          } else if (data.status === "2") {
            if (upordown === 1) {
              $("span.upvote[data-id='" + id + "']").addClass('upvoted');
              $("span.downvote[data-id='" + id + "']").removeClass('downvoted');
              post.set('upvotes', post.attributes.upvotes + 1);
              post.set('downvotes', post.attributes.downvotes - 1);
            } else {
              $("span.upvote[data-id='" + id + "']").removeClass('upvoted');
              $("span.downvote[data-id='" + id + "']").addClass('downvoted');              
              post.set('upvotes', post.attributes.upvotes - 1);
              post.set('downvotes', post.attributes.downvotes + 1);
            }
          } else if (data.status === "3") {
            if (upordown === 1) {
              $("span.upvote[data-id='" + id + "']").removeClass('upvoted');              
              post.set('upvotes', post.attributes.upvotes - 1);
            } else {
              $("span.downvote[data-id='" + id + "']").removeClass('downvoted');              
              post.set('downvotes', post.attributes.downvotes - 1);
            }
          }
          $("div.post-score[data-id='" + id + "']").text(post.attributes.upvotes - post.attributes.downvotes);
        } else {
          var comment = options.comment;
          
          if (data.status === "1") {
            if (upordown === 1) {
              $("span.upvote[data-id='" + id + "']").addClass('upvoted');
              comment.set("upvotes", comment.attributes.upvotes + 1);
            } else {
              $("span.downvote[data-id='" + id + "']").addClass('downvoted');
              comment.set("downvotes", comment.attributes.downvotes + 1);
            }
          } else if (data.status === "2") {
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
  $(Sync.initialize());
  
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
  }
  
  $('#make-post').on('click', makePost);
  
  $('.sign-up-button').on('click', gotoSignUp);
  
  $('.sign-in-button').on('click', gotoSignIn);
  
  $('.sign-out-button').on('click', signOut);
  
  $('body').on('mousedown', '.sizeable-image', startDrag)
  
  $('body').on('mousemove', dragImage)
  
  $('body').on('mouseup', endDrag)
  
  function startDrag(event) {
    Sync.dragging = true;
    
    Sync.initImgX = event.pageX;
    Sync.initImgY = event.pageY;
    
    Sync.curImg = $(event.target).data('id');
    
    Sync.initWidth = $("img.sizeable-image[data-id='" + Sync.curImg + "']").width();
    Sync.initHeight = $("img.sizeable-image[data-id='" + Sync.curImg + "']").height();
    
    Sync.ratio = Sync.initWidth / Sync.initHeight;
    
    var position = $("img.sizeable-image[data-id='" + Sync.curImg + "']").position();
    Sync.initLeft = position.left;
    Sync.initTop = position.top;
  }
  
  function dragImage(event) {
    if (Sync.dragging) {
      $("img.sizeable-image[data-id='" + Sync.curImg + "']").addClass("no-max-height");
      var curX = event.pageX;
      var curY = event.pageY;
      
      var diffX = curX - Sync.initImgX;
      var diffY = curY - Sync.initImgY;
      
      var finWX;
      var finHY;
      
      var scaleFactor = 1;
      var initSize = Math.pow(Math.pow(Sync.initWidth, 2) + Math.pow(Sync.initHeight, 2), .5)
      
      if (diffX < 0 && diffY < 0) {
        scaleFactor = 1 - Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) / (Math.pow(initSize, .9))
      } else if (diffX > 0 && diffY > 0) {
        scaleFactor = 1 + Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) / (Math.pow(initSize, .9))
      }
      
      finWX = Sync.initWidth * scaleFactor
      finHY = Sync.initHeight * scaleFactor
      
      if (finHY < 75 && Sync.ratio > 1) {
        finHY = 75;
        finWX = Sync.ratio * 75;
      } else if (finWX < 75 && Sync.ratio < 1) {
        finWX = 75;
        finHY = 75 / Sync.ratio;
      } else if (finWX < 75 || finHY < 75 && Sync.ratio === 1) {
        finWX = 75;
        finHY = 75;
      }
      
      $("img.sizeable-image[data-id='" + Sync.curImg + "']").css('width', finWX.toString() + "px");
      $("img.sizeable-image[data-id='" + Sync.curImg + "']").css('height', finHY.toString() + "px");
    }
  }
  
  function endDrag() {
    Sync.dragging = false;
  }
  
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
      } else if (command.match(/\s+/)) {
          Sync.setAlert("not a valid command");
          $('#sub-navigate').val('');
      } else {
        Backbone.history.navigate("#/" + $("#sub-navigate").val());
      }
      $('.messages').text('');
      $('#sub-navigate').blur();
    }
  });
});
