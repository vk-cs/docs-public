{includetag(overview)}
Кластер деректерінің резервтік көшірмелерін қолмен жасау және оларды қалпына келтіру үшін [Velero](https://velero.io/docs/main/) құралын пайдаланыңыз.
{/includetag}

{includetag(prep)}

{ifdef(public)}
{include(/kz/_includes/_create-test-cluster.md)[tags=magnum]}
   `ME1` қолжетімділік аймағында бір немесе бірнеше worker-түйіндер тобын орналастырыңыз. Кластердің қалған параметрлерін өз қалауыңыз бойынша таңдаңыз.
1. {linkto(../../../connect/kubectl)[text=Көз жеткізіңіз]}, `kubectl` көмегімен кластерге қосыла алатыныңызға.
1. {linkto(../../../install-tools/velero#k8s-velero)[text=Орнатып, баптаңыз]} Velero, егер бұл әлі жасалмаса.
1. {linkto(/kz/tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=Орнатыңыз]} OpenStack CLI, егер бұл әлі жасалмаса. Оның көмегімен бұлтта авторизациялана алатыныңызға көз жеткізіңіз.
   {/ifdef}

{ifndef(public)}
1. {var(cloud)} {linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=жеке кабинетіне кіре алатыныңызға]} көз жеткізіңіз.
1. {linkto(../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=OpenStack CLI-ге қосыла алатыныңызға]} көз жеткізіңіз.
1. Kubernetes {linkto(../../concepts/flavors#k8s-flavors-vm-flavor)[text=кластерінің түрі]} Standard-6-6-дан төмен емес екеніне көз жеткізіңіз.
1. Кластерге {linkto(../../connect/kubectl)[text=kubectl көмегімен қосыла алатыныңызға]} көз жеткізіңіз.
1. {linkto(../../install-tools/velero#k8s-velero)[text=Velero орнатылып, бапталғанына]} көз жеткізіңіз.
   {/ifndef}

{/includetag}

{includetag(create-app)}

Резервтік көшірме жасаумен және одан қалпына келтірумен танысу үшін `coffee` демо-қосымшасын жасаңыз. Бұл қосымшаға тұрақты том (persistent volume) қосылады.

1. Манифест файлын{ifdef(public)} worker-түйіндер тобыңыз орналасқан қолжетімділік аймағындағы {linkto(../../../concepts/storage#mk8s-storage-storage-classes)[text=сақтау класын]} көрсете отырып{/ifdef} жасаңыз:

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
     storageClassName: "<САҚТАУ_КЛАСЫ>"
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

1. Манифестті кластерге қолданыңыз:

   ```console
   kubectl apply -f coffee.yaml
   ```

   Манифест қосымшаның жұмысына қажетті барлық Kubernetes ресурстарын `example-app` аттар кеңістігінде жасайды.

1. Тұрақты том үшін диск жасалғанына көз жеткізіңіз:

    1. Қосымша үшін жасалған тұрақты томды табыңыз:

       ```console
       kubectl get pv -n example-app
       ```

       Шығыста `CLAIM` бағанында `example-app/coffee-pvc` көрсетілген тұрақты томның идентификаторын табыңыз.
       Команда шығысының мысалы:

       ```text
       NAME                    ...   STATUS   CLAIM                    ...
       ...                     ...   ...      ...                      ...
       <ID_ПОСТОЯННОГО_ТОМА>   ...   Bound    example-app/coffee-pvc   ...
       ```

    1. Жасалған тұрақты том үшін диск идентификаторын алыңыз:

       ```console
       kubectl describe pv <ID_ПОСТОЯННОГО_ТОМА> -n example-app
       ```

       Команда шығысында диск идентификаторы `VolumeHandle` параметрінде болады.
       Шығыс мысалы:

       ```text
       ...
       Source:
           Type:          CSI (a Container Storage Interface (CSI) volume source)
           Driver:        cinder.csi.openstack.org
           FSType:        ...
           VolumeHandle:  <ID_ДИСКА>
           ...
       ```

    1. OpenStack CLI пайдаланып, осындай идентификаторы бар диск туралы толық ақпаратты алыңыз:

       ```console
       openstack volume show <ID_ДИСКА> --fit-width
       ```

1. Теңгергішке {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-мекенжайы]} тағайындалғанын күтіңіз.

   Теңгергіштің күйін мерзімді түрде тексеріп отырыңыз:

   ```console
   kubectl get svc -n example-app
   ```

   `EXTERNAL-IP` бағанында теңгергішке тағайындалған Floating IP-мекенжайы пайда болуы тиіс.

1. NGINX сұрауларға жауап беретініне көз жеткізіңіз:

   ```console
   curl <FLOATING_IP_АДРЕС_БАЛАНСИРОВЩИКА>
   ```

   Күтілетін нәтиже:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

{/includetag}

{includetag(create-copy)}

1. Қосымшаның жұмысына қажетті ресурстар орналасқан `example-app` аттар кеңістігінің толық қолмен резервтік көшірмесін жасаңыз:

   ```console
   velero backup create coffee-backup --include-namespaces example-app
   ```

1. Резервтік көшірме туралы егжей-тегжейлі ақпаратты жүктеңіз:

   ```console
   velero backup describe coffee-backup
   ```

   {note:warn}
   Резервтік көшірменің әдепкі өмір сүру уақыты – 720 сағат. Осы уақыт өткеннен кейін резервтік көшірме жойылады.
   {/note}

1. (Опционалды түрде) Резервтік көшіру операциясының логтарын қараңыз:

   ```console
   velero backup logs coffee-backup
   ```

{ifdef(public)}
1. (Опционалды түрде) Резервтік көшірмелерді автоматты түрде жасау кестесін {linkto(../../../how-to-guides/velero/backup-schedule#k8s-backup-schedule)[text=баптаңыз]}.
   {/ifdef}
   {ifndef(public)}
1. (Опционалды түрде) Резервтік көшірмелерді кесте бойынша автоматты түрде жасауды баптаңыз. Толығырақ — Velero анықтамасында:

   ```console
   velero help
   ```
{/ifndef}

{/includetag}

{includetag(backup)}

1. Қосымшаның істен шығуын имитациялаңыз. Ол үшін қосымшаның жұмысына қажетті ресурстар орналасқан `example-app` аттар кеңістігін жойыңыз:

   ```console
   kubectl delete ns example-app
   ```

1. Бұрын жасалған резервтік көшірмеден ресурстарды қалпына келтіріңіз:

   ```console
   velero restore create --from-backup coffee-backup
   ```

   Деректер резервтік көшіру орындалған сол кластерде қалпына келтіріледі. Деректерді жаңа кластерге қалпына келтіру қажет болса:

   {ifdef(public)}
    1. Кластерді {linkto(../../../instructions/create-cluster/create-webui#k8s-create-webui)[text=жасаңыз]}.
    1. Кластерге {linkto(../../../install-tools/velero#k8s-velero)[text=Velero орнатыңыз]}.
    1. Жоғарыда келтірілген команданы орындаңыз.
       {/ifdef}
       {ifndef(public)}
    1. Кластер жасаңыз.
    1. Кластерге Velero орнатыңыз.
    1. Жоғарыда келтірілген команданы орындаңыз.
       {/ifndef}

1. Теңгергішке {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-мекенжайы]} тағайындалғанын күтіңіз.

   Теңгергіштің күйін мерзімді түрде тексеріп отырыңыз:

   ```console
   kubectl get svc -n example-app
   ```

   `EXTERNAL-IP` бағанында теңгергішке тағайындалған Floating IP-мекенжайы пайда болуы тиіс.

1. NGINX сұрауларға жауап беретініне көз жеткізіңіз:

   ```console
   curl <FLOATING_IP_АДРЕС_БАЛАНСИРОВЩИКА>
   ```

   Күтілетін нәтиже:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

{/includetag}

{includetag(delete)}

{ifdef(public)}
Жұмыс істеп тұрған кластер тарифтеледі және есептеу ресурстарын тұтынады.
{/ifdef}
{ifndef(public)}
Жұмыс істеп тұрған кластер есептеу ресурстарын тұтынады.
{/ifndef}
Егер Velero құралы мен резервтік көшіруді тексеру үшін жасалған Kubernetes ресурстары енді қажет болмаса, оларды жойыңыз:

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

{ifdef(public)}
1. Velero пайдаланған бакеттен резервтік көшірмелерді {linkto(/kz/storage/s3/instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=жойыңыз]}.

   Қажет болса, {linkto(/kz/storage/s3/instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=бакеттің өзін де жойыңыз]}.
   {/ifdef}
   {ifndef(public)}
1. Velero пайдаланған бакеттен қолданылмайтын резервтік көшірмелерді жойыңыз.

   Қажет болса, бакеттің өзін де жойыңыз.

1. Есептеу ресурстарының тұтынылуын азайту үшін қолданылмайтын кластерді жойыңыз:

    * {linkto(../../instructions/manage-cluster#k8s-manage-cluster-stop)[text=Кластерді тоқтатыңыз]}.
    * {linkto(../../instructions/manage-cluster#k8s-manage-cluster-delete)[text=Кластерді жойыңыз]}.
      {/ifndef}

{ifdef(public)}
{include(/kz/_includes/_delete-test-cluster-short.md)}
{/ifdef}

{/includetag}

{includetag(delete-managed)}

Жұмыс істеп тұрған кластер тарифтеледі және есептеу ресурстарын тұтынады. Velero аддоны көмегімен резервтік көшіруді тексеру үшін жасалған Kubernetes ресурстары енді қажет болмаса, оларды жойыңыз:

1. Жасалған `example-app` аттар кеңістігін және онымен байланысты ресурстарды, сондай-ақ жасалған резервтік көшірмені жойыңыз:

   {tabs}
   {tab(Linux/macOS)}
   ```console
   kubectl delete ns example-app
   ```
   {/tab}
   {tab(Windows)}
   ```console
   kubectl delete ns example-app; `
   ```
   {/tab}
   {/tabs}

1. (Опционалды түрде) `velero` аттар кеңістігін жойыңыз. Ол үшін:

   1. Аддонның Custom Resource Definitions (CRD) ресурстарына қатысты жасалған инстанстарды {linkto(../../../instructions/addons/manage-addons#mk8s-manage-addons-delete)[text=жойыңыз]}.
   1. Команданы орындаңыз:

      {tabs}
      {tab(Linux/macOS)}
      ```console
      kubectl delete ns velero
      ```
      {/tab}
      {tab(Windows)}
      ```console
      kubectl delete ns velero; `
      ```
      {/tab}
      {/tabs}

1. Velero аддоны пайдаланған бакеттен резервтік көшірмелерді {linkto(/kz/storage/s3/instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=жойыңыз]}.

   Қажет болса, {linkto(/kz/storage/s3/instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=бакеттің өзін де жойыңыз]}.

{include(/kz/_includes/_delete-test-cluster-short.md)}

{/includetag}
