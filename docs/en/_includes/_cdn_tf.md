```hcl
{includetag(origin)}
# Create an origin group
resource "vkcs_cdn_origin_group" "origin_group" {
  name = "tfexample-origin-group"
  origins = [
    {
      source = "origin1.vk.com"
    },
    {
      source = "origin2.vk.com",
      backup = true
    },
    {
      source = "origin3.vk.com",
      enabled = false
    }
  ]
  use_next = true
}
{/includetag}

{includetag(shielding)}
# Add shielding
data "vkcs_cdn_shielding_pop" "pop" {
  city = "Moscow-Megafon"
}
{/includetag}

{includetag(ssl)}
# Add your own SSL-certificate
resource "vkcs_cdn_ssl_certificate" "certificate" {
  name        = "tfexample-ssl-certificate"
  certificate = file("${path.module}/certificate.pem")
  private_key = file("${path.module}/private-key.key")
}
{/includetag}

{includetag(cdn)}
# Create a CDN resource
resource "vkcs_cdn_resource" "resource" {
  cname        = cdn.example.com
  origin_group = vkcs_cdn_origin_group.origin_group.id
  active       = true
  options = {
    edge_cache_settings = {
      value = "10m"
    }
    forward_host_header = true
  }
  origin_protocol = "http, https"

  shielding = {
    enabled = true
    pop_id  = data.vkcs_cdn_shielding_pop.pop.id
  }

  ssl_certificate = {
    type = "own"
    id   = vkcs_cdn_ssl_certificate.certificate.id
  }
}
{/includetag}
```