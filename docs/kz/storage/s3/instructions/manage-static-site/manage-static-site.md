# {heading(Статикалық сайттарды хостингтеу)[id=s3-instructions-manage-static-site]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(s3)} {linkto(../../concepts/about#s3-concepts-about-bucket)[text=бакетті]} {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting)[text=статикалық сайтты хостингтеу]} үшін пайдалануға мүмкіндік береді.

## {heading(Статикалық сайттың конфигурациясын алу)[id=s3-instructions-manage-static-site-view]}

1. {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатыңыз және баптаңыз, егер ол әлі орнатылмаған болса.
1. Конфигурацияны мына команданың көмегімен алыңыз:

   ```console
   aws s3api get-bucket-website --bucket <ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — статикалық сайттың конфигурациясын алу қажет бакеттің атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясыңызда қолданылатын домендік атауы бар сілтеме.
     {/ifdef}

## {heading(Статикалық сайттың жаңа конфигурациясын орнату)[id=s3-instructions-manage-static-site-setup]}

{note:warn}

Жаңа {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=конфигурацияны]} орнату бар конфигурацияны қайта жазады. Бар конфигурацияның параметрлерін өзгерту үшін оны {linkto(#s3-instructions-manage-static-site-edit)[text=өңдеңіз]}.

{/note}

1. {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатыңыз және баптаңыз, егер ол әлі орнатылмаған болса.
1. Жаңа бакетті {linkto(../buckets/create-bucket#s3-instructions-create-bucket)[text=жасаңыз]}.
1. Егер бұрын жасалмаса, бакет үшін `public-read` ACL конфигурациясын {linkto(../access-management/acl#s3-instructions-object-acl-add-preset)[text=орнатыңыз]}. Бұл нысандарға публичтік қолжетімділік үшін қажет, әйтпесе сұраныстар `403` қатесімен аяқталады.
1. Жаңа `<КОНФИГУРАЦИЯ>.json` конфигурация файлын жасаңыз.
1. Файлда статикалық сайттың {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=конфигурациясын]} көрсетіңіз.
1. Жаңа конфигурацияны мына команданың көмегімен жүктеңіз:

   ```console
   aws s3api put-bucket-website --bucket <ИМЯ_БАКЕТА> --website-configuration file://<КОНФИГУРАЦИЯ>.json --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — статикалық сайттың конфигурациясын орнату қажет бакеттің атауы.
   - `<КОНФИГУРАЦИЯ>` — JSON форматындағы статикалық сайттың конфигурация файлының атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясыңызда қолданылатын домендік атауы бар сілтеме.
     {/ifdef}

1. Статикалық сайттың бетіне өтіңіз:

   ```text
   https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/<PREFIX>
   ```

   {ifdef(s3,s3-pdf)}

   {note:info}

   Сілтеменің форматы өзгеше болуы мүмкін. Нақтылау үшін әкімшіге жүгініңіз.

   {/note}

   {/ifdef}

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — статикалық сайттың конфигурациясы орнатылған бакеттің атауы;

   {ifdef(public)}

   - `<ENDPOINT_HOSTNAME>` — {var(s3)} сервисінің хост атауы, аккаунттың [өңіріне](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

     - `hb.vkcloud-storage.ru` немесе `hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_HOSTNAME>` — сіздің {var(s3)} инсталляциясыңызда қолданылатын хост атауы.
     {/ifdef}
   - `<PREFIX>` — индекстік беттің нысан кілтінің префиксі. Бос болуы мүмкін.

## {heading(Статикалық сайттың конфигурациясын өңдеу)[id=s3-instructions-manage-static-site-edit]}

1. {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатыңыз және баптаңыз, егер ол әлі орнатылмаған болса.
1. Конфигурацияны мына команданың көмегімен локальді `<КОНФИГУРАЦИЯ>.json` файлына сақтаңыз:

   ```console
   aws s3api get-bucket-website --bucket <ИМЯ_БАКЕТА> --output json --endpoint-url <ENDPOINT_URL> > <КОНФИГУРАЦИЯ>.json
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — статикалық сайттың конфигурациясын өңдеу қажет бакеттің атауы.
   - `<КОНФИГУРАЦИЯ>` — JSON форматындағы статикалық сайттың конфигурация файлының атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясыңызда қолданылатын домендік атауы бар сілтеме.
     {/ifdef}

1. `<КОНФИГУРАЦИЯ>.json` файлына қажетті өзгерістерді енгізіңіз. Қажет болған жағдайда {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=конфигурацияның]} басқа параметрлерін орнатыңыз.
1. Жаңа конфигурацияны орнатыңыз:

   ```shell
   aws s3api put-bucket-website --bucket <ИМЯ_БАКЕТА> --website-configuration file://<КОНФИГУРАЦИЯ>.json --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — статикалық сайттың конфигурациясын орнату қажет бакеттің атауы.
   - `<КОНФИГУРАЦИЯ>` — JSON форматындағы статикалық сайттың конфигурация файлының атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясыңызда қолданылатын домендік атауы бар сілтеме.
     {/ifdef}

## {heading(Статикалық сайттың конфигурациясын жою)[id=s3-instructions-manage-static-site-delete]}

1. {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатыңыз және баптаңыз, егер ол әлі орнатылмаған болса.
1. Конфигурацияны мына команданың көмегімен жойыңыз:

   ```shell
   aws s3api delete-bucket-website --bucket <ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — статикалық сайттың конфигурациясын жою қажет бакеттің атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясыңызда қолданылатын домендік атауы бар сілтеме.
     {/ifdef}