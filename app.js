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

const session = [];

mongoClient.connect(url, (err, db) => {
    db.collection('tokens').find().toArray((err, result) => {
        if (err) {
            console.log('Ошибка загрузки токенов');
            return;
        }

        result.forEach((data) => {
            session.push(data);
        });
    });
});

//app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname));
app.use(cookieParser());

app.get('/', function (req, res) {
    for (let i = 0; i < session.length; ++i) {
        if (CryptoJS.SHA256(session[i].id).toString() === CryptoJS.SHA256(req.cookies.id).toString() &&
            CryptoJS.SHA256(session[i].token).toString() === CryptoJS.SHA256(req.cookies.token).toString()) {
            res.redirect('/main');
            console.log('redirect to main');
            return;
        }
    }
    console.log('send file index.html');
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/main', function (req, res) {
    for (let i = 0; i < session.length; ++i) {
        if (CryptoJS.SHA256(session[i].id).toString() === CryptoJS.SHA256(req.cookies.id).toString() &&
            CryptoJS.SHA256(session[i].token).toString() === CryptoJS.SHA256(req.cookies.token).toString()) {
            res.sendFile(__dirname + '/public/main.html');
            console.log('send file main.html');
            return;
        }
    }
    console.log('redirect to login');
    res.redirect('/login');
});

app.get('/login', function (req, res) {
    for (let i = 0; i < session.length; ++i) {
        if (req.cookies.id && req.cookies.token && 
            CryptoJS.SHA256(session[i].id).toString() === CryptoJS.SHA256(req.cookies.id).toString() &&
            CryptoJS.SHA256(session[i].token).toString() === CryptoJS.SHA256(req.cookies.token).toString()) {
            res.redirect('/main');
            console.log('redirect to main');
            return;
        }
    }
    console.log('send file logout.html');
    res.sendFile(__dirname + '/public/logout.html');
});

app.post("/api/users", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const key = CryptoJS.SHA256(req.body.email).toString();

    const password = CryptoJS.SHA256(req.body.password).toString();

    delete req.body.password;

    for (let field in req.body) {
        req.body[field] = CryptoJS.AES.encrypt(req.body[field], key).toString();
    }

    req.body.password = password;
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

                    const date = new Date();

                    const token = jwt.sign({
                        name: req.body.name,
                        surname: req.body.surname,
                        patronymic: req.body.patronymic,
                        date: date.toUTCString(),
                        key: key,
                        email: req.body.email,
                        group: req.body.group
                    }, secret);

                    const id = result.ops[0]._id.toString();

                    session.push({id:id, token:token});

                    db.collection('tokens').insertOne({token: token,id:id}, (err, resultToken) => {
                        db.close();
                        res.send({'status': true, "id": id, 'token': token});
                    });
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

            let isOk = false;
            for (let i = 0; i < result.length && !isOk; ++i) {
                if (CryptoJS.AES.decrypt(result[i].email, result[i].key).toString(CryptoJS.enc.Utf8) === 
                    req.body.email &&
                    result[i].password === CryptoJS.SHA256(req.body.password).toString()) {
           
                        const date = new Date();

                        const token = jwt.sign({
                            name: result[0].name,
                            surname: result[0].surname,
                            patronymic: result[0].patronymic,
                            date: date.toUTCString(),
                            key: result[0].key,
                            email: result[0].email,
                            group: result[0].group
                        }, secret);

                        session.push({id:result[0]._id.toString(),token:token});

                        isOk = true;

                        db.collection('tokens').insertOne({id:result[0]._id.toString(),token:token}, (err, resultToken) => {
                            res.send({'status': true, "id": result[i]._id.toString(), 'token': token});
                            db.close();
                        });
                }
            }
            if (!isOk) {
                res.send({'status': false});
                db.close();
            }
        });
    });
});

app.post('/api/logout', (req, res) => {
    for (let i = 0; i < session.length; ++i) {
        if (session[i].id === req.cookies.id && session[i].token === req.cookies.token) {
            session.splice(i, 1);
        }
    }
    mongoClient.connect(url, (err, db) => {
        db.collection('tokens').remove({id:req.cookies.id,token:req.cookies.token});
    });
    res.end();
});

app.listen(3000, function(){
    console.log("Server starting at host 3000...");
});
