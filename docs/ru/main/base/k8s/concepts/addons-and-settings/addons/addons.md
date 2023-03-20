Для кластеров Kubernetes VK Cloud доступны различные аддоны (дополнительные сервисы). Их можно выбрать в любой комбинации и установить либо при [создании кластера с помощью Terraform](../../../operations/create-cluster/create-terraform), либо [позднее](../../../operations/addons/manage-addons#ustanovka-addona) в уже существующий кластер. Процесс установки автоматизирован и требует минимального вмешательства пользователя.

<info>

Доступность конкретных аддонов зависит от [региона](../../../../../base/account/concepts/regions), в котором планируется разместить кластер.

</info>

## Kube Prometheus Stack

Система мониторинга состояния кластера и развернутых в нем сервисов реализована на базе [Prometheus](https://prometheus.io/) и инструмента визуализации [Grafana](https://grafana.com/).

Подробнее в разделе [Мониторинг кластера](../../../monitoring#ispolzovanie-grafana).

## Docker Registry

<warn>

При установке аддона для него будет создан [стандартный балансировщик нагрузки](/ru/main/networks/vnet/concepts/load-balancer#tipy-balansirovshchikov-nagruzki).

Использование балансировщика [тарифицируется](/ru/main/networks/vnet/tariffs).

</warn>

[Реестр Docker](https://docs.docker.com/registry/) предназначен для размещения и хранения образов Docker. Работает в отказоустойчивой конфигурации (high availability, HA). Образы из реестра можно использовать при развертывании сервисов в кластере.

Подробнее в разделе [Подключение к реестру Docker](../../../connect/docker-registry/).

## Ingress Controller (NGINX)

<warn>

При установке аддона для него будет создан [стандартный балансировщик нагрузки](/ru/main/networks/vnet/concepts/load-balancer#tipy-balansirovshchikov-nagruzki).

Использование балансировщика [тарифицируется](/ru/main/networks/vnet/tariffs).

</warn>

[Ingress-контроллер](https://kubernetes.io/docs/concepts/services-networking/ingress/) на базе [NGINX](https://docs.nginx.com/nginx-ingress-controller/intro/overview/) работает в качестве обратного прокси (reverse proxy) и позволяет организовать единую точку входа для сервисов в кластере, которые работают по HTTP или HTTPS.

При наличии контроллера достаточно создать [ресурс Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/), чтобы такие сервисы стали доступны извне кластера Kubernetes.

Ingress-контроллер тесно интегрируется с платформой VK Cloud. Подробнее в разделе [Сеть в кластере](../../network/).
