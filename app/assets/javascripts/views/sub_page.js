Sync.Views.SubPage = Backbone.CompositeView.extend({
  template: JST["sub_page"],
  
  initialize: function(options) {
    this.collection = options.collection;
    this.sub = options.sub;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.sub, "sync", this.render);
  },
  
  events: {
    "click button.expand-image": "imageToggle",
    "click button.expand-body": "bodyToggle",
    "click div.post": "postShow"
  },
  
  postShow: function(event) {
    var post_id = $(event.target).data('id');
    
    if (post_id !== undefined) {
      Backbone.history.navigate("#/p/" + post_id);
    }
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
  
  bodyToggle: function(event) {
    event.cancelBubble = true;
    if (event.stopPropagation) { event.stopPropagation(); }
    event.preventDefault();
    
    var post_id = $(event.target).data('id');
    var body = $(event.target).data('body');
    var $contentTarget = $("div.post-content[data-id='" + post_id + "']");
    
    if ($contentTarget.html() === "" || $contentTarget.html() === undefined) {
      $contentTarget.html(body);
      $("span.glyphicon-plus[data-id='" + post_id + "']").removeClass('glyphicon-plus');
      $("span.glyphicon[data-id='" + post_id + "']").addClass('glyphicon-minus');
    } else {
      $contentTarget.html("");
      $("span.glyphicon-minus[data-id='" + post_id + "']").removeClass('glyphicon-minus');
      $("span.glyphicon[data-id='" + post_id + "']").addClass('glyphicon-plus');
    }
  },
  
  gotoPage: function(event) {
    event.preventDefault();
    Backbone.history.navigate("#/" + $("#sub-navigate").val());
  },
  
  render: function() {
    var renderedContent = this.template({ posts: this.collection, sub: this.sub });
    
    this.$el.html(renderedContent);
    //this.attachSubviews();
    return this;
  }
});