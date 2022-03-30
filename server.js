// CIT 270 Team Final - Reactless MERN Stack API

const bodyParser = require('body-parser');
const express = require('express');
const crypto = require('crypto');
const https = require('https');
const fs = require('fs');
const req = require('express/lib/request');
const app = express();
const port = 443;

app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send('Hello!\n');
})

app.post('/',(req,res) => {
    res.send('Take away my first letter, then take away my second letter. Then take the rest of my letters, yet I remain the same. What am I?\n');
})

app.post('/login',(req,res) => {
    if(req.body.userName == "sam" && crypto.createHash('sha256').update(req.body.password).digest('hex') == "181bd50ae63d9821d57cedbe4f1924a7cfe17a377b4e442c1cec30682e2934c9") {
        res.send('sam');
    } else {
        res.status(401); // Unauthorized
        res.send('invalid_user')
    }
})
app.post('/createuser',(req,res) => {
    if(req.body.userName == "sam" && crypto.createHash('sha256').update(req.body.password).digest('hex') == "181bd50ae63d9821d57cedbe4f1924a7cfe17a377b4e442c1cec30682e2934c9") {
        res.send('sam');
    } else {
        res.status(401); // Unauthorized
        res.send('invalid_user') // Change to authorize user
    }
})

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app).listen(443, () => {
    console.log(`Server started at https://localhost:${port}`)
  })