Sync.Views.CommentShow = Backbone.CompositeView.extend({
  template: JST["comments/show"],
  
  initialize: function(options) {
    this.model = options.model;
    
    this.listenTo(this.model, "sync", this.render);
    
    this.listenTo(
      this.model.comments(), "add", this.addComment
    );
    
    this.listenTo(
      this.model.comments(), "remove", this.removeComment
    );
    
    if (Sync.Models.session) {
      this.listenTo(Sync.Collections.votes, "sync add remove", this.render);
    }
    
    this.model.comments().each(this.addComment.bind(this));
    this.model.comments().fetch();
    
    $('a').click(function(event){
        event.stopImmediatePropagation();
    });
  },
  
  events: {
    "click div.comment": "removeCommentForm",
    "click button.comment-destroy": "destroyComment",
    "click button.comment-reply": "newComment",
    "click textarea": "preventBubble",
    "click button.new-comment": "createComment",
    "click button.comment-minimize": "minimizeComment",
    "click button.comment-maximize": "maximizeComment",
    "click .upvote": "upvote",
    "click .downvote": "downvote"
  },
  
  destroyComment: function(event) {
    var that = this;
    event.preventDefault();
    commentId = $(event.target).data('id');
    var comment = this.model;
    comment.destroy({
      success: function(comment) {
      }
    });
  },
  
  minimizeComment: function(event) {
    event.preventDefault();
    var commentId = $(event.target).data('id');
    var indents = $(event.target).data('indents');
    $('.sub-comments-' + commentId).slideToggle(120);
    $('.expand-minimize-section-' + commentId).html('<button class="button-link comment-maximize" data-id="' + commentId + '" data-indents="' + indents + '">[+]</button>')
    $('div.comment-content[data-id=' + commentId + ']').slideToggle(120);
    $('div.comment-vote-box[data-id=' + commentId + ']').slideToggle(120);
    $('.new-comment-' + commentId).slideToggle(120);
  },
  
  maximizeComment: function(event) {
    event.preventDefault();
    var commentId = $(event.target).data('id');
    var indents = $(event.target).data('indents');
    $('.sub-comments-' + commentId).slideToggle(120);
    $('.expand-minimize-section-' + commentId).html('<button class="button-link comment-minimize" data-id="' + commentId + '" data-indents="' + indents + '">[-]</button>')
    $('div.comment-content[data-id=' + commentId + ']').slideToggle(120);
    $('div.comment-vote-box[data-id=' + commentId + ']').slideToggle(120);
    $('.new-comment-' + commentId).slideToggle(120);
  },
  
  createComment: function(event) {
    var view = this;
    event.cancelBubble = true;
    if (event.stopPropagation) { event.stopPropagation(); }
    event.preventDefault();
    commentId = this.commentId;
    
    var params = $("textarea").serializeJSON();
    params["comment"]["user"] = Sync.Models.session.username;
    params["comment"]["commentable_id"] = this.commentId;
    params["comment"]["commentable_type"] = "Comment";
    params["comment"]["indents"] = parseInt(this.model.attributes.indents) + 1;
    params["comment"]["post_id"] = this.model.attributes.post_id;
    
    var comment = new Sync.Models.Comment(params["comment"]);
    
    comment.save({}, {
      success: function(comment) {
        $("#sub-navigate").removeAttr("disabled");
        view.addComment(comment);
        view.removeCommentFormNoEvent(commentId);
      }
    });
  },
  
  addComment: function(comment) {
    var commentShow = new Sync.Views.CommentShow({ model: comment });
    this.addSubview(".sub-comments-" + this.model.attributes.id, commentShow)
  },
  
  preventBubble: function(event) {
    event.cancelBubble = true;
    if (event.stopPropagation) { event.stopPropagation(); }
    event.preventDefault();
  },
  
  newComment: function(event) {
    event.cancelBubble = true;
    if (event.stopPropagation) { event.stopPropagation(); }
    event.preventDefault();
    
    $("#sub-navigate").attr("disabled", "disabled"); 
    
    this.commentId = $(event.target).data('id');
    var newCommentView = new Sync.Views.NewComment({ commentId: this.commentId });
    $('.new-comment-' + this.commentId).html(newCommentView.template({ commentId: this.commentId }));
  },
  
  removeCommentForm: function(event) {
    event.cancelBubble = true;
    if (event.stopPropagation) { event.stopPropagation(); }
    event.preventDefault();
    
    $("#sub-navigate").removeAttr("disabled"); 
    
    var comment_id = $(event.target).data('id');
    var button = "<button class='button-link comment-reply' data-id=" + this.commentId + " data-indents=" + this.model.attributes.indents + ">reply</button>"
    $('.new-comment-' + this.model.id).html(button)
  },
  
  removeCommentFormNoEvent: function(commentId, indents) {
    var button = "<button class='button-link comment-reply' data-id=" + commentId + " data-indents=" + this.model.attributes.indents + ">reply</button>"
    $('.new-comment-' + this.model.id).html(button)
  },
  
  removeComment: function(comment) {
    var subview = _.find(
      this.subviews(".sub-comments-" + this.model.attributes.id),
      function(subview) {
        return subview.model === comment;
      }
    );
    
    this.removeSubview(".sub-comments-" + this.model.attributes.id, subview)
  },
  
  upvote: function(event) {
    if (Sync.Models.session) {
      event.cancelBubble = true;
      if (event.stopPropagation) { event.stopPropagation(); }
      event.preventDefault();
      var commentId = $(event.target).data('id');
      Sync.vote(commentId, "Comment", 1, { comment: this.model });
    } else {
      Sync.setAlert("must be signed in to vote");
    }
  },
  
  downvote: function(event) {
    if (Sync.Models.session) {
      event.cancelBubble = true;
      if (event.stopPropagation) { event.stopPropagation(); }
      event.preventDefault();
      var commentId = $(event.target).data('id');
      Sync.vote(commentId, "Comment", -1, { comment: this.model });
    } else {
      Sync.setAlert("must be signed in to vote");
    }
  },
  
  render: function() {
    var renderedContent = this.template({ comment: this.model, votes: Sync.Collections.votes });
    
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});
