[Prometheus](https://prometheus.io/) — сервер, предназначенный для сбора и хранения метрик, получаемых от процессов (exporters). Накопленные данные можно смотреть как через веб-интерфейс Prometheus, так и через отдельные средства визуализации, например, [Grafana](https://grafana.com/docs/grafana/latest/).

Данная инструкция поможет:

- развернуть сервер Prometheus 2.45.1 в операционной системе CentOS 8.4 в VK Cloud;
- установить расширение Node exporter в СУБД Redis 5 конфигурации Single;
- настроить визуализацию данных из Redis в Prometheus и Grafana 10.

Сервер Prometheus, СУБД и Grafana будут развернуты на отдельных ВМ.

## Подготовительные шаги

1. [Создайте](/ru/networks/vnet/operations/manage-net#sozdanie_seti) виртуальную сеть, например, `monitoring-net`.
1. [Создайте](/ru/base/iaas/service-management/vm/vm-create) ВМ для сервера Prometheus:

   - имя: `Centos_8_5_Prometheus`;
   - операционная система: CentOS 8.4;
   - сеть: `monitoring-net`;
   - публичный IP-адрес: назначьте его, в качестве примера приведен `87.239.239.239`;
   - группы безопасности: `default`, `all`.

   Внутренний IP-адрес созданного инстанса: `10.0.3.7`.

1. [Создайте инстанс БД](/ru/dbs/dbaas/service-management/create/create-single-replica):

   - имя: `Redis-5`;
   - СУБД: Redis 5;
   - тип конфигурации: Single;
   - сеть: `monitoring-net`;

   Внутренний IP-адрес созданного инстанса: `10.0.3.13`.

1. [Разверните](/ru/applications-and-services/marketplace/initial-configuration/grafana-start) Grafana 10 в сети `monitoring-net`.

## 2. Установите и настройте Prometheus

1. [Установите](/ru/dbs/dbaas/service-management/managing-extensions#ustanovka_rasshireniya) расширение **Node exporter** для инстанса БД `Redis-5`. При установке укажите параметр `listen_port` = `9100`.
1. [Подключитесь](/ru/base/iaas/service-management/vm/vm-connect/vm-connect-nix) к ВМ `Centos_8_5_Prometheus`.
1. Скачайте Prometheus и распакуйте скачанный архив:

   ```bash
   sudo su
   export VERSION="2.45.1"
   wget https://github.com/prometheus/prometheus/releases/download/v$VERSION/prometheus-$VERSION.linux-amd64.tar.gz -O - | tar -xzv -C /tmp
   ```

1. Скопируйте содержимое репозитория `prometheus-2.45.1.linux-amd64`:

   ```bash
   mkdir /etc/prometheus
   mkdir /var/lib/prometheus
   cp /tmp/prometheus-$VERSION.linux-amd64/prometheus /usr/local/bin
   cp /tmp/prometheus-$VERSION.linux-amd64/promtool /usr/local/bin
   cp -r /tmp/prometheus-$VERSION.linux-amd64/consoles /etc/prometheus
   cp -r /tmp/prometheus-$VERSION.linux-amd64/console_libraries /etc/prometheus
   cp /tmp/prometheus-$VERSION.linux-amd64/prometheus.yml /etc/prometheus/
   ```

1. (Опционально) Удалите файлы из временной папки:

   ```bash
   rm -rf /tmp/prometheus-$VERSION.linux-amd64
   ```

1. Создайте группу и пользователя `prometheus`, назначьте ему права на связанные репозитории:

   ```bash
   groupadd --system prometheus
   useradd --system -g prometheus -s /bin/false prometheus
   chown -R prometheus:prometheus /var/lib/prometheus /etc/prometheus
   chown prometheus:prometheus /usr/local/bin/prometheus /usr/local/bin/promtool
   ```

1. В файле `/etc/prometheus/prometheus.yml` добавьте содержимое в блок `scrape_configs`:

   ```yml
   - job_name: "node"
     scrape_interval: 10s
     static_configs:
       - targets: ["10.0.3.13:9100"]
   ```

1. Создайте сценарий запуска Prometheus `/etc/systemd/system/prometheus.service` с содержимым:

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

1. Запустите Prometheus:

   ```bash
   systemctl daemon-reload
   systemctl start prometheus.service
   systemctl enable prometheus.service
   ```

1. Убедитесь, что Prometheus работает корректно:

   ```bash
   systemctl status prometheus.service
   ```

   Вывод команды должен содержать статус `active`.

   <details>
    <summary>Пример ожидаемого вывода</summary>

    ```bash
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

   </details>

1. Подождите несколько минут, чтобы накопились данные.
1. Перейдите по адресу `http://87.239.239.239:9090`.

   Откроется веб-интерфейс сервера Prometheus.

1. (Опционально) Ознакомьтесь с доступными данными:

   - Сформируйте [поисковый запрос](https://prometheus.io/docs/prometheus/2.45/querying/examples/), чтобы просмотреть данные в табличном виде.
   - Откройте [шаблонные наборы графиков](https://prometheus.io/docs/visualization/consoles/) по адресу `http://87.239.239.239:9090/consoles/index.html.example`.

1. (Опционально) [Отвяжите](/ru/networks/vnet/operations/manage-floating-ip#otvyazka_plavayushchego_ip_adresa) плавающий адрес от ВМ `Centos_8_5_Prometheus`.

## 3. Настройте визуализацию данных в Grafana

1. Перейдите в веб-интерфейс Grafana.
1. [Добавьте](https://grafana.com/docs/grafana/v10.0/administration/data-source-management/) новый источник данных (data source): в **Prometheus server URL** укажите `http://10.0.3.7:9090`.
1. [Установите](https://grafana.com/docs/grafana/v10.0/dashboards/build-dashboards/create-dashboard/) наборы графиков для визуализации получаемых данных, например, импортировав готовый вариант — [Node Exporter Full](https://grafana.com/grafana/dashboards/1860-node-exporter-full/).

## 4. (Опционально) Проверьте данные мониторинга после тестовой нагрузки

1. Создайте тестовую нагрузку на ВМ `Redis-5` удобным для вас способом.

   <details>
    <summary>Пример с утилитой sysbench</summary>

   ```bash
   sysbench cpu  --cpu-max-prime=2000000 --time=60 run
   sysbench fileio --file-test-mode=rndrw --time=60 prepare
   sysbench fileio --file-test-mode=rndrw --time=60 run
   sysbench threads --time=60 run
   sysbench mutex --time=60 run
   ```

   </details>

   <warn>

   Установка дополнительного ПО на виртуальные машины сервиса Cloud Databases возможно только через запрос в [техническую поддержку](/ru/contacts).

   </warn>

1. Убедитесь в изменении показателей графиков Grafana.

## Удалите неиспользуемые ресурсы

Созданные ресурсы тарифицируются и расходуют квоты. Если они вам больше не нужны:

1. [Удалите](/ru/base/iaas/vm-start/manage-vm/vm-delete) развернутые виртуальные машины.
1. [Удалите](/ru/applications-and-services/marketplace/service-management/pr-instance-manage#udalenie_instansa_servisa) виртуальную машину с Grafana.
1. [Удалите](/ru/networks/vnet/operations/manage-floating-ip#udalenie_plavayushchego_ip_adresa_iz_proekta) плавающий IP-адрес, назначенный виртуальной машине `Centos_8_5_Prometheus`.
1. [Удалите](/ru/networks/vnet/operations/manage-ports#udalenie_porta) порт, которому назначен виртуальный IP-адрес.
1. [Удалите](/ru/networks/vnet/operations/manage-net#udalenie_seti) сеть `monitoring-net`.
