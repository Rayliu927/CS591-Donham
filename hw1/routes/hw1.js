/**
 * Created by mac on 6/4/17.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("This is hw1");
});

router.get('/:name', function (req, res, next) {
    let theName = req.params.name
    res.send(JSON.stringify({"string": theName, "length": theName.length}))
//    next()
});

router.post('/:name', function (req, res, next) {
    let theName = req.params.name
    res.send(JSON.stringify({"string": theName, "length": theName.length}))
});


module.exports = router;