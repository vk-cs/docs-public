This article provides an example of creating and configuring a CDN resource and origins, enabling origin shielding, and adding an SSL certificate using Terraform.

The example use:

- Resources:

  - [vkcs_cdn_origin_group](https://docs.comcloud.xyz/providers/vk-cs/vkcs/latest/docs/resources/cdn_origin_group)
  - [vkcs_cdn_resource](https://docs.comcloud.xyz/providers/vk-cs/vkcs/latest/docs/resources/cdn_resource)
  - [vkcs_cdn_ssl_certificate](https://docs.comcloud.xyz/providers/vk-cs/vkcs/latest/docs/resources/cdn_ssl_certificate)

- Data sources:

  - [vkcs_cdn_origin_group](https://docs.comcloud.xyz/providers/vk-cs/vkcs/latest/docs/data-sources/cdn_origin_group)
  - [vkcs_cdn_shielding_pop](https://docs.comcloud.xyz/providers/vk-cs/vkcs/latest/docs/data-sources/cdn_shielding_pop)
  - [vkcs_cdn_shielding_pops](https://docs.comcloud.xyz/providers/vk-cs/vkcs/latest/docs/data-sources/cdn_shielding_pops)
  - [vkcs_cdn_ssl_certificate](https://docs.comcloud.xyz/providers/vk-cs/vkcs/latest/docs/data-sources/cdn_ssl_certificate)

<details>
<summary>The full Terraform manifest used in creating the example resources</summary>

{include(/ru/_includes/_cdn_tf.md)}

</details>

## Before you start

1. Read the [VK Cloud CDN documentation](/en/networks/cdn/concepts) to know how the service works.
1. Review the available resources and [quotas](/en/tools-for-using-services/account/concepts/quotasandlimits) for the [region](/en/tools-for-using-services/account/concepts/regions) in which you plan to create the CDN resource. Different quotas may be configured for different regions.

   If you want to increase your quotas, please contact [technical support](mailto:support@mcs.mail.ru).

1. [Install Terraform and configure the provider](../../quick-start) if you have not already done.

## 1. Create file with description of origin group

Origin groups manage the backend servers responsible for hosting and delivering content. For a CDN resource, you need to create a group and add at least one origin to it. For greater reliability and fault tolerance, add multiple origins to a group.

Create a Terraform configuration file `cdn.tf` and add the following content to it:

{include(/en/_includes/_cdn_tf.md)[tags=origin]}

Here:

- `name` — the name of the origin group. Required.
- `origins` — the list of origins.
- `source` — the IP address or domain of the origin and the port if a custom port is used. Required.
- `enabled` — the origin availability:
  - `enabled = true` or the parameter is not specified — the origin is enabled.
  - `enabled = false` — the origin is disabled.
- `backup` — the backup [origin type](/en/networks/cdn/concepts/origin-groups) (set at the origin level):
  - `backup = true` — the origin is a backup.
  - `backup = false` or the parameter is not specified — the origin is active.
- `use_next` — use the [next origin in the list](/en/networks/cdn/concepts/origin-groups) (set at the group level):
  - `use_next = true` — the CDN server requests content from the first active origin. If the response is 4XX or 5XX, the CDN server moves down the list and request content from other origins, regardless of their type.
  - `use_next = false` or the parameter is not specified — the CDN server first requests content from one of the active origins. If the active origin responds with a 5XX HTTP status, the CDN server requests content from one of the backup origins. If the response is 4XX from an active or backup origin, the CDN server will return an error to the consumer.

## 2. (Optional) Add shielding to the project

Origin shielding allows you to protect the origin from high loads. To do this, a precache server is used, which collects all user requests and sends them one by one to the origin if the required content is not in the cache of the precache server itself.

If you do not plan to use shielding, go to [adding an SSL certificate](#ssl).

To add shielding to the CDN resource configuration, get a list of available precache servers and select the one closest to the content consumers.

1. Create a Terraform configuration file `shieldings.tf` and add the following content to it:

    ```hcl

    data "vkcs_cdn_shielding_pops" "pops" {}

    output "shielding_locations" {
    value = data.vkcs_cdn_shielding_pops.pops.shielding_pops
    }
    ```

1. Place the Terraform configuration files in one directory:

   - `vkcs_provider.tf`;
   - `shieldings.tf`.

1. Go to this directory.

1. Apply the changes:

    ```bash
    terraform apply
    ```

    The response will return information about available precache servers.

    Response example:

    ```hcl
    shielding_locations = tolist([
    {
    "city" = "Moscow-Megafon"
    "country" = "Russia"
    "datacenter" = "mgf"
    "id" = 138
    },
    ])
    ```

    Here:

   - `city`, `country` — city and country where precache server points of presence are located.
   - `datacenter` — data center where precache server is located.
   - `id` — point of presence identifier.

1. Select precache server point of presence and add its data to CDN resource configuration file. To do this, open `cdn.tf` file and add the following content to it:

    {include(/en/_includes/_cdn_tf.md)[tags=shielding]}

## {heading(3. (Optional) Add SSL certificate to your project)[id=ssl]}

SSL certificates are used when delivering content via HTTPS. You can add your own SSL certificate, use a free [Let's Encrypt](https://letsencrypt.org/ru/) certificate, or not use an SSL certificate at all, in which case the content will be delivered via HTTP.

If you plan to use a Let's Encrypt certificate or not use an SSL certificate at all, go to [adding a CDN resource](#cdn).

1. Place your SSL certificate files with the public part `certificate.pem` and the private part `private-key.key` in the directory from which you will create the resources.
1. Check that the files contain all the certificate lines.
1. Open the `cdn.tf` file and add the following content to it:

    {include(/en/_includes/_cdn_tf.md)[tags=ssl]}

    Here:

   - `name` is the name of the SSL certificate.
   - `certificate` is the path to the file containing the public part of the certificate. All lines of the public part of the certificate must be in the file.
   - `private_key` is the path to the file containing the private part of the certificate. All lines of the private part of the certificate must be in the file.

    All three parameters are required.

## {heading(4. Add description of CDN resource)[id=cdn]}

Open the `cdn.tf` file and add the following content:

{include(/en/_includes/_cdn_tf.md)[tags=cdn]}

Here:

- `cname` — FQDN of the domain, when accessed, the content will be delivered using the CDN. Required.

    Do not add the root domain name to the FQDN: an entry like `cdn.example.com` is allowed, but not `cdn.example.com.`. To add additional domains for the CDN, specify them in the `secondary_hostnames` parameter.
- `origin_group` — identifier of the origin group for the CDN resource. The identifier can be specified in the configuration file, or got from the data source or resource. Required.

    <details>
    <summary>Examples</summary>

     - `origin_group = vkcs_cdn_origin_group.origin_group.id`: the origin group identifier will be obtained after creating the `vkcs_cdn_origin_group` resource.
     - `origin_group = data.vkcs_cdn_origin_group.origin_group.id`: the group identifier will be obtained from the `vkcs_cdn_origin_group` data source.
     - `origin_group = "266524"`: the identifier obtained from the [list of origin groups](/en/networks/cdn/service-management/manage-origin-groups#origin_group_list) in the VK Cloud personal account is specified.

    </details>

- `active` — resource availability:
  - `active = true` or parameter not specified — CDN resource goes into the `Active` state, content is delivered to consumers.
  - `active = false` — CDN resource goes into the `Paused` state, content is not delivered to consumers.
- `options` — CDN resource settings. A description of all available settings is given in the [VKCS provider documentation](https://docs.comcloud.xyz/providers/vk-cs/vkcs/latest/docs/resources/cdn_resource).
- `origin_protocol` — protocol for interaction with the origin:
  - `"http"` or parameter not specified — content on the origin is available only via HTTP (port 80) or the origin supports redirection from HTTPS to HTTP.
  - `"https"` — content on the origin is available only via HTTPS (port 443) or the origin supports redirection from HTTP to HTTPS.
  - `"http, https"` — content on the origin is available via HTTP and HTTPS. In this case, the end user request protocol is saved in the request from the CDN resource to the origin. In this case, two versions of the file for each protocol is stored in the CDN resource cache.
- `shielding` — enable origin shielding for the CDN resource.
  - `enabled` — enable shielding: `true` (enabled) or `false` (disabled).
  - `pop_id` — shielding point of presence identifier. In this example, the identifier is got from the `vkcs_cdn_shielding_pop` data source. You can also specify it directly in the configuration. Example: `pop_id = 138`.

    If you do not enable origin shielding, remove the parameter block from the configuration.
- `ssl_certificate` — SSL certificate for delivering content via HTTPS:
  - `type` — SSL certificate type. Available values:
    - `"not_used"` — SSL certificate is not used.
    - `"own"` — user certificate is added.
    - `"lets_encrypt"` — free [Let's Encrypt](https://letsencrypt.org/ru/) certificate will be added. To issue a certificate, the CDN resource must be active (`active = true`). The certificate will be created after the CDN resource is created, when the origin servers become available and changes to CNAME records for custom domains are propagated to DNS. This usually takes up to 30 minutes.
  - `id` — identifier of the SSL certificate associated with the CDN resource. The identifier must be specified if `type = "own"`. In the `cdn.tf` file provided, the identifier is got from the `vkcs_cdn_ssl_certificate` resource added earlier.

## 5. Create necessary resources using Terraform

1. Put the Terraform configuration files in one directory:

    - `vkcs_provider.tf`
    - `cdn.tf`

1. Go to this directory.
1. Make sure that the configuration files are correct and contain the required changes:

   ```bash
   terraform validate && terraform plan
   ```

1. Apply the changes:

   ```bash
   terraform apply
   ```

   Enter `yes` to confirm.

1. Wait for the operation to complete.

## 6. Check configuration application

Verify that the security rules and groups were successfully created:

1. [Go to](https://cloud.vk.com/app/en) your VK Cloud management console.
1. Go to the **CDN** → **CDN resources** section.  Make sure the CDN resource is created.
1. Go to the **CDN** → **Source groups**. Make sure the origin group is created.
1. Go to the **CDN** → **SSL certificates**. Make sure the SSL certificate is added to the project.

## Delete unused resources

If you no longer need the Terraform resources, delete them:

1. Go to the directory that contains the Terraform configuration files.
1. Run the command:

   ```bash
   terraform destroy
   ```

   Enter `yes` to confirm.

1. Wait for the operation to complete.
