/* Request project dependencies*/
const express = require('express');
const cors = require('cors');

// Import routes
const routes = require('./routes');

// Create an app instance
const app = express();

// Connect all the routes to the application 
app.use('/', routes);

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(cors());

// Initialize the main project folder
app.use(express.static('public/website'));


// Start server 
const PORT = 3000;
const serverCallback = () => {
    console.log(`Server started. Listening on port ${PORT}`);
}

app.listen(PORT, serverCallback);