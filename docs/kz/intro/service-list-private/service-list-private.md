# {heading({var(cloud)} сервистері туралы)[id=service-list]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(cloud)} ішінде виртуализация, мониторинг, контейнерлер және деректер қоймалары сервистері өрістетіле алады. Архитектура сервистердің төрт тобына негізделген:

- **Infrastructure as a Service (IaaS)**. IaaS-сервистері [OpenStack](https://www.openstack.org/software) және меншікті әзірленген компоненттер негізінде құрылған. Ресурстарды динамикалық бөлуді, масштабтауды, жоғары қолжетімділікті басқарады. IaaS негізгі компоненттерді ұсынады: виртуалды серверлер, желі, деректер қоймалары, бөлінген жабдыққа қолжетімділік.

  {cut(IaaS-сервистерінің тізімі)}

    - {linkto(../../computing/iaas#iaas)[text=Cloud Servers]} — {var(cloud)} есептеу ресурстарын, виртуалды машиналарды, виртуалды дискілерді және файлдық қоймаларды басқарады.
    - {linkto(../../networks/vnet#vnet)[text=Cloud Networks]} — SDN (Software Defined Network) технологиясының көмегімен таңдалған {linkto(../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=жоба]} аясындағы желілік өзара әрекеттесуді қамтамасыз етеді. OpenStack Neutron негізінде жұмыс істейді. Өз құрамына мынадай компоненттерді қамтиды:

        - {linkto(../../networks/vnet/concepts/dns#vnet-dns)[text=DNS]} — {var(cloud)} сервистері үшін атауларды шешуді қамтамасыз ететін приватты DNS-ті қолдайды.
        - {linkto(../../networks/balancing/concepts/load-balancer#balancing-load-balancer)[text=Load Balancer]} — қосымшалардың жоғары қолжетімділігі мен икемді масштабталуын қамтамасыз ете отырып, инфрақұрылымға түсетін жүктемені таратады.

  {/cut}

- **Platform as a Service (PaaS)**. Kubernetes кластерлерін, масштабталатын СУБД және виртуалды жұмыс орындарын басқаруға арналған шешімдерді қамтиды.

  {cut(PaaS-сервистерінің тізімі)}

    - {linkto(../../kubernetes/k8s#k8s-k8s)[text=Cloud Containers]} — Kubernetes кластерлерін жасауға және басқаруға мүмкіндік береді, олардың ішінде сервистер мен қолданбаларды іске қосуға болады.
    - {linkto(../../dbs/dbaas#dbaas-dbaas)[text=Cloud Databases]} — масштабталатын СУБД ұсынады: MySQL, PostgreSQL,{ifdef(private-pg)} Postgres Pro,{/ifdef} ClickHouse, Redis.
    - {linkto(../../monitoring-services/alerting#alerting)[text=Cloud Alerting]} — {var(cloud)} сервистерінің негізгі метрикалары өзгергені туралы хабарландыруларды баптайды.
    - {linkto(../../monitoring-services/logging#logging)[text=Cloud Logging]} — {var(cloud)} ішіндегі сервистер логтарын агрегаттайды және талдайды.
    - {linkto(../../monitoring-services/monitoring#monitoring)[text=Cloud Monitoring]} — PaaS-сервистеріне тән метрикалардың мониторингін қамтамасыз етеді, мысалы, K8s-контейнерлерінің подтары бойынша аналитика, СУБД транзакцияларының статистикасы.
    - {linkto(../../computing/cloud-desktops#cloud-desktops)[text=Cloud Desktop]} — басқарылатын виртуалды жұмыс орындары.

  {/cut}

- **Software as a Service (SaaS)**. Бизнес пен IT-командаларға арналған дайын шешімдер каталогы бар корпоративтік маркетплейс, ол енгізу уақытын қысқартуға және шығындарды азайтуға мүмкіндік береді.

  {cut(SaaS-сервистерінің тізімі)}

    - [Marketplace](../../applications-and-services/marketplace) — виртуалды машиналар негізінде веб-әзірлеу және әкімшілендіру орталарын жылдам өрістетуге мүмкіндік береді.
      {/cut}

- **Common&Security-сервистері** пайдаланушылардың қауіпсіз жұмысын қамтамасыз етеді және {var(cloud)} ресурстарын пайдалану кезінде рөлдік модельді қолдайды. Сервистер мен {var(cloud)} жүйесінің жекелеген мәндерінің кіріктірілген мониторингін қолдайды.

  {cut(Common&Security-сервистерінің тізімі)}

    - Биллинг — ресурстарды пайдалануды есепке алуды және шығындарды бақылауды жүргізеді.
    - Квоты — квоталарды басқару функцияларын қамтамасыз етеді.
    - {linkto(../../monitoring-services/event-log#event-log)[text=Cloud Audit]} — {var(cloud)} ішіндегі пайдаланушылар әрекеттерінің аудит журналын қалыптастырады.
    - {linkto(../../storage/backups#cloud-backup)[text=Cloud Backup]} — виртуалды машиналар мен басқарылатын СУБД үшін резервтік көшіру жоспарларын басқарады.
    - IAM — {var(cloud)} пайдаланушыларының, әкімшілерінің және сервистерінің аутентификациясы мен авторизациясын басқарады.
    - Keycloak — пайдаланушылардың тіркелгі жазбаларын сақтауды және сыртқы каталог қызметтерімен интеграцияны қамтамасыз етеді.
    - Мониторинг — {var(cloud)} күйінің мониторингін жүзеге асырады.
    - Логирование — {var(cloud)} компоненттерінің журналдарын сақтауды жүзеге асырады.

  {/cut}

{var(cloud)} компоненттері мен сервистерінің жалпы сызбасы төменде көрсетілген.

![{var(cloud)} архитектурасы](assets/architecture.png){params[noBorder=true]}
