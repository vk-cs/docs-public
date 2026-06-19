# {heading(Объектілік қоймаға жүгінген кезде SignatureDoesNotMatch қатесі)[id=s3-signature-does-not-match]}

{include(/kz/_includes/_translated_by_ai.md)}

API арқылы немесе AWS CLI көмегімен объектілік қоймаға жүгінген кезде келесі қате қайтарылады:

```console
An error occurred (SignatureDoesNotMatch) when calling the... 
operation: The request signature we calculated does not match the signature you provided. 
Check your key and signing method`.
```

Бұл қате сұраудың қолтаңбасы (signature) сервер күткен қолтаңбамен сәйкес келмейтінін білдіреді. Себебі әдетте клиенттік орта конфигурациясына байланысты болады.

### {heading(Шешімі)[id=s3-signature-does-not-match-resolve]}

1. Команданың `--endpoint-url` параметрінде сервис домені дұрыс көрсетілгеніне көз жеткізіңіз{ifdef(public)} және {var(s3)} аккаунтының {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келетініне көз жеткізіңіз:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені{/ifdef}.

1. `~/.aws/credentials` конфигурация файлында **Access Key ID** және **Secret Access Key** мәндері қате жазылусыз, артық бос орындарсыз немесе басқа таңбаларсыз берілгеніне көз жеткізіңіз. Сондай-ақ орта айнымалылары (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) конфигурация файлындағы мәндерді қайта анықтап тұрмағанын тексеріңіз.
   
   Қол жеткізу кілттеріндегі қатені жоққа шығару үшін {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys)[text={var(s3)} аккаунтыңыз]} үшін жаңа **Access Key ID** және **Secret Access Key** жұбын жасаңыз.

1. Жүйелік уақыт дәл уақыт серверімен (NTP) синхрондалғанына көз жеткізіңіз.

   {note:info}
   Егер жүйелік уақыт сервер уақытынан 15 минуттан артық айырмашылықта болса, қолтаңба жарамсыз болып есептеледі.
   {/note}

   Уақытты мәжбүрлеп синхрондау үшін команданы орындаңыз:

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

{ifdef(public)}

1. Егер мәселе сақталса, [техникалық қолдауға](/kz/contacts) жүгініңіз.

{/ifdef}