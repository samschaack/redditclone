Sync.Views.NewPostComment = Backbone.View.extend({
  template: JST["comments/new_post_comment"],
  
  initialize: function(options) {
  },
  
  render: function() {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);
    
    return this;
  }
})
