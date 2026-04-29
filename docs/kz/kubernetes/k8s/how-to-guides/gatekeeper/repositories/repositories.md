{include(/kz/_includes/_translated_by_ai.md)}

[Gatekeeper](../../../reference/gatekeeper) көмегімен образдарды жүктеу үшін тек рұқсат етілген репозиторийлерді пайдалануды талап ететін шектеуді орнатуға болады. Мысалы, бұл шектеу компания саясаттары тек сенімді репозиторийлерден образ жүктеуді талап етсе, кластер операторлары тексерілмеген көзден сенімсіз қолданбаны кездейсоқ іске қоспауы үшін пайдалы болуы мүмкін.

Gatekeeper жұмысын көрсету үшін мыналар жасалады:

* Шектеу үлгісі және оған сәйкес келетін шектеу. Ол образдарды тек Docker Hub репозиторийінен жүктеуге рұқсат береді.
* Шектеудің жұмысын тексеруге арналған бірнеше Kubernetes ресурсы.

{note:info}

VK Cloud-тағы 1.23 және одан жоғары нұсқадағы Kubernetes кластерлерінде қажетті [қауіпсіздік саясатын](../../../instructions/manage-security#kauipsizdik_sayasatyn_kosu) жеке кабинет арқылы [жасауға](../../../concepts/security-policies#allowed_repos) болады.

Бұл жағдайда Gatekeeper ресурстарымен тікелей жұмыс істеу міндетті емес.

{/note}

## Дайындық қадамдары

1. Kubernetes кластерінің ең өзекті нұсқасын [жасаңыз](../../../instructions/create-cluster).

   Кластер параметрлерін өз қалауыңыз бойынша таңдаңыз.

1. `kubectl` көмегімен кластерге қосыла алатыныңызға [көз жеткізіңіз](../../../connect/kubectl).

## Репозиторийлерді тексеретін шектеуді жасаңыз

1. Шектеу үлгісін жасаңыз:

   1. Шектеу үлгісінің манифесін жасаңыз.

      Воспользуйтесь [Осы файлдың мазмұнын](https://github.com/open-policy-agent/gatekeeper-library/blob/master/library/general/allowedrepos/template.yaml). Это уже готовый шаблон `K8sAllowedRepos` из [Gatekeeper кітапханасындағы](https://github.com/open-policy-agent/gatekeeper-library), который проверяет, что образы загружаются только из доверенных репозиториев.

   1. Үлгі манифесі негізінде шектеу үлгісін жасаңыз:

      ```yaml
      kubectl apply -f template.yaml
      ```

1. Шектеу жасаңыз:

   1. Бұрын жасалған үлгі негізінде шектеу манифесін жасаңыз:

      {cut(constraint.yaml)}

      ```yaml
      apiVersion: constraints.gatekeeper.sh/v1beta1
      kind: K8sAllowedRepos
      metadata:
        name: require-docker-hub
      spec:
        match:
          kinds:
            - apiGroups: [""]
              kinds: ["Pod"]
          namespaces:
            - "default"
        parameters:
          repos:
            - "docker.io/"
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
   NAME                                                          ENFORCEMENT-ACTION TOTAL-VIOLATIONS
   k8sallowedrepos.constraints.gatekeeper.sh/require-docker-hub  ...                ...

   NAME                                                          AGE
   constrainttemplate.templates.gatekeeper.sh/k8sallowedrepos    ...
   ```

1. Бірнеше pod жасап көру арқылы шектеудің жұмысын тексеріңіз:

   {tabs}

   {tab(Шектеуге сай келетін pod)}

   1. Pod үшін манифест жасаңыз:

      {cut(example-allowed.yaml)}

      ```yaml
      apiVersion: v1
      kind: Pod
      metadata:
        name: allowed-pod
      spec:
        containers:
          - name: nginx
            image: docker.io/jitesoft/nginx:latest
      ```

      {/cut}

   1. Манифес негізінде pod жасап көріңіз:

      ```yaml
      kubectl apply -f example-allowed.yaml
      ```

      Операция сәтті аяқталуы керек.

   1. Келесі команданы орындап, pod сәтті жасалғанына көз жеткізіңіз:

      ```yaml
      kubectl get pod allowed-pod
      ```

      Ұқсас ақпарат көрсетілуі керек:

      ```text
      NAME          READY   STATUS    RESTARTS   AGE
      allowed-pod   1/1     Running   ...        ...
      ```

   {/tab}

   {tab(Шектеуге сай келмейтін pod)}

   1. Pod үшін манифест жасаңыз:

      {cut(example-disallowed.yaml)}

      ```yaml
      apiVersion: v1
      kind: Pod
      metadata:
        name: disallowed-pod
      spec:
        containers:
          - name: nginx
            image: quay.io/jitesoft/nginx:latest
      ```

      {/cut}

   1. Манифес негізінде pod жасап көріңіз:

      ```yaml
      kubectl apply -f example-disallowed.yaml
      ```

      Операция қателікпен аяқталуы керек:

      ```text
      Error from server (Forbidden): error when creating "example-disallowed.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [require-docker-hub] container <nginx> has an invalid image repo <quay.io/jitesoft/nginx:latest>, allowed repos are ["docker.io/"]
      ```

   1. Келесі команданы орындап, pod жасалмағанына көз жеткізіңіз:

      ```yaml
      kubectl get pod disallowed-pod
      ```

      Ұқсас ақпарат көрсетілуі керек:

      ```text
      Error from server (NotFound): pods "disallowed-pod" not found
      ```

   {/tab}

   {/tabs}

## Қолданылмайтын ресурстарды жойыңыз

1. Жасалған `allowed-pod` pod-ын, шектеу үлгісін және шектеудің өзін жойыңыз:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   kubectl delete pod allowed-pod
   kubectl delete k8sallowedrepos.constraints.gatekeeper.sh/require-docker-hub
   kubectl delete constrainttemplate.templates.gatekeeper.sh/k8sallowedrepos

   ```

   {/tab}

   {tab(Windows)}

   ```console
   kubectl delete pod allowed-pod; `
   kubectl delete k8sallowedrepos.constraints.gatekeeper.sh/require-docker-hub; `
   kubectl delete constrainttemplate.templates.gatekeeper.sh/k8sallowedrepos
   ```

   {/tab}

   {/tabs}

1. Жұмыс істеп тұрған кластер есептеу ресурстарын тұтынады. Егер ол сізге енді қажет болмаса:

   - оны кейінірек пайдалану үшін [тоқтатыңыз](../../../instructions/manage-cluster#klasterdi_iske_kosu_nemese_toktatu);
   - оны біржола [жойыңыз](../../../instructions/manage-cluster#delete_cluster).
