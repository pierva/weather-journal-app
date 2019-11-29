const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

// Require and configure dotenv for env variables 
require('dotenv').config();

// Create the router
const router = express.Router(); 

// Setup empty JS object to temporary hold all the data
projectData = {};

/* Open weather map credentials */
const OWM_APIKEY = '&appid=' + process.env.OWM_APIKEY;
const OWM_URL = 'http://api.openweathermap.org/data/2.5/weather?';

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.route('/weather')
    .get((req, res) => {
        const zip = req.query.zip;
        // Validation check for request without zip code
        if(!zip) return res.send({error: 'No zip code provided'})
        request({
            method: 'GET',
            uri: OWM_URL+'zip=' + zip + OWM_APIKEY      
        }, (error, response, body) => {
            if(!error && response.statusCode === 200) {
                // Update the local object with the weather data
                projectData['weather'] = JSON.parse(body);

                // Everything went well, return the json data
                return res.send(body);
            } 
            else if (!error) {
                // Erorr with the API call
                return res.send(body);
            }
            else {
                // Error in the server
                return res.send(error);
            }
        });
    });

router.route('/postdata')
    .post((req, res) => {
        // add data to the projectData object
        projectData = {...projectData, ...req.body}
        return res.send(projectData);
    });


module.exports = router;