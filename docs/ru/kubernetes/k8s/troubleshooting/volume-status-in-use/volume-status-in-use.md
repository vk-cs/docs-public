Ошибка `Volume status is in-use` при пересоздании пода возникает, когда постоянный том не успевает отмонтироваться от старого узла. Это особенность взаимодействия Kubernetes и OpenStack. 

### Решение

1. Проверьте версию [Cinder CSI](/ru/kubernetes/k8s/concepts/storage#csi) и обновите ее при необходимости.
1. Если постоянный том завис надолго, вручную отсоедините его через OpenStack CLI, чтобы разблокировать статус:
   ```console
   openstack server remove volume
   ```