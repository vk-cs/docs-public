
{include(/kz/_includes/_translated_by_ai_kz.md)}

Әр тарифтік опция үшін мыналарды қамтитын жеке YAML-файл жасалады:

- түбірлік секция;
- schema секциясы;
- billing секциясы.

YAML-файлдағы тарифтік опция параметрлерінің жалпы құрылымы:

```yaml

# Түбірлік деңгей
actions: 
  - ...
  - ...

# schema секциясы, тарифтік опция параметрлері
schema:
  description: ""
  hint: ""
  type: ""
  tag: ""

  default:         # schema.type көрсетілген формат қолданылады
  minimum:         # тек schema.type = integer үшін
  maximum:         # тек schema.type = integer үшін
  pattern:         # тек schema.type = string үшін
  minLength:       # тек schema.type = string үшін
  maxLength:       # тек schema.type = string үшін
  enum: []         # schema.type-ға байланысты integer немесе string массиві
  const: 

  datasource:
    type: ""
    value_is: ""

    filter:
      vcpus:       # тек schema.datasource.type = flavor үшін
         minimum:
         maximum:
      ram:         # тек schema.datasource.type = flavor үшін
         minimum:
         maximum:
      kind: ""     # тек schema.datasource.type = network үшін
      shared:      # тек schema.datasource.type = network үшін
      disk_class:  # тек schema.datasource.type = volume_type үшін
        enum: []

# billing секциясы, тарифтік опцияны тарификациялау
billing:
  base: 
  cost: 

  unit:
    size: 
    measurement: ""
```

## {heading(Конфигурация түбіріндегі параметрлер)[id=yaml-root]}

[cols="2,5", options="header"]
|===
|Атауы
|Сипаттамасы

|`actions`
|
Параметр опцияның [тарификациялау тәсілін](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing) анықтайды.

Форматы: `string`.

Мүмкін мәндері:

- Тегін немесе алдын ала төлемді тарификациялау үшін — бір немесе екі мән:

  - `create` — опция қызметке қосылғанда белсенді болады.
  - `update` — опция тарифтік жоспарды жаңартқанда белсенді болады.

   Егер опция белсенді болса, пайдаланушы оның мәнін өзгерте алады.

- Кейіннен төлемді тарификациялау үшін — `resource_usages`

|===

## {heading(schema секциясының параметрлері)[id=iboption_schema]}

`schema` — тарифтік опцияның негізгі параметрлері белгіленетін міндетті секция.

[cols="1,5", options="header"]
|===
|Атауы
|Сипаттамасы

|`description`
|Тарифтік опцияның атауы. Енгізу өрісінің немесе ауыстырғыштың үстінде көрсетіледі.

Форматы: `string`, 255 таңбаға дейін.

Кез келген типтегі тарифтік опциялармен үйлеседі.

Толық жолы: `schema` → `description`
|`hint`

(міндетті емес)
|Тарифтік опцияның сипаттамасы бар кеңес. Тарифтік опция атауының жанындағы кеңес белгісіне курсорды апарғанда көрсетіледі.

Форматы: `string`, 255 таңбаға дейін.

Кез келген типтегі тарифтік опциялармен үйлеседі.

Толық жолы: `schema` → `hint`

|`type`
|Тарифтік опцияның түрі.

Форматы: `string`.

Мүмкін мәндері:

- `string` — мәтінмәні;
- `integer` — сандық мәні;
- `boolean` — ауыстырғыш.

Толық жолы: `schema` → `type`

|`tag`
|Тег — бірнеше опцияны бір-бірімен байланыстыруға мүмкіндік береді.

Форматы: `string`.

Дискінің өлшемін белгілейтін datasource тарифтік опциясы үшін қолданылады.

Толық жолы: `schema` → `tag`

|`default`
|Тарифтік опцияның әдепкі мәні.

`schema.type`-та көрсетілген формат қолданылады.

Егер `schema.type` = `integer` болса, `default` мәні `minimum`-нан кем және `maximum`-нан үлкен болмауы керек.

Мәндердің берілген тізімін `enum: []` қолданғанда, `default`-та осы тізімнің бір мәнін көрсету қажет.

`datasource` секциясын қолданғанда, `default` мәні тек мыналар үшін көрсетілуі мүмкін:
- `schema.datasource.type` = `az`. Мүмкін мәндері: `ms1` немесе `gz1`.
- `schema.datasource.type` = `volume_type`. `schema.datasource.filter.disk_class.enum` массивінде көрсетілген мәндердің бірі көрсетіледі.

Егер `billing` секциясында `base` параметрі қолданылса, `default` мәні `billing.base + schema.default * billing.unit.size` формуласы бойынша қайта анықталады.

Толық жолы: `schema` → `default`

|`minimum`

(міндетті емес)
|Тарифтік опцияның ең аз мәні.

Форматы: `integer`.

`schema.type` = `integer` типті тарифтік опция үшін қолданылады.

Егер `billing` секциясында `base` параметрі қолданылса, `minimum` мәні `billing.base + schema.minimum * billing.unit.size` формуласы бойынша қайта анықталады.

Толық жолы: `schema` → `minimum`

