# {heading(Управление дисками и их снимками)[id=terraform-volumes]}

{note:warn}
Убедитесь, что вы {linkto(../../../quick-start#terraform-quick-start)[text=установили и сконфигурировали Terraform]}.
{/note}

Полное описание параметров — в [документации провайдера Terraform](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Создание тома диска)[id=terraform-volumes-create]}

Чтобы создать том, создайте файл `volume.tf`, где будет описана конфигурация создаваемого тома. Добавьте текст из примера ниже и исправьте значения настроек для вашего тома. В данном примере описывается создание тома диска размером 1 ГБ типа `ceph-ssd` в зоне доступности `GZ1`.

Для создания тома диска потребуется ресурс `vkcs_blockstorage_volume`, который предоставляет том блочного хранилища. Вы можете создавать, изменять и удалять тома блочного хранилища.

```hcl
resource "vkcs_blockstorage_volume" "volume" {
  name = "volume"
  description = "test volume"
  metadata = {
    foo = "bar"
  }
  size = 1
  availability_zone = "GZ1"
  volume_type = "ceph-ssd"
}
```

Здесь:

- `name`: название тома.
- `description`: описание тома.
- `metadata`: карта значений ключей для метаданных тома.
- `size`: (обязателен) размер тома в гигабайтах.
- `availability_zone`: (обязателен) название зоны доступности ЦОД, хранящих том.
- `volume_type`: (обязателен) тип тома.

### {heading(Применение изменений)[id=terraform-volumes-apply]}

Добавьте текст примера в файл `volume.tf` и выполните следующие команды:

```console
terraform init
```
```console
terraform apply
```

## {heading(Создание снимка состояния (snapshot))[id=terraform-volumes-snapshot-create]}

Чтобы создать снимок состояния тома диска, создайте файл `snapshot.tf`, где будет описана конфигурация создаваемого снимка. Добавьте текст из примера ниже и исправьте значения настроек для вашей инфраструктуры. В данном примере описывается создание снимка состояния тома диска с ID ресурса `vkcs_blockstorage_volume.volume.id`.

Для создания снимка потребуется ресурс `vkcs_blockstorage_snapshot`, который предоставляет снимок состояния блочного хранилища. Вы можете создавать, изменять и удалять снимки состояния тома блочного хранилища.

```hcl
resource "vkcs_blockstorage_snapshot" "snapshot" {
  volume_id = "${vkcs_blockstorage_volume.volume.id}"
  name = "snapshot"
  description = "test snapshot"
  metadata = {
    foo = "bar"
  }
}
```

Здесь:

- `volume_id`: (обязателен) ID тома, для которого будет создан снимок состояния.
- `name`: имя снимка состояния.
- `description`: описание снимка состояния.
- `metadata`: карта значений ключей для метаданных тома.

### {heading(Применение изменений)[id=terraform-volumes-snapshot-apply]}

Добавьте текст примера в файл `snapshot.tf` и выполните следующие команды:

```console
terraform init
```
```console
terraform apply
```
