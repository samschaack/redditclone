Sync.Views.NewComment = Backbone.View.extend({
  template: JST["comments/new"],
  
  initialize: function(options) {
    this.commentId = options.commentId;
  },
  
  render: function() {
    var renderedContent = this.template({ commentId: this.commentId });
    
    this.$el.html(renderedContent);
    
    return this;
  }
})