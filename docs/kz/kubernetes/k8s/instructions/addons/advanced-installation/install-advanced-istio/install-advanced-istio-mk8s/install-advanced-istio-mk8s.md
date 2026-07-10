# {heading(Istio екінші буын кластерлерде)[id=k8s-install-advanced-istio-mk8s]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Дайындық қадамдар)[id=k8s-install-advanced-istio-mk8s-prepare]}

{include(/kz/_includes/_addon-prep.md)}

## {heading(Аддонды орнату)[id=k8s-install-advanced-istio-mk8s-install]}

{linkto(/kz/kubernetes/k8s/concepts/addons-and-settings/addons#k8s-addons-istio)[text=Istio]} аддоны үшін {linkto(../../../../../concepts/addons-and-settings/addons#k8s-addons-install-features)[text=бірнеше орнату нұсқасы]} қолжетімді.

{tabs}

{tab(Стандартты орнату)}

1. Аддонды орнатыңыз:

   {tabs}

   {tab(Жеке кабинет)}
    1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
    1. Қажетті кластер бар жобаны таңдаңыз.
    1. **Kubernetes кластерлері → Kubernetes кластерлері** бөліміне өтіңіз.
    1. Қажетті кластердің атын басыңыз.
    1. **Аддондар** қойындысына өтіңіз.
    1. Егер кластерде бұрыннан орнатылған аддондар бар болса, **Аддонды қосу** батырмасын басыңыз.
    1. `istio` аддон картасында **Орнату** батырмасын басыңыз.
    1. **Аддонды орнату** батырмасын басыңыз.
    1. Қажет болса, {linkto(#k8s-install-advanced-istio-mk8s-edit)[test=аддонды баптау кодын]} өңдеңіз (мысалы, аддонның жұмыс режимін өзгерту үшін).

       {note:warn}
       Дұрыс көрсетілмеген баптау коды орнату кезінде қателіктерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.
       {/note}

    1. **Аддонды орнату** батырмасын басыңыз.

       Кластерге аддон орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

   {/tabs}

1. (Қосымша) [Аддонмен жұмыс істеу бойынша Istio ресми құжаттамасымен танысыңыз](https://istio.io/latest/docs/).

{/tab}

{tab(Бөлінген worker-түйіндерге орнату)}

1. Егер бұл әлі жасалмаған болса, аддонды орнату үшін worker-түйіндердің бөлінген тобын дайындаңыз:

   {tabs}

   {tab(Жеке кабинет)}

    1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
    1. Қажетті кластер бар жобаны таңдаңыз.
    1. **Kubernetes кластерлері → Kubernetes кластерлері** бөліміне өтіңіз.
    1. Тізімнен қажетті кластерді тауып алыңыз.

    1. Кластерде аддондар орналастырылатын worker-түйіндердің бөлінген тобы бар екеніне көз жеткізіңіз.

       Егер мұндай топ болмаса — {linkto(../../../../manage-node-group#k8s-manage-node-group-add-group)[text=оны қосыңыз]}.

    1. Егер бұл әлі жасалмаған болса, осы түйіндер тобы үшін {linkto(../../../../manage-node-group#k8s-manage-node-group-labels-taints)[text=келесілерді көрсетіңіз]}:

        - Белгіні (label): `addonNodes` кілті, `dedicated` мәні.
        - Шектеуді (taint): `NoSchedule` эффектісі, `addonNodes` кілті, `dedicated` мәні.

   {/tab}

   {/tabs}

1. Аддонды орнатыңыз:

   {tabs}

   {tab(Жеке кабинет)}

    1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
    1. Қажетті кластер бар жобаны таңдаңыз.
    1. **Kubernetes кластерлері → Kubernetes кластерлері** бөліміне өтіңіз.
    1. Қажетті кластердің атын басыңыз.
    1. **Аддондар** қойындысына өтіңіз.
    1. Егер кластерде бұрыннан орнатылған аддондар бар болса, **Аддонды қосу** батырмасын басыңыз.
    1. `istio` аддон картасында **Орнату** батырмасын басыңыз.
    1. **Аддонды орнату** батырмасын басыңыз.
    1. Қажет болса, {linkto(#k8s-install-advanced-istio-mk8s-edit)[аддонды баптау кодын]} өңдеңіз (мысалы, аддонның жұмыс режимін өзгерту үшін).

       {note:warn}
       Дұрыс көрсетілмеген баптау коды орнату кезінде қателіктерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.
       {/note}

    1. Қажетті компоненттер үшін аддонды баптау кодында қажетті төзімділіктерді (tolerations) және түйін селекторларын (nodeSelector) көрсетіңіз:

       {tabs}

       {tab(Төзімділіктер)}
       `pilot` компоненті үшін `tolerations` блогінің мысалы:
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

       {tab(Түйін селекторлары)}
       `pilot` компоненті үшін `nodeSelector` блогінің мысалы:

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

    1. **Аддонды орнату** батырмасын басыңыз.

       Кластерге аддон орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

   {/tabs}

1. (Қосымша) [Аддонмен жұмыс істеу бойынша Istio ресми құжаттамасымен танысыңыз](https://istio.io/latest/docs/).

{/tab}

{tab(Жылдам орнату)}

{note:info}
Жылдам орнату кезінде аддонды баптау коды өңделмейді.
{/note}

1. Аддонды орнатыңыз:

   {tabs}

   {tab(Жеке кабинет)}

    1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
    1. Қажетті кластер бар жобаны таңдаңыз.
    1. **Kubernetes кластерлері → Kubernetes кластерлері** бөліміне өтіңіз.
    1. Қажетті кластердің атын басыңыз.
    1. **Аддондар** қойындысына өтіңіз.
    1. Егер кластерде бұрыннан орнатылған аддондар бар болса, **Аддонды қосу** батырмасын басыңыз.
    1. `istio` аддон картасында **Орнату** батырмасын басыңыз.
    1. **Аддонды орнату** батырмасын басыңыз.
    1. Параметрлерді өзгертпей, **Аддонды орнату** батырмасын басыңыз.

       Кластерге аддон орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

   {/tabs}

1. (Қосымша) [Аддонмен жұмыс істеу бойынша Istio ресми құжаттамасымен танысыңыз](https://istio.io/latest/docs/).

{/tab}

{/tabs}

## {heading(Орнату кезінде аддонды баптау кодын өңдеу)[id=k8s-install-advanced-istio-mk8s-edit]}

Аддонды баптаудың толық коды өрістер сипаттамасымен бірге [Istio ресми құжаттамасында](https://istio.io/latest/docs/reference/config/istio.operator.v1alpha1/) қолжетімді.

Аддон үшін сервис торында ([service mesh](https://istio.io/latest/about/service-mesh/#what-is-a-service-mesh)) под арасындағы трафикті ұстау мен бағдарлау әдістерін анықтайтын екі жұмыс режимі қолжетімді:

- `default`: классикалық sidecar-архитектураны қолданатын жұмыс режимі. Istio әр подға `istio-proxy` қосымша контейнерін енгізеді, ол қолданба трафикін ұстайды, шифрлайды және бағдарлайды. Под деңгейіндегі ұстау `iptables` көмегімен орындалады.
- `ambient` (әдепкі бойынша): sidecar-контейнерлерсіз, кластер түйіндері деңгейіндегі жұмыс режимі. Ядро деңгейіндегі трафикті ұстау eBPF көмегімен орындалады. Ұсталған пакеттер `ztunnel` компонентіне беріледі, ол кластердің әрбір түйінінде жұмыс істейді, шифрлауды және L4-бағдарлауды қамтамасыз етеді. L7 деңгейіндегі саясаттарды баптау үшін қосымша [waypoint-проксиді](https://istio.io/latest/docs/ambient/usage/waypoint/) баптауға болады.

Өзара TLS (mTLS) негізіндегі шифрлау екі режимде де қолданылады.

Режимке байланысты сервис торына аддонның жұмыс істеуі үшін қажетті компоненттер жиынтығы орнатылады. Бұл компоненттер `spec.components` блогінде `enabled: true` мәнімен көрсетілген. `ambient` режимінде жұмыс істеу үшін `base`, `pilot`, `cni` және `ztunnel` компоненттері қажет — олар қосылып тұр және оларды өшіруге болмайды. Қалған компоненттер қосымша. Компоненттер туралы толығырақ [Istio ресми құжаттамасында](https://istio.io/latest/docs/setup/additional-setup/config-profiles/#deployment-profiles).

`ambient` орнына `default` режимін қолдану үшін:

1. `spec.profile` өрісінде `default` мәнін көрсетіңіз:

   ```yaml
   ...
   kind: IstioOperator
   spec:
     profile: default
   ...
   ```

1. `spec.components` блогінде келесіні көрсетіңіз:

    - `base` және `pilot` компоненттері үшін: `enabled: true`.
    - `ztunnel` компоненті үшін: `enabled: false`.
    - Қалған компоненттер қосымша.

   `spec.components` блогінің өңделген мысалы:

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

Кодты өңдеуден кейін аддонды орнатуды жалғастырыңыз.