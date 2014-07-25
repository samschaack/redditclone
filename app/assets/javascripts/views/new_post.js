Sync.Views.NewPost = Backbone.View.extend({
  template: JST["posts/new"],
  
  events: {
    "submit form": "submit"
  },
  
  initialize: function(options) {
    this.user = options.user;
  },
  
  submit: function() {
    event.preventDefault();
    var view = this;
    
    var params = $(event.target).serializeJSON();
    var session = new Sync.Models.Session(params["user"]);
    
    session.save({}, {
      success: function() {
        Backbone.history.navigate("#", { trigger: true });
      }
    });
  },
  
  render: function() {
    var renderedContent = this.template({ user: this.user });
    
    this.$el.html(renderedContent);
    
    return this;
  }
})