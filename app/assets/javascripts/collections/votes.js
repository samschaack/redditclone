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

if (Sync.Models.session) {
  Sync.Collections.votes = new Sync.Collections.Votes;
  Sync.Collections.votes.url = "api/votes/front_page"
  Sync.Collections.votes.fetch();
}