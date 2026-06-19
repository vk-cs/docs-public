Для каждой тарифной опции создается свой YAML-файл, содержащий:

- корневую секцию;
- секцию schema;
- секцию billing.

Общая структура параметров тарифной опции в YAML-файле:

```yaml
# Корневой уровень
actions: 
  - ...
  - ...

# Секция schema, параметры тарифной опции
schema:
  description: ""
  hint: ""
  type: ""
  tag: ""

  default:         # используется формат, указанный в schema.type
  minimum:         # только для schema.type = integer
  maximum:         # только для schema.type = integer
  pattern:         # только для schema.type = string
  minLength:       # только для schema.type = string
  maxLength:       # только для schema.type = string
  enum: []         # массив integer или string, в зависимости от schema.type
  const: 

  datasource:
    type: ""
    value_is: ""

    filter:
      vcpus:       # только для schema.datasource.type = flavor
         minimum:
         maximum:
      ram:         # только для schema.datasource.type = flavor
         minimum:
         maximum:
      kind: ""     # только для schema.datasource.type = network
      shared:      # только для schema.datasource.type = network
      disk_class:  # только для schema.datasource.type = volume_type
        enum: []

# Секция billing, тарификация тарифной опции
billing:
  base: 
  cost: 

  unit:
    size: 
    measurement: ""
```

## {heading(Параметры в корне конфигурации)[id=yaml-root]}

[cols="2,5", options="header"]
|===
|Имя
|Описание

|`actions`
|
Параметр определяет [способ тарификации](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing) опции.

Формат: `string`.

Возможные значения:

- Для бесплатной или предоплатной тарификации — одно или оба значения:

  - `create` — опция будет активна при подключении сервиса.
  - `update` — опция будет активна при обновлении тарифного плана.

   Если опция активна, пользователь сможет изменить ее значение.

- Для постоплатной тарификации — `resource_usages`

|===

## {heading(Параметры секции schema)[id=iboption_schema]}

`schema` — обязательная секция, в которой задаются основные параметры тарифной опции.

[cols="1,5", options="header"]
|===
|Имя
|Описание

|`description`
|Имя тарифной опции. Отображется над полем ввода или переключателем.

Формат: `string`, до 255 символов.

Совместимо с любыми типами тарифных опций.

Полный путь: `schema` → `description`
|`hint`

(опционально)
|Подсказка с описанием тарифной опции. Отображется при наведении курсора на значок подсказки возле имени тарифной опции.

Формат: `string`, до 255 символов.

Совместимо с любыми типами тарифных опций.

Полный путь: `schema` → `hint`

|`type`
|Тип тарифной опции.

Формат: `string`.

Возможные значения:

- `string` — текстовое значение;
- `integer` — числовое значение;
- `boolean` — переключатель.

Полный путь: `schema` → `type`

|`tag`
|Тег — позволяет связать между собой несколько опций.

Формат: `string`.

Используется для тарифной опции datasource, которая задает размер диска.

Полный путь: `schema` → `tag`

|`default`
|Значение тарифной опции по умолчанию.

Используется формат, указанный в `schema.type`.

Если `schema.type` = `integer`, значение `default` не может быть меньше `minimum` и больше `maximum`.

При использовании заданного списка значений `enum: []`, в `default` необходимо указать одно из значений этого списка.

При использовании секции `datasource`, значение `default` может быть указано только для:
- `schema.datasource.type` = `az`. Возможные значения: `ms1` или `gz1`.
- `schema.datasource.type` = `volume_type`. Указывается одно из значений, указанных в массиве `schema.datasource.filter.disk_class.enum`.

Если используется параметр `base` в секции `billing`, то значение `default` переопределяется по формуле `billing.base + schema.default * billing.unit.size`.

Полный путь: `schema` → `default`

|`minimum`

(опционально)
|Минимальное значение тарифной опции.

Формат: `integer`.

Используется для типа тарифной опции `schema.type` = `integer`.

Если используется параметр `base` в секции `billing`, то значение `minimum` переопределяется по формуле `billing.base + schema.minimum * billing.unit.size`.

Полный путь: `schema` → `minimum`

|`maximum`

(опционально)
|Максимальное значение тарифной опции.

Формат: `integer`.

