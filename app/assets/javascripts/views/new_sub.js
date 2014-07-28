Sync.Views.NewSub = Backbone.View.extend({
  template: JST["subs/new"],
  
  events: {
    "submit form": "submit"
  },
  
  initialize: function(options) {
    if (options) {
      this.subName = options.subName;
    }
  },
  
  submit: function() {
    event.preventDefault();
    
    var params = $(event.target).serializeJSON();
    
    var sub = new Sync.Models.Sub(params["sub"]);
    
    sub.save({}, {
      success: function(sub) {
        $.ajax({
          type: 'POST',
          url: '/api/sub_memberships',
          data: {
            sub: sub.attributes.name
          },
          success: function(data) {
            Sync.setMessage("sub created");
            Backbone.history.navigate("#/s/" + sub.attributes.name, { trigger: true });
            $('.subscribe-section').html(' - ✓');
        
            setTimeout(function() {
              $('.subscribe-section').html('');
              $('.unsubscribe-section').html('<span class="unsubscribe-section"> - <button class="link-button unsubscribe">unsubscribe</button></span>')
            }, 3000)
          }
        });
      }
    });
  },
  
  render: function() {
    var renderedContent;
    
    if (this.subName) {
      renderedContent = this.template({ subName: this.subName });
    } else {
      renderedContent = this.template();
    }
    
    this.$el.html(renderedContent);
    
    return this;
  }
})