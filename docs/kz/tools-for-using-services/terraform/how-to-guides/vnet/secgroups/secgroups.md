# {heading(Қауіпсіздік топтарын жасау және баптау)[id=terraform-secgroups]}

{include(/kz/_includes/_translated_by_ai.md)}

Мақалада Cloud Network сервисінде Terraform көмегімен қауіпсіздік топтарын жасау және баптау мысалдары келтірілген:

- белгілі бір хаттама бойынша жеке порттар үшін трафикке рұқсат беру;
- белгілі бір хаттама бойынша барлық порттар үшін трафикке рұқсат беру;
- барлық кіріс трафигіне рұқсат беру.

Қауіпсіздік топтарын жасау және баптау кезінде мыналар пайдаланылады:

- Ресурстар (resource):

  - [vkcs_networking_secgroup](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_secgroup.md);
  - [vkcs_networking_secgroup_rule](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_secgroup_rule.md);
  - [vkcs_networking_port](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_port.md);
  - [vkcs_networking_port_secgroup_associate](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_port_secgroup_associate.md).

- Дереккөздер (data source):

  - [vkcs_networking_secgroup](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_secgroup.md);
  - [vkcs_networking_port](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_port.md).

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Дайындық қадамдары)[id=terraform-secgroups-prepare]}

1. [Квоталарды](/kz/tools-for-using-services/account/concepts/quotasandlimits) тексеріңіз. Таңдалған [аймақта](/kz/tools-for-using-services/account/concepts/regions) желі мен қауіпсіздік топтарын жасауға жеткілікті ресурстар бар екеніне көз жеткізіңіз. Әртүрлі аймақтар үшін әртүрлі квоталар бапталуы мүмкін.

   Қажет болса, [квоталарды ұлғайтыңыз](/kz/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota).

1. Егер бұл әлі жасалмаса, [Terraform-ды орнатып, провайдерді баптаңыз](../../../quick-start).

## {heading({counter(tf-secgroups)}. Желі сипаттамасы бар файлды жасаңыз)[id=terraform-secgroups-net-file]}

Желілік инфрақұрылым сипатталған Terraform конфигурациясының `network.tf` файлын [жасаңыз](../network):

- егер шектеуді барлық порттар үшін баптау қажет болса, интернетке қолжетімділігі бар желі жасаңыз;
- егер трафик шектеуін нақты бір порт үшін баптау қажет болса, интернетке қолжетімділігі және порты бар желі жасаңыз.

## {heading({counter(tf-secgroups)}. Қауіпсіздік топтарының сипаттамасы бар файлды жасаңыз)[id=terraform-secgroups-file]}

Terraform конфигурациясының `secgroup.tf` файлын жасаңыз. Мазмұны трафикті шектеудің қажетті ережелеріне байланысты:

{tabs}

{tab(Жеке порттар үшін)}

Файлда қауіпсіздік ережелерінің келесі конфигурациясы сипатталған:

  1. `security_group` қауіпсіздік тобы жасалады.
  1. Топта 22-порт үшін TCP хаттамасы бойынша кіріс трафикке рұқсат беретін ереже жасалады.
  1. Ереже `network.tf` файлына қосылған портпен байланыстырылады.

  {include(../../../../../_includes/_secgroups_tf.md)[tags=secgroup,ruleoneport,ruleassoc]}

{/tab}

{tab(Барлық порттар үшін)}

Файлда қауіпсіздік ережелерінің келесі конфигурациясы сипатталған:

  1. `security_group` қауіпсіздік тобы жасалады.
  1. Топта барлық порттар үшін UDP хаттамасы бойынша кіріс трафикке рұқсат беретін ереже жасалады.

  {include(../../../../../_includes/_secgroups_tf.md)[tags=secgroup,alludp]}

{/tab}

{tab(Тек кіріс трафик)}

Файлда қауіпсіздік ережелерінің келесі конфигурациясы сипатталған:

  1. `security_group` қауіпсіздік тобы жасалады.
  1. Топта барлық кіріс трафикке рұқсат беретін ереже жасалады.

  {include(../../../../../_includes/_secgroups_tf.md)[tags=secgroup,ingress]}

{/tab}

{tab(Алдын ала бапталған топтар)}

Файлда жобаға [алдын ала бапталған қауіпсіздік топтарын](/kz/networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-secgroups) қосуға арналған конфигурация сипатталған.

{note:warn}
Егер олар жобада бұрыннан бар болса, ережелерді өзгертпеңіз және алдын ала бапталған қауіпсіздік топтарын Terraform арқылы жасамаңыз.
{/note}

  {include(../../../../../_includes/_secgroups_tf.md)[tags=ssh,sshwww,rdp,rdpwww,all]}

