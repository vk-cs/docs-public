# {heading(NFS құру)[id=terraform-nfs]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{note:warn}
{linkto(../../../quick-start#terraform-quick-start)[text=Terraform орнатып, баптағаныңызға]} көз жеткізіңіз.
{/note}

NFS құру үшін жасалатын NFS конфигурациясы сипатталатын `nfs.tf` файлын жасаңыз. Осы мысалда NFS жасалады және екі IP мекенжайдан оқу мен жазу құқығы беріледе. Төмендегі мысалдағы мәтінді қосып, өзіңіздің NFS-іңіз үшін баптаулар мәндерін түзетіңіз.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(NFS үшін виртуалды желі құру)[id=terraform-nfs-net-create]}

NFS құрғанда бұл ресурс жасалатын желі мен подсеть көрсету қажет. Желі мен подсетьді {linkto(../create#terraform-iaas-create)[text=нұсқаулыққа]} сәйкес жасап, оларды төмендегі мысалдағы `vkcs_networking_network` және `vkcs_networking_subnet` ресурстарында көрсетуге болады.

Егер желі мен подсетьді басқа жолмен жасалған күйінде пайдаланғыңыз келсе, оларды тиісті ресурстардың орнына [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md) және [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_subnet.md) data source ретінде көрсетіңіз.

## {heading(NFS құру)[id=terraform-nfs-create]}

NFS құру үшін сізге келесі нысандар қажет:

- Ресурстар (resource):

  - `vkcs_networking_network` — NFS жасалатын желі. Төмендегі мысалда `sfs` атауымен желі жасалады.
  - `vkcs_networking_subnet` — желідегі подсеть. Мысалда: `sfs`.
  - `vkcs_sharedfilesystem_sharenetwork` — ортақ желіні (shared network) баптауға арналған ресурс. Ортақ желі NFS-серверлер NFS жасағанда пайдалана алатын ақпаратты сақтайды. Ол келесі ресурстарды қамтиды:

    - `name` — ортақ желінің атауы. Бұл параметрді өзгерту бар ортақ желінің атауын жаңартады.
    - `neutron_net_id` — ортақ желіні баптау немесе жаңарту кезіндегі нейтрондық желінің UUID идентификаторы. Бұл параметрді өзгерту ортақ ресурстар пайдаланып жатқан жағдайды қоспағанда, бар ортақ желіні жаңартады.
    - `neutron_subnet_id` — ортақ желіні баптау немесе жаңарту кезіндегі neutron подсетьінің UUID идентификаторы. Бұл параметрді өзгерту ортақ ресурстар пайдаланып жатқан жағайды қоспағанда, бар ортақ желіні жаңартады.

  - `vkcs_sharedfilesystem_share` — ортақ ресурсды баптауға арналған ресурс. Ол келесі ресурстарды қамтиды:

    - `name` — ортақ ресурстың атауы. Бұл параметрді өзгерту бар ортақ ресурстың атауын жаңартады.
    - `description` — ортақ ресурстың адам түсінетін сипаттамасы. Бұл параметрді өзгерту бар ортақ ресурстың сипаттамасын жаңартады.
    - `share_proto` — ортақ пайдалану хаттамасы, `NFS` немесе `CIFS` болуы мүмкін. Бұл параметрді өзгерту жаңа ортақ ресурс жасайды.
    - `share_type` — ортақ ресурс түрі. Параметр көрсетілмесе, әдепкі түр пайдаланылады.
    - `size` — үлес өлшемі, гигабайтпен. Сұралған ортақ ресурс өлшемі рұқсат етілген ГБ квотасынан аспауы керек. Бұл параметрді өзгерту бар ортақ ресурс өлшемін өзгертеді.
    - `share_network_id` — NFS-сервері бар желінің ID-сы.

  - `vkcs_sharedfilesystem_share_access`: ортақ пайдалану тізімдерін басқаруға арналған ресурс. Ол келесі ресурстарды қамтиды:

    - `share_id` — сізге рұқсат берілген ортақ ресурстың UUID-і.
    - `access_type` — рұқсат ережесінің түрі. `ip`, `user` немесе `cert` болуы мүмкін.
    - `access_to` — рұқсатты анықтайтын мән. Бұл IP-мекенжай немесе Ортақ желінің бапталған қауіпсіздік қызметі тексерген пайдаланушы атауы болуы мүмкін.
    - `access_level` — ортақ ресурсқа рұқсат деңгейі. `rw` — оқу және жазу рұқсаты немесе `ro` — тек оқу болуы мүмкін.

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

## {heading(Өзгерістерді қолдану)[id=terraform-nfs-apply]}

Мысал мәтінін `nfs.tf` файлына қосып, келесі командаларды орындаңыз:

```console
terraform init
```
```console
terraform apply
```