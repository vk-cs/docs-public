# {heading(Подтарды басқару)[id=k8s-manage-pods]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Под (pod) — қосымшалардың бір немесе бірнеше контейнерінен тұратын топ, оған ортақ пайдаланылатын сақтау орны (томдар), IP-адрес және оларды іске қосу туралы ақпарат кіреді.

Подтар туралы толық ақпарат [ресми құжаттамада](https://kubernetes.io/docs/concepts/workloads/pods/) Kubernetes берілген.

Әр под іске қосылған қосымшаның жеке инстансын (үлгісін) білдіреді. Қосымшаның әр инстансы үшін бірнеше под іске қосыңыз, егер {linkto(../scale#k8s-instructions-scale-horizontal)[text=горизонттық масштабтау]} орындасаңыз.

Подтармен орындалатын операциялар:

* {linkto(#k8s-manage-pods-create)[text=%text]}.
* {linkto(#k8s-manage-pods-connect)[text=%text]}.
* {linkto(#k8s-manage-pods-delete)[text=%text]}.

## {heading(Под жасау)[id=k8s-manage-pods-create]}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Кластерге қосылыңыз]}.
1. `pod.yaml` файлын жасап, оны өңдеу режимінде ашыңыз:

   ```console
   vi pod.yaml
   ```

1. Файлды подтың манифесімен толтырып, өзгерістерді сақтаңыз.

   NGINX веб-сервері бар под үшін манифест мысалы:

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: nginx-pod
   spec:
     containers:
     - image: nginx:1.12
       name: nginx
       ports:
       - containerPort: 80
   ```

1. `pod.yaml` файлынан кластердің конфигурациясына өзгерістер енгізіңіз:

   ```console
   kubectl apply -f pod.yaml
   ```

   Под сәтті жасалғаннан кейінгі шығыс:

   ```console
   pod/nginx-pod created
   ```

1. Әрі қарай пайдалану үшін под туралы ақпаратты шығарыңыз:

   ```console
   kubectl get pod -o wide
   ```

   Күтілетін нәтиже мысалы:

   ```console
   NAME        READY   STATUS    RESTARTS   AGE   IP             NODE                                      NOMINATED NODE   READINESS GATES
   nginx-pod   1/1     Running   0          29s   100.127.71.0   kubernetes-cluster-7779-default-group-0   <none>           <none>
   ```

## {heading(Подқа қосылу)[id=k8s-manage-pods-connect]}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Кластерге қосылыңыз]}.
1. Мақсатты под үшін `NAMESPACE` және `NAME` бағандарынан мәндерді алыңыз, команданы орындай отырып:

   ```console
   kubectl get po -A
   ```

   Күтілетін нәтиже мысалы:

   ```console
   NAMESPACE   NAME        READY   STATUS    RESTARTS  AGE
   default     nginx-pod   1/1     Running   0         5m4s
   ```

1. Подқа команданың көмегімен қосылыңыз:

   ```console
   kubectl -n <ИМЕН_КЕҢІСТІГІ> exec -it <ПОД> -- /bin/bash
   ```
   Мұнда:

   * `<ИМЕН_КЕҢІСТІГІ>` — алдыңғы қадамда алынған `NAMESPACE` параметрінің мәні.
   * `<ПОД>` — алдыңғы қадамда алынған `NAME` параметрінің мәні.

### {heading(Подтың жұмыс істеуін тексеру)[id=k8s-manage-pods-checking]}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Кластерге қосылыңыз]}.
1. {linkto(#k8s-manage-pods-create)[text=%text]} бөлімінде келтірілген мысалы бар под конфигурациясын жасаңыз. Под бұрыннан жасалған болса, бұл қадамды өткізіп жіберіңіз.
1. Жасалған под үшін `IP` бағанынан мәндерді алыңыз:

   ```console
   kubectl get pod nginx-pod
   ```

1. {linkto(#k8s-manage-pods-create)[text=Под жасаңыз]} келесі конфигурациямен:

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: nginx-pod
   spec:
     containers:
     - image: nginx:1.12
       name: nginx
       ports:
       - containerPort: 80
   ```

1. {linkto(#k8s-manage-pods-connect)[text=Подқа қосылыңыз]}.
1. curl қосымшасын орнатыңыз:

   ```console
   apt update
   apt install curl
   ```

1. `nginx-pod` подының IP-адресі бойынша cURL-сұранысты орындаңыз (2-қадамда жасалған):

   ```console
   curl 100.127.71.0
   ```

   Күтілетін нәтиже мысалы:

   ```html
   <!DOCTYPE html>
   <html>
   <head>
   <title>Welcome to nginx!</title>
   <style>
       body {
           width: 35em;
           margin: 0 auto;
           font-family: Tahoma, Verdana, Arial, sans-serif;
       }
   </style>
   </head>
   <body>
   <h1>Welcome to nginx!</h1>
   <p>If you see this page, the nginx web server is successfully installed and
   working. Further configuration is required.</p>

   <p>For online documentation and support please refer to
   <a href="http://nginx.org/">nginx.org</a>.<br/>
   Commercial support is available at
   <a href="http://nginx.com/">nginx.com</a>.</p>

   <p><em>Thank you for using nginx.</em></p>
   </body>
   </html>
   ```

## {heading(Подты жою)[id=k8s-manage-pods-delete]}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Кластерге қосылыңыз]}.
1. Мақсатты под үшін `NAME` бағанынан мәндерді алыңыз:

   ```console
   kubectl get po -A
   ```

1. Подты жойыңыз:

   ```console
   kubectl delete pod <ПОД>
   ```
   Мұнда `<ПОД>` — алдыңғы қадамда алынған `NAME` параметрінің мәні.