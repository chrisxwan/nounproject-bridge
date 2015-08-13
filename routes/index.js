var express = require('express');
var router = express.Router();
var phantom = require('phantom');

/* GET home page. */
router.get('/top/:search', function(req, res, next) {
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

router.get('/top/:search/:number', function(req, res, next) {
	var urlSearch = req.params.search.split(' ').join('+');
	var url =  'http://thenounproject.com/search/?q=' + urlSearch;
	var number = parseInt(req.params.number);
	phantom.create(function (ph) {
		ph.createPage(function (page) {
			page.open(url, function (status) {
				page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js", function() {
					page.evaluate(function(number) {
						var imagesArray = [];
						var images = $('.Grid-cell');
						var iterator = Math.min(number, images.length);
						for(i = 0; i < iterator; i++) {
							imagesArray.push($($(images).get(i)).find('img').attr('src'));
						}
						return imagesArray;
					}, function (result) {
						var object = {
							"query": req.params.search,
							"images": result
						};
						res.send(object);
					}, number);
				});
			});
		});
	});
});

router.get('/random/:search', function(req, res, next) {
	var urlSearch = req.params.search.split(' ').join('+');
	var url =  'http://thenounproject.com/search/?q=' + urlSearch;
	phantom.create(function (ph) {
		ph.createPage(function (page) {
			page.open(url, function (status) {
				page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js", function() {
					page.evaluate(function() {
						var images = $('.Grid-cell');
						var random = Math.floor(Math.random() * images.length);
						var image = $($(images).get(random)).find('img').attr('src');
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

router.get('/random/:search/:number', function(req, res, next) {
	var urlSearch = req.params.search.split(' ').join('+');
	var url =  'http://thenounproject.com/search/?q=' + urlSearch;
	var number = parseInt(req.params.number);
	phantom.create(function (ph) {
		ph.createPage(function (page) {
			page.open(url, function (status) {
				page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js", function() {
					page.evaluate(function(number) {
						var imagesArray = [];
						var images = $('.Grid-cell');
						var iterator = Math.min(number, images.length);
						var used = [];
						for(i = 0; i < iterator; i++) {
							var random = Math.floor(Math.random() * images.length);
							while(used.indexOf(random) !== -1) {
								random = Math.floor(Math.random() * images.length);
							}
							used.push(random);
							imagesArray.push($($(images).get(random)).find('img').attr('src'));
						}
						return imagesArray;
					}, function (result) {
						var object = {
							"query": req.params.search,
							"images": result
						};
						res.send(object);
					}, number);
				});
			});
		});
	});
});





module.exports = router;
