
var express = require('express');
var router = express.Router();
//request app_key from config file
const eventfulConfig = require('../config/eventful')

//get events from a specified location
router.get('/:event/:location', function(req, res, next) {
    let str = req.params.event;
    let location = req.params.location
    var request = require("request");

    var options = { method: 'GET',
        url: 'http://api.eventful.com/json/events/search',
        qs: { app_key: eventfulConfig.app_key, events: str, l: location }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        jsonBody = JSON.parse(body)
        res.send(jsonBody);
    });

});

/* GET home page. */
//location for this page is hard coded
router.get('/', function(req, res, next) {

    var request = require("request");

    var options = { method: 'GET',
        url: 'http://api.eventful.com/json/events/search',
        qs: { app_key: eventfulConfig.app_key, events: 'outdoors', l: 'boston' },
        headers:
            { 'postman-token': '0ab2bf9d-2d9a-79a8-2a7b-ac52f87d7891',
                'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        jsonBody = JSON.parse(body)
        res.send(jsonBody)
    });


});

module.exports = router;