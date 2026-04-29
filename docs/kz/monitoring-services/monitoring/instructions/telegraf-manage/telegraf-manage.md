{include(/kz/_includes/_translated_by_ai.md)}

## Агент күйін қарау

1. [telegraf мониторинг агенті орнатылғанына көз жеткізіңіз](../mon-setup-current).
1. [Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect) виртуалды машинаға.
1. Команданы орындаңыз:

   {tabs}

   {tab(Linux)}

   ```console
   systemctl -l status telegraf
   ```

   {/tab}

   {/tabs}

## Агентті қосу немесе өшіру

1. [telegraf мониторинг агенті орнатылғанына көз жеткізіңіз](../mon-setup-current).
1. [Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect) виртуалды машинаға.

- Агентті қосу үшін команданы орындаңыз:

  {tabs}

  {tab(Linux)}

  ```console
  sudo systemctl start telegraf
  ```

  {/tab}

  {/tabs}

- Агентті өшіру үшін команданы орындаңыз:

  {tabs}

  {tab(Linux)}

  ```console
  sudo systemctl stop telegraf
  ```

  {/tab}

  {/tabs}

## Метрикаларды қосу немесе өшіру

1. [telegraf мониторинг агенті орнатылғанына көз жеткізіңіз](../mon-setup-current).
1. [Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect) виртуалды машинаға.
1. `/etc/telegraf/telegraf.conf` файлын тауып, оған өзгерістер енгізіңіз: мониторинг параметрлерін қосыңыз немесе жойыңыз.

   Linux-та CPU мониторингіне арналған мысал:

   ```ini
   [[inputs.cpu]]
     percpu = false
     totalcpu = true
     collect_cpu_time = true
     report_active = false
     fieldpass = ["usage_user", "usage_system", "usage_iowait", "usage_irq", "usage_guest", "time_idle"]
   ```

1. Жаңа конфигурацияны мына команда арқылы қолданыңыз:

   {tabs}

   {tab(Linux)}

   ```console
   sudo systemctl reload telegraf.service
   ```

   {/tab}

   {/tabs}

## Қосымша метрикаларды баптау үшін плагинді қосу немесе өшіру

1. [telegraf мониторинг агенті орнатылғанына көз жеткізіңіз](../mon-setup-current).
1. [Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect) виртуалды машинаға.
1. `/etc/telegraf/telegraf.conf` файлын тауып, оған өзгерістер енгізіңіз: [қажетті плагинді](https://github.com/influxdata/telegraf/blob/master/docs/CONFIGURATION.md#input-plugins) қосыңыз немесе жойыңыз.

   Linux-та `mysql` плагинін қосудың мысалы:

   ```ini
   [[inputs.mysql]]
     servers = ["tcp(127.0.0.1:3306)/"]
     metric_version = 2
   ```

1. Жаңа конфигурацияны мына команда арқылы қолданыңыз:

   {tabs}

   {tab(Linux)}

   ```console
   sudo systemctl reload telegraf.service
   ```

   {/tab}

   {/tabs}

## Агент логтарын қарау

1. [telegraf мониторинг агенті орнатылғанына көз жеткізіңіз](../mon-setup-current).
1. [Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect) виртуалды машинаға.
1. Команданы орындаңыз:

   {tabs}

   {tab(Linux)}

   ```console
   journalctl -u telegraf
   ```

   {/tab}

   {/tabs}

## Агентті жою

1. [telegraf мониторинг агенті орнатылғанына көз жеткізіңіз](../mon-setup-current).
1. [Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect) виртуалды машинаға.
1. Команданы орындаңыз:

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
