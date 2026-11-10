{include(/kz/_includes/_translated_by_ai_kz.md)}

Image-based қолданбаңызды Marketplace қызметіне қосу үшін [дайындық қадамдарын](#preparatory_steps) орындаңыз. Содан кейін:

1. [Қызметтік пакеттің файлдық құрылымының негізін жасаңыз](#service_pack_structure).
1. [Қызметтің конфигурациясын сипаттаңыз (тарифтік жоспарлар, опциялар)](#service_config).
1. [Қызметіңіз үшін инфрақұрылым конфигурациясын сипаттайтын Terraform манифесттерін жасаңыз](#service_infrastructure).
1. (Қалауыңыз бойынша) [Terraform манифестерінде бар ресурстардың дұрыс көрсетілгенін тексеріңіз](#check_existing_resources).
1. (Қалауыңыз бойынша) [Terraform манифесттерін жергілікті түрде тестілендіріңіз](#test_manifest_locally).
1. (Қалауыңыз бойынша) [Terraform манифесттерін орналастыру жүйесімен тестілендіріңіз](#test_manifest_with_deploy_system).
1. (Қалауыңыз бойынша) [Marketplace агентінің логтарын және жұмыс нәтижелерін қараңыз](#agent_log).
1. [Қызметтік пакетті Marketplace-ке жүктеңіз](#upload_package).
1. [Жарияланғанға дейін жүктелген қызметті тестілендіріңіз](#upload_test).
1. [Қызметтің образын жариялаңыз](#publish_service_image).
1. [Қызметті Marketplace-те жариялаңыз](#publish_service).

## {heading(Дайындық қадамдары)[id=preparatory_steps]}

1. Қолданбаңыз [Marketplace қызметінің талаптарына](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based) сәйкес келетініне көз жеткізіңіз.
1. Image-based қолданбаның образын VK Cloud жүйесіне [жасаңыз және жүктеңіз](../create-ib-app-image).
1. Қолданбаңыз үшін [тарификация түрін](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/billing) анықтаңыз, тарифтік [жоспарларды](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing) және [опцияларды](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_option_types) әзірлеңіз.
1. Жеткізуші кабинетіне [қосылыңыз](../../../connect).

## {heading({counter(H2)}. Қызметтік пакеттің файлдық құрылымының негізін жасаңыз)[id=service_pack_structure]}

Image-based қолданбаны Marketplace қызметіне жүктеу үшін қажетті барлық ақпарат белгілі бір файлдық құрылымы бар қызметтік пакет түрінде дайындалады.

{cut(Қызметтік пакеттің файлдық құрылымының мысалы)}

```text
image_based_service
├── images
│   └── icon.png
├── parameters
│   ├── api_requests_daily_limit.yaml
│   ├── checklists_per_product.yaml
│   ├── export_issues.yaml
│   ├── groups.yaml
│   ├── members.yaml
│   └── report_notifications.yaml
├── plans
│   ├── advanced
│   ├── basic
│   └── free
│       └── deployment
│           ├── deploy.tf
│           ├── settings.yaml
│       ├── display.yaml
│       └── plan.yaml
├── full_description.md
├── service.yaml
└── version.yaml
```

{/cut}

{note:warn}
Қызметтік пакеттің файлдары мен директорияларының атаулары үшін тек латын әріптерін және `_` таңбасын пайдаланыңыз.
{/note}

Файлдық құрылымды дайындау үшін:

1. `<ИМЯ_СЕРВИСА>` атты қызмет директориясын жасаңыз.
1. Қызмет директориясында `version.yaml` файлын жасаңыз. Файлда мынаны көрсетіңіз:

   ```yaml
   version: 0.0.1
   ```

1. `<ИМЯ_СЕРВИСА>` директориясында `images`, `parameters` және `plans` директорияларын жасаңыз.
1. `images` директориясына `.png` немесе `.svg` форматындағы қызмет иконкасы бар файлды орналастырыңыз. Файл өлшемі — 1 МБ-тан аспауы тиіс. Сурет ажыратымдылығы — кемінде 62 × 62 пиксель.

   Қызмет иконкасы қызмет карточкасында көрсетіледі:

   - Marketplace каталогында;
   - қызмет бетіндегі **Қызметтің сипаттамасы** қойыншасында.

## {heading({counter(H2)}. Қызметтің конфигурациясын сипаттаңыз (тарифтік жоспарлар, опциялар))[id=service_config]}

Қызметтің конфигурациясы `.yaml` және `.md` форматындағы файлдар арқылы сипатталады.

1. `<ИМЯ_СЕРВИСА>` директориясында `service.yaml` файлын жасап, оны толтырыңыз.

   `service.yaml` файлы мыналарды қамтиды:
   - қызметтің жалпы параметрлері;
   - `plans` массиві түріндегі тарифтік жоспарлардың атаулары (бұдан әрі — `<ИМЯ_ПЛАНА>`);
   - `preview` секциясындағы `parameters` массиві түріндегі тарифтік опциялардың атаулары (бұдан әрі — `<ИМЯ_ОПЦИИ>`).

   `<ИМЯ_ПЛАНА>` және `<ИМЯ_ОПЦИИ>` тек қызметтік пакет ішінде қолданылады және Marketplace интерфейсінде көрсетілмейді.

   Файл құрылымы:

   ```yaml
   # Қызметтің жалпы параметрлері
   id: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   revision: v. X.X
   name: <ИМЯ_СЕРВИСА>
   short_description: <КОРОТКОЕ_ОПИСАНИЕ>
   singleton: <ФЛАГ>                        # true | false
   auto_bind: <ФЛАГ>                        # true | false
   icon: <ФАЙЛ>                             # Қызмет иконкасы бар файлдың атауы
   help: <URL>                              # Қызмет құжаттамасына сілтеме
   bindable: <ФЛАГ>                         # true | false
   plan_updateable: <ФЛАГ>                  # true | false
   deactivatable: <ФЛАГ>                    # true | false
   bindings_retrievable: <ФЛАГ>             # true | false
   instances_retrievable: <ФЛАГ>            # true | false

   # plans массиві
   plans:
   - name: <ИМЯ_ПЛАНА_1>
   - name: <ИМЯ_ПЛАНА_2>

   # preview секциясы
   preview:
   parameters:
   - name: <ИМЯ_ОПЦИИ_1>
   - name: <ИМЯ_ОПЦИИ_2>
   - name: <ИМЯ_ОПЦИИ_3>
   ```

   {cut(Қызметтің жалпы параметрлері)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=service.yaml-common-param]}

   {/cut}

   {cut(plans массиві)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=service.yaml-plans]}

   {/cut}

   {cut(preview секциясы)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=service.yaml-preview]}

   {/cut}

   {cut(service.yaml файлының мысалы)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=service.yaml-example]}

   {/cut}

1. `<ИМЯ_СЕРВИСА>` директориясында `full_description.md` файлын жасап, оны Markdown форматындағы қызмет сипаттамасымен толтырыңыз. Файл мазмұны оның Marketplace-тегі бетінде көрсетіледі.

   Файл құрылымы:

    ```md
   <!--Қызметтің 2-3 сөйлемнен тұратын қысқаша жалпы сипаттамасы-->

   <!--Жеткізушінің атауы-->

   ## Шешілетін міндеттер

   <!--Қызметті қандай міндеттерді шешу үшін пайдалануға болады-->

   ## Қызметтің сипаттамалары:

   <!--Техникалық сипаттамалар, кесте түрінде берген жөн-->

   <!--Инфрақұрылымға қойылатын талаптар, қандай ресурстар пайдаланылуы мүмкін-->

   # Тарификация ережелері

   <!--Қызмет қандай модель бойынша тарифтеледі, қандай тарифтік жоспарлар бар-->

   # Пайдалы сілтемелер

   <!--VK Cloud құжаттамасындағы Marketplace бөліміне сілтеме + жеткізуші порталындағы құжаттамаға сілтеме-->

   # Техникалық қолдау

   <!--Қызметтің техникалық қолдауы, VK Cloud техникалық қолдауы туралы ақпарат, қызметтің техникалық қолдау байланыстары-->

   # Лицензиялық келісім
   <!--VK Cloud және жеткізуші қызметінің заңды құжаттарына сілтеме-->
    ```

   {cut(Қызмет туралы ақпарат)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=full_description-ib-general]}

   {/cut}

   {cut(Тарификация ережелері)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=full_description-ib-tariff]}

   {/cut}

   {cut(Пайдалы сілтемелер)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=full_description-links]}

   {/cut}

   {cut(Техникалық қолдау)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=full_description-ib-support]}

   {/cut}

   {cut(Лицензиялық келісім)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=full_description-legal]}

   {/cut}

1. `parameters` директориясында әрбір [тарифтік опция](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_option_types) үшін `<ИМЯ_ОПЦИИ>.yaml` файлын жасап, оны [мысалдарға](/kz/tools-for-using-services/vendor-account/reference/ib-apps-reference/tariff-options-examples) сәйкес толтырыңыз.

   Қаражаттың артық жұмсалуына жол бермеу үшін ақылы тарифтік опциялар үшін тестілеу кезеңіне арналған қызметтің ең төменгі құнын көрсетіңіз.

1. `plans` директориясында әрбір тарифтік жоспар үшін `<ИМЯ_ПЛАНА>` директориясын жасаңыз. Әрбір `<ИМЯ_ПЛАНА>` директориясында `plan.yaml` файлын жасап, толтырыңыз:

   Файл құрылымы:

   ```yaml
   # Тарифтік жоспардың жалпы параметрлері
   id: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   revision: v. X.X
   name: <ИМЯ_ПЛАНА>
   description: <КОРОТКОЕ_ОПИСАНИЕ>
   free: <ФЛАГ> # true | false

   # billing секциясы
   billing:
   cost: <СТОИМОСТЬ>
   refundable: <ФЛАГ> # true | false
   billing_cycle_flat: <ДЛИНА_ОТЧЕТНОГО_ПЕРИОДА>

   # parameters_patch секциясы
   parameters_patch:
   users:
      schema.const: 5000
   volume_data_size:
      schema.default: 550
      schema.minimum: 550
   ```

   {cut(Тарифтік жоспардың жалпы параметрлері)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=plan.yaml-common-param]}

   (Қалауыңыз бойынша) Егер тарифтік жоспар тегін болса, [resource_usage секциясында](../../../reference/ib-apps-reference/ib-plan#plan_parameters) кейін төлемді тарифтік опцияларды тізіп көрсетіңіз.

      Бір тарифтік жоспар шеңберінде тек бір [тарификация](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing) түріндегі опцияларға ғана рұқсат етіледі: алдын ала төлемді опциялары бар тарифтік жоспар немесе кейін төлемді опциялары бар тарифтік жоспар.

   {/cut}

   {cut(Тарифтік жоспардың billing секциясы)}

   Ақылы тарифтік опцияларды есептемей, есепті кезең үшін тарифтік жоспардың құнын көрсетіңіз.

   Тарифтік жоспардың нөлдік емес құнын тек алдын ала төлемді [тарификация](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing) түрі үшін ғана көрсетуге болады. [Бөлінген бонустық қаражатты](#preparatory_steps) тиімді пайдалану үшін Marketplace-те қызметті тестілеу кезеңіне арналған тарифтік жоспардың тестілік құнын көрсетіңіз.

   {note:warn}

   VK Cloud платформасының есептеу ресурстарын пайдалану құны қызметтің тарифтік жоспарының құнына кірмейді.

   {/note}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=plan.yaml-billing]}

   {/cut}

   {cut(parameters_patch секциясы)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=plan.yaml-parameters_patch]}

   (Қалауыңыз бойынша) [parameters_patch секциясында](../../../reference/ib-apps-reference/ib-plan#plan_options) `<ИМЯ_ПЛАНА>` тарифтік жоспары үшін тарифтік опциялардың қажетті параметрлерін қайта анықтаңыз.

   {/cut}

   {cut(plan.yaml файлының мысалы)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=plan.yaml-example]}

   {/cut}

1. `<ИМЯ_ПЛАНА>` директориясында тарифтік жоспардың конфигурация шеберінің сипаттамасы бар `display.yaml` файлын жасап, толтырыңыз. Тарифтік жоспардың конфигурация шебері қызметті қосу немесе тарифтік жоспарды жаңарту кезінде Marketplace-те көрсетіледі.

   {cut(pages массиві)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=display.yaml-pages]}

   {/cut}

   {cut(entities массиві)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-common]}

   {cut(ВМ)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-vm]}

   {/cut}

   {cut(Жүктеме теңгерушісі)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-lb]}

   {/cut}

   {cut(Сыртқы IP-мекенжай)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-ip]}

   {/cut}

   {/cut}

   {cut(when конструкциясы)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=display.yaml-when-common]}

   {cut(pages массивіндегі when конструкциясы)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=display.yaml-when-pages]}

   {/cut}

   {cut(entities массивіндегі when конструкциясы)}

   {include(/kz/_includes/_xaas_ib_params.md)[tags=display.yaml-when-entities]}

   {/cut}

   {/cut}

