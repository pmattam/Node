// GIVEN THIS CODE
// const fs = require('fs');
// const gm = require('gm');
// const request = require('request');

// const url = 'https://raw.githubusercontent.com/voodootikigod/logo.js/master/js.png';
// const filename = 'js-logo.png';
// const thumbnailFilename = 'js-logo-small.png';
// const requestOptions = {
//   url: url,
//   encoding: null
// };
// request(requestOptions, (err, response, data) => {
//   if (err) {
//     console.log(err.message);
//     return;
//   }

//   fs.writeFile(filename, data, (err) => {
//     if (err) {
//       console.log(err.message);
//       return;
//     }
//     gm(filename)
//       .resize(240, 240)
//       .write(thumbnailFilename, (err) => {
//         if (err) {
//           console.log(err.message);
//           return;
//         }
//         console.log('It worked');
//       });
//   });
// });

// EXTRACTING A REUSABLE FUNCTION
const fs = require('fs');
const gm = require('gm');
const request = require('request');
const requestOptions = {
    url: url,
    encoding: null
};

var downloadAndCreateThumbnail = function(url, filename, thumbnailFileName, callback) {
    requestOptions.url = url;
    request(requestOptions, (err, response, data) => {
        callback(err);
        fs.writeFile(filename, data, (err) => {
            callback(err);
            gm(filename)
                .resize(240, 240)
                .write(thumbnailFilename, (err) => {
                    callback(err);
                });
        });
    });
};

var url = 'https://raw.githubusercontent.com/voodootikigod/logo.js/master/js.png';
var filename = 'js-logo.png';
var thumbnailFilename = 'js-logo-small.png';

downloadAndCreateThumbnail(url, filename, thumbnailFilename, (err) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log('It worked');
});