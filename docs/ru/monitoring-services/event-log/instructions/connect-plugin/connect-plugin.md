# {heading(Установка и настройка плагина Fluent Bit для слоя данных)[id=event-log-connect-plugin]}

## {heading(Установка плагина)[id=event-log-connect-plugin-install]}

1. Установите на ВМ ПО [Fluent Bit](https://docs.fluentbit.io/manual/installation/downloads), если это не было сделано ранее.
1. Установите {linkto(../../concepts/audit-plugin#event-log-audit-plugin)[text=плагин]} `vkcloudaudit-fluent-bit-plugin` для сбора событий аудита слоя данных.

   {tabs}

   {tab(CentOS 7.X, CentOS 8.X, AlmaLinux 9)}

   ```console
   sudo rpm -i https://cloudaudit.hb.bizmrg.com/vkcloudaudit-fluent-bit-plugin/vkcloudaudit-fluent-bit-plugin-0.2.1-1.x86_64.rpm
   ```

   {/tab}

   {tab(Ubuntu 22.X, Astra Linux SE 1.7.2 «Орел»)}

   ```console
   wget https://cloudaudit.hb.bizmrg.com/vkcloudaudit-fluent-bit-plugin/vkcloudaudit-fluent-bit-plugin_0.2.1_amd64.deb
   sudo dpkg -i vkcloudaudit-fluent-bit-plugin_0.2.1_amd64.deb
   ```

   {/tab}

   {tab(AltLinux Server p10)}

   ```console
   sudo apt-get install https://cloudaudit.hb.bizmrg.com/vkcloudaudit-fluent-bit-plugin/vkcloudaudit-fluent-bit-plugin-0.2.1-1.x86_64.rpm
   ```

   {/tab}

   {/tabs}

   После установки в службах ВМ появится агент сбора логов `vkcloudaudit-fluent-bit.service`. По умолчанию он выключен.

## {heading(Настройка плагина)[id=event-log-connect-plugin-configure]}

{note:info}
Для FluentBit версии 3.2 и выше добавлена поддержка файлов YAML для конфигурации агентов. При этом возможность использовать формат CONF сохраняется, но в будущем он будет выведен из употребления. Подробнее — в [официальной документации FluentBit](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit).
{/note}

1. Перейдите в директорию `/etc/vkcloudaudit-fluent-bit-plugin`, где должны размещаться файлы YAML, содержащие настройки плагина. Примеры:

   - `/etc/vkcloudaudit-fluent-bit-plugin/fluent-bit.yaml` — основной файл конфигурации плагина. Подробнее в разделе {linkto(../../concepts/audit-plugin#event-log-audit-plugin)[text=Плагин аудита слоя данных]}.
   - `/etc/vkcloudaudit-fluent-bit-plugin/input-kubernetes.yaml` — файл, где описан источник событий слоя данных.

1. Настройте плагин для отправки логов в сервис Cloud Audit.

   1. {linkto(../../concepts/audit-plugin#event-log-auth-parameters)[text=Узнайте]} параметры авторизации плагина для вашего проекта.
   1. Отредактируйте файл `fluent-bit.yaml`, указав параметры подключения для агента:

      {cut(fluent-bit.yaml)}
      В этом примере настраивается сбор событий Kubernetes в сервис Cloud Audit для региона Москва.

      ```yaml
      service:
         flush: 5
         log_level: info
         hot_reload: on
         storage.max_chunks_up: 64
         mem_buf_limit: 10M

      plugins:
         - ./build/vkcloudaudit-fluent-bit.so

      includes:
      - input-kubernetes.yaml

      pipeline:
      outputs:
         - name: vkcloudaudit
            match: kubernetes
            source_id: containers
            auth_type: keystone
            auth_url: <ЭНДПОИНТ_KEYSTONE>
            server_host: https://msk.cloud.vk.ru/audit/c2s
            user_id: "<ID_ПОЛЬЗОВАТЕЛЯ"
            password: "<ПАРОЛЬ_ПОЛЬЗОВАТЕЛЯ>"
            project_id: "<ID_ПРОЕКТА>"     
      ```
      {/cut}

   1. Добавьте в директорию файл с параметрами источника. Например, `input-kubernetes.yaml` для Kubernetes:

      {cut(input-kubernetes.yaml)}

      ```yaml
      multiline_parsers:
      - name: multiline_regex_json
         type: regex
         flush_timeout: 500
         rules:
            - state: start_state
            regex: '/^\{.*/'
            next_state: cont
            - state: cont
            regex: '/^([^\S\r\n].*|})$/'
            next_state: cont

      parsers:
      - name: multi_json
         format: json
         time_key: requestReceivedTimestamp
         time_format: "%Y-%m-%dT%H:%M:%S.%L %z"

      pipeline:
      inputs:
         - name: tail
            tag: kubernetes
            path: examples/logs/kubernetes.log
            skip_empty_lines: on
            # debug option
            read_from_head: true
            multiline.parser: multiline_regex_json

      filters:
         - name: parser
            match: kubernetes
            key_name: log
            parser: multi_json

         - name: sysinfo
            match: kubernetes
            os_name_key: os_name
            hostname_key: hostname

         - name: lua
            match: kubernetes
            script: filters/kubernetes.lua
            call: create_event
      ```
      {/cut}

   1. Чтобы настроить преобразование собранных плагином данных в формат событий аудита, добавьте в директорию `/etc/vkcloudaudit-fluent-bit-plugin/filters` файл скрипта на языке [Lua](https://www.lua.org/). Например, `kubernetes.lua`.

      {cut(kubernetes.lua)}
      ```lua
      json = require("examples/filters/pkg/json")

      --- Create audit event from kubernetes auditing record.
      --- Source: https://docs.fluentbit.io/manual/pipeline/filters/lua
      ---
      --- Function must return 3 values:
      ---  return code, timestamp, record
      ---  where:
      ---   - code     : -1 record must be deleted
      ---                 0 record not modified, keep the original
      ---                 1 record was modified, replace timestamp and record.
      ---                 2 record was modified, replace record and keep timestamp.
      ---   - timestamp: Unix timestamp with precision (double)
      ---   - record   : Table with multiple key/val
      ---@param tag string
      ---@param timestamp number
      ---@param record table
      ---@return number, number, table
      function create_event(tag, timestamp, record)
         if record["objectRef"] == nil then
            return -1, timestamp, record
         end

         event = {}
         event["action"] = record["verb"]
         if record["responseStatus"] ~= nil then
            event["severity"] = statusToSeverity(record["responseStatus"]["code"])
         end
         event["message"] = record["verb"]
         if record["objectRef"]["resource"] > "" then
            event["message"] = event["message"] .. " " .. record["objectRef"]["resource"]
         else
            event["message"] = event["message"] .. " " .. record["requestURI"]
         end

         event["subject"] = {}
         event["subject"]["type"] = "VKCLOUD_SERVICE_USER"
         if record["sourceIPs"] ~= nil then
            event["subject"]["address"] = record["sourceIPs"][#record["sourceIPs"]]
         end
         event["subject"]["user_agent"] = record["userAgent"]

         if record["user"] ~= nil then
            event["subject"]["third_party"] = {}
            event["subject"]["third_party"]["user_id"] = record["user"]["uid"]
            event["subject"]["third_party"]["username"] = record["user"]["username"]
            event["subject"]["third_party"]["metadata"] = {}
            event["subject"]["third_party"]["metadata"]["groups"] = arrayToString(record["user"]["groups"])
         end

         if record["impersonatedUser"] ~=nil then
            event["delegate"]["third_party"] = {}
            event["delegate"]["third_party"]["user_id"] = record["impersonatedUser"]["uid"]
            event["delegate"]["third_party"]["username"] = record["impersonatedUser"]["username"]
            event["delegate"]["third_party"]["metadata"] = {}
            event["delegate"]["third_party"]["metadata"]["groups"] = arrayToString(record["impersonatedUser"]["groups"])
         end

         event["resource"] = {}
         event["resource"]["id"] = record["objectRef"]["uid"]
         event["resource"]["type"] = record["objectRef"]["resource"]
         event["resource"]["name"] = record["objectRef"]["name"]
         event["resource"]["metadata"] = {}
         event["resource"]["metadata"]["namespace"] = record["objectRef"]["namespace"]
         event["resource"]["metadata"]["apiGroup"] = record["objectRef"]["apiGroup"]
         event["resource"]["metadata"]["apiVersion"] = record["objectRef"]["apiVersion"]
         event["resource"]["metadata"]["resourceVersion"] = record["objectRef"]["resourceVersion"]
         event["resource"]["metadata"]["subresource"] = record["objectRef"]["subresource"]

         event["status"] = {}
         event["status"]["code"] = record["responseStatus"]["code"]
         event["status"]["message"] = record["responseStatus"]["message"]

         event["request"] = json.encode(record["requestObject"])
         event["response"] = json.encode(record["responseObject"])

         event["labels"] = {}
         event["labels"]["tag"] = tag
         event["labels"]["os_name"] = record["os_name"]
         event["labels"]["hostname"] = record["hostname"]
         event["labels"]["auditID"] = record["auditID"]
         if record["annotations"] ~= nil then
            for key, value in pairs(record["annotations"]) do
                  event["labels"][key] = value
            end
         end

         return 2, timestamp, event
      end

      function statusToSeverity(status)
         if status >= 500 then
            return "ERROR"
         else
            if status>= 400 then
                  return "WARNING"
            end
         end

         return "INFO"
      end

      function arrayToString(arr)
         str = ""
         for i = 1, #arr do
            if i == #arr then
                  str = str  .. arr[i]
            else
                  str = str  .. arr[i] .. ", "
            end
         end
         return str
      end
      ```
      {/cut}

1. Включите агент сбора событий `vkcloudaudit-fluent-bit.service`, выполнив команду:

   ```console
   sudo systemctl enable vkcloudaudit-fluent-bit.service
   sudo systemctl start vkcloudaudit-fluent-bit.service
   ```
   Если настройка выполнялась на запущенном агенте, перезапустите его:

   ```console
   sudo systemctl restart vkcloudaudit-fluent-bit.service
   ```

1. Подождите некоторое время, чтобы накопились данные.
1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет {var(cloud)} и проверьте наличие событий в разделе **Мониторинг** → **Журнал событий** на вкладке **Слой данных**.
