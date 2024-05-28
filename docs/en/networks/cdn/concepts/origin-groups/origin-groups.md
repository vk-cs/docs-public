For a CDN resource, an _origin group_ is always configured, even when only one origin of content is used. When content is requested, a CDN server selects an origin according to the options set at the origin group level. Depending on the responses from the selected source, another origin may be chosen.

The following options affect the order in which an origin can be selected from the group when CDN servers request content:

- **Source type**: active or reserve.

  The type of origin. This is specified at the single origin level within the group.

- **Использовать следующий источник из списка при 4XX и 5XX кодах на источнике**.

  This is set at the overall origin group level. The option is available if more than one origin is configured in the group.

The selection of an origin is based on the following rules:

- If the option **Использовать следующий источник из списка при 4XX и 5XX кодах на источнике** is disabled, content is firstly requested from one of the active origins, then from one of the reserve origins.

  The CDN server requests content from one of the reserve origins only if the active origin returns an HTTP status from the 5XX range. If an HTTP status from the 4XX range is received from either active or reserve origins, the CDN server will return an error to the user.

  The active origin is selected based on a round-robin algorithm to provide load balancing.

- If the option **Использовать следующий источник из списка при 4XX и 5XX кодах на источнике** is enabled, the CDN server requests content by moving down the origin list.

  If all origins in the list are active, the CDN server requests content from the first active origin. With HTTP status [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404), [500](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500), [502](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502), [503](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503) or [504](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504), the CDN server will move down the list and request content from the remaining origins.
  
  If there are reserve origins in the list, the CDN server requests content from the first availible origin. Upon receiving an HTTP status from the 4XX or 5XX range, the CDN server will proceed down the list and request content from the remaining origins, according to their type.

  If all origins are unavailable, the CDN server will return the response of the last origin in the list.