Используется для типа тарифной опции `schema.type` = `integer`.

Если используется параметр `base` в секции `billing`, то значение `maximum` переопределяется по формуле `billing.base + schema.maximum * billing.unit.size`.

Полный путь: `schema` → `maximum`

|`pattern`

(опционально)
|Шаблон в формате регулярного выражения (regex), которому должно соответствовать значение тарифной опции.

Формат: `string`.

Используется для типа тарифной опции `schema.type` = `string`.

Полный путь: `schema` → `pattern`

|`minLength`

(опционально)
|Минимальное количество символов для значения тарифной опции.

Формат: `integer`.

Используется для типа тарифной опции `schema.type` = `string`.

Полный путь: `schema` → `minLength`

|`maxLength`

(опционально)
|Максимальное количество символов для значения тарифной опции.

Формат: `integer`.

Используется для типа тарифной опции `schema.type` = `string`.

Полный путь: `schema` → `maxLength`

|`enum`
|Список значений, среди которых пользователь сможет выбрать одно.

Используется формат `integer` или `string`, в зависимости от указанного в `schema.type`.

Несовместимо с параметрами `minimum`, `maximum`, `pattern`, `minLength`, `maxLength`.

При использовании `enum`, в `schema.default` необходимо указать одно из значений этого списка

Полный путь: `schema` → `enum`

|`const`
|Задает фиксированное значение тарифной опции, которое нельзя изменить.

Используется формат, указанный в `schema.type`.

Несовместимо с параметрами `default`, `minimum`, `maximum`, `pattern`, `minLength`, `maxLength`, `enum`.

Полный путь: `schema` → `const`

|===

## {heading(Параметры секции datasource)[id=iboption_datasource]}

`datasource` — дополнительная секция внутри секции `schema`. Используется для создания тарифной опции с настройкой облачных ресурсов VK Cloud: виртуальной машины, сети, подсети и диска.

[cols="1,5", options="header"]
|===
|Имя
|Описание

|`type`
|Тип сущности VK Cloud.

Формат: `string`.

Возможные значения:

- `flavor` — типы ВМ, доступные в проекте пользователя облачной платформы.
- `az` — зоны доступности облачной платформы.
- `network` — сети, доступные в проекте облачной платформы.
- `subnet` — подсети, доступные в проекте облачной платформы.
- `volume_type` — тип диска.

Список доступных пользователю вариантов формируется автоматически в зависимости от указанного значения. Из значений в списке пользователь сможет выбрать одно.

Полный путь: `schema` → `datasource` → `type`

|`value_is`
|Тип отображения доступных вариантов.

Формат: `string`.

Возможные значения:

- `uuid` — показывать UUID сети;
- `name` — показывать имя сети.

Полный путь: `schema` → `datasource` → `value_is`

|`filter`
|Ограничение доступных значений на основе параметров сущностей VK Cloud.

Формат: `object`.

В зависимости от значения, указанного в `schema` → `datasource` → `type`, может иметь разные параметры:

- `vcpus` и `ram` для `datasource.type` = `flavor`;
- `kind` и `shared` для `datasource.type` = `network`;
- `disk_class` для `datasource.type` = `volume_type`.

Полный путь:  `schema` → `datasource` → `filter`

|`vcpus`
|Ограничение количества vCPU (только для `datasource.type` = `flavor`).

Формат: `object`.

Содержит одно или два значения:

- `minimum` — минимальное значение количества vCPU;
- `maximum` — максимальное значение количества vCPU.

Полный путь: `schema` → `datasource` → `filter` → `vcpus`

|`minimum` (для `vcpus`)
|Ограничение минимального количества vCPU. 

Формат: `integer`.

Значение `minimum` должно быть:
- больше `0`;
- не больше значения `maximum` для `vcpus` (если используется).

Полный путь: `schema` → `datasource` → `filter` → `vcpus` → `minimum`

|`maximum` (для `vcpus`)
|Ограничение максимального количества vCPU. 

Формат: `integer`.

Значение `maximum` должно быть:
- больше `0`;
- не меньше значения `minimum` для `vcpus` (если используется).

Полный путь: `schema` → `datasource` → `filter` → `vcpus` → `maximum`

|`ram`
|Ограничение количества RAM (только для `datasource.type` = `flavor`).

