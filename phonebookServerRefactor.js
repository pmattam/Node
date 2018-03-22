const http = require('http');
let contacts = [];
let lastId = 0;

let matchesRequest = (request, { method, path }) => {
    var sameMethod = request.method === method;
    if (sameMethod) {
        var samePath = path.exec(request.url);
        if (samePath) {
            return samePath.slice(1);
        }
    }
    return false;
};

let findContactWithId = function(contactId) {
    var contactId = parseInt(contactId, 10);
    return contacts.find(element => element.id === contactId);
};

let indexOfFoundContactWithId = function(foundContactWithId) {
    if (contacts.indexOf(foundContactWithId) !== -1) {
        return contacts.indexOf(foundContactWithId);
    }
};

let getContact = function(request, response, params) {
    let contactId = params[0];
    response.end(JSON.stringify(findContactWithId(contactId)));
};

let deleteContact = function(request, response, params) {
    let contactId = params[0];
    let foundContactWithId = findContactWithId(contactId);
    contacts.splice(indexOfFoundContactWithId(foundContactWithId), 1);
    response.end(`Deleted Contact ${foundContactWithId.first}`);
};

let updateContact = function(request, response, params) {
    let contactId = params[0];
    var body = '';
    request.on('data', chunk => body += chunk.toString());
    request.on('end', function() {
        let updatedContact = JSON.parse(body);
        contacts[indexOfFoundContactWithId(findContactWithId(contactId))] = updatedContact;
        response.end(`Updated Contact for ${updatedContact.first}`);
    });
};

let getContacts = (request, response) => response.end(JSON.stringify(contacts));

let postContacts = function(request, response) {
    var body = '';
    request.on('data', chunk => body += chunk.toString());
    request.on('end', function() {
        let contact = JSON.parse(body);
        contact.id = ++lastId;
        response.end("New Contact, got it!");
        contacts.push(contact);
    });
};

let notFound = function(request, response) {
    response.statusCode = 404;
    response.end('404, Nothing Here!');
};

let routes = [
    { method: 'GET', path: /^\/contacts\/([0-9]+)$/, handler: getContact },
    { method: 'DELETE', path: /^\/contacts\/([0-9]+)$/, handler: deleteContact },
    { method: 'PUT', path: /^\/contacts\/([0-9]+)$/, handler: updateContact },
    { method: 'GET', path: /^\/contacts\/?$/, handler: getContacts },
    { method: 'POST', path: /^\/contacts\/?$/, handler: postContacts }
];

let server = http.createServer(function(request, response) {
    let params = [];
    let matchedRoute;
    for (let route of routes) {
        let matchedRequest = matchesRequest(request, route);
        if (matchedRequest) {
            matchedRoute = route;
            params = matchedRequest;
            console.log("Params", params);
            console.log("Type", typeof(params));
            break;
        }
    }
    matchedRoute ? matchedRoute.handler(request, response, params) : notFound(request, response);
});

server.listen(3000);