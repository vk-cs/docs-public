{include(/kz/_includes/_translated_by_ai.md)}

[Kubernetes кластерінің автоматты масштабтау агенті](/kz/kubernetes/k8s/concepts/cluster-autoscaler) (Cluster Autoscaler) кластердің worker-түйіндеріне түсетін жүктемені бақылайды және қажет болған жағдайда олардың санын азайтады немесе арттырады. Ақауларды диагностикалау үшін [автоматты масштабтау](/kz/kubernetes/k8s/concepts/scale#autoscaling) журналдарын қарай аласыз.

Автоматты масштабтау агенті және онымен жұмыс істеу туралы толығырақ Cluster Autoscaler [ресми құжаттамасында](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md). 

## {heading(Дайындық қадамдары)[id=prepare]}

1. Егер бұл әлі жасалмаса, [кластерді](../../instructions/create-cluster) жасаңыз.
1. Егер бұл әлі жасалмаса, `kubectl` [орнатып, баптаңыз](../../connect/kubectl).
1. [қосылыңыз](../../connect/kubectl#check_connection) к кластеру при помощи `kubectl`.

## {heading(1. Автоматты масштабтау агенті подының атын анықтаңыз)[id=review]}

Автоматты масштабтау агенті подының атауы, әдетте, `cluster-autoscaler` деп басталады. Оны анықтау үшін тәсілдердің бірін пайдаланыңыз:

{tabs}

{tab(Жеке кабинет)}

[қараңыз](/kz/kubernetes/k8s/instructions/manage-resources#view-resources) список подов кластера в личном кабинете VK Cloud.

{/tab}

{tab(kubectl)}

`kube-system` кеңістігіндегі подтар тізімін мына пәрменнің көмегімен қараңыз:

```console
   kubectl get pods -n kube-system | grep cluster-autoscaler
```

{/tab}

{/tabs}

## 2. Автоматты масштабтау агенті подының журналдарын қараңыз

Пәрменді орындаңыз: 

```console
kubectl logs <ИМЯ_ПОДА> -n kube-system
```
   
Журналдарды нақты уақыт режимінде бақылау үшін под атауының алдына `-f` опциясын қосыңыз:

```console
kubectl logs -f <ИМЯ_ПОДА> -n kube-system
```

## 3. Кластер оқиғаларын қараңыз

1. Кластерде болып жатқан оқиғалар туралы ақпаратты алыңыз:
   
   ```console
   kubectl get events -n kube-system
   ```

1. Оқиғаларды автоматты масштабтау агенті подының атауы бойынша сүзіңіз (әдетте под атауында `cluster-autoscaler` болады):

   ```console
   kubectl get events -n kube-system | grep cluster-autoscaler
   ```

Оқиғалармен жұмыс істеу туралы толығырақ [ресми құжаттамада](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_events/).

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=delete]}

Жұмыс істеп тұрған кластер есептеу ресурстарын тұтынады. Егер ол сізге енді қажет болмаса:

- оны кейінірек пайдалану үшін [тоқтатыңыз](/kz/kubernetes/k8s/instructions/manage-cluster#stop);
- оны біржола [жойыңыз](../../instructions/manage-cluster#delete_cluster).
