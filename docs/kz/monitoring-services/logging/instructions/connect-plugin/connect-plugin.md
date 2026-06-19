# {heading(Плагинді орнату)[id=logging-connect-plugin]}

{include(/kz/_includes/_translated_by_ai.md)}

1. ВМ-ге 2.1.9 нұсқасындағы [Fluent Bit](https://docs.fluentbit.io/manual/installation/linux/ubuntu) орнатыңыз:

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

   Орнатудан кейін `vkcloudlogs-fluent-bit.service` лог жинау агенті пайда болады. Әдепкі бойынша ол өшірілген.

   {note:info}
   `vkcloudlogs-fluent-bit.service` агенті келесі файлдармен жұмыс істейді:

   - `/etc/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit.conf` — логтау үшін көздер мен тағайындау жолдарының сипаттамалары бар агенттің негізгі конфигурация файлы. Толығырақ {linkto(../../concepts/logging-plugin#logging-logging-plugin)[text=%text]} бөлімінде және [Fluent Bit ресми құжаттамасында](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode).
   - `/etc/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugins.conf` — плагинді қосу конфигурациясы.
   {/note}

1. Плагинді Cloud Logging сервисіне логтар жіберуге баптаңыз.

   1. Жобаңыз үшін плагинді авторизациялау параметрлерін {linkto(../../concepts/logging-plugin#logging-auth-parameters)[text=біліңіз]}.
   1. `vkcloudlogs-fluent-bit.conf` файлында плагинді қосу параметрлерін көрсетіңіз:

      {cut(vkcloudlogs-fluent-bit.conf)}

      Бұл мысалда `ssh.service` қызметінен деректерді логтау (`[INPUT]` секциясы) Cloud Logging сервисіне (`[OUTPUT]` секциясы) бапталады.

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

1. Келесі команданы орындап, `vkcloudlogs-fluent-bit.service` лог жинау агентін қосыңыз:

   ```console
   sudo systemctl enable vkcloudlogs-fluent-bit.service
   sudo systemctl start vkcloudlogs-fluent-bit.service
   ```

1. Деректер жиналуы үшін бірнеше минут күтіңіз.
1. {ifdef(public)}[жеке кабинетте](https://kz.cloud.vk.com/app/services/monitoring/logging){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=жеке кабинетте]}{/ifndef} {var(cloud)} **Мониторинг** → **Логтау** бөлімінде логтардың бар-жоғын тексеріңіз.
