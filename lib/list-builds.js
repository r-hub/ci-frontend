
var pg = require('pg');
var db = process.env.DATABASE_URL;

function list_builds(user, repo, callback) {
    pg.connect(db, function(err, client, done) {
	if (err) { done(client); return callback(err); }

	var slug = user + '/' + repo;

	client.query(
	    'SELECT * FROM repositories r ' +
		'JOIN jobs j ON r.repo_id = j.repo_id ' +
		'JOIN job_status s ON s.job_id = j.job_id ' +
		'WHERE r.slug = $1 ' +
		'ORDER BY submitted_at DESC ' +
		'LIMIT 10',
	    [ slug ],
	    function(err, result) {
		done();
		if (err) { return callback(err); }
		callback(null, result['rows']);
	    }
	);
    });
}

module.exports = list_builds;
