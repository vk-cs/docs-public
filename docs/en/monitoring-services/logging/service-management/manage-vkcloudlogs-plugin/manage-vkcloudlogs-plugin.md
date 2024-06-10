## Turning the agent on and off

1. [Connect](/en/base/iaas/service-management/vm/vm-connect/) to the virtual machine.
1. [Make sure](../connect-plugin/) that you have the `vkcloudlogs-fluent-bit-plugin` plugin installed.

- To turn the agent on, run the commands:

  <tabs>
  <tablist>
  <tab>Linux</tab>
  </tablist>
  <tabpanel>

  ```bash
  sudo systemctl enable vkcloudlogs-fluent-bit.service
  sudo systemctl start vkcloudlogs-fluent-bit.service
  ```

  </tabpanel>
  </tabs>

- To turn the agent off, run the commands:

  <tabs>
  <tablist>
  <tab>Linux</tab>
  </tablist>
  <tabpanel>

  ```bash
  sudo systemctl stop vkcloudlogs-fluent-bit.service
  sudo systemctl disable vkcloudlogs-fluent-bit.service
  ```

  </tabpanel>
  </tabs>

## {heading(Configuring the agent to collect logs from additional text files)[id=configure_agent]}

1. [Connect](/en/base/iaas/service-management/vm/vm-connect/) to the virtual machine.
1. [Make sure](../connect-plugin/) that you have the `vkcloudlogs-fluent-bit-plugin` plugin installed.
1. Adjust the `vkcloudlogs-fluent-bit.conf` file as needed:

   - in the `[INPUT]` section, specify the path to the source file in the `Path` parameter and the tag in the `Tag` parameter;
   - in the `[OUTPUT]` section, specify the same tag so that the records are sent to the logs.

   <details>
    <summary>Example of connecting the /var/log/auth.log file</summary>

   ```ini
   [INPUT]
      Name             tail
      Path             /var/log/auth.log
      Skip_Empty_Lines On
      Tag              vkcloudlogs.tail.auth.log

   [OUTPUT]
      Name              vkcloudlogs
      Match             vkcloudlogs.tail.*
      auth_url          https://infra.mail.ru:35357/v3/
      server_host_port  cloudlogs.mcs.mail.ru:443
      user_id           user1
      password          pwd12345
      project_id        XXXX000XXXX00
   ```

   </details>

   <info>

   To delete the log collection source, remove the corresponding entries from the `vkcloudlogs-fluent-bit.conf` file.

   </info>

1. Restart the agent:

   <tabs>
   <tablist>
   <tab>Linux</tab>
   </tablist>
   <tabpanel>

   ```bash
   sudo systemctl restart vkcloudlogs-fluent-bit.service
   ```

   </tabpanel>
   </tabs>

## Removing the agent and plugin

1. [Connect](/en/base/iaas/service-management/vm/vm-connect/) to the virtual machine.
1. [Make sure](../connect-plugin/) that you have the `vkcloudlogs-fluent-bit-plugin` plugin installed.
1. Run the command:

   <tabs>
   <tablist>
   <tab>CentOS 7.X, CentOS 8.X, RedOS 7, AlmaLinux 9</tab>
   <tab>Ubuntu 22.X, Astra Linux</tab>
   <tab>AltLinux Server</tab>
   </tablist>
   <tabpanel>

   ```bash
   sudo yum remove vkcloudlogs-fluent-bit-plugin.x86_64
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   sudo apt remove vkcloudlogs-fluent-bit-plugin
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   sudo apt-get remove vkcloudlogs-fluent-bit-plugin
   ```

   </tabpanel>
   </tabs>
