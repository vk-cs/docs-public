{includetag(s3_create_cdn_all)}

{tabs}

{tab(Жеке кабинет)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).
{/includetag}
{includetag(s3_create_cdn_s3)}
1. Қажетті бакет орналасқан жобаны таңдаңыз. Егер сізде әлі бакет болмаса, {linkto(../../../../../storage/s3/instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=оны жасаңыз]}.
{/includetag}
{includetag(s3_create_cdn_net)}
1. Қажетті бакет орналасқан жобаны таңдаңыз. Егер сізде әлі бакет болмаса, {linkto(../../../../storage/s3/instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=оны жасаңыз]}.
{/includetag}
{includetag(s3_create_cdn_all)}
1. **Объектілік қойма** → **Бакеттер** бөліміне өтіңіз.
1. Бакет баптауларына келесі тәсілдердің бірімен өтіңіз:
{/includetag}

{includetag(s3_create_cdn_s3)}
   - Қажетті бакет үшін ![ ](../../../../../assets/more-icon.svg "inline") түймесін басып, **Баптаулар** тармағын таңдаңыз.
   - Қажетті бакеттің атауын басыңыз, содан кейін бакет бетінде ![ ](../../../../../assets/settings-icon.svg "inline") түймесін басыңыз.
{/includetag}

{includetag(s3_create_cdn_net)}
   - Қажетті бакет үшін ![ ](../../../../assets/more-icon.svg "inline") түймесін басып, **Баптаулар** тармағын таңдаңыз.
   - Қажетті бакеттің атауын басыңыз, содан кейін бакет бетінде ![ ](../../../../assets/settings-icon.svg "inline") түймесін басыңыз.
{/includetag}

{includetag(s3_create_cdn_all)}
1. **CDN** қойындысына өтіңіз.
1. **Осы бакет үшін CDN пайдалану** опциясын таңдаңыз.
{/includetag}

{includetag(s3_create_cdn_s3)}
   Бакет CDN-ресурс үшін дереккөз (origin) ретінде әрекет ете алуы үшін, осы бакетке {linkto(../../../../../storage/s3/instructions/objects/upload-object#s3-instructions-upload-object)[text=объектілерді қосу]} кезінде ACL `public-read` таңдаңыз.
{/includetag}

{includetag(s3_create_cdn_net)}
   Бакет CDN-ресурс үшін дереккөз (origin) ретінде әрекет ете алуы үшін, осы бакетке {linkto(../../../../storage/s3/instructions/objects/upload-object#s3-instructions-upload-object)[text=объектілерді қосу]} кезінде ACL `public-read` таңдаңыз.
{/includetag}

{includetag(s3_create_cdn_all)}
1. Бір немесе бірнеше персонал доменді баптаңыз.

   1. CDN үшін пайдаланылатын домендерді көрсетіңіз. Осы домендер арқылы контент сұралғанда, контент CDN көмегімен жеткізіледі.

      **Персонал домен** өрісінде бір доменді көрсетуге болады. Доменнің толық біліктелген атауын (FQDN) пайдаланыңыз. Оған түбірлік домен атауын қоспаңыз: `cdn.example.com` түріндегі жазба рұқсат етіледі, бірақ `cdn.example.com.` емес.
{/includetag}

{includetag(s3_create_cdn_s3)}
      Бірнеше доменді көрсету үшін ![plus-icon](../../../../../assets/plus-icon.svg "inline") **Домен қосу** түймесін басыңыз. Қажет емес домендерді олардың жанындағы ![trash-icon](../../../../../assets/trash-icon.svg "inline") белгішесін басу арқылы жоюға болады.
{/includetag}

{includetag(s3_create_cdn_net)}
      Бірнеше доменді көрсету үшін ![plus-icon](../../../../assets/plus-icon.svg "inline") **Домен қосу** түймесін басыңыз. Қажет емес домендерді олардың жанындағы ![trash-icon](../../../../assets/trash-icon.svg "inline") белгішесін басу арқылы жоюға болады.
{/includetag}

{includetag(s3_create_cdn_all)}

      {note:warn}
      CDN-ресурс жасалғаннан кейін бұл персонал домендерді өзгерту мүмкін болмайды.
      {/note}

   1. Көрсетілген домендер үшін CNAME жазбасында көрсету қажет қызметтік домен атауын сақтаңыз.

      Осы ақпарат бар кеңес төменде келтірілген.

   1. Әрбір персонал домен үшін DNS-аймақ баптауларында CNAME жазбасын қосыңыз. Қызметтік домен атауын псевдоним ретінде пайдаланыңыз.
{/includetag}

{includetag(s3_create_cdn_s3)}
      Егер сіз {var(cloud)} DNS сервисін пайдалансаңыз, {linkto(../../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=нұсқаулықты]} орындаңыз.
{/includetag}

{includetag(s3_create_cdn_net)}
      Егер сіз {var(cloud)} DNS сервисін пайдалансаңыз, {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=нұсқаулықты]} орындаңыз.
{/includetag}

{includetag(s3_create_cdn_all)}
      CNAME жазбаларын CDN-ресурс жасалғаннан кейін де қосуға болады.

1. Ашылмалы тізімнен кэштің қажетті өмір сүру уақытын таңдаңыз.

   Бұл параметр келесі HTTP статустары бар жауаптарды берілген уақыт ішінде кэштеуге мүмкіндік береді: [200](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200), [201](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201), [204](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204), [206](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206), [301](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301), [302](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302), [303](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303), [304](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304), [307](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307), [308](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308).

   Басқа статустары бар жауаптар кэштелмейді.

   (Міндетті емес) **Кэшлемеу** тармағын таңдау арқылы кэштеуді толық өшіруге болады.

1. **Өзгерістерді сақтау** түймесін басыңыз.
1. Бакет үшін дереккөздер тобы мен CDN-ресурс жасалғанын күтіңіз. Жасалған объектілер жеке кабинеттегі **CDN** бөлімінде қолжетімді болады.
{/includetag}
{includetag(s3_create_cdn_s3)}
1. Host тақырыбын `<ИМЯ_БАКЕТА>.<ДОМЕН_СЕРВИСА>` форматында {linkto(../../../../../networks/cdn/instructions/manage-cdn/origin-settings#cdn-origin-settings-host-header)[text=орнатыңыз]}.
{/includetag}
{includetag(s3_create_cdn_net)}
1. Host тақырыбын `<ИМЯ_БАКЕТА>.<ДОМЕН_СЕРВИСА>` форматында {linkto(../../../../networks/cdn/instructions/manage-cdn/origin-settings#cdn-origin-settings-host-header)[text=орнатыңыз]}.
{/includetag}
{includetag(s3_create_cdn_all)}

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қажетті контенті бар VK Object Storage бакетінің атауы.
{/includetag}
{includetag(s3_create_cdn_s3)}
   - `<ДОМЕН_СЕРВИСА>` — VK Object Storage сервисінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:
{/includetag}
{includetag(s3_create_cdn_net)}
   - `<ДОМЕН_СЕРВИСА>` — VK Object Storage сервисінің домені, аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:
{/includetag}
{includetag(s3_create_cdn_all)}
     - `hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

{/tab}

{/tabs}

{/includetag}
