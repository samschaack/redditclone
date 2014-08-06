Sync.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",
  
  authenticate: function(password, callback) {
    var that = this;
    
    $.ajax({
      type: 'POST',
      url: '/api/session',
      data: { user:
        {
          username: this.get('username'),
          password: password
        }
      },
      success: function(data) {
        if (data.error) {
          callback.call(this, data.error, that);
        } else {
          that.set(data);
          callback.call(this, null, that);
        }
      }
    });
  },
  
  signOut: function() {
    $.ajax({
      type: 'DELETE',
      url: '/api/session',
      data: {
        username: this.get('username'),
        password: this.get('password')
      },
      success: function(data) {
        $('.sign-out-button').toggleClass('invisible');
        $('.profile-header').toggleClass('invisible');
        $('.sign-in-button').toggleClass('invisible');
        $('.sign-up-button').toggleClass('invisible');
    
        Sync.tabs.splice(0, Sync.tabs.length);
        Sync.renderTabs();
        Sync.Models.session = null;
    
        Sync.Collections.votes = new Sync.Collections.Votes;
    
        Sync.setMessage("success");
        
        if (Backbone.history.fragment === "") {
          Backbone.history.navigate('#/u', { trigger: true });
        }
        
        Backbone.history.navigate('#', { trigger: true });
      }
    });
  }
});

Sync.Models.User.authorize = function(attrs, callback) {
  Sync.Models.user = new Sync.Models.User({ username: attrs.username });
  Sync.Models.user.authenticate(attrs.password, callback);
}

Sync.Models.user = new Sync.Models.User();