var express = require("express");
var bodyParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;
const CryptoJS = require('crypto-js');
var app = express();
var jsonParser = bodyParser.json();
var url = "mongodb://localhost:27017/usersdb";

//app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/main', function (req, res) {
  res.sendFile(__dirname + '/public/main.html');
});

app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/public/logout.html');
});

app.post("/api/users", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    var userName = req.body.name;
    var userSurname = req.body.surname;
    var userPatronymic = req.body.patronymic;
    var userSchool = req.body.school;
  	var userEmail = req.body.email;
  	var userGroup = req.body.group;
  	var userTeacherstudent = req.body.teacherstudent;
  	var userTeacherkey = req.body.teacherkey;
  	var userPulpit = req.body.pulpit;
    var userPassword = req.body.password;
    var userKey = req.body.key;

    var user = {
                  name: userName, 
                  surname: userSurname,
                  patronymic: userPatronymic,
                  school: userSchool,
                  email: userEmail,
                  group: userGroup,
                  teacherstudent: userTeacherstudent,
                  teacherkey: userTeacherkey,
                  pulpit: userPulpit,
                  password: userPassword,
                  key: userKey
                };

    mongoClient.connect(url, function(err, db){
        db.collection("users").find({key:req.body.key}).toArray((err,result)=>{
          if(err) return res.stats(400).send();
          if(result.length != 0)
             res.send({'status': false});
          else{
            db.collection("users").insertOne(req.body, function(err, result){

                if(err) return res.status(400).send();
                 console.log(result.ops);

                res.send({'status': true, "id": result.ops[0]._id});
                db.close();
            });
          }
        });

    });
});

app.post("/api/userss", jsonParser, function(req, res){
  if(!req.body) return res.sendStatus(400);

  var userEmail = req.body.email;
  var userPassword = req.body.password;

  var user = {email: userEmail, password: userPassword};
  console.log(user);
  mongoClient.connect(url, function(err, db){
      db.collection("users").find({key:req.body.key}).toArray(function(err, result){
        if(err) return res.status(400).send();
          console.log(result);

          for (let i = 0; i < result.length; ++i) {
            if (CryptoJS.AES.decrypt(result[i].email, result[i].key).toString(CryptoJS.enc.Utf8) === 
                CryptoJS.AES.decrypt(req.body.email, req.body.key).toString(CryptoJS.enc.Utf8) &&
                CryptoJS.AES.decrypt(result[i].password, result[i].key).toString(CryptoJS.enc.Utf8) ===
                CryptoJS.AES.decrypt(req.body.password, req.body.key).toString(CryptoJS.enc.Utf8)) {
              res.send({'status': true, "id": result[i]._id});
              db.close();
              return;
            }
          }

          res.send({'status': false});
          db.close();
      });
  });
});

app.listen(3000, function(){
    console.log("Server starting at host 3000...");
});