Формат: `object`.

Содержит одно или два значения:

- `minimum` — минимальное значение количества RAM;
- `maximum` — максимальное значение количества RAM.

Полный путь: `schema` → `datasource` → `filter` → `ram`

|`minimum` (для `ram`)
|Ограничение минимального количества RAM. 

Формат: `integer`.

Значение `minimum` указывается в МБ и должно быть:
- больше `0`;
- не больше значения `maximum` для `ram` (если используется).

Полный путь: `schema` → `datasource` → `filter` → `ram` → `minimum`

|`maximum` (для `ram`)
|Ограничение максимального количества RAM. 

Формат: `integer`.

Значение `maximum` указывается в МБ и должно быть:
- больше `0`;
- не меньше значения `minimum` для `ram` (если используется).

Полный путь: `schema` → `datasource` → `filter` → `ram` → `maximum`

|`kind`
|Какой тип сети может использовать пользователь (только для `datasource.type` = `network`).

Формат: `string`.

Возможные значения:

- `external` — только внешние сети;
- `internal` — только внутренние сети;
- `all` — все сети.

Полный путь: `schema` → `datasource` → `filter` → `kind`

|`shared`
|Включение или отключение совместного использования сети (только для `datasource.type` = `network`).

Формат: `boolean`.

- `true` — сеть доступна для использования всеми проектами;
- `false` — сеть доступна только в проекте пользователя.

Полный путь: `schema` → `datasource` → `filter` → `shared`

|`disk_class`
|Какие типы дисков доступны пользователю (только для `datasource.type` = `volume_type`). Задается в виде списка в параметре `enum`.

Формат: `object`.

Полный путь: `schema` → `datasource` → `filter` → `disk_class`

|`enum`
|Список `string` значений типов дисков, доступных для выбора пользователю.

Формат: `list` / `array` / `sequence`.

Возможные значения:

- `ceph-ssd` — диск типа SSD;
- `ceph-hdd` — диск типа HDD;
- `high-iops` — диск типа High-IOPS SSD (SSD с повышенной производительностью).

Полный путь: `schema` → `datasource` → `filter` → `disk_class` → `enum`

|===

## {heading(Параметры секции billing)[id=iboption_billing]}

`billing` — секция, используемая для настройки тарификации в предоплатных и постоплатных тарифных опциях.

{note:warn}

Стоимость тарифных опций `datasource` определяется тарифами VK Cloud, их нельзя изменить.

{/note}

Платными могут быть тарифные опции следующего типа:

* Числовой (`integer`, `number`). Поддерживается предоплатная и постоплатная [тарификация](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing).
* Логический (`boolean`). Поддерживается предоплатная [тарификация](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing).

[cols="2,5", options="header"]
|===
|Имя
|Описание

|`base`
|Стандартное значение тарифной опции, включенное в стоимость тарифного плана.

Формат: `integer`.

Стандартное значение — это минимальное значение, которое может задать пользователь.

Если параметр не задан, стандартное значение тарифной опции равно `0`

Полный путь: `billing` → `base`

|`cost`
|- Для `schema.type` = `integer`: стоимость шага изменения тарифной опции.  Параметры шага определяются в секции `unit`.
- Для `schema.type` = `boolean`: стоимость включения опции.

Формат: `float64`.

Если параметр равен `0`, изменение опции бесплатно.

Полный путь: `billing` → `cost`

|===

## {heading(Параметры секции unit)[id=iboption_datasource_unit]}

`unit` — дополнительная секция внутри секции `billing`. Используется для настройки параметров шага изменения предоплатной и постоплатной тарифной опции типа `integer`.

[cols="2,5", options="header"]
|===
|Имя
|Описание

|`size`
|Размер шага, на который можно изменить значение тарифной опции типа `integer`.

Значение, указанное в этом параметре, тарифицируется в соответствии со стоимостью, заданной в параметре `billig.cost`.

Для постоплатной опции указывается значение `1`.

Формат: `integer`.

Полный путь: `billig` → `unit` → `size`

|`measurement`
|Единицы измерения шага, заданного в параметре `size`

Формат: `string` (до 255 символов).

Полный путь: `billig` → `unit` → `measurement`

|===
