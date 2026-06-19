# {heading(Управление агентом логирования)[id=logging-manage-plugin]}

## {heading(Включение или отключение агента)[id=logging-plugin-on-off]}

1. {ifdef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]}{/ifdef}{ifndef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Подключитесь]}{/ifndef} к виртуальной машине.
1. {linkto(../connect-plugin#logging-connect-plugin)[text=Убедитесь]}, что у вас установлен плагин `vkcloudlogs-fluent-bit-plugin`.

- Чтобы включить агент, выполните команду:

  {tabs}

  {tab(Linux)}

  ```console
  sudo systemctl enable vkcloudlogs-fluent-bit.service
  sudo systemctl start vkcloudlogs-fluent-bit.service
  ```

  {/tab}

  {/tabs}

- Чтобы отключить агент, выполните команду:

  {tabs}

  {tab(Linux)}

  ```console
  sudo systemctl stop vkcloudlogs-fluent-bit.service
  sudo systemctl disable vkcloudlogs-fluent-bit.service
  ```

  {/tab}

  {/tabs}

## {heading(Настройка агента для сбора логов из дополнительных текстовых файлов)[id=logging-configure-agent]}

1. {ifdef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]}{/ifdef}{ifndef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Подключитесь]}{/ifndef} к виртуальной машине.
1. {linkto(../connect-plugin#logging-connect-plugin)[text=Убедитесь]}, что у вас установлен плагин `vkcloudlogs-fluent-bit-plugin`.
1. Скорректируйте файл `vkcloudlogs-fluent-bit.conf` нужным образом:

   - в секции `[INPUT]` укажите путь к файлу-источнику логов в параметре `Path` и тег в параметре `Tag`;
   - в секции `[OUTPUT]` укажите установленный тег, чтобы записи попадали в логи.

   {ifdef(public)}
   {cut(Пример подключения файла /var/log/auth.log)}

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
   {/ifdef}

   {ifndef(public)}
   {cut(Пример подключения файла /var/log/auth.log)}

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
   {/ifndef}

   {/cut}

   {note:info}
   Чтобы удалить источник сбора логов, уберите соответствующие записи из файла `vkcloudlogs-fluent-bit.conf`.
   {/note}

1. Перезапустите агент:

   {tabs}

   {tab(Linux)}

   ```console
   sudo systemctl restart vkcloudlogs-fluent-bit.service
   ```

   {/tab}

   {/tabs}

## {heading(Удаление агента и плагина)[id=logging-plugin-delete]}

1. {ifdef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]}{/ifdef}{ifndef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Подключитесь]}{/ifndef} к виртуальной машине.
1. Выполните команду:

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
