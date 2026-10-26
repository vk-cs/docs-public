# {heading(Сервисный файл service.yaml)[id=ibservice_param]}

{include(/en/_includes/_translated_by_ai_en.md)}

В файле `service.yaml` укажите параметры и разделы, показанные в {linkto(#tab_ibservice_param)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_ibservice_param]} — Параметры и разделы в файле service.yaml)[align=right;position=above;id=tab_ibservice_param;number={const(numb_tab_ibservice_param)}]}
[cols="2,4,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательно

|id
|
UUID4 идентификатор сервиса (ID), сгенерированный с помощью генератора UUID4
|string (UUID4)
| ![](../../../../../../assets/check.svg "inline")

|revision
|
Ревизия сервиса. Сочетание ревизии и ID сервиса определяет его уникальность в магазине. Остальные параметры описывают характеристики конкретной ревизии сервиса
|string, до 255 символов
| ![](../../../../../../assets/check.svg "inline")

|name
|
Имя сервиса
|string, до 255 символов
| ![](../../../../../../assets/check.svg "inline")

|short_description
|
Краткое описание сервиса, которое будет отображаться на его карточке в магазине.

Полное описание сервиса предоставляется в файле `full_description.md`
|string, до 120 символов
| ![](../../../../../../assets/check.svg "inline")

|singleton
|
Определяет, есть ли ограничение в один экземпляр сервиса на один проект облачной платформы
|boolean
| ![](../../../../../../assets/no.svg "inline")

|auto_bind
|
Определяет, нужно ли автоматически создавать сервисный биндинг после развертывания сервиса
|boolean
| ![](../../../../../../assets/no.svg "inline")

|icon
|
Определяет файл с изображением для иконки сервиса. Укажите имя файла, находящегося в директории `images`
|string, до 512 символов
| ![](../../../../../../assets/check.svg "inline")

|help
|
URL документации сервиса
|string, до 512 символов
| ![](../../../../../../assets/check.svg "inline")

|bindable
|
Определяет, можно ли создавать сервисные биндинги для этого сервиса. Значение должно быть `true`
|boolean
| ![](../../../../../../assets/check.svg "inline")

|plan_updateable
|
Определяет, может ли пользователь переключаться с одного тарифного плана на другой без удаления сервиса.

Значение параметра применяется ко всем планам сервиса.

Для image-based приложений значение должно быть `false`
|boolean
| ![](../../../../../../assets/check.svg "inline")

|deactivatable
|
Определяет, можно ли временно приостановить использование сервиса
|boolean
| ![](../../../../../../assets/check.svg "inline")

|bindings_retrievable
|
Определяет, следует ли повторять попытку создания сервисного биндинга в течение определенного времени, если предыдущая попытка не удалась
|boolean
| ![](../../../../../../assets/check.svg "inline")

|instances_retrievable
|
Определяет, следует ли повторять попытку создания экземпляра сервиса в течение определенного времени, если предыдущая попытка не удалась
|boolean
| ![](../../../../../../assets/check.svg "inline")

|plans
|
Определяет тарифные планы сервиса (подробнее — в разделе {linkto(#service_plans)[text=%text]})
|Массив
| ![](../../../../../../assets/check.svg "inline")

|preview
|
Определяет тарифные опции для матрицы тарифных планов (подробнее — в разделе {linkto(#ibservice_param-service_options_for_matrix)[text=%text]})
|Массив
| ![](../../../../../../assets/check.svg "inline")
|===
{/caption}

{note:err}

Сочетание ID и ревизии сервиса должно быть уникальным в рамках магазина. Если сервис с таким же идентификатором и ревизией уже существует в магазине, пакет сервиса не будет обновлен.

{/note}

На основе тарифных планов и опций, указанных в разделах `plans` и `preview`, формируется матрица тарифных планов (подробнее — в разделе {linkto(/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_tariff_matrix)[text=%text]}).

Пример файла `service.yaml` приведен в {linkto(#ibexample_service)[text=%text]}.

## {heading(Тарифные планы сервиса)[id=service_plans]}

Чтобы указать все тарифные планы сервиса:

1. Укажите массив `plans`.
1. Внутри массива перечислите имена тарифных планов `<PLAN_NAME>` в ключах `name`. Имена тарифных планов должны соответствовать именам директорий этих планов.

   {note:warn}

   Пользователю будут доступны только тарифные планы, перечисленные в массиве `plans`.

   {/note}

{caption(Перечисление тарифных планов сервиса)[align=left;position=above]}
```yaml
plans:
    - name: <PLAN_NAME1>
    - name: <PLAN_NAME2>
```
{/caption}

## {heading(Тарифные опции для матрицы тарифных планов)[id=ibservice_param-service_options_for_matrix]}

Чтобы указать тарифные опции для матрицы тарифных планов (из всех возможных, описанных в директории `parameters`):

1. Укажите раздел `preview` с массивом `parameters` внутри.
1. Внутри массива перечислите имена тарифных опций `<OPTION_NAME>` с помощью ключей `name`. Имена тарифных опций должны соответствовать именам YAML-файлов `parameters/<OPTION_NAME>.yaml`.

   Массив может быть пустым.

   В матрице тарифных планов опции будут отображаться с именами, заданными в YAML-файлах.

{caption(Перечисление тарифных опций сервиса)[align=left;position=above]}
```yaml
preview:
    parameters:
    - name: <OPTION_NAME1>
    - name: <OPTION_NAME2>
```
{/caption}

## {heading(Пример файла service.yaml)[id=ibexample_service]}

```yaml
id: 72b70199-1823-40c8-aa7e-f43a23ddf380
revision: v. 1.0
name: VK Testers
short_description: Программа крауд-тестирования с сообществом из тысяч бета-тестировщиков и собственной платформой для работы с данными
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