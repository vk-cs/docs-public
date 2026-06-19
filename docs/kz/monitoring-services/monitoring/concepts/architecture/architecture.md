# {heading(Сервис архитектурасы)[id=monitoring-architecture]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Тұжырымдамалар)[id=monitoring-architecture-concepts]}

Cloud Monitoring сервисі бірнеше бөліктен тұрады:

- Метрикаларды қабылдауға арналған масштабталатын API.
- Метрикалардың үлестірілген қоймасы.
- Метрика мәндерін оқуға және сұрау құруға арналған масштабталатын API.
- Стандартты метрикаларды жіберуге арналған агенттер.
- Дашбордтар мен графиктерді құру мүмкіндігі бар пайдаланушы интерфейсі.
- Мониторинг агенттерін орталықтандырылған түрде жаңарту сервисі.

## {heading(Атаулар кеңістіктері (namespace))[id=monitoring-namespace]}

Әр сервис деректерді өз атаулар кеңістігіне жазады. {var(cloud)} сервистері қалыптастыратын атаулар кеңістіктерінің стандартты атаулары `mcs/servicename` түрінде болады. Егер пайдаланушы метрикаларын жазу қажет болса, атаулар кеңістігінің атауы `mcs/` таңбаларынан басталмауы керек.

#### {heading(Стандартты атаулар кеңістіктері)[id=monitoring-standard-namespace]}

{ifdef(public)}
[cols="1,1", options="header"]
|===
|Сервис атауы
|Атаулар кеңістігінің атауы

|Cloud Servers
|`mcs/vm`

|Cloud Networks
|`mcs/network`

|{var(s3)}
|`mcs/cloudstorage`

|Cloud Containers
|`mcs/containers`

|Cloud Databases
|`mcs/databases`

|SQS
|`mcs/managedqueue`

|Marketplace
|`mcs/marketplace`

|CDN
|`mcs/cdn`

|Arenadata DB as a Service
|`mcs/dwh`

|Cloud Monitoring
|`mcs/monitoring`
|===
{/ifdef}

{ifdef(private-pdf,private-pg-pdf)}
{var(cloud)} жүйесінде пайдаланылатын атаулар кеңістіктерінің стандартты атаулары {linkto(#tab_comparison_operators)[text=%number кестесінде]} берілген.

<!--- //todo Таблицу ниже необходимо актуализировать для релиза 4.3 -->

{caption(Кесте {counter(table)[id=numb_tab_comparison_operators]} — Ресурстарға арналған атаулар кеңістіктері)[align=right;position=above;id=tab_comparison_operators;number={const(numb_tab_comparison_operators)}]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}
[cols="1,1", options="header"]
|===
|Ресурс атауы
|Атаулар кеңістігінің атауы

|Виртуалды машиналар
|`mcs/vm`

|Дерекқорлар
|`mcs/dbaas`

|Kubernetes кластерлері
|`mcs/kubernetes`

|Резервтік көшірмелер
|`mcs/backup`

|Қолданбалар дүкені
|`mcs/marketplace`
|===
{/ifdef}{ifdef(private-pdf,private-pg-pdf)}
{/caption}{/ifdef}
{ifdef(private,private-pg,private-pdf,private-pg-pdf)}
Атаулар кеңістігі үшінші тарап жүйесін {var(cloud)} жүйесімен интеграциялау процесінде беріледі.

{note:info}
Егер жоқ атаулар кеңістігінің атауы көрсетілсе, ресурс үшін параметрлер болмағандықтан графикті құру мүмкін болмайды.
{/note}

{/ifdef}

## {heading(Белгілер (label))[id=monitoring-label]}

Белгілерде мақсатты ресурсты сәйкестендіре алатын қосымша метаақпарат беріледі, мысалы, ВМ үшін бұл ВМ атауы немесе идентификаторы болуы мүмкін.

Қоймаға жіберілетін әрбір метрика үшін еркін белгілер жиынын, яғни кілт/мән жұптарын, көрсетуге болады. Мысалы, `cpu_total` метрикасының мәнімен бірге виртуалды машинаның хост атауын және ол орналасқан қолжетімділік аймағының атауын бергіңіз келсе, онда `host` және `availability_zone` белгілері үшін мәндерді толтыруыңыз қажет.

Берілген белгілер мен олардың мәндері Cloud Monitoring дерекқорында сақталады. Бірдей метриканың мәндері 1 минут, 5 минут және 1 сағат кезеңдерінің дәлдігімен автоматты түрде агрегатталады. Агрегаттау метрика мәні сақталған белгілердің барлық өрістері бойынша орындалады.

Бұдан әрі белгілердің кілттері мен мәндерін метрика мәндерін сүзетін және топтайтын сұрауларды құру үшін пайдалануға болады. Мысалы, PromQL түріндегі пішімде мынадай сұрауды құруға болады:

```promql
SUM BY(host) (cpu:Minimum{instance="<"span >"server1", app!="<"span >"system"})
```

```promql
SUM BY(job) (cpu:Average{host="<"span >"server1", job!="<"span >"system"}[12h] offset 24h)
```

## {heading(Агрегаттау)[id=monitoring-aggregation]}

Агрегаттау процесінің негізгі сипаттамалары:

- Cloud Monitoring метрика мәндерін 1 минут, 5 минут және 1 сағат интервалдары бойынша автоматты түрде агрегаттайды.
- Метрикалардың бастапқы мәндері агрегаттаудан кейін автоматты түрде жойылады.
- Әдепкі бойынша келесі агрегаттау функцияларына қолдау көрсетіледі:

  - минимум,
  - максимум,
  - орташа мән.

- Агрегаттау метрика мәні сақталған белгілердің барлық өрістері бойынша орындалады.
- Агрегатталған метрикалар 30 күн бойы сақталады.
- Пайдаланушы қажетті белгі мәндері бойынша сүзгілеп, агрегатталған метрикалардың мәндерін ала алады.

## {heading(Өлшем бірліктері)[id=monitoring-units-of-measurement]}

Cloud Monitoring жүйесінде беруге және олар бойынша агрегаттауға болатын стандартты өлшем бірліктері бар:

`Seconds`, `Microseconds`, `Milliseconds`, `Bytes`, `Kilobytes`, `Megabytes`, `Gigabytes`, `Terabytes`, `Bits`, `Kilobits`, `Megabits`, `Gigabits`, `Terabits`, `Percent`, `Count`, `Bytes/Second`, `Kilobytes/Second`, `Megabytes/Second`, `Gigabytes/Second`, `Terabytes/Second`, `Bits/Second`, `Kilobits/Second`, `Megabits/Second`, `Gigabits/Second`, `Terabits/Second`, `Count/Second`, `None`

Егер өлшем бірлігі көрсетілмесе, `None` пайдаланылады.
