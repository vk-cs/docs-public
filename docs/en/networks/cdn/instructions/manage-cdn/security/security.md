## Configuring Allowed HTTP Methods

The **Allowed HTTP Methods** option enables control over permitted HTTP request methods to a CDN resource. By default, the following methods are allowed: GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE.

To configure the allowed methods:

<tabs>
<tablist>
<tab>Management console</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **HTTP-headers** tab.
1. Enable the **Allowed HTTP Methods** tab.
1. Select the methods that CDN resource has to process.
1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the `allowedHttpMethods` parameter in the `options` block of a request body:

- to enable the option specify `"enabled": true`; to disable — `"enabled": false`.
- list methods that should be available in the `value` parameter.

Example request:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "allowedHttpMethods": {
            "enabled": true,
            "value": [
                "GET",
                "HEAD"
            ]
        },
    }
}'
```

</tabpanel>
</tabs>

If the origin server does not recognize the specified method, a response with the code 501 (Not Implemented) will be returned. If the origin server knows the method but it is not permitted on the CDN resource, a response with the code 405 (Method Not Allowed) will be returned.

## Configuring country access policy

This option allows you to protect content from unauthorized access from certain countries.

To configure the country-based security policy:

<tabs>
<tablist>
<tab>Management console</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **Security** tab
1. Enable the **Set up access policy by country** option.
1. Select the type of policy:

   - **Permissive** — allows access to content from all countries except selected.
   - **Blocking** —  blocks access to content from all countries except selected.

1. Select the countries to which you want to deny or allow access to content. Countries are listed in the format [ISO 3166-1 alpha-2](https://www.iso.org/en/iso-3166-country-codes.html). Multiple selections are available.
1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the `country_acl` parameter in the `options` block of a request body.

Example request to allow access to content only from the UK and France:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "country_acl": {
            "enabled": true,
            "excepted_values": [
                "UK",
                "FR"
            ],
            "policy_type": "deny"
        }
    }
}'
```

</tabpanel>
</tabs>

## Configuring domain access policy

The option allows you to protect content from being published on other sites.

To configure the domain access policy:

<tabs>
<tablist>
<tab>Management console</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **Security** tab
1. Enable the **Configure domain access policy** option.
1. Select the type of policy:

   - **Permissive** — allows access to content from all domains except selected.
   - **Blocking** —  blocks access to content from all domains except selected.

1. Enter the domain or domain mask without `http://` or `https://`. For instance, `example.com`, `*.example.com`. You can enter several domains.
1. (Optional) Enable the **Contact via direct link** option to allow or deny the specified sites from accessing the CDN resource via a direct link.
1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the `referrer_acl` parameter in the `options` block of a request body.

Example request to allow access to content only for subdomains of the domain `vk.com`:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "referrer_acl": {
            "enabled": true,
            "excepted_values": [
                "*.vk.com"
            ],
            "policy_type": "deny"
        }
      }
}'
```

</tabpanel>
</tabs>

## Configuring IP address access policy

The option allows you to deny access to content for specific IP addresses.

To configure IP address-based security policy:

<tabs>
<tablist>
<tab>Management console</tab>
<tab>API</tab>
</tablist>
<tabpanel>

{include(/en/_includes/_open-cdn.md)}

1. Go to the **Security** tab
1. Enable the **Configure access policy by IP addresses** option.
1. Select the type of policy:

   - **Permissive** — allows access to content from all IP addresses except selected.
   - **Blocking** —  blocks access to content from all IP addresses except selected.

1. Enter the IP addresses with the subnet mask. For example, `192.168.3.2/32` or `2a03:d000:2980:7::8/128`. The access policy works on network addresses calculated based on the specified IP addresses. If two or more IP addresses belong to the same network, it is sufficient to specify only one of those IP addresses.
1. Click **Save changes**.

</tabpanel>
<tabpanel>

{include(/en/_includes/_api_cdn_create_change.md)}

Specify the `ip_address_acl` parameter in the `options` block of a request body.

The access policy works on network addresses calculated based on the specified IP addresses. If two or more IP addresses belong to the same network, it is sufficient to specify only one of those IP addresses.

Example request to deny access to content from IP addresses `192.168.1.100/32` or `10.10.10.10/24`:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options":
        {
        "ip_address_acl": {
            "enabled": true,
            "excepted_values": [
                "192.168.1.100/32",
                "10.10.10.10/24"
            ],
            "policy_type": "allow"
        }
    }
}'

```

</tabpanel>
</tabs>
