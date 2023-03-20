В кластерах Kubernetes VK Cloud уже применены определенные настройки, перечисленные ниже.

## Режим работы kube-proxy

Сетевой прокси Kubernetes выполняется на каждом узле, обеспечивая доступ к IP-адресам сервисов и других ресурсов Kubernetes.

Этот прокси может работать в [нескольких режимах](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/#options), они перечислены в описании настройки `--proxy-mode`. В кластерах Kubernetes VK Cloud прокси работает в режиме `iptables`. Этот режим работы влияет:

- [на поведение балансировщиков нагрузки](../../../use-cases/load-balancer);
- [на поведение и настройки локального кеширующего DNS-сервера](../../../use-cases/local-dns-cache).

## Настройки лимитов для подов

При работе с подами [рекомендуется указывать](../../../k8s-reference/resource-limiting) в их конфигурационных файлах параметры `requests` и `limits` для контейнеров, входящих в этот под.

Если эти параметры не указаны, в кластерах Kubernetes VK Cloud для соответствующих контейнеров автоматически применяются значения:

- `requests`: 100m CPU и 64Mb выделяемой памяти.
- `limits`: 500m CPU и 512Mb выделяемой памяти.

Это позволяет избежать ситуации, когда некорректно работающий контейнер исчерпает все вычислительные ресурсы отдельного worker-узла или даже всего кластера.

## Преднастроенные шаблоны и ограничения Gatekeeper

<warn>

Отключение или изменение этих шаблонов и ограничений может снизить безопасность кластера Kubernetes. Все возникающие проблемы с кластером, напрямую или косвенно возникшие из-за отключения настроек, указанных ниже, должны решаться клиентом самостоятельно.

</warn>

Шаблоны доступны для кластеров, начиная с версии Kubernetes 1.21. Для более старых версий [вручную установите Gatekeeper](../../../install-tools/gatekeeper), а также приведенные шаблоны и ограничения, или обновите кластер. Подробнее о Gatekeeper в разделе [Архитектура сервиса](../../architecture).

<tabs>
<tablist>
<tab>Ограничение<br>host-namespaces</tab>
<tab>Ограничение<br>host-filesystem</tab>
</tablist>
<tabpanel>

**Описание:**

Это ограничение запрещает запуск подов с опцией `hostPID: true`.

Запущенный с этой опцией под получит следующие возможности:

- Просмотр всех процессов запущенных на хосте.
- Принудительное завершение любого процесса на хосте командой `kill`, отправленной из пода.
- Чтение переменных окружения для каждого пода на хосте путем получения доступа к файлу `/proc/[PID]/environ` для каждого процесса.

Такие возможности очень широки и сами по себе считаются уязвимостями, так как могут привести к раскрытию чувствительных переменных окружения и манипулированию процессами, а также облегчают эксплуатацию других уязвимостей.

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

При попытке применить такой манифест с помощью `kubectl apply -f pod_namespace.yaml` будет выведено подобное сообщение о нарушении ограничения для создаваемого пода:

```text
Error from server ([...] Sharing the host namespace is not allowed: nginx-host-namespace-disallowed): error when creating "pod_namespace.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [...] Sharing the host namespace is not allowed: nginx-host-namespace-disallowed
```

</tabpanel>
<tabpanel>

**Описание:**

Это ограничение запрещает монтировать в под директории хоста, на котором под выполняется. Таким образом обеспечивается защита данных кластера, которые находятся на этом хосте.

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

При попытке применить такой манифест с помощью `kubectl apply -f pod_filesystem.yaml` будет выведено подобное сообщение о нарушении ограничения для создаваемого пода:

```text
Error from server ([...] HostPath volume {"hostPath": {"path": "/tmp", "type": ""}, "name": "cache-volume"} is not allowed, pod: nginx-host-filesystem. Allowed path: [{"pathPrefix": "/tmp", "readOnly": true}]): error when creating "pod_filesystem.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [...] HostPath volume {"hostPath": {"path": "/tmp", "type": ""}, "name": "cache-volume"} is not allowed, pod: nginx-host-filesystem. Allowed path: [{"pathPrefix": "/tmp", "readOnly": true}]
```

</tabpanel>
</tabs>

Под, нарушивший ограничение, не будет создан.
