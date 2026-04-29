{include(/kz/_includes/_translated_by_ai.md)}

Docker CE Docker образдарымен жұмыс істеуге және контейнерлерді басқаруға мүмкіндік береді. Ол үшін [Docker CLI командалары](https://docs.docker.com/engine/reference/commandline/cli/) пайдаланылады. Docker командасы опциялардан (options) және ішкі командалардан (subcommands) тұрады:

```console
docker [OPTIONS] SUBCOMMAND
```

Docker CLI бойынша анықтаманы көру үшін мына командаларды пайдаланыңыз:

```console
docker --help
```

```console
docker SUBCOMMAND --help
```

Docker-пен жұмыс туралы толығырақ ақпаратты [ресми құжаттамадан](https://docs.docker.com/) қараңыз.

## Жұмысты бастамас бұрын

Мыналарға көз жеткізіңіз:

- Сізде Docker CE орнатылған хосттың терминалына қолжетімділік бар.
- Бұл хостта командаларды суперпайдаланушы (`root`) атынан орындау үшін `sudo` пайдалана аласыз.

## Образдармен жұмыс

Контейнерлер (containers) Docker образдарынан (images) іске қосылады. Әдепкі бойынша Docker образдарды [Docker Hub](https://docs.docker.com/docker-hub/) жүйесінен алады — бұл образдар тізілімі ([Docker Registry](https://docs.docker.com/registry/)).

Образдармен жұмыс Ubuntu ОЖ образы мысалында көрсетіледі:

1. Docker Hub ішіндегі Ubuntu бар қолжетімді образдарды қараңыз:

   ```console
   sudo docker search ubuntu
   ```

   Команда нәтижесінде іздеу шарттарына сәйкес келетін образдар тізімі көрсетіледі.

   {cut(Шығыс мысалы)}

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

   {/cut}

1. `ubuntu` образын жүктеңіз:

   ```console
   sudo docker pull ubuntu
   ```

   Команда нәтижесінде жүктеу барысы туралы ақпарат көрсетіледі.

   {cut(Шығыс мысалы)}

   ```text
   Using default tag: latest
   latest: Pulling from library/ubuntu
   2ab09b027e7f: Pull complete
   Digest: sha256:67211c14fa74f070d27cc59d69a7fa9aeff8e28ea118ef3babc295a0428a6d21
   Status: Downloaded newer image for ubuntu:latest
   docker.io/library/ubuntu:latest
   ```

   {/cut}

1. Жүктелген образдарды қарау командасын орындап, образдың жүктелгеніне көз жеткізіңіз:

   ```console
   sudo docker images
   ```

   Команда нәтижесінде жүктелген образдар тізімі көрсетіледі.

   {cut(Шығыс мысалы)}

   ```text
   REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
   ubuntu        latest    08d22c0ceb15   2 weeks ago     77.8MB
   hello-world   latest    feb5d9fea6a5   18 months ago   13.3kB
   ```

   {/cut}

## Контейнерді жасау және іске қосу

Жүктелген образды пайдаланатын контейнерді жасау және іске қосу үшін `docker run` командасын пайдаланыңыз. Бұл команда [мына командалардың комбинациясы болып табылады](https://docs.docker.com/engine/reference/commandline/run/): `docker create` және `docker start`.

Бұл әрекет бұрын жүктелген `ubuntu` образы үшін көрсетіледі:

1. Контейнерді жасаңыз және іске қосыңыз:

   ```console
   sudo docker run -it ubuntu
   ```

   Контейнер іске қосылғаннан кейін контейнер терминалына (TTY) bash-сессиясымен қолжетімділік пайда болады (бұл `-it` опцияларының комбинациясы арқылы жүзеге асады). Команда орындалғаннан кейін сіз bash командалық жолының келесі түрдегі шақыруын көресіз:

   ```text
   root@8502eb90112b:/#
   ```

   Бұл шығыс мысалында `8502eb90112b` — жасалған контейнердің идентификаторы.

1. Контейнердің жұмысқа қабілеттілігін тексеру үшін оның ішінде [Node.js](https://nodejs.org/en/about) орнатыңыз.

   1. Команданы орындаңыз:

      ```console
      apt update && apt install nodejs -y
      ```

   1. Орнатылған Node.js нұсқасы туралы ақпаратты шығарыңыз:

      ```console
      node -v
      ```

      Шығыс мысалы:

      ```text
      v12.22.9
      ```

1. Контейнердің bash командалық жолынан шығыңыз:

   ```console
   exit
   ```

   Контейнер тоқтатылады.

## Контейнерлерді басқару

1. Контейнерлерді басқару үшін олардың идентификаторларын алу қажет. Ол үшін контейнерлер тізімін қараңыз:

   {tabs}

   {tab(Барлық контейнерлер тізімі)}

   ```console
   sudo docker ps -a
   ```

   {/tab}

   {tab(Іске қосылған контейнерлер тізімі)}

   ```console
   sudo docker ps
   ```

   {/tab}

   {/tabs}

   {cut(docker ps -a шығысының мысалы)}

   ```text
   CONTAINER ID   IMAGE         COMMAND       CREATED          STATUS                       PORTS     NAMES
   8502eb90112b   ubuntu        "/bin/bash"   11 minutes ago   Exited (127) 7 seconds ago             sharp_tharp
   794ef863c235   hello-world   "/hello"      19 hours ago     Exited (0) 19 hours ago                dazzling_keldysh
   ```

   {/cut}

   Контейнер идентификаторы `CONTAINER ID` бағанында көрсетіледі.

1. Контейнерді оның идентификаторын пайдаланып басқарыңыз:

   {tabs}
   
   {tab(Контейнерді іске қосу)}

   ```console
   sudo docker start <контейнер идентификаторы>
   ```

   `8502eb90112b` идентификаторы бар `ubuntu` контейнерін іске қосу командасының мысалы:

   ```console
   sudo docker start 8502eb90112b
   ```

   {/tab}

   {tab(Контейнерді тоқтату)}

   ```console
   sudo docker stop <контейнер идентификаторы>
   ```

   `8502eb90112b` идентификаторы бар `ubuntu` контейнерін тоқтату командасының мысалы:

   ```console
   sudo docker stop 8502eb90112b
   ```

   {/tab}

   {tab(Контейнерді жою)}

   ```console
   sudo docker rm <контейнер идентификаторы>
   ```

   Іске қосылған контейнерді жою мүмкін емес. Не оны тоқтатыңыз, не `--force` опциясымен жоюды орындаңыз.

   `8502eb90112b` идентификаторы бар `ubuntu` контейнерін жою командасының мысалы:

   ```console
   sudo docker rm 8502eb90112b
   ```

   {/tab}

   {/tabs}
