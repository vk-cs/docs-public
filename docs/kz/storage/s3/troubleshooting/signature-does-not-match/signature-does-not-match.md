# {heading(Объекттік қоймадағы SignatureDoesNotMatch қатесі)[id=s3-signature-does-not-match]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Объекттік қоймаға API арқылы немесе AWS CLI көмегімен қол жеткізген кезде келесі қате қайтарылады:

```console
An error occurred (SignatureDoesNotMatch) when calling the... 
operation: The request signature we calculated does not match the signature you provided. 
Check your key and signing method`.
```

Бұл қате сұраныстың қолтаңбасы (signature) сервер күтетін қолтаңбаға сәйкес келмейтінін көрсетеді. Себебі әдетте клиенттік ортаның конфигурациясымен байланысты.

### {heading(Шешу)[id=s3-signature-does-not-match-resolve]}

1. Команданың `--endpoint-url` параметрінде сервис домені дұрыс көрсетілгенін{ifdef(public)} және аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймағына]} {var(s3)} сәйкес келетінін тексеріңіз:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені{/ifdef}.

1. **Access Key ID** және **Secret Access Key** мәндері `~/.aws/credentials` конфигурациялық файлында қате жазу, артық бос орындар немесе басқа таңбалар болмай енгізілгенін тексеріңіз. Сондай-ақ, орта айнымалылары (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) конфигурациялық файлдағы мәндерді қайта анықтамайтынын тексеріңіз.

   Рұқсат кілттеріндегі қатені болдырмау үшін {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys)[text=аккаунтыңызға]} {var(s3)} жаңа **Access Key ID** және **Secret Access Key** жұбын жасаңыз.

1. Жүйелік уақыт дәл уақыт серверімен (NTP) синхрондалғанын тексеріңіз.

   {note:info}
   Жүйелік уақыт серверлік уақыттан 15 минуттан астам өзгеше болса, қолтаңба жарамсыз болып есептеледі.
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

1. Сұраныстың қалыптасуы туралы толық ақпарат алу және қатенің себебін анықтау үшін AWS CLI командасына `--debug` жалаушасын қосыңыз.

{ifdef(public)}

1. Егер проблема сақталса, [техникалық қолдау көрсету қызметіне](/kz/contacts) жүгініңіз.

{/ifdef}