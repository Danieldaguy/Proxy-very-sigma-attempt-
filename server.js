const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan'); // For logging
const { URL } = require('url');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined')); // Logging middleware

// Function to validate URL
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

// Proxy endpoint for GET requests
app.get('/proxy', async (req, res) => {
    const { url } = req.query;

    if (!isValidUrl(url)) {
        return res.status(400).send('Invalid URL');
    }

    try {
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        console.error(`Error fetching URL: ${error.message}`);
        res.status(500).send('Error fetching the URL');
    }
});

// Proxy endpoint for POST requests
app.post('/proxy', async (req, res) => {
    const { url, data } = req.body;

    if (!isValidUrl(url)) {
        return res.status(400).send('Invalid URL');
    }

    try {
        const response = await axios.post(url, data);
        res.send(response.data);
    } catch (error) {
        console.error(`Error fetching URL: ${error.message}`);
        res.status(500).send('Error fetching the URL');
    }
});

// Proxy endpoint for PUT requests
app.put('/proxy', async (req, res) => {
    const { url, data } = req.body;

    if (!isValidUrl(url)) {
        return res.status(400).send('Invalid URL');
    }

    try {
        const response = await axios.put(url, data);
        res.send(response.data);
    } catch (error) {
        console.error(`Error fetching URL: ${error.message}`);
        res.status(500).send('Error fetching the URL');
    }
});

// Proxy endpoint for DELETE requests
app.delete('/proxy', async (req, res) => {
    const { url } = req.body;

    if (!isValidUrl(url)) {
        return res.status(400).send('Invalid URL');
    }

    try {
        const response = await axios.delete(url);
        res.send(response.data);
    } catch (error) {
        console.error(`Error fetching URL: ${error.message}`);
        res.status(500).send('Error fetching the URL');
    }
});

// 404 Not Found handler
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});