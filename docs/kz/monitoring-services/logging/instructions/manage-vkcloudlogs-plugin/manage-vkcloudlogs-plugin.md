# {heading(Логтау агентін басқару)[id=logging-manage-plugin]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Агентті қосу немесе өшіру)[id=logging-plugin-on-off]}

1. {ifndef(private-pdf,private-pg-pdf)}[Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect){/ifndef}{ifdef(private-pdf,private-pg-pdf)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Қосылыңыз]}{/ifdef} виртуалды машинаға.
1. `vkcloudlogs-fluent-bit-plugin` плагині орнатылғанына {linkto(../connect-plugin#logging-connect-plugin)[text=көз жеткізіңіз]}.

- Агентті қосу үшін келесі команданы орындаңыз:

  {tabs}

  {tab(Linux)}

  ```console
  sudo systemctl enable vkcloudlogs-fluent-bit.service
  sudo systemctl start vkcloudlogs-fluent-bit.service
  ```

  {/tab}

  {/tabs}

- Агентті өшіру үшін келесі команданы орындаңыз:

  {tabs}

  {tab(Linux)}

  ```console
  sudo systemctl stop vkcloudlogs-fluent-bit.service
  sudo systemctl disable vkcloudlogs-fluent-bit.service
  ```

  {/tab}

  {/tabs}

## {heading(Қосымша мәтіндік файлдардан логтарды жинау үшін агентті баптау)[id=logging-configure-agent]}

1. {ifndef(private-pdf,private-pg-pdf)}[Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect){/ifndef}{ifdef(private-pdf,private-pg-pdf)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Қосылыңыз]}{/ifdef} виртуалды машинаға.
1. `vkcloudlogs-fluent-bit-plugin` плагині орнатылғанына {linkto(../connect-plugin#logging-connect-plugin)[text=көз жеткізіңіз]}.
1. `vkcloudlogs-fluent-bit.conf` файлын қажетті түрде түзетіңіз:

   - `[INPUT]` секциясында логтар көзі файлына апаратын жолды `Path` параметрінде және тегті `Tag` параметрінде көрсетіңіз;
   - `[OUTPUT]` секциясында жазбалар логтарға түсуі үшін орнатылған тегті көрсетіңіз.

   {cut(/var/log/auth.log файлын қосу мысалы)}

   ```ini
   [INPUT]
      Name             tail
      Path             /var/log/auth.log
      Skip_Empty_Lines On
      Tag              vkcloudlogs.tail.auth.log

   [OUTPUT]
      Name              vkcloudlogs
      Match             vkcloudlogs.tail.*
      auth_url          https://infra.mail.ru:5000/v3/
      server_host_port  cloudlogs.mcs.mail.ru:443
      user_id           user1
      password          pwd12345
      project_id        XXXX000XXXX00
   ```

   {/cut}

   {note:info}

   Логтарды жинау көзін жою үшін `vkcloudlogs-fluent-bit.conf` файлынан тиісті жазбаларды алып тастаңыз.

   {/note}

1. Агентті қайта іске қосыңыз:

   {tabs}

   {tab(Linux)}

   ```console
   sudo systemctl restart vkcloudlogs-fluent-bit.service
   ```

   {/tab}

   {/tabs}

## {heading(Агент пен плагинді жою)[id=logging-plugin-delete]}

1. {ifndef(private-pdf,private-pg-pdf)}[Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect){/ifndef}{ifdef(private-pdf,private-pg-pdf)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Қосылыңыз]}{/ifdef} виртуалды машинаға.
1. Келесі команданы орындаңыз:

   {tabs}

   {tab(CentOS 7.X, CentOS 8.X, RedOS 7, AlmaLinux 9)}

   ```console
   sudo yum remove vkcloudlogs-fluent-bit-plugin.x86_64
   ```

   {/tab}

   {tab(Ubuntu 22.X, Astra Linux)}

   ```console
   sudo apt remove vkcloudlogs-fluent-bit-plugin
   ```

   {/tab}

   {tab(AltLinux Server)}

   ```console
   sudo apt-get remove vkcloudlogs-fluent-bit-plugin
   ```

   {/tab}

   {/tabs}
