Sync.Views.FrontPage = Backbone.CompositeView.extend({
  template: JST["front_page"],
  
  initialize: function(options) {
    this.collection = options.collection;
    this.listenTo(this.collection, "sync", this.render)
    
    $("#sub-navigate").val("");
    $("#sub-navigate").blur();
    
    $('html').keypress(function(e) {
      if (e.which == 115) {
        document.getElementById("sub-navigate").focus();
      }
      if (e.which == 117) {
        document.getElementById("sub-navigate").focus();
      }
    });
    
    $('#sub-navigate').keypress(function(e) {
      if (e.which == 13) {
        e.preventDefault();
        // if ($('#sub-navigate').val() === "s") {
        //   Backbone.history.navigate("#/");
        // } else {
          Backbone.history.navigate("#/" + $("#sub-navigate").val());
        // }
      }
    });
  },
  
  render: function() {
    var renderedContent = this.template({ posts: this.collection });
    
    this.$el.html(renderedContent);
    //this.attachSubviews();
    return this;
  }
});