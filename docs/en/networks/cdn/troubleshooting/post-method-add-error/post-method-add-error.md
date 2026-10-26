# {heading(Error when adding POST to the list of allowed methods)[id=vnet-port-unavailability]}

{include(/en/_includes/_translated_by_ai_en.md)}

An error occurs when adding POST to the list of allowed HTTP methods. The POST method is generally not cacheable and is often excluded from the lists of allowed methods for CDN caching.

### {heading(Solution)[id=vnet-port-unavailability-decision]}

If you are configuring the list of methods that are proxied to the origin, the POST method cannot be added to the caching settings.