
var express = require('express');
var router = express.Router();
var update_job = require('../lib/update-job');

function keep(x) {
    return '(' + x + ')';
}

var re_id = '[0-9]+';
var re_status = '[A-Za-z]+';
var re_time = '[-a-zA-Z0-9:\\.]+';
var re = '^/' + keep(re_id) + '/' + keep(re_id) + '/' +
    keep(re_status) + '/' + keep(re_time) + '$';

router.get(new RegExp(re), function(req, res) {
    var job = req.params[0];
    var build = req.params[1];
    var status = req.params[2];
    var timestamp = req.params[3];

    res.set('Content-Type', 'application/json')

    update_job(job, build, status, timestamp, function(err) {
	if (err) {
	    res.set(500)
		.send({ 'status': 'error', 'error': JSON.stringify(err) });
	} else {
	    res.send({ 'status': 'OK' });
	}
    });
})

module.exports = router;
