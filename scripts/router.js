App.Routers.Contact = Backbone.Router.extend({
  routes: {
    'contacts': 'contacts',
    'contacts/add': 'contactsAdd',
    'contacts/remove/:id': 'contactsRemove'
  },

  contacts: function(){
    App.Directory.render();
    App.Directory.addFormHide();
  },

  contactsAdd: function(){
    App.Directory.addForm();
  },

  contactsRemove: function(id){
    App.Contacts.remove(id);
    App.Directory.addFormHide();
  }
});