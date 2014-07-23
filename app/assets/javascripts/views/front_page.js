Sync.Views.FrontPage = Backbone.CompositeView.extend({
  template: JST["front_page"],
  
  initialize: function(options) {
    this.collection = options.collection;
    
    //iterate through collection, rendering a post for each
  },
  
  render: function() {
    var renderedContent = this.template({ collection: this.collection });
    
    this.$el.html(renderedContent);
    //this.attachSubviews();
    return this;
  }
});