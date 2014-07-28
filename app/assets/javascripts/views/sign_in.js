Sync.Views.SignIn = Backbone.CompositeView.extend({
  template: JST["sign_in"],
  
  events: {
    "submit form": "submit"
  },
  
  submit: function() {
    event.preventDefault();
    var view = this;
    
    var params = $(event.target).serializeJSON();
    // var attrs = new Sync.Models.Session(params["user"]);
    var attrs = params["user"];
    
    Sync.Models.User.authorize(attrs, function(err, user) {
      if (err) { view.signInFailure(); }
      else { view.signInSuccess(user.attributes);}
    })
  },
  
  signInSuccess: function(user) {
    Backbone.history.navigate('#', { trigger: true });
    
    $('.sign-out-button').toggleClass('invisible');
    $('.profile-header').html("signed in as <a href='#/u/me'>" + user.username + "</a>");
    $('.profile-header').toggleClass('invisible');
    $('.sign-in-button').toggleClass('invisible');
    $('.sign-up-button').toggleClass('invisible');
    
    Sync.Models.session = {};
    Sync.Models.session.username = user.username;
    Sync.Models.session.points = user.points;
    Sync.Models.session.email = user.email;
  },
  
  signInFailure: function() {
    
  },
  
  render: function() {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);
    
    return this;
  }
});