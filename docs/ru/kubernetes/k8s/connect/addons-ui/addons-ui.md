# {heading(Подключение к веб-интерфейсам аддонов)[id=k8s-addons-ui]}

У некоторых {linkto(../../concepts/addons-and-settings/addons#k8s-addons)[text=аддонов]}, которые можно {linkto(../../instructions/addons/manage-addons#k8s-manage-addons)[text=установить]} в кластер, есть веб-интерфейс. Способ подключения к веб-интерфейсу зависит от IP-адреса кластера:

- Если кластеру назначен внешний IP-адрес, то можно подключиться с любого хоста, имеющего доступ в интернет.
- Если кластеру назначен только внутренний IP-адрес, то можно подключиться только с хоста в {var(cloud)} — виртуальной машины, которая находится в той же подсети, что и кластер.

Для подключения на хосте должен быть установлен браузер.

## {heading(Подготовительные шаги)[id=k8s-addons-ui-before-work]}

1. На хосте, с которого планируется подключаться к веб-интерфейсу аддона, {linkto(../kubectl#k8s-kubectl-check-connection)[text=убедитесь]}, что вы можете подключаться к кластеру с помощью `kubectl`.

1. На этом же хосте установите `kauthproxy`, если утилита еще не установлена:

   1. Загрузите архив нужной версии со [страницы релизов](https://github.com/int128/kauthproxy/releases):

      - для Linux: `kauthproxy_linux_....zip`;
      - для macOS: `kauthproxy_darwin_....zip`;
      - для Windows: `kauthproxy_windows_....zip`.

   1. Распакуйте архив.

   1. Поместите исполняемый файл в директорию, которая содержится в переменной окружения `PATH`, например:

      - в `/usr/local/bin` для Linux/macOS;
      - в `C:\` для Windows.

## {heading(Подключение к веб-интерфейсу аддона)[id=k8s-addons-ui-web-ui]}

{tabs}

{tab(Jaeger)}

1. {linkto(../../instructions/addons/manage-addons#k8s-manage-addons-view)[text=Убедитесь]}, что аддон `jaeger` {linkto(../../instructions/addons/advanced-installation/install-advanced-jaeger#k8s-install-advanced-jaeger)[text=установлен]} в кластере.
1. На хосте в отдельной сессии терминала выполните команду:

   ```console
   kauthproxy -n jaeger http://jaeger-query.svc
   ```

   Если при добавлении аддона были выбраны имя сервиса, отличное от `jaeger`, или пространство имен, отличное от `jaeger`, скорректируйте команду.

   Откроется браузер, и вы будете направлены в веб-интерфейс Query UI. Веб-интерфейс доступен только по HTTP.

   {note:warn}
   Не закрывайте эту сессию терминала, иначе доступ к веб-интерфейсу пропадет.
   {/note}

{/tab}

{tab(Kiali)}

Kiali — веб-интерфейс для работы с Istio. Чтобы подключиться к нему:

1. {linkto(../../instructions/addons/manage-addons#k8s-manage-addons-view)[text=Убедитесь]}, что аддон `kiali` {linkto(../../instructions/addons/advanced-installation/install-advanced-kiali#k8s-install-advanced-kiali)[text=установлен]} в кластере.
1. На хосте в отдельной сессии терминала выполните команду:

   ```console
   kauthproxy -n istio-system https://kiali.svc
   ```

   Если при добавлении аддона были выбраны имя сервиса, отличное от `kiali`, или пространство имен, отличное от `istio-system`, скорректируйте команду.

   Откроется браузер, и вы будете направлены в веб-интерфейс Kiali. Подробнее о работе с Kiali в [официальной документации](https://kiali.io/docs/features/).

   {note:warn}
   Не закрывайте эту сессию терминала, иначе доступ к веб-интерфейсу Kiali пропадет.
   {/note}

{/tab}

{tab(Kube Prometheus Stack (Grafana))}

В состав аддона Kube Prometheus Stack входит [Grafana](https://grafana.com/) — инструмент для визуализации метрик и состояния кластера. Чтобы подключиться к нему: 

1. {linkto(../../instructions/addons/manage-addons#k8s-manage-addons-view)[text=Убедитесь]}, что аддон `kube-prometheus-stack` {linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring)[text=установлен]} в кластере.
1. На хосте в отдельной сессии терминала выполните команду:
   
   ```console
   kubectl -n <ПРОСТРАНСТВО_ИМЕН> port-forward service/kube-prometheus-stack-grafana 8001:80
   ``` 
   Здесь `<ПРОСТРАНСТВО_ИМЕН>` — название пространства имен, куда установлен аддон.
1. Откройте в браузере адрес http://127.0.0.1:8001.

{/tab}

{/tabs}