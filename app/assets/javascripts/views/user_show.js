Sync.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/show"],
  
  initialize: function(options) {
    this.user = options.user;
  },
  
  events: {
    "click button.send-message": "sendMessage"
  },
  
  sendMessage: function(event) {
    event.preventDefault();
  },
  
  render: function() {
    var renderedContent = this.template({ user: this.user });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});
