const requestPromise = require('request-promise');
const fs = require('fs');
const promisify = require('util').promisify
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

let result = [];
let file = 'index.txt';
let count = 0;
let options = {
    uri: 'https://en.wikipedia.org/wiki/List_of_Star_Trek:_The_Next_Generation_episodes#Episodes',
    method: "GET"
};

requestPromise(options)
    .then(function(body) {
        return writeFile(file, body)
    })
    .then(function(body) {
        return readFile(file)
    })
    .then(function(file) {
        let convertedFile = file.toString();
        // var regex1 = /<td class="summary" style="[a-zA-Z0-9-: ]+">"[<span style="white\-space: nowrap">]*<a href="[\/a-zA-Z0-9_:(),%.'éà ]+"[ class="mw\-redirect"]* title="[a-zA-Z0-9_:(),'.éà ]+">([a-zA-Z0-9_,'.éà() ]+)<\/a>[<\/span>]*"<\/td>/g;
        // var regex2 = /<td>([A-Za-z&#0-9;, ]+)<span style="[A-Za-z0-9: ]+">[0-9&#;]+\(<span class="[a-zA-Z ]+">[0-9- ]+<\/span>\)<\/span><\/td>/g;
        let regex = /<td class="summary" style="[a-zA-Z0-9-: ]+">"[<span style="white\-space: nowrap">]*<a href="[\/a-zA-Z0-9_:(),%.'éà ]+"[ class="mw\-redirect"]* title="[a-zA-Z0-9_:(),'.éà ]+">([a-zA-Z0-9_,'.éà() ]+)<\/a>[<\/span>]*"<\/td>[^]+?<td>([A-Za-z&#0-9;, ]+)<span style="[A-Za-z0-9: ]+">[0-9&#;]+\(<span class="[a-zA-Z ]+">[0-9- ]+<\/span>\)<\/span><\/td>/g;

        while (match = regex.exec(convertedFile)) {
            result.push(++count + "." + match[1] + " " + "( " + match[2].replace("&#160;", " ").replace(",&#160;", " ") + " )");
        }
        return result;
    })
    .then(function(episodes) {
        writeFile(file, JSON.stringify(episodes));
        episodes.forEach(episode => console.log(episode));
    });