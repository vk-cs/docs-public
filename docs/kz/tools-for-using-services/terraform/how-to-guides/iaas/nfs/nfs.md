{include(/kz/_includes/_translated_by_ai.md)}

{note:warn}

[Terraform орнатып, баптағаныңызға](../../../quick-start) көз жеткізіңіз.

{/note}

NFS жасау үшін жасалатын NFS конфигурациясы сипатталатын `nfs.tf` файлын жасаңыз. Бұл мысалда NFS жасалып, екі IP мекенжайдан оқу және жазу қолжетімділігі беріледі. Төмендегі мысалдан мәтінді қосып, NFS үшін баптау мәндерін түзетіңіз.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## NFS үшін виртуалды желіні жасау

NFS жасау кезінде бұл ресурс жасалатын желі мен ішкі желіні көрсету қажет. Желіні және ішкі желіні [нұсқаулыққа](../create) сәйкес жасап, оларды төмендегі мысалдағы `vkcs_networking_network` және `vkcs_networking_subnet` ресурстарында көрсете аласыз.

Егер басқа жолмен жасалған желі мен ішкі желіні пайдаланғыңыз келсе, тиісті ресурстардың орнына оларды data source ретінде [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) және [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_subnet.md) арқылы көрсетіңіз.

## NFS жасау

NFS жасау үшін сізге келесі объектілер қажет болады:

- Ресурстар (resource):

  - `vkcs_networking_network`: NFS жасалатын желі. Төмендегі мысалда `sfs` атауымен желі жасалады.
  - `vkcs_networking_subnet`: желідегі ішкі желі. Мысалда: `sfs`.
  - `vkcs_sharedfilesystem_sharenetwork`: ортақ желіні (shared network) баптауға арналған ресурс. Ортақ желі NFS серверлері NFS жасау кезінде пайдалана алатын ақпаратты сақтайды. Келесі ресурстарды қамтиды:

    - `name`: ортақ желінің атауы. Бұл параметрді өзгерту қолданыстағы ортақ желінің атауын жаңартады.
    - `neutron_net_id`: ортақ желіні баптау немесе жаңарту кезіндегі нейтрон желісінің UUID идентификаторы. Бұл параметрді өзгерту, егер ол ортақ ресурстармен пайдаланылмаса, қолданыстағы ортақ желіні жаңартады.
    - `neutron_subnet_id`: ортақ желіні баптау немесе жаңарту кезіндегі neutron ішкі желісінің UUID идентификаторы. Бұл параметрді өзгерту, егер ол ортақ ресурстармен пайдаланылмаса, қолданыстағы ортақ желіні жаңартады.

  - `vkcs_sharedfilesystem_share`: ортақ ресурсты баптауға арналған ресурс. Келесі ресурстарды қамтиды:

    - `name`: ортақ ресурстың атауы. Бұл параметрді өзгерту қолданыстағы ортақ ресурстың атауын жаңартады.
    - `description`: адамға түсінікті ортақ ресурс сипаттамасы. Бұл параметрді өзгерту қолданыстағы ортақ ресурс сипаттамасын жаңартады.
    - `share_proto`: ортақ қолжетімділік протоколы - `NFS`, `CIFS`, `CEPHFS`, `GLUSTERFS`, `HDFS` немесе `MAPRFS` болуы мүмкін. Бұл параметрді өзгерту жаңа ортақ ресурсты жасайды.
    - `share_type`: ортақ ресурс түрі. Егер параметр көрсетілмесе, әдепкі түр пайдаланылады.
    - `size`: үлестің өлшемі, гигабайтпен. Сұралған ортақ ресурс өлшемі ГБ бойынша рұқсат етілген квотадан аса алмайды. Бұл параметрді өзгерту қолданыстағы ортақ ресурс өлшемінің өзгеруіне әкеледі.
    - `share_network_id`: NFS сервері бар желінің ID-сы.

  - `vkcs_sharedfilesystem_share_access`: ортақ қолжетімділік тізімдерін басқаруға арналған ресурс. Келесі ресурстарды қамтиды:

    - `share_id`: сізге қолжетімділік берілген ортақ ресурстың UUID-і.
    - `access_type`: қолжетімділік ережесінің түрі. `ip`, `user`, `cert` немесе `cephx` болуы мүмкін.
    - `access_to`: қолжетімділікті анықтайтын мән. Бұл не IP мекенжайы, не Ортақ желінің бапталған қауіпсіздік қызметімен тексерілген пайдаланушы аты болуы мүмкін.
    - `access_level`: ортақ ресурсқа қолжетімділік деңгейі. `rw` -- оқу және жазу қолжетімділігі немесе `ro` -- тек оқу болуы мүмкін.

`nfs.tf` файлының мысалы:

```hcl

resource "vkcs_networking_network" "sfs" {
      name = "network"
    }

resource "vkcs_networking_subnet" "sfs" {
  name = "subnet"
  cidr = "192.168.199.0/24"
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

## Өзгерістерді қолдану

Мысал мәтінін `nfs.tf` файлына қосып, келесі командаларды орындаңыз:

```console
terraform init
```
```console
terraform apply
```
