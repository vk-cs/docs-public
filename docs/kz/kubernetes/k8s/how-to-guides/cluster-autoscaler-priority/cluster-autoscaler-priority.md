# {heading(Топтарды масштабтау басымдықтарын баптау)[id=k8s-hpa]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Бұл практикалық нұсқаулық Cluster Autoscaler үшін `priority` expander-ді қалай баптау керектігін сипаттайды, осылайша масштабтау кезінде ол алдымен қалаулы worker-топ мүшесін таңдайды, ал басымдық тең болған жағдайда — ресурстар қоры ең аз топты таңдайды.

{note:warn}
Managed Containers-те Cluster Autoscaler параметрлерінің бір бөлігін VK Cloud платформасы басқаруы мүмкін. Алдымен Cluster Autoscaler Deployment қолжетімді екенін және оның аргументтерін өзгертуге рұқсат бар-жоғын тексеріңіз. Егер компонент толықтай сервиспен басқарылса, `--expander` баптауын VK Cloud [техникалық қолдауымен](/kz/contacts) келісу қажет.
{/note}

## Дайындық қадамдары

{include(/kz/_includes/_create-test-cluster.md)[tags=magnum]}
1. Егер бұрын жасалмаса, `kubectl` қолданбасын {linkto(../../connect/kubectl#k8s-kubectl)[text=орнатыңыз және баптаңыз]}.
1. `kubectl` көмегімен кластерге {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=қосылыңыз]}.

## 1. Cluster Autoscaler-ді табыңыз

1. Командалы орындаңыз:

   ```bash
   kubectl -n kube-system get deploy,pod | grep -i autoscaler
   ```

1. Ағымдағы аргументтерді қарап шығыңыз:

   ```bash
   kubectl -n kube-system get deploy cluster-autoscaler \
     -o jsonpath='{.spec.template.spec.containers[0].command}'
   ```

   Егер Deployment атауы өзгеше болса, табылған атауды қойыңыз.

## 2. Топ мүшелерінің атауларын анықтаңыз

`priority` expander ережелерді жеке топ мүшелерінің атауларымен емес, топ мүшелері топтарының атауларымен салыстырады.

1. Топ мүшелерінің [меткаларын](/kz/kubernetes/k8s/reference/labels-and-taints#k8s-labels-and-taints) қарап, VK Cloud топ атауын сақтайтын метканы табыңыз:

   ```bash
   kubectl get nodes --show-labels
   ```

1. VK Cloud жеке кабинетінде [тексеріңіз](/kz/kubernetes/k8s/instructions/helpers/node-group-settings#k8s-node-group-settings) топ мүшелері топтарын және төмендегі регулярлық өрнектерде олардың дәл атауларын қолданыңыз.

## 3. Басымдықтары бар ConfigMap жасаңыз

1. `ConfigMap` үшін `cluster-autoscaler-priority.yaml` манифестін жасаңыз. Сан неғұрлым үлкен болса, басымдық соғұрлым жоғары:

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

1. Манифестті қолданыңыз:

   ```bash
   kubectl apply -f cluster-autoscaler-priority.yaml
   ```

1. Конфигурацияны тексеріңіз:

   ```bash
   kubectl -n kube-system get configmap \
     cluster-autoscaler-priority-expander -o yaml
   ```

## 4. priority expander-ді қосыңыз

1. Cluster Autoscaler аргументтеріне қосыңыз:

   ```text
   --expander=priority,least-waste
   ```

   `priority,least-waste` тізбегін қолдану қауіпсіздеу: алдымен бизнес-басымдық қолданылады, ал теңдік болған жағдайда CPU және жады қоры ең аз топ таңдалады.

1. Егер Deployment өңдеуге қолжетімді болса, команданы орындаңыз:

   ```bash
   kubectl -n kube-system edit deployment cluster-autoscaler
   ```

1. `command` немесе `args` бөлімінде бар `--expander` параметрін ауыстырыңыз немесе жаңасын қосыңыз:

   ```yaml
   - --expander=priority,least-waste
   ```

   Егер `--expander` параметрі бұрыннан бар болса, екінші параметрді қоспаңыз.

## 5. Конфигурация жүктелгенін тексеріңіз

1. Командаларды орындаңыз:

   ```bash
   kubectl -n kube-system rollout status deployment/cluster-autoscaler
   kubectl -n kube-system logs deployment/cluster-autoscaler --since=10m | \
     grep -Ei 'priority|expander|configmap|scale.?up'
   ```

1. Cluster Autoscaler күйін тексеріңіз:

   ```bash
   kubectl -n kube-system get configmap cluster-autoscaler-status -o yaml
   ```

## 6. Тест өткізіңіз

1. Кемінде екі топтың бір pod-қа ресурстар, меткалар (labels), шектеулер (taints) және орналастыру ережелері (affinity) бойынша сай келетініне көз жеткізіңіз.
2. Ағымдағы қуат жеткіліксіз жұмыс жүктемесін жасаңыз.
3. Pod-тың ресурс тапшылығына байланысты `Pending` күйін алғанына көз жеткізіңіз.
4. [Cluster Autoscaler логтарын](/kz/kubernetes/k8s/how-to-guides/autoscaler-logs#k8s-autoscaler-logs) және VK Cloud жеке кабинетіндегі топтар өлшемінің өзгерісін тексеріңіз.

Pod-ты тексеру мысалы:

```bash
kubectl describe pod <pending-pod>
```

Cluster Autoscaler шешімдерін қарау мысалы:

```bash
kubectl -n kube-system logs deployment/cluster-autoscaler --since=15m | \
  grep -Ei 'expanding|scale.?up|node group|priority'
```

## Қолданылмайтын ресурстарды жойыңыз

Жұмыс істеп тұрған кластер тарифтенеді және есептеу ресурстарын тұтынады. Егер осы практикалық нұсқаулықты өту үшін жасалған Kubernetes ресурстары сізге енді қажет болмаса, оларды жойыңыз:

1. Expander-дің бұрынғы баптауларын қайтарыңыз, мысалы:

   ```yaml
   - --expander=least-waste
   ```

1. ConfigMap-ті жойыңыз:

   ```bash
   kubectl -n kube-system delete configmap \
     cluster-autoscaler-priority-expander
   ```

{include(/kz/_includes/_delete-test-cluster-short.md)}

## Маңызды шектеулер

- Басымдық тек pod-қа ресурстар, `nodeSelector`, міндетті `nodeAffinity`, шектеулер (taints) және ерекшеліктер (tolerations) бойынша сай келетін топтар арасында қолданылады.
- Ережелер регулярлық өрнектер арқылы топ мүшелері топтарының атауларымен салыстырылады.
- Жұмсақ `preferredDuringSchedulingIgnoredDuringExecution` топтарды масштабтау ретін анықтамайды.
- Егер топ максималды өлшеміне жеткен болса немесе бұлт провайдерінде уақытша қолжетімсіз болса, төменгі басымдықтағы топқа өту Cluster Autoscaler мінез-құлығына және нұсқасына байланысты.
- Платформа басқаратын Deployment-тегі өзгерістер VK Cloud тарапынан қайта жазылуы мүмкін. Кластер жаңартылғаннан кейін конфигурацияны қайта тексеріңіз.