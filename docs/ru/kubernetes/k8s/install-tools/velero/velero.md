# {heading(Установка Velero)[id=k8s-velero]}

Velero — это клиент-серверная утилита для резервного копирования и восстановления ресурсов кластера Kubernetes.

{ifndef(public)}
Перед установкой Velero проверьте, что:

* {linkto(../../concepts/flavors#k8s-flavors-vm-flavor)[text=Тип кластера]} не ниже Standard-6-6.

  Если кластера нет, {linkto(../../instructions/create-cluster#k8s-create-cluster)[text=создайте его]}.

* Группы worker-узлов кластера содержат минимум 2 свободных vCPU (Standard-2-2).
* Подготовлено хранилище S3 для Velero.
{/ifndef}

## {heading(Установка)[id=k8s-velero-install]}

{ifdef(public)}
1. Убедитесь, что:

   - либо в группах worker-узлов есть минимум 2 свободных vCPU;
   - либо {linkto(../../instructions/scale#k8s-instructions-scale-horizontal-autoscaling-worker-nodes)[text=включено автоматическое масштабирование]}.
{/ifdef}

{ifndef(public)}
1. Выберите кластер с нужными характеристиками.

1. {linkto(../../connect/kubectl#k8s-kubectl-kubeconfig)[text=Скачайте файл]} `kubeconfig.yaml` кластера, если он не был скачен ранее.

1. {linkto(../../connect/kubectl#k8s-kubectl-kubeconfig)[text=Обновите токен доступа]} по API в файле `kubeconfig`, если этого не было сделано ранее.
{/ifndef}

1. {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=Убедитесь]}, что вы можете подключиться к кластеру с помощью `kubectl`.

{ifdef(public)}
1. {linkto(../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=Установите]} OpenStack CLI, если он еще не установлен. {linkto(../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=Убедитесь]}, что вы можете авторизоваться в облаке с его помощью.
1. [Создайте hotbox-бакет](../../../../storage/s3/instructions/buckets/create-bucket) для хранения резервных копий в сервисе [VK Object Storage](../../../../storage/s3).
1. [Создайте аккаунт](../../../../storage/s3/instructions/access-management/access-keys) в сервисе [VK Object Storage](../../../../storage/s3).

   Выведенные идентификатор ключа и секрет сохраните в файл `s3_creds`:

   ```text
   [default]
   aws_access_key_id=<ИДЕНТИФИКАТОР_КЛЮЧА_ACCESS_KEY_ID>
   aws_secret_access_key=<СЕКРЕТНЫЙ_КЛЮЧ_SECRET_KEY>
   ```
{/ifdef}

{ifndef(public)}
1. Проверьте доступность кластера и при необходимости проксируйте трафик из внутреннего контура:

   ```console
   ssh -o "StrictHostKeyChecking=no" -i <КЛЮЧ> -L <ПОРТ>: <АДРЕС_МАСТЕР>:<ПОРТ_МАСТЕР> -J <АДРЕС_СЕРВЕРА> <...>
   ```

   Здесь:

   * `<КЛЮЧ>` — SSH-ключ сервера.
   * `<ПОРТ>` — локальный порт.
   * `<АДРЕС_МАСТЕР>` — IP-адрес master-узла кластера.
   * `<ПОРТ_МАСТЕР>` — порт master-узла кластера.
   * `<АДРЕС_СЕРВЕРА>` — IP-адрес сервера.
{/ifndef}

1. Определите, какая версия Velero [совместима с версией кластера](https://github.com/vmware-tanzu/velero#velero-compatibility-matrix) Kubernetes, в который нужно установить Velero.

{ifdef(public)}
1. [Загрузите нужную версию](https://github.com/vmware-tanzu/velero/releases) клиента Velero.
{/ifdef}

{ifndef(public)}
1. Загрузите Velero:

   Пример для Velero 1.14:

   ```console
   curl -L https://github.com/vmware-tanzu/velero/releases/download/v1.14.0/velero-v1.14.0-darwin-amd64.tar.gz -o velero-v1.14.0-darwin-amd64.tar.gz
   ```

1. Распакуйте архив:

   ```console
   tar -xvf velero-v1.14.0-darwin-amd64.tar.gz
   ```

   Здесь `velero-v1.14.0-darwin-amd64.tar.gz` — скачанный архив Velero 1.14.

1. Переместите бинарный файл Velero в каталог, включенный в переменную среды окружения `Path` для Windows или `PATH` для Linux и macOS, чтобы использовать его из любого места в командной строке. 
   Например:

   ```console
   sudo mv velero /usr/local/bin/
   ```
{/ifndef}

1. Определите версию плагина AWS, [соответствующую](https://github.com/vmware-tanzu/velero-plugin-for-aws#compatibility) используемой версии Velero.

{ifndef(public)}
   Чтобы узнать версии используемых плагинов, обратитесь к администратору {var(cloud)}.

   Администратор может подключиться к деплой-ноде по SSH (подробнее — в документе **Руководство администратора** в разделе **Интерфейсы и инструменты** → **SSH** → **Подключение к деплой-ноде**) и получить из Inventory-файла версии используемых плагинов с помощью команды:

   ```console
   cat /opt/vkcloud/inventory/vkcloud/group_vars/vkcloud/box-builder.yml | grep velero
   ```

   Пример вывода команды:

   ```console
   - velero/velero-plugin-mcs:v1.2.5
   - velero/velero-plugin-for-aws:v1.12.1
   - velero/velero:v1.14.0
   ```
{/ifndef}

{ifdef(public)}
1. Добавьте путь до клиента в переменную среды окружения:

   - `Path` для Windows.
   - `PATH` для Linux/macOS.
{/ifdef}

1. Установите серверную часть Velero в кластер Kubernetes.
   {ifdef(public)}
   В команде укажите имя бакета, созданного для Velero, и путь к файлу `s3_creds` с данными аккаунта:
   {/ifdef}
   {ifndef(public)}
   В команде укажите название бакета, созданного для Velero, и путь к файлу с учетными данными аккаунта хранилища S3:
   {/ifndef}

   {tabs}

   {tab(Linux/macOS)}

   {ifdef(public)}
   ```console
   velero install \
   --plugins \
     velero/velero-plugin-for-aws:v1.8.2,registry.infra.mail.ru:5010/velero/velero-plugin-mcs:v1.13.1 \
   --provider aws \
   --bucket <ИМЯ_БАКЕТА_VELERO> \
   --secret-file <ПУТЬ_К_ФАЙЛУ_S3_CREDS> \
   --use-volume-snapshots=false \
   --backup-location-config \
     region=ru-msk,s3ForcePathStyle="true",checksumAlgorithm="",s3Url=<ДОМЕН>
   ```
   {/ifdef}

   {ifndef(public)}
   ```console
   velero install \
   --image=<REGISTRY_URL>/velero/velero:v<ВЕРСИЯ_VELERO> \
   --plugins \
     <REGISTRY_URL>/velero/velero-plugin-for-aws:v<ВЕРСИЯ_AWS>, <REGISTRY_URL>/velero-plugin-mcs:v1.2.5 \
   --provider aws \
   --bucket <НАЗВАНИЕ_БАКЕТА> \
   --secret-file <ПУТЬ_ДО_ФАЙЛА> \
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
   --bucket <ИМЯ_БАКЕТА_VELERO> `
   --secret-file <ПУТЬ_К_ФАЙЛУ_S3_CREDS> `
   --use-volume-snapshots=false `
   --backup-location-config `
     region=ru-msk,s3ForcePathStyle="true",checksumAlgorithm="",s3Url=<ДОМЕН>
   ```
   {/ifdef}

   {ifndef(public)}
   ```console
   velero install `
   --image=<REGISTRY_URL>/velero/velero:v<ВЕРСИЯ_VELERO> `
   --plugins `
     <REGISTRY_URL>/velero/velero-plugin-for-aws:v<ВЕРСИЯ_AWS>, <REGISTRY_URL>/velero-plugin-mcs:v1.2.5`
   --provider aws `
   --bucket <НАЗВАНИЕ_БАКЕТА> `
   --secret-file <ПУТЬ> `
   --use-volume-snapshots=false `
   --backup-location-config `
     region=ru-msk,s3ForcePathStyle="true",s3Url=<ДОМЕН>
   ```
   {/ifndef}

   {/tab}

   {/tabs}

   {ifdef(public)}
   Здесь `<ДОМЕН>` — домен сервиса VK Object Storage, соответствующий региону аккаунта:

   - `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва.
   - `https://hb.kz-ast.bizmrg.com` — домен региона Казахстан.
   {/ifdef}

   {ifndef(public)}
   Здесь:

   * `<REGISTRY_URL>` — URL-адрес, где расположены плагины.
   * `<ВЕРСИЯ_AWS>` — версия плагина AWS.
   * `<ВЕРСИЯ_VELERO>` — версия утилиты Velero, скачанного на шаге 8.
   * `<НАЗВАНИЕ_БАКЕТА>` — название бакета для Velero.
   * `<ПУТЬ>` — путь к файлу с учетными данными аккаунта хранилища S3.
   * `<ДОМЕН>` — домен хранилища S3.
   {/ifndef}

   После завершения установки будет выведено сообщение:

   ```text
   Velero is installed! ⛵ Use 'kubectl logs deployment/velero -n velero' to view the status.
   ```

1. Создайте секрет Kubernetes для авторизации серверной части Velero в {var(cloud)}:

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

1. Пропатчите развертывание (deployment) Velero в кластере, чтобы:

   - ограничить потребление ресурсов плагинами Velero для AWS и {var(cloud)};
   - указать секрет с переменными для авторизации в {var(cloud)}.

   Чтобы пропатчить развертывание Velero:

   1. Создайте файл с патчем:

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

   1. Примените патч к развертыванию Velero:

      ```console
      kubectl patch deployment velero -n velero --patch-file velero-patch.yaml
      ```

      Развертывание Velero будет пропатчено и перезапущено.

1. Задайте для снимков расположение по умолчанию:

   ```console
   velero snapshot-location create default --provider openstack --config region=ru-msk
   ```

## {heading(Проверка работоспособности)[id=k8s-velero-check]}

1. Выполните команду для проверки настроенных плагинов:

   ```console
   velero plugin get
   ```

   В выводе команды должны содержаться следующие плагины:

   ```text
   NAME                      KIND
   ...                       ...
   velero.io/aws             VolumeSnapshotter
   velero.io/openstack       VolumeSnapshotter
   ```

1. Выполните команду для проверки настроенных расположений для резервных копий:

   ```console
   velero backup-location get
   ```

   Должна быть выведена похожая информация:

   ```text
   NAME      PROVIDER   BUCKET/PREFIX   PHASE       LAST VALIDATED   ACCESS MODE   DEFAULT
   default   aws        ...             Available   ...              ReadWrite     true
   ```

1. Выполните команду для проверки настроенных расположений для снимков (snapshot):

   ```console
   velero snapshot-location get
   ```

   Должна быть выведена похожая информация:

   ```text
   NAME      PROVIDER
   default   openstack
   ```

## {heading(Удаление)[id=k8s-velero-delete]}

Для удаления Velero выполните команду:

```console
velero uninstall
```