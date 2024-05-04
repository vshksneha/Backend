const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    console.log(req.url);
    if(req.url == '/'){
        fs.readFile(__dirname+'/home.html','utf-8',(err,data)=>{
            if(err){
                res.write(err);
            }else{
                res.write(data);
            }
            res.end();
        })
    }
   else if(req.url == '/style.css'){
        fs.readFile(__dirname+'/style.css','utf-8',(err,data)=>{
            if(err){
                res.write(err);
            }else{
                res.write(data);
            }
            res.end();
        })
    }
    else if(req.url == '/index.js'){
        fs.readFile(__dirname+'/index.js','utf-8',(err,data)=>{
            if(err){
                res.write(err);
            }else{
                res.write(data);
            }
            res.end();
        })
    }
    else if(req.url == '/bg'){
        fs.readFile(__dirname+'/bg.jpg',(err,data)=>{
            if(err){
                res.write(err);
            }else{
                res.write(data);
            }
            res.end();
        })
    }
    else{
        res.end('<h1>Unknown Page</h1>')
    }
})

server.listen(3001,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Server listening on 3001 ...");
    }
})