Fluent Bit is an open source tool for collecting and processing logs. Fluent Bit collects, parses and filters messages from various input sources and stores them in storage. Then the messages arrive at the router, which determines which output to send them to. Plugins are used to work with various input sources and outputs.

Read more about Fluent Bit in [official documentation](https://docs.fluentbit.io/manual).

To install and configure Fluent Bit:

1. Clone the repository with the plugin source code:

   ```bash
   git clone https://github.com/vk-cs/cloudlogs-fluent-bit
   ```

2. Go to the downloaded repository and compile the `cloudlogs-fluent-bit` library:

   ```bash
   cd cloudlogs-fluent-bit
   make
   ```

3. Set the parameters for connecting to the Logging VK Cloud API:

   ```bash
   /opt/fluent-bit/bin/fluent-bit -i dummy -e ./vkcloudlogs-fluent-bit.so -o vkcloudlogs -p "server_host_port=<service address>" -p "user_id=<username>" -p "password=<password>" -p "project_id=<PID>" -p "auth_url=<authorization service endpoint>"
   ```

   Здесь:

   - `auth_url` — Keystone [endpoint](/ru/manage/tools-for-using-services/rest-api/endpoints); required parameter;
   - `project_id` — project [OpenStack ID](/en/manage/tools-for-using-services/rest-api/endpoints#getting_project_id); required parameter;
   - `server_host_port` — address of the Cloud Logging service (`cloudlogs.mcs.mail.ru:443`);
   - `user_id` — the name of the user on whose behalf the logs will be recorded;
   - `password` — the password of the specified user.

   Additional parameters can be found in the [GitHub repository](https://github.com/vk-cs/cloudlogs-fluent-bit).
