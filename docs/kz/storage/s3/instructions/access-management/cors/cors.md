{include(/kz/_includes/_translated_by_ai.md)}

VK Object Storage доменаралық сұраулар технологиясын ([CORS](../../../concepts/access/s3-cors)) қолдайды.

Жеке кабинетте әр ережені бөлек көрсетуге болады, ал [API](/kz/tools-for-using-services/api/api-spec/s3-rest-api/cors-api) арқылы CORS ережелерінің конфигурациясын баптауға болады. Конфигурацияны баптау дегеніміз — бакет үшін барлық CORS ережелері VK Object Storage-ке бір сұрауда XML пішімінде жіберіледі.

## CORS ережелері конфигурациясын қарау

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Объектілік сақтау қоймасы → Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет үшін ![more-icon](/kz/assets/more-icon.svg "inline") батырмасын басып, **Баптаулар** тармағын таңдаңыз.
1. **CORS** қойындысына өтіңіз.

{/tab}

{tab(API)}

`GET /?cors` [сервистің REST API әдісін](/kz/tools-for-using-services/api/api-spec/s3-rest-api/cors-api#get_bucket_cors) пайдаланыңыз.

{/tab}

{/tabs}

## {heading(CORS ережесін қосу)[id=add_rule_cors]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Объектілік сақтау қоймасы → Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет үшін ![more-icon](/kz/assets/more-icon.svg "inline") батырмасын басып, **Баптаулар** тармағын таңдаңыз.
1. **CORS** қойындысына өтіңіз.
1. Егер бакетте CORS ережелері бұрыннан бар болса, **Ереже қосу** батырмасын немесе ![plus-icon](/kz/assets/plus-icon.svg "inline") **Жаңа ереже қосу** батырмасын басыңыз.

{include(/kz/_includes/_cors.md)}

1. **Ереже қосу** батырмасын басыңыз.

{/tab}

{/tabs}

## CORS ережесін өңдеу

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Объектілік сақтау қоймасы → Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет үшін ![more-icon](/kz/assets/more-icon.svg "inline") батырмасын басып, **Баптаулар** тармағын таңдаңыз.
1. **CORS** қойындысына өтіңіз.
1. Ережені өңдеу үшін ![pencil-icon](/kz/assets/pencil-icon.svg "inline") белгішесін басыңыз.
{include(/kz/_includes/_cors.md)}
1. **Сақтау** батырмасын басыңыз.

{/tab}

{/tabs}

## CORS ережесін жою

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Объектілік сақтау қоймасы → Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет үшін ![more-icon](/kz/assets/more-icon.svg "inline") батырмасын басып, **Баптаулар** тармағын таңдаңыз.
1. **CORS** қойындысына өтіңіз.
1. Ережені жою үшін ![trash-icon](/kz/assets/trash-icon.svg "inline") белгішесін басыңыз.
1. Жоюды растаңыз.

{/tab}

{/tabs}

## CORS ережелері конфигурациясын орнату

{note:warn}Жаңа ережелер конфигурациясын қосу ағымдағы конфигурацияны, соның ішінде жеке кабинетте орнатылған ережелерді де жояды.{/note}

{tabs}

{tab(API)}

`PUT /?cors` [сервистің REST API әдісін](/kz/tools-for-using-services/api/api-spec/s3-rest-api/cors-api#set_bucket_cors) пайдаланыңыз.

{/tab}

{/tabs}

## CORS ережелері конфигурациясын жою

{note:warn}Бұл операция ағымдағы CORS ережелері конфигурациясын, соның ішінде жеке кабинетте орнатылған ережелерді толық жояды.{/note}

{tabs}

{tab(API)}

`DELETE /?cors` [сервистің REST API әдісін](/kz/tools-for-using-services/api/api-spec/s3-rest-api/cors-api#delete_bucket_cors) пайдаланыңыз.

{/tab}

{/tabs}
