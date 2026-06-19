# {heading(Gatekeeper орнату)[id=k8s-gatekeeper]}

{include(/kz/_includes/_translated_by_ai.md)}

Gatekeeper — жасалатын, өзгертілетін және жойылатын Kubernetes ресурстарының саясаттарға сәйкестігін тексеру үшін Kubernetes API мен Open Policy Agent (OPA) саясаттар қозғалтқышының арасына ендірілетін контроллер. Gatekeeper туралы толығырақ ақпарат {linkto(../../reference/gatekeeper#k8s-gatekeeper)[text=Kubernetes анықтамалығында]} және [Gatekeeper ресми құжаттамасында](https://open-policy-agent.github.io/gatekeeper/website/docs/) берілген.

## {heading(Орнату)[id=k8s-gatekeeper-install]}

1. Егер утилита әлі орнатылмаған болса, {linkto(../helm#k8s-helm)[text=Helm орнатыңыз]}.

1. Командаларды орындаңыз:

   {tabs}

   {tab(Windows (PowerShell))}

   ```console
   helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts; `
   helm install gatekeeper/gatekeeper --name-template=gatekeeper --namespace opa-gatekeeper --create-namespace
   ```

   {/tab}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts
   helm install gatekeeper/gatekeeper --name-template=gatekeeper --namespace opa-gatekeeper --create-namespace

   ```

   {/tab}

   {/tabs}

## {heading(Жұмысқа қабілеттілігін тексеру)[id=k8s-gatekeeper-check]}

Келесі команданы орындап, Gatekeeper подтары жасалғанына және жұмыс істеп тұрғанына көз жеткізіңіз:

```console
kubectl -n opa-gatekeeper get pods
```

Команда шығысында `gatekeeper-audit-...` және `gatekeeper-controller-manager-...` подтары `Running` күйінде болуы керек.

Шығыс мысалы:

```text
NAME                                             READY   STATUS    RESTARTS   AGE
gatekeeper-audit-...                             1/1     Running   0          ...
gatekeeper-controller-manager-...                1/1     Running   0          ...
```

## {heading((Опционалды) Шектеулер мен үлгілерді баптау)[id=k8s-gatekeeper-set-constraint]}

Cloud Containers сервисіндегі Kubernetes кластерлерінде {linkto(../../concepts/addons-and-settings/settings#k8s-settings-templates-and-limitations)[text=әдепкі қауіпсіздік саясаттары]} әрекет етеді, олар кластерді бірнеше кең таралған осалдықтан базалық деңгейде қорғайды. 1.20 немесе одан төмен нұсқадағы кластерлерді қорғау үшін осы саясаттарға сәйкес келетін Gatekeeper шектеулері мен шектеу үлгілерін өзіңіз жасаңыз.

{tabs}

{tab(host-namespaces шектеуі)}

Бұл саясат `hostIPC: true` және `hostPID: true` параметрлері арқылы Kubernetes кластері түйінінің процесстеріне және процесаралық байланыс (IPC) құралдарына қол жеткізуге тыйым салады. Толығырақ {linkto(../../concepts/security-policies#k8s-security-policies-host-namespaces)[text=саясат сипаттамасынан]} оқыңыз.

Бұл саясатты кластерде баптау үшін:

1. Gatekeeper ресурстары үшін манифесттер жасаңыз:

   {cut(host-namespaces-template.yaml шектеу үлгісі)}

   <!-- prettier-ignore -->
   ```yaml
   apiVersion: templates.gatekeeper.sh/v1
   kind: ConstraintTemplate
   metadata:
     name: k8spsphostnamespace
     annotations:
       metadata.gatekeeper.sh/title: "Host Namespace"
       metadata.gatekeeper.sh/version: 1.0.0
       description: >-
         Disallows sharing of host PID and IPC namespaces by pod containers.
         Corresponds to the `hostPID` and `hostIPC` fields in a PodSecurityPolicy.
         For more information, see
         https://kubernetes.io/docs/concepts/policy/pod-security-policy/#host-namespaces
   spec:
     crd:
       spec:
         names:
           kind: K8sPSPHostNamespace
         validation:
           # Schema for the `parameters` field
           openAPIV3Schema:
             type: object
             description: >-
               Disallows sharing of host PID and IPC namespaces by pod containers.
               Corresponds to the `hostPID` and `hostIPC` fields in a PodSecurityPolicy.
               For more information, see
               https://kubernetes.io/docs/concepts/policy/pod-security-policy/#host-namespaces
     targets:
       - target: admission.k8s.gatekeeper.sh
         rego: |
           package k8spsphostnamespace

           violation[{"msg": msg, "details": {}}] {
               input_share_hostnamespace(input.review.object)
               msg := sprintf("Sharing the host namespace is not allowed: %v", [input.review.object.metadata.name])
           }

           input_share_hostnamespace(o) {
               o.spec.hostPID
           }
           input_share_hostnamespace(o) {
               o.spec.hostIPC
           }
   ```

   {/cut}

   {cut(host-namespaces-constraint.yaml шектеуі )}

   <!-- prettier-ignore -->
   ```yaml
   apiVersion: constraints.gatekeeper.sh/v1beta1
   kind: K8sPSPHostNamespace
   metadata:
     name: k8spsphostnamespace
   spec:
     match:
       kinds:
       - apiGroups:
         - ""
         kinds:
         - Pod
   ```

   {/cut}

1. Жасалған манифесттерді қолданыңыз:

   ```console
   kubectl apply -f host-namespaces-template.yaml -f host-namespaces-constraint.yaml
   ```

1. (Опционалды) Шектеудің жұмысын тексеріңіз:

   1. Саясатқа сәйкес келмейтін под манифестін жасаңыз:

      {cut(pod_namespace.yaml манифесті)}

      <!-- prettier-ignore -->
      ```yaml
      apiVersion: v1
      kind: Pod
      metadata:
        name: nginx-host-namespace-disallowed
        labels:
          app: nginx-host-namespace
      spec:
        hostPID: true
        hostIPC: true
        containers:
          - name: nginx
            image: nginx
      ```

      {/cut}

   1. Осы манифестті қолданып көріңіз:

      ```console
      kubectl apply -f pod_namespace.yaml
      ```

   Жасалатын под үшін саясаттың бұзылғаны туралы ұқсас хабарлама шығарылады:

   ```text
   Error from server ([...] Sharing the host namespace is not allowed: nginx-host-namespace-disallowed): error when creating "pod_namespace.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [...] Sharing the host namespace is not allowed: nginx-host-namespace-disallowed
   ```

   Саясатты бұзған под жасалмайды.

{/tab}

{tab(host-filesystem шектеуі)}

[hostPath](https://kubernetes.io/docs/concepts/storage/volumes/#hostpath) көмегімен Kubernetes кластері түйінінің файлдық жүйесі директорияларын контейнерге монтирлеуге тыйым салады. Толығырақ {linkto(../../concepts/security-policies#k8s-security-policies-host-filesystem)[text=тиісті қауіпсіздік саясатының сипаттамасынан]} оқыңыз.

Бұл саясатты кластерде баптау үшін:

1. Gatekeeper ресурстары үшін манифесттер жасаңыз:

   {cut(host-filesystem-template.yaml шектеу үлгісі)}

   <!-- prettier-ignore -->
   ```yaml
   apiVersion: templates.gatekeeper.sh/v1
   kind: ConstraintTemplate
   metadata:
     name: k8spsphostfilesystem
     annotations:
       metadata.gatekeeper.sh/title: "Host Filesystem"
       metadata.gatekeeper.sh/version: 1.0.0
       description: >-
         Controls usage of the host filesystem. Corresponds to the
         `allowedHostPaths` field in a PodSecurityPolicy. For more information,
         see
         https://kubernetes.io/docs/concepts/policy/pod-security-policy/#volumes-and-file-systems
   spec:
     crd:
       spec:
         names:
           kind: K8sPSPHostFilesystem
         validation:
           # Schema for the `parameters` field
           openAPIV3Schema:
             type: object
             description: >-
               Controls usage of the host filesystem. Corresponds to the
               `allowedHostPaths` field in a PodSecurityPolicy. For more information,
               see
               https://kubernetes.io/docs/concepts/policy/pod-security-policy/#volumes-and-file-systems
             properties:
               allowedHostPaths:
                 type: array
                 description: "An array of hostpath objects, representing paths and read/write configuration."
                 items:
                   type: object
                   properties:
                     pathPrefix:
                       type: string
                       description: "The path prefix that the host volume must match."
                     readOnly:
                       type: boolean
                       description: "when set to true, any container volumeMounts matching the pathPrefix must include `readOnly: true`."
     targets:
       - target: admission.k8s.gatekeeper.sh
         rego: |
           package k8spsphostfilesystem

           violation[{"msg": msg, "details": {}}] {
               volume := input_hostpath_volumes[_]
               allowedPaths := get_allowed_paths(input)
               input_hostpath_violation(allowedPaths, volume)
               msg := sprintf("HostPath volume %v is not allowed, pod: %v. Allowed path: %v", [volume, input.review.object.metadata.name, allowedPaths])
           }

           input_hostpath_violation(allowedPaths, volume) {
               # An empty list means all host paths are blocked
               allowedPaths == []
           }
           input_hostpath_violation(allowedPaths, volume) {
               not input_hostpath_allowed(allowedPaths, volume)
           }

           get_allowed_paths(arg) = out {
               not arg.parameters
               out = []
           }
           get_allowed_paths(arg) = out {
               not arg.parameters.allowedHostPaths
               out = []
           }
           get_allowed_paths(arg) = out {
               out = arg.parameters.allowedHostPaths
           }

           input_hostpath_allowed(allowedPaths, volume) {
               allowedHostPath := allowedPaths[_]
               path_matches(allowedHostPath.pathPrefix, volume.hostPath.path)
               not allowedHostPath.readOnly == true
           }

           input_hostpath_allowed(allowedPaths, volume) {
               allowedHostPath := allowedPaths[_]
               path_matches(allowedHostPath.pathPrefix, volume.hostPath.path)
               allowedHostPath.readOnly
               not writeable_input_volume_mounts(volume.name)
           }

           writeable_input_volume_mounts(volume_name) {
               container := input_containers[_]
               mount := container.volumeMounts[_]
               mount.name == volume_name
               not mount.readOnly
           }

           # This allows "/foo", "/foo/", "/foo/bar" etc., but
           # disallows "/fool", "/etc/foo" etc.
           path_matches(prefix, path) {
               a := path_array(prefix)
               b := path_array(path)
               prefix_matches(a, b)
           }
           path_array(p) = out {
               p != "/"
               out := split(trim(p, "/"), "/")
           }
           # This handles the special case for "/", since
           # split(trim("/", "/"), "/") == [""]
           path_array("/") = []

           prefix_matches(a, b) {
               count(a) <= count(b)
               not any_not_equal_upto(a, b, count(a))
           }

           any_not_equal_upto(a, b, n) {
               a[i] != b[i]
               i < n
           }

           input_hostpath_volumes[v] {
               v := input.review.object.spec.volumes[_]
               has_field(v, "hostPath")
           }

           # has_field returns whether an object has a field
           has_field(object, field) = true {
               object[field]
           }
           input_containers[c] {
               c := input.review.object.spec.containers[_]
           }

           input_containers[c] {
               c := input.review.object.spec.initContainers[_]
           }

           input_containers[c] {
               c := input.review.object.spec.ephemeralContainers[_]
           }
   ```

   {/cut}

   {cut(host-filesystem-constraint.yaml шектеуі)}

   <!-- prettier-ignore -->
   ```yaml
   apiVersion: constraints.gatekeeper.sh/v1beta1
   kind: K8sPSPHostFilesystem
   metadata:
     name: k8spsphostfilesystem
   spec:
     match:
       kinds:
       - apiGroups:
         - ""
         kinds:
         - Pod
     parameters:
       allowedHostPaths:
       - pathPrefix: /psp
         readOnly: true
   ```

   {/cut}

1. Жасалған манифесттерді қолданыңыз:

   ```console
   kubectl apply -f host-filesystem-template.yaml -f host-filesystem-constraint.yaml
   ```

1. (Опционалды) Шектеудің жұмысын тексеріңіз:

   1. Саясатқа сәйкес келмейтін под манифестін жасаңыз:

      {cut(pod_filesystem.yaml манифесті)}

      <!-- prettier-ignore -->
      ```yaml
      apiVersion: v1
      kind: Pod
      metadata:
        name: nginx-host-filesystem
        labels:
          app: nginx-host-filesystem-disallowed
      spec:
        containers:
          - name: nginx
            image: nginx
            volumeMounts:
              - mountPath: /cache
                name: cache-volume
                readOnly: true
        volumes:
          - name: cache-volume
            hostPath:
              path: /tmp # directory on host
      ```

      {/cut}

   1. Осы манифестті қолданып көріңіз:

      ```console
      kubectl apply -f pod_filesystem.yaml
      ```

   Жасалатын под үшін саясаттың бұзылғаны туралы ұқсас хабарлама шығарылады:

   ```text
   Error from server (Forbidden): error when creating ".\pod_filesystem.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [k8spsphostfilesystem] HostPath volume {"hostPath": {"path": "/tmp", "type": ""}, "name": "cache-volume"} is not allowed, pod: nginx-host-filesystem. Allowed path: [{"pathPrefix": "/psp", "readOnly": true}]
   ```

   Саясатты бұзған под жасалмайды.

{/tab}

{/tabs}

## {heading(Жою)[id=k8s-gatekeeper-delete]}

1. Gatekeeper-ді жою үшін команданы орындаңыз:

   ```console
   helm delete gatekeeper --namespace opa-gatekeeper
   ```

1. Gatekeeper үшін жасалған CRD-объектілерін жою үшін команданы орындаңыз:

   ```console
   kubectl delete crd -l gatekeeper.sh/system=yes
   ```

   {note:warn}

   Бұл операция шектеулер мен олардың үлгілерін жоюға әкеледі.

   {/note}
