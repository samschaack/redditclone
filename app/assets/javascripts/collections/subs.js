Sync.Collections.Subs = Backbone.Collection.extend({
  model: Sync.Models.Sub,
  
  url: "/api/subs",
  
  getOrFetch: function(id) {
    var subs = this;
    
    var sub;
    if (sub = this.get(id)) {
      sub.fetch();
    } else {
      sub = new Sync.Models.Post({ id: id });
      sub.fetch({
        success: function() { subs.add(sub); }
      })
    }
    
    return sub;
  },
  
  comparator: function(model) {
    return -model.get('upvotes') + model.get('downvotes');
  }
});