|`maximum`

(міндетті емес)
|Тарифтік опцияның ең көп мәні.

Форматы: `integer`.

`schema.type` = `integer` типті тарифтік опция үшін қолданылады.

Егер `billing` секциясында `base` параметрі қолданылса, `maximum` мәні `billing.base + schema.maximum * billing.unit.size` формуласы бойынша қайта анықталады.

Толық жолы: `schema` → `maximum`

|`pattern`

(міндетті емес)
|Тарифтік опцияның мәні сәйкес келуі тиіс тұрақты өрнек (regex) форматындағы үлгі.

Форматы: `string`.

`schema.type` = `string` типті тарифтік опция үшін қолданылады.

Толық жолы: `schema` → `pattern`

|`minLength`

(міндетті емес)
|Тарифтік опцияның мәні үшін таңбалардың ең аз саны.

Форматы: `integer`.

`schema.type` = `string` типті тарифтік опция үшін қолданылады.

Толық жолы: `schema` → `minLength`

|`maxLength`

(міндетті емес)
|Тарифтік опцияның мәні үшін таңбалардың ең көп саны.

Форматы: `integer`.

`schema.type` = `string` типті тарифтік опция үшін қолданылады.

Толық жолы: `schema` → `maxLength`

|`enum`
|Пайдаланушы біреуін таңдай алатын мәндердің тізімі.

`schema.type`-та көрсетілгендей `integer` немесе `string` форматы қолданылады.

`minimum`, `maximum`, `pattern`, `minLength`, `maxLength` параметрлерімен үйлеспейді.

`enum` қолданғанда, `schema.default`-та осы тізімнің бір мәнін көрсету қажет

Толық жолы: `schema` → `enum`

|`const`
|Тарифтік опцияның өзгертуге болмайтын тұрақты мәнін белгілейді.

`schema.type`-та көрсетілген формат қолданылады.

`default`, `minimum`, `maximum`, `pattern`, `minLength`, `maxLength`, `enum` параметрлерімен үйлеспейді.

Толық жолы: `schema` → `const`

|===

## {heading(datasource секциясының параметрлері)[id=iboption_datasource]}

`datasource` — `schema` секциясының ішіндегі қосымша секция. VK Cloud бұлттық ресурстарын: виртуалды машинаны, желіні, ішкі желіні және дискіні баптаумен тарифтік опция жасау үшін қолданылады.

[cols="1,5", options="header"]
|===
|Атауы
|Сипаттамасы

|`type`
|VK Cloud нысанының түрі.

Форматы: `string`.

Мүмкін мәндері:

- `flavor` — бұлттық платформаның пайдаланушы жобасында қолжетімді ВМ типтері.
- `az` — бұлттық платформаның қолжетімділік аймақтары.
- `network` — бұлттық платформаның жобасында қолжетімді желілер.
- `subnet` — бұлттық платформаның жобасында қолжетімді ішкі желілер.
- `volume_type` — дискінің түрі.

Пайдаланушыға қолжетімді нұсқалардың тізімі көрсетілген мәнге қарай автоматты түрде қалыптастырылады. Тізімдегі мәндерден пайдаланушы біреуін таңдай алады.

Толық жолы: `schema` → `datasource` → `type`

|`value_is`
|Қолжетімді нұсқаларды көрсету түрі.

Форматы: `string`.

Мүмкін мәндері:

- `uuid` — желінің UUID-ін көрсету;
- `name` — желінің атауын көрсету.

Толық жолы: `schema` → `datasource` → `value_is`

|`filter`
|VK Cloud нысандарының параметрлері негізінде қолжетімді мәндерді шектеу.

Форматы: `object`.

`schema` → `datasource` → `type`-та көрсетілген мәнге қарай әртүрлі параметрлері болуы мүмкін:

- `datasource.type` = `flavor` үшін `vcpus` және `ram`;
- `datasource.type` = `network` үшін `kind` және `shared`;
- `datasource.type` = `volume_type` үшін `disk_class`.

Толық жолы:  `schema` → `datasource` → `filter`

|`vcpus`
|vCPU санын шектеу (тек `datasource.type` = `flavor` үшін).

Форматы: `object`.

Бір немесе екі мәннен тұрады:

- `minimum` — vCPU санының ең аз мәні;
- `maximum` — vCPU санының ең көп мәні.

Толық жолы: `schema` → `datasource` → `filter` → `vcpus`

|`minimum` (для `vcpus`)
|vCPU ең аз санын шектеу. 

Форматы: `integer`.

`minimum` мәні:
- `0`-ден үлкен;
- `vcpus` үшін `maximum` мәнінен үлкен емес (қолданылса) болуы керек.

Толық жолы: `schema` → `datasource` → `filter` → `vcpus` → `minimum`

|`maximum` (для `vcpus`)
|vCPU ең көп санын шектеу. 

Форматы: `integer`.

`maximum` мәні:
- `0`-ден үлкен;
- `vcpus` үшін `minimum` мәнінен кем емес (қолданылса) болуы керек.

Толық жолы: `schema` → `datasource` → `filter` → `vcpus` → `maximum`

