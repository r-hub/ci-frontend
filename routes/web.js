
var express = require('express');
var router = express.Router();

var list_builds = require('../lib/list-builds');

var re_user = '^/([^/]+)$';
var re_repo = '^/([^/]+)/([^/]+)$';

router.get(new RegExp(re_user), function(req, res) {

});

router.get(new RegExp(re_repo), function(req, res, next) {
    var user = req.params[0];
    var repo = req.params[1];

    list_builds(user, repo, function(err, builds) {
	if (err) { return next(); }
	console.log(builds);
	res.render(
	    'builds',
	    { 'repo': user + '/' + repo, 'builds': builds }
	);
    })
});

module.exports = router;
