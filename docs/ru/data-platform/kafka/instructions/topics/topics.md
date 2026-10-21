# {heading(Управление топиками через Kafka CLI)[id=kafka_topics]}

С помощью Kafka CLI можно создать топик Cloud Kafka, посмотреть его параметры, изменить настройки и удалить топик.

Доступные действия с топиками зависят от роли, которую назначают пользователю Cloud Kafka при {linkto(../create#kafka_create)[text=создании экземпляра]} или {linkto(../management#kafka_user-add)[text=добавлении учетной записи]}:

- `Владелец кластера`: может {linkto(#kafka_topics_create)[text=создавать топики]}, {linkto(#kafka_topics_view)[text=просматривать их параметры]}, {linkto(#kafka_topics_partitions)[text=увеличивать количество партиций]}, {linkto(#kafka_topics_retention)[text=изменять срок хранения сообщений]} и {linkto(#kafka_topics_delete)[text=удалять топики]}.
- `Стандартный пользователь`: может {linkto(#kafka_topics_create)[text=создавать топики]}, {linkto(#kafka_topics_view)[text=просматривать их параметры]}, {linkto(#kafka_topics_partitions)[text=увеличивать количество партиций]}, {linkto(#kafka_topics_retention)[text=изменять срок хранения сообщений]} и {linkto(#kafka_topics_delete)[text=удалять топики]}.
- `Наблюдатель` и `Аудитор безопасности`: могут {linkto(#kafka_topics_view)[text=просматривать список топиков и их параметры]}.

## {heading(Создание топика)[id=kafka_topics_create]}

1. {linkto(../connect#kafka_connect-kafka-cli)[text=Подключитесь]} к экземпляру сервиса через Kafka CLI.
1. Создайте топик с нужным количеством партиций и фактором репликации:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-topics" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --create \
       --topic <ИМЯ_ТОПИКА> \
       --partitions <КОЛИЧЕСТВО_ПАРТИЦИЙ> \
       --replication-factor <ФАКТОР_РЕПЛИКАЦИИ>
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --create `
       --topic <ИМЯ_ТОПИКА> `
       --partitions <КОЛИЧЕСТВО_ПАРТИЦИЙ> `
       --replication-factor <ФАКТОР_РЕПЛИКАЦИИ>
   ```

   {/tab}

   {/tabs}

   Здесь:

   - `<ИМЯ_ТОПИКА>` — имя создаваемого топика, например `test-topic`.
   - `<КОЛИЧЕСТВО_ПАРТИЦИЙ>` — нужное количество партиций.
   - `<ФАКТОР_РЕПЛИКАЦИИ>` — количество копий каждой партиции. Значение не может превышать количество узлов-брокеров в экземпляре сервиса. Их количество можно {linkto(../management#kafka_view)[text=посмотреть]} на вкладке **Архитектура** страницы экземпляра сервиса.

   После создания топика в терминале появится сообщение: `Created topic <ИМЯ_ТОПИКА>.`.

1. {linkto(#kafka_topics_view)[text=Проверьте]}, что топик появился в списке.

## {heading(Просмотр топиков и их параметров)[id=kafka_topics_view]}

1. {linkto(../connect#kafka_connect-kafka-cli)[text=Подключитесь]} к экземпляру сервиса через Kafka CLI.
1. Получите список топиков:

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

1. Посмотрите параметры нужного топика:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-topics" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --describe \
       --topic <ИМЯ_ТОПИКА>
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --describe `
       --topic <ИМЯ_ТОПИКА>
   ```

   {/tab}

   {/tabs}

   Здесь `<ИМЯ_ТОПИКА>` — имя топика из полученного списка.

    В выводе отобразится количество партиций, фактор репликации, конфигурация топика и информация о каждой партиции.

## {heading(Увеличение количества партиций)[id=kafka_topics_partitions]}

{note:warn}
Количество партиций нельзя уменьшить.
{/note}

Если сообщения распределяются по ключу, увеличение числа партиций может изменить распределение новых сообщений и порядок их обработки. Существующие сообщения останутся в прежних партициях.

1. {linkto(../connect#kafka_connect-kafka-cli)[text=Подключитесь]} к экземпляру сервиса через Kafka CLI.
1. Посмотрите текущее количество партиций топика:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-topics" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --describe \
       --topic <ИМЯ_ТОПИКА>
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --describe `
       --topic <ИМЯ_ТОПИКА>
   ```

   {/tab}

   {/tabs}

   Здесь `<ИМЯ_ТОПИКА>` — имя изменяемого топика.

   Текущее количество партиций будет указано в поле `PartitionCount`.

1. Укажите новое общее количество партиций, которое больше текущего:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-topics" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --alter \
       --topic <ИМЯ_ТОПИКА> \
       --partitions <НОВОЕ_КОЛИЧЕСТВО_ПАРТИЦИЙ>
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --alter `
       --topic <ИМЯ_ТОПИКА> `
       --partitions <НОВОЕ_КОЛИЧЕСТВО_ПАРТИЦИЙ>
   ```

   {/tab}

   {/tabs}

   Здесь `<НОВОЕ_КОЛИЧЕСТВО_ПАРТИЦИЙ>` — общее количество партиций после изменения.

1. Проверьте, что значение `PartitionCount` совпадает с указанным новым количеством:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-topics" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --describe \
       --topic <ИМЯ_ТОПИКА>
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --describe `
       --topic <ИМЯ_ТОПИКА>
   ```

   {/tab}

   {/tabs}

## {heading(Изменение срока хранения сообщений)[id=kafka_topics_retention]}

Параметр `retention.ms` задает срок хранения сообщений в миллисекундах, если `cleanup.policy` имеет значение `delete` или `delete,compact`. По умолчанию в Cloud Kafka используется `delete`, а срок хранения не ограничен (`retention.ms=-1`).

{note:warn}
Сокращение срока хранения может привести к удалению ранее записанных сообщений. Kafka удаляет их вместе с сегментами журнала, поэтому удаление происходит не сразу.
{/note}

1. {linkto(../connect#kafka_connect-kafka-cli)[text=Подключитесь]} к экземпляру сервиса через Kafka CLI.
1. Установите нужный срок хранения сообщений:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-configs" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --alter \
       --entity-type topics \
       --entity-name <ИМЯ_ТОПИКА> \
       --add-config retention.ms=<СРОК_ХРАНЕНИЯ_МС>
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-configs.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --alter `
       --entity-type topics `
       --entity-name <ИМЯ_ТОПИКА> `
       --add-config retention.ms=<СРОК_ХРАНЕНИЯ_МС>
   ```

   {/tab}

   {/tabs}

   Здесь:

   - `<ИМЯ_ТОПИКА>` — имя изменяемого топика.
   - `<СРОК_ХРАНЕНИЯ_МС>` — срок хранения сообщений в миллисекундах. Например, `86400000` — одни сутки.

   После изменения срока хранения в терминале появится сообщение: `Completed updating config for topic <ИМЯ_ТОПИКА>`.
1. Проверьте значение параметра:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-configs" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --describe \
       --entity-type topics \
       --entity-name <ИМЯ_ТОПИКА>
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-configs.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --describe `
       --entity-type topics `
       --entity-name <ИМЯ_ТОПИКА>
   ```

   {/tab}

   {/tabs}

   В выводе значение `retention.ms` должно совпадать с указанным сроком хранения.

## {heading(Удаление топика)[id=kafka_topics_delete]}

{note:warn}
Перед удалением убедитесь, что топик больше не нужен приложениям. При удалении топика хранящиеся в нем сообщения будут потеряны.
{/note}

1. {linkto(../connect#kafka_connect-kafka-cli)[text=Подключитесь]} к экземпляру сервиса через Kafka CLI.
1. Удалите топик:

   {tabs}

   {tab(Linux/macOS)}

   ```bash
   "${K_CLI_BASE}/kafka-topics" \
       --command-config "${K_CONFIG}" \
       --bootstrap-server "${K_BOOTSTRAP}" \
       --delete \
       --topic <ИМЯ_ТОПИКА>
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   & "$env:K_CLI_BASE\kafka-topics.bat" `
       --command-config "$env:K_CONFIG" `
       --bootstrap-server "$env:K_BOOTSTRAP" `
       --delete `
       --topic <ИМЯ_ТОПИКА>
   ```

   {/tab}

   {/tabs}

   Здесь `<ИМЯ_ТОПИКА>` — имя удаляемого топика.
1. Получите список топиков и проверьте, что удаленного топика в нем нет:

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
