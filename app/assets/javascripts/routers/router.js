Sync.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "frontPage",
    "s/n": "newSub",
    "s/n/:subName": "newSubWithName",
    "s/a": "subDirectory",
    "s/:subName": "subPage",
    "p": "newPost",
    "p/t": "newTextPost",
    "p/:index": "postShow",
    "p/c/:id": "postClickShow",
    "u": "newSession",
    "u/n": "newUser",
    "u/me": "accountPage",
    "u/:id": "userPage",
    "c": "commandsPage"
  },
  
  commandsPage: function() {
    var commandsView = new Sync.Views.CommandsPage();
    
    this._swapView(commandsView);
  },
  
  newUser: function() {
    var newUserView = new Sync.Views.SignUp();
    
    $("#sub-navigate").attr("disabled", "disabled"); 
    this._swapView(newUserView);
  },
  
  newSession: function() {
    var newSessionView = new Sync.Views.SignIn();
    
    $("#sub-navigate").attr("disabled", "disabled"); 
    this._swapView(newSessionView);
  },
  
  newPost: function() {
    if (Sync.Models.session) {
      var newPostView = new Sync.Views.NewPost({ user: 1 });
    
      $("#sub-navigate").attr("disabled", "disabled"); 
      this._swapView(newPostView);
    } else {
      Sync.setAlert("must be signed in to post")
    }
  },
  
  newSub: function() {
    if (Sync.Models.session) {
      var newSubView = new Sync.Views.NewSub();

      $("#sub-navigate").attr("disabled", "disabled");
      this._swapView(newSubView);
    } else {
      Sync.setAlert("must be signed in to create a sub");
      Backbone.history.navigate(Backbone.history.fragment, { trigger: true });
    }
  },
  
  subDirectory: function() {
    var subDirectoryView = new Sync.Views.SubDirectory();
    
    this._swapView(subDirectoryView);
  },
  
  newSubWithName: function(subName) {
    if (Sync.Models.session) {
      var newSubView = new Sync.Views.NewSub({ subName: subName });

      $("#sub-navigate").attr("disabled", "disabled");
      this._swapView(newSubView);
    } else {
      Sync.setAlert("must be signed in to create a sub");
      Backbone.history.navigate(Backbone.history.fragment, { trigger: true });
    }
  },
  
  newTextPost: function() {
    var newPostView = new Sync.Views.NewTextPost({ user: 1 });
    
    $("#sub-navigate").attr("disabled", "disabled"); 
    this._swapView(newPostView);
  },
  
  frontPage: function() {
    //build home page (rails handles deciding which posts to send back?)
    
    // Sync.Collections.posts.fetch();
    
    //bad?
    Sync.Collections.posts = new Sync.Collections.Posts;
    Sync.Collections.posts.url = 'api/posts';
    Sync.Collections.posts.fetch();
    
    if (Sync.Models.session) {
      Sync.Collections.votes = new Sync.Collections.Votes;
      Sync.Collections.votes.url = "api/votes/front_page"
      Sync.Collections.votes.fetch();
    }
    
    var frontPageView = new Sync.Views.FrontPage({
      collection: Sync.Collections.posts
    });
    
    // Sync.lastPage = "f";
    Sync.lastPage = "#";
    
    $("#sub-navigate").removeAttr("disabled"); 
    this._swapView(frontPageView);
  },
  
  subPage: function(subName) {
    //bad?
    var sub = new Sync.Models.Sub;
    sub.url = 'api/subs/' + subName;
    sub.fetch();
    
    Sync.Collections.posts = new Sync.Collections.Posts;
    Sync.Collections.posts.url = 'api/s/' + subName;
    Sync.Collections.posts.fetch();
    
    if (!Sync.Collections.votes) {
      Sync.Collections.votes = new Sync.Collections.Votes;
      Sync.Collections.votes.url = "api/votes/sub_page"
      Sync.Collections.votes.fetch();
    }
    
    var subPageView = new Sync.Views.SubPage({
      collection: Sync.Collections.posts,
      sub: sub
    });
    
    // Sync.lastPage = "s";
    Sync.lastPage = "#/s/" + subName;
    
    $("#sub-navigate").removeAttr("disabled"); 
    this._swapView(subPageView);
  },
  
  postClickShow: function(id) {
    var post = Sync.Collections.posts.getOrFetch(id);
    
    post = Sync.Collections.posts.getOrFetch(post.attributes.id);
    
    Sync.Collections.votes = new Sync.Collections.Votes;
    Sync.Collections.votes.fetch();
    
    var postShowView = new Sync.Views.PostShow({
      model: post
    });
    
    $("#sub-navigate").removeAttr("disabled"); 
    this._swapView(postShowView);
  },
  
  postShow: function(index) {
    if (index) {
      var post = Sync.Collections.posts.findWhere({ index: parseInt(index) });
    } else {
      var post = Sync.Collections.posts.getOrFetch(id);
    }
    
    post = Sync.Collections.posts.getOrFetch(post.attributes.id);
    
    Sync.Collections.votes = new Sync.Collections.Votes;
    Sync.Collections.votes.fetch();
    
    var postShowView = new Sync.Views.PostShow({
      model: post
    });
    
    $("#sub-navigate").removeAttr("disabled"); 
    this._swapView(postShowView);
  },
  
  navToLastPage: function() {
    Backbone.history.navigate(Sync.lastPage, { trigger: true });
  },
  
  setButtonEvents: function() {
    var router = this;
    
    $("#sub-navigate").val("");
    $("#sub-navigate").blur();
    
    if (Backbone.history.fragment !== "u/new") {
      $('html').keypress(function(e) {
        if (e.which == 96) {
          $("#sub-navigate").removeAttr("disabled"); 
        } else if (e.which == 98) {
          document.getElementById("sub-navigate").focus();
        } else if (e.which == 99) {
          document.getElementById("sub-navigate").focus();
        } else if (e.which == 102) {
          document.getElementById("sub-navigate").focus();
        } else if (e.which == 112) {
          document.getElementById("sub-navigate").focus();
        } else if (e.which == 113) {
          document.getElementById("sub-navigate").focus();
        } else if (e.which == 115) {
          document.getElementById("sub-navigate").focus();
        } else if (e.which == 116) {
          document.getElementById("sub-navigate").focus();
        } else if (e.which == 117) {
          document.getElementById("sub-navigate").focus();
        } else if (e.which > 48 && e.which < 58) {
          document.getElementById("sub-navigate").focus();
        }
      });
      
      this.lastPage = Backbone.history.fragment;
    }
    
    $('#last-page-button').on('click', this.navToLastPage);
  },
  
  accountPage: function() {
    if (Sync.Models.session) {
      var accountPageView = new Sync.Views.AccountPage();
    
      this._swapView(accountPageView);
    } else {
      Backbone.history.navigate("#", { trigger: true });
      Sync.setAlert("sign in to see your account page");
    }
  },
  
  userPage: function(id) {
    var user = Sync.Collections.users.getOrFetch(id);
    var userPageView = new Sync.Views.UserShow({ user: user });
    
    this._swapView(userPageView);
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