# {heading(Jaeger)[id=k8s-install-advanced-jaeger]}

В составе {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-jaeger)[text=аддона]} есть [коллектор Jaeger](https://www.jaegertracing.io/docs/latest/architecture/#collector), для работы которого необходимо хранилище. В качестве бэкенда для хранилища ([storage backend](https://www.jaegertracing.io/docs/latest/deployment/#span-storage-backends)) в аддоне Jaeger от {var(cloud)} используется Elasticsearch, который разворачивается в виде нескольких реплик.

## {heading(Подготовительные шаги)[id=k8s-install-advanced-jaeger-prep]}

1. Ознакомьтесь с {linkto(/ru/kubernetes/k8s/concepts/addons-and-settings/addons#k8s-addons-available)[text=системными требованиями]} аддона, чтобы убедиться, что у вас достаточно ресурсов для его установки.

   Системные требования аддона Jaeger зависят от выбранного количества реплик Elasticsearch и окружения кластера. Минимальное количество реплик — две, по умолчанию — три. Их количество можно изменить во время стандартной установки или установки на выделенные worker-узлы.

1. (Опционально) {linkto(/ru/kubernetes/k8s/instructions/scale#k8s-instructions-scale-vertical-worker-nodes)[text=Выполните ручное масштабирование]} групп worker-узлов или {linkto(/ru/kubernetes/k8s/instructions/scale#k8s-instructions-scale-horizontal-autoscaling-worker-nodes)[text=настройте автоматическое масштабирование]}.

## {heading(Установка аддона)[id=k8s-install-advanced-jaeger-install]}

Для аддона доступно {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-install-features)[text=несколько вариантов установки]}.

{tabs}

{tab(Стандартная установка)}

1. Установите аддон:

   {tabs}

   {tab(Личный кабинет)}
      
   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить аддон** на карточке аддона `jaeger`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон.

   1. Отредактируйте {linkto(#k8s-install-advanced-jaeger-edit-code)[text=код настройки аддона]}, если:

      - нужно нестандартное количество реплик Elasticsearch;
      - master-узлы и worker-узлы находятся в разных зонах доступности.

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

   {/tab}

   {/tabs}

{include(/ru/_includes/_jaeger_install_optional.md)}

{/tab}

{tab(Установка на выделенные worker-узлы)}

1. Подготовьте выделенную группу worker-узлов для установки аддона, если это еще не сделано:

   {tabs}

   {tab(Личный кабинет)}
 
   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Найдите в списке нужный кластер.

   1. Убедитесь, что в кластере есть выделенная группа worker-узлов, на которых будут размещаться аддоны.

      Если такой группы нет — {linkto(../../../manage-node-group#k8s-manage-node-group-add-group)[text=добавьте ее]}.

   1. {linkto(../../../manage-node-group#k8s-manage-node-group-labels-taints)[text=Задайте]} для этой группы узлов, если это еще не сделано:

      - **Метку (label)**: ключ `addonNodes`, значение `dedicated`.
      - **Ограничение (taint)**: эффект `NoSchedule`, ключ `addonNodes`, значение `dedicated`.

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
   1. Нажмите кнопку **Установить аддон** на карточке аддона `jaeger`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон.

   1. Отредактируйте {linkto(#k8s-install-advanced-jaeger-edit-code)[text=код настройки аддона]}, если:

      - нужно нестандартное количество реплик Elasticsearch;
      - master-узлы и worker-узлы находятся в разных зонах доступности.

   1. Задайте нужные исключения (tolerations) и селекторы узлов (nodeSelector) в коде настройки аддона:

      {tabs}

      {tab(Исключения)}

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

      {/tab}

      {tab(Селекторы узлов)}

      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Задайте этот селектор для полей:

      - `elasticsearch.nodeSelector`;
      - `agent.nodeSelector`;
      - `collector.nodeSelector`;
      - `query.nodeSelector`.

      {/tab}

      {/tabs}

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

   {/tab}

   {/tabs}

{include(/ru/_includes/_jaeger_install_optional.md)}

{/tab}

{tab(Быстрая установка)}

{note:info}
Чтобы установить аддон таким способом, необходимо, чтобы master-узлы и worker-узлы находились в одной зоне доступности.

При быстрой установке код настройки аддона не редактируется. В качестве бэкенда для хранилища будут использоваться три реплики Elasticsearch.

Если это вам не подходит, выполните **стандартную установку** или **установку на выделенные worker-узлы**.
{/note}

1. Установите аддон:

   {tabs}

   {tab(Личный кабинет)}
 
   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
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

{include(/ru/_includes/_jaeger_install_optional.md)}

{/tab}

{/tabs}

## {heading(Редактирование кода настройки аддона при установке)[id=k8s-install-advanced-jaeger-edit-code]}

Редактирование кода аддона применимо для стандартной установки и установки на выделенные worker-узлы.

Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/jaegertracing/helm-charts/blob/main/charts/jaeger/values.yaml).

{note:err}
Не удаляйте поля `podAnnotations.timestamp` или заданные в них значения. Эти поля требуются для корректной установки и работы аддона.
{/note}

### Изменение количества реплик Elasticsearch

Чтобы задать нужное количество реплик, измените значение поля в коде настройки аддона:

```yaml
elasticsearch:
  replicas: <КОЛИЧЕСТВО_РЕПЛИК>
```

{note:warn}
Убедитесь, что количество worker-узлов в кластере не меньше выбранного количества реплик.
{/note}

### {heading(Изменение настроек хранилища Elasticsearch)[id=k8s-install-advanced-jaeger-edit-elasticsearch]}

Реплики Elasticsearch размещаются на worker-узлах кластера и используют {linkto(../../../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=постоянные тома]} в качестве хранилища. По умолчанию эти постоянные тома размещаются в той же {linkto(../../../../../../start/concepts/architecture#architecture-az)[text=зоне доступности]}, в которой находятся worker-узлы кластера. Если worker-узлы кластера и постоянные тома будут находиться в разных зонах доступности, то реплики на этих узлах не смогут работать с томами.

Чтобы обеспечить работу постоянных томов с репликами Elasticsearch, задайте {linkto(../../../../concepts/storage#k8s-storage-storage-classes)[text=класс хранения]}, зона доступности которого совпадает с зоной доступности worker-узлов:

```yaml
elasticsearch:
  volumeClaimTemplate:
    accessModes:
    - ReadWriteOnce
    storageClassName: "<КЛАСС_ХРАНЕНИЯ>"
```

После редактирования кода {linkto(#k8s-install-advanced-jaeger-install)[text=продолжите установку аддона]}.
