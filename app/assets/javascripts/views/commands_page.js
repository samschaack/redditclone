Sync.Views.CommandsPage = Backbone.View.extend({
  template: JST["commands"],
  
  render: function() {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);
    
    return this;
  }
})