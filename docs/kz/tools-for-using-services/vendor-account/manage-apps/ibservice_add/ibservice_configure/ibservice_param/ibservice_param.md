# {heading(service.yaml файлы)[id=ibservice_param]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

`service.yaml` файлінде {linkto(#tab_ibservice_param)[text=%number кестеде]} келтірілген параметрлер мен секцияларды көрсетіңіз.

{caption({counter(table)[id=numb_tab_ibservice_param]}-кесте — service.yaml файлындағы параметрлер мен секциялар)[align=right;position=above;id=tab_ibservice_param;number={const(numb_tab_ibservice_param)}]}
[cols="2,4,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті

|id
|
UUID4 генераторымен жасалған қызметтің UUID4 идентификаторы (ID)
|string (UUID4)
| ![](../../../../../../assets/check.svg "inline")

|revision
|
Қызметтің ревизиясы. Ревизия мен қызметтің ID комбинациясы оның дүкендегі бірегейлігін анықтайды. Қалған параметрлер қызметтің нақты ревизиясының сипаттамаларын білдіреді
|string, 255 таңбаға дейін
| ![](../../../../../../assets/check.svg "inline")

|name
|
Қызметтің атауы
|string, 255 таңбаға дейін
| ![](../../../../../../assets/check.svg "inline")

|short_description
|
Дүкендегі қызмет карточкасында көрсетілетін қызметтің қысқаша сипаттамасы.

Қызметтің толық сипаттамасы `full_description.md` файлында толтырылады
|string, 120 таңбаға дейін
| ![](../../../../../../assets/check.svg "inline")

|singleton
|
Бұлтты платформаның бір жобасына қызметтің бір инстансына шектеу бар-жоғын анықтайды
|boolean
| ![](../../../../../../assets/no.svg "inline")

|auto_bind
|
Қызмет орналастырылғаннан кейін қызметтік байланыстыруды автоматты түрде жасау қажет пе екенін анықтайды
|boolean
| ![](../../../../../../assets/no.svg "inline")

|icon
|
Қызмет иконкасының суреті бар файлды анықтайды. `images` директориясында орналасқан файлдың атауын көрсетіңіз
|string, 512 таңбаға дейін
| ![](../../../../../../assets/check.svg "inline")

|help
|
Қызмет құжаттамасының URL мекенжайы
|string, 512 таңбаға дейін
| ![](../../../../../../assets/check.svg "inline")

|bindable
|
Осы қызмет үшін қызметтік байланыстыруларды жасауға болатынын анықтайды. Мәні `true` болуы тиіс
|boolean
| ![](../../../../../../assets/check.svg "inline")

|plan_updateable
|
Пайдаланушы қызметті өшірмей-ақ бір тарифтік жоспардан екіншісіне өте алатынын анықтайды.

Параметрдің мәні қызметтің барлық жоспарына қолданылады.

Image-based қосымшалар үшін мән `false` болуы тиіс
|boolean
| ![](../../../../../../assets/check.svg "inline")

|deactivatable
|
Қызметті пайдалануды уақытша тоқтатуға болатынын анықтайды
|boolean
| ![](../../../../../../assets/check.svg "inline")

|bindings_retrievable
|
Алдыңғы әрекет сәтсіз аяқталған жағдайда, белгілі бір уақыт ішінде қызметтік байланыстыруды жасау әрекетін қайталау қажет пе екенін анықтайды
|boolean
| ![](../../../../../../assets/check.svg "inline")

|instances_retrievable
|
Алдыңғы әрекет сәтсіз аяқталған жағдайда, белгілі бір уақыт ішінде қызмет инстансын жасау әрекетін қайталау қажет пе екенін анықтайды
|boolean
| ![](../../../../../../assets/check.svg "inline")

|plans
|
Қызметтің тарифтік жоспарларын анықтайды (көбірек білу — {linkto(#service_plans)[text=%text]} бөлімінде)
|Массив
| ![](../../../../../../assets/check.svg "inline")

|preview
|
Тарифтік жоспарлар матрицасы үшін тарифтік опцияларды анықтайды (көбірек білу — {linkto(#ibservice_param-service_options_for_matrix)[text=%text]} бөлімінде)
|Массив
| ![](../../../../../../assets/check.svg "inline")
|===
{/caption}

{note:err}

Қызметтің ID және ревизия комбинациясы дүкен аясында бірегей болуы тиіс. Егер дүкенде осындай идентификатор мен ревизиясы бар қызмет бұрыннан болса, қызметтік пакет жаңартылмайды.

{/note}

`plans` және `preview` секцияларында көрсетілген тарифтік жоспарлар мен опциялар негізінде тарифтік жоспарлар матрицасы құрылады (көбірек білу — {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_tariff_matrix)[text=%text]} бөлімінде).

`service.yaml` файлының мысалы {linkto(#ibexample_service)[text=%text]} қосымшада келтірілген.

## {heading(Қызметтің тарифтік жоспарлары)[id=service_plans]}

Қызметтің барлық тарифтік жоспарларын көрсету үшін:

1. `plans` массивін көрсетіңіз.
1. Массив ішінде `name` кілттерінде `<PLAN_NAME>` тарифтік жоспарларының атауларын тізіңіз. Тарифтік жоспарлардың атаулары осы жоспарлардың директорияларының атауларына сәйкес болуы тиіс.

   {note:warn}

   Пайдаланушыға `plans` массивінде көрсетілген тарифтік жоспарлар ғана қолжетімді болады.

   {/note}

{caption(Қызметтің тарифтік жоспарларын тізуі)[align=left;position=above]}
```yaml
plans:
    - name: <PLAN_NAME1>
    - name: <PLAN_NAME2>
```
{/caption}

## {heading(Тарифтік жоспарлар матрицасы үшін тарифтік опциялар)[id=ibservice_param-service_options_for_matrix]}

Тарифтік жоспарлар матрицасы үшін тарифтік опцияларды (мүмкін болатын барлық опциялардан, `parameters` директориясында сипатталған) көрсету үшін:

1. Ішінде `parameters` массиві бар `preview` секциясын көрсетіңіз.
1. Массив ішінде `name` кілттері арқылы `<OPTION_NAME>` тарифтік опцияларының атауларын тізіңіз. Тарифтік опциялардың атаулары `parameters/<OPTION_NAME>.yaml` YAML-файлдарының атауларына сәйкес болуы тиіс.

   Массив бос болуы мүмкін.

   Тарифтік жоспарлар матрицасында опциялар YAML-файлдарында берілген атаулармен көрсетіледі.

{caption(Қызметтің тарифтік опцияларын тізуі)[align=left;position=above]}
```yaml
preview:
    parameters:
    - name: <OPTION_NAME1>
    - name: <OPTION_NAME2>
```
{/caption}

## {heading(service.yaml файлының мысалы)[id=ibexample_service]}

```yaml
id: 72b70199-1823-40c8-aa7e-f43a23ddf380
revision: v. 1.0
name: VK Testers
short_description: Бета-тестers tolerant қауымдастығы мен деректермен жұмыс істеуге арналған өз платформасы бар мыңдаған мүшеден тұратын крауд-тестілеу бағдарламасы
singleton: false
auto_bind: true
icon: icon.png
help: http://vk.cc/vktesters_po_faq
bindable: true
plan_updateable: false
deactivatable: false
bindings_retrievable: true
instances_retrievable: true

plans:
- name: free
- name: basic

preview:
  parameters:
  - name: api_requests_daily_limit
  - name: groups
  - name: products
```