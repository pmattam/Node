const http = require('http');
let contacts = [{ "name": "Melissa Mary", "email": "melissa@gmail.com", "phone": "3211424323", "id": 2 }];
let lastId = 0;
const fs = require('fs');
var promisify = require('util').promisify;
var readFile = promisify(fs.readFile);
var writeFile = promisify(fs.writeFile);
var readDir = require('fs-readdir-promise');

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

var renderPage = function(request, response) {
    var requestFileName = request.url.slice(1);
    console.log("File name", requestFileName);
    readDir('staticFiles', files => {
            return files;
        })
        .then(function(files) {
            if (files.indexOf(requestFileName) != -1) {
                readFile(`staticFiles/${requestFileName}`)
                    .then(fileData => { response.end(fileData) });
            } else {
                console.log("File doesn't exist");
                response.end();
            }
        });
};

let routes = [
    { method: 'GET', path: /^\/contacts\/([0-9]+)$/, handler: getContact },
    { method: 'DELETE', path: /^\/contacts\/([0-9]+)$/, handler: deleteContact },
    { method: 'PUT', path: /^\/contacts\/([0-9]+)$/, handler: updateContact },
    { method: 'GET', path: /^\/contacts\/?$/, handler: getContacts },
    { method: 'POST', path: /^\/contacts\/?$/, handler: postContacts }
];

let server = http.createServer(function(request, response) {
    console.log(request.url);
    var regex = /^(\/[a-z]+\.[a-z]+)$/;
    if (regex.test(request.url)) {
        renderPage(request, response);
    } else {
        let params = [];
        let matchedRoute;
        for (let route of routes) {
            let matchedRequest = matchesRequest(request, route);
            if (matchedRequest) {
                matchedRoute = route;
                params = matchedRequest;
                break;
            }
        }
        matchedRoute ? matchedRoute.handler(request, response, params) : notFound(request, response);
    }
    // if (matchedRoute) {
    //     matchedRoute.handler(request, response, params);
    // } else if (request.url === /^\/[a-z]\.[a-z]$/) {
    //     console.log("It is coming here....");
    //     console.log("Request type", request.url);
    //     renderPage(request, response);
    // } else {
    //     notFound(request, response);
    // }
});

server.listen(3000);