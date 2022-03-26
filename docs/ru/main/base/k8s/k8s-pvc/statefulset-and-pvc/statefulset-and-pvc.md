StatefulSet — это удобный способ работы со Stateful-приложениями, которым требуется обрабатывать события об остановке работы Pod и осуществления Graceful Shutdown. Обычно, такие приложения — это базы данных и очереди сообщений, которые работают в нескольких экземплярах, синхронизируемых друг с другом посредством репликации или кластеризации.

Существует несколько способов организации таких схем: с использованием общих Persistent Volumes (RWX) и с помощью индивидуальных Persistent Volumes (RWO).

В случае RWX Persistent Volumes (NFS, GlusterFS) вы можете использовать существующий Persistent Volume Claim в декларации StatefulSet. Однако, такой способ не подойдет для RWO Persistent Volumes (Block Storage), т.к. блочное хранилище монтируется в эксклюзивном режиме к каждому Pod. В результате, если StatefulSet будет иметь 2 или более реплики Persistent Volume будет примонтирован только к 1 из Pod, а монтирование ко всем остальным Pod завершится неудачей.

Для того, чтобы избежать подобных проблем, вы должны использовать `volumeClaimTemplates` в декларации StatefulSet:
```
volumeClaimTemplates:
 - metadata: name: www
 spec: accessModes: [ "ReadWriteOnce" ]
 storageClassName: "csi-dp1-ssd"
 resources: 
requests: 
storage: 1Gi
```
В этом случае для каждой реплики StatefulSet будет создан PVC с именем data-0, data-1, data-2 и т.д. в зависимости от количества реплик. Каждый из этих PVC выделит Persistent Volume нужного объема, который и будет примонтирован к подам, соответствующим репликам StatefulSet.