Sync.Collections.PostComments = Backbone.Collection.extend({
  model: Sync.Models.Comment,
  
  url: function() {
    return this.post.url() + "/comments";
  },
  
  initialize: function(models, options) {
    this.post = options.post
  },
  
  comparator: function(model) {
    return -model.get('upvotes') + model.get('downvotes');
  }
})