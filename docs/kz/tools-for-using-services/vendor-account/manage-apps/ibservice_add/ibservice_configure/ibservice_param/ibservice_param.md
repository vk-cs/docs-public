# {heading(service.yaml файлы)[id=ibservice_param]}

{include(/kz/_includes/_translated_by_ai.md)}

`service.yaml` файлында {linkto(#tab_ibservice_param)[text=%number кестесінде]} келтірілген параметрлер мен секцияларды көрсетіңіз.

{caption(Кесте {counter(table)[id=numb_tab_ibservice_param]} — service.yaml файлындағы параметрлер мен секциялар)[align=right;position=above;id=tab_ibservice_param;number={const(numb_tab_ibservice_param)}]}
[cols="2,4,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Форматы
|Міндетті

|id
|
UUID4 генераторының көмегімен қалыптастырылған UUID4 (ID) сервис идентификаторы
|string (UUID4)
| ![](/kz/assets/check.svg "inline")

|revision
|
Сервис ревизиясы. Сервис ревизиясы мен ID комбинациясы оның дүкендегі бірегейлігін анықтайды. Қалған параметрлер сервис ревизиясының нақты сипаттамаларын сипаттайды
|string, 255 таңбаға дейін
| ![](/kz/assets/check.svg "inline")

|name
|
Сервис атауы
|string, 255 таңбаға дейін
| ![](/kz/assets/check.svg "inline")

|short_description
|
Дүкендегі оның карточкасында көрсетілетін сервистің қысқаша сипаттамасы.

Сервистің толық сипаттамасы `full_description.md` файлында толтырылады
|string, 120 таңбаға дейін
| ![](/kz/assets/check.svg "inline")

|singleton
|
Бір бұлттық платформа жобасына бір сервис инстансы шектеуі бар-жоғын анықтайды
|boolean
| ![](/en/assets/no.svg "inline")

|auto_bind
|
Сервисті жайғастырғаннан кейін сервистік байланысты автоматты түрде жасау қажет пе, соны анықтайды
|boolean
| ![](/en/assets/no.svg "inline")

|icon
|
Сервис белгішесінің кескіні бар файлды анықтайды. `images` директориясындағы файлдың атауын көрсетіңіз
|string, 512 таңбаға дейін
| ![](/kz/assets/check.svg "inline")

|help
|
Сервис құжаттамасының URL мекенжайы
|string, 512 таңбаға дейін
| ![](/kz/assets/check.svg "inline")

|bindable
|
Осы сервис үшін сервистік байланыстарды жасауға болатынын анықтайды. Мәні `true` болуы керек
|boolean
| ![](/kz/assets/check.svg "inline")

|plan_updateable
|
Пайдаланушы сервисті жоймай, бір тарифтік жоспардан екіншісіне өте алатынын анықтайды.

Параметр мәні сервистің барлық жоспарлары үшін қолданылады.

Image-based қолданбалар үшін мәні `false` болуы керек
|boolean
| ![](/kz/assets/check.svg "inline")

|deactivatable
|
Сервисті пайдалануды уақытша тоқтатуға болатынын анықтайды
|boolean
| ![](/kz/assets/check.svg "inline")

|bindings_retrievable
|
Алдыңғы әрекет сәтсіз болса, белгілі бір уақыт бойы сервистік байланысты жасау әрекетін қайталау қажет пе, соны анықтайды
|boolean
| ![](/kz/assets/check.svg "inline")

|instances_retrievable
|
Алдыңғы әрекет сәтсіз болса, белгілі бір уақыт бойы сервис инстансын жасау әрекетін қайталау қажет пе, соны анықтайды
|boolean
| ![](/kz/assets/check.svg "inline")

|plans
|
Сервистің тарифтік жоспарларын анықтайды (толығырақ — {linkto(#service_plans)[text=%text]} бөлімінде)
|Массив
| ![](/kz/assets/check.svg "inline")

|preview
|
Тарифтік жоспарлар матрицасына арналған тарифтік опцияларды анықтайды (толығырақ — {linkto(#service_options_for_matrix)[text=%text]} бөлімінде)
|Массив
| ![](/kz/assets/check.svg "inline")
|===
{/caption}

{note:err}

Сервис ID-і мен ревизиясының комбинациясы дүкен аясында бірегей болуы керек. Егер дүкенде дәл сондай идентификаторы мен ревизиясы бар сервис бұрыннан бар болса, сервистік пакет жаңартылмайды.

{/note}

`plans` және `preview` секцияларында көрсетілген тарифтік жоспарлар мен опциялар негізінде тарифтік жоспарлар матрицасы қалыптастырылады (толығырақ — {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_tariff_matrix)[text=%text]} бөлімінде).

`service.yaml` файлының мысалы {linkto(#ibexample_service)[text=%text]} қосымшасында келтірілген.

## {heading(Сервистің тарифтік жоспарлары)[id=service_plans]}

Сервистің барлық тарифтік жоспарларын көрсету үшін:

1. `plans` массивін көрсетіңіз.
1. Массив ішінде `<PLAN_NAME>` тарифтік жоспарларының атауларын `name` кілттерінде тізіп шығыңыз. Тарифтік жоспарлардың атаулары осы жоспарлардың директория атауларына сәйкес болуы керек.

   {note:warn}

   Пайдаланушыға тек `plans` массивінде көрсетілген тарифтік жоспарлар ғана қолжетімді болады.

   {/note}

{caption(Сервистің тарифтік жоспарларын тізімдеу)[align=left;position=above]}
```yaml
plans:
    - name: <PLAN_NAME1>
    - name: <PLAN_NAME2>
```
{/caption}

## {heading(Тарифтік жоспарлар матрицасына арналған тарифтік опциялар)[id=service_options_for_matrix]}

Тарифтік жоспарлар матрицасына арналған тарифтік опцияларды көрсету үшін (`parameters` директориясында сипатталған барлық мүмкін опциялар ішінен):

1. Ішінде `preview` массиві бар `parameters` секциясын көрсетіңіз.
1. Массив ішінде `<OPTION_NAME>` тарифтік опцияларының атауларын `name` кілттерінің көмегімен тізіп шығыңыз. Тарифтік опция атаулары `parameters/<OPTION_NAME>.yaml` YAML-файлдарының атауларына сәйкес болуы керек.

   Массив бос болуы мүмкін.

   Матрицада опциялар YAML-файлдарында берілген атаулармен көрсетіледі.

{caption(Сервистің тарифтік опцияларын тізімдеу)[align=left;position=above]}
```yaml
preview:
    parameters:
    - name: <OPTION_NAME1>
    - name: <OPTION_NAME2>
```
{/caption}

## {heading(service.yaml мысалы файлы)[id=ibexample_service]}

```yaml
id: 72b70199-1823-40c8-aa7e-f43a23ddf380
revision: v. 1.0
name: VK Testers
short_description: Программа крауд-тестирования с многотысячным коммьюнити бета-тестировщиков и собственной платформой для работы с данными
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
