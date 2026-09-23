# {heading(Installing and configuring the Fluent Bit plugin for the data plane)[id=event-log-connect-plugin]}

## {heading(Installing the plugin)[id=event-log-connect-plugin-install]}

1. Install [Fluent Bit](https://docs.fluentbit.io/manual/installation/downloads) software on the VM if you have not done so already.
1. Install the `vkcloudaudit-fluent-bit-plugin` {linkto(../../concepts/audit-plugin#event-log-audit-plugin)[text=plugin]} to collect data plane audit events.

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

   After installation, the `vkcloudaudit-fluent-bit.service` log collection agent will appear in the VM services. By default, it is disabled.

## {heading(Configuring the plugin)[id=event-log-connect-plugin-configure]}

{note:info}
For FluentBit version 3.2 and later, support for YAML files has been added for agent configuration. At the same time, the ability to use the CONF format remains, but it will be deprecated in the future. For details, see the [official FluentBit documentation](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit).
{/note}

1. Go to the `/etc/vkcloudaudit-fluent-bit-plugin` directory, where the YAML files containing the plugin settings must be located. Examples:

   - `/etc/vkcloudaudit-fluent-bit-plugin/fluent-bit.yaml` — the main plugin configuration file. For details, see {linkto(../../concepts/audit-plugin#event-log-audit-plugin)[text=Data plane audit plugin]}.
   - `/etc/vkcloudaudit-fluent-bit-plugin/input-kubernetes.yaml` — the file that describes the data plane event source.

1. Configure the plugin to send logs to the Cloud Audit service.

   1. {linkto(../../concepts/audit-plugin#event-log-auth-parameters)[text=Find out]} the plugin authorization parameters for your project.
   1. Edit the `fluent-bit.yaml` file and specify the agent connection parameters:

      {cut(fluent-bit.yaml)}
      This example configures Kubernetes event collection to the Cloud Audit service for the Moscow region.

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
            auth_url: <KEYSTONE_ENDPOINT>
            server_host: https://msk.cloud.vk.ru/audit/c2s
            user_id: "<USER_ID"
            password: "<USER_PASSWORD>"
            project_id: "<PROJECT_ID>"     
      ```
      {/cut}

   1. Add a file with source parameters to the directory. For example, `input-kubernetes.yaml` for Kubernetes:

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

   1. To configure conversion of the data collected by the plugin into the audit event format, add a [Lua](https://www.lua.org/) script file to the `/etc/vkcloudaudit-fluent-bit-plugin/filters` directory. For example, `kubernetes.lua`.

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

1. Enable the `vkcloudaudit-fluent-bit.service` event collection agent by running the command:

   ```console
   sudo systemctl enable vkcloudaudit-fluent-bit.service
   sudo systemctl start vkcloudaudit-fluent-bit.service
   ```
   If the configuration was performed on a running agent, restart it:

   ```console
   sudo systemctl restart vkcloudaudit-fluent-bit.service
   ```

1. Wait some time for data to accumulate.
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console and check for events in **Monitoring** → **Event log** on the **Data plane** tab.
