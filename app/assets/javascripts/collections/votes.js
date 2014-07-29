Sync.Collections.Votes = Backbone.Collection.extend({
  model: Sync.Models.Vote,
  
  url: "/api/votes",
  
  getOrFetch: function(id) {
    var votes = this;
    
    var vote;
    if (vote = this.get(id)) {
      vote.fetch();
    } else {
      vote = new Sync.Models.Vote({ id: id });
      vote.fetch({
        success: function() { votes.add(vote); }
      })
    }
    
    return vote;
  }
});