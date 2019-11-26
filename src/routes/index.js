const express = require('express');
const request = require('request');

// Create the router
const router = express.Router(); 

/* Open weather map credentials */
const OWM_APIKEY = '{your_key}';
const OWM_URL = 'http://api.openweathermap.org/data/2.5/weather?'

const getWeatherData = (url = '') => {
    const response = request(url, {json: true}, (err, res, body) => {
        if(err) {
            console.log(error);
            return error; 
        }
        return body;
    });
    return response;
}

router.route('/weather')
    .get((req, res) => {
        request({
            method: 'GET',
            uri: OWM_URL+'zip=33166&'+OWM_APIKEY      
        }, (error, response, body) => {
            if(!error && response.statusCode === 200) {
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

module.exports = router;