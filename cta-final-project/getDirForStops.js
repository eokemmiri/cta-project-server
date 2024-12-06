const cta_db = require('./ctadb');

async function getDirForStops(routeId, startStop, endStop) {
    return new Promise((resolve, reject) => {
        const eastboundQuery = `SELECT * FROM eastboundstops WHERE stopid IN (?, ?)`;
        const westboundQuery = `SELECT * FROM westboundstops WHERE stopid IN (?, ?)`;

        cta_db.query(eastboundQuery, [startStop, endStop], (err, eastboundResults) => {
            if (err) {
                console.error('Error querying eastbound stops:', err.message);
                return reject(err);
            }

            if (eastboundResults.length === 2) {
                return resolve({
                    direction: 'Eastbound',
                    message: `To travel from "${startStop}" to "${endStop}", take the 'Eastbound' direction.`,
                });
            }

            cta_db.query(westboundQuery, [startStop, endStop], (err, westboundResults) => {
                if (err) {
                    console.error('Error querying westbound stops:', err.message);
                    return reject(err);
                }

                if (westboundResults.length === 2) {
                    return resolve({
                        direction: 'Westbound',
                        message: `To travel from "${startStop}" to "${endStop}", take the 'Westbound' direction.`,
                    });
                }

                reject(new Error(`Stops "${startStop}" and "${endStop}" are not on the same route or direction.`));
            });
        });
    });
}

module.exports = getDirForStops;
