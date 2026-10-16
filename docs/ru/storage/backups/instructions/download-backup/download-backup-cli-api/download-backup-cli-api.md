# {heading(Скачивание копии через OpenStack CLI и API)[id=backup-download-cli-api]}

При использовании этого способа идентификаторы резервных копий определяются через OpenStack CLI или {linkto(../../../../../tools-for-using-services/api/api-spec/backup-api#api-spec-karboii)[text=API Karboii]}, а файлы копий скачиваются напрямую из {var(s3)} через AWS CLI. Используйте этот способ, чтобы автоматизировать скачивание или если личный кабинет недоступен. Также можно {linkto(../download-backup-lk#backup-download-lk)[text=скачать копию через личный кабинет]}.

{note:err}
Не удаляйте копию из Cloud Backup после скачивания.
{/note}

## {heading(Перед скачиванием копии)[id=backup-download-cli-api-prepare]}

1. Убедитесь, что {linkto(../../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=включена]} двухфакторная аутентификация и {linkto(../../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable)[text=активирован]} доступ по API.
1. {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=Установите клиент OpenStack и пройдите аутентификацию]} в проекте, в котором хранятся резервные копии. Для аутентификации используйте {linkto(../../../../../access/iam/instructions/service-account-manage#service-account-download-rc-file)[text=OpenStack RC-файл]} или другой способ получения токена.
1. Узнайте и запишите Project ID проекта: он понадобится при работе через API и при скачивании файлов из {var(s3)}.

   Project ID не совпадает с {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=идентификатором проекта]} в личном кабинете. Если вы прошли аутентификацию через OpenStack RC-файл, значение хранится в переменной `OS_PROJECT_ID`:

   ```console
   echo $OS_PROJECT_ID
   ```

   Если переменная пустая, получите Project ID командой:

   ```console
   openstack token issue -c project_id -f value
   ```

   Также Project ID можно {linkto(../../../../../tools-for-using-services/api/rest-api/endpoints#rest-api-endpoints-get-project-id)[text=узнать]} в личном кабинете. Сохраните его в переменную:

   ```console
   export OS_PROJECT_ID=<ID_ПРОЕКТА>
   ```

   Здесь `<ID_ПРОЕКТА>` — Project ID проекта.

1. Для работы через API {linkto(../../../../../tools-for-using-services/api/rest-api/install-jq#rest-api-jq)[text=установите]} `jq` и убедитесь, что установлена утилита `curl`.
1. {linkto(../../../../../storage/s3/instructions/access-management/access-keys#s3-instructions-access-keys)[text=Создайте]} аккаунт {var(s3)} и получите его ключ доступа (`Access Key ID` и `Secret Key`), если это еще не сделано.
1. {linkto(../../../../../tools-for-using-services/cli/aws-cli#tools-cli-aws)[text=Установите AWS CLI]} и {linkto(../../../../../storage/s3/connect/s3-cli#s3-connect-cli-configure)[text=настройте подключение]} к {var(s3)}.
1. Узнайте адрес эндпоинта {var(s3)} для региона вашего проекта. Подробнее в разделе {linkto(../../../../../storage/s3/connect/s3-cli#s3-connect-cli-check)[text=Подключение к {var(s3)} через CLI]}.
1. Проверьте на тестовом диске, что все доступы работают.

## {heading({counter(backup-download-cli-api)}. Определите копии для скачивания)[id=backup-download-cli-api-get-ids]}

{tabs}
{tab(OpenStack CLI)}

1. Получите список резервных копий проекта:

   ```console
   openstack volume backup list
   ```

   В столбце `ID` указан ID каждой копии. Чтобы получить копии только одного диска:

      1. Узнайте ID диска ВМ с помощью команды: 
   
         ```console
         openstack volume list
         ```

         ID диска также доступен в личном кабинете в разделе **Облачные вычисления → Диски**.

      1. Выполните команду:

         ```console
         openstack volume backup list --volume <ID_ДИСКА>
         ```

1. Узнайте статус, размер и тип копии, выполнив команду:

   ```console
   openstack volume backup show <ID_КОПИИ>
   ```

   Здесь `<ID_КОПИИ>` — ID резервной копии из столбца `ID` в списке, полученном на предыдущем шаге.

   В выводе команды будет информация о резервной копии. Определите ее тип:

   - Полная копия: в поле `name` есть суффикс `_full`. Достаточно скачать только эту копию диска.
   - Инкрементальная копия: отображается параметр `is_incremental`. Скачайте всю цепочку: базовую полную копию и все инкрементальные копии после нее до нужной.

1. Запишите ID всех копий цепочки по порядку, от полной к выбранной (для полной копии — один ID). Именно эти ID нужно будет подставить вместо `<ID_КОПИИ>` при скачивании.
1. Узнайте и запишите точный размер диска в ГБ, так как он понадобится при сборке диска. Это можно сделать одним из способов:

   - По ID копии:

     ```console
     openstack volume backup show <ID_КОПИИ> -c size -f value
     ```

   - По ID диска:

     ```console
     openstack volume show <ID_ДИСКА> -c size -f value
     ```

{/tab}
{tab(API)}

1. {linkto(../../../../../tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token-gen)[text=Получите токен доступа]} и сохраните его в переменную:

   ```console
   export TOKEN='<ЗНАЧЕНИЕ_ТОКЕНА>'
   ```

   Здесь `<ЗНАЧЕНИЕ_ТОКЕНА>` — токен доступа.

1. {linkto(../../../how-to-guides/api-examples#backup-api-examples-get-provider-id)[text=Получите ID сервиса]} `provider_id`, который обеспечивает резервное копирование.
1. Получите список точек восстановления (checkpoint) от новых к старым:

   ```console
   curl -s --location \
   "https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/providers/<ID_СЕРВИСА>/checkpoints?sort=desc" \
   --header "Accept: application/json" \
   --header "X-Auth-Token: ${TOKEN}" > checkpoints.json
   ```

   Здесь:

   - `${OS_PROJECT_ID}` — Project ID проекта, который вы узнали ранее;
   - `<ID_СЕРВИСА>` — ID сервиса `provider_id`, полученный на предыдущем шаге.

1. Выведите основные сведения о точках восстановления:

   ```console
   jq -r '.checkpoints[] | [.id, .created_at, .status, (.extra_info.comment // "")] | @tsv' checkpoints.json
   ```

1. Выберите нужную точку восстановления по времени создания `created_at` или комментарию. Убедитесь, что ее статус `status` — `available`. Запишите ее `id`.
1. Получите ID копий дисков из выбранной точки восстановления:

   ```console
   jq -r --arg id "<ID_ТОЧКИ_ВОССТАНОВЛЕНИЯ>" '
     .checkpoints[] | select(.id == $id) | .resources[]
     | select(.type == "OS::Cinder::Volume")
     | [.original_id, .external_id, .status] | @tsv' checkpoints.json
   ```

   Здесь `<ID_ТОЧКИ_ВОССТАНОВЛЕНИЯ>` — ID точки восстановления, выбранной на предыдущем шаге.

   Резервным копиям дисков соответствуют ресурсы типа `OS::Cinder::Volume`. В каждой строке:

   - `original_id` — ID исходного диска;
   - `external_id` — ID резервной копии этого диска (имя папки в бакете `volumebackups-<ID_ПРОЕКТА>`, где `<ID_ПРОЕКТА>` — Project ID, который вы узнали ранее);
   - `status` — статус копии, должен быть `available`.

   Если у ВМ несколько дисков, строк будет несколько: каждый диск имеет свою цепочку копий и восстанавливается отдельно.

1. Если вы будете использовать инкрементальную копию, найдите все копии диска, чтобы определить цепочку. Копии одного диска имеют один и тот же `original_id`. Вам понадобятся выбранная копия и все более ранние копии этого диска до базовой полной:

   ```console
   jq -r --arg vol "<ID_ИСХОДНОГО_ДИСКА>" '
     .checkpoints[] | . as $c | $c.resources[]
     | select(.type == "OS::Cinder::Volume" and .original_id == $vol)
     | [$c.created_at, $c.id, .external_id, .status] | @tsv' checkpoints.json
   ```

   Здесь `<ID_ИСХОДНОГО_ДИСКА>` — значение `original_id` нужного диска.

1. Определите тип копий. В ответе API нет признака полной или инкрементальной копии, поэтому определите тип по суффиксу в названии копии. Получите список копий:

   ```console
   openstack volume backup list
   ```

   - Название полной копии содержит суффикс `_full`. В этом случае достаточно будет скачать эту копию.
   - Название инкрементальной копии содержит суффикс `_incremental`. Скачайте всю цепочку: базовую полную копию и все инкрементальные копии после нее до нужной.

   {note:info}
   Поле `parent_id` у ресурса указывает на ресурс ВМ внутри точки восстановления, а не на предыдущую копию, поэтому определять по нему цепочку нельзя.
   {/note}

1. Запишите значения `external_id` всех копий цепочки по порядку, от полной к выбранной (для полной копии — одно значение). Эти значения нужно будет подставить вместо `<ID_КОПИИ>` при скачивании.
1. Узнайте и запишите точный размер диска в ГБ, так как он понадобится при сборке диска. Это можно сделать одним из способов:

   - По ID копии:

     ```console
     openstack volume backup show <ID_КОПИИ> -c size -f value
     ```

     Здесь `<ID_КОПИИ>` — значение `external_id` копии нужного диска.

   - По ID диска:

     ```console
     openstack volume show <ID_ИСХОДНОГО_ДИСКА> -c size -f value
     ```

     Здесь `<ID_ИСХОДНОГО_ДИСКА>` — значение `original_id` нужного диска.

{/tab}
{/tabs}

## {heading({counter(backup-download-cli-api)}. Подготовьте машину для файлов копии)[id=backup-download-cli-api-lin]}

1. Выберите рабочую машину с ОС Linux, на которую будут скачиваться файлы.
1. Убедитесь, что на этой машине достаточно свободного места: под сжатый файл `content` каждой копии и под итоговый RAW-файл, размер которого равен размеру диска.

Сразу после сборки RAW-файл может занимать меньше места, но при копировании и конвертации он займет весь размер диска.

## {heading({counter(backup-download-cli-api)}. Скачайте файлы копий из {var(s3)})[id=backup-download-cli-api-download]}

Файлы копий хранятся в системном бакете `volumebackups-<ID_ПРОЕКТА>`. Имя папки совпадает с ID копии.

Для каждой копии выполните команду:

```console
aws --endpoint-url <АДРЕС_S3> s3 cp s3://volumebackups-<ID_ПРОЕКТА>/<ID_КОПИИ>/ ./<ID_КОПИИ>/ --recursive
```

Здесь:

- `<АДРЕС_S3>` — адрес эндпоинта {var(s3)}, например `https://hb.ru-msk.vkcloud-storage.ru`.
- `<ID_ПРОЕКТА>` — Project ID проекта, который вы узнали ранее.
- `<ID_КОПИИ>` — ID резервной копии: 

   - для OpenStack CLI — значение из столбца `ID`;
   - для API — значение `external_id`. 

Файлы сохранятся в структуре `./<ID_КОПИИ>/<файл>`. Для каждой копии будет скачано пять файлов: 

- `content`,
- `object_segments`,
- `volume_segments`,
- `sha_list`
- `volume_metadata`. 

Подробнее в разделе {linkto(../../../concepts/download-features#backup-download-features-content)[text=Перенос резервных копий дисков ВМ вне {var(cloud)}]}.

Если вы скачиваете цепочку копий, выполните команду для каждой копии цепочки.

## {heading({counter(backup-download-cli-api)}. Проверьте скачанные файлы)[id=backup-download-cli-api-check]}

{include(/ru/_includes/_backup-download-check.md)[tags=check]}
