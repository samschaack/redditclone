Sync.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/show"],
  
  initialize: function(options) {
    this.model = options.model;
    
    this.listenTo(this.model, "sync", this.imageToggleDefault);
    
    this.listenTo(
      this.model.posts(), "add", this.addPost
    );
    this.listenTo(
      this.model.posts(), "remove", this.addPost
    );
    
    this.listenTo(
      this.model.comments(), "add", this.addComment
    );
    this.listenTo(
      this.model.comments(), "remove", this.addComment
    );
    
    this.model.posts().each(this.addPost.bind(this));
    this.model.comments().each(this.addComment.bind(this));
    this.model.posts().fetch();
    this.model.comments().fetch();
  },
  
  events: {
    "click button.add-comment": "addComment"
  },
  
  addPost: function(post) {
    var minPostShow = new Sync.Views.MinPostShow({ model: post });
    this.addSubview(".posts", minPostShow)
  },
  
  addComment: function(comment) {
    var minCommentShow = new Sync.Views.MinCommentShow({ model: comment });
    this.addSubview(".comments", minCommentShow)
  },
  
  render: function() {
    var renderedContent = this.template({ user: this.model });
    
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});