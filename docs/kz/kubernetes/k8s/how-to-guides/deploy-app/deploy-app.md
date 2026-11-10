# {heading(Қосымшаларды орнату)[id=k8s-deploy-app]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Kubernetes-те қосымшаны орнату `kubectl` утилитасының көмегімен жүзеге асырылады. Утилитаның командаларының толық синтаксисі [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/reference/kubectl/overview/) келтірілген.

Қосымшаны орнатуды бастамас бұрын:

1. [Ресми сайттан](https://kubernetes.io/ru/docs/tasks/tools/install-kubectl/) `kubectl` орнатыңыз.
1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Кластерге қосылыңыз]}.

Орнатылғаннан кейін қосымша данасы Docker-контейнердің ішінде жұмыс істейді.

tea қосымшасының мысалында орнату процесін қарастырайық. Қосымша үшін мыналарды жасаңыз:

* [Persistent Volume Claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/), қосымшаның ішіне деректер томдарын орнатуға (монтахауға) болатын болсын үшін.
* [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), онда репликалар саны және подқа орнатылатын том көрсетіледі.
* [Service](https://kubernetes.io/docs/concepts/services-networking/service/) қосымшаға қолжетімділікті қамтамасыз ету үшін.

Қосымшаны орнату үшін:

1. Файлдарға арналған директория жасап, оған өтіңіз:

   {tabs}

   {tab(Linux/macOS)}
   ```console
   mkdir ~/k8s-deployments && cd ~/k8s-deployments
   ```
   {/tab}

   {tab(Windows)}
   ```console
   mkdir ~/k8s-deployments; cd ~/k8s-deployments
   ```
   {/tab}

   {/tabs}

1. Осы директорияға `deploy-tea.yaml` файлын орналастырыңыз:

   ```yml
   kind: PersistentVolumeClaim
   apiVersion: v1
   metadata:
     name: k8s-demo-pvc-tea
   spec:
     storageClassName: "csi-ceph-ssd-pa2"
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 1Gi

   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: tea
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: tea
     template:
       metadata:
         labels:
           app: tea
       spec:
         volumes:
           - name: k8s-pv-tea
             persistentVolumeClaim:
               claimName: k8s-demo-pvc-tea
         imagePullSecrets:
           - name: k8s-registry-creds
         containers:
           - name: tea
             image: 192.0.2.22:5000/vk-cloud-demo/nginx-k8s-demo:latest
             imagePullPolicy: Always
             ports:
               - containerPort: 8080
             volumeMounts:
               - name: k8s-pv-tea
                 mountPath: /etc/nginx/k8s_demo_pv

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: tea-svc
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: tea
   ```

   {note:warn}
   `deploy-tea.yaml` файлында Persistent Volume Claim үшін қосымшаны орнату жоспарланған түйіннің қолжетімділік аймағына сәйкес келетін сақтау класы көрсетілетініне назар аударыңыз.

   Бір қолжетімділік аймағындағы түйінге басқа қолжетімділік аймағынан орнатылған томы бар қосымшаны орналастыру әрекеті қатеге әкелуі мүмкін.
   {/note}

1. Қосымшаны орнатыңыз:

   ```console
   kubectl apply -f deploy-tea.yaml
   ```

1. Орнатудың дұрыстығын тексеріңіз:

   * Persistent Volume Claim — келесі команданың көмегімен:

     ```console
     kubectl get pvc
     ```

   * Deployment — келесі команданың көмегімен:

     ```console
     kubectl get deployment
     ```

   * Service — келесі команданың көмегімен:

     ```console
     kubectl get svc
     ```

1. Қосымша үшін Ingress конфигурациялаңыз. Ingress-контроллер tea қосымшасы жарияланған сәйкес сервиге сұрауларды бағыттауы үшін:

   1. `~/k8s-deployments` директориясына `deploy-ingress.yaml` yaml-файлын орналастырыңыз:

      ```yml
      apiVersion: networking.k8s.io/v1
      kind: Ingress
      metadata:
        name: tea-ingress
      spec:
        ingressClassName: nginx
        rules:
          - host: tea.example.com
            http:
              paths:
                - path: /tea
                  pathType: Prefix
                  backend:
                    service:
                      name: tea-svc
                      port:
                        number: 80
      ```

   1. Ingress ресурсын орнатыңыз:

      ```console
      kubectl apply -f deploy-ingress.yaml
      ```

   1. Орнатудың дұрыстығын тексеріңіз:

      ```console
      kubectl get ingress
      ```

1. Кластердегі қосымшаның барлық жасалған ресурстарының жұмыс қабілеттілігін тексеріңіз. Ол үшін жүктемені теңгерушінің IP-мекенжайына curl-сұрау орындаңыз:

   ```console
   curl --resolve cafe.example.com:80:<IP-МКЕНЖАЙ> http://tea.example.com/tea
   ```
   Мұнда `<IP-МКЕНЖАЙ>` — жүктемені теңгерушінің IP-мекенжайы.