Поды могут иметь доступ к различной информации и компонентам кластера Kubernetes. Также при определенных настройках подов сами поды и кластер Kubernetes, в котором они выполняются, могут быть уязвимы к атакам.

В кластере Kubernetes с помощью [установленного Gatekeeper](../../k8s-addons/k8s-gatekeeper/k8s-opa) можно применять ограничения (constraints). Эти ограничения создаются на основе шаблонов ограничений (constraint templates). Вы можете [создавать собственные шаблоны и ограничения](../../k8s-addons/k8s-gatekeeper/k8s-policy).

Кроме того, кластеры Kubernetes VK Cloud уже содержат [преднастроенные шаблоны и ограничения](#prednastroennye-shablony-i-ogranicheniya-gatekeeper), направленные на повышение безопасности эксплуатации развернутой рабочей нагрузки.

## Преднастроенные шаблоны и ограничения Gatekeeper

<warn>

Отключение или изменение этих шаблонов и ограничений может снизить безопасность кластера Kubernetes. Все возникающие проблемы с кластером, напрямую или косвенно возникшие из-за отключения настроек, указанных в этой статье, должны решаться клиентом самостоятельно.

</warn>

### Ограничение host-namespaces

**Описание:**

Это ограничение запрещает запуск подов с опцией `hostPID: true`.

Если не запрещать запуск пода с этой опцией, то под получит следующие возможности:

- Просмотр всех процессов запущенных на хосте.
- Принудительное завершение любого процесса на хосте командой `kill`, отправленной из пода.
- Чтение переменных окружения для каждого пода на хосте путем получения доступа к файлу `/proc/[PID]/environ` для каждого процесса.

Такие возможности очень широки и сами по себе считаются уязвимостями, так как могут привести к раскрытию чувствительных переменных окружения, манипулированию процессами и облегчению эксплуатации других уязвимостей.

**Пример действия ограничения:**

<details>
<summary>Манифест pod_namespace.yaml, не удовлетворяющий ограничению</summary>

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

При попытке применить такой манифест с помощью `kubectl apply -f pod_namespace.yaml`, будет выведено похожее сообщение о нарушении ограничения для создаваемого пода:

```text
Error from server ([...] Sharing the host namespace is not allowed: nginx-host-namespace-disallowed): error when creating "pod_namespace.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [...] Sharing the host namespace is not allowed: nginx-host-namespace-disallowed
```

Под, нарушивший ограничение, не будет создан.

### Ограничение host-filesystem

**Описание:**

Это ограничение запрещает монтировать в под директории хоста, на котором под выполняется. Таким образом, обеспечивается защита данных кластера, которые находятся на этом хосте.

**Пример действия ограничения:**

<details>
<summary>Манифест pod_filesystem.yaml, не удовлетворяющий ограничению</summary>

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

При попытке применить такой манифест с помощью `kubectl apply -f pod_filesystem.yaml`, будет выведено похожее сообщение о нарушении ограничения для создаваемого пода:

```text
Error from server ([...] HostPath volume {"hostPath": {"path": "/tmp", "type": ""}, "name": "cache-volume"} is not allowed, pod: nginx-host-filesystem. Allowed path: [{"pathPrefix": "/tmp", "readOnly": true}]): error when creating "pod_filesystem.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [...] HostPath volume {"hostPath": {"path": "/tmp", "type": ""}, "name": "cache-volume"} is not allowed, pod: nginx-host-filesystem. Allowed path: [{"pathPrefix": "/tmp", "readOnly": true}]
```

Под, нарушивший ограничение, не будет создан.
