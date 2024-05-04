const http = require('http');
const fs = require('fs');
const url = require('url');

let errArr = []

const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url == '/' || req.url == '/home' || req.url == '/home.html') {
        fs.readFile(__dirname + '/home.html', 'utf-8', (err, data) => {
            if (err) {
                res.write(err);
            } else {
                res.write(data);
            }
            res.end();
        })
    }
    else if (req.url == '/about' || req.url == '/about.html') {
        fs.readFile(__dirname + '/about.html', 'utf-8', (err, data) => {
            if (err) {
                res.write(err);
            } else {
                ; res.write(data);
            }
            res.end();
        })
    }
    else {
        const date = new Date();
        let obj = {
            url: req.url,
            time: date
        }
        if (errArr.length < 5) {
            errArr.push(obj);
        } else {
            errArr.shift();
        }
        fs.writeFileSync(__dirname + "/error.log", JSON.stringify(errArr));
        res.write("In other endpoint category");
        res.end();
    }
})

server.listen(3000, (err) => {
    if (err)
        console.log(err);
    else
        console.log('Server started listening on port 3000');
})