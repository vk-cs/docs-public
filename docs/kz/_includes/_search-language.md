Іздеу сұрауларының тілі мыналарға мүмкіндік береді:

- бір немесе бірнеше сүзгілеу өрнегі бойынша іздеу жасауға;
- логикалық операциялар мен салыстыру операцияларын қолдануға.

{ifdef(public,private,private-pg)}
Логтарды сүзгілеу үшін іздеу жолағындағы сүзгі параметрлерін пайдаланыңыз.
{/ifdef}

{includetag(event-log)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
Логтарды сүзгілеу үшін {linkto(#tab_search_filter_options_audit)[text=%number-кестеде]} көрсетілген іздеу жолағындағы сүзгі параметрлерін пайдаланыңыз.

{caption({counter(table)[id=numb_tab_search_filter_options_audit]} кесте — Іздеу сүзгілерінің параметрлері)[align=right;position=above;id=tab_search_filter_options_audit;number={const(numb_tab_search_filter_options_audit)}]}{/ifdef}
[cols="1,3", options="header"]
|===
|Параметр
|Сипаттама

|`event_id`
|Оқиғаның бірегей идентификаторы

|`timestamp`
|Оқиғаның пайда болу уақыты, [RFC3339](https://www.ietf.org/rfc/rfc3339.txt).

Мысал: 2006-01-02T15:04:05Z07:00

|`action`
|Оқиға түрі

|`request_id`
|Сұрау идентификаторы, Cloud Logging-пен байланыстыру үшін қолданылады

|`severity`
|Оқиғаның маңыздылық деңгейі. Қолжетімді мәндер: `DEFAULT`,`DEBUG`, `INFO`, `NOTICE`, `WARNING`, `ERROR`, `CRITICAL`, `ALERT`, `EMERGENCY`

|`message`
|Адамға түсінікті оқиға сипаттамасы

|`source.id`
|Оқиға көзінің идентификаторы

|`source.address`
|Оқиға көзінің IP мекенжайы

|`subject.user_id`
|Субъектінің идентификаторы — әрекеттерімен оқиға байланыстырылған пайдаланушы

|`subject.address`
|Пайдаланушының IP мекенжайы

|`subject.project_id`
|OpenStack-тағы жоба идентификаторы

|`subject.metadata`
|Пайдаланушыны анықтайтын қосымша метадеректер.

Мысалы: `subject.metadata.email` — пайдаланушының поштасы

|`resource.id`
|OpenStack-тағы ресурс идентификаторы немесе соған ұқсас

|`resource.type`
|Ресурс түрі

|`resource.metadata`
|Ресурсты анықтайтын қосымша метадеректер.

Мысалы:

- `resource.metadata.service_id` — сервис атауы (`DBaaS`);
- `resource.metadata.group_id` — қосалқы сервис атауы (`Redis`);
- `resource.metadata.stream_id` — ресурс орналасқан объектінің атауы (`DB_id`)

|`status.code`
|Операцияны орындау күйінің коды.

Мысалы, [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) коды немесе [gRPC](https://developers.google.com/maps-booking/reference/grpc-api/status_codes) коды

|`status.message`
|Операцияны орындау күйінің сипаттамасы

|`labels`
|Оқиғаларды іздеуге болатын белгілер
|===
{ifdef(private-pdf,private-pg-pdf,private-cert)}
{/caption}{/ifdef}
{/includetag}

{includetag(logging)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
Логтарды сүзгілеу үшін {linkto(#tab_search_filter_options)[text=%number-кестеде]} көрсетілген іздеу жолағындағы сүзгі параметрлерін пайдаланыңыз.

{caption({counter(table)[id=numb_tab_search_filter_options]} кесте — Іздеу сүзгілерінің параметрлері)[align=right;position=above;id=tab_search_filter_options;number={const(numb_tab_search_filter_options)}]}{/ifdef}
[cols="1,1,3,2", options="header"]
|===
|Параметр
|Пішім
|Сипаттама
|Мысал

|`message`
|`message: "значение"` 
|Хабарламаларында берілген мәндер бар жазбаларды іздеу. Әдепкі параметр болып табылады, сұрауда оны көрсетпеуге болады 
|`message: "Hello world!"`

|`timestamp`
|`timestamp <ОПЕРАТОР_СРАВНЕНИЯ> "<ЗНАЧЕНИЕ>"`
|Берілген уақыт аралығында жіберілген жазбаларды іздеу
|`timestamp >= "2022-04-10T00:00:00Z"`

|`level`
|`level <ОПЕРАТОР_СРАВНЕНИЯ> <ЗНАЧЕНИЕ>`
|Берілген логтау деңгейлері бар жазбаларды іздеу. Қолжетімді логтау деңгейлері — `DEBUG`, `INFO`, `WARN`, `ERROR`, `CRITICAL` 
|`level = INFO`

| `json_payload`
| `json_payload: <ЗНАЧЕНИЕ>`
| `json_payload` ішінде берілген мәндер бар жазбалар мәтіні бойынша іздеу. `json_payload` орнына `payload` қысқартуын пайдалануға болады
| `json_payload: warning`

| `json_payload.field.search`
| `json_payload.<ӨРІС>: <ЗНАЧЕНИЕ>`
| `json_payload` элементтері бойынша жазбаларды лексикографиялық іздеу. Егер түбірлік ағаш элементі параметрлердің ешқайсысымен сәйкес келмесе, `json_payload` префиксін көрсетпеуге болады. `json_payload` орнына `payload` қысқартуын пайдалануға болады.

`json_payload` ішінде элементтің бар-жоғын `EXISTS: json_payload.result EXISTS` операторы арқылы тексеруге болады. Мұндай сүзгі `json_payload` ішінде `result` элементі бар жазбаларды көрсетеді
| `json_payload.status: created`

{ifdef(private,private-pg,private-pdf,private-pg-pdf)}
|`stream_id`
|`stream_id: "<ИДЕНТИФИКАТОР_РЕСУРСА>"`
|Ресурс идентификаторы (ДБ, ВМ, Kubernetes кластері) бойынша іздеу
|`stream_id: "4dd2038a-2c88-45df-8e4d-64e0e1bfe82f"`
{/ifdef}

|===
{ifdef(private-pdf,private-pg-pdf,private-cert)}
{/caption}{/ifdef}
{/includetag}

Журналдағы жазбалар тізімін сүзгілеу үшін іздеу жолағында `<ИМЯ_ПАРАМЕТРА>`/`<ЗНАЧЕНИЕ_ПАРАМЕТРА>` жұптарын пайдаланыңыз. 

{note:info}
Егер іздеу жолағына параметр атауынсыз тек параметр мәні енгізілсе, жазбалар осы мәннің `message` параметріне енуі бойынша сүзіледі.
{/note}

{includetag(event-log)}
## {heading(Іздеу ерекшеліктері)[id=event-log-search-lang-prop]}
{/includetag}

{includetag(logging)}
## {heading(Іздеу ерекшеліктері)[id=logging-search-tools-prop]}
{/includetag}

1. Іздеу жолындағы `"`, `'` және `＼` таңбалары `＼` көмегімен экрандалады.
1. Мәнді тырнақшаға алмауға болады, егер ол:

    - латын әліпбиінің әрпінен басталып, тек латын әліпбиінің әріптерін, цифрларды және астын сызу таңбаларын қамтыса;
    - таңбасыз бүтін сан болса.

1. Уақыт мәндерінің пішімі: [RFC3339](https://www.ietf.org/rfc/rfc3339.txt).
   {includetag(event-log)}
1. Ендірілген объектілердегі барлық мәндер жолдар ретінде қарастырылады және лексикографиялық тәртіппен салыстырылады.
1. `:`, `=`, `<>` операторларының көмегімен массив-параметрлер бойынша іздеу қолдау көрсетіледі.
{/includetag}

{includetag(event-log)}
## {heading(Салыстыру операторлары)[id=event-log-search-lang-operators]}
{/includetag}

{includetag(logging)}
## {heading(Салыстыру операторлары)[id=logging-search-tools-operators]}
{/includetag}

{includetag(event-log)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
Салыстыру операторлары {linkto(#tab_comparison_operators_audit)[text=%number-кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_comparison_operators_audit]} кесте — Салыстыру операторлары)[align=right;position=above;id=tab_comparison_operators_audit;number={const(numb_tab_comparison_operators_audit)}]}{/ifdef}
{/includetag}
{includetag(logging)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
Салыстыру операторлары {linkto(#tab_comparison_operators)[text=%number-кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_comparison_operators]} кесте — Салыстыру операторлары)[align=right;position=above;id=tab_comparison_operators;number={const(numb_tab_comparison_operators)}]}{/ifdef}
{/includetag}
[cols="1,2,2", options="header"]
|===
|Оператор
|Сипаттама
|Мысал

|`=`
|Тең
|`message="ИСКОМЫЙ_ТЕКСТ"`

|`<>`
|Тең емес
|`message<>"ИСКОМЫЙ_ТЕКСТ"`

|`>`
|Артық
{includetag(event-log)}
|`severity > DEBUG`
{/includetag}
{includetag(logging)}
|`level > DEBUG`
{/includetag}

|`<`
| Аз
{includetag(event-log)}
|`severity < DEBUG`
{/includetag}
{includetag(logging)}
|`level < DEBUG`
{/includetag}

|`>=`
|Артық немесе тең
|`timestamp >= "2023-04-10T10:20:00Z"`

|`<=`
|Аз немесе тең
|`timestamp <= "2023-04-10T10:20:00Z"`

|`:`
|Қамтиды
|`message: "ИСКОМЫЙ_ТЕКСТ"`
|===
{ifdef(private-pdf,private-pg-pdf,private-cert)}
{/caption}{/ifdef}

{includetag(event-log)}
## {heading(Логикалық операторлар)[id=event-log-search-lang-filters]}
{/includetag}
{includetag(logging)}
## {heading(Логикалық операторлар)[id=logging-search-tools-filters]}
{/includetag}

{ifdef(public,private,private-pg)}
Бір сүзгіде бірнеше шартты логикалық операторлардың көмегімен біріктіруге болады.
{/ifdef}

{includetag(event-log)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
Бір сүзгіде бірнеше шартты логикалық операторлардың көмегімен біріктіруге болады ({linkto(#tab_logical_union_operators_audit)[text=%number-кесте]}).

{caption({counter(table)[id=numb_tab_logical_union_operators_audit]} кесте — Логикалық операторлар)[align=right;position=above;id=tab_logical_union_operators_audit;number={const(numb_tab_logical_union_operators_audit)}]}{/ifdef}
{/includetag}
{includetag(logging)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
Бір сүзгіде бірнеше шартты логикалық операторлардың көмегімен біріктіруге болады ({linkto(#tab_logical_union_operators)[text=%number-кесте]}).

{caption({counter(table)[id=numb_tab_logical_union_operators]} кесте — Логикалық операторлар)[align=right;position=above;id=tab_logical_union_operators;number={const(numb_tab_logical_union_operators)}]}{/ifdef}
{/includetag}
[cols="1,2,2", options="header"]
|===
|Оператор
|Сипаттама
|Мысал

|`AND`
|Барлық шарттарды қанағаттандырады
|`service_id=databases AND severity=ERROR`

|`OR`
|Кемінде бір шартты қанағаттандырады
|`severity=ERROR OR status.code=500`

|`NOT`
|Осы шартты қанағаттандырмайды
|`NOT message: hello`

|`EXIST`
|Жазба осы параметрді қамтиды
|`subject.metadata.email EXIST`
|===
{ifdef(private-pdf,private-pg-pdf,private-cert)}
{/caption}{/ifdef}

{includetag(event-log)}
## {heading(Есептеу тәртібі)[id=event-log-search-lang-order]}
{/includetag}
{includetag(logging)}
## {heading(Есептеу тәртібі)[id=logging-search-tools-order]}
{/includetag}

Белгілі бір есептеу тәртібін беру үшін жақшаларды пайдаланыңыз, мысалы:

```sql
ПАРАМЕТР_1: "ЗНАЧЕНИЕ_1" AND (ПАРАМЕТР_2 = "ЗНАЧЕНИЕ_2" OR ПАРАМЕТР_3 "ЗНАЧЕНИЕ_3")
```
Бұл мысалда `ПАРАМЕТР_1` параметрі `"ЗНАЧЕНИЕ_1"` ішкіжолын қамтитын және екі шарттың кемінде бірі орындалатын жазбалар табылады:

- `ПАРАМЕТР_2` параметрінің мәні `"ЗНАЧЕНИЕ_2"` мәніне тең.
- `ПАРАМЕТР_3` параметрінің мәні лексикографиялық мағынада `"ЗНАЧЕНИЕ_3"` мәнінен кіші.

{includetag(event-log)}
{ifdef(public)}
## {heading(Өрнек мысалдары)[id=event-log-search-lang-examples]}

[cols="1,1", options="header"]
|===
|Өрнек
|Іздеу нәтижесі

|`source.id=iam AND (subject.address="127.0.0.1" OR status.code=500)`
|`127.0.0.1` IP мекенжайы бар пайдаланушымен болған немесе 500 қате кодын тудырған IAM сервисінің барлық оқиғалары

|`severity=CRITICAL AND subject.metadata.email: "@example.ru"`
|`example.ru` пошта домені бар пайдаланушыларда болған барлық сыни оқиғалар

|`timestamp > "2023-06-02T15:04:05Z03:00" AND source.address="127.0.0.1" AND resource.metadata.stream_id="2278584446"`
|`127.0.0.1` IP мекенжайы бойынша `2278584446` атауы бар объектіде 2023 жылғы 2 маусымда 15:04:05-тен кейін болған барлық оқиғалар. Уақыт UTC+3 уақыт белдеуі үшін көрсетілген
|===
{/ifdef}
{/includetag}
