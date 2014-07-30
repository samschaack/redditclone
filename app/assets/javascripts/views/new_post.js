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

    var params = $(event.target).serializeJSON();
    
    var post = new Sync.Models.Post(params["post"]);
    var sub = params["post"]["sub"]
    
    if (params["post"]["url"].match(/\s+/) || !params["post"]["url"].match(/(\w+(\.\w+)+)/)) {
      Sync.setAlert("not a valid url");
    } else {
      post.save({}, {
        success: function(post) {
          Backbone.history.navigate("#/p/c/" + post.id, { trigger: true });
          Sync.setMessage("post created");      
        },
      
        error: function(errors) {
          Sync.setAlert(errors);
          console.log(errors)
        }
      });
    }
  },
  
  render: function() {
    var renderedContent = this.template({ user: this.user });
    
    this.$el.html(renderedContent);
    
    return this;
  }
})