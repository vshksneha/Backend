const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    let urlparsed = url.parse(req.url, true);
    let id = urlparsed.query.id;
    if (req.method === 'GET') {
        if (req.url == '/details') {
            res.end("Invalid Request");
        }
        else if (req.url == `/details?id=${id}`) {
            if (id) {
                res.end(`Request received with value ${id}`);
            } else {
                res.end("Specify the value");
            }
        }
        else {
            fs.readFile(__dirname + '/404.html', 'utf-8', (err, data) => {
                res.write(data);
                res.end();
            })
        }
    }
})

server.listen(3001, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server listening on 3001 ...');
    }
})