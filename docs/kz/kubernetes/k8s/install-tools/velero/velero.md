# {heading(Velero орнату)[id=k8s-velero]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Velero — Kubernetes кластері ресурстарының резервтік көшірмесін жасауға және оларды қалпына келтіруге арналған клиент-серверлік утилита.

## {heading(Орнату)[id=k8s-velero-install]}

{ifdef(public)}
1. Мынадарға көз жеткізіңіз:

   - worker-түйіндер топтарында кемінде 2 бос vCPU бар;
   - немесе {linkto(../../instructions/scale#k8s-instructions-scale-horizontal-autoscaling-worker-nodes)[text=автоматты масштабтау қосылған]}.
{/ifdef}

{ifndef(public)}
1. Қажетті сипаттамалары бар кластерді таңдаңыз.

1. Бұрын жүктелмеген болса, кластердің {linkto(../../connect/kubectl#k8s-kubectl-kubeconfig)[text=`kubeconfig.yaml` файлын жүктеп алыңыз]}.

1. Бұрын жасалмаса, `kubeconfig` файлындағы {linkto(../../connect/kubectl#k8s-kubectl-kubeconfig)[text=қолжетімділік токенін API арқылы жаңартыңыз]}.
{/ifndef}

1. {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=`kubectl` көмегімен кластерге қосыла алатыныңызға көз жеткізіңіз]}.

{ifdef(public)}
1. Әлі орнатылмаған болса, OpenStack CLI {linkto(../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=орнатыңыз]}. Оның көмегімен бұлтта авторизациялана алатыныңызға {linkto(../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=көз жеткізіңіз]}.
1. [VK Object Storage](../../../../storage/s3) қызметінде резервтік көшірмелерді сақтау үшін [hotbox-бакет құрыңыз](../../../../storage/s3/instructions/buckets/create-bucket).
1. [VK Object Storage](../../../../storage/s3) қызметінде [аккаунт құрыңыз](../../../../storage/s3/instructions/access-management/access-keys).

   Шыққан кілт идентификаторын және құпиясөзді `s3_creds` файлына сақтаңыз:

   ```text
   [default]
   aws_access_key_id=<ACCESS_KEY_ID_КІЛТІНІҢ_ИДЕНТИФИКАТОРЫ>
   aws_secret_access_key=<SECRET_KEY_ҚҰПИЯСӨЗІ>
   ```
{/ifdef}

{ifndef(public)}
1. Кластердің қолжетімділігін тексеріп, қажет болса трафикті ішкі контурдан проксилеңіз:

   ```console
   ssh -o "StrictHostKeyChecking=no" -i <КІЛТ> -L <ПОРТ>: <МАСТЕР_АДРЕСІ>:<МАСТЕР_ПОРТЫ> -J <СЕРВЕР_АДРЕСІ> <...>
   ```

   Мұнда:

   * `<КІЛТ>` — сервердің SSH-кілті.
   * `<ПОРТ>` — жергілікті порт.
   * `<МАСТЕР_АДРЕСІ>` — кластердің master-түйінінің IP-адресі.
   * `<МАСТЕР_ПОРТЫ>` — кластердің master-түйінінің порты.
   * `<СЕРВЕР_АДРЕСІ>` — сервердің IP-адресі.
{/ifndef}

1. Velero орнатылатын Kubernetes кластерінің нұсқасымен [үйлесімді Velero нұсқасын](https://github.com/vmware-tanzu/velero#velero-compatibility-matrix) анықтаңыз.

{ifdef(public)}
1. Velero клиентінің қажетті нұсқасын [жүктеп алыңыз](https://github.com/vmware-tanzu/velero/releases).
{/ifdef}

{ifndef(public)}
1. Velero жүктеп алыңыз:

   Velero 1.14 мысалы:

   ```console
   curl -L https://github.com/vmware-tanzu/velero/releases/download/v1.14.0/velero-v1.14.0-darwin-amd64.tar.gz -o velero-v1.14.0-darwin-amd64.tar.gz
   ```

1. Архивті тарқатыңыз:

   ```console
   tar -xvf velero-v1.14.0-darwin-amd64.tar.gz
   ```

   Мұнда `velero-v1.14.0-darwin-amd64.tar.gz` — жүктеп алынған Velero 1.14 архиві.

1. Velero бинарлық файлын командалық жолдың кез келген жерінен пайдалану үшін Windows үшін `Path` немесе Linux және macOS үшін `PATH` орта айнымалысына кіретін каталогқа жылжытыңыз.
   Мысалы:

   ```console
   sudo mv velero /usr/local/bin/
   ```
{/ifndef}

1. Пайдаланылатын Velero нұсқасына [сәйкес](https://github.com/vmware-tanzu/velero-plugin-for-aws#compatibility) AWS плагинінің нұсқасын анықтаңыз.

{ifndef(public)}
   Пайдаланылатын плагиндер нұсқаларын білу үшін {var(cloud)} әкімшісіне хабарласыңыз.

   Әкімші деплой-нодаға SSH арқылы қосыла алады (көбірек білу үшін **Әкімші нұсқаулығы** құжатының **Интерфейстер және құралдар** → **SSH** → **Деплой-нодқа қосылу** бөлімін қараңыз) және Inventory-файлынан мына команданың көмегімен пайдаланылатын плагиндер нұсқаларын ала алады:

   ```console
   cat /opt/vkcloud/inventory/vkcloud/group_vars/vkcloud/box-builder.yml | grep velero
   ```

   Команда шығарылымының мысалы:

   ```console
   - velero/velero-plugin-mcs:v1.2.5
   - velero/velero-plugin-for-aws:v1.12.1
   - velero/velero:v1.14.0
   ```
{/ifndef}

{ifdef(public)}
1. Клиент жолын орта айнымалысына қосыңыз:

   - Windows үшін `Path`.
   - Linux/macOS үшін `PATH`.
{/ifdef}

1. Velero серверлік бөлігін Kubernetes кластеріне орнатыңыз.
   {ifdef(public)}
   Командада Velero үшін құрылған бакет атауын және аккаунт деректері бар `s3_creds` файлына жолды көрсетіңіз:
   {/ifdef}
   {ifndef(public)}
   Командада Velero үшін құрылған бакет атауын және S3 қоймасы аккаунтының тіркелгі деректері бар файлға жолды көрсетіңіз:
   {/ifndef}

   {tabs}

   {tab(Linux/macOS)}

   {ifdef(public)}
   ```console
   velero install \
   --plugins \
     velero/velero-plugin-for-aws:v1.8.2,registry.infra.mail.ru:5010/velero/velero-plugin-mcs:v1.13.1 \
   --provider aws \
   --bucket <VELERO_БАКЕТІНІҢ_АТАУЫ> \
   --secret-file <S3_CREDS_ФАЙЛЫНА_ЖОЛ> \
   --use-volume-snapshots=false \
   --backup-location-config \
     region=ru-msk,s3ForcePathStyle="true",checksumAlgorithm="",s3Url=<ДОМЕН>
   ```
   {/ifdef}

   {ifndef(public)}
   ```console
   velero install \
   --image=<REGISTRY_URL>/velero/velero:v<VELERO_НҰСҚАСЫ> \
   --plugins \
     <REGISTRY_URL>/velero/velero-plugin-for-aws:v<AWS_НҰСҚАСЫ>, <REGISTRY_URL>/velero-plugin-mcs:v1.2.5 \
   --provider aws \
   --bucket <БАКЕТ_АТАУЫ> \
   --secret-file <ФАЙЛҒА_ЖОЛ> \
   --use-volume-snapshots=false \
   --backup-location-config \
     region=ru-msk,s3ForcePathStyle="true",s3Url=<ДОМЕН>
   ```
   {/ifndef}

   {/tab}

   {tab(Windows)}

   {ifdef(public)}
   ```console
   velero install `
   --plugins `
     velero/velero-plugin-for-aws:v1.8.2,registry.infra.mail.ru:5010/velero/velero-plugin-mcs:v1.13.1 `
   --provider aws `
   --bucket <VELERO_БАКЕТІНІҢ_АТАУЫ> `
   --secret-file <S3_CREDS_ФАЙЛЫНА_ЖОЛ> `
   --use-volume-snapshots=false `
   --backup-location-config `
     region=ru-msk,s3ForcePathStyle="true",checksumAlgorithm="",s3Url=<ДОМЕН>
   ```
   {/ifdef}

   {ifndef(public)}
   ```console
   velero install `
   --image=<REGISTRY_URL>/velero/velero:v<VELERO_НҰСҚАСЫ> `
   --plugins `
     <REGISTRY_URL>/velero/velero-plugin-for-aws:v<AWS_НҰСҚАСЫ>, <REGISTRY_URL>/velero-plugin-mcs:v1.2.5`
   --provider aws `
   --bucket <БАКЕТ_АТАУЫ> `
   --secret-file <ЖОЛ> `
   --use-volume-snapshots=false `
   --backup-location-config `
     region=ru-msk,s3ForcePathStyle="true",s3Url=<ДОМЕН>
   ```
   {/ifndef}

   {/tab}

   {/tabs}

   {ifdef(public)}
   Мұнда `<ДОМЕН>` — аккаунт аймағына сәйкес VK Object Storage қызметінің домені:

   - `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені.
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
   {/ifdef}

   {ifndef(public)}
   Мұнда:

   * `<REGISTRY_URL>` — плагиндер орналасқан URL-адрес.
   * `<AWS_НҰСҚАСЫ>` — AWS плагинінің нұсқасы.
   * `<VELERO_НҰСҚАСЫ>` — 8-қадамда жүктеп алынған Velero утилитасының нұсқасы.
   * `<БАКЕТ_АТАУЫ>` — Velero үшін арналған бакеттің атауы.
   * `<ЖОЛ>` — S3 қоймасы аккаунтының тіркелгі деректері бар файлға жол.
   * `<ДОМЕН>` — S3 қоймасының домені.
   {/ifndef}

   Орнату аяқталғаннан кейін мына хабарлама шығады:

   ```text
   Velero is installed! ⛵ Use 'kubectl logs deployment/velero -n velero' to view the status.
   ```

1. {var(cloud)} ішінде Velero серверлік бөлігінің авторизациясы үшін Kubernetes құпиясын (secret) құрыңыз:

   {tabs}

   {tab(Linux/macOS)}

   {ifdef(public)}
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
   {/ifdef}

   {ifndef(public)}
   ```console
   kubectl -n velero create secret generic openstack-cloud-credentials \
     --from-literal OS_PROJECT_ID=$OS_PROJECT_ID \
     --from-literal OS_REGION_NAME=$OS_REGION_NAME \
     --from-literal OS_IDENTITY_API_VERSION=$OS_IDENTITY_API_VERSION \
     --from-literal OS_AUTH_URL=$OS_AUTH_URL \
     --from-literal OS_AUTH_TYPE=$OS_AUTH_TYPE \
     --from-literal OS_TOKEN=$OS_TOKEN \
     --from-literal OS_INTERFACE=$OS_INTERFACE \
     --from-literal OS_FILE_OPERATION_TIMEOUT=$OS_FILE_OPERATION_TIMEOUT \
     --from-literal OS_DOMAIN_NAME=$OS_USER_DOMAIN_NAME \
     -o yaml
   ```
   {/ifndef}

   {/tab}

   {tab(Windows)}

   {ifdef(public)}
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
   {/ifdef}

   {ifndef(public)}
   ```console
   kubectl -n velero create secret generic openstack-cloud-credentials `
     --from-literal OS_PROJECT_ID=$env:OS_PROJECT_ID `
     --from-literal OS_REGION_NAME=$env:OS_REGION_NAME `
     --from-literal OS_IDENTITY_API_VERSION=$env:OS_IDENTITY_API_VERSION `
     --from-literal OS_AUTH_URL=$env:OS_AUTH_URL `
     --from-literal OS_AUTH_TYPE=$env:OS_AUTH_TYPE `
     --from-literal OS_TOKEN=$env:OS_TOKEN `
     --from-literal OS_INTERFACE=$env:OS_INTERFACE `
     --from-literal OS_FILE_OPERATION_TIMEOUT=$env:OS_FILE_OPERATION_TIMEOUT `
     --from-literal OS_DOMAIN_NAME=$env:OS_USER_DOMAIN_NAME `
     -o yaml
    ```
    {/ifndef}

   {/tab}

   {/tabs}

   Ұқсас ақпарат шығуы тиіс:

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

1. Кластердегі Velero deployment-жорамалын патчтеу, ойда мыналар:

   - AWS және {var(cloud)} плагиндерінің ресурс тұтынуын шектеу;
   - {var(cloud)} ішінде авторизациялануға арналған айнымалылары бар құпияны (secret) көрсету.

   Velero deployment-жорамалын патчтеу үшін:

   1. Патч файлын құрыңыз:

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

   1. Патчті Velero deployment-жорамалына қолданыңыз:

      ```console
      kubectl patch deployment velero -n velero --patch-file velero-patch.yaml
      ```

      Velero deployment-жорамалы патчтеліп, қайта іске қосылады.

1. Суреттер үшін әдепкі орналасқан жерді орнатыңыз:

   ```console
   velero snapshot-location create default --provider openstack --config region=ru-msk
   ```

## {heading(Жұмысқа қабілеттілігін тексеру)[id=k8s-velero-check]}

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

   Ұқсас ақпарат шығуы керек:

   ```text
   NAME      PROVIDER   BUCKET/PREFIX   PHASE       LAST VALIDATED                  ACCESS MODE   DEFAULT
   default   aws        ...             Available   ...                             ReadWrite     true
   ```

1. Бапталған snapshot орналасуларын тексеру үшін команданы орындаңыз:

   ```console
   velero snapshot-location get
   ```

   Ұқсас ақпарат шығуы керек:

   ```text
   NAME      PROVIDER
   default   openstack
   ```

## {heading(Жою)[id=k8s-velero-delete]}

Команданы орындаңыз:

```console
velero uninstall
```