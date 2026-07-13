# {heading(Миграция данных из AWS S3 в объектное хранилище VK Cloud)[id=aws-s3-migration]}

С помощью сервиса {var(s3)} можно перенести данные из AWS S3, снизив затраты на хранение и уйдя привязки к поставщику (Vendor Lock-in). Миграция выполняется инструментами AWS CLI или rclone с последующей валидацией целостности данных и переключением приложений на новый эндпоинт.

Для примера далее используются следующие данные:

- **Источник:** бакет `my-aws-bucket` в AWS S3, регион `us-east-1`.
- **Назначение:** бакет `my-vk-bucket` в {var(s3)}, регион `ru-msk`.
- **Профиль AWS CLI для источника:** `aws-source`.
- **Профиль AWS CLI для назначения:** `vk-dest`.
- **Эндпоинт {var(s3)}:** `https://hb.ru-msk.vkcloud-storage.ru`.

Замените тестовые значения на ваши реальные данные.

## {heading(Подготовительные шаги)[id=aws-s3-migration-prepare]}

1. Создайте аккаунт для сервиса {var(s3)}, если это еще не сделано:
   1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.
   1. Выберите проект.
   1. Перейдите в раздел **Object Storage** → **Аккаунты**.
   1. Нажмите кнопку **Добавить аккаунт** или **Добавить**.
   1. Задайте имя аккаунта.
   1. Нажмите кнопку **Создать**.
   1. В открывшемся окне скопируйте и сохраните идентификатор ключа доступа (**Access Key ID**) и секретный ключ (**Secret Key**).

      {note:warn}
      После закрытия окна восстановить секретный ключ будет невозможно. Если ключ утерян, создайте новый.
      {/note}

1. Убедитесь, что [AWS CLI](../../../../tools-for-using-services/cli/aws-cli) установлен и настроен для работы с созданным аккаунтом {var(s3)}.
1. (Опционально) Установите [rclone](https://rclone.org/install/), если планируется использовать его для миграции вместо AWS CLI.

## {heading(1. Выберите стратегию миграции)[id=aws-s3-migration-strategy]}

Доступны две стратегии миграции:

- **Big Bang** — полный перенос данных за один проход с последующим переключением всех приложений на новый эндпоинт. Подходит для небольших объемов данных или систем с допустимым окном простоя. Все изменения в исходном бакете после начала миграции нужно переносить повторно.
- **Поэтапная миграция (Dual write)** — приложения параллельно пишут данные в оба хранилища, а фоновый процесс переносит исторические данные. После завершения переноса приложения переключаются на {var(s3)}. Подходит для систем без допустимого простоя и больших объемов данных.

{note:info}
При поэтапной миграции приложения должны поддерживать запись в два хранилища одновременно. Если это невозможно — используйте стратегию Big Bang.
{/note}

Далее рассматривается миграция по стратегии Big Bang с помощью `aws s3 sync`. Для поэтапной миграции используйте тот же инструмент, но запускайте синхронизацию повторно до полного переключения приложений.

## {heading(2. Настройте профили AWS CLI для источника и назначения)[id=aws-s3-migration-profiles]}

Для миграции с помощью `aws s3 sync` потребуются два профиля AWS CLI: один для чтения из AWS S3, другой для записи в {var(s3)}.

1. Настройте профиль `aws-source` для доступа к AWS S3, если он еще не настроен:

   ```console
   aws configure --profile aws-source
   ```

   Задайте значения:

   - `AWS Access Key ID` — ключ доступа к AWS S3.
   - `AWS Secret Access Key` — секретный ключ AWS S3.
   - `Default region name` — регион AWS S3, например `us-east-1`.
   - `Default output format` — `json`.

1. Настройте профиль `vk-dest` для доступа к {var(s3)}:

   ```console
   aws configure --profile vk-dest
   ```

   Задайте значения:

   - `AWS Access Key ID` — сохраненный ранее идентификатор ключа (**Access Key ID**) аккаунта {var(s3)}.
   - `AWS Secret Access Key` — сохраненный ранее секретный ключ (**Secret Key**) аккаунта {var(s3)}.
   - `Default region name` — `ru-msk`.
   - `Default output format` — `json`.

1. Проверьте доступ к обоим хранилищам:

   ```console
   aws s3 ls --profile aws-source
   aws s3 ls --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --profile vk-dest
   ```

   Первая команда должна вывести список бакетов AWS S3, вторая — список бакетов {var(s3)}.

## {heading(3. Создайте целевой бакет в VK Cloud)[id=aws-s3-migration-create-bucket]}

{linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=Создайте бакет]} `my-vk-bucket` в {var(s3)} через личный кабинет или с помощью AWS CLI:

```console
aws s3api create-bucket \
    --bucket my-vk-bucket \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
    --region ru-msk \
    --profile vk-dest
```

{note:warn}
После создания бакета изменить его имя будет невозможно.
{/note}

## {heading(4. Выполните миграцию данных)[id=aws-s3-migration-sync]}

{tabs}

{tab(AWS CLI)}

Команда `aws s3 sync` копирует объекты из исходного бакета в целевой, пропуская уже скопированные файлы с совпадающими ETag и размером.

