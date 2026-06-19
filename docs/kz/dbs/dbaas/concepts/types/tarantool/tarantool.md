# {heading(Tarantool)[id=dbaas-concepts-tarantool]}

{include(/kz/_includes/_translated_by_ai.md)}

[Tarantool](https://www.tarantool.io/ru/) — бұл in-memory есептеулер платформасы, оның құрамына NoSQL түріндегі СУБД және ендірілген Lua қолданбалар сервері кіреді.

Tarantool-дың негізгі артықшылықтары:

- жазу жүктемесіне төзімділік;
- сұрау кідірісінің болжамдылығы;
- кейінге қалдырылған жазумен кэштеу.

Tarantool мынадай жүйелерді құру міндеттері үшін жақсы қолайлы:

- жоғары жүктемелі жүйелер мен OLTP-жүйелер;
- деректерге арналған кэштеуші прокси;
- жылдам кезек брокері.

Келесі конфигурациялар қолжетімді:

- Single.
- Кластер.
- Enterprise (сұраныс бойынша): қосымша проприетарлық модульдері және ресми қолдауы бар кластер.
- Data Grid (сұраныс бойынша): күрделі бизнес-объектілерді сақтау және талдау жүйелерін құруға арналған кластер.

Single және Кластер конфигурациялары үшін бастапқы коды ашық Tarantool редакциясы — [Community Edition](https://www.tarantool.io/ru/doc/latest/) пайдаланылады.

Enterprise конфигурациясы үшін [Tarantool Enterprise Edition](https://www.tarantool.io/ru/enterprise_doc/) пайдаланылады,
ал Data Grid конфигурациясы үшін — [Tarantool Data Grid](https://www.tarantool.io/ru/datagrid/) деректерді интеграциялау жүйесі.

## {heading(Әрі қарай не істеу керек?)[id=dbaas-concepts-tarantool-whats-next]}

- СУБД инстансын {linkto(../../../instructions/create#dbaas-create)[text=құрыңыз]}.
- СУБД-ға {linkto(../../../connect#dbaas-connect)[text=қосылыңыз]}.
