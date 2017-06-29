
var express = require('express');
var router = express.Router();
//request api_key from config file
const weatherConfig = require('../config/weather')

/* Get the weather of a specific location */
router.get('/:name', function(req, res, next) {
    let str = req.params.name;
    var temp = new Array();
    var temp = str.split(',')
    console.log(temp)
    console.log(temp[0])
    var Wunderground = require('wunderground-api');
    var client = new Wunderground(weatherConfig.api_key);
    var opts = {
        city: temp[0],
        state: temp[1]
    }
    client.conditions(opts, function(err, data) {
        if (err) throw err;
        else {
            console.log(data.weather);
            res.send(data.weather);
        }
    });
});

/* home page*/
router.get('/', function(req, res, next) {

    var Wunderground = require('wunderground-api');
    var client = new Wunderground(weatherConfig.api_key);
    var opts = {
        city: 'Boston',
        state: 'MA'
    }

    client.conditions(opts, function(err, data) {
        if (err) throw err;
        else {
            console.log(data.weather);
            res.send(data.weather);
        }
    });


});

module.exports = router;