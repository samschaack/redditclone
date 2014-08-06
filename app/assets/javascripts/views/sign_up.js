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
    
    if (params["user"]["username"].match(/(\.)+|(\,)+|(\s)+|(\/)+|(\!)+|(\@)+(\^)+|(\+)+|(\-)+|(\?)+|(\#)+|(\$)+|(\*)+|(\%)+|(\&)+|(\[)+|(\])+(\{)+|(\})+|(\=)+|(\()+|(\))+|(\')+|(\")+|(\:)+|(\;)+|(\<)+|(\>)+|(\\)+/)) {
      Sync.setAlert("usernames can't contain spaces or punctuation apart from _");
    } else if (params["user"]["username"] === "") {
      Sync.setAlert("username can't be blank");
    } else if (params["user"]["password"] === "") {
      Sync.setAlert("password can't be blank");      
    } else if (params["user"]["password"].length < 6) {
      Sync.setAlert("password must be 6 characters or longer");            
    } else {
      user.save({}, {
        success: function(user) {
          Sync.Models.session = {};
          Sync.Models.session.username = user.username;
          Sync.Models.session.points = user.points;
          Sync.Models.session.email = user.email;
        
          Backbone.history.navigate("#", { trigger: true });
          $('.sign-out-button').toggleClass('invisible');
          $('.profile-header').toggleClass('invisible');
          $('.sign-in-button').toggleClass('invisible');
          $('.sign-up-button').toggleClass('invisible');
          $('.profile-header').html("welcome, <a href='#/u/me'>" + user.attributes.username + "</a>!");
          $('.commands-link').html('');
        },
        error: function(error, data) {
          if (data.responseJSON.error === "username taken") {
            Sync.setAlert("sorry, that username is taken");
          } else if (data.responseJSON.error === "password can't be blank") {
            Sync.setAlert("password can't be blank");
          } else if (data.responseJSON.error === "username can't be blank") {
            Sync.setAlert("username can't be blank");
          }
        }
      });
    }
  },
  
  render: function() {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);
    
    return this;
  }
});