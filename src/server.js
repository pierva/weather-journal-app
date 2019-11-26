/* Request project dependencies*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const routes = require('./routes');


// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Create an app instance
const app = express();

// Connect all the routes to the application 
app.use('/', routes);


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('public/website'));


// Start server 
const PORT = 3000;
const serverCallback = () => {
    console.log(`Server started. Listening on port ${PORT}`);
}

app.listen(PORT, serverCallback);