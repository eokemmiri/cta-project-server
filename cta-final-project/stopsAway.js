const photoapp_db = require('./ctadb.js');

function query_database(db, sql) {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function getStopsAway (currentStop, direction, destinationStop) {
    const tableName = `${direction}stops`;

    if (!(currentStop || direction || destinationStop)) {
        throw new Error('Current stop, direction and Destination stop parameters are required');
    }

  try {
    let currentStopQuery = `SELECT id FROM ${tableName} WHERE stopid = '${currentStop}'`;
    let currentStopResult = await query_database(photoapp_db, currentStopQuery);
    
    if (currentStopResult.length === 0) throw new Error("Current stop not found.");

    let currentStopId = currentStopResult[0].id;
    let destinationStopQuery = `SELECT id FROM ${tableName} WHERE stopid = '${destinationStop}'`;
    let destinationStopResult = await query_database(photoapp_db, destinationStopQuery);
    
    if (destinationStopResult.length === 0) throw new Error("Destination stop not found.");
    
    let destinationStopId = destinationStopResult[0].id;
    return Math.abs(destinationStopId - currentStopId);
  } catch (err) {
    throw new Error(`Error calculating stops away: ${err.message}`);
  }
};






// const axios = require('axios');

// const CTA_API_KEY = process.env.CTA_API_KEY;

// async function getStopsAway(route, currentStop, direction, destinationStop) {
//     try {
//         if (!(route || currentStop || direction || destinationStop)) {
//             throw new Error('Route and direction parameters are required');
//         }

//         const baseURL = `http://www.ctabustracker.com/bustime/api/v2/getstops`;
//         const params = {
//             key: CTA_API_KEY,
//             rt: route,
//             dir: direction,
//             format: 'json',
//         };

//         try {
//             const response = await axios.get(baseURL, { params });
//             if (response.data && response.data['bustime-response']) {
//                 return response.data['bustime-response'].stops || response.data['bustime-response'].error;
//             }
//             throw new Error('Unexpected API response structure');
//         } catch (error) {
//             console.error('Error in stopsAway function:', error.message);
//             throw error;
//         }

//     } catch (error) {
//         console.error(error.message);
//         throw error;
//     }
    

// }

module.exports = getStopsAway;
