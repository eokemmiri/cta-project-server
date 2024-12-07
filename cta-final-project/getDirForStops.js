const cta_db = require('./ctadb');

async function getDirForStops(routeId, startStop, endStop) {
    return new Promise((resolve, reject) => {
        const query = `SELECT stopid, stopnm, direction FROM teststops WHERE stopid IN (?, ?)`;

        cta_db.query(query, [startStop, endStop], (err, results) => {
            if (err) {
                console.error('Error querying teststops:', err.message);
                return reject(err);
            }

            if (results.length === 2) {
                const [stop1, stop2] = results;
                if (stop1.direction === stop2.direction) {
                    return resolve({
                        direction: stop1.direction,
                        message: `To travel from "${stop1.stopnm}" to "${stop2.stopnm}", take the '${stop1.direction}' direction.`,
                    });
                }
            }

            reject(new Error(`Stops "${startStop}" and "${endStop}" are not on the same route or direction.`));
        });
    });
}

module.exports = getDirForStops;
