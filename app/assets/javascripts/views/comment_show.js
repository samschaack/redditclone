Sync.Views.CommentShow = Backbone.CompositeView.extend({
  template: JST["comments/show"],
  
  initialize: function(options) {
    this.model = options.model;
    
    this.listenTo(this.model, "change", this.render);
    
    this.listenTo(this.model, "sync", this.render);
    
    this.listenTo(
      this.model.comments(), "add", this.addComment
    );
    
    // this.listenTo(
    //   this.model.comments(), "remove", this.addComment
    // );
    
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
    "click button.comment-maximize": "maximizeComment"
  },
  
  destroyComment: function(event) {
    var that = this;
    event.preventDefault();
    commentId = $(event.target).data('id');
    var comment = this.model;
    comment.destroy({
      success: function(comment) {
        $('.sub-comments-' + comment.attributes.id).html('');
        // debugger;
        // $(that.$el[0]).html('');
      }
    });
  },
  
  minimizeComment: function(event) {
    event.preventDefault();
    var commentId = $(event.target).data('id');
    var indents = $(event.target).data('indents');
    $('.sub-comments-' + commentId).slideToggle(150);
    $('.expand-minimize-section-' + commentId).html('<button class="button-link comment-maximize" data-id="' + commentId + '" data-indents="' + indents + '">[+]</button>')
    $('div.comment-content[data-id=' + commentId + ']').slideToggle(150);
    $('div.comment-vote-box[data-id=' + commentId + ']').slideToggle(150);
    $('.new-comment-' + commentId).slideToggle(150);
  },
  
  maximizeComment: function(event) {
    event.preventDefault();
    var commentId = $(event.target).data('id');
    var indents = $(event.target).data('indents');
    $('.sub-comments-' + commentId).slideToggle(150);
    $('.expand-minimize-section-' + commentId).html('<button class="button-link comment-maximize" data-id="' + commentId + '" data-indents="' + indents + '">[-]</button>')
    $('div.comment-content[data-id=' + commentId + ']').slideToggle(150);
    $('div.comment-vote-box[data-id=' + commentId + ']').slideToggle(150);
    $('.new-comment-' + commentId).slideToggle(150);
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
    
    var comment = new Sync.Models.Comment(params["comment"]);
    
    comment.save({}, {
      success: function(comment) {
        $("#sub-navigate").removeAttr("disabled");
        comment.attributes.current_user = "true";
        var commentView = new Sync.Views.CommentShow({ model: comment });
        $('.sub-comments-' + commentId).append(commentView.render().$el);
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
    // var comment_id = $(event.target).data('id');
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
  
  render: function() {
    var renderedContent = this.template({ comment: this.model });
    
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});