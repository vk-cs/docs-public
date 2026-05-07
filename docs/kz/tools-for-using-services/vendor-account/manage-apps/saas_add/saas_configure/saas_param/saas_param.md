# {heading(Сервис параметрлері)[id=saas_param]}

{include(/kz/_includes/_translated_by_ai.md)}

JSON-файлда {linkto(#tab_params)[text=%number кестесінде]} келтірілген сервис параметрлерін көрсетіңіз.

{caption(Кесте {counter(table)[id=numb_tab_params]} — Сервис параметрлері)[align=right;position=above;id=tab_params;number={const(numb_tab_params)}]}
[cols="2,4,1,1", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті

|id
|
UUID4 генераторының көмегімен жасалған UUID4 сервис идентификаторы (ID)
|string (UUID4)
| ![](/kz/assets/check.svg "inline")

|revision
|
Сервис ревизиясы. Сервис ревизиясы мен ID тіркесімі оның дүкендегі бірегейлігін анықтайды. Қалған параметрлер сервис ревизиясының нақты сипаттамаларын сипаттайды
|string, 255 таңбаға дейін
| ![](/kz/assets/check.svg "inline")

|name
|
Сервис атауы
|string, 255 таңбаға дейін
| ![](/kz/assets/check.svg "inline")

|short_description
|
Дүкендегі сервис картасында көрсетілетін сервистің қысқаша сипаттамасы
|string, 120 таңбаға дейін
| ![](/kz/assets/check.svg "inline")

|full_description
|
Оның бетінде көрсетілетін сервистің толық сипаттамасы (толығырақ {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/service_description#service_description_full)[text=%text]} бөлімінде)
|string
| ![](/kz/assets/check.svg "inline")

|singleton
|
Бұлттық платформадағы бір жобаға бір сервис инстансы шектеуі бар-жоғын анықтайды
|boolean
| ![](/en/assets/no.svg "inline")

|auto_bind
|
Сервисті өрістеткеннен кейін сервистік байланысты автоматты түрде жасау керек пе, соны анықтайды
|boolean
| ![](/en/assets/no.svg "inline")

|icon
|
Сервис белгішесінің URL мекенжайы (толығырақ {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/service_description#service_description_icon)[text=%text]} бөлімінде).

Белгіше файлының өлшемі 1 МБ-тан аспауы керек. Кескін өлшемі кемінде 62×62 пиксель болуы тиіс
|string, 512 таңбаға дейін
| ![](/kz/assets/check.svg "inline")

|help
|
Сервис құжаттамасының URL мекенжайы
|string, 512 таңбаға дейін
| ![](/kz/assets/check.svg "inline")

|bindable
|
Осы сервис үшін сервистік байланыстарды жасауға бола ма, соны анықтайды
|boolean
| ![](/kz/assets/check.svg "inline")

|plan_updateable
|
Пайдаланушы сервисті жоймай-ақ бір тарифтік жоспардан екіншісіне өте ала ма, соны анықтайды.

Параметр мәні сервистің барлық жоспарларына қолданылады.

Мәнді нақты жоспар үшін қайта анықтауға болады (толығырақ — {linkto(../saas_plan#saas_plan_param)[text=%text]} бөлімінде)
|boolean
| ![](/kz/assets/check.svg "inline")

|deactivatable
|
Сервисті пайдалануды уақытша тоқтатуға бола ма, соны анықтайды
|boolean
| ![](/kz/assets/check.svg "inline")

|bindings_retrievable
|
Алдыңғы әрекет сәтсіз болса, белгілі бір уақыт ішінде сервистік байланысты жасау әрекетін қайталау керек пе, соны анықтайды
|boolean
| ![](/kz/assets/check.svg "inline")

|instances_retrievable
|
Алдыңғы әрекет сәтсіз болса, белгілі бір уақыт ішінде сервис инстансын жасау әрекетін қайталау керек пе, соны анықтайды
|boolean
| ![](/kz/assets/check.svg "inline")

|metadata
|
Сервис тарифтік жоспарлары қолжетімді болатын дүкеннің тестілік және ашық атаулар кеңістіктерін анықтайды.

Тестілік атаулар кеңістіктері `test_ns` кілтінде беріледі.

Ашық атаулар кеңістіктері `prod_ns` кілтінде беріледі.

Атаулар кеңістіктерінің атауларын алу үшін [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com) мекенжайына хат жіберіңіз.

Мәнді нақты тарифтік жоспар үшін қайта анықтауға болады.

Егер параметр берілмесе, `plans` секциясында әрбір тарифтік жоспар үшін дәл осы аттас параметрді бөлек көрсетіңіз (толығырақ — {linkto(../saas_plan#saas_plan_param)[text=%text]} бөлімінде).

{note:warn}

Егер `metadata` сервис параметрлерінде де, тарифтік жоспар параметрлерінде де берілмесе, мұндай жоспар дүкенде көрсетілмейді.

{/note}
|map, кілттер — string
| ![](/en/assets/no.svg "inline")
|===
{/caption}

{note:err}

Сервис ID мен ревизиясының тіркесімі дүкен шегінде бірегей болуы керек. Егер дүкенде дәл осындай идентификаторы мен ревизиясы бар сервис бұрыннан бар болса, сервис конфигурациясы жаңартылмайды.

{/note}
