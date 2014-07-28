window.Sync = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(user) {
    new Sync.Routers.Router();
    Backbone.history.start();
    var userInfo = user.info;
    
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
  
  //Sync.Models.user = 
  
  // $('#last-page-button').on('click', navToLastPage);
});