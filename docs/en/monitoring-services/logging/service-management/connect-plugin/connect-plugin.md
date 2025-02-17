1. [Install Fluent Bit](../../quick-start/) if this has not been done before.
1. Install the `vkcloudlogs-fluent-bit-plugin` plugin.

   <tabs>
   <tablist>
   <tab>CentOS 7.X, CentOS 8.X, AlmaLinux 9</tab>
   <tab>Ubuntu 22.X, Astra Linux SE 1.7.2 «Орел»</tab>
   <tab>AltLinux Server p10</tab>
   </tablist>
   <tabpanel>

   ```bash
   sudo rpm -i https://cloudlogging.hb.ru-msk.vkcloud-storage.ru/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin-0.1.3-1.x86_64.rpm
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   curl -sSLo vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb https://cloudlogging.hb.ru-msk.vkcloud-storage.ru/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb
   sudo dpkg -i vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   sudo apt-get install https://cloudlogging.hb.ru-msk.vkcloud-storage.ru/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin-0.1.3-1.x86_64.rpm
   ```

   </tabpanel>
   </tabs>

   After installation, the `vkcloudlogs-fluent-bit.service` log collection agent will appear. It is disabled by default.

   <info>

   The `vkcloudlogs-fluent-bit.service` agent works with the following files:

   - `/etc/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit.conf` — the main configuration file of the service with descriptions of sources and destination paths for logging. For more information, see the [Logging plugin](../../concepts/logging-plugin) section and the [Fluent Bit official documentation](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode);
   - `/etc/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugins.conf` — the plugin connection configuration file.

   </info>

1. Configure the plugin to send logs to the Cloud Logging service.

   1. [Find out](../../concepts/logging-plugin#auth_parameters) the authorization parameters for your project.
   1. Specify the connection parameters for the plugin in the `vkcloudlogs-fluent-bit.conf` file:

      <details>
      <summary>vkcloudlogs-fluent-bit.conf</summary>

      This example configures data logging from `ssh.service` (section `[INPUT]`) to the Cloud Logging service (section `[OUTPUT]`).

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

1. Activate the `vkcloudlogs-fluent-bit.service` log collection agent by running the commands:

   ```bash
   sudo systemctl enable vkcloudlogs-fluent-bit.service
   sudo systemctl start vkcloudlogs-fluent-bit.service
   ```

1. Wait a few minutes for the data to accumulate.
1. Check the availability of logs in the **Monitoring** → **Logging** section of your VK Cloud [management console](https://msk.cloud.vk.com/app/en/services/monitoring/logging).
