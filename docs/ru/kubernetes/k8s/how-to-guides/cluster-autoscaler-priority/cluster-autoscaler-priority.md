# {heading(Настройка приоритетов масштабирования групп узлов)[id=k8s-hpa]}

Это практическое руководство описывает, как настроить `priority` expander для Cluster Autoscaler, чтобы при масштабировании он сначала выбирал предпочтительную группу worker-узлов, а при равном приоритете — группу с наименьшим остатком ресурсов.

{note:warn}
В Cloud Containers часть параметров Cluster Autoscaler может управляться платформой VK Cloud. Сначала проверьте, доступен ли вам Deployment Cluster Autoscaler и разрешено ли изменять его аргументы. Если компонент полностью управляется сервисом, настройку `--expander` нужно согласовать с [технической поддержкой](/ru/contacts) VK Cloud.
{/note}

## Подготовительные шаги

{include(/ru/_includes/_create-test-cluster.md)}
1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Установите и настройте]} `kubectl`, если это еще не сделано.
1. {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=Подключитесь]} к кластеру при помощи `kubectl`.

## 1. Найдите Cluster Autoscaler

1. Выполните команду:

   ```bash
   kubectl -n kube-system get deploy,pod | grep -i autoscaler
   ```

1. Посмотрите текущие аргументы:

   ```bash
   kubectl -n kube-system get deploy cluster-autoscaler \
     -o jsonpath='{.spec.template.spec.containers[0].command}'
   ```

   Если имя Deployment отличается, подставьте найденное имя.

## 2. Определите имена групп узлов

`priority` expander сопоставляет правила с именами групп узлов, а не с именами отдельных узлов.

1. Просмотрите [метки](/ru/kubernetes/k8s/reference/labels-and-taints#k8s-labels-and-taints) узлов и найдите метку, в которой VK Cloud хранит имя группы:

   ```bash
   kubectl get nodes --show-labels
   ```

1. [Проверьте](/ru/kubernetes/k8s/instructions/helpers/node-group-settings#k8s-node-group-settings) группы узлов в личном кабинете VK Cloud и используйте их точные имена в регулярных выражениях ниже.

## 3. Создайте ConfigMap с приоритетами

1. Создайте манифест `cluster-autoscaler-priority.yaml` для `ConfigMap`. Чем больше число, тем выше приоритет:

   ```yaml
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: cluster-autoscaler-priority-expander
     namespace: kube-system
   data:
     priorities: |
       100:
         - ^production-on-demand$
       50:
         - ^production-spot$
       10:
         - ^fallback-pool$
   ```

1. Примените манифест:

   ```bash
   kubectl apply -f cluster-autoscaler-priority.yaml
   ```

1. Проверьте конфигурацию:

   ```bash
   kubectl -n kube-system get configmap \
     cluster-autoscaler-priority-expander -o yaml
   ```

## 4. Включите priority expander

1. В аргументы Cluster Autoscaler добавьте:

   ```text
   --expander=priority,least-waste
   ```

   Безопаснее использовать цепочку `priority,least-waste`: сначала применяется бизнес-приоритет, а при равенстве выбирается группа с наименьшим остатком CPU и памяти.

1. Если Deployment доступен для редактирования, выполните команду:

   ```bash
   kubectl -n kube-system edit deployment cluster-autoscaler
   ```

1. В секции `command` или `args` замените существующий параметр `--expander` либо добавьте новый:

   ```yaml
   - --expander=priority,least-waste
   ```

   Не добавляйте второй параметр `--expander`, если он уже присутствует.

## 5. Проверьте, что конфигурация загружена

1. Выполните команды:

   ```bash
   kubectl -n kube-system rollout status deployment/cluster-autoscaler
   kubectl -n kube-system logs deployment/cluster-autoscaler --since=10m | \
     grep -Ei 'priority|expander|configmap|scale.?up'
   ```

1. Проверьте статус Cluster Autoscaler:

   ```bash
   kubectl -n kube-system get configmap cluster-autoscaler-status -o yaml
   ```

## 6. Проведите тест

1. Убедитесь, что минимум две группы подходят одному и тому же поду по ресурсам, меткам (labels), ограничениям (taints) и правилам размещения (affinity).
2. Создайте рабочую нагрузку, для которой текущей емкости недостаточно.
3. Убедитесь, что под получил статус `Pending` из-за нехватки ресурсов.
4. [Проверьте логи Cluster Autoscaler](/ru/kubernetes/k8s/how-to-guides/autoscaler-logs#k8s-autoscaler-logs) и изменение размера групп в личном кабинете VK Cloud.

Пример проверки pod:

```bash
kubectl describe pod <pending-pod>
```

Пример просмотра решений Cluster Autoscaler:

```bash
kubectl -n kube-system logs deployment/cluster-autoscaler --since=15m | \
  grep -Ei 'expanding|scale.?up|node group|priority'
```

## Удалите неиспользуемые ресурсы

Работающий кластер тарифицируется и потребляет вычислительные ресурсы. Если ресурсы Kubernetes, созданные для прохождения этого практического руководства, вам больше не нужны, удалите их:

1. Верните прежние настройки expander, например:

   ```yaml
   - --expander=least-waste
   ```

1. Удалите ConfigMap:

   ```bash
   kubectl -n kube-system delete configmap \
     cluster-autoscaler-priority-expander
   ```

{include(/ru/_includes/_delete-test-cluster-short.md)}

## Важные ограничения

- Приоритет применяется только среди групп, которые подходят поду по ресурсам, `nodeSelector`, обязательному `nodeAffinity`, ограничениям (taints) и исключениям (tolerations).
- Правила сопоставляются с именами групп узлов через регулярные выражения.
- Мягкий `preferredDuringSchedulingIgnoredDuringExecution` не задает порядок масштабирования групп.
- Если группа достигла максимального размера или временно недоступна у облачного провайдера, переход к группе меньшего приоритета зависит от поведения и версии Cluster Autoscaler.
- Изменения в управляемом платформой Deployment могут быть перезаписаны VK Cloud. После обновления кластера проверьте конфигурацию повторно.
