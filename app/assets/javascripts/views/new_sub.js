Sync.Views.NewSub = Backbone.View.extend({
  template: JST["subs/new"],
  
  events: {
    "submit form": "submit"
  },
  
  initialize: function(options) {
    // this.user = current_user
  },
  
  submit: function() {
    event.preventDefault();
    
    var params = $(event.target).serializeJSON();
    
    var sub = new Sync.Models.Sub(params["sub"]);
    
    sub.save({}, {
      success: function(sub) {
        Backbone.history.navigate("#/s/" + sub.name, { trigger: true });
      }
    });
  },
  
  render: function() {
    var renderedContent = this.template();   // this.user = current_user
    
    this.$el.html(renderedContent);
    
    return this;
  }
})