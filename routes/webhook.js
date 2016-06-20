var express = require('express');
var router = express.Router();
var queue_job = require('../lib/queue-job');

router.post('/', function(req, res) {
    queue_job(req.body)
    res.set('Content-Type', 'application/json')
	.set(201)
	.send('{ status: "OK" }');
});

module.exports = router;