## {heading({counter(H2)}. Қызмет үшін инфрақұрылым конфигурациясын сипаттайтын Terraform манифестерін жасаңыз)[id=service_infrastructure]}

   1. `plans/<ИМЯ_ПЛАНА>` директориясында `deployment` директориясын жасаңыз.
   1. `deployment` директориясында мынаны жасап, толтырыңыз:

      - `<ИМЯ_ПЛАНА>` тарифтік жоспарын Marketplace-те орналастыру процесі мен инфрақұрылымын сипаттайтын [Terraform манифесімен](../../../reference/ib-apps-reference/tf-manifest) `deploy.tf` файлы.

         {note:info}

         Бірнеше манифестпен жұмыс істеу де қолдау көрсетіледі.

         {/note}

      - (Қалауыңыз бойынша) манифестті орындау баптаулары бар [settings.yaml файлы](../../../reference/ib-apps-reference/tfmanifest_settings). Егер қызметтік пакетте `settings.yaml` файлы болмаса, Terraform манифестеріне әдепкі параметр мәндері қолданылады.

## {heading({counter(H2)}. (Қалауыңыз бойынша) Terraform манифестерінде бар ресурстардың дұрыс көрсетілгенін тексеріңіз)[id=check_existing_resources]}

Terraform манифестерін тестілеу уақытын қысқарту және дұрыс емес конфигурациямен ресурс жасау әрекеттерін болдырмау үшін манифестерді тестілеуден бұрын оларда VK Cloud жүйесінде бұрыннан бар ресурстардың параметрлері дұрыс көрсетілгенін тексеру ұсынылады, мысалы: ВМ түрі, қызмет образы және т.б.

