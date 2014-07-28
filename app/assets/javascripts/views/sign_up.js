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
      success: function(user) {
        Backbone.history.navigate("#", { trigger: true });
        $('.sign-out-button').toggleClass('invisible');
        $('.profile-header').toggleClass('invisible');
        $('.sign-in-button').toggleClass('invisible');
        $('.sign-up-button').toggleClass('invisible');
        $('.profile-header').html("welcome, " + user.attributes.username + "!");
      }
    });
  },
  
  render: function() {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);
    
    return this;
  }
});