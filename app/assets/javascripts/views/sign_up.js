Sync.Views.SignUp = Backbone.CompositeView.extend({
  template: JST["sign_up"],
  
  events: {
    "submit form": "submit"
  },
  
  submit: function() {
    event.preventDefault();
    var view = this;
    
    var params = $(event.target).serializeJSON();
    var user = new Sync.Models.User(params["user"]);
    
    user.save({}, {
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