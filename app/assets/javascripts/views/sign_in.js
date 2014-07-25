Sync.Views.SignIn = Backbone.CompositeView.extend({
  template: JST["sign_in"],
  
  events: {
    "submit form": "submit"
  },
  
  submit: function() {
    event.preventDefault();
    var view = this;
    
    var params = $(event.target).serializeJSON();
    var session = new Sync.Models.Session(params["user"]);
    
    session.save({}, {
      success: function() {
        Backbone.history.navigate("#", { trigger: true });
      }
    });
  },
  
  render: function() {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);
    
    return this;
  }
});