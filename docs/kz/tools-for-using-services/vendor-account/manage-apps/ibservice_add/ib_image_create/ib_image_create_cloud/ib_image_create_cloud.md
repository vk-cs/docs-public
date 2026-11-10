# {heading(Бұлт платформасының ЖК арқылы жасау)[id=ib_image_create_cloud]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Сервис бейнесін бұлт платформасының ЖК арқылы жасау үшін:

1. Бұлт платформасының ЖК-сына кіріңіз.
1. ВМ жасаңыз:

   1. Сол жақ мәзірде **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
   1. **Қосу** батырмасын басыңыз.
   1. ВМ жасау формасында ВМ параметрлерін орнатыңыз.

      {note:warn}

      ОС [сервис бейнесіне қойылатын талаптарға](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based#image_based_req_image) сәйкес болуы тиіс.

      {/note}
   1. ВМ жасауды растаңыз.

1. ВМ-ге БЖ орнатыңыз:

   1. Жасалған ВМ бетіне өтіңіз.
   1. **Сыртқы IP тағайындау** батырмасы арқылы сыртқы IP-адресті тағайындаңыз.
   1. ВМ-ге SSH арқылы қосылыңыз:

      ```console
      $ ssh -i <KEY_PATH> <USER_NAME>@<FLOATING_IP>
      ```

      Мұнда:

      * `<KEY_PATH>` — ВМ-ге кіру жабық кілті бар файлға жол.
      * `<USER_NAME>` — ОС пайдаланушысының аты. Атты ОС-қа байланысты көрсетіңіз. Аттар тізімі [Linux ВМ-ге қосылу](/kz/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) бөлімінде келтірілген.
      * `<FLOATING_IP>` — ВМ-нің сыртқы IP-адресі.

   1. Егер ВМ-де [сервис бейнесіне қойылатын талаптарда](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based#image_based_req_image) көрсетілген бағдарламалық пакеттер орнатылмаған болса, оларды орнатыңыз.

      {caption(Ubuntu ОС-нде `curl` орнату үшін команда мысалы)[align=left;position=above]}
      ```console
      $ sudo apt install curl
      ```
      {/caption}

   1. Image-based қосымшаның БЖ-н ВМ-ге орнатыңыз.
   1. Егер Cloud Monitoring сервисіне метрикаларды жіберу қажет болса, мониторинг агентін орнатыңыз (толығырақ — [ВМ жүйелік метрикалары](../../../ib_cloud_monitoring/ib_cloud_monitoring_vm) бөлімінде).

1. ВМ-ді сезімтал деректерден тазалаңыз:

   * RHEL (CentOS, AlmaLinux, Rocky Linux) ОС-і үшін командаларды орындаңыз:

      ```console
      # Очистить логи cloud-init
      $ sudo cloud-init clean --log --seed

      # Очистить ssh-ключи
      $ sudo rm -f /etc/ssh/*host*key*

      # Очистить логи
      $ sudo find /var/log -maxdepth 5 -type f -exec rm -fv {} \;

      # Удалить tmp-файлы
      $ sudo rm -rf /tmp/* /var/tmp/*

      # Очистить системные файлы
      $ sudo truncate -s 0 /etc/machine-id /etc/resolv.conf /var/log/audit/audit.log /var/log/wtmp \
      /var/log/lastlog /var/log/btmp /var/log/cron /var/log/maillog /var/log/messages /var/log/secure \
      /var/log/spooler

      # Удалить системные файлы
      $ sudo rm -rf /etc/hostname /etc/machine-info /var/lib/systemd/credential.secret /var/lib/cloud /var/log/tuned \
      /var/log/qemu-ga /var/log/anaconda /var/lib/systemd/random-seed

      # Инициализировать диск, заполнить нулями
      $ sudo dd if=/dev/zero of=/zeroed_file bs=1M oflag=direct || sudo rm -f /zeroed_file

      # Очистить историю команд
      $ history -c

      # Синхронизировать файловую систему
      $ sudo sync
      ```

   * Debian (Ubuntu) ОС-і үшін командаларды орындаңыз:

      ```console
      # Очистить логи cloud-init
      $ sudo cloud-init clean --log --seed

      # Очистить ssh-ключи
      $ sudo rm -f /etc/ssh/*host*key*

      # Очистить логи
      $ sudo find /var/log -maxdepth 5 -type f -exec rm -fv {} \;

      # Удалить tmp-файлы
      $ sudo rm -rf /tmp/* /var/tmp/*

      # Очистить файл machine-id
      $ sudo truncate -s 0 /etc/machine-id /var/lib/dbus/machine-id

      # Инициализировать диск, заполнить нулями
      $ sudo dd if=/dev/zero of=/zeroed_file bs=1M oflag=direct || sudo rm -f /zeroed_file

      # Очистить кеш пакетного менеджера
      $ sudo apt-get -y autoremove --purge
      $ sudo apt-get -y clean
      $ sudo apt-get -y autoclean

      # Очистить историю команд
      $ history -c

      # Синхронизировать файловую систему
      $ sudo sync
      ```

   {note:err}

   Сервисті дүкенде жарияламас бұрын бейне бұлт платформасында жарияланады (толығырақ — {linkto(../../../ibservice_add/ibservice_upload/ibservice_upload_publish_image#ibservice_upload_publish_image)[text=%text]} бөлімінде). Жәрмеңке бейнесінің негізінде бұлт платформасының пайдаланушыларында сервис инстанстары орналастырылатын болады. Бейненің деректері жалпыға қолжетімді болады.

   {/note}
1. ВМ-ді тоқтатыңыз:

   ```console
   $ sudo /sbin/shutdown -hP now
   ```

1. ВМ дискінің негізінде сервис бейнесін жасаңыз:

   1. Сол жақ мәзірде **Бұлттық есептеулер** → **Бейнелер** бөліміне өтіңіз.
   1. **Бейне жасау** батырмасын басыңыз.
   1. Ашылған терезеде **Диск** дереккөзін таңдаңыз.
   1. Жасалған және бапталған ВМ-нің дисін таңдаңыз.

      ВМ дискінің аты оның бетінде **Дістер** қойыншасында көрсетіледі.
   1. Бейненің атын көрсетіңіз.
   1. Бейне жасауды растаңыз. Жасалған сервис бейнесінің ID-сі осы бейненің жолында көрсетіледі.