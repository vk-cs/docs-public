# {heading(Қолмен резервтік көшіру)[id=k8s-velero-backup]}

{include(/kz/_includes/_translated_by_ai.md)}

[Velero](https://velero.io/docs/main/) құралын кластер деректерінің резервтік көшірмелерін қолмен жасау және оларды қалпына келтіру үшін пайдаланыңыз.

{note:info}
Резервтік көшіру үшін Velero пайдалану тек {linkto(../../../concepts/cluster-generations#k8s-cluster-generations)[text=бірінші буын]} кластерлерінде ғана қолдау көрсетіледі.
{/note}

## {heading(Дайындық қадамдары)[id=k8s-velero-backup-prepare]}

{include(/kz/_includes/_create-test-cluster.md)}

   `ME1` қолжетімділік аймағында бір немесе бірнеше worker-түйіндер тобын орналастырыңыз. Кластердің қалған параметрлерін өз қалауыңыз бойынша таңдаңыз.

1. {linkto(../../../connect/kubectl#k8s-kubectl)[text=Көз жеткізіңіз]}, `kubectl` көмегімен кластерге қосыла алатыныңызға.
1. {linkto(../../../install-tools/velero#k8s-velero)[text=Орнатып, баптаңыз]} Velero, егер бұл әлі жасалмаса.
1. {linkto(/kz/tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=Орнатыңыз]} OpenStack CLI, егер бұл әлі жасалмаса. Оның көмегімен бұлтта авторизациялана алатыныңызға көз жеткізіңіз.

## {heading(1. Қосымшаны жасаңыз)[id=k8s-velero-backup-create-app]}

Резервтік көшірмені жасау және одан қалпына келтірумен танысу үшін `coffee` демо-қосымшасын жасаңыз. Бұл қосымшаға тұрақты том (persistent volume) қосылады.

1. Манифест файлын жасаңыз:

   {cut(coffee.yaml)}

   ```yaml
   apiVersion: v1
   kind: Namespace
   metadata:
     name: example-app

   ---
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: coffee-pvc
     namespace: example-app
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 1Gi
     storageClassName: "csi-ceph-hdd-gz1"

   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: coffee
     namespace: example-app
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: coffee
     template:
       metadata:
         labels:
           app: coffee
       spec:
         volumes:
           - name: coffee-volume
             persistentVolumeClaim:
               claimName: coffee-pvc
         initContainers:
           - name: write-html-for-nginx
             image: busybox
             volumeMounts:
               - name: coffee-volume
                 mountPath: /usr/share/nginx/html
             command: ["/bin/sh", "-c"]
             args:
               [
                 'echo "The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume." > /usr/share/nginx/html/index.html',
               ]
         containers:
           - name: coffee
             image: nginxdemos/nginx-hello
             volumeMounts:
               - name: coffee-volume
                 mountPath: /usr/share/nginx/html
             ports:
               - containerPort: 8080

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc
     namespace: example-app
   spec:
     type: LoadBalancer
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: coffee
   ```

   {/cut}

1. Манифест негізінде қажетті Kubernetes ресурстарын жасаңыз:

   ```console
   kubectl apply -f coffee.yaml
   ```

   Қосымшаның жұмысына қажетті барлық Kubernetes ресурстары `example-app` жеке аттар кеңістігіне (namespace) орналастырылады.

1. Тұрақты том үшін диск жасалғанына көз жеткізіңіз:

   1. Қосымша үшін жасалған тұрақты томды табыңыз:

      ```console
      kubectl get pv -n example-app
      ```

      Шығарылған кестеден `CLAIM` бағанында `example-app/coffee-pvc` көрсетілген тұрақты томның ID-сін табыңыз:

      ```text
      NAME                    ...   STATUS   CLAIM                    ...
      ...                     ...   ...      ...                      ...
      <ID_ПОСТОЯННОГО_ТОМА>   ...   Bound    example-app/coffee-pvc   ...
      ```

   1. Жасалған тұрақты том үшін диск ID-сін алыңыз:

      ```console
      kubectl describe pv <ID_ПОСТОЯННОГО_ТОМА> -n example-app
      ```

      Команда шығысында диск ID-сі `VolumeHandle` параметрінде болады:

      ```text
      ...
      Source:
          Type:              CSI (a Container Storage Interface (CSI) volume source)
          Driver:            cinder.csi.openstack.org
          FSType:            ...
          VolumeHandle:      <ID_ДИСКА>
          ...
      ```

   1. Осындай ID-і бар диск туралы толық ақпаратты OpenStack CLI пайдаланып алыңыз:

      ```console
      openstack volume show <ID_ДИСКА> --fit-width
      ```

1. Жүктеме теңгергішіне жария IP-мекенжай тағайындалғанша күтіңіз.

   Теңгергіштің күйін мерзімді түрде тексеріп отырыңыз:

   ```console
   kubectl get svc -n example-app
   ```

   `EXTERNAL-IP` бағанында теңгергішке тағайындалған жария IP-мекенжай пайда болуы керек.

1. NGINX сұрауларға жауап беретініне көз жеткізіңіз:

   ```console
   curl <ПУБЛИЧНЫЙ_IP_АДРЕС_БАЛАНСИРОВЩИКА>
   ```

   Келесі мәтін шығарылуы керек:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

## {heading(2. Қосымшаның резервтік көшірмесін жасаңыз)[id=k8s-velero-backup-create]}

1. Қосымшаның жұмысына қажетті ресурстар орналасқан `example-app` аттар кеңістігінің толық қолмен резервтік көшірмесін жасаңыз:

   ```console
   velero backup create coffee-backup --include-namespaces example-app
   ```

1. Резервтік көшірме туралы егжей-тегжейлі ақпаратты жүктеңіз:

   ```console
   velero backup describe coffee-backup
   ```

   {note:warn}

   Әдепкі бойынша резервтік көшірменің өмір сүру уақыты – 720 сағат. Осы уақыт өткеннен кейін резервтік көшірме жойылады.

   {/note}

1. (Опционалды) Резервтік көшіру операциясының логтарын қараңыз:

   ```console
   velero backup logs coffee-backup
   ```
1. (Опционалды) {linkto(../../../how-to-guides/velero/backup-schedule#k8s-backup-schedule)[text=Баптаңыз]} резервтік көшірмелерді автоматты түрде жасау кестесін.

## {heading(3. Қосымшаны резервтік көшірмеден қалпына келтіріңіз)[id=k8s-velero-backup-restore]}

1. Қосымшаның істен шығуын имитациялаңыз. Ол үшін қосымшаның жұмысына қажетті ресурстар орналасқан `example-app` аттар кеңістігін жойыңыз:

   ```console
   kubectl delete ns example-app
   ```

1. Бұрын жасалған резервтік көшірмеден қалпына келтіруді орындаңыз:

   ```console
   velero restore create --from-backup coffee-backup
   ```

   Команда деректерді резервтік көшіру орындалған сол кластерге қалпына келтіреді. Егер деректерді жаңа кластерге қалпына келтіру қажет болса:

   1. {linkto(../../../instructions/create-cluster/create-webui#k8s-create-webui)[text=Жасаңыз]} кластер.
   1. {linkto(../../../install-tools/velero#k8s-velero)[text=Орнатыңыз Velero]} кластерге.
   1. Жоғарыда келтірілген команданы орындаңыз.

1. Жүктеме теңгергішіне жария IP-мекенжай тағайындалғанша күтіңіз.

   Теңгергіштің күйін мерзімді түрде тексеріп отырыңыз:

   ```console
   kubectl get svc -n example-app
   ```

   `EXTERNAL-IP` бағанында теңгергішке тағайындалған жария IP-мекенжай пайда болуы керек.

1. NGINX сұрауларға жауап беретініне көз жеткізіңіз:

   ```console
   curl <ПУБЛИЧНЫЙ_IP_АДРЕС_БАЛАНСИРОВЩИКА>
   ```

   Келесі мәтін шығарылуы керек:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=k8s-velero-backup-delete]}

Жұмыс істеп тұрған кластер тарифтеледі және есептеу ресурстарын тұтынады. Егер Velero құралы мен оның көмегімен резервтік көшіруді тексеру үшін жасалған Kubernetes ресурстары енді қажет болмаса, оларды жойыңыз:

1. Жасалған `example-app` аттар кеңістігін және онымен байланысты ресурстарды, сондай-ақ жасалған резервтік көшірмені жойыңыз:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   kubectl delete ns example-app
   velero backup delete coffee-backup

   ```

   {/tab}

   {tab(Windows)}

   ```console
   kubectl delete ns example-app; `
   velero backup delete coffee-backup
   ```

   {/tab}

   {/tabs}

1. Velero-ны жойыңыз:

   ```console
   velero uninstall
   ```

1. {linkto(/kz/storage/s3/instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Жойыңыз]} Velero пайдаланған бакеттен резервтік көшірмелерді.

   Қажет болса, сондай-ақ {linkto(/kz/storage/s3/instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=бакеттің өзін де жойыңыз]}.

{ifdef(public)}
{include(/kz/_includes/_delete-test-cluster-short.md)}
{/ifdef}
