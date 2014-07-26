Sync.Views.PostShow = Backbone.CompositeView.extend({
  template: JST["posts/show"],
  
  initialize: function(options) {
    this.model = options.model;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(
      this.model.comments(), "add", this.addComment
    );
    this.listenTo(
      this.model.comments(), "remove", this.addComment
    );
    
    this.model.comments().each(this.addComment.bind(this));
    this.model.comments().fetch();
  },
  
  events: {
    "click button.expand-image": "imageToggle",
    "click button.add-comment": "addComment",
    "click button.post-reply": "newPostComment",
    "click button.remove-comment": "removeComment",
    // "click div.post-show": "removeNewPostCommentForm",
    "click button.new-post-comment": "createPostComment"
    //make sure to add validation that a user can only remove his own comments
  },
  
  addComment: function(comment) {
    var commentShow = new Sync.Views.CommentShow({ model: comment });
    this.addSubview(".comments", commentShow)
  },
  
  removeComment: function(comment) {
    var subview = _.find(
      this.subviews(".comments"),
      function(subview) {
        return subview.model === comment;
      }
    );
    
    this.removeSubview(".comments", subview)
  },
  
  removeNewPostCommentForm: function(event) {
    event.preventDefault();
    // if ($('.new-post-comment').html().slice(0, 30) !== "<button class='button-link p" ) {
    //   $('.new-post-comment').html("<button class='button-link post-reply' data-id=" + this.model.attributes.id + ">comment</button>");
    // }
  },
  
  removeNewPostCommentFormNoEvent: function() {
    $('.new-post-comment').html("<button class='button-link post-reply' data-id=" + this.model.attributes.id + ">comment</button>");
  },
  
  newPostComment: function() {
    event.cancelBubble = true;
    if (event.stopPropagation) { event.stopPropagation(); }
    event.preventDefault();
    
    $("#sub-navigate").attr("disabled", "disabled"); 
    
    var newPostCommentView = new Sync.Views.NewPostComment();
    $('.new-post-comment').html(newPostCommentView.template());
  },
  
  createPostComment: function() {
    var view = this;
    event.cancelBubble = true;
    if (event.stopPropagation) { event.stopPropagation(); }
    event.preventDefault();
    
    var params = $("textarea.new-post-comment-text").serializeJSON();
    params["comment"]["user_id"] = 1;
    params["comment"]["commentable_id"] = this.model.attributes.id;
    params["comment"]["commentable_type"] = "Post";
    
    var comment = new Sync.Models.Comment(params["comment"]);
    
    comment.save({}, {
      success: function(comment) {
        $("#sub-navigate").removeAttr("disabled"); 
        // comment.attributes.username = current_user;
        view.addComment(comment);
        view.removeNewPostCommentFormNoEvent();
      }
    });
  },
  
  imageToggle: function(event) {
    event.cancelBubble = true;
    if (event.stopPropagation) { event.stopPropagation(); }
    event.preventDefault();
    
    var post_id = $(event.target).data('id');
    var url = $(event.target).data('url');
    var $contentTarget = $("div.post-content[data-id='" + post_id + "']");
    
    if ($contentTarget.html() === "" || $contentTarget.html() === undefined) {
      $contentTarget.html("<img src=" + url + ">");
      $("span.glyphicon-plus[data-id='" + post_id + "']").removeClass('glyphicon-plus');
      $("span.glyphicon[data-id='" + post_id + "']").addClass('glyphicon-minus');
    } else {
      $contentTarget.html("");
      $("span.glyphicon-minus[data-id='" + post_id + "']").removeClass('glyphicon-minus');
      $("span.glyphicon[data-id='" + post_id + "']").addClass('glyphicon-plus');
    }
  },
  
  render: function() {
    var renderedContent = this.template({ post: this.model });
    
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});