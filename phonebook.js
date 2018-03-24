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
        if (answerNumber < 1 || answerNumber > 5 || isNaN(answerNumber)) {
            console.log('Invalid choice\n');
            consoleDisplay();
        } else {
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
        }
    });
};

var lookUpAnEntry = function() {
    rl.question("Name: ", function(name) {
        if (storeObj[name] !== undefined) {
            console.log(`Found entry for ${name}: ${storeObj[name].PhoneNumber}\n`);
        } else {
            console.log('Entry not found');
        }
        consoleDisplay();
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
    rl.question('Name: ', function(name) {
        if (storeObj[name] === undefined) {
            console.log(`Entry not found ${name}`);
        } else {
            delete storeObj[name];
            console.log(`Deleted entry for ${name}`);
            fs.writeFile(filename, JSON.stringify(storeObj), function(err) {
                if (err) {
                    console.error(err.toString());
                }
            });
        }
        consoleDisplay();
    });
};

var listAllEntries = function() {
    var entriesList = Object.values(storeObj);
    if (entriesList.length !== 0) {
        entriesList.forEach(element => {
            console.log(`Found Entry for ${element.Name}: ${element.PhoneNumber}\n`);
        });
    } else {
        console.log('No Items in the Phonebook');
    }
    consoleDisplay();
};

getStoredObject();
consoleDisplay();