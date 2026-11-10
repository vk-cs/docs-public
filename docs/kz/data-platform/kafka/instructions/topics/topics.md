# {heading(Kafka CLI арқылы тақырыптарды басқару)[id=kafka_topics]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

Kafka CLI көмегімен Cloud Kafka тақырыбын (topic) жасауға, оның параметрлерін көруге, параметрлерін өзгертуге және тақырыпты жоюға болады.

Тақырыптармен қолжетімді әрекеттер {linkto(../create#kafka_create)[text=экземпляр жасау]} кезінде немесе {linkto(../management#kafka_user-add)[text=тіркелгі қосу]} кезінде Cloud Kafka пайдаланушысына тағайындалатын рөлге байланысты:

- `Кластер иесі`: {linkto(#kafka_topics_create)[text=тақырыптар жасай алады]}, {linkto(#kafka_topics_view)[text=олардың параметрлерін көре алады]}, {linkto(#kafka_topics_partitions)[text=партиялар санын ұлғайта алады]}, {linkto(#kafka_topics_retention)[text=хабарламаларды сақтау мерзімін өзгерте алады]} және {linkto(#kafka_topics_delete)[text=тақырыптарды жоя алады]}.
- `Стандартты пайдаланушы`: {linkto(#kafka_topics_create)[text=тақырыптар жасай алады]}, {linkto(#kafka_topics_view)[text=олардың параметрлерін көре алады]}, {linkto(#kafka_topics_partitions)[text=партиялар санын ұлғайта алады]}, {linkto(#kafka_topics_retention)[text=хабарламаларды сақтау мерзімін өзгерте алады]} және {linkto(#kafka_topics_delete)[text=тақырыптарды жоя алады]}.
- `Бақылаушы` және `Қауіпсіздік аудиторы`: {linkto(#kafka_topics_view)[text=тақырыптар тізімін және олардың параметрлерін көре алады]}.

## {heading(Тақырып жасау)[id=kafka_topics_create]}

1. Сервис экземплярына Kafka CLI арқылы {linkto(../connect#kafka_connect-kafka-cli)[text=қосылыңыз]}.
1. Қажетті партиялар саны және репликация факторы бар тақырып жасаңыз:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-topics" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --create \
       --topic <ТАҚЫРЫП_АТАУЫ> \
       --partitions <ПАРТИЯЛАР_САНЫ> \
       --replication-factor <РЕПЛИКАЦИЯ_ФАКТОРЫ>
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --create `
       --topic <ТАҚЫРЫП_АТАУЫ> `
       --partitions <ПАРТИЯЛАР_САНЫ> `
       --replication-factor <РЕПЛИКАЦИЯ_ФАКТОРЫ>
   ```

   {/tab}

   {/tabs}

   Мұнда:

   - `<ТАҚЫРЫП_АТАУЫ>` — жасалатын тақырыптың атауы, мысалы `test-topic`.
   - `<ПАРТИЯЛАР_САНЫ>` — қажетті партиялар саны.
   - `<РЕПЛИКАЦИЯ_ФАКТОРЫ>` — әр партияның көшірмелерінің саны. Мән сервис экземплярындағы брокер-түйіндердің санынан аспауы керек. Олардың санын сервис экземпляры бетіндегі **Архитектура** қойыншасынан {linkto(../management#kafka_view)[text=көруге]} болады.

   Тақырып жасалғаннан кейін терминалда хабарлама пайда болады: `Created topic <ТАҚЫРЫП_АТАУЫ>.`.

1. Тақырып тізімде пайда болғанын {linkto(#kafka_topics_view)[text=тексеріңіз]}.

## {heading(Тақырыптарды және олардың параметрлерін көру)[id=kafka_topics_view]}

1. Сервис экземплярына Kafka CLI арқылы {linkto(../connect#kafka_connect-kafka-cli)[text=қосылыңыз]}.
1. Тақырыптар тізімін алыңыз:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-topics" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --list
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --list
   ```

   {/tab}

   {/tabs}

1. Қажетті тақырыптың параметрлерін көріңіз:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-topics" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --describe \
       --topic <ТАҚЫРЫП_АТАУЫ>
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --describe `
       --topic <ТАҚЫРЫП_АТАУЫ>
   ```

   {/tab}

   {/tabs}

   Мұнда `<ТАҚЫРЫП_АТАУЫ>` — алынған тізімдегі тақырыптың атауы.

    Шығуда партиялар саны, репликация факторы, тақырыптың конфигурациясы және әр партия туралы ақпарат көрсетіледі.

## {heading(Партиялар санын ұлғайту)[id=kafka_topics_partitions]}

{note:warn}
Партиялар санын азайтуға болмайды.
{/note}

Хабарламалар кілт бойынша таратылса, партиялар санын ұлғайту жаңа хабарламалардың таралуын және оларды өңдеу ретін өзгертуі мүмкін. Бар хабарламалар бұрынғы партияларда қалады.

1. Сервис экземплярына Kafka CLI арқылы {linkto(../connect#kafka_connect-kafka-cli)[text=қосылыңыз]}.
1. Тақырыптың ағымдағы партиялар санын көріңіз:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-topics" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --describe \
       --topic <ТАҚЫРЫП_АТАУЫ>
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --describe `
       --topic <ТАҚЫРЫП_АТАУЫ>
   ```

   {/tab}

   {/tabs}

   Мұнда `<ТАҚЫРЫП_АТАУЫ>` — өзгертілетін тақырыптың атауы.

   Ағымдағы партиялар саны `PartitionCount` өрісінде көрсетіледі.

1. Ағымдағыдан үлкен жаңа жалпы партиялар санын көрсетіңіз:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-topics" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --alter \
       --topic <ТАҚЫРЫП_АТАУЫ> \
       --partitions <ЖАҢА_ПАРТИЯЛАР_САНЫ>
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --alter `
       --topic <ТАҚЫРЫП_АТАУЫ> `
       --partitions <ЖАҢА_ПАРТИЯЛАР_САНЫ>
   ```

   {/tab}

   {/tabs}

   Мұнда `<ЖАҢА_ПАРТИЯЛАР_САНЫ>` — өзгертуден кейінгі жалпы партиялар саны.

1. `PartitionCount` мәні көрсетілген жаңа санына сәйкес келетінін тексеріңіз:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-topics" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --describe \
       --topic <ТАҚЫРЫП_АТАУЫ>
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --describe `
       --topic <ТАҚЫРЫП_АТАУЫ>
   ```

   {/tab}

   {/tabs}

## {heading(Хабарламаларды сақтау мерзімін өзгерту)[id=kafka_topics_retention]}

`retention.ms` параметрі `cleanup.policy` мәні `delete` немесе `delete,compact` болған жағдайда хабарламаларды сақтау мерзімін миллисекундымен анықтайды. Әдепкі бойынша Cloud Kafka-да `delete` қолданылады, ал сақтау мерзімі шектелмеген (`retention.ms=-1`).

{note:warn}
Сақтау мерзімін қысқарту бұрын жазылған хабарламалардың жойылуына әкелуі мүмкін. Kafka оларды журнал сегменттерімен бірге жояды, сондықтан жою бірден жүзеге асады.
{/note}

1. Сервис экземплярына Kafka CLI арқылы {linkto(../connect#kafka_connect-kafka-cli)[text=қосылыңыз]}.
1. Қажетті хабарламаларды сақтау мерзімін орнатыңыз:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-configs" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --alter \
       --entity-type topics \
       --entity-name <ТАҚЫРЫП_АТАУЫ> \
       --add-config retention.ms=<САҚТАУ_МЕРЗІМІ_МС>
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-configs.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --alter `
       --entity-type topics `
       --entity-name <ТАҚЫРЫП_АТАУЫ> `
       --add-config retention.ms=<САҚТАУ_МЕРЗІМІ_МС>
   ```

   {/tab}

   {/tabs}

   Мұнда:

   - `<ТАҚЫРЫП_АТАУЫ>` — өзгертілетін тақырыптың атауы.
   - `<САҚТАУ_МЕРЗІМІ_МС>` — хабарламаларды сақтау мерзімі миллисекундымен. Мысалы, `86400000` — бір тәулік.

   Сақтау мерзімін өзгерткеннен кейін терминалда хабарлама пайда болады: `Completed updating config for topic <ТАҚЫРЫП_АТАУЫ>`.
1. Параметрдің мәнін тексеріңіз:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-configs" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --describe \
       --entity-type topics \
       --entity-name <ТАҚЫРЫП_АТАУЫ>
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-configs.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --describe `
       --entity-type topics `
       --entity-name <ТАҚЫРЫП_АТАУЫ>
   ```

   {/tab}

   {/tabs}

   Шығуда `retention.ms` мәні көрсетілген сақтау мерзіміне сәйкес келуі керек.

## {heading(Тақырыпты жою)[id=kafka_topics_delete]}

{note:warn}
Жою алдында тақырып қосымшаларға енді қажет еместігіне көз жеткізіңіз. Тақырыпты жою кезінде онда сақталған хабарламалар жоғалады.
{/note}

1. Сервис экземплярына Kafka CLI арқылы {linkto(../connect#kafka_connect-kafka-cli)[text=қосылыңыз]}.
1. Тақырыпты жойыңыз:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-topics" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --delete \
       --topic <ТАҚЫРЫП_АТАУЫ>
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --delete `
       --topic <ТАҚЫРЫП_АТАУЫ>
   ```

   {/tab}

   {/tabs}

   Мұнда `<ТАҚЫРЫП_АТАУЫ>` — жойылатын тақырыптың атауы.
1. Тақырыптар тізімін алыңыз және жойылған тақырыптың онда жоқ екенін тексеріңіз:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-topics" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --list
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --list
   ```

   {/tab}

   {/tabs}