const express = require('express');
const server = express();
const ip = require('ip');
var port = 8080;

server.get("/", (req, res) => {
    res.send(" <h1>Welcome to my server!</h1> ");
    console.log("Server pinged");
});

server.listen(PORT, () => {
    console.log(`listening on port 8080`);
    console.log(`Go to your web browser and type in: 10.92.30.51:8080 to see the server`);
})