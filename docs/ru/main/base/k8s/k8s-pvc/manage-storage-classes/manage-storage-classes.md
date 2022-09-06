Классы хранения (storage classes) используются при динамическом создании томов (Persistent Volume Claim).

<info>

В каждом кластере Kubernetes VK Cloud присутствуют [преднастроенные классы хранения](../../k8s-concepts/working-with-pvc#predustanovlennye-klassy-hraneniya).

</info>

## Получить информацию о классах хранения

Выполните одну из команд:

1. Для получения списка всех классов хранения:

   ```bash
   kubectl get storageclasses
   ```

1. Для получения подробной информации о классе хранения:

   ```bash
   kubectl describe storageclasses <имя класса хранения, полученное от предыдущей команды>
   ```

## Создать класс хранения

1. Определитесь, с какими параметрами требуется создать новый класс хранения.

   Для создания класса хранения с использованием [драйвера OpenStack Cinder CSI](https://github.com/kubernetes/cloud-provider-openstack/blob/master/docs/cinder-csi-plugin/using-cinder-csi-plugin.md) (который [интегрируется с сервисами хранилища VK Cloud](../../k8s-concepts/working-with-pvc)) необходимо задать следующие параметры:

   1. **Provisioner:** имя драйвера.

      При использовании Cinder CSI значение всегда должно быть `cinder.csi.openstack.org`.

   1. **Parameters:** параметры драйвера.

      Для драйвера доступно [множество параметров](https://github.com/kubernetes/cloud-provider-openstack/blob/master/docs/cinder-csi-plugin/using-cinder-csi-plugin.md#supported-parameters). Для работы с VK Cloud необходимо задать следующие параметры:

      - `availability`: зона доступности. Наличие зон доступности зависит от [региона](../../../../additionals/account/concepts/regions), в котором размещен кластер Kubernetes:

        - Москва: `GZ1`, `MS1`.
        - Амстердам: `AMS`.

        <warn>

        При создании класса хранения допустимо указывать только зону того региона, в котором находится кластер Kubernetes.

        В противном случае, Persistent Volume, созданный на основе этого класса, будет неработоспособен.

        </warn>

      - `type`: [тип хранилища](../../k8s-concepts/working-with-pvc).
        - `ceph-hdd`
        - `ceph-ssd`
        - `high-iops`

   1. Задайте требуемые [параметры Kubernetes для класса хранения](#parametry-klassov-hraneniya).

      При этом учитывайте, что используется Cinder CSI.

   <info>

   Для создания класса хранения с использованием другого CSI-драйвера, обратитесь к документации поставщика драйвера.

   </info>

1. Создайте конфигурационный файл YAML `custom-storage-class,yaml` с описанием класса хранения:

   <!-- prettier-ignore -->
   ```yaml
   apiVersion: storage.k8s.io/v1
   kind: StorageClass
   metadata:
     name: <имя класса хранения>
   provisioner: cinder.csi.openstack.org
   parameters:
     availability: <зона доступности>
     type: <тип хранилища>
   allowVolumeExpansion: <разрешить расширение PV: true/false>
   mountOptions: []
   reclaimPolicy: <политика прекращения использования PV>
   volumeBindingMode: Immediate
   ```

1. Создайте класс хранения с помощью этого конфгурационного файла:

   ```bash
   kubectl apply -f custom-storage-class,yaml
   ```

1. Проверьте, что класс хранения успешно создался, [получив подробную информацию о нем](#poluchit-informaciyu-o-klassah-hraneniya).

## Выбрать класс хранения по умолчанию

В кластерах Kubernetes VK Cloud нет назначенного класса хранения по умолчанию.
Это означает, что при создании Persistent Volume Claim всегда нужно указывать имя класса хранения.

Чтобы избежать этого, можно выбрать один из доступных классов хранения как класс по умолчанию:

1. [Получите список всех доступных классов хранения](#poluchit-informaciyu-o-klassah-hraneniya).

1. Если хотя бы рядом с одним классом хранения есть метка _(default)_ — снимите ее для всех таких классов. Если в списке классов хранения будет несколько классов по умолчанию, то выбор класса по умолчанию ни на что не будет влиять.

   Для этого выполните команду:

   ```bash
   kubectl annotate storageclass <имя класса хранения> storageclass.kubernetes.io/is-default-class-
   ```

1. Выполните команду, чтобы выбрать класс хранения по умолчанию:

   ```bash
   kubectl annotate storageclass <имя класса хранения> storageclass.kubernetes.io/is-default-class=true
   ```

1. Получите список доступных классов хранения еще раз, чтобы подтвердить успешное выполнение операции.

   Например, пусть был выбран по умолчанию класс хранения `csi-ceph-ssd-ms1`. Тогда в выводе команды `kubectl get storageclasses` должен быть похожий текст:

   ```text
   NAME                         PROVISIONER                RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
   ...

   csi-ceph-ssd-ms1 (default)   cinder.csi.openstack.org   Delete          Immediate           true                   ...

   ...
   ```

## Удалить класс хранения

<warn>

Не удаляйте [предустановленные классы хранения](../../k8s-concepts/working-with-pvc#predustanovlennye-klassy-hraneniya), так как это может привести к неработоспособности кластера или потере данных.

</warn>

Выполните команду:

```bash
kubectl delete storageclass <имя класса хранения>
```

## Параметры классов хранения

Эти [параметры классов хранения Kubernetes](https://kubernetes.io/docs/concepts/storage/storage-classes/) влияют на поведение Persistent Volumes, которые создаются на основе этих классов:

- `allowVolumeExpansion`: если эта опция установлена в `true`, то объем Persistent Volume, созданный на основе этого класса хранения, можно будет расширить.

- `mountOptions`: опции, с которыми будет монтироваться Persistent Volume.

  При использовании **Cinder CSI** в VK Cloud с блочными устройствами Ceph (`type`: `ceph-hdd`, `ceph-ssd`) или высокопроизводительными SSD High IOPS (`type`: `high-iops`) не должно указываться никаких опций монтирования. Т.е. либо можно указать `[]` в качестве значения, либо полностью опустить этот параметр.

- `reclaimPolicy`: политика [прекращения использования Persistent Volume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#reclaiming), который будет использовать класс хранения

  - `Delete` (по умолчанию): удалить Persistent Volume после удаления соответствующего ему Persistent Volume Claim.
  - `Retain`: оставить Persistent Volume после удаления соответствующего ему Persistent Volume Claim.

    В этом случае можно будет позднее получить доступ к этому Persistent Volume, создав новый Persistent Volume Claim.

    Или же можно удалить этот Persistent Volume позже вручную.

- `volumeBindingMode`: параметр определяет, каким образом должно выполняться [динамическое выделение](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#dynamic) и привязка ([volume binding](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#binding)) тома.

  При использовании **Cinder CSI** в VK Cloud значение всегда должно быть `Immediate`. Это означает, что выполняются немедленные привязка и выделение тома, сразу после создания Persistent Volume Claim. Другие режимы не поддерживаются Cinder CSI.
