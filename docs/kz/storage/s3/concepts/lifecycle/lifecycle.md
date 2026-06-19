# {heading(Объектілердің өмірлік циклі)[id=s3-concepts-lifecycle]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(s3)} бакеттегі объектілердің өмірлік циклін (lifecycle) баптауға мүмкіндік береді. Өмірлік цикл — берілген ережелер бойынша бакеттен объектілерді немесе олардың {linkto(../versioning#s3-concepts-versioning)[text=нұсқаларын]} автоматтандырылған түрде жою.

Ережелер бір бакет деңгейінде орнатылады. Бакеттер тобы немесе жоба үшін өмірлік циклді баптау мүмкін емес.

Жеке кабинетте{ifdef(s3,s3-pdf)} IAM Only{/ifdef} өмірлік цикл ережелерін {linkto(../../instructions/manage-lifecycle#s3-instructions-manage-lifecycle)[text=басқаруға]} тек жеке-жеке ғана болады. Бірден бірнеше ережені қосу, жою және өзгерту мына арқылы мүмкін:

- {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} арқылы өмірлік циклдің {linkto(#s3-concepts-lifecycle-config)[text=JSON-конфигурациясын]} пайдаланып.  
- XML-конфигурация көмегімен {ifdef(public)}{linkto(../../api/lifecycle#s3-api-lifecycle)[text=API]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../../api/lifecycle#s3-api-lifecycle)[text=API]}{/ifdef} арқылы.

Өмірлік цикл ережелерін құру ерекшеліктері:

- Конфигурация кемінде бір ережені қамтуы тиіс.
- Ереже атауы (`ID` параметрі) — тек цифрлардан, латын әріптерінен және `_`, `.`, `-` таңбаларынан тұратын бірегей идентификатор.
- Әр өмірлік цикл ережесі мыналарды қамтиды:

  - Ережеге түсетін объектілерді таңдау үшін сүзгі (`Filter` параметрі). Сүзгілеудің бір немесе екі түрін қамтуы мүмкін:

    - Объект {linkto(../about#s3-concepts-about-object-key)[text=кілті]} префиксі бойынша (`Prefix` параметрі). Префикстер мысалдары: `image`, `image/`, `image/photo`.

      Бір ереже тек бір префиксті ғана қамти алады. Объектілерді бірнеше префикс бойынша сүзгілеу үшін әр префикс үшін бөлек ереже жасау қажет.

    - Объектінің {linkto(../features#s3-concepts-features-tagging)[text=тегтері]} бойынша (`Tag` немесе `Tags` параметрі).

  - Объектінің өмір сүру уақыты (`Expiration` параметрі). Объект қашан жойылуы керегін анықтайды:

    - жүктелгеннен кейін берілген күндер саны өткен соң;
    - берілген уақытта (тек {ifdef(public)}{linkto(../../api/lifecycle#s3-api-lifecycle)[text=API]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../../api/lifecycle#s3-api-lifecycle)[text=API]}{/ifdef} және {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} көмегімен).

- Ереже қосылғаннан кейін ол бакеттегі тиісті объектілерге немесе объект нұсқаларына автоматты түрде қолданылады.

    Бұдан әрі объектілер фондық режимде жойылады: алдымен, өмір сүру уақыты аяқталғаннан кейін қолжетімсіз болады, содан соң келесі 24 сағат ішінде кезек тәртібімен жойылады.

Шектеулер:

- Әр бакет үшін 50 ережеден артық орнатуға болмайды.
- API арқылы ережелерді жасағанда ережелері бар XML-файлдың өлшемі 512 КБ-тан аспауы тиіс.

Өмірлік цикл ережелері фондық режимде жұмыс істейді және {var(s3)} сервисінің өнімділігіне әсер етпейді.

## {heading(Өмірлік цикл ережелерінің конфигурациясы)[id=s3-concepts-lifecycle-config]}

Өмірлік цикл конфигурациясы JSON форматындағы (AWS CLI үшін) немесе XML форматындағы (API үшін) файлда сипатталады.

JSON-конфигурация үшін барлық ережелер `object` форматындағы `Rules[i]` элементтерін қамтитын `Rules` (array) массиві түрінде беріледі.

{note:warn}

Конфигурацияны {linkto(../../instructions/manage-lifecycle#s3-instructions-manage-lifecycle)[text=орнату]} үшін үлгілерді қолданар алдында мыналарды орындау қажет:

- `Expiration` блогында `Days`, `Date`, `ExpiredObjectDeleteMarker` элементтерінің ішінен тек біреуін қалдырып, қалғандарын жою;
- барлық `// <ТЕКСТ_КОММЕНТАРИЯ>` комментарийлерін жою;
- өрістерді қажетті мәндермен толтыру;
- егер бакетте нұсқалау қосылмаған болса, `NoncurrentVersionExpiration` конфигурация элементін жою.

Әйтпесе AWS CLI командасын орындау қателікпен аяқталуы мүмкін.

{/note}

{cut(Префиксі және бірнеше тегі бар JSON форматындағы конфигурация үлгісі)}

```json
{
  "Rules": [
    {
      "Expiration": {
        "Days": 1,                                       // Указывается вместо Date и ExpiredObjectDeleteMarker
        "Date": "YYYY-MM-DDTHH:MM:SSZ",                  // Указывается вместо Days и ExpiredObjectDeleteMarker
        "ExpiredObjectDeleteMarker": true                // Указывается вместо Days и Date (только для бакетов с версионированием)
      },
      "ID": "string",
      "Status": "Enabled",
      "Filter": {
        "And": {
          "Prefix": "string",
          "Tags": [
            { "Key": "tagKey1", "Value": "tagValue1" },
            { "Key": "tagKey2", "Value": "tagValue2" },
            { "Key": "tagKey3", "Value": "tagValue3" }
          ]
        }
      },
      "NoncurrentVersionExpiration": {                   // Только для бакетов с версионированием
        "NoncurrentDays": 30,
        "NewerNoncurrentVersions": 50
      }
    }
  ]
}
```

{ifdef(s3-pdf)}
Конфигурация параметрлерінің сипаттамасы {linkto(#tab_lifecycle-config1)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_lifecycle-config1]} — Конфигурация параметрлері)[align=right;position=above;id=tab_lifecycle-config1;number={const(numb_tab_lifecycle-config1)}]}
{/ifdef}
[cols="2,5", options="header"]
|===
|Атауы
|Сипаттама

|`Expiration`
|Объектінің өмір сүру мерзімі. Объектінің ағымдағы нұсқасына, {linkto(../versioning#s3-concepts-versioning-status)[text=нұсқалау күйіне]} және {linkto(../versioning#s3-concepts-versioning-delete-marker)[text=жою маркерінің]} бар-жоғына байланысты, осы мерзім аяқталғаннан кейін объектіге әрекеттердің бірі қолданылады.

Нұсқалау өшірілген бакет үшін объект қайтарымсыз жойылады.

Нұсқалау қосылған бакет үшін.

- Ағымдағы нұсқа жою маркері емес — жою маркері жасалып, ағымдағы нұсқаға айналады.
- Ағымдағы нұсқа жою маркері — ештеңе болмайды. Алайда басқа нұсқалар жоқ болса және `Days` немесе `Date` орнына `ExpiredObjectDeleteMarker` қолданылса, жою маркері жойылады.

Нұсқалау тоқтатылған бакет үшін.

- `null` — жалғыз нұсқа: `null` нұсқасы жойылады.
- Нұсқалар бірнешеу және ағымдағысы — `null`: `null` нұсқасы жойылады. Егер `null` нұсқасы жойылғаннан кейін объектінің басқа нұсқалары қалса, `null` нұсқасымен жою маркері жасалады.
- Нұсқалар бірнешеу және ағымдағысы `null` емес: тек `null` нұсқасымен жою маркері жасалады.
- Ағымдағы нұсқа жою маркері — ештеңе болмайды. Алайда басқа нұсқалар жоқ болса және `Days` немесе `Date` орнына `ExpiredObjectDeleteMarker` қолданылса, жою маркері жойылады.

`Days`, `Date` немесе `ExpiredObjectDeleteMarker` конфигурация элементтері арқылы беріледі.

Форматы: `object`.

Толық жолы: `Rules[i]` → `Expiration`

|`Days`
|Бакетке жүктелгеннен кейінгі күндер саны.

`Rules[i]` → `Expiration` → `Date` және `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker` конфигурация элементтерімен үйлеспейді.

Форматы: `integer`.

Толық жолы: `Rules[i]` → `Expiration` → `Days`

|`Date`
|ISO 8601 форматындағы UTC күн мен уақыт.

`Rules[i]` → `Expiration` → `Days` және `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker` конфигурация элементтерімен үйлеспейді.

Форматы: `string`.

Толық жолы: `Rules[i]` → `Expiration` → `Date`

|`ExpiredObjectDeleteMarker`

(тек нұсқалауы бар бакеттер үшін)
|Бакеттен объектінің жою маркерін, осы объектінің басқа нұсқалары қалмаған кезде, жою қажет пе екенін анықтайтын опция.

Форматы: `boolean` мәні `true`.

Толық жолы: `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker`

|`ID`
|Ереженің бірегей идентификаторы.

Форматы: `string`.

Толық жолы: `Rules[i]` → `ID`

|`Status`
|Ереженің күйі.

Форматы: `string`.

Мүмкін мәндер:

- `Enabled` — ереже қолданылады;
- `Disabled` — ереже қолданылмайды.

Толық жолы: `Rules[i]` → `Status`

|`Filter`
|Ереже қолданылатын объектілер бойынша сүзгі.

Форматы: `object`.

Толық жолы: `Rules[i]` → `Filter`

|`And`
|Бір ережеде әрі префикс бойынша, әрі бірнеше тег бойынша сүзгілеу қолданылғанда пайдаланылатын конфигурация элементі.

Форматы: `object`.

Толық жолы: `Rules[i]` → `Filter` → `And`

|`Prefix`
|{linkto(../about#s3-concepts-about-object-key)[text=объект кілтінің]} префиксі

Форматы: `string`.

Толық жолы: `Rules[i]` → `Filter` → `And` → `Prefix`

|`Tags`
|Объектінің {linkto(../features#s3-concepts-features-tagging)[text=тегтері]} массив (array) түрінде. `Tags[i]` массивінің әр элементі `object` форматында болады және `Key` және `Value` кілт/мән жұптарын қамтиды.

Форматы: `array`.

Толық жолы: `Rules[i]` → `Filter` → `And` → `Tags`

|`Key`
|{linkto(../features#s3-concepts-features-tagging)[text=тегтің]} кілті.

Форматы: `string`.

Толық жолы: `Rules[i]` → `Filter` → `And` → `Tags[i]` → `Key`

|`Value`
|{linkto(../features#s3-concepts-features-tagging)[text=тегтің]} мәні.

Форматы: `string`.

Толық жолы: `Rules[i]` → `Filter` → `And` → `Tags[i]` → `Value`

|`NoncurrentVersionExpiration`

(тек нұсқалауы бар бакеттер үшін)
|Объектінің өзекті емес нұсқаларын жою шарттары.

Форматы: `object`.

Толық жолы: `Rules[i]` → `NoncurrentVersionExpiration`

|`NoncurrentDays`

(тек нұсқалауы бар бакеттер үшін)
|Объектінің өзекті емес нұсқасы сақталатын күндер саны, содан кейін бұл нұсқа жойылады.

`NewerNoncurrentVersions` параметрімен бірге қолданылса, өзекті емес нұсқаны жою екі лимитке де жеткен кезде ғана орындалады.

Форматы: `integer`.

Толық жолы: `Rules[i]` → `NoncurrentVersionExpiration` → `NoncurrentDays`

|`NewerNoncurrentVersions`

(тек нұсқалауы бар бакеттер үшін)
|Объектінің сақталатын өзекті емес нұсқаларының саны. Көрсетілген лимитке жеткен кезде, объектінің ескі нұсқалары автоматты түрде жойылады.

`NoncurrentDays` параметрімен бірге қолданылса, өзекті емес нұсқаны жою екі лимитке де жеткен кезде ғана орындалады.

Форматы: `integer`, бірақ 100-ден аспайды.

Толық жолы: `Rules[i]` → `NoncurrentVersionExpiration` → `NewerNoncurrentVersions`

|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

{/cut}

{cut(Тек префикстері бар JSON форматындағы конфигурация үлгісі)}

```json
{
  "Rules": [
    {
      "Expiration": {
        "Days": 30,                              // Указывается вместо Date и ExpiredObjectDeleteMarker
        "Date": "YYYY-MM-DDTHH:MM:SSZ",          // Указывается вместо Days и ExpiredObjectDeleteMarker
        "ExpiredObjectDeleteMarker": true        // Указывается вместо Days и Date (только для бакетов с версионированием)
      },
      "ID": "string",
      "Status": "Enabled",
      "Filter": {
        "Prefix": "string"
      },
      "NoncurrentVersionExpiration": {          // Только для бакетов с версионированием
        "NoncurrentDays": 30,
        "NewerNoncurrentVersions": 50
      }
    }
  ]
}
```

{ifdef(s3-pdf)}
Конфигурация параметрлерінің сипаттамасы {linkto(#tab_lifecycle-config2)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_lifecycle-config2]} — Конфигурация параметрлері)[align=right;position=above;id=tab_lifecycle-config2;number={const(numb_tab_lifecycle-config2)}]}
{/ifdef}
[cols="2,5", options="header"]
|===
|Атауы
|Сипаттама

|`Expiration`
|Объектінің өмір сүру мерзімі. Объектінің ағымдағы нұсқасына, {linkto(../versioning#s3-concepts-versioning-status)[text=нұсқалау күйіне]} және {linkto(../versioning#s3-concepts-versioning-delete-marker)[text=жою маркерінің]} бар-жоғына байланысты, осы мерзім аяқталғаннан кейін объектіге әрекеттердің бірі қолданылады.

Нұсқалау өшірілген бакет үшін объект қайтарымсыз жойылады.

Нұсқалау қосылған бакет үшін.

- Ағымдағы нұсқа жою маркері емес — жою маркері жасалып, ағымдағы нұсқаға айналады.
- Ағымдағы нұсқа жою маркері — ештеңе болмайды. Алайда басқа нұсқалар жоқ болса және `Days` немесе `Date` орнына `ExpiredObjectDeleteMarker` қолданылса, жою маркері жойылады.

Нұсқалау тоқтатылған бакет үшін.

- `null` — жалғыз нұсқа: `null` нұсқасы жойылады.
- Нұсқалар бірнешеу және ағымдағысы — `null`: `null` нұсқасы жойылады. Егер `null` нұсқасы жойылғаннан кейін объектінің басқа нұсқалары қалса, `null` нұсқасымен жою маркері жасалады.
- Нұсқалар бірнешеу және ағымдағысы `null` емес: тек `null` нұсқасымен жою маркері жасалады.
- Ағымдағы нұсқа жою маркері — ештеңе болмайды. Алайда басқа нұсқалар жоқ болса және `Days` немесе `Date` орнына `ExpiredObjectDeleteMarker` қолданылса, жою маркері жойылады.

`Days`, `Date` немесе `ExpiredObjectDeleteMarker` конфигурация элементтері арқылы беріледі.

Форматы: `object`.

Толық жолы: `Rules[i]` → `Expiration`

|`Days`
|Бакетке жүктелгеннен кейінгі күндер саны.

`Rules[i]` → `Expiration` → `Date` және `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker` конфигурация элементтерімен үйлеспейді.

Форматы: `integer`.

Толық жолы: `Rules[i]` → `Expiration` → `Days`

|`Date`
|ISO 8601 форматындағы UTC күн мен уақыт.

`Rules[i]` → `Expiration` → `Days` және `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker` конфигурация элементтерімен үйлеспейді.

Форматы: `string`.

Толық жолы: `Rules[i]` → `Expiration` → `Date`

|`ExpiredObjectDeleteMarker`

(тек нұсқалауы бар бакеттер үшін)
|Бакеттен объектінің жою маркерін, осы объектінің басқа нұсқалары қалмаған кезде, жою қажет пе екенін анықтайтын опция.

Форматы: `boolean` мәні `true`.

Толық жолы: `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker`

|`ID`
|Ереженің бірегей идентификаторы.

Форматы: `string`.

Толық жолы: `Rules[i]` → `ID`

|`Status`
|Ереженің күйі.

Форматы: `string`.

Мүмкін мәндер:

- `Enabled` — ереже қолданылады;
- `Disabled` — ереже қолданылмайды.

Толық жолы: `Rules[i]` → `Status`

|`Filter`
|Ереже қолданылатын объектілер бойынша сүзгі.

Форматы: `object`.

Толық жолы: `Rules[i]` → `Filter`

|`Prefix`
|{linkto(../about#s3-concepts-about-object-key)[text=объект кілтінің]} префиксі

Форматы: `string`.

Толық жолы: `Rules[i]` → `Filter` → `Prefix`

|`NoncurrentVersionExpiration`

(тек нұсқалауы бар бакеттер үшін)
|Объектінің өзекті емес нұсқаларын жою шарттары.

Форматы: `object`.

Толық жолы: `Rules[i]` → `NoncurrentVersionExpiration`

|`NoncurrentDays`

(тек нұсқалауы бар бакеттер үшін)
|Объектінің өзекті емес нұсқасы сақталатын күндер саны, содан кейін бұл нұсқа жойылады.

`NewerNoncurrentVersions` параметрімен бірге қолданылса, өзекті емес нұсқаны жою екі лимитке де жеткен кезде ғана орындалады.

Форматы: `integer`.

Толық жолы: `Rules[i]` → `NoncurrentVersionExpiration` → `NoncurrentDays`

|`NewerNoncurrentVersions`

(тек нұсқалауы бар бакеттер үшін)
|Объектінің сақталатын өзекті емес нұсқаларының саны. Көрсетілген лимитке жеткен кезде, объектінің ескі нұсқалары автоматты түрде жойылады.

`NoncurrentDays` параметрімен бірге қолданылса, өзекті емес нұсқаны жою екі лимитке де жеткен кезде ғана орындалады.

Форматы: `integer`, бірақ 100-ден аспайды.

Толық жолы: `Rules[i]` → `NoncurrentVersionExpiration` → `NewerNoncurrentVersions`
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}
{/cut}

{cut(Тек бір тег бойынша JSON форматындағы конфигурация үлгісі)}

```json
{
  "Rules": [
    {
      "Expiration": {
        "Days": 30,                              // Указывается вместо Date и ExpiredObjectDeleteMarker
        "Date": "YYYY-MM-DDTHH:MM:SSZ",          // Указывается вместо Days и ExpiredObjectDeleteMarker
        "ExpiredObjectDeleteMarker": true        // Указывается вместо Days и Date (только для бакетов с версионированием)
      },
      "ID": "string",
      "Status": "Enabled",
      "Filter": {
        "Tag": { "Key": "env", "Value": "prod" }
      },
      "NoncurrentVersionExpiration": {           // Только для бакетов с версионированием
        "NoncurrentDays": 30,
        "NewerNoncurrentVersions": 50
      }
    }
  ]
}
```
{ifdef(s3-pdf)}
Конфигурация параметрлерінің сипаттамасы {linkto(#tab_lifecycle-config3)[text=%number кестеде]} келтірілген.

{caption(Кесте {counter(table)[id=numb_tab_lifecycle-config3]} — Конфигурация параметрлері)[align=right;position=above;id=tab_lifecycle-config3;number={const(numb_tab_lifecycle-config3)}]}
{/ifdef}
[cols="2,5", options="header"]
|===
|Атауы
|Сипаттама

|`Expiration`
|Объектінің өмір сүру мерзімі. Объектінің ағымдағы нұсқасына, {linkto(../versioning#s3-concepts-versioning-status)[text=нұсқалау күйіне]} және {linkto(../versioning#s3-concepts-versioning-delete-marker)[text=жою маркерінің]} бар-жоғына байланысты, осы мерзім аяқталғаннан кейін объектіге әрекеттердің бірі қолданылады.

Нұсқалау өшірілген бакет үшін объект қайтарымсыз жойылады.

Нұсқалау қосылған бакет үшін.

- Ағымдағы нұсқа жою маркері емес — жою маркері жасалып, ағымдағы нұсқаға айналады.
- Ағымдағы нұсқа жою маркері — ештеңе болмайды. Алайда басқа нұсқалар жоқ болса және `Days` немесе `Date` орнына `ExpiredObjectDeleteMarker` қолданылса, жою маркері жойылады.

Нұсқалау тоқтатылған бакет үшін.

- `null` — жалғыз нұсқа: `null` нұсқасы жойылады.
- Нұсқалар бірнешеу және ағымдағысы — `null`: `null` нұсқасы жойылады. Егер `null` нұсқасы жойылғаннан кейін объектінің басқа нұсқалары қалса, `null` нұсқасымен жою маркері жасалады.
- Нұсқалар бірнешеу және ағымдағысы `null` емес: тек `null` нұсқасымен жою маркері жасалады.
- Ағымдағы нұсқа жою маркері — ештеңе болмайды. Алайда басқа нұсқалар жоқ болса және `Days` немесе `Date` орнына `ExpiredObjectDeleteMarker` қолданылса, жою маркері жойылады.

`Days`, `Date` немесе `ExpiredObjectDeleteMarker` конфигурация элементтері арқылы беріледі.

Форматы: `object`.

Толық жолы: `Rules[i]` → `Expiration`

|`Days`
|Бакетке жүктелгеннен кейінгі күндер саны.

`Rules[i]` → `Expiration` → `Date` және `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker` конфигурация элементтерімен үйлеспейді.

Форматы: `integer`.

Толық жолы: `Rules[i]` → `Expiration` → `Days`

|`Date`
|ISO 8601 форматындағы UTC күн мен уақыт.

`Rules[i]` → `Expiration` → `Days` және `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker` конфигурация элементтерімен үйлеспейді.

Форматы: `string`.

Толық жолы: `Rules[i]` → `Expiration` → `Date`

|`ExpiredObjectDeleteMarker`

(тек нұсқалауы бар бакеттер үшін)
|Бакеттен объектінің жою маркерін, осы объектінің басқа нұсқалары қалмаған кезде, жою қажет пе екенін анықтайтын опция.

`Rules[i]` → `Expiration` → `Days` және `Rules[i]` → `Expiration` → `Date` конфигурация элементтерімен үйлеспейді.

Форматы: `boolean` мәні `true`.

Толық жолы: `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker`

|`ID`
|Ереженің бірегей идентификаторы.

Форматы: `string`.

Толық жолы: `Rules[i]` → `ID`

|`Status`
|Ереженің күйі.

Форматы: `string`.

Мүмкін мәндер:

- `Enabled` — ереже қолданылады;
- `Disabled` — ереже қолданылмайды.

Толық жолы: `Rules[i]` → `Status`

|`Filter`
|Ереже қолданылатын объектілер бойынша сүзгі.

Форматы: `object`.

Толық жолы: `Rules[i]` → `Filter`

|`Tag`
|Объектінің {linkto(../features#s3-concepts-features-tagging)[text=тегі]} `Key` және `Value` кілт/мән жұбы түрінде.

Форматы: `object`.

Толық жолы: `Rules[i]` → `Filter` → `Tag`

|`NoncurrentVersionExpiration`

(тек нұсқалауы бар бакеттер үшін)
|Объектінің өзекті емес нұсқаларын жою шарттары.

Форматы: `object`.

Толық жолы: `Rules[i]` → `NoncurrentVersionExpiration`

|`NoncurrentDays`

(тек нұсқалауы бар бакеттер үшін)
|Объектінің өзекті емес нұсқасы сақталатын күндер саны, содан кейін бұл нұсқа жойылады.

`NewerNoncurrentVersions` параметрімен бірге қолданылса, өзекті емес нұсқаны жою екі лимитке де жеткен кезде ғана орындалады.

Форматы: `integer`.

Толық жолы: `Rules[i]` → `NoncurrentVersionExpiration` → `NoncurrentDays`

|`NewerNoncurrentVersions`

(тек нұсқалауы бар бакеттер үшін)
|Объектінің сақталатын өзекті емес нұсқаларының саны. Көрсетілген лимитке жеткен кезде, объектінің ескі нұсқалары автоматты түрде жойылады.

`NoncurrentDays` параметрімен бірге қолданылса, өзекті емес нұсқаны жою екі лимитке де жеткен кезде ғана орындалады.

Форматы: `integer`, бірақ 100-ден аспайды.

Толық жолы: `Rules[i]` → `NoncurrentVersionExpiration` → `NewerNoncurrentVersions`

|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}
{/cut}
