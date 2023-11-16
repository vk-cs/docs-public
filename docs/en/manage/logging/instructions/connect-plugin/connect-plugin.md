To install and configure the `cloudlogs-fluent-bit` plugin:

1. Clone the repository with the plugin source code:

   ```bash
   git clone https://github.com/vk-cs/cloudlogs-fluent-bit
   ```

1. Go to the downloaded repository and compile the `cloudlogs-fluent-bit` library:

   ```bash
   cd cloudlogs-fluent-bit
   make
   ```

1. Set the parameters for connecting to the Logging VK Cloud API:

   ```bash
   /opt/fluent-bit/bin/fluent-bit -i dummy -e ./vkcloudlogs-fluent-bit.so -o vkcloudlogs -p "server_host_port=<service address>" -p "user_id=<username>" -p "password=<user password>" -p "project_id=<project PID>" -p "auth_url=<endpoint of the authorization address>" -p "service_id=<service id>"
   ```

   Here:

   - `auth_url` — [endpoint](/en/manage/tools-for-using-services/rest-api/endpoints) of Keystone; required parameter;
   - `project_id` — [ID](/en/manage/tools-for-using-services/rest-api/endpoints) VK Cloud project in OpenStack; required parameter;
   - `server_host_port` — address of the Cloud Logging service (`cloudlogs.mcs.mail.ru:443`);
   - `user_id` — the name of the user on whose behalf the logs will be recorded; generated at the [connection](../../quick-start/) stage;
   - `password` — the password of the specified user.
   - `service_id` — [service id](/ru/additionals/api/logging "change-lang") in the logging system (by default is `default`). If necessary, create new IDs [on the tab](https://msk.cloud.vk.com/app/en/services/monitoring/logging/settings/services) **Other resources** of the **Logging**.

   <details>
      <summary>Example of setting parameters</summary>

   ```bash
   /opt/fluent-bit/bin/fluent-bit -i dummy -e ./vkcloudlogs-fluent-bit.so -o vkcloudlogs -p "server_host_port=cloudlogs.mcs.mail.ru:443" -p "user_id=XXXX0782a1e240fdac38a9d22c89XXXX" -p "password=1XXf$0MZ9mdXXX" -p "project_id=XXXXffd4ef0547e5b222f44555dfXXXX" -p "auth_url=https://infra.mail.ru:35357/v3/" -p "service_id=databases"
   ```

   </details>

   <info>

   Additional parameters can be found in the [GitHub repository](https://github.com/vk-cs/cloudlogs-fluent-bit).

   </info>

1. Set the `cloudlogs-fluent-bit` parameters to send logs to VK Cloud:

   1. Create a repository for storing configuration files:

      ```bash
      mkdir -p /etc/fluentbit-cloudlogs/
      ```

   1. Create a `config.conf` file in the repository with the contents:

      <details>
        <summary>config.conf</summary>

      In this example, data logging is configured from `ssh.service` (section `[INPUT]`) to the Cloud Logging service (section `[OUTPUT]`).

      ```conf
      [INPUT]
         Name            systemd
         Systemd_Filter  _SYSTEMD_UNIT=ssh.service
         Lowercase       On
         Read_From_Tail  On
         Tag             system.*

      [OUTPUT]
          Name              vkcloudlogs
          Match             system.*
          auth_url          <endpoint of the authorization address>
          project_id        <project PID>
          server_host_port  <service address>
          user_id           <username>
          password          <user password>
      ```

      </details>

   1. Create a `parsers.conf` file in the repository with the contents:

      <details>
        <summary>parsers.conf</summary>

      In this example, the format of the sent data for the `ssh` service is configured.

      ```conf
      [PARSER]
        Name        ssh
        Format      json
        Time_Key    time
        Time_Format %Y-%m-%dT%H:%M:%S.%L
      ```

      </details>

   1. Check the plugin operation using the command:

      ```bash
      /opt/fluent-bit/bin/fluent-bit --config=/etc/fluentbit-cloudlogs/config.conf --parser=/etc/fluentbit-cloudlogs/parsers.conf -e ./vkcloudlogs-fluent-bit.so
      ```

1. If the operating system supports [systemd](https://systemd.io):

   1. Create a service file `/etc/systemd/system/fluentbit-cloudlogs.service`:

      <details>
        <summary>fluentbit-cloudlogs.service</summary>

      ```conf
      [Unit]
      Description=Fluentbit Cloudlog VKCS
      After=network-online.target
   
      [Service]
      ExecStart=/opt/fluent-bit/bin/fluent-bit --config=/etc/fluentbit-cloudlogs/config.conf --parser=/etc/fluentbit-cloudlogs/parsers.conf -e /home/ubuntu/cloudlogs-fluent-bit/vkcloudlogs-fluent-bit.so
      Restart=on-failure
      RestartSec=5s
   
      [Install]
      WantedBy=multi-user.target
      ```

      </details>

   1. Restart the `fluentbit-cloudlogs` service with the following commands:

      ```bash
      systemctl daemon-reload
      systemctl start fluentbit-cloudlogs
      systemctl enable fluentbit-cloudlogs
      ```

   1. Check the status of the `fluentbit-cloudlogs` service with the command:

      ```bash
      systemctl status fluentbit-cloudlogs
      ```

1. Check the availability of ssh logs in the VK Cloud personal account in the section **Monitoring** → **Logging**.
