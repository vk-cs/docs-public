Чтобы добавить ваше image-based приложение в сервис Marketplace выполните [подготовительные шаги](#preparatory_steps). Затем:

1. [Создайте основу для файловой структуры сервисного пакета](#service_pack_structure).
1. [Опишите конфигурацию сервиса (тарифные планы, опции)](#service_config).
1. [Создайте манифесты Terraform с описанием конфигурации инфраструктуры для вашего сервиса](#service_infrastructure).
1. (Опционально) [Проверьте корректность указания существующих ресурсов в манифестах Terraform](#check_existing_resources).
1. (Опционально) [Протестируйте манифесты Terraform локально](#test_manifest_locally).
1. (Опционально) [Протестируйте манифесты Terraform с системой развертывания](#test_manifest_with_deploy_system).
1. (Опционально) [Просмотрите логи и результаты работы агента Marketplace](#agent_log).
1. [Загрузите сервисный пакет на Marketplace](#upload_package).
1. [Протестируйте загруженный сервис до публикации](#upload_test).
1. [Опубликуйте образ сервиса](#publish_service_image).
1. [Опубликуйте сервис в Marketplace](#publish_service).

## {heading(Подготовительные шаги)[id=preparatory_steps]}

1. Убедитесь, что ваше приложение удовлетворяет [требованиям сервиса Marketplace](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based).
1. [Создайте и загрузите](../create-ib-app-image) в VK Cloud образ image-based приложения.
1. Определитесь с [типом тарификации](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/billing) для вашего приложения, разработайте тарифные [планы](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing) и [опции](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_option_types).
1. [Подключитесь](../../../connect) к кабинету поставщика.

## {heading({counter(H2)}. Создайте основу для файловой структуры сервисного пакета)[id=service_pack_structure]}

Вся информация, необходимая для загрузки image-based приложения в Marketplace, подготавливается в виде сервисного пакета с определенной файловой структурой.

{cut(Пример файловой структуры сервисного пакета)}

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
Для имен файлов и директорий сервисного пакета используйте только латинские буквы и знаки `_`.
{/note}

Чтобы подготовить файловую структуру:

1. Создайте директорию сервиса с именем `<ИМЯ_СЕРВИСА>`.
1. В директории сервиса создайте файл `version.yaml`. В файле укажите:

   ```yaml
   version: 0.0.1
   ```

1. В директории `<ИМЯ_СЕРВИСА>` создайте директории `images`, `parameters` и `plans`.
1. В директорию `images` поместите файл с иконкой сервиса в формате `.png` или `.svg`. Размер файла — не более 1 МБ. Разрешение изображения — не менее 62 × 62 пикселей.

   Иконка сервиса будет отображаться в карточке сервиса:

   - в каталоге Marketplace;
   - на вкладке **Описание сервиса** на странице сервиса.

## {heading({counter(H2)}. Опишите конфигурацию сервиса (тарифные планы, опции))[id=service_config]}

Конфигурация сервиса описывается с помощью файлов формата `.yaml` и `.md`.

1. В директории `<ИМЯ_СЕРВИСА>` создайте файл `service.yaml` и заполните его.

   Файл `service.yaml` содержит:
   - общие параметры сервиса;
   - имена тарифных планов (далее — `<ИМЯ_ПЛАНА>`) в виде массива `plans`;
   - имена тарифных опций (далее — `<ИМЯ_ОПЦИИ>`) в виде массива `parameters` в секции `preview`.
   
   `<ИМЯ_ПЛАНА>` и `<ИМЯ_ОПЦИИ>` используются только внутри сервисного пакета и не отображаются в интерфейсе Marketplace.

   Структура файла:

   ```yaml
   # Общие параметры сервиса
   id: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   revision: v. X.X
   name: <ИМЯ_СЕРВИСА>
   short_description: <КОРОТКОЕ_ОПИСАНИЕ>
   singleton: <ФЛАГ>                        # true | false
   auto_bind: <ФЛАГ>                        # true | false
   icon: <ФАЙЛ>                             # Имя файла с иконкой сервиса
   help: <URL>                              # Ссылка на документацию сервиса
   bindable: <ФЛАГ>                         # true | false
   plan_updateable: <ФЛАГ>                  # true | false
   deactivatable: <ФЛАГ>                    # true | false
   bindings_retrievable: <ФЛАГ>             # true | false
   instances_retrievable: <ФЛАГ>            # true | false

   # Массив plans
   plans:
   - name: <ИМЯ_ПЛАНА_1>
   - name: <ИМЯ_ПЛАНА_2>

   # Секция preview
   preview:
   parameters:
   - name: <ИМЯ_ОПЦИИ_1>
   - name: <ИМЯ_ОПЦИИ_2>
   - name: <ИМЯ_ОПЦИИ_3>
   ```

   {cut(Общие параметры сервиса)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=service.yaml-common-param]}

   {/cut}

   {cut(Массив plans)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=service.yaml-plans]}

   {/cut}

   {cut(Секция preview)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=service.yaml-preview]}

   {/cut}

   {cut(Пример файла service.yaml)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=service.yaml-example]}

   {/cut}

1. В директории `<ИМЯ_СЕРВИСА>` создайте файл `full_description.md` и заполните его описанием сервиса в формате Markdown. Содержание файла будет отображаться на его странице в Marketplace.

   Структура файла:

    ```md
   <!--Небольшое общее описание сервиса в 2-3 предложениях-->

   <!--Наименование поставщика-->

   ## Решаемые задачи

   <!--Для решения каких задач можно использовать сервис-->

   ## Характеристики сервиса:
   
   <!--Технические характеристики, желательно в форме таблицы-->

   <!--Требования к инфраструктуре, какие ресурсы могут быть использованы-->
   
   # Правила тарификации

   <!--По какой модели тарифицируется сервис, какие есть тарифные планы-->

   # Полезные ссылки

   <!--Ссылка на раздел Marketplace в документации VK Cloud + ссылка на документацию на портале поставщика-->

   # Техническая поддержка

   <!--Информация о технической поддержке сервиса, технической поддержки VK Cloud, контакты технической поддержки сервиса-->

   # Лицензионное соглашение
   <!--Ссылка на юридические документы VK Cloud и сервиса поставщика-->
    ```

   {cut(Информация о сервисе)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=full_description-ib-general]}

   {/cut}

   {cut(Правила тарификации)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=full_description-ib-tariff]}

   {/cut}

   {cut(Полезные ссылки)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=full_description-links]}

   {/cut}

   {cut(Техническая поддержка)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=full_description-ib-support]}

   {/cut}

   {cut(Лицензионное соглашение)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=full_description-legal]}

   {/cut}

1. В директории `parameters` для каждой [тарифной опции](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_option_types) создайте файл `<ИМЯ_ОПЦИИ>.yaml` и заполните его согласно [примерам](/ru/tools-for-using-services/vendor-account/reference/ib-apps-reference/tariff-options-examples).

   Для платных тарифных опций на период тестирования укажите минимальную стоимость сервиса, чтобы не допустить лишнего потребления средств.

1. В директории `plans` для каждого тарифного плана cоздайте директорию `<ИМЯ_ПЛАНА>`. В каждой директории `<ИМЯ_ПЛАНА>` создайте и заполните файл `plan.yaml`:

   Структура файла:

   ```yaml
   # Общие параметры тарифного плана
   id: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   revision: v. X.X
   name: <ИМЯ_ПЛАНА>
   description: <КОРОТКОЕ_ОПИСАНИЕ>
   free: <ФЛАГ> # true | false

   # Секция billing
   billing:
   cost: <СТОИМОСТЬ>
   refundable: <ФЛАГ> # true | false
   billing_cycle_flat: <ДЛИНА_ОТЧЕТНОГО_ПЕРИОДА>

   # Секция parameters_patch
   parameters_patch:
   users:
      schema.const: 5000
   volume_data_size:
      schema.default: 550
      schema.minimum: 550
   ```

   {cut(Общие параметры тарифного плана)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=plan.yaml-common-param]}

   (Опционально) Если тарифный план бесплатный, в [секции resource_usage](../../../reference/ib-apps-reference/ib-plan#plan_parameters) перечислите постоплатные тарифные опции.

      В рамках одного тарифного плана допускаются только опции одного типа [тарификации](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing): тарифный план с предоплатными опциями или тарифный план с постоплатными опциями.

   {/cut}

   {cut(Секция billing тарифного плана)}
   
   Укажите стоимость тарифного плана за отчетный период без учета платных тарифных опций.

   Ненулевую стоимость тарифного плана можно указать только для предоплатного типа [тарификации](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing). Чтобы эффективно использовать [выделенные бонусные средства](#preparatory_steps), укажите тестовую стоимость для тарифного плана на период тестирования сервиса в Marketplace.

   {note:warn}

   Стоимость использования вычислительных ресурсов платформы VK Cloud не входит в стоимость тарифного плана сервиса.

   {/note}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=plan.yaml-billing]}

   {/cut}

   {cut(Секция parameters_patch)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=plan.yaml-parameters_patch]}

   (Опционально) В [секции parameters_patch](../../../reference/ib-apps-reference/ib-plan#plan_options) переопределите нужные параметры тарифных опций для тарифного плана `<ИМЯ_ПЛАНА>`.

   {/cut}

   {cut(Пример файла plan.yaml)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=plan.yaml-example]}

   {/cut}

1. В директории `<ИМЯ_ПЛАНА>` создайте и заполните файл `display.yaml` с описанием мастера конфигурации тарифного плана. Мастер конфигурации тарифного плана будет отображаться в Marketplace при подключении сервиса или обновлении тарифного плана.

   {cut(Массив pages)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=display.yaml-pages]}

   {/cut}

   {cut(Массив entities)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-common]}

   {cut(ВМ)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-vm]}

   {/cut}

   {cut(Балансировщик нагрузки)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-lb]}

   {/cut}

   {cut(Внешний IP-адрес)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-ip]}

   {/cut}

   {/cut}

   {cut(Конструкция when)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=display.yaml-when-common]}

   {cut(Конструкция when в массиве pages)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=display.yaml-when-pages]}

   {/cut}

   {cut(Конструкция when в массиве entities)}

   {include(/ru/_includes/_xaas_ib_params.md)[tags=display.yaml-when-entities]}

   {/cut}

   {/cut}