1. Бұрын жасалмаған болса, [Terraform орнатыңыз және ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).
1. Жұмыс директориясында мына команданы орындаңыз:

   ```console
   terraform init
   ```

1. Жұмыс директориясында `main.tf` файлын жасаңыз.
1. `main.tf` файлына [VK CS провайдерінің қажетті деректер көздеріне](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/data-sources) өтінімдерді орналастырыңыз.

   [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/data-sources) деректер көзіне өтінім мысалы:

   ```hcl
   data "vkcs_compute_flavor" "compute" {
   flavor_id = "4e115a9b-XXXX-95cf130d63c7"
   }
   ```

   Бұл мысалда ID-сы `4e115a9b-XXXX-95cf130d63c7` болатын ВМ түрінің VK Cloud жүйесінде бар екені тексеріледі.

1. Жұмыс директориясында мына команданы орындаңыз:

   ```console
   terraform apply
   ```

   Растауды сұрағанда `yes` деп енгізіңіз.

1. Операцияның аяқталуын күтіңіз. Деректер көздеріне өтінім жасағанда қателер болмағанына көз жеткізіңіз.

## {heading({counter(H2)}. (Қалауыңыз бойынша) Terraform манифестерін жергілікті түрде тестілендіріңіз)[id=test_manifest_locally]}

