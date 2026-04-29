{include(/kz/_includes/_translated_by_ai.md)}

Объектілік хранилищеге API арқылы немесе AWS CLI көмегімен жүгінгенде мына қате қайтарылады:

```console
An error occurred (SignatureDoesNotMatch) when calling the... 
operation: The request signature we calculated does not match the signature you provided. 
Check your key and signing method`.
```

Бұл қате сұрау қолтаңбасы (signature) сервер күткен қолтаңбамен сәйкес келмейтінін көрсетеді. Себеп әдетте клиенттік ортаның конфигурациясына байланысты болады.

### Шешім

1. `--endpoint-url` команда параметрінде шақырылатын команда үшін сервис домені дұрыс көрсетілгеніне және VK Object Storage аккаунтының [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес келетініне көз жеткізіңіз:

    - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
    - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

1. **Access Key ID** және **Secret Access Key** мәндері `~/.aws/credentials` конфигурация файлында қате таңбасыз, артық бос орындарсыз және басқа символдарсыз берілгеніне көз жеткізіңіз. Сондай-ақ орта айнымалылары (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) конфигурация файлындағы мәндерді қайта анықтамайтынын тексеріңіз. 

   Қолжеткізу кілттеріндегі қатені болдырмау үшін [VK Object Storage аккаунтыңыз үшін](/kz/storage/s3/instructions/access-management/access-keys) жаңа **Access Key ID** және **Secret Access Key** жұбын жасаңыз.

1. Жүйелік уақыт дәл уақыт серверімен (NTP) синхрондалғанына көз жеткізіңіз. 

   {note:info}
   Егер жүйелік уақыт сервер уақытынан 15 минуттан артық айырмашылықта болса, қолтаңба жарамсыз деп есептеледі.
   {/note}

   Уақытты мәжбүрлі түрде синхрондау үшін команданы орындаңыз:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   sudo timedatectl set-ntp true
   ```

   {/tab}

   {tab(Windows)}

   ```console
   w32tm /resync
   ```

   {/tab}

   {/tabs}

1. Сұраудың қалыптасуы туралы толық ақпарат алу және қатенің себебін анықтау үшін AWS CLI командасына `--debug` жалаушасын қосыңыз. 

1. Егер мәселе сақталса, [техникалық қолдауға](/kz/contacts) хабарласыңыз.
