// Import the express library
const express = require('express');

// Create an instance of express
const app = express();

// Define the port to listen on
const PORT = process.env.PORT || 8100;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Setup a default fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Define a route for the root URL
app.get('/', async (req, res) => {
    try {
        const response = await fetch('https://api.spacexdata.com/v5/launches');
        const data = await response.json();

        res.render('index', { message: 'Hello from EJS!', launches: data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
