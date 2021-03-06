var http = require('http');
var contacts = [];
var lastId = 0;

var server = http.createServer(function(request, response) {
    var contactId = request.url.slice(1);
    if (request.method === 'GET') {
        if (contactId === '') {
            response.end(JSON.stringify(contacts));
        } else {
            contactId = parseInt(contactId, 10);
            var foundContact = contacts.find(function(element) {
                return element.id === contactId;
            });
            response.end(JSON.stringify(foundContact));
        }
    } else if (request.method === 'POST') {
        var body = '';
        request.on('data', function(chunk) {
            body += chunk.toString();
        });
        request.on('end', function() {
            var contact = JSON.parse(body);
            contact.id = ++lastId;
            response.end("New Contact, got it!");
            contacts.push(contact);
        });
    } else if (request.method === 'PUT') {
        if (contactId === '') {
            response.end("Invalid url");
        } else {
            var body = '';
            request.on('data', function(chunk) {
                body += chunk.toString();
            });
            request.on('end', function() {
                var updatedContact = JSON.parse(body);
                contactId = parseInt(contactId, 10);
                var foundContactWithId = contacts.find(function(element) {
                    return element.id === contactId;
                });
                var indexOfFoundContactWithId = contacts.indexOf(foundContactWithId);
                if (indexOfFoundContactWithId !== -1) {
                    contacts[indexOfFoundContactWithId] = updatedContact;
                }
                response.end(`Updated Contact for ${updatedContact.first}`);
            });
        }
    } else if (request.method === 'DELETE') {
        if (contactId === '') {
            response.end("Invalid url");
        } else {
            contactId = parseInt(contactId, 10);
            var foundContactWithId = contacts.find(function(element) {
                return element.id === contactId;
            });
            contacts.pop(foundContactWithId);
            response.end(`Deleted Contact ${foundContactWithId.first}`);
        }
    }
});

server.listen(3000);