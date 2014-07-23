window.Sync = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Sync.Routers.Router();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  
});