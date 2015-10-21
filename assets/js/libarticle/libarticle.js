// requires jQuery

var libarticle = (function () {
	var returnObject = new Object();
	returnObject.scrape = function(article_url, token, callback) {
		var format_request = function(article_url, token) {
			return 'http://api.diffbot.com/v3/article?token=' + token + '&url=' + article_url;
		};
		var url = format_request(article_url, token);

		jQuery.get(url, callback);
	};
	return returnObject
})();
