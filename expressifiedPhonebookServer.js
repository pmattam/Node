const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const pg = require('pg-promise')();
const db = pg('postgres://pmattam@localhost:5432/phonebookapp');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/contacts/:id', (req, res) => {
    db.query(`SELECT * FROM contacts
             WHERE id = ${req.params.id};`)
        .then(contacts => res.send(JSON.stringify(contacts)))
        .catch(error => console.log(error))
});

app.delete('/contacts/:id', (req, res) => {
    db.query(`DELETE FROM contacts
    WHERE id = ${req.params.id}`)
        .then(results => {
            res.send('Deleted Contact');
        })
        .catch(error => console.log(error))
});

app.put('/contacts/:id', (req, res) => {
    db.query(`UPDATE contacts SET 
            firstname = '${req.body.first}', lastname = '${req.body.last}', 
            email = '${req.body.email}', phone_number = '${req.body.phone}'
            WHERE id = ${req.params.id};`)
        .then(results => {
            res.send('Updated Contact');
        })
        .catch(error => console.log(error))
});

app.get('/contacts', (req, res) => {
    db.query(`SELECT * FROM contacts;`)
        .then(contacts => res.send(JSON.stringify(contacts)))
        .catch(error => console.log(error))
});

app.post('/contacts', (req, res) => {
    db.query(`INSERT INTO contacts (
        firstname, lastname, email, phone_number) 
        values ('${req.body.first}', '${req.body.last}', '${req.body.email}', '${req.body.phone}');`)
        .then(results => res.send("New Contact, got it!"))
        .catch(error => console.log(error))
});

app.listen(3000, () => {
    console.log("Running on port 3000");
});