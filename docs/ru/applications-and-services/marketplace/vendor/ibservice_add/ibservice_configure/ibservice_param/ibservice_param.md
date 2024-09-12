# {heading(Файл service.yaml)[id=ibservice_param]}

В файле `service.yaml` укажите параметры и секции, приведенные в {linkto(#tab_ibservice_param)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_ibservice_param]} — Параметры и секции в файле service.yaml)[align=right;position=above;id=tab_ibservice_param;number={const(numb_tab_ibservice_param)}]}
[cols="2,4,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный

|id
|
Идентификатор сервиса UUID4 (ID), сформированный с помощью генератора UUID4
|string (UUID4)
|Да

|revision
|
Ревизия сервиса. Сочетание ревизии и ID сервиса определяет его уникальность в {var(sys6)}. Остальные параметры описывают характеристики конкретной ревизии сервиса
|string, до 255 символов
|Да

|name
|
Имя сервиса
|string, до 255 символов
|Да

|short_description
|
Краткое описание сервиса, которое будет отображаться в его карточке в {var(sys6)}.

Полное описание сервиса заполняется в файле `full_description.md`
|string, до 120 символов
|Да

|singleton
|
Определяет, есть ли ограничение в один инстанс сервиса на один проект облачной платформы
|boolean
|Нет

|auto_bind
|
Определяет, нужно ли после развертывания сервиса автоматически создавать сервисную привязку
|boolean
|Нет

|icon
|
Определяет файл с изображением для иконки сервиса. Укажите имя файла, находящегося в директории `images`
|string, до 512 символов
|Да

|help
|
URL документации сервиса
|string, до 512 символов
|Да

|bindable
|
Определяет, можно ли создавать сервисные привязки для этого сервиса. Значение должно быть `true`
|boolean
|Да

|plan_updateable
|
Определяет, может ли пользователь переходить с одного тарифного плана на другой без удаления сервиса.

Значение параметра применяется для всех планов сервиса.

Для image-based приложений значение должно быть `false`
|boolean
|Да

|deactivatable
|
Определяет, можно ли временно приостановить использование сервиса
|boolean
|Да

|bindings_retrievable
|
Определяет, нужно ли повторять попытку создания сервисной привязки в течение определенного времени, если предыдущая попытка не удалась
|boolean
|Да

|instances_retrievable
|
Определяет, нужно ли повторять попытку создания инстанса сервиса в течение определенного времени, если предыдущая попытка не удалась
|boolean
|Да

|plans
|
Определяет тарифные планы сервиса (подробнее — в разделе {linkto(#service_plans)[text=%text]})
|Массив
|Да

|preview
|
Определяет тарифные опции для матрицы тарифных планов (подробнее — в разделе {linkto(#service_options_for_matrix)[text=%text]})
|Массив
|Да
|===
{/caption}

<err>

Сочетание ID и ревизии сервиса должно быть уникальным в рамках {var(sys2)}. Если сервис с такими же идентификатором и ревизией уже существует в {var(sys6)}, то сервисный пакет не будет обновлен.

</err>

На основании тарифных планов и опций, указанных в секциях `plans` и `preview`, формируется матрица тарифных планов (подробнее — в разделе {linkto(/ru/applications-and-services/marketplace/vendor/concepts/about/#xaas_tariff_matrix)[text=%text]}).

Пример файла `service.yaml` приведен в приложении {linkto(#ibexample_service)[text=%text]}.

## {heading(Тарифные планы сервиса)[id=service_plans]}

Чтобы указать все тарифные планы сервиса:

1. Укажите массив `plans`.
1. Внутри массива перечислите имена тарифных планов `<PLAN_NAME>` в ключах `name`. Имена тарифных планов должны соответствовать именам директорий этих планов.

   <warn>

   Пользователю будут доступны только тарифные планы, указанные в массиве `plans`.

   </warn>

{caption(Перечисление тарифных планов сервиса)[align=left;position=above]}
```yaml
plans:
    - name: <PLAN_NAME1>
    - name: <PLAN_NAME2>
```
{/caption}

## {heading(Тарифные опции для матрицы тарифных планов)[id=service_options_for_matrix]}

Чтобы указать тарифные опции для матрицы тарифных планов (из всех возможных, описанных в директории `parameters`):

1. Укажите секцию `preview` с массивом `parameters` внутри.
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
