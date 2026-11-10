# {heading(Брокерді тіркеу)[id=saas_upload_registration]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Брокерді тіркеу үшін [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com) мекенжайына хат жіберіңіз. Хатта көрсетіңіз:

* Компания туралы ақпарат:

   * Компанияның атауы.
   * Байланыс жауапты адамы.
   * Телефон.

* Сервистің инстанстарын жасау кезінде қателік туралы хабарламалар келетін пайдаланушының Email мекенжайы.
* {linkto(#tab_registration)[text=%number кестеде]} келтірілген брокер параметрлері.

{caption(Кесте {counter(table)[id=numb_tab_registration]} — Дүкенде тіркеуге арналған брокер параметрлері)[align=right;position=above;id=tab_registration;number={const(numb_tab_registration)}]}
[cols="2,5,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті

|name
|
Брокердің атауы
|string
| ![](../../../../../../assets/check.svg "inline")

|url
|
Дүкеннен сұраулар жіберілетін URL
|string
| ![](../../../../../../assets/check.svg "inline")

|description
|
Брокердің сипаттамасы
|string
| ![](../../../../../../assets/no.svg "inline")

|osb_version
|
VK OSB хаттамасының нұсқасы
|string
| ![](../../../../../../assets/check.svg "inline")

|username
|
Брокермен сервисаралық өзара іс-қимыл үшін дүкеннің атауы.

`.env` файлындағы орта айнымалысының мәніне сәйкес келуі тиіс
|string
| ![](../../../../../../assets/no.svg "inline")

|password
|
Брокермен сервисаралық өзара іс-қимыл үшін дүкеннің құпиясөзі.

`.env` файлындағы орта айнымалысының мәніне сәйкес келуі тиіс
|string
| ![](../../../../../../assets/no.svg "inline")
|===
{/caption}

Брокер тіркелгеннен кейін SaaS-қосымша дүкеннің тесттік кеңістігінде қолжетімді болады. Дүкеннің ашық кеңістігінде сервис жарияланғаннан кейін ғана қолжетімді болады (көбірек ақпарат — {linkto(../saas_upload_publish#saas_upload_publish)[text=%text]} бөлімінде).