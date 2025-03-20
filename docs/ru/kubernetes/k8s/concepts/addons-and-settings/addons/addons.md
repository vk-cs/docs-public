Для кластеров Cloud Containers доступны различные аддоны (дополнительные сервисы). Их можно выбрать в любой комбинации и установить либо при [создании кластера с помощью Terraform](../../../service-management/create-cluster/create-terraform), либо [позднее](../../../service-management/addons/manage-addons#ustanovka_addona) в уже существующий кластер. Процесс установки автоматизирован и требует минимального вмешательства пользователя.

## Особенности установки аддонов

- Аддоны устанавливаются на worker-узлы кластера и потребляют их вычислительные ресурсы.

  Ниже приведены системные требования аддонов, исходящие из стандартных значений [requests и limits](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits) для ресурсов Kubernetes в коде настройки аддона. При использовании нестандартных значений системные требования аддонов изменятся.

  <info>

  Некоторые аддоны могут устанавливаться на все узлы кластера (включая master-узлы). Подробнее читайте в разделе [Настройка и установка аддонов](../../../service-management/addons/advanced-installation).

  </info>

- Аддоны могут быть установлены на выделенную группу worker-узлов или на выбранные планировщиком Kubernetes worker-узлы. Использование первого подхода позволяет исключить влияние аддонов на работу production-сервисов, развернутых в кластере.

  Вычислительных ресурсов выделенной группы worker-узлов должно быть достаточно для всех аддонов, даже если каждый аддон потребляет максимум ресурсов, указанных в системных требованиях. Рекомендуется настроить автоматическое масштабирование для такой группы узлов.

- Установка аддонов возможна в трех вариантах:

  - **Стандартная установка** на выбранные планировщиком Kubernetes worker-узлы с изменением кода настройки аддона.
  - **Установка на выделенные worker-узлы** с изменением кода настройки аддона.
  - **Быстрая установка** на выбранные планировщиком Kubernetes worker-узлы без изменения кода настройки аддона (с настройками по умолчанию).

  Не все аддоны поддерживают все три варианта установки.

  Процесс установки описан в разделе [Настройка и установка аддонов](../../../service-management/addons/advanced-installation).

## Доступные аддоны

<info>

Доступность конкретных аддонов зависит от [региона](/ru/tools-for-using-services/account/concepts/regions), в котором планируется разместить кластер.

</info>

### Capsule

<tabs>
<tablist>
<tab>Описание</tab>
<tab>Системные требования</tab>
</tablist>
<tabpanel>

Кластеры Kubernetes позволяют организовать логическое разделение ресурсов Kubernetes на уровне отдельных пространств имен (namespaces). Однако этого может быть недостаточно, чтобы организовать разделение и изоляцию ресурсов в сложных сценариях. Например, нужно предоставить разным командам разработчиков разные наборы ресурсов. Для этого можно создать отдельные кластеры для каждой команды, но если таких кластеров много, ими сложно управлять.

[Capsule](https://capsule.clastix.io/docs) позволяет изолировать наборы ресурсов в рамках одного кластера с помощью тенантов (tenants). Тенант представляет собой пространства имен в сочетании с ограничениями на создание и потребление ресурсов Kubernetes, назначенные определенной группе пользователей. Движок политик Capsule (policy engine) не только следит за соблюдением политик по использованию ресурсов в рамках тенанта, но и обеспечивает изоляцию одного тенанта от другого. Так можно организовать работу нескольких команд в одном мультитенантном кластере (multi-tenant cluster) без необходимости администрировать дополнительные кластеры.

</tabpanel>
<tabpanel>

- **CPU**: 200m.
- **RAM**: 128Mi.

</tabpanel>
</tabs>

### cert-manager

<tabs>
<tablist>
<tab>Описание</tab>
<tab>Системные требования</tab>
</tablist>
<tabpanel>

С помощью инструмента [cert-manager](https://cert-manager.io/) можно управлять сертификатами в кластерах Kubernetes:

- Выпускать сертификаты, в том числе самоподписанные (self-signed). Для этого `cert-manager` отправляет запросы к источникам, выступающим в роли центра сертификации (certificate authority, CA).

  Примеры источников:

  - провайдеры решений по кибербезопасности, такие как [Venafi](https://www.venafi.com/);
  - провайдеры сертификатов, такие как [Let’s Encrypt](https://letsencrypt.org/);
  - хранилища секретов, такие как [HashiCorp Vault](https://www.vaultproject.io/);
  - локальные контейнеры, содержащие внутри себя публичную часть сертификата и приватный ключ.

- Автоматически перевыпускать сертификаты с истекающим сроком действия.

Выпущенный с помощью `cert-manager` сертификат будет доступен другим ресурсам Kubernetes. Например, его можно использовать для Ingress.

</tabpanel>
<tabpanel>

Требования отдельных компонентов аддона:

- cert-manager:

  - **CPU**: 10m.
  - **RAM**: 32Mi.

- [cert-manager-cainjector](https://cert-manager.io/docs/concepts/ca-injector/):

  - **CPU**: 10m.
  - **RAM**: 32Mi.

- [cert-manager-webhook](https://cert-manager.io/docs/concepts/webhook/):
  - **CPU**: 10m.
  - **RAM**: 32Mi.

</tabpanel>
</tabs>

### Docker Registry

<warn>

При установке аддона для него будет создан [стандартный балансировщик нагрузки](/ru/networks/balancing/concepts/load-balancer#tipy_balansirovshchikov_nagruzki).

Использование балансировщика [тарифицируется](/ru/networks/vnet/tariffication).

</warn>

<tabs>
<tablist>
<tab>Описание</tab>
<tab>Системные требования</tab>
</tablist>
<tabpanel>

[Реестр Docker](https://docs.docker.com/registry/) предназначен для размещения и хранения образов Docker. Работает в отказоустойчивой конфигурации (high availability, HA). Образы из реестра можно использовать при развертывании сервисов в кластере.

Подробнее в разделе [Подключение к реестру Docker](../../../connect/docker-registry).

</tabpanel>
<tabpanel>

- **CPU**: 100m.
- **RAM**: 128Mi–512 Mi.
- **Объем объектного хранилища S3**: зависит от размера и количества образов, которые планируется размещать в реестре.
- **Стандартный балансировщик нагрузки**: одна штука.
- **Floating IP-адрес**: одна штука.

</tabpanel>
</tabs>

### Fluent Bit

<tabs>
<tablist>
<tab>Описание</tab>
<tab>Системные требования</tab>
</tablist>
<tabpanel>

[Fluent Bit](https://docs.fluentbit.io/manual) позволяет настраивать сбор логов в кластерах Cloud Containers, чтобы затем анализировать их в сервисе [Cloud Logging](/ru/monitoring-services/logging), например, с помощью плагинов Elasticsearch или Loki. Основное преимущество данного аддона — возможность более гибкой настройки под нужды пользователя.

Источниками логов выступают [службы kubelet](https://kubernetes.io/docs/concepts/overview/components/#kubelet) и [поды](../../../reference/pods) (pods), расположенные на узлах кластера.

</tabpanel>
<tabpanel>

У аддона нет собственных системных требований. Поды аддона используют [настройки лимитов](../settings#nastroyki_limitov_dlya_podov) по умолчанию.

</tabpanel>
</tabs>

### {heading(Fluent Bit для Cloud Logging (logaas-integration))[id=fluent_bit_logaas_integration]}

<tabs>
<tablist>
<tab>Описание</tab>
<tab>Системные требования</tab>
</tablist>
<tabpanel>

Fluent Bit в комбинации со [специальными фильтрами](https://docs.fluentbit.io/manual/pipeline/filters/lua), написанными на языке Lua, позволяет организовать доставку логов из кластера Cloud Containers в сервис [Cloud Logging](/ru/monitoring-services/logging) для дальнейшего анализа этих логов.

Источниками логов выступают [службы kubelet](https://kubernetes.io/docs/concepts/overview/components/#kubelet) и [поды](../../../reference/pods) (pods), расположенные на узлах кластера. Подробнее о том, как работает аддон, читайте в [разделе про его установку](../../../service-management/addons/advanced-installation/install-advanced-logaas-integration).

</tabpanel>
<tabpanel>

У аддона нет собственных системных требований. Поды аддона используют [настройки лимитов](../settings#nastroyki_limitov_dlya_podov) по умолчанию.

</tabpanel>
</tabs>

### {heading(GPU Operator)[id=gpu_operator]}

<tabs>
<tablist>
<tab>Описание</tab>
<tab>Системные требования</tab>
</tablist>
<tabpanel>

GPU Operator позволяет управлять [GPU на узлах кластера](../../flavors#gpu) для выполнения машинного обучения или обработки больших данных.

Доступны следующие варианты использования GPU в кластере:

- Один под использует один или несколько GPU.
- Аддон распределяет один GPU между несколькими подами по стратегии [MIG](../../flavors#gpu-sharing).
- Аддон распределяет один GPU между несколькими подами по стратегии [MPS](../../flavors#gpu-sharing).

Состав аддона:

- NVIDIA GPU Operator для управления GPU.
- Служебные валидаторы для проверки CUDA (Compute Unified Device Architecture) после изменения конфигурации.
- Средства самостоятельной диагностики оператора.
- NVIDIA device plugin для автоматизации привязки и выделения ресурсов GPU.
- Node Feature Discovery для определения и регистрации функций, доступных на узлах кластера. Компонент содержит следующие службы:
  
  - NFD-Master отвечает за подключение к серверу API Kubernetes и обновление объектов узлов.
  - NFD-Worker подключается к службе NFD-Master для объявления аппаратных функций.
  - NFD Garbage-Collector гарантирует, что все объекты Node Feature Discovery имеют соответствующие узлы, и удаляет устаревшие объекты для несуществующих узлов.

Подробнее об аддоне и его компонентах: [NVIDIA GPU Operator](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/overview.html), [NVIDIA device plugin](https://github.com/NVIDIA/k8s-device-plugin?tab=readme-ov-file#nvidia-device-plugin-for-kubernetes), [Node Feature Discovery](https://kubernetes-sigs.github.io/node-feature-discovery).

</tabpanel>
<tabpanel>

Требования отдельных компонентов аддона:

- NVIDIA GPU Operator:
  - **CPU**: 200–500m;
  - **RAM**: 64–512Mi;
- NFD-Master:
  - **CPU**: 100–500m;
  - **RAM**: 128Mi–4Gi;
- NFD Garbage-Collector:
  - **CPU**: 10–500m;
  - **RAM**: 128Mi–1Gi;
- NFD-Worker (на каждом узле GPU):
  - **CPU**: 205–2000m;
  - **RAM**: 192Mi–2Gi.

Если аддон устанавливается на насколько worker-узлов, то NFD-Worker будет установлен на каждый из этих узлов и потребует указанное количество RAM на каждый узел. Остальные компоненты устанавливаются только на один узел.

</tabpanel>
</tabs>

### Ingress Controller (NGINX)

<warn>

При установке аддона для него будет создан [стандартный балансировщик нагрузки](/ru/networks/balancing/concepts/load-balancer#tipy_balansirovshchikov_nagruzki).

Использование балансировщика [тарифицируется](/ru/networks/vnet/tariffication).

</warn>

<tabs>
<tablist>
<tab>Описание</tab>
<tab>Системные требования</tab>
</tablist>
<tabpanel>

[Ingress-контроллер](https://kubernetes.io/docs/concepts/services-networking/ingress/) на базе [NGINX](https://docs.nginx.com/nginx-ingress-controller/intro/overview/) работает в качестве обратного прокси (reverse proxy) и позволяет организовать единую точку входа для сервисов в кластере, которые работают по HTTP или HTTPS.

При наличии контроллера достаточно создать [ресурс Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/), чтобы такие сервисы стали доступны извне кластера Kubernetes.

Ingress-контроллер тесно интегрируется с платформой VK Cloud. Подробнее в разделе [Сеть в кластере](../../network).

</tabpanel>
<tabpanel>

- **CPU**: 210m–610m.
- **RAM**: 238Mi–660Mi.
- **Стандартный балансировщик нагрузки**: одна штука.
- **Floating IP-адрес**: одна штука (при установке с [настройками по умолчанию](../../../service-management/addons/advanced-installation/install-advanced-ingress#ustanovka_addona)).

</tabpanel>
</tabs>

### {heading(Istio)[id=istio]}

<tabs>
<tablist>
<tab>Описание</tab>
<tab>Системные требования</tab>
</tablist>
<tabpanel>

[Istio](https://istio.io/latest/) — это фреймворк, реализующий концепцию сервисной сетки ([service mesh](https://istio.io/latest/about/service-mesh/#what-is-a-service-mesh)), при которой для взаимодействия между сервисами приложения выделяется отдельный слой. Использование Istio обеспечивает для сервисов управление трафиком без изменения кода самих сервисов (используются sidecar-контейнеры). Преимущества Istio:

- Расширяются возможности для безопасной передачи трафика:

  - можно настраивать политики для трафика;
  - можно использовать TLS для коммуникации между сервисами;

- Расширяются возможности мониторинга трафика.
- Возможна сложная маршрутизация и балансировка трафика между сервисами.

</tabpanel>
<tabpanel>

- **CPU**: 500m.
- **RAM**: 2Gi.

</tabpanel>
</tabs>

### Jaeger

<tabs>
<tablist>
<tab>Описание</tab>
<tab>Системные требования</tab>
</tablist>
<tabpanel>

В распределенных системах, основанных на микросервисах, постоянно идет обмен запросами (requests). Платформа [Jaeger](https://www.jaegertracing.io) создана для распределенной трассировки запросов. Jaeger отслеживает путь потока запросов через микросервисы и позволяет:

- собирать информацию о взаимосвязях компонентов системы с точки зрения потока запросов;
- обнаруживать проблемы с запросами или узкие места в архитектуре системы, связанные с обработкой потока запросов.

Такой инструмент необходим, потому что факторы, связанные с запросами, могут значительно влиять на поведение и производительность этих систем в целом. Недостаточно обеспечить наблюдение только за отдельными микросервисами.

Jaeger выполняет трассировку запросов на основе данных, которые получает от микросервисов. Поэтому в микросервисы [необходимо интегрировать](https://www.jaegertracing.io/docs/latest/architecture/#tracing-sdks) инструментальный стек [OpenTelemetry](https://opentelemetry.io) для отправки данных о запросах. Познакомиться с интеграцией OpenTelemetry в микросервисное приложение можно на примере [Hot R.O.D](https://github.com/jaegertracing/jaeger/tree/main/examples/hotrod).

</tabpanel>
<tabpanel>

Требования аддона:

- Количество worker-узлов должно быть не менее выбранного количества реплик Elasticsearch.

  Elasticsearch используется в качестве бэкенда для хранилища. Каждая реплика Elasticsearch будет размещена на отдельном worker-узле для обеспечения отказоустойчивости.

  Подробнее про выбор количества реплик читайте в [разделе про установку Jaeger](../../../service-management/addons/advanced-installation/install-advanced-jaeger).

- Worker-узлы должны использовать конфигурацию вычислительных ресурсов:

  - `STD2-4-4` или лучше (для тестового окружения);
  - `STD2-6-6` или лучше (для production-окружения).

Требования отдельных компонентов аддона:

- [Elasticsearch](https://www.jaegertracing.io/docs/latest/deployment/#elasticsearch):

  - **CPU**: 100m–1000m.
  - **RAM**: 512M.

- [Agent](https://www.jaegertracing.io/docs/latest/architecture/#agent):

  - **CPU**: 250m–500m.
  - **RAM**: 128M–512M.

- [Collector](https://www.jaegertracing.io/docs/latest/architecture/#collector):

  - **CPU**: 500m–1000m.
  - **RAM**: 512M–1024M.

- [Query](https://www.jaegertracing.io/docs/latest/architecture/#query):

  - **CPU**: 250m–500m.
  - **RAM**: 128M–512M.

<info>

Для обеспечения стабильной работы Jaeger рекомендуется установить его на выделенную группу worker-узлов, которая удовлетворяет перечисленным выше требованиям.

</info>

</tabpanel>
</tabs>

### Kiali

<tabs>
<tablist>
<tab>Описание</tab>
<tab>Системные требования</tab>
</tablist>
<tabpanel>

[Kiali](https://kiali.io/) — веб-интерфейс для работы с [Istio](#istio). Он позволяет управлять сервисной сеткой (service mesh), отслеживать ее состояние и визуализировать ее.

</tabpanel>
<tabpanel>

- **CPU**: 10m—500m.
- **RAM**: 64Mi—1Gi.

</tabpanel>
</tabs>

### Kube Prometheus Stack

<tabs>
<tablist>
<tab>Описание</tab>
<tab>Системные требования</tab>
</tablist>
<tabpanel>

Система мониторинга состояния кластера и развернутых в нем сервисов реализована на базе [Prometheus](https://prometheus.io/) и инструмента визуализации [Grafana](https://grafana.com/).

Подробнее в разделе [Мониторинг кластера](../../../monitoring#ispolzovanie_grafana).

</tabpanel>
<tabpanel>

- **CPU**: 850m–2500m.
- **RAM**: 968Mi–3804Mi.
- **HDD**: 2GB.
- **SSD**: 10GB.

</tabpanel>
</tabs>
