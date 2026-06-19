# {heading(SSL-сертификатты пайдалану)[id=cdn-ssl]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:info}
SSL-сертификаттарды басқару {linkto(../../../../../networks/cdn/instructions/manage-certificates#cdn-manage-certificates)[text=тиісті бөлімде]} толығырақ сипатталған.
{/note}

{tabs}

{tab(Жеке кабинет)}

{include(../../../../../_includes/_open-cdn.md)}

1. **Основные настройки** қойындысына өтіңіз.
1. **SSL-сертификат** параметрінде SSL-сертификатты пайдалануға жауап беретін опцияны таңдаңыз:

    - **Не использовать** — сертификат пайдаланылмайды: дербес домендерге тек HTTP арқылы ғана жүгінуге болады.
    - **(По умолчанию) Let's Encrypt** — тегін [Let's Encrypt](https://letsencrypt.org/kz/) сертификаты пайдаланылады. Сертификат CDN-ресурсы жасалғаннан кейін, бастапқы серверлер қолжетімді болып, DNS-та дербес домендер үшін CNAME-жазбаларына қатысты өзгерістер таралған кезде жасалады. Әдетте бұл 30 минутқа дейін созылады. Бұл опцияны таңдағанда {linkto(../../../../../networks/cdn/instructions/caching/enable-cdn#cdn-enable-cdn)[text=Доступ к контенту конечным пользователям]} опциясын да қосу қажет.
    - **Свой сертификат** — ашылмалы тізімнен таңдалған сертификат пайдаланылады. Сертификат таңдауға қолжетімді болуы үшін, оны {linkto(../../../../../networks/cdn/instructions/manage-certificates#cdn-manage-certificates)[text=сертификаттар қоймасына қосыңыз]}.
1. **Сохранить изменения** батырмасын басыңыз.

{/tab}

{tab(API)}

{include(../../../../../_includes/_api_cdn_create_change.md)}

Сұрау денесінде мына параметрлерді жазыңыз:

- SSL-сертификатты пайдаланбау және дербес домендерге тек HTTP арқылы жүгіну үшін `"sslEnabled": false` параметрін көрсетіңіз.
- Тегін [Let's Encrypt](https://letsencrypt.org/kz/) сертификатын пайдалану үшін `"sslEnabled": true` параметрін көрсетіп, сертификатты жаңарту параметрлерін орнатыңыз:

  - `"ssl_automated": true` — Let’s Encrypt сертификатының қолданылу мерзімі аяқталғаннан кейін ол автоматты түрде жаңартылады;
  - `"ssl_automated": false` — Let’s Encrypt сертификаты автоматты түрде жаңартылмайды.

  Let's Encrypt сертификатын жасау немесе баптау үшін **Сертификаты Let's Encrypt** бөлімінің {linkto(../../../../../tools-for-using-services/api/api-spec/api-cdn#api-spec-cdn)[text=методтарын]} пайдаланыңыз.

- Өз SSL-сертификатыңызды пайдалану үшін `"sslEnabled": true` параметрін көрсетіңіз, сондай-ақ `sslData` параметрінде сертификат идентификаторын жазыңыз. Өз сертификатыңызды жасау немесе баптау үшін **SSL-Сертификаты** бөлімінің {linkto(../../../../../tools-for-using-services/api/api-spec/api-cdn#api-spec-cdn)[text=методтарын]} пайдаланыңыз.

Өз SSL-сертификатыңызды пайдалану үшін сұрау мысалы:

```json
curl --location --request PUT 'https://kz.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "sslEnabled": true,
    "sslData": 42,
}'
```

{/tab}

{/tabs}
