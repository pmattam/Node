// PROGRAM TO DOWNLOAD THE JAVASCRIPT LOGO, RESIZE IT USING THE gm MODULE TO THE SIZE 240x240
var request = require('request');
var options = {
    url: 'https://raw.githubusercontent.com/voodootikigod/logo.js/master/js.png',
    encoding: null
};

request(options, function(err, response, imageData) {
    var gm = require('gm');
    if (err) {
        console.log(err);
    } else {
        // 
        gm(imageData).resize(240, 240).write('resize.png', function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Done!');
            }
        });
    }
});