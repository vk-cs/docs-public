{includetag(addons)}

Для кластеров Kubernetes, которые вы создаете в сервисе Managed Containers, доступны различные аддоны (дополнительные сервисы). Их можно выбрать в любой комбинации и установить либо при создании кластера с помощью Terraform, либо {linkto(../../../instructions/addons/manage-addons#mk8s-manage-addons-install)[text=позднее]} в уже существующий кластер. Процесс установки автоматизирован и требует минимального вмешательства.

{/includetag}

{includetag(install-features)}

<!--Особенности установки аддонов -->

- Аддоны устанавливаются на worker-узлы кластера и потребляют их вычислительные ресурсы.

  Ниже приведены системные требования аддонов, исходящие из стандартных значений [requests и limits](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits) для ресурсов Kubernetes в коде настройки аддона. При использовании нестандартных значений системные требования аддонов изменятся.

  {note:info}
  Некоторые аддоны могут устанавливаться на все узлы кластера (включая master-узлы). Подробнее в разделе {linkto(../../../instructions/addons/advanced-installation#mk8s-advanced-installation)[text=%text]}.
  {/note}

- Аддоны могут быть установлены на выделенную группу worker-узлов или на выбранные планировщиком Kubernetes worker-узлы. Использование первого подхода позволяет исключить влияние аддонов на работу production-сервисов, развернутых в кластере.

  Вычислительных ресурсов выделенной группы worker-узлов должно быть достаточно для всех аддонов, даже если каждый аддон потребляет максимум ресурсов, указанных в системных требованиях. Рекомендуется настроить автоматическое масштабирование для такой группы узлов.

- Установка аддонов возможна в трех вариантах:

    - **Стандартная установка** на выбранные планировщиком Kubernetes worker-узлы с изменением кода настройки аддона.
    - **Установка на выделенные worker-узлы** с изменением кода настройки аддона.
    - **Быстрая установка** на выбранные планировщиком Kubernetes worker-узлы без изменения кода настройки аддона (с настройками по умолчанию).

  Не все аддоны поддерживают все три варианта установки.

  Процесс установки описан в разделе {linkto(../../../instructions/addons/advanced-installation#mk8s-advanced-installation)[text=%text]}.

{/includetag}

{includetag(available)}

<!--Доступные аддоны -->

Доступность конкретных аддонов зависит от {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региона]}, в котором планируется разместить кластер.

{/includetag}

{includetag(argo-cd)}

<!--Argo CD -->

{tabs}

{tab(Описание)}

[Argo CD](https://argoproj.github.io/cd/) — это инструмент непрерывной доставки (continuous delivery, CD) для Kubernetes, который использует подход GitOps. Он автоматически развертывает и обновляет приложения в кластере, отслеживая их конфигурацию в Git-репозитории. Преимущества Argo CD:

- Ускоряются и упрощаются процессы GitOps: сокращается время на запуск, масштабирование и доставку изменений, а также снижается сложность их внедрения.
- Повышается надежность и управляемость кластеров: минимизируются ручные действия и ошибки при изменении конфигурации. Argo CD автоматически замечает такие расхождения и возвращает кластер к состоянию, описанному в его Git-репозитории.
- Действия в кластере становятся более прозрачными, и повышается его безопасность за счет контроля над всеми изменениями с возможностью отслеживания и аудита через Git.

Для корректной работы Argo CD требуется стабильный доступ к Git-репозиториям, в которых содержится конфигурация кластеров. Также аддон должен иметь права на создание приложений в кластере, настроенные в Kubernetes через [модель разграничения доступа](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) (Role Based Access Control, RBAC), иначе возможны ошибки синхронизации состояния кластера.

{/tab}

{tab(Системные требования)}

- **CPU**: 512m;
- **RAM**: 1024Mi;
- **Стандартный балансировщик нагрузки**: одна штука (при настройке внешнего доступа к кластеру, например через [Ingress Controller](#mk8s-addons-ingress-controller-nginx)).

{/tab}

{/tabs}

{/includetag}

{includetag(capsule)}

<!--Capsule -->

{tabs}

{tab(Описание)}

Кластеры Kubernetes позволяют организовать логическое разделение ресурсов на уровне отдельных пространств имен (namespaces). Однако этого может быть недостаточно, чтобы организовать разделение и изоляцию ресурсов в сложных сценариях. Например, нужно предоставить разным командам разработчиков разные наборы ресурсов. Для этого можно создать отдельные кластеры для каждой команды, но если таких кластеров много, ими сложно управлять.

[Capsule](https://capsule.clastix.io/docs) позволяет изолировать наборы ресурсов в рамках одного кластера с помощью тенантов (tenants). Тенант представляет собой пространства имен в сочетании с ограничениями на создание и потребление ресурсов Kubernetes, назначенные определенной группе пользователей. Движок политик Capsule (policy engine) не только следит за соблюдением политик по использованию ресурсов в рамках тенанта, но и обеспечивает изоляцию одного тенанта от другого. Так можно организовать работу нескольких команд в одном мультитенантном кластере (multi-tenant cluster) без необходимости администрировать дополнительные кластеры.

{/tab}

{tab(Системные требования)}

- **CPU**: 200m;
- **RAM**: 128Mi.

{/tab}

{/tabs}

{/includetag}

{includetag(cert-manager)}

<!--cert-manager -->

{tabs}

{tab(Описание)}

С помощью инструмента [cert-manager](https://cert-manager.io/) можно управлять сертификатами в кластерах Kubernetes:

- Выпускать сертификаты, в том числе самоподписанные (self-signed). Для этого `cert-manager` отправляет запросы к источникам, выступающим в роли центра сертификации (certificate authority, CA).

  Примеры источников:

    - провайдеры решений по кибербезопасности, такие как [Venafi](https://www.venafi.com/);
    - провайдеры сертификатов, такие как [Let’s Encrypt](https://letsencrypt.org/);
    - хранилища секретов, такие как [HashiCorp Vault](https://www.vaultproject.io/);
    - локальные контейнеры, содержащие внутри себя публичную часть сертификата и приватный ключ.

- Автоматически перевыпускать сертификаты с истекающим сроком действия.

Выпущенный с помощью `cert-manager` сертификат будет доступен другим ресурсам Kubernetes. Например, его можно использовать для Ingress.

{/tab}

{tab(Системные требования)}

Требования отдельных компонентов аддона:

- cert-manager:

    - **CPU**: 10m;
    - **RAM**: 32Mi.

- [cert-manager-cainjector](https://cert-manager.io/docs/concepts/ca-injector/):

    - **CPU**: 10m;
    - **RAM**: 32Mi.

- [cert-manager-webhook](https://cert-manager.io/docs/concepts/webhook/):
    - **CPU**: 10m;
    - **RAM**: 32Mi.

{/tab}

{/tabs}

{/includetag}

{includetag(s3)}

<!--Container Storage Interface (CSI) для S3 -->

{tabs}

{tab(Описание)}

[Container Storage Interface для S3 (S3-CSI)](https://github.com/yandex-cloud/k8s-csi-s3) — драйвер [Container Storage Interface](https://kubernetes-csi.github.io/docs/) для Kubernetes, который позволяет монтировать S3-совместимые объектные хранилища ({linkto(../../../../../storage/s3/concepts/about#s3-concepts-about)[text={var(s3)}]}, AWS S3, MinIO и другие) как {linkto(../../../reference/pvs-and-pvcs#mk8s-pvs-and-pvcs)[text=постоянные тома]} (Persistent Volumes, PV).

S3-CSI основан на высокопроизводительной файловой системе [GeeseFS](https://github.com/yandex-cloud/geesefs), которая работает на базе FUSE. Аддон имеет почти полную [POSIX-совместимость](https://github.com/yandex-cloud/geesefs#posix-compatibility-matrix) и поддерживает следующие действия с объектами:

- чтение и запись;
- блокировка;
- переименование и удаление.

S3-CSI работает на уровне {linkto(../../../../../storage/s3/concepts/about#s3-concepts-about-bucket)[text=бакетов]} объектного хранилища и может функционировать в двух режимах:

- Динамическое создание бакетов (dynamic provisioning). При создании PVC (Persistent Volume Claim) с указанным {linkto(../../storage#mk8s-storage-storage-classes)[text=классом хранения]} (Storage Class) аддон автоматически создает новый бакет в целевом S3-совместимом хранилище. После создания PVC этот бакет сразу готов к использованию как PV.
- Использование существующих бакетов (static provisioning). Вы можете использовать заранее созданный бакет в любом S3-совместимом хранилище. Для этого аддон создает PV с указанием имени существующего бакета, и затем PVC связывается с этим PV.

S3-CSI может создавать бакеты в любом S3-совместимом хранилище, которое вы укажете при {linkto(../../../instructions/addons/advanced-installation/install-advanced-s3-csi#mk8s-install-advanced-s3-csi-install)[text=установке]}.

{/tab}

{tab(Системные требования)}

- **CPU**: 50m;
- **RAM**: 200Mi.

{/tab}

{/tabs}

{/includetag}

{includetag(docker-registry)}

<!--Docker Registry -->

{note:warn}
При установке аддона для него будет создан {linkto(../../../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=стандартный балансировщик нагрузки]}.

Использование балансировщика {linkto(../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифицируется]}.
{/note}

{tabs}

{tab(Описание)}

[Реестр Docker](https://docs.docker.com/registry/) предназначен для размещения и хранения образов Docker. Работает в отказоустойчивой конфигурации (high availability, HA). Образы из реестра можно использовать при развертывании сервисов в кластере.

Подробнее в разделе {linkto(../../../connect/docker-registry#mk8s-docker-registry)[text=%text]}.

{/tab}

{tab(Системные требования)}

- **CPU**: 100m.
- **RAM**: 128Mi — 512 Mi.
- **Объем объектного хранилища S3**: зависит от размера и количества образов, которые планируется размещать в реестре.
- **Стандартный балансировщик нагрузки**: одна штука.
- **Floating IP-адрес**: одна штука.

{/tab}

{/tabs}

{/includetag}

{includetag(eso)}

<!--External Secrets Operator -->

{tabs}

{tab(Описание)}

[External Secrets Operator](https://external-secrets.io/v2.5.0/) позволяет безопасно управлять [секретами](https://kubernetes.io/docs/concepts/configuration/secret/) Kubernetes, которые хранятся вне кластера в облачных хранилищах (например, в {linkto(../../../../../security/secret-manager/concepts/about#sm-about)[text=менеджере секретов {var(cloud)}]}, AWS Secrets Manager, Azure Key Vault и так далее).

Подробнее о том, как использовать аддон с менеджером секретов {var(cloud)}, в разделе {linkto(../../../how-to-guides/external-secrets-operator#mk8s-external-secrets-operator)[text=%text]}.

{/tab}

{tab(Системные требования)}

- **CPU**: 5m — 200m;
- **RAM**: 60Mi — 512 Mi.

{/tab}

{/tabs}

{/includetag}

{includetag(fluent-bit)}

<!--Fluent Bit -->

{tabs}

{tab(Описание)}

[Fluent Bit](https://docs.fluentbit.io/manual) позволяет настраивать сбор логов в кластерах Managed Containers, чтобы затем анализировать их в сервисе {linkto(../../../../../monitoring-services/logging#logging)[text=Cloud Logging]}, например, с помощью плагинов Elasticsearch или Loki. Основное преимущество аддона — возможность более гибкой настройки под нужды пользователя.

Источниками логов выступают [службы kubelet](https://kubernetes.io/docs/concepts/overview/components/#kubelet) и {linkto(../../../reference/pods#mk8s-pods)[text=поды]} (pods), расположенные на узлах кластера.

{/tab}

{tab(Системные требования)}

У аддона нет собственных системных требований. Поды аддона используют {linkto(../settings#mk8s-settings-requests-and-limits)[text=настройки лимитов]} по умолчанию.

{/tab}

{/tabs}

{/includetag}

{includetag(fluent-bit-logaas-magnum)}

<!--Fluent Bit для Cloud Logging (logaas-integration) для первого поколения-->

{tabs}

{tab(Описание)}

Fluent Bit в комбинации со [специальными фильтрами](https://docs.fluentbit.io/manual/pipeline/filters/lua), написанными на языке Lua, позволяет организовать доставку логов из кластера Kubernetes в сервисе Managed Containers в сервис {linkto(../../../../../monitoring-services/logging#logging)[text=Cloud Logging]} для их дальнейшего анализа.

Источниками логов выступают [службы kubelet](https://kubernetes.io/docs/concepts/overview/components/#kubelet) и {linkto(../../../reference/pods#k8s-pods)[text=поды]} (pods), расположенные на узлах кластера. Подробнее о том, как работает аддон, в разделе про его {linkto(../../../instructions/addons/advanced-installation/install-advanced-logaas-integration-magnum#k8s-install-advanced-logaas-integration)[text=установку]}.

{/tab}

{tab(Системные требования)}

У аддона нет собственных системных требований. Поды аддона используют {linkto(../settings#k8s-settings-requests-and-limits)[text=настройки лимитов]} по умолчанию.

{/tab}

{/tabs}

{/includetag}

{includetag(fluent-bit-logaas-managed)}

<!--Fluent Bit для Cloud Logging (logaas-integration) для второго поколения-->

{tabs}

{tab(Описание)}

Fluent Bit в комбинации со [специальными фильтрами](https://docs.fluentbit.io/manual/pipeline/filters/lua), написанными на языке Lua, позволяет организовать доставку логов из кластера Kubernetes в сервисе Managed Containers в сервис {linkto(../../../../../monitoring-services/logging#logging)[text=Cloud Logging]} для их дальнейшего анализа.

Источниками логов выступают [службы kubelet](https://kubernetes.io/docs/concepts/overview/components/#kubelet) и {linkto(../../../reference/pods#mk8s-pods)[text=поды]} (pods), расположенные на узлах кластера. Подробнее о том, как работает аддон, в разделе про его {linkto(../../../instructions/addons/advanced-installation/install-advanced-logaas-integration-mk8s#mk8s-install-gen-2-advanced-logaas-integration)[text=установку]}.

{/tab}

{tab(Системные требования)}

У аддона нет собственных системных требований. Поды аддона используют {linkto(../settings#mk8s-settings-requests-and-limits)[text=настройки лимитов]} по умолчанию.

{/tab}

{/tabs}

{/includetag}

{includetag(gpu-operator)}

<!--GPU Operator -->

{tabs}

{tab(Описание)}

GPU Operator позволяет управлять {linkto(../../flavors#mk8s-flavors-gpu)[text=GPU на узлах кластера]} для выполнения машинного обучения или обработки больших данных.

Доступны следующие варианты использования GPU в кластере:

- Один под использует один или несколько GPU.
- Аддон распределяет один GPU между несколькими подами по стратегии {linkto(../../flavors#mk8s-flavors-gpu-sharing)[text=MIG]}.
- Аддон распределяет один GPU между несколькими подами по стратегии {linkto(../../flavors#mk8s-flavors-gpu-sharing)[text=MPS]}.

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

{/tab}

{tab(Системные требования)}

Требования отдельных компонентов аддона:

- NVIDIA GPU Operator:
    - **CPU**: 200 — 500m;
    - **RAM**: 64 — 512Mi;
- NFD-Master:
    - **CPU**: 100 — 500m;
    - **RAM**: 128Mi — 4Gi;
- NFD Garbage-Collector:
    - **CPU**: 10 — 500m;
    - **RAM**: 128Mi — 1Gi;
- NFD-Worker (на каждом узле GPU):
    - **CPU**: 205 — 2000m;
    - **RAM**: 192Mi — 2Gi.

Если аддон устанавливается на несколько worker-узлов, то NFD-Worker будет установлен на каждый из этих узлов и потребует указанное количество RAM на каждый узел. Остальные компоненты устанавливаются только на один узел.

{/tab}

{/tabs}

{/includetag}

{includetag(ingress-controller-nginx)}

<!--Ingress Controller (NGINX) -->

{note:warn}
При установке аддона для него будет создан {linkto(../../../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=стандартный балансировщик нагрузки]}.

Использование балансировщика {linkto(../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифицируется]}.
{/note}

{tabs}

{tab(Описание)}

[Ingress-контроллер](https://kubernetes.io/docs/concepts/services-networking/ingress/) на базе [NGINX](https://docs.nginx.com/nginx-ingress-controller/intro/overview/) работает в качестве обратного прокси (reverse proxy) и позволяет организовать единую точку входа для сервисов в кластере, которые работают по HTTP или HTTPS.

При наличии контроллера достаточно создать [ресурс Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/), чтобы такие сервисы стали доступны извне кластера Kubernetes.

Ingress-контроллер тесно интегрируется с платформой VK Cloud. Подробнее в разделе {linkto(../../network#mk8s-network)[text=%text]}.

{/tab}

{tab(Системные требования)}

- **CPU**: 210m — 610m.
- **RAM**: 238Mi — 660Mi.
- **Стандартный балансировщик нагрузки**: одна штука.
- **Floating IP-адрес**: одна штука (при установке с {linkto(../../../instructions/addons/advanced-installation/install-advanced-ingress#mk8s-install-advanced-ingress)[text=настройками по умолчанию]}).

{/tab}

{/tabs}

{/includetag}

{includetag(istio)}

<!--Istio -->

{tabs}

{tab(Описание)}

[Istio](https://istio.io/latest/) позволяет централизованно наблюдать за сетевым взаимодействием между сервисами и управлять им без изменения кода приложений. Istio реализует подход сервисной сетки ([service mesh](https://istio.io/latest/about/service-mesh/#what-is-a-service-mesh)): трафик между сервисами проходит через управляемый слой прокси. В аддоне поддерживается как классическая модель с [sidecar-прокси](https://istio.io/latest/docs/reference/config/networking/sidecar/) на уровне подов, так и режим [Ambient Mesh](https://istio.io/latest/docs/ambient/) без sidecar-контейнеров (прокси на уровне узлов). С помощью Istio можно:

- задавать политики безопасности и управления трафиком между сервисами;
- использовать TLS для коммуникации между сервисами;
- расширить мониторинг межсервисного трафика (сбор метрик, логирование, распределенная трассировка);
- настраивать сложную маршрутизацию и балансировку трафика между сервисами;
- настраивать повторы запросов, тайм-ауты и другие механизмы контроля отказоустойчивости;
- использовать Canary Deployment и Blue-Green Deployment для постепенного развертывания.

{/tab}

{tab(Системные требования)}

- **CPU**: 900m;
- **RAM**: 2Gi.

{/tab}

{/tabs}

{/includetag}

{includetag(jaeger)}

<!--Jaeger -->

{tabs}

{tab(Описание)}

В распределенных системах, основанных на микросервисах, постоянно идет обмен запросами (requests). Платформа [Jaeger](https://www.jaegertracing.io) создана для распределенной трассировки запросов. Jaeger отслеживает путь потока запросов через микросервисы и позволяет:

- собирать информацию о взаимосвязях компонентов системы с точки зрения потока запросов;
- обнаруживать проблемы с запросами или узкие места в архитектуре системы, связанные с обработкой потока запросов.

Такой инструмент необходим, потому что факторы, связанные с запросами, могут значительно влиять на поведение и производительность этих систем в целом. Недостаточно обеспечить наблюдение только за отдельными микросервисами.

Jaeger выполняет трассировку запросов на основе данных, которые получает от микросервисов. Поэтому в микросервисы [необходимо интегрировать](https://www.jaegertracing.io/docs/latest/architecture/#tracing-sdks) инструментальный стек [OpenTelemetry](https://opentelemetry.io) для отправки данных о запросах. Познакомиться с интеграцией OpenTelemetry в микросервисное приложение можно на примере [HotROD](https://github.com/jaegertracing/jaeger/tree/main/examples/hotrod) в разделе {linkto(../../../how-to-guides/jaeger#mk8s-jaeger)[text=%text]}.

{/tab}

{tab(Системные требования)}

Требования аддона:

- Количество worker-узлов должно быть не менее выбранного количества реплик Elasticsearch.

  Elasticsearch используется в качестве бэкенда для хранилища. Каждая реплика Elasticsearch будет размещена на отдельном worker-узле для обеспечения отказоустойчивости.

  Подробнее про выбор количества реплик читайте в {linkto(../../../instructions/addons/advanced-installation/install-advanced-jaeger#mk8s-install-advanced-jaeger)[text=разделе про установку Jaeger]}.

- Worker-узлы должны использовать конфигурацию вычислительных ресурсов:

    - `STD3-4-4` или лучше (для тестового окружения);
    - `STD3-6-6` или лучше (для production-окружения).

Требования отдельных компонентов аддона:

- [Elasticsearch](https://www.jaegertracing.io/docs/latest/deployment/#elasticsearch):

    - **CPU**: 100m — 1000m;
    - **RAM**: 512M.

- [Agent](https://www.jaegertracing.io/docs/latest/architecture/#agent):

    - **CPU**: 250m — 500m;
    - **RAM**: 128M — 512M.

- [Collector](https://www.jaegertracing.io/docs/latest/architecture/#collector):

    - **CPU**: 500m — 1000m;
    - **RAM**: 512M — 1024M.

- [Query](https://www.jaegertracing.io/docs/latest/architecture/#query):

    - **CPU**: 250m — 500m;
    - **RAM**: 128M — 512M.

{note:info}
Для обеспечения стабильной работы Jaeger рекомендуется установить его на выделенную группу worker-узлов, которая удовлетворяет перечисленным выше требованиям.
{/note}

{/tab}

{/tabs}

{/includetag}

{includetag(kgateway)}

<!--Kgateway -->

{tabs}

{tab(Описание)}

[Kgateway](https://kgateway.dev/) — инструмент для маршрутизации и управления трафиком в Kubernetes с использованием [Gateway API](https://gateway-api.sigs.k8s.io/). Его преимущества:

- Обеспечивает публикацию сервисов Kubernetes и проксирование запросов к внешним сервисам.
- Автоматически масштабируется под нагрузку.
- Сокращает время запуска приложений и сервисов.
- Позволяет централизованно задавать точки входа, TLS, маршруты и политики доступа.

Подробнее о работе с аддоном в разделе {linkto(../../../how-to-guides/kgateway#mk8s-kgateway)[text=Использование Kgateway]}.

{/tab}

{tab(Системные требования)}

- **CPU**: 5m — 50m;
- **RAM**: 40Mi — 512Mi.

Если также создается ресурс Gateway, принимающий внешний трафик:

- **Стандартный балансировщик нагрузки**: одна штука;
- **Floating IP-адрес**: одна штука.

{/tab}

{/tabs}

{/includetag}

{includetag(kiali)}

<!--Kiali -->

{tabs}

{tab(Описание)}

[Kiali](https://kiali.io/) — веб-интерфейс для работы с {linkto(#mk8s-addons-istio)[text=Istio]}. Он позволяет управлять сервисной сеткой (service mesh), отслеживать ее состояние и визуализировать ее.

{/tab}

{tab(Системные требования)}

- **CPU**: 10m — 500m;
- **RAM**: 64Mi — 1Gi.


{/tab}

{/tabs}

{/includetag}

{includetag(kube-prometheus-stack)}

<!--Kube Prometheus Stack -->

{tabs}

{tab(Описание)}

Kube Prometheus Stack — система мониторинга состояния кластера и развернутых в нем сервисов, реализованная на базе [Prometheus](https://prometheus.io/) и инструмента визуализации [Grafana](https://grafana.com/). Подробнее в разделе {linkto(../../../monitoring#mk8s-monitoring-connect-grafana)[text=%text]}.

{var(cloud)} предоставляет две {linkto(../../versions/components#mk8s-components-addons)[text=версии аддона Kube Prometheus Stack]}: базовую и с доработками от компании VK Tech (версия с суффиксом `vk` в номере). Аддон с доработками содержит дополнительные встроенные функции, в частности, {linkto(../../../monitoring#mk8s-monitoring-forecast-consumption)[text=прогнозирование потребления ресурсов кластера]}.

{/tab}

{tab(Системные требования)}

- **CPU**: 850m — 2500m.
- **RAM**: 968Mi — 3804Mi.
- **HDD**: 2GB.
- **SSD**: 10GB.

{/tab}

{/tabs}

{/includetag}

{includetag(velero)}

<!--Velero -->

{tabs}

{tab(Описание)}

[Velero](https://velero.io/docs/main/) — инструмент с открытым исходным кодом для резервного копирования и аварийного восстановления кластеров Kubernetes.

С помощью аддона Velero вы можете легко настраивать и автоматизировать резервное копирование рабочих нагрузок, пространств имен и ресурсов Kubernetes, производить миграцию кластеров, а также выполнять восстановление после сбоев, ошибок конфигурации, некорректных релизов и инцидентов с данными. Резервные копии, которые создаются при работе с аддоном, хранятся в бакетах с классом хранения `Hotbox` в сервисе {linkto(../../../../../storage/s3/concepts/about#s3-concepts-about)[text={var(s3)}]}.

Аддон Velero не поддерживает резервное копирование {linkto(../../../reference/pvs-and-pvcs#mk8s-pvs-and-pvcs)[text=постоянных томов]} (Persistent Volumes, PV).

Подробнее о работе с аддоном в разделе {linkto(../../../how-to-guides/managed-velero#mk8s-how-to-velero-managed)[text=%text]}.

{/tab}

{tab(Системные требования)}

- **CPU**: 20m — 1000m;
- **RAM**: 64Mi — 512Mi.

{/tab}

{/tabs}

{/includetag}

{includetag(vpa)}

<!--Vertical Pod Autoscaler (VPA) -->

{tabs}

{tab(Описание)}

[Vertical Pod Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler#readme) (VPA) — инструмент для автоматической настройки ресурсов (CPU и RAM) для контейнеров Kubernetes. Задачи VPA:

1. Проанализировать нагрузку и данные использования ресурсов.
1. Предоставить рекомендации и, если настроено, автоматически применить их к {linkto(../../../reference/resource-limiting#mk8s-resource-limiting)[text=запросам ресурсов]} новых и уже запущенных подов.

VPA состоит из трех компонентов:

- Recommender: анализирует текущее и прошлое потребление ресурсов и на основе этого рекомендует, как изменить запросы ресурсов пода для наибольшей эффективности. Recommender — единственный компонент, который включен по умолчанию при работе с VPA.

- Updater: получает рекомендации, обновляет объекты VPA и следит за тем, чтобы рекомендованные ресурсы были доступны для новых и уже существующих подов. В зависимости от режима работы компонент Updater отправляет запрос компоненту Admission Controller на создание или обновление существующего пода. Режимы работы компонента Updater:

    - `Off` — выключен, работает только компонент Recommender. Рекомендации создаются, но не применяются ни к новым, ни к уже существующим подам.
    - `Recreate` — работает в полном объеме. В режиме `Recreate` компонент Updater удаляет под, если запрашиваемые ресурсы этого пода не соответствуют тем, которые для него вычислил Recommender. После этого он отправляет компоненту Admission Controller запрос на повторное создание этого пода с рекомендованными значениями. Новые поды создаются сразу с рекомендованными значениями. Подробнее о работе в режиме `Recreate` в разделе {linkto(../../../how-to-guides/vertical-pod-autoscaler#k8s-vertical-pod-autoscaler)[text=%text]}.
    - `Initial` — работает только для новых подов. Компонент Admission Controller обновляет запросы ресурсов согласно рекомендациям VPA только у новых подов, но не инициирует удаление, повторное создание или обновление ресурсов уже существующих подов.

- Admission Controller: работает на этапе создания или обновления подов в зависимости от режима работы компонента Updater. Компонент Admission Controller применяет рекомендации VPA к новым подам при их создании, а также к уже запущенным подам, игнорируя значения, заданные вручную.

{/tab}

{tab(Системные требования)}

- **CPU**: 50m;
- **RAM**: 500Mi.

{/tab}

{/tabs}

{/includetag}