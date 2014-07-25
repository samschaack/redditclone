Sync.Views.CommentShow = Backbone.CompositeView.extend({
  template: JST["comments/show"],
  
  initialize: function(options) {
    this.model = options.model;
    
    this.listenTo(this.model, "change", this.render);
    
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
    "click div.comment": "removeCommentForm",
    "click button.comment-reply": "newComment",
    "click textarea": "preventBubble",
    "click button.new-comment": "createComment"
  },
  
  createComment: function(event) {
    event.cancelBubble = true;
    if (event.stopPropagation) { event.stopPropagation(); }
    event.preventDefault();
    event.preventDefault();

    var params = $("textarea").serializeJSON();
    params["post"]["commentable_id"] = this.model.attributes.id;
    params["post"]["commentable_type"] = "Comment";
    
    var post = new Sync.Models.Post(params["post"]);
    var sub = params["post"]["sub"]
    
    // post.save({}, {
//       success: function(post) {
//         Backbone.history.navigate("#/p/" + post.id, { trigger: true });
//       }
//     });
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
    
    var comment_id = $(event.target).data('id');
    
    var form = "<form>"
    form += "<textarea class='my-text-area' rows='2' cols='80' name='post[body]' style='white-space: pre-wrap;'></textarea>";
    form += "<br><button class='btn btn-xs btn-default new-comment'>submit</button>";
    form += "</form>";
    
    $('.new-comment-' + this.model.id).html(form)
  },
  
  removeCommentForm: function(event) {
    event.cancelBubble = true;
    if (event.stopPropagation) { event.stopPropagation(); }
    event.preventDefault();
    
    var comment_id = $(event.target).data('id');
    var button = "<button class='button-link comment-reply' data-id=" + comment_id + " data-indents=" + this.model.attributes.indents + ">reply</button>"
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