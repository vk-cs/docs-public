# {heading(Grafana қосу)[id=monitoring-grafana-integration]}

{include(/kz/_includes/_translated_by_ai.md)}

{ifdef(public)}
Cloud Monitoring сервисі жинаған ресурс мониторингі деректерін екі тәсілмен визуализациялауға болады:

- {linkto(../mon-setup-new#monitoring-mon-setup-new)[text=%text]} мақаласында сипатталғандай, жеке кабинеттегі **Мониторинг → Дашбордтар** бөлімінде;
- Grafana сервисінің көмегімен.

Grafana сервисін пайдалану үшін оны жобаңыздағы [Қолданбалар дүкенінен](https://kz.cloud.vk.com/app/services/marketplace) {linkto(../../../../applications-and-services/marketplace/initial-configuration/grafana-start#marketplace-grafana-start)[text=іске орналастырыңыз]}.

Сервис іске орналастырылған кезде, ол Cloud Monitoring-пен автоматты түрде интеграцияланады:

- Grafana-ға Cloud Monitoring сервисінен мониторинг деректерін алуға мүмкіндік беретін байланыс орнатылады.
- Grafana-да Cloud Monitoring-пен байланысты келесі дереккөздер (data sources) бапталады:

  - `[VK Cloud] Дерекқорлар`;
  - `[VK Cloud] Виртуалды машиналар` (әдепкі дереккөз);
  - `[VK Cloud] Контейнерлер (K8S)`;
  - `[VK Cloud] Marketplace қолданбалары`;
  - `[VK Cloud] Резервтік көшіру`;
  - `[VK Cloud] JupiterHub сервисі`;
  - `[VK Cloud] MLFlow сервисі`;
  - `[VK Cloud] MLflow Deploy сервисі`;
  - `[VK Cloud] k8s-тегі Spark сервисі`.

{note:info}
Тек Grafana сервисі іске орналастырылған жобаға қатысты мониторинг деректерін ғана алуға болады.
{/note}

{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf)}
Ресурс мониторингі деректерін [Grafana](https://grafana.com) мониторинг және деректерді визуализациялау сервисінің көмегімен визуализациялай аласыз.

<!--- #todo бөлімге VK Private Cloud әкімші нұсқаулығында сілтеме бар. -->

Жобада Grafana сервисін орнату үшін:

1. Егер желі бұрын жасалмаған болса, {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=желі жасаңыз]}.

   {note:warn}
   Grafana үшін ВМ-де {var(cloud)} API-іне қолжетімділік болуы тиіс.
   {/note}

1. {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-add#marketplace-pr-instance-add)[text=Grafana сервисін іске орналастырыңыз]}.

1. Grafana сервисінің параметрлерін баптаңыз:

  * **Grafana қалай орналастырылады** — сыртқы немесе ішкі желіні таңдаңыз.

    Егер сыртқы желі таңдалса, мына параметрді орнатыңыз:

    * **Сыртқы желі** — ашылмалы тізімнен қажетті сыртқы желіні таңдаңыз.

    Егер ішкі желі таңдалса, мына параметрді орнатыңыз:

    * **Қосалқы желі** — ашылмалы тізімнен қажетті ішкі желіні таңдаңыз.

  * **Виртуалды машина** — қолжетімділік аймағын және виртуалды машинаның түрін орнатыңыз.
  * **Жүйелік диск** — жүйелік дискінің түрі мен өлшемін орнатыңыз.
  * **Деректер дискісі** — Grafana деректерін сақтау үшін дискінің түрі мен өлшемін орнатыңыз.

  * **Метрикаларды Мониторинг {var(cloud)} сервисіне жіберуді қосу** — Grafana инстансын Cloud Monitoring {var(cloud)} сервисінде мониторингтеу үшін метрикаларды жіберу мақсатында ауыстырғышты белсенді күйге ауыстырыңыз.
  * **Мониторинг {var(cloud)} дереккөздерін қосу** — метрикаларды оқу үшін Grafana-да Cloud Monitoring {var(cloud)} сервисімен интеграцияны автоматты түрде баптау мақсатында ауыстырғышты белсенді күйге ауыстырыңыз.

  * **HTTPS-ті баптау** — ауыстырғышты белсенді күйге ауыстырып, домен атауын, сертификатты және кілтті енгізіңіз. Grafana инстансы көрсетілген домен атауы бойынша HTTPS арқылы қолжетімді болатындай бапталады. Орнату аяқталғаннан кейін тағайындалған IP-мекенжай хатта немесе виртуалды машинаның баптауларында көрсетіледі. Баптауды аяқтау үшін алынған IP-мекенжайды пайдаланып, көрсетілген домен атауы үшін DNS-жазба жасаңыз.

    {note:info}
    Егер ауыстырғышты белсенді емес күйде қалдырсаңыз, Grafana сервисі виртуалды машинаның IP-мекенжайы арқылы қолжетімді болады.
    Сервис орнатылғаннан кейін HTTPS-ті {linkto(#monitoring-grafana-https)[text=қолмен баптауға]} болады.
    {/note}

<!--- 4.3 қоса алғандағы релиздерде резервтік көшіру қарастырылмаған. Бұл бөлім Платформада іске асырылған кезде қайта қосылуы тиіс
   * **S3-ке резервтік көшіру** — ауыстырғышты белсенді күйге ауыстырып, S3 Cloud Storage қоймасының параметрлерін баптаңыз:

     * **API Endpoint** — S3 сервисіне кіру нүктесі, әдепкі бойынша {var(cloud)} URL-і берілген.
     * **Bucket атауы** — резервтік көшірмелер жүктелетін объектілік қоймадағы bucket атауы.
     * **Префикс (ішкі бума)** — жүктелген резервтік көшірмелерге қосылатын атау. Егер bucket ішінде басқа деректер де сақталса, оны пайдалану ұсынылады.
     * **Access Кey** және **Secret Key** — S3 сервисіндегі bucket-ке қол жеткізу кілттері.
     * **S3 жағындағы объектілерді шифрлау** — қолданылатын S3 сервисінің баптауларына сәйкес орнатылуы тиіс.

     {note:info}

     Резервтік көшіруді сервис орнатылғаннан кейін қолмен іске қосуға болады (толығырақ — {linkto(#monitoring-grafana-backup)[text=Резервтік көшіру]} бөлімінде)

     {/note}
-->

1. Хаттағы `grafana_url` сілтемесі бойынша Grafana консоліне өтіңіз.

1. **Sign in** батырмасын басыңыз.

1. Пайда болған терезеде `admin` логинін және хаттағы парольді енгізіңіз.

1. Жаңа парольді көрсетіңіз.

1. Grafana дашбордын жасаңыз. Толығырақ — [ресми құжаттамада](https://grafana.com/docs/grafana/v10.0/getting-started/build-first-dashboard/).

## {heading(Grafana сервисі үшін HTTPS-ті қолмен баптау)[id=monitoring-grafana-https]}

Grafana үшін HTTPS-ті баптау үшін келесі қадамдарды орындаңыз:

1. Grafana орнатыңыз.
1. Сертификат пен кілт файлдарын виртуалды машинаға көшіріңіз. Виртуалды машина қайта жасалған кезде сақталуы үшін оларды `/data` директориясына жылжытыңыз. Мысал:
  * Сертификат — `/data/manual_certs/grafana.crt`.
  * Кілт — `/data/manual_certs/grafana.key`.
1. Файлдарға құқықтарды орнатыңыз:

   ```console
   chmod 644 /data/manual_certs/grafana.crt
   chmod 600 /data/manual_certs/grafana.key
   ```
1. Сертификаттарға апаратын жолды Grafana конфигурациясында көрсетіңіз. Ол үшін `/data/grafana/grafana.ini` файлын ашып, келесі жолдарды қосыңыз немесе өзгертіңіз:

   ```ini
   # https certs & key file
   cert_file = /data/manual_certs/grafana.crt
   cert_key = /data/manual_certs/grafana.key
   ```
1. HTTPS пен домен атауын баптаңыз. Ол үшін `/data/grafana/grafana.ini` файлындағы `[server]` бөліміне өзгерістер енгізіңіз:

   ```ini
   [server]
   # Protocol (http, https, h2, socket)
   protocol = https  # <= Установите значение "https"

   # The ip address to bind to, empty will bind to all interfaces
   ;http_addr =

   # The http port  to use
   http_port = 443  # <= Установите значение "443"

   # The public facing domain name used to access grafana from a browser
   domain = grafana.my.org  # <= Укажите доменное имя

   # Redirect to correct domain if host header does not match domain
   # Prevents DNS rebinding attacks
   enforce_domain = true

   # The full public facing url you use in browser, used for redirects and emails
   # If you use reverse proxy and sub path specify full url (with sub path)
   root_url = https://grafana.my.org  # <= Укажите полный URL
   ```

1. Өзгерістерді қолдану үшін `systemctl` командасының көмегімен Grafana-ны қайта іске қосыңыз:

   ```console
   sudo systemctl restart grafana
   ```
   Қайта іске қосқаннан кейін Grafana сәтті іске қосылғанына көз жеткізіңіз:

   ```console
   sudo systemctl status grafana
   ```

<!--- 4.3 қоса алғандағы релиздерде резервтік көшіру қарастырылмаған. Бұл бөлім Платформада іске асырылған кезде қайта қосылуы тиіс
## {heading(Резервтік көшіру)[id=monitoring-grafana-backup]}

Резервтік көшіру қосымша болып табылады. Егер ол қосылса, резервтік көшіру виртуалды машинаның уақыты бойынша тәулігіне бір рет `00:00` кезінде орындалады. Резервтік көшіру уақытын `/etc/systemd/system/backup.timer` файлында баптауға болады. Өзгерістерді қолдану үшін `systemctl daemon-reload` командасының көмегімен `systemd` қызметін қайта жүктеңіз.

Резервтік көшіру `backup.timer` параметріне сәйкес автоматты түрде орындалады. `/data/grafana` бумасы толық сақталып, архивтеледі және S3-ке жүктеледі.

Резервтік көшіруді қолмен іске қосу үшін:

1. Виртуалды машинада мына команданы орындаңыз:

   ```bash
   # systemctl start backup.service
   ```
1. Орындау логтарын жүйелік оқиғалар журналында мына команда арқылы тексеріңіз:

   ```bash
   # journalctl -u backup
   ```
### {heading(Қолжетімді резервтік көшірмелерді қарау)[id=monitoring-grafana-backup-list]}

Қалпына келтіруге қолжетімді резервтік көшірмелерді көру үшін `/opt/backup_list.sh` скриптін `root` әкімшісі атынан іске қосыңыз. 

{caption(Скрипт шығысының мысалы)[align=left;position=above]}

```console
ok: [localhost] => {
    "msg": [
        "grafana/2024-02-13-00-00-30/2024-02-13-00-00-30.tar.gz (Size: 74.66 MB)",
        "grafana/2024-02-14-00-00-30/2024-02-14-00-00-30.tar.gz (Size: 75.11 MB)",
        "grafana/2024-02-15-00-00-31/2024-02-15-00-00-31.tar.gz (Size: 81.33 MB)"
    ]
}
```
{/caption}

### {heading(Резервтік көшірмеден қалпына келтіру)[id=monitoring-grafana-backup-recovery]}

Grafana-ны резервтік көшірмеден қалпына келтіру үшін `/opt/backup_restore.sh` скриптін резервтік көшірме атауы түріндегі параметрмен іске қосыңыз. Мысалы: `/opt/backup_restore.sh grafana/2024-02-14-00-00-30/2024-02-14-00-00-30.tar.gz`. Атауды префикспен бірге көрсету қажет.

-->

{/ifdef}
