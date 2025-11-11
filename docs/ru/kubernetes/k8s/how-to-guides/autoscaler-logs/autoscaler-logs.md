[Агент автоматического масштабирования](/ru/kubernetes/k8s/concepts/cluster-autoscaler) кластера Kubernetes (Cluster Autoscaler) отслеживает нагрузку на worker-узлы кластера, при необходимости уменьшая или увеличивая их количество. Вы можете просматривать логи [автоматического масштабирования](/ru/kubernetes/k8s/concepts/scale#autoscaling) для диагностики проблем.

Подробнее об агенте автоматического масштабирования и работе с ним в [официальной документации](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md) Cluster Autoscaler. 

## {heading(Подготовительные шаги)[id=prepare]}

1. [Создайте](../../instructions/create-cluster) кластер, если это еще не сделано.
1. [Установите и настройте](../../connect/kubectl) `kubectl`, если это еще не сделано.
1. [Подключитесь](../../connect/kubectl#check_connection) к кластеру при помощи `kubectl`.

## {heading(1. Определите имя пода агента автоматического масштабирования)[id=review]}

Имя пода агента автоматического масштабирования, как правило, начинается с `cluster-autoscaler`. Чтобы определить его, воспользуйтесь одним из способов:

{tabs}

{tab(Личный кабинет)}

[Просмотрите](/ru/kubernetes/k8s/instructions/manage-resources#prosmotr_informacii_o_resursah_klastera) список подов кластера в личном кабинете VK Cloud.

{/tab}

{tab(kubectl)}

Просмотрите список подов в пространстве `kube-system` с помощью команды:

```console
   kubectl get pods -n kube-system | grep cluster-autoscaler
```

{/tab}

{/tabs}

## 2. Просмотрите логи пода агента автоматического масштабирования

Выполните команду: 

```console
kubectl logs <ИМЯ_ПОДА> -n kube-system
```
   
Чтобы следить за логами в режиме реального времени, добавьте опцию `-f` перед именем пода:

```console
kubectl logs -f <ИМЯ_ПОДА> -n kube-system
```

## 3. Просмотрите события кластера

1. Получите информацию о событиях, происходящих в кластере:
   
   ```console
   kubectl get events -n kube-system
   ```

1. Отфильтруйте события по имени пода агента автоматического масштабирования (как правило, имя пода содержит `cluster-autoscaler`):

   ```console
   kubectl get events -n kube-system | grep cluster-autoscaler
   ```

Подробнее о работе с событиями в [официальной документации Kubernetes](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_events/).

## {heading(Удалите неиспользуемые ресурсы)[id=delete]}

Работающий кластер потребляет вычислительные ресурсы. Если он вам больше не нужен:

- [остановите](/ru/kubernetes/k8s/instructions/manage-cluster#stop) его, чтобы воспользоваться им позже;
- [удалите](../../instructions/manage-cluster#delete_cluster) его навсегда.
