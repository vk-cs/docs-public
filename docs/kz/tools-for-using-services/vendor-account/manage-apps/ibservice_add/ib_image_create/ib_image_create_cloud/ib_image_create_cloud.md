# {heading(Бұлтты платформаның ЖК арқылы жасау)[id=ib_image_create_cloud]}

{include(/kz/_includes/_translated_by_ai.md)}

Сервис образын бұлтты платформаның ЖК арқылы жасау үшін:

1. Бұлтты платформаның ЖК-не кіріңіз.
1. ВМ жасаңыз:

   1. Сол жақ мәзірде **Бұлтты есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
   1. **Қосу** батырмасын басыңыз.
   1. ВМ жасау пішінінде ВМ параметрлерін орнатыңыз.

      {note:warn}

      ОС {linkto(../ib_image_requirements#ib_image_requirements)[text=сервис образына қойылатын талаптарға]} сәйкес келуі керек.

      {/note}
   1. ВМ жасауды растаңыз.

1. ВМ-ге БҚ орнатыңыз:

   1. Жасалған ВМ бетіне өтіңіз.
   1. **Сыртқы IP тағайындау** батырмасы арқылы сыртқы IP-мекенжайын тағайындаңыз.
   1. SSH арқылы ВМ-ге қосылыңыз:

      ```console
      $ ssh -i <KEY_PATH> <USER_NAME>@<FLOATING_IP>
      ```

      Мұнда:

      * `<KEY_PATH>` — ВМ-ге қол жеткізуге арналған жабық кілт файлына апаратын жол.
      * `<USER_NAME>` — ОС пайдаланушысының аты. Атын ОС-ке байланысты көрсетіңіз. Атаулар тізімі [Linux ВМ-ге қосылу](/kz/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) бөлімінде берілген.
      * `<FLOATING_IP>` — ВМ-нің сыртқы IP-мекенжайы.

   1. Егер ВМ-де {linkto(../ib_image_requirements#ib_image_requirements)[text=сервис образына қойылатын талаптарда]} көрсетілген бағдарламалық пакеттер орнатылмаған болса, оларды орнатыңыз.

      {caption(`Ubuntu` ОС-інде `curl` орнату командасының мысалы)[align=left;position=above]}
      ```console
      $ sudo apt install curl
      ```
      {/caption}

   1. ВМ-ге image-based қолданбасының БҚ-сын орнатыңыз.
   1. Егер метрикаларды Cloud Monitoring сервисіне жіберу қажет болса, мониторинг агентін орнатыңыз (толығырақ — [ВМ жүйелік метрикалары](../../../ib_cloud_monitoring/ib_cloud_monitoring_vm) бөлімінде).

1. ВМ-ді сезімтал деректерден тазалаңыз:

   * RHEL ОС-тері үшін (CentOS, AlmaLinux, Rocky Linux) келесі командаларды орындаңыз:

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

   * Debian ОС-тері үшін (Ubuntu) келесі командаларды орындаңыз:

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

   Сервисті дүкенде жарияламас бұрын образ бұлтты платформада жарияланады (толығырақ — {linkto(../../../ibservice_add/ibservice_upload/ibservice_upload_publish_image#ibservice_upload_publish_image)[text=%text]} бөлімінде). Бұлтты платформа пайдаланушыларындағы сервис инстанстары жария образ негізінде өрістетіледі. Образ деректері жалпыға қолжетімді болады.

   {/note}
1. ВМ-ді тоқтатыңыз:

   ```console
   $ sudo /sbin/shutdown -hP now
   ```

1. ВМ дискісінің негізінде сервис образын жасаңыз:

   1. Сол жақ мәзірде **Бұлтты есептеулер** → **Образдар** бөліміне өтіңіз.
   1. **Образ жасау** батырмасын басыңыз.
   1. Ашылған терезеде **Диск** көзін таңдаңыз.
   1. Жасалған және бапталған ВМ дискіні таңдаңыз.

      ВМ дискінің атауы оның бетіндегі **Дискілер** қойындысында көрсетіледі.
   1. Образ атауын көрсетіңіз.
   1. Образ жасауды растаңыз. Жасалған сервис образының ID-і осы образ жолында көрсетіледі.
