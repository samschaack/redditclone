Sync.Views.AccountPage = Backbone.View.extend({
  template: JST["users/profile"],
  
  initialize: function() {
    //listen for posts, comments eventually
  },
  
  render: function() {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);
    
    return this;
  }
})