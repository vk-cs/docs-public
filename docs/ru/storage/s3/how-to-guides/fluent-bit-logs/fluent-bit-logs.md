# {heading(Репликация логов в объектное хранилище с помощью Fluent Bit)[id=fluent-bit-logs]}

С помощью Fluent Bit можно настроить агрегацию и репликацию логов из распределенных систем в объектное хранилище  {var(s3)}. Логи собираются с машин, обрабатываются и отправляются в бакет {var(s3)} для длительного хранения и последующего анализа downstream-системами.

Для примера далее используются следующие данные:

- Имя бакета: `fluent-bit-logs`
- Регион аккаунта: `ru-msk` (Москва)
- Эндпоинт {var(s3)}: `https://hb.ru-msk.vkcloud-storage.ru`
- Путь к лог-файлу: `/var/log/app/application.log`

## {heading(Подготовительные шаги)[id=fluent-bit-logs-prepare]}

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

1. {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=Создайте]} бакет {var(s3)} с именем `fluent-bit-logs`.

1. Убедитесь, что [AWS CLI](../../../../tools-for-using-services/cli/aws-cli) установлен и настроен для работы с созданным аккаунтом {var(s3)}. Это потребуется для проверки отправленных логов.

1. Установите Fluent Bit на машину, с которой будут собираться логи. Инструкции по установке доступны в [официальной документации Fluent Bit](https://docs.fluentbit.io/manual/installation/getting-started-with-fluent-bit).

## {heading(1. Настройте безопасное хранение учетных данных)[id=fluent-bit-logs-step1]}

Для доступа к {var(s3)} агент Fluent Bit использует идентификатор ключа доступа и секретный ключ. Не указывайте учетные данные в конфигурационном файле напрямую — используйте переменные окружения.

1. Создайте файл с переменными окружения, например `/etc/fluent-bit/s3-credentials.env`:

   ```bash
   export S3_ACCESS_KEY_ID=<ACCESS_KEY_ID>
   export S3_SECRET_ACCESS_KEY=<SECRET_KEY>
   ```

   Здесь:
   - `<ACCESS_KEY_ID>` — сохраненный при создании аккаунта {var(s3)} идентификатор ключа доступа.
   - `<SECRET_KEY>` — сохраненный при создании аккаунта {var(s3)} секретный ключ.

1. Ограничьте доступ к файлу с учетными данными:

   ```console
   chmod 600 /etc/fluent-bit/s3-credentials.env
   ```

1. Настройте загрузку переменных окружения перед запуском Fluent Bit. Если Fluent Bit запускается через плагин systemd, добавьте в юнит-файл:

   ```ini
   [Service]
   EnvironmentFile=/etc/fluent-bit/s3-credentials.env
   ```

   {note:warn}
   Не храните файлы с учетными данными в системах контроля версий. Для production-окружений используйте системы управления секретами.
   {/note}

## {heading(2. Настройте конфигурацию Fluent Bit)[id=fluent-bit-logs-step2]}

Конфигурация Fluent Bit состоит из трех основных секций: Input (источник логов), Filter (обработка) и Output (отправка в {var(s3)}).

1. Создайте или отредактируйте файл `/etc/fluent-bit/fluent-bit.conf`:

   ```ini
   [SERVICE]
       Flush         5
       Log_Level     info
       storage.path  /var/log/flb-storage/
       Parsers_File  /etc/fluent-bit/parsers.conf

   [INPUT]
       Name              tail
       Path              /var/log/app/application.log
       Tag               app.logs
       Refresh_Interval  5
       Mem_Buf_Limit     50MB
       Skip_Long_Lines   On

   [FILTER]
       Name parser
       Match app.logs
       Key_Name log
       Parser app_log_parser
       Preserve_Key true
       Reserve_Data true

   [OUTPUT]
       Name            s3
       Match           app.logs
       region          ru-msk
       bucket          fluent-bit-logs
       endpoint_url    https://hb.ru-msk.vkcloud-storage.ru
       access_key      ${S3_ACCESS_KEY_ID}
       secret_key      ${S3_SECRET_ACCESS_KEY}
       use_put_object  On
       s3_key_format   /logs/%Y/%m/%d/%H/%M-%S-$UUID
       total_file_size 50M
       upload_timeout  10m
   ```

   Здесь:
   - `Name` — используемый плагин. Вместо плагина `tail` можно использовать плагин `systemd` для сбора логов из journald. В этом случае в блок `[INPUT]` нужно добавить дополительные параметры.

      {cut(Пример конфигурации секции INPUT для плагина systemd)}
         ```ini
         [INPUT]
            Name              systemd
            Tag               app.logs
            Systemd_Filter    _SYSTEMD_UNIT=app.service
            Read_From_Tail    On
         ```
      {/cut}
      
   - `Path` — путь к лог-файлу. Для примера используется `/var/log/app/application.log`.
   - `Tag` — тег для маркировки потока логов.
   - `region` — код региона аккаунта {var(s3)}. Для примера используется `ru-msk`.
   - `bucket` — имя бакета, в который будут отправляться логи. Для примера используется `fluent-bit-logs`.
   - `endpoint_url` — домен сервиса {var(s3)}, должен соответствовать региону аккаунта:
     - `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
   - `access_key` и `secret_key` — значения из переменных окружения, настроенных ранее.
   - `s3_key_format` — формат имени файла (ключа объекта) в бакете.

1. Создайте файл парсера `/etc/fluent-bit/parsers.conf`:

   ```ini
   [PARSER]
       Name        app_log_parser
       Format      json
       Time_Key    timestamp
       Time_Format %Y-%m-%dT%H:%M:%S.%L
   ```

## {heading(3. Настройте буферизацию для обработки потери сети)[id=fluent-bit-logs-step3]}

При потере сетевого соединения между Fluent Bit и {var(s3)} логи должны сохраняться в локальный буфер и отправляться после восстановления связи. Для этого используется файловая система в качестве хранилища буфера.

1. Убедитесь, что в секции `[SERVICE]` указан путь к хранилищу буфера:

   ```ini
   [SERVICE]
       storage.path  /var/log/flb-storage/
   ```

1. Добавьте параметр `storage.type` в секции `[INPUT]`:

   ```ini
   [INPUT]
       Name              tail
       Path              /var/log/app/application.log
       Tag               app.logs
       Refresh_Interval  5
       Mem_Buf_Limit     50MB
       Skip_Long_Lines   On
       storage.type      filesystem
   ```

   Здесь:
   
    * `storage.type filesystem` — включает запись буфера на диск при переполнении оперативной памяти.
    * `Mem_Buf_Limit` — задает лимит использования оперативной памяти; при превышении лимита данные записываются на диск.

1. Добавьте параметры повторной отправки в секцию `[OUTPUT]`:

   ```ini
   [OUTPUT]
       Name            s3
       Match           app.logs
       region          ru-msk
       bucket          fluent-bit-logs
       endpoint_url    https://hb.ru-msk.vkcloud-storage.ru
       access_key      ${S3_ACCESS_KEY_ID}
       secret_key      ${S3_SECRET_ACCESS_KEY}
       use_put_object  On
       s3_key_format   /logs/%Y/%m/%d/%H/%M-%S-$UUID
       total_file_size 50M
       upload_timeout  10m
       Retry_Limit     5
       storage.type    filesystem
   ```

   Здесь:
   - `Retry_Limit` — количество попыток повторной отправки при ошибке.
   - `storage.type filesystem` — использует файловую систему для буферизации данных выходного потока.

1. Создайте директорию для буфера и задайте права:

   ```console
   mkdir -p /var/log/flb-storage/
   chown fluent:fluent /var/log/flb-storage/
   ```

## {heading(4. Настройте формат именования файлов)[id=fluent-bit-logs-step4]}

Формат именования файлов (key format) определяет, как будут называться объекты в бакете {var(s3)}. Удобный формат позволяет downstream-системам эффективно парсить и запрашивать логи по дате и времени.

Параметр `s3_key_format` в секции `[OUTPUT]` задает шаблон имени файла. Доступные переменные шаблона:

- `%Y` — год
- `%m` — месяц
- `%d` — день
- `%H` — час
- `%M` — минута
- `%S` — секунда
- `$UUID` — уникальный идентификатор файла
- `$TAG` — тег потока логов

Примеры форматов:

```ini
# Иерархический формат по дате и времени
s3_key_format   /logs/%Y/%m/%d/%H/%M-%S-$UUID

# Формат с тегом для разделения по источникам
s3_key_format   /logs/$TAG/%Y/%m/%d/%H-%M-$UUID

# Плоский формат с датой
s3_key_format   /logs/%Y%m%d-%H%M%S-$UUID
```

Для примера используется иерархический формат `/logs/%Y/%m/%d/%H/%M-%S-$UUID`, который создает структуру директорий по дате и времени:

```text
logs/
  2025/
    01/
      15/
        14-30-00-a1b2c3d4-e5f6-7890-abcd-ef1234567890
        14-35-00-b2c3d4e5-f6a7-8901-bcde-f12345678901
```

{note:info}
Иерархический формат с префиксом `logs/` упрощает настройку правил жизненного цикла бакета для автоматического удаления старых логов. Например, можно настроить удаление логов старше 90 дней с префиксом `logs/`.
{/note}

## {heading(5. Проверьте работоспособность)[id=fluent-bit-logs-check]}

1. Запустите или перезапустите Fluent Bit:

   ```console
   sudo systemctl restart fluent-bit
   ```

1. Убедитесь, что сервис запущен без ошибок:

   ```console
   sudo systemctl status fluent-bit
   ```

1. Проверьте логи Fluent Bit на наличие ошибок:

   ```console
   journalctl -u fluent-bit -f --no-pager
   ```

1. Добавьте тестовую запись в лог-файл:

   ```console
   echo '{"timestamp":"2025-01-15T14:30:00.000","level":"info","message":"Test log entry"}' >> /var/log/app/application.log
   ```

1. Дождитесь отправки лога в {var(s3)}. Время отправки зависит от параметров `Flush` (по умолчанию 5 секунд) и `upload_timeout` (для примера — 10 минут).

1. Проверьте, что объект появился в бакете:

   ```console
   aws s3 ls s3://fluent-bit-logs/logs/ --recursive --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   {cut(Пример вывода команды)}

   ```console
   2025-01-15 14:30:05       1024 logs/2025/01/15/14/30-00-a1b2c3d4-e5f6-7890-abcd-ef1234567890
   ```

   {/cut}

1. (Опционально) Скачайте объект и проверьте его содержимое:

   ```console
   aws s3 cp s3://fluent-bit-logs/logs/2025/01/15/14/30-00-a1b2c3d4-e5f6-7890-abcd-ef1234567890 - --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

## {heading(Удалите неиспользуемые ресурсы)[id=fluent-bit-logs-delete]}

Созданные ресурсы {linkto(../../tariffication#s3-tariffication)[text=тарифицируются]}. Если они вам больше не нужны:

1. {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Удалите объекты]} (лог-файлы) из бакета `fluent-bit-logs`.
1. {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Удалите бакет]} `fluent-bit-logs`.
1. Остановите сервис Fluent Bit, если он больше не нужен:

   ```console
   sudo systemctl stop fluent-bit
   sudo systemctl disable fluent-bit
   ```

1. Удалите файлы с учетными данными и буфером:

   ```console
   rm -f /etc/fluent-bit/s3-credentials.env
   rm -rf /var/log/flb-storage/
   ```
