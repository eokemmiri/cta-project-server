require('dotenv').config();
const express = require('express');
const getRoutes = require('./getRoutes');

const app = express();
const PORT = 8080;

// Define a route to fetch CTA route information
app.get('/routes', async (req, res) => {
    try {
        const routes = await getRoutes();
        res.status(200).json(routes);
    } catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).json({ error: 'Failed to fetch route information' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
