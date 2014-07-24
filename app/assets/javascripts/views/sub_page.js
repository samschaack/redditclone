Sync.Views.SubPage = Backbone.CompositeView.extend({
  template: JST["sub_page"],
  
  initialize: function(options) {
    this.collection = options.collection;
    this.sub = options.sub;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.sub, "sync", this.render);
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
  
  gotoPage: function(event) {
    event.preventDefault();
    Backbone.history.navigate("#/" + $("#sub-navigate").val());
  },
  
  render: function() {
    var renderedContent = this.template({ posts: this.collection, sub: this.sub });
    
    this.$el.html(renderedContent);
    //this.attachSubviews();
    return this;
  }
});