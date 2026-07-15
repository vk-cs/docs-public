# {heading(External Secrets Operator)[id=k8s-install-advanced-eso]}

{note:info}
Этот аддон доступен только для кластеров {linkto(/ru/kubernetes/k8s/concepts/cluster-generations#k8s-cluster-generations)[text=второго поколения]}.
{/note}

## {heading(Подготовительные шаги)[id=k8s-install-advanced-eso-prep]}

{include(/ru/_includes/_addon-prep.md)}

## {heading(Установка аддона)[id=k8s-install-advanced-eso-install]}

Для аддона {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-eso)[text=External Secrets Operator]} доступно {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-install-features)[text=несколько вариантов установки]}.

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
    1. Нажмите кнопку **Установить** на карточке аддона `external-secrets-operator`.
    1. Нажмите кнопку **Установить аддон**.
    1. При необходимости отредактируйте:

        - выбранную версию;
        - название приложения;
        - название пространства имен, куда будет установлен аддон;
        - {linkto(#k8s-install-advanced-eso-edit-code)[text=код настройки аддона]}.

          {note:warn}
          Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
          {/note}

    1. Нажмите кнопку **Установить аддон**.

       Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   {/tab}

   {/tabs}

1. (Опционально) [Познакомьтесь с официальной документацией External Secrets Operator](https://external-secrets.io/v2.5.0/guides/introduction/).
1. (Опционально) {linkto(../../../../how-to-guides/external-secrets-operator#k8s-external-secrets-operator)[text=Познакомьтесь с практическим руководством по работе с External Secrets Operator]}.

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

        - Метку (label): ключ `addonNodes`, значение `dedicated`.
        - Ограничение (taint): эффект `NoSchedule`, ключ `addonNodes`, значение `dedicated`.

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
    1. Нажмите кнопку **Установить** на карточке аддона `external-secrets-operator`.
    1. Нажмите кнопку **Установить аддон**.
    1. При необходимости отредактируйте:

        - выбранную версию;
        - название приложения;
        - название пространства имен, куда будет установлен аддон;
        - {linkto(#k8s-install-advanced-eso-edit-code)[text=код настройки аддона]}.

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

       {note:warn}
       Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
       {/note}

    1. Нажмите кнопку **Установить аддон**.

       Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   {/tab}

   {/tabs}

1. (Опционально) [Познакомьтесь с официальной документацией External Secrets Operator](https://external-secrets.io/v2.5.0/guides/introduction/).
1. (Опционально) {linkto(../../../../how-to-guides/external-secrets-operator#k8s-external-secrets-operator)[text=Познакомьтесь с практическим руководством по работе с External Secrets Operator]}.

{/tab}

{tab(Быстрая установка)}

{note:info}
При быстрой установке код настройки аддона не редактируется.

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
    1. Нажмите кнопку **Установить** на карточке аддона `external-secrets-operator`.
    1. Нажмите кнопку **Установить аддон**.
    1. При необходимости отредактируйте:

        - выбранную версию;
        - название приложения;
        - название пространства имен, куда будет установлен аддон.

    1. Нажмите кнопку **Установить аддон**.

       Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   {/tab}

   {/tabs}

1. (Опционально) [Познакомьтесь с официальной документацией External Secrets Operator](https://external-secrets.io/v2.5.0/guides/introduction/).
1. (Опционально) {linkto(../../../../how-to-guides/external-secrets-operator#k8s-external-secrets-operator)[text=Познакомьтесь с практическим руководством по работе с External Secrets Operator]}

{/tab}

{/tabs}

## {heading(Редактирование кода настройки аддона при установке)[id=k8s-install-advanced-eso-edit-code]}

Редактирование кода аддона применимо для стандартной установки и установки на выделенные worker-узлы.

Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/external-secrets/external-secrets/blob/v2.5.0/deploy/charts/external-secrets/values.yaml).

После редактирования кода продолжите установку аддона.

## {heading(Удаление аддона)[id=k8s-install-advanced-eso-delete]}

1. Удалите все созданные экземпляры ресурсов, относящиеся к Custom Resource Definitions (CRD) аддона, из всех пространств имен:

   ```console
   kubectl -n <ПРОСТРАНСТВО_ИМЕН> delete <ТИП_РЕСУРСА> <ИМЯ_ЭКЗЕМПЛЯРА>
   ```
    
   Здесь:

   - `<ПРОСТРАНСТВО_ИМЕН>` — пространство имен, в котором находится созданный экземпляр ресурса.
   - `<ТИП_РЕСУРСА>` — тип ресурса, созданный для аддона. Примеры: `ExternalSecret`, `SecretStore`, `ClusterSecretStore`.
   - `<ИМЯ_ЭКЗЕМПЛЯРА>` — имя экземпляра, который вы хотите удалить.

   Подробнее в официальной документации [External Secrets Operator](https://external-secrets.io/v2.5.0/introduction/getting-started/#uninstalling). 

1. {linkto(../../manage-addons#k8s-manage-addons-delete)[text=Удалите]} аддон External Secrets Operator. 
