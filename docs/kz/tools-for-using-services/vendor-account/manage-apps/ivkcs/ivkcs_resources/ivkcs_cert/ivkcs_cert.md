{include(/kz/_includes/_translated_by_ai.md)}

`ivkcs_cert` ресурсы виртуалды машиналарда SSL-сертификаттарды автоматты түрде жасауға және басқаруға арналған.

## Ресурстың аргументтері

[cols="3,6,2,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті
|Мәні өзгерген кезде ресурсты қайта жасау

|`uuid`
|image-based қолданба инстансының UUID
|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/no.svg "inline")

|`domain`
|Сертификат шығарылатын доменнің FQDN атауы
|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")

|`path_cert`
|Сертификат пен кілт файлдары сақталатын директорияға жол
|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/no.svg "inline")

|`renewal_hook_path`
|Сертификат әр жаңартылғаннан кейін орындалатын bash-скриптке жол
|string
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/no.svg "inline")

|`cert_files_owner`
|Сертификат пен кілт файлдарының иесі
|string
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|`cert_files_group`
|Сертификат пен кілт файлдарының тобы
|string
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|`timeouts.create`
|Сертификатты жасау тайм-ауты. Тайм-аут аяқталғаннан кейін процесс қателікпен аяқталады
|string
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|`timeouts.update`
|Сертификатты жаңарту тайм-ауты. Тайм-аут аяқталғаннан кейін процесс қателікпен аяқталады
|string
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")

|`timeouts.update`
|Сертификатты жою тайм-ауты. Пайдаланушы өз қолданба инстансын жойған сәттен бастап есептеледі. Тайм-аут аяқталғаннан кейін процесс қателікпен аяқталады
|string
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/no.svg "inline")
|===

`renewal_hook_path` аргументінде көрсетілген скрипт сертификат әр жаңартылғаннан кейін орындалады:

- егер бұл аргумент берілсе, `cert_files_owner` аргументінде көрсетілген пайдаланушы атынан;
- егер `root` аргументі берілмесе, `cert_files_owner` пайдаланушысы атынан.

Nginx серверін қайта жүктеуге арналған скрипт мысалы:

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

## Қайтарылатын атрибуттар

[cols="1,3,1", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы

|`id`
|Сертификаттың бірегей идентификаторы
|string

|`cert`
|Сертификаттың мазмұны (құпия деректер)
|string

|`key`
|Жеке кілт (құпия деректер)
|string
|===

## Ресурсты пайдалану мысалдары

### Сертификаттың базалық баптауы бар веб-сервер

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

2-мысал. Қолжетімділік құқықтарын баптауы бар микросервис:

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

3-мысал. Бірнеше сертификат:

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
