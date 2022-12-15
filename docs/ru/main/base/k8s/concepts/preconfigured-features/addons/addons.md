Для кластеров Kubernetes VK Cloud доступны различные предустановленные сервисы. Их можно выбрать в любой комбинации при создании кластера. После создания кластера выбранные сервисы уже будут развернуты и настроены в кластере, требуя минимального вмешательства пользователя.

<info>

Доступность конкретных сервисов зависит от [региона](../../../../../additionals/account/concepts/regions), в котором планируется разместить кластер.

</info>

## Мониторинг

Система мониторинга состояния кластера и развернутых в нем сервисов реализована на базе [Prometheus](https://prometheus.io/) и инструмента визуализации [Grafana](https://grafana.com/).

Подробнее в разделе [Мониторинг кластера](../../../monitoring#ispolzovanie-grafana).

## Docker Registry

<info>

Этот сервис находится в статусе **beta**.

</info>

[Реестр Docker](https://docs.docker.com/registry/) предназначен для размещения и хранения образов Docker. Работает в отказоустойчивой конфигурации (high availability, HA). Образы из реестра можно использовать при развертывании сервисов в кластере.

Подробнее в разделе [Подключение к реестру Docker](../../../connect/docker-registry/).

## Ingress Controller (NGINX)

[Ingress-контроллер](https://kubernetes.io/docs/concepts/services-networking/ingress/) на базе [NGINX](https://docs.nginx.com/nginx-ingress-controller/intro/overview/) работает в качестве обратного прокси (reverse proxy) и позволяет организовать единую точку входа для сервисов в кластере, которые работают по HTTP или HTTPS.

При наличии контроллера достаточно создать [ресурс Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/), чтобы такие сервисы стали доступны извне кластера Kubernetes.

Предустановленный Ingress-контроллер тесно интегрируется с платформой VK Cloud. Подробнее в разделе [Сеть в кластере](../../network/).
