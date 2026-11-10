# {heading(Дисктер мен олардың суреттерін басқару)[id=terraform-volumes]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{note:warn}
Terraform-ды {linkto(../../../quick-start#terraform-quick-start)[text=орнатып, конфигурациялағаныңызға]} көз жеткізіңіз.
{/note}

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Диск томын жасау)[id=terraform-volumes-create]}

Том жасау үшін жасалатын томның конфигурациясы сипатталатын `volume.tf` файлын жасаңыз. Төмендегі мысалдағы мәтінді қосыңыз және сіздің томыңызға арналған баптаулар мәндерін түзетіңіз. Осы мысалда `ME1` қолжетімділік аймағында `ceph-ssd` түріндегі көлемі 1 ГБ диск томын жасау сипатталады.

Диск томын жасау үшін блоктық жад томын ұсынатын `vkcs_blockstorage_volume` ресурсы қажет болады. Блоктық жад томдарын жасауға, өзгертуге және жоюға болады.

```hcl
resource "vkcs_blockstorage_volume" "volume" {
  name = "volume"
  description = "test volume"
  metadata = {
    foo = "bar"
  }
  size = 1
  availability_zone = "ME1"
  volume_type = "ceph-ssd"
}
```

Мұнда:

- `name`: томның атауы.
- `description`: томның сипаттамасы.
- `metadata`: том метадеректері үшін кілттер мәндерінің картасы.
- `size`: (міндетті) томның гигабайтпен өлшенген өлшемі.
- `availability_zone`: (міндетті) том сақталатын ДК-нің қолжетімділік аймағының атауы.
- `volume_type`: (міндетті) томның түрі.

### {heading(Өзгерістерді қолдану)[id=terraform-volumes-apply]}

Мысал мәтінін `volume.tf` файлына қосыңыз және келесі командаларды орындаңыз:

```console
terraform init
```
```console
terraform apply
```

## {heading(Күй суретін (snapshot) жасау)[id=terraform-volumes-snapshot-create]}

Диск томының күй суретін жасау үшін жасалатын суреттің конфигурациясы сипатталатын `snapshot.tf` файлын жасаңыз. Төмендегі мысалдағы мәтінді қосыңыз және сіздің инфрақұрылымыңызға арналған баптаулар мәндерін түзетіңіз. Осы мысалда `vkcs_blockstorage_volume.volume.id` ресурсының ID-сы бар диск томының күй суретін жасау сипатталады.

Күй суретін жасау үшін блоктық жадтың күй суретін ұсынатын `vkcs_blockstorage_snapshot` ресурсы қажет болады. Блоктық жад томдарының күй суреттерін жасауға, өзгертуге және жоюға болады.

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

- `volume_id`: (міндетті) күй суреті жасалатын томның ID-сы.
- `name`: күй суретінің атауы.
- `description`: күй суретінің сипаттамасы.
- `metadata`: том метадеректері үшін кілттер мәндерінің картасы.

### {heading(Өзгерістерді қолдану)[id=terraform-volumes-snapshot-apply]}

Мысал мәтінін `snapshot.tf` файлына қосыңыз және келесі командаларды орындаңыз:

```console
terraform init
```
```console
terraform apply
```