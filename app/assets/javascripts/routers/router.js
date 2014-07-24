Sync.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "frontPage",
    "s/:sub_name": "subPage"
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
  
  _swapView: function(newView) {
    if (this.currentView) {
      this.currentView.remove();
    }
    
    $(".main").html(newView.render().$el);
    this.currentView = newView;
  }
});