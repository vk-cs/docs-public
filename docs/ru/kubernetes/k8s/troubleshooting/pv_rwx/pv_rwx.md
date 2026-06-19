# {heading(Не работает режим RWX)[id=k8s-pv-rwx]}

Режим доступа к тому ReadWriteMany (RWX) не работает: у узлов кластера нет доступа к диску.

Это может быть связано с теми, что в Cloud Containers доступ к PVC в режиме RWX не реализован.

### {heading(Решение)[id=k8s-pv-rwx-solution]}

Чтобы организовать общий доступ к данным из нескольких подов на разных узлах, разверните {linkto(../../../../computing/iaas/instructions/fs-manage#iaas-fs-manage)[text=NFS-сервер]} на отдельной виртуальной машине.