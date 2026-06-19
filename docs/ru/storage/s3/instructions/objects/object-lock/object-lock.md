# {heading(Блокировка объектов)[id=s3-instructions-object-lock]}

## {heading(Временная блокировка по умолчанию)[id=s3-instructions-object-lock-default-retention]}

Временная блокировка по умолчанию (`DefaultRetention`) устанавливается на уровне бакета. Она применяется ко всем новым объектам, загружаемым в бакет, и не распространяется на уже загруженные объекты.
Устанавливать блокировку по умолчанию необязательно.

{note:warn}
Временная блокировка по умолчанию менее приоритетна, чем блокировка, настроенная для объекта.
{/note}

Чтобы управлять временной блокировкой по умолчанию:

{tabs}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Откройте консоль и выполните нужное действие с блокировкой:

   {tabs}

   {tab(Установить)}

   Чтобы установить временную блокировку по умолчанию, выполните команду:

   {include(../../../_includes/_s3-manage-object.md)[tags=configuration_lock_object]}

   {cut(Пример команды)}

    ```console
    aws s3api put-object-lock-configuration \
      --bucket my_bucket \
      --object-lock-configuration '{
          "ObjectLockEnabled": "Enabled",
          "Rule": {
              "DefaultRetention": {
                  "Mode": "COMPLIANCE",
                  "Days": 30
              }
          }
      }' \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Команда не выводит ответа. Для всех новых объектов, загружаемых в `my_bucket`, будет устанавливаться строгий режим блокировки на срок в 30 дней. Для уже загруженных в `my_bucket` объектов режим блокировки не изменится.

   {/cut}

   {/tab}

   {tab(Снять)}

   Чтобы снять временную блокировку по умолчанию, выполните команду:

    ```console
    aws s3api put-object-lock-configuration \
      --bucket <ИМЯ_БАКЕТА> \
      --object-lock-configuration '{
          "ObjectLockEnabled": "Enabled"
          }' \
      --endpoint-url <ENDPOINT_URL>
    ```

    Здесь:

    - `<ИМЯ_БАКЕТА>` — имя бакета, для которого снимается блокировка по умолчанию.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

        - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
        - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.

    {/ifdef}

   {/tab}
    
   {tab(Узнать статус)}
    
   Чтобы получить текущую конфигурацию блокировки по умолчанию для бакета, выполните команду:

    ```console
    aws s3api get-object-lock-configuration \
      --bucket <ИМЯ_БАКЕТА> \
      --endpoint-url <ENDPOINT_URL>
    ```

    Здесь:

    - `<ИМЯ_БАКЕТА>` — имя бакета, для которого запрашивается конфигурация блокировки по умолчанию.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.

    {/ifdef}

   {cut(Пример команды)}

    ```console
    aws s3api get-object-lock-configuration \
      --bucket my-bucket \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Пример вывода:

   ```json
   { "ObjectLockConfiguration": {
     "ObjectLockEnabled": "Enabled",
     "Rule": {
         "DefaultRetention": {
           "Mode": "COMPLIANCE",
           "Days": 30 }}}}
   ```

   {/cut}

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Бессрочная блокировка)[id=s3-instructions-object-lock-legal-hold]}

Бессрочная блокировка (legal hold) может устанавливаться как при загрузке объекта в бакет, так и для объекта, уже находящегося в бакете. Устанавливать и снимать такую блокировку может только пользователь, обладающий {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=правами на запись WRITE]}.

{note:warn}
Если для объекта установлены одновременно и временная, и бессрочная блокировки, бессрочная имеет приоритет над временной.
{/note}

Чтобы управлять бессрочной блокировкой:

