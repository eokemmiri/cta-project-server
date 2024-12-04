require('dotenv').config();
const express = require('express');
const getRoutes = require('./getRoutes');
const getStops = require('./getStops');

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

// Define a route to fetch CTA stops information
app.get('/stops', async (req, res) => {
    try {
        const rt = req.query.rt;
        const dir = req.query.dir;
        const routes = await getStops(rt, dir);
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
