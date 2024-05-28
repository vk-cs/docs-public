{includetag(add)}

1. Click ![plus-icon](/en/assets/plus-icon.svg "inline") **Add source**.
1. Specify the origin URL in the **Address** fileld. CDN servers will access to the origin by that URL. There are some requirements:

   - The URL may only contain Latin letters, numbers, and characters `.`, `-`.
   - The URL must not contain a protocol scheme `http://` or `https://`. It is added automatically as `http(s)://`. The **Source interaction protocol** option determines protocol when [creating](../create-resource) or editing a CDN resource.
   - Only Fully Qualified Domain Name (FQDN) is allowed in the URL.
   - The maximum length of the entire URL is 255 characters. The maximum length of a subdomain is 63 characters.

   Examples:

   - `example.org`
   - `images.example.com`

1. Specify the type of origin in the **Source type** parameter. It can be active or reserve.

   This option affects the order in which origins are selected when CDN servers request content. By default, content is requested from active origins only. Reserve origins are used if active are not available. Read more about origin selection in the [Origin groups](/en/networks/cdn/concepts/origin-groups) section.

   The first added origin will always be active. Add other origins to select their type.

1. Click **Add source**.

1. (Optional) Add other origins.

1. (Optional) Enable or disable origins you need. You cannot disable an `Active` origin if it is the only origin of its type in the group. A disabled origin will not be used when CDN servers request content.

1. (Optional) To change the settings of an origin click ![pencil-icon](/en/assets/pencil-icon.svg "inline") to the right of the origin type.

1. (Optional) To remove an origin click ![trash-icon](/en/assets/trash-icon.svg "inline") to the right of the origin type. You cannot remove an `Active` origin if it is the only enabled origin in the group.

1. Make sure that DNS records are configured for the domains of all added origins (including disabled ones).

   <warn>

   If VK Cloud cannot verify the domain's availability through a DNS query, the origin group is not created.

   </warn>

{/includetag}

{includetag(4XX_5XX)}

1. Enable the **Использовать следующий источник из списка при 4XX и 5XX кодах на источнике** to manage the order of origins that CDN servers request content from.

   When the option is enabled, CDN servers turn to the next origin in the list if the current origin is unavailable. If all origins are unavailable, CDN servers return the response of the last origin in the list when requesting content. Read more about origins selection in the [Origin groups](/en/networks/cdn/concepts/origin-groups) section.

   The option is available if there is more than one origin is set up in the origin group.

{/includetag}

{includetag(edit_url)}

1. Edit the **Address** field. CDN servers will access the origin by the URL. There are some requirements:

   - The URL may only contain Latin letters, numders and characters `.`, `-`.
   - The URL must not contain a protocol scheme `http://` or `https://`. It is added automatically as `http(s)://`. The **Source interaction protocol** option determines protocol when [creating](../create-resource) or editing a CDN resource.
   - Only Fully Qualified Domain Name (FQDN) is allowed in the URL.
   - The maximum length of the entire URL is 255 characters. The maximum length of a subdomain is 63 characters.

   Examples:

   - `example.org`
   - `images.example.com`

{/includetag}

{includetag(content_source)}

In the **Content Source** parameter, specify the URL that CDN servers will access the origin:

- The URL may only contain Latin letters, numders and characters `.`, `-`.
- The URL must not contain a protocol scheme `http://` or `https://`. It is added automatically as `http(s)://`. The protocol is determined in the **Source interaction protocol** option.
- Only Fully Qualified Domain Name (FQDN) is allowed in the URL.
- The maximum length of the entire URL is 255 characters. The maximum length of a subdomain is 63 characters.

Examples:

- `203.0.113.222:8080`
- `images.example.com`

{/includetag}

{includetag(http)}

- `HTTP`: the content at the origin is available only over HTTP (port 80) or the origin supports redirection from HTTPS to HTTP.
- `HTTPS`: the content at the origin is available only over HTTPS (port 443) or the origin supports redirection from HTTP to HTTPS.
- (By deafault) `HTTP and HTTPS`: the content at the origin is available over both HTTP and HTTPS. In this case, the protocol of the user's request will be preserved in the CDN resource's request to the origin, and two versions of the file, one for each protocol, will be stored in the CDN resource's cache.

{/includetag}

{includetag(http-api)}

- `HTTP`: the content at the origin is available only over HTTP (port 80) or the origin supports redirection from HTTPS to HTTP.
- `HTTPS`: the content at the origin is available only over HTTPS (port 443) or the origin supports redirection from HTTP to HTTPS.
- (By deafault) `MATCH`: the content at the origin is available over both HTTP and HTTPS. In this case, the protocol of the user's request will be preserved in the CDN resource's request to the origin, and two versions of the file, one for each protocol, will be stored in the CDN resource's cache.

{/includetag}

{includetag(host)}

Select the option:

<tabs>
<tablist>
<tab>Do not change</tab>
<tab>Custom</tab>
<tab>(By default) Forward</tab>
</tablist>
<tabpanel>

The domain name or IP address of the first origin from the origin group will be used as the header value.

Example:

Let there is a group of two origins configured:

- `203.0.113.222:8080`
- `images.example.com`

Then the `Host: 203.0.113.222:8080` header is used, when CDN servers request any of these origins.

</tabpanel>
<tabpanel>

The specified domain name or IP address value will be used as the header.

Example:

Let there is a group of two origins configured:

- `203.0.113.222:8080`
- `images.example.com`

Also let the parameter has the `content-source.example.org` value.

Then the `Host: content-source.example.org` header is used, when CDN servers request any of these origins.

</tabpanel>
<tabpanel>

The name of the first configured personal domain will be used as the header.

Example:

Let there is a group of two origins configured:

- `203.0.113.222:8080`
- `images.example.com`

Also let two personal domains are configured for CDN:

- `cdn.contoso.com`
- `cdn.example.org`

Then the `Host: cdn.contoso.com` header is used, when CDN servers request any of these origins.

</tabpanel>
</tabs>

<warn>

Make sure the origins are able to process requests with the `Host` header formatted according to the specified rules.

</warn>

{/includetag}
