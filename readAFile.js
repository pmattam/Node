// WRITE A PROGRAM THAT PROMPTS THE USER TO ENTER A FILE NAME AND READS IN THE CONTENTS 
// OF THE FILE AND CONVERTS THE TEXT TO ALL CAPS AND PRINTS IT OUT.
// ALSO TRIGGER AN ERROR CONDITION BY RUNNING THE PROGRAM ON A NON-EXISTENT FILE.

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('filename: ', (filenameAnswer) => {
    var fs = require('fs');
    fs.readFile(filenameAnswer, function(error, fileContents) {
        if (error) {
            console.error(error.toString());
        } else {
            console.log(fileContents.toString().toUpperCase());
        }
    });
    rl.close();
});