

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs591');

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("we're connected!")
});

const Schema = mongoose.Schema
const length_schema = new Schema({
    name: String,
    length: Number
})

const people = mongoose.model('users', length_schema)

//GET Fetch all users
router.get('/', function (req, res, next) {
    people.find({}, function (err, results) {
        res.json(results);
    })

})

//GET Fetch single user, match /hw2/Frank
router.get('/:_name', function (req, res, next) {

    people.find({name: req.params._name}, function (err, results) {
        if (Object.keys(results).length === 0){
            let str = req.params._name;
            let len = str.length;

            //const NewString = new people ( {name: str, length: len})

            const NewString = new people({
                name: str,
                length: len
                });

            NewString.save(function(err){
                if (err) {res.send(err)}
                else{
                    res.send(JSON.stringify({string: str, length: len}));
                }
            })
        }

        else {res.json({string: results[0].name, length: results[0].length});}
    })
})

// POST Create a new user
router.post('/', function(req, res, next) {
    if(req.body.name) {

        people.find({name: req.body.name}, function (err, results) {
            if (Object.keys(results).length === 0) {
                let str = req.body.name;
                let len = str.length;

                //const NewString = new people ( {name: str, length: len})

                const NewString = new people({
                    name: str,
                    length: len
                });

                NewString.save(function (err) {
                    if (err) {
                        res.send(err)
                    }
                    else {
                        res.send(JSON.stringify({string: str, length: len}));
                    }
                })
            }
            else {
                res.json({string: results[0].name, length: results[0].length});
            }


        })
    }
    else {
            res.json({message:"invalid string"});
        }

})



//DELETE Delete the specified user
router.delete('/:name', function (req, res, next) {
    people.find({name: req.params.name}, function (err, results) {
        if (Object.keys(results).length === 0){
            res.json({message:"No such name"});
        }
        else{
            people.remove({name: req.params.name}, function(err){
                if(err) throw err;
                else res.json({message:"success!"});
                })
        }
    })
});

module.exports = router;