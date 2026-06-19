# {heading(Қолжетімділікті басқару тізімдері)[id=s3-instructions-acl]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Бакеттің ACL-ін алу)[id=s3-instructions-bucket-acl-view]} 

{tabs}

{tab(AWS CLI)}

1. Егер бұған дейін бапталмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api get-bucket-acl --bucket <ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
   ```
   Мұнда:

   - `<ИМЯ_БАКЕТА>` — ACL-ін алу қажет бакеттің атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

   {cut(Команда мысалы)}

   `kuber_backup` бакетінің ACL-ін шығару командасының мысалы:

   ```console
   aws s3api get-bucket-acl --output text --no-cli-pager --bucket kuber_backup --endpoint-url https://hb.vkcloud-storage.ru
   ```
   {/cut}

   `get-bucket-acl` командасы туралы толық ақпарат [әзірлеуші сайтында](https://docs.aws.amazon.com/cli/latest/reference/s3api/get-bucket-acl.html) қолжетімді.

{/tab}

{tab(API)}

{linkto(../../../api/acl#api-spec-s3-get-bucket-acl)[text=Сервис REST API]} ішіндегі `GET /?acl` әдісін пайдаланыңыз.

{/tab}

{/tabs}

## {heading(Объектінің ACL-ін алу)[id=s3-instructions-object-acl-view]} 

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api get-object-acl --bucket <ИМЯ_БАКЕТА> --key <КЛЮЧ_ОБЪЕКТА> --endpoint-url <ENDPOINT_URL>
   ```
   Мұнда:

   - `<ИМЯ_БАКЕТА>` — ACL орнату қажет бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

   {cut(Команда мысалы)}

   `kuber_backup` бакетіндегі `backups/keycloak/keycloak.tar.gz` объектісі үшін ACL-ді шығару командасының мысалы:

   ```console
   aws s3api get-object-acl --output text --no-cli-pager --bucket kuber_backup --key backups/keycloak/keycloak.tar.gz --endpoint-url https://hb.vkcloud-storage.ru
   ```
   {/cut}

   `get-object-acl` командасы туралы толық ақпарат [әзірлеуші сайтында](https://docs.aws.amazon.com/cli/latest/reference/s3api/get-object-acl.html) қолжетімді.

{/tab}

{tab(API)}

{linkto(../../../api/acl#api-spec-s3-get-object-acl)[text=Сервис REST API]} ішіндегі `GET /{object}?acl` әдісін пайдаланыңыз.

{/tab}

{/tabs}

## {heading(Бакет үшін ACL орнату)[id=s3-instructions-bucket-acl-add]}

### {heading(Бакет үшін ACL конфигурациясын орнату)[id=s3-instructions-bucket-acl-add-config]}

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз.
1. {linkto(../../../api/acl#api-spec-s3-acl-request-body)[text=ACL конфигурациясы]} бар файлды дайындаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api put-bucket-acl --bucket <ИМЯ_БАКЕТА>  --access-control-policy file://<ИМЯ_ФАЙЛА>.xml --endpoint-url <ENDPOINT_URL>
   ```
   Мұнда:

   - `<ИМЯ_БАКЕТА>` — ACL орнату қажет бакеттің атауы.
   - `<ИМЯ_ФАЙЛА>` — ACL конфигурациясы бар файлдың атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

   {cut(Команда мысалы)}

   `kuber_backup` бакеті үшін ACL орнату командасының мысалы:

   ```console
   aws s3api put-object-acl --output text --no-cli-pager --bucket kuber_backup --access-control-policy file://acl.xml --endpoint-url https://hb.vkcloud-storage.ru
   ```
   
   `friend_project_canonical_id` жобасына оқу (`WRITE`) құқықтарын беру үшін XML форматындағы ACL конфигурация файлының мысалы:

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <AccessControlPolicy xmlns="https://<ИМЯ_БАКЕТА>.hb.vkcloud-storage.ru">
     <Owner>
       <ID>***Owner-Canonical-User-ID***</ID>
       <DisplayName>owner-display-name</DisplayName>
     </Owner>
     <AccessControlList>
       <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Canonical User">
           <ID>friend_project_canonical_id</ID>
           <DisplayName>friend_project@vkcloud-storage.ru</DisplayName>
         </Grantee>
         <Permission>WRITE</Permission>
       </Grant>
     </AccessControlList>
   </AccessControlPolicy>
   ```
   {/cut}

   `put-bucket-acl` командасы туралы толық ақпарат [әзірлеуші сайтында](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-bucket-acl.html) қолжетімді.

{/tab}

{tab(API)}

{linkto(../../../api/acl#api-spec-s3-put-bucket-acl)[text=Сервис REST API]} ішіндегі `PUT /?acl` әдісін пайдаланыңыз.

{/tab}

{/tabs}

### {heading(Бакет үшін алдын ала анықталған ACL орнату)[id=s3-instructions-bucket-acl-add-preset]}

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз.
1. Команданы орындаңыз:

   ```console
   aws s3api put-bucket-acl \
       --bucket <ИМЯ_БАКЕТА> \
       --acl <ПРЕДОПРЕДЕЛЕННЫЙ_ACL> \
       --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — ACL орнату қажет бакеттің атауы.
   - `<ПРЕДОПРЕДЕЛЕННЫЙ_ACL>` — бакет үшін орнату қажет {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=стандартты ACL]} атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

{/tab}

{tab(API)}

{linkto(../../../api/acl#api-spec-s3-put-bucket-acl)[text=Сервис REST API]} ішіндегі `PUT /?acl` әдісін пайдаланыңыз.

{/tab}

{/tabs}

### {heading(Бакет үшін жекелеген ACL рұқсаттарын орнату)[id=s3-instructions-bucket-acl-add-permission]}

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз.
1. Команданы орындаңыз:

   ```console
   aws s3api put-bucket-acl \
       --bucket <ИМЯ_БАКЕТА> \
       --<ВИД_РАЗРЕШЕНИЯ> <ПОЛУЧАТЕЛЬ_РАЗРЕШЕНИЯ> \
       --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — ACL орнату қажет бакеттің атауы.
   - `<ВИД_РАЗРЕШЕНИЯ>` — келесідей болуы мүмкін:

     - `--grant-read` — бакет үшін {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=рұқсат]} `READ` орнатылады.
     - `--grant-write` — бакет үшін {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=рұқсат]} `WRITE` орнатылады.
     - `--grant-read-acp` — бакет үшін {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=рұқсат]} `READ_ACP` орнатылады.
     - `--grant-write-acp` — бакет үшін {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=рұқсат]} `WRITE_ACP` орнатылады.
     - `--grant-full-control` — бакет үшін {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=рұқсат]} `FULL_CONTROL` орнатылады.
      
   - `<ПОЛУЧАТЕЛЬ_РАЗРЕШЕНИЯ>` — бакет үшін рұқсат берілетін {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permittees)[text=алушы]}.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

{/tab}

{tab(API)}

{linkto(../../../api/acl#api-spec-s3-put-bucket-acl)[text=Сервис REST API]} ішіндегі `PUT /?acl` әдісін пайдаланыңыз.

{/tab}

{/tabs}

## {heading(Объект үшін ACL орнату)[id=s3-instructions-object-acl-add]}

### {heading(Объект үшін ACL конфигурациясын орнату)[id=s3-instructions-object-acl-add-config]}

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз.
1. {linkto(../../../api/acl#api-spec-s3-acl-request-body)[text=ACL конфигурациясы]} бар файлды дайындаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api put-object-acl --bucket <ИМЯ_БАКЕТА> --key <КЛЮЧ_ОБЪЕКТА> --access-control-policy file://<ИМЯ_ФАЙЛА>.xml --endpoint-url <ENDPOINT_URL>
   ```
   Мұнда:

   - `<ИМЯ_БАКЕТА>` — объект орналасқан бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — ACL орнату қажет объектінің толық атауы, оған дейінгі жолды қоса.
   - `<ИМЯ_ФАЙЛА>` — ACL конфигурациясы бар файлдың атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

   {cut(Команда мысалы)}

   `kuber_backup` бакетіндегі `backups/keycloak/keycloak.tar.gz` объектісі үшін ACL орнату командасының мысалы:

   ```console
   aws s3api put-object-acl --bucket kuber_backup --key backups/keycloak/keycloak.tar.gz --access-control-policy file://acl.json --endpoint-url https://hb.vkcloud-storage.ru
   ```

   Пайдаланушыларға толық қолжетімділік (`FULL_CONTROL`) беру үшін JSON форматындағы ACL конфигурация файлының мысалы:

   ```json
   {
      "Owner": {
         "DisplayName": "mcs8274534762",
         "ID": "f2041b20-d081-43a3-a0d9-b73a37eedbc1"
      },
      "Grants": [
         {
            "Grantee": {
               "ID": "f2041b20-d081-43a3-a0d9-b73a37eedbc1",
               "DisplayName": "mcs8274534762",
                  "Type": "CanonicalUser"
            },
            "Permission": "FULL_CONTROL"
         },
         {
            "Grantee": {
               "ID": "d44e3594-0701-449b-890c-3e23c5d55fb7",
               "DisplayName": "NAME_OF_USER",
                  "Type": "CanonicalUser"
            },
            "Permission": "FULL_CONTROL"
         }
      ]
   }
   ```
   {/cut}

   `put-object-acl` командасы туралы толық ақпарат [әзірлеуші сайтында](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-object-acl.html) қолжетімді.

{/tab}

{tab(API)}

{linkto(../../../api/acl#api-spec-s3-put-object-acl)[text=Сервис REST API]} ішіндегі `PUT /{object}?acl` әдісін пайдаланыңыз.

{/tab}

{/tabs}

### {heading(Объект үшін алдын ала анықталған ACL орнату)[id=s3-instructions-object-acl-add-preset]}

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз.
1. Команданы орындаңыз:

   ```console
   aws s3api put-object-acl \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --acl <ПРЕДОПРЕДЕЛЕННЫЙ_ACL> \
     --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — объект орналасқан бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — ACL орнату қажет объектінің толық атауы, оған дейінгі жолды қоса.
   - `<ПРЕДОПРЕДЕЛЕННЫЙ_ACL>` — объект үшін орнату қажет {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=стандартты ACL]} атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

{/tab}

{tab(API)}

{linkto(../../../api/acl#api-spec-s3-put-object-acl)[text=Сервис REST API]} ішіндегі `PUT /{object}?acl` әдісін пайдаланыңыз.

{/tab}

{/tabs}

### {heading(Объект үшін жекелеген ACL рұқсаттарын орнату)[id=s3-instructions-object-acl-add-permission]}

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз.
1. Команданы орындаңыз:

   ```console
   aws s3api put-object-acl \
     --endpoint-url <ENDPOINT_URL> \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     <ВИД_РАЗРЕШЕНИЯ> <ПОЛУЧАТЕЛЬ_РАЗРЕШЕНИЯ>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — объект орналасқан бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — ACL орнату қажет объектінің толық атауы, оған дейінгі жолды қоса.
   - `<ВИД_РАЗРЕШЕНИЯ>` — келесідей болуы мүмкін:

     - `--grant-read` — объект үшін {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=рұқсат]} `READ` орнатылады.
     - `--grant-write` — объект үшін {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=рұқсат]} `WRITE` орнатылады.
     - `--grant-read-acp` — объект үшін {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=рұқсат]} `READ_ACP` орнатылады.
     - `--grant-write-acp` — объект үшін {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=рұқсат]} `WRITE_ACP` орнатылады.
     - `--grant-full-control` — объект үшін {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=рұқсат]} `FULL_CONTROL` орнатылады.

   - `<ПОЛУЧАТЕЛЬ_РАЗРЕШЕНИЯ>` — объект үшін рұқсат берілетін {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permittees)[text=алушы]}.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

{/tab}

{tab(API)}

{linkto(../../../api/acl#api-spec-s3-put-object-acl)[text=Сервис REST API]} ішіндегі `PUT /{object}?acl` әдісін пайдаланыңыз.

{/tab}

{/tabs}
