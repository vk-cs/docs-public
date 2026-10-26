# {heading(Uneven traffic distribution)[id=vnet-uneven-traffic-distribution]}

{include(/en/_includes/_translated_by_ai_en.md)}

Uneven traffic distribution may be related to the balancing algorithm.

### {heading(Solution)[id=vnet-uneven-traffic-distribution-resolve]}

If the `SOURCE_IP` algorithm is selected, requests from a single client always go to one server. For even distribution, use the `ROUND_ROBIN` or `LEAST_CONNECTIONS` algorithm.