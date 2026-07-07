# {heading(Мониторинг кластера)[id=k8s-monitoring]}

{ifdef(public)}
Для отслеживания состояния кластера Kubernetes доступны следующие инструменты:

- Встроенные в Kubernetes Dashboard инструменты.

  Они обеспечивают базовые возможности мониторинга, позволяя посмотреть информацию о ресурсах Kubernetes.

- {linkto(../concepts/addons-and-settings/addons#k8s-addons-kube-prometheus-stack)[text=Аддон мониторинга]}.

  Аддон расширяет возможности мониторинга кластера:

  - Позволяет посмотреть метрики по множеству ресурсов Kubernetes, вплоть до индивидуальных подов.
  - Поддерживает алерты, которые отправляют оповещения при превышении заданных порогов для метрик. Например, можно отследить недоступность ресурсов кластера или нехватку вычислительных мощностей worker-узлов.
  - Позволяет {linkto(#k8s-monitoring-forecast-consumption)[text=прогнозировать]} потребление ресурсов кластера, просматривать графики прогнозов и заблаговременно получать оповещения о скором исчерпании ресурсов. Прогнозирование доступно только в {linkto(../concepts/versions/components#k8s-components-addons)[text=версиях аддона]} с доработками от VK Tech (имеют `vk` в номере).

  Чтобы узнать, установлен ли аддон мониторинга в кластере, {linkto(../instructions/addons/manage-addons#k8s-manage-addons-view)[text=посмотрите список установленных аддонов]}.

## {heading(Использование Kubernetes Dashboard)[id=k8s-monitoring-kubernetes-dashboard]}

1. {linkto(../connect/k8s-dashboard#k8s-k8s-dashboard)[text=Подключитесь к кластеру с помощью Kubernetes Dashboard]}.
1. Получите данные о ресурсах кластера:

   1. Выберите нужное пространство имен из выпадающего списка вверху интерфейса Kubernetes Dashboard. По умолчанию выбрано пространство имен `default`.
   1. В боковом меню выберите нужный ресурс Kubernetes.

## {heading(Подключение к Grafana для просмотра метрик кластера)[id=k8s-monitoring-connect-grafana]}

1. {linkto(../instructions/addons/manage-addons#k8s-manage-addons-view)[text=Убедитесь]}, что аддон мониторинга (`kube-prometheus-stack`) {linkto(../instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring)[text=установлен]} в кластере.

1. {linkto(../connect/kubectl#k8s-kubectl-check-connection)[text=Убедитесь]}, что вы можете подключиться к кластеру с помощью `kubectl`.

1. Получите доступ к веб-интерфейсу Grafana:

   1. В отдельной сессии терминала выполните команду:

      ```console
      kubectl -n prometheus-monitoring port-forward service/kube-prometheus-stack-grafana 8001:80
      ```

      {note:warn}
      Не закрывайте эту сессию, иначе доступ к веб-интерфейсу Grafana пропадет.
      {/note}

   1. По выводу команды определите порт, открытый `kubectl` для доступа к Grafana.

      Номер порта указан до символа `→`. Например, из этого вывода следует, что для подключения используется порт `6637`:

      ```text
      Forwarding from 127.0.0.1:6637 -> 3000
      Forwarding from [::1]:6637 -> 3000
      ```

   1. Откройте в браузере URL для доступа к веб-интерфейсу Grafana:

      ```http
      http://localhost:<ПОРТ>/
      ```

      Появится страница входа в Grafana.

1. Выполните вход в Grafana. В зависимости от того, с какими параметрами был {linkto(../instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring)[text=установлен]} аддон, используйте:

   - Логин `admin` и временный пароль. Пароль необходимо будет сменить после первого входа.
   - Логин `admin` и постоянный пароль из секрета Kubernetes.

Теперь вы можете работать с Grafana. Например, создавать и просматривать дашборды. Преднастроенные дашборды с информацией о различных ресурсах Kubernetes доступны в боковом меню **Dashboards → Browse**.

Подробнее о работе с Grafana в [официальной документации](https://grafana.com/docs/grafana/latest/).

## {heading(Прогнозирование потребления ресурсов кластера)[id=k8s-monitoring-forecast-consumption]}

В аддон мониторинга `kube-prometheus-stack` с доработками от VK Tech встроены алерты для отправки оповещений, если через заданное время прогнозируется исчерпание определенных ресурсов кластера. Этот аддон также предоставляет дашборды в Grafana, на которых отображаются текущие прогнозы потребления ресурсов.

Аддон строит прогнозы [методом линейной регрессии](https://prometheus.io/docs/prometheus/latest/querying/functions/#predict_linear): по значениям метрики, собранным с заданным интервалом в пределах заданного периода, строится линейная функция; прогноз вычисляется как ее значение в будущем через заданное время. Полученное значение выражается в процентах от максимальной емкости ресурса на объекте Kubernetes.

{note:warn}
Прогнозирование не выполняется для объектов master-узлов.
{/note}

1. {linkto(../instructions/addons/manage-addons#k8s-manage-addons-view)[text=Убедитесь]}, что в кластере {linkto(../instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring)[text=установлена]} версия аддона мониторинга `kube-prometheus-stack` с доработками от VK Tech (с суффиксом `vk` в номере версии).
1. {linkto(../instructions/addons/manage-addons#k8s-manage-addons-edit-code)[text=Перейдите]} на страницу редактирования кода аддона `kube-prometheus-stack` и убедитесь, что параметр `grafana.alerts.enabled` в коде равен `true`. Это значение присваивается параметру при установке аддона.
1. Если этот параметр был изменен на `false`, исправьте на `true` и сохраните обновленные настройки.

   {note:warn}
   При отключенном параметре `grafana.alerts.enabled` или других изменениях в коде аддона, несовместимых с настройками по умолчанию, отправка оповещений об исчерпании ресурсов не гарантируется.
   {/note}

1. {linkto(#k8s-monitoring-connect-grafana)[text=Войдите]} в Grafana.
1. В боковом меню перейдите в раздел **Dashboards**.
1. В списке дашбордов в разделе **{var(cloud)}** откройте дашборд **K8s Resources Prediction**.
1. Просмотрите доступные прогнозы потребления ресурсов:

   - **CPU Leaders**: прогноз потребления CPU worker-узлами.
   - **Memory Leaders**: прогноз потребления RAM worker-узлами.
   - **Persistent Volume Leaders**: прогноз потребления места на постоянном томе ({linkto(../reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=PV]}).
   - **Inode Leaders**: прогноз потребления индексных дескрипторов (inode) на постоянном томе.

1. (Опционально) Настройте удобное для вас отображение прогнозов с помощью управляющих элементов Grafana.
1. (Опционально) Измените параметры, по которым рассчитываются прогнозы:

   - **Analysis period**: интервал времени до текущего момента, данные которого используются для построения функции прогноза.
   - **Forecast horizon**: интервал между моментом в будущем, для которого рассчитывается прогноз, и текущим моментом.

1. В боковом меню перейдите в раздел **Alerting** → **Alert rules**.
1. В блоке **Grafana** раскройте папку **{var(cloud)} > K8s Resources Prediction** и просмотрите встроенные алерты исчерпания ресурсов:

   - **K8sNodeCpuPrediction**: на worker-узле нет свободных CPU.
   - **K8sNodeMemoryPrediction**: на worker-узле нет свободной памяти RAM.
   - **K8sPersistentVolumeCapacityPrediction**: на постоянном томе нет свободного места.
   - **K8sPersistentVolumeInodePrediction**: на постоянном томе нет свободных индексных дескрипторов.

   Эти алерты имеют следующие параметры:

   - Глубина анализа данных: `1 неделя`.
   - Интервал, с которым выбираются данные из метрики: `10 минут`.
   - Глубина предсказания: `1 день`.
   - Порог срабатывания алерта: `100%`.

   Изменить параметры встроенных алертов нельзя, но можно создать собственный алерт на основе встроенного.

1. (Опционально) Создайте собственный алерт на основе встроенного:

   1. В списке алертов нажмите кнопку копирования для нужного встроенного алерта, например `K8sNodeCpuPrediction`.
   1. Прочтите предупреждение и нажмите кнопку **Copy**.

      Откроется страница **Add rule**. В разделе **2 Define query and alert condition** под меткой **A** отобразится строка запроса. Для алерта `K8sNodeCpuPrediction` она будет иметь следующий вид:

      ```txt

      predict_linear(avg(instance:node_cpu_utilisation:rate5m * 100  * on(instance) group_left(nodename) node_uname_info{nodename!~".*master.*"}) by (nodename) [1w:10m],86400)

      ```

      Этот запрос содержит значения:

      - `100` — порог срабатывания алерта в процентах;
      - `1w` — глубина анализа данных;
      - `10m` — интервал выбора данных;
      - `86400` — глубина предсказания в секундах.

   1. Измените значения на нужные. Глубина предсказания задается только в секундах, а для глубины анализа и интервала выбора данных возможны [другие единицы измерения](https://prometheus.io/docs/prometheus/latest/querying/basics/#float-literals-and-time-durations).
   1. Настройте другие параметры алерта, как описано в [официальной документации Grafana](https://grafana.com/docs/grafana/latest/alerting/alerting-rules/).
   1. Сохраните изменения.

1. [Настройте](https://grafana.com/docs/grafana/latest/alerting/configure-notifications) доставку оповещений о срабатывании встроенных и собственных алертов.

Настройка прогнозирования завершена.

Теперь вы можете:

- получать оповещения об исчерпании ресурсов;
- при получении оповещения просматривать прогнозы и по другим объектам, чтобы заблаговременно решать потенциальные проблемы;
- просматривать текущие прогнозы и сравнивать их с динамикой потребления, представленной на стандартных дашбордах Grafana;
- по результатам сравнения уточнять параметры прогнозирования и создавать собственные алерты.
{/ifdef}

{ifndef(public)}
Кластер Kubernetes содержит встроенные средства мониторинга на базе Heapster, Time Series базы данных InfluxDB.

Чтобы просмотреть метрики загрузки CPU и памяти:

1. {linkto(../connect/k8s-dashboard#k8s-k8s-dashboard)[text=Войдите]} в Kubernetes Dashboard.
1. Перейдите в раздел **Workloads**.

   В результате Kubernetes Dashboard отображает данные мониторинга узлов каждого индивидуального пода.

## {heading(Prometheus)[id=k8s-monitoring-prometheus]}

Prometheus — центральный сервер, предназначенный для сбора и хранения данных. Сервер Prometheus с заданной периодичностью считывает метрики и помещает полученные данные в Time Series DB. Prometheus работает по модели Pull, то есть он сам опрашивает endpoints с целью получения данных.

Чтобы подключиться к Prometheus:

1. {linkto(../instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring)[text=Добавьте]} аддон `kube-prometheus-stack` в кластер.
1. {linkto(../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]}.
1. Убедитесь в наличии подов сервиса мониторинга, выполнив команду:

   ```console
   kubectl get pods --namespace=prometheus-monitoring
   ```

   Пример ожидаемого результата:

   ```console
   NAME                                                        READY   STATUS    RESTARTS   AGE
   alertmanager-prometheus-alertmanager-0                      2/2     Running   0          23h
   kube-prometheus-stack-grafana-6788665c86-9hcpv              3/3     Running   0          23h
   kube-prometheus-stack-kube-state-metrics-6d89cd9c95-g67fq   1/1     Running   0          23h
   kube-prometheus-stack-prometheus-node-exporter-6z77q        1/1     Running   0          23h
   kube-prometheus-stack-prometheus-node-exporter-h8ks6        1/1     Running   0          23h
   prometheus-operator-5588c89965-hrs9n                        1/1     Running   0          23h
   prometheus-prometheus-prometheus-0                          2/2     Running   0          23h
   ```

1. Выполните перенаправление трафика с помощью команды:

   ```console
   kubectl -n prometheus-monitoring port-forward prometheus-prometheus-prometheus-0 8080:9090
   ```

## {heading(Prometheus + Grafana)[id=k8s-monitoring-prometheus-grafana]}

Расширенный мониторинг инфраструктуры Kubernetes и всех пользовательских приложений можно настроить с помощью Grafana. Каждый под, который входит в кластер Kubernetes, будет автоматически зарегистрирован в Grafana. С помощью Grafana можно настроить оповещения о недоступности ресурсов.

Чтобы подключиться к Grafana:

1. {linkto(../instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring)[text=Добавьте]} аддон `kube-prometheus-stack` в кластер.
1. {linkto(../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]}.
1. Убедитесь в наличии подов сервиса мониторинга, выполнив команду:

   ```console
   kubectl get pods --namespace=prometheus-monitoring
   ```
   
1. Выполните перенаправление трафика с помощью команды:
   
   ```console
   kubectl -n prometheus-monitoring port-forward kube-prometheus-stack-grafana-<ID> 8001:80
   ```

1. В браузере перейдите по адресу веб-интерфейса Grafana **http://127.0.0.1:8001**. 
   Для первого входа используйте реквизиты:

   * **Логин**: `admin`.
   * **Пароль**: `admin`.

   {note:warn}
   Если при установке аддона для сервиса Grafana был назначен временный пароль, используйте его для входа.

   После первого входа смените пароль пользователя в Grafana.
   {/note}

{/ifndef}