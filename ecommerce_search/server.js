const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    console.log(req.url);
    let urlparsed = url.parse(req.url, true);

    if (req.url == "/" || req.url == "/home") {
        fs.readFile(__dirname + '/products.json', 'utf-8', (err, data) => {
            data = JSON.parse(data);
            let counter = 1;
            data.forEach((e) => {
                res.write(`<p>${counter++}.  Title: ${e.title}, Category: ${e.category}, Price: Rs. ${e.price}</p>`);
                res.write('\n');
            })
            res.end();
        })
    } else if (req.url == "/?category=cloths") {
        fs.readFile(__dirname + '/products.json', 'utf-8', (err, data) => {
            data = JSON.parse(data);
            let counter = 1;
            const arr = data.filter((e) => {
                if (e.category == 'cloths' && e.price >= 300) {
                    return true;
                }
            })
            counter = 1;
            arr.forEach((e) => {
                res.write(`<p>${counter++}.  Title: ${e.title}, Category: ${e.category}, Price: Rs.${e.price}</p>`);
                res.write('\n');
            })
            res.end();
        })
    }
})

server.listen(3001, (err) => {
    if (err) {
        console.log("Unable to start the server");
    } else {
        console.log("Server started successfully on port 3001 ...");
    }
})