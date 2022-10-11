<warn>

Прежде всего убедитесь, что вы [установили Terraform](../../../../additionals/terraform/terraform-installation/) и [создали файл main.tf](../../../../additionals/terraform/terraform-provider-config/) с необходимыми провайдерами.

</warn>

Чтобы создать NFS, создайте файл `nfs.tf`, где будет описана конфигурация создаваемого NFS. В данном примере создаётся NFS и предоставляется доступ на чтение и запись с двух IP адресов. Добавьте текст из примеров ниже, и исправьте значения настроек для вашего NFS.

### Создание виртуальной сети для NFS

При создании NFS необходимо указать сеть и подсеть, в которой будет создан этот ресурс. Вы можете создать сеть и подсеть в соответствии с [инструкцией](../../terraform/network/) и указать их в ресурсах **vkcs_networking_network** и **vkcs_networking_subnet** в примере внизу.

Если вы хотите использовать сеть и подсеть созданные другим путём, укажите их в качестве data source [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/vkcs_networking_network.md) и [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/vkcs_networking_subnet.md) вместо соответствующих ресурсов.

### Создание NFS

Для создания NFS вам потребуются следующие объекты:

- Ресурсы (resource):

  - **vkcs_networking_network** — сеть, в которой будет создан NFS. В примере ниже сеть создается с именем «sfs».
  - **vkcs_networking_subnet** — подсеть из сети. В примере: sfs.
  - **vkcs_sharedfilesystem_sharenetwork** — Используйте этот ресурс для настройки share-сети. Share-сеть хранит информацию, которую NFS серверы могут использовать при создании NFS. Включает в себя следующие ресурсы:

    - **name** — Имя для общей сети. Изменение этого параметра обновляет имя существующей общей сети.
    - **neutron_net_id** — Идентификатор UUID нейтронной сети при настройке или обновлении общей сети. Изменение этого параметра обновляет существующую общую сеть, если она не используется общими ресурсами.
    - **neutron_subnet_id** — Идентификатор UUID подсети neutron при настройке или обновлении общей сети. Изменение этого параметра обновляет существующую общую сеть, если она не используется общими ресурсами.

  - **vkcs_sharedfilesystem_share** — Используйте этот ресурс для настройки общего ресурса. Содержит следующие ресурсы:

    - **name** — Название общего ресурса. Изменение этого параметра обновляет имя существующего общего ресурса.
    - **description** — Понятное для человека описание общего ресурса. Изменение этого параметра обновляет описание существующего общего ресурса.
    - **share_proto** — Протокол общего доступа - может быть NFS, CIFS, CEPHFS, GLUSTERFS, HDFS или MAPRFS. Изменение этого параметра создает новый общий ресурс.
    - **share_type** — The share type name. If you omit this parameter, the default share type is used.
    - **size** — Размер доли, в гигабайтах. Запрашиваемый размер общего ресурса не может превышать разрешенную квоту в ГБ. Изменение этого параметра приводит к изменению размера существующего общего ресурса.
    - **share_network_id** — ID сети с NFS сервером.

  - **vkcs_sharedfilesystem_share_access** — Используйте этот ресурс для управления списками общего доступа. Содержит следующие ресурсы:

    - **share_id** — UUID общего ресурса, к которому вам предоставлен доступ.
    - **access_type** — Тип правила доступа. Может быть либо ip, user, cert, либо cephx.
    - **access_to** — Значение, определяющее доступ. Это может быть либо IP-адрес, либо имя пользователя, проверенное настроенной службой безопасности Общей сети.
    - **access_level** — Уровень доступа к общему ресурсу. Может быть либо `rw` -- доступ на чтение и запись, либо `ro` -- только чтение.

Пример файла `nfs.tf`:

```hcl

resource "vkcs_networking_network" "sfs" {
      name = "network"
    }

resource "vkcs_networking_subnet" "sfs" {
  name = "subnet"
  cidr = "192.168.199.0/24"
  ip_version = 4
  network_id = "${vkcs_networking_network.sfs.id}"
}

resource "vkcs_sharedfilesystem_sharenetwork" "sharenetwork" {
  name                = "test_sharenetwork"
  neutron_net_id      = "${vkcs_networking_network.sfs.id}"
  neutron_subnet_id   = "${vkcs_networking_subnet.sfs.id}"
}

resource "vkcs_sharedfilesystem_share" "share" {
  name             = "nfs_share"
  description      = "test share description"
  share_proto      = "NFS"
  share_type       = "default_share_type"
  size             = 1
  share_network_id = "${vkcs_sharedfilesystem_sharenetwork.sharenetwork.id}"
}

resource "vkcs_sharedfilesystem_share_access" "share_access_1" {
  share_id     = "${vkcs_sharedfilesystem_share.share.id}"
  access_type  = "ip"
  access_to    = "192.168.199.10"
  access_level = "rw"
}

resource "vkcs_sharedfilesystem_share_access" "share_access_2" {
  share_id     = "${vkcs_sharedfilesystem_share.share.id}"
  access_type  = "ip"
  access_to    = "192.168.199.11"
  access_level = "rw"
}
```

### Применение изменений

Добавьте обе части примера в файл `nfs.tf` и выполните следующие команды:

```bash
terraform init
```
```bash
terraform apply
```
