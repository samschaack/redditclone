Sync.Collections.Users = Backbone.Collection.extend({
  model: Sync.Models.User,
  
  url: "/api/users",
  
  getOrFetch: function(id) {
    var users = this;
    
    var user;
    if (user = this.get(id)) {
      user.fetch();
    } else {
      user = new Sync.Models.User({ id: id });
      user.fetch({
        success: function() { users.add(user); }
      })
    }
    
    return user;
  }
});

Sync.Collections.users = new Sync.Collections.Users();