Қолданбаңыздың әрбір тарифтік жоспары үшін `plans/<ИМЯ_ПЛАНА>/deployment/deploy.tf` Terraform манифестерін [нұсқаулықты](../local-tfmanifest-testing) пайдаланып жергілікті түрде тестілендіріңіз.

## {heading({counter(H2)}. (Қалауыңыз бойынша) Terraform манифестерін орналастыру жүйесімен тестілендіріңіз)[id=test_manifest_with_deploy_system]}

Қызметтік пакетті Marketplace-ке жүктеуден бұрын қолданбаңыздың әрбір жоспары үшін `plans/<ИМЯ_ПЛАНА>/deployment/deploy.tf` Terraform манифестерінің әрқайсысын орналастыру жүйесінің API көмегімен тестілендіріңіз:

1. Бұрын жасалмаған болса, API арқылы қолжетімділікті [қосыңыз](/kz/tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate).
1. API-ге қолжетімділік токенін [алыңыз](/kz/tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token-gen).
1. Манифестердің бірін — `plans/<ИМЯ_ПЛАНА>/deployment/deploy.tf` — орналастыру жүйесіне [жүктеңіз](../../../reference/ib-apps-reference/test-tfmanifest#upload_terraform_manifest).
1. Жүктелген манифестің ағымдағы конфигурациясын [тексеріңіз](../../../reference/ib-apps-reference/test-tfmanifest#check_terraform_configuration).
1. Қызмет инстансын [жасаңыз](../../../reference/ib-apps-reference/test-tfmanifest#create_service_instance).
1. Инстансты жасау барысында және жасалғаннан кейін оның күйін [тексеріңіз](../../../reference/ib-apps-reference/test-tfmanifest#check_instance_status). Егер күйі `failed` болса, инстанстың логтарынан қате сипаттамасын [табыңыз](../../../reference/ib-apps-reference/test-tfmanifest#deploysystemtest_log).
1. Қызмет инстансын [жойыңыз](../../../reference/ib-apps-reference/test-tfmanifest#delete_service_instance).
1. Жойылған қызмет инстансының күйін [тексеріңіз](../../../reference/ib-apps-reference/test-tfmanifest#check_instance_status). Егер күйі `failed` болса, инстанстың логтарынан қате сипаттамасын [табыңыз](../../../reference/ib-apps-reference/test-tfmanifest#deploysystemtest_log).

Қолданбаңыздың қалған тарифтік жоспарлары үшін манифестерді де осылайша тестілендіріңіз.

## {heading({counter(H2)}. (Қалауыңыз бойынша) Marketplace агентінің логтарын және жұмыс нәтижелерін қараңыз)[id=agent_log]}

Marketplace агентінің логтары мен жұмыс нәтижелерін қарау арқылы қызмет инстансын орналастыру кезіндегі қателерді анықтауға болады. Олар қолданбаңызды орналастыру кезінде [ivkcs_agent_exec](/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_agent_exec) ресурсы арқылы орындалатын [скрипттер](../../../reference/ib-apps-reference/tfmanifest_script) пайдаланылса, қолжетімді болады.

Агенттің логтары мен жұмыс нәтижелерін қарау үшін:

1. Агент орнатылған [ВМ-ге қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect) қашықтан қолжетімділік хаттамасы арқылы немесе VK Cloud жеке кабинетіндегі VNC-консоль көмегімен.

   Агент орнатылған ВМ-нің атауы `plans/<ИМЯ_ПЛАНА>/deployment/deploy.tf` манифестіндегі `ivkcs_agent_init` немесе `ivkcs_user_data` ресурсында беріледі.

1. Логтарды қарау үшін `journalctl -u sower` командасын орындаңыз.
1. Нәтижелерді қарау үшін `/etc/sower/result` директориясына өтіңіз.

## {heading({counter(H2)}. Қызметтік пакетті Marketplace-ке жүктеңіз)[id=upload_package]}

1. Қызметтік пакетті, яғни қызметтің конфигурациялық файлдары мен Terraform манифестері бар `<ИМЯ_СЕРВИСА>` директориясын zip-архивке ораңыз. Архив өлшемі 30 МБ-тан аспауы тиіс.
1. Архивті Marketplace-ке мына тәсілдердің бірімен жүктеңіз:

   {tabs}

   {tab(Жеткізуші кабинеті)}

   1. VK Cloud жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app/).
   1. **Қосымшалар дүкені** бөлімінде **Жеткізуші кабинетіне өту** түймесін басыңыз.
   1. **Сервистерді басқару** қойыншасында **Сервис қосу** түймесін басыңыз.
   1. Жүйеге жүктеу үшін құрылғыңыздан zip-архивті таңдаңыз.
   1. **Қосу** түймесін басыңыз.

   Осыдан кейін қосылған қызмет сервистер тізімінде `Жасырын` күйінде пайда болады. Жүктелген архив файлы валидацияға жіберіледі.

   {/tab}

   {tab(Infra API)}

   Infra API қызметіне мына параметрлермен сұрау жіберіңіз:

   - Сұрау әдісі: `POST`.
   - Сұрау жолы: `https://<ХОСТ_VK_CLOUD>/marketplace/api/infra-api/api/v1-public/product`.

      Мұнда `<ХОСТ_VK_CLOUD>` — VK CLOUD платформасының домендік атауы `https://cloud.vk.ru`.

   - Сұрау денесі: zip-архив.
   - `x-service-token`: `<СЕРВИСНЫЙ_КЛЮЧ>` — [дайындық кезеңінде](#preparatory_steps) Marketplace-тен алынған қызметтік кілт.

   Қызметтік пакетті Marketplace-ке жүктеу сұранысының мысалы:

   {tabs}

   {tab(Linux (bash))}

   ```console
   curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/product \
   -H 'x-service-token: <SERVICE_TOKEN>' \
   -F "upload=@/home/VKservice.zip"
   ```

   {/tab}

   {tab(Windows (cmd))}

   ```console
   curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/product ^
   -H "x-service-token: <SERVICE_TOKEN>" ^
   -F "upload=@/home/VKservice.zip"
   ```

   {/tab}

   {/tabs}

   Жауаптың HTTP-кодтары:

      - `204` — қызметтік пакет жүктелді.
      - `400`, `404`, `500` — сұранысты орындау қатесі.
      - `401` — авторизация қатесі.

   Тарифтік жоспарлар мен қызмет опцияларын сипаттайтын конфигурациялық файлдар image-based брокерге, Terraform манифестері — орналастыру жүйесіне беріледі.

   {/tab}

   {/tabs}

   Marketplace-ке жүктелген қызметтік пакет алдымен тестілік кеңістікке түседі, жарияланғаннан кейін — ашық кеңістікке.

1. Қызметті жүктеу аяқталғаннан кейін VK Cloud жеке кабинетіне кіріп, қызмет Marketplace-те көрсетілетінін тексеріңіз. Жүктелген қызмет тек [қызметтік кілтте](#preparatory_steps) көрсетілген Marketplace тестілік кеңістіктерінің пайдаланушыларына ғана қолжетімді болады.

   Егер жүктегеннен кейін қызмет Marketplace-те көрсетілмесе, жеке кабинеттен шығып, қайта кіріңіз.

## {heading({counter(H2)}. Жарияланғанға дейін жүктелген қызметті тестілендіріңіз)[id=upload_test]}

{note:info}
Қызметті тестілеу үшін Marketplace-тен [дайындық кезеңінде](#preparatory_steps) алынған бонустарды пайдаланыңыз.
{/note}

Қызметтің Marketplace тестілік кеңістігінде қалай жұмыс істейтінін тексеру үшін:

1. VK Cloud жеке кабинетінің **Қосымшалар дүкені** бөліміне [өтіңіз](https://msk.cloud.vk.ru/app/services/marketplace).
1. **Барлық шешімдер** түймесін басыңыз.
1. Қызметіңіздің карточкасын басып, **Тарифтік жоспарлар** қойыншасына өтіңіз.
1. Әр тарифтік жоспардың конфигурация шебері дұрыс көрсетілетінін тексеріңіз.
1. Қызметті қосыңыз. Қызмет инстансын орналастыру сәтті орындалғанын тексеріңіз.

   Қызмет инстансын орналастыру кезінде манифестте сипатталған ресурсты жасау мүмкін болмаса, орналастыру жүйесі қызметті орналастыру процесін қайта іске қосады. Қайталау әрекеттері 1,5 сағатқа дейін уақыт алуы мүмкін және оларды [settings.yaml файлында](../../../reference/ib-apps-reference/tfmanifest_settings) өшіруге болады.

   {note:warn}

   Қызметті орналастырудың әр жаңа әрекетінде барлық бар ресурстар жойылып, қайта жасалады.

   {/note}

1. Қызметті қосу кезінде қате орын алса, [нұсқаулықты](../service-logs) пайдаланып логтерді қараңыз.
1. Қызмет инстансын жаңартыңыз:

   1. Ағымдағы тарифтік жоспардың тарифтік опцияларының мәндерін өзгертіңіз.
   1. Жаңа тарифтік жоспарға өтіңіз.

   Манифестте сипатталған ресурс параметрлерін өзгерту қызмет инстансын қайта орнату процесін іске қосады.

   {note:warn}

   Қызмет инстансының конфигурациясын жаңартқанда орналастыру жүйесі тек өзгертілген ресурстарды жаңартады.

   {/note}

   Орналастыру жүйесі ресурстарды жаңарта алмаса, оны қайта жасап көреді. Қайталау әрекеттерін ескере отырып, қызмет инстансының конфигурациясын жаңарту процесі 1,5 сағатқа дейін уақыт алуы мүмкін. Қайталау әрекеттерін [settings.yaml файлында](../../../reference/ib-apps-reference/tfmanifest_settings) өшіруге болады.

1. Қызметтің негізгі пайдаланушы сценарийлерін тексеріңіз.
1. Қызмет инстансын [жойыңыз](/kz/applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-delete).
1. (Қалауыңыз бойынша) Қызмет конфигурациясын [жаңартыңыз](/kz/tools-for-using-services/vendor-account/instructions/manage-ib-apps/update-ib-app).

   1. Тестілеу нәтижесінде мұндай қажеттілік туындаса, қызмет конфигурациясын өзгертіңіз.
   1. Тестілеу және отладка кезінде қызмет конфигурациясында қызмет құны үшін тестілік мәндер берілген болса, оларды өңдеңіз.

   {note:warn}

   Қызметтік пакетті жаңартқан болсаңыз, қызметтің ревизиясы ([revision параметрі](../../../reference/ib-apps-reference/ib-apps-param)) да жаңартылғанын тексеріңіз.

   {/note}

## {heading({counter(H2)}. Қызметтің образын жариялаңыз)[id=publish_service_image]}

1. [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com) мекенжайына хат жіберіңіз.

   Хатта қызметтің образ ID-сын көрсетіңіз.

   Көрсетілген образ жарияланып, бұлттық платформаның барлық пайдаланушыларына қолжетімді болады. Жауап хатында қызметтің публичный образының ID-сы жіберіледі.

1. [Terraform манифесттерінде](../../../reference/ib-apps-reference/tf-manifest) `plans/<ИМЯ_ПЛАНА>/deployment/deploy.tf` қызметтің образ ID-сын қызметтің публичный образының ID-сына өзгертіңіз.
1. [service.yaml файлында](../../../reference/ib-apps-reference/ib-apps-param) қызметтің жаңа ревизиясын көрсетіңіз.
1. Қызметтің публичный образының ID-сы бар қызметтік пакетті жеткізуші кабинеты арқылы немесе Infra API қызметіне сұрау жіберу арқылы Marketplace-ке [жүктеңіз](#upload_package).

## {heading({counter(H2)}. Қызметті Marketplace-те жариялаңыз)[id=publish_service]}

[marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com) мекенжайына хат жіберіңіз. Хатта қызметтің ID-сын және оның ревизиясын көрсетіңіз.

Қызметтік пакет модерациядан өткізіледі. Осыдан кейін қызмет Marketplace-те жарияланады.

Жарияланатын қызмет ревизиясы Marketplace тестілік кеңістігінен [қызметтік кілтте](#preparatory_steps) көрсетілген ашық кеңістікке ауыстырылады. Қызмет осы ашық кеңістікке қолжетімділігі бар барлық пайдаланушыларға қолжетімді болады.

{note:warn}

Ашық кеңістіктерде қызметтің соңғы жарияланған ревизиясы ғана қолжетімді.

{/note}
