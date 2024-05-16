To set up logging for a VM:

1. [Set the Fluent Bit](../../quick-start/) if this has not been done before.
1. Install the `vkcloudlogs-fluent-bit-plugin` plugin.
1. Configure the plugin to send logs to the Cloud Logging service.
1. Enable the log collection agent `vkcloudlogs-fluent-bit.service`.

The following are the steps for configuring the `vkcloudlogs-fluent-bit-plugin` plugin.

## 1. Install the vkcloudlogs-fluent-bit-plugin

<tabs>
<tablist>
<tab>CentOS 7.X, CentOS 8.X, AlmaLinux 9</tab>
<tab>Ubuntu 22.X, Astra Linux SE 1.7.2 «Орел»</tab>
<tab>AltLinux Server p10</tab>
</tablist>
<tabpanel>

```bash
sudo rpm -i https://cloudlogging.hb.ru-msk.vkcs.cloud/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin-0.1.3-1.x86_64.rpm
```

</tabpanel>
<tabpanel>

```bash
curl -sSLo vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb https://cloudlogging.hb.ru-msk.vkcs.cloud/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb
sudo dpkg -i vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb
```

</tabpanel>
<tabpanel>

```bash
sudo apt-get install https://cloudlogging.hb.ru-msk.vkcs.cloud/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin-0.1.3-1.x86_64.rpm
```

</tabpanel>
</tabs>

After installation, the service `vkcloudlogs-fluent-bit.service` will appear. It is disabled by default.

<info>

The `vkcloudlogs-fluent-bit.service` service works with files:

- `/etc/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit.conf` — the main configuration file of the service with descriptions of sources and destination paths for logging, for more information see [plugin documentation](https://github.com/vk-cs/cloudlogs-fluent-bit);
- `/etc/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugins.conf` — plug-in connection configuration.

</info>

## 2. Configure the vkcloudlogs-fluent-bit.conf configuration file

1. Find out the authorization parameters for your project:

   - `auth_url` — [endpoint](/en/manage/tools-for-using-services/rest-api/endpoints) of Keystone;
   - `project_id` — [ID](/en/manage/tools-for-using-services/rest-api/endpoints) VK Cloud project in OpenStack;
   - `server_host_port` — address of the Cloud Logging service (`cloudlogs.mcs.mail.ru:443`);
   - `user_id` — the name of the user on whose behalf the logs will be recorded; generated at the [connection](../../quick-start/) stage;
   - `password` — the password of the specified user.
   - `service_id` — [service id](/ru/additionals/api/logging "change-lang") in the logging system (by default is `default`). If necessary, create new IDs [on the tab](https://msk.cloud.vk.com/app/en/services/monitoring/logging/settings/services) **Other resources** of the **Logging**.

1. Specify the connection parameters for the plugin in the `vkcloudlogs-fluent-bit.conf` file:

   <details>
     <summary>vkcloudlogs-fluent-bit.conf</summary>

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

## 3. Activate vkcloudlogs-fluent-bit.service

1. Run the command:

   ```bash
   sudo systemctl enable vkcloudlogs-fluent-bit.service
   sudo systemctl start vkcloudlogs-fluent-bit.service
   ```

1. Wait a few minutes for the data to accumulate.
1. Check the availability of ssh logs in the VK Cloud personal account in the section **Monitoring** → **Logging**.
