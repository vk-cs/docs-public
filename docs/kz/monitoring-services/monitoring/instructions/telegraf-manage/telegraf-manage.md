# {heading(telegraf және оның плагиндерін басқару)[id=monitoring-telegraf-manage]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Агент күйін қарау)[id=monitoring-telegraf-status]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=telegraf мониторинг агенті орнатылғанына көз жеткізіңіз]}.
1. {ifndef(private-pdf,private-pg-pdf)}[Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect){/ifndef}{ifdef(private-pdf,private-pg-pdf)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Қосылыңыз]}{/ifdef} виртуалды машинаға.
1. Команданы орындаңыз:

   {tabs}

   {tab(Linux)}

   ```console
   systemctl -l status telegraf
   ```

   {/tab}

   {/tabs}

## {heading(Агентті қосу немесе өшіру)[id=monitoring-telegraf-on-off]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=telegraf мониторинг агенті орнатылғанына көз жеткізіңіз]}.
1. {ifndef(private-pdf,private-pg-pdf)}[Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect){/ifndef}{ifdef(private-pdf,private-pg-pdf)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Қосылыңыз]}{/ifdef} виртуалды машинаға.

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

## {heading(Метрикаларды қосу немесе өшіру)[id=monitoring-telegraf-metrics]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=telegraf мониторинг агенті орнатылғанына көз жеткізіңіз]}.
1. {ifndef(private-pdf,private-pg-pdf)}[Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect){/ifndef}{ifdef(private-pdf,private-pg-pdf)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Қосылыңыз]}{/ifdef} виртуалды машинаға.
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

## {heading(Қосымша метрикаларды баптау үшін плагинді қосу немесе өшіру)[id=monitoring-telegraf-plugin]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=telegraf мониторинг агенті орнатылғанына көз жеткізіңіз]}.
1. {ifndef(private-pdf,private-pg-pdf)}[Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect){/ifndef}{ifdef(private-pdf,private-pg-pdf)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Қосылыңыз]}{/ifdef} виртуалды машинаға.
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

## {heading(Агент логтарын қарау)[id=monitoring-telegraf-logs]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=telegraf мониторинг агенті орнатылғанына көз жеткізіңіз]}.
1. {ifndef(private-pdf,private-pg-pdf)}[Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect){/ifndef}{ifdef(private-pdf,private-pg-pdf)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Қосылыңыз]}{/ifdef} виртуалды машинаға.
1. Команданы орындаңыз:

   {tabs}

   {tab(Linux)}

   ```console
   journalctl -u telegraf
   ```

   {/tab}

   {/tabs}

## {heading(Агентті жою)[id=monitoring-telegraf-delete]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=telegraf мониторинг агенті орнатылғанына көз жеткізіңіз]}.
1. {ifndef(private-pdf,private-pg-pdf)}[Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect){/ifndef}{ifdef(private-pdf,private-pg-pdf)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Қосылыңыз]}{/ifdef} виртуалды машинаға.
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
