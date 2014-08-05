Sync.Views.Asteroids = Backbone.View.extend({
  template: JST["asteroids"],
  
  render: function() {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);
    
    return this;
  }
})
