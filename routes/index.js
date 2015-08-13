var express = require('express');
var router = express.Router();
var phantom = require('phantom');

/* GET home page. */
router.get('/:search', function(req, res, next) {
	var urlSearch = req.params.search.split(' ').join('+');
	var url = 'http://thenounproject.com/search/?q=' + urlSearch;
	phantom.create(function (ph) {
		ph.createPage(function (page) {
			page.open(url, function (status) {
				page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js", function() {
					page.evaluate(function() {
						var image = $($('.Grid-cell').get(0)).find('img').attr('src');
						return image;
					}, function (result) {
						var object = {
							"query": req.params.search,
							"image": result
						};
						res.send(object);
					});
				});
			});
		});
	});
});

module.exports = router;
