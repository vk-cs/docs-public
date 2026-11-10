# {heading(Объекттік қоймадағы логтарды Fluent Bit көмегімен репликациялау)[id=fluent-bit-logs]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Fluent Bit көмегімен таратылған жүйелерден логтарды агрегациялау және {var(s3)} объекттік қоймасына репликациялауды конфигурациялауға болады. Логтер машиналардан жиналып, өңделеді және ұзақ мерзімді сақтау мен downstream-жүйелердің кейінгі талдауы үшін {var(s3)} бакетіне жіберіледі.

Мысал ретінде келесі деректер қолданылады:

- Бакет атауы: `fluent-bit-logs`
- Аккаунт аймағы: `ru-msk` (Мәскеу)
- {var(s3)} эндпоинті: `https://hb.ru-msk.vkcloud-storage.ru`
- Лог-файл жолы: `/var/log/app/application.log`

## {heading(Дайындық қадамдары)[id=fluent-bit-logs-prepare]}

1. {var(s3)} сервисі үшін аккаунт жасаңыз, егер бұрын жасалмаса:
   1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
   1. Жобаны таңдаңыз.
   1. **Object Storage** → **Аккаунтар** бөліміне өтіңіз.
   1. **Аккаунт қосу** немесе **Қосу** түймесін басыңыз.
   1. Аккаунт атауын орнатыңыз.
   1. **Жасау** түймесін басыңыз.
   1. Ашылған терезеде қолжетімділік кілтінің идентификаторын (**Access Key ID**) және құпия кілтті (**Secret Key**) көшіріп сақтаңыз.

      {note:warn}
      Терезе жабылғаннан кейін құпия кілтті қалпына келтіру мүмкін болмайды. Егер кілт жоғалса, жаңа кілт жасаңыз.
      {/note}

1. `fluent-bit-logs` атауымен {var(s3)} бакетін {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=жасаңыз]}.

1. [AWS CLI](../../../../tools-for-using-services/cli/aws-cli) орнатылғанын және жасалған {var(s3)} аккаунтымен жұмыс істеуге конфигурацияланғанын тексеріңіз. Бұл жіберілген логтерді тексеру үшін қажет болады.

