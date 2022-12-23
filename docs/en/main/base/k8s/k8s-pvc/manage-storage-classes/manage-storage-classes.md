Storage classes are used in the dynamic creation of volumes (Persistent Volume Claim).

<info>

Each Kubernetes VK Cloud cluster has [preconfigured storage classes](../../k8s-concepts/working-with-pvc#predustanovlennye-klassy-hraneniya).

</info>

## Get information about storage classes

Run one of the commands:

1. To get a list of all storage classes:

   ```bash
   kubectl get storageclasses
   ```

1. For detailed information about storage class:

   ```bash
   kubectl describe storageclasses <storage class name obtained from previous command>
   ```

## Create storage class

1. Decide with what parameters you want to create a new storage class.

   To create a storage class using [OpenStack Cinder CSI Driver](https://github.com/kubernetes/cloud-provider-openstack/blob/master/docs/cinder-csi-plugin/using-cinder-csi-plugin.md ) (which [integrates with VK Cloud storage services](../../k8s-concepts/working-with-pvc)) you need to set the following parameters:

   1. **Provisioner:** driver name.

      When using Cinder CSI, the value should always be `cinder.csi.openstack.org`.

   1. **Parameters:** driver parameters.

      There are [many options] available for the driver(https://github.com/kubernetes/cloud-provider-openstack/blob/master/docs/cinder-csi-plugin/using-cinder-csi-plugin.md#supported-parameters) . To work with VK Cloud, you must set the following parameters:

      - `availability`: availability zone. Availability zones depend on the [region](../../../../base/account/concepts/regions) hosting the Kubernetes cluster:

        - Moscow: `GZ1`, `MS1`.
        - Amsterdam: `AMS`.

        <warn>

        When creating a storage class, you can only specify a zone for the region where the Kubernetes cluster resides.

        Otherwise, a Persistent Volume created from this class will not work.

        </warn>

      - `type`: [storage type](../../k8s-concepts/working-with-pvc).
        - `ceph-hdd`
        - `ceph-ssd`
        - `high-iops`

   1. Set the required [Kubernetes storage class parameters](#parametry-klassov-storeniya).

      Please note that Cinder CSI is being used.

   <info>

   To create a storage class using a different CSI driver, refer to the driver vendor's documentation.

   </info>1. Create a YAML configuration file `custom-storage-class,yaml` with a description of the storage class:

   <!-- prettier-ignore -->
   ```yaml
   apiVersion: storage.k8s.io/v1
   kind: StorageClass
   metadata:
     name: <storage class name>
   provisioner: cinder.csi.openstack.org
   parameters:
     availability: <availability zone>
     type: <store type>
   allowVolumeExpansion: <allow PV expansion: true/false>
   mountOptions: []
   reclaimPolicy: <PV reclaim policy>
   volumeBindingMode: Immediate
   ```

1. Create a storage class using this config file:

   ```bash
   kubectl apply -f custom-storage-class,yaml
   ```

1. Check that the storage class was successfully created by [getting detailed information about it](#poluchit-informaciyu-o-klassah-hraneniya).

## Select default storage class

Kubernetes VK Cloud clusters do not have a default storage class assigned.
This means that when creating a Persistent Volume Claim, you must always specify the name of the storage class.

To avoid this, you can choose one of the available storage classes as the default class:

1. [Get a list of all available storage classes](#poluchit-informaciyu-o-klassah-hraneniya).

1. If there is a _(default)_ label next to at least one storage class, remove it for all such classes. If there are several default classes in the list of storage classes, then the choice of the default class will not affect anything.

   To do this, run the command:

   ```bash
   kubectl annotate storageclass <storage class name> storageclass.kubernetes.io/is-default-class-
   ```

1. Run the command to select the default storage class:

   ```bash
   kubectl annotate storageclass <storage class name> storageclass.kubernetes.io/is-default-class=true
   ```

1. Get the list of available storage classes again to confirm the operation was successful.

   For example, let the default storage class be `csi-ceph-ssd-ms1`. Then the output of the `kubectl get storageclasses` command should read something like this:

   ```text
   NAME PROVISIONER RECLAIMPOLICY VOLUMEBINDINGMODE ALLOWVOLUMEEXPANSION AGE
   ...

   csi-ceph-ssd-ms1 (default) cinder.csi.openstack.org Delete Immediate true ...

   ...
   ```

## Remove storage class

<warn>

Do not delete [predefined storage classes](../../k8s-concepts/working-with-pvc#predustanovlennye-klassy-storage), as this may cause the cluster to become unusable or data to be lost.

</warn>

Run the command:

```bash
kubectl delete storageclass <storage class name>
```

## Storage class options

These [Kubernetes storage class settings](https://kubernetes.io/docs/concepts/storage/storage-classes/) affect the behavior of Persistent Volumes that are created from these classes:

- `allowVolumeExpansion`: if this option is set to `true`, the Persistent Volume created from this storage class can be expanded.

- `mountOptions`: options with which the Persistent Volume will be mounted.

  When using **Cinder CSI** in VK Cloud with Ceph block devices (`type`: `ceph-hdd`, `ceph-ssd`) or high-performance SSDs High IOPS (`type`: `high-iops`) should not no mount options are specified. Those. either you can specify `[]` as the value, or you can omit this option entirely.

- `reclaimPolicy`: [Persistent Volume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#reclaiming) policy that the storage class will use

  - `Delete` (default): Delete a Persistent Volume after deleting its corresponding Persistent Volume Claim.
  - `Retain`: keep the Persistent Volume after removing its corresponding Persistent Volume Claim.

    In this case, you can later access this Persistent Volume by creating a new Persistent Volume Claim.

    Or you can delete this Persistent Volume manually later.

- `volumeBindingMode`: parameter defines how [dynamic allocation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#dynamic) and binding ([volume binding](https:// kubernetes.io/docs/concepts/storage/persistent-volumes/#binding)) volumes.

  When using **Cinder CSI** in VK Cloud, the value should always be `Immediate`. This means that the volume is bound and allocated immediately, immediately after the creation of the Persistent Volume Claim. Other modes are not supported by Cinder CSI.
  