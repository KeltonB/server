const express = require('express');
const server = express();
const ip = require('ip');
const Papa = require("papaparse");
var path = require('path');
var fs = require('fs');
var port = 8090;
var fs = require('fs');
var csv = 'private/users.csv';
var file;
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  var fourm_file;
var start = `
<!DOCTYPE html>
<html>
<head>
<style>
    p {
  border: 1px solid black;
  padding: 10px;
}
</style>
</head>
<body>
 <h1>This is kelton's fourm</h1>`;
var end = `
<form action="/fourm_post" method="POST">
<label for="username_input">Key: </label>
<input id="username_input" type="text" name="key" placeholder="Login key">
<label for="text">Enter post message here: </label>
<input id="text" type="text" name="text" placeholder="Enter post here:">
<input type="submit" value="Submit post">
</form>
<a href="index.html">Home</a>
    </body>
    </html>`;
class fourm{
    constructor(f){
         fourm_file = f;
    }
    post(u,m){
        var fdata = fs.readFileSync(fourm_file, 'utf8');
            var len;
            var p;
            var text;
            //var file = this.f;
            sleep(250);
            text = fdata.toString();
            p = Papa.parse(text);
            //console.log(p);
            len = p.data[0].length
            if(p.data[1].length != len){
                console.log("Critical fourm database fault");
                process.exit(404);
            }
            p.data[0][len] = u;
            p.data[1][len] = m;
            var ntxt = Papa.unparse(p);
            console.log(`Unparse code is:${ntxt}`);
            fs.writeFileSync(fourm_file, ntxt, 'utf8');
            console.log("Message posted");
            return;
                //console.log("Successfully Written to File.");
           
          
    }
 getHtml(){
        var toAdd = ""
        var fdata = fs.readFileSync(fourm_file, 'utf8');
            var len;
            var p;
            console.log(`Filetext is:${fdata}`);
            p = Papa.parse(fdata);
            console.log(p);
            //sleep(250);
            len = p.data[0].length;
            if(p.data[1].length != len){
                console.log("Critical fourm database fault");
                process.exit(404);
            }
            for(var i = 0; i<len; i++){
                toAdd = toAdd +`
                <h2>${p.data[0][i]}:</h2><p>${p.data[1][i]}</p>
                `;
            }
            //console.log(start+toAdd+end);
            fs.writeFile('public/fourm.html', start+toAdd+end, function(err, data){
                if (err) console.log(err);
                console.log("wrote html");
                
                return;
                console.log("Successfully Written to File.");
            });}

}
var f = new fourm('test.csv');
f.getHtml();
server.use(express.static('public'));
server.use(express.urlencoded({
    extended: false
}));

server.get("/test", (req, res) => {
    res.send(" <h1>Welcome to my server!</h1> ");
    console.log("Server pinged");
});
server.post("/login", (req, res) => {
    fs.readFile(csv, 'utf-8', function (err, buf) {
        file = buf.toString();
        parsed = Papa.parse(file);
        var u = req.body.username;
        var p = req.body.password;
        var len = parsed.data[0].length;
        if (len != parsed.data[1].length) {
            console.log("Critical csv error");
            throw new Error();
        }
        for (var i = 0; i < len + 1; i++) {
            if (parsed.data[0][i] == u) {
                //console.log("un correct");
                if (parsed.data[1][i] == p) {
                    res.send(`<h1> All good, ${u} </h1>`);
                    return;
                } else {
                    res.send("<h1> Wong password! try again </h1>");
                    return;
                }
            }

        }
        console.log(u);
        console.log(parsed.data[0]);

        res.send("<h1> You have not signed up, consider doing that. If you have signed up, consider asking me what is wrong.</h1>");


        //console.log(parsed.data[1][0]);
    });
});
server.post("/signup", (req, res) => {
    //console.log(req.body.username);
    var u = req.body.username;
    var p = req.body.password;
    fs.readFile(csv, 'utf-8', function (err, buf) {
        file = buf.toString();
        parsed = Papa.parse(file);
        // console.log(parsed.data);
        //console.log("Break");
        var len = parsed.data[0].length;
        if (len != parsed.data[1].length) {
            console.log("Critical csv error");
            throw new Error();
        }
        parsed.data[0][len] = u;
        parsed.data[1][len] = p;
        parsed.data[2][len] = makeid();
        console.log(parsed.data);
        fs.writeFile(csv, Papa.unparse(parsed), function (err, data) {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });
    });
    res.redirect("/");
});
server.post("/makeid", (req, res) => {
    fs.readFile(csv, 'utf-8', function (err, buf) {
        file = buf.toString();
        parsed = Papa.parse(file);
        var u = req.body.username;
        var p = req.body.password;
        var len = parsed.data[0].length;
        if (len != parsed.data[1].length) {
            console.log("Critical csv error");
            throw new Error();
        }
        for (var i = 0; i < len + 1; i++) {
            if (parsed.data[0][i] == u) {
                console.log("un correct");

                if (parsed.data[1][i] == p) {
                    res.send(`Here is the ID for ${u}: ${parsed.data[2][i]} <br><a href="/">Home</a><br> <a href="doggo.html">View doge</a>`);
                    return;
                } else {
                    res.send("<h1> Wong password! try again </h1>");
                    return;
                }
            }

        }
        console.log(u);
        console.log(parsed.data[0]);

        res.send("<h1> You have not signed up, consider doing that. If you have signed up, consider asking me what is wrong.</h1>");


        //console.log(parsed.data[1][0]);
    });
});
server.post("/viewdog", (req,res) =>{
key = req.body.key;
fs.readFile(csv, 'utf-8', function (err, buf) {
    file = buf.toString();
    parsed = Papa.parse(file);
    var len = parsed.data[2].length;
    // console.log(`Dog requested with key ${key}`);
    // console.log(parsed.data[2]);
    
    for (var i = 0; i < len; i++) {
        if(parsed.data[2][i] == key){
            console.log(`Doggo requested by ${parsed.data[0][i]}`);
            res.sendFile(path.join(__dirname + '/private/dog.jpg'));
            return;
        }
    }

res.send("<h1> You did not sign up, no dogs 4u!</h1>");
    //console.log(parsed.data[1][0]);
});
});
server.post("/fourm_post", (req,res) => {
    fs.readFile(csv, 'utf-8' ,function(err, buf) {
        file = buf.toString();
        parsed = Papa.parse(file);
        key=req.body.key;
        msg=req.body.text;
        var len = parsed.data[2].length;
        for (var i = 0; i < len; i++) {
            if(parsed.data[2][i] == key){
                console.log(`Message posted by:${parsed.data[0][i]}`);
                f.post(parsed.data[0][i], msg);
                console.log("posted");
                
                f.getHtml();
                res.redirect("/fourm.html");
                return;
            }
        } res.send("Wrong key");
        
      });
});
server.listen(port, () => {
    //console.log(`listening on port 8080`); wrong
    console.log(`Go to your web browser and type in: ${ip.address()}:${port} to see the server`);
});

