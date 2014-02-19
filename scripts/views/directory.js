App.Views.Directory = Backbone.View.extend({
  initialize: function(){
    _.bindAll(this, 'render');
  },

  render: function(){
    var $container = this.$('.listing').empty();

    App.Contacts.each(function(contact){
      new App.Views.Contact({
        model: contact,
        $container: $container
      }).render()
    });

    return this;
  }
});