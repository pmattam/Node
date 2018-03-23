var http = require('http');
var fs = require('fs');
var promisify = require('util').promisify;
var readFile = promisify(fs.readFile);
var writeFile = promisify(fs.writeFile);

var contacts = [];
var filename = 'phonebookApp.txt';
var lastId = 0;

var getStoredData = function() {
    readFile(filename)
        .then(function(fileData) {
            if (fileData.toString() !== '') {
                contacts = JSON.parse(fileData);
            } else {
                contacts = [];
            }
        });
}();

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
            writeFile(filename, JSON.stringify(contacts));
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
                writeFile(filename, JSON.stringify(contacts));
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
            writeFile(filename, JSON.stringify(contacts));
            response.end(`Deleted Contact ${foundContactWithId.first}`);
        }
    }
});

server.listen(3000);