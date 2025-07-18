## Внутрикластерный DNS-сервер

Сервер [CoreDNS](https://coredns.io/) внутри кластера используется в качестве замены `kube-dns`. Этот сервер обеспечивает [обнаружение сервисов](https://coredns.io/plugins/kubernetes/) в кластере и дает возможность обращения к ним по DNS-именам.

Также CoreDNS [экспортирует метрики](https://coredns.io/plugins/metrics/) в Prometheus, что позволяет отслеживать его работу через инструменты мониторинга кластера.

## Работа с Container Network Interface (CNI)

Кластеры Kubernetes используют [Calico](https://projectcalico.docs.tigera.io/about/about-calico) для организации внутрикластерной сети. Calico взаимодействует с платформой VK Cloud с помощью OpenStack Neutron API. Сама платформа использует программно-определяемую сеть (software-defined network) [Neutron](https://wiki.openstack.org/wiki/Neutron).

При использовании OpenStack Neutron в больших облачных сетях (порядка десятка тысяч сетевых портов на сеть) есть проблемы со скоростью сходимости при выходе из строя хотя бы нескольких участников сети. Синхронизация изменений топологии сети такого размера занимает много времени, что негативно влияет на ее производительность.

Поэтому в VK Cloud была разработана собственная программно-определяемая сеть Sprut. Она полностью совместима с Neutron API, но работает по другим принципам, что позволяет использовать ее совместно с Calico в облачных сетях большого размера, не испытывая при этом описанных проблем. Подробнее о Sprut читайте в статье [Как устроены облачные сети и чем они отличаются от On-premise](https://habr.com/ru/company/vk/blog/656797/) и в [видео на YouTube](https://www.youtube.com/watch?v=iqSXRZ8b_bk).

{note:info}

Sprut находится на этапе beta-тестирования. Для получения доступа к новому сервису SDN обратитесь в [службу технической поддержки](/ru/contacts).

{/note}

## Интеграция с балансировщиками нагрузки

Кластер Kubernetes интегрируется с балансировщиками нагрузки платформы VK Cloud. Это касается и обычных балансировщиков нагрузки Kubernetes (`LoadBalancer`), и Ingress-контроллеров (`IngressController`): и к одним, и другим при создании будет привязан выделенный TCP-балансировщик VK Cloud. Это касается в том числе и Ingress-контроллера, который устанавливается в виде [аддона](../addons-and-settings/addons).

При необходимости можно использовать HTTP-балансировщик нагрузки. Подробнее об этом рассказано в [примере для Ingress-контроллера](../../how-to-guides/ingress/ingress-http).

Балансировщик нагрузки платформы VK Cloud построен на базе [OpenStack Octavia](https://docs.openstack.org/octavia/latest/), который в своей основе имеет [HAProxy](http://www.haproxy.org/) и поддерживает:

- проксирование и балансировку HTTP- и TCP-соединений (последние — в том числе с поддержкой proxy-протокола);
- проксирование и балансировку HTTP/2-соединений в дополнение к HTTP/1.1;
- терминирование SSL-соединений на балансировщике.

Для отказоустойчивости поддерживаются два экземпляра балансировщика, один из которых находится в режиме active, а другой — в режиме standby. Синхронизация состояний и переключение трафика между этими балансировщиками происходят с помощью протокола [VRRP](https://www.rfc-editor.org/rfc/rfc5798). Кластер воспринимает такую отказоустойчивую конфигурацию как один балансировщик.

## Ingress-контроллер и определение реального IP-адреса пользователя

Иногда при использовании Ingress-контроллера поду в кластере необходимо видеть реальный IP-адрес пользователя, который прислал исходный запрос на балансировщик, а не IP-адрес самого балансировщика. Это может быть важно для некоторых видов сетевых приложений.

Чтобы под, который работает через Ingress-контроллер, мог видеть реальный IP-адрес пользователя, используйте один из вариантов:

- [Ingress-контроллер с поддержкой proxy-протокола](../../how-to-guides/ingress/ingress-tcp).

  Если планируется работать с HTTPS-трафиком, настройте терминирование SSL-соединений на этом Ingress-контроллере, т.к. TCP-балансировщик, который будет создан для контроллера, не может сам терминировать SSL-соединения.

  [Ingress-контроллер на базе NGINX](../addons-and-settings/addons), предоставляемый VK Cloud, поддерживает proxy-протокол и уже настроен на работу с ним.

- [Отдельный HTTP\HTTPS-балансировщик с дополнительными настройками](../../how-to-guides/ingress/ingress-http):

  - Если планируется работать с HTTPS-трафиком, настройте терминирование SSL-соединений на этом балансировщике.
  - Активируйте на Ingress-контроллере политику `ExternalTrafficPolicy: Local`.

  В этом случае на Ingress-контроллер будет поступать только HTTP-трафик, в котором будут видны все заголовки, в том числе IP-адрес отправителя (если он есть).

## Сетевые объекты по умолчанию

При создании кластера Kubernetes для него создается несколько сетевых объектов.

### Балансировщик нагрузки для Kubernetes API

Для каждого кластера создается выделенный TCP-балансировщик нагрузки, который обрабатывает входящие запросы к API Kubernetes для всех master-узлов. Через этот балансировщик происходит подключение к кластеру и управление им.

### Правила файервола

Для каждого кластера создаются три группы правил:

- `<имя кластера>-base`: обеспечивают возможность коммуникации между master-узлами и группами worker-узлов.
- `<имя кластера>-master`: обеспечивают возможность коммуникации с master-узлам.
- `<имя кластера>-minion`: обеспечивают возможность коммуникации между группами worker-узлов.

{note:warn}

Изменение этих групп правил может привести к неработоспособности кластера.

{/note}

## Смотрите также

- [Обзор сервиса Cloud Containers](../about).
- [Архитектура сервиса Cloud Containers](../architecture).
- [Хранилище в кластере](../storage).
