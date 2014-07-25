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
    "click button.new_comment": "newComment"
  },
  
  addComment: function(comment) {
    var commentShow = new Sync.Views.CommentShow({ model: comment });
    this.addSubview(".sub-comments", commentShow)
  },
  
  removeComment: function(comment) {
    var subview = _.find(
      this.subviews(".sub-comments"),
      function(subview) {
        return subview.model === comment;
      }
    );
    
    this.removeSubview(".sub-comments", subview)
  },
  
  render: function() {
    var renderedContent = this.template({ comment: this.model });
    
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});