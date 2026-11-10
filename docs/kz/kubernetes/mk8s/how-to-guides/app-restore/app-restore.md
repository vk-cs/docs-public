# {heading(Сыртқы сақтау құрылғысы қолжетімсіз болған кезде қосымшаларды автоматты қалпына келтіру)[id=mk8s-app]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Kubernetes-тегі қосымшалар жиі сыртқы сақтау құрылғыларына тәуелді болады: NFS-серверлері, файлдық шлюздер, S3-үйлесімді объектілік сақтау құрылғылары немесе CSI арқылы қосылатын томдар. Мұндай ресурс уақытша қолжетімсіз болған кезде енгізу-шығару операцияларының ілініп қалуына, қателердің жиналуына және пайдаланушыларға дұрыс емес жауаптардың қайтарылуына әкелуі мүмкін.

Managed Containers-те бұл мәселені Kubernetes-тің стандартты механизмдерімен шешуге болады: `readinessProbe`, `livenessProbe` және `startupProbe`. Олар ақаулы қосымша данасын уақытша балансировкадан шығарып, қажет болған жағдайда контейнерді автоматты түрде қайта іске қосуға мүмкіндік береді.

## {heading(Қалпына келтіру схемасы қалай жұмыс істеуі керек)[id=mk8s-app-schema]}

Сақтау құрылғысына рұқсат жоғалған кезде жүйенің реакциясын екі кезеңге бөлу қажет:

1. Мәселелі подқа трафик бағыттауды тоқтату. Бұл үшін `readinessProbe` қолданылады. Тексеру сәтсіз өтсе, под `NotReady` статусын алады және Kubernetes Service эндпоинттерінен шығарылады.

2. Қосымша өз бетінше қалпына келе алмаса, оны қайта іске қосу. Бұл үшін `livenessProbe` қолданылады. Бірнеше сәтсіз тексеруден кейін kubelet контейнерді қайта іске қосады.

Readiness- және liveness-тексерулер тәуелсіз жұмыс істейді: сәтсіз readiness-тексеру подты балансировкадан алып тастайды, ал сәтсіз liveness-тексеру контейнердің қайта іске қосылуына әкеледі.

{note:warn}
Контейнерді қайта іске қосу сыртқы сақтау құрылғысының өзін қалпына келтірмейді. Сондықтан liveness-тексеру тек қосымша сақтау құрылғысы қайтарылғаннан кейін ілініп қалған немесе дұрыс емес күйде қалған жағдайда ғана іске қосылуы керек. Әйтпесе, сақтау құрылғысының ұзақ істен шығуы шексіз рестарттарға әкеледі.
{/note}

## {heading({counter(app)}. Файлдық сақтау құрылғысын тексеруге арналған скрипт жасаңыз)[id=mk8s-app-script]}

Сыртқы сақтау құрылғысы контейнерге `/mnt/storage` жолы арқылы қосылған деп есептейік. Каталогты оқуды және қысқа жазу операциясын орындау мүмкіндігін тексеретін скрипт жасаңыз:

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

# timeout желіде немесе NFS-те ақаулар болған кезде тексерудің ілініп қалуына жол бермейді.
    timeout 3 stat "${STORAGE_PATH}" >/dev/null 2>&1 || exit 1

# Том тек оқу үшін қосылған болса, бұл бөлікті өшіріңіз.
    timeout 3 sh -c "touch '${CHECK_FILE}' && rm -f '${CHECK_FILE}'" \
      >/dev/null 2>&1 || exit 1
```

Тек оқу үшін қосылған сақтау құрылғысы үшін `stat` операциясы немесе алдын ала жасалған бақылау файлын оқу жеткілікті.

## {heading({counter(app)}. Deployment-ті баптаңыз)[id=mk8s-app-deployment]}

Скриптті подқа қосып, үш түрлі тексеруді баптаңыз:

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

{linkto(../../reference/pvs-and-pvcs#mk8s-pvs-and-pvcs)[text=PVC]} (`PersistentVolumeClaim`) қосымшаға нақты бұлттық инфрақұрылымдағы жүзеге асыру егжей-тегжейін білмей тұрақты сақтау құрылғысын пайдалануға мүмкіндік береді.

## {heading({counter(app)}. PVC жасаңыз)[id=mk8s-app-pvc]}

Мысалдағы Deployment `application-storage` атауы бар PVC-ді пайдаланады:

```yaml
persistentVolumeClaim:
  claimName: application-storage
