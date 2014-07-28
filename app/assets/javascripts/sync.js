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