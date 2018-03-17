const request = require('request');
const fs = require('fs');

const url = 'https://en.wikipedia.org/wiki/Continuation-passing_style';
const filename = 'output.html';

// GIVEN THIS CODE
// request.get(url, (err, response, html) => {
//   if (err) {
//     console.log(err.message);
//     return;
//   }
//   fs.writeFile(filename, html,(err) => {
//     if (err) {
//       console.log(err.message);
//       return;
//     }
//     console.log('It worked');
//   });
// });

// EXTRACTING A REUSABLE FUNCTION
var saveWebPage = function(url, filename, callback) {
    // GETTING THE URL HTML SOURCE CODE
    request.get(url, (err, response, html) => {
        callback(err);
        // WRITING TO A FILE
        fs.writeFile(filename, html, (err) => {
            callback(err);
        });
    });
};

saveWebPage('https://www.google.com', 'extract1.html', (err) => {
    console.log("Getting Google");
    if (err) {
        console.log(err.message);
        return;
    }
    console.log('It worked.');
});

saveWebPage('https://en.wikipedia.org/wiki/Continuation-passing_style', 'output.txt', (err) => {
    console.log("Getting Yahoo");
    if (err) {
        console.log(err.message);
        return;
    }
    console.log('It worked.');
});