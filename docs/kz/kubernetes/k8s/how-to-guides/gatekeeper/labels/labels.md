{include(/kz/_includes/_translated_by_ai.md)}

[Gatekeeper](../../../reference/gatekeeper) көмегімен жасалатын Kubernetes ресурстарында белгілі бір метканың болуын талап ететін шектеуді орнатуғал болады. Мысалы, бұл шектеу компания саясаттары аудитті және ықтимал инциденттерді талдауды жеңілдету үшін кез келген Kubernetes ресурсының жасаушысының атын көрсетуді талап етсе, пайдалы болуы мүмкін.

Gatekeeper жұмысын көрсету үшін мыналар жасалады:

* Шектеу үлгісі және оған сәйкес келетін шектеу. Ол жүйелік емес кеңістіктерде жасалатын Kubernetes ресурстарында `creator-name` белгісінің (label) болуын талап етеді
* Шектеудің жұмысын тексеруге арналған бірнеше Kubernetes ресурстар.

## Дайындық қадамдары

1. Kubernetes кластерінің ең өзекті нұсқасын [жасаңыз](../../../instructions/create-cluster).

   Кластер параметрлерін өз қалауыңыз бойынша таңдаңыз.

1. `kubectl` көмегімен кластерге қосыла алатыныңызғал [көз жеткізіңіз](../../../connect/kubectl).

## Белгілерді тексеретін шектеуді жасаңыз

1. Шектеу үлгісін жасаңыз:

   1. Шектеу үлгісінің манифесін жасаңыз.

      Пайдаланыңыз [Осы файлдың мазмұнын](https://github.com/open-policy-agent/gatekeeper-library/blob/master/library/general/requiredlabels/template.yaml). Бұл уже готовый шаблон `K8sRequiredLabels` из [Gatekeeper кітапханасындағы](https://github.com/open-policy-agent/gatekeeper-library), ол проверяет наличие указанных меток у ресурса Kubernetes.

   1. Үлгі манифесі негізінде шектеу үлгісін жасаңыз:

      ```yaml
      kubectl apply -f template.yaml
      ```

1. Шектеу жасаңыз:

   1. Бұрын жасалған үлгі негізінде шектеу манифесін жасаңыз:

      {cut(constraint.yaml)}

      ```yaml
      apiVersion: constraints.gatekeeper.sh/v1beta1
      kind: K8sRequiredLabels
      metadata:
        name: require-creator-label
      spec:
        match:
          kinds:
            - apiGroups: [""]
              kinds: ["Namespace"]
          excludedNamespaces: ["kube-system"]
        parameters:
          labels:
            - key: creator-name
              allowedRegex: "(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])?"
      ```

      {/cut}

   1. Шектеу манифесі негізінде шектеуді жасаңыз:

      ```yaml
      kubectl apply -f constraint.yaml
      ```

1. Келесі команданы орындап, шектеу үлгісі мен шектеу сәтті жасалғанына көз жеткізіңіз:

   ```yaml
   kubectl get constraints,constrainttemplates
   ```

   Ұқсас алқпарат көрсетілуі керек:

   ```text
   NAME                                                              ENFORCEMENT-ACTION TOTAL-VIOLATIONS
   k8srequiredlabels.constraints.gatekeeper.sh/require-creator-label ...                ... 

   NAME                                                              AGE
   ...
   constrainttemplate.templates.gatekeeper.sh/k8srequiredlabels      ...
   ```

1. Бірнеше аттар кеңістігін (namespaces) жасап көру арқылы шектеудің жұмысын тексеріңіз:

   {tabs}

   {tab(Шектеуге сай келетін кеңістік)}

   1. Аттар кеңістігінің манифесін жасаңыз:

      {cut(example-allowed.yaml)}

      ```yaml
      apiVersion: v1
      kind: Namespace
      metadata:
        name: allowed-namespace
        labels:
          creator-name: john.doe
      ```

      {/cut}

   1. Манифес негізінде аттар кеңістігін жасап көріңіз:

      ```yaml
      kubectl apply -f example-allowed.yaml
      ```

      Операция сәтті аяқталуы керек.

   1. Келесі команданы орындап, аттар кеңістігінің сәтті жасалғанына көз жеткізіңіз:

      ```yaml
      kubectl get ns allowed-namespace
      ```

      Ұқсас алқпарат көрсетілуі керек:

      ```text
      NAME                STATUS   AGE
      allowed-namespace   Active   ...
      ```

   {/tab}

   {tab(Шектеуге сай келмейтін кеңістік)}

   1. Аттар кеңістігінің манифесін жасаңыз:

      {cut(example-disallowed.yaml)}

      ```yaml
      apiVersion: v1
      kind: Namespace
      metadata:
        name: disallowed-namespace
        labels:
          my-label: sample
      ```

      {/cut}

   1. Манифес негізінде аттар кеңістігін жасап көріңіз:

      ```yaml
      kubectl apply -f example-disallowed.yaml
      ```

      Операция қателікпен аяқталуы керек:

      ```text
      Error from server (Forbidden): error when creating ".\\example-disallowed.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [require-creator-label] you must provide labels: {"creator-name"}
      ```

   1. Келесі команданы орындап, аттар кеңістігінің жасалмағанына көз жеткізіңіз:

      ```yaml
      kubectl get ns disallowed-namespace
      ```

      Ұқсас алқпарат көрсетілуі керек:

      ```text
      Error from server (NotFound): namespaces "disallowed-namespace" not found
      ```

   {/tab}

   {/tabs}

## Қолданылмайтын ресурстарды жойыңыз

1. Жасалған `allowed-namespace` аттар кеңістігін және онымен байланысты ресурстарды, сондай-алқ шектеу үлгісін және шектеудің өзін жойыңыз:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   kubectl delete ns allowed-namespace
   kubectl delete k8srequiredlabels.constraints.gatekeeper.sh/require-creator-label
   kubectl delete constrainttemplate.templates.gatekeeper.sh/k8srequiredlabels

   ```

   {/tab}

   {tab(Windows)}

   ```console
   kubectl delete ns allowed-namespace; `
   kubectl delete k8srequiredlabels.constraints.gatekeeper.sh/require-creator-label; `
   kubectl delete constrainttemplate.templates.gatekeeper.sh/k8srequiredlabels
   ```

   {/tab}

   {/tabs}

1. Жұмыс істеп тұрған кластер есептеу ресурстарын тұтынады. Егер ол сізге енді қажет болмаса:

   - оны кейінірек пайдалану үшін [тоқтатыңыз](../../../instructions/manage-cluster#klasterdi_iske_kosu_nemese_toktatu);
   - оны біржола [жойыңыз](../../../instructions/manage-cluster#delete_cluster).
