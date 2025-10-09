Cloud Containers позволяет создавать [кластеры с GPU (графическими процессорами)](/ru/kubernetes/k8s/concepts/flavors#gpu) для выполнения машинного обучения или обработки больших данных.

GPU может использоваться в кластере следующими способами:

- Один под использует один или несколько GPU. В этом случае каждый задействованный GPU одновременно выполняет один процесс.
- Ресурсы GPU распределены несколькими подами по стратегии [MPS](/ru/kubernetes/k8s/concepts/flavors#gpu-sharing). Каждый процесс получает выделенный набор ресурсов GPU, и они взаимодействуют друг с другом через межпроцессное взаимодействие (IPC).
- Ресурсы GPU распределены несколькими подами по стратегии [MIG](/ru/kubernetes/k8s/concepts/flavors#gpu-sharing). При этом каждая часть имеет собственные ресурсы (память, вычислительные блоки) и может работать изолированно от других.

В статье показано, как создать кластер с узлом GPU и проверить его работу, как разделить использование GPU между отдельными подами по технологиям MPS или MIG и как переключиться с одного варианта разделения на другой.

## Подготовительные шаги

1. [Подключите](/ru/computing/gpu/connect) сервис Cloud GPU, если он еще не подключен.
1. [Создайте кластер](/ru/kubernetes/k8s/instructions/create-cluster) с GPU, если такой кластер еще не создан. Укажите следующие параметры:

   - Выберите сеть с доступом в интернет.
   - Оставьте опцию **Назначить внешний IP** включенной.
   - Для worker-узла в параметре **Тип Node-узлов** выберите шаблон с GPU.
   - В параметре **Количество узлов Node** оставьте значение `1`.
   - Остальные параметры укажите на свой выбор или оставьте по умолчанию.

   {note:err}

   В параметрах **Количество узлов Node** и **Максимальное количество узлов** не указывайте значение больше, чем количество подключенных у вас GPU. Это может привести к неработоспособности кластера.

   {/note}

   В качестве примера далее будет создан кластер `my-kubernetes-cluster` с узлом `my-kubernetes-cluster-gpu-group-0` на шаблоне с GPU. При использовании других имен сделайте соответствующие замены в командах.

1. [Подключитесь](/ru/kubernetes/k8s/connect/kubectl) к кластеру через kubectl.

## 1. Установите аддон GPU-operator

Воспользуйтесь [инструкцией по установке](/ru/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-gpu-operator).

## 2. Проверьте работу кластера 

Для проверки работы GPU-узла будет запущен образец CUDA, который суммирует два вектора.

1. Создайте файл `cuda-vectoradd.yaml` и добавьте в него следующее содержимое:

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
      name: cuda-vectoradd
   spec:
      restartPolicy: OnFailure
      containers:
      - name: cuda-vectoradd
        image: "nvcr.io/nvidia/k8s/cuda-sample:vectoradd-cuda11.7.1-ubuntu20.04"
        resources:
          limits:
            nvidia.com/gpu: 1
   ```
   Здесь параметр `nvidia.com/gpu: 1` указывает на количество ресурсов GPU, запрашиваемых у соответствующего вендора (в этом случае — `nvidia.com`). Подробнее о ресурсах и лимитах в [официальной документации Kubernetes](https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/).

   {note:warn}

   Обязательно указывайте параметр `nvidia.com/gpu: 1` для каждого пода.

   {/note}

   
1. Загрузите файл в кластер и запустите под:

   ```console
   kubectl apply -f cuda-vectoradd.yaml
   ```

   Пример ответа:

   ```console
   pod/cuda-vectoradd created
   ```

   Под запускается, выполняет команду `vectoradd` и затем завершает работу.

1. Просмотрите логи контейнера, выполнив команду:

   ```console
   kubectl logs pod/cuda-vectoradd
   ```
   
   Пример ответа:

   ```console
   [Vector addition of 50000 elements]
   Copy input data from the host memory to the CUDA device
   CUDA kernel launch with 196 blocks of 256 threads
   Copy output data from the CUDA device to the host memory
   Test PASSED
   Done
   ```
   
1. Удалите остановленный под:

   ```console
   kubectl delete -f cuda-vectoradd.yaml
   ```
   
   Пример ответа:

   ```console
   pod "cuda-vectoradd" deleted
   ```

## 3. Разделите GPU по технологии MPS

1. [Добавьте](/ru/kubernetes/k8s/instructions/addons/manage-addons#edit) конфигурацию [NVIDIA device plugin](https://github.com/NVIDIA/k8s-device-plugin/tree/v0.17.0?tab=readme-ov-file#with-cuda-mps) в код аддона GPU Operator:

   {note:warn}

   Соблюдайте отступы при редактировании кода, иначе аддон не будет отредактирован или будет работать неправильно.

   {/note}

   ```yaml
      config:
        name: device-plugin-config
        create: true
        default: "default"
        data:
          default: |-
            version: v1
            flags:
              migStrategy: none
          mig-single: |-
            version: v1
            flags:
              migStrategy: single
          mig-mixed: |-
            version: v1
            flags:
              migStrategy: mixed
          mps-on: |-
            version: v1
            flags:
              migStrategy: none
            sharing:
              mps:
                renameByDefault: false
                resources:
                - name: nvidia.com/gpu
                  replicas: 4
   ```

   Здесь:

   - `default` — режим использования GPU без разделения на части. Используется по умолчанию.
   - `mps-on` — режим использования GPU c разделением на части по технологии MPS.
   - `replicas` — количество частей, на который будет разделен GPU при включении режима `mps-on`.

1. Убедитесь, что GPU на узле не разделен:

   ```console
   kubectl describe node my-kubernetes-cluster-gpu-group-0
   ```

   Пример части ответа:

   ```yaml
   Capacity:
     cpu:                8
     ephemeral-storage:  19650540Ki
     hugepages-1Gi:      0
     hugepages-2Mi:      0
     memory:             32604248Ki
     nvidia.com/gpu:     1
     pods:               110
   ```

   Здесь параметр `nvidia.com/gpu: 1` указывает, что GPU не разделен.

1. Добавьте метку (label) для узла с GPU, которая включит режим `mps-on`, добавленный в конфигурации аддона:

   ```console
   kubectl label node my-kubernetes-cluster-gpu-group-0 nvidia.com/device-plugin.config=mps-on
   ```
   
   {note:info}

   Вы можете [добавить метку](/ru/kubernetes/k8s/instructions/manage-node-group#labels_taints) для всех узлов в группе через личный кабинет.

   {/note}
   
1. Подождите несколько минут, пока применятся настройки, после чего проверьте их:

   ```console
   kubectl describe node my-kubernetes-cluster-gpu-group-0
   ```

   Пример части ответа:

   ```yaml
   Capacity:
     cpu:                8
     ephemeral-storage:  19650540Ki
     hugepages-1Gi:      0
     hugepages-2Mi:      0
     memory:             32604248Ki
     nvidia.com/gpu:     4
     pods:               110
   ```

   Здесь параметр `nvidia.com/gpu: 4` указывает, что GPU разделен на 4 части.
  
## 4. Разделите GPU по технологии MIG

1. Добавьте метку (label) для узла с GPU, которая отменит разделение GPU на части по технологии MPS:

   ```console
   kubectl label node my-kubernetes-cluster-gpu-group-0 nvidia.com/device-plugin.config=default --overwrite
   ```

   Использовать одновременно и MPS, и MIG невозможно.

1. Убедитесь, что GPU на узле не разделен:

   ```console
   kubectl describe node my-kubernetes-cluster-gpu-group-0
   ```

   Пример части ответа:

   ```yaml
   Capacity:
     cpu:                8
     ephemeral-storage:  19650540Ki
     hugepages-1Gi:      0
     hugepages-2Mi:      0
     memory:             32604248Ki
     nvidia.com/gpu:     1
     pods:               110
   ```
   
   Здесь параметр `nvidia.com/gpu: 1` указывает, что GPU не разделен.

1. Получите ConfigMap с описанием вариантов выделения частей GPU по [технологии MIG](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/24.9.0/gpu-operator-mig.html):

   ```console
   kubectl get configmaps default-mig-parted-config -o yaml
   ```
   
   Выберите конфигурацию, которая доступна для вашего GPU и походит для ваших задач. 

   В этом примере будет использована конфигурация `all-1g.10gb`, которая разделит GPU кластера из примера на 7 равных частей по 10 ГБ.

   Подробнее о вариантах разделения GPU на части в [официальной документации NVIDIA](https://docs.nvidia.com/datacenter/tesla/mig-user-guide/index.html#partitioning).

1. Добавьте метку (label) для узла с GPU:

   ```console
   kubectl label nodes my-kubernetes-cluster-gpu-group-0 nvidia.com/mig.config=all-1g.10gb --overwrite
   ```
   
   Здесь `all-1g.10gb` — название выбранной конфигурации из ConfigMap.

1. Проверьте, что выбранная конфигурация применилась:

   ```console
   kubectl describe node my-kubernetes-cluster-gpu-group-0
   ```

   Пример части ответа:

   ```yaml
   Capacity:
     cpu:                8
     ephemeral-storage:  19650540Ki
     hugepages-1Gi:      0
     hugepages-2Mi:      0
     memory:             32604248Ki
     nvidia.com/gpu:     7
     pods:               110
   ```

   Здесь параметр `nvidia.com/gpu: 7` указывает, что GPU разделен на 7 частей.

1. (Опционально) Для отмены разделения GPU на части примените конфигурацию `all-disabled`:

   ```console
   kubectl label nodes my-kubernetes-cluster-gpu-group-0 nvidia.com/mig.config=all-disabled --overwrite
   ```

## Удалите неиспользуемые ресурсы

Работающий кластер Cloud Containers тарифицируется и потребляет вычислительные ресурсы. Если он вам больше не нужен:

- [остановите](/ru/kubernetes/k8s/instructions/manage-cluster#zapustit_ili_ostanovit_klaster) его, чтобы воспользоваться им позже;
- [удалите](/ru/kubernetes/k8s/instructions/manage-cluster#delete_cluster) его навсегда.
