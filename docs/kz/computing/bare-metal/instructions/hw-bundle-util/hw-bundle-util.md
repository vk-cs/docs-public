# {heading(hw-bundle-util утилитасымен диагностикалық деректерді жинау)[id=bare-metal-instructions-hw-bundle-util]}

{include(/kz/_includes/_translated_by_ai.md)}

Bare Metal серверінің диагностикалық деректерін жинау үшін {linkto(../../concepts/hw-bundle-util#bare-metal-concepts-hw-bundle-util)[text=hw-bundle-util утилитасы]} пайдаланылады.

1. `hw-bundle-util` пайдаланатын {linkto(../../concepts/hw-bundle-util#bare-metal-concepts-hw-bundle-util-collect)[text=көмекші утилиталары]} бар жетіспейтін пакеттерді орнатыңыз:

   {tabs}

   {tab(Red Hat Enterprise Linux)}

   ```console
   sudo dnf install -y dmidecode ethtool bind-utils smartmontools rasdaemon edac-utils
   ```

   {/tab}

   {tab(Ubuntu/Debian)}

   ```console
   sudo apt update && \
   sudo apt install -y dmidecode ethtool dnsutils smartmontools rasdaemon edac-utils
   ```

   {/tab}

   {/tabs}

1. Утилитасы бар архивті жүктеп алып, оны ашыңыз, содан кейін файлға орындау құқығын беріңіз. Серверіңіздің архитектурасына сәйкес команданы таңдаңыз:

   {tabs}

   {tab(amd64)}

   ```console
   curl -fLO https://bm-hw-testing-util-art.hb.ru-msk.vkcloud-storage.ru/hw-bundle-util/latest/hw-bundle-util_linux_amd64.tar.gz && \
   tar -xvf ./hw-bundle-util_linux_amd64.tar.gz && \
   chmod +x ./hw-bundle-util
   ```

   {/tab}

   {tab(arm64)}

   ```console
   curl -fLO https://bm-hw-testing-util-art.hb.ru-msk.vkcloud-storage.ru/hw-bundle-util/latest/hw-bundle-util_linux_arm64.tar.gz && \
   tar -xvf ./hw-bundle-util_linux_arm64.tar.gz && \
   chmod +x ./hw-bundle-util
   ```

   {/tab}

   {/tabs}

1. `hw-bundle-util` утилитасын қажетті {linkto(../../concepts/hw-bundle-util#bare-metal-concepts-hw-bundle-util-launch)[text=параметрлермен]} іске қосыңыз. Қосымша параметрлерсіз іске қосқанда `hw-bundle-util` орындалатын файлының жанында `bmaas-bundle.tar.gz` архиві жасалады. Мұндай файл бұрыннан бар болса, ол қайта жазылады.

   Ең толық диагностикалық деректерді алу үшін `hw-bundle-util` утилитасын `sudo` командасы арқылы суперпайдаланушы құқықтарымен іске қосу ұсынылады:

   ```console
   sudo ./hw-bundle-util
   ```

1. `hw-bundle-util` жұмысының аяқталуын күтіңіз.
1. {linkto(../../concepts/hw-bundle-util#bare-metal-concepts-hw-bundle-util-exit-codes)[text=Қайтару кодын]} тексеріңіз:

   ```console
   echo $?
   ```

   Барлық деректер сәтті жиналса, жауапта `0` коды көрсетіледі.

1. Дайын нәтижені тексеріңіз. Ол үшін есеп архивін ашыңыз:

   ```console
   tar -xvf bmaas-bundle.tar.gz
   ```

1. Қажетті файлдарды тексеріңіз. Есеп мазмұны туралы толық ақпарат — {linkto(../../concepts/hw-bundle-util#bare-metal-concepts-hw-bundle-util-report)[text=%text]} бөлімінде.
