{include(/kz/_includes/_translated_by_ai.md)}

Cloud Containers машиналық оқытуды орындау немесе үлкен деректерді өңдеу үшін [GPU (графикалық процессорлары) бар кластерлерді](/kz/kubernetes/k8s/concepts/flavors#gpu) жасауғал мүмкіндік береді.

GPU кластерде келесі тәсілдермен пайдаланылуы мүмкін:

- Бір pod бір немесе бірнеше GPU пайдаланады. Бұл жағдайда әрбір пайдаланылған GPU бір уақытта бір процесті орындайды.
- Ресурсы GPU распределены несколькими подами по стратегии [MPS](/kz/kubernetes/k8s/concepts/flavors#gpu-sharing). Әрбір процесс получает выделенный набор ресурстардың GPU, және они взаимодействуют друг с другом арқылы межпроцессное взаимодействие (IPC).
- GPU ресурстары бірнеше pod арасында [MIG](/kz/kubernetes/k8s/concepts/flavors#gpu-sharing) стратегиясы бойынша бөлінеді. Бұл ретте әрбір бөлік өз ресурстарына (жадына, есептеу блоктарына) ие болады және басқаларынан оқшау жұмыс істей алады.

Мақалада GPU түйіні бар кластерді қалай жасау және оның жұмысын тексеру, MPS немесе MIG технологиялары бойынша GPU пайдалануды жекелеген pod-тар арасында қалай бөлу және бөлудің бір нұсқасынан екіншісіне қалай ауысу көрсетілген.

## Дайындық қадамдары

1. Егер Cloud GPU сервисі әлі қосылмаса, оны [қосыңыз](/kz/computing/gpu/connect).
1. Егер мұндай кластер әлі жасалмаса, [GPU бар кластер жасаңыз](/kz/kubernetes/k8s/instructions/create-cluster). Келесі параметрлерді көрсетіңіз:

   - Интернетке қолжетімділігі бар желіні таңдаңыз.
   - **Сыртқы IP тағайындау** опциясын қосулы күйде қалдырыңыз.
   - Worker түйіні үшін **Node-түйіндерінің түрі** параметрінде GPU бар шаблонды таңдаңыз.
   - **Node-түйіндерінің саны** параметрінде `1` мәнін қалдырыңыз.
   - Қалған параметрлерді өз таңдауыңыз бойынша көрсетіңіз немесе әдепкі мәндерді қалдырыңыз.

   {note:err}

   **Node-түйіндерінің саны** және **Түйіндердің ең көп саны** параметрлерінде сізге қосылған GPU санынан үлкен мәнді көрсетпеңіз. Бұл кластердің жұмысқал жарамсыз болуына әкелуі мүмкін.

   {/note}

   Бұдан әрі мысал ретінде GPU бар шаблондағы `my-kubernetes-cluster-gpu-group-0` түйінімен `my-kubernetes-cluster` кластері жасалады. Басқал атауларды пайдалансаңыз, командаларда тиісті ауыстыруларды жасаңыз.

1. [Кластерге kubectl арқылы қосылыңыз](/kz/kubernetes/k8s/connect/kubectl) кластерге kubectl арқылы.

## 1. GPU-operator аддонын орнатыңыз

Пайдаланыңыз [Орнату жөніндегі нұсқаулықты](/kz/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-gpu-operator).

## 2. Кластердің жұмысын тексеріңіз

GPU түйінінің жұмысын тексеру үшін екі векторды қосатын CUDA үлгісі іске қосылады.

1. `cuda-vectoradd.yaml` файлын жасаңыз және оған келесі мазмұнды қосыңыз:

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
   Мұнда `nvidia.com/gpu: 1` параметрі тиісті вендордан сұралатын GPU ресурстарының санын көрсетеді (бұл жағдайда — `nvidia.com`). Ресурстар мен лимиттер туралы толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/).

   {note:warn}

   Әрбір pod үшін `nvidia.com/gpu: 1` параметрін міндетті түрде көрсетіңіз.

   {/note}

   
1. Файлды кластерге жүктеп, pod-ты іске қосыңыз:

   ```console
   kubectl apply -f cuda-vectoradd.yaml
   ```

   Жауап мысалы:

   ```console
   pod/cuda-vectoradd created
   ```

   Pod іске қосылады, `vectoradd` командасын орындайды да, кейін жұмысын аяқтайды.

1. Келесі команданы орындап, контейнер логтарын қараңыз:

   ```console
   kubectl logs pod/cuda-vectoradd
   ```
   
   Жауап мысалы:

   ```console
   [Vector addition of 50000 elements]
   Copy input data from the host memory to the CUDA device
   CUDA kernel launch with 196 blocks of 256 threads
   Copy output data from the CUDA device to the host memory
   Test PASSED
   Done
   ```
   
1. Тоқтатылған pod-ты жойыңыз:

   ```console
   kubectl delete -f cuda-vectoradd.yaml
   ```
   
   Жауап мысалы:

   ```console
   pod "cuda-vectoradd" deleted
   ```

## 3. GPU-ді MPS технологиясы бойынша бөліңіз

1. [NVIDIA device plugin](/kz/kubernetes/k8s/instructions/addons/manage-addons#edit) конфигурацию [қосыңыз](https://github.com/NVIDIA/k8s-device-plugin/tree/v0.17.0?tab=readme-ov-file#with-cuda-mps) в код аддонның GPU Operator:

   {note:warn}

   Кодты өңдеу кезінде шегіністерді сақтаңыз, әйтпесе аддон өңделмейді немесе қате жұмыс істейді.

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

   Мұнда:

   - `default` — GPU-ді бөліктерге бөлмей пайдалану режимі. Әдепкі бойынша пайдаланылады.
   - `mps-on` — GPU-ді MPS технологиясы бойынша бөліктерге бөліп пайдалану режимі.
   - `replicas` — `mps-on` режимі қосылған кезде GPU бөлінетін бөліктер саны.

1. Түйіндегі GPU бөлінбегеніне көз жеткізіңіз:

   ```console
   kubectl describe node my-kubernetes-cluster-gpu-group-0
   ```

   Жауаптың бір бөлігінің мысалы:

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

   Мұнда `nvidia.com/gpu: 1` параметрі GPU бөлінбегенін көрсетеді.

1. Аддон конфигурациясына қосылған `mps-on` режимін қосатын GPU бар түйін үшін метканы (label) қосыңыз:

   ```console
   kubectl label node my-kubernetes-cluster-gpu-group-0 nvidia.com/device-plugin.config=mps-on
   ```
   
   {note:info}

   Сіз бұл метканы топтағы барлық тораптар үшін жеке кабинет арқылы [қоса аласыз](/kz/kubernetes/k8s/instructions/manage-node-group#labels_taints).

   {/note}
   
1. Баптаулар қолданылғанша бірнеше минут күтіңіз, содан кейін оларды тексеріңіз:

   ```console
   kubectl describe node my-kubernetes-cluster-gpu-group-0
   ```

   Жауаптың бір бөлігінің мысалы:

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

   Мұнда `nvidia.com/gpu: 4` параметрі GPU 4 бөлікке бөлінгенін көрсетеді.
  
## 4. GPU-ді MIG технологиясы бойынша бөліңіз

1. GPU-ді MPS технологиясы бойынша бөліктерге бөлуді болдырмайтын GPU бар түйін үшін метканы (label) қосыңыз:

   ```console
   kubectl label node my-kubernetes-cluster-gpu-group-0 nvidia.com/device-plugin.config=default --overwrite
   ```

   MPS пен MIG-ті бір уақытта пайдалану мүмкін емес.

1. Түйіндегі GPU бөлінбегеніне көз жеткізіңіз:

   ```console
   kubectl describe node my-kubernetes-cluster-gpu-group-0
   ```

   Жауаптың бір бөлігінің мысалы:

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
   
   Мұнда `nvidia.com/gpu: 1` параметрі GPU бөлінбегенін көрсетеді.

1. GPU бөліктерін бөлу нұсқалары сипатталған [MIG технологиясы](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/24.9.0/gpu-operator-mig.html) бойынша ConfigMap алыңыз:

   ```console
   kubectl get configmaps default-mig-parted-config -o yaml
   ```
   
   GPU-іңіз үшін қолжетімді және міндеттеріңізге сай келетін конфигурацияны таңдаңыз. 

   Сіздің GPU үшін қолжетімді және міндеттеріңізге сай келетін конфигурацияны таңдаңыз. 

   Бұл мысалда `all-1g.10gb` конфигурациясы пайдаланылады, ол мысалдағы кластер GPU-сін 10 ГБ болатын 7 бірдей бөлікке бөледі.

1. GPU бар түйін үшін метканы (label) қосыңыз:

   ```console
   kubectl label nodes my-kubernetes-cluster-gpu-group-0 nvidia.com/mig.config=all-1g.10gb --overwrite
   ```
   
   Мұнда `all-1g.10gb` — ConfigMap ішінен таңдалған конфигурация атауы.

1. Таңдалған конфигурацияның қолданылғанын тексеріңіз:

   ```console
   kubectl describe node my-kubernetes-cluster-gpu-group-0
   ```

   Жауаптың бір бөлігінің мысалы:

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

   Мұнда `nvidia.com/gpu: 7` параметрі GPU 7 бөлікке бөлінгенін көрсетеді.

1. (Опционалды түрде) GPU-ді бөліктерге бөлуді болдырмау үшін `all-disabled` конфигурациясын қолданыңыз:

   ```console
   kubectl label nodes my-kubernetes-cluster-gpu-group-0 nvidia.com/mig.config=all-disabled --overwrite
   ```

## Қолданылмайтын ресурстарды жойыңыз

Жұмыс істеп тұрған Cloud Containers кластеры тарифтелмейді және есептеу ресурстарын тұтынады. Егер ол сізге енді қажет болмаса:

- оны кейінірек пайдалану үшін [тоқтатыңыз](/kz/kubernetes/k8s/instructions/manage-cluster#klasterdi_iske_kosu_nemese_toktatu);
- оны біржола [жойыңыз](/kz/kubernetes/k8s/instructions/manage-cluster#delete_cluster).
