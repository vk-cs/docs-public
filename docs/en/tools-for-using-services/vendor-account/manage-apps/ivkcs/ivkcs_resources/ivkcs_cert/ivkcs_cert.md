
{include(/en/_includes/_translated_by_ai_en.md)}

The `ivkcs_cert` resource is designed for automatic creation and management of SSL certificates on virtual machines.

## Resource arguments

[cols="3,6,2,2,2", options="header"]
|===
|Name
|Description
|Format
|Required
|Resource recreation on value change

|`uuid`
|UUID of the image-based application instance
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/no.svg "inline")

|`domain`
|FQDN of the domain for which the certificate will be issued
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|`path_cert`
|Path to the directory where the certificate and key files will be saved
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/no.svg "inline")

|`renewal_hook_path`
|Path to the bash script that will be executed after each certificate renewal
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/no.svg "inline")

|`cert_files_owner`
|Owner of the certificate and key files
|string
| ![](../../../../../../assets/no.svg "inline")
| ![](../../../../../../assets/no.svg "inline")

|`cert_files_group`
|Group of the certificate and key files
|string
| ![](../../../../../../assets/no.svg "inline")
| ![](../../../../../../assets/no.svg "inline")

|`timeouts.create`
|Certificate creation timeout. When the timeout expires, the process terminates with an error
|string
| ![](../../../../../../assets/no.svg "inline")
| ![](../../../../../../assets/no.svg "inline")

|`timeouts.update`
|Certificate update timeout. When the timeout expires, the process terminates with an error
|string
| ![](../../../../../../assets/no.svg "inline")
| ![](../../../../../../assets/no.svg "inline")

|`timeouts.update`
|Certificate deletion timeout. It is counted from the moment the user deleted their application instance. When the timeout expires, the process terminates with an error
|string
| ![](../../../../../../assets/no.svg "inline")
| ![](../../../../../../assets/no.svg "inline")
|===

The script specified in the `renewal_hook_path` argument is executed after each certificate renewal:

- on behalf of the user specified in the `cert_files_owner` argument, if this argument is set;
- on behalf of the `root` user, if the `cert_files_owner` argument is not set.

Example script for reloading the Nginx server:

```bash
#!/bin/bash

# /opt/scripts/reload_nginx.sh

# Проверяем конфигурацию nginx
if nginx -t; then

# Перезагружаем nginx
    systemctl reload nginx
    echo "$(date): Nginx reloaded successfully after certificate renewal"
else
    echo "$(date): Nginx configuration test failed, not reloading"
    exit 1
fi
```

## Returned attributes

[cols="1,3,1", options="header"]
|===
|Name
|Description
|Format

|`id`
|Unique certificate identifier
|string

|`cert`
|Certificate contents (confidential data)
|string

|`key`
|Private key (confidential data)
|string
|===

## Examples of using the resource

### Web server with basic certificate configuration

```hcl
resource "ivkcs_cert" "website" {
  uuid              = "550e8400-e29b-41d4-a716-446655440000"
  domain            = "www.mysite.com"
  path_cert         = "/etc/nginx/ssl/"
  renewal_hook_path = "/usr/local/bin/reload_nginx.sh"
}

# Использование сертификата в конфигурации nginx
resource "ivkcs_user_data" "nginx_config" {
  uuid = ivkcs_cert.website.uuid

# ... другие параметры
}
```

Example 2. Microservice with access rights configuration:

```hcl
resource "ivkcs_cert" "api_service" {
  uuid              = var.deployment_uuid
  domain            = "api.service.internal"
  path_cert         = "/opt/service/certs/"
  renewal_hook_path = "/opt/service/scripts/restart.sh"
  cert_files_owner  = "service"
  cert_files_group  = "service"
  
  timeouts {
    create = "45m"
  }
}
```

Example 3. Multiple certificates:

```hcl
variable "domains" {
  type = list(string)
  default = ["app.example.com", "api.example.com", "admin.example.com"]
}

resource "ivkcs_cert" "multi_certs" {
  for_each = toset(var.domains)
  
  uuid              = var.instance_uuid
  domain            = each.value
  path_cert         = "/etc/ssl/${each.value}/"
  renewal_hook_path = "/opt/scripts/reload_services.sh"
  cert_files_owner  = "www-data"
  cert_files_group  = "ssl-cert"
}
```