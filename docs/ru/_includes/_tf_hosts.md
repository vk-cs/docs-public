### Примеры указания имен хостов

- Указание с помощью локальной переменной (рекомендуемый способ):

    ```hcl
    locals {
    hosts_name = "${substr(var.instance_uuid, 0, 8)}-myapp"
    }

    resource "ivkcs_agent_check" "health" {
    hosts = [local.hosts_name]  # Используем значение из locals
    uuid  = var.instance_uuid
    # ...
    }
    ```

- Прямое указание имени хоста:

    ```hcl
    resource "ivkcs_agent_check" "health" {
    hosts = ["myapp-production-server"]  # Указываем фиксированное имя хоста
    uuid  = var.instance_uuid
    # ...
    }
    ```

- Указание имени хоста через переменную в ресурсе `vkcs_compute_instance`:

    ```hcl
    resource "vkcs_compute_instance" "app_server" {
    name = "app-production-vm"  # Определяем переменную, содержащую имя хоста
    # ...
    }

    resource "ivkcs_agent_check" "health" {
    hosts = [vkcs_compute_instance.app_server.name]  # Используем значение переменной с именем хоста
    uuid  = var.instance_uuid
    # ...
    }
    ```
