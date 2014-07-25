Sync.Models.Post = Backbone.Model.extend({
  urlRoot: "/api/posts",
  
  comments: function() {
    this._comments = this._comments || new Sync.Collections.PostComments([], { post: this });
    return this._comments;
  },
  
  // parse: function (payload) {
  //   if (payload.comments) {
  //     this.comments().set(payload.comments, { parse: true });
  //     delete payload.comments;
  //   }
  //
  //   return payload;
  // }
});