# {heading(Тұрақты томдармен (PV) жұмыс істеу)[id=k8s-storage]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=Тұрақты томдарды]} (Persistent Volumes, PV) қарапайым демо-қосымшаларға әртүрлі тәсілдермен қосуға болады. Әрі қарай қосу үшін Persistent Volume Claims (PVC) пайдаланылады. Қосымшалардың және оларға қосылған PV-лардың жұмысқа қабілеттілігін тексеру үшін Ingress ресурсы жасалады.

## {heading(1. Демо-қосымшаларды жасаңыз және оларға PV қосыңыз)[id=k8s-storage-create-demo]}

Әрі қарай қосылған PV-ларға жазылған веб-беттерді көрсету үшін NGINX негізіндегі бірнеше веб-қосымшаны қалай жасау керектігі көрсетіледі.
Веб-беттерді `/usr/share/nginx/html` директориясынан көрсететін `nginxdemos/nginx-hello` NGINX бейнесі пайдаланылады, сондықтан барлық PV дәл осы жол бойынша қосымшалардың подтарына монтталады.

PV қосудың қандай тәсілдерімен танысу қажет екеніне байланысты бір немесе бірнеше демо-қосымша жасауға болады.

## {heading(2. Демо-қосымшалардың және PV-лардың жұмысқа қабілеттілігін тексеріңіз)[id=k8s-storage-check]}

1. Қосымшаларға сұраулар өтетін Ingress ресурсы үшін манифест жасаңыз.

   {cut(cafe-ingress.yaml)}

   ```yaml
   ---
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: cafe-ingress
   spec:
     ingressClassName: nginx
     rules:
     - host: cafe.example.com
       http:
         paths:
         - path: /tea
           pathType: Prefix
           backend:
             service:
               name: tea-svc
               port:
                 number: 80
         - path: /coffee
           pathType: Prefix
           backend:
             service:
               name: coffee-svc
               port:
                 number: 80
         - path: /juice
           pathType: Prefix
           backend:
             service:
               name: juice-svc
               port:
                 number: 80
         - path: /juice/0
           pathType: Prefix
           backend:
             service:
               name: juice-0-svc
               port:
                 number: 80
         - path: /juice/1
           pathType: Prefix
           backend:
             service:
               name: juice-1-svc
               port:
                 number: 80
         - path: /milkshake
           pathType: Prefix
           backend:
             service:
               name: milkshake-svc
               port:
                 number: 80
         - path: /milkshake/0
           pathType: Prefix
           backend:
             service:
               name: milkshake-0-svc
               port:
                 number: 80
         - path: /milkshake/1
           pathType: Prefix
           backend:
             service:
               name: milkshake-1-svc
               port:
                 number: 80
   ```

   {/cut}

1. Барлық қажетті ресурстарды жасау үшін осы манифесті кластерде қолданыңыз:

   ```console
   kubectl apply -f ./cafe-ingress.yaml
   ```

1. Ingress контроллерінің жария IP-мекенжайын {linkto(../../instructions/addons/advanced-installation/install-advanced-ingress#k8s-install-advanced-ingress-get-ip)[text=анықтаңыз]}.

1. Ingress контроллерінің IP-мекенжайын пайдаланып, `curl` көмегімен қосымшалардың қолжетімділігін тексеріңіз.

   {note:info}

   Егер қандай да бір қосымша жайылмаса, ол үшін `Service Unavailable` хабарламасы шығарылады.

   {/note}

   {tabs}

   {tab(Tea)}

   Команданы орындаңыз:

   ```console
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/tea
   ```

   Жауап ретінде мынаны көруіңіз керек:

   ```text
   The tea pod says Hello World to everyone! This file is located on the statically claimed persistent volume.
   ```

   {/tab}

   {tab(Coffee)}

   Команданы орындаңыз:

   ```console
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/coffee
   ```

   Жауап ретінде мынаны көруіңіз керек:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the statically claimed persistent volume.
   ```

   {/tab}

   {tab(Juice)}

   Командаларды орындаңыз:

   ```console
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/juice
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/juice/0
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/juice/1
   ```

   Қосымша мен оның әрбір репликасы үшін бірдей жауап шығуы тиіс:

   ```text
   The juice StatefulSet pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

   {/tab}

   {tab(Milkshake)}

   Командаларды орындаңыз:

   ```console
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/milkshake
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/milkshake/0
   curl --resolve cafe.example.com:80:<IP-адрес Ingress> http://cafe.example.com/milkshake/1
   ```

   Қосымша мен оның әрбір репликасы үшін бірдей жауап шығуы тиіс:

   ```text
   The milkshake StatefulSet pod says Hello World to everyone! This file is located on the dynamically claimed NFS ReadWriteMany persistent volume.
   ```

   {/tab}

   {/tabs}

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=k8s-storage-delete]}

Жұмыс істеп тұрған кластер тарифтеледі және есептеу ресурстарын тұтынады. Егер тұрақты томдардың жұмысын тексеру үшін жасалған Kubernetes ресурстары сізге енді қажет болмаса, оларды жойыңыз:

1. Манифест файлдарында сипатталған ресурстарды жойыңыз: 

   {tabs}

   {tab(Linux/macOS)}

   ```console
   kubectl delete -f ./cafe-ingress.yaml
   kubectl delete -f ./milkshake.yaml
   kubectl delete -f ./juice.yaml
   kubectl delete -f ./coffee.yaml
   kubectl delete -f ./tea.yaml

   ```

   {/tab}

   {tab(Windows)}

   ```console
   kubectl delete -f ./cafe-ingress.yaml; `
   kubectl delete -f ./milkshake.yaml; `
   kubectl delete -f ./juice.yaml; `
   kubectl delete -f ./coffee.yaml; `
   kubectl delete -f ./tea.yaml
   ```

   {/tab}

   {/tabs}

1. Пайдаланылмайтын сақтау қоймаларын жойыңыз:

   - `tea` қосымшасы пайдаланған диск; 
   - `milkshake` қосымшасы пайдаланған NFS сақтау қоймасы.

   Динамикалық PVC көмегімен жасалған барлық басқа Cinder сақтау қоймалары автоматты түрде жойылады.

{include(/kz/_includes/_delete-test-cluster-short.md)}