var http = require('http');
var contacts = [];
var lastId = 0;

var matches = function(request, method, path) {
    return request.method === method && request.url.startsWith(path);
};

var getSuffix = function(fullUrl, prefix) {
    return fullUrl.slice(prefix.length);
};

var findContactWithId = function(contactId) {
    var contactId = parseInt(contactId, 10);
    return contacts.find(function(element) {
        return element.id === contactId;
    });
};

var indexOfFoundContactWithId = function(foundContactWithId) {
    if (contacts.indexOf(foundContactWithId) !== -1) {
        return contacts.indexOf(foundContactWithId);
    }
};

var getContact = function(request, response) {
    var contactId = getSuffix(request.url, '/contacts/');
    response.end(JSON.stringify(findContactWithId(contactId)));
};

var deleteContact = function(request, response) {
    var contactId = getSuffix(request.url, '/contacts/');
    var foundContactWithId = findContactWithId(contactId);
    contacts.splice(indexOfFoundContactWithId(foundContactWithId), 1);
    response.end(`Deleted Contact ${foundContactWithId.first}`);
};

var updateContact = function(request, response) {
    var contactId = getSuffix(request.url, '/contacts/')
    var body = '';
    request.on('data', function(chunk) {
        body += chunk.toString();
    });
    request.on('end', function() {
        var updatedContact = JSON.parse(body);
        contacts[indexOfFoundContactWithId(findContactWithId(contactId))] = updatedContact;
        response.end(`Updated Contact for ${updatedContact.first}`);
    });
};

var getContacts = function(request, response) {
    response.end(JSON.stringify(contacts));
};

var postContacts = function(request, response) {
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
};

var notFound = function(request, response) {
    response.statusCode = 404;
    response.end('404, Nothing Here!');
};

var routes = [
    { method: 'GET', path: '/contacts/', handler: getContact },
    { method: 'DELETE', path: '/contacts/', handler: deleteContact },
    { method: 'PUT', path: '/contacts/', handler: updateContact },
    { method: 'GET', path: '/contacts', handler: getContacts },
    { method: 'POST', path: '/contacts', handler: postContacts }
];

var server = http.createServer(function(request, response) {
    var route = routes.find(function(route) {
        return matches(request, route.method, route.path);
    });
    if (route) {
        route.handler(request, response);
    } else {
        notFound(request, response);
    }
});

server.listen(3000);