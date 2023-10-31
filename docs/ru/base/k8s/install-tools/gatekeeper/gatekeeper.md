Gatekeeper — это контроллер, встраиваемый между Kubernetes API и движком политик Open Policy Agent (OPA) для проверки создаваемых, изменяемых и удаляемых ресурсов Kubernetes на соответствие политикам. Более подробная информация о Gatekeeper приведена в [справочнике Kubernetes](../../k8s-reference/gatekeeper/) и в [официальной документации Gatekeeper](https://open-policy-agent.github.io/gatekeeper/website/docs/).

<warn>

Используйте эту инструкцию, если ваш кластер Cloud Containers версии 1.20 или ниже. Начиная с Kubernetes 1.21, Gatekeeper [уже установлен](../../concepts/architecture) в кластере вместе с [политиками безопасности по умолчанию](../../concepts/addons-and-settings/settings#prednastroennye_shablony_i_ogranicheniya_gatekeeper).

</warn>

## Установка

1. [Установите Helm](../helm/), если утилита еще не установлена.

1. Выполните команды:

   <tabs>
   <tablist>
   <tab>Windows (PowerShell)</tab>
   <tab>Linux (bash)/macOS (zsh)</tab>
   </tablist>
   <tabpanel>

   ```powershell
   helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts; `
   helm install gatekeeper/gatekeeper --name-template=gatekeeper --namespace opa-gatekeeper --create-namespace
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts
   helm install gatekeeper/gatekeeper --name-template=gatekeeper --namespace opa-gatekeeper --create-namespace

   ```

   </tabpanel>
   </tabs>

## Проверка работоспособности

Проверьте, что поды Gatekeeper создались и работают, выполнив команду:

```bash
kubectl -n opa-gatekeeper get pods
```

В выводе команды должны быть поды `gatekeeper-audit-...` и `gatekeeper-controller-manager-...` в статусе `Running`.

Пример вывода:

```text
NAME                                             READY   STATUS    RESTARTS   AGE
gatekeeper-audit-...                             1/1     Running   0          ...
gatekeeper-controller-manager-...                1/1     Running   0          ...
```

## (Опционально) Настройка ограничений и шаблонов

В кластерах Cloud Containers версий 1.21 и выше действуют [политики безопасности по умолчанию](../../concepts/addons-and-settings/settings#prednastroennye_shablony_i_ogranicheniya_gatekeeper), которые обеспечивают базовую защиту кластера от нескольких распространенных уязвимостей. Чтобы защитить кластеры версии 1.20 или ниже, самостоятельно создайте ограничения и шаблоны ограничений Gatekeeper, которые соответствуют этим политикам.

<tabs>
<tablist>
<tab>Ограничение host-namespaces</tab>
<tab>Ограничение host-filesystem</tab>
</tablist>
<tabpanel>

Эта политика запрещает получать доступ к инструментам межпроцессной коммуникации (IPC) и процессам узла кластера Kubernetes c помощью параметров `hostIPC: true` и `hostPID: true`. Подробнее читайте в [описании политики](../../concepts/security-policies#ogranichenie_host_namespaces_7cf1c13b).

Чтобы настроить эту политику в кластере:

1. Создайте манифесты для ресурсов Gatekeeper:

   <details>
   <summary>Шаблон ограничения host-namespaces-template.yaml</summary>

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

   </details>

   <details>
   <summary>Ограничение host-namespaces-constraint.yaml </summary>

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

   </details>

1. Примените созданные манифесты:

   ```bash
   kubectl apply -f host-namespaces-template.yaml -f host-namespaces-constraint.yaml
   ```

1. (Опционально) Проверьте работу ограничения:

   1. Создайте манифест пода, который не удовлетворяет политике:

      <details>
      <summary>Манифест pod_namespace.yaml</summary>

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

      </details>

   1. Попытайтесь применить этот манифест:

      ```bash
      kubectl apply -f pod_namespace.yaml
      ```

   Будет выведено подобное сообщение о нарушении политики для создаваемого пода:

   ```text
   Error from server ([...] Sharing the host namespace is not allowed: nginx-host-namespace-disallowed): error when creating "pod_namespace.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [...] Sharing the host namespace is not allowed: nginx-host-namespace-disallowed
   ```

   Под, нарушивший политику, не будет создан.

</tabpanel>
<tabpanel>

Запрещает монтировать в контейнер директории файловой системы узла кластера Kubernetes с помощью [hostPath](https://kubernetes.io/docs/concepts/storage/volumes/#hostpath). Подробнее читайте в [описании соответствующей политики безопасности](../../concepts/security-policies#ogranichenie_host_filesystem_14877f88).

Чтобы настроить эту политику в кластере:

1. Создайте манифесты для ресурсов Gatekeeper:

   <details>
   <summary>Шаблон ограничения host-filesystem-template.yaml</summary>

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

   </details>

   <details>
   <summary>Ограничение host-filesystem-constraint.yaml</summary>

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

   </details>

1. Примените созданные манифесты:

   ```bash
   kubectl apply -f host-filesystem-template.yaml -f host-filesystem-constraint.yaml
   ```

1. (Опционально) Проверьте работу ограничения:

   1. Создайте манифест пода, который не удовлетворяет политике:

      <details>
      <summary>Манифест pod_filesystem.yaml</summary>

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

      </details>

   1. Попытайтесь применить этот манифест:

      ```bash
      kubectl apply -f pod_filesystem.yaml
      ```

   Будет выведено подобное сообщение о нарушении политики для создаваемого пода:

   ```text
   Error from server (Forbidden): error when creating ".\\pod_filesystem.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [k8spsphostfilesystem] HostPath volume {"hostPath": {"path": "/tmp", "type": ""}, "name": "cache-volume"} is not allowed, pod: nginx-host-filesystem. Allowed path: [{"pathPrefix": "/psp", "readOnly": true}]
   ```

   Под, нарушивший политику, не будет создан.

</tabpanel>
</tabs>

## Удаление

1. Чтобы удалить Gatekeeper, выполните команду:

   ```bash
   helm delete gatekeeper --namespace opa-gatekeeper
   ```

1. Чтобы удалить CRD-объекты, созданные для Gatekeeper, выполните команду:

   ```bash
   kubectl delete crd -l gatekeeper.sh/system=yes
   ```

   <warn>

   Эта операция приведет к удалению ограничений и их шаблонов.

   </warn>
