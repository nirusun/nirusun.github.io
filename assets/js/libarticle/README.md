# libarticle

Extract the headline, body, author, etc. from a url to an article.

## Dependencies

jQuery.

## Install

Include `libarticle.js` after jQuery.

## Sample usage

```
// url of a page that contains an article
var article_url = 'http://freebeacon.com/issues/seattle-socialist-group-pushing-15hour-minimum-wage-posts-job-with-13hour-wage/'

// make a free diffbot account or ask Kevin
var token = 'ask Kevin for his token';

// for the 'data' argument, libarticle.scrape will pass an object containing data scraped from the aritcle
// see 'Response format' in README
var callback = function (data) {
	console.log(data.objects[0]);
	alert('article scraped');
}

// 'callback' will run when article is scraped
libarticle.scrape(article_url, token, callback);
```

## Response format

The 'data' argument passed to the callback is the exactly what Diffbot returns.

See the **Response** and **Example Response** sections in the [Diffbot documentation](https://www.diffbot.com/dev/docs/article/). 
