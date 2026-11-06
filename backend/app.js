const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const db = require('./configs/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Startup check only logs; the app keeps running and the pool retries later.
if (process.env.NODE_ENV !== 'test') {
   db.getConnection((err, conn) => {
      if (err) {
         console.error('Error connecting to MySQL: ' + err.message);
         return;
      }
      console.log('Connected to MySQL Database');
      conn.release();
   });
}

// Health check for the load balancer (does not touch the database)
app.get('/api/health', (req, res) => {
   res.status(200).json({ status: 'ok' });
});

app.use('/api', routes);

module.exports = app;