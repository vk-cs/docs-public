# {heading(Velero)[id=k8s-install-advanced-velero]}

{note:info}
Этот аддон доступен только для кластеров {linkto(../../../../concepts/cluster-generations#k8s-cluster-generations)[text=второго поколения]}. В кластерах первого поколения вы можете {linkto(../../../../install-tools/velero#k8s-velero)[text=установить]} Velero самостоятельно.
{/note}

## {heading(Подготовительные шаги)[id=k8s-install-advanced-velero-prep]}

{include(/ru/_includes/_addon-prep.md)}

1. Подготовьте хранилище в сервисе {linkto(../../../../../../storage/s3/concepts/about#s3-concepts-about)[text={var(s3)}]}, где будут храниться резервные копии, которые создает Velero. Для этого:
   1. {linkto(../../../../../../storage/s3/instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=Создайте бакет]} с классом хранения `Hotbox`.
   1. {linkto(../../../../../../storage/s3/instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=Создайте аккаунт]} в {var(s3)} и сохраните на своем устройстве идентификатор ключа (**Access Key ID**) и секретный ключ (**Secret Key**). 
   
   Используйте эти данные при установке аддона.

## {heading(Установка аддона)[id=k8s-install-advanced-velero-install]}

Для аддона {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-velero)[text=Velero]} доступно {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-install-features)[text=несколько вариантов установки]}.

{tabs}

{tab(Стандартная установка)}

1. Установите аддон:

   {tabs}

   {tab(Личный кабинет)}

    1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет {var(cloud)}.
    1. Выберите проект, где находится нужный кластер.
    1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
    1. Нажмите на имя нужного кластера.
    1. Перейдите на вкладку **Аддоны**.
    1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
    1. Нажмите кнопку **Установить** на карточке аддона `velero`.
    1. Выберите нужную версию аддона из выпадающего списка.
    1. Нажмите кнопку **Установить аддон**.

   {include(../../../../../../_includes/_k8s_velero_configure.md)[tags=configure]}

    1. Нажмите кнопку **Установить аддон**.

       Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   {/tab}

   {/tabs}

{include(../../../../../../_includes/_k8s_velero_configure.md)[tags=optional]}

{/tab}

{tab(Установка на выделенные worker-узлы)}

1. Подготовьте выделенную группу worker-узлов для установки аддона, если это еще не сделано:

   {tabs}

   {tab(Личный кабинет)}

    1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет {var(cloud)}.
    1. Выберите проект, где находится нужный кластер.
    1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
    1. Найдите в списке нужный кластер.

    1. Убедитесь, что в кластере есть выделенная группа worker-узлов, на которых будут размещаться аддоны.

       Если такой группы нет, {linkto(../../../manage-node-group#k8s-manage-node-group-add-group)[text=добавьте ее]}.

    1. {linkto(../../../manage-node-group#k8s-manage-node-group-labels-taints)[text=Задайте]} для этой группы узлов, если это еще не сделано:

        - Метку (label): ключ `addonNodes`, значение `dedicated`.
        - Ограничение (taint): эффект `NoSchedule`, ключ `addonNodes`, значение `dedicated`.

   {/tab}

   {/tabs}

1. Установите аддон:

   {tabs}

   {tab(Личный кабинет)}

    1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет {var(cloud)}.
    1. Выберите проект, где находится нужный кластер.
    1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
    1. Нажмите на имя нужного кластера.
    1. Перейдите на вкладку **Аддоны**.
    1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
    1. Нажмите кнопку **Установить** на карточке аддона `velero`.
    1. Выберите нужную версию аддона из выпадающего списка.
    1. Нажмите кнопку **Установить аддон**.

    {include(../../../../../../_includes/_k8s_velero_configure.md)[tags=configure]}

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

       Задайте это исключение для поля `tolerations`.

       {/tab}

       {tab(Селекторы узлов)}

       ```yaml
       nodeSelector:
         addonNodes: dedicated
       ```

       Задайте этот селектор для поля `nodeSelector`.

       {/tab}

       {/tabs}

    1. Нажмите кнопку **Установить аддон**.

       Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   {/tab}

   {/tabs}

{include(../../../../../../_includes/_k8s_velero_configure.md)[tags=optional]}

{/tab}

{/tabs}

## {heading(Редактирование кода настройки аддона при установке)[id=k8s-install-advanced-velero-edit-code]}

Редактирование кода аддона применимо для стандартной установки и установки на выделенные worker-узлы.

Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/vmware-tanzu/helm-charts/blob/velero-12.1.0/charts/velero/values.yaml).

После редактирования кода продолжите установку аддона.