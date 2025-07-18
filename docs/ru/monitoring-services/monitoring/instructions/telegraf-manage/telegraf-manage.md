## Просмотр статуса агента

1. [Убедитесь](../mon-setup-current), что у вас установлен агент мониторинга telegraf.
1. [Подключитесь](/ru/computing/iaas/instructions/vm/vm-connect) к виртуальной машине.
1. Выполните команду:

   <tabs>
   <tablist>
   <tab>Linux</tab>
   </tablist>
   <tabpanel>

   ```console
   systemctl -l status telegraf
   ```

   </tabpanel>
   </tabs>

## Включение или выключение агента

1. [Убедитесь](../mon-setup-current), что у вас установлен агент мониторинга telegraf.
1. [Подключитесь](/ru/computing/iaas/instructions/vm/vm-connect) к виртуальной машине.

- Чтобы включить агент, выполните команду:

  <tabs>
  <tablist>
  <tab>Linux</tab>
  </tablist>
  <tabpanel>

  ```console
  sudo systemctl start telegraf
  ```

  </tabpanel>
  </tabs>

- Чтобы выключить агент, выполните команду:

  <tabs>
  <tablist>
  <tab>Linux</tab>
  </tablist>
  <tabpanel>

  ```console
  sudo systemctl stop telegraf
  ```

  </tabpanel>
  </tabs>

## Включение или отключение метрик

1. [Убедитесь](../mon-setup-current), что у вас установлен агент мониторинга telegraf.
1. [Подключитесь](/ru/computing/iaas/instructions/vm/vm-connect) к виртуальной машине.
1. Найдите и внесите изменения в файл `/etc/telegraf/telegraf.conf`: добавьте или удалите параметры для мониторинга.

   Пример для мониторинга CPU в Linux:

   ```ini
   [[inputs.cpu]]
     percpu = false
     totalcpu = true
     collect_cpu_time = true
     report_active = false
     fieldpass = ["usage_user", "usage_system", "usage_iowait", "usage_irq", "usage_guest", "time_idle"]
   ```

1. Примените новую конфигурацию с помощью команды:

   <tabs>
   <tablist>
   <tab>Linux</tab>
   </tablist>
   <tabpanel>

   ```console
   sudo systemctl reload telegraf.service
   ```

   </tabpanel>
   </tabs>

## Включение или отключение плагина для настройки дополнительных метрик

1. [Убедитесь](../mon-setup-current), что у вас установлен агент мониторинга telegraf.
1. [Подключитесь](/ru/computing/iaas/instructions/vm/vm-connect) к виртуальной машине.
1. Найдите и внесите изменения в файл `/etc/telegraf/telegraf.conf`: добавьте или удалите [нужный плагин](https://github.com/influxdata/telegraf/blob/master/docs/CONFIGURATION.md#input-plugins).

   Пример добавления плагина `mysql` в Linux:

   ```ini
   [[inputs.mysql]]
     servers = ["tcp(127.0.0.1:3306)/"]
     metric_version = 2
   ```

1. Примените новую конфигурацию с помощью команды:

   <tabs>
   <tablist>
   <tab>Linux</tab>
   </tablist>
   <tabpanel>

   ```console
   sudo systemctl reload telegraf.service
   ```

   </tabpanel>
   </tabs>

## Просмотр логов агента

1. [Убедитесь](../mon-setup-current), что у вас установлен агент мониторинга telegraf.
1. [Подключитесь](/ru/computing/iaas/instructions/vm/vm-connect) к виртуальной машине.
1. Выполните команду:

   <tabs>
   <tablist>
   <tab>Linux</tab>
   </tablist>
   <tabpanel>

   ```console
   journalctl -u telegraf
   ```

   </tabpanel>
   </tabs>

## Удаление агента

1. [Убедитесь](../mon-setup-current), что у вас установлен агент мониторинга telegraf.
1. [Подключитесь](/ru/computing/iaas/instructions/vm/vm-connect) к виртуальной машине.
1. Выполните команду:

   <tabs>
   <tablist>
   <tab>CentOS 7.X</tab>
   <tab>CentOS 8.X, RedOS 7, AlmaLinux 9</tab>
   <tab>Ubuntu 22.X, AltLinux Server</tab>
   <tab>Astra Linux</tab>
   </tablist>
   <tabpanel>

   ```console
   sudo yum erase telegraf
   ```

   </tabpanel>
   <tabpanel>

   ```console
   sudo dnf remove telegraf
   ```

   </tabpanel>
   <tabpanel>

   ```console
   sudo apt-get remove telegraf
   ```

   </tabpanel>
   <tabpanel>

   ```console
   sudo apt remove telegraf
   ```

   </tabpanel>
   </tabs>
