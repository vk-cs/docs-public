# {heading(Управление аддонами)[id=k8s-manage-addons]}

{ifdef(public)}
{linkto(../../../concepts/addons-and-settings/addons#k8s-addons)[text=Аддоны]} для кластеров Kubernetes сервиса Cloud Containers можно установить и при {linkto(../../create-cluster/create-terraform#k8s-create-terraform)[text=создании кластера с помощью Terraform]}, и в уже существующий кластер. Установленные аддоны можно просматривать и удалять.
{/ifdef}

{ifndef(public)}
Аддоны для кластеров Kubernetes можно установить и при создании кластера, и в уже существующий кластер. Установленные аддоны можно просматривать и удалять.
{/ifndef}

## {heading(Просмотр аддонов)[id=k8s-manage-addons-view]}

### {heading(Доступные для установки аддоны)[id=k8s-manage-addons-available]}

{ifdef(public)}
{tabs}

{tab(Личный кабинет)}
{/ifdef}

{ifdef(public)}
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
{/ifdef}
{ifndef(public)}
1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
{/ifndef}
1. Выберите проект, где находится нужный кластер.
{ifdef(public)}
1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
{/ifdef}
{ifndef(public)}
1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
{/ifndef}
1. Нажмите на имя нужного кластера.
1. Перейдите на вкладку **Аддоны**.

   Если в кластере нет установленных аддонов, карточки доступных аддонов будут показаны на этой вкладке в блоке **Доступные аддоны**.
   Если в кластере есть установленные аддоны, нажмите кнопку **Добавить аддон** и посмотрите карточки доступных аддонов.

{ifdef(public)}
1. Нажмите на значок ![Информация](./assets/info_icon.svg "inline") на карточке аддона, чтобы посмотреть подробную информацию о нем.
{/ifdef}

{ifdef(public)}
{/tab}

{tab(Terraform)}

1. [Установите Terraform и настройте окружение](../../../../../tools-for-using-services/terraform/quick-start), если это еще не сделано.
1. Создайте конфигурационный файл Terraform, указав ID кластера в блоке [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).
1. Примените конфигурацию для источника данных `vkcs_kubernetes_addons` с помощью команды:

   ```console
   terraform apply -target="data.vkcs_kubernetes_addons.<имя ресурса кластера в файле конфигурации Terraform>"
   ```

1. Выполните команду:

   ```console
   terraform state show data.vkcs_kubernetes_addons.<имя ресурса кластера в файле конфигурации Terraform>
   ```

1. Посмотрите доступную информацию в выводе команды.

{/tab}

{/tabs}
{/ifdef}

### {heading(Установленные аддоны)[id=k8s-manage-addons-installed]}

{ifdef(public)}
{tabs}

{tab(Личный кабинет)}
{/ifdef}

{ifdef(public)}
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
{/ifdef}
{ifndef(public)}
1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
{/ifndef}
1. Выберите проект, где находится нужный кластер.
{ifdef(public)}
1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
{/ifdef}
{ifndef(public)}
1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
{/ifndef}
1. Нажмите на имя нужного кластера.
1. Перейдите на вкладку **Аддоны**.

   Установленные аддоны будут перечислены в таблице.
   Также в таблице приведены:

   - Информация о статусе аддона: `Устанавливается`, `Установлено`, `Ошибка`, `Удаляется`.
   - Дополнительная информация об аддоне.

{ifdef(public)}
{/tab}

{tab(Terraform)}

1. [Установите Terraform и настройте окружение](../../../../../tools-for-using-services/terraform/quick-start), если это еще не сделано.
1. Создайте конфигурационный файл Terraform, указав ID кластера в блоке [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md).
1. Примените конфигурацию для источника данных `vkcs_kubernetes_addon` с помощью команды:

   ```console
   terraform apply -target="data.vkcs_kubernetes_addon.<имя ресурса кластера в файле конфигурации Terraform>"
   ```

1. Выполните команду:

   ```console
   terraform state show data.vkcs_kubernetes_addon.<имя ресурса кластера в файле конфигурации Terraform>
   ```

1. Посмотрите доступную информацию в выводе команды.

{/tab}

{/tabs}
{/ifdef}

## {heading(Установка аддона)[id=k8s-manage-addons-install]}

{ifdef(public)}
{note:warn}
При установке аддонов Docker Registry и Ingress NGINX для них будут созданы {linkto(../../../../../networks/balancing/concepts/load-balancer#balancing-load-balancer-types)[text=стандартные балансировщики нагрузки]}.

Использование балансировщиков {linkto(../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифицируется]}.
{/note}
{/ifdef}

Процедура установки аддонов рассматривается в {linkto(../advanced-installation#k8s-advanced-installation)[text=соответствующем разделе]}.

## {heading(Редактирование кода аддона)[id=k8s-manage-addons-edit-code]}

{ifdef(public)}
{tabs}

{tab(Личный кабинет)}
{/ifdef}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
1. Нажмите на имя нужного кластера.
1. Перейдите на вкладку **Аддоны**.
1. Нажмите ![](../../../../../assets/more-icon.svg "inline") для нужного аддона и выберите пункт **Редактировать**.
1. Внесите нужные изменения в код настройки аддона.
1. Нажмите кнопку **Изменить настройки**.
1. В открывшемся окне подтвердите выполнение операции.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

Если редактирование завершилось с ошибкой:

{ifdef(public)}
{tabs}

{tab(Личный кабинет)}
{/ifdef}

1. В общем списке {linkto(#k8s-manage-addons-installed)[text=установленных аддонов]} нажмите кнопку **Повторить редактирование**.
1. Выберите один из вариантов устранения неисправности:

   - **Восстановить**: внести изменения в последние настройки аддона.
   - **Сбросить**: сбросить параметры аддона до последнего рабочего состояния.

1. В открывшемся окне внесите нужные изменения в настройки аддона.
1. Нажмите кнопку **Изменить настройки**.
1. В открывшемся окне подтвердите выполнение операции.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

{ifdef(public)}
## {heading(Обновление версии аддона)[id=k8s-manage-addons-update]}

Доступно только увеличение версии аддона. Для обновления некоторых аддонов предварительно необходимо удалить предыдущую версию.

Не все аддоны можно обновить с помощью интерфейсов {var(cloud)}. Аддон {linkto(../../../concepts/addons-and-settings/addons#k8s-addons)[text=Kube Prometheus Stack]} можно {linkto(../../../how-to-guides/update-monitoring-addon#k8s-update-monitoring-addon)[text=обновить]} только вручную.

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
1. Нажмите на имя нужного кластера.
1. Перейдите на вкладку **Аддоны**.
1. Нажмите ![](../../../../../assets/more-icon.svg "inline") для нужного аддона и выберите пункт **Обновить**.
1. В открывшемся окне ознакомьтесь с изменениями.
1. (Опционально) {linkto(../../update#k8s-update)[text=Обновите]} версию кластера для совместимости с аддоном.
1. Внесите нужные изменения в настройки аддона.
1. Нажмите кнопку **Обновить**.

{/tab}

{/tabs}

Если обновление завершилось с ошибкой:

{tabs}

{tab(Личный кабинет)}

1. В общем списке {linkto(#k8s-manage-addons-installed)[text=установленных аддонов]} нажмите кнопку **Повторить обновление**.
1. Выберите один из вариантов устранения неисправности:

   - **Восстановить**: внести изменения в последние настройки обновления аддона.
   - **Сбросить**: сбросить параметры обновления аддона до последнего рабочего состояния.

1. В открывшемся окне внесите нужные изменения в настройки аддона.
1. Нажмите кнопку **Обновить**.

{/tab}

{/tabs}
{/ifdef}

## {heading(Удаление аддона)[id=k8s-manage-addons-delete]}

{ifdef(public)}
{tabs}

{tab(Личный кабинет)}
{/ifdef}

Это групповая операция: при необходимости можно удалить сразу несколько аддонов, выбрав их с помощью флажков.

Чтобы удалить аддон:

{ifdef(public)}
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
{/ifdef}
{ifndef(public)}
1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
{/ifndef}
1. Выберите проект, где находится нужный кластер.
{ifdef(public)}
1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
{/ifdef}
{ifndef(public)}
1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
{/ifndef}
1. Нажмите на имя нужного кластера.
1. Перейдите на вкладку **Аддоны**.
1. Выполните одно из действий для нужного аддона:

   - Выберите с помощью флажка аддон, затем нажмите кнопку **Удалить**.
   - Нажмите ![](../../../../../assets/more-icon.svg "inline") для нужного аддона и выберите пункт **Удалить аддон**.

1. Подтвердите удаление.

{ifdef(public)}
{/tab}

{tab(Terraform)}

1. [Установите Terraform и настройте окружение](../../../../../tools-for-using-services/terraform/quick-start), если это еще не сделано.
1. В файле конфигурации Terraform удалите или закомментируйте блок с удаляемыми аддонами.
1. Ознакомьтесь с планируемыми изменениями:

   ```console
   terraform plan
   ```

1. Примените изменения:

   ```console
   terraform apply
   ```

{/tab}

{/tabs}
{/ifdef}