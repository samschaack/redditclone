Sync.Views.FrontPage = Backbone.CompositeView.extend({
  template: JST["front_page"],
  
  initialize: function(options) {
    this.collection = options.collection;
    this.listenTo(this.collection, "sync", this.render);
  },
  
  events: {
    "click button.expand-image": "imageToggle",
    "click div.post": "postShow"
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
  
  postShow: function(event) {
    var post_id = $(event.target).data('id');
    
    if (post_id !== undefined) {
      Backbone.history.navigate("#/p/" + post_id);
    }
  },
  
  render: function() {
    var renderedContent = this.template({ posts: this.collection });
    
    this.$el.html(renderedContent);
    //this.attachSubviews();
    return this;
  }
});