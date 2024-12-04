require('dotenv').config();
const express = require('express');
const getRoutes = require('./getRoutes');
const getDirections = require('./getDirections'); // Import the updated getDirections function

const app = express();
const PORT = 8080;

// CTA route information
// http://localhost:8080/routes
app.get('/routes', async (req, res) => {
    try {
        const routes = await getRoutes();
        res.status(200).json(routes);
    } catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).json({ error: 'Failed to fetch route information' });
    }
});

// CTA directions for a specific route
// http://localhost:8080/directions?routeId=81
app.get('/directions', async (req, res) => {
    const { routeId } = req.query; // Extract routeId from query parameters

    if (!routeId) {
        return res.status(400).json({ error: 'Route ID is required' });
    }

    try {
        const directions = await getDirections(routeId);
        res.status(200).json(directions);
    } catch (error) {
        console.error('Error fetching directions:', error);
        res.status(500).json({ error: 'Failed to fetch directions' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
