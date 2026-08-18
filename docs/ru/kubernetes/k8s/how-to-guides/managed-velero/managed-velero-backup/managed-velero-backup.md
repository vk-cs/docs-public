# {heading(Резервное копирование вручную)[id=k8s-velero-backup-managed]}

Используйте аддон {linkto(../../../concepts/addons-and-settings/addons#k8s-addons-velero)[text=Velero]}, чтобы вручную создавать резервные копии данных кластера и восстанавливать их.

{include(/ru/_includes/_velero-magnum-how-to.md)[tags=note-managed]}

## {heading(Подготовительные шаги)[id=k8s-velero-backup-managed-prepare]}

{include(/ru/_includes/_create-test-cluster.md)}
1. {linkto(../../../connect/kubectl#k8s-kubectl)[text=Убедитесь]}, что вы можете подключиться к кластеру с помощью `kubectl`.
1. {linkto(/ru/tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=Установите OpenStack CLI]}, если это еще не сделано. Убедитесь, что вы можете авторизоваться в облаке с его помощью.
1. {linkto(../../../instructions/addons/advanced-installation/install-advanced-velero#k8s-install-advanced-velero)[text=Установите аддон Velero]}, если это еще не сделано.

## {heading({counter(managed-velero)}. Создайте приложение)[id=k8s-velero-backup-managed-create-app]}

{include(/ru/_includes/_velero-magnum-how-to.md)[tags=create-app]}

## {heading({counter(managed-velero)}. Создайте резервную копию приложения)[id=k8s-velero-backup-managed-create]}

1. Создайте манифест `coffee-backup.yaml`:

   ```yaml
   apiVersion: velero.io/v1
   kind: Backup
   metadata:
     name: coffee-backup
     namespace: velero
   spec:
     includedNamespaces:
       - example-app
   ```

1. Примените манифест в кластере:

   ```console
   kubectl apply -f coffee-backup.yaml
   ```

   Этот манифест создает ручную резервную копию всего пространства имен `example-app`, в котором находятся нужные для работы приложения ресурсы. Время жизни созданной резервной копии по умолчанию – 72 часа. По истечении этого времени резервная копия будет удалена.

1. (Опционально) {linkto(../../../how-to-guides/managed-velero/managed-backup-schedule#k8s-backup-schedule-managed)[text=Настройте]} расписание для автоматического создания резервных копий.

## {heading({counter(managed-velero)}. Восстановите приложение из резервной копии)[id=k8s-velero-backup-managed-restore]}

1. Имитируйте отказ приложения. Для этого удалите пространство имен `example-app`, в котором находятся ресурсы, необходимые для работы приложения:

   ```console
   kubectl delete ns example-app
   ```

1. Создайте манифест `coffee-restore.yaml`:

   ```yaml
   apiVersion: velero.io/v1
   kind: Restore
   metadata:
     name: coffee-restore
     namespace: velero
   spec:
     backupName: coffee-backup
   ```

1. Примените манифест в кластере:

   ```console
   kubectl apply -f coffee-restore.yaml
   ```

   Этот манифест восстанавливает ресурсы из резервной копии, которая была создана ранее. Данные восстанавливаются в том же кластере, в котором было выполнено резервное копирование. Если нужно восстановить данные в новый кластер:

    1. {linkto(../../../instructions/create-cluster/create-webui#k8s-create-webui)[text=Создайте]} кластер.
    1. {linkto(../../../instructions/addons/advanced-installation/install-advanced-velero#k8s-install-advanced-velero)[text=Установите аддон Velero]} в кластер.
    1. Создайте и примените манифест `coffee-restore.yaml`.

1. Удалите аннотацию с идентификатором балансировщика нагрузки, которая осталась после восстановления резервной копии:

   ```console
   kubectl -n example-app annotate service coffee-svc loadbalancer.openstack.org/load-balancer-id-
   ```

   После этого будет создан новый балансировщик нагрузки.

1. Дождитесь, когда балансировщику будет назначен {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-адрес]}.

   Периодически проверяйте статус балансировщика:

   ```console
   kubectl get svc -n example-app
   ```

   В столбце `EXTERNAL-IP` должен появиться Floating IP-адрес, назначенный балансировщику.

1. Убедитесь, что NGINX отвечает на запросы:

   ```console
   curl <FLOATING_IP_АДРЕС_БАЛАНСИРОВЩИКА>
   ```

   Ожидаемый вывод:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

## {heading(Удалите неиспользуемые ресурсы)[id=k8s-velero-backup-managed-delete]}

{include(/ru/_includes/_velero-magnum-how-to.md)[tags=delete-managed]}
