[GitLab](https://about.gitlab.com/) — инструмент для совместной работы над проектами разработки программного обеспечения. Он обеспечивает хранение и управление репозиториями Git, а также контроль версий программного кода. GitLab автоматизирует процессы CI/CD: сборку, тестирование и развертывание ПО. Для запуска и автоматического выполнения задач CI/CD в GitLab используется приложение GitLab Runner.

Далее показан пример установки бесплатных версий GitLab и GitLab Runner на виртуальную машину с ОС Ubuntu 22.04. В качестве инструмента для установки используются платформа контейнеризации Docker и ее плагин Docker Compose.

## Подготовительные шаги

1. [Зарегистрируйтесь](/ru/additionals/start/account-registration) в VK Cloud.
1. [Создайте](/ru/networks/vnet/operations/manage-net#sozdanie_seti) сеть `network1` с доступом в интернет и подсетью `10.0.0.0/24`.
1. [Создайте](/ru/networks/vnet/operations/secgroups) группу безопасности `gitlab` и добавьте в нее  разрешения на входящий трафик для портов:

   - `80` (HTTP),
   - `443` (HTTPS),
   - `22` (SSH),
   - `35242` (SSH).

   Вместо `35242` можно использовать любой порт, не зарезервированный операционной системой.

1. [Создайте ВМ](/ru/base/iaas/service-management/vm/vm-create) с операционной системой Ubuntu.

   При выборе параметров ВМ учитывайте [требования к оборудованию](https://docs.gitlab.com/ee/install/requirements.html), необходимые для установки GitLab и GitLab Runner.

   В качестве примера используется следующая конфигурация ВМ:

     - имя: `OA-Ubuntu-docker`;
     - операционная система: Ubuntu 22.04;
     - сеть: `network1` с подсетью `10.0.0.0/24`;
     - [шаблон конфигурации](/ru/base/iaas/concepts/about#shablony_konfiguraciy): `STD2-4-12`;
     - сетевой HDD-диск: 50 ГБ;
     - публичный IP-адрес: назначен, далее будет использоваться `185.185.185.185`;
     - группы безопасности: `default`, `gitlab`.

   <info>

   При создании ВМ с ОС Ubuntu автоматически создается пользователь с именем `ubuntu` и полными правами на использование `sudo`.

   </info>

1. (Опционально) Назначьте виртуальной машине доменное имя, которое будет использоваться для доступа к GitLab, одним из способов:

   - Если у вас есть домен, добавьте в него вашу ВМ.
   - Если домена нет, воспользуйтесь, например, [NoIP](https://www.noip.com/) — одним из сервисов, предоставляющих динамический DNS. Для этого установите на ВМ клиент динамического обновления, подробнее в [документации сервиса NoIP](https://www.noip.com/support/knowledgebase/installing-the-linux-dynamic-update-client-on-ubuntu).

    <details>
        <summary>Зачем назначать доменное имя?</summary>
        Вы можете установить GitLab на ВМ, у которой нет доменного имени. При этом автоматически будут выпущены самоподписанные SSL-сертификаты для подключения к GitLab по протоколу HTTPS. Однако общедоступный SSL-сертификат для GitLab вы выпустить не сможете. В результате при переходе на страницу авторизации вашего сервера GitLab пользователи будут видеть предупреждение: «Подключение не защищено».

    </details>

1. [Подключитесь к ВМ](/ru/base/iaas/service-management/vm/vm-connect/vm-connect-nix) `OA-Ubuntu-docker` по SSH.
1. Проверьте состояние файервола операционной системы и отключите его, если он активен:

    ```bash
    sudo ufw status
    sudo ufw disable
    ```

    <info>

    В файерволе ОС нет необходимости, так как прохождением входящего и исходящего трафика на ВМ [управляет файервол VK Cloud](/ru/networks/vnet/concepts/traffic-limiting).

    </info>

1. [Установите и настройте Docker](/ru/additionals/cases/cases-docker-ce/docker-ce-u18).
1. Установите плагин [Docker Compose](https://docs.docker.com/compose/):

   1. Обновите список доступных пакетов Ubuntu и их версий:

        ```bash
        sudo apt-get update
        ```

   1. Установите последнюю версию плагина Docker Compose:

        ```bash
        sudo apt-get install docker-compose-plugin
        ```

   1. Убедитесь, что плагин установлен правильно, запросив его версию:

        ```bash
        docker compose version
        ```

        Ожидаемый результат:

        ```bash
        Docker Compose version vN.N.N
        ```

        Здесь `N.N.N` — номер версии плагина.

## 1. Измените порт для подключений к ВМ по SSH

GitLab для доступа по SSH по умолчанию использует порт `22`, который зарезервирован в системе для подключения к ВМ по SSH. Чтобы не возникало конфликта, измените системный порт SSH на другой.

1. Откройте для редактирования файл `/etc/ssh/sshd_config`:

    ```bash
    sudo nano /etc/ssh/sshd_config
    ```

1. Замените строку `#Port 22` на `Port 35242`.

    <info>

    Номер `35242` использован в качестве примера. Если вы используете другой номер, откройте его для подключения по SSH в настройках файервола ВМ. Подробнее в разделе [Управление правилами файервола](/ru/networks/vnet/operations/secgroups).

    </info>

1. Сохраните файл и завершите работу с редактором, нажав CTRL+O, а затем CTRL+X.

1. Перезапустите сервис `sshd`:

    ```bash
    sudo systemctl restart sshd
    ```

1. Закройте текущий сеанс подключения к ВМ:

    ```bash
    exit
    ```

1. Подключитесь к ВМ `OA-Ubuntu-docker` по SSH, используя новый порт:

    ```bash
    ssh -i <путь к ключу> ubuntu@185.185.185.185 -p 35242
    ```

    Вместо `185.185.185.185` можно использовать полное доменное имя ВМ, если оно есть.

## 2. Установите GitLab и GitLab Runner с помощью Docker Compose

1. Создайте директории для постоянного хранилища GitLab, последовательно выполнив команды:

    ```bash
    sudo mkdir -p /opt/gitlab
    sudo mkdir -p /opt/gitlab/config
    sudo mkdir -p /opt/gitlab/logs
    sudo mkdir -p /opt/gitlab/data
    sudo mkdir -p /opt/gitlab-runner
    sudo mkdir -p /opt/gitlab-runner/config
    sudo mkdir -p /opt/gitlab-runner/data
    ```

1. Создайте и откройте для редактирования файл конфигурации для Docker Compose:

    ```bash
    sudo nano docker-compose.yml
    ```

1. Скопируйте в окно редактора следующее содержимое, заменив `185.185.185.185` на внешний IP-адрес ВМ или ее полное доменное имя:

    <details>
      <summary>Содержимое файла docker-compose.yml</summary>

      ```yaml
      version: '3.7'
      services:
        gitlab:
          container_name: gitlab
          image: 'gitlab/gitlab-ce:latest'
          restart: always
          hostname: '185.185.185.185'
          environment:
            GITLAB_OMNIBUS_CONFIG: |
              external_url 'https://185.185.185.185'
              # Add any other gitlab.rb configuration here, each on its own line
          ports:
            - '80:80'
            - '443:443'
            - '22:22'
          volumes:
            - '/opt/gitlab/config:/etc/gitlab'
            - '/opt/gitlab/logs:/var/log/gitlab'
            - '/opt/gitlab/data:/var/opt/gitlab'

        gitlab-runner:
          container_name: gitlab-runner
          image: gitlab/gitlab-runner:latest
          restart: always
          volumes:
            - '/opt/gitlab-runner/data:/home/gitlab_ci_multi_runner/data'
            - '/opt/gitlab-runner/config:/etc/gitlab-runner'
            - '/var/run/docker.sock:/var/run/docker.sock:rw'
          environment:
            - CI_SERVER_URL=https://185.185.185.185/ci
      ```

    </details>

    <info>

    При необходимости добавьте дополнительные настройки ниже строки с комментарием `# Add…`. Описание параметров файла конфигурации для плагина Docker Compose приведено в [официальной документации Docker](https://docs.docker.com/compose/compose-file/03-compose-file/).

    </info>

1. Сохраните файл и завершите работу с редактором, нажав CTRL+O, а затем CTRL+X.
1. Запустите Docker Compose:

    ```bash
    sudo docker compose up -d
    ```

    <details>
      <summary>Вывод при успешной операции</summary>

      ```txt
      [+] Running 13/13
      ✔ gitlab-runner 3 layers [⣿⣿⣿]      0B/0B      Pulled                 19.4s
      ✔ 527f5363b98e Pull complete                                            1.7s
      ✔ 5aa2f01642ad Pull complete                                            5.8s
      ✔ 112312283fb7 Pull complete                                            2.2s
      ✔ gitlab 8 layers [⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                 83.0s
      ✔ 3dd181f9be59 Pull complete                                            0.9s
      ✔ 5222e10cb5b3 Pull complete                                            0.7s
      ✔ b86fffbd1d96 Pull complete                                            0.6s
      ✔ a8f85f865bd2 Pull complete                                            1.0s
      ✔ fd086081fce9 Pull complete                                            1.2s
      ✔ 9c3df03dc259 Pull complete                                            1.4s
      ✔ 539bd3fbd6f5 Pull complete                                            1.5s
      ✔ fceb275916b3 Pull complete                                           13.3s
      [+] Running 3/3
      ✔ Network ubuntu_default   Created                                      1.4s
      ✔ Container gitlab         Started                                     49.4s
      ✔ Container gitlab-runner  Started                                     49.4s
      ```
    </details>  

## 3. Проверьте состояние контейнера GitLab

Выполните команду:

```bash
sudo docker ps
```

Вывод при успешной операции:

```txt
CONTAINER ID   IMAGE                         COMMAND                  CREATED         STATUS                            PORTS                                                                                                         NAMES
1e6cee4fe37a   gitlab/gitlab-ce:latest       "/assets/wrapper"        4 minutes ago   Up 9 seconds (health: starting)   0.0.0.0:22->22/tcp, :::22->22/tcp, 0.0.0.0:80->80/tcp, :::80->80/tcp, 0.0.0.0:443->443/tcp, :::443->443/tcp   gitlab
882fc3fb80f5   gitlab/gitlab-runner:latest   "/usr/bin/dumb-init …"   4 minutes ago   Up 4 minutes                                                                                                                                    gitlab-runner
```

## 4. (Опционально) Выпустите общедоступный SSL-сертификат для ВМ

Если у ВМ, на которой установлен GitLab, есть доменное имя, вы можете выпустить для GitLab общедоступный SSL-сертификат, например, от компании [Let’s Encrypt](https://letsencrypt.org/). Подробнее в [официальной документации GitLab](https://docs.gitlab.com/omnibus/settings/ssl/).

## 5. Проверьте работоспособность GitLab

1. Получите и скопируйте автоматически сгенерированный пароль администратора GitLab:

    ```bash
    sudo cat /opt/gitlab/config/initial_root_password
    ```

    Вывод при успешной операции:

    ```txt
    # WARNING: This value is valid only in the following conditions
    #          1. If provided manually (either via `GITLAB_ROOT_PASSWORD` environment variable or via `gitlab_rails['initial_root_password']` setting in `gitlab.rb`, it was provided before database was seeded for the first time (usually, the first reconfigure run).
    #          2. Password hasn't been changed manually, either via UI or via command line.
    #
    #          If the password shown here doesn't work, you must reset the admin password following https://docs.gitlab.com/ee/security/reset_user_password.html#reset-your-root-password.

    Password: /XR7tRH_ХХХХ=

    # NOTE: This file will be automatically deleted in the first reconfigure run after 24 hours.
    ```

1. В браузере перейдите по адресу `https://185.185.185.185`.

    Вместо `185.185.185.185` можно использовать полное доменное имя ВМ, если оно есть.

    Откроется страница авторизации входа в GitLab.

1. Используйте для входа логин администратора (`root`) и скопированный пароль.

    Откроется панель управления GitLab. Установка завершена, GitLab готов к работе.

## Удалите неиспользуемые ресурсы

Развернутые виртуальные ресурсы тарифицируются. Если они вам больше не нужны:

- [Удалите](/ru/base/iaas/service-management/vm/vm-manage#udalenie_vm) ВМ `OA-Ubuntu-docker`.
- При необходимости [удалите](/ru/networks/vnet/operations/manage-floating-ip#udalenie_plavayushchego_ip_adresa_iz_proekta) плавающий IP-адрес `185.185.185.185`.
