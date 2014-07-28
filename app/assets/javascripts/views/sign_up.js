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
        $('.profile-header').html("welcome, <a href='#/u/me'>" + user.attributes.username + "</a>!");
        $('.commands-link').html('');
        
        Sync.Models.session = {};
        Sync.Models.session.username = user.username;
        Sync.Models.session.points = user.points;
        Sync.Models.session.email = user.email;
      }
    });
  },
  
  render: function() {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);
    
    return this;
  }
});