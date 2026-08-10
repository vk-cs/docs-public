# {heading(Қолжетімділік саясаты)[id=s3-instructions-bucket-policy]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(s3)} {linkto(../../../concepts/access/bucket-policy#s3-concepts-bucket-policy)[text=қолжетімділік саясаты]} көмегімен {linkto(../../../concepts/about#s3-concepts-about-bucket)[text=бакетке]} және {linkto(../../../concepts/about#s3-concepts-about-object)[text=объектілерге]} қолжетімділікті баптауға мүмкіндік береді.

## {heading(Қолжетімділік саясатын қосу және өшіру)[id=s3-instructions-bucket-policy-enable-and-disable]}

1. [Өтіңіз](https://kz.cloud.vk.kz/app) {var(cloud)} жеке кабинетіне.
1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет үшін ![more-icon](../../../assets/more-icon.svg "inline") түймесін басып, **Баптаулар** тармағын таңдаңыз.
1. **Қолжетімділік саясаттары** қойындысына өтіңіз.
1. **Bucket Policy өңдеу** түймесін басыңыз.
1. **Bucket Policy қосу** немесе **Bucket Policy өшіру** түймесін басыңыз.

## {heading(ACL қосу және өшіру)[id=s3-instructions-bucket-acl-enable-and-disable]}

1. [Өтіңіз](https://kz.cloud.vk.kz/app) {var(cloud)} жеке кабинетіне.
1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет үшін ![more-icon](../../../assets/more-icon.svg "inline") түймесін басып, **Баптаулар** тармағын таңдаңыз.
1. **Қолжетімділік саясаттары** қойындысына өтіңіз.
1. **Ownership control ACL өңдеу** түймесін басыңыз.
1. **Қолжетімділікті басқару тізімдері (ACL)** опциясын қосыңыз немесе өшіріңіз.

## {heading(Қолжетімділік саясатының ағымдағы конфигурациясын сұрату)[id=s3-instructions-bucket-policy-view]}

1. Егер әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз.
1. Конфигурацияны келесі команда арқылы алыңыз:

   ```console
   aws s3api get-bucket-policy \
     --bucket <ИМЯ_БАКЕТА> \
     --query Policy \
     --output text \
     --endpoint <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қолжетімділік саясатының конфигурациясын алу қажет бакеттің атауы.
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.

## {heading(Қолжетімділік саясатының жаңа конфигурациясын орнату)[id=s3-instructions-bucket-policy-setup]}

{note:warn}

Жаңа {linkto(../../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=конфигурацияны]} орнату қолданыстағысын қайта жазады. Бұрыннан бар конфигурацияның параметрлерін өзгерту үшін оны {linkto(#s3-instructions-bucket-policy-edit)[text=өңдеңіз]}.

{/note}

1. Егер әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз.
1. `<КОНФИГУРАЦИЯ>.json` жаңа конфигурация файлын жасаңыз.
1. Файлда қолжетімділік саясатының {linkto(../../../concepts/access/bucket-policy#s3-concepts-bucket-policy-config)[text=конфигурациясын]} көрсетіңіз.
1. Жаңа конфигурацияны келесі команда арқылы жүктеңіз:

   ```console
   aws s3api put-bucket-policy \
     --bucket <ИМЯ_БАКЕТА> \
     --policy=file://<КОНФИГУРАЦИЯ>.json
     --endpoint <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қолжетімділік саясатының конфигурациясын орнату қажет бакеттің атауы.
   - `<КОНФИГУРАЦИЯ>` — JSON форматындағы қолжетімділік саясаты конфигурациясы файлының атауы.
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.

## {heading(Қолжетімділік саясаты конфигурациясын өңдеу)[id=s3-instructions-bucket-policy-edit]}

1. Егер әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз.
1. Конфигурацияны келесі команда арқылы `<КОНФИГУРАЦИЯ>.json` файлына локалды түрде сақтаңыз:

   ```console
   aws s3api get-bucket-policy \
     --bucket <ИМЯ_БАКЕТА> \
     --query Policy \
     --output text \
     --endpoint <ENDPOINT_URL> \
     > <КОНФИГУРАЦИЯ>.json
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қолжетімділік саясатының конфигурациясын өңдеу қажет бакеттің атауы.
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
   - `<КОНФИГУРАЦИЯ>` — JSON форматындағы қолжетімділік саясаты конфигурациясы файлының атауы.

1. `<КОНФИГУРАЦИЯ>.json` файлына қажетті өзгерістерді енгізіңіз. Қажет болса, {linkto(../../../concepts/access/bucket-policy#s3-concepts-bucket-policy-config)[text=конфигурацияның]} басқа параметрлерін орнатыңыз.
1. Жаңа конфигурацияны орнатыңыз:

   ```shell
   aws s3api put-bucket-policy \
     --bucket <ИМЯ_БАКЕТА> \
     --policy=file://<КОНФИГУРАЦИЯ>.json
     --endpoint <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қолжетімділік саясатының конфигурациясын орнату қажет бакеттің атауы.
   - `<КОНФИГУРАЦИЯ>` — JSON форматындағы қолжетімділік саясаты конфигурациясы файлының атауы.
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.

## {heading(Қолжетімділік саясаты конфигурациясын жою)[id=s3-instructions-bucket-policy-delete]}

1. Егер әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз.
1. Конфигурацияны келесі команда арқылы жойыңыз:

   ```shell
   aws s3api delete-bucket-policy \
     --bucket <ИМЯ_БАКЕТА> \
     --endpoint <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қолжетімділік саясатының конфигурациясын жою қажет бакеттің атауы.
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
