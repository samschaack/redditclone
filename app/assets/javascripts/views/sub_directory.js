Sync.Views.SubDirectory = Backbone.CompositeView.extend({
  template: JST["subs/index"],
  
  initialize: function(options) {
    if (!Sync.Models.session) {
      //list all subs
      this.collection = new Sync.Collections.Subs()
      this.collection.fetch();
      
      this.listenTo(this.collection, "sync", this.render);
    } else {
      //list two groups- subscribed, and not subscribed
      this.subscribed = new Sync.Collections.Posts;
      this.subscribed.url = 'api/subs/subscribed';
      this.subscribed.fetch();
      
      this.unsubscribed = new Sync.Collections.Posts;
      this.unsubscribed.url = 'api/subs/unsubscribed';
      this.unsubscribed.fetch();
      
      this.owned = new Sync.Collections.Posts;
      this.owned.url = 'api/subs/owned';
      this.owned.fetch();
      
      this.listenTo(this.subscribed, "sync", this.render);
      this.listenTo(this.unsubscribed, "sync", this.render);
      this.listenTo(this.owned, "sync", this.render);
    }
  },
  
  events: {
    "click button.subscribe": "subscribe",
    "click button.unsubscribe": "unsubscribe",
    "click button.refresh-directory": "refresh"
  },
  
  refresh: function() {
    var view = this;
    
    if (!Sync.Models.session) {
      this.collection.fetch({
        success: function() {
          view.render
        }
      });
    } else {
      this.subscribed.fetch({
        success: function() {
          view.unsubscribed.fetch({
            success: function() {
              view.render()
            }
          })
        }
      });
    }
  },
  
  subscribe: function(event) {
    event.preventDefault();
    var subId = $(event.target).data('id');
    var sub = this.unsubscribed.findWhere({ id: subId }).attributes.name;
    
    $.ajax({
      type: 'POST',
      url: '/api/sub_memberships',
      data: {
        sub: sub
      },
      success: function(data) {
        $('.subscribe-section-' + subId).html(' - ✓');
      }
    });
  },

  unsubscribe: function(event) {
    event.preventDefault();
    var subId = $(event.target).data('id');
    var sub = this.subscribed.findWhere({ id: subId }).attributes.name;
    
    $.ajax({
      type: 'DELETE',
      url: '/api/sub_memberships',
      data: {
        sub: sub
      },
      success: function(data) {
        $('.unsubscribe-section-' + subId).html(' - ✓');
      }
    });
  },
  
  render: function() {
    if (this.collection) {
      var renderedContent = this.template({ collection: this.collection });
    } else { 
      var renderedContent = this.template(
        {
          subscribed: this.subscribed,
          unsubscribed: this.unsubscribed,
          owned: this.owned
        }
      )
    }
    
    this.$el.html(renderedContent);
    // this.attachSubviews();
    return this;
  }
});