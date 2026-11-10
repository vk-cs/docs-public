# {heading(Желілерді жасау)[id=terraform-network]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Мақалада Cloud Network қызметінде Terraform көмегімен бұлтты желілерді жасау мысалдары келтірілген:

- жеке желі;
- интернетке қолжетімділігі бар желі;
- Floating IP-мекенжайына байланған порты бар желі.

Желілерді жасау кезінде мыналар қолданылады:

- Ресурстар (resource):

  - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md);
  - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md);
  - [vkcs_networking_router](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_router.md);
  - [vkcs_networking_router_interface](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_router_interface.md);
  - [vkcs_networking_port](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_port.md);
  - [vkcs_networking_floatingip](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_floatingip.md).

- Деректер көздері (data source):

  - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md);
  - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_subnet.md);
  - [vkcs_networking_router](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_router.md);
  - [vkcs_networking_port](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_port.md).

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Дайындық қадамдары)[id=terraform-network-prepare]}

1. {linkto(../../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоталарды]} тексеріңіз. Таңдалған {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=өңірде]} CDN-ресурсын жасауға жеткілікті ресурс бар екеніне көз жеткізіңіз. Әртүрлі өңірлер үшін әртүрлі квоталар орнатылуы мүмкін.

   Қажет болған жағдайда квоталарды {linkto(../../../../account/instructions/project-settings/manage#project-increase-quota)[text=арттырыңыз]}.

1. Әлі жасалмаған болса, {linkto(../../../quick-start#terraform-quick-start)[text=Terraform орнатыңыз және провайдерді баптаңыз]}.

## {heading({counter(tf-network)}. Желі сипаттамасы бар файлды жасаңыз)[id=terraform-network-net-file]}

Terraform конфигурация файлын `network.tf` жасаңыз. Мазмұны қажетті желі түріне байланысты:

{tabs}

{tab(Жеке желі жасау)}

Файлда келесі конфигурациядағы желілік инфрақұрылым сипатталған:

1. `Sprut` SDN-інде `example-tf-net` желісі жасалады.
1. `example-tf-net` желісінде `example-tf-subnet` ішкі желісі жасалады.
1. {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=Сыртқы желіге]} қосылымы жоқ `Sprut` SDN-інде `example-tf-router` маршрутизаторы жасалады.
1. `example-tf-subnet` ішкі желісі мен `example-tf-router` маршрутизаторы байланыстырылады.

{include(../../../../../_includes/_create_network_tf.md)[tags=net,router,shift=2]}

{/tab}

{tab(Интернетке қолжетімділігі бар желі жасау)}

Файлда келесі конфигурациядағы желілік инфрақұрылым сипатталған:

1. `Sprut` SDN-інде `example-tf-net` желісі жасалады.
1. `example-tf-net` желісінде `example-tf-subnet` ішкі желісі жасалады.
1. `Sprut` SDN-індегі {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=сыртқы желіге]} қосылымы бар `Sprut` SDN-інде `example-tf-router` маршрутизаторы жасалады.
1. `example-tf-subnet` ішкі желісі мен `example-tf-router` маршрутизаторы байланыстырылады.

{include(../../../../../_includes/_create_network_tf.md)[tags=extnet,net,extrouter,shift=2]}

{/tab}

{tab(Floating IP-мекенжайына байланған порты бар желі жасау)}

Файлда келесі конфигурациядағы желілік инфрақұрылым сипатталған:

1. `Sprut` SDN-інде `example-tf-net` желісі жасалады.
1. `example-tf-net` желісінде `example-tf-subnet` ішкі желісі жасалады.
1. `Sprut` SDN-індегі {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=сыртқы желіге]} қосылымы бар `Sprut` SDN-інде `example-tf-router` маршрутизаторы жасалады.
1. `example-tf-subnet` ішкі желісі мен `example-tf-router` маршрутизаторы байланыстырылады.
1. `192.168.199.23` IP-мекенжайы тағайындалған порт жасалады.
1. Порт Floating IP-мекенжайымен байланыстырылады.

{include(../../../../../_includes/_create_network_tf.md)[tags=extnet,net,extrouter,port]}

{/tab}

{/tabs}

Мұнда:

- `admin_state_up` — ресурсды `true` (қосулы) немесе `false` (өшіккен) статусында жасау.
- `external` — {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=сыртқы желінің]} белгісі: `true` немесе `false`.
- `external_network_id` — интернетке қолжетімділік үшін сыртқы желінің идентификаторы. Идентификаторды манифестте көрсетуге немесе деректер көзінен алуға болады.

  {cut(Мысалдар)}

  - `external_network_id = data.vkcs_networking_network.extnet.id`: идентификатор `vkcs_networking_network` деректер көзінен алынады.
  - `external_network_id = "bb76507d-dddd-dddd-dddd-2bca1a4c4cfc"`: {var(cloud)} жеке кабинетіндегі {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=желілер тізімінен]} немесе Openstack CLI арқылы алынған идентификатор көрсетіледі.

  {/cut}

- `fixed_ip` — порт үшін тұрақты IP-мекенжай. Блокта келесі аргументтерді көрсетеңіз:

  - `subnet_id` — порт осы ішкі желідегі IP-мекенжайлардың бірімен байланыстырылады. Тек осы аргумент көрсетілген болса, порт үшін IP-мекенжай ішкі желінің IP-мекенжайлар пулінен автоматты түрде таңдалады.
  - (Қалауыңызша) `ip_address` — порт көрсетілген IP-мекенжаймен байланыстырылады.

