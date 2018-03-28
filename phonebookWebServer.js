const http = require('http');
const fs = require('fs');
const readDir = require('fs-readdir-promise');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const pg = require('pg-promise')();
const db = pg('postgres://pmattam@localhost:5432/phonebookapp');

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

let getContact = (request, response, params) => {
    let contactId = params[0];
    db.query(`SELECT * FROM contacts
             WHERE id = ${contactId}`)
        .then(contacts => response.end(JSON.stringify(contacts)))
        .catch(error => console.log(error))
        .then(() => pg.end())
};

let deleteContact = (request, response, params) => {
    let contactId = params[0];
    db.query(`DELETE FROM contacts
             WHERE id = ${contactId}`)
        .then(results => {
            response.end('Deleted Contact');
        })
        .catch(error => console.log(error))
        .then(() => pg.end())
};

let updateContact = (request, response, params) => {
    let contactId = params[0];
    var body = '';
    request.on('data', chunk => body += chunk.toString());
    request.on('end', () => {
        let updatedContact = JSON.parse(body);
        db.query(`UPDATE contacts SET 
            firstname = '${updatedContact.first}', lastname = '${updatedContact.last}', 
            email = '${updatedContact.email}', phone_number = '${updatedContact.phone}'
            WHERE id = ${contactId};`)
            .then(results => {
                response.end('Updated Contact');
            })
            .catch(error => console.log(error))
            .then(() => pg.end())
    });
};

let getContacts = (request, response) => {
    db.query(`SELECT * FROM contacts;`)
        .then(contacts => response.end(JSON.stringify(contacts)))
        .catch(error => console.log(error))
        .then(() => pg.end())
};

let postContacts = (request, response) => {
    var body = '';
    request.on('data', chunk => body += chunk.toString());
    request.on('end', () => {
        let contact = JSON.parse(body);
        db.query(`INSERT INTO contacts (
            firstname, lastname, email, phone_number) 
            values ('${contact.first}', '${contact.last}', '${contact.email}', '${contact.phone}');`)
            .then(results => response.end("New Contact, got it!"))
            .catch(error => console.log(error))
            .then(() => pg.end())
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

let routes = [{
        method: 'GET',
        path: /^\/contacts\/([0-9]+)$/,
        handler: getContact
    },
    {
        method: 'DELETE',
        path: /^\/contacts\/([0-9]+)$/,
        handler: deleteContact
    },
    {
        method: 'PUT',
        path: /^\/contacts\/([0-9]+)$/,
        handler: updateContact
    },
    {
        method: 'GET',
        path: /^\/contacts\/?$/,
        handler: getContacts
    },
    {
        method: 'POST',
        path: /^\/contacts\/?$/,
        handler: postContacts
    }
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