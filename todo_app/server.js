const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    console.log(req.url);
    let urlparsed = url.parse(req.url, true);
    if (req.url == "/" || req.url == "/home") {
        fs.readFile(__dirname + '/todo.html', 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(302, { 'Content-type': 'text/html' });
                res.write(err);
            }
            else {
                res.writeHead(200, { 'Content-type': 'text/html' });
                res.write(data);
            }
            res.end();
        })
    }
    else if (urlparsed.pathname == "/addtask") {
        console.log(urlparsed.query.task);
        fs.readFile(__dirname + "/todo.json", 'utf-8', (err, data) => {
            data = JSON.parse(data);
            let taskid = data.length+1;
            let taskObj = {
                id: taskid,
                title: urlparsed.query.task,
                status: "pending"
            }
            data.push(taskObj);
            fs.writeFileSync(__dirname + '/todo.json', JSON.stringify(data));
            res.end();
        })
    }
    else if (req.url == "/tasks") {
        fs.readFile(__dirname + "/todo.json", 'utf-8', (err, data) => {
            data = JSON.parse(data);
            data.forEach(e => {
                res.write(`${e.id}) ${e.title}`);
                res.write("\n");
            })
            res.end();
        })
    }
    else if (req.url == "/tasks?status=pending") {
        fs.readFile(__dirname + "/todo.json", 'utf-8', (err, data) => {
            data = JSON.parse(data);
            data.forEach(e => {
                if (e.status == "pending") {
                    res.write(`${e.id}) ${e.title}`);
                    res.write("\n");
                }
            })
            res.end();
        })
    }
})

server.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server started on port 3000 ....");
    }
})