A quick start will help you get started with the service and get acquainted with its capabilities.

After completing all the steps of a quick start, you will:

1. Create a driver and a device template.
1. Create a new device in the structure.
1. Create an agent template and the agent itself.
1. Authorize the agent to work with the created device.
1. Connect the device emulator to the IoT Platform.
1. Configure data export to VK Cloud object storage.

## 1. Preparation

1. [Register](../registration) to IoT Platform. Make sure that you have access to the IoT personal account.
1. [Download](https://github.com/vk-cs/iot-emulators/releases) the IoT device emulator for your OS. Unpack the downloaded archive if necessary.
1. Configure the object storage:

    1. [Create](/ru/base/s3/quick-start/create-bucket) the `s3_exporter` backet.
    1. [Configure](/ru/base/s3/access-management/s3-account) S3 the account.
    1. Save the generated `Access Key ID` and `Secret Key` for the created account.

## 2. Create the emulator driver

1. Go to **Драйверы** IoT Platform [personal account](https://iot.mcs.mail.ru/).
1. Click the **Добавить драйвер** button.
1. Fill in the fields in the form that appears:

   - **Название**: `Emulator Driver`.
   - **Идентификатор**: `emulatorDriver`.
   - **Протокол**: `embedded`.

1. Click the **Следующий шаг** button.
1. Click the **Добавить параметр** at the **Параметры События** subchapter. This parameter will control the frequency of sensor polling by the agent at the device. Fill in the fields in the form that appears and click the **Сохранить** button:

   - **Название**: `event_scrape_interval`.
   - **Тип значения**: `duration`.
   - **Обязательный параметр**: `Да`.
   - **Значение по умолчанию**: `30s`.

1. Click the **Добавить параметр** at the **Параметры Состояния** subchapter. This parameter will control the frequency of the agent polling switches at the device. Fill in the fields in the form that appears and click the **Сохранить** button:

   - **Название**: `state_scrape_interval`.
   - **Тип значения**: `duration`.
   - **Обязательный параметр**: `Да`.
   - **Значение по умолчанию**: `30s`.

1. Click the **Сохранить** button at the bottom of the page.

## 3. Create the device template

1. Go to **Шаблоны устройств** IoT Platform [personal account](https://iot.mcs.mail.ru/).
1. Click the **Добавить шаблон**.
1. Fill the fields:

   - **Название шаблона**: `Emulator Template`.
   - **Идентификатор**: `emulatorTemplate`.

1. Click the **Следующий шаг** button.
1. Select the `Emulator Driver` in the **Драйвер** field.
1. Click the **Следующий шаг** button.
1. Skip adding device parameters and click the **Следующий шаг** button.

   <info>

   The **Дерево устройства**page will open. Sensors will be used as part of the quick start:

   - temperature sensor;
   - humidity sensor;
   - indoor lighting switch.

   </info>

1. Open the menu to the right of the line **Корневой узел шаблона** and select **Добавить датчик**.
1. Fill the fields:

   - **Название**: `Temperature sensor`.
   - **Идентификатор**: `temperature`.
   - **Тип датчика**: `Событие`.
   - **Ед. измерения**: `С`.
   - **Тип значения**: `float`.
   - **Автосохранение в оперативное хранилище**: mark an option.
   - **Автосохранение в долговременное хранилище**: mark an option.
   - **Родительский тег**: `Корневой узел шаблона`.
   - **Параметры драйвера**: leave it unchanged.

    Click the **Сохранить** button.

1. Repeat the step of creating a sensor for the humidity sensor, specifying the parameters:

    - **Название**: `Humidity sensor`.
    - **Идентификатор**: `humidity`.
    - **Тип датчика**: `Событие`.
    - **Ед. измерения**: `%`.
    - **Тип значения**: `float`.
    - **Автосохранение в оперативное хранилище**: mark an option.
    - **Автосохранение в долговременное хранилище**: mark an option.
    - **Родительский тег**: `Корневой узел шаблона`.
    - **Параметры драйвера**: leave it unchanged.

    Click the **Сохранить** button.

1. Repeat the step of creating a sensor for the light switch, specifying the parameters:

    - **Название**: `Indoor lighting switch`.
    - **Идентификатор**: `light`.
    - **Тип датчика**: `Состояние`.
    - **Ед. измерения**: leave it unchanged.
    - **Тип значения**: `boolean`.
    - **Автосохранение в цифровой двойник**: mark an option.
    - **Родительский тег**: Корневой узел шаблона.
    - **Параметры драйвера**: leave it unchanged.

    Click the **Сохранить** button.

1. Click the **Сохранить** button up the list.

## 4. Create a device instance

1. Go to **Устройства** IoT Platform [personal account](https://iot.mcs.mail.ru/).
1. Click the **Добавить устройство**.
1. Fill the fields:

   - **Название**: `Emulator`.
   - **Идентификатор**: `emulator`.
   - **Шаблон устройства**: `Emulator Template`.
   - **Агент**: `Без агента`.

1. Click the **Следующий шаг** button.
1. Fill the fields:

   - **Название тега**: `Emulator`.
   - **Идентификатор тега**: `emulator`.
   - **Родительский узел**: `Корень проекта`.

1. Click the **Следующий шаг** button.
1. Repeat the next step.
1. Click the **Сохранить** button.

## 5. Crete the agent template

1. Go to **Шаблоны агентов** IoT Platform [personal account](https://iot.mcs.mail.ru/).
1. Click the **Добавить шаблон** button.
1. Fill the fields:

    - **Название**: `Agent Template`.
    - **Идентификатор**: `agentTemplate`.
    - **Поддерживаемые драйверы**: `Emulator Driver`.

1. Click the **Добавить** button.

## 6. Create and configure the agent

1. Go to **Агенты** IoT Platform [personal account](https://iot.mcs.mail.ru/).
1. Click the **Добавить агент** button.
1. Fill the fields:

   - **Название**: `Emulator Agent`.
   - **Идентификатор**: `emulatorAgent`.
   - **Шаблон**: `Agent Template`.

1. Click the **Сохранить** button.
1. Go to **Устройства**.
1. Click on the device **Эмулятор** in the common list.
1. Click the **Редактировать** button.
1. Choose the option `Emulator Agent` at the **Агент** field.
1. Click the **Следующий шаг** button.
1. Click the **Сохранить** button.

## 7. Connect the device

1. Go to **Агенты** IoT Platform [personal account](https://iot.mcs.mail.ru/).
1. Click on the agent **Агент для эмулятора** in the common list.
1. Click on the **Авторизационные данные** tab.
1. Copy the username and password from the fields of the same name.
1. Open the terminal or command line of your OS.
1. Go to the directory with the unpacked archive with the emulator.
1. Run the command:

    <tabs>
    <tablist>
    <tab>MacOS</tab>
    <tab>Linux</tab>
    <tab>Windows</tab>
    </tablist>
    <tabpanel>

    ```bash
    ./bin/darwin_amd64/starting_guide -login <copied agent login> -password <agent password>
    ```

    </tabpanel>
    <tabpanel>

    ```bash
    ./bin/linux_amd64/starting_guide -login <copied agent login> -password <agent password>
    ```

    </tabpanel>
    <tabpanel>

    ```bash
    bin\windows_amd64\starting_guide.exe -login <copied agent login> -password <agent password>
    ```

    </tabpanel>
    </tabs>

1. Make sure that the emulator has started sending data — the following lines should appear:

    ```bash
    2023-02-13T12:23:21.152+0300    INFO    Bootstrapping emulator
    2023-02-13T12:23:21.493+0300    INFO    Running emulator
    2023-02-13T12:23:51.750+0300    INFO    Sending light state value  {"value": true}
    2023-02-13T12:23:51.750+0300    INFO    Sending humidity value  {"value": 39.9125}
    2023-02-13T12:23:51.750+0300    INFO    Sending temperature value  {"value": 26.139}
    2023-02-13T12:24:21.758+0300    INFO    Sending humidity value  {"value": 39.9267}
    2023-02-13T12:24:21.758+0300    INFO    Sending temperature value  {"value": 26.111}
    2023-02-13T12:24:21.758+0300    INFO    Sending light state value  {"value": true}
    2023-02-13T12:24:51.750+0300    INFO    Sending light state value  {"value": false}
    2023-02-13T12:24:51.750+0300    INFO    Sending humidity value  {"value": 39.772}
    ```

## 8. Check the data receipt

1. Go to **Устройства** IoT Platform [personal account](https://iot.mcs.mail.ru/).
1. Click to the device **Эмулятор** in the common list.
1. Click on the **Структура устройства** tab.
1. Click on each row of the structure sequentially — statistics on the collected data from the device emulator will open.

## 9. Configure data export to object storage

S3 storage in VK Cloud will be used as S3-compatible storage, and the emulator will be used as the data source for export.

### 9.1. Create the exporter

1. Go to **Экспортеры** IoT Platform [personal account](https://iot.mcs.mail.ru/).
1. Click the **Добавить экспортер** button.
1. Fill the fields:

    - **Идентификатор**: `s3`.
    - **Название**: `s3`.
    - **Описание**: `S3 exporter`.
    - **Тип экспортера**: `s3`.

1. Click the **Следующий шаг** button.
1. Fill the fields:

    - **CONNECTION_URL_STRING**: `hb.bizmrg.com`.
    - **BUCKET**: `s3_exporter`.
    - **REGION**: `ru-msk`.
    - **SSL**: `1`.
    - **ACCESS_KEY_ID**: `Access Key ID`, generated when creating the S3 account.
    - **SECRET_ACCESS_KEY**: `Secret Key`, generated when creating the S3 account.
    - **MAX_BULK_INSERT_SIZE**: `100`.
    - **PERIOD_BETWEEN_RETRIES**: `5s`.
    - **FORMAT**: `jsonl`.
    - **BULK_INSERT_TIMEOUT**: `1m`.

1. Click the **Сохранить** button.

### 9.2. Create the rule

1. Go to **Правила** IoT Platform [personal account](https://iot.mcs.mail.ru/).
1. Click the **Добавить правило** button.
1. Fill the fields:

    - **Название**: `S3 Export`.
    - **Идентификатор**: `export_s3`.
    - **Тип правила**: `Реактивное`.
    - **Правило активно**: mark an option.

1. Click the **Следующий шаг** button.
1. Fill the fields:

    - **Язык**: `Python`.
    - **Код правила**: insert the source code below.

    ```python
    from coiiot_sdk import exporters, context, user_logs

    logger = user_logs.get_logger()
    exporter = exporters.get_by_name("s3")
    ctx = context.current()

    logger.info("sending event into s3 storage")
    try:
        exporter.send({
            "tag": ctx.tag.full_name,
            "value": ctx.msg.value,
            "timestamp": ctx.msg.timestamp,
        })
    except Exception as e:
        logger.error("failed to send event into s3 storage")
    else:
        logger.info("successfully sent event into s3 storage")
    ```

1. Click the **Добавить** button.

### 9.3. Assign rules to the emulator and check its work

1. Go to **Устройства** IoT Platform [personal account](https://iot.mcs.mail.ru/).
1. Click to the device **Эмулятор** in the common list.
1. Click on the **Структура устройства** tab.
1. Open the menu to the right of the line **Сенсор температуры** and choose **Редактировать**.
1. Choose the option `export_s3` at the **Правила потоковой обработки** field.
1. Click the **Сохранить** button.
1. Wait at least 5 minutes. Go to **Логирование**.
1. Make sure that an entry of the form appears `[rule_name=export_s3], successfully sent event into s3 storage`.
1. At the VK Cloud personal account [open buckets files](https://mcs.mail.ru/app/services/storage/buckets/): make sure that there is a file with IoT data in the `json` format.

## Monitor the use of resources

1. Stop the device emulator: an entry of the form should appear `Got termination signal, closing app...`.
1. Untie the rule from the emulator:

    1. Go to **Правила** IoT Platform [personal account](https://iot.mcs.mail.ru/).
    1. Click at the rule **S3 Export** in the common list.
    1. Click the **Редактировать** button.
    1. Uncheck the **Правило активно** option.
    1. Click the **Следующий шаг** button.
    1. Click the **Сохранить** button.

## What's next?

- [Explore](../rules) the SDK library.
- Configure a schedule for measuring device parameters.
