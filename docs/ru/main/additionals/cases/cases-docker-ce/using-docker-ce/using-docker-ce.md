Docker CE позволяет работать с образами Docker и управлять контейнерами. Для этого используются [команды Docker CLI](https://docs.docker.com/engine/reference/commandline/cli/). Команда Docker состоит из опций (options) и подкоманд (subcommands):

```bash
docker [OPTIONS] SUBCOMMAND
```

Чтобы посмотреть справку по Docker CLI, воспользуйтесь командами:

```bash
docker --help
```

```bash
docker SUBCOMMAND --help
```

Подробнее о работе с Docker читайте в [официальной документации](https://docs.docker.com/).

## Перед началом работы

Убедитесь, что:

- У вас есть доступ к терминалу хоста, на котором установлен Docker CE.
- Вы можете использовать `sudo` на этом хосте, чтобы выполнять команды от имени суперпользователя (`root`).

## Работа с образами

Контейнеры (containers) запускаются из образов (images) Docker. По умолчанию Docker получает образы из [Docker Hub](https://docs.docker.com/docker-hub/) — это реестр образов ([Docker Registry](https://docs.docker.com/registry/)).

Работа с образами будет продемонстрирована на примере образа ОС Ubuntu:

1. Посмотрите доступные образы с Ubuntu в Docker Hub:

   ```bash
   sudo docker search ubuntu
   ```

   В выводе команды будет содержаться список образов, которые подходят под условия поиска.

   <details>
   <summary>Пример вывода</summary>

   ```text
   NAME                             DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
   ubuntu                           Ubuntu is a Debian-based Linux operating sys…   15748     [OK]
   websphere-liberty                WebSphere Liberty multi-architecture images …   293       [OK]
   open-liberty                     Open Liberty multi-architecture images based…   59        [OK]
   neurodebian                      NeuroDebian provides neuroscience research s…   99        [OK]
   ubuntu-debootstrap               DEPRECATED; use "ubuntu" instead                50        [OK]
   ubuntu-upstart                   DEPRECATED, as is Upstart (find other proces…   112       [OK]
   ubuntu/nginx                     Nginx, a high-performance reverse proxy & we…   83

   ...
   ```

   </details>

1. Загрузите образ `ubuntu`:

   ```bash
   sudo docker pull ubuntu
   ```

   В выводе команды будет содержаться информация о ходе процесса загрузки.

   <details>
   <summary>Пример вывода</summary>

   ```text
   Using default tag: latest
   latest: Pulling from library/ubuntu
   2ab09b027e7f: Pull complete
   Digest: sha256:67211c14fa74f070d27cc59d69a7fa9aeff8e28ea118ef3babc295a0428a6d21
   Status: Downloaded newer image for ubuntu:latest
   docker.io/library/ubuntu:latest
   ```

   </details>

1. Убедитесь, что образ загружен, выполнив команду для просмотра загруженных образов:

   ```bash
   sudo docker images
   ```

   В выводе команды будет содержаться список загруженных образов.

   <details>
   <summary>Пример вывода</summary>

   ```text
   REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
   ubuntu        latest    08d22c0ceb15   2 weeks ago     77.8MB
   hello-world   latest    feb5d9fea6a5   18 months ago   13.3kB
   ```

   </details>

## Создание и запуск контейнера

Чтобы создать и запустить контейнер, который использует загруженный образ, используйте команду `docker run`. Эта команда [является комбинацией команд](https://docs.docker.com/engine/reference/commandline/run/) `docker create` и `docker start`.

Эта операция будет продемонстрирована для загруженного ранее образа `ubuntu`:

1. Создайте и запустите контейнер:

   ```bash
   sudo docker run -it ubuntu
   ```

   После запуска контейнера появится доступ к терминалу (TTY) контейнера с bash-сессией (это достигается комбинацией опций `-it`). В результате выполнения команды вы получите приглашение командной строки bash следующего вида:

   ```text
   root@8502eb90112b:/#
   ```

   В этом примере вывода `8502eb90112b` — идентификатор созданного контейнера.

1. Чтобы проверить работоспособность контейнера, установите [Node.js](https://nodejs.org/en/about) внутри него.

   1. Выполните команду:

      ```bash
      apt update && apt install nodejs -y
      ```

   1. Выведите информацию об установленной версии Node.js:

      ```bash
      node -v
      ```

      Пример вывода:

      ```text
      v12.22.9
      ```

1. Выйдите из командной строки bash контейнера:

   ```bash
   exit
   ```

   Контейнер будет остановлен.

## Управление контейнерами

1. Для управления контейнерами необходимо получить их идентификаторы. Для этого посмотрите список контейнеров:

   <tabs>
   <tablist>
   <tab>Список всех контейнеров</tab>
   <tab>Список запущенных контейнеров</tab>
   </tablist>
   <tabpanel>

   ```bash
   sudo docker ps -a
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   sudo docker ps
   ```

   </tabpanel>
   </tabs>

   <details>
   <summary>Пример вывода docker ps -a</summary>

   ```text
   CONTAINER ID   IMAGE         COMMAND       CREATED          STATUS                       PORTS     NAMES
   8502eb90112b   ubuntu        "/bin/bash"   11 minutes ago   Exited (127) 7 seconds ago             sharp_tharp
   794ef863c235   hello-world   "/hello"      19 hours ago     Exited (0) 19 hours ago                dazzling_keldysh
   ```

   </details>

   Идентификатор контейнера содержится в столбце `CONTAINER ID`.

1. Управляйте контейнером, используя его идентификатор:

   <tabs>
   <tablist>
   <tab>Запустить контейнер</tab>
   <tab>Остановить контейнер</tab>
   <tab>Удалить контейнер</tab>
   </tablist>
   <tabpanel>

   ```bash
   sudo docker start <идентификатор контейнера>
   ```

   Пример команды для запуска контейнера `ubuntu` с идентификатором `8502eb90112b`:

   ```bash
   sudo docker start 8502eb90112b
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   sudo docker stop <идентификатор контейнера>
   ```

   Пример команды для остановки контейнера `ubuntu` с идентификатором `8502eb90112b`:

   ```bash
   sudo docker stop 8502eb90112b
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   sudo docker rm <идентификатор контейнера>
   ```

   Запущенный контейнер удалить невозможно. Либо остановите его, либо выполните удаление с опцией `--force`.

   Пример команды для удаления контейнера `ubuntu` с идентификатором `8502eb90112b`:

   ```bash
   sudo docker rm 8502eb90112b
   ```

   </tabpanel>
