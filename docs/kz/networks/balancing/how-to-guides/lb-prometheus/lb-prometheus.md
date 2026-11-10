# {heading(Балансировщиктерді Prometheus көмегімен мониторингтеу)[id=balancing-lb-prometheus]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(cloud)} балансировщиктері үшін мониторингті баптауға болады — [OpenStack Octavia](https://docs.openstack.org/octavia/latest/) метрикаларын Prometheus көмегімен жинау және экспорттау, сондай-ақ осы метрикаларды Grafana дашбордтарында визуализациялау.

Әрі қарай Linux ОС бар ВМ-де орналастырылған Grafana және Prometheus сервистерінің көмегімен балансировщикті мониторингтеуді қалай баптау көрсетіледі. Егер сіздің инфраструктураңызда Grafana және Prometheus ортасы бұрыннан бапталған болса, оны орналастыру мен баптауға қатысты әрекеттерді өткізіп жіберіңіз.

{note:info}
Prometheus көмегімен мониторинг 2026 жылдың 20 маусымынан кейін жасалған балансировщиктер үшін қолжетімді.
{/note}

## {heading(Дайындық қадамдар)[id=balancing-lb-prometheus-prep]}

1. `octavia` және `neutron` пакеттері бар OpenStack клиентін {linkto(../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=орнатыңыз]} және жобада аутентификациядан өтіңіз.
1. Қосымшалар дүкенінен [Grafana](https://msk.cloud.vk.ru/app/services/marketplace/v2/apps/service/e9ec618a-ca38-483b-916c-0c1fce9620be/latest/info) сервисін {linkto(../../../../applications-and-services/marketplace/initial-configuration/grafana-start#marketplace-grafana-start)[text=орналастырыңыз]}. Егер сіз жеке желідегі балансировщик үшін мониторинг баптасаңыз, сервис орналастырылатын ВМ осы балансировщикпен бір подсетьте болуы тиіс. Қосымшалар дүкенінен алынған сервистерде VK Cloud-та жұмыс істеуге арналған базалық баптаулар бұрыннан бар. Қолжетімді баптаулар туралы толығырақ — [Grafana ресми құжаттамасында](https://archive.grafana.com/docs/grafana/v10.0/setup-grafana/configure-grafana/).
1. Grafana сервисі орнатылған ВМ-ге {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=қосылыңыз]} және оған [Prometheus](https://prometheus.io/) орнатыңыз:

   ```console
   sudo apt update
   wget https://github.com/prometheus/prometheus/releases/download/v2.45.1/prometheus-2.45.1.linux-amd64.tar.gz
   tar xvf prometheus-2.45.1.linux-amd64.tar.gz
   cd prometheus-2.45.1.linux-amd64
   ```

## {heading(1. Балансировщик туралы мәліметтерді алыңыз)[id=balancing-lb-prometheus-info]}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app/).
1. Жобаны таңдаңыз.
1. **Виртуальные сети** → **Балансировщики нагрузки** бөліміне өтіңіз.

   Балансировщиктер тізімі көрсетіледі.

1. Қажетті балансировщиктің атауын басыңыз.
1. **IP-адреса** блогында балансировщиктің IP-адрестерін тауып, жазыңыз.
1. **Информация о балансировщике** блогында балансировщиктің ID-сын тауып, жазыңыз.

## {heading(2. Prometheus Listener жасаңыз)[id=balancing-lb-prometheus-listener]}

Команданы орындаңыз:

```console
openstack loadbalancer listener create \
    --name prometheus-listener \ 
    --protocol PROMETHEUS \ 
    --protocol-port 9100 \
    <ID_БАЛАНСИРОВЩИКА>
```

## {heading(3. Prometheus-пен интеграцияны орындаңыз)[id=balancing-lb-prometheus-integration]}

1. Prometheus орнатылған ВМ-ге {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=қосылыңыз]}.
1. Prometheus баптаулар файлын ашыңыз:

   ```console
   nano /etc/prometheus/prometheus.yml
   ```

1. `scrape_configs` блогын тауып, оған баптауды қосыңыз:

   ```yml
     - job_name: 'Octavia'
       static_configs:
         - targets: ['<IP-АДРЕС_БАЛАНСИРОВЩИКА>:9100']
   ```
   Мұнда `<IP-АДРЕС_БАЛАНСИРОВЩИКА>` — балансировщиктің ішкі немесе сыртқы IP-адресі. Егер Grafana және Prometheus сервері балансировщикпен бір жеке подсетьте орналаспаса, сыртқы IP-адресті пайдаланыңыз.
1. Prometheus-ті іске қосыңыз:

   ```console
   sudo apt install screen
   screen -dm ./prometheus --config.file=./prometheus.yml --web.listen-address=localhost:9090
   ```

   Егер баптау іске қосылған Prometheus-те орындалған болса, оны қайта іске қосыңыз:

   ```console
   systemctl restart prometheus
   ```

## {heading(4. Grafana-ға Octavia дашбордын қосыңыз)[id=balancing-lb-dashboard]}

{note:info}
Бапталған Octavia дашбордының мысалы [Grafana ресми сайтында](https://grafana.com/grafana/dashboards/15828-openstack-octavia-amphora-load-balancer/) қолжетімді.
{/note}

1. Grafana-ға авторизациялануыңыз.
1. Егер бұрын жасалмаса, Grafana-ға Prometheus деректер көзін қосыңыз:
   1. **Configuration → Data sources** бөліміне өтіңіз.
   1. **Add data source** басыңыз.
   1. Деректер көзінің түрін таңдаңыз: `Prometheus`.
   1. **URL** өрісіне `http://localhost:9090` енгізіңіз.
   1. **Save & test** басыңыз.
1. Octavia метрикаларына арналған дайын дашбордты қосыңыз:
   1. **Dashboards** бөліміне өтіңіз.
   1. **NEW** түймесін басып, мәзірден **Import** тармағын таңдаңыз.
   1. **Import via grafana.com** өрісіне ID: `15828` енгізіңіз.
   1. **Load** түймесін басыңыз.
1. **Prometheus** өрісінде бұрын жасалған `Prometheus` деректер көзін таңдаңыз.
1. **Import** түймесін басыңыз.
1. Дашборд жасалғанын тексеріңіз:
   1. **Dashboards → Browse** бөліміне өтіңіз.
   1. **OpenStack Octavia Amphora Load Balancer** дашбордының бетін ашыңыз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=balancing-lb-delete]}

Grafana және Prometheus орнатылған жұмыс істеп тұрған ВМ есептеу ресурстарын тұтынады. Егер ол сізге қажет болмаса, оны {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=жойыңыз]}.