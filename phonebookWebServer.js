const http = require('http');
const fs = require('fs');
const readDir = require('fs-readdir-promise');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

let contacts = [{ "name": "Prathyusha Mattam", "email": "p@p.com", "phone": "3214321423", "id": 1 }, { "name": "Mattam Prathyusha", "email": "m@m.com", "phone": "3211424323", "id": 2 }];
let lastId = 0;

let matchesTheRequest = (request, { method, path }) => {
    var sameMethod = request.method === method;
    if (sameMethod) {
        var samePath = path.exec(request.url);
        if (samePath) {
            return samePath.slice(1);
        }
    }
    return false;
};

let findContactWithId = (contactId) => {
    var contactId = parseInt(contactId, 10);
    return contacts.find(element => element.id === contactId);
};

let indexOfFoundContactWithId = (foundContactWithId) => {
    if (contacts.indexOf(foundContactWithId) !== -1) {
        return contacts.indexOf(foundContactWithId);
    }
};

let getContact = (request, response, params) => {
    let contactId = params[0];
    response.end(JSON.stringify(findContactWithId(contactId)));
};

let deleteContact = (request, response, params) => {
    let contactId = params[0];
    let foundContactWithId = findContactWithId(contactId);
    contacts.splice(indexOfFoundContactWithId(foundContactWithId), 1);
    response.end(`Deleted Contact ${foundContactWithId.first}`);
};

let updateContact = (request, response, params) => {
    let contactId = params[0];
    var body = '';
    request.on('data', chunk => body += chunk.toString());
    request.on('end', () => {
        let updatedContact = JSON.parse(body);
        contacts[indexOfFoundContactWithId(findContactWithId(contactId))] = updatedContact;
        response.end(`Updated Contact for ${updatedContact.first}`);
    });
};

let getContacts = (request, response) => response.end(JSON.stringify(contacts));

let postContacts = (request, response) => {
    var body = '';
    request.on('data', chunk => body += chunk.toString());
    request.on('end', () => {
        let contact = JSON.parse(body);
        contact.id = ++lastId;
        response.end("New Contact, got it!");
        contacts.push(contact);
    });
};

let notFound = (request, response) => {
    response.statusCode = 404;
    response.end('404, Nothing Here!');
};

var serveStaticFiles = (request, response) => {
    var requestFileName = request.url.slice(1);
    readDir('staticFilesDir', files => {
            return files;
        })
        .then(files => {
            if (files.indexOf(requestFileName) != -1) {
                readFile(`staticFilesDir/${requestFileName}`)
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
    let regex = /^(\/[a-z]+\.[a-z]+)$/;
    if (regex.test(request.url)) {
        serveStaticFiles(request, response);
    } else {
        let params = [];
        let matchedRoute;
        for (let route of routes) {
            let matchedRequest = matchesTheRequest(request, route);
            if (matchedRequest) {
                matchedRoute = route;
                params = matchedRequest;
                break;
            }
        }
        matchedRoute ? matchedRoute.handler(request, response, params) : notFound(request, response);
    }
});

server.listen(3000);