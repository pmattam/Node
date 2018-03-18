var readline = require('readline');
var fs = require('fs');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var storeObj = {};
var filename = 'phonebook.txt';

var getStoredObject = function() {
    fs.readFile(filename, function(err, fileData) {
        if (err) {
            console.error(err.toString());
        } else {
            if (fileData.toString() !== '') {
                storeObj = JSON.parse(fileData);
            }
        }
    });
};

var consoleDisplay = function() {
    var answerNumber;
    console.log("Electronic Phone Book \n", "-------------------- \n", "1. Look up an entry \n", "2. Set an entry \n", "3. Delete an entry");
    console.log(" 4. List all entries \n", "5. Quit \n");
    rl.question("What do you want to do(1-5) ? ", function(answer) {
        answerNumber = parseInt(answer, 10);
        if (answerNumber === 1) {
            lookUpAnEntry();
        } else if (answerNumber === 2) {
            setAnEntry();
        } else if (answerNumber === 3) {
            deleteAnEntry();
        } else if (answerNumber === 4) {
            listAllEntries();
        } else if (answerNumber >= 5) {
            console.log('Bye.');
            rl.close();
        }
    });
    return answerNumber;
};

var lookUpAnEntry = function() {
    rl.question("Name: ", function(name) {
        fs.readFile(filename, function(err, fileData) {
            if (err) {
                console.error(err.toString());
            } else {
                var data = JSON.parse(fileData);
                if (data[name] === undefined) {
                    console.log('Entry not found');
                } else {
                    console.log(`Found entry for ${name}: ${data[name].PhoneNumber}`)
                }
            }
            consoleDisplay();
        });
    });
};

var setAnEntry = function() {
    rl.question("Name: ", function(name) {
        rl.question("Phone Number: ", function(phoneNo) {
            var entryData = {};
            entryData.Name = name;
            entryData.PhoneNumber = phoneNo;
            storeObj[name] = entryData;
            fs.writeFile(filename, JSON.stringify(storeObj), function(err) {
                if (err) {
                    console.error(err.toString());
                } else {
                    console.log(`Entry stored for ${name}`);
                }
                consoleDisplay();
            });
        });
    });
};

var deleteAnEntry = function() {
    console.log("delete entry");
    consoleDisplay();
};

var listAllEntries = function() {
    fs.readFile(filename, function(err, fileData) {
        if (err) {
            console.error(err.toString());
        } else {
            if (fileData.toString() !== '') {
                data = JSON.parse(fileData);
                valuesOfDataArray = Object.values(data);
                valuesOfDataArray.forEach(function(value) {
                    console.log(`Found Entry for ${value.Name}: ${value.PhoneNumber}`);
                });
            }
        }
        consoleDisplay();
    });
};

getStoredObject();
consoleDisplay();