require('dotenv').config();
const express = require('express');
const path = require('path');
const getRoutes = require('./getRoutes');
const getStops = require('./getStops');
const getDirections = require('./getDirections'); 
const getStopsAway = require('./stopsAway');
const getDirForStops = require('./getDirForStops');



const app = express();
const PORT = 8080;

// Serve static files (index.html, script.js)
// http://localhost:8080/index.html
app.use(express.static(path.join(__dirname)));

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


// Stops for a given route and direction
// http://localhost:8080/stops?rt=201&dir=Eastbound
app.get('/stops', async (req, res) => {
    const rt = req.query.rt;
    const dir = req.query.dir;

    if (!rt) {
        return res.status(400).json({ error: 'Route is required' });
    }
    if (!dir) {
        return res.status(400).json({ error: 'Direction is required' });
    }

    try {
        const stops = await getStops(rt, dir);
        res.status(200).json(stops);
    } catch (error) {
        console.error('Error fetching stops:', error);
        res.status(500).json({ error: 'Failed to fetch stops information' });
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


// Stops away for 201 route given a current stop and destination stop
// http://localhost:8080/stopsaway?cstop=14334&dir=Eastbound&dstop=17301
app.get('/stopsaway', async (req, res) => {
    const currentStop = req.query.cstop;
    const destinationStop = req.query.dstop;
    const direction = req.query.dir.toLowerCase();
  
    if (!(currentStop || direction || destinationStop)) {
      return res.status(400).json({ error: 'Current stop, direction and Destination stop parameters are required' });
    }
  
    try {
      const stopsAway = await getStopsAway(currentStop, direction, destinationStop);
      res.status(200).json(stopsAway);
    } catch (error) {
      console.error('Error calculating stops away:', error);
      res.status(500).json({ error: 'Failed to calculate stops away' });
    }
  });

  // getDirForStops (NONTRIVIAL - mir)
  // http://localhost:8080/directions-between-stops?routeId=1&startStop=17295&endStop=14334
  app.get('/directions-between-stops', async (req, res) => {
    const { routeId, startStop, endStop } = req.query;

    if (!routeId || !startStop || !endStop) {
        return res.status(400).json({ error: 'Route ID, start stop, and end stop are required.' });
    }

    try {
        const result = await getDirForStops(routeId, startStop, endStop);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error determining direction for stops:', error.message);
        res.status(500).json({ error: error.message });
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
