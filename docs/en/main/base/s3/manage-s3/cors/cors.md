## General information

CORS (Cross-Origin Resource Sharing) is a resource sharing technology between different origins that allows you to determine how client web applications loaded in one domain interact with resources in another domain.

In other words, it is a mechanism that uses additional HTTP headers to allow the user agent to obtain permissions to access selected resources from a server on an origin (domain) other than what the site is currently using.

CORS supports cross-domain requests and the transfer of data between the browser and web servers over a secure connection. Modern browsers use CORS in container APIs like XMLHttpRequest or Fetch to mitigate the risks inherent in requests from other sources.

## Usage scenarios

The use cases for CORS technology are listed below.

- **Scenario #1**. For example, personal resources host a website in a bucket called website. Users load the site endpoint URL. It now becomes necessary to use JavaScript on web pages stored in this bucket to send authenticated GET and PUT requests to the same bucket using the bucket service API endpoint. Normally, the browser will prevent JavaScript from executing to allow such requests, but using CORS technology, you can set up a bucket so that cross-origin requests are allowed from the website.
- **Scenario #2**. For example, you need to place a web font from a service bucket on your resources. Browsers are required to perform CORS checks (preflight) to load web fonts, so the bucket hosting the web font must be configured to allow requests from any origin.

## Create a CORS rule

The "Object storage" service supports the technology of cross-domain requests for resources in a bucket. You can create a rule on the CORS tab of an open bucket.

Where:

- AllowedOrigins - a website from which cross-domain requests to the bucket are allowed. Can contain at most one \* character.
- AllowedMethods - HTTP method allowed to be used for cross-domain request. You can use multiple methods in one rule.
- MaxAgeSeconds — time in seconds during which the browser caches the result of a request to an object using the options method.
- AllowedHeaders — allowed header in the request to the object. A single \* character can be used in the header name to define a pattern. Object storage matches the headers passed in Access-Control-Request-Headers to the AllowedHeaders set and responds to options with a list of allowed ones.
- ExposeHeaders - header allowed to be displayed in a JavaScript application in a browser. In a request to an object, the JavaScript client can only operate on the headers defined in the ExposeHeaders elements.

If necessary, you can add multiple parameter values ​​in the rules configurator.
