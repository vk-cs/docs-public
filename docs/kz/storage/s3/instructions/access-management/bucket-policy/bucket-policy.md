# {heading(Кіру саясаты)[id=s3-instructions-bucket-policy]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(s3)} {linkto(../../../concepts/about#s3-concepts-about-bucket)[text=бакетке]} және {linkto(../../../concepts/about#s3-concepts-about-object)[text=объектілерге]} кіруді {linkto(../../../concepts/access/bucket-policy#s3-concepts-bucket-policy)[text=кіру саясаты]} арқылы баптауға мүмкіндік береді.

{note:info}
Бакеттің кіру саясаттарын Terraform арқылы басқару үшін алдымен жеке кабинетте {linkto(#s3-instructions-bucket-policy-enable-and-disable)[text=кіру саясаттарын қосыңыз]}.
{/note}

## {heading(Кіру саясатын қосу және өшіру)[id=s3-instructions-bucket-policy-enable-and-disable]}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет үшін ![more-icon](../../../assets/more-icon.svg "inline") басып, **Баптаулар** тармағын таңдаңыз.
1. **Кіру саясаттары** қойындысына өтіңіз.
1. **Редактировать Bucket Policy** түймесін басыңыз.
1. Кіру саясаттарын қосыңыз немесе өшіріңіз.

## {heading(ACL қосу және өшіру)[id=s3-instructions-bucket-acl-enable-and-disable]}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет үшін ![more-icon](../../../assets/more-icon.svg "inline") басып, **Баптаулар** тармағын таңдаңыз.
1. **Кіру саясаттары** қойындысына өтіңіз.
1. **Редактировать Ownership control ACL** түймесін басыңыз.
1. **Кіруді басқару тізімдері (ACL)** опциясын қосыңыз немесе өшіріңіз.

## {heading(Кіру саясатының ағымдағы конфигурациясын сұрау)[id=s3-instructions-bucket-policy-view]}

1. {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз, егер ол әлі орнатылмаған болса.
1. Конфигурацияны команданың көмегімен алыңыз:

   ```console
   aws s3api get-bucket-policy \
     --bucket <БАКЕТ_АТЫ> \
     --query Policy \
     --output text \
     --endpoint <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қолжетімділік саясатының конфигурациясын алу қажет бакеттің атауы.
   - `<ENDPOINT_URL>` — аккаунттың {linkto({@root}/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляциясыңызда қолданылатын домендік атауы бар сілтеме.
     {/ifdef}

## {heading(Кіру саясатының жаңа конфигурациясын орнату)[id=s3-instructions-bucket-policy-setup]}

{note:warn}

Жаңа {linkto(../../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=конфигурацияны]} орнату бар конфигурацияны қайта жазады. Бұрыннан бар конфигурацияның параметрлерін өзгерту үшін оны {linkto(#s3-instructions-bucket-policy-edit)[text=өңдеңіз]}.

{/note}

1. {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз, егер ол әлі орнатылмаған болса.
1. Жаңа `<КОНФИГУРАЦИЯ>.json` конфигурация файлын жасаңыз.
1. Файлда кіру саясатының {linkto(../../../concepts/access/bucket-policy#s3-concepts-bucket-policy-config)[text=конфигурациясын]} көрсетіңіз.
1. Жаңа конфигурацияны команданың көмегімен жүктеп салыңыз:

   ```console
   aws s3api put-bucket-policy \
     --bucket <БАКЕТ_АТЫ> \
     --policy=file://<КОНФИГУРАЦИЯ>.json
     --endpoint <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қолжетімділік саясатының конфигурациясын орнату қажет бакеттің атауы.
   - `<КОНФИГУРАЦИЯ>` — JSON форматындағы қолжетімділік саясаты конфигурациясы файлының атауы.
   - `<ENDPOINT_URL>` — аккаунттың {linkto({@root}/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляциясыңызда қолданылатын домендік атауы бар сілтеме.
     {/ifdef}

## {heading(Кіру саясатының конфигурациясын өңдеу)[id=s3-instructions-bucket-policy-edit]}

1. {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз, егер ол әлі орнатылмаған болса.
1. Конфигурацияны команданың көмегімен `<КОНФИГУРАЦИЯ>.json` файлына жергілікті сақтаңыз:

   ```console
   aws s3api get-bucket-policy \
     --bucket <БАКЕТ_АТЫ> \
     --query Policy \
     --output text \
     --endpoint <ENDPOINT_URL> \
     > <КОНФИГУРАЦИЯ>.json
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қолжетімділік саясатының конфигурациясын өңдеу қажет бакеттің атауы.
   - `<ENDPOINT_URL>` — аккаунттың {linkto({@root}/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляциясыңызда қолданылатын домендік атауы бар сілтеме.
     {/ifdef}
   - `<КОНФИГУРАЦИЯ>` — JSON форматындағы кіру саясатының конфигурация файлының атауы.

1. `<КОНФИГУРАЦИЯ>.json` файлына қажетті өзгерістер енгізіңіз. Қажет болса, {linkto(../../../concepts/access/bucket-policy#s3-concepts-bucket-policy-config)[text=конфигурацияның]} басқа параметрлерін орнатыңыз.
1. Жаңа конфигурацияны орнатыңыз:

   ```shell
   aws s3api put-bucket-policy \
     --bucket <БАКЕТ_АТЫ> \
     --policy=file://<КОНФИГУРАЦИЯ>.json
     --endpoint <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қолжетімділік саясатының конфигурациясын орнату қажет бакеттің атауы.
   - `<КОНФИГУРАЦИЯ>` — JSON форматындағы қолжетімділік саясаты конфигурациясы файлының атауы.
   - `<ENDPOINT_URL>` — аккаунттың {linkto({@root}/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляциясыңызда қолданылатын домендік атауы бар сілтеме.
     {/ifdef}

## {heading(Кіру саясатының конфигурациясын жою)[id=s3-instructions-bucket-policy-delete]}

1. {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз, егер ол әлі орнатылмаған болса.
1. Конфигурацияны команданың көмегімен жойыңыз:

   ```shell
   aws s3api delete-bucket-policy \
     --bucket <БАКЕТ_АТЫ> \
     --endpoint <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қолжетімділік саясатының конфигурациясын жою қажет бакеттің атауы.
   - `<ENDPOINT_URL>` — аккаунттың {linkto({@root}/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляциясыңызда қолданылатын домендік атауы бар сілтеме.
     {/ifdef}