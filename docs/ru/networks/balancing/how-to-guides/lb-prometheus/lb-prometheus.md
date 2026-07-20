# {heading(Мониторинг балансировщиков нагрузки с помощью Prometheus)[id=balancing-lb-prometheus]}

Для балансировщиков нагрузки от {var(cloud)} можно настроить мониторинг — сбор и экспорт метрик [OpenStack Octavia](https://docs.openstack.org/octavia/latest/) с помощью Prometheus и визуализацию этих метрик на дашбордах с помощью Grafana.

Далее будет показано, как настроить мониторинг балансировщика нагрузки с помощью сервисов Grafana и Prometheus, развернутых на ВМ с ОС Linux. Если в вашей инфраструктуре уже настроено окружение Grafana и Prometheus, пропустите действия, связанные с его развертыванием и настройкой.

{note:info}
Мониторинг с помощью Prometheus доступен для балансировщиков, созданных после 20 июня 2026 года.
{/note}

## {heading(Подготовительные шаги)[id=balancing-lb-prometheus-prep]}

1. {linkto(../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=Установите]} клиент OpenStack с пакетами `octavia` и `neutron` и пройдите аутентификацию в проекте.
1. {linkto(../../../../applications-and-services/marketplace/initial-configuration/grafana-start#marketplace-grafana-start)[text=Разверните]} из магазина приложений сервис [Grafana](https://msk.cloud.vk.com/app/services/marketplace/v2/apps/service/e9ec618a-ca38-483b-916c-0c1fce9620be/latest/info). Если вы настраиваете мониторинг для балансировщика в приватной сети, то ВМ, на которой разворачивается сервис, должна быть в одной подсети с этим балансировщиком. Сервисы из магазина приложений уже содержат базовые настройки для работы в VK Cloud. Подробнее о доступных настройках — в [официальной документации Grafana](https://archive.grafana.com/docs/grafana/v10.0/setup-grafana/configure-grafana/).
1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Подключитесь]} к ВМ, на которой установлен сервис Grafana, и установите на ней [Prometheus](https://prometheus.io/):

   ```console
   sudo apt update
   wget https://github.com/prometheus/prometheus/releases/download/v2.45.1/prometheus-2.45.1.linux-amd64.tar.gz
   tar xvf prometheus-2.45.1.linux-amd64.tar.gz
   cd prometheus-2.45.1.linux-amd64
   ```

## {heading(1. Получите сведения о балансировщике)[id=balancing-lb-prometheus-info]}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Балансировщики нагрузки**.

   Будет отображен список балансировщиков.

1. Нажмите на название нужного балансировщика.
1. В блоке **IP-адреса** найдите и запишите IP-адреса балансировщика.
1. В блоке **Информация о балансировщике** найдите и запишите ID балансировщика.

## {heading(2. Создайте Prometheus Listener)[id=balancing-lb-prometheus-listener]}

Выполните команду:

```console
openstack loadbalancer listener create \
    --name prometheus-listener \ 
    --protocol PROMETHEUS \ 
    --protocol-port 9100 \
    <ID_БАЛАНСИРОВЩИКА>
```

## {heading(3. Выполните интеграцию с Prometheus)[id=balancing-lb-prometheus-integration]}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Подключитесь]} к ВМ, на которой установлен Prometheus.
1. Откройте файл настроек Prometheus:

   ```console
   nano /etc/prometheus/prometheus.yml
   ```

1. Найдите блок `scrape_configs` и добавьте в него настройку:

   ```yml
     - job_name: 'Octavia'
       static_configs:
         - targets: ['<IP-АДРЕС_БАЛАНСИРОВЩИКА>:9100']
   ```
   Здесь `<IP-АДРЕС_БАЛАНСИРОВЩИКА>` — внутренний или внешний IP-адрес балансировщика нагрузки. Используйте внешний IP-адрес, если сервер Grafana и Prometheus находится не в той же приватной подсети, что и балансировщик.
1. Запустите Prometheus:

   ```console
   sudo apt install screen
   screen -dm ./prometheus --config.file=./prometheus.yml --web.listen-address=localhost:9090
   ```

   Если настройка выполнялась на запущенном Prometheus, перезапустите его:

   ```console
   systemctl restart prometheus
   ```

## {heading(4. Добавьте дашборд Octavia в Grafana)[id=balancing-lb-dashboard]}

{note:info}
Пример настроенного дашборда Octavia доступен [на официальном сайте Grafana](https://grafana.com/grafana/dashboards/15828-openstack-octavia-amphora-load-balancer/).
{/note}

1. Авторизуйтесь в Grafana.
1. Добавьте источник данных Prometheus в Grafana, если это не сделано ранее:
   1. Перейдите в раздел **Configuration → Data sources**.
   1. Нажмите **Add data source**.
   1. Выберите тип источника данных: `Prometheus`.
   1. В поле **URL** введите `http://localhost:9090`.
   1. Нажмите **Save & test**.
1. Добавьте готовый дашборд для метрик Octavia:
   1. Перейдите в раздел **Dashboards**.
   1. Нажмите кнопку **NEW** и выберите в меню пункт **Import**.
   1. В поле **Import via grafana.com** введите ID: `15828`.
   1. Нажмите кнопку **Load**.
1. В поле **Prometheus** выберите ранее созданный источник данных `Prometheus`.
1. Нажмите кнопку **Import**.
1. Убедитесь, что дашборд создан:
   1. Перейдите в раздел **Dashboards → Browse**.
   1. Откройте страницу дашборда **OpenStack Octavia Amphora Load Balancer**.

## {heading(Удалите неиспользуемые ресурсы)[id=balancing-lb-delete]}

Работающая ВМ с Grafana и Prometheus потребляет вычислительные ресурсы. Если она вам больше не нужна, {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=удалите ее]}.