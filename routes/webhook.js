var express = require('express');
var router = express.Router();
var queue_job = require('../lib/queue-job');

router.post('/', function(req, res, next) {

    // Drop non-push events
    var event = req.get('X-GitHub-Event');
    if (event !== 'push') {
	res.set(200)
	    .send('{ "status": "OK" }');
	return;
    }

    queue_job(req.body)
    res.set('Content-Type', 'application/json')
	.set(201)
	.send('{ "status": "OK" }');
});

module.exports = router;
