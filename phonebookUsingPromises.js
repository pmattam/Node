var readline = require('readline');
var fs = require('fs');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var storeObj = {};
var filename = 'phonebook.txt';
var promisify = require('util').promisify;
var readFile = promisify(fs.readFile);
var writeFile = promisify(fs.writeFile);

var getStoredObject = function() {
    readFile(filename)
        .then(function(fileData) {
            if (fileData.toString() !== '') {
                storeObj = JSON.parse(fileData);
            }
        });
};

var rlQuestionAsPromise = function(question) {
    return new Promise(function(resolve) {
        rl.question(question, resolve);
    });
};

var consoleDisplay = function() {
    var answerNumber;
    console.log("Electronic Phone Book \n", "-------------------- \n", "1. Look up an entry \n", "2. Set an entry \n", "3. Delete an entry");
    console.log(" 4. List all entries \n", "5. Quit \n");
    rlQuestionAsPromise("What do you want to do(1-5) ? ")
        .then(function(choice) {
            answerNumber = parseInt(choice, 10);
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
        // READING THE ENTRY FROM THE FILE
        // fs.readFile(filename, function(err, fileData) {
        //     if (err) {
        //         console.error(err.toString());
        //     } else {
        //         var data = JSON.parse(fileData);
        //         if (data[name] === undefined) {
        //             console.log('Entry not found');
        //         } else {
        //             console.log(`Found entry for ${name}: ${data[name].PhoneNumber}`)
        //         }
        //     }
        //     consoleDisplay();
        // });

        // INSTEAD OF READING THE ENTRY FROM THE FILE .. GETTING ENTRY FROM THE STORED OBJECT
        if (storeObj[name] !== undefined) {
            console.log(`Found entry for ${name}: ${storeObj[name].PhoneNumber}\n`);
            // console.log(`Found entry for ${storeObj[name].Name}: ${storeObj[name].PhoneNumber}\n`);
        } else {
            console.log('Entry not found');
        }
        consoleDisplay();
    });
};

var setAnEntry = function() {
    var entryData = {};
    rlQuestionAsPromise("Name: ")
        .then(function(nameInfo) {
            entryData.Name = nameInfo;
            return rlQuestionAsPromise("Phone Number: ");
        })
        .then(function(phoneNoInfo) {
            entryData.PhoneNumber = phoneNoInfo;
        })
        .then(function() {
            console.log(entryData);
            storeObj[entryData.Name] = entryData;
            console.log(storeObj);
            return writeFile(filename, JSON.stringify(storeObj))
        })
        .then(function() {
            console.log(`Entry stored for ${entryData.Name}`);
            consoleDisplay();
        });

    // INSTEAD OF THIS ... LOOK ABOVE
    //     var entryData = {};
    // rlQuestionAsPromise("Name: ")
    //     .then(function(nameInfo) {
    //         entryData.Name = nameInfo;
    //         return rlQuestionAsPromise("Phone Number: ");
    //     })
    //     .then(function(phoneNoInfo) {
    //         entryData.PhoneNumber = phoneNoInfo;
    //     })
    // DIFFERENT WAY ABOVE
    //     .then(function() {
    //         console.log(entryData);
    //         storeObj[entryData.Name] = entryData;
    //         console.log(storeObj);
    //         writeFile(filename, JSON.stringify(storeObj))
    //             .then(function() {
    //                 console.log(`Entry stored for ${entryData.Name}`);
    //                 consoleDisplay();
    //             });
    //     });

    // // PROMISIFYING THE CALLBACK API WRITEFILE
    // writeFile(filename, JSON.stringify(storeObj))
    //     .then(function() {
    //         console.log(`Entry stored for ${name}`);
    //         consoleDisplay();
    //     });

    // USING WRITEFILE API WITHOUT USING PROMISES  
    // fs.writeFile(filename, JSON.stringify(storeObj), function(err) {
    //     if (err) {
    //         console.error(err.toString());
    //     } else {
    //         console.log(`Entry stored for ${name}`);
    //     }
    //     consoleDisplay();
    //         // });
    //     });
    // });
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