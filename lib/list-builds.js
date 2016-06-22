
var time_ago = require('time-ago')();
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
		callback(null, postprocess(result['rows']));
	    }
	);
    });
}

function postprocess(builds) {
    return builds.map(interpret_status)
	.map(to_time_ago);
}

function interpret_status(build) {
    if (build.status.indexOf('failure') > -1) {
	build.panelclass = 'panel-danger';
    } else if (build.status.indexOf('preparation') > -1) {
	build.panelclass = 'panel-warning';
    } else if (build.status.indexOf('running') > -1) {
	build.panelclass = 'panel-warning';
    } else {
	build.panelclass = 'panel-success';
    }
    return build;
}

function to_time_ago(build) {
    build.committed_at_ago = time_ago.ago(build.committed_at);
    build.submitted_at_ago = time_ago.ago(build.submitted_at);
    return build;
}

module.exports = list_builds;
