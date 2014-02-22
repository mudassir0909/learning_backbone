var App = {
  Models: {},
  Collections: {},
  Views: {},
  Contacts: null,
  Directory: null,
  Routers: {},
  Browser: null
}

$(function(){
  window.tom = new App.Models.Contact({
    firstName: 'Thomas',
    lastName: 'Hunter',
    phoneNumber: '98989898989',
    email: 'me@thomashunter.name'
  })

  App.Contacts = new App.Collections.Contact();

  App.Contacts.add(window.tom);

  App.Contacts.add({
    firstName: 'Emma',
    lastName: 'Watson',
    phoneNumber: 'Idontknow',
    email: 'wingardium@leviosa.com'
  })

  App.Directory = new App.Views.Directory({
    el: $('#display')
  });

  App.Directory.render();

  App.Contacts.on('add remove', function(){
    App.Directory.render();
  });

  App.Browser = new App.Routers.Contact;
  Backbone.history.start();
});
