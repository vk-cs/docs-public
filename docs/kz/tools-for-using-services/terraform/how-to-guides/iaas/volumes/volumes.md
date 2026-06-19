{include(/kz/_includes/_translated_by_ai.md)}

{note:warn}

[Terraform орнатып, баптағаныңызға](../../../quick-start) көз жеткізіңіз.

{/note}

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## Диск томын жасау

Том жасау үшін жасалатын том конфигурациясы сипатталатын `volume.tf` файлын жасаңыз. Төмендегі мысалдан мәтінді қосып, томыңыз үшін баптау мәндерін түзетіңіз. Бұл мысалда `GZ1` қолжетімділік аймағында `ceph-ssd` түріндегі, өлшемі 1 ГБ диск томын жасау сипатталады.

Диск томын жасау үшін блоктық сақтау томын ұсынатын `vkcs_blockstorage_volume` ресурсы қажет болады. Блоктық сақтау томдарын жасай, өзгерте және жоя аласыз.

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

Мұнда:

- `name`: том атауы.
- `description`: том сипаттамасы.
- `metadata`: том метадеректері үшін кілт мәндерінің картасы.
- `size`: (міндетті) том өлшемі, гигабайтпен.
- `availability_zone`: (міндетті) том сақталатын ДОД қолжетімділік аймағының атауы.
- `volume_type`: (міндетті) том түрі.

### Өзгерістерді қолдану

Мысал мәтінін `volume.tf` файлына қосып, келесі командаларды орындаңыз:

```console
terraform init
```
```console
terraform apply
```

## Қалып-күй суретін (snapshot) жасау

Диск томының қалып-күй суретін жасау үшін жасалатын суреттің конфигурациясы сипатталатын `snapshot.tf` файлын жасаңыз. Төмендегі мысалдан мәтінді қосып, инфрақұрылымыңыз үшін баптау мәндерін түзетіңіз. Бұл мысалда `vkcs_blockstorage_volume.volume.id` ресурс ID-сы бар диск томының қалып-күй суретін жасау сипатталады.

Қалып-күй суретін жасау үшін блоктық сақтау қалып-күй суретін ұсынатын `vkcs_blockstorage_snapshot` ресурсы қажет болады. Блоктық сақтау томының қалып-күй суреттерін жасай, өзгерте және жоя аласыз.

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

Мұнда:

- `volume_id`: (міндетті) қалып-күй суреті жасалатын томның ID-сы.
- `name`: қалып-күй суретінің атауы.
- `description`: қалып-күй суретінің сипаттамасы.
- `metadata`: том метадеректері үшін кілт мәндерінің картасы.

### Өзгерістерді қолдану

Мысал мәтінін `snapshot.tf` файлына қосып, келесі командаларды орындаңыз:

```console
terraform init
```
```console
terraform apply
```
