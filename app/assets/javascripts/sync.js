window.Sync = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Sync.Routers.Router();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  function makePost() {
    Backbone.history.navigate("#/p", { trigger: true });
  };
  
  function gotoSignUp(event) {
    event.preventDefault();
    
    Backbone.history.navigate('#/u/new');
  }
  
  function gotoSignIn(event) {
    event.preventDefault();
    
    Backbone.history.navigate('#/u');
  }
  
  function navToLastPage() {
    // Backbone.history.navigate(window.Sync.lastPage);
  }
  
  $('#make-post').on('click', makePost);
  
  $('.sign-up-button').on('click', gotoSignUp);
  
  $('.sign-in-button').on('click', gotoSignIn);
  
  // $('#last-page-button').on('click', navToLastPage);
});