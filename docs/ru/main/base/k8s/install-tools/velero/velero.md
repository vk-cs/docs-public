Velero — это клиент-серверная утилита для резервного копирования и восстановления ресурсов кластера Kubernetes.

## Установка

1. Убедитесь, что:

   - либо в группах worker-узлов есть минимум 2 свободных vCPU;
   - либо [включено автоматическое масштабирование](../../operations/scale#nastroit-avtomaticheskoe-masshtabirovanie--tolko-dlya-grupp-worker-uzlov-).

1. [Убедитесь](../../connect/kubectl#proverka-podklyucheniya-k-klasteru), что вы можете подключиться к кластеру с помощью `kubectl`.
1. [Установите](../../../../base/account/project/cli/setup) OpenStack CLI, если он еще не установлен. [Убедитесь](../../../../base/account/project/cli/authorization), что вы можете авторизоваться в облаке с его помощью.
1. [Создайте hotbox-бакет](../../../s3/buckets/bucket#sozdanie-baketa) для хранения резервных копий в сервисе [Объектное хранилище](../../../s3).
1. [Создайте аккаунт](../../../s3/access-management/s3-account) в сервисе [Объектное хранилище](../../../s3).

   Выведенные идентификатор ключа и секрет сохраните в файл `s3_creds`:

   ```text
   [default]
   aws_access_key_id=<идентификатор ключа (Access Key ID)>
   aws_secret_access_key=<секрет (Secret Key)>
   ```

1. Определите, какая версия Velero [совместима с версией кластера](https://github.com/vmware-tanzu/velero#velero-compatibility-matrix) Kubernetes, в который нужно установить Velero.
1. [Загрузите нужную версию](https://github.com/vmware-tanzu/velero/releases) клиента Velero.
1. Определите версию плагина aws, [соответствующую](https://github.com/vmware-tanzu/velero-plugin-for-aws#compatibility) используемой версии Velero.
1. Добавьте путь до клиента в переменную среды окружения:

   - `Path` для Windows.
   - `PATH` для Linux/macOS.

1. Установите серверную часть Velero в кластер Kubernetes. В команде укажите имя бакета, созданного для Velero и путь к файлу `s3_creds` с данными аккаунта:

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   velero install \
   --plugins \
     velero/velero-plugin-for-aws:v<выбранная версия плагина AWS>,registry.infra.mail.ru:5010/velero/velero-plugin-mcs:v1.2.2 \
   --provider aws \
   --bucket <имя бакета для Velero> \
   --secret-file <путь к файлу s3_creds> \
   --use-volume-snapshots=false \
   --backup-location-config \
     region=ru-msk,s3ForcePathStyle="true",s3Url=https://hb.bizmrg.com:443

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   velero install `
   --plugins `
     velero/velero-plugin-for-aws:v<выбранная версия плагина AWS>,registry.infra.mail.ru:5010/velero/velero-plugin-mcs:v1.2.2 `
   --provider aws `
   --bucket <имя бакета для Velero> `
   --secret-file <путь к файлу s3_creds> `
   --use-volume-snapshots=false `
   --backup-location-config `
     region=ru-msk,s3ForcePathStyle="true",s3Url=https://hb.bizmrg.com:443
   ```

   </tabpanel>
   </tabs>

   После завершения установки будет выведено сообщение:

   ```text
   Velero is installed! ⛵ Use 'kubectl logs deployment/velero -n velero' to view the status.
   ```

1. Создайте секрет Kubernetes, чтобы серверная часть Velero могла авторизоваться в облаке VK Cloud:

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
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

   </tabpanel>
   <tabpanel>

   ```powershell
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

   </tabpanel>
   </tabs>

   Должна быть выведена похожая информация:

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

1. Пропатчите развертывание (deployment) Velero в кластере. Это нужно, чтобы:

   - ограничить потребление ресурсов плагинами Velero для AWS и VK Cloud;
   - указать секрет с переменными для авторизации в облаке VK Cloud.

   1. Создайте файл с патчем:

      <details>
      <summary markdown="span">velero-patch.yaml</summary>

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

      </details>

   1. Примените патч к развертыванию Velero:

      ```bash
      kubectl patch deployment velero -n velero --patch-file velero-patch.yaml
      ```

      Развертывание Velero будет пропатчено и перезапущено.

1. Создайте расположение снапшотов по умолчанию, выполнив команду:

   ```bash
   velero snapshot-location create default --provider openstack --config region=ru-msk
   ```

## Проверка работоспособности

1. Выполните команду для проверки настроенных плагинов:

   ```bash
   velero plugin get
   ```

   В выводе команды должны содержаться следующие плагины:

   ```text
   NAME                                        KIND
   ...                                         ...
   velero.io/aws                               VolumeSnapshotter
   velero.io/openstack                         VolumeSnapshotter
   ```

1. Выполните команду для проверки настроенных расположений для резервных копий:

   ```bash
   velero backup-location get
   ```

   Должна быть выведена похожая информация:

   ```text
   NAME      PROVIDER   BUCKET/PREFIX   PHASE       LAST VALIDATED                  ACCESS MODE   DEFAULT
   default   aws        ...             Available   ...                             ReadWrite     true
   ```

1. Выполните команду для проверки настроенных расположений для снапшотов:

   ```bash
   velero snapshot-location get
   ```

   Должна быть выведена похожая информация:

   ```text
   NAME      PROVIDER
   default   openstack
   ```

## Удаление

Выполните команду:

```bash
velero uninstall
```
