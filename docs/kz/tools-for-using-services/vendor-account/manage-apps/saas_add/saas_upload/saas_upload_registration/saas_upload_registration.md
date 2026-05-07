# {heading(Брокерді тіркеу)[id=saas_upload_registration]}

{include(/kz/_includes/_translated_by_ai.md)}

Брокерді тіркеу үшін [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com) мекенжайына хат жіберіңіз. Хатта мыналарды көрсетіңіз:

* Компания туралы ақпаратты:

   * Компания атауы.
   * Байланыс тұлғасы.
   * Телефон.

* Сервис инстанстарын жасау кезінде қателер туралы хабарламалар келіп тұратын пайдаланушының Email мекенжайы.
* {linkto(#tab_registration)[text=кесте %number]} келтірілген брокер параметрлерін.

{caption(Кесте {counter(table)[id=numb_tab_registration]} — Дүкенде тіркеуге арналған брокер параметрлері)[align=right;position=above;id=tab_registration;number={const(numb_tab_registration)}]}
[cols="2,5,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Пішімі
|Міндетті

|name
|
Брокер атауы
|string
| ![](/kz/assets/check.svg "inline")

|url
|
Дүкеннен сұраулар жіберілетін URL
|string
| ![](/kz/assets/check.svg "inline")

|description
|
Брокер сипаттамасы
|string
| ![](/kz/assets/no.svg "inline")

|osb_version
|
VK OSB протоколының нұсқасы
|string
| ![](/kz/assets/check.svg "inline")

|username
|
Брокермен сервистераралық өзара әрекеттесуге арналған дүкен атауы.

`.env` файлындағы орта айнымалысының мәнімен сәйкес келуі тиіс
|string
| ![](/kz/assets/no.svg "inline")

|password
|
Брокермен сервистераралық өзара әрекеттесуге арналған дүкен құпиясөзі.

`.env` файлындағы орта айнымалысының мәнімен сәйкес келуі тиіс
|string
| ![](/kz/assets/no.svg "inline")
|===
{/caption}

Брокер тіркелгеннен кейін SaaS-қолданба дүкеннің тестілік атау кеңістігінде қолжетімді болады. Дүкеннің ашық атау кеңістігінде сервис тек жарияланғаннан кейін ғана қолжетімді болады (толығырақ — {linkto(../saas_upload_publish#saas_upload_publish)[text=%text]} бөлімінде).
