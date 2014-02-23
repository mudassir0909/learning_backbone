var http = require('http');
var filesystem = require('fs');

var Contacts = [{
  id: '1',
  firstName: 'Kiera',
  lastName: 'Knightley',
  phoneNumber: '123323424',
  email: 'kiera@knightley.com'
},
{
  id: '2',
  firstName: 'Natalie',
  lastName: 'Portman',
  phoneNumber: '345345343',
  email: 'natalie@portman.com'
}]

http.createServer(function(req, res){
  console.log(req.method + ' ' + req.url);

  if(req.url == '/' && req.method == 'GET'){
    // Requesting HTML document
    filesystem.readFile(__dirname + '/index.html', function(err, data){
      if (err) throw err;
      res.end(data);
    })

    return;
  }else if (req.url.indexOf('/contacts') === 0){
    // Backbone requesting some data
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    if(req.method === 'GET'){
      // Backbone want a list of all the Contacts
      res.end(JSON.stringify(Contacts));
    }else if(req.method === 'POST'){
      //Backbone is creating a new contact
      var body = '';
      req.on('data', function(data){
        body += data;
      });
      req.on('end', function(){
        var contact = JSON.parse(body);
        // making an unique id
        contact.id = Math.random().toString(36).substr(2);
        // storing it in array
        Contacts.push(contact);
        // sending back the updated contact to backbone application
        res.end(JSON.stringify(contact));
        console.log('CONTACT ADD: ', contact);
      })
    }else if(req.method === 'DELETE'){
      // deleting a contact
      var id = req.url.split('/')[2];
      console.log('DELETE CONTACT: '+ id);
      for(var index in Contacts){
        if(Contacts[index].id === id){
          Contacts.splice(index, 1);
          break;
        }
      }
      res.end();
    }
    return;
  }else{
    // Browser probably requesting Javascript
    var filename = __dirname + req.url;
    filesystem.lstat(filename, function(err, stats){
      if(err || !stats.isFile()){
        if(req.url != '/favicon.ico'){
          console.log("404: " + filename);
        }
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.write('404 Not Found\n');
        res.end();
        return;
      }

      filesystem.readFile(filename, function(err, data){
        res.writeHead(200, {
          'Content-Type': 'text/javascript'
        });
        res.end(data);
      });
    });
    return;
  }
}).listen(1337);

console.log('http://localhost:1337');