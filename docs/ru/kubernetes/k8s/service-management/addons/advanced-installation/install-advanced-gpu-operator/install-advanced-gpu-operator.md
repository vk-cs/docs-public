## Установка аддона

Аддон [GPU Operator](../../../../concepts/addons-and-settings/addons#gpu_operator) работает на worker-узлах с GPU, поэтому для него доступна только [установка на выделенные узлы](../../../../concepts/addons-and-settings/addons#osobennosti_ustanovki_addonov). Чтобы иметь возможность добавлять в кластер worker-узлы с GPU, [подключите](https://cloud.vk.com/cloud-gpu/) сервис Cloud GPU.

Примите во внимание суммарные [максимальные системные требования](../../../../concepts/addons-and-settings/addons) аддонов, которые будут размещены на группах worker-узлов. При необходимости [выполните ручное масштабирование](../../../scale#scale_worker_nodes) групп worker-узлов или [настройте автоматическое масштабирование](../../../scale#autoscale_worker_nodes) перед установкой.

1. Подготовьте выделенную группу worker-узлов для установки аддона, если это еще не сделано:

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   </tablist>
   <tabpanel>

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Найдите в списке нужный кластер.

   1. Убедитесь, что в кластере есть выделенная группа worker-узлов с GPU, на которых будут размещаться аддоны.

      Если такой группы нет — [добавьте ее](../../../manage-node-group#dobavit_gruppu_worker_uzlov).

   1. (Опционально) Если на узлах с GPU должны выполняться только те процессы, которые требуют ресурсов GPU, [задайте](../../../manage-node-group#labels_taints) ограничение (taint) для этой группы узлов:

      - эффект `NoSchedule`;
      - ключ `nvidia.com`;
      - значение `gpu`.

   </tabpanel>
   </tabs>

1. Установите аддон:

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
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
         - [код настройки аддона](#redaktirovanie_koda_nastroyki_addona_pri_ustanovke).

            <warn>

            Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.

            </warn>

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   </tabpanel>
   <tabpanel>

   1. [Установите Terraform и настройте окружение](/ru/tools-for-using-services/terraform/quick-start), если это еще не сделано.
   1. Добавьте в ваши конфигурационные файлы Terraform, которые описывают кластер:

      - ресурс [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

      При необходимости адаптируйте приведенные по ссылкам примеры использования ресурсов и источников под свою задачу и конфигурацию Terraform.

   1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

      ```bash
      terraform validate && terraform plan
      ```

   1. Примените изменения:

      ```bash
      terraform apply
      ```

   </tabpanel>
   </tabs>

1. (Опционально) [Познакомьтесь с официальной документацией NVIDIA по работе с аддоном](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html).

## Редактирование кода настройки аддона при установке

Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/NVIDIA/k8s-device-plugin?tab=readme-ov-file#nvidia-device-plugin-for-kubernetes).

<err>

Не удаляйте поле `"mcs.mail.ru/gpu-exists"` и его значение `true`.

Поле отвечает за установку плагина nfd-worker только на узлы с GPU. Если поле и значение удалить, nfd-worker и сопутствующие ему плагины будут установлены на все узлы кластера, что приведет к повышенному потреблению ресурсов.

</err>

После редактирования кода [продолжите установку аддона](#ustanovka_addona).
