# {heading(Автоматическое восстановление приложений при недоступности внешнего хранилища)[id=k8s-app]}

Приложения в Kubernetes нередко зависят от внешних хранилищ: NFS-серверов, файловых шлюзов, объектных S3-совместимых хранилищ или томов, подключаемых через CSI. Временная недоступность такого ресурса может привести к зависанию операций ввода-вывода, накоплению ошибок и возврату некорректных ответов пользователям.

В Cloud Containers эту проблему можно решить стандартными механизмами Kubernetes: `readinessProbe`, `livenessProbe` и `startupProbe`. Они позволяют временно исключить неисправный экземпляр приложения из балансировки, а при необходимости — автоматически перезапустить контейнер.

## {heading(Как должна работать схема восстановления)[id=k8s-app-schema]}

При потере доступа к хранилищу необходимо разделить реакцию системы на два этапа:

1. Прекратить направлять трафик в проблемный под. Для этого используется `readinessProbe`. Если проверка не проходит, под получает статус `NotReady` и исключается из эндпоинтов Kubernetes Service.

2. Перезапустить приложение, если оно не может восстановиться самостоятельно. Для этого используется `livenessProbe`. После нескольких неудачных проверок kubelet перезапускает контейнер.

Readiness- и liveness-проверки работают независимо: неуспешная readiness-проверка убирает под из балансировки, а неуспешная liveness-проверка приводит к перезапуску контейнера.

{note:warn}
Перезапуск контейнера не восстановит само внешнее хранилище. Поэтому liveness-проверка должна срабатывать только тогда, когда приложение после возврата хранилища осталось в зависшем или некорректном состоянии. Иначе длительный сбой хранилища вызовет бесконечные рестарты.
{/note}

## {heading({counter(app)}. Создайте скрипт для проверки файлового хранилища)[id=k8s-app-script]}

Предположим, что внешнее хранилище подключено к контейнеру по пути `/mnt/storage`. Создайте скрипт, который проверяет чтение каталога и возможность выполнить короткую операцию записи:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: storage-healthcheck
data:
  check-storage.sh: |
    #!/bin/sh
    set -eu

    STORAGE_PATH="${STORAGE_PATH:-/mnt/storage}"
    CHECK_FILE="${STORAGE_PATH}/.k8s-healthcheck-${HOSTNAME}"

    # timeout не дает проверке зависнуть при проблемах с сетью или NFS.
    timeout 3 stat "${STORAGE_PATH}" >/dev/null 2>&1 || exit 1

    # Удалите эту часть, если том подключен только для чтения.
    timeout 3 sh -c "touch '${CHECK_FILE}' && rm -f '${CHECK_FILE}'" \
      >/dev/null 2>&1 || exit 1
```

Для хранилища, подключенного только для чтения, достаточно операции `stat` или чтения заранее созданного контрольного файла.

## {heading({counter(app)}. Настройте Deployment)[id=k8s-app-deployment]}

Добавьте скрипт в под и настройте три типа проверок:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: storage-dependent-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: storage-dependent-app
  template:
    metadata:
      labels:
        app: storage-dependent-app
    spec:
      containers:
        - name: application
          image: example-registry/app:1.0.0

          env:
            - name: STORAGE_PATH
              value: /mnt/storage

          ports:
            - name: http
              containerPort: 8080

          volumeMounts:
            - name: external-storage
              mountPath: /mnt/storage

            - name: healthcheck
              mountPath: /opt/health
              readOnly: true

          startupProbe:
            exec:
              command:
                - /bin/sh
                - /opt/health/check-storage.sh
            periodSeconds: 5
            timeoutSeconds: 4
            failureThreshold: 60

          readinessProbe:
            exec:
              command:
                - /bin/sh
                - /opt/health/check-storage.sh
            periodSeconds: 10
            timeoutSeconds: 4
            failureThreshold: 2
            successThreshold: 1

          livenessProbe:
            httpGet:
              path: /health/live
              port: http
            periodSeconds: 15
            timeoutSeconds: 3
            failureThreshold: 4

      volumes:
        - name: healthcheck
          configMap:
            name: storage-healthcheck
            defaultMode: 0555

        - name: external-storage
          persistentVolumeClaim:
            claimName: application-storage
```

