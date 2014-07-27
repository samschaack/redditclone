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
  
  function signOut(event) {
    event.preventDefault();
    
    $.ajax({
      url: '/api/session',
      type: 'DELETE',
      data: formData,
      success: function (thingy) {
        Backbone.history.navigate("#", { trigger: true });
      },
      error: function () {
        alert("error");
      }
    });
  }
  
  function navToLastPage() {
    // Backbone.history.navigate(window.Sync.lastPage);
  }
  
  $('#make-post').on('click', makePost);
  
  $('.sign-up-button').on('click', gotoSignUp);
  
  $('.sign-in-button').on('click', gotoSignIn);
  
  $('.sign-out-button').on('click', signOut);
  
  // $('#last-page-button').on('click', navToLastPage);
});