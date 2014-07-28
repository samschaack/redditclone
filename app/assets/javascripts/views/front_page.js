Sync.Views.FrontPage = Backbone.CompositeView.extend({
  template: JST["front_page"],
  
  initialize: function(options) {
    this.collection = options.collection;
    this.listenTo(this.collection, "sync", this.render);
  },
  
  events: {
    "click button.expand-all": "expandAll",
    "click button.minimize-all": "minimizeAll",
    "click button.expand-image": "imageToggle",
    "click button.expand-body": "bodyToggle",
    "click div.thumbnail-post": "postShow",
    "click div.text-post": "postShow",
    "click button.sign-out-button": "signOut",
    "click .upvote": "upvote",
    "click .downvote": "downvote",
    "click button.commands": "showCommands"
  },
  
  signOut: function(event) {
    event.preventDefault();
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
  
  toggleImage: function(post_id, url) {
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
  
  expandAll: function(event) {
    event.preventDefault();
    var view = this;
    
    this.collection.models.forEach(function(model) {
      var url = model.attributes.url;
      if (url) {
        if (url.slice(url.length - 3, url.length) === "jpg" || url.slice(url.length - 3, url.length) === "png") {
          view.toggleImage(model.attributes.id, url);
        }
      } else {
        view.toggleBody(model.attributes.id, model.attributes.body);
      }
    });
    
    var $minimizeAll = "<button class='btn btn-default minimize-all'>-</button>";
    $('.expand-minimize-all-posts').html($minimizeAll);
  },
  
  minimizeAll: function(event) {
    event.preventDefault();
    var view = this;
    
    this.collection.models.forEach(function(model) {
      var url = model.attributes.url;
      if (url) {
        if (url.slice(url.length - 3, url.length) === "jpg" || url.slice(url.length - 3, url.length) === "png") {
          view.toggleImage(model.attributes.id, url);
        }
      } else {
        view.toggleBody(model.attributes.id, model.attributes.body);
      }
    });
    
    var $expandAll = "<button class='btn btn-default expand-all'>+</button>";
    $('.expand-minimize-all-posts').html($expandAll);
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
  
  toggleBody: function(post_id, body) {
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
  
  postShow: function(event) {
    var post_id = $(event.target).data('id');
    
    if (post_id !== undefined) {
      Backbone.history.navigate("#/p/c/" + post_id);
    }
  },
  
  showCommands: function(event) {
    event.preventDefault();
    $('.commands-link').html("<span style='font-size: 90%'>f - front-page | s/a - sub directory | s/name - sub | s/n - new sub | u , u/n - signin/signup | u/me - your profile | p/index - show post with number index on current page | p - post | p/t - text-post</span>")
  },
  
  upvote: function(event) {
    event.preventDefault();
  },
  
  downvote: function(event) {
    event.preventDefault();
  },
  
  render: function() {
    var renderedContent = this.template({ posts: this.collection });
    
    this.$el.html(renderedContent);
    //this.attachSubviews();
    return this;
  }
});