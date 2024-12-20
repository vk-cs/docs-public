{include(/ru/_includes/_placeholder.md)}

Далее будет показано, как в конфигурацию кластера добавить настройку предварительного выделения ресурсов. В этом примере настройка будет описана в отдельном файле и применена с помощью `kubectl`. 

<info>

Если вы используете Helm, Kustomize или другие конфигурационные менеджеры, то последовательность действий и команды для применения настроек будут отличаться.

</info>

## {heading(Подготовительные шаги)[id=prepare]}

1. [Создайте](../../service-management/create-cluster) кластер, если это еще не сделано.
1. [Установите и настройте](../../connect/kubectl) `kubectl`, если это еще не сделано.
1. [Подключитесь](../../connect/kubectl#proverka_podklyucheniya_k_klasteru) к кластеру при помощи `kubectl`.
1. Подготовьте данные о CPU и RAM масштабируемого узла:
   
   1. В терминале с сессией подключения к кластеру выполните команду:

      ```bash
      kubectl get nodes -o wide
      ```
      
      В ответе вернется список узлов кластера. Сохраните имя worker-узла.

   1. Получите подробное описание worker-узла. Выполните команду:

      ```bash
      kubectl describe node <ИМЯ_WORKER-УЗЛА>
      ```
      
      В ответе вернется подробное описание узла. В параметре `Allocatable` найдите значения `cpu` и `memory`. Сохраните эти значения. В этом примере используются значения `cpu: 940m` и `memory: 1454740Ki`.

## {heading(1. Настройте добавление пустого пода в кластер)[id=set]}

1. Создайте файл `placeholder.yaml` на вашем компьютере.
1. Добавьте в него содержимое и сохраните:

   ```yaml

   apiVersion: scheduling.k8s.io/v1
   kind: PriorityClass
   metadata:
     name: overprovisioning
   value: -10
   globalDefault: false
   description: "Priority class used by overprovisioning."

   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: overprovisioning
     namespace: default
   spec:
     replicas: 1
     selector:
       matchLabels:
         run: overprovisioning
   template:
     metadata:
       labels:
         run: overprovisioning
     spec:
       priorityClassName: overprovisioning
       terminationGracePeriodSeconds: 0
       containers:
        - name: reserve-resources
          image: registry.k8s.io/pause:3.9
          resources:
            requests:
              cpu: 940m
              memory: 1454740Ki
            limits:
              cpu: 940m
              memory: 1454740Ki
   ```

   Здесь:

   - `PriorityClass`: определяет приоритет подов. `value: -10` назначает низкий приоритет добавляемому поду. Когда поды с более высоким приоритетом станут доступными, они будут размещаться на узлах, вытесняя поды с низким приоритетом.
   - `Deployment`: обеспечивает развертывание подов, которые создают резервные ресурсы.
   - `cpu`: в этом параметре для блоков `requests` и `limits` укажите одинаковые значения CPU для шаблона worker-узла, которые вы получили ранее. В этом примере `940m`.
   - `memory`: в этом параметре для блоков `requests` и `limits` укажите одинаковые значения RAM для шаблона worker-узла, которые вы получили ранее. В этом примере `1454740Ki`.

1. Откройте терминал и перейдите в директорию, где вы сохранили файл `placeholder.yaml`.  
1. Выполните команду:

   ```bash
   kubectl apply -f placeholder.yaml
   ```

   Если команда будет выполнена успешно, в ответе вернется подтверждение создания `PriorityClass` и `Deployment`.  

## {heading(2. Проверьте применение настроек)[id=check]}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Контейнеры** → **Кластеры Kubernetes**.
1. Нажмите на название нужного кластера.
1. Перейдите на вкладку **Ресурсы кластера**.
1. Раскройте список **Поды** и убедитесь, что в списке добавлен под `overprovisioning` со статусом `Running`.

## {heading(Удалите неиспользуемые ресурсы)[id=delete]}

Если созданный кластер вам больше не нужен, [удалите](../../service-management/manage-cluster#delete_cluster) его.
