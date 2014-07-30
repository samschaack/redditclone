Sync.Views.AccountPage = Backbone.View.extend({
  template: JST["users/profile"],
  
  initialize: function(options) {
    //listen for posts, comments eventually
    this.user = options.user;
  },
  
  events: {
    "click span.email": "changeEmail",
    "click div.profile": "removeChangeEmail"
  },
  
  changeEmail: function(event) {
    event.preventDefault();
    var curTarget = $('.email').html();
    var view = this;
    
    if (curTarget.slice(curTarget.length - 7, curTarget.length - 1) === "change") {
      $('.email').html("<input type=text name=user[email] id='email-box'>");
      $('input#email-box').focus();
      $('.email').append("<button class='btn btn-default change-email'>change</button>")
    } else {
      if (document.getElementById("email-box").value !== "") {
        var email = document.getElementById("email-box").value;
        if (email.match(/\S+@\S+(\.\S+)\S+/)) {
          $.ajax({
            type: 'PUT',
            data: { user: 
              { 
                email: document.getElementById("email-box").value
              }
            },
            url: '/api/users/update',
            success: function(user) {
              $('.email').html(user.email + " (click to change)");
              view.user.set('email', user.email);
            }
          });
        } else {
          Sync.setAlert("not a valid email address");
        }
      }
    }
  },
  
  removeChangeEmail: function() {
    $('.email').html(this.user.attributes.email + " (click to change)");
  },
  
  render: function() {
    var renderedContent = this.template({ user: this.user });
    
    this.$el.html(renderedContent);
    
    return this;
  }
})