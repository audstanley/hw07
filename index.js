const http = require('http');
const fs = require('fs');
const path = require('path');
const { extractFilePath } = require('./extract');
const wss = require('./websockets-server');
const WebSocket = require('ws');

const handleError = (err, res) => {
    console.log(`FileServerError: ${err}`);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.writeHead(404);
    res.write('404 File not found');
    res.end();
};

const server = http.createServer((req,res) => {
    console.log(`responding to a request`);

    let filepath = extractFilePath(req.url);
    fs.readFile(filepath, (err, data) => {
        console.log(`fp: ${filepath}`);
        if(err) {
            handleError(err, res);
            return;
        } else {
            res.end(data);
        }
    });
});

server.listen(3000);