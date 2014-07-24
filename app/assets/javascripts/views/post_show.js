Sync.Views.PostShow = Backbone.CompositeView.extend({
  template: JST["posts/show"],
  
  initialize: function(options) {
    this.model = options.model;
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function() {
    var renderedContent = this.template({ post: this.model });
    
    this.$el.html(renderedContent);
    //this.attachSubviews();
    return this;
  }
});