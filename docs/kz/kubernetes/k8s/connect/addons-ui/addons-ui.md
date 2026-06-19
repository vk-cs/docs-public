# {heading(Аддондардың веб-интерфейстеріне қосылу)[id=k8s-addons-ui]}

{include(/kz/_includes/_translated_by_ai.md)}

Кластерге {linkto(../../concepts/addons-and-settings/addons#k8s-addons)[text=орнатуға болатын]} кейбір {linkto(../../concepts/addons-and-settings/addons#k8s-addons)[text=аддондарда]} веб-интерфейс бар. Веб-интерфейске қосылу тәсілі кластердің IP-мекенжайына байланысты:

- Егер кластерге сыртқы IP-мекенжай тағайындалса, интернетке қолжетімділігі бар кез келген хосттан қосылуға болады.
- Егер кластерге тек ішкі IP-мекенжай тағайындалса, онда тек VK Cloud ішіндегі хосттан — кластермен бір ішкі желіде орналасқан виртуалды машинадан қосылуға болады.

Қосылу үшін хостта браузер орнатылған болуы керек.

## {heading(Дайындық қадамдары)[id=k8s-addons-ui-before-work]}

1. Аддонның веб-интерфейсіне қосылу жоспарланып отырған хостта {linkto(../kubectl#k8s-kubectl-check-connection)[text=кластерге `kubectl` көмегімен қосыла алатыныңызға көз жеткізіңіз]}.

1. Осы хостта `kauthproxy` утилитасы әлі орнатылмаған болса, оны орнатыңыз:

   1. Қажетті нұсқаның архивін [релиздер бетінен](https://github.com/int128/kauthproxy/releases) жүктеп алыңыз:

      - Linux үшін: `kauthproxy_linux_....zip`;
      - macOS үшін: `kauthproxy_darwin_....zip`;
      - Windows үшін: `kauthproxy_windows_....zip`.

   1. Архивті ашыңыз.

   1. Орындауға болатын файлды `PATH` орта айнымалысында көрсетілген директорияға орналастырыңыз, мысалы:

      - Linux/macOS үшін `/usr/local/bin`;
      - Windows үшін `C:\`.

## {heading(Аддонның веб-интерфейсіне қосылу)[id=k8s-addons-ui-web-ui]}

{tabs}

{tab(Jaeger)}

1. Кластерде `jaeger` аддоны {linkto(../../instructions/addons/advanced-installation/install-advanced-jaeger#k8s-install-advanced-jaeger)[text=орнатылғанына]} {linkto(../../instructions/addons/manage-addons#k8s-manage-addons-view)[text=көз жеткізіңіз]}.
1. Хостта терминалдың бөлек сессиясында команданы орындаңыз:

   ```console
   kauthproxy -n jaeger http://jaeger-query.svc
   ```

   Егер аддонды қосу кезінде `jaeger` атауынан өзгеше сервис атауы немесе `jaeger` атауынан өзгеше атаулар кеңістігі таңдалса, команданы түзетіңіз.

   Браузер ашылады, және сіз Query UI веб-интерфейсіне бағытталасыз. Веб-интерфейс тек HTTP арқылы қолжетімді.

   {note:warn}

   Бұл терминал сессиясын жаппаңыз, әйтпесе веб-интерфейске қолжетімділік жоғалады.

   {/note}

{/tab}

{tab(Kiali)}

Kiali — Istio-мен жұмыс істеуге арналған веб-интерфейс. Оған қосылу үшін:

1. Кластерде `kiali` аддоны {linkto(../../instructions/addons/advanced-installation/install-advanced-kiali#k8s-install-advanced-kiali)[text=орнатылғанына]} {linkto(../../instructions/addons/manage-addons#k8s-manage-addons-view)[text=көз жеткізіңіз]}.
1. Хостта терминалдың бөлек сессиясында команданы орындаңыз:

   ```console
   kauthproxy -n istio-system https://kiali.svc
   ```

   Егер аддонды қосу кезінде `kiali` атауынан өзгеше сервис атауы немесе `istio-system` атауынан өзгеше атаулар кеңістігі таңдалса, команданы түзетіңіз.

   Браузер ашылады, және сіз Kiali веб-интерфейсіне бағытталасыз. Kiali-мен жұмыс істеу туралы толығырақ [ресми құжаттамада](https://kiali.io/docs/features/).

   {note:warn}

   Бұл терминал сессиясын жаппаңыз, әйтпесе Kiali веб-интерфейсіне қолжетімділік жоғалады.

   {/note}

{/tab}

{tab(Kube Prometheus Stack (Grafana))}

Kube Prometheus Stack аддонының құрамына [Grafana](https://grafana.com/) кіреді — бұл метрикалар мен кластер күйін визуализациялауға арналған құрал. Оған қосылу үшін: 

1. Кластерде `kube-prometheus-stack` аддоны {linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring)[text=орнатылғанына]} {linkto(../../instructions/addons/manage-addons#k8s-manage-addons-view)[text=көз жеткізіңіз]}.
1. Хостта терминалдың бөлек сессиясында команданы орындаңыз:

   ```console
   kubectl -n <ПРОСТРАНСТВО_ИМЕН> port-forward service/kube-prometheus-stack-grafana 8001:80
   ``` 
   Мұнда `<ПРОСТРАНСТВО_ИМЕН>` — аддон орнатылған атаулар кеңістігінің атауы.
1. Браузерде http://127.0.0.1:8001 мекенжайын ашыңыз.

{/tab}

{/tabs}
