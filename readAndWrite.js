var readline = require('readline');
var fs = require('fs');

// A PROGRAM TO PROMPT THE USER FOR TWO FILE NAMES, 
// THE FIRST FILE WILL BE THE INPUT AND THE SECOND FILE WILL BE THE OUTPUT.
// THE PROGRAM WILL READ IN THE CONTENTS OF THE INPUT FILE,
// CONVERT ITS TEXT TO ALL CAPS AND THEN WRITE THE RESULTING CONTENTS TO OUTPUT FILE.
var rl = readline.createInterface(process.stdin, process.stdout);
rl.question('Input file: ', (inputFilename) => {

    rl.question('Output file: ', (outputFilename) => {

        fs.readFile(inputFilename, function(err, fileContents) {
            // TRIGGER AN ERROR BY RUNNING THE PROGRAM WITH AN NON-EXISTING INPUT FILE,
            // ENSURE THAT THE ERROR IS PROPERLY DISPLAYED.
            if (err) {
                console.error(err.toString());
            } else {
                // MAKE TO STRING ONLY IF WE NEED TO READ CONTENTS OF THE FILE IN THE CONSOLE.LOG
                // DON'T NEED TO MAKE THEM TO STRING IF WE ARE JUST READING AND WRITING
                // var firstFileContents = fileContents.toString();
                // console.log(firstFileContents);

                // TRIGGER AN ERROR BY RUNNING THE PROGRAM WITH AN OUTPUT FILE IN A NON-EXISTENT DIRECTORY,
                // SUCH AS thisdirdoesntexist/output.txt, ENSURE THAT THE ERROR IS PROPERLY DISPLAYED.
                // fs.writeFile(`newDirectory/${outputFilename}`, fileContents.toString().toUpperCase(), function(err) {
                fs.writeFile(outputFilename, fileContents.toString().toUpperCase(), function(err) {
                    if (err) {
                        console.error(err.toString());
                    } else {
                        console.log(`Wrote to file ${outputFilename}`);
                    }
                });
            }
            rl.close();
        });
    });
});