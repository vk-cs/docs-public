{include(/kz/_includes/_translated_by_ai.md)}

[Prometheus](https://prometheus.io/) — процестерден (exporters) алынатын метрикаларды жинауға және сақтауға арналған сервер. Жиналған деректерді Prometheus веб-интерфейсі арқылы да, жеке визуализация құралдары арқылы да, мысалы, [Grafana](https://grafana.com/docs/grafana/latest/) арқылы қарауға болады.

Бұл нұсқаулық мыналарға көмектеседі:

- VK Cloud ішіндегі CentOS 8.4 операциялық жүйесінде Prometheus 2.45.1 серверін өрістетуге;
- Single конфигурациясындағы Redis 5 ДҚБЖ-ға Node exporter кеңейтімін орнатуға;
- Redis-тен алынған деректерді Prometheus және Grafana 10 жүйелерінде визуализациялауды баптауға.

Prometheus сервері, ДҚБЖ және Grafana бөлек ВМ-дерде өрістетіледі.

## Дайындық қадамдары

1. [Виртуалды желі жасаңыз](/kz/networks/vnet/instructions/net#zhelini_zhasau), мысалы,
   `monitoring-net`.
1. Prometheus сервері үшін [ВМ жасаңыз](/kz/computing/iaas/instructions/vm/vm-create):

    - атауы: `Centos_8_5_Prometheus`;
    - операциялық жүйе: CentOS 8.4;
    - желі: `monitoring-net`;
    - жария IP мекенжайы: оны тағайындаңыз, мысал ретінде `87.239.239.239` келтірілген;
    - қауіпсіздік топтары: `default`, `all`.

   Жасалған инстанстың ішкі IP мекенжайы: `10.0.3.7`.

1. [ДҚ инстансын жасаңыз](/kz/dbs/dbaas/instructions/create/create-single-replica):

    - атауы: `Redis-5`;
    - ДҚБЖ: Redis 5;
    - конфигурация түрі: Single;
    - желі: `monitoring-net`;

   Жасалған инстанстың ішкі IP мекенжайы: `10.0.3.13`.

1. `monitoring-net` желісінде [Grafana 10 өрістетіңіз](/kz/applications-and-services/marketplace/initial-configuration/grafana-start).

## 2. Prometheus орнатыңыз және баптаңыз

1. `Redis-5` ДҚ инстансы үшін **Node
   exporter** кеңейтімін [орнатыңыз](/kz/dbs/dbaas/instructions/managing-extensions#keneytimdi_ornatu). Орнату кезінде `listen_port` = `9100` параметрін көрсетіңіз.
1. `Centos_8_5_Prometheus` ВМ-не [қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect/vm-connect-nix).
1. Prometheus-ті жүктеп алып, жүктелген архивті ашыңыз:

   ```console
   sudo su
   export VERSION="2.45.1"
   wget https://github.com/prometheus/prometheus/releases/download/v$VERSION/prometheus-$VERSION.linux-amd64.tar.gz -O - | tar -xzv -C /tmp
   ```

1. `prometheus-2.45.1.linux-amd64` репозиторийінің мазмұнын көшіріңіз:

   ```console
   mkdir /etc/prometheus
   mkdir /var/lib/prometheus
   cp /tmp/prometheus-$VERSION.linux-amd64/prometheus /usr/local/bin
   cp /tmp/prometheus-$VERSION.linux-amd64/promtool /usr/local/bin
   cp -r /tmp/prometheus-$VERSION.linux-amd64/consoles /etc/prometheus
   cp -r /tmp/prometheus-$VERSION.linux-amd64/console_libraries /etc/prometheus
   cp /tmp/prometheus-$VERSION.linux-amd64/prometheus.yml /etc/prometheus/
   ```

1. (Опционалды) Уақытша директориядан файлдарды жойыңыз:

   ```console
   rm -rf /tmp/prometheus-$VERSION.linux-amd64
   ```

1. `prometheus` тобын және пайдаланушысын жасаңыз, оған байланысты репозиторийлерге құқықтар тағайындаңыз:

   ```console
   groupadd --system prometheus
   useradd --system -g prometheus -s /bin/false prometheus
   chown -R prometheus:prometheus /var/lib/prometheus /etc/prometheus
   chown prometheus:prometheus /usr/local/bin/prometheus /usr/local/bin/promtool
   ```

1. `/etc/prometheus/prometheus.yml` файлының `scrape_configs` блогына мазмұнды қосыңыз:

   ```yml
   - job_name: "node"
     scrape_interval: 10s
     static_configs:
       - targets: ["10.0.3.13:9100"]
   ```

1. Келесі мазмұнмен Prometheus-ті іске қосу сценарийін `/etc/systemd/system/prometheus.service` жасаңыз:

   ```ini
   [Unit]
   Description=Prometheus
   Wants=network-online.target
   After=network-online.target

   [Service]
   User=prometheus
   Group=prometheus
   ExecStart=/usr/local/bin/prometheus \
       --config.file /etc/prometheus/prometheus.yml \
       --storage.tsdb.path /var/lib/prometheus \
       --web.console.templates=/etc/prometheus/consoles \
       --web.console.libraries=/etc/prometheus/console_libraries
   ExecReload=/bin/kill -HUP $MAINPID
   [Install]
   WantedBy=default.target
   ```

1. Prometheus-ті іске қосыңыз:

   ```console
   systemctl daemon-reload
   systemctl start prometheus.service
   systemctl enable prometheus.service
   ```

1. Prometheus дұрыс жұмыс істеп тұрғанына көз жеткізіңіз:

   ```console
   systemctl status prometheus.service
   ```

   Команда шығысында `active` күйі болуы керек.

   {cut(Пример ожидаемого вывода)}

    ```console
    prometheus.service - Prometheus
     Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: disabled)
     Active: active (running) since Mon 2023-11-20 16:11:25 UTC; 25min ago
    Main PID: 1065 (prometheus)
     Tasks: 6 (limit: 5921)
     Memory: 51.3M
     CGroup: /system.slice/prometheus.service
             └─1065 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus --web.console.templates=/etc/prometheus/consoles

    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.319Z caller=tls_config.go:274 level=info component=web msg="Listening on" address=[::]:9090
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.319Z caller=tls_config.go:277 level=info component=web msg="TLS is disabled." http2=false address=[::]:9090
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.319Z caller=head.go:755 level=info component=tsdb msg="WAL segment loaded" segment=0 maxSegment=0
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.319Z caller=head.go:792 level=info component=tsdb msg="WAL replay completed" checkpoint_replay_duration=44.387µs wal_replay_duration=1.206992ms wbl_replay_duration=160ns total_replay_duration=1.363332ms
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.320Z caller=main.go:1040 level=info fs_type=EXT4_SUPER_MAGIC
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.320Z caller=main.go:1043 level=info msg="TSDB started"
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.320Z caller=main.go:1224 level=info msg="Loading configuration file" filename=/etc/prometheus/prometheus.yml
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.327Z caller=main.go:1261 level=info msg="Completed loading of configuration file" filename=/etc/prometheus/prometheus.yml totalDuration=6.828877ms db_storage=1.31µs remote_storage=1.172µs web_handler=292ns query_engine=475ns scrape=6.420765ms scrape_sd=40.431µs notify=24.848µs notify_sd=9.021µs rules=1.268µs tracing=5.417µs
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.327Z caller=main.go:1004 level=info msg="Server is ready to receive web requests."
    Nov 20 16:11:25 centos-8-5-prometheus.novalocal prometheus[1065]: ts=2023-11-20T16:11:25.327Z caller=manager.go:995 level=info component="rule manager" msg="Starting rule manager..."
    ```

   {/cut}

1. Деректер жиналуы үшін бірнеше минут күтіңіз.
1. `http://87.239.239.239:9090` мекенжайына өтіңіз.

   Prometheus серверінің веб-интерфейсі ашылады.

1. (Опционалды) Қолжетімді деректермен танысыңыз:

    - Деректерді кесте түрінде көру үшін [іздеу сұрауын](https://prometheus.io/docs/prometheus/2.45/querying/examples/) құрастырыңыз.
    - `http://87.239.239.239:9090/consoles/index.html.example` мекенжайы бойынша [үлгі графиктер жиындарын](https://prometheus.io/docs/visualization/consoles/) ашыңыз.

1. (Опционалды) `Centos_8_5_Prometheus` ВМ-нен Floating
   IP-мекенжайын [ажыратыңыз](/kz/networks/vnet/instructions/ip/floating-ip#disassociate).

## 3. Grafana жүйесінде деректерді визуализациялауды баптаңыз

1. Grafana веб-интерфейсіне өтіңіз.
1. Жаңа деректер көзін (data
   source) [қосыңыз](https://grafana.com/docs/grafana/v10.0/administration/data-source-management/): **Prometheus server URL** өрісінде `http://10.0.3.7:9090` көрсетіңіз.
1. Алынатын деректерді визуализациялау үшін графиктер жиындарын [орнатыңыз](https://grafana.com/docs/grafana/v10.0/dashboards/build-dashboards/create-dashboard/), мысалы, дайын нұсқаны — [Node Exporter Full](https://grafana.com/grafana/dashboards/1860-node-exporter-full/) импорттау арқылы.

## 4. (Опционалды) Сынақ жүктемесінен кейін мониторинг деректерін тексеріңіз

1. `Redis-5` ВМ-не өзіңізге ыңғайлы тәсілмен сынақ жүктемесін жасаңыз.

   {cut(Пример с утилитой sysbench)}

   ```console
   sysbench cpu  --cpu-max-prime=2000000 --time=60 run
   sysbench fileio --file-test-mode=rndrw --time=60 prepare
   sysbench fileio --file-test-mode=rndrw --time=60 run
   sysbench threads --time=60 run
   sysbench mutex --time=60 run
   ```

   {/cut}

   {note:warn}

   Cloud Databases сервисінің виртуалды машиналарына қосымша БҚ орнату тек [техникалық қолдау](/kz/contacts) арқылы сұрау жіберу жолымен ғана мүмкін.

   {/note}

1. Grafana графиктеріндегі көрсеткіштердің өзгергеніне көз жеткізіңіз.

## Пайдаланылмайтын ресурстарды жойыңыз

Құрылған ресурстар тарифтелмейді және квоталарды жұмсайды. Егер олар енді қажет болмаса:

1. Өрістетілген виртуалды машиналарды [жойыңыз](/kz/computing/iaas/instructions/vm/vm-manage#delete_vm).
1. Grafana бар виртуалды машинаны [жойыңыз](/kz/applications-and-services/marketplace/instructions/pr-instance-manage#servis_instansyn_zhoyu).
1. `Centos_8_5_Prometheus` виртуалды машинасына тағайындалған Floating IP-мекенжайын [жойыңыз](/kz/networks/vnet/instructions/ip/floating-ip#delete).
1. Виртуалды IP мекенжайы тағайындалған портты [жойыңыз](/kz/networks/vnet/instructions/ports#portty_zhoyu).
1. `monitoring-net` желісін [жойыңыз](/kz/networks/vnet/instructions/net#zhelini_zhoyu).
