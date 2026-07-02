# {heading(Ingress NGINX)[id=mk8s-install-advanced-ingress]}

## {heading(Подготовительные шаги)[id=mk8s-install-advanced-ingress-prep]}

{include(/ru/_includes/_addon-prep.md)}

## {heading(Установка аддона)[id=mk8s-install-advanced-ingress-install]}

{note:warn}
При установке аддона для него будет создан {linkto(../../../../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=стандартный балансировщик нагрузки]}. Использование балансировщика {linkto(../../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифицируется]}.
{/note}

Для аддона доступно {linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-install-features)[text=несколько вариантов установки]}.

{tabs}

{tab(Стандартная установка)}

1. Установите аддон:

   {tabs}
   
   {tab(Личный кабинет)}
      
   1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Кластеры Kubernetes → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить аддон** на карточке аддона **ingress-nginx**.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;
      - {linkto(#mk8s-install-advanced-ingress-edit-code)[text=код настройки аддона]}.

        {note:warn}
        Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
        {/note}

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   {/tab}

   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->
   
   {/tabs}

1. {linkto(#mk8s-install-advanced-ingress-get-ip)[text=Получите IP-адрес балансировщика]}.

{/tab}

{tab(Установка на выделенные worker-узлы)}

1. Подготовьте выделенную группу worker-узлов для установки аддона, если это еще не сделано:

   {tabs}
   
   {tab(Личный кабинет)}
      
   1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Кластеры Kubernetes → Кластеры Kubernetes**.
   1. Найдите в списке нужный кластер.

   1. Убедитесь, что в кластере есть выделенная группа worker-узлов, на которых будут размещаться аддоны.

      Если такой группы нет — {linkto(../../../manage-node-group#mk8s-manage-node-group-add-group)[text=добавьте ее]}.

   1. {linkto(../../../manage-node-group#mk8s-manage-node-group-labels-taints)[text=Задайте]} для этой группы узлов, если это еще не сделано:

      - **Метку (label)**: ключ `addonNodes`, значение `dedicated`.
      - **Ограничение (taint)**: эффект `NoSchedule`, ключ `addonNodes`, значение `dedicated`.

   {/tab}

   {/tabs}

1. Установите аддон:

   {tabs}
   
   {tab(Личный кабинет)}
      
   1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Кластеры Kubernetes → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить аддон** на карточке аддона `ingress-nginx`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;
      - {linkto(#mk8s-install-advanced-ingress-edit-code)[text=код настройки аддона]}.

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

      - `controller.tolerations`;
      - `defaultBackend.tolerations`.

      {/tab}
      
      {tab(Селекторы узлов)}
      
      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Задайте этот селектор для полей:

      - `controller.nodeSelector`;
      - `defaultBackend.nodeSelector`.

      {/tab}

      {/tabs}

      {note:warn}
      Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
      {/note}

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   {/tab}

   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->
   
   {/tabs}

1. {linkto(#mk8s-install-advanced-ingress-get-ip)[text=Получите IP-адрес балансировщика]}.

{/tab}

{tab(Быстрая установка)}

{note:info}
При быстрой установке код настройки аддона не редактируется. Будет создан балансировщик нагрузки с Floating IP-адресом, и Ingress-контроллер будет доступен из интернета.

Если это вам не подходит, выполните **стандартную установку** или **установку на выделенные worker-узлы**.
{/note}

1. Установите аддон:

   {tabs}
   
   {tab(Личный кабинет)}
      
   1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Кластеры Kubernetes → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить аддон** на карточке аддона `ingress-nginx`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   {/tab}

   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->
   
   {/tabs}

1. {linkto(#mk8s-install-advanced-ingress-get-ip)[text=Получите IP-адрес балансировщика]}.

{/tab}

{/tabs}

## {heading(Редактирование кода настройки аддона при установке)[id=mk8s-install-advanced-ingress-edit-code]}

{note:info}
- Редактирование кода аддона применимо для стандартной установки и установки на выделенные worker-узлы.
- Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/kubernetes/ingress-nginx/blob/main/charts/ingress-nginx/values.yaml).
{/note}

### {heading(Изменение типа балансировщика для Ingress-контроллера)[id=mk8s-install-advanced-ingress-change-balancer]}

При установке аддона с параметрами по умолчанию создается балансировщик нагрузки с Floating IP-адресом, и Ingress-контроллер будет доступен из интернета.

Чтобы Ingress-контроллер не был доступен из интернета, укажите аннотацию, согласно которой будет создан внутренний балансировщик нагрузки:

```yaml
---
service:
  annotations:
    {
      "loadbalancer.openstack.org/proxy-protocol": "true",
      "service.beta.kubernetes.io/openstack-internal-load-balancer": "true",
    }
```

После редактирования кода {linkto(#mk8s-install-advanced-ingress-install)[text=продолжите установку аддона]}.

### {heading(Запрет удаления узла Ingress-контроллера модулем Autoscaler)[id=mk8s-install-advanced-ingress-delete-prohibition]}

Модуль Autoscaler автоматически масштабирует кластер: добавляет узлы при увеличении нагрузки, удаляет — при уменьшении. Чтобы запретить модулю удалять узел, на котором работает под аддона, нужно прописать запрет на удаление в аннотации пода:

```yaml
controller:
  podAnnotations:
    cluster-autoscaler.kubernetes.io/safe-to-evict: "false"
```

После редактирования кода {linkto(#mk8s-install-advanced-ingress-install)[text=продолжите установку аддона]}.

## {heading(Получение IP-адреса балансировщика)[id=mk8s-install-advanced-ingress-get-ip]}

{note:info}
Далее используется имя сервиса `ingress-nginx` и пространство имен `ingress-nginx`. Если при добавлении аддона были выбраны другие параметры, скорректируйте команды.
{/note}

{tabs}

<!-- удалена таба Kubernetes Dashboard. раскомментировать для Headlamp: забрать шаги и k8s с заменой на Headlamp или удалить -->

{tab(kubectl)}

1. {linkto(../../../../connect/kubectl#mk8s-kubectl-check-connection)[text=Убедитесь]}, что вы можете подключиться к кластеру с помощью `kubectl`.

1. Выполните команду:

   ```console
   kubectl get svc ingress-nginx-controller -n ingress-nginx
   ```

   В столбце `EXTERNAL-IP` будет отображен Floating IP-адрес, назначенный балансировщику.

{/tab}

{/tabs}