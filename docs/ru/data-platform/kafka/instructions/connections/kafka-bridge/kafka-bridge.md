# {heading(Kafka Bridge)[id=kafka_connect-bridge]}

Kafka Bridge — компонент Cloud Kafka, который предоставляет REST API для отправки и чтения сообщений в топиках по HTTP.

## {heading(Подготовка к подключению)[id=kafka_connect-bridge-preparation]}

1. Включите Kafka Bridge одним из способов:

   - при {linkto(../../create#kafka_create)[text=создании экземпляра сервиса]} на шаге **Параметры** в блоке дополнительных компонентов;
   - при {linkto(../../management#kafka_scaling)[text=горизонтальном масштабировании]} уже созданного экземпляра.

1. Настройте доступ Kafka Bridge к нужным топикам для отправки и чтения сообщений. Для этого {linkto(../../management#kafka_config)[text=отредактируйте]} следующие параметры:

   - `Список топиков, доступных через Kafka Bridge`: укажите топик или список топиков, к которым компонент получит доступ. Перечисляйте топики через запятую без пробелов. По умолчанию список пустой;
   - `Разрешенные операции с топиками через Kafka Bridge`: выберите операции, которые компонент сможет выполнять с топиками из списка:

      - `All`: чтение и запись;
      - `Read`: только чтение;
      - `Write`: только запись (значение по умолчанию).


## {heading(Подключение)[id=kafka_connect-bridge-connect]}

{ifdef(public)}
1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет {var(cloud)}.
{/ifdef}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на название экземпляра сервиса.
1. Скопируйте на вкладке **Общая информация** строку подключения:

   - **Строка подключения для Kafka Bridge** — для подключения вне кластера {var(data-p)};
   - **Строка подключения для Kafka Bridge (internal)** — для подключения внутри кластера {var(data-p)}.

1. Откройте терминал и задайте переменную окружения с адресом Kafka Bridge:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   export BRIDGE_URL="<АДРЕС_KAFKA_BRIDGE>"
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   $env:BRIDGE_URL = "<АДРЕС_KAFKA_BRIDGE>"
   ```

   {/tab}

   {/tabs}

   Здесь `<АДРЕС_KAFKA_BRIDGE>`: скопированная строка подключения целиком, включая протокол и порт.

1. Проверьте, запущен ли Kafka Bridge, выполнив запрос к его адресу с путем `/healthy`:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   curl -i "${BRIDGE_URL}/healthy"
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   curl.exe -i "${env:BRIDGE_URL}/healthy"
   ```

   {/tab}

   {/tabs}

   Ответ `200 OK` означает, что Kafka Bridge запущен.

1. Проверьте, какие топики доступны Kafka Bridge:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   curl -i "${BRIDGE_URL}/topics"
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   curl.exe -i "${env:BRIDGE_URL}/topics"
   ```

   {/tab}

   {/tabs}

   Ответ с кодом `200 OK` и списком топиков, в том числе пустым, подтверждает доступ к REST API Kafka Bridge.

Методы и параметры REST API описаны в [официальной документации Strimzi Kafka Bridge](https://strimzi.io/docs/bridge/latest/#api_reference-bridge).