```

Мұндай объект жасалмаған болса, под `Pending` күйінде қалады, ал оқиғаларда қате пайда болады:

```text
persistentvolumeclaim "application-storage" not found
```

PVC жасау үшін:

1. Кластерде қолжетімді {linkto(../../concepts/storage#mk8s-storage-storage-classes)[text=сақтау класстары]}н тексеріңіз:

   ```bash
   kubectl get storageclass
   ```

   Шығудың мысалы:

   ```text
   NAME                   PROVISIONER                    RECLAIMPOLICY   VOLUMEBINDINGMODE
   csi-ceph-ssd           cinder.csi.openstack.org       Delete          WaitForFirstConsumer
   csi-ceph-ssd (default) cinder.csi.openstack.org       Delete          WaitForFirstConsumer
   ```

   Сақтау класстарының атаулары кластердің конфигурациясына байланысты. `kubectl get storageclass` командасының шығуындағы нақты атауды пайдаланыңыз.

1. `application-storage-pvc.yaml` PVC-іне манифест жасаңыз:

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

   Томның сәтті {linkto(../../reference/pvs-and-pvcs#mk8s-pvs-and-pvcs-life-cycle)[text=динамикалық бөлінуі]}нен кейін статус `Bound` болуы керек:

   ```text
   NAME                  STATUS   VOLUME                                     CAPACITY   ACCESS MODES
   application-storage   Bound    pvc-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx   10Gi       RWO
   ```

   Кластерде әдепкі сақтау класы болса, `storageClassName` өрісін көрсетпеуге болады:

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

`ReadWriteOnce` рұқсаты әдетте томды жазу үшін бір түйінге қосуға мүмкіндік береді. Қосымшаның бірнеше репликасы бір мезгілде бір файлдық жүйені пайдалануы керек болса, `ReadWriteMany` қолдайтын сақтау құрылғысы қажет, мысалы NFS-үйлесімді CSI-драйвер. Барлық сақтау класстары бұл режимді қолдай бермейді.

## {heading({counter(app)}. Манифесттерді дұрыс ретпен қолданыңыз)[id=mk8s-app-manifests]}

1. Алдымен ConfigMap пен PVC-ді жасаңыз, содан кейін Deployment-ті:

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

## {heading({counter(app)}. Қалпына келтіру сценарийін тексеріңіз)[id=mk8s-app-script-check]}

1. Қосымшаның барлық даналары дайын екенін тексеріңіз:

   ```bash
   kubectl get pods -l app=storage-dependent-app
   ```

1. Сынақ сақтау құрылғысына рұқсатты уақытша жабыңыз немесе оның желілік ережелерін өзгертіңіз. Біраз уақыттан кейін под `NotReady` күйіне өтуі керек:

   ```bash
   kubectl describe pod <pod-name>
   kubectl get endpoints
   ```

   Рұқсат қалпына келтірілгеннен кейін readiness-тексеру қайтадан сәтті өтуі және под автоматты түрде балансировкаға оралуы керек.

1. Қайта іске қосу санын тексеріңіз:

   ```bash
   kubectl get pods \
     -l app=storage-dependent-app \
     -o custom-columns=NAME:.metadata.name,READY:.status.containerStatuses[0].ready,RESTARTS:.status.containerStatuses[0].restartCount
   ```

## {heading(Тексерулер неге дәл осылай бапталған)[id=mk8s-app-probes]}

### {heading(Startup probe)[id=mk8s-app-startup]}

`startupProbe` қосымшаға іске қосу кезінде сақтау құрылғысының қосылуын күтуге уақыт береді. Ол сәтті аяқталмайынша Kubernetes liveness- және readiness-тексерулерді орындамайды.

Келтірілген мысалдағы максималды күту уақыты:

```text
60 × 5 секунд = 300 секунд
```

Мұндай тәсіл баяу іске қосылатын контейнерлерді мерзімінен бұрын қайта іске қосылуға қорғайды.

### {heading(Readiness probe)[id=mk8s-app-readiness]}

Readiness-тексеру сақтау құрылғысының қолжетімділігін тікелей бақылайды. Екі қатеден кейін под шамамен 20 секундтан кейін балансировкадан шығарылады.

Сақтау құрылғысы қайтадан қолжетімді болғанда, тексеру сәтті аяқталады, под автоматты түрде `Ready` статусын алады және Service-ке оралады. Deployment-ті қолмен қайта жасаудың қажеті жоқ.

### {heading(Liveness probe)[id=mk8s-app-liveness]}

Liveness сақтау құрылғысының өзін емес, процестің ішкі күйін тексеруі керек. Мысалы, `/health/live` эндпоинті мыналарды анықтай алады:

- қосымшаның негізгі циклі жұмыс істеп тұр ма;
- ағындар пулы таусылмаған ба;
- енгізу-шығару операциялары ілініп қалған жоқ па;
- қосымша байланыс қалпына келтірілгеннен кейін жаңа сұрауды өңдей ала ма.

Қосымша ілініп қалса, kubelet контейнерді қайта іске қосады. Deployment контейнерлері үшін `restartPolicy: Always` саясаты қолданылады, сондықтан аяқталған немесе ақаулы деп танылған контейнер қайта іске қосылады.

## {heading(Практикалық ұсыныстар)[id=mk8s-app-recs]}

- `health check`-те ұзақ операцияларды орындамаңыз және үлкен файлдарды тексермейңіз.
- Тексеру уақытын `timeout` көмегімен шектеңіз.
- Қосымшаға шынымен қажет операцияларды ғана тексеріңіз.
- Liveness-тексерді тікелей сыртқы ресурсқа бағыттамаңыз.
- Read-only томдар үшін `probe`-те `touch`, `mkdir` және басқа жазу операцияларын пайдаланбаңыз.
- Қосымшаның бірнеше репликасын баптаңыз.
- `PodDisruptionBudget` қосыңыз.
- Подтарды әртүрлі worker-түйіндерге таратыңыз.
- NFS-ке ілініп қалған жүйелік шақырулар кезінде қосымшаның мінез-құлқын тексеріңіз.
- Қосымшаның өзіне тайм-ауттар, қайталама әрекеттер және circuit breaker қосыңыз.

Түрлі мақсаттар үшін түрлі тексерулерді пайдаланыңыз:

| Тексеру | Мақсаты                                            |
|---|-------------------------------------------------------|
| `readinessProbe` | Подқа қазір сұрауларды бағыттауға бола ма              |
| `livenessProbe` | Процесс қайта іске қоспай жұмысты жалғастыра ала ма |
| `startupProbe` | Қосымша толық іске қосуға үлгерді ме            |

## {heading(Мониторинг)[id=mk8s-app-monitoring]}

Тұрақты бақылау үшін мыналарды бақылау ұсынылады:

- `NotReady` күйіндегі подтар саны;
- `restartCount` өсуі;
- сақтау құрылғысына қосылу қателері;
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

## S3-үйлесімді сақтау құрылғысының ерекшеліктері

Қосымша mountingеленген файлдық томды емес, объектілік сақтау құрылғысын пайдаланса, `stat` және `ls` тексерулерін алдын ала жасалған объектіге қысқа оқу сұрауымен ауыстыру керек.

Мысалы, health check мыналарды жасай алады:

1. эндпоинттің DNS-шешілуін тексеру;
2. TLS-байланысты орнату;
3. бақылау объектісіне `HEAD`-сұрауын орындау;
4. жауап кодын тексеру;
5. тайм-аут бойынша аяқталу.

Әр тексеруде үлкен объектіні жүктеуді немесе жүктеп салуға болмайды. Бұл жүктемені, сұраулар құнын және реакция уақытын арттырады.

## Қорытынды

Сыртқы сақтау құрылғысы істен шыққан кезде қосымшаны қалпына келтірудің оңтайлы стратегиясы барлық контейнерлерді бірден қайта іске қосу емес, біртіндеп реакция жасау:

1. Readiness-тексеру ақаулы подтарды балансировкадан шығарады.
2. Қосымша сақтау құрылғысының қалпына келуін мерзімді түрде тексеріп тұрады.
3. Қалпына келтірілгеннен кейін под автоматты түрде Service-ке оралады.
4. Liveness-тексеру шынымен ілініп қалып, өз бетінше қалпына келе алмаған процестерді ғана қайта іске қосады.

Мұндай конфигурация Managed Containers-те қосымша операторды орнатпай-ақ қолданылады және ақаулы даналардың сұрауларды өңдеуіне де, сыртқы сақтау құрылғысының ұзақ істен шығуы кезіндегі шексіз қайта іске қосуға да жол бермейді.