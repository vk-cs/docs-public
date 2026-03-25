CDN resource is a logical entity of the [CDN service](/en/networks/cdn/concepts/about) from VK Cloud that contains content delivery settings from [origins](/en/networks/cdn/concepts/origin-groups) via the CDN and allows you to modify these settings.

To start delivering content to users via the CDN, you need to [create a resource](/en/networks/cdn/instructions/create-resource). During creation, you can configure:

- content availability for users and the interaction protocol between the resource and the origin;
- origin and domain configuration;
- encryption settings using an SSL certificate.

After the resource is created, you can also configure:

- [interaction with the origin](/en/networks/cdn/instructions/manage-cdn/origin-settings) — interaction protocol, adding and modifying content origins, configuring Host headers, and enabling shielding;
- [caching](/en/networks/cdn/instructions/manage-cdn/caching);
- [HTTP headers, HTTP request methods, and CORS](/en/networks/cdn/instructions/manage-cdn/http-headers);
- [content management](/en/networks/cdn/instructions/manage-cdn/content-settings) — purging and prefilling the resource cache, HTTP response codes, content compression, and optimizing large file delivery;
- [security settings](/en/networks/cdn/instructions/manage-cdn/security) — access policies based on countries, domains, and IP addresses, as well as the TLS protocol versions used;
- content access restriction using [Secure token](/en/networks/cdn/concepts/secure-token) technology.

## Resource statuses

A CDN resource can have one of the following statuses:

- `Active` — content is being delivered to end users;
- `Suspended` — content is unavailable to end users.

The resource status is displayed as an icon in the CDN resource list in the [management console](https://mcs.mail.ru/app), where you can independently [enable or disable](/en/networks/cdn/instructions/manage-cdn/enable-cdn) the CDN resource.

CDN resources are automatically suspended if no significant traffic passes through the resource for a certain period:

- less than 1 MB of traffic since creation, if the resource was created less than 30 days ago;
- less than 1 MB of traffic in the last 14 days, if the resource was created more than 30 days ago.

A suspended CDN resource retains its settings and can be [reenabled](/en/networks/cdn/instructions/manage-cdn/enable-cdn).
