{include(/kz/_includes/_translated_by_ai.md)}

[Автоматты масштабтау агенті (Cluster Autoscaler)](/kz/kubernetes/k8s/concepts/cluster-autoscaler) жұмыс істеп тұрғанына қарамастан, жаңа тораптар қосылмайды, ал подтар `Pending` күйінде болады.

Мұндай мінез-құлықтың бірнеше себебі болуы мүмкін. Мәселе шешілгенше бір шешімнен келесісіне өтіп, қадамдарды ретімен орындаңыз.

{cut(Подтар үшін қажетті есептеу ресурстарына сұраулар берілмеген)}

1. `kubectl` көмегімен [кластерге қосылыңыз](../../connect/kubectl).
1. Мәселе байқалатын подтың манифестін келесі пәрменмен шығарыңыз:

   ```console
   kubectl describe pod <ИМЯ_ПОДА>
   ```
1. Егер под манифестінде `resources.requests` блогы болмаса, оны қосып, онда сұралатын есептеу ресурстарын көрсетіңіз. Мысал:
   
   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: frontend
   spec:
     containers:
     - name: app
       image: images.my-company.example/app:v4
       resources:
         requests:
           memory: "64Mi"
           cpu: "250m"
         limits:
           memory: "128Mi"
           cpu: "500m"
     - name: log-aggregator
       image: images.my-company.example/log-aggregator:v6
       resources:
         requests:
           memory: "64Mi"
           cpu: "250m"
         limits:
           memory: "128Mi"
         cpu: "500m"
   ```
   
Ресурстар туралы толығырақ [Ресурстарды пайдалануды шектеу](/kz/kubernetes/k8s/reference/resource-limiting) бөлімінде және [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/).

{/cut}

{cut(Тораптардың мақсатты тобы тораптардың ең көп санына жетіп қойған)}

1. Тораптар тобындағы тораптар санын қараңыз.

   {tabs}
   {tab(Жеке кабинет)}
   1. VK Cloud жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер → Кластеры Kubernetes** бөліміне өтіңіз.
   1. Қажетті кластер мен ондағы тораптар тобын табыңыз.
   1. Қажетті тораптар тобы үшін ![](/kz/assets/more-icon.svg "inline") батырмасын басып, **Масштабтау баптаулары** тармағын таңдаңыз және **Автоматты масштабтауды қосу** опциясын қосыңыз.
   1. Пайда болған терезеде **Тораптардың ең көп саны** және **Тораптар саны** өрістерінің мәндерін салыстырыңыз. Егер олар бірдей болса, демек топта тораптардың ең көп санына жеткен.
   {/tab}

   {tab(kubectl)}
   1. `kubectl` көмегімен [кластерге қосылыңыз](../../connect/kubectl).
   1. [автоматты масштабтау агентінің логтарында](/kz/kubernetes/k8s/how-to-guides/autoscaler-logs) `max size reached` бар ескертулердің бар-жоғын тексеріңіз. Егер бар болса, топта тораптардың ең көп санына жеткен.
   {/tab}
   {/tabs}

1. [Тораптардың](/kz/kubernetes/k8s/instructions/scale#autoscale_worker_nodes) ең көп санын қажетті мәнге дейін ұлғайтыңыз.

Толығырақ [Worker-тораптар тобын басқару](/kz/kubernetes/k8s/instructions/manage-node-group) бөлімінде.

{/cut}

{cut(VK Cloud жобасында vCPU, RAM немесе виртуалды машиналарға арналған квоталар таусылған)}

1. vCPU, RAM және виртуалды машиналарға арналған квоталарды қараңыз.

   {tabs}
   {tab(Жеке кабинет)}

   1. VK Cloud жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
   
   {include(/kz/_includes/_project_quotas.md)[tags=viewquotas]}
   
   {/tab}
   
   {tab(kubectl)}

   1. `kubectl` көмегімен [кластерге қосылыңыз](../../connect/kubectl).
   1. [автоматты масштабтау агентінің логтарында](/kz/kubernetes/k8s/how-to-guides/autoscaler-logs) `quota exceeded` бар ескертулердің бар-жоғын тексеріңіз. Егер бар болса, жобада тиісті ресурстарға арналған квоталар таусылған.
   
   {/tab}
   {/tabs}

1. Егер квоталар таусылып, жобаға қосымша квоталар қажет болса, нұсқалардың бірін таңдаңыз:

   - Квоталарды босату үшін пайдаланылмайтын ресурстарды жойыңыз.
   - [Квоталарды ұлғайтыңыз](/kz/tools-for-using-services/account/instructions/project-settings/manage#increase-quota).

Квоталар туралы толығырақ [Квоталар мен лимиттер](/kz/tools-for-using-services/account/concepts/quotasandlimits) мақаласында.

{/cut}

{cut(Жоспарлағыш шектеулері: под үшін талаптар мен ережелер көрсетілген, оларға бірде-бір бар немесе ықтимал жаңа торап сәйкес келмейді)}

1. `kubectl` көмегімен [кластерге қосылыңыз](../../connect/kubectl).
1. [автоматты масштабтау агентінің логтарында](/kz/kubernetes/k8s/how-to-guides/autoscaler-logs) `predicate failed` бар ескертулердің бар-жоғын тексеріңіз. Егер бар болса, мәселе жоспарлау ережелерінде.
1. Мәселе байқалатын подтың манифестін келесі пәрменмен шығарыңыз:

   ```console
   kubectl describe pod <ИМЯ_ПОДА>
   ```

1. Манифест шығаруында жоспарлау ережелерін қараңыз. Олар тораптар селекторы (`nodeSelector`), тораптарды орналастыру ережелері (`affinity`) немесе ерекшеліктер (`tolerations`) арқылы берілуі мүмкін. Егер бар немесе ықтимал жаңа тораптар қолданыстағы жоспарлау ережелерінің ешқайсысына сәйкес келмесе, нұсқалардың бірін таңдаңыз:

   - [Под ережелерін](/kz/kubernetes/k8s/instructions/manage-node-group#labels_taints) көрсетілген ережелермен және талаптармен сәйкестендіріңіз.
   - [Көрсетілген талаптарға](/kz/kubernetes/k8s/instructions/manage-node-group) сәйкес келетін жаңа тораптар тобын қосыңыз.
   
Белгілер, шектеулер және ерекшеліктер туралы толығырақ [Белгілер мен шектеулер](/kz/kubernetes/k8s/reference/labels-and-taints) бөлімінде.

{/cut}

{cut(Под басқа қолжетімділік аймағындағы тұрақты томға байланған, бұл қайшылық тудырады)}

1. `kubectl` көмегімен [кластерге қосылыңыз](../../connect/kubectl).
1. Қайшылық байқалатын подтың манифестін келесі пәрменмен шығарыңыз:

   ```console
   kubectl describe pod <ИМЯ_ПОДА>
   ```

1. Манифест шығаруында `volume node affinity conflict` деп басталатын ескертулерді іздеңіз. Мұндай ескертулер подтың басқа қолжетімділік аймағындағы томға байланғанын және бұл том қолжетімді торапта жоспарлана алмайтынын көрсетеді.

   Егер мұндай ескертулер болса:
   1. Кластеріңіздің сақтау класы (StorageClass) манифестіндегі `volumeBindingMode` мәнін `WaitForFirstConsumer` етіп өзгертіңіз. Осы параметрмен Kubernetes алдымен бірінші под жоспарланғанша күтеді, содан кейін томды нақты торапқа байлайды.
   1. Кластердің сақтау класы манифестіндегі өзгерістерді қолданыңыз:

      ```console
      kubectl apply -f <ИМЯ_ФАЙЛА_МАНИФЕСТА_КЛАССА_ХРАНЕНИЯ>
      ```

Томдар туралы толығырақ [Тұрақты томдар және PVC](/kz/kubernetes/k8s/reference/pvs-and-pvcs) бөлімінде.

{/cut}

{cut(Под қолжетімді тораптар топтарындағы кез келген виртуалды машина түрі ұсына алатыннан көбірек ресурстар сұрайды)}

1. `kubectl` көмегімен [кластерге қосылыңыз](../../connect/kubectl).
1. Мәселе байқалатын подтың манифестін келесі пәрменмен шығарыңыз:

   ```console
   kubectl describe pod <ИМЯ_ПОДА>
   ```

1. `resources.requests` блогында көрсетілген ресурстарды тиісті [тораптар топтарындағы](/kz/kubernetes/k8s/instructions/helpers/node-group-settings) виртуалды машиналардың сипаттамаларымен салыстырыңыз.

1. Егер ресурстар жеткіліксіз болса, ресурстар саны бойынша қолайлы [виртуалды машина үлгісі](/kz/kubernetes/k8s/concepts/flavors#konfiguraciya_kalyptary) бар жаңа тораптар тобын [жасаңыз](/kz/kubernetes/k8s/instructions/manage-node-group#add_group).

Ресурстар туралы толығырақ [Ресурстарды пайдалануды шектеу](/kz/kubernetes/k8s/reference/resource-limiting) бөлімінде және [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/).

{/cut}

Егер мәселе сақталса, [техникалық қолдау қызметіне](/kz/contacts) хабарласыңыз.
