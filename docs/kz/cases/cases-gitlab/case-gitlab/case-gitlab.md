{include(/kz/_includes/_translated_by_ai.md)}

[GitLab](https://about.gitlab.com/) — бағдарламалық қамтамасыз етуді әзірлеу жобаларында бірлесіп жұмыс істеуге арналған құрал. Ол Git репозиторийлерін сақтауды және басқаруды, сондай-ақ бағдарламалық код нұсқаларын бақылауды қамтамасыз етеді. GitLab CI/CD процестерін автоматтандырады: БҚ құрастыруды, тестілеуді және өрістетуді. GitLab-та CI/CD тапсырмаларын іске қосу және автоматты орындау үшін GitLab Runner қолданбасы пайдаланылады.

Төменде Ubuntu 22.04 ОЖ-сы бар виртуалды машинаға GitLab және GitLab Runner тегін нұсқаларын орнату мысалы көрсетілген. Орнату құралы ретінде Docker контейнерлеу платформасы және оның Docker Compose плагині пайдаланылады.

## Дайындық қадамдары

1. [Тіркеліңіз](/kz/intro/onboarding/account) VK Cloud жүйесінде.
1. Интернетке қолжетімділігі және `10.0.0.0/24` ішкі желісі бар `network1` желісін [құрыңыз](/kz/networks/vnet/instructions/net#zhelini_zhasau).
1. `gitlab` қауіпсіздік тобын [құрыңыз](/kz/networks/vnet/instructions/secgroups) және оған келесі порттар үшін кіріс трафигіне рұқсаттарды қосыңыз:

   - `80` (HTTP),
   - `443` (HTTPS),
   - `22` (SSH),
   - `35242` (SSH).

   `35242` орнына операциялық жүйеде резервтелмеген кез келген портты пайдалануға болады.

1. Ubuntu операциялық жүйесі бар [ВМ жасаңыз](/kz/computing/iaas/instructions/vm/vm-create).

   ВМ параметрлерін таңдағанда, GitLab және GitLab Runner орнатуға қажетті [аппараттық талаптарды](https://docs.gitlab.com/ee/install/requirements.html) ескеріңіз.

   Мысал ретінде келесі ВМ конфигурациясы пайдаланылады:

     - атауы: `OA-Ubuntu-docker`;
     - операциялық жүйе: Ubuntu 22.04;
     - желі: `10.0.0.0/24` ішкі желісі бар `network1`;
     - [конфигурация үлгісі](/kz/computing/iaas/concepts/vm/flavor): `STD2-4-12`;
     - желілік HDD-диск: 50 ГБ;
     - жария IP мекенжайы: тағайындалған, әрі қарай `185.185.185.185` пайдаланылады;
     - қауіпсіздік топтары: `default`, `gitlab`.

   {note:info}

   Ubuntu ОЖ-сы бар ВМ жасау кезінде автоматты түрде `ubuntu` атты пайдаланушы жасалады және оған `sudo` пайдалануға толық құқықтар беріледі.

   {/note}

1. (Қосымша) GitLab-қа қол жеткізу үшін пайдаланылатын домендік атауды виртуалды машинаға келесі тәсілдердің бірімен тағайындаңыз:

   - Егер сізде домен болса, оған өз ВМ-іңізді қосыңыз.
   - Егер домен болмаса, мысалы, динамикалық DNS ұсынатын сервистердің бірі [NoIP](https://www.noip.com/) сервисін пайдаланыңыз. Ол үшін ВМ-ге динамикалық жаңарту клиентін орнатыңыз, толығырақ [NoIP сервисінің құжаттамасында](https://www.noip.com/support/knowledgebase/installing-the-linux-dynamic-update-client-on-ubuntu).

    {cut(Неліктен домендік атау тағайындау керек?)}
        Сіз GitLab-ты домендік атауы жоқ ВМ-ге орната аласыз. Бұл ретте GitLab-қа HTTPS протоколы бойынша қосылу үшін өздігінен қол қойылған SSL сертификаттары автоматты түрде шығарылады. Алайда GitLab үшін жалпыға қолжетімді SSL сертификатын шығара алмайсыз. Нәтижесінде пайдаланушылар GitLab серверіңіздің авторизация бетіне өткен кезде «Қосылу қорғалмаған» деген ескертуді көреді.

    {/cut}

1. `OA-Ubuntu-docker` ВМ-ге SSH арқылы [қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect/vm-connect-nix).
1. Операциялық жүйе брандмауэрінің күйін тексеріп, егер ол белсенді болса, өшіріңіз:

    ```console
    sudo ufw status
    sudo ufw disable
    ```

    {note:info}

    ОЖ брандмауэрі қажет емес, себебі ВМ-ге кіріс және шығыс трафиктің өтуін [VK Cloud брандмауэрі басқарады](/kz/networks/vnet/concepts/traffic-limiting).

    {/note}

1. [Docker орнатып, баптаңыз](/kz/cases/cases-docker-ce/docker-ce-u18).
1. [Docker Compose](https://docs.docker.com/compose/) плагинін орнатыңыз:

   1. Ubuntu-дағы қолжетімді пакеттер мен олардың нұсқаларының тізімін жаңартыңыз:

        ```console
        sudo apt-get update
        ```

   1. Docker Compose плагинінің соңғы нұсқасын орнатыңыз:

        ```console
        sudo apt-get install docker-compose-plugin
        ```

   1. Нұсқасын сұрау арқылы плагиннің дұрыс орнатылғанына көз жеткізіңіз:

        ```console
        docker compose version
        ```

        Күтілетін нәтиже:

        ```console
        Docker Compose version vN.N.N
        ```

        Мұнда `N.N.N` — плагин нұсқасының нөмірі.

## 1. ВМ-ге SSH арқылы қосылу портын өзгертіңіз

GitLab SSH арқылы қол жеткізу үшін әдепкі бойынша ВМ-ге SSH арқылы қосылуға жүйеде резервтелген `22` портын пайдаланады. Қақтығыс туындамауы үшін жүйелік SSH портын басқа портқа өзгертіңіз.

1. `/etc/ssh/sshd_config` файлын өңдеу үшін ашыңыз:

    ```console
    sudo nano /etc/ssh/sshd_config
    ```

1. `#Port 22` жолын `Port 35242` жолына ауыстырыңыз.

    {note:info}

    `35242` нөмірі мысал ретінде пайдаланылды. Егер басқа нөмірді қолдансаңыз, оны ВМ үшін қауіпсіздік топтары баптауларында SSH арқылы қосылуға ашыңыз. Толығырақ [Қауіпсіздік топтары](/kz/networks/vnet/instructions/secgroups) бөлімінде.

    {/note}

1. Файлды сақтап, CTRL+O, содан кейін CTRL+X пернелерін басып, редактормен жұмысты аяқтаңыз.

1. `sshd` сервисін қайта іске қосыңыз:

    ```console
    sudo systemctl restart sshd
    ```

1. ВМ-ге ағымдағы қосылу сеансын жабыңыз:

    ```console
    exit
    ```

1. `OA-Ubuntu-docker` ВМ-ге жаңа портты пайдаланып SSH арқылы қосылыңыз:

    ```console
    ssh -i <путь к ключу> ubuntu@185.185.185.185 -p 35242
    ```

    `185.185.185.185` орнына, егер бар болса, ВМ-нің толық домендік атауын пайдалануға болады.

## 2. Docker Compose көмегімен GitLab және GitLab Runner орнатыңыз

1. Командаларды ретімен орындап, GitLab үшін тұрақты сақтау директорияларын жасаңыз:

    ```console
    sudo mkdir -p /opt/gitlab
    sudo mkdir -p /opt/gitlab/config
    sudo mkdir -p /opt/gitlab/logs
    sudo mkdir -p /opt/gitlab/data
    sudo mkdir -p /opt/gitlab-runner
    sudo mkdir -p /opt/gitlab-runner/config
    sudo mkdir -p /opt/gitlab-runner/data
    ```

1. Docker Compose үшін конфигурация файлын жасап, өңдеу үшін ашыңыз:

    ```console
    sudo nano docker-compose.yml
    ```

1. Редактор терезесіне келесі мазмұнды көшіріңіз, мұнда `185.185.185.185` мәнін ВМ-нің сыртқы IP мекенжайына немесе оның толық домендік атауына ауыстырыңыз:

    {cut(docker-compose.yml файлының мазмұны)}

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

    {/cut}

    {note:info}

    Қажет болса, `# Add…` түсіндірмесі бар жолдың астына қосымша баптауларды қосыңыз. Docker Compose плагиніне арналған конфигурация файлы параметрлерінің сипаттамасы [Docker ресми құжаттамасында](https://docs.docker.com/compose/compose-file/03-compose-file/) берілген.

    {/note}

1. Файлды сақтап, CTRL+O, содан кейін CTRL+X пернелерін басып, редактормен жұмысты аяқтаңыз.
1. Docker Compose іске қосыңыз:

    ```console
    sudo docker compose up -d
    ```

    {cut(Сәтті орындалғандағы шығыс)}

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
    {/cut}  

## 3. GitLab контейнерінің күйін тексеріңіз

Келесі команданы орындаңыз:

```console
sudo docker ps
```

Сәтті орындалғандағы шығыс:

```txt
CONTAINER ID   IMAGE                         COMMAND                  CREATED         STATUS                            PORTS                                                                                                         NAMES
1e6cee4fe37a   gitlab/gitlab-ce:latest       "/assets/wrapper"        4 minutes ago   Up 9 seconds (health: starting)   0.0.0.0:22->22/tcp, :::22->22/tcp, 0.0.0.0:80->80/tcp, :::80->80/tcp, 0.0.0.0:443->443/tcp, :::443->443/tcp   gitlab
882fc3fb80f5   gitlab/gitlab-runner:latest   "/usr/bin/dumb-init …"   4 minutes ago   Up 4 minutes                                                                                                                                    gitlab-runner
```

## 4. (Қосымша) ВМ үшін жалпыға қолжетімді SSL сертификатын шығарыңыз

Егер GitLab орнатылған ВМ-де домендік атау болса, GitLab үшін, мысалы, [Let’s Encrypt](https://letsencrypt.org/) компаниясынан жалпыға қолжетімді SSL сертификатын шығара аласыз. Толығырақ [GitLab ресми құжаттамасында](https://docs.gitlab.com/omnibus/settings/ssl/).

## 5. GitLab жұмысқа қабілеттілігін тексеріңіз

1. GitLab әкімшісінің автоматты түрде жасалған құпиясөзін алып, көшіріңіз:

    ```console
    sudo cat /opt/gitlab/config/initial_root_password
    ```

    Сәтті орындалғандағы шығыс:

    ```txt
    # WARNING: This value is valid only in the following conditions
    #          1. If provided manually (either via `GITLAB_ROOT_PASSWORD` environment variable or via `gitlab_rails['initial_root_password']` setting in `gitlab.rb`, it was provided before database was seeded for the first time (usually, the first reconfigure run).
    #          2. Password hasn't been changed manually, either via UI or via command line.
    #
    #          If the password shown here doesn't work, you must reset the admin password following https://docs.gitlab.com/ee/security/reset_user_password.html#reset-your-root-password.

    Password: /XR7tRH_ХХХХ=

    # NOTE: This file will be automatically deleted in the first reconfigure run after 24 hours.
    ```

1. Браузерде `https://185.185.185.185` мекенжайына өтіңіз.

    `185.185.185.185` орнына, егер бар болса, ВМ-нің толық домендік атауын пайдалануға болады.

    GitLab-қа кіру авторизациясының беті ашылады.

1. Кіру үшін әкімші логинін (`root`) және көшірілген құпиясөзді пайдаланыңыз.

    GitLab басқару панелі ашылады. Орнату аяқталды, GitLab жұмысқа дайын.

## Пайдаланылмайтын ресурстарды жойыңыз

Өрістетілген виртуалды ресурстар тарифтелмейді. Егер олар сізге енді қажет болмаса:

- `OA-Ubuntu-docker` ВМ-ді [жойыңыз](/kz/computing/iaas/instructions/vm/vm-manage#delete_vm).
- Қажет болса, `185.185.185.185` Floating IP мекенжайын [жойыңыз](/kz/networks/vnet/instructions/ip/floating-ip#delete).