{tabs}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Откройте консоль и выполните нужное действие с блокировкой.

   {tabs}
    
   {tab(Установить при загрузке объекта)}
      
   Чтобы установить бессрочную блокировку для нового объекта, загружаемого в бакет, выполните команду:

    ```console
    aws s3api put-object \
      --body <ПУТЬ_К_ФАЙЛУ> \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --object-lock-legal-hold-status ON \
      --endpoint-url <ENDPOINT_URL>
    ```

    Здесь:

    - `<ПУТЬ_К_ФАЙЛУ>` — путь к локальному файлу.
    - `<ИМЯ_БАКЕТА>` — имя бакета, в который будет загружен новый объект.
    - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.

    {/ifdef}

   {cut(Пример команды)}

    ```console
    aws s3api put-object \
      --body image.png \
      --bucket my-bucket-with-lock \
      --key images/image.png \
      --object-lock-legal-hold-status ON \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
    ```

   Пример ответа:

   ```json
   {
     "ETag": "\"746066bba59ef00362b139a89a0b0363\""
   }
   ```

   {/cut}

   {/tab}
    
   {tab(Установить после загрузки объекта)}
    
   Чтобы установить бессрочную блокировку для объекта, находящегося в бакете, выполните команду:

   {include(../../../_includes/_s3-manage-object.md)[tags=object_legal_hold]}

   {cut(Пример команды)}

    ```console
    aws s3api put-object-legal-hold \
      --bucket my-bucket-with-lock \
      --key images/image1.png \
      --legal-hold Status=ON \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
    
   {tab(Снять)}
    
   Чтобы снять бессрочную блокировку для объекта, находящегося в бакете, выполните команду:

    ```console
    aws s3api put-object-legal-hold \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --legal-hold Status=OFF \
      --endpoint-url <ENDPOINT_URL>
    ```

    Здесь:

    - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
    - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.

    {/ifdef}

   {cut(Пример команды)}

    ```console
    aws s3api put-object-legal-hold \
      --bucket my-bucket-with-lock \
      --key images/image1.png \
      --legal-hold Status=OFF \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
    
   {tab(Узнать статус)}
    
   Чтобы узнать статус бессрочной блокировки объекта, выполните команду:

   {include(../../../_includes/_s3-manage-object.md)[tags=object_state_legal_hold]}

   {cut(Пример команды)}

    ```console
    aws s3api get-object-legal-hold \
      --bucket my-bucket-with-lock \
      --key images/image.png \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Пример ответа:

   ```json
   {
     "LegalHold": {
         "Status": "ON"
     }
   }
   ```

   {/cut}

   {note:info}
   Статус блокировки объекта также можно посмотреть в ответах команд `s3api get-object` и `s3api head-object`. Подробнее — в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/index.html).
   {/note}

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

## {heading(Временная блокировка)[id=s3-instructions-object-lock-retention-period]}

Временная блокировка (retention period) может устанавливаться как при загрузке объекта в бакет, так и для объекта, уже находящегося в бакете.

Чтобы управлять временной блокировкой:

{tabs}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Откройте консоль и выполните нужное действие с блокировкой.

   {tabs}
    
   {tab(Установить при загрузке объекта)}
      
   Чтобы установить временную блокировку для нового объекта, загружаемого в бакет, выполните команду:

    ```console
    aws s3api put-object \
      --body <ПУТЬ_К_ФАЙЛУ> \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --object-lock-mode <РЕЖИМ_БЛОКИРОВКИ> \
      --object-lock-retain-until-date '<YYYY-MM-DD HH:MM:SS>' \
      --endpoint-url <ENDPOINT_URL>
    ```

    Здесь:

    - `<ПУТЬ_К_ФАЙЛУ>` — путь к локальному файлу.
    - `<ИМЯ_БАКЕТА>` — имя бакета, в который будет загружен новый объект.
    - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
    - `<РЕЖИМ_БЛОКИРОВКИ>` — режим блокировки:

      - `GOVERNANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=управляемый режим]};
      - `COMPLIANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=строгий режим]}.
  
    - `<YYYY-MM-DD HH:MM:SS>` — дата и время окончания блокировки.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

        - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
        - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.

    {/ifdef}

   {cut(Пример команды)}

    ```console
    aws s3api put-object \
      --body image.png \
      --bucket my-bucket-with-lock \ 
      --key images/image2.png \
      --object-lock-mode GOVERNANCE \
      --object-lock-retain-until-date '2025-05-15 12:00:00' \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
    ```

   Пример ответа:

   ```json
   {
     "ETag": "\"746066bba59ef00362b139a89a0b0363\""
   }
   ```

   {/cut}

   {/tab}
    
   {tab(Установить после загрузки объекта)}
    
   Чтобы установить временную блокировку для объекта, находящегося в бакете, выполните команду:

    ```console
    aws s3api put-object-retention \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --retention '{
        "Mode": "<РЕЖИМ_БЛОКИРОВКИ>",
        "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
        }' \
      --endpoint-url <ENDPOINT_URL>
    ```

    Здесь:

    - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
    - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
    - `<РЕЖИМ_БЛОКИРОВКИ>` — режим блокировки:

      - `GOVERNANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=управляемый режим]};
      - `COMPLIANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=строгий режим]}.

    - `<YYYY-MM-DD HH:MM:SS>` — дата и время окончания блокировки.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.

    {/ifdef}

   {cut(Пример команды)}

    ```console
    aws s3api put-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image1.png \
      --retention '{
        "Mode": "COMPLIANCE",
        "RetainUntilDate": "2025-05-15 12:00:00"
        }' \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
    
   {tab(Продлить)}
    
    Чтобы продлить временную блокировку для объекта, находящегося в бакете, выполните команду:

    ```console
    aws s3api put-object-retention \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --retention '{
        "Mode": "<РЕЖИМ_БЛОКИРОВКИ>",
        "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
        }' \
      --endpoint-url <ENDPOINT_URL>
    ```

    Здесь:

    - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
    - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
    - `<РЕЖИМ_БЛОКИРОВКИ>` — режим блокировки:

      - `GOVERNANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=управляемый режим]};
      - `COMPLIANCE` — {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=строгий режим]}.

    - `<YYYY-MM-DD HH:MM:SS>` — новая более поздняя дата и время окончания блокировки.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.

    {/ifdef}

   {cut(Пример команды)}

    ```console
    aws s3api put-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image1.png \
      --retention '{
        "Mode": "COMPLIANCE",
        "RetainUntilDate": "2025-08-15 21:00:00"
        }' \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
    
   {tab(Узнать статус)}

   {include(../../../_includes/_s3-manage-object.md)[tags=object_state]}

   {cut(Пример команды)}

    ```console
    aws s3api get-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image1.png \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Пример ответа:

   ```json
   {
     "Retention": {
         "Mode": "COMPLIANCE",
         "RetainUntilDate": "2025-03-15T12:00:00+00:00"
     }
   }
   ```

   {/cut}

   {note:info}
   Статус блокировки объекта также можно посмотреть в ответах команд `s3api get-object` и `s3api head-object`. Подробнее — в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/index.html).
   {/note}

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

## {heading(Обход временной блокировки)[id=s3-instructions-object-lock-bypass-governance-retention]}

{note:warn}
Обойти временную блокировку со строгим режимом (`COMPLIANCE`) нельзя.
{/note}

Пользователь, обладающий {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=правами на запись WRITE]}, может обойти временную блокировку с режимом `GOVERNANCE`, используя в командах флаг `--bypass-governance-retention`. Обходя блокировку, он может:

- удалить объект до окончания срока блокировки;
- снять временную блокировку;
- сократить срок блокировки;
- изменить режим на `COMPLIANCE`.

Чтобы выполнить действие в обход блокировки:

{tabs}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Откройте консоль и выполните нужное действие.

   {tabs}
    
   {tab(Удалить объект)}
      
   Чтобы удалить объект, для которого установлена управляемая временная блокировка, выполните команду:

    ```console
    aws s3api delete-object \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --bypass-governance-retention \
      --endpoint-url <ENDPOINT_URL>
    ```

    Здесь:

    - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
    - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.

    {/ifdef}

   {cut(Пример команды)}

    ```console
    aws s3api delete-object \
      --bucket my-bucket-with-lock \
      --key images/image2.png \
      --bypass-governance-retention \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
    
   {tab(Снять блокировку)}
    
   Чтобы снять с объекта управляемую временную блокировку, выполните команду:

    ```console
    aws s3api put-object-retention \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --retention '{}' \
      --bypass-governance-retention \
      --endpoint-url <ENDPOINT_URL>
    ```

    Здесь:

    - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
    - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

        - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
        - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.

    {/ifdef}

   {cut(Пример команды)}

    ```console
    aws s3api put-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image2.png \
      --retention '{}' \
      --bypass-governance-retention \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
    ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
    
   {tab(Сократить срок)}
    
   Чтобы сократить для объекта срок управляемой временной блокировки, выполните команду:

    ```console
    aws s3api put-object-retention \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --retention '{
        "Mode": "GOVERNANCE",
        "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
        }' \
      --bypass-governance-retention \
      --endpoint-url <ENDPOINT_URL>
    ```

    Здесь:

    - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
    - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
    - `<YYYY-MM-DD HH:MM:SS>` — новая более ранняя дата и время окончания блокировки.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

        - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
        - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.

    {/ifdef}

   {cut(Пример команды)}

    ```console
    aws s3api put-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image2.png \
      --retention '{
        "Mode": "GOVERNANCE",
        "RetainUntilDate": "2025-04-10 10:00:00"
        }' \
      --bypass-governance-retention \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
    ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
    
   {tab(Изменить режим)}
    
   Чтобы изменить для объекта режим временной блокировки на `COMPLIANCE`, выполните команду:

    ```console
    aws s3api put-object-retention \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --retention '{
        "Mode": "COMPLIANCE",
        "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
        }' \
      --bypass-governance-retention \
      --endpoint-url <ENDPOINT_URL>
    ```

    Здесь:

    - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
    - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
    - `<YYYY-MM-DD HH:MM:SS>` — дата и время окончания блокировки.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

        - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
        - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

    {/ifdef}

    {ifdef(s3,s3-pdf)}

    - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.

    {/ifdef}

   {cut(Пример команды)}

    ```console
    aws s3api put-object-retention \
      --bucket my-bucket-with-lock \
      --key images/image2.png \
      --retention '{
        "Mode": "COMPLIANCE",
        "RetainUntilDate": "2025-05-15 12:00:00"
        }' \
      --bypass-governance-retention \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
    ```

   Команда не выводит ответа.

   {/cut}

   {/tab}

   {/tabs}

{/tab}

{/tabs}
