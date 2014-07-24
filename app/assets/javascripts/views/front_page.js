Sync.Views.FrontPage = Backbone.CompositeView.extend({
  template: JST["front_page"],
  
  initialize: function(options) {
    this.collection = options.collection;
    this.listenTo(this.collection, "sync", this.render);
  },
  
  events: {
    "click div.post": "postShow"
  },
  
  postShow: function(event) {
    var post_id = $(event.target).data('id');
    
    if (post_id !== undefined) {
      Backbone.history.navigate("#/p/" + post_id);
    }
  },
  
  render: function() {
    var renderedContent = this.template({ posts: this.collection });
    
    this.$el.html(renderedContent);
    //this.attachSubviews();
    return this;
  }
});