У балансировщика нагрузки нельзя изменить сеть, поэтому необходимо создать новый балансировщик в SDN Sprut и выполнить его настройку. Чтобы перенести балансировщик нагрузки в SDN Sprut:

1. [Создайте новый балансировщик](/ru/networks/balancing/service-management/manage-lb#dobavlenie_balansirovshchika_nagruzki) и укажите параметры:

    - **Название балансировщика**: имя балансировщика, например, если исходный балансировщик в SDN Neutron назывался `my-load-balancer`, то вы можете использовать имя `my-load-balancer-sprut`.
    - **Сеть**: имя целевой SDN Sprut.
    - Остальные параметры оставьте по умолчанию.

1. [Создайте](/ru/networks/balancing/service-management/manage-lb#upravlenie_pravilami_balansirovki) правила балансировки и скопируйте их параметры с исходного балансировщика в SDN Neutron.
1. [Удалите](/ru/networks/balancing/service-management/manage-lb#udalenie_balansirovshchika_nagruzki) исходный балансировщик нагрузки, если он вам больше не нужен.

Также вы можете выполнить перенос балансировщиков следующими способами:

* [Пересоздайте](/ru/tools-for-using-services/terraform/how-to-guides/vnet/lb#sozdanie_balansirovshchika_nagruzki) балансировщик с помощью Terraform, указав SDN Sprut в описании манифеста, и подключите виртуальные машины уже после их миграции.
* Запустите [скрипт от VK Cloud](https://github.com/vk-cs/neutron-2-sprut/blob/guide_v3/copy-lb-to-sprut-net.sh) для переноса балансировщиков на любой машине с доступом по сети к нужному проекту, в котором у вас есть роль администратора.
