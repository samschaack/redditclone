Sync.Views.SubPage = Backbone.CompositeView.extend({
  template: JST["sub_page"],
  
  initialize: function(options) {
    this.collection = options.collection;
    this.sub = options.sub;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.sub, "sync", this.render);
  },
  
  events: {
    "click button.expand-all": "expandAll",
    "click button.minimize-all": "minimizeAll",
    "click button.expand-image": "imageToggle",
    "click button.expand-body": "bodyToggle",
    "click div.thumbnail-post": "postShow",
    "click div.text-post": "postShow",
    "click button.subscribe": "subscribe",
    "click button.unsubscribe": "unsubscribe"
  },
  
  postShow: function(event) {
    var post_id = $(event.target).data('id');
    
    if (post_id !== undefined) {
      Backbone.history.navigate("#/p/c/" + post_id);
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
  
  gotoPage: function(event) {
    event.preventDefault();
    Backbone.history.navigate("#/" + $("#sub-navigate").val());
  },
  
  subscribe: function(event) {
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/api/sub_memberships',
      data: {
        sub: this.sub.attributes.name
      },
      success: function(data) {
        $('.subscribe-section').html(' - ✓');
        $('.unsubscribe-section').html('<span class="unsubscribe-section"> - <button class="link-button unsubscribe">unsubscribe</button></span>')
      }
    });
  },

  unsubscribe: function(event) {
    event.preventDefault();
    $.ajax({
      type: 'DELETE',
      url: '/api/sub_memberships',
      data: {
        sub: this.sub.attributes.name
      },
      success: function(data) {
        $('.unsubscribe-section').html(' - ✓');
        $('.subscribe-section').html('<span class="subscribe-section"> - <button class="link-button subscribe">subscribe</button></span>')
      }
    });
  },
  
  render: function() {
    var renderedContent = this.template({ posts: this.collection, sub: this.sub });
    
    this.$el.html(renderedContent);
    //this.attachSubviews();
    return this;
  }
});