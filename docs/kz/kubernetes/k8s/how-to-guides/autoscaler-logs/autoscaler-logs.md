# {heading(Автоматты масштабтау агентінің журналдарын қарау)[id=k8s-autoscaler-logs]}

{include(/kz/_includes/_translated_by_ai.md)}

{linkto(../../concepts/cluster-autoscaler#k8s-cluster-autoscaler)[text=Kubernetes кластерінің]} {linkto(../../concepts/cluster-autoscaler#k8s-cluster-autoscaler)[text=автоматты масштабтау агенті]} (Cluster Autoscaler) кластердің worker-түйіндеріне түсетін жүктемені бақылайды және қажет болған жағдайда олардың санын азайтады немесе арттырады. Ақауларды диагностикалау үшін {linkto(../../concepts/scale#k8s-scale-autoscaling)[text=автоматты масштабтау]} журналдарын қарай аласыз.

Автоматты масштабтау агенті және онымен жұмыс істеу туралы толығырақ Cluster Autoscaler-дің [ресми құжаттамасында](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md). 

## {heading(Дайындық қадамдары)[id=k8s-autoscaler-logs-prepare]}

{include(/kz/_includes/_create-test-cluster.md)}
1. Егер бұл әлі жасалмаса, `kubectl` утилитасын {linkto(../../connect/kubectl#k8s-kubectl)[text=орнатып, баптаңыз]}.
1. `kubectl` көмегімен кластерге {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=қосылыңыз]}.

## {heading(1. Автоматты масштабтау агенті подының атын анықтаңыз)[id=k8s-autoscaler-logs-review]}

Автоматты масштабтау агенті подының атауы, әдетте, `cluster-autoscaler` деп басталады. Оны анықтау үшін тәсілдердің бірін пайдаланыңыз:

{tabs}

{tab(Жеке кабинет)}

VK Cloud жеке кабинетінен кластер подтарының тізімін {linkto(../../instructions/manage-resources#k8s-manage-resources-view-resources)[text=қараңыз]}.

{/tab}

{tab(kubectl)}

`kube-system` кеңістігіндегі подтар тізімін мына пәрменнің көмегімен қараңыз:

```console
   kubectl get pods -n kube-system | grep cluster-autoscaler
```

{/tab}

{/tabs}

## {heading(2. Автоматты масштабтау агенті подының журналдарын қараңыз)[id=k8s-autoscaler-logs-autoscaling-agent]}

Пәрменді орындаңыз: 

```console
kubectl logs <ИМЯ_ПОДА> -n kube-system
```

Журналдарды нақты уақыт режимінде бақылау үшін под атауының алдына `-f` опциясын қосыңыз:

```console
kubectl logs -f <ИМЯ_ПОДА> -n kube-system
```

## {heading(3. Кластер оқиғаларын қараңыз)[id=k8s-autoscaler-logs-cluster-events]}

1. Кластерде болып жатқан оқиғалар туралы ақпаратты алыңыз:

   ```console
   kubectl get events -n kube-system
   ```

1. Оқиғаларды автоматты масштабтау агенті подының атауы бойынша сүзіңіз (әдетте под атауында `cluster-autoscaler` болады):

   ```console
   kubectl get events -n kube-system | grep cluster-autoscaler
   ```

Оқиғалармен жұмыс істеу туралы толығырақ Kubernetes-тің [ресми құжаттамасында](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_events/).

{ifdef(public)}
## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=k8s-autoscaler-logs-delete]}

{include(/kz/_includes/_delete-test-cluster.md)}
{/ifdef}
