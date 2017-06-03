var express = require("express");
var bodyParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;
const CryptoJS = require('crypto-js');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var app = express();
var jsonParser = bodyParser.json();
var url = "mongodb://localhost:27017/usersdb";

const secret = 'kivavi';
const header = {
  "alg": "HS256",
  "typ": "JWT"
};

const session = {};

//app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname));
app.use(cookieParser());

app.get('/', function (req, res) {
  if (req.cookies.id in session) {
    res.redirect('/main');
  }
  else {
    res.sendFile(__dirname + '/public/index.html');
  }
});

app.get('/main', function (req, res) {
  if (req.cookies.token === session[req.cookies.id] && req.cookies.token) {
    res.sendFile(__dirname + '/public/main.html');
  } else {
    res.redirect('/login');
  }
});

app.get('/login', function (req, res) {
  if (req.cookies.id in session) {
    res.redirect('/main');
  }
  else {
    res.sendFile(__dirname + '/public/logout.html');
  }
});

app.post("/api/users", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const key = CryptoJS.SHA256(req.body.email).toString();

    for (let field in req.body) {
      req.body[field] = CryptoJS.AES.encrypt(req.body[field], key).toString();
    }

    req.body.key = key;

    mongoClient.connect(url, function(err, db){
        db.collection("users").find({key:req.body.key}).toArray((err,result)=>{
          if(err) return res.stats(400).send();
          if(result.length != 0)
             res.send({'status': false});
          else{
            db.collection("users").insertOne(req.body, function(err, result){

                if(err) return res.status(400).send();
                 console.log(result.ops);

                const token = jwt.sign({
                  name: req.body.name,
                  surname: req.body.surname,
                  patronymic: req.body.patronymic
                }, secret);

                session[result.ops[0]._id] = token;

                res.send({'status': true, "id": result.ops[0]._id, 'token': token});
                db.close();
            });
          }
        });

    });
});

app.post("/api/userss", jsonParser, function(req, res){
  if(!req.body) return res.sendStatus(400);

  console.log(req.body);

  const key = CryptoJS.SHA256(req.body.email).toString();

  req.body.key = key;

  console.log(req.body);

  mongoClient.connect(url, function(err, db){
      db.collection("users").find({key:req.body.key}).toArray(function(err, result){
        console.log(err);
        if(err) return res.status(400).send();
          console.log(result);

          for (let i = 0; i < result.length; ++i) {
            if (CryptoJS.AES.decrypt(result[i].email, result[i].key).toString(CryptoJS.enc.Utf8) === 
                req.body.email &&
                CryptoJS.AES.decrypt(result[i].password, result[i].key).toString(CryptoJS.enc.Utf8) ===
                req.body.password) {
           
              const token = jwt.sign({
                name: req.body.name,
                surname: req.body.surname,
                patronymic: req.body.patronymic
              }, secret);

              session[result[i]._id] = token;
              res.send({'status': true, "id": result[i]._id, 'token': token});

              db.close();
              return;
            }
          }

          res.send({'status': false});
          db.close();
      });
  });
});

app.post('/api/logout', (req, res) => {
  console.log(session);
  delete session[req.cookies.id];
  console.log(session);
  res.end();
});

app.listen(3000, function(){
    console.log("Server starting at host 3000...");
});
