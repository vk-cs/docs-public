# {heading(Подключение постоянного хранилища)[id=k8s-connect-pv]}

## {heading(Объекты Persistent Volume и Persistent Volume Claim)[id=k8s-connect-pv-pvc]}

Для обеспечения постоянного хранения данных, в Kubernetes существуют следующие виды ресурсов:

* PersistentVolume (PV) — раздел на жестком диске, доступном из кластера. Взаимодействие кластера с PV осуществляется так же, как с узлами.
* PersistentVolumeClaim (PVC) — пользовательский запрос на использование данного диска. Взаимодействие PV с PVC осуществляется так же, как рабочий узел взаимодействует с подами, то есть PVC запрашивает у PV необходимый размер диска и тип доступа — `ReadWriteOnce`, `ReadOnlyMany` или `ReadWriteMany`.

Подключение PV и PVC выполняется автоматически из кластера на основании параметра `Storage class`, интегрированного с Cinder.

Пример содержания файла конфигурации PV:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-storage-1
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /tmp/data1
```

Пример содержания файла конфигурации PVC:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-app-1
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```

Команды создания и просмотра PV и PVC на основании файла конфигурации:

```console
kubectl create -f new-pv.yaml
kubectl create -f new-pvc.yaml
kubectl get pv | grep pv-storage
kubectl get pvc | grep pvc-app
```

## {heading(Подключение NFS-хранилища с помощью Persistent Volume и Persistent Volume Claim)[id=k8s-connect-pv-connect-nfs]}

Подключение NFS-хранилища с помощью Persistent Volume и Persistent Volume Claim приведено в [данной инструкции](https://cloud.vk.com/docs/kubernetes/k8s/use-cases/storage#podklyuchenie_faylovyh_hranilishch_c785fc).

## {heading(Динамическое выделение дисков с PVC)[id=k8s-connect-pv-dynamic]}

Механизм Persistent Volume Claim (PVC) динамически выделяет и подключает к подам блочные диски с необходимыми характеристиками.

В сервисе Kubernetes реализован CSI-драйвер(Container Storage Interface), который взаимодействует с API {var(cloud)} для управления блочными дисками.

Чтобы динамически создать PV на базе PVC, укажите корректный класс хранения (storage class). Чтобы получить полный список классов хранения и типов дисков, доступных для кластера, выполните команду:

```console
kubectl get storageclasses.storage.k8s.io
```

Пример ожидаемого результата:

```console
csi-ceph                   cinder.csi.openstack.org   10d
csi-ceph-retain            cinder.csi.openstack.org   10d
csi-dp1                    cinder.csi.openstack.org   10d
csi-dp1-high-iops          cinder.csi.openstack.org   10d
csi-dp1-high-iops-retain   cinder.csi.openstack.org   10d
csi-dp1-retain             cinder.csi.openstack.org   10d
csi-dp1-ssd                cinder.csi.openstack.org   10d
csi-dp1-ssd-retain         cinder.csi.openstack.org   10d
csi-hdd (default)          cinder.csi.openstack.org   10d
csi-hdd-retain             cinder.csi.openstack.org   10d
csi-ko1-high-iops          cinder.csi.openstack.org   10d
csi-ko1-high-iops-retain   cinder.csi.openstack.org   10d
csi-ko1-ssd                cinder.csi.openstack.org   10d
csi-ko1-ssd-retain         cinder.csi.openstack.org   10d
csi-local-ssd              cinder.csi.openstack.org   10d
csi-local-ssd-retain       cinder.csi.openstack.org   10d
csi-ms1                    cinder.csi.openstack.org   10d
csi-ms1-retain             cinder.csi.openstack.org   10d
csi-ssd                    cinder.csi.openstack.org   10d
csi-ssd-retain             cinder.csi.openstack.org   10d
```

Далее укажите класс хранения (storage class) в поле `storageClass` декларации PVC:

```console
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: nginx-pvc-ssd
spec:
  storageClassName: "csi-ko1-ssd"
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 30Gi
 
---
apiVersion: v1
kind: Pod
metadata:
  name: nginx-test-pvc
  labels:
    name: nginx-test-pvc
spec:
  containers:
    - image: nginx
      name: nginx
      ports:
        - containerPort: 80
          name: http
      volumeMounts:
        # name must match the volume name below
        - name: nginx-persistent-storage
          # mount path within the container
          mountPath: /val/lib/nginx/test
  volumes:
    - name: nginx-persistent-storage
      persistentVolumeClaim:
        claimName: nginx-pvc-ssd
```