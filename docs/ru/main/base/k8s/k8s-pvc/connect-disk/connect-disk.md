Механизм PersistentVolume позволяет подключить к кластеру K8S существующий диск, в качестве постоянного хранилища данных.

<warn>

**Важно**

Если вы хотите подключить общее файловое хранилище NFS в качестве диска, то воспользуйтесь инструкцией по этой [ссылке](../nfs-connection/).

</warn>

Рассмотрим пример. Имеется диск с файловой системой *ext4*, на котором есть файл `test_file.txt`. Создадим PV на основе этого диска, описав для него манифест:

```
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-test
spec:
  accessModes:
  - ReadWriteOnce
  capacity:
    storage: 8Gi
  cinder:
    volumeID: 239e30a9-5a14-41a1-9245-17ace88076a4
    fsType: ext4
  persistentVolumeReclaimPolicy: Retain
  volumeMode: Filesystem
```

**accessModes: ReadWriteOnce** — означает что данный диск может быть подключен только к одному поду (множественное подключение к разным подам доступно только для NFS)

**capacity: storage: 8Gi** — поле размера PV, является обязательным и должно равняться размеру используемого диска

**volumeID** — поле где указывается ID используемого диска

**fsType: ext4** — тип файловой системы, расположенной на диске

**persistentVolumeReclaimPolicy: Retain** — параметр жизненного цикла PV, при значении Retain, диск останется в проекте после удаления PVC и PV (при значении Delete, диск будет удалён)

Создадим PV на основе манифеста и проверим его:

```
kubectl apply -f pv.yaml
```

Отобразится:

```
persistentvolume/pv-test created
```

Затем выполните команду:

```
kubectl get pv
```

Результат команды:

```
NAME      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   REASON   AGE
pv-test   8Gi        RWO            Retain           Available                                   20m
```

Теперь нужно описать PVC для этого PV:

```
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: test-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 8Gi
  volumeName: pv-test
  storageClassName: ""
```

**storageClassName: ""** — всегда пусто для Persistent Volume, создаваемых на основе существующего диска.
Размер (storage) должен совпадать с указанными параметрами в PV.

**volumeName: pv-test** — тут нужно указать имя созданного на предыдущем шаге PV

Создадим PVC:

```
kubectl apply -f pvc.yaml
```

Отобразится:

```
persistentvolumeclaim/test-pvc created
```

Затем выполните команду:

```
kubectl get pvc
```

Отобразится:

```
NAME       STATUS   VOLUME    CAPACITY   ACCESS MODES   STORAGECLASS   AGE
test-pvc   Bound    pv-test   8Gi        RWO            dp1            22m
```

Теперь создадим манифест для пода с использованием PVC:

```
---
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  volumes:
    - name: pvc
      persistentVolumeClaim:
       claimName: test-pvc
  containers:
  - image: nginx
    name: nginx
    volumeMounts:
      - mountPath: /mnt
        name: pvc
```

В разделе **spec: volumes** описывается диск, который будет монтироваться в наш контейнер, здесь задаётся его имя и через параметр persistentVolumeСlaim мы указываем наш созданный PVC (по имени)
В разделе **containers: volumeMounts** указывается диск, описанный в предыдущем пункте, параметр **mountPath: /mnt** задаёт путь куда диск будет примонтирован.

Создадим под:

```
kubectl apply -f pod_test.yaml
```

Отобразится:

```
pod/centos-pod created
```

Затем выполните команду:

```
kubectl get pods
```

отобразится:

```
NAME        READY   STATUS    RESTARTS   AGE
test-pod    1/1     Running   0          24m
```

Теперь подключимся к запущенному поду и прочитаем файл с примонтированного диска:

```
kubectl exec -it test-pod -- /bin/bash
```

Отобразится:

```
root@test-pod:/# cat /mnt/test-file.txt
Hello World!
root@test-pod:/#
```

С более подробной информацией о Persistent Volumes рекомендуем ознакомиться на [официальном сайте](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) Kubernetes.
