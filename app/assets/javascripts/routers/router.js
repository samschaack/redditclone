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
    
  },
  
  _swapView: function(newView) {
    if (this.currentView) {
      this.currentView.remove();
    }
    
    $(".main").html(newView.render().$el);
    this.currentView = newView;
  }
});