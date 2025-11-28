Ресурс `ivkcs_cert` предназначен для автоматического создания и управления SSL-сертификатами на виртуальных машинах.

## Аргументы ресурса

[cols="3,6,2,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный
|Пересоздание ресурса при изменении значения

|`uuid`
|UUID инстанса image-based приложения
|string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

|`domain`
|FQDN домена, для которого будет выпущен сертификат
|string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|`path_cert`
|Путь к директории, где будут сохранены файлы сертификата и ключа
|string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

|`renewal_hook_path`
|Путь к bash-скрипту, который будет выполняться после каждого обновления сертификата
|string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

|`cert_files_owner`
|Владелец файлов сертификата и ключа
|string
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|`cert_files_group`
|Группа файлов сертификата и ключа
|string
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|`timeouts.create`
|Тайм-аут создания сертификата. По истечении тайм-аута процесс завершается с ошибкой
|string
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|`timeouts.update`
|Тайм-аут обновления сертификата. По истечении тайм-аута процесс завершается с ошибкой
|string
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|`timeouts.update`
|Тайм-аут удаления сертификата. Отсчитывается с момента, когда пользователь удалил свой инстанс приложения. По истечении тайм-аута процесс завершается с ошибкой
|string
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
|===

Скрипт, указанный в аргументе `renewal_hook_path`, выполняется после каждого обновления сертификата:

- от имени пользователя, указанного в аргументе `cert_files_owner`, если этот аргумент задан;
- от имени пользователя `root`, если аргумент `cert_files_owner`, не задан.

Пример скрипта для перезагрузки сервера Nginx:

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

## Возвращаемые атрибуты

[cols="1,3,1", options="header"]
|===
|Имя
|Описание
|Формат

|`id`
|Уникальный идентификатор сертификата
|string

|`cert`
|Содержимое сертификата (конфиденциальные данные)
|string

|`key`
|Приватный ключ (конфиденциальные данные)
|string
|===

## Примеры использования ресурса

### Веб-сервер с базовой настройкой сертификата

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

Пример 2. Микросервис с настройкой прав доступа:

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

Пример 3. Множественные сертификаты:

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
