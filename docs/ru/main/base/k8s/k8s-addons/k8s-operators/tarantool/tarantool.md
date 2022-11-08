# Поднятие тестового приложения Tarantool operator

## Поднятие оператора в кластере kubernetes

В данном примере понадобится стандартный dev кластер kubernetes с двумя node-узлами с флейворами Basic-1-2. Также понадобится 3 диска с размером от 5GB.

Для начала скопируйте репозиторий с helm чартами tarantool operator.

```bash
git clone https://github.com/tarantool/tarantool-operator
```

Развернём tarantool operator в кластере kubernetes

```bash
helm install -n tarantool-operator operator helm-charts/tarantool-operator --create-namespace --set image.repository=tarantool/tarantool-operator --set image.tag=0.0.10
```

проверим созданные поды
 ```shell
    kubectl get pods -n tarantool-operator
    ---
    NAME                                  READY   STATUS    RESTARTS   AGE
    controller-manager-778db958cf-bhw6z   1/1     Running   0          77s
```

## Разворачивание приложения cartridge

<warn>
storage должен быть равен объёму диска указанного в volumeID
</warn>

Создадите файл pv.yml со следующим содержанием:

```yaml
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-tarantool-cartridge-1
spec:
  accessModes:
  - ReadWriteOnce
  capacity:
    storage: 5Gi
  cinder:
    volumeID: <id 1го диска в проекте vk cloud>
    fsType: ext4
  persistentVolumeReclaimPolicy: Retain
  volumeMode: Filesystem
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-tarantool-cartridge-2
spec:
  accessModes:
  - ReadWriteOnce
  capacity:
    storage: 5Gi
  cinder:
    volumeID: <id 2го диска в проекте vk cloud>
    fsType: ext4
  persistentVolumeReclaimPolicy: Retain
  volumeMode: Filesystem
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-tarantool-cartridge-3
spec:
  accessModes:
  - ReadWriteOnce
  capacity:
    storage: 5Gi
  cinder:
    volumeID: <id 3го диска в проекте vk cloud>
    fsType: ext4
  persistentVolumeReclaimPolicy: Retain
  volumeMode: Filesystem
```

```bash
kubectl apply -f pv.yaml
```

разворачиваем приложение tarantool cartridge

```bash
helm install -n tarantool-app cartridge-app helm-charts/tarantool-cartridge --create-namespace --set LuaMemoryReserveMB=256
```

для доступа к web интерфейсу кластера tarantool выполним перенаправление портов

```bash
kubectl -n tarantool-app port-forward routers-0-0 8081:8081
```

интерфейс администратора будет доступен по адресу: localhost:8081/admin