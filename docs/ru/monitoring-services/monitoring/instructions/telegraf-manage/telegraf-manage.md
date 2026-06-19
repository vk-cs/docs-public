# {heading(Управление telegraf и его плагинами)[id=monitoring-telegraf-manage]}

## {heading(Просмотр статуса агента)[id=monitoring-telegraf-status]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=Убедитесь]}, что у вас установлен агент мониторинга telegraf.
1. {ifdef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]}{/ifdef}{ifndef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Подключитесь]}{/ifndef} к виртуальной машине.
1. Выполните команду:

   {tabs}

   {tab(Linux)}

   ```console
   systemctl -l status telegraf
   ```

   {/tab}

   {/tabs}

## {heading(Включение или отключение агента)[id=monitoring-telegraf-on-off]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=Убедитесь]}, что у вас установлен агент мониторинга telegraf.
1. {ifdef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]}{/ifdef}{ifndef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Подключитесь]}{/ifndef} к виртуальной машине.

- Чтобы включить агент, выполните команду:

  {tabs}

  {tab(Linux)}

  ```console
  sudo systemctl start telegraf
  ```

  {/tab}

  {/tabs}

- Чтобы отключить агент, выполните команду:

  {tabs}

  {tab(Linux)}

  ```console
  sudo systemctl stop telegraf
  ```

  {/tab}

  {/tabs}

## {heading(Включение или отключение метрик)[id=monitoring-telegraf-metrics]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=Убедитесь]}, что у вас установлен агент мониторинга telegraf.
1. {ifdef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]}{/ifdef}{ifndef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Подключитесь]}{/ifndef} к виртуальной машине.
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

   {tabs}

   {tab(Linux)}

   ```console
   sudo systemctl reload telegraf.service
   ```

   {/tab}

   {/tabs}

## {heading(Включение или отключение плагина для настройки дополнительных метрик)[id=monitoring-telegraf-plugin]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=Убедитесь]}, что у вас установлен агент мониторинга telegraf.
1. {ifdef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]}{/ifdef}{ifndef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Подключитесь]}{/ifndef} к виртуальной машине.
1. Найдите и внесите изменения в файл `/etc/telegraf/telegraf.conf`: добавьте или удалите [нужный плагин](https://github.com/influxdata/telegraf/blob/master/docs/CONFIGURATION.md#input-plugins).

   Пример добавления плагина `mysql` в Linux:

   ```ini
   [[inputs.mysql]]
     servers = ["tcp(127.0.0.1:3306)/"]
     metric_version = 2
   ```

1. Примените новую конфигурацию с помощью команды:

   {tabs}

   {tab(Linux)}

   ```console
   sudo systemctl reload telegraf.service
   ```

   {/tab}

   {/tabs}

## {heading(Просмотр логов агента)[id=monitoring-telegraf-logs]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=Убедитесь]}, что у вас установлен агент мониторинга telegraf.
1. {ifdef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]}{/ifdef}{ifndef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Подключитесь]}{/ifndef} к виртуальной машине.
1. Выполните команду:

   {tabs}

   {tab(Linux)}

   ```console
   journalctl -u telegraf
   ```

   {/tab}

   {/tabs}

## {heading(Удаление агента)[id=monitoring-telegraf-delete]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=Убедитесь]}, что у вас установлен агент мониторинга telegraf.
1. {ifdef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]}{/ifdef}{ifndef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Подключитесь]}{/ifndef} к виртуальной машине.
1. Выполните команду:

   {tabs}

   {tab(CentOS 7.X)}

   ```console
   sudo yum erase telegraf
   ```

   {/tab}

   {tab(CentOS 8.X, RedOS 7, AlmaLinux 9)}

   ```console
   sudo dnf remove telegraf
   ```

   {/tab}

   {tab(Ubuntu 22.X, AltLinux Server)}

   ```console
   sudo apt-get remove telegraf
   ```

   {/tab}

   {tab(Astra Linux)}

   ```console
   sudo apt remove telegraf
   ```

   {/tab}

   {/tabs}
