var express = require('express');
var router = express.Router();
var db = require('../db');


/* GET users listing. */
router.get('/', function (req, res, next) {
    var collection = db.get().collection('users');
    collection.find({name: 'asaf'}).toArray(function (err, docs) {
        res.send(docs[0]);
    });
});

/* Set users listing. */
router.post('/', function (req, res, next) {

    MongoClient.connect(URL, function (err, db) {
        if (err) return;

        var collection = db.collection('users');
        collection.insert({name: 'asaf', credit: 0}, function (err, result) {
            collection.find({name: 'asaf'}).toArray(function (err, docs) {
                console.log(docs[0]);
                res.send('respond with a resource');
                db.close()
            })
        })
    })
});

module.exports = router;
