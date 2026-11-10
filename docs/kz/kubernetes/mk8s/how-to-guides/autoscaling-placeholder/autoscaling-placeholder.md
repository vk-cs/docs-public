# {heading(Топтағы түйіндерді резервтеу)[id=mk8s-autoscaling-placeholder]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{include(/kz/_includes/_placeholder.md)}

Төменде кластер конфигурациясына ресурстарды алдын ала бөлу баптауын қалай қосуға болатыны көрсетіледі. Бұл мысалда баптау бөлек файлда сипатталып, `kubectl` көмегімен қолданылады. 

{note:info}

Егер сіз Helm, Kustomize немесе басқа конфигурация менеджерлерін қолдансаңыз, онда әрекеттер тізбегі мен баптауларды қолдану пәрмендері өзгеше болады.

{/note}

## {heading(Дайындық қадамдары)[id=mk8s-autoscaling-placeholder-prepare]}

{include(/kz/_includes/_create-test-cluster.md)}
1. Егер бұл әлі жасалмаса, `kubectl` утилитасын {linkto(../../connect/kubectl#mk8s-kubectl)[text=орнатып, баптаңыз]}.
1. `kubectl` көмегімен кластерге {linkto(../../connect/kubectl#mk8s-kubectl-check-connection)[text=қосылыңыз]}.
1. Масштабталатын түйіннің CPU және RAM деректерін дайындаңыз:

   1. Кластерге қосылу сессиясы ашылған терминалда мына пәрменді орындаңыз:

      ```console
      kubectl get nodes -o wide
      ```

      Жауапта кластер түйіндерінің тізімі қайтарылады. worker-түйіннің атауын сақтап қойыңыз.

   1. worker-түйіннің толық сипаттамасын алыңыз. Пәрменді орындаңыз:

      ```console
      kubectl describe node <ИМЯ_WORKER-УЗЛА>
      ```

      Жауапта түйіннің толық сипаттамасы қайтарылады. `Allocatable` параметрінен `cpu` және `memory` мәндерін табыңыз. Осы мәндерді сақтап қойыңыз. Бұл мысалда `cpu: 940m` және `memory: 1454740Ki` мәндері қолданылады.

## {heading(1. Кластерге бос под қосуды баптаңыз)[id=mk8s-autoscaling-placeholder-set]}

1. Компьютеріңізде `placeholder.yaml` файлын жасаңыз.
1. Оған мына мазмұнды қосып, сақтаңыз:

   ```yaml

   apiVersion: scheduling.k8s.io/v1
   kind: PriorityClass
   metadata:
     name: overprovisioning
   value: -10
   globalDefault: false
   description: "Priority class used by overprovisioning."

   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: overprovisioning
     namespace: default
   spec:
     replicas: 1
     selector:
       matchLabels:
         run: overprovisioning
     template:
       metadata:
         labels:
           run: overprovisioning
       spec:
         priorityClassName: overprovisioning
         terminationGracePeriodSeconds: 0
         containers:
           - name: reserve-resources
             image: registry.k8s.io/pause:3.9
             resources:
               requests:
                 cpu: 940m
                 memory: 1454740Ki
               limits:
                 cpu: 940m
                 memory: 1454740Ki
   ```

   Мұнда:

   - `PriorityClass`: подтардың приоритетін анықтайды. `value: -10` қосылған подқа төмен приоритет тағайындайды. Жоғары приоритеті бар подтар қолжетімді болғанда, олар төмен приоритеті бар подтарды ығыстырып, түйіндерге орналастырылады.
   - `Deployment`: резервтік ресурстар жасайтын подтардың орналастырылуын қамтамасыз етеді.
   - `cpu`: осы параметрде `requests` және `limits` блоктары үшін бұрын алған worker-түйін шаблонының бірдей CPU мәндерін көрсетіңіз. Осы мысалда — `940m`.
   - `memory`: осы параметрде `requests` және `limits` блоктары үшін бұрын алған worker-түйін шаблонының бірдей RAM мәндерін көрсетіңіз. Осы мысалда — `1454740Ki`.

1. Терминалды ашып, `placeholder.yaml` файлын сақтаған каталогке өтіңіз.  
1. Команданы орындаңыз:

   ```console
   kubectl apply -f placeholder.yaml
   ```

   Команда сәтті орындалса, жауапта `PriorityClass` және `Deployment` жасалғанын растайтын хабарлама қайтарылады.

## {heading(2. Баптаулардың қолданылуын тексеріңіз)[id=mk8s-autoscaling-placeholder-check]}

1. VK Cloud жеке кабинетіне [өтіңіз](https://kz.cloud.vk.kz/app/).
1. Қажетті кластер орналасқан жобаны таңдаңыз.
1. **Kubernetes кластерлері → Kubernetes кластерлері** бөліміне өтіңіз.
1. Қажетті кластердің атауын басыңыз.
1. **Кластер ресурстары** қойындысына өтіңіз.
1. **Подтар** тізімін ашып, тізімде `overprovisioning` поды `Running` күйімен қосылғанына көз жеткізіңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=mk8s-autoscaling-placeholder-delete]}

{include(/kz/_includes/_delete-test-cluster.md)}