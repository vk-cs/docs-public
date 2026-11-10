# {heading(Плагинді орнату)[id=logging-connect-plugin]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

1. ВМ-ге [Fluent Bit](https://docs.fluentbit.io/manual/installation/linux/ubuntu) 2.1.9 нұсқасын орнатыңыз:

   ```console
   curl https://cloudlogging.hb.ru-msk.vkcloud-storage.ru/fluent-bit-install-scripts/install.sh | FLUENT_BIT_RELEASE_VERSION=2.1.9 sh
   ```

1. `vkcloudlogs-fluent-bit-plugin` плагинін орнатыңыз.

   {tabs}

   {tab(РЕД ОС 7.3, CentOS 7.X, CentOS 8.X, AlmaLinux 9.X)}

   ```console
   sudo rpm -i https://cloudlogging.hb.ru-msk.vkcloud-storage.ru/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin-0.1.3-1.x86_64.rpm
   ```

   {/tab}

   {tab(Ubuntu 22.X, Ubuntu 24.X, Astra Linux SE 1.7.X)}

   ```console
   curl -sSLo vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb https://cloudlogging.hb.ru-msk.vkcloud-storage.ru/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb
   sudo dpkg -i vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb
   ```

   {/tab}

   {tab(AltLinux Server p10)}

   ```console
   sudo apt-get install https://cloudlogging.hb.ru-msk.vkcloud-storage.ru/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin-0.1.3-1.x86_64.rpm
   ```

   {/tab}

   {/tabs}

   Орнатудан кейін `vkcloudlogs-fluent-bit.service` логтерді жинау агенті пайда болады. Әдепкі бойынша ол өшірулі.

   {note:info}
   `vkcloudlogs-fluent-bit.service` агенті мына файлдармен жұмыс істейді:

   - `/etc/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit.conf` — логтеу көздерінің сипаттамалары мен тағайындалу жолдары бар агенттің негізгі конфигурация файлы. Толығырақ {linkto(../../concepts/logging-plugin#logging-logging-plugin)[text=%text]} бөлімінде және [Fluent Bit ресми құжаттамасында](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode).
   - `/etc/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugins.conf` — плагинді қосу конфигурациясы.
   {/note}

1. Логтерді Cloud Logging сервисіне жіберу үшін плагинді баптаңыз.

   1. Сіздің жобаңыз үшін плагиннің авторизация параметрлерін {linkto(../../concepts/logging-plugin#logging-auth-parameters)[text=біліп алыңыз]}.
   1. Плагиннің қосу параметрлерін `vkcloudlogs-fluent-bit.conf` файлында көрсетіңіз:

      {cut(vkcloudlogs-fluent-bit.conf)}

      Осы мысалда `ssh.service` (секция `[INPUT]`) деректерін Cloud Logging сервисіне (секция `[OUTPUT]`) логтеу бапталады.

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
         auth_url          <ЭНДПОИНТ_KEYSTONE>
         project_id        <PID_ПРОЕКТА>
         server_host_port  <АДРЕС_СЕРВИСА>
         user_id           <ID_ПОЛЬЗОВАТЕЛЯ>
         password          <ПАРОЛЬ_ПОЛЬЗОВАТЕЛЯ>
      ```

      {/cut}

1. Логтерді жинау агентін `vkcloudlogs-fluent-bit.service` қосыңыз, команданы орындай отырып:

   ```console
   sudo systemctl enable vkcloudlogs-fluent-bit.service
   sudo systemctl start vkcloudlogs-fluent-bit.service
   ```

1. Деректер жиналу үшін бірнеше минут күтіңіз.
1. {var(cloud)} **Мониторинг** → **Логирование** бөлімінде {ifdef(public)}[жеке кабинетте](https://msk.cloud.vk.ru/app/services/monitoring/logging){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=жеке кабинетте]}{/ifndef} логтердің бар екенін тексеріңіз.