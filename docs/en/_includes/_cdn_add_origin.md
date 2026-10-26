1. Click ![plus-icon](/en/assets/plus-icon.svg "inline") **Add source**.
1. Specify the origin address — the URL that the CDN resource will use to access the origin. Requirements for the address:

   - The URL may only contain Latin letters, numbers, and special characters `.`, `-`.
   - The URL must not contain a scheme (`http://` or `https://`): it is already added automatically as `http(s)://`. The specific protocol is determined by the corresponding parameter set by the **Source interaction protocol** option when {linkto(/en/networks/cdn/instructions/create-resource#cdn-create-resource)[text=creating]} or editing a CDN resource.
   - Only a domain name (FQDN) can be passed in the URL.
   - The maximum length of the entire URL is 255 characters. The maximum length of a subdomain is 63 characters.

   {cut(Examples)}

   - `example.org`,
   - `images.example.com`.
      
   {/cut}

1. Specify the type of origin: active or reserve.

   This option affects the order in which the origin is selected when CDN servers request content. By default, content is requested only from active origins. Reserve origins are used if active origins are unavailable. Read more about origin selection in the {linkto(/en/networks/cdn/concepts/origin-groups#cdn-origin-groups)[text=Origin groups]} section.

   The first origin added to an empty group will always be active. Add other origins to be able to select their type.

1. Click **Add source**.