## {heading({counter(H2)}. Создайте манифесты Terraform с описанием конфигурации инфраструктуры для сервиса)[id=service_infrastructure]}

   1. В директории `plans/<ИМЯ_ПЛАНА>` создайте директорию `deployment`.
   1. В директории `deployment` создайте и заполните:

      - Файл `deploy.tf` с [манифестом Terraform](../../../reference/ib-apps-reference/tf-manifest), описывающим инфраструктуру и процесс развертывания в Marketplace тарифного плана `<ИМЯ_ПЛАНА>`.

         {note:info}

         Также поддерживается работа с несколькими манифестами.

         {/note}

      - (Опционально) [Файл settings.yaml](../../../reference/ib-apps-reference/tfmanifest_settings) с настройками выполнения манифеста. Если в сервисном пакете нет файла `settings.yaml`, к манифестам Terraform будут применены значения параметров по умолчанию.

## {heading({counter(H2)}. (Опционально) Проверьте корректность указания существующих ресурсов в манифестах Terraform)[id=check_existing_resources]}

Чтобы сократить время тестирования манифестов Terraform и исключить попытки создания ресурсов с некорректной конфигурацией, перед тестированием манифестов рекомендуется проверить, что в них верно указаны параметры уже существующих ресурсов VK Cloud, например: тип ВМ, образ сервиса и т.д.

