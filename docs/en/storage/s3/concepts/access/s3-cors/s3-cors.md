# {heading(Cross-domain requests (CORS))[id=s3-concepts-cors]}

{include(/en/_includes/_translated_by_ai_en.md)}

CORS (Cross-Origin Resource Sharing) is a mechanism that allows defining rules for handling cross-domain requests. By default, browsers block access if a web application hosted in one domain calls an API for a source located in another domain. This is done to prevent unauthorized access to resources. Thanks to CORS support in the {var(s3)} service, you can bypass this restriction and selectively allow access to your buckets for client web applications hosted in other domains.

You can enable the CORS mechanism for a bucket in two ways:

- {linkto(../../../instructions/access-management/cors#s3-instructions-cors-add)[text=Set]} each CORS rule individually in the personal dashboard.
- {linkto(../../../api/cors#api-spec-s3-cors-request-body)[text=Upload an XML configuration]} of all CORS rules at once using the API.

{note:warn}
When using the second method, the existing CORS configuration is overwritten. This means that rules previously added in the personal dashboard will be lost.
{/note}

Each bucket has its own CORS rules configured, which specify the following parameters:

- `AllowedOrigins` — domains from which requests to the bucket are allowed.
- `AllowedMethods` — HTTP methods allowed in requests.
- (Optional) `MaxAgeSeconds` — time in seconds during which the user's browser can cache the results of a {linkto(#s3-concepts-cors-request)[text=preflight request]}.
- (Optional) `AllowedHeaders` — headers allowed in requests.
- (Optional) `ExposeHeaders` — headers that will be available to the user in the response to a request.

## {heading(Features of CORS requests)[id=s3-concepts-cors-request]}

A CORS request is an HTTP request containing the `Origin` header. This header specifies the domain of the request initiator. If a CORS request may lead to data modification, it is considered unsafe and is executed in two stages:

- A preflight request, which checks the CORS restrictions for the requested resource.
- The main request, aimed at retrieving the resource.

The preflight request uses the `OPTIONS` method and contains the parameters of the main request: headers, HTTP method, and domain (`Origin`).

When {var(s3)} receives a preflight request from a browser, it analyzes the CORS configuration for the requested bucket and can accept or reject the request. For the request to be accepted, the following conditions must be met:

- The domain specified in the `Origin` header must be included in the `AllowedOrigins` list in the bucket's CORS configuration.
- The HTTP method specified in the request must be included in the `AllowedMethods` list in the bucket's CORS configuration.
- The headers specified in the request must match the headers in the `AllowedHeaders` list in the bucket's CORS configuration.

If the preflight request is rejected, the browser blocks sending the main request.

If the preflight request is accepted, {var(s3)} returns information about the bucket's CORS configuration. The browser can store this information in the cache for the period specified in the `MaxAgeSeconds` parameter of the CORS configuration.

Caching responses to preflight requests can significantly improve performance when working with {var(s3)}, as it reduces the number of required requests. When a repeated request is made to the same bucket, a preflight request will not be needed if the bucket's CORS configuration data is already in the browser's cache.