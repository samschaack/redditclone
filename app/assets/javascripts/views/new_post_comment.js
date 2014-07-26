Sync.Views.NewPostComment = Backbone.View.extend({
  template: JST["comments/new_post_comment"],
  
  initialize: function(options) {
    // this.commentId = options.commentId;
  },
  
  render: function() {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);
    
    return this;
  }
})