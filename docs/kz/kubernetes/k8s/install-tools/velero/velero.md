{include(/kz/_includes/_translated_by_ai.md)}
Velero — Kubernetes кластері ресурстарының резервтік көшірмесін жасауғал және оларды қалпына келтіруге арналған клиент-серверлік утилита.

## Орнату

1. Мыналарғал көз жеткізіңіз:

   - не worker-түйіндер топтарында кемінде 2 бос vCPU бар;
   - не [автоматты масштабтау қосылған](../../instructions/scale#autoscale_worker_nodes).

1. [Көз жеткізіңіз](../../connect/kubectl#check_connection), кластерге `kubectl` көмегімен қосыла алатыныңызғал.
1. Егер әлі орнатылмаған болса, OpenStack CLI [орнатыңыз](/kz/tools-for-using-services/cli/openstack-cli). Оның көмегімен бұлтта авторизациялана алатыныңызғал [көз жеткізіңіз](/kz/tools-for-using-services/cli/openstack-cli).
1. [VK Object Storage](../../../../storage/s3/instructions/buckets/create-bucket) сервисінде резервтік көшірмелерді сақтау үшін [hotbox-бакет жасаңыз](../../../../storage/s3).
1. [VK Object Storage](../../../../storage/s3/instructions/access-management/access-keys) сервисінде [аккаунт жасаңыз](../../../../storage/s3).

   Шығарылған кілт идентификаторы мен құпияны `s3_creds` файлына сақтаңыз:

   ```text
   [default]
   aws_access_key_id=<ИДЕНТИФИКАТОР_КЛЮЧА_ACCESS_KEY_ID>
   aws_secret_access_key=<СЕКРЕТНЫЙ_КЛЮЧ_SECRET_KEY>
   ```

1. Velero орнатылатын Kubernetes кластері нұсқасымен [үйлесімді](https://github.com/vmware-tanzu/velero#velero-compatibility-matrix) Velero нұсқасын анықтаңыз.
1. Velero клиентінің [қажетті нұсқасын жүктеп алыңыз](https://github.com/vmware-tanzu/velero/releases).
1. Қолданылып жатқан Velero нұсқасына [сәйкес келетін](https://github.com/vmware-tanzu/velero-plugin-for-aws#compatibility) AWS плагинінің нұсқасын анықтаңыз.
1. Клиентке дейінгі жолды орта айнымалысына қосыңыз:

   - Windows үшін `Path`.
   - Linux/macOS үшін `PATH`.

1. Velero серверлік бөлігін Kubernetes кластеріне орнатыңыз. Командада Velero үшін жасалған бакет атын және аккаунт деректері бар `s3_creds` файлына дейінгі жолды көрсетіңіз:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   velero install \
   --plugins \
     velero/velero-plugin-for-aws:v1.13.1,registry.infra.mail.ru:5010/velero/velero-plugin-mcs:v1.2.5 \
   --provider aws \
   --bucket <ИМЯ_БАКЕТА_VELERO> \
   --secret-file <ПУТЬ_К_ФАЙЛУ_S3_CREDS> \
   --use-volume-snapshots=false \
   --backup-location-config \
     region=ru-msk,s3ForcePathStyle="true",checksumAlgorithm="",s3Url=<ДОМЕН>

   ```

   {/tab}

   {tab(Windows)}

   ```console
   velero install `
   --plugins `
     velero/velero-plugin-for-aws:v1.13.1,registry.infra.mail.ru:5010/velero/velero-plugin-mcs:v1.2.5 `
   --provider aws `
   --bucket <ИМЯ_БАКЕТА_VELERO> `
   --secret-file <ПУТЬ_К_ФАЙЛУ_S3_CREDS> `
   --use-volume-snapshots=false `
   --backup-location-config `
     region=ru-msk,s3ForcePathStyle="true",checksumAlgorithm="",s3Url=<ДОМЕН>
   ```

   {/tab}

   {/tabs}

   Мұнда `<ДОМЕН>` — аккаунт аймағына сәйкес VK Object Storage сервисінің домені:

   - `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені.
   - `https://hb.kz-ast.bizmrg.com` — Қазақстан аймағының домені.

   Орнату аяқталғаннан кейін хабарлама шығарылады:

   ```text
   Velero is installed! ⛵ Use 'kubectl logs deployment/velero -n velero' to view the status.
   ```

1. Velero серверлік бөлігі VK Cloud бұлтында авторизациялана алуы үшін Kubernetes құпиясын жасаңыз:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   kubectl -n velero create secret generic openstack-cloud-credentials \
     --from-literal OS_PROJECT_ID=$OS_PROJECT_ID \
     --from-literal OS_REGION_NAME=$OS_REGION_NAME \
     --from-literal OS_IDENTITY_API_VERSION=$OS_IDENTITY_API_VERSION \
     --from-literal OS_PASSWORD=$OS_PASSWORD \
     --from-literal OS_AUTH_URL=$OS_AUTH_URL \
     --from-literal OS_USERNAME=$OS_USERNAME \
     --from-literal OS_INTERFACE=$OS_INTERFACE \
     --from-literal OS_FILE_OPERATION_TIMEOUT=$OS_FILE_OPERATION_TIMEOUT \
     --from-literal OS_DOMAIN_NAME=$OS_USER_DOMAIN_NAME \
     -o yaml

   ```

   {/tab}

   {tab(Windows)}

   ```console
   kubectl -n velero create secret generic openstack-cloud-credentials `
     --from-literal OS_PROJECT_ID=$env:OS_PROJECT_ID `
     --from-literal OS_REGION_NAME=$env:OS_REGION_NAME `
     --from-literal OS_IDENTITY_API_VERSION=$env:OS_IDENTITY_API_VERSION `
     --from-literal OS_PASSWORD=$env:OS_PASSWORD `
     --from-literal OS_AUTH_URL=$env:OS_AUTH_URL `
     --from-literal OS_USERNAME=$env:OS_USERNAME `
     --from-literal OS_INTERFACE=$env:OS_INTERFACE `
     --from-literal OS_FILE_OPERATION_TIMEOUT=$env:OS_FILE_OPERATION_TIMEOUT `
     --from-literal OS_DOMAIN_NAME=$env:OS_USER_DOMAIN_NAME `
     -o yaml
   ```

   {/tab}

   {/tabs}

   Ұқсас алқпарат шығуы керек:

   ```yaml
   apiVersion: v1
   data:
     OS_AUTH_URL: ...
     OS_DOMAIN_NAME: ...
     ...
   kind: Secret
   metadata:
     creationTimestamp: ...
     name: openstack-cloud-credentials
     namespace: velero
     resourceVersion: ...
     selfLink: ...
     uid: ...
   type: Opaque
   ```

1. Кластердегі Velero deployment-ын патчтаңыз. Бұл үшін қажет:

   - Velero-ның AWS және VK Cloud плагиндері тұтынатын ресурстарды шектеу;
   - VK Cloud бұлтында авторизациялануғал арналған айнымалылары бар құпияны көрсету.

   1. Патч файлын жасаңыз:

      {cut(velero-patch.yaml)}

      ```yaml
      spec:
        template:
          spec:
            containers:
              - name: velero
                envFrom:
                  - secretRef:
                      name: openstack-cloud-credentials
            initContainers:
              - name: velero-velero-plugin-for-aws
                resources:
                  limits:
                    cpu: "1"
                    memory: 512Mi
                  requests:
                    cpu: 500m
                    memory: 256Mi
              - name: velero-velero-plugin-mcs
                resources:
                  limits:
                    cpu: "1"
                    memory: 512Mi
                  requests:
                    cpu: 500m
                    memory: 256Mi
      ```

      {/cut}

   1. Патчты Velero deployment-ына қолданыңыз:

      ```console
      kubectl patch deployment velero -n velero --patch-file velero-patch.yaml
      ```

      Velero deployment-ы патчталып, қайта іске қосылады.

1. Команданы орындап, әдепкі snapshot орналасуын жасаңыз:

   ```console
   velero snapshot-location create default --provider openstack --config region=ru-msk
   ```

## Жұмысқал қабілеттілігін тексеру

1. Бапталған плагиндерді тексеру үшін команданы орындаңыз:

   ```console
   velero plugin get
   ```

   Команда шығысында келесі плагиндер болуы керек:

   ```text
   NAME                                        KIND
   ...                                         ...
   velero.io/aws                               VolumeSnapshotter
   velero.io/openstack                         VolumeSnapshotter
   ```

1. Бапталған резервтік көшірме орналасуларын тексеру үшін команданы орындаңыз:

   ```console
   velero backup-location get
   ```

   Ұқсас алқпарат шығуы керек:

   ```text
   NAME      PROVIDER   BUCKET/PREFIX   PHASE       LAST VALIDATED                  ACCESS MODE   DEFAULT
   default   aws        ...             Available   ...                             ReadWrite     true
   ```

1. Бапталған snapshot орналасуларын тексеру үшін команданы орындаңыз:

   ```console
   velero snapshot-location get
   ```

   Ұқсас алқпарат шығуы керек:

   ```text
   NAME      PROVIDER
   default   openstack
   ```

## Жою

Команданы орындаңыз:

```console
velero uninstall
```
