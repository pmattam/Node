const http = require('http');
let contacts = [];
let lastId = 0;

// let matches = (request, method, path) => request.method === method && request.url.startsWith(path);
// DESTRUCTURING
let matches = (request, { method, path }) => {
    // request.method === method && request.url.startsWith(path);
    console.log("Method & Path", method, path);
    var sameMethod = request.method === method;
    console.log("Just Method", sameMethod);
    if (sameMethod) {
        var samePath = path.exec(request.url);
        if (samePath) {
            console.log("Just Path", samePath);
            console.log("Slice of it", samePath.slice(1));
            // var pathSliceIntConvert = parseInt(samePath.slice(1));
            // console.log(pathSliceIntConvert);
            // console.log(typeof(pathSliceIntConvert));
            return samePath.slice(1);
        }
    }
    return false;
};

// let getSuffix = (fullUrl, prefix) => fullUrl.slice(prefix.length);

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
    // let contactId = getSuffix(request.url, '/contacts/');
    let contactId = params;
    response.end(JSON.stringify(findContactWithId(contactId)));
};

// var getContact = require('./getContact');

let deleteContact = function(request, response, params) {
    // let contactId = getSuffix(request.url, '/contacts/');
    let contactId = params;
    let foundContactWithId = findContactWithId(contactId);
    contacts.splice(indexOfFoundContactWithId(foundContactWithId), 1);
    response.end(`Deleted Contact ${foundContactWithId.first}`);
};

let updateContact = function(request, response, params) {
    // let contactId = getSuffix(request.url, '/contacts/');
    let contactId = params;
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

// var getHandler = function(method, path) {
//     let handler = (method === 'POST' && path === '/contacts') ? postContacts : (method === 'PUT') ? updateContact :
//         (method === 'DELETE') ? deleteContact : (method === 'GET' && path === '/contacts') ?
//         getContacts : (method === 'GET' && path === '/contacts/') ? getContact : notFound;
//     return handler;
// };

let server = http.createServer(function(request, response) {

    // let route = routes.find(route => matches(request, route.method, route.path));

    // Older Code//
    // // let route = routes.find(route => matches(request, route));
    // // console.log("Route", route);
    // // if (route) {
    // //     route.handler(request, response);
    // // } else {
    // //     notFound(request, response);
    // // }

    // Newer Code//
    let params = [];
    let matchedRoute;
    for (let route of routes) {
        let match = matches(request, route);
        if (match) {
            matchedRoute = route;
            console.log("Match is", parseInt(match));
            params = parseInt(match);
            break;
        }
    }
    if (matchedRoute) {
        matchedRoute.handler(request, response, params);
    } else {
        notFound(request, response);
    }

    // route ? route.handler(request, response) : notFound(request, response);
    // (route ? route.handler : notFound)(request, response);
    // getHandler(request.method, request.url)(request, response);
});

server.listen(3000);