# {heading(Қауіпсіздік топтарын жасау және баптау)[id=terraform-secgroups]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Мақалада Cloud Network қызметінде Terraform көмегімен қауіпсіздік топтарын жасау және баптау мысалдары келтірілген:

- жекелеген порттар үшін белгілі бір протокол бойынша трафикке рұқсат беру;
- барлық порттар үшін белгілі бір протокол бойынша трафикке рұқсат беру;
- барлық кіріс трафиігіне рұқсат беру.

Қауіпсіздік топтарын жасау және баптау кезінде мыналар қолданылады:

- Ресурстар (resource):

  - [vkcs_networking_secgroup](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_secgroup.md);
  - [vkcs_networking_secgroup_rule](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_secgroup_rule.md);
  - [vkcs_networking_port](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_port.md);
  - [vkcs_networking_port_secgroup_associate](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_port_secgroup_associate.md).

- Деректер көздері (data source):

  - [vkcs_networking_secgroup](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_secgroup.md);
  - [vkcs_networking_port](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_port.md).

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Дайындық қадамдар)[id=terraform-secgroups-prepare]}

1. {linkto(../../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоталарды]} тексеріңіз. Таңдалған {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=өңірде]} CDN-ресурсын жасауға жеткілікті ресурс бар екеніне көз жеткізіңіз. Әртүрлі өңірлер үшін әртүрлі квоталар орнатылуы мүмкін.

   Қажет болған жағдайда квоталарды {linkto(../../../../account/instructions/project-settings/manage#project-increase-quota)[text=арттырыңыз]}.

1. Егер бұрын жасалмаса, {linkto(../../../quick-start#terraform-quick-start)[text=Terraform орнатыңыз және провайдерді баптаңыз]}.

## {heading({counter(tf-secgroups)}. Желі сипаттамасы бар файлды жасаңыз)[id=terraform-secgroups-net-file]}

Желілік инфрақұрылымның сипаттамасы бар Terraform конфигурация файлын `network.tf` {linkto(../network#terraform-network)[text=жасаңыз]}:

- егер шектеу барлық порттар үшін орнатылуы керек болса, интернетке қол жетімділігі бар желіні жасаңыз;
- егер трафик шектеуін нақты бір порт үшін баптау қажет болса, интернетке қол жетімділігі бар желі мен портты жасаңыз.

## {heading({counter(tf-secgroups)}. Қауіпсіздік топтарының сипаттамасы бар файлды жасаңыз)[id=terraform-secgroups-file]}

Terraform конфигурация файлын `secgroup.tf` жасаңыз. Мазмұны қажет трафик шектеу ережелеріне байланысты:

{tabs}

{tab(Жекелеген порттар үшін)}

Файлда мынадақ қауіпсіздік ережелерінің конфигурациясы сипатталған:

1. `security_group` қауіпсіздік тобы жасалады.
1. Топта 22 порты үшін TCP протоколы бойынша кіріс трафиігіне рұқсат беретін ереже жасалады.
1. Ереже `network.tf` файлына қосылған портпен байланыстырылады.

{include(../../../../../_includes/_secgroups_tf.md)[tags=secgroup,ruleoneport,ruleassoc]}

{/tab}

{tab(Барлық порттар үшін)}

Файлда мынадақ қауіпсіздік ережелерінің конфигурациясы сипатталған:

1. `security_group` қауіпсіздік тобы жасалады.
1. Топта барлық порттар үшін UDP протоколы бойынша кіріс трафиігіне рұқсат беретін ереже жасалады.

{include(../../../../../_includes/_secgroups_tf.md)[tags=secgroup,alludp]}

{/tab}

{tab(Тек кіріс трафиігі)}

Файлда мынадақ қауіпсіздік ережелерінің конфигурациясы сипатталған:

1. `security_group` қауіпсіздік тобы жасалады.
1. Топта барлық кіріс трафиігіне рұқсат беретін ереже жасалады.

{include(../../../../../_includes/_secgroups_tf.md)[tags=secgroup,ingress]}

{/tab}

{tab(Алдын ала бапталған топтар)}

Файлда жобаға {linkto(../../../../../networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-secgroups)[text=алдын ала бапталған қауіпсіздік топтарын]} қосу конфигурациясы сипатталған.

{note:warn}
Егер олар жобада бұрыннан бар болса, ережелерді өзгертпеңіз және алдын ала бапталған қауіпсіздік топтарын Terraform арқылы жасамаңыз.
{/note}

{include(../../../../../_includes/_secgroups_tf.md)[tags=ssh,sshwww,rdp,rdpwww,all]}

{/tab}

{/tabs}

Мұнда:

- `enforce` — қауіпсіздік топтарын ауыстыру белгісі:

  - `true` — портта бұрыннан бар қауіпсіздік топтары манифестте көрсетілген топтармен ауыстырылады.
  - (әдепкі бойынша) `false` — портта бұрыннан бар қауіпсіздік топтары жойылмайды. Жаңа топтар қосылады.

- `direction` — трафик бағыты: кіріс `ingress` немесе шығыс `egress`.
- `port_id` — Floating IP-адрес байланыстырылатын порттың идентификаторы. Идентификаторды манифестте көрсетуге, деректер көзінен немесе ресурстан алуға болады.

  {cut(Мысалдар)}

  - `port_id = vkcs_networking_port.example.id`: порттың идентификаторы `vkcs_networking_port` ресурсы жасалғаннан кейін алынады.
  - `port_id = data.vkcs_networking_port.example.id`: порттың идентификаторы `vkcs_networking_port` деректер көзінен алынады.
  - `port_id = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: {var(cloud)} жеке кабинетіндегі {linkto(../../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=порттар тізімінен]} немесе Openstack CLI арқылы алынған идентификатор көрсетілген.

  {/cut}

- `port_range_max` — рұқсат етілген порттар диапазонының жоғарғы шегі, 1-ден 65535-ке дейінгі бүтін сан. Барлық порттарды таңдау үшін `port_range_min` және `port_range_max` аргументтерін көрсетпеңіз.
- `port_range_min` — рұқсат етілген порттар диапазонының төменгі шегі, 1-ден 65535-ке дейінгі бүтін сан. Барлық порттарды таңдау үшін `port_range_min` және `port_range_max` аргументтерін көрсетпеңіз.
- `protocol` — деректерді беру протоколы. Мүмкін мәндер: `tcp`, `udp`, `icmp`, `ah`, `dccp`, `egp`, `esp`, `gre`, `igmp`, `ospf`, `pgm`, `rsvp`, `sctp`, `udplite`, `vrrp`.
- `remote_ip_prefix` — қашықтағы CIDR, мәні жарамды болуы керек.
- `security_group_id` — ереже жасалатын қауіпсіздік тобының идентификаторы. Идентификаторды манифестте көрсетуге, деректер көзінен немесе ресурстан алуға болады.

  {cut(Мысалдар)}

  - `port_id = vkcs_networking_port.example.id`: қауіпсіздік тобының идентификаторы `vkcs_networking_secgroup` ресурсы жасалғаннан кейін алынады.
  - `port_id = data.vkcs_networking_port.example.id`: қауіпсіздік тобының идентификаторы `vkcs_networking_secgroup` деректер көзінен алынады.
  - `port_id = "bb76507d-bbbb-bbbb-bbbb-2bca1a4c4cfc"`: {var(cloud)} жеке кабинетіндегі {linkto(../../../../../networks/vnet/instructions/secgroups#vnet-secgroups-view)[text=қауіпсіздік топтарының тізімінен]} немесе Openstack CLI арқылы алынған идентификатор көрсетілген.

  {/cut}

- `security_group_ids` — қауіпсіздік топтарының идентификаторлары массиві.

## {heading({counter(tf-secgroups)}. Қажетті ресурстарды Terraform көмегімен жасаңыз)[id=terraform-secgroups-create-resource]}

1. Terraform конфигурация файлдарын бір директорияға орналастырыңыз:

   - `vkcs_provider.tf`;
   - `network.tf`;
   - `secgroup.tf`.

1. Осы директорияға өтіңіз.
1. Конфигурация файлдары дұрыс және қажетті өзгерістермен толтырылғанына көз жеткізіңіз:

   ```console
   terraform validate && terraform plan
   ```

1. Өзгерістерді қолданыңыз:

   ```console
   terraform apply
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## {heading({counter(tf-secgroups)}. Конфигурацияның қолданылуын тексеріңіз)[id=terraform-secgroups-check]}

Желі мен инфрақұрылым сәтті жасалғанына көз жеткізіңіз:

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://cloud.vk.ru/app/).
1. **Виртуалды желілер** → **Firewall баптаулары** бөліміне өтіңіз. Қауіпсіздік тобы жасалғанын және мысалда қосылған барлық ережелерді қамтитынын тексеріңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=terraform-secgroups-delete]}

Егер Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары орналасқан директорияға өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.