const { Pool } = require('pg');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '';
const myURI = 'postgres://jdymmbqm:hE7Qhbl2Xo015d9Poa9J4_XRQK7sti7c@kashin.db.elephantsql.com/jdymmbqm';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});



module.exports = null; // <-- export your model
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};