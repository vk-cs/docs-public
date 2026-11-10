# {heading(Аддондардың веб-интерфейстеріне қосылу)[id=mk8s-addons-ui]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Кластерге {linkto(../../concepts/addons-and-settings/addons#mk8s-addons)[text=орнатуға болатын]} кейбір {linkto(../../concepts/addons-and-settings/addons#mk8s-addons)[text=аддондарда]} веб-интерфейс бар. Веб-интерфейске қосылу тәсілі кластердің IP-мекенжайына байланысты:

- Егер кластерге сыртқы IP-мекенжай тағайындалса, интернетке қолжетімділігі бар кез келген хосттан қосылуға болады.
- Егер кластерге тек ішкі IP-мекенжай тағайындалса, онда тек VK Cloud ішіндегі хосттан — кластермен бір ішкі желіде орналасқан виртуалды машинадан қосылуға болады.

Қосылу үшін хостта браузер орнатылған болуы керек.

## {heading(Дайындық қадамдары)[id=mk8s-addons-ui-before-work]}

1. Аддонның веб-интерфейсіне қосылу жоспарланып отырған хостта {linkto(../kubectl#mk8s-kubectl-check-connection)[text=кластерге `kubectl` көмегімен қосыла алатыныңызға көз жеткізіңіз]}.

1. Осы хостта `kauthproxy` утилитасы әлі орнатылмаған болса, оны орнатыңыз:

   1. Қажетті нұсқаның архивін [релиздер бетінен](https://github.com/int128/kauthproxy/releases) жүктеп алыңыз:

      - Linux үшін: `kauthproxy_linux_....zip`;
      - macOS үшін: `kauthproxy_darwin_....zip`;
      - Windows үшін: `kauthproxy_windows_....zip`.

   1. Архивті ашыңыз.

   1. Орындауға болатын файлды `PATH` орта айнымалысында көрсетілген директорияға орналастырыңыз, мысалы:

      - Linux/macOS үшін `/usr/local/bin`;
      - Windows үшін `C:\`.

## {heading(Аддонның веб-интерфейсіне қосылу)[id=mk8s-addons-ui-web-ui]}

{tabs}

{tab(Jaeger)}

1. {linkto(../../instructions/addons/manage-addons#mk8s-manage-addons-view)[text=Көз жеткізіңіз]}, `jaeger` аддоны кластерде {linkto(../../instructions/addons/advanced-installation/install-advanced-jaeger#mk8s-install-advanced-jaeger)[text=орнатылған]}.
1. Хостта бөлек терминал сессиясында мына команданы орындаңыз:

   ```console
   kauthproxy -n jaeger http://jaeger-query.svc
   ```

   Егер аддонды қосу кезінде `jaeger`-ден өзге сервис аты немесе `jaeger`-ден өзге атаулар кеңістігі таңдалған болса, команданы түзетіңіз.

   Браузер ашылады және сіз Query UI веб-интерфейсіне бағытталасыз. Веб-интерфейс тек HTTP арқылы қолжетімді.

   {note:warn}
   Бұл терминал сессиясын жаппаңыз, әйтпесе веб-интерфейске қолжетімділік жоғалады.
   {/note}

{/tab}

{tab(Kube Prometheus Stack (Grafana))}

Kube Prometheus Stack аддонының құрамына кластер метрикалары мен күйін визуализациялау құралы — [Grafana](https://grafana.com/) кіреді. Оған қосылу үшін:

1. {linkto(../../instructions/addons/manage-addons#mk8s-manage-addons-view)[text=Көз жеткізіңіз]}, `kube-prometheus-stack` аддоны кластерде {linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#mk8s-install-advanced-monitoring)[text=орнатылған]}.
1. Хостта бөлек терминал сессиясында Grafana сервисінің атын білу үшін команданы орындаңыз:

   ```console
   kubectl -n <ПРОСТРАНСТВО_ИМЕН> get svc -l app.kubernetes.io/name=grafana
   ```

   Мұнда `<ПРОСТРАНСТВО_ИМЕН>` — аддон орнатылған атаулар кеңістігінің атауы.

   Команда нәтижесінде Grafana сервисінің аты `<НАЗВАНИЕ_ПРИЛОЖЕНИЯ>-grafana` форматында болады. Егер қолданбаның атауы жеке кабинет арқылы орнату кезінде автоматты түрде жасалған болса, сервис аты `addon-<ХЕШ>-grafana` түрінде болады, мысалы, `addon-c01ea19419-grafana`.

   {note:info}
   Аддонның басқа компоненттерінің сервис атаулары да қолданба атауы негізінде қалыптастырылады. Ерекшелік — Prometheus және Alertmanager: олардың атаулары әрқашан `prometheus-prometheus` және `prometheus-alertmanager`. Толығырақ {linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#mk8s-install-advanced-monitoring-additional)[text=аддонды орнату нұсқаулығында]}.
   {/note}

1. Сервис атын пайдаланып, `port-forward` арқылы Grafana-ға сырттан қолжетімділік ашыңыз:

   ```console
   kubectl -n <ПРОСТРАНСТВО_ИМЕН> port-forward service/<ИМЯ_СЕРВИСА_GRAFANA> 8001:80
   ```

1. Браузерде http://127.0.0.1:8001 мекенжайын ашыңыз.

{/tab}

{/tabs}