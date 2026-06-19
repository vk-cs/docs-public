# {heading(Желілерді жасау)[id=terraform-network]}

{include(/kz/_includes/_translated_by_ai.md)}

Мақалада Cloud Network сервисінде Terraform көмегімен бұлттық желілерді жасау мысалдары берілген:

- жеке желі;
- интернетке қолжетімді желі;
- Floating IP-адресіне байланыстырылған порты бар желі.

Желілерді жасау кезінде мыналар пайдаланылады:

- Ресурстар (resource):

  - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_network.md);
  - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_subnet.md);
  - [vkcs_networking_router](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_router.md);
  - [vkcs_networking_router_interface](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_router_interface.md);
  - [vkcs_networking_port](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_port.md);
  - [vkcs_networking_floatingip](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_floatingip.md).

- Дереккөздер (data source):

  - [vkcs_networking_network](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_network.md);
  - [vkcs_networking_subnet](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_subnet.md);
  - [vkcs_networking_router](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_router.md);
  - [vkcs_networking_port](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_port.md).

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Дайындық қадамдары)[id=terraform-network-prepare]}

1. [Квоталарды](/kz/tools-for-using-services/account/concepts/quotasandlimits) тексеріңіз. Таңдалған [аймақта](/kz/tools-for-using-services/account/concepts/regions) желілерді жасау үшін жеткілікті ресурстар бар екеніне көз жеткізіңіз. Әртүрлі аймақтар үшін әртүрлі квоталар бапталуы мүмкін.

   Қажет болса, [квоталарды ұлғайтыңыз](/kz/tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota).

1. Егер әлі жасалмаса, [Terraform-ды орнатып, провайдерді баптаңыз](../../../quick-start).

## {heading({counter(tf-network)}. Желінің сипаттамасы бар файлды жасаңыз)[id=terraform-network-net-file]}

Terraform конфигурациясының `network.tf` файлын жасаңыз. Мазмұны қажетті желі түріне байланысты:

{tabs}

{tab(Жеке желіні жасау)}

