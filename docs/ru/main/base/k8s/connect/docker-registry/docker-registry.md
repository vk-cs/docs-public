Вы можете подключиться к реестру Docker, если в кластере установлен соответствующий [аддон](../../concepts/addons-and-settings/addons).

При [установке](../../operations/addons/advanced-installation/install-advanced-registry/) аддона для него создается стандартный балансировщик нагрузки с плавающим IP-адресом. Поэтому к реестру Docker можно подключиться с любого хоста, имеющего доступ в интернет.

## Подготовительные шаги

1. [Убедитесь](../../operations/addons/manage-addons#prosmotr-addonov), что аддон реестра Docker (`docker-registry`) установлен в кластере.
1. [Получите данные](../../operations/addons/advanced-installation/install-advanced-registry#poluchenie-dannyh-dlya-dostupa-k-reestru) для доступа к реестру Docker.

## Подключение к реестру Docker

На хосте, с которого планируется подключаться к реестру:

1. [Установите Docker Engine](https://docs.docker.com/engine/install/), если он еще не установлен. Доступны на выбор либо Docker Desktop, либо серверный вариант Docker Engine без графического интерфейса.

   Docker Engine должен быть установлен на хосте, с которого будет использоваться реестр. Дальнейшие шаги выполняйте на этом хосте.

1. Добавьте реестр Docker в список доверенных реестров:

   1. Добавьте в конфигурационный файл Docker `daemon.json` параметр `insecure-registries` с адресом эндпоинта реестра Docker.

      Адрес задается в формате `<URL реестра Docker>:<порт реестра Docker>`.

      ```json
      {
        ...

        "insecure-registries": [
          "https://192.0.2.2:5000"
        ],

        ...
      }
      ```

      Расположение этого файла для разных инсталляций Docker Engine приведено в [официальной документации Docker](https://docs.docker.com/config/daemon/#configure-the-docker-daemon).

   1. Перезапустите Docker Engine.

      <tabs>
      <tablist>
      <tab>Linux</tab>
      <tab>Windows</tab>
      <tab>macOS</tab>
      </tablist>
      <tabpanel>

      - Для серверного варианта Docker Engine выполните одну из команд для перезапуска:

        ```bash
        sudo systemd restart docker
        ```

        ```bash
        sudo service docker restart
        ```

      - Для Docker Desktop воспользуйтесь [графическим интерфейсом](https://docs.docker.com/desktop/settings/linux/#docker-engine).

      </tabpanel>
      <tabpanel>

      Воспользуйтесь [графическим интерфейсом](https://docs.docker.com/desktop/settings/mac/#docker-engine) Docker Desktop.

      </tabpanel>
      <tabpanel>

      Воспользуйтесь [графическим интерфейсом](https://docs.docker.com/desktop/settings/mac/#docker-engine) Docker Desktop.

      </tabpanel>
      </tabs>

1. Войдите в реестр:

   ```bash
   docker login <URL реестра Docker> --username <логин для реестра Docker>
   ```

   Введите пароль для реестра Docker.

Теперь вы можете выполнять любые операции с реестром, например, пушить туда Docker-образы.

Подробнее о работе с реестром в [официальной документации Docker](https://docs.docker.com/registry/).
