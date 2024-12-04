const axios = require('axios');

const CTA_API_KEY = process.env.CTA_API_KEY;

async function getRoutes() {
    const baseURL = `http://www.ctabustracker.com/bustime/api/v2/getroutes`;
    const params = {
        key: CTA_API_KEY,
        format: 'json',
    };

    try {
        const response = await axios.get(baseURL, { params });
        if (response.data && response.data['bustime-response']) {
            return response.data['bustime-response'].routes || [];
        }
        throw new Error('Unexpected API response structure');
    } catch (error) {
        console.error('Error in getRoutes function:', error.message);
        throw error;
    }
}

module.exports = getRoutes;
