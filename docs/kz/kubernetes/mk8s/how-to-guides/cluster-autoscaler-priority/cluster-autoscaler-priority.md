# {heading(Топтарды масштабтау басымдықтарын баптау)[id=mk8s-hpa]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Бұл практикалық нұсқаулық Cluster Autoscaler үшін `priority` expander-ді қалай баптау керектігін сипаттайды, осылайша масштабтау кезінде ол алдымен қалаулы worker-тораптар тобын таңдайды, ал басымдық тең болғанда — ресурстар қалдығы ең аз топты таңдайды.

{note:warn}
Managed Containers қызметінде Cluster Autoscaler параметрлерінің бір бөлігін VK Cloud платформасы басқаруы мүмкін. Алдымен Cluster Autoscaler Deployment қолжетімді ме және оның аргументтерін өзгертуге рұқсат бар ма екенін тексеріңіз. Егер компонент толығымен сервиспен басқарылса, `--expander` баптауын VK Cloud [техникалық қолдауымен](/kz/contacts) келісу қажет.
{/note}

## Дайындық қадамдар

{include(/kz/_includes/_create-test-cluster.md)[tags=managed]}
1. Егер бұрын жасалмаса, `kubectl`-ті {linkto(../../connect/kubectl#mk8s-kubectl)[text=орнатыңыз және баптаңыз]}.
1. `kubectl` көмегімен кластерге {linkto(../../connect/kubectl#mk8s-kubectl-check-connection)[text=қосылыңыз]}.

## 1. Cluster Autoscaler-ді табыңыз

1. Команданы орындаңыз:

   ```bash
   kubectl -n kube-system get deploy,pod | grep -i autoscaler
   ```

1. Ағымдағы аргументтерді қараңыз:

   ```bash
   kubectl -n kube-system get deploy cluster-autoscaler \
     -o jsonpath='{.spec.template.spec.containers[0].command}'
   ```

   Егер Deployment атауы өзгеше болса, табылған атауды қойыңыз.

## 2. Тораптар топтарының атауларын анықтаңыз

`priority` expander ережелерді жеке тораптардың атауларымен емес, тораптар топтарының атауларымен салыстырады.

1. Тораптардың {linkto(../../reference/labels-and-taints#mk8s-labels-and-taints)[text=белгілерін]} қарап, VK Cloud топ атауын сақтайтын белгіні табыңыз:

   ```bash
   kubectl get nodes --show-labels
   ```

1. VK Cloud жеке кабинетінде тораптар топтарын {linkto(../../instructions/manage-node-group#mk8s-manage-node-group)[text=тексеріңіз]} және төмендегі тұрақты өрнектерде олардың дәл атауларын пайдаланыңыз.

## 3. Басымдықтары бар ConfigMap жасаңыз

1. `ConfigMap` үшін `cluster-autoscaler-priority.yaml` манифесін жасаңыз. Сан неғұрлым үлкен болса, басымдық соғұрлым жоғары:

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

   `priority,least-waste` тізбегін пайдалану қауіпсіздеу: алдымен бизнес-басымдық қолданылады, ал теңдік болғанда CPU және жады қалдығы ең аз топ таңдалады.

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

1. Кемінде екі топтың бір pod-қа ресурстар, белгілер (labels), шектеулер (taints) және орналастыру ережелері (affinity) бойынша сәйкес келетініне көз жеткізіңіз.
2. Ағымдағы сыйымдылық жеткіліксіз жұмыс жүктемесін жасаңыз.
3. Pod ресурстар жетіспеуі себебінен `Pending` күйін алғанына көз жеткізіңіз.
4. VK Cloud жеке кабинетінде {linkto(../autoscaler-logs#mk8s-autoscaler-logs)[text=Cluster Autoscaler логтарын]} және топтар өлшемінің өзгерісін тексеріңіз.

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

- Басымдық тек pod-қа ресурстар, `nodeSelector`, міндетті `nodeAffinity`, шектеулер (taints) және ерекшеліктер (tolerations) бойынша сәйкес келетін топтар арасында қолданылады.
- Ережелер тораптар топтарының атауларымен тұрақты өрнектер арқылы салыстырылады.
- Жұмсақ `preferredDuringSchedulingIgnoredDuringExecution` топтарды масштабтау ретін анықтамайды.
- Егер топ максималды өлшеміне жеткен болса немесе бұлт провайдерінде уақытша қолжетімсіз болса, төменгі басымдықтағы топқа өту Cluster Autoscaler-дің мінез-құлқы мен нұсқасына байланысты.
- Платформа басқаратын Deployment-ке енгізілген өзгерістер VK Cloud тарапынан қайта жазылуы мүмкін. Кластер жаңартылғаннан кейін конфигурацияны қайта тексеріңіз.