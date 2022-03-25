Вместе с облачной системой хранения на базе Ceph вы можете использовать общее файловое хранилище, доступное по протоколу NFS, для создания Persistent volumes в вашем кластере Kubernetes.

Для этого сначала необходимо создать NFS-диск в приватной подсети, ассоциированной с вашим кластером Kubernetes:
1. Выберите пункт меню «Облачные вычисления» → «Файловое хранилище».
2. Создайте новую сеть файлового хранилища, указав:
    - имя файлового хранилища;
    - размер хранилища;
    - протокол;
    - сеть;
    - сеть файлового хранилища.
3. Нажмите «Следующий шаг».
4. Кликните «+ Добавить новое правило».
5. Введите значение подсети в поле «IP или адрес подсети источника» , выделенной для вашего кластера Kubernetes. Например, «10.1.1.0/24».
6. Выберите режим доступа:
    - чтение и запись;
    - только чтение.
7. Нажмите «Добавить файловый сервер».
Перейдите в созданный ресурс и скопируйте значение поля «Точка подключения». Например, 10.0.0.16:/shares/share-51831cd4-2fe9-4f08-ac45-6be754556519.

Далее вам нужно создать Persistent Volume используя манифест следующего вида (в поле «Server» нужно вписать IP-адрес из значения «Путь» созданного ранее ресурса). 

Также вы можете создать PersistentVolumeClaim, который использует ранее созданный NFS Persistent Volume в качестве источника. 

>**Важно**
>В поле mountOptions было указано `nfsvers=4.0` Persistent Volume, а также `storageClassName: ""` в декларации Persistent Volume Claim.

Ниже пример манифеста, создающего Persistent Volume на базе NFS и Persistent Volume Claim, использующий ранее созданный Persistent Volume в качестве источника.
```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: portal-info-data-pv
spec:
  accessModes:
    - ReadWriteMany
  mountOptions:
    - hard
    - nfsvers=4.0
    - timeo=60
    - retrans=10
  capacity:
    storage: 100Gi
  nfs:
    server: 10.0.0.28
    path: "/shares/share-76637908-0da9-4007-be78-e334ca4573a1"
  persistentVolumeReclaimPolicy: "Recycle"
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: portal-info-data-pvc
spec:
  volumeMode: Filesystem
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 100Gi
  volumeName: "portal-info-data-pv"
  storageClassName: ""

---
apiVersion: v1
kind: ReplicationController
metadata:
  name: nginx
spec:
  replicas: 4
  selector:
    app: nginx
  template:
    metadata:
      name: nginx
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80
        volumeMounts:
        - name: portal-info-data
          mountPath: /var/www/html
      restartPolicy: Always
      volumes:
      - name: portal-info-data
        persistentVolumeClaim:
          claimName: portal-info-data-pvc
```
Проверить статус Persistent Volume можно командой:
```
kubectl get PersistentVolume
```
Чтобы проверить статус Persistent Volume Claim выполните:
```
kubectl get PersistentVolumeClaim
```