1. Выполните синхронизацию:

   ```console
   aws s3 sync s3://my-aws-bucket s3://my-vk-bucket \
       --source-region us-east-1 \
       --region ru-msk \
       --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
       --profile vk-dest
   ```

   Здесь:

   - `s3://my-aws-bucket` — исходный бакет AWS S3.
   - `s3://my-vk-bucket` — целевой бакет {var(s3)}.
   - `--source-region us-east-1` — регион источника.
   - `--region ru-msk` — регион назначения.
   - `--endpoint-url` — endpoint {var(s3)}.
   - `--profile vk-dest` — профиль с ключами доступа к {var(s3)}.

   {note:info}
   Команда `aws s3 sync` использует профиль `vk-dest` для доступа к обоим бакетам. Для чтения из AWS S3 будет использован профиль по умолчанию, если не указан `--profile`. Если для AWS S3 нужен отдельный профиль, сначала скопируйте данные локально или используйте rclone.
   {/note}

1. Дождитесь завершения синхронизации. Для больших объемов данных процесс может занять значительное время.

{/tab}

{tab(rclone)}

1. Настройте rclone, создав или отредактировав файл конфигурации:

   ```console
   rclone config
   ```

1. Добавьте два remote: `aws-source` для AWS S3 и `vk-dest` для {var(s3)}. Пример конфигурации:

   ```ini
   [aws-source]
   type = s3
   provider = AWS
   access_key_id = <AWS_ACCESS_KEY>
   secret_access_key = <AWS_SECRET_KEY>
   region = us-east-1

   [vk-dest]
   type = s3
   provider = Other
   access_key_id = <VK_ACCESS_KEY>
   secret_access_key = <VK_SECRET_KEY>
   endpoint = https://hb.ru-msk.vkcloud-storage.ru
   region = ru-msk
   ```

   Здесь `<AWS_ACCESS_KEY>`, `<AWS_SECRET_KEY>` — ключи доступа к AWS S3, `<VK_ACCESS_KEY>`, `<VK_SECRET_KEY>` — ключи доступа к {var(s3)}.

1. Выполните копирование:

   ```console
   rclone copy aws-source:my-aws-bucket vk-dest:my-vk-bucket --progress
   ```

1. Дождитесь завершения копирования.

{/tab}

{/tabs}

## {heading(5. Проверьте целостность перенесенных данных)[id=aws-s3-migration-validate]}

После завершения миграции убедитесь, что все объекты перенесены корректно.

1. Сравните количество объектов в исходном и целевом бакетах:

   ```console
   aws s3api list-objects-v2 --bucket my-aws-bucket --profile aws-source --query "KeyCount" --output text
   aws s3api list-objects-v2 --bucket my-vk-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --profile vk-dest --query "KeyCount" --output text
   ```

   Значения должны совпадать.

1. Сравните ETag (checksum) объектов. Получите списки объектов из обоих бакетов:

   ```console
   aws s3api list-objects-v2 --bucket my-aws-bucket --profile aws-source --query "Contents[*].[Key,ETag,Size]" --output text > aws-objects.txt
   aws s3api list-objects-v2 --bucket my-vk-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --profile vk-dest --query "Contents[*].[Key,ETag,Size]" --output text > vk-objects.txt
   ```

1. Сравните полученные файлы:

   ```console
   diff aws-objects.txt vk-objects.txt
   ```

   Если вывод пустой — все объекты перенесены корректно. Если есть отличия, выполните повторную синхронизацию:

   ```console
   aws s3 sync s3://my-aws-bucket s3://my-vk-bucket \
       --source-region us-east-1 \
       --region ru-msk \
       --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
       --profile vk-dest
   ```

   {note:warn}
   ETag объектов, загруженных составной загрузкой (multipart upload), может отличаться между AWS S3 и {var(s3)}. Для таких объектов сравнивайте размер и ключ объекта, а для полной проверки целостности используйте скачивание и подсчет контрольной суммы локально.
   {/note}

## {heading(6. Переключите приложения на новый эндпоинт)[id=aws-s3-migration-switch]}

1. Обновите конфигурацию приложений для использования эндпоинта {var(s3)}:

   - **Endpoint URL:** `https://hb.ru-msk.vkcloud-storage.ru`
   - **Region:** `ru-msk`
   - **Access Key ID** и **Secret Key** — ключи аккаунта {var(s3)}.
   - **Bucket name:** `my-vk-bucket`

1. Если приложения обращаются к бакету по доменному имени, обновите DNS-записи. Для публичных объектов используйте формат URL `https://<ИМЯ_БАКЕТА>.hb.ru-msk.vkcloud-storage.ru/<КЛЮЧ_ОБЪЕКТА>`.

1. Если используется стратегия Dual write, остановите запись в AWS S3 после подтверждения корректной работы приложений с {var(s3)}.

1. Выполните финальную синхронизацию для переноса объектов, измененных после основной миграции:

   ```console
   aws s3 sync s3://my-aws-bucket s3://my-vk-bucket \
       --source-region us-east-1 \
       --region ru-msk \
       --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
       --profile vk-dest
   ```

## {heading(Удалите неиспользуемые ресурсы)[id=aws-s3-migration-delete]}

После завершения миграции и подтверждения корректной работы приложений с {var(s3)} удалите данные и бакет в AWS S3 согласно документации AWS.

Бакет и загруженные в него объекты в {var(s3)} {linkto(../../tariffication#s3-tariffication)[text=тарифицируются]}. Если они вам больше не нужны:

1. {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Удалите объекты]}.
1. {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Удалите бакет]}.

{note:warn}
Не удаляйте данные в AWS S3 до полного переключения приложений и подтверждения их работоспособности с {var(s3)}.
{/note}