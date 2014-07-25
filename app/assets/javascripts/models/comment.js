Sync.Models.Comment = Backbone.Model.extend({
  urlRoot: "/api/comments",
  
  comments: function() {
    this._comments = this._comments || new Sync.Collections.CommentComments([], { comment: this });
    return this._comments;
  }
});