// CIT 270 Team Final - Reactless MERN Stack API

const bodyParser = require('body-parser');
const express = require('express');
const crypto = require('crypto');
const https = require('https');
const fs = require('fs');
const req = require('express/lib/request');

const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 4443;

app.use(express.static('public'));


//All The MongoDB's are belong to us
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://cit270:ComeComeY3S4ints!@db.sbotv.mongodb.net/db?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send('Hello!\n');
})

// A fun riddle that harasses those using postman to interact with the API
app.post('/',(req,res) => {
    res.send('Take away my first letter, then take away my second letter. Then take the rest of my letters, yet I remain the same. What am I?\n');
})

app.post('/login',(req,res) => {
    var username = req.body.userName
    var password =  crypto.createHash('sha256').update(req.body.password).digest('hex')
    
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("accounts");
        
        var query = { name: username };
        dbo.collection("users").find(query).toArray(function(err, result) {
          if (err) throw err;
          
          if (result.some(item => item.password === password)) {
              res.status(200).send(uuidv4());
          }
          else {
              res.status(400).send('Who are you? ' + password);
          }
          db.close();
        });
      });
})
app.post('/register',(req,res) => {
    var password = req.body.password;
    var vpassword = req.body.verifyPassword;

    //Compare the password with the verify password to determine whether to make the connection
    if (password == vpassword) {
        password = crypto.createHash('sha256').update(password).digest('hex')

        MongoClient.connect(uri, function(err, db) {
            if (err) throw err;
            var dbo = db.db("accounts");
            var myobj = { name: req.body.userName, email: req.body.email, password: password, accountType: req.body.accountType, phone: req.body.phone };
            dbo.collection("users").insertOne(myobj, function(err, res) {
              if (err) throw err;
              db.close();
            });
            console.log(req.body.userName + " made an account.");
            res.status(200).send('Account created, please log in.')
          });
    }
})

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'), 
    passphrase: "P@ssw0rd"
  }, app).listen(4443, () => {
    console.log(`Server started at https://localhost:${port}`)
  })