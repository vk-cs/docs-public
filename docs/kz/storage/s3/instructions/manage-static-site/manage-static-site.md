# {heading(Статикалық сайттарды хостингтеу)[id=s3-instructions-manage-static-site]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(s3)} {linkto(../../concepts/about#s3-concepts-about-bucket)[text=бакетті]} {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting)[text=статикалық сайтты хостингтеу]} үшін пайдалануға мүмкіндік береді.

## {heading(Статикалық сайт конфигурациясын алу)[id=s3-instructions-manage-static-site-view]}

1. Егер {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Конфигурацияны мына команда арқылы алыңыз:

   ```console
   aws s3api get-bucket-website --bucket <ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — статикалық сайт конфигурациясын алу қажет бакеттің атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме.
     {/ifdef}

## {heading(Статикалық сайттың жаңа конфигурациясын орнату)[id=s3-instructions-manage-static-site-setup]}

{note:warn}

Жаңа {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=конфигурацияны]} орнату бар конфигурацияны қайта жазады. Бар конфигурация параметрлерін өзгерту үшін оны {linkto(#s3-instructions-manage-static-site-edit)[text=өңдеңіз]}.

{/note}

1. Егер {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Жаңа бакетті {linkto(../buckets/create-bucket#s3-instructions-create-bucket)[text=жасаңыз]}.
1. Егер бұған дейін жасалмаған болса, бакет үшін ACL `public-read` конфигурациясын {linkto(../access-management/acl#s3-instructions-object-acl-add-preset)[text=орнатыңыз]}. Бұл объектілерге жария қол жеткізу үшін қажет, әйтпесе сұраулар `403` қатесімен аяқталады.
1. `<КОНФИГУРАЦИЯ>.json` жаңа конфигурация файлын жасаңыз.
1. Файлда статикалық сайттың {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=конфигурациясын]} көрсетіңіз.
1. Жаңа конфигурацияны мына команда арқылы жүктеңіз:

   ```console
   aws s3api put-bucket-website --bucket <ИМЯ_БАКЕТА> --website-configuration file://<КОНФИГУРАЦИЯ>.json --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — статикалық сайт конфигурациясын орнату қажет бакеттің атауы.
   - `<КОНФИГУРАЦИЯ>` — JSON форматындағы статикалық сайт конфигурациясы файлының атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме.
     {/ifdef}

1. Статикалық сайт бетіне өтіңіз:

   ```text
   https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/<PREFIX>
   ```

   {ifdef(s3,s3-pdf)}

   {note:info}

   Сілтеме форматы өзгеше болуы мүмкін. Нақтылау үшін әкімшіге жүгініңіз.

   {/note}

   {/ifdef}

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — статикалық сайт конфигурациясы орнатылған бакеттің атауы;

   {ifdef(public)}

   - `<ENDPOINT_HOSTNAME>` — {var(s3)} сервисінің хост атауы, аккаунттың [өңіріне](/kz/tools-for-using-services/account/concepts/regions) сәйкес келуі керек:

     - `hb.vkcloud-storage.ru` немесе `hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_HOSTNAME>` — {var(s3)} инсталляцияңызда қолданылатын хост атауы.
     {/ifdef}
   - `<PREFIX>` — индекс беті объектісінің кілт префиксі. Бос болуы мүмкін.

## {heading(Статикалық сайт конфигурациясын өңдеу)[id=s3-instructions-manage-static-site-edit]}

1. Егер {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Конфигурацияны `<КОНФИГУРАЦИЯ>.json` файлына мына команда арқылы жергілікті түрде сақтаңыз:

   ```console
   aws s3api get-bucket-website --bucket <ИМЯ_БАКЕТА> --output json --endpoint-url <ENDPOINT_URL> > <КОНФИГУРАЦИЯ>.json
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — статикалық сайт конфигурациясын өңдеу қажет бакеттің атауы.
   - `<КОНФИГУРАЦИЯ>` — JSON форматындағы статикалық сайт конфигурациясы файлының атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме.
     {/ifdef}

1. `<КОНФИГУРАЦИЯ>.json` файлына қажетті өзгерістерді енгізіңіз. Қажет болса, {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=конфигурацияның]} басқа параметрлерін орнатыңыз.
1. Жаңа конфигурацияны орнатыңыз:

   ```shell
   aws s3api put-bucket-website --bucket <ИМЯ_БАКЕТА> --website-configuration file://<КОНФИГУРАЦИЯ>.json --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — статикалық сайт конфигурациясын орнату қажет бакеттің атауы.
   - `<КОНФИГУРАЦИЯ>` — JSON форматындағы статикалық сайт конфигурациясы файлының атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме.
     {/ifdef}


## {heading(Статикалық сайт конфигурациясын жою)[id=s3-instructions-manage-static-site-delete]}

1. Егер {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Конфигурацияны мына команда арқылы жойыңыз:

   ```shell
   aws s3api delete-bucket-website --bucket <ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — статикалық сайт конфигурациясын жою қажет бакеттің атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме.
     {/ifdef}