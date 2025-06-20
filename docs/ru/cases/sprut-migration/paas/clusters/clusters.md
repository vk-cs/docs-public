Кластеры, как и другие объекты PaaS, нельзя автоматически перенести в SDN другого типа, но можно пересоздать их в новой сети.

Перед началом миграции любых сервисов PaaS в проекте:

1. [Выполните](../../iaas) миграцию сетевой инфраструктуры, если это еще не сделано.
1. [Выполните](../balancers) миграцию балансировщиков.
1. [Обновите](../dns) A-записи публичного DNS.

Чтобы перенести кластер в SDN Sprut:

1. [Создайте](/ru/kubernetes/k8s/instructions/create-cluster) кластер, аналогичный исходному. В параметре, отвечающем за выбор подключенной к кластеру сети, выберите нужную SDN Sprut.
1. [Перенесите](/ru/kubernetes/k8s/how-to-guides/velero-backup) нагрузку (в том числе постоянные тома) при помощи средства резервного копирования Velero.
1. [Настройте](/ru/kubernetes/k8s/connect/kubectl#podklyuchenie_k_klasteru) подключение к новому кластеру.
1. (Опционально) Настройте сетевую связанность сетей Sprut и Neutron:

    Чтобы сократить время недоступности сервисов, объедините исходную SDN Neutron и новую SDN Sprut с помощью продвинутого маршрутизатора, подключенного к транзитным сетям со стандартными маршрутизаторами. Такой подход будет полезен, если вы переносите сервисы постепенно или не можете отключить кластер на время миграции.

    1. [Подключите](/ru/networks/vnet/how-to-guides/onpremise-connect/advanced-router) продвинутый маршрутизатор к транзитным сетям со стандартными маршрутизаторами в исходной SDN Neutron и новой SDN Sprut.
    1. [Настройте](/ru/networks/vnet/how-to-guides/onpremise-connect/advanced-router#6_nastroyte_staticheskie_marshruty_mezhdu_setyami) статические маршруты между сетями Neutron и Sprut.

1. Проверьте работоспособность нового кластера:

    1. [Проверьте](/ru/kubernetes/k8s/connect/kubectl#proverka_podklyucheniya_k_klasteru) подключение к кластеру.
    2. Убедитесь, что ваши приложения, размещенные в новом кластере, работают.

1. [Удалите](/ru/kubernetes/k8s/instructions/manage-cluster#delete_cluster) исходный кластер, если он вам больше не нужен.