{/tab}

{/tabs}

Мұнда:

- `enforce` — қауіпсіздік топтарын ауыстыру белгісі:

  - `true` — портта бұрыннан бар қауіпсіздік топтары манифесте көрсетілгендерге ауыстырылады.
  - (әдепкі бойынша) `false` — портта бұрыннан бар қауіпсіздік топтары жойылмайды. Жаңа топтар қосылады.

- `direction` — трафик бағыты: кіріс `ingress` немесе шығыс `egress`.

- `port_id` — Floating IP мекенжайымен байланыстырылатын порт идентификаторы. Идентификаторды манифесте көрсетуге, дереккөзден немесе ресурстан алуға болады.

  {cut(Мысалдар)}

  - `port_id = vkcs_networking_port.example.id`: порт идентификаторы `vkcs_networking_port` ресурсы жасалғаннан кейін алынады.
  - `port_id = data.vkcs_networking_port.example.id`: порт идентификаторы `vkcs_networking_port` дереккөзінен алынады.
  - `port_id = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: {var(cloud)} жеке кабинетінде немесе Openstack CLI арқылы алынған [порттар тізімінен](/kz/networks/vnet/instructions/ports#vnet-ports-view) алынған идентификатор көрсетілген.

  {/cut}

- `port_range_max` — рұқсат етілген порттар ауқымының жоғарғы шегі, 1-ден 65535-ке дейінгі бүтін сан. Барлық порттарды таңдау үшін `port_range_min` және `port_range_max` аргументтерін көрсетпеңіз.

- `port_range_min`— рұқсат етілген порттар ауқымының төменгі шегі, 1-ден 65535-ке дейінгі бүтін сан. Барлық порттарды таңдау үшін `port_range_min` және `port_range_max` аргументтерін көрсетпеңіз.

- `protocol` — деректерді беру хаттамасы. Мүмкін мәндер: `tcp`, `udp`, `icmp`, `ah`, `dccp`, `egp`, `esp`, `gre`, `igmp`, `ospf`, `pgm`, `rsvp`, `sctp`, `udplite`, `vrrp`.

- `remote_ip_prefix` — қашықтағы CIDR, мәні жарамды болуы керек.

- `security_group_id` — ереже жасалатын қауіпсіздік тобының идентификаторы. Идентификаторды манифесте көрсетуге, дереккөзден немесе ресурстан алуға болады.

  {cut(Мысалдар)}

  - `port_id = vkcs_networking_port.example.id`: қауіпсіздік тобының идентификаторы `vkcs_networking_secgroup` ресурсы жасалғаннан кейін алынады.
  - `port_id = data.vkcs_networking_port.example.id`: қауіпсіздік тобының идентификаторы `vkcs_networking_secgroup` дереккөзінен алынады.
  - `port_id = "bb76507d-bbbb-bbbb-bbbb-2bca1a4c4cfc"`: {var(cloud)} жеке кабинетінде немесе Openstack CLI арқылы алынған [қауіпсіздік топтары тізімінен](/kz/networks/vnet/instructions/secgroups#vnet-secgroups-view) алынған идентификатор көрсетілген.

  {/cut}

- `security_group_ids` — қауіпсіздік топтары идентификаторларының массиві.

## {heading({counter(tf-secgroups)}. Terraform көмегімен қажетті ресурстарды жасаңыз)[id=terraform-secgroups-create-resource]}

1. Terraform конфигурациясы файлдарын бір директорияға орналастырыңыз:

   - `vkcs_provider.tf`;
   - `network.tf`;
   - `secgroup.tf`.

1. Осы директорияға өтіңіз.
1. Конфигурация файлдарының дұрыс екенін және қажетті өзгерістерді қамтитынын тексеріңіз:

   ```console
   terraform validate && terraform plan
   ```

1. Өзгерістерді қолданыңыз:

   ```console
   terraform apply
   ```

   Растауды сұрағанда, `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## {heading({counter(tf-secgroups)}. Конфигурацияның қолданылғанын тексеріңіз)[id=terraform-secgroups-check]}

Желі мен инфрақұрылымның сәтті жасалғанына көз жеткізіңіз:

1. {var(cloud)} [жеке кабинетіне](https://cloud.vk.com/app/) өтіңіз.
1. **Виртуалды желілер** → **Firewall баптаулары** бөліміне өтіңіз. Қауіпсіздік тобы жасалғанына және мысалда қосылған барлық ережелерді қамтитынына көз жеткізіңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=terraform-secgroups-delete]}

Егер Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурациясы файлдары бар директорияға өтіңіз.
1. Келесі команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растауды сұрағанда, `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.
