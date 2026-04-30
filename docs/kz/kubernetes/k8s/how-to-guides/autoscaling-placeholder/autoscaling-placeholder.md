{include(/kz/_includes/_translated_by_ai.md)}

{include(/kz/_includes/_placeholder.md)}

Төменде кластер конфигурациясына ресурстарды алдын ала бөлу баптауын қалай қосуғал болатыны көрсетіледі. Бұл мысалда баптау бөлек файлда сипатталып, `kubectl` көмегімен қолданылады. 

{note:info}

Егер сіз Helm, Kustomize немесе басқал конфигурация менеджерлерін қолдансаңыз, онда әрекеттер тізбегі мен баптауларды қолдану пәрмендері өзгеше болады.

{/note}

## {heading(Дайындық қадамдары)[id=prepare]}

1. Егер бұл әлі жасалмаса, [кластерді](../../instructions/create-cluster) жасаңыз.
1. Егер бұл әлі жасалмаса, `kubectl` [орнатып, баптаңыз](../../connect/kubectl).
1. [қосылыңыз](../../connect/kubectl#check_connection) к кластеру при помощи `kubectl`.
1. Масштабталатын түйіннің CPU және RAM деректерін дайындаңыз:
   
   1. Кластерге қосылу сессиясы ашылған терминалда мына пәрменді орындаңыз:

      ```console
      kubectl get nodes -o wide
      ```
      
      Жауапта кластер түйіндерінің тізімі қайтарылады. Worker-түйіннің атын сақтап қойыңыз.

   1. worker-түйіннің толық сипаттамасын алыңыз. Пәрменді орындаңыз:

      ```console
      kubectl describe node <ИМЯ_WORKER-УЗЛА>
      ```
      
      Жауапта түйіннің толық сипаттамасы қайтарылады. `Allocatable` параметрінен `cpu` және `memory` мәндерін табыңыз. Осы мәндерді сақтап қойыңыз. Бұл мысалда `cpu: 940m` және `memory: 1454740Ki` мәндері қолданылады.

## {heading(1. Кластерге бос под қосуды баптаңыз)[id=set]}

1. Компьютеріңізде `placeholder.yaml` файлын жасаңыз.
1. Оған төмендегі мазмұнды қосып, сақтаңыз:

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

   - `PriorityClass`: подтардың басымдығын анықтайды. `value: -10` қосылатын подқал төмен басымдық тағайындайды. Жоғарырақ басымдықтағы подтар қолжетімді болған кезде, олар түйіндерге орналастырылып, төмен басымдықтағы подтарды ығыстырады.
   - `Deployment`: резервтік ресурстар жасайтын подтардың жайылуын қамтамасыз етеді.
   - `cpu`: осы параметрде `requests` және `limits` блоктары үшін бұрын алынған worker-түйін үлгісінің бірдей CPU мәндерін көрсетіңіз. Бұл мысалда `940m`.
   - `memory`: осы параметрде `requests` және `limits` блоктары үшін бұрын алынған worker-түйін үлгісінің бірдей RAM мәндерін көрсетіңіз. Бұл мысалда `1454740Ki`.

1. Терминалды ашып, `placeholder.yaml` файлын сақтаған директорияғал өтіңіз.  
1. Пәрменді орындаңыз:

   ```console
   kubectl apply -f placeholder.yaml
   ```

   Егер пәрмен сәтті орындалса, жауапта `PriorityClass` және `Deployment` жасалғаны туралы растау қайтарылады.  

## {heading(2. Баптаулардың қолданылуын тексеріңіз)[id=check]}

1. [өтіңіз](https://kz.cloud.vk.com/app/) в жеке кабинет VK Cloud.
1. Қажетті кластер орналасқан жобаны таңдаңыз.
1. **Контейнерлер** → **Kubernetes кластерлері** бөліміне өтіңіз.
1. Қажетті кластер орналасқан жобаны таңдаңыз.
1. **Кластер ресурстары** қойындысына өтіңіз.
1. **Подтар** тізімін ашып, тізімде `overprovisioning` подтар `Running` күйімен қосылғанына көз жеткізіңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=delete]}

Егер құрылған кластер сізге енді қажет болмаса, оны [жойыңыз](../../instructions/manage-cluster#delete_cluster).
