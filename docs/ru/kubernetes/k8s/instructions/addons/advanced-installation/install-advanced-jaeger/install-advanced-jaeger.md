В составе [аддона](../../../../concepts/addons-and-settings/addons#jaeger_6f817a95) есть [коллектор Jaeger](https://www.jaegertracing.io/docs/latest/architecture/#collector), для работы которого необходимо хранилище. В качестве бэкенда для хранилища ([storage backend](https://www.jaegertracing.io/docs/latest/deployment/#span-storage-backends)) в аддоне Jaeger от VK Cloud используется Elasticsearch, который разворачивается в виде нескольких реплик.

## Установка аддона

Для аддона доступно [несколько вариантов установки](../../../../concepts/addons-and-settings/addons#osobennosti_ustanovki_addonov).

Примите во внимание суммарные [максимальные системные требования](../../../../concepts/addons-and-settings/addons) аддонов, которые будут размещены на группах worker-узлов.

[Системные требования](../../../../concepts/addons-and-settings/addons#jaeger_6f817a95) аддона Jaeger зависят от выбранного количества реплик Elasticsearch и окружения кластера. Минимальное количество реплик — две, по умолчанию — три. Их количество можно изменить во время стандартной установки или установки на выделенные worker-узлы.

При необходимости [выполните ручное масштабирование](../../../scale#scale_worker_nodes) групп worker-узлов или [настройте автоматическое масштабирование](../../../scale#autoscale_worker_nodes) перед установкой.

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

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить аддон** на карточке аддона `jaeger`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон.

   1. Отредактируйте [код настройки аддона](#redaktirovanie_koda_nastroyki_addona_pri_ustanovke), если:

      - нужно нестандартное количество реплик Elasticsearch;
      - master-узлы и worker-узлы находятся в разных зонах доступности.

      {note:warn}

      Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.

      {/note}

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   </tabpanel>
   <tabpanel>

   1. [Установите Terraform и настройте окружение](/ru/tools-for-using-services/terraform/quick-start), если это еще не сделано.
   1. Добавьте в ваши конфигурационные файлы Terraform, которые описывают кластер:

      - ресурс [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

      При необходимости адаптируйте приведенные по ссылкам примеры использования ресурсов и источников под свою задачу и конфигурацию Terraform. Например, вы можете отредактировать код настройки аддона, изменив ресурс `vkcs_kubernetes_addon`.

      {note:warn}
      Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
      {/note}

   1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

      ```console
      terraform validate && terraform plan
      ```

   1. Примените изменения:

      ```console
      terraform apply
      ```

   </tabpanel>
   </tabs>

1. (Опционально) [Подключитесь к Query UI](../../../../connect/addons-ui).
1. (Опционально) [Познакомьтесь с практическим руководством](https://github.com/jaegertracing/jaeger/tree/main/examples/hotrod) по использованию Jaeger с микросервисным приложением Hot R.O.D. В руководстве показаны:

   - Интеграция OpenTelemetry в микросервисное приложение для того, чтобы оно отправляло в Jaeger данные, нужные для трассировки запросов.
   - Визуализация и интерпретация собранных Jaeger данные с помощью Query UI.

</tabpanel>
<tabpanel>

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

   1. Убедитесь, что в кластере есть выделенная группа worker-узлов, на которых будут размещаться аддоны.

      Если такой группы нет — [добавьте ее](../../../manage-node-group#dobavit_gruppu_worker_uzlov).

   1. [Задайте](../../../manage-node-group#labels_taints) для этой группы узлов, если это еще не сделано:

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

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить аддон** на карточке аддона `jaeger`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон.

   1. Отредактируйте [код настройки аддона](#redaktirovanie_koda_nastroyki_addona_pri_ustanovke), если:

      - нужно нестандартное количество реплик Elasticsearch;
      - master-узлы и worker-узлы находятся в разных зонах доступности.

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

      - `elasticsearch.tolerations`;
      - `agent.tolerations`;
      - `collector.tolerations`;
      - `query.tolerations`.

      </tabpanel>
      <tabpanel>

      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Задайте этот селектор для полей:

      - `elasticsearch.nodeSelector`;
      - `agent.nodeSelector`;
      - `collector.nodeSelector`;
      - `query.nodeSelector`.

      </tabpanel>
      </tabs>

      {note:warn}

      Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.

      {/note}

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   </tabpanel>
   <tabpanel>

   1. [Установите Terraform и настройте окружение](/ru/tools-for-using-services/terraform/quick-start), если это еще не сделано.
   1. Добавьте в ваши конфигурационные файлы Terraform, которые описывают кластер:

      - ресурс [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

      При необходимости адаптируйте приведенные по ссылкам примеры использования ресурсов и источников под свою задачу и конфигурацию Terraform. Например, вы можете отредактировать код настройки аддона, изменив ресурс `vkcs_kubernetes_addon`.

      {note:warn}
      Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
      {/note}

   1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

      ```console
      terraform validate && terraform plan
      ```

   1. Примените изменения:

      ```console
      terraform apply
      ```

   </tabpanel>
   </tabs>

1. (Опционально) [Подключитесь к Query UI](../../../../connect/addons-ui).
1. (Опционально) [Познакомьтесь с практическим руководством](https://github.com/jaegertracing/jaeger/tree/main/examples/hotrod) по использованию Jaeger с микросервисным приложением Hot R.O.D. В руководстве показаны:

   - Интеграция OpenTelemetry в микросервисное приложение для того, чтобы оно отправляло в Jaeger данные, нужные для трассировки запросов.
   - Визуализация и интерпретация собранных Jaeger данные с помощью Query UI.

</tabpanel>
<tabpanel>

{note:info}

Чтобы установить аддон таким способом, необходимо, чтобы master-узлы и worker-узлы находились в одной зоне доступности.

При быстрой установке код настройки аддона не редактируется. В качестве бэкенда для хранилища будут использоваться три реплики Elasticsearch.

Если это вам не подходит, выполните **стандартную установку** или **установку на выделенные worker-узлы**.

{/note}

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
   1. Нажмите кнопку **Установить аддон** на карточке аддона `jaeger`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;

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

      ```console
      terraform validate && terraform plan
      ```

   1. Примените изменения:

      ```console
      terraform apply
      ```

   </tabpanel>
   </tabs>

1. (Опционально) [Подключитесь к Query UI](../../../../connect/addons-ui).
1. (Опционально) [Познакомьтесь с практическим руководством](https://github.com/jaegertracing/jaeger/tree/main/examples/hotrod) по использованию Jaeger с микросервисным приложением Hot R.O.D. В руководстве показаны:

   - Интеграция OpenTelemetry в микросервисное приложение для того, чтобы оно отправляло в Jaeger данные, нужные для трассировки запросов.
   - Визуализация и интерпретация собранных Jaeger данные с помощью Query UI.

</tabpanel>
</tabs>

## Редактирование кода настройки аддона при установке

Редактирование кода аддона применимо для стандартной установки и установки на выделенные worker-узлы.

Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/jaegertracing/helm-charts/blob/main/charts/jaeger/values.yaml).

{note:err}

Не удаляйте поля `podAnnotations.timestamp` или заданные в них значения. Эти поля требуются для корректной установки и работы аддона.

{/note}

### Изменение количества реплик Elasticsearch

Чтобы задать нужное количество реплик, измените значение поля в коде настройки аддона:

```yaml
elasticsearch:
  replicas: <количество реплик>
```

{note:warn}

Убедитесь, что количество worker-узлов в кластере не меньше выбранного количества реплик.

{/note}

### Изменение настроек хранилища Elasticsearch

Реплики Elasticsearch размещаются на worker-узлах кластера и используют [постоянные тома](../../../../reference/pvs-and-pvcs) в качестве хранилища. По умолчанию эти постоянные тома размещаются в той же [зоне доступности](/ru/intro/start/concepts/architecture#az), в которой находятся master-узлы кластера. Если worker-узлы кластера и постоянные тома будут находиться в разных зонах доступности, то реплики на этих узлах не смогут работать с томами.

Чтобы обеспечить работу постоянных томов с репликами Elasticsearch, задайте [класс хранения](../../../../concepts/storage#prednastroennye_klassy_hraneniya), зона доступности которого совпадает с зоной доступности worker-узлов:

```yaml
elasticsearch:
  volumeClaimTemplate:
    accessModes:
    - ReadWriteOnce
    storageClassName: "<имя класса хранения>"
```

После редактирования кода [продолжите установку аддона](#ustanovka_addona).