[PVC](/ru/kubernetes/k8s/reference/pvs-and-pvcs#k8s-pvs-and-pvcs) (`PersistentVolumeClaim`) позволяет приложению использовать постоянное хранилище, не зная деталей его реализации в конкретной облачной инфраструктуре.

## {heading({counter(app)}. Создайте PVC)[id=k8s-app-pvc]}

В примере Deployment используется PVC с именем `application-storage`:

```yaml
persistentVolumeClaim:
  claimName: application-storage
```

Если такой объект не создан, под останется в состоянии `Pending`, а в событиях появится ошибка:

```text
persistentvolumeclaim "application-storage" not found
```

Чтобы создать PVC:

1. Поверьте доступные в кластере [классы хранения](/ru/kubernetes/k8s/concepts/storage#k8s-storage-storage-classes):

   ```bash
   kubectl get storageclass
   ```

   Пример вывода:

   ```text
   NAME                   PROVISIONER                    RECLAIMPOLICY   VOLUMEBINDINGMODE
   csi-ceph-hdd           cinder.csi.openstack.org       Delete          WaitForFirstConsumer
   csi-ceph-ssd (default) cinder.csi.openstack.org       Delete          WaitForFirstConsumer
   ```

   Имена классов хранения зависят от конфигурации кластера. Используйте фактическое имя из вывода команды `kubectl get storageclass`.

1. Создайте манифест для PVC `application-storage-pvc.yaml`:

   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: application-storage
   spec:
     accessModes:
       - ReadWriteOnce
     storageClassName: csi-ceph-ssd
     resources:
       requests:
         storage: 10Gi
   ```

1. Примените манифест:

   ```bash
   kubectl apply -f application-storage-pvc.yaml
   ```

1. Проверьте состояние PVC:

   ```bash
   kubectl get pvc application-storage
   ```
   
   После успешного [динамического выделения](/ru/kubernetes/k8s/reference/pvs-and-pvcs#k8s-pvs-and-pvcs-life-cycle) тома статус должен стать `Bound`:

   ```text
   NAME                  STATUS   VOLUME                                     CAPACITY   ACCESS MODES
   application-storage   Bound    pvc-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx   10Gi       RWO
   ```

   Если в кластере есть класс хранения по умолчанию, поле `storageClassName` можно не указывать:

   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: application-storage
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 10Gi
   ```

Доступ `ReadWriteOnce` обычно позволяет подключить том для записи к одному узлу. Если несколько реплик приложения одновременно должны использовать одну файловую систему, потребуется хранилище с поддержкой `ReadWriteMany`, например NFS-совместимый CSI-драйвер. Не все классы хранения поддерживают этот режим.

## {heading({counter(app)}. Примените манифесты в правильном порядке)[id=k8s-app-manifests]}

1. Сначала создайте ConfigMap и PVC, затем Deployment:

   ```bash
   kubectl apply -f storage-healthcheck.yaml
   kubectl apply -f application-storage-pvc.yaml
   kubectl apply -f deployment.yaml
   ```

1. Проверьте связанные ресурсы:

   ```bash
   kubectl get pvc
   kubectl get pods -l app=storage-dependent-app
   kubectl describe pod <pod-name>
   ```

## {heading({counter(app)}. Проверьте сценарий восстановления)[id=k8s-app-script-check]}

1. Убедитесь, что все экземпляры приложения готовы:

   ```bash
   kubectl get pods -l app=storage-dependent-app
   ```

1. Временно заблокируйте доступ к тестовому хранилищу или измените его сетевые правила. Через некоторое время под должен перейти в состояние `NotReady`:

   ```bash
   kubectl describe pod <pod-name>
   kubectl get endpoints
   ```

   После восстановления доступа readiness-проверка должна снова завершиться успешно, а под — автоматически вернуться в балансировку.

1. Проверьте количество перезапусков:

   ```bash
   kubectl get pods \
     -l app=storage-dependent-app \
     -o custom-columns=NAME:.metadata.name,READY:.status.containerStatuses[0].ready,RESTARTS:.status.containerStatuses[0].restartCount
   ```

## {heading(Почему проверки настроены именно так)[id=k8s-app-probes]}

### {heading(Startup probe)[id=k8s-app-startup]}

`startupProbe` дает приложению время дождаться подключения хранилища при запуске. Пока она не завершится успешно, Kubernetes не выполняет liveness- и readiness-проверки.

Максимальное время ожидания в приведенном примере:

```text
60 × 5 секунд = 300 секунд
```

Такой подход защищает медленно запускающиеся контейнеры от преждевременного перезапуска.

### {heading(Readiness probe)[id=k8s-app-readiness]}

Readiness-проверка напрямую контролирует доступность хранилища. После двух ошибок под исключается из балансировки примерно через 20 секунд.

Когда хранилище снова становится доступным, проверка завершается успешно, под автоматически получает статус `Ready` и возвращается в Service. Пересоздавать Deployment вручную не требуется.

### {heading(Liveness probe)[id=k8s-app-liveness]}

Liveness должна проверять не само хранилище, а внутреннее состояние процесса. Например, эндпоинт `/health/live` может определять:

- работает ли основной цикл приложения;
- не исчерпан ли пул потоков;
- не зависли ли операции ввода-вывода;
- способно ли приложение обработать новый запрос после восстановления соединения.

Если приложение зависло, kubelet перезапустит контейнер. Для контейнеров Deployment используется политика `restartPolicy: Always`, поэтому завершившийся или признанный неисправным контейнер запускается повторно.

## {heading(Практические рекомендации)[id=k8s-app-recs]}

- Не выполняйте в `health check` длительные операции и не проверяйте большие файлы.
- Ограничивайте время проверки с помощью `timeout`.
- Проверяйте только те операции, которые действительно нужны приложению.
- Не направляйте liveness-проверку напрямую на внешний ресурс.
- Для read-only томов не используйте `touch`, `mkdir` и другие операции записи в `probe`.
- Настройте несколько реплик приложения.
- Добавьте `PodDisruptionBudget`.
- Распределяйте под по разным worker-узлам.
- Проверьте поведение приложения при зависших системных вызовах к NFS.
- Добавьте тайм-ауты, повторные попытки и circuit breaker в само приложение.

Используйте разные проверки для разных целей:

| Проверка | Назначение                                            |
|---|-------------------------------------------------------|
| `readinessProbe` | Можно ли сейчас направлять запросы в под              |
| `livenessProbe` | Способен ли процесс продолжать работу без перезапуска |
| `startupProbe` | Успело ли приложение полностью запуститься            |

## {heading(Мониторинг)[id=k8s-app-monitoring]}

Для регулярного контроля рекомендуется отслеживать:

- количество под в состоянии `NotReady`;
- рост `restartCount`;
- ошибки подключения к хранилищу;
- тайм-ауты операций чтения и записи;
- длительность операций ввода-вывода;
- состояние Deployment;
- события Kubernetes с причинами `Unhealthy`, `FailedMount` и `FailedAttachVolume`.

Примеры команд:

```bash
kubectl get events -A \
  --sort-by=.metadata.creationTimestamp
```

```bash
kubectl rollout status deployment/storage-dependent-app
```

```bash
kubectl get deployment storage-dependent-app \
  -o jsonpath='{.status.availableReplicas}'
```

## Особенности S3-совместимого хранилища

Если приложение использует объектное хранилище, а не смонтированный файловый том, проверку `stat` и `ls` следует заменить на короткий запрос чтения к заранее созданному объекту.

Например, health check может:

1. проверить DNS-разрешение эндпоинта;
2. установить TLS-соединение;
3. выполнить `HEAD`-запрос к контрольному объекту;
4. проверить код ответа;
5. завершиться по тайм-ауту.

Не рекомендуется выполнять в каждой проверке загрузку или выгрузку крупного объекта. Это увеличивает нагрузку, стоимость запросов и время реакции.

## Итог

Оптимальная стратегия восстановления приложения при сбое внешнего хранилища состоит не в немедленном перезапуске всех контейнеров, а в последовательной реакции:

1. Readiness-проверка исключает неисправные поды из балансировки.
2. Приложение периодически проверяет восстановление хранилища.
3. После восстановления под автоматически возвращается в Service.
4. Liveness-проверка перезапускает только те процессы, которые действительно зависли и не смогли восстановиться самостоятельно.

Такая конфигурация применяется в Cloud Containers без установки дополнительного оператора и помогает избежать как обслуживания запросов неисправными экземплярами, так и бесконечных перезапусков во время продолжительного сбоя внешнего хранилища.
