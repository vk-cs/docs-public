# {heading(Міндетті белгілерді баптау)[id=k8s-labels]}

{include(/kz/_includes/_translated_by_ai.md)}

{linkto(../../../reference/gatekeeper#k8s-gatekeeper)[text=Gatekeeper]} көмегімен жасалатын Kubernetes ресурстарында белгілі бір белгінің болуын талап ететін шектеуді орнатуға болады. Мысалы, бұл шектеу компания саясаттары кез келген Kubernetes ресурстарының жасаушысының атын көрсетуді талап етсе, аудит жүргізуді және ықтимал инциденттерді талдауды жеңілдету үшін пайдалы болуы мүмкін.

Gatekeeper жұмысын көрсету үшін мыналар жасалады:

* Шектеу үлгісі және оған сәйкес келетін шектеу. Ол жүйелік емес кеңістіктерде жасалатын Kubernetes ресурстарында `creator-name` белгісінің (label) болуын талап етеді
* Шектеудің жұмысын тексеруге арналған бірнеше Kubernetes ресурсы.

## {heading(Дайындық қадамдары)[id=k8s-labels-prepare]}

{include(/kz/_includes/_create-test-cluster.md)}

   Кластер параметрлерін өз қалауыңыз бойынша таңдаңыз.

1. {linkto(../../../connect/kubectl#k8s-kubectl)[text=`kubectl` көмегімен кластерге қосыла алатыныңызға көз жеткізіңіз]}.

## {heading(Белгілерді тексеретін шектеуді жасаңыз)[id=k8s-labels-create-constraint]}

1. Шектеу үлгісін жасаңыз:

   1. Шектеу үлгісінің манифесін жасаңыз.

      [Осы файлдың мазмұнын](https://github.com/open-policy-agent/gatekeeper-library/blob/master/library/general/requiredlabels/template.yaml) пайдаланыңыз. Бұл — Kubernetes ресурсында көрсетілген белгілердің болуын тексеретін [Gatekeeper кітапханасындағы](https://github.com/open-policy-agent/gatekeeper-library) дайын `K8sRequiredLabels` үлгісі.

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

   Ұқсас ақпарат көрсетілуі керек:

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

      Ұқсас ақпарат көрсетілуі керек:

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
      Error from server (Forbidden): error when creating ".\example-disallowed.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [require-creator-label] you must provide labels: {"creator-name"}
      ```

   1. Келесі команданы орындап, аттар кеңістігінің жасалмағанына көз жеткізіңіз:

      ```yaml
      kubectl get ns disallowed-namespace
      ```

      Ұқсас ақпарат көрсетілуі керек:

      ```text
      Error from server (NotFound): namespaces "disallowed-namespace" not found
      ```

   {/tab}

   {/tabs}

## {heading(Қолданылмайтын ресурстарды жойыңыз)[id=k8s-labels-delete]}

Жұмыс істеп тұрған кластер тарифтеледі және есептеу ресурстарын тұтынады. Егер шектеудің жұмысын тексеру үшін жасалған Kubernetes ресурстары енді қажет болмаса, оларды жойыңыз:

1. Жасалған `allowed-namespace` аттар кеңістігін және онымен байланысты ресурстарды, сондай-ақ шектеу үлгісін және шектеудің өзін жойыңыз:

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

{ifdef(public)}
{include(/kz/_includes/_delete-test-cluster-short.md)}
{/ifdef}
