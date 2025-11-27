Установить блокировку от удаления или перезаписи можно только для объектов в бакетах, созданных с [явным указанием](../../buckets/create-bucket#ways_to_create_bucket) такой возможности.

## Временная блокировка по умолчанию

Временная блокировка по умолчанию (`DefaultRetention`) устанавливается на уровне бакета. Она применяется ко всем новым объектам, загружаемым в бакет, и не распространяется на уже загруженные объекты.
Устанавливать блокировку по умолчанию необязательно.

{note:warn}

Временная блокировка по умолчанию менее приоритетна, чем блокировка, настроенная для объекта.

{/note}

Чтобы управлять временной блокировкой по умолчанию:

{tabs}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.
1. Откройте консоль и выполните нужное действие с блокировкой:

   {tabs}
   
   {tab(Установить)}
      
   Чтобы установить временную блокировку по умолчанию, выполните команду:

   {include(/ru/_includes/_s3-manage-object.md)[tags=configuration_lock_object]}

   {cut(Пример команды)}

   ```console
   aws s3api put-object-lock-configuration --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my_bucket --object-lock-configuration '{ "ObjectLockEnabled": "Enabled", "Rule": { "DefaultRetention": { "Mode": "COMPLIANCE", "Days": 30 }}}'
   ```

   Команда не выводит ответа. Для всех новых объектов, загружаемых в `my_bucket`, будет устанавливаться строгий режим блокировки на срок в 30 дней. Для уже загруженных в `my_bucket` объектов режим блокировки не изменится.

   {/cut}

   {/tab}
   
   {tab(Снять)}
   
   Чтобы снять временную блокировку по умолчанию, выполните команду:

   ```console
   aws s3api put-object-lock-configuration 
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА>
     --object-lock-configuration '{ "ObjectLockEnabled": "Enabled" }'
   ```

   Здесь:

   - `<URL_СЕРВИСА>` — домен сервиса VK Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого снимается блокировка по умолчанию.

   {/tab}
   
   {tab(Узнать статус)}
   
   Чтобы получить текущую конфигурацию блокировки по умолчанию для бакета, выполните команду:

   ```console
   aws s3api get-object-lock-configuration 
     --endpoint-url <URL_СЕРВИСА> 
     --bucket <ИМЯ_БАКЕТА>
   ```

   Здесь:

   - `<URL_СЕРВИСА>` — домен сервиса VK Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого запрашивается конфигурация блокировки по умолчанию.

   {cut(Пример команды)}

   ```console
   aws s3api get-object-lock-configuration --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my_bucket
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

## {heading(Бессрочная блокировка)[id=object_legal_hold]}

Бессрочная блокировка (legal hold) может устанавливаться как при загрузке объекта в бакет, так и для объекта, уже находящегося в бакете. Устанавливать и снимать такую блокировку может только пользователь, обладающий [правами на запись WRITE](../../../concepts/access/s3-acl#permissons).

{note:warn}

Если для объекта установлены одновременно и временная, и бессрочная блокировки, бессрочная имеет приоритет над временной.

{/note}

Чтобы управлять бессрочной блокировкой:

{tabs}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.
1. Откройте консоль и выполните нужное действие с блокировкой.

   {tabs}
   
   {tab(Установить при загрузке объекта)}
      
   Чтобы установить бессрочную блокировку для нового объекта, загружаемого в бакет, выполните команду:

   ```console
   aws s3api put-object 
     --endpoint-url <URL_СЕРВИСА> 
     --bucket <ИМЯ_БАКЕТА> 
     --key <КЛЮЧ_ОБЪЕКТА>
     --body <ПУТЬ_К_ФАЙЛУ> 
     --object-lock-legal-hold-status ON
   ```

   Здесь:

   - `<URL_СЕРВИСА>` — домен сервиса VK Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   - `<ИМЯ_БАКЕТА>` — имя бакета, в который будет загружен новый объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<ПУТЬ_К_ФАЙЛУ>` — путь к локальному файлу.

   {cut(Пример команды)}

   ```console
   aws s3api put-object --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image.png --body image.png --object-lock-legal-hold-status ON
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

   {include(/ru/_includes/_s3-manage-object.md)[tags=object_legal_hold]}

   {cut(Пример команды)}

   ```console
   aws s3api put-object-legal-hold --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image1.png --legal-hold Status=ON
   ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
   
   {tab(Снять)}
   
   Чтобы снять бессрочную блокировку для объекта, находящегося в бакете, выполните команду:

   ```console
   aws s3api put-object-legal-hold 
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА> 
     --key <КЛЮЧ_ОБЪЕКТА>
     --legal-hold Status=OFF
   ```

   Здесь:

   - `<URL_СЕРВИСА>` — домен сервиса VK Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.

   {cut(Пример команды)}

   ```console
   aws s3api put-object-legal-hold --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image1.png --legal-hold Status=OFF
   ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
   
   {tab(Узнать статус)}
   
   Чтобы узнать статус бессрочной блокировки объекта, выполните команду:

   {include(/ru/_includes/_s3-manage-object.md)[tags=object_state_legal_hold]}

   {cut(Пример команды)}

   ```console
   aws s3api get-object-legal-hold --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image.png
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

## Временная блокировка

Временная блокировка (retention period) может устанавливаться как при загрузке объекта в бакет, так и для объекта, уже находящегося в бакете.

Чтобы управлять временной блокировкой:

{tabs}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.
1. Откройте консоль и выполните нужное действие с блокировкой.

   {tabs}
   
   {tab(Установить при загрузке объекта)}
      
   Чтобы установить временную блокировку для нового объекта, загружаемого в бакет, выполните команду:

   ```console
   aws s3api put-object 
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА> 
     --key <КЛЮЧ_ОБЪЕКТА>
     --body <ПУТЬ_К_ФАЙЛУ>
     --object-lock-mode <РЕЖИМ_БЛОКИРОВКИ>
     --object-lock-retain-until-date '<YYYY-MM-DD HH:MM:SS>'
   ```

   Здесь:

   - `<URL_СЕРВИСА>` — домен сервиса VK Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   - `<ИМЯ_БАКЕТА>` — имя бакета, в который будет загружен новый объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<ПУТЬ_К_ФАЙЛУ>` — путь к локальному файлу.
   - `<РЕЖИМ_БЛОКИРОВКИ>` — режим блокировки:

     - `GOVERNANCE` — [управляемый режим](/ru/storage/s3/concepts/objects-lock#governance-lock);
     - `COMPLIANCE` — [строгий режим](/ru/storage/s3/concepts/objects-lock#compliance-lock).

   - `<YYYY-MM-DD HH:MM:SS>` — дата и время окончания блокировки.

   {cut(Пример команды)}

   ```console
   aws s3api put-object --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image2.png --body image.png --object-lock-mode GOVERNANCE --object-lock-retain-until-date '2025-05-15 12:00:00'
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
   aws s3api put-object-retention 
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА> 
     --key <КЛЮЧ_ОБЪЕКТА>
     --retention '{ "Mode": "<РЕЖИМ_БЛОКИРОВКИ>", "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"}'
   ```

   Здесь:

   - `<URL_СЕРВИСА>` — домен сервиса VK Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<РЕЖИМ_БЛОКИРОВКИ>` — режим блокировки:

     - `GOVERNANCE` — [управляемый режим](/ru/storage/s3/concepts/objects-lock#governance-lock);
     - `COMPLIANCE` — [строгий режим](/ru/storage/s3/concepts/objects-lock#compliance-lock).

   - `<YYYY-MM-DD HH:MM:SS>` — дата и время окончания блокировки.

   {cut(Пример команды)}

   ```console
   aws s3api put-object-retention --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image1.png --retention '{ "Mode": "COMPLIANCE", "RetainUntilDate": "2025-05-15 12:00:00"}'
   ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
   
   {tab(Продлить)}
   
   Чтобы установить временную блокировку для объекта, находящегося в бакете, выполните команду:

   ```console
   aws s3api put-object-retention 
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА> 
     --key <КЛЮЧ_ОБЪЕКТА>
     --retention '{ "Mode": "<РЕЖИМ_БЛОКИРОВКИ>", "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"}'
   ```

   Здесь:

   - `<URL_СЕРВИСА>` — домен сервиса VK Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<РЕЖИМ_БЛОКИРОВКИ>` — режим блокировки:

     - `GOVERNANCE` — [управляемый режим](/ru/storage/s3/concepts/objects-lock#governance-lock);
     - `COMPLIANCE` — [строгий режим](/ru/storage/s3/concepts/objects-lock#compliance-lock).

   - `<YYYY-MM-DD HH:MM:SS>` — новая более поздняя дата и время окончания блокировки.

   {cut(Пример команды)}

   ```console
   aws s3api put-object-retention --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image1.png --retention '{ "Mode": "COMPLIANCE", "RetainUntilDate": "2025-08-15 21:00:00"}'
   ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
   
   {tab(Узнать статус)}

   {include(/ru/_includes/_s3-manage-object.md)[tags=object_state]}

   {cut(Пример команды)}

   ```console
   aws s3api get-object-retention --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image1.png
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

## Обход временной блокировки

{note:warn}

Обойти временную блокировку со строгим режимом (`COMPLIANCE`) нельзя.

{/note}

Пользователь, обладающий [правами на запись WRITE](../../../concepts/access/s3-acl#permissons), может обойти временную блокировку с режимом `GOVERNANCE`, используя в командах флаг `--bypass-governance-retention`. Обходя блокировку, он может:

- удалить объект до окончания срока блокировки;
- снять временную блокировку;
- сократить срок блокировки;
- изменить режим на `COMPLIANCE`.

Чтобы выполнить действие в обход блокировки:

{tabs}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.
1. Откройте консоль и выполните нужное действие.

   {tabs}
   
   {tab(Удалить объект)}
      
   Чтобы удалить объект, для которого установлена управляемая временная блокировка, выполните команду:

   ```console
   aws s3api delete-object
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА>
     --key <КЛЮЧ_ОБЪЕКТА>
     --bypass-governance-retention
   ```

   Здесь:

   - `<URL_СЕРВИСА>` — домен сервиса VK Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.

   {cut(Пример команды)}

   ```console
   aws s3api delete-object --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image2.png --bypass-governance-retention
   ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
   
   {tab(Снять блокировку)}
   
   Чтобы снять с объекта управляемую временную блокировку, выполните команду:

   ```console
   aws s3api put-object-retention 
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА> 
     --key <КЛЮЧ_ОБЪЕКТА>
     --bypass-governance-retention
     --retention '{}'
   ```

   Здесь:

   - `<URL_СЕРВИСА>` — домен сервиса VK Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.

   {cut(Пример команды)}

   ```console
   aws s3api put-object-retention --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image2.png --bypass-governance-retention --retention '{}'
   ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
   
   {tab(Сократить срок)}
   
   Чтобы сократить для объекта срок управляемой временной блокировки, выполните команду:

   ```console
   aws s3api put-object-retention 
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА> 
     --key <КЛЮЧ_ОБЪЕКТА>
     --bypass-governance-retention
     --retention '{ "Mode": "GOVERNANCE", "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"}'
   ```

   Здесь:

   - `<URL_СЕРВИСА>` — домен сервиса VK Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<YYYY-MM-DD HH:MM:SS>` — новая более ранняя дата и время окончания блокировки.

   {cut(Пример команды)}

   ```console
   aws s3api put-object-retention --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image2.png --bypass-governance-retention --retention '{ "Mode": "GOVERNANCE", "RetainUntilDate": "2025-04-10 10:00:00"}' 
   ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
   
   {tab(Изменить режим)}
   
   Чтобы изменить для объекта режим временной блокировки на `COMPLIANCE`, выполните команду:

   ```console
   aws s3api put-object-retention 
     --endpoint-url <URL_СЕРВИСА>
     --bucket <ИМЯ_БАКЕТА> 
     --key <КЛЮЧ_ОБЪЕКТА>
     --bypass-governance-retention
     --retention '{ "Mode": "COMPLIANCE", "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"}'
   ```

   Здесь:

   - `<URL_СЕРВИСА>` — домен сервиса VK Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<YYYY-MM-DD HH:MM:SS>` — дата и время окончания блокировки.

   {cut(Пример команды)}

   ```console
   aws s3api put-object-retention --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --bucket my-bucket-with-lock --key images/image2.png --bypass-governance-retention --retention '{ "Mode": "COMPLIANCE", "RetainUntilDate": "2025-05-15 12:00:00"}' 
   ```

   Команда не выводит ответа.

   {/cut}

   {/tab}

   {/tabs}

{/tab}

{/tabs}
