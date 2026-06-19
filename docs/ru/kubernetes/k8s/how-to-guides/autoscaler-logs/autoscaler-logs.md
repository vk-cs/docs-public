# {heading(Просмотр логов агента автоматического масштабирования)[id=k8s-autoscaler-logs]}

{linkto(../../concepts/cluster-autoscaler#k8s-cluster-autoscaler)[text=Агент автоматического масштабирования]} кластера Kubernetes (Cluster Autoscaler) отслеживает нагрузку на worker-узлы кластера, при необходимости уменьшая или увеличивая их количество. Вы можете просматривать логи {linkto(../../concepts/scale#k8s-scale-autoscaling)[text=автоматического масштабирования]} для диагностики проблем.

Подробнее об агенте автоматического масштабирования и работе с ним в [официальной документации](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md) Cluster Autoscaler. 

## {heading(Подготовительные шаги)[id=k8s-autoscaler-logs-prepare]}

{include(/ru/_includes/_create-test-cluster.md)}
1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Установите и настройте]} `kubectl`, если это еще не сделано.
1. {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=Подключитесь]} к кластеру при помощи `kubectl`.

## {heading(1. Определите имя пода агента автоматического масштабирования)[id=k8s-autoscaler-logs-review]}

Имя пода агента автоматического масштабирования, как правило, начинается с `cluster-autoscaler`. Чтобы определить его, воспользуйтесь одним из способов:

{tabs}

{tab(Личный кабинет)}

{linkto(../../instructions/manage-resources#k8s-manage-resources-view-resources)[text=Просмотрите]} список подов кластера в личном кабинете {var(cloud)}.

{/tab}

{tab(kubectl)}

Просмотрите список подов в пространстве `kube-system` с помощью команды:

```console
kubectl get pods -n kube-system | grep cluster-autoscaler
```

{/tab}

{/tabs}

## {heading(2. Просмотрите логи пода агента автоматического масштабирования)[id=k8s-autoscaler-logs-autoscaling-agent]}

Выполните команду: 

```console
kubectl logs <ИМЯ_ПОДА> -n kube-system
```
   
Чтобы следить за логами в режиме реального времени, добавьте опцию `-f` перед именем пода:

```console
kubectl logs -f <ИМЯ_ПОДА> -n kube-system
```

## {heading(3. Просмотрите события кластера)[id=k8s-autoscaler-logs-cluster-events]}

1. Получите информацию о событиях, происходящих в кластере:

   ```console
   kubectl get events -n kube-system
   ```

1. Отфильтруйте события по имени пода агента автоматического масштабирования (как правило, имя пода содержит `cluster-autoscaler`):

   ```console
   kubectl get events -n kube-system | grep cluster-autoscaler
   ```

Подробнее о работе с событиями в [официальной документации Kubernetes](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_events/).

## {heading(Удалите неиспользуемые ресурсы)[id=k8s-autoscaler-logs-delete]}

{include(/ru/_includes/_delete-test-cluster.md)}