|`ram`
|RAM көлемін шектеу (тек `datasource.type` = `flavor` үшін).

Форматы: `object`.

Бір немесе екі мәннен тұрады:

- `minimum` — RAM көлемінің ең аз мәні;
- `maximum` — RAM көлемінің ең көп мәні.

Толық жолы: `schema` → `datasource` → `filter` → `ram`

|`minimum` (для `ram`)
|RAM ең аз көлемін шектеу. 

Форматы: `integer`.

`minimum` мәні МБ есебінде көрсетіледі және:
- `0`-ден үлкен;
- `ram` үшін `maximum` мәнінен үлкен емес (қолданылса) болуы керек.

Толық жолы: `schema` → `datasource` → `filter` → `ram` → `minimum`

|`maximum` (для `ram`)
|RAM ең көп көлемін шектеу. 

Форматы: `integer`.

`maximum` мәні МБ есебінде көрсетіледі және:
- `0`-ден үлкен;
- `ram` үшін `minimum` мәнінен кем емес (қолданылса) болуы керек.

Толық жолы: `schema` → `datasource` → `filter` → `ram` → `maximum`

|`kind`
|Пайдаланушы қандай типті желіні қолдана алады (тек `datasource.type` = `network` үшін).

Форматы: `string`.

Мүмкін мәндері:

- `external` — тек сыртқы желілер;
- `internal` — тек ішкі желілер;
- `all` — барлық желілер.

Толық жолы: `schema` → `datasource` → `filter` → `kind`

|`shared`
|Желіні бірлесіп пайдалануды қосу немесе өшіру (тек `datasource.type` = `network` үшін).

Форматы: `boolean`.

- `true` — желі барлық жобаларды пайдалануына қолжетімді;
- `false` — желі тек пайдаланушы жобасында қолжетімді.

Толық жолы: `schema` → `datasource` → `filter` → `shared`

|`disk_class`
|Пайдаланушыға қандай типті дискілер қолжетімді (тек `datasource.type` = `volume_type` үшін). `enum` параметрінде тізім түрінде белгіленеді.

Форматы: `object`.

Толық жолы: `schema` → `datasource` → `filter` → `disk_class`

|`enum`
|Пайдаланушы таңдауына қолжетімді дискілердің `string` типті мәндерінің тізімі.

Форматы: `list` / `array` / `sequence`.

Мүмкін мәндері:

- `ceph-ssd` — SSD типті диск;
- `ceph-hdd` — HDD типті диск;
- `high-iops` — High-IOPS SSD типті диск (өнімділігі жоғары SSD).

Толық жолы: `schema` → `datasource` → `filter` → `disk_class` → `enum`

|===

## {heading(billing секциясының параметрлері)[id=iboption_billing]}

`billing` — алдын ала төлемді және кейіннен төлемді тарифтік опцияларда тарификациялауды баптау үшін қолданылатын секция.

{note:warn}

`datasource` тарифтік опцияларының құны VK Cloud тарифтері бойынша анықталады, оларды өзгертуге болмайды.

{/note}

Ақылы тарифтік опциялар мынадай типті болуы мүмкін:

* Сандық (`integer`, `number`). Алдын ала төлемді және кейіннен төлемді [тарификациялау](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing) қолдaysылады.
* Логикалық (`boolean`). Алдын ала төлемді [тарификациялау](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing) қолданылады.

[cols="2,5", options="header"]
|===
|Атауы
|Сипаттамасы

|`base`
|Тарифтік жоспардың құнына кіретін тарифтік опцияның стандартты мәні.

Форматы: `integer`.

Стандартты мән — пайдаланушы белгілей алатын ең аз мән.

Егер параметр белгіленбесе, тарифтік опцияның стандартты мәні `0`-ге тең

Толық жолы: `billing` → `base`

|`cost`
|- `schema.type` = `integer` үшін: тарифтік опцияны өзгерту қадамының құны. Қадам параметрлері `unit` секциясында анықталады.
- `schema.type` = `boolean` үшін: опцияны қосу құны.

Форматы: `float64`.

Егер параметр `0`-ге тең болса, опцияны өзгерту тегін.

Толық жолы: `billing` → `cost`

|===

## {heading(unit секциясының параметрлері)[id=iboption_datasource_unit]}

`unit` — `billing` секциясының ішіндегі қосымша секция. `integer` типті алдын ала төлемді және кейіннен төлемді тарифтік опцияны өзгерту қадамының параметрлерін баптау үшін қолданылады.

[cols="2,5", options="header"]
|===
|Атауы
|Сипаттамасы

|`size`
|`integer` типті тарифтік опцияның мәнін өзгертуге болатын қадамның өлшемі.

Осы параметрде көрсетілген мән `billig.cost` параметрінде белгіленген құнға сәйкес тарификацияланады.

Кейіннен төлемді опция үшін `1` мәні көрсетіледі.

Форматы: `integer`.

Толық жолы: `billig` → `unit` → `size`

|`measurement`
|`size` параметрінде берілген қадамның өлшем бірліктері

Форматы: `string` (255 таңбаға дейін).

Толық жолы: `billig` → `unit` → `measurement`

|===