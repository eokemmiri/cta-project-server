const axios = require('axios');

const CTA_API_KEY = process.env.CTA_API_KEY;

async function getDirections(routeId) {
    if (!routeId) {
        throw new Error('Route ID is required');
    }

    const baseURL = `http://www.ctabustracker.com/bustime/api/v2/getdirections`;
    const params = {
        key: CTA_API_KEY,
        rt: routeId, // Route ID for which to fetch directions
        format: 'json',
    };

    try {
        const response = await axios.get(baseURL, { params });
        if (response.data && response.data['bustime-response']) {
            return response.data['bustime-response'].directions || [];
        }
        throw new Error('Unexpected API response structure');
    } catch (error) {
        console.error('Error in getDirections function:', error.message);
        throw error;
    }
}

module.exports = getDirections;
