
var express = require('express');
var router = express.Router();

router.get("/builds", function(req, res) {

    var builds = [
	{ repo_id: 1,
	  slug: 'r-hub/citest',
	  job_id: 3,
	  branch: 'master',
	  sha: 'cd72ffee66c7ed41ec741ef7bfa96fc60fa32fa0',
	  message: 'Declare UTF-8 encoding',
	  committed_at: new Date('Mon Jun 20 2016 16:26:50 GMT+0000 (UTC)'),
	  author_name: 'Gábor Csárdi',
	  author_email: 'csardi.gabor@gmail.com',
	  committer_name: 'Gábor Csárdi',
	  committed_email: 'csardi.gabor@gmail.com',
	  pr: false,
	  pr_number: '0',
	  submitted_at: new Date('Tue Jun 21 2016 23:37:54 GMT+0000 (UTC)'),
	  status: [ 'success' ] },
	{ repo_id: 1,
	  slug: 'r-hub/citest',
	  job_id: 2,
	  branch: 'master',
	  sha: 'cd72ffee66c7ed41ec741ef7bfa96fc60fa32fa0',
	  message: 'Declare UTF-8 encoding',
	  committed_at: new Date('Mon Jun 20 2016 16:26:50 GMT+0000 (UTC)'),
	  author_name: 'Gábor Csárdi',
	  author_email: 'csardi.gabor@gmail.com',
	  committer_name: 'Gábor Csárdi',
	  committed_email: 'csardi.gabor@gmail.com',
	  pr: false,
	  pr_number: '0',
	  submitted_at: new Date('Tue Jun 21 2016 23:27:35 GMT+0000 (UTC)'),
	  status: [ 'success' ] }
    ];

    res.render('builds', { 'user': 'r-hub',
			   'repo': 'citest',
			   'builds': builds });
});

module.exports = router;
