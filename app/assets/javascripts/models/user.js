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
      }
    });
    Backbone.history.navigate('#', { trigger: true });
  }
});

Sync.Models.User.authorize = function(attrs, callback) {
  Sync.Models.user = new Sync.Models.User({ username: attrs.username });
  Sync.Models.user.authenticate(attrs.password, callback);
}

Sync.Models.user = new Sync.Models.User();