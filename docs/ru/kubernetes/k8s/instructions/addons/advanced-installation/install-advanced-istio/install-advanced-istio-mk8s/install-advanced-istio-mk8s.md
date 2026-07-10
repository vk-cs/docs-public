# {heading(Istio в кластерах второго поколения)[id=k8s-install-advanced-istio-mk8s]}

## {heading(Подготовительные шаги)[id=k8s-install-advanced-istio-mk8s-prepare]}

{include(/ru/_includes/_addon-prep.md)}

## {heading(Установка аддона)[id=k8s-install-advanced-istio-mk8s-install]}

Для аддона {linkto(/ru/kubernetes/k8s/concepts/addons-and-settings/addons#k8s-addons-istio)[text=Istio]} доступно {linkto(../../../../../concepts/addons-and-settings/addons#k8s-addons-install-features)[text=несколько вариантов установки]}.

{tabs}

{tab(Стандартная установка)}

1. Установите аддон:

   {tabs}

   {tab(Личный кабинет)}
   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Кластеры Kubernetes → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить** на карточке аддона `istio`.
   1. Нажмите кнопку **Установить аддон**.
   1. При необходимости отредактируйте {linkto(#k8s-install-advanced-istio-mk8s-edit)[text=код настройки аддона]} (например, для изменения режима работы аддона).

       {note:warn}
       Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
       {/note}      

   1. Нажмите кнопку **Установить аддон**.

     Начнется установка аддона в кластер. Этот процесс может занять длительное время.

  {/tab}

  {/tabs}

1. (Опционально) [Познакомьтесь с официальной документацией Istio по работе с аддоном](https://istio.io/latest/docs/).

{/tab}

{tab(Установка на выделенные worker-узлы)}

1. Подготовьте выделенную группу worker-узлов для установки аддона, если это еще не сделано:

   {tabs}

   {tab(Личный кабинет)}

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Кластеры Kubernetes → Кластеры Kubernetes**.
   1. Найдите в списке нужный кластер.

   1. Убедитесь, что в кластере есть выделенная группа worker-узлов, на которых будут размещаться аддоны.

      Если такой группы нет — {linkto(../../../../manage-node-group#k8s-manage-node-group-add-group)[text=добавьте ее]}.

   1. {linkto(../../../../manage-node-group#k8s-manage-node-group-labels-taints)[text=Задайте]} для этой группы узлов, если это еще не сделано:

      - Метку (label): ключ `addonNodes`, значение `dedicated`.
      - Ограничение (taint): эффект `NoSchedule`, ключ `addonNodes`, значение `dedicated`.

   {/tab}

   {/tabs}

1. Установите аддон:

   {tabs}

   {tab(Личный кабинет)}

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Кластеры Kubernetes → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить** на карточке аддона `istio`.
   1. Нажмите кнопку **Установить аддон**.
   1. При необходимости отредактируйте {linkto(#k8s-install-advanced-istio-mk8s-edit)[text=код настройки аддона]} (например, для изменения режима работы аддона).

      {note:warn}
      Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
      {/note}

   1. Задайте нужные исключения (tolerations) и селекторы узлов (nodeSelector) в коде настройки аддона для нужных компонентов:

      {tabs}

      {tab(Исключения)}
      Пример блока `tolerations` для компонента `pilot`:
      ```yaml
      pilot:
        enabled: true
        k8s:
          replicaCount: 2
          imagePullPolicy: "IfNotPresent"
          tolerations:
            - key: "addonNodes"
              operator: "Equal"
              value: "dedicated"
              effect: "NoSchedule"
          nodeSelector: {}
          resources:
            requests:
              cpu: 250m
              memory: 512Mi
      ```

      {/tab}

      {tab(Селекторы узлов)}
      Пример блока `nodeSelector` для компонента `pilot`: 
       
      ```yaml
      pilot:
        enabled: true
        k8s:
          replicaCount: 2
          imagePullPolicy: "IfNotPresent"
          tolerations:
          # - key: "Key"
          #   operator: "Exists"
          #   value: "Value"
          #   effect: "NoSchedule"
          nodeSelector:
            addonNodes: dedicated
          resources:
            requests:
              cpu: 250m
              memory: 512Mi
      ```

      {/tab}

      {/tabs}

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   {/tab}

   {/tabs}

1. (Опционально) [Познакомьтесь с официальной документацией Istio по работе с аддоном](https://istio.io/latest/docs/).

{/tab}

{tab(Быстрая установка)}

{note:info}
При быстрой установке код настройки аддона не редактируется.
{/note}

1. Установите аддон:

   {tabs}

   {tab(Личный кабинет)}

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Кластеры Kubernetes → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить** на карточке аддона `istio`.
   1. Нажмите кнопку **Установить аддон**.
   1. Оставьте параметры без изменений и нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   {/tab}

   {/tabs}

1. (Опционально) [Познакомьтесь с официальной документацией Istio по работе с аддоном](https://istio.io/latest/docs/).

{/tab}

{/tabs}

## {heading(Редактирование кода настройки аддона при установке)[id=k8s-install-advanced-istio-mk8s-edit]}

Полный код настройки аддона вместе с описанием полей доступен в [официальной документации Istio](https://istio.io/latest/docs/reference/config/istio.operator.v1alpha1/).

Для аддона доступно два режима работы, определяющих методы перехвата и маршрутизации трафика между подами в сервисной сетке ([service mesh](https://istio.io/latest/about/service-mesh/#what-is-a-service-mesh)):

   - `default`: режим работы, использующий классическую sidecar-архитектуру. Istio внедряет в каждый под дополнительный контейнер `istio-proxy`, который перехватывает, шифрует и маршрутизирует трафик приложения. Перехват на уровне подов выполняется с помощью `iptables`.
   - `ambient` (по умолчанию): режим работы на уровне узлов кластера, без sidecar-контейнеров. Перехват трафика на уровне ядра выполняется с помощью eBPF. Захваченные пакеты передаются компоненту `ztunnel`, который работает на каждом узле кластера, обеспечивая шифрование и L4-маршрутизацию. Для настройки политик уровня L7 можно дополнительно настроить [waypoint-прокси](https://istio.io/latest/docs/ambient/usage/waypoint/).

Шифрование на основе взаимного TLS (mTLS) применяется в обоих режимах.

В зависимости от режима в сервисную сетку устанавливается набор компонентов, необходимых для работы аддона. Эти компоненты указаны в блоке `spec.components` со значением `enabled: true`. Для работы в режиме `ambient` требуются компоненты `base`, `pilot`, `cni` и `ztunnel` — они уже включены и отключать их нельзя. Остальные компоненты опциональны. Подробнее о компонентах в [официальной документации Istio](https://istio.io/latest/docs/setup/additional-setup/config-profiles/#deployment-profiles).

Чтобы использовать режим `default` вместо `ambient`:

1. Укажите `default` в поле `spec.profile`:

   ```yaml
   ...
   kind: IstioOperator
   spec:
     profile: default
   ...
   ```

1. В блоке `spec.components` укажите:

   - Для компонентов `base` и `pilot`: `enabled: true`.
   - Для компонента `ztunnel`: `enabled: false`.
   - Остальные компоненты опциональны. 

   Пример отредактированного блока `spec.components`:

   ```yaml
   components:
   base:
    enabled: true
    k8s:
      imagePullPolicy: "IfNotPresent"
      tolerations: []
      # - key: "Key"
      #   operator: "Exists"
      #   effect: "NoSchedule"

   pilot:
    enabled: true
    k8s:
      replicaCount: 2
      imagePullPolicy: "IfNotPresent"
      tolerations: []
      # - key: "Key"
      #   operator: "Exists"
      #   value: "Value"
      #   effect: "NoSchedule"
      nodeSelector: {}
      resources:
        requests:
          cpu: 250m
          memory: 512Mi
   
   ztunnel:
    enabled: false
    k8s:
      imagePullPolicy: "IfNotPresent"
      tolerations: []
        # - key: "Key"
        #   operator: "Exists"
        #   value: "Value"
        #   effect: "NoSchedule"
      nodeSelector: {}
      resources:
        requests:
          cpu: 250m
          memory: 512Mi

   ```

После редактирования кода продолжите установку аддона.
