Sync.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "frontPage",
    "s/:sub_name": "subPage",
    "p": "newPost",
    "p/text": "newTextPost",
    "p/:id": "postShow",
    "u": "newSession",
    "u/new": "newUser",
    "u/me": "accountPage",
    "u/:id": "userPage"
  },
  
  newUser: function() {
    var newUserView = new Sync.Views.SignUp();
    
    this._swapView(newUserView);
  },
  
  newSession: function() {
    var newSessionView = new Sync.Views.SignIn();
    
    this._swapView(newSessionView);
  },
  
  newPost: function() {
    var newPostView = new Sync.Views.NewPost({ user: 1 });
    
    this._swapView(newPostView);
  },
  
  newTextPost: function() {
    var newPostView = new Sync.Views.NewTextPost({ user: 1 });
    
    this._swapView(newPostView);
  },
  
  frontPage: function() {
    //build home page (rails handles deciding which posts to send back?)
    
    Sync.Collections.posts.fetch();
    
    var frontPageView = new Sync.Views.FrontPage({
      collection: Sync.Collections.posts
    });
    
    this._swapView(frontPageView);
  },
  
  subPage: function(sub_name) {
    var sub = new Sync.Models.Sub;
    sub.url = 'api/subs/' + sub_name;
    sub.fetch();
    
    var posts = new Sync.Collections.Posts;
    posts.url = 'api/s/' + sub_name;
    posts.fetch();
    
    var subPageView = new Sync.Views.SubPage({
      collection: posts,
      sub: sub
    });
    
    this._swapView(subPageView);
  },
  
  postShow: function(id) {
    var post = Sync.Collections.posts.getOrFetch(id);
    
    var postShowView = new Sync.Views.PostShow({
      model: post
    });
    
    this._swapView(postShowView);
  },
  
  setButtonEvents: function() {
    $("#sub-navigate").val("");
    $("#sub-navigate").blur();
    
    if (Backbone.history.fragment !== "u/new") {
      $('html').keypress(function(e) {
        if (e.which == 102) {
        document.getElementById("sub-navigate").focus();
        } else if (e.which == 112) {
          document.getElementById("sub-navigate").focus();
        } else if (e.which == 115) {
          document.getElementById("sub-navigate").focus();
        } else if (e.which == 117) {
          document.getElementById("sub-navigate").focus();
        }
      });
    
      $('#sub-navigate').keypress(function(e) {
        if (e.which == 13) {
          e.preventDefault();
          if ($('#sub-navigate').val() == "f") {
            Backbone.history.navigate("#", { trigger: true });
          } else {
            Backbone.history.navigate("#/" + $("#sub-navigate").val());
          }
        }
      });
    }
  },
  
  _swapView: function(newView) {
    if (this.currentView) {
      this.currentView.remove();
    }
    
    $(".main").html(newView.render().$el);
    this.currentView = newView;
    
    this.setButtonEvents();
  }
});