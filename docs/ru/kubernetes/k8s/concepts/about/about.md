# {heading(О сервисе)[id=k8s-about]}

## {heading(Для каких задач подходит сервис)[id=k8s-about-purpose]}

Сервис Cloud Containers позволяет создавать кластеры Kubernetes и запускать в них различные сервисы и приложения. Доступны все привычные инструменты для Kubernetes, например:

- Хранение и обработка serverless-функций в контейнерах: OpenFaaS, OpenWhisk, Kubeless.
- Service Mesh: Istio, Consul, Linkerd.
- Мониторинг, аналитика, логирование: Prometheus, Fluentd, Jaeger, OpenTracing.
- CI/CD: GitLab, CircleCI, Travis CI.
- IaC (инфраструктура как код): Terraform, Helm.
- Большие данные и Data Science: Spark.

  Для аналитиков больших данных могут быть полезны следующие возможности:

  - Автомасштабирование кластеров, которое позволяет выдерживать большие вычислительные нагрузки.
  - Создание событийных (event-triggered) обработчиков данных.
  - Интеграция кластеров Kubernetes и данных с другими [сервисами платформы {var(cloud)} для машинного обучения](../../../../ml).

{note:info}
Дистрибутив Kubernetes от {var(cloud)} получил сертификат [Certified Kubernetes — Hosted](https://www.cncf.io/certification/software-conformance/#logos) от CNCF ([Cloud Native Computing Foundation](https://www.cncf.io/)). Это означает, что дистрибутив проверили на надежность и соответствие стандартам, он отвечает всем функциональным требованиям сообщества и совместим со стандартным [Kubernetes API](https://kubernetes.io/ru/docs/concepts/overview/kubernetes-api/). {var(cloud)} — единственный в России облачный провайдер, получивший такую сертификацию.
{/note}

## {heading(Возможности сервиса)[id=k8s-about-features]}

- Управление {linkto(../../instructions/manage-cluster#k8s-manage-cluster)[text=кластером]} и {linkto(../../instructions/manage-node-group#k8s-manage-node-group)[text=группами узлов]} с помощью личного кабинета {var(cloud)} и собственного Terraform-провайдера {var(cloud)}.

- Управление объектами и ресурсами Kubernetes после {linkto(../../connect#k8s-connect)[text=подключения к кластеру]} с помощью `kubectl` или Kubernetes Dashboard.

- Автоматическое и ручное {linkto(../../instructions/scale#k8s-instructions-scale)[text=масштабирование кластера]} (cluster autoscaling).

  При включенном автоматическом масштабировании приложения моментально получают дополнительные вычислительные мощности в момент пиковой нагрузки. При падении нагрузки количество ресурсов, доступное приложению, сокращается.
  
  Такой подход позволяет сэкономить до 60% вычислительных ресурсов.

- Создание распределенных инсталляций в рамках одного {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региона]} {var(cloud)} через создание {linkto(../architecture#k8s-architecture-topology)[text=регионального кластера]}: для обеспечения отказоустойчивости разные узлы одного и того же кластера могут располагаться в разных зонах доступности (разных центрах обработки данных). Также рекомендуется размещать реплики приложения на этих узлах так, чтобы реплики тоже были в разных зонах доступности.

- Интеграция с {linkto(../storage#k8s-storage)[text=системой хранения данных]} и {linkto(../network#k8s-network)[text=сетевой подсистемой]} платформы {var(cloud)}.

- Плавное обновление (rolling update) кластеров в один клик без простоя. Это применимо как для минорных, так и для мажорных версий Kubernetes.

- Обеспечение безопасности на всех этапах работы с кластером:

  - При сетевом взаимодействии в кластере все соединения шифруются, используются сертификаты.
  - Можно применять {linkto(../network#k8s-network-cni)[text=сетевые политики]} Calico и Cilium. Подробнее о сетевых политиках в [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/services-networking/network-policies/).
  - Можно применять {linkto(../architecture#k8s-architecture-opa-gatekeeper)[text=ограничительные политики]} Gatekeeper. Подробнее в [официальной документации Gatekeeper](https://open-policy-agent.github.io/gatekeeper/website/docs/howto).
  - Доступна интеграция [ролевой модели безопасности Kubernetes](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) с ролями платформы {var(cloud)}. Подробнее читайте в разделе {linkto(../access-management#k8s-access-management)[text=Управление доступом]}.

- {linkto(../../how-to-guides/velero/velero-backup#k8s-velero-backup)[text=Резервное копирование]} кластеров Cloud Containers с помощью Velero.

- Миграция других кластеров Kubernetes в Cloud Containers с помощью Velero.

- Набор {linkto(../addons-and-settings/addons#k8s-addons)[text=подготовленных аддонов]}, которые можно выбрать при {linkto(../../instructions/create-cluster/create-terraform#k8s-create-terraform)[text=создании кластера с помощью Terraform]} или {linkto(../../instructions/addons/manage-addons#k8s-manage-addons)[text=установить]} в уже существующий кластер, сэкономив время на их развертывании вручную.
- Набор {linkto(../addons-and-settings/settings#k8s-settings)[text=подготовленных настроек]}, которые помогут повысить стабильность и безопасность работы кластера.

- Мониторинг состояния кластера с помощью Prometheus. Посмотреть данные мониторинга можно {linkto(../../monitoring#k8s-monitoring)[text=несколькими способами]}.

- {linkto(../../monitoring#k8s-monitoring-forecast-consumption)[text=Прогнозирование потребления]} ресурсов кластера на основе данных мониторинга. Аддон мониторинга `kube-prometheus-stack` с доработками от VK Tech предоставляет дополнительные возможности, преднастроенные в {linkto(../../monitoring#k8s-monitoring-connect-grafana)[text=Grafana]}:
  
  - дашборды с отображением текущих прогнозов потребления ресурсов на узлах кластера;
  - алерты для отправки оповещений, если через заданное время прогнозируется исчерпание определенных ресурсов.

## {heading(Что дальше)[id=k8s-about-next-steps]}

- {linkto(../architecture#k8s-architecture)[text=Познакомьтесь с архитектурой сервиса]}.
- {linkto(../network#k8s-network)[text=Познакомьтесь с устройством сети в кластере]}.
- {linkto(../storage#k8s-storage)[text=Познакомьтесь с устройством хранилища в кластере]}.