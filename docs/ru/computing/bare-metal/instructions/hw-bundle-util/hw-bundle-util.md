# {heading(Сбор диагностических данных утилитой hw-bundle-util)[id=bare-metal-instructions-hw-bundle-util]}

Для сбора диагностических данных сервера Bare Metal используется {linkto(../../concepts/hw-bundle-util#bare-metal-concepts-hw-bundle-util)[text=утилита hw-bundle-util]}.

1. Установите недостающие пакеты с {linkto(../../concepts/hw-bundle-util#bare-metal-concepts-hw-bundle-util-collect)[text=вспомогательными утилитами]}, которые использует `hw-bundle-util`:

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

1. Скачайте и распакуйте архив с утилитой, а затем выдайте файлу права на исполнение. Выберите команду под архитектуру вашего сервера:

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

1. Запустите `hw-bundle-util` с необходимыми {linkto(../../concepts/hw-bundle-util#bare-metal-concepts-hw-bundle-util-launch)[text=параметрами]}. При запуске без указания дополнительных параметров рядом с исполняемым файлом `hw-bundle-util` будет создан архив `bmaas-bundle.tar.gz`. Если такой файл уже существует, он будет перезаписан.

   Чтобы получить наиболее полные диагностические данные, рекомендуется запускать `hw-bundle-util` с привилегиями суперпользователя через команду `sudo`:

   ```console
   sudo ./hw-bundle-util
   ```

1. Дождитесь завершения работы `hw-bundle-util`.
1. Проверьте {linkto(../../concepts/hw-bundle-util#bare-metal-concepts-hw-bundle-util-exit-codes)[text=код возврата]}:

   ```console
   echo $?
   ```

   При успешном сборе всех данных в ответе будет указан код `0`.

1. Проверьте готовый результат. Для этого распакуйте архив с отчетом:

   ```console
   tar -xvf bmaas-bundle.tar.gz
   ```

1. Проверьте необходимые файлы. Подробная информация о содержании отчета — в разделе {linkto(../../concepts/hw-bundle-util#bare-metal-concepts-hw-bundle-util-result)[text=%text]}.