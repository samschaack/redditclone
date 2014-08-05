Sync.Models.Post = Backbone.Model.extend({
  urlRoot: "/api/posts",
  
  comments: function() {
    this._comments = this._comments || new Sync.Collections.PostComments([], { post: this });
    return this._comments;
  }
});
