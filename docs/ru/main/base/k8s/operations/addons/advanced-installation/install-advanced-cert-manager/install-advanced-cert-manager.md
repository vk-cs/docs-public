## Установка аддона

Для аддона доступно [несколько вариантов установки](../../../../concepts/addons-and-settings/addons#osobennosti_ustanovki_addonov).

Примите во внимание суммарные [максимальные системные требования](../../../../concepts/addons-and-settings/addons) аддонов, которые будут размещены на группах worker-узлов. При необходимости [выполните ручное масштабирование](../../../scale#vypolnit_ruchnoe_masshtabirovanie) групп worker-узлов или [настройте автоматическое масштабирование](../../../scale#nastroit_avtomaticheskoe_masshtabirovanie_tolko_dlya_grupp_worker_uzlov) перед установкой.

<tabs>
<tablist>
<tab>Стандартная установка</tab>
<tab>Установка на выделенные worker-узлы</tab>
<tab>Быстрая установка</tab>
</tablist>
<tabpanel>

1. Установите аддон:

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите на кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить** на карточке аддона `cert-manager`.
   1. Выберите нужную версию аддона из выпадающего списка.
   1. Нажмите кнопку **Установить аддон**.
   1. При необходимости отредактируйте:

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

   [Документация Terraform-провайдера VK Cloud](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/index.md) содержит пример использования ресурса [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md), который описывает единичный аддон. Также задокументированы источники данных, связанные с аддонами:

   - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
   - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

   Дополнительная информация о работе с провайдером находится в разделе [Terraform](/ru/manage/tools-for-using-services/terraform).

   </tabpanel>
   </tabs>

1. [Проверьте корректность установки аддона](https://cert-manager.io/docs/installation/kubectl/#2-optional-end-to-end-verify-the-installation), выпустив тестовый самоподписанный сертификат.

</tabpanel>
<tabpanel>

1. Подготовьте выделенную группу worker-узлов для установки аддона, если это еще не сделано:

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   </tablist>
   <tabpanel>

   1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Найдите в списке нужный кластер.

   1. Убедитесь, что в кластере есть выделенная группа worker-узлов, на которых будут размещаться аддоны.

      Если такой группы нет — [добавьте ее](../../../manage-node-group#dobavit_gruppu_worker_uzlov).

   1. [Задайте](../../../manage-node-group#nastroit_metki_i_ogranicheniya) для этой группы узлов, если это еще не сделано:

      - **Метку (label)**: ключ `addonNodes`, значение `dedicated`.
      - **Ограничение (taint)**: эффект `NoSchedule`, ключ `addonNodes`, значение `dedicated`.

   </tabpanel>
   </tabs>

1. Установите аддон:

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите на кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить** на карточке аддона `cert-manager`.
   1. Выберите нужную версию аддона из выпадающего списка.
   1. Нажмите кнопку **Установить аддон**.
   1. При необходимости отредактируйте:

      - выбранную версию;
      - название приложения;
      - название пространства имен, куда будет установлен аддон;
      - [код настройки аддона](#redaktirovanie_koda_nastroyki_addona_pri_ustanovke).

   1. Задайте нужные исключения (tolerations) и селекторы узлов (nodeSelector) в коде настройки аддона:

      <tabs>
      <tablist>
      <tab>Исключения</tab>
      <tab>Селекторы узлов</tab>
      </tablist>
      <tabpanel>

      ```yaml
      tolerations:
        - key: "addonNodes"
          operator: "Equal"
          value: "dedicated"
          effect: "NoSchedule"
      ```

      Задайте это исключение для полей:

      - `tolerations`;
      - `webhook.tolerations`;
      - `cainjector.tolerations`.

      </tabpanel>
      <tabpanel>

      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Задайте этот селектор для полей:

      - `nodeSelector`;
      - `webhook.nodeSelector`;
      - `cainjector.nodeSelector`.

      </tabpanel>
      </tabs>

      <warn>

      Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.

      </warn>

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   </tabpanel>
   <tabpanel>

   [Документация Terraform-провайдера VK Cloud](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/index.md) содержит пример использования ресурса [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md), который описывает единичный аддон. Также задокументированы источники данных, связанные с аддонами:

   - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
   - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

   Дополнительная информация о работе с провайдером находится в разделе [Terraform](/ru/manage/tools-for-using-services/terraform).

   </tabpanel>
   </tabs>

1. [Проверьте корректность установки аддона](https://cert-manager.io/docs/installation/kubectl/#2-optional-end-to-end-verify-the-installation), выпустив тестовый самоподписанный сертификат.

</tabpanel>
<tabpanel>

1. Установите аддон:

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите на кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить** на карточке аддона `cert-manager`.
   1. Выберите нужную версию аддона из выпадающего списка.
   1. Нажмите кнопку **Установить аддон**.
   1. При необходимости отредактируйте:

      - выбранную версию;
      - название приложения;
      - название пространства имен, куда будет установлен аддон.

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   </tabpanel>
   <tabpanel>

   [Документация Terraform-провайдера VK Cloud](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/index.md) содержит пример использования ресурса [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md), который описывает единичный аддон. Также задокументированы источники данных, связанные с аддонами:

   - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
   - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

   Дополнительная информация о работе с провайдером находится в разделе [Terraform](/ru/manage/tools-for-using-services/terraform).

   </tabpanel>
   </tabs>

1. [Проверьте корректность установки аддона](https://cert-manager.io/docs/installation/kubectl/#2-optional-end-to-end-verify-the-installation), выпустив тестовый самоподписанный сертификат.

</tabpanel>
</tabs>

## Редактирование кода настройки аддона при установке

Редактирование кода аддона применимо для стандартной установки и установки на выделенные worker-узлы.

Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/cert-manager/cert-manager/blob/master/deploy/charts/cert-manager/values.yaml).

<err>

Не удаляйте поля `podAnnotations.timestamp` или заданные в них значения. Эти поля требуются для корректной установки и работы аддона.

</err>

После редактирования кода [продолжите установку аддона](#ustanovka_addona).
