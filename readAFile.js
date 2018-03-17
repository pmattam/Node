// Read a file
// Write a program that prompts the user to enter a file name, and reads in the contents of the file, convert the text to all caps, and prints it out.

// Assuming the file file1.txt contains the text: Hello, I am file 1.. Example output:

// $ node cap_file.js
// filename: file1.txt
// HELLO, I AM FILE 1.
// Trigger an error condition by running the program on a non-existent file. Your program should display the error message, and it should display something like:

// $ node cap_file.js
// filename: blah.txt
// ENOENT: no such file or directory, open 'blah.txt'


// READ A FILE

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('filename: ', (filenameAnswer) => {
    var fs = require('fs');
    fs.readFile(filenameAnswer, function(err, fileContents) {
        if (err) {
            console.log(err.toString());
        } else {
            console.log(fileContents.toString());
        }
    });
    rl.close();
});