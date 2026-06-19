# {heading(GPU Operator)[id=k8s-install-advanced-gpu-operator]}

## {heading(Подготовительные шаги)[id=k8s-install-advanced-gpu-operator-prep]}

{include(/ru/_includes/_addon-prep.md)}

## {heading(Установка аддона)[id=k8s-install-advanced-gpu-operator-install]}

Аддон {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-gpu-operator)[text=GPU Operator]} работает на worker-узлах с GPU, поэтому для него доступна только {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-install-features)[text=установка на выделенные узлы]}. Чтобы иметь возможность добавлять в кластер worker-узлы с GPU, [подключите](https://cloud.vk.com/cloud-gpu/) сервис Cloud GPU.

1. Подготовьте выделенную группу worker-узлов для установки аддона, если это еще не сделано:

   {tabs}
   
   {tab(Личный кабинет)}
      
   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Найдите в списке нужный кластер.

   1. Убедитесь, что в кластере есть выделенная группа worker-узлов с GPU, на которых будут размещаться аддоны.

      Если такой группы нет — {linkto(../../../manage-node-group#k8s-manage-node-group-add-group)[text=добавьте ее]}.

   1. (Опционально) Если на узлах с GPU должны выполняться только те процессы, которые требуют ресурсов GPU, {linkto(../../../manage-node-group#k8s-manage-node-group-labels-taints)[text=задайте]} ограничение (taint) для этой группы узлов:

      - эффект `NoSchedule`;
      - ключ `nvidia.com`;
      - значение `gpu`.

   {/tab}

   {/tabs}

1. Установите аддон:

   {tabs}
   
   {tab(Личный кабинет)}
      
   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить** на карточке аддона `gpu-operator`.
   1. Выберите нужную версию аддона из выпадающего списка.
   1. Нажмите кнопку **Установить аддон**.
      
      При необходимости отредактируйте:

         - выбранную версию;
         - название приложения;
         - название пространства имен, куда будет установлен аддон;
         - {linkto(#k8s-install-advanced-gpu-operator-edit-code)[text=код настройки аддона]}.

            {note:warn}
            Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
            {/note}

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   {/tab}
   
   {tab(Terraform)}
   
   1. [Установите Terraform и настройте окружение](../../../../../../tools-for-using-services/terraform/quick-start), если это еще не сделано.
   1. Добавьте в ваши конфигурационные файлы Terraform, которые описывают кластер:

      - ресурс [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

      При необходимости адаптируйте приведенные по ссылкам примеры использования ресурсов и источников под свою задачу и конфигурацию Terraform.

   1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

      ```console
      terraform validate && terraform plan
      ```

   1. Примените изменения:

      ```console
      terraform apply
      ```

   {/tab}
   
   {/tabs}

1. (Опционально) [Познакомьтесь с официальной документацией NVIDIA по работе с аддоном](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html).

## {heading(Редактирование кода настройки аддона при установке)[id=k8s-install-advanced-gpu-operator-edit-code]}

Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/NVIDIA/k8s-device-plugin?tab=readme-ov-file#nvidia-device-plugin-for-kubernetes).

{note:err}
Не удаляйте поле `"mcs.mail.ru/gpu-exists"` и его значение `true`.

Поле отвечает за установку плагина nfd-worker только на узлы с GPU. Если поле и значение удалить, nfd-worker и сопутствующие ему плагины будут установлены на все узлы кластера, что приведет к повышенному потреблению ресурсов.
{/note}

После редактирования кода {linkto(#k8s-install-advanced-gpu-operator-install)[text=продолжите установку аддона]}.