Sync.Views.PostShow = Backbone.CompositeView.extend({
  template: JST["posts/show"],
  
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
  },
  
  events: {
    "click button.expand-image": "imageToggle",
    "click button.add-comment": "addComment",
    "click button.post-reply": "newPostComment",
    "click button.remove-comment": "removeComment",
    "click div.comment-section": "removeNewPostCommentForm",
    "click button.new-post-comment": "createPostComment",
    "click .upvote": "upvote",
    "click .downvote": "downvote"
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
    if (!$(event.target).is('button') && !$(event.target).is('textarea') && !$(event.target).is('a')) {
      if ($('.new-post-comment').html().slice(0, 30) !== "<button class='button-link p" ) {
        event.preventDefault();
        $('.new-post-comment').html("<button class='button-link post-reply' data-id=" + this.model.attributes.id + ">reply</button>");
      }
    }
  },
  
  removeNewPostCommentFormNoEvent: function() {
    $('.new-post-comment').html("<button class='button-link post-reply' data-id=" + this.model.attributes.id + ">reply</button>");
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
    params["comment"]["user"] = Sync.Models.session.username;
    params["comment"]["commentable_id"] = this.model.attributes.id;
    params["comment"]["commentable_type"] = "Post";
    params["comment"]["post_id"] = this.model.attributes.id;
    
    var comment = new Sync.Models.Comment(params["comment"]);
    
    comment.save({}, {
      success: function(comment) {
        $("#sub-navigate").removeAttr("disabled"); 
        comment.attributes.user = Sync.Models.session.username;
        view.addComment(comment);
        view.removeNewPostCommentFormNoEvent();
        Sync.setMessage("comment created");
      }
    });
  },
  
  imageToggle: function(event) {
    event.cancelBubble = true;
    if (event.stopPropagation) { event.stopPropagation(); }
    event.preventDefault();
    
    var post_id = $(event.target).data('id');
    var url = $(event.target).data('url');
    var $contentTarget = $("div.show-post-content[data-id='" + post_id + "']");
    
    if ($contentTarget.html() === "" || $contentTarget.html() === undefined) {
      $contentTarget.html("<img class='sizeable-image' data-id=" + post_id + " src=" + url + ">");
      $("span.glyphicon-plus[data-id='" + post_id + "']").removeClass('glyphicon-plus');
      $("span.glyphicon[data-id='" + post_id + "']").addClass('glyphicon-minus');
    } else {
      $contentTarget.html("");
      $("span.glyphicon-minus[data-id='" + post_id + "']").removeClass('glyphicon-minus');
      $("span.glyphicon[data-id='" + post_id + "']").addClass('glyphicon-plus');
    }
  },
  
  imageToggleDefault: function() {
    this.render();
    
    if (this.model.attributes.url) {
      var url = this.model.attributes.url;
      var post_id = this.model.attributes.id;
      if (url.slice(url.length - 3, url.length) === "jpg" || url.slice(url.length - 3, url.length) === "png" || url.slice(url.length - 3, url.length) === "gif") {
        var $contentTarget = $("div.show-post-content[data-id='" + post_id + "']");
    
        if ($contentTarget.html() === "" || $contentTarget.html() === undefined) {
          $contentTarget.html("<img class='sizeable-image' data-id=" + post_id + " src=" + url + ">");
          $("span.glyphicon-plus[data-id='" + post_id + "']").removeClass('glyphicon-plus');
          $("span.glyphicon[data-id='" + post_id + "']").addClass('glyphicon-minus');
        } else {
          $contentTarget.html("");
          $("span.glyphicon-minus[data-id='" + post_id + "']").removeClass('glyphicon-minus');
          $("span.glyphicon[data-id='" + post_id + "']").addClass('glyphicon-plus');
        }
      }
    }
  },
  
  upvote: function(event) {
    if (Sync.Models.session) {
      event.cancelBubble = true;
      if (event.stopPropagation) { event.stopPropagation(); }
      event.preventDefault();
      var postId = $(event.target).data('id');
      Sync.vote(postId, "Post", 1, { post: this.model });
    } else {
      Sync.setAlert("must be signed in to vote");
    }
  },
  
  downvote: function(event) {
    if (Sync.Models.session) {
      event.cancelBubble = true;
      if (event.stopPropagation) { event.stopPropagation(); }
      event.preventDefault();
      var postId = $(event.target).data('id');
      Sync.vote(postId, "Post", -1, { post: this.model });
    } else {
      Sync.setAlert("must be signed in to vote");
    }
  },
  
  render: function() {
    var renderedContent = this.template({
      post: this.model,
      numComments: this.model.comments().length,
      votes: Sync.Collections.votes
    });
    
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});
