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
    "click button.remove-comment": "removeComment" //make sure to add validation that a user can only remove his own comments
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