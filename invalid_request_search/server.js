const http = require('http');
const fs = require('fs');
const url = require('url');

let invalidRequestCount = 0;

const server = http.createServer((req, res) => {
    console.log(req.url);
    let urlparsed = url.parse(req.url, true);
    if (req.url == "/") {
        fs.readFile(__dirname + "/signup.html", "utf-8", (err, data) => {
            if (err) {
                res.write("Not Available");
            } else {
                res.writeHead(200, { 'Content-type': 'text/html' });
                res.write(data);
            }
            res.end();
        })
    }
    else if (req.url == '/signup') {
        if (req.method === 'POST') {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            })

            req.on('end', () => {
                console.log('Received data:', body);

                fs.writeFile('user.txt', body, (err) => {
                    if (err) {
                        console.error('Error writing to file:', err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                    } else {
                        console.log('Data saved to file');
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end('Data received and saved successfully');
                    }
                })
            })
        }
        else if (req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Invalid request method - ${++invalidRequestCount}</h1>`);
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
})

server.listen(3000, (err) => {
    if (err) {
        console.log("Unable to start server");
    } else {
        console.log("Starting server on port 3000");
    }
})