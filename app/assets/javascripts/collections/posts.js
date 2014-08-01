Sync.Collections.Posts = Backbone.Collection.extend({
  model: Sync.Models.Post,
  
  url: "/api/posts",
  
  initialize: function(models) {
    
  },
  
  getOrFetch: function(id) {
    var posts = this;
    
    var post;
    if (post = this.get(id)) {
      post.fetch();
    } else {
      post = new Sync.Models.Post({ id: id });
      post.fetch({
        success: function() { posts.add(post); }
      })
    }
    
    return post;
  }// ,
//
//   comparator: function(model) {
//     return -model.get('upvotes') + model.get('downvotes');
//   }
});
  
Sync.Collections.posts = new Sync.Collections.Posts();