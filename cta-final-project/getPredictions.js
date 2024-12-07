const axios = require('axios');
const cta_db = require('./ctadb.js')

const CTA_API_KEY = process.env.CTA_API_KEY;

async function getPredictions(stopId) {

    // Ensure stopId is provided
    if (!stopId) {
        throw new Error('Stop ID is required');
    }

    const baseURL = `http://www.ctabustracker.com/bustime/api/v2/getpredictions`;
    const params = {
        key: CTA_API_KEY,
        stpid: stopId,
        rt: "201",
        format: 'json',
    };



    try {
        const response = await axios.get(baseURL, { params });
        if (response.data && response.data['bustime-response']) {
            // return response.data['bustime-response'].prd || [];
            console.log('Raw API response:', response.data); // Log raw response to debug

            const predictions = response.data['bustime-response'].prd || [];

            if (predictions.length === 0) {
                return {
                    stop_id: stopId,
                    stop_name: 'Unknown stop',
                    predictions: [],
                    message: 'No predictions available at this time.',
                };
            }

            // Format and return a simpler response
            const formattedPredictions = predictions.map(prediction => ({
                // bus_id: prediction.vid,
                predicted_arrival: prediction.prdtm,
                bus_arival_minutes: prediction.prdctdn,
                route: `${prediction.rt} ${prediction.rtdir}`,
                // stop_name: prediction.stpnm,
                destination: prediction.des,
            }));

            return {
                stop_id: stopId,
                stop_name: predictions[0].stpnm,
                predictions: formattedPredictions,
            };
        }
        
        throw new Error('Unexpected API response structure');
    } 
    
    
    catch (error) {
        console.error('Error in getPredictions function:', error.message);
        throw error;
    }
}

module.exports = getPredictions;


