const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req,res)=>{
    console.log(req.url);
    let urlparsed = url.parse(req.url,true);
    if(req.url == "/"){
        fs.readFile(__dirname + "/todo.json", 'utf-8',(err,data)=>{
            data = JSON.parse(data);
            data.forEach((e)=>{
                res.write(`<p>${e.id}) ${e.title}</p>`);
            })
            res.end();
        })
    }
    else if(req.url == `/delete?id=${urlparsed.query.id}`){
        fs.readFile(__dirname + "/todo.json", 'utf-8',(err,data)=>{
            data = JSON.parse(data);
            let newArr = data.filter((e)=>{
                if(e.id != urlparsed.query.id){
                    return true;
                }
            })
            newArr.forEach((e)=>{
                if(e.status == "pending")
                res.write(`<p>${e.id}) ${e.title}</p>`);
            })
            fs.writeFileSync(__dirname+'/todo.json',JSON.stringify(newArr));
            res.end();
        })
    }
})

server.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Server started on port 3000 ....");
    }
})