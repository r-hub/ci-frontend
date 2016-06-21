
var pg = require('pg');
var db = process.env.DATABASE_URL;

function update_job(job_id, build_id, status, timestamp, callback) {
    var status_map = { 'START': 'running',
		       'SUCCESS': 'success',
		       'FAILURE': 'failure',
		       'UNSTABLE': 'failure',
		       'ABORTED': 'failure'};

    var db_status = status_map[status] || 'unknown';

    pg.connect(db, function(err, client, done) {
	if (err) { done(client); return callback(err); }
	var q, args;

	if (status == 'START') {
	    q = 'UPDATE builds SET status = $1, started_at = $2 ' +
		'WHERE build_id = $3';
	    args = [ db_status, timestamp, build_id ];

	} else {
	    q = 'UPDATE builds SET status = $1, finished_at = $2 ' +
		'WHERE build_id = $3';
	    args = [ db_status, timestamp, build_id ];
	}

	client.query(q, args, function(err, result) {
	    done();
	    return callback(err, result);
	});
    });
}

module.exports = update_job;
