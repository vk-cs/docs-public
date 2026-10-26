1. Set the values of the basic parameters on the **Basic** tab:

   - **AllowedOrigins** — a list of URLs from which access to the bucket is allowed. You can use the `*` character to define a pattern.
   - **AllowedMethods** — a list of methods allowed in requests to bucket objects. Available values: `GET`, `PUT`, `HEAD`, `POST`, `DELETE`.
   - (Optional) **MaxAgeSeconds** — the time, in seconds, during which the browser caches the response for the specified URL.

1. (Optional) Set the values of the headers on the **Headers** tab:

   - **AllowedHeaders** — a list of headers allowed in requests to bucket objects. You can use the `*` character to define a pattern.
   - **ExposeHeaders** — a list of headers in the response that users will be able to access from their applications.
