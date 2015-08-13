# Noun Project Bridge

The [Noun Project](http://nounproject.com) is a really awesome compilation of "over 150,000 icons designed by creators from around the world." To designers, the Noun Project is a godsend. For developers, though, it's another story. The Noun Project allows you to make a GET request for collections of icons as well as individual icons, but the search must be exact. To illustrate what I mean, you can search for something like "hat", and you'll get a bunch of results; however, if you search for "something you put on your head," you'll get no results. 

The Noun Project Bridge is an API that tries to get around the restrictive nature of the native Noun Project API. It's not the cleanest solution, but the idea is this:

If you are on the actual Noun Project website and search "something you put on your head," results will show up! However, these results are being written in by JavaScript -- it's not as simple as making a GET request to this page and then parsing the HTML. So, I'm using PhantomJS to get the search page and then parse the DOM. 

The URL for this API is http://nounproject-bridge.herokuapp.com/

There are 4 endpoints (all are GET):

**GET**

`/top/:search/`

Get the top search result for {search}

**GET**

`/top/:search/:numberOfResults`

Get the top {numberOfResults} search results for {search}

**GET**

`/random/:search`

Get one random search result for {search}

**GET**

`/random/:search/:numberOfResults`

Get {numberOfResults} random search results for {search}

###NOTES

- All responses will be in one of the following two JSON formats (depending on whether you wanted multiple images or not):
```
{ "query": <search>, "image": <image URL>}
{ "query": <search>, "images": <[array of image URLs]> }
```
- If numberOfResults is greater than the total number of images on the page, then the request will just return all the images on the page.
- If there is no image on the page, then the "image" field in the JSON response will be null. 
