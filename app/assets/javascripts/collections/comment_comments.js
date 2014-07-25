Sync.Collections.CommentComments = Backbone.Collection.extend({
  model: Sync.Models.Comment,
  
  url: function() {
    return this.comment.url() + "/comments";
  },
  
  initialize: function(models, options) {
    this.comment = options.comment
  }
})