1. [Установите Terraform и настройте окружение](/ru/tools-for-using-services/terraform/quick-start), если это не сделано ранее.
1. В рабочей директории выполните команду:

   ```console
   terraform init
   ```

1. В рабочей директории создайте файл `main.tf`.
1. Поместите в файл `main.tf` обращения к нужным [источникам данных провайдера VK CS](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/data-sources).

   Пример обращения к источнику данных [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/data-sources):

   ```hcl
   data "vkcs_compute_flavor" "compute" {
   flavor_id = "4e115a9b-XXXX-95cf130d63c7"
   }
   ```

   В этом примере проверяется, что тип ВМ с ID `4e115a9b-XXXX-95cf130d63c7` существует в VK Cloud.

1. В рабочей директории выполните команду:

   ```console
   terraform apply
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции. Убедитесь, что при обращении к источникам данных не возникло ошибок.

## {heading({counter(H2)}. (Опционально) Протестируйте манифесты Terraform локально)[id=test_manifest_locally]}

Протестируйте локально манифесты Terraform `plans/<ИМЯ_ПЛАНА>/deployment/deploy.tf` для каждого тарифного плана вашего приложения, используя [инструкцию](../local-tfmanifest-testing).

## {heading({counter(H2)}. (Опционально) Протестируйте манифесты Terraform с системой развертывания)[id=test_manifest_with_deploy_system]}

Перед загрузкой сервисного пакета на Marketplace протестируйте каждый манифест Terraform `plans/<ИМЯ_ПЛАНА>/deployment/deploy.tf`для каждого плана вашего приложения с помощью API системы развертывания:

1. [Активируйте](/ru/tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate) доступ по API, если это не было сделано ранее.
1. [Получите](/ru/tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token-gen) токен доступа к API.
1. [Загрузите](../../../reference/ib-apps-reference/test-tfmanifest#upload_terraform_manifest) один из манифестов `plans/<ИМЯ_ПЛАНА>/deployment/deploy.tf` в систему развертывания.
1. [Проверьте](../../../reference/ib-apps-reference/test-tfmanifest#check_terraform_configuration) текущую конфигурацию загруженного манифеста.
1. [Создайте](../../../reference/ib-apps-reference/test-tfmanifest#create_service_instance) инстанс сервиса.
1. В процессе создания и после создания инстанса [проверьте](../../../reference/ib-apps-reference/test-tfmanifest#check_instance_status) его статус. Если статус `failed`, [найдите](../../../reference/ib-apps-reference/test-tfmanifest#deploysystemtest_log) описание ошибки в логах инстанса.
1. [Удалите](../../../reference/ib-apps-reference/test-tfmanifest#delete_service_instance) инстанс сервиса.
1. [Проверьте](../../../reference/ib-apps-reference/test-tfmanifest#check_instance_status) статус удаленного инстанса сервиса. Если статус `failed`, [найдите](../../../reference/ib-apps-reference/test-tfmanifest#deploysystemtest_log) описание ошибки в логах инстанса.

Аналогичным образом протестируйте манифесты для остальных тарифных планов вашего приложения.

## {heading({counter(H2)}. (Опционально) Просмотрите логи и результаты работы агента Marketplace)[id=agent_log]}

Вы можете выявить ошибки при развертывании инстанса сервиса, просмотрев логи и результаты работы агента Marketplace. Они доступны, если при развертывании вашего приложения используются [скрипты](../../../reference/ib-apps-reference/tfmanifest_script), которые выполняются с помощью ресурса [ivkcs_agent_exec](/ru/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_agent_exec).

Чтобы посмотреть логи и результаты работы агента:

1. [Подключитесь к ВМ](/ru/computing/iaas/instructions/vm/vm-connect), на которой установлен агент, по протоколу удаленного доступа или с помощью VNC-консоли в личном кабинете VK Cloud.

   Имя ВМ, на которой был установлен агент, задано в ресурсе `ivkcs_agent_init` или `ivkcs_user_data` в манифесте `plans/<ИМЯ_ПЛАНА>/deployment/deploy.tf`.

1. Чтобы просмотреть логи, выполните команду `journalctl -u sower`.
1. Чтобы просмотреть результаты, перейдите в директорию `/etc/sower/result`.

## {heading({counter(H2)}. Загрузите сервисный пакет на Marketplace)[id=upload_package]}

1. Запакуйте сервисный пакет, т.е. директорию `<ИМЯ_СЕРВИСА>` с конфигурационными файлами сервиса и манифестами Terraform, в zip-архив. Размер архива должен быть не более 30 МБ.
1. Загрузите архив на Marketplace одним из следующих способов:

   {tabs}

   {tab(Кабинет поставщика)}

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
   1. В разделе **Магазин приложений** нажмите кнопку **Перейти в кабинет поставщика**.
   1. На вкладке **Управление сервисами** нажмите кнопку **Добавить сервис**.
   1. Выберите zip-архив на своем устройстве для загрузки в систему.
   1. Нажмите кнопку **Добавить**.

   После этого добавленный сервис появится в списке сервисов в статусе `Скрыто`. Файл загруженного архива будет отправлен на валидацию.

   {/tab}

   {tab(Infra API)}

   Выполните запрос к сервису Infra API со следующими параметрами:

   - Метод запроса: `POST`.
   - Путь запроса: `https://<ХОСТ_VK_CLOUD>/marketplace/api/infra-api/api/v1-public/product`.

      Здесь `<ХОСТ_VK_CLOUD>` — доменное имя платформы VK CLOUD `https://cloud.vk.com`.

   - Тело запроса: zip-архив.
   - `x-service-token`: `<СЕРВИСНЫЙ_КЛЮЧ>` — сервисный ключ, полученный от Marketplace на [этапе подготовки](#preparatory_steps).

   Пример запроса на загрузку сервисного пакета на Marketplace:

   {tabs}

   {tab(Linux (bash))}

   ```console
   curl -v -X POST https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/product \
   -H 'x-service-token: <SERVICE_TOKEN>' \
   -F "upload=@/home/VKservice.zip"
   ```

   {/tab}

   {tab(Windows (cmd))}

   ```console
   curl -v -X POST https://cloud.vk.com/marketplace/api/infra-api/api/v1-public/product ^
   -H "x-service-token: <SERVICE_TOKEN>" ^
   -F "upload=@/home/VKservice.zip"
   ```

   {/tab}

   {/tabs}

   HTTP-коды ответа:

      - `204` — сервисный пакет загружен.
      - `400`, `404`, `500` — ошибка выполнения запроса.
      - `401` — ошибка авторизации.

   Конфигурационные файлы, описывающие тарифные планы и опции сервиса, будут переданы image-based брокеру, манифесты Terraform — системе развертывания.

   {/tab}

   {/tabs}

   Сервисный пакет, загруженный на Marketplace, сначала попадет в тестовое пространство имен, после публикации — в открытое.

1. После окончания загрузки сервиса зайдите в личный кабинет VK Cloud и убедитесь, что сервис отображается в Marketplace. Загруженный сервис будет доступен только пользователям тестовых пространств имен Marketplace, указанных в [сервисном ключе](#preparatory_steps).

   Если после загрузки сервис не отображается в Marketplace, выйдите из личного кабинета и войдите заново.

## {heading({counter(H2)}. Протестируйте загруженный сервис до публикации)[id=upload_test]}

{note:info}
Для тестирования сервиса используйте бонусы, полученные от Marketplace на [этапе подготовки](#preparatory_steps).
{/note}

Чтобы проверить, как сервис будет функционировать в тестовом пространстве имен Marketplace:

1. [Перейдите](https://msk.cloud.vk.com/app/services/marketplace) в раздел **Магазин приложений** личного кабинета VK Cloud.
1. Нажмите кнопку **Все решения**.
1. Нажмите на карточку вашего сервиса и перейдите на вкладку **Тарифные планы**.
1. Убедитесь, что мастер конфигурации каждого тарифного плана отображается корректно.
1. Подключите сервис. Убедитесь, что развертывание инстанса сервиса выполнено успешно.

   Если при развертывании инстанса сервиса не удалось создать ресурс, описанный в манифесте, система развертывания запустит процесс развертывания сервиса повторно. Повторные попытки могут занимать до 1,5 ч и могут быть отключены в [файле settings.yaml](../../../reference/ib-apps-reference/tfmanifest_settings).

   {note:warn}

   При каждой новой попытке развернуть сервис все существующие ресурсы удаляются и создаются заново.

   {/note}

1. Если при подключении сервиса возникла ошибка, посмотрите логи, воспользовавшись [инструкцией](../service-logs).
1. Обновите инстанс сервиса:

   1. Поменяйте значения тарифных опций текущего тарифного плана.
   1. Перейдите на новый тарифный план.

   Изменение параметров ресурсов, описанных в манифесте, запустит процесс переустановки инстанса сервиса.

   {note:warn}

   При обновлении конфигурации инстанса сервиса система развертывания обновляет только измененные ресурсы.

   {/note}

   Если система развертывания не сможет обновить ресурсы, она будет пробовать сделать это повторно. Процесс обновления конфигурации инстанса сервиса с учетом повторных попыток может занимать до 1,5 ч. Повторные попытки можно отключить в [файле settings.yaml](../../../reference/ib-apps-reference/tfmanifest_settings).

1. Проверьте основные пользовательские сценарии сервиса.
1. [Удалите](/ru/applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-delete) инстанс сервиса.
1. (Опционально) [Обновите](/ru/tools-for-using-services/vendor-account/instructions/manage-ib-apps/update-ib-app) конфигурацию сервиса.

   1. Измените конфигурацию сервиса, если в результате тестирования возникла такая необходимость.
   1. Если в конфигурации сервиса на время тестирования и отладки были заданы тестовые значения для стоимости сервиса, отредактируйте их.

   {note:warn}

   Если вы обновили сервисный пакет, убедитесь, что ревизия сервиса ([параметр revision](../../../reference/ib-apps-reference/ib-apps-param)) также обновлена.

   {/note}

## {heading({counter(H2)}. Опубликуйте образ сервиса)[id=publish_service_image]}

1. Отправьте письмо на [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com).

   В письме укажите ID образа сервиса.

   Указанный образ будет опубликован и доступен всем пользователям облачной платформы. В ответном письме будет выслан ID публичного образа сервиса.

1. В [манифестах Terraform](../../../reference/ib-apps-reference/tf-manifest) `plans/<ИМЯ_ПЛАНА>/deployment/deploy.tf` поменяйте ID образа сервиса на ID публичного образа сервиса.
1. В [файле service.yaml](../../../reference/ib-apps-reference/ib-apps-param) укажите новую ревизию сервиса.
1. [Загрузите](#upload_package) сервисный пакет с ID публичного образа сервиса на Marketplace через кабинет поставщика или с помощью запроса к сервису Infra API.

## {heading({counter(H2)}. Опубликуйте сервис в Marketplace)[id=publish_service]}

Отправьте письмо на [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com). В письме укажите ID сервиса и его ревизию.

Будет проведено модерирование сервисного пакета. После этого сервис будет опубликован на Marketplace.

Публикуемая ревизия сервиса будет перемещена из тестового пространства имен Marketplace в открытое, указанное в [сервисном ключе](#preparatory_steps). Сервис станет доступен всем пользователям, у которых есть доступ в это открытое пространство имен.

{note:warn}

В открытых пространствах имен доступна только последняя опубликованная ревизия сервиса.

{/note}