Файлда келесі конфигурациядағы желілік инфрақұрылым сипатталған:

  1. SDN `Sprut` ішінде `example-tf-net` желісі жасалады.
  1. `example-tf-net` желісінде `example-tf-subnet` ішкі желісі жасалады.
  1. SDN `Sprut` ішінде [сыртқы желіге](/kz/networks/vnet/concepts/net-types#vnet-net-types-external-net) қосылмайтын `example-tf-router` маршрутизаторы жасалады.
  1. `example-tf-subnet` ішкі желісі мен `example-tf-router` маршрутизаторы байланыстырылады.

{include(../../../../../_includes/_create_network_tf.md)[tags=net,router,shift=2]}

{/tab}

{tab(Интернетке қолжетімді желіні жасау)}

Файлда келесі конфигурациядағы желілік инфрақұрылым сипатталған:

  1. SDN `Sprut` ішінде `example-tf-net` желісі жасалады.
  1. `example-tf-net` желісінде `example-tf-subnet` ішкі желісі жасалады.
  1. SDN `Sprut` ішінде SDN `Sprut` жүйесіндегі [сыртқы желіге](/kz/networks/vnet/concepts/net-types#vnet-net-types-external-net) қосылған `example-tf-router` маршрутизаторы жасалады.
  1. `example-tf-subnet` ішкі желісі мен `example-tf-router` маршрутизаторы байланыстырылады.

{include(../../../../../_includes/_create_network_tf.md)[tags=extnet,net,extrouter,shift=2]}

{/tab}

{tab(Floating IP-адресіне байланыстырылған порты бар желіні жасау)}

Файлда келесі конфигурациядағы желілік инфрақұрылым сипатталған:

  1. SDN `Sprut` ішінде `example-tf-net` желісі жасалады.
  1. `example-tf-net` желісінде `example-tf-subnet` ішкі желісі жасалады.
  1. SDN `Sprut` ішінде SDN `Sprut` жүйесіндегі [сыртқы желіге](/kz/networks/vnet/concepts/net-types#vnet-net-types-external-net) қосылған `example-tf-router` маршрутизаторы жасалады.
  1. `example-tf-subnet` ішкі желісі мен `example-tf-router` маршрутизаторы байланыстырылады.
  1. Оған `192.168.199.23` IP-адресі тағайындалатын порт жасалады.
  1. Порт Floating IP-адресімен байланыстырылады.

  {include(../../../../../_includes/_create_network_tf.md)[tags=extnet,net,extrouter,port]}

{/tab}

{/tabs}

Мұнда:

- `admin_state_up` — ресурсты қосулы `true` немесе өшірулі `false` күйінде жасау.

- `external` — [сыртқы желінің](/kz/networks/vnet/concepts/net-types#vnet-net-types-external-net) белгісі: `true` немесе `false`.

- `external_network_id` — интернетке қол жеткізуге арналған сыртқы желі идентификаторы. Идентификаторды манифесте көрсетуге немесе дереккөзден алуға болады.

  {cut(Мысалдар)}

  - `external_network_id = data.vkcs_networking_network.extnet.id`: идентификатор `vkcs_networking_network` дереккөзінен алынады.
  - `external_network_id = "bb76507d-dddd-dddd-dddd-2bca1a4c4cfc"`: {var(cloud)} жеке кабинетіндегі [желілер тізімінен](/kz/networks/vnet/instructions/net#vnet-net-view) немесе Openstack CLI арқылы алынған идентификатор көрсетіледі.

  {/cut}

- `fixed_ip` — портқа арналған бекітілген IP-адрес. Блокта келесі аргументтерді көрсетіңіз:

  - `subnet_id` — порт осы ішкі желінің IP-адрестерінің бірімен байланыстырылады. Егер тек осы аргумент көрсетілсе, порт үшін IP-адрес ішкі желінің IP-адрестер пулынан автоматты түрде таңдалады.
  - (Опционалды) `ip_address` — порт көрсетілген IP-адреспен байланыстырылады.

- `network_id` — желі идентификаторы. Мысалдарда ішкі желі жаңа желіде орналастырылған. Ішкі желіні бар желіде де орналастыруға болады, ал идентификаторды манифесте көрсетуге немесе дереккөзден алуға болады.

  {cut(Мысалдар)}

  - `network_id = vkcs_networking_network.example.id`: ішкі желі `vkcs_networking_network` ресурсы жасайтын жаңа желіде орналастырылады.
  - `network_id = data.vkcs_networking_network.example.id`: ішкі желі бар желіде орналастырылады, оның идентификаторы `vkcs_networking_network` дереккөзінен алынады.
  - `network_id = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: ішкі желі бар желіде орналастырылады. {var(cloud)} жеке кабинетіндегі [желілер тізімінен](/kz/networks/vnet/instructions/net#vnet-net-view) немесе Openstack CLI арқылы алынған оның идентификаторы көрсетіледі.

  {/cut}

- `pool` — Floating IP-адрестер пулы: Sprut [SDN](/kz/networks/vnet/concepts/sdn) үшін `internet`, Neutron SDN үшін `ext-net`.

- `port_id` — Floating IP-адресімен байланыстырылатын порт идентификаторы. Идентификаторды манифесте көрсетуге, дереккөзден немесе ресурстан алуға болады.

  {cut(Мысалдар)}

  - `port_id = vkcs_networking_port.example.id`: порт идентификаторы `vkcs_networking_port` ресурсы жасалғаннан кейін алынады.
  - `port_id = data.vkcs_networking_port.example.id`: порт идентификаторы `vkcs_networking_port` дереккөзінен алынады.
  - `port_id = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: {var(cloud)} жеке кабинетіндегі [порттар тізімінен](/kz/networks/vnet/instructions/ports#vnet-ports-view) немесе Openstack CLI арқылы алынған идентификатор көрсетілген.

  {/cut}

- `router_id` — ішкі желі байланыстырылатын маршрутизатор идентификаторы. Мысалда ішкі желі жаңа маршрутизатормен байланыстырылған. Ішкі желіні бар маршрутизатормен де байланыстыруға болады, ал идентификаторды манифесте көрсетуге немесе дереккөзден алуға болады.

  {cut(Мысалдар)}

  - `router_id = vkcs_networking_subnet.example.id`: ішкі желі `vkcs_networking_router` ресурсы жасайтын жаңа маршрутизатормен байланыстырылады.
  - `router_id = data.vkcs_networking_subnet.example.id`: ішкі желі бар маршрутизатормен байланыстырылады, оның идентификаторы `vkcs_networking_router` дереккөзінен алынады.
  - `router_id = "bb76507d-cccc-cccc-cccc-2bca1a4c4cfc"`: ішкі желі бар маршрутизатормен байланыстырылады. {var(cloud)} жеке кабинетіндегі [маршрутизаторлар тізімінен](/kz/networks/vnet/instructions/router#vnet-router-view) немесе Openstack CLI арқылы алынған оның идентификаторы көрсетіледі.

  {/cut}

- `sdn` — ресурс (желі, ішкі желі, маршрутизатор және т.б.) жасалатын [SDN](/kz/networks/vnet/concepts/sdn). Қолжетімді мәндер: `neutron`, `sprut`. Егер SDN көрсетілмесе, әдепкі бойынша қолданылатын SDN пайдаланылады. Жобаңыз үшін қандай SDN қосылғанын [жоба баптауларынан](/kz/tools-for-using-services/account/instructions/project-settings/manage#project-sdn-view) білуге болады.

- `subnet_id` — ішкі желі идентификаторы. Идентификаторды манифесте көрсетуге, дереккөзден алуға немесе ресурс жасалғаннан кейін алуға болады.

  {cut(Мысалдар)}

  - `subnet_id = vkcs_networking_subnet.example.id`: ішкі желі идентификаторы `vkcs_networking_subnet` ресурсы арқылы жасалғаннан кейін алынады.
  - `subnet_id = data.vkcs_networking_subnet.example.id`: ішкі желі идентификаторы `vkcs_networking_subnet` дереккөзінен алынады.
  - `subnet_id = "bb76507d-bbbb-bbbb-bbbb-2bca1a4c4cfc"`: {var(cloud)} жеке кабинетіндегі [желілер тізімінен](/kz/networks/vnet/instructions/net#vnet-net-view) немесе Openstack CLI арқылы алынған ішкі желі идентификаторы көрсетіледі.

  {/cut}

## {heading({counter(tf-network)}. Terraform көмегімен қажетті ресурстарды жасаңыз)[id=terraform-network-create]}

1. Terraform конфигурациясының файлдарын бір директорияға орналастырыңыз:

   - `vkcs_provider.tf`;
   - `network.tf`.

1. Осы директорияға өтіңіз.
1. Конфигурация файлдарының дұрыс екенін және қажетті өзгерістерді қамтитынын тексеріңіз:

   ```console
   terraform validate && terraform plan
   ```

1. Өзгерістерді қолданыңыз:

   ```console
   terraform apply
   ```

   Растауды сұрағанда, `yes` деп енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

## {heading({counter(tf-network)}. Конфигурацияның қолданылуын тексеріңіз)[id=terraform-network-check]}

Желі мен инфрақұрылымның сәтті жасалғанына көз жеткізіңіз:

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://cloud.vk.com/app/).
1. **Виртуалды желілер** → **Желілер** бөліміне өтіңіз. Желінің жасалғанын және мысалда қосылған барлық ішкі желілерді, маршрутизаторларды және порттарды қамтитынын тексеріңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=terraform-network-delete]}

Егер Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурациясы файлдары бар директорияға өтіңіз.
1. Келесі команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растауды сұрағанда, `yes` деп енгізіңіз.

1. Операцияның аяқталуын күтіңіз.