- `network_id` — желінің идентификаторы. Мысалдарда ішкі желі жаңа желілде орналастырылған. Ішкі желіні бар желілде де орналастыруға болады, ал идентификаторды манифестте көрсетуғе немесе деректер көзінен алуға болады.

  {cut(Мысалдар)}

  - `network_id = vkcs_networking_network.example.id`: ішкі желі `vkcs_networking_network` ресурсы жасайтын жаңа желілде орналастырылады.
  - `network_id = data.vkcs_networking_network.example.id`: ішкі желі бар желілде орналастырылады, оның идентификаторы `vkcs_networking_network` деректер көзінен алынады.
  - `network_id = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: ішкі желі бар желілде орналастырылады. {var(cloud)} жеке кабинетіндегі {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=желілер тізімінен]} немесе Openstack CLI арқылы алынған оның идентификаторы көрсетіледі.

  {/cut}

- `pool` — Floating IP-мекенжайлар пулы: `Sprut` {linkto(../../../../../networks/vnet/concepts/sdn#vnet-sdn)[text=SDN-і]} үшін `internet`, SDN Neutron үшін `ext-net`.
- `port_id` — Floating IP-мекенжайы байланыстырылатын порттың идентификаторы. Идентификаторды манифестте көрсетуғе, деректер көзінен немесе ресурс жасағаннан кейін алуға болады.

  {cut(Мысалдар)}

  - `port_id = vkcs_networking_port.example.id`: порттың идентификаторы `vkcs_networking_port` ресурсы жасалғаннан кейін алынады.
  - `port_id = data.vkcs_networking_port.example.id`: порттың идентификаторы `vkcs_networking_port` деректер көзінен алынады.
  - `port_id = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: {var(cloud)} жеке кабинетіндегі {linkto(../../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=желілер тізімінен]} немесе Openstack CLI арқылы алынған идентификатор көрсетілген.

  {/cut}

- `router_id` — ішкі желі байланыстырылатын маршрутизатордың идентификаторы. Мысалда ішкі желі жаңа маршрутизатормен байланыстырылған. Ішкі желіні бар маршрутизатормен де байланыстыруға болады, ал идентификаторды манифестте көрсетуғе немесе деректер көзінен алуға болады.

  {cut(Мысалдар)}

  - `router_id = vkcs_networking_subnet.example.id`: ішкі желі `vkcs_networking_router` ресурсы жасайтын жаңа маршрутизатормен байланыстырылады.
  - `router_id = data.vkcs_networking_subnet.example.id`: ішкі желі бар маршрутизатормен байланыстырылады, оның идентификаторы `vkcs_networking_router` деректер көзінен алынады.
  - `router_id = "bb76507d-cccc-cccc-cccc-2bca1a4c4cfc"`: ішкі желі бар маршрутизатормен байланыстырылады. {var(cloud)} жеке кабинетіндегі {linkto(../../../../../networks/vnet/instructions/router#vnet-router-view)[text=маршрутизаторлар тізімінен]} немесе Openstack CLI арқылы алынған оның идентификаторы көрсетіледі.

  {/cut}

- `sdn` — ресурс (желі, ішкі желі, маршрутизатор және т.б.) жасалатын {linkto(../../../../../networks/vnet/concepts/sdn#vnet-sdn)[text=SDN]}. Қолжетімді мәндер: `neutron`, `sprut`. SDN көрсетілмесе, әдепкі SDN қолданылады. Сіздің жобаңыз үшін қандай SDN қосылғанын {linkto(../../../../account/instructions/project-settings/manage#project-sdn-view)[text=жоба баптауларында]} білуге болады.
- `subnet_id` — ішкі желінің идентификаторы. Идентификаторды манифестте көрсетуғе, деректер көзінен немесе ресурс жасағаннан кейін алуға болады.

  {cut(Мысалдар)}

  - `subnet_id = vkcs_networking_subnet.example.id`: ішкі желінің идентификаторы `vkcs_networking_subnet` ресурсы оны жасағаннан кейін алынады.
  - `subnet_id = data.vkcs_networking_subnet.example.id`: ішкі желінің идентификаторы `vkcs_networking_subnet` деректер көзінен алынады.
  - `subnet_id = "bb76507d-bbbb-bbbb-bbbb-2bca1a4c4cfc"`: {var(cloud)} жеке кабинетіндегі {linkto(../../../../../networks/vnet/instructions/net#vnet-net-view)[text=желілер тізімінен]} немесе Openstack CLI арқылы алынған ішкі желінің идентификаторы көрсетіледі.

  {/cut}

## {heading({counter(tf-network)}. Қажетті ресурстарды Terraform көмегімен жасаңыз)[id=terraform-network-create]}

1. Terraform конфигурация файлдарын бір каталогқа орналастырыңыз:

   - `vkcs_provider.tf`;
   - `network.tf`.

1. Осы каталогқа өтіңіз.
1. Конфигурация файлдары дұрыс және қажетті өзгерістерді қамтитынына көз жеткізіңіз:

   ```console
   terraform validate && terraform plan
   ```

1. Өзгерістерді қолданыңыз:

   ```console
   terraform apply
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## {heading({counter(tf-network)}. Конфигурацияның қолданылуын тексеріңіз)[id=terraform-network-check]}

Желі мен инфрақұрылымның сәтті жасалғанына көз жеткізіңіз:

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://cloud.vk.ru/app/).
1. **Виртуалды желілер** → **Желілер** бөліміне өтіңіз. Желі жасалғанын және онда мысалда қосылған барлық ішкі желілер, маршрутизаторлар мен порттар бар екеніне көз жеткізіңіз.

## {heading(Қолданылмайтын ресурстарды жойыңыз)[id=terraform-network-delete]}

Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары орналасқан каталогқа өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.