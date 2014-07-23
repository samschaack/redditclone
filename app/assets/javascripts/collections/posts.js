Sync.Collections.Posts = Backbone.Collection.extend({
  model: Sync.Models.Post,
  
  url: "/api/posts",
  
  getOrFetch: function(id) {
    var posts = this;
    
    var post;
    if (post = this.get(id)) {
      post.fetch();
    } else {
      post = new Sync.Models.Post({ id: id });
      board.fetch({
        success: function() { boards.add(board); }
      })
    }
    
    return post;
  }
});

Sync.Collections.posts = new Sync.Collections.Posts();