## Для каких задач подходит сервис

Сервис Cloud Containers позволяет создавать кластеры Kubernetes и запускать в них различные сервисы и приложения. Доступны все привычные инструменты для Kubernetes, например:

- Хранение и обработка serverless-функций в контейнерах: OpenFaaS, OpenWhisk, Kubeless.
- Service Mesh: Istio, Consul, Linkerd.
- Мониторинг, аналитика, логирование: Prometheus, Fluentd, Jaeger, OpenTracing.
- CI/CD: Gitlab, CircleCI, Travis CI.
- IaC (инфраструктура как код): Terraform, Helm.
- Большие данные и Data Science: Spark.

  Для аналитиков больших данных могут быть полезны следующие возможности:

  - Автомасштабирование кластеров, которое позволяет выдерживать большие вычислительные нагрузки.
  - Создание событийных (event-triggered) обработчиков данных.
  - Интеграция кластеров Kubernetes и данных с другими [сервисами платформы VK Cloud для машинного обучения](https://mcs.mail.ru/docs#mlops-i-ai).

<info>

Дистрибутив Kubernetes от VK Cloud получил сертификат [Certified Kubernetes — Hosted](https://www.cncf.io/certification/software-conformance/#logos) от CNCF ([Cloud Native Computing Foundation](https://www.cncf.io/)). Это означает, что дистрибутив проверили на надежность и соответствие стандартам, он отвечает всем функциональным требованиям сообщества и совместим со стандартным [Kubernetes API](https://kubernetes.io/ru/docs/concepts/overview/kubernetes-api/). VK Cloud — единственный в России облачный провайдер, получивший такую сертификацию.

</info>

## Возможности сервиса

- Управление [кластером](../../operations/manage-cluster) и [группами узлов](../../operations/manage-node-group) с помощью личного кабинета VK Cloud и собственного Terraform-провайдера VK Cloud.

- Управление объектами и ресурсами Kubernetes после [подключения к кластеру](../../connect/) с помощью `kubectl` или Kubernetes Dashboard.

- Автоматическое и ручное [масштабирование кластера](../../operations/scale) (cluster autoscaling).

  При включенном автоматическом масштабировании приложения моментально получают дополнительные вычислительные мощности в момент пиковой нагрузки. При падении нагрузки количество ресурсов, доступное приложению, сокращается.
  
  Такой подход позволяет сэкономить до 60% вычислительных ресурсов.

- Создание распределенных инсталляций в рамках одного [региона](../../../../base/account/concepts/regions) VK Cloud: для обеспечения отказоустойчивости разные узлы одного и того же кластера могут располагаться в разных зонах доступности (разных центрах обработки данных).Также рекомендуется размещать реплики приложения на этих узлах так, чтобы реплики тоже были в разных зонах доступности.

- Интеграция с [системой хранения данных](../storage) и [сетевой подсистемой](../network) платформы VK Cloud.

- Плавное обновление (rolling update) кластеров в один клик без простоя. Это применимо как для минорных, так и для мажорных версий Kubernetes.

  <info>

  Обновления кластеров доступны, начиная с версии кластера `1.17` и выше.

  </info>

- Обеспечение безопасности на всех этапах работы с кластером:

  - При сетевом взаимодействии в кластере все соединения шифруются, используются сертификаты.
  - Можно применять [сетевые политики](../network#rabota_s_container_network_interface_cni) ([network policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)) Calico.
  - Можно применять [ограничительные политики](../architecture#vstroennaya_podderzhka_open_policy_agent) ([constraint policies](https://open-policy-agent.github.io/gatekeeper/website/docs/howto)) Gatekeeper.
  - Доступна интеграция [ролевой модели безопасности Kubernetes](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) с ролями платформы VK Cloud. Подробнее читайте в разделе [Управление доступом](../../concepts/access-management).

- [Резервное копирование](../../use-cases/velero-backup) кластеров Cloud Containers с помощью Velero.

- Миграция других кластеров Kubernetes в Cloud Containers с помощью Velero.

- Набор [подготовленных аддонов](../addons-and-settings/addons/), которые можно выбрать при [создании кластера с помощью Terraform](../../operations/create-cluster) или [установить](../../operations/addons/manage-addons) в уже существующий кластер, сэкономив время на их развертывании вручную.
- Набор [подготовленных настроек](../addons-and-settings/settings/), которые помогут повысить стабильность и безопасность работы кластера.

- Мониторинг состояния кластера с помощью Prometheus. Посмотреть данные мониторинга можно [несколькими способами](../../monitoring).

## Что дальше

- [Познакомьтесь с архитектурой сервиса](../architecture).
- [Познакомьтесь с устройством сети в кластере](../network).
- [Познакомьтесь с устройством хранилища в кластере](../storage).
