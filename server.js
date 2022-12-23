const express = require("express");
const path = require("path");
const app = express();

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/createevent(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'createevent.html'));
});

app.get('/listevents(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'listevents.html'));
});

//app.get("/", (req, res) => {
//    res.sendFile(path.join(__dirname + "/index.html"));
//})



app.use("/static", express.static('./static/'));

const server = app.listen(5300);
const portNumber = server.address().port;
console.log(`port is open on ${portNumber}`);