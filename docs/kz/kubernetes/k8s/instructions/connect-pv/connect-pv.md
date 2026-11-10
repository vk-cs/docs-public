# {heading(Тұрақты жадты қосу)[id=k8s-connect-pv]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(Persistent Volume және Persistent Volume Claim нысандары)[id=k8s-connect-pv-pvc]}

Деректерді тұрақты сақтауды қамтамасыз ету үшін Kubernetes-те келесі ресурс түрлері бар:

* PersistentVolume (PV) — кластерден қолжетімді қатты дисктегі бөлім. Кластердің PV-мен өзара әрекеттесуі түйіндермен өзара әрекеттесу сияқты жүзеге асырылады.
* PersistentVolumeClaim (PVC) — осы дискті пайдалануға пайдаланушы сұрауы. PV-дің PVC-мен өзара әрекеттесуі жұмыс түйінінің подтармен өзара әрекеттесуі сияқты жүзеге асырылады, яғни PVC PV-ден қажетті диск өлшемі мен қолжетімділік түрін — `ReadWriteOnce`, `ReadOnlyMany` немесе `ReadWriteMany` сұрайды.

PV және PVC қосу Cinder-мен интеграцияланған `Storage class` параметрінің негізінде кластерден автоматты түрде орындалады.

PV конфигурация файлының мазмұны мысалы:

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

PVC конфигурация файлының мазмұны мысалы:

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

Конфигурация файлының негізінде PV және PVC жасау және көру командалары:

```console
kubectl create -f new-pv.yaml
kubectl create -f new-pvc.yaml
kubectl get pv | grep pv-storage
kubectl get pvc | grep pvc-app
```

## {heading(Persistent Volume және Persistent Volume Claim көмегімен NFS-жадын қосу)[id=k8s-connect-pv-connect-nfs]}

Persistent Volume және Persistent Volume Claim көмегімен NFS-жадын қосу [берілген нұсқаулықта](https://cloud.vk.ru/docs/kubernetes/k8s/use-cases/storage#podklyuchenie_faylovyh_hranilishch_c785fc) келтірілген.

## {heading(PVC көмегімен дисктерді динамикалық бөлу)[id=k8s-connect-pv-dynamic]}

Persistent Volume Claim (PVC) механизмі қажетті сипаттамалары бар блоктық дисктерді динамикалық түрде бөледі және подтарға қосады.

Kubernetes қызметінде блоктық дисктерді басқару үшін {var(cloud)} API-мен өзара әрекеттесетін CSI-драйвер (Container Storage Interface) жүзеге асырылған.

PVC негізінде PV-ді динамикалық түрде жасау үшін дұрыс жад класын (storage class) көрсетіңіз. Кластер үшін қолжетімді жад кластары мен диск түрлерінің толық тізімін алу үшін команданы орындаңыз:

```console
kubectl get storageclasses.storage.k8s.io
```

Күтілетін нәтиже мысалы:

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

Одан кейін PVC декларациясының `storageClass` өрісінде жад класын (storage class) көрсетіңіз:

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