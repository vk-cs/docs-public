# {heading(Сыртқы жад қолжетімсіз болғандағы қолданбаларды автоматты қалпына келтіру)[id=k8s-app]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Kubernetes-тегі қолданбалар жиі сыртқы жадтарға тәуелді болады: NFS-серверлеріне, файлдық шлюздарға, S3-үйлесімді объектілік жадтарға немесе CSI арқылы қосылатын томдарға. Мұндай ресурс уақытша қолжетімсіз болуы енгізу-шығару операцияларының ілініп қалуына, қателердің жинақталуына және пайдаланушыларға дұрыс емес жауаптардың қайтарылуына әкелуі мүмкін.

Managed Containers-та бұл мәселені Kubernetes-тің стандартты механизмдерімен шешуге болады: `readinessProbe`, `livenessProbe` және `startupProbe`. Олар ақаулы қолданба данасын уақытша балансирукалаудан алып тастауға, ал қажет болған жағдайда контейнерді автоматты түрде қайта іске қосуға мүмкіндік береді.

## {heading(Қалпына келтіру схемасы қалай жұмыс істеуі керек)[id=k8s-app-schema]}

Жадқа қолжетімділік жоғалғанда жүйенің реакциясын екі кезеңге бөлу қажет:

1. Проблемалық подқа трафик бағыттауды тоқтату. Мұны `readinessProbe` көмегімен жасайды. Тексеру өтпесе, под `NotReady` статусын алады және Kubernetes Service эндпоинттерінен шығарылады.

2. Қолданба өз бетінше қалпына келе алмаса, оны қайта іске қосу. Мұны `livenessProbe` көмегімен жасайды. Бірнеше сәтсіз тексеруден кейін kubelet контейнерді қайта іске қосады.

Readiness- және liveness-тексерулер тәуелсіз жұмыс істейді: сәтсіз readiness-тексеру подты балансировкадан алып тастайды, ал сәтсіз liveness-тексеру контейнердің қайта іске қосылуына әкеледі.

{note:warn}
Контейнерді қайта іске қосу сыртқы жадтың өзін қалпына келтірмейді. Сондықтан liveness-тексеру тек қолданба жад қайта оралып, ілініп қалған немесе дұрыс емес күйде қалған жағдайда ғана іске қосу керек. Әйтпесе, жадтың ұзаққа созылған істен шығуы шексіз қайта іске қосуларды тудырады.
{/note}

## {heading({counter(app)}. Файлдық жадты тексеруге арналған скрипт жасаңыз)[id=k8s-app-script]}

Сыртқы жад контейнерге `/mnt/storage` жолы арқылы қосылған деп есептейік. Каталогты оқуды және қысқа жазу операциясын орындау мүмкіндігін тексеретін скрипт жасаңыз:

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

# timeout желі немесе NFS мәселелері кезінде тексерудің ілініп қалуына жол бермейді.
    timeout 3 stat "${STORAGE_PATH}" >/dev/null 2>&1 || exit 1

# Том тек оқу үшін қосылған болса, бұл бөлікті өшіріңіз.
    timeout 3 sh -c "touch '${CHECK_FILE}' && rm -f '${CHECK_FILE}'" \
      >/dev/null 2>&1 || exit 1
```

Тек оқу үшін қосылған жад үшін `stat` операциясы немесе алдын ала жасалған бақылау файлын оқу жеткілікті.

## {heading({counter(app)}. Deployment-ті баптаңыз)[id=k8s-app-deployment]}

Скриптті подқа қосыңыз және үш түрлі тексеруді баптаңыз:

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

[PVC](/kz/kubernetes/k8s/reference/pvs-and-pvcs#k8s-pvs-and-pvcs) (`PersistentVolumeClaim`) қолданбаға нақты бұлттық инфрақұрылымдағы іске асыру егжей-тегжейлерін білмей, тұрақты жадты пайдалануға мүмкіндік береді.

## {heading({counter(app)}. PVC жасаңыз)[id=k8s-app-pvc]}

Мысалдағы Deployment `application-storage` атауымен PVC пайдаланады:

```yaml
persistentVolumeClaim:
  claimName: application-storage