1. Логтер жиналатын машинаға Fluent Bit орнатыңыз. Орнату нұсқаулары [Fluent Bit ресми құжаттамасында](https://docs.fluentbit.io/manual/installation/getting-started-with-fluent-bit) қолжетімді.

## {heading(1. Қолданушы деректерін қауіпсіз сақтауды конфигурациялаңыз)[id=fluent-bit-logs-step1]}

{var(s3)}-ға қолжетімділік үшін Fluent Bit агенті қолжетімділік кілтінің идентификаторын және құпия кілтті пайдаланады. Қолданушы деректерін конфигурациялық файлға тікелей көрсетпеңіз — орта айнымалыларын пайдаланыңыз.

1. Орта айнымалылары бар файл жасаңыз, мысалы `/etc/fluent-bit/s3-credentials.env`:

   ```bash
   export S3_ACCESS_KEY_ID=<ACCESS_KEY_ID>
   export S3_SECRET_ACCESS_KEY=<SECRET_KEY>
   ```

   Мұнда:
   - `<ACCESS_KEY_ID>` — {var(s3)} аккаунтын жасағанда сақталған қолжетімділік кілтінің идентификаторы.
   - `<SECRET_KEY>` — {var(s3)} аккаунтын жасағанда сақталған құпия кілт.

1. Қолданушы деректері бар файлға қолжетімділікті шектеңіз:

   ```console
   chmod 600 /etc/fluent-bit/s3-credentials.env
   ```

1. Fluent Bit іске қосылмай тұрып орта айнымалыларын жүктеуді конфигурациялаңыз. Егер Fluent Bit systemd плагині арқылы іске қосылса, юнит-файлға қосыңыз:

   ```ini
   [Service]
   EnvironmentFile=/etc/fluent-bit/s3-credentials.env
   ```

   {note:warn}
   Қолданушы деректері бар файлдарды нұсқаларды бақылау жүйелерінде сақтамаңыз. production-орталар үшін құпияларды басқару жүйелерін пайдаланыңыз.
   {/note}

## {heading(2. Fluent Bit конфигурациясын конфигурациялаңыз)[id=fluent-bit-logs-step2]}

Fluent Bit конфигурациясы үш негізгі секциядан тұрады: Input (логтер көзі), Filter (өңдеу) және Output ({var(s3)}-ға жіберу).

1. `/etc/fluent-bit/fluent-bit.conf` файлын жасаңыз немесе өңдеңіз:

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

   Мұнда:
   - `Name` — қолданылатын плагин. `tail` плагинінің орнына journald-тан логтер жинау үшін `systemd` плагинін пайдалануға болады. Бұл жағдайда `[INPUT]` блогына қосымша параметрлерді қосу қажет.

      {cut(systemd плагині үшін INPUT секциясының конфигурациясы мысалы)}
         ```ini
         [INPUT]
            Name              systemd
            Tag               app.logs
            Systemd_Filter    _SYSTEMD_UNIT=app.service
            Read_From_Tail    On
         ```
      {/cut}

   - `Path` — лог-файл жолы. Мысал үшін `/var/log/app/application.log` қолданылады.
   - `Tag` — логтер ағынын белгілеу үшін тег.
   - `region` — {var(s3)} аккаунтының аймақ коды. Мысал үшін `ru-msk` қолданылады.
   - `bucket` — логтер жіберілетін бакет атауы. Мысал үшін `fluent-bit-logs` қолданылады.
   - `endpoint_url` — {var(s3)} сервисінің домені, аккаунт аймағына сәйкес болуы тиіс:
     - `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағы үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағы үшін.
   - `access_key` және `secret_key` — бұрын конфигурацияланған орта айнымалыларының мәндері.
   - `s3_key_format` — бакеттегі файл (объект кілті) атауының форматы.

1. Парсер файлын жасаңыз `/etc/fluent-bit/parsers.conf`:

   ```ini
   [PARSER]
       Name        app_log_parser
       Format      json
       Time_Key    timestamp
       Time_Format %Y-%m-%dT%H:%M:%S.%L
   ```

## {heading(3. Желі жоғалуын өңдеу үшін буферлеуді конфигурациялаңыз)[id=fluent-bit-logs-step3]}

Fluent Bit пен {var(s3)} арасындағы желілік байланыс жоғалғанда логтер жергілікті буферде сақталып, байланыс қалпына келтірілгеннен кейін жіберілуі тиіс. Бұл үшін буфер қоймасы ретінде файлдық жүйе қолданылады.

1. `[SERVICE]` секциясында буфер қоймасының жолы көрсетілгенін тексеріңіз:

   ```ini
   [SERVICE]
       storage.path  /var/log/flb-storage/
   ```

1. `[INPUT]` секциясына `storage.type` параметрін қосыңыз:

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

   Мұнда:

    * `storage.type filesystem` — жедел жад толғанда буферді дискіге жазуды қосады.
    * `Mem_Buf_Limit` — жедел жадты пайдалану лимитін орнатады; лимиттен асқанда деректер дискіге жазылады.

1. `[OUTPUT]` секциясына қайта жіберу параметрлерін қосыңыз:

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

   Мұнда:
   - `Retry_Limit` — қатеге қайта жіберу әрекеттерінің саны.
   - `storage.type filesystem` — шығыс ағынының деректерін буферлеу үшін файлдық жүйені пайдаланады.

1. Буфер үшін директория жасап, құқықтарды орнатыңыз:

   ```console
   mkdir -p /var/log/flb-storage/
   chown fluent:fluent /var/log/flb-storage/
   ```

## {heading(4. Файлдарды атау форматын конфигурациялаңыз)[id=fluent-bit-logs-step4]}

Файлдарды атау форматы (key format) {var(s3)} бакетіндегі объектердің қалай аталатынын анықтайды. Ыңғайлы формат downstream-жүйелерге логтерді күн мен уақыт бойынша тиімді парсингтеу және сұрауға мүмкіндік береді.

`[OUTPUT]` секциясындағы `s3_key_format` параметрі файл атауының үлгісін орнатады. Үлгінің қолжетімді айнымалылары:

- `%Y` — жыл
- `%m` — ай
- `%d` — күн
- `%H` — сағат
- `%M` — минут
- `%S` — секунд
- `$UUID` — файлдың бірегей идентификаторы
- `$TAG` — логтер ағынының тегі

Формат мысалдары:

```ini

# Күн мен уақыт бойынша иерархиялық формат
s3_key_format   /logs/%Y/%m/%d/%H/%M-%S-$UUID

# Дереккөздер бойынша бөлу үшін тегі бар формат
s3_key_format   /logs/$TAG/%Y/%m/%d/%H-%M-$UUID

# Күні бар жазық формат
s3_key_format   /logs/%Y%m%d-%H%M%S-$UUID
```

Мысал үшін күн мен уақыт бойынша директориялар құрылымын жасайтын `/logs/%Y/%m/%d/%H/%M-%S-$UUID` иерархиялық форматы қолданылады:

```text
logs/
  2025/
    01/
      15/
        14-30-00-a1b2c3d4-e5f6-7890-abcd-ef1234567890
        14-35-00-b2c3d4e5-f6a7-8901-bcde-f12345678901
```

{note:info}
`logs/` префиксі бар иерархиялық формат ескі логтерді автоматты жою үшін бакеттің өмірлік циклі ережелерін конфигурациялауды жеңілдетеді. Мысалы, `logs/` префиксі бар 90 күннен ескі логтерді жоюды конфигурациялауға болады.
{/note}

## {heading(5. Жұмыс қабілеттілігін тексеріңіз)[id=fluent-bit-logs-check]}

1. Fluent Bit іске қосыңыз немесе қайта іске қосыңыз:

   ```console
   sudo systemctl restart fluent-bit
   ```

1. Сервис қатесіз іске қосылғанын тексеріңіз:

   ```console
   sudo systemctl status fluent-bit
   ```

1. Fluent Bit логтерін қателердің бар-жоғын тексеру үшін қарап шығыңыз:

   ```console
   journalctl -u fluent-bit -f --no-pager
   ```

1. Лог-файлға тест жазбасын қосыңыз:

   ```console
   echo '{"timestamp":"2025-01-15T14:30:00.000","level":"info","message":"Test log entry"}' >> /var/log/app/application.log
   ```

1. Логтің {var(s3)}-ға жіберілуін күтіңіз. Жіберу уақыты `Flush` (әдепкі бойынша 5 секунд) және `upload_timeout` (мысал үшін — 10 минут) параметрлеріне байланысты.

1. Объект бакетте пайда болғанын тексеріңіз:

   ```console
   aws s3 ls s3://fluent-bit-logs/logs/ --recursive --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   {cut(Команда шығысының мысалы)}

   ```console
   2025-01-15 14:30:05       1024 logs/2025/01/15/14/30-00-a1b2c3d4-e5f6-7890-abcd-ef1234567890
   ```

   {/cut}

1. (Қалауыңыз бойынша) Объектті жүктеп алып, оның мазмұнын тексеріңіз:

   ```console
   aws s3 cp s3://fluent-bit-logs/logs/2025/01/15/14/30-00-a1b2c3d4-e5f6-7890-abcd-ef1234567890 - --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

## {heading(Қолданылмайтын ресурстарды жойыңыз)[id=fluent-bit-logs-delete]}

Жасалған ресурстар {linkto(../../tariffication#s3-tariffication)[text=тарифтеленеді]}. Егер олар сізге енді қажет болмаса:

1. `fluent-bit-logs` бакетінен {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=объекттерді (лог-файлдарды) жойыңыз]}.
1. `fluent-bit-logs` бакетін {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=жойыңыз]}.
1. Егер сервис енді қажет болмаса, Fluent Bit сервисін тоқтатыңыз:

   ```console
   sudo systemctl stop fluent-bit
   sudo systemctl disable fluent-bit
   ```

1. Қолданушы деректері және буфері бар файлдарды жойыңыз:

   ```console
   rm -f /etc/fluent-bit/s3-credentials.env
   rm -rf /var/log/flb-storage/
   ```