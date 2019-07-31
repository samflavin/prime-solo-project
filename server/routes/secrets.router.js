const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user.clearance_level);
    let query = `SELECT * FROM "secret" WHERE "secrecy_level" <= $1;`;
    let values = [req.user.clearance_level];
    pool.query(query, values)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
});

module.exports = router;