[Аддоны](../../../concepts/addons-and-settings/addons) для кластеров Kubernetes VK Cloud можно установить и при [создании кластера с помощью Terraform](../../create-cluster/create-terraform), и в уже существующий кластер. Установленные аддоны можно просматривать и удалять.

## Просмотр аддонов

### Доступные для установки аддоны

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>Terraform</tab>
</tablist>
<tabpanel>

1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
1. Нажмите на имя нужного кластера.
1. Перейдите на вкладку **Аддоны**.

   Если в кластере еще нет установленных аддонов, карточки доступных аддонов будут показаны на этой вкладке в блоке **Доступные аддоны**.
   Если в кластере уже есть установленные аддоны, нажмите на кнопку **Добавить аддон** и посмотрите карточки доступных аддонов.

1. Нажмите на значок ![Информация](./assets/info_icon.svg "inline") на карточке аддона, чтобы посмотреть подробную информацию о нем.

</tabpanel>
<tabpanel>

1. [Установите Terraform и настройте провайдер](/ru/manage/tools-for-using-services/terraform/quick-start), если этого еще не сделано.
1. Создайте конфигурационный файл Terraform, указав ID кластера в блоке [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).
1. Примените конфигурацию для источника данных `vkcs_kubernetes_addons` с помощью команды:

   ```bash
   terraform apply -target="data.vkcs_kubernetes_addons.<имя ресурса кластера в файле конфигурации Terraform>"
   ```

1. Выполните команду:

   ```bash
   terraform state show data.vkcs_kubernetes_addons.<имя ресурса кластера в файле конфигурации Terraform>
   ```

1. Посмотрите доступную информацию в выводе команды.

</tabpanel>
</tabs>

### Установленные аддоны

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>Terraform</tab>
</tablist>
<tabpanel>

1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
1. Нажмите на имя нужного кластера.
1. Перейдите на вкладку **Аддоны**.

   Установленные аддоны будут перечислены в таблице. Также в таблице приведены:

   - Информация о статусе аддона: `Устанавливается`, `Установлено`, `Ошибка`, `Удаляется`.
   - Дополнительная информация об аддоне.

</tabpanel>
<tabpanel>

1. [Установите Terraform и настройте провайдер](/ru/manage/tools-for-using-services/terraform/quick-start), если этого еще не сделано.
1. Создайте конфигурационный файл Terraform, указав ID кластера в блоке [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md).
1. Примените конфигурацию для источника данных `vkcs_kubernetes_addon` с помощью команды:

   ```bash
   terraform apply -target="data.vkcs_kubernetes_addon.<имя ресурса кластера в файле конфигурации Terraform>"
   ```

1. Выполните команду:

   ```bash
   terraform state show data.vkcs_kubernetes_addon.<имя ресурса кластера в файле конфигурации Terraform>
   ```

1. Посмотрите доступную информацию в выводе команды.

</tabpanel>
</tabs>

## Установка аддона

<warn>

При установке аддонов Docker Registry и Ingress NGINX для них будут созданы [стандартные балансировщики нагрузки](/ru/networks/vnet/concepts/load-balancer#tipy-balansirovshchikov-nagruzki).

Использование балансировщиков [тарифицируется](/ru/networks/vnet/tariffs).

</warn>

Процедура установки аддонов рассматривается в [соответствующем разделе](../advanced-installation).

## Удаление аддона

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>Terraform</tab>
</tablist>
<tabpanel>

Это групповая операция: при необходимости можно удалить сразу несколько аддонов, выбрав их с помощью флажков.

Чтобы удалить аддон:

1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
1. Нажмите на имя нужного кластера.
1. Перейдите на вкладку **Аддоны**.
1. Выполните одно из действий для нужного аддона:

   - Выберите с помощью флажка аддон, затем нажмите кнопку **Удалить**.
   - Раскройте меню нужного аддона и выберите пункт **Удалить аддон**.

1. Подтвердите удаление.

</tabpanel>
<tabpanel>

1. [Установите Terraform и настройте провайдер](/ru/manage/tools-for-using-services/terraform/quick-start), если этого еще не сделано.
1. В файле конфигурации Terraform удалите или закомментируйте блок с удаляемыми аддонами.
1. Ознакомьтесь с планируемыми изменениями:

   ```bash
   terraform plan
   ```

1. Примените изменения:

   ```bash
   terraform apply
   ```

</tabpanel>
</tabs>
