# {heading(Кросс-домендік сұраныстар)[id=s3-instructions-cors]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(s3)} кросс-домендік сұраныстар технологиясын ({linkto(../../../concepts/access/s3-cors#s3-concepts-cors)[text=CORS]}) қолдайды.

Жеке кабинетте әрбір ережені бөлек орнатуға болады, ал {linkto(../../../api/cors#s3-api-cors)[text=API]} көмегімен — CORS ережелерінің конфигурациясын баптауға болады. Ережелер конфигурациясын баптау дегеніміз — бакет үшін барлық CORS ережелері бір сұраныста XML форматында {var(s3)}-ға беріледі.

## {heading(CORS ережелері конфигурациясын қарау)[id=s3-instructions-cors-view]}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет үшін ![more-icon](../../../assets/more-icon.svg "inline") түймесін басып, **Баптаулар** тармағын таңдаңыз.
1. **CORS** қойындысына өтіңіз.

{/tab}

{tab(API)}

`GET /?cors` әдісін {linkto(../../../api/cors#api-spec-s3-get-bucket-cors)[text=REST API сервисі]} арқылы қолданыңыз.

{/tab}

{/tabs}

## {heading(CORS ережелерін қосу)[id=s3-instructions-cors-add]}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет үшін ![more-icon](../../../assets/more-icon.svg "inline") түймесін басып, **Баптаулар** тармағын таңдаңыз.
1. **CORS** қойындысына өтіңіз.
1. **Ереже қосу** түймесін немесе бакетте CORS ережелері бұрыннан қосылған болса, ![plus-icon](../../../assets/plus-icon.svg "inline") **Жаңа ереже қосу** түймесін басыңыз.

{include(../../../_includes/_cors.md)}

1. **Ереже қосу** түймесін басыңыз.

{/tab}

{tab(API)}

{note:warn}
Ережелердің жаңа конфигурациясын қосу ағымдағы конфигурацияны, соның ішінде жеке кабинетте орнатылған ережелерді, жояды.
{/note}

`PUT /?cors` әдісін {linkto(../../../api/cors#api-spec-s3-put-bucket-cors)[text=REST API сервисі]} арқылы қолданыңыз.

{/tab}

{/tabs}

## {heading(CORS ережелерін өңдеу)[id=s3-instructions-cors-edit]}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет үшін ![more-icon](../../../assets/more-icon.svg "inline") түймесін басып, **Баптаулар** тармағын таңдаңыз.
1. **CORS** қойындысына өтіңіз.
1. Ережені өңдеу үшін ![pencil-icon](../../../assets/pencil-icon.svg "inline") белгісін басыңыз.

{include(../../../_includes/_cors.md)}

1. **Сақтау** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(CORS ережелерін жою)[id=s3-instructions-cors-delete]}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет үшін ![more-icon](../../../assets/more-icon.svg "inline") түймесін басып, **Баптаулар** тармағын таңдаңыз.
1. **CORS** қойындысына өтіңіз.
1. Ережені жою үшін ![trash-icon](../../../assets/trash-icon.svg "inline") белгісін басыңыз.
1. Жоюды растаңыз.

{/tab}

{tab(API)}

{note:warn}
Операция CORS ережелерінің ағымдағы конфигурациясын толық жояды, соның ішінде жеке кабинетте орнатылған ережелерді де.
{/note}

`DELETE /?cors` әдісін {linkto(../../../api/cors#api-spec-s3-delete-bucket-cors)[text=REST API сервисі]} арқылы қолданыңыз.

{/tab}

{/tabs}