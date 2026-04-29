{include(/kz/_includes/_translated_by_ai.md)}

`spec.type: LoadBalancer` түріндегі барлық Kubernetes сервистері үшін VK Cloud платформасы берілген мінез-құлыққа сәйкес келетін TCP жүктеме теңгергішін автоматты түрде жасай алады.

{note:warn}

Жаяту кезінде әр сервис үшін [стандартты жүктеме теңгергіші](/kz/networks/balancing/concepts/load-balancer#zhukteme_tengergishterinin_turleri) жасалады.

Жүктеме теңгергіштерін пайдалану [тарифтелмейді](/kz/networks/vnet/tariffication).

{/note}

Теңгергіш:

- Интернеттен қолжетімді жария IP мекенжайына немесе интернеттен қолжетімсіз жеке IP мекенжайына ие бола алады. IP мекенжайын теңгергішке қолмен немесе автоматты түрде тағайындауға болады.

- Қосылымдарды қолданба даналары арасында теңгерудің әртүрлі алгоритмдерін қолдана алады:

  - Репликаны кездейсоқ таңдау (әдепкі бойынша).

    Теңгергіш осылай жұмыс істейді, себебі Cloud Containers кластерлеріндегі `kube-proxy` [`iptables`](../../concepts/addons-and-settings/settings#kube_proxy_zhumys_rezhimi) режимінде жұмыс істейді.
    Толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/services-networking/service/#proxy-mode-iptables).

  - Репликаны нақты IP мекенжайына бекіту.

    Бұл жағдайда теңгергіш бірінші сұрау келген IP мекенжайына қолданбаның нақты бір репликасын бекітеді. Бұл реплика қолжетімді болып тұрғанша, осы мекенжайдан келетін барлық сұраулар соған жіберіледі.

- Тек белгілі бір IP мекенжайларынан қолжеткізуге рұқсат бере алады.

## Дайындық қадамдары

1. Ең өзекті нұсқадағы Kubernetes кластерін жасаңыз.

   Кластер параметрлерін өз қалауыңыз бойынша таңдаңыз.

1. `kubectl` көмегімен кластерге қосыла алатыныңызға көз жеткізіңіз.

## 1. Қолданба жасаңыз

Бұл қолданбаға сұрауларды жүктеме теңгергіші өңдейді. Теңгергіштің жұмысын көрсету үшін қолданба екі репликадан тұратын StatefulSet түрінде жайылады. Бұл жағдайда қолданбаның барлық подтары нөмірленеді, сондықтан теңгергіш сұрауды қай репликаға бағыттайтынын оңай анықтауға болады.

Осындай қолданбаны жасау үшін:

1. Манифест файлын жасаңыз:

   {cut(coffee.yaml)}

   ```yaml
   apiVersion: apps/v1
   kind: StatefulSet
   metadata:
     name: coffee
   spec:
     serviceName: coffee 
     replicas: 2
     selector:
       matchLabels:
         app: coffee
     template:
       metadata:
         labels:
           app: coffee
       spec:
         containers:
         - name: coffee
           image: nginxdemos/nginx-hello:plain-text
           ports:
           - containerPort: 8080
   ```

   {/cut}

1. Манифест негізінде Kubernetes ресурс жасаңыз:

   ```console
   kubectl apply -f coffee.yaml
   ```

## 2. Жүктеме теңгергіштерін жасаңыз

Жайылған `coffee` қолданбасына қызмет көрсететін әртүрлі мінез-құлықтағы бірнеше жүктеме теңгергішін жасаңыз.

Төмендегі қойындыларда теңгергіштерді жасаудың әртүрлі сценарийлері сипатталған:

- 1-сценарий — статикалық жария мекенжайды қолмен тағайындау және репликаны кездейсоқ таңдау.
- 2-сценарий — динамикалық жария мекенжайды автоматты түрде тағайындау және репликаны бекіту.
- 3-сценарий — динамикалық жария мекенжайды автоматты түрде тағайындау, репликаны кездейсоқ таңдау, қолжеткізуді шектеу.
- 4-сценарий — динамикалық жеке мекенжайды автоматты түрде тағайындау және репликаны кездейсоқ таңдау.

{tabs}

{tab(Сценарий 1)}

1. Теңгергішке тағайындау керек жария IP мекенжайын таңдаңыз немесе жаңасын жасаңыз. Мұны [VK Cloud жеке кабинетінде](../../../../networks/vnet/instructions/ip/floating-ip#add) жасауға болады.

   IP мекенжайына ішкі IP мекенжайы байланыстырылмаған болуы керек.

1. `lb-static-public-ip.yaml` манифест файлын жасаңыз.

   `spec.loadBalancerIP` параметрінде таңдалған IP мекенжайын көрсетіңіз.

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc-public-static-ip
   spec:
     type: LoadBalancer
     loadBalancerIP: <выбранный IP-адрес>
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: coffee
   ```

1. Манифест негізінде Kubernetes ресурс жасаңыз:

   ```console
   kubectl apply -f lb-static-public-ip.yaml
   ```

1. Сервистің күйін келесі командамен мезгіл-мезгіл тексеріп отырыңыз:

   ```console
   kubectl get svc coffee-svc-public-static-ip
   ```

   Сервиске қолмен берілген статикалық жария IP мекенжайы тағайындалғанша күтіңіз: кестедегі `EXTERNAL-IP` бағанында `<pending>` орнына IP мекенжайы пайда болады.

{/tab}

{tab(Сценарий 2)}

1. `lb-session-affinity.yaml` манифест файлын жасаңыз.

   `spec.sessionAffinity` параметрінде `ClientIP` мәнін көрсетіңіз. Ол пайдаланушы сессиясын нақты бір репликаға бекітуге жауап береді.

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc-session-affinity
   spec:
     type: LoadBalancer
     sessionAffinity: ClientIP
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: coffee
   ```

1. Манифест негізінде Kubernetes ресурс жасаңыз:

   ```console
   kubectl apply -f lb-session-affinity.yaml
   ```

1. Сервистің күйін келесі командамен мезгіл-мезгіл тексеріп отырыңыз:

   ```console
   kubectl get svc coffee-svc-session-affinity
   ```

   Сервиске динамикалық жария IP мекенжайы автоматты түрде тағайындалғанша күтіңіз: кестедегі `EXTERNAL-IP` бағанында `<pending>` орнына IP мекенжайы пайда болады.

{/tab}

{tab(Сценарий 3)}

1. Қолданбаға қолжеткізуге рұқсат етілуі тиіс хост үшін жария IP мекенжайын анықтаңыз.

   Мысалы, келесі команданы орындаңыз:

   ```console
   curl icanhazip.com
   ```

1. `lb-restrict-access-by-ip.yaml` манифест файлын жасаңыз.

   `spec.loadBalancerSourceRanges` параметрінде рұқсат етілген қолжеткізу үшін `IP-мекенжай/префикс` форматындағы IP мекенжайларының тізімін көрсетіңіз. Басқа IP мекенжайларынан қолжеткізуге тыйым салынады.

   Алдыңғы қадамда алынған IP мекенжайын көрсетіңіз:

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc-restrict-access-by-ip
   spec:
     type: LoadBalancer
     loadBalancerSourceRanges: 
       - <публичный IP-адрес>/32
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: coffee
   ```

1. Манифест негізінде Kubernetes ресурс жасаңыз:

   ```console
   kubectl apply -f lb-restrict-access-by-ip.yaml
   ```

1. Сервистің күйін келесі командамен мезгіл-мезгіл тексеріп отырыңыз:

   ```console
   kubectl get svc coffee-svc-restrict-access-by-ip
   ```

   Сервиске динамикалық жария IP мекенжайы автоматты түрде тағайындалғанша күтіңіз: кестедегі `EXTERNAL-IP` бағанында `<pending>` орнына IP мекенжайы пайда болады.

{/tab}

{tab(Сценарий 4)}

1. `lb-private-ip.yaml` манифест файлын жасаңыз.

   Сервис метадеректерінде `service.beta.kubernetes.io/openstack-internal-load-balancer: "true"` аннотациясын көрсетіңіз. Бұл аннотация жеке IP мекенжайы бар жүктеме теңгергішін жасауға жауап береді.

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc-private-ip
     annotations:
       service.beta.kubernetes.io/openstack-internal-load-balancer: "true"
   spec:
     type: LoadBalancer
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: coffee
   ```

1. Манифест негізінде Kubernetes ресурс жасаңыз:

   ```console
   kubectl apply -f lb-private-ip.yaml
   ```

1. Сервистің күйін келесі командамен мезгіл-мезгіл тексеріп отырыңыз:

   ```console
   kubectl get svc coffee-svc-private-ip
   ```

   Сервиске жеке IP мекенжайы тағайындалғанша күтіңіз: кестедегі `EXTERNAL-IP` бағанында `<pending>` орнына IP мекенжайы пайда болады.

{/tab}

{/tabs}

Сервистер мен жүктеме теңгергіштері туралы толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/services-networking/).

## 3. Жүктеме теңгергіштерінің жұмысын тексеріңіз

Төмендегі қойындыларда жүктеме теңгергіштерінің жұмысын тексерудің әртүрлі сценарийлері сипатталған:

- 1-сценарий — статикалық жария мекенжайы бар және репликаны кездейсоқ таңдайтын теңгергіш.
- 2-сценарий — динамикалық жария мекенжайы бар және репликаны бекітетін теңгергіш.
- 3-сценарий — динамикалық жария мекенжайы бар, репликаны кездейсоқ таңдайтын және қолжеткізуді шектейтін теңгергіш.
- 4-сценарий — динамикалық жеке мекенжайы бар және репликаны кездейсоқ таңдайтын теңгергіш.

{tabs}

{tab(Сценарий 1)}

1. Теңгергішке тағайындалған IP мекенжайын алыңыз:

   ```console
   kubectl get svc coffee-svc-public-static-ip
   ```

   Қажетті мекенжай кестедегі `EXTERNAL-IP` бағанында орналасқан.

1. Қолданбаға жүктеме теңгергіші арқылы бірнеше рет сұрау орындаңыз:
   ```console
   curl http://<IP-адрес балансировщика>
   ```

   Әртүрлі подтар жауап беруі мүмкін: `coffee-0` да, `coffee-1` де. Мұндай мінез-құлық теңгергіштің сұрауларды қолданбаның кездейсоқ репликаларына жіберетінін білдіреді.

{/tab}

{tab(Сценарий 2)}

1. Теңгергішке тағайындалған IP мекенжайын алыңыз:

   ```console
   kubectl get svc coffee-svc-session-affinity
   ```

   Қажетті мекенжай кестедегі `EXTERNAL-IP` бағанында орналасқан.

1. Қолданбаға жүктеме теңгергіші арқылы бірнеше рет сұрау орындаңыз:

   ```console
   curl http://<IP-адрес балансировщика>
   ```

   Барлық сұрауларға таңдалған бір под жауап береді: `coffee-0` немесе `coffee-1`. Мұндай мінез-құлық теңгергіштің нақты IP мекенжайынан келетін сұрауларды қолданбаның бір ғана репликасына жіберетінін білдіреді.

{/tab}

{tab(Сценарий 3)}

1. Теңгергішке тағайындалған IP мекенжайын алыңыз:

   ```console
   kubectl get svc coffee-svc-restrict-access-by-ip
   ```

   Қажетті мекенжай кестедегі `EXTERNAL-IP` бағанында орналасқан.

1. Қолданбаға жүктеме теңгергіші арқылы бірнеше рет сұрау орындаңыз (қолжеткізуге рұқсат етілген IP мекенжайынан):

   ```console
   curl http://<IP-адрес балансировщика>
   ```

   Әртүрлі подтар жауап беруі мүмкін: `coffee-0` да, `coffee-1` де. Мұндай мінез-құлық теңгергіштің сұрауларды қолданбаның кездейсоқ репликаларына жіберетінін білдіреді.

1. Басқа IP мекенжайы бар хосттан осындай сұрау орындап көріңіз. Сұрау сәтсіз аяқталады.

{/tab}

{tab(Сценарий 4)}

1. Теңгергішке тағайындалған IP мекенжайын алыңыз:

   ```console
   kubectl get svc coffee-svc-private-ip
   ```

   Қажетті мекенжай кестедегі `EXTERNAL-IP` бағанында орналасқан.

1. [Linux виртуалды машинасын жасаңыз](/kz/computing/iaas/instructions/vm/vm-create) балансировщиктің IP мекенжайы орналасқан сол ішкі желіде.

1. [SSH арқылы қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) по SSH.

1. Қолданбаға жүктеме теңгергіші арқылы бірнеше рет сұрау орындаңыз:
   ```console
   curl http://<IP-адрес балансировщика>
   ```

   Әртүрлі подтар жауап беруі мүмкін: `coffee-0` да, `coffee-1` де. Мұндай мінез-құлық теңгергіштің сұрауларды қолданбаның кездейсоқ репликаларына жіберетінін білдіреді.

{/tab}

{/tabs}

## Пайдаланылмайтын ресурстарды жойыңыз

1. Жасалған сервистер мен StatefulSet-ті жойыңыз:

   {note:warn}

   Сервистермен бірге оларға сәйкес келетін теңгергіштер де жойылады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/note}

   {tabs}

   {tab(Linux/macOS)}

   ```console
   kubectl delete svc coffee-svc-public-static-ip
   kubectl delete svc coffee-svc-session-affinity
   kubectl delete svc coffee-svc-restrict-access-by-ip
   kubectl delete svc coffee-svc-private-ip
   kubectl delete statefulset coffee

   ```

   {/tab}

   {tab(Windows)}

   ```console
   kubectl delete svc coffee-svc-public-static-ip; `
   kubectl delete svc coffee-svc-session-affinity; `
   kubectl delete svc coffee-svc-restrict-access-by-ip; `
   kubectl delete svc coffee-svc-private-ip; `
   kubectl delete statefulset coffee
   ```

   {/tab}

   {/tabs}

1. Егер `coffee-svc-public-static-ip` сервисіне тағайындалған статикалық жария IP мекенжайы сізге енді қажет болмаса, [жойыңыз](../../../../networks/vnet/instructions/ip/floating-ip#delete).

1. Жұмыс істеп тұрған кластер есептеу ресурстарын тұтынады. Егер ол сізге енді қажет болмаса:

   - [тоқтатыңыз](../../instructions/manage-cluster#klasterdi_iske_kosu_nemese_toktatu), кейінірек пайдалану үшін;
   - [жойыңыз](../../instructions/manage-cluster#delete_cluster) оны біржола.
