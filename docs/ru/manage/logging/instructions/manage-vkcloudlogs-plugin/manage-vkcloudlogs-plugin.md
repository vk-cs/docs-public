## Включение или выключение агента

1. [Подключитесь](/ru/base/iaas/instructions/vm/vm-connect/) к виртуальной машине.
1. [Убедитесь](../connect-plugin/), что у вас установлен плагин `vkcloudlogs-fluent-bit-plugin`.

- Чтобы включить агент, выполните команду:

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

- Чтобы выключить агент, выполните команду:

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

## Настройка агента для сбора логов из дополнительных текстовых файлов

1. [Подключитесь](/ru/base/iaas/instructions/vm/vm-connect/) к виртуальной машине.
1. [Убедитесь](../connect-plugin/), что у вас установлен плагин `vkcloudlogs-fluent-bit-plugin`.
1. Скорректируйте файл `vkcloudlogs-fluent-bit.conf` нужным образом:

   - в секции `[INPUT]` укажите путь к файлу в параметре `Path` и тег в параметре `Tag`;
   - в секции `[OUTPUT]` укажите установленный тег, чтобы записи попадали в логи.

   <details>
    <summary>Пример подключения файла /var/log/auth.log</summary>

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

   Чтобы удалить источник сбора логов, уберите соответствующие записи из файла `vkcloudlogs-fluent-bit.conf`.

   </info>

1. Перезапустите агент:

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

## Удаление агента и плагина

1. [Подключитесь](/ru/base/iaas/instructions/vm/vm-connect/) к виртуальной машине.
1. [Убедитесь](../connect-plugin/), что у вас установлен плагин `vkcloudlogs-fluent-bit-plugin`.
1. Выполните команду:

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
