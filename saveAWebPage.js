// A PROGRAM TO SAVE A WEB PAGE
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// PROMPT THE USER FOR A URL FOR THE WEB PAGE THEY WANT TO SAVE AND THE FOR THE FILENAME TO SAVE TO
rl.question('URL: ', function(url) {
    rl.question('Save to file: ', function(htmlFilename) {

        // USING HTTP PROTOCOL
        // var http = require('http');
        // http.get(url, function(res) {

        // USING HTTPS PROTOCOL
        var https = require('https');
        https.get(url, function(res) {
            res.setEncoding('utf8');
            var rawData = '';
            res.on('data', function(chunk) {
                rawData += chunk;
            });
            res.on('end', function() {
                var fs = require('fs');

                // TRIGGER AN ERROR BY RUNNING THE PROGRAM WITH AN OUTPUT FILE IN A 
                // NON-EXISTENT DIRECTORY, SUCH AS thisdirdoesntexist/output.txt, 
                // ENSURE THAT THE ERROR IS PROPERLY DISPLAYED.
                // fs.writeFile(`newDirectory/${htmlFilename}`, rawData, function(err) {
                fs.writeFile(htmlFilename, rawData, function(err) {
                    if (err) {
                        console.error(err.toString());
                    } else {
                        console.log(`Saved to file ${htmlFilename}`);
                    }
                });
            });

            // TRIGGER AN ERROR BY RUNNING THE PROGRAM WITH AN INVALID URL, 
            // ENSURE THE ERROR IS PROPERLY DISPLAYED
            res.on('error', function(err) {
                console.error(err);
            });
        });
        rl.close();
    });
});