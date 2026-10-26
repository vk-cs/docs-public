# {heading(502 Error When Accessing a Resource)[id=vnet-bad-gateway-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

When accessing a CDN resource, the `502 Bad Gateway` error occurs.

This error means that the CDN server could not get a correct response from your origin.

### {heading(Solution)[id=vnet-bad-gateway-problem-resolve]}

1. Check the availability of the origin from the internet. Make sure that the origin does not restrict access from the IP addresses of the {var(cloud)} CDN servers. Contact [technical support](/en/contacts) to get the actual list of IP addresses.
1. {linkto(../../../../networks/cdn/instructions/manage-cdn/origin-settings#cdn-origin-settings-data-source)[text=Make sure]} that the correct IP address or origin domain is specified in the CDN settings. 
1. {linkto(../../../../networks/cdn/instructions/manage-cdn/http-headers#cdn-http-headers-add-request)[text=Check]} the Host header settings (it must match what your web server expects). 
1. Check the firewall on the origin.

If the problem persists, contact [technical support](/en/contacts).