{include(/kz/_includes/_translated_by_ai.md)}

VK Object Storage бакеттегі объектілердің [өмірлік циклін](/kz/storage/s3/concepts/lifecycle) (lifecycle) баптауға мүмкіндік береді. Өмірлік цикл — берілген ережелер бойынша объектілерді бакеттен автоматты түрде жою.

## Өмірлік цикл ережелері конфигурациясын қарау

{tabs}

{tab(Жеке кабинет)}

{include(/kz/_includes/_s3-open-bucket.md)}

1. **Lifecycle** қойындысына өтіңіз.
{/tab}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](/kz/storage/s3/connect/s3-cli) орнатып, баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api get-bucket-lifecycle-configuration --bucket <ИМЯ_БАКЕТА> --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — ережелер конфигурациясын алу қажет бакет атауы.
   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

{/tab}

{tab(API)}

`GET /lifecycle` [сервистің REST API әдісін](/kz/tools-for-using-services/api/api-spec/s3-rest-api/lifecycle-api) пайдаланыңыз.

{/tab}

{/tabs}

## {heading(Өмірлік цикл ережесін қосу)[id=add_rule]}

{tabs}

{tab(Жеке кабинет)}

{include(/kz/_includes/_s3-open-bucket.md)}

1. **Lifecycle** қойындысына өтіңіз.
1. Егер бакетте ережелер бұрыннан қосылған болса, **Ереже қосу** батырмасын немесе ![plus-icon](/kz/assets/plus-icon.svg "inline") **Жаңа ереже қосу** батырмасын басыңыз.
1. Ереже параметрлерін орнатыңыз:

   - **Ереже атауы**: тек цифрлар, латын әріптері және `-`, `_`, `.` таңбалары рұқсат етіледі. Атау бакет аясында бірегей болуы тиіс.
   - **Объект кілтінің префиксі**: ереже көрсетілген префикстік кілттері бар объектілерге ғана қолданылады. Сүзгі тек бір кілтті қамтуы мүмкін. Префикстік кілттердің мысалдары: `image/`, `pre/`, `image/photo`.
   - **Деректерді көрсетілген күн санынан кейін жою**: объектілер жойылатын күндер санын көрсетіңіз. 
   - **Ережені белсендіру**: егер қосылатын ережені қазір объектілерге қолдану қажет болмаса, опцияны өшіріңіз.

1. **Ереже қосу** батырмасын басыңыз.

{/tab}

{/tabs}

## Өмірлік цикл ережесін өңдеу

{tabs}

{tab(Жеке кабинет)}

{include(/kz/_includes/_s3-open-bucket.md)}

1. **Lifecycle** қойындысына өтіңіз.
1. Өңдеу қажет ереже үшін ![pencil-icon](/kz/assets/pencil-icon.svg "inline") белгішесін басыңыз.
1. Ереженің [параметрлерін](#add_rule) өңдеңіз.
1. **Сақтау** батырмасын басыңыз.

{/tab}

{/tabs}

## Өмірлік цикл ережесін өшіру

Объектілер берілген ереже бойынша жойылмауы үшін оны өшіріңіз:

{tabs}

{tab(Жеке кабинет)}

{include(/kz/_includes/_s3-open-bucket.md)}

1. **Lifecycle** қойындысына өтіңіз.
1. Оң жақтан қажетті ережені өшіріңіз.

{/tab}

{/tabs}

## Өмірлік цикл ережесін жою

{tabs}

{tab(Жеке кабинет)}

{include(/kz/_includes/_s3-open-bucket.md)}

1. **Lifecycle** қойындысына өтіңіз.
1. Жою қажет ереже үшін ![trash-icon](/kz/assets/trash-icon.svg "inline") белгішесін басыңыз.
1. Жоюды растаңыз.

{/tab}

{/tabs}

## Өмірлік цикл ережелері конфигурациясын орнату

{tabs}

{tab(AWS CLI)}

{note:warn}
Жаңа ережелер конфигурациясын қосу ағымдағы конфигурацияны, соның ішінде жеке кабинетте орнатылған ережелерді де жояды.
{/note}

1. Егер әлі орнатылмаған болса, [AWS CLI](/kz/storage/s3/connect/s3-cli) орнатып, баптаңыз.
1. [Өмірлік цикл ережелері конфигурациясы](/kz/storage/s3/concepts/lifecycle#lifecycle_config) бар JSON пішіміндегі файлды дайындаңыз.
1. Консольді ашып, команданы орындаңыз:

   ```console
   aws s3api put-bucket-lifecycle-configuration --bucket <ИМЯ_БАКЕТА> --lifecycle-configuration file://<ИМЯ_ФАЙЛА>.json --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

    - `<ИМЯ_БАКЕТА>` — ережелер конфигурациясын қосу қажет бакет атауы.
    - `<ИМЯ_ФАЙЛА>` — өмірлік цикл ережелері конфигурациясы бар файл атауы.
    - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

{/tab}

{tab(API)}

`PUT /lifecycle` [сервистің REST API әдісін](/kz/tools-for-using-services/api/api-spec/s3-rest-api/lifecycle-api) пайдаланыңыз.

{/tab}

{/tabs}

## Өмірлік цикл ережелері конфигурациясын жою

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](/kz/storage/s3/connect/s3-cli) орнатып, баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api delete-bucket-lifecycle --bucket <ИМЯ_БАКЕТА> --endpoint-url <URL_СЕРВИСА>
   ```
   
   Мұнда:

    - `<ИМЯ_БАКЕТА>` — ережелер конфигурациясын жою қажет бакет атауы.
    - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

{/tab}

{tab(API)}

`DELETE /lifecycle` [сервистің REST API әдісін](/kz/tools-for-using-services/api/api-spec/s3-rest-api/lifecycle-api) пайдаланыңыз.

{/tab}

{/tabs}