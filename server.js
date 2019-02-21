const express = require('express');
const server = express();
const ip = require('ip');

var fs = require('fs');
/*
fs.readFile('filelist.txt', 'utf-8', function(err, data){
    if (err) throw err;
});
*/
// password: pwd

var port = 8090;


server.get("/test", (req, res) => {
    res.send(" <h1>Welcome to my server!</h1> ");
    console.log("Server pinged");
});
server.use(express.static('public'));


server.listen(port, () => {
    console.log(`listening on port 8080`);
    console.log(`Go to your web browser and type in: ${ip.address()}:${port} to see the server`);
})