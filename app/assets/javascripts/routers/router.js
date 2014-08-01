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
    "u/:username": "userPage",
    "c": "commandsPage",
    "asteroids": "playAsteroids"
  },
  
  playAsteroids: function() {
    var asteroidsView = new Sync.Views.Asteroids();
    debugger
    this._swapView(asteroidsView);
  },
  
  commandsPage: function() {
    var commandsView = new Sync.Views.CommandsPage();
    
    this._swapView(commandsView);
  },
  
  newUser: function() {
    var newUserView = new Sync.Views.SignUp();
    
    $("#sub-navigate").attr("disabled", "disabled"); 
    this._swapView(newUserView);
    $('input#sign-up-username').focus();
  },
  
  newSession: function() {
    var newSessionView = new Sync.Views.SignIn();
    
    $("#sub-navigate").attr("disabled", "disabled"); 
    this._swapView(newSessionView);
    $('input.sign-in-username').focus();
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
    Sync.page = 1;
    
    Sync.Collections.posts = new Sync.Collections.Posts;
    Sync.Collections.posts.url = 'api/posts';
    Sync.Collections.posts.fetch({
      success: function(posts) {
        posts.each(function(post, index) {
          post.set('index', index + 1);
        })
      }
    });
    
    if (Sync.Models.session) {
      Sync.Collections.votes = new Sync.Collections.Votes;
      Sync.Collections.votes.url = "api/votes/front_page"
      Sync.Collections.votes.fetch();
    }
    
    var frontPageView = new Sync.Views.FrontPage({
      collection: Sync.Collections.posts
    });
    
    Sync.lastPage = "#";
    
    $("#sub-navigate").removeAttr("disabled"); 
    this._swapView(frontPageView);
  },
  
  subPage: function(subName) {
    Sync.page = 1;
    
    var sub = new Sync.Models.Sub;
    sub.url = 'api/subs/' + subName;
    sub.fetch();
    
    Sync.Collections.subPosts = new Sync.Collections.Posts;
    Sync.Collections.subPosts.url = 'api/s/' + subName;
    Sync.Collections.subPosts.fetch();
    
    if (Sync.Models.session) {
      if (!Sync.Collections.votes) {
        Sync.Collections.votes = new Sync.Collections.Votes;
        Sync.Collections.votes.url = "api/votes/sub_page"
        Sync.Collections.votes.fetch();
      }
    }
    
    var subPageView = new Sync.Views.SubPage({
      collection: Sync.Collections.subPosts,
      sub: sub
    });
    
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
    var post;
    if (index) {
      if (Sync.lastPage === "#") {
        post = Sync.Collections.posts.findWhere({ index: parseInt(index) });
        post = Sync.Collections.posts.getOrFetch(post.attributes.id);
      } else {
        post = Sync.Collections.subPosts.findWhere({ index: parseInt(index) });
        post = Sync.Collections.subPosts.getOrFetch(post.attributes.id);
      }
    } else {
      if (Backbone.history.fragment === "") {
        post = Sync.Collections.posts.getOrFetch(id);
      } else {
        post = Sync.Collections.subPosts.getOrFetch(id);
      }
    }
    
    
    this.postClickShow(post.attributes.id);
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
        } else if (e.which == 97) {
          document.getElementById("sub-navigate").focus();
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
          if (Sync.tabs[e.which - 49] === "") { $('.messages').text("front page"); }
          else { $('.messages').text(Sync.tabs[e.which - 49]); }
          document.getElementById("sub-navigate").focus();
        }
      });
      
      this.lastPage = Backbone.history.fragment;
    }
    
    $('#last-page-button').on('click', this.navToLastPage);
  },
  
  accountPage: function() {
    var view = this;
    
    if (Sync.Models.session) { 
      $.ajax({
        type: 'GET',
        url: '/api/users/show_current',
        success: function(data) {
          var user = new Sync.Models.User(data)
          var accountPageView = new Sync.Views.AccountPage({ user: user });
          
          $("#sub-navigate").attr("disabled", "disabled"); 
          view._swapView(accountPageView);
        }
      });
    } else {
      Backbone.history.navigate("#", { trigger: true });
      Sync.setAlert("sign in to see your account page");
    }
  },
  
  userPage: function(username) {
    var view = this;
    
    $.ajax({
      type: 'GET',
      url: '/api/users/' + username,
      success: function(data) {
        var user = new Sync.Models.User(data)
        var userShowView = new Sync.Views.UserShow({ user: user });
        
        view._swapView(userShowView);
      }
    });
  },
  
  _swapView: function(newView) {
    if (this.currentView) {
      this.currentView && this.currentView.remove();
    }
    
    $(".main").html(newView.render().$el);
    this.currentView = newView;
    
    this.setButtonEvents();
  }
});