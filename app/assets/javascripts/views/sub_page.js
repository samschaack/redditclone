Sync.Views.SubPage = Backbone.CompositeView.extend({
  template: JST["sub_page"],
  
  initialize: function(options) {
    this.collection = options.collection;
    this.sub = options.sub
    this.listenTo(this.collection, "sync", this.render)
    this.listenTo(this.sub, "sync", this.render)
    
    $("#sub-navigate").val("");
    $("#sub-navigate").blur();
    
    $('html').keypress(function(e) {
      if (e.which == 115) {
        document.getElementById("sub-navigate").focus();
      } else if (e.which == 117) {
        document.getElementById("sub-navigate").focus();
      }
    });
    
    $('#sub-navigate').keypress(function(e) {
      if (e.which == 13) {
        e.preventDefault();
        Backbone.history.navigate("#/" + $("#sub-navigate").val());
      }
    });
    
    $('#sub-navigate-button').click(this.gotoPage);
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