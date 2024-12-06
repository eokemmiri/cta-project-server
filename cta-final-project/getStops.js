const axios = require('axios');

const CTA_API_KEY = process.env.CTA_API_KEY;

async function getStops(route, direction) {
    if (!route || !direction) {
        throw new Error('Route and direction parameters are required');
    }

    const baseURL = `http://www.ctabustracker.com/bustime/api/v2/getstops`;
    const params = {
        key: CTA_API_KEY,
        rt: route,
        dir: direction,
        format: 'json',
    };

    try {
        const response = await axios.get(baseURL, { params });
        if (response.data && response.data['bustime-response']) {
            return response.data['bustime-response'].stops || response.data['bustime-response'].error;
        }
        throw new Error('Unexpected API response structure');
    } catch (error) {
        console.error('Error in getStops function:', error.message);
        throw error;
    }
}

module.exports = getStops;
