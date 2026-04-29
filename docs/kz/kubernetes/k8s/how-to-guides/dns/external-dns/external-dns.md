{include(/kz/_includes/_translated_by_ai.md)}

[ExternalDNS](https://github.com/kubernetes-sigs/external-dns) [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) немесе [Service](https://kubernetes.io/docs/concepts/services-networking/service/) ресурстарымен жұмыс істеген кезде DNS жазбаларын басқаруды автоматтандыруға мүмкіндік береді. Егер бұл ресурстар ExternalDNS талаптарына сәйкес бапталса, онда олар жасалғаннан кейін бірден домендік атпен қолжетімді болады.

ExternalDNS плагиннің көмегімен VK Cloud-тағы [DNS сервисімен](/kz/networks/dns/instructions/publicdns) интеграцияланады. Төменде ExternalDNS-ті кластерге қалай орнату және бұл құралды `Ingress` пен `Service` ресурстарымен қалай пайдалану көрсетіледі.

## Дайындық қадамдары

1. Егер бұл әлі жасалмаса, ExternalDNS жұмыс істейтін [DNS аймағын жасаңыз](/kz/networks/dns/instructions/publicdns/dns-zone#add).

   Мысал ретінде төменде `example.com` аймағы пайдаланылады.

1. [жасаңыз](../../../instructions/create-cluster) кластер Cloud Containers самой актуальной версии, который имеет внешний IP-адрес и доступен из интернета.

   Кластердің қалған параметрлерін өз қалауыңыз бойынша таңдаңыз.

1. `kubectl` көмегімен кластерге қосыла алатыныңызға [көз жеткізіңіз](../../../connect/kubectl).

   Қосылу үшін VK Cloud жеке кабинетінен жүктелген кластер конфигурациясының файлын (kubeconfig) пайдаланыңыз.

1. Егер утилита әлі орнатылмаса, 3.0.0 немесе одан жоғары нұсқадағы Helm-ді [орнатыңыз](../../../install-tools/helm).

   Орнату үшін кластермен [үйлесімді](https://helm.sh/docs/topics/version_skew/) Helm нұсқасын таңдаңыз.

1. Кластерге арналған kubeconfig файлын көрсететін орта айнымалысын орнатыңыз. Бұл ExternalDNS орнату кезінде `kubectl` және `helm` утилиталарымен жұмысты жеңілдетеді.

   Сіздің kubeconfig файлыңызға жол төмендегі мысалдан өзгеше болуы мүмкін.

   {tabs}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   export KUBECONFIG="/home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml"
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   $Env:KUBECONFIG="C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml"
   ```

   {/tab}

   {/tabs}

## 1. ExternalDNS үшін пайдаланушыны дайындаңыз

ExternalDNS осы VK Cloud пайдаланушысының деректемелерін API VK Cloud-пен өзара әрекеттесу және DNS ресурстық жазбаларын басқару үшін қолданады.

Пайдаланушыны дайындап, барлық қажетті деректемелерді алыңыз:

1. [таңдаңыз](/kz/tools-for-using-services/account/instructions/project-settings/access-manage#zhoba_katysushylaryn_karau) существующего пользователя или [шақырыңыз](/kz/tools-for-using-services/account/instructions/project-settings/access-manage#zhobaga_zhana_katysushyny_shakyru) нового пользователя.

   Пайдаланушыға қойылатын талаптар:

   - Должен быть [белсендірілген](/kz/tools-for-using-services/api/rest-api/enable-api) доступ по API.
   - Должна быть [тағайындалған](/kz/tools-for-using-services/account/instructions/project-settings/access-manage#katysushynyn_rolin_ozgertu) одна из следующих ролей, чтобы ExternalDNS мог оперировать ресурсными записями в рамках DNS-зоны:

     - Желі әкімшісі (ең аз қажетті [рөл](/kz/tools-for-using-services/account/concepts/rolesandpermissions#cloud_containers_servisi_rolderine_arnalgan_kukyktar)).
     - Жоба әкімшісі.
     - Суперадминистратор.
     - Жоба иесі.

     {note:info}

     ExternalDNS-пен жұмыс істеу үшін Желі әкімшісі рөлі бар бөлек пайдаланушы бөлу ұсынылады. Бұл шабуылдаушы осы пайдаланушының деректемелеріне қол жеткізсе, ықтимал зиянды азайтады.

     {/note}

1. API VK Cloud-қа қол жеткізу үшін қажетті деректемелерді алыңыз:

   1. [өтіңіз](https://kz.cloud.vk.com/app/) в личный кабинет VK Cloud, используя реквизиты пользователя, выделенного для ExternalDNS.
   1. Бет үстіңгі жағындағы пайдаланушы атауын басып, **Жоба баптаулары** тармағын таңдаңыз.
   1. **API арқылы қолжеткізу** қойындысына өтіп, келесі параметрлердің мәндерін жазып алыңыз:

      - Project ID (OpenStack үшін Project ID);
      - User Domain Name (пайдаланушы доменінің атауы);
      - Username (пайдаланушы атауы);
      - Region Name (аймақ атауы);
      - Auth URL (аутентификацияға арналған URL).

1. Осы пайдаланушының құпиясөзін жазып алыңыз: ол да API-ға қол жеткізу үшін қажет.

## 2. ExternalDNS орнатыңыз

1. ExternalDNS орнатылатын атаулар кеңістігін жасаңыз:

   ```console
   kubectl create ns external-dns
   ```

1. Осы атаулар кеңістігінде [пайдаланушыны дайындау кезінде алынған](#1_externaldns_ushin_paydalanushyny_dayyndanyz) VK Cloud API-іне қол жеткізу деректемелері бар құпияны жасаңыз:

   {tabs}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   kubectl -n external-dns create secret generic vkcs-auth \
     --from-literal=ProjectID="<Project ID>" \
     --from-literal=UserDomainName="<User Domain Name>" \
     --from-literal=Username="<Username>" \
     --from-literal=RegionName="<Region Name>" \
     --from-literal=AuthURL="<Auth URL>" \
     --from-literal=Password="<пароль пользователя>"
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   kubectl -n external-dns create secret generic vkcs-auth `
     --from-literal=ProjectID="<Project ID>" `
     --from-literal=UserDomainName="<User Domain Name>" `
     --from-literal=Username="<Username>" `
     --from-literal=RegionName="<Region Name>" `
     --from-literal=AuthURL="<Auth URL>" `
     --from-literal=Password="<пароль пользователя>"
   ```

   {/tab}

   {/tabs}

1. Bitnami Helm репозиторийін қосыңыз:

   ```console
   helm repo add bitnami https://charts.bitnami.com/bitnami
   ```

1. Helm көмегімен ExternalDNS орнатуға қажет мәндері ([values](https://helm.sh/docs/chart_template_guide/values_files/)) бар файл жасаңыз:

   {cut(external-dns-vkcs-values.yaml)}

   ```yaml
   policy: upsert-only
   txtPrefix: externaldns-

   provider: webhook
   
   extraArgs:
     webhook-provider-url: http://localhost:8888
   
   sidecars:
     - name: vkcs-plugin
       image: registry.infra.mail.ru:5010/external-dns-vkcs-plugin:latest
       imagePullPolicy: Always
       ports:
         - name: http
           containerPort: 8888
       livenessProbe:
         httpGet:
           path: /healthz
           port: http
         initialDelaySeconds: 10
         timeoutSeconds: 5
       readinessProbe:
         httpGet:
           path: /healthz
           port: http
         initialDelaySeconds: 10
         timeoutSeconds: 5
       env:
         - name: OS_AUTH_URL
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: AuthURL
         - name: OS_USERNAME
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: Username
         - name: OS_PASSWORD
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: Password
         - name: OS_PROJECT_ID
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: ProjectID
         - name: OS_DOMAIN_NAME
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: UserDomainName
         - name: OS_REGION_NAME
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: RegionName
         - name: SERVER_HOST
           value: "0.0.0.0"
         - name: SERVER_PORT
           value: "8888"
   ```

   {/cut}

   Helm-чарттың (chart) ExternalDNS жұмысына көптеген мәндер әсер етеді. Жасалған файлда ExternalDNS-пен жұмысты бастауға жеткілікті ең аз мәндер жиыны берілген. Төменде ExternalDNS-тің DNS VK Cloud-пен жұмысына әсер ететін ең маңызды мәндер сипатталған. VK Cloud плагиніне қатысы жоқ мәндердің сипаттамалары (`sidecars[]` мәнінен басқасының бәрі) чартқа арналған [README.md](https://github.com/kubernetes-sigs/external-dns/tree/master/charts/external-dns#values) файлында келтірілген.

   {note:warn}

   Төменде келтірілген міндетті мәндерді өзгертпеңіз және жоймаңыз. Бұл ExternalDNS-тің қате жұмысына әкелуі мүмкін.

   {/note}

   {cut(ExternalDNS әрекетіне әсер ететін маңызды мәндердің сипаттамасы)}

   - (**Міндетті мән**) `provider`: `webhook` мәні DNS-пен жұмыс істеу үшін вебхуктар (webhooks) механизмін қолдайтын сыртқы плагинді пайдалану керектігін көрсетеді.

   - (**Міндетті мән**) `extraArgs:webhook-provider-url`: плагинмен өзара әрекеттесу үшін пайдаланылуы тиіс URL.

   - `policy`: ресурстық жазбаларды синхрондау саясаты. Әдепкі бойынша `upsert-only` саясаты пайдаланылады: ExternalDNS ресурстық жазбаларды тек қосады, бірақ жоймайды.

     Егер Kubernetes ресурстарын жойғанда ExternalDNS солар үшін жасалған ресурстық жазбаларды да жойсын десеңіз, `sync` саясатын пайдаланыңыз.

   - `txtPrefix`: ExternalDNS жасайтын TXT жазбаларына арналған префикс.

     ExternalDNS Kubernetes ресурстары үшін A-жазбаларды да, CNAME-жазбаларды да автоматты түрде қоса алады.

     ExternalDNS DNS-аймақтың қай ресурстық жазбаларын өзі басқаратынын қызметтік ақпаратты TXT жазбаларында орналастыру арқылы қадағалайды. Атап айтқанда, әдепкі баптаулармен ол қосылатын жазбамен бірдей атауы бар қызметтік TXT жазбасын жасайды: мысалы, `example.com` A-жазбасы үшін дәл сондай `example.com` атауы бар сәйкес TXT жазбасы жасалады.

     Алайда [RFC 1912](https://www.rfc-editor.org/rfc/rfc1912) бойынша CNAME-жазбалары дәл сондай атауы бар басқа жазбалармен қатар өмір сүре алмайды. Сондықтан ExternalDNS TXT-жазбаларының атына `txtPrefix` ішінде берілген префикс қосылатын етіп бапталады. Бұл CNAME-жазбаларымен жұмыс істеген кезде ықтимал коллизияларды болдырмауға мүмкіндік береді: мысалы, `example.com` CNAME-жазбасы үшін `externaldns-example.com` атауымен сәйкес TXT-жазбасы жасалады.

     Қажет болса, `externaldns-` мәнінен өзгеше басқа префикс бере аласыз.

   {/cut}

   DNS VK Cloud-пен интеграцияны қамтамасыз ететін ExternalDNS плагинінің плагин жұмысына әсер ететін көптеген баптаулары бар. Баптаулар `sidecars[].env` ішіндегі орта айнымалылары арқылы беріледі. Жасалған файлда тек міндетті баптаулар ғана көрсетілген. Қажет болса, плагинге қосымша баптауларды тиісті орта айнымалыларын қосу арқылы бере аласыз.

   {note:warn}

   Төменде тізімделген плагиннің міндетті баптауларын өзгертпеңіз және жоймаңыз. Бұл ExternalDNS-тің қате жұмысына әкелуі мүмкін.

   {/note}

   {cut(Плагин әрекетіне әсер ететін мәндердің сипаттамасы)}

   - (**Міндетті баптаулар**) `OS_` префиксі бар айнымалыларға сәйкес келетін баптаулар плагиннің API VK Cloud-пен өзара әрекеттесуі кезінде аутентификация үшін пайдаланылады.

     Бұл айнымалылардың мәндері бұрын жасалған Kubernetes құпиясында сақталады.

   - (**Міндетті баптаулар**) `SERVER_HOST` және `SERVER_PORT` айнымалыларына сәйкес келетін баптаулардың мәндері бекітілген және плагиннің дұрыс жұмыс істеуі үшін қажет.

   - DNS-аймақтарды сүзгілеу баптаулары:

     - Ресурстық жазбалар жасауға рұқсат етілген DNS-аймақтарға арналған сүзгілер:

       - `DOMAIN_FILTERS`: үтір арқылы бөлінген домендік атаулар тізімі бар жол. Мысалы, `example.com,contoso.com`.
       - `REGEX_DOMAIN_FILTER`: строка с регулярным выражением ([RE2 синтаксисі](https://github.com/google/re2/wiki/Syntax)). Например, `.*.com$`.

       Егер екі сүзгі де конфигурацияланған болса, `REGEX_DOMAIN_FILTER` сүзгісі `DOMAIN_FILTERS` сүзгісінен басым болады. Әдепкі бойынша сүзгілеу жүргізілмейді.

     - Ресурстық жазбалар жасауға тыйым салынған DNS-аймақтарға арналған сүзгілер:

       - `EXCLUDE_DOMAINS`: үтір арқылы бөлінген домендік атаулар тізімі бар жол. Мысалы, `example.org,foo.bar.com`.
       - `REGEX_DOMAIN_FILTER_EXCLUSION`: строка с регулярным выражением ([RE2 синтаксисі](https://github.com/google/re2/wiki/Syntax)). Например, `^stage-.*.com$`.

       Егер екі сүзгі де конфигурацияланған болса, `REGEX_DOMAIN_FILTER_EXCLUSION` сүзгісі `EXCLUDE_DOMAINS` сүзгісінен басым болады. Әдепкі бойынша сүзгілеу жүргізілмейді.

     - `SERVER_READ_TIMEOUT`: серверге ашық қосылым кезінде оқу тайм-ауты (секундпен). Әдепкі мәні: `30`.
     - `SERVER_WRITE_TIMEOUT`: серверге ашық қосылым кезінде жазу тайм-ауты (секундпен). Әдепкі мәні: `30`.

     - `LOG_LEVEL`: плагин жұмысы кезінде туындайтын оқиғаларды логтау деңгейі.

       `error`, `warn`, `info`, `debug`, `trace` деңгейлері қолдау табады. Әдепкі мәні: `info`.

     - `DRY_RUN`: плагинді «dry run» («сынақтық іске қосу») режимінде іске қосуға мүмкіндік беретін жалау.

       - `false` (әдепкі бойынша): «dry run» режимі **өшірілген**. Плагин жұмыс істейді және баптауларға сәйкес DNS-аймақтағы ресурстық жазбаларды басқарады.
       - `true`: «dry run» режимі **қосылған**. Плагин жұмыс істейді, бірақ DNS-аймақтағы ресурстық жазбаларды басқармайды: ешқандай ресурстық жазба жасалмайды және жойылмайды.

   {/cut}

1. ExternalDNS-ті орнатыңыз:

   ```console
   helm -n external-dns install external-dns-vkcs bitnami/external-dns -f external-dns-vkcs-values.yaml
   ```

1. Helm-чарттың сәтті жазылғанына көз жеткізіңіз:

   ```console
   helm -n external-dns list && kubectl -n external-dns get all
   ```

   {cut(Команда шығысының бір бөлігінің мысалы)}

   ```text
   NAME                    NAMESPACE       ...        ...   STATUS          CHART                 ...
   external-dns-vkcs       external-dns    ...        ...   deployed        external-dns-6.32.1   ...

   NAME                                     READY   STATUS    RESTARTS   AGE
   pod/external-dns-vkcs-NNNNNNNNNN-MMMMM   2/2     Running   0          ...
   
   NAME                        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
   service/external-dns-vkcs   ClusterIP   10.254.169.195   <none>        7979/TCP   ...
   
   NAME                                READY   UP-TO-DATE   AVAILABLE   AGE
   deployment.apps/external-dns-vkcs   1/1     1            1           87s
   
   NAME                                           DESIRED   CURRENT   READY   AGE
   replicaset.apps/external-dns-vkcs-NNNNNNNNNN   1         1         1       ...
   ```

   {/cut}

## 3. External DNS жұмысын тексеріңіз

Төменде [NGINX-тен Cafe мысалына](https://github.com/nginxinc/kubernetes-ingress/tree/v2.4.0/examples/ingress-resources/complete-example) негізделген бірнеше демо-қолданба жазылады. Бұл қолданбалар ExternalDNS-пен жұмыс істеуге бапталған `Service` және `Ingress` көмегімен жарияланады (интернеттен қолжетімді болады).

### 3.1. LoadBalancer түріндегі сервисті пайдаланып қолданбаны жариялаңыз

1. `tea` қолданбасына арналған манифест жасаңыз:

   {cut(tea-app.yaml)}

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: tea
     labels:
       app: tea
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: tea
     template:
       metadata:
         labels:
           app: tea
       spec:
         containers:
         - name: tea
           image: nginxdemos/nginx-hello:plain-text
           ports:
           - containerPort: 8080
   ```

   {/cut}

1. Қолданбаны жазу үшін осы манифестті кластерде қолданыңыз:

   ```console
   kubectl apply -f tea-app.yaml
   ```

1. Қолданбаның үш репликадан тұратын `ReplicaSet` ретінде сәтті жазылғанын тексеріңіз:

   ```console
   kubectl get rs,pod -l app==tea
   ```

   {cut(Команда шығысының ішінара мысалы)}

   ```text
   NAME                           DESIRED   CURRENT   READY   AGE
   replicaset.apps/tea-XXXXXXXXX  3         3         3       ...

   NAME                      READY   STATUS    RESTARTS   AGE
   pod/tea-XXXXXXXXX-AAAAA   1/1     Running   0          ...
   pod/tea-XXXXXXXXX-BBBBB   1/1     Running   0          ...
   pod/tea-XXXXXXXXX-CCCCC   1/1     Running   0          ...
   ```

   {/cut}

1. Kubernetes сервисіне (`Service`) арналған `tea-service.yaml` манифестін жасаңыз.

   Бұл сервис жазылған қолданбаны жариялау үшін пайдаланылады. Қолданба `tea.example.com` домендік атауы арқылы қолжетімді болады.

   ExternalDNS сервис үшін ресурстық жазбалар жасауы үшін:

   - Сервис үшін `external-dns.alpha.kubernetes.io/hostname` аннотациясы берілуі тиіс.
   - Сервис [LoadBalancer](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer) түрінде болуы керек.

   Егер ресурстық жазбалар үшін стандартты емес TTL беру керек болса, `external-dns.alpha.kubernetes.io/ttl` аннотациясын көрсетіңіз (әдепкі бойынша: 86400 секунд, 24 сағат).

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     annotations:
       external-dns.alpha.kubernetes.io/hostname: "tea.example.com"
       external-dns.alpha.kubernetes.io/ttl: "3600"
     name: tea-svc
     labels:
       app: tea
   spec:
     type: LoadBalancer
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: tea
   ```

   Мұнда:

   - `external-dns.alpha.kubernetes.io/hostname` міндетті аннотациясы көрсетілген: сервис үшін пайдаланылуы тиіс домендік атау.
   - `external-dns.alpha.kubernetes.io/ttl` опционалды аннотациясы көрсетілген: ExternalDNS жасайтын ресурстық жазбаға арналған секундтардағы TTL.

   - `LoadBalancer` сервис түрі таңдалған. Мұндай сервис үшін [стандартты жүктеме теңгергіші](/kz/networks/balancing/concepts/load-balancer#zhukteme_tengergishterinin_turleri) жасалады. Әдепкі бойынша теңгергіш жария IP мекенжайымен жасалатындықтан, сервиспен байланысты қолданба интернеттен қолжетімді болады.

     {note:warn}

     Использование балансировщика [тарифтелмейді](/kz/networks/vnet/tariffication).

     {/note}

1. Сервисті жасау үшін осы манифестті кластерде қолданыңыз:

   ```console
   kubectl apply -f tea-service.yaml
   ```

1. Сервистің күйін тексеріңіз:

   ```console
   kubectl get svc tea-svc
   ```

   Сервиске теңгергіштің жария IP мекенжайы тағайындалғанша күтіңіз. Теңгергішті жасау ұзақ уақыт алуы мүмкін.

   {cut(Команда шығысының ішінара мысалы)}

   - Теңгергіш жасау процесінде:

     ```text
     NAME      TYPE           CLUSTER-IP       EXTERNAL-IP    PORT(S)        AGE
     tea-svc   LoadBalancer   10.254.170.195   <pending>      80:32314/TCP   ...
     ```

   - Теңгергіш сәтті жасалды:

     ```text
     NAME      TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)        AGE
     tea-svc   LoadBalancer   10.254.170.195   203.0.113.111      80:32314/TCP   ...
     ```

   {/cut}

1. ExternalDNS қажетті ресурстық жазбаларды жасағанына көз жеткізіңіз:

   1. [ресурстық жазбалар тізімін алыңыз](/kz/networks/dns/instructions/publicdns/records#resurstyk_zhazbalar_tizimin_karau) для зоны `example.com`.
   1. Тізімнен ExternalDNS жасаған жазбаларды табыңыз:

      - Бір `tea.example.com` A-жазбасын.
      - `externaldns-tea.example.com` және `externaldns-a-tea.example.com` екі TXT-жазбасын.

        Бұл TXT-жазбалар қызметтік болып табылады және ExternalDNS оларды `tea-svc` сервисі үшін жасалған A-жазбаның күйін бақылау үшін пайдаланады.

        {note:info}

        Мұндай жазбаларды атауындағы `externaldns-` префиксі бойынша оңай ажыратуға болады. Олардың мәндері `heritage=.../owner=.../resource=...` түріндегі стандартты құрылымға ие.

        Егер [ExternalDNS орнату кезінде](#2_externaldns_ornatynyz) сіз префикстің басқа мәнін берген болсаңыз, онда қызметтік TXT жазбаларының атаулары өзгеше болады.

        {/note}

      Егер қажетті ресурстық жазбалар болмаса, тағы бірнеше минут күтіңіз. ExternalDNS сервисте IP мекенжай тағайындалғаннан кейін ресурстық жазбаларды жасай бастайды. Бұл үшін біраз уақыт қажет.

1. Қолданбаның домендік атау арқылы қолжетімді екенін тексеріңіз. Ол үшін браузерде `http://tea.example.com` мекенжайына өтіңіз.

   Қолданбадан келесі түрдегі жауап бар бет ашылуы тиіс:

   ```text
   Server address: 10.100.184.219:8080
   Server name: tea-XXXXXXXXX-AAAAA
   Date: 09/Feb/2024:10:09:51 +0000
   URI: /
   Request ID: <уникальный идентификатор запроса>
   ```

   Осы мекенжай бойынша қолданбамен сәтті өзара әрекеттесу ExternalDNS-тің `LoadBalancer` түріндегі сервиспен дұрыс жұмыс істейтінін көрсетеді.

### 3.2. Ingress пайдаланып қолданбаны жариялаңыз

1. [орнатыңыз](/kz/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-ingress) в кластер аддон Ingress NGINX самой актуальной версии.

   **Стандартты орнатуды** орындаңыз. Ешқандай параметрлерді өзгертпеңіз, тек аддонды баптау кодын түзетіңіз:

   1. `service.beta.kubernetes.io/openstack-internal-load-balancer` аннотациясының мәні `false` екеніне көз жеткізіңіз:

      ```yaml
      controller:
        ...
        service:
          annotations: {"loadbalancer.openstack.org/proxy-protocol": "true", "service.beta.kubernetes.io/openstack-internal-load-balancer": "false"}
          ...
      ```

      Бұл Ingress контроллері үшін жария IP мекенжайы бар жүктеме теңгергішінің жасалуы үшін қажет. Сонда Ingress пайдаланатын қолданба интернеттен қолжетімді болады.

   1. `controller.publishService.enabled` өрісіне `true` мәнін беріңіз:

      ```yaml
      controller:
        ...
        publishService:
          enabled: true
          pathOverride: ""
          ...
      ```

      Бұл Ingress ресурсына Ingress контроллерінің жария IP мекенжайы тағайындалуы үшін қажет. Бұл ExternalDNS-ке Ingress үшін дұрыс ресурстық жазбаларды жасауға мүмкіндік береді.

   Аддон орнатылуы аяқталғанша күтіңіз. Бұл процесс ұзақ уақыт алуы мүмкін.

1. `coffee` қолданбасына арналған манифест жасаңыз:

   {cut(coffee-app.yaml)}

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: coffee
     labels:
       app: coffee
   spec:
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

1. Қолданба пайдаланатын Kubernetes сервисіне арналған манифест жасаңыз.

   {cut(coffee-service.yaml)}

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc
     labels:
      app: coffee
   spec:
     type: ClusterIP
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: coffee
   ```

   {/cut}

   Мұнда сервис үшін [ClusterIP](https://kubernetes.io/docs/concepts/services-networking/service/#type-clusterip) түрі берілген, бұл жеткілікті, өйткені қолданба Ingress көмегімен жарияланады. Мұндай сервис тек кластердің ішінен қолжетімді және [бұрын жасалған](#31_loadbalancer_turindegi_servisti_paydalanyp_koldanbany_zhariyalanyz_fc3955aa) сервистен айырмашылығы, оған арнайы жүктеме теңгергіші бөлінбейді.

1. Барлық қажетті ресурстарды жасау үшін осы манифесттерді кластерде қолданыңыз:

   ```console
   kubectl apply -f coffee-app.yaml -f coffee-service.yaml
   ```

1. Қолданбаның сәйкес сервиспен бірге екі репликадан тұратын `ReplicaSet` ретінде сәтті жазылғанын тексеріңіз:

   ```console
   kubectl get rs,pod,svc -l app==coffee
   ```

   {cut(Команда шығысының ішінара мысалы)}

   ```text
   NAME                                DESIRED   CURRENT   READY   AGE
   replicaset.apps/coffee-YYYYYYYYY    2         2         2       ...
   
   NAME                         READY   STATUS    RESTARTS   AGE
   pod/coffee-YYYYYYYYY-DDDDD   1/1     Running   0          ...
   pod/coffee-YYYYYYYYY-EEEEE   1/1     Running   0          ...
   
   NAME                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
   service/coffee-svc   ClusterIP   10.254.243.13   <none>        80/TCP    ...
   ```

   {/cut}

1. Ingress ресурсына арналған `cafe-ingress.yaml` манифестін жасаңыз.

   Бұл Ingress ресурсы жазылған қолданбаны жариялау үшін пайдаланылады. Қолданба `http://cafe.example.com/coffee` URL мекенжайы бойынша `cafe.example.com` доменінде қолжетімді болады.

   ExternalDNS сервис үшін ресурстық жазбалар жасауы үшін манифестте ешқандай қосымша мәндерді көрсету қажет емес: дұрыс бапталған Ingress контроллерінің болуы жеткілікті. Домендік атаулар мәндері Ingress ережелерінің `spec.rules[]` өрістеріндегі `host` өрістерінен алынады.

   Егер ресурстық жазбаларға стандартты емес TTL беру қажет болса, `external-dns.alpha.kubernetes.io/ttl` аннотациясын көрсетіңіз (әдепкі бойынша: 86400 секунд, 24 сағат).

   ```yaml
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: cafe-ingress
     annotations:
       external-dns.alpha.kubernetes.io/ttl: "3600"
   spec:
     ingressClassName: nginx
     rules:
     - host: cafe.example.com
       http:
         paths:
         - path: /coffee
           pathType: Prefix
           backend:
             service:
               name: coffee-svc
               port:
                 number: 80
   ```

   Мұнда:

   - `external-dns.alpha.kubernetes.io/ttl` опционалды аннотациясы көрсетілген: ExternalDNS жасайтын ресурстық жазбалар үшін секундтардағы TTL.
   - Ingress ережесі үшін `cafe.example.com` хосты көрсетілген. Тек бір хост көрсетілгендіктен, осы домендік атау үшін бір ресурстық жазба жасалады.
   - Ingress ережесіне сәйкес, `coffee-svc` сервисінің артында тұрған `coffee` қолданбасы `http://cafe.example.com/coffee` URL бойынша қолжетімді болады.

1. Ресурсты жасау үшін осы манифестті кластерде қолданыңыз:

   ```console
   kubectl apply -f cafe-ingress.yaml
   ```

1. Ingress күйін тексеріңіз:

   ```console
   kubectl get ingress cafe-ingress
   ```

   Ingress ресурсына жария IP мекенжайы тағайындалғанша күтіңіз. Бұл мекенжай Ingress контроллерінің мекенжайымен бірдей болады.

   {cut(Команда шығысының ішінара мысалы)}

   - Ingress-ке әлі IP мекенжай тағайындалмаған:

     ```text
     NAME           CLASS   HOSTS               ADDRESS   PORTS   AGE
     cafe-ingress   nginx   cafe.example.com              80      ...
     ```

   - Ingress-ке IP мекенжай тағайындалды:

     ```text
     NAME           CLASS   HOSTS               ADDRESS                PORTS   AGE
     cafe-ingress   nginx   cafe.example.com    203.0.113.222.nip.io   80      ...
     ```

   {/cut}

1. ExternalDNS қажетті ресурстық жазбаларды жасағанына көз жеткізіңіз:

   1. [ресурстық жазбалар тізімін алыңыз](/kz/networks/dns/instructions/publicdns/records#resurstyk_zhazbalar_tizimin_karau) для зоны `example.com`.
   1. Тізімнен ExternalDNS жасаған жазбаларды табыңыз:

      - Бір `cafe.example.com` CNAME-жазбасын.
      - `externaldns-cafe.example.com` және `externaldns-cname-cafe.example.com` екі TXT-жазбасын.

        Бұл TXT-жазбалар — қызметтік және ExternalDNS оларды `cafe-ingress` Ingress үшін жасалған CNAME-жазбаның күйін бақылау үшін пайдаланады.

      Егер қажетті ресурстық жазбалар болмаса, тағы бірнеше минут күтіңіз. ExternalDNS ресурстық жазбаларды Ingress ресурсына IP мекенжайы тағайындалғаннан кейін жасай бастайды. Бұл үшін біраз уақыт қажет.

1. Қолданбаның домендік атау арқылы қолжетімді екенін тексеріңіз. Ол үшін браузерде `http://cafe.example.com/coffee` мекенжайына өтіңіз.

   Қолданбадан келесі түрдегі жауап бар бет ашылуы тиіс:

   ```text
   Server address: 10.100.184.220:8080
   Server name: coffee-YYYYYYYYY-DDDDD
   Date: 09/Feb/2024:13:07:11 +0000
   URI: /coffee
   Request ID: <уникальный идентификатор запроса>
   ```

   Осы мекенжай бойынша қолданбамен сәтті өзара әрекеттесу ExternalDNS-тің Ingress ресурсымен дұрыс жұмыс істейтінін көрсетеді.

## Пайдаланылмайтын ресурстарды жойыңыз

1. Егер ExternalDNS жұмысқа қабілеттілігін тексеру үшін жасалған Kubernetes ресурстары сізге енді қажет болмаса, оларды жойыңыз:

1. `tea` қолданбасымен байланысты барлық ресурстарды жойыңыз:

      ```console
      kubectl delete -f cafe-ingress.yaml -f coffee-service.yaml -f coffee-app.yaml
      ```

      Сервиске байланысты жүктеме теңгергішін жою ұзақ уақыт алуы мүмкін.

   1. `coffee` қолданбасына қатысты барлық ресурстарды жойыңыз:

      ```console
      kubectl delete -f tea-service.yaml -f tea-app.yaml
      ```
  
   1. [ресурстық жазбаларды жойыңыз](../../../instructions/addons/manage-addons#addondy_zhoyu).

      Мұны, егер сіз `external-dns-vkcs-values.yaml` файлын [ExternalDNS орнату кезінде](#2_externaldns_ornatynyz) өзгертпеген болсаңыз, орындау қажет: онда ExternalDNS `upsert-only` саясатын пайдаланады және Kubernetes ресурстарын жойған кезде DNS аймағынан ресурстық жазбаларды жоймайды. Егер сіз бұл файлды өзгертіп, `sync` саясатын таңдасаңыз, онда бұл жазбалар автоматты түрде жойылады.

   1. ExternalDNS жасаған [ресурстық жазбаларды](/kz/networks/dns/instructions/publicdns/dns-zone#delete) жойыңыз.

      Мұны, егер сіз `external-dns-vkcs-values.yaml` файлын [ExternalDNS орнату кезінде](#2_externaldns_ornatynyz) өзгертпеген болсаңыз, орындау қажет: онда ExternalDNS `upsert-only` саясатын пайдаланады және Kubernetes ресурстарын жойған кезде DNS аймағынан ресурстық жазбаларды жоймайды. Егер сіз бұл файлды өзгертіп, `sync` саясатын таңдасаңыз, онда бұл жазбалар автоматты түрде жойылады.

      Ресурстық жазбалар тізімі:

      - `tea.example.com` A-жазбасы.
      - `externaldns-tea.example.com` және `externaldns-a-tea.example.com` TXT-жазбалары.
      - `cafe.example.com` CNAME-жазбасы.
      - `externaldns-cafe.example.com` және `externaldns-cname-cafe.example.com` TXT-жазбалары.

1. Егер ExternalDNS сізге енді қажет болмаса, оны жойыңыз:

   1. ExternalDNS бар Helm-чартты жойыңыз:

      ```console
      helm -n external-dns uninstall external-dns-vkcs
      ```

   1. `external-dns` атаулар кеңістігін жойыңыз.

      {note:warn}

      Сондай-ақ API VK Cloud-қа қол жеткізу деректемелерін қамтитын `vkcs-auth` құпиясы да жойылады.

      {/note}

      ```console
      kubectl delete ns external-dns
      ```

1. Жұмыс істеп тұрған Cloud Containers кластеры тарифтелмейді және есептеу ресурстарын тұтынады. Егер ол сізге енді қажет болмаса:

   - оны кейінірек пайдалану үшін [тоқтатыңыз](../../../instructions/manage-cluster#klasterdi_iske_kosu_nemese_toktatu);
   - оны біржола [жойыңыз](../../../instructions/manage-cluster#delete_cluster).

1. Егер `example.com` сізге енді қажет болмаса, оны [жойыңыз](/kz/networks/dns/instructions/publicdns/dns-zone#delete).