```

Мұндай объект жасалмаған болса, под `Pending` күйінде қалады, ал оқиғаларда қате пайда болады:

```text
persistentvolumeclaim "application-storage" not found
```

PVC жасау үшін:

1. Кластерде қолжетімді [жад класстарын](/kz/kubernetes/k8s/concepts/storage#k8s-storage-storage-classes) тексеріңіз:

   ```bash
   kubectl get storageclass
   ```

   Шығудың мысалы:

   ```text
   NAME                   PROVISIONER                    RECLAIMPOLICY   VOLUMEBINDINGMODE
   csi-ceph-ssd           cinder.csi.openstack.org       Delete          WaitForFirstConsumer
   csi-ceph-ssd (default) cinder.csi.openstack.org       Delete          WaitForFirstConsumer
   ```

   Жад класстарының атаулары кластердің конфигурациясына байланысты. `kubectl get storageclass` командасының шығуынан нақты атауды пайдаланыңыз.

1. `application-storage-pvc.yaml` PVC үшін манифест жасаңыз:

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

1. Манифестті қолданыңыз:

   ```bash
   kubectl apply -f application-storage-pvc.yaml
   ```

1. PVC күйін тексеріңіз:

   ```bash
   kubectl get pvc application-storage
   ```

   [Динамикалық бөлудің](/kz/kubernetes/k8s/reference/pvs-and-pvcs#k8s-pvs-and-pvcs-life-cycle) сәтті өтуінен кейін томның статусы `Bound` болуы керек:

   ```text
   NAME                  STATUS   VOLUME                                     CAPACITY   ACCESS MODES
   application-storage   Bound    pvc-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx   10Gi       RWO
   ```

   Кластерде әдепкі жад классы болса, `storageClassName` өрісін көрсетпеуге болады:

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

`ReadWriteOnce` қолжетімділігі әдетте томды бір түйінге жазу үшін қосуға мүмкіндік береді. Қолданбаның бірнеше репликасы бір мезгілде бір файлдық жүйені пайдалануы керек болса, `ReadWriteMany` режимін қолдайтын жад қажет, мысалы NFS-үйлесімді CSI-драйвер. Барлық жад класстары бұл режимді қолдай бермейді.

## {heading({counter(app)}. Манифесттерді дұрыс ретпен қолданыңыз)[id=k8s-app-manifests]}

1. Алдымен ConfigMap және PVC жасаңыз, содан кейін Deployment:

   ```bash
   kubectl apply -f storage-healthcheck.yaml
   kubectl apply -f application-storage-pvc.yaml
   kubectl apply -f deployment.yaml
   ```

1. Байланысты ресурстарды тексеріңіз:

   ```bash
   kubectl get pvc
   kubectl get pods -l app=storage-dependent-app
   kubectl describe pod <pod-name>
   ```

## {heading({counter(app)}. Қалпына келтіру сценарийін тексеріңіз)[id=k8s-app-script-check]}

1. Қолданбаның барлық даналары дайын екеніне көз жеткізіңіз:

   ```bash
   kubectl get pods -l app=storage-dependent-app
   ```

1. Тестілік жадқа қолжетімділікті уақытша блоктаңыз немесе оның желілік ережелерін өзгертіңіз. Біраз уақыттан кейін под `NotReady` күйіне өтуі керек:

   ```bash
   kubectl describe pod <pod-name>
   kubectl get endpoints
   ```

   Қолжетімділік қалпына келгеннен кейін readiness-тексеру қайтадан сәтті аяқталуы және под автоматты түрде балансировкаға оралуы керек.

1. Қайта іске қосулар санын тексеріңіз:

   ```bash
   kubectl get pods \
     -l app=storage-dependent-app \
     -o custom-columns=NAME:.metadata.name,READY:.status.containerStatuses[0].ready,RESTARTS:.status.containerStatuses[0].restartCount
   ```

## {heading(Тексерулер неге дәл осылай бапталған)[id=k8s-app-probes]}

### {heading(Startup probe)[id=k8s-app-startup]}

`startupProbe` қолданбаға іске қосу кезінде жадтың қосылуын күту уақытын береді. Ол сәтті аяқталмайынша, Kubernetes liveness- және readiness-тексерулерді орындамайды.

Келтірілген мысалдағы күтудің максималды уақыты:

```text
60 × 5 секунд = 300 секунд
```

Мұндай тәсіл баяу іске қосылатын контейнерлерді мерзімінен бұрын қайта іске қосылудан қорғайды.

### {heading(Readiness probe)[id=k8s-app-readiness]}

Readiness-тексеру жадтың қолжетімділігін тікелей бақылайды. Екі қатеден кейін под шамамен 20 секундтан кейін балансировкадан шығарылады.

Жад қайтадан қолжетімді болғанда, тексеру сәтті аяқталады, под автоматты түрде `Ready` статусын алады және Service-ке оралады. Deployment-ті қолмен қайта жасаудың қажеті жоқ.

### {heading(Liveness probe)[id=k8s-app-liveness]}

Liveness жадтың өзін емес, процестің ішкі күйін тексеруі керек. Мысалы, `/health/live` эндпоинті мыналарды анықтай алады:

- қолданбаның негізгі циклі жұмыс істей ме;
- ағындар пулы таусылған жоқ па;
- енгізу-шығару операциялары ілініп қалған жоқ па;
- қосылым қалпына келгеннен кейін қолданба жаңа сұрауды өңдей ала ма.

Қолданба ілініп қалса, kubelet контейнерді қайта іске қосады. Deployment контейнерлері үшін `restartPolicy: Always` саясаты қолданылады, сондықтан аяқталған немесе ақаулы деп танылған контейнер қайта іске қосылады.

## {heading(Практикалық ұсыныстар)[id=k8s-app-recs]}

- `health check` ішінде ұзақ операцияларды орындамаңыз және үлкен файлдарды тексермейңіз.
- Тексеру уақытын `timeout` көмегімен шектеңіз.
- Қолданбаға шынымен қажет операцияларды ғана тексеріңіз.
- Liveness-тексерді тікелей сыртқы ресурқа бағыттамаңыз.
- Read-only томдар үшін `probe` ішінде `touch`, `mkdir` және басқа жазу операцияларын пайдаланбаңыз.
- Қолданбаның бірнеше репликасын баптаңыз.
- `PodDisruptionBudget` қосыңыз.
- Подтарды әртүрлі worker-түйіндерге таратыңыз.
- NFS-ке ілініп қалған жүйелік шақырулар кезіндегі қолданбаның мінез-құлқын тексеріңіз.
- Тайм-ауттарды, қайталау әрекеттерін және circuit breaker-ді өзі қолданбаға қосыңыз.

Әртүрлі мақсаттар үшін әртүрлі тексерулерді пайдаланыңыз:

| Тексеру | Мақсаты                                              |
|---|-------------------------------------------------------|
| `readinessProbe` | Подқа қазір сұрауларды бағыттауға бола ма              |
| `livenessProbe` | Процесс қайта іске қоспай жұмысты жалғастыра ала ма |
| `startupProbe` | Қолданба толық іске қосуға үлгерді ме            |

## {heading(Мониторинг)[id=k8s-app-monitoring]}

Тұрақты бақылау үшін мыналарды бақылау ұсынылады:

- `NotReady` күйіндегі подтар саны;
- `restartCount` өсуі;
- жадқа қосылу қателері;
- оқу және жазу операцияларының тайм-ауттары;
- енгізу-шығару операцияларының ұзақтығы;
- Deployment күйі;
- `Unhealthy`, `FailedMount` және `FailedAttachVolume` себептері бар Kubernetes оқиғалары.

Командалар мысалдары:

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

## S3-үйлесімді жадтың ерекшеліктері

Қолданба монтаждалған файлдық томды емес, объектілік жадты пайдаланса, `stat` және `ls` тексерулерін алдын ала жасалған объектіге қысқа оқу сұрауына ауыстыру керек.

Мысалы, health check мыналарды жасай алады:

1. эндпоинттің DNS-аударын тексеру;
2. TLS-қосылымды орнату;
3. бақылау объектісіне `HEAD`-сұрауын орындау;
4. жауап кодын тексеру;
5. тайм-аут бойынша аяқтау.

Әрбір тексеруде үлкен объектіні жүктеуді немесе жүктеп сілтемені орындау ұсынылмайды. Бұл жүктемені, сұраулардың құнын және реакция уақытын арттырады.

## Қорытынды

Сыртқы жад сәтсіздікке ұшырағанда қолданбаны қалпына келтірудің оңтайлы стратегиясы — барлық контейнерлерді бірден қайта іске қосу емес, дәйекті реакция:

1. Readiness-тексеру ақаулы подтарды балансировкадан шығарады.
2. Қолданба жадтың қалпына келуін мерзімді түрде тексеріп отырады.
3. Қалпына келгеннен кейін под автоматты түрде Service-ке оралады.
4. Liveness-тексеру тек шынымен ілініп қалып, өз бетінше қалпына келе алмаған процестерді ғана қайта іске қосады.

Мұндай конфигурация Managed Containers-те қосымша оператор орнатпай-ақ қолданылады және ақаулы даналардың сұрауларды өңдеуін де, сыртқы жадтың ұзақ істен шығуы кезіндегі шексіз қайта іске қосуларды да болдырмауға көмектеседі.