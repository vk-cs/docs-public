# {heading(ExternalDNS орнату және пайдалану)[id=k8s-external-dns]}

{include(/kz/_includes/_translated_by_ai.md)}

[ExternalDNS](https://github.com/kubernetes-sigs/external-dns) [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) немесе [Service](https://kubernetes.io/docs/concepts/services-networking/service/) ресурстарымен жұмыс істеген кезде DNS жазбаларын басқаруды автоматтандыруға мүмкіндік береді. Егер бұл ресурстар ExternalDNS талаптарына сәйкес бапталған болса, онда олар жасалғаннан кейін бірден домендік атау арқылы қолжетімді болады.

ExternalDNS VK Cloud-тағы {linkto(../../../../../networks/dns/instructions/publicdns#dns-publicdns)[text=DNS сервисімен]} плагин арқылы интеграцияланады. Төменде ExternalDNS-ті кластерге қалай орнату және бұл құралды `Ingress` және `Service` ресурстарымен қалай пайдалану керектігі көрсетіледі.

## {heading(Дайындық қадамдары)[id=k8s-external-dns-prepare]}

1. Егер бұл әлі жасалмаса, ExternalDNS жұмыс істейтін DNS-аймақты {linkto(../../../../../networks/dns/instructions/publicdns/dns-zone#dns-dns-zone-add)[text=жасаңыз]}.

   Мысал ретінде төменде `example.com` аймағы пайдаланылады.

1. Сыртқы IP мекенжайы бар және интернеттен қолжетімді өзекті нұсқадағы Kubernetes кластерін {linkto(../../../instructions/create-cluster/create-webui#k8s-create-webui)[text=жасаңыз]}.

   Кластердің қалған параметрлерін өз қалауыңыз бойынша таңдаңыз.

1. `kubectl` көмегімен кластерге қосыла алатыныңызға {linkto(../../../connect/kubectl#k8s-kubectl)[text=көз жеткізіңіз]}.

   Қосылу үшін VK Cloud жеке кабинетінен жүктелген кластер конфигурациясының файлын (kubeconfig) пайдаланыңыз.

1. Егер утилита әлі орнатылмаса, 3.0.0 немесе одан жоғары нұсқадағы Helm-ді {linkto(../../../install-tools/helm#k8s-helm)[text=орнатыңыз]}.

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

## {heading(1. ExternalDNS үшін пайдаланушыны дайындаңыз)[id=k8s-external-dns-prepare-user]}

ExternalDNS осы VK Cloud пайдаланушысының деректемелерін API VK Cloud-пен өзара әрекеттесу және DNS ресурстық жазбаларын басқару үшін қолданады.

Пайдаланушыны дайындап, барлық қажетті деректемелерді алыңыз:

1. Бар пайдаланушыны {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/access-manage#project-access-view-user)[text=таңдаңыз]} немесе жобаға жаңа пайдаланушыны {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/access-manage#project-access-invite-user)[text=шақырыңыз]}.

   Пайдаланушыға қойылатын талаптар:

   - API арқылы қолжеткізу {linkto(../../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable)[text=белсендірілген]} болуы тиіс.
   - ExternalDNS DNS-аймақ аясында ресурстық жазбалармен жұмыс істей алуы үшін келесі рөлдердің біреуі {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/access-manage#project-access-user-role-edit)[text=тағайындалған]} болуы тиіс:

     - Желі әкімшісі (ең аз қажетті {linkto(../../../../../tools-for-using-services/account/concepts/rolesandpermissions#rolesandpermissions-permissions)[text=рөл]}).
     - Жоба әкімшісі.
     - Суперадминистратор.
     - Жоба иесі.

     {note:info}

     ExternalDNS-пен жұмыс істеу үшін Желі әкімшісі рөлі бар бөлек пайдаланушы бөлу ұсынылады. Бұл шабуылдаушы осы пайдаланушының деректемелеріне қол жеткізсе, ықтимал зиянды азайтады.

     {/note}

1. API VK Cloud-қа қол жеткізу үшін қажетті деректемелерді алыңыз:

   1. ExternalDNS үшін бөлінген пайдаланушының деректемелерін пайдаланып, VK Cloud жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
   1. Бет үстіңгі жағындағы пайдаланушы атауын басып, **Жоба баптаулары** тармағын таңдаңыз.
   1. **API арқылы қолжеткізу** қойындысына өтіп, келесі параметрлердің мәндерін жазып алыңыз:

      - Project ID (OpenStack үшін Project ID);
      - User Domain Name (пайдаланушы доменінің атауы);
      - Username (пайдаланушы атауы);
      - Region Name (аймақ атауы);
      - Auth URL (аутентификацияға арналған URL).

1. Осы пайдаланушының құпиясөзін жазып алыңыз: ол да API-ға қол жеткізу үшін қажет.

## {heading(2. ExternalDNS орнатыңыз)[id=k8s-external-dns-install]}

1. ExternalDNS орнатылатын атаулар кеңістігін жасаңыз:

   ```console
   kubectl create ns external-dns
   ```

1. Осы атаулар кеңістігінде API VK Cloud-қа қол жеткізу деректемелерін қамтитын құпияны жасаңыз, олар {linkto(#k8s-external-dns-prepare-user)[text=пайдаланушыны дайындау кезінде алынған]}:

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

1. Helm көмегімен ExternalDNS орнату үшін қажет мәндерді ([values](https://helm.sh/docs/chart_template_guide/values_files/)) қамтитын файл жасаңыз:

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

   ExternalDNS Helm-чартының (chart) жұмысына көптеген мәндер әсер етеді. Жасалған файлда ExternalDNS-пен жұмысты бастауға жеткілікті ең аз мәндер жиынтығы берілген. Төменде ExternalDNS-тің DNS VK Cloud-пен жұмысына әсер ететін ең маңызды мәндер сипатталған. VK Cloud плагиніне қатысы жоқ мәндердің сипаттамалары (`sidecars[]` мәндерінен басқа барлық мәндер) чартқа арналған [README.md](https://github.com/kubernetes-sigs/external-dns/tree/master/charts/external-dns#values) файлында келтірілген.

   {note:warn}

   Төменде келтірілген міндетті мәндерді өзгертпеңіз және жоймаңыз. Бұл ExternalDNS-тің қате жұмысына әкелуі мүмкін.

   {/note}

   {cut(ExternalDNS жұмысына әсер ететін маңызды мәндердің сипаттамасы)}

   - (**Міндетті мән**) `provider`: `webhook` мәні DNS-пен жұмыс істеу үшін вебхуктар (webhooks) механизмін қолдайтын сыртқы плагинді пайдалану керектігін көрсетеді.

   - (**Міндетті мән**) `extraArgs:webhook-provider-url`: плагинмен өзара әрекеттесу үшін пайдаланылуы тиіс URL.

   - `policy`: ресурстық жазбаларды синхрондау саясаты. Әдепкі бойынша `upsert-only` саясаты пайдаланылады: ExternalDNS ресурстық жазбаларды тек қосады, бірақ жоймайды.

     Егер Kubernetes ресурстарын жойғанда ExternalDNS солар үшін жасалған ресурстық жазбаларды да жойсын десеңіз, `sync` саясатын пайдаланыңыз.

   - `txtPrefix`: ExternalDNS жасайтын TXT жазбаларына арналған префикс.

     ExternalDNS Kubernetes ресурстары үшін A-жазбаларды да, CNAME-жазбаларды да автоматты түрде қоса алады.

     ExternalDNS DNS-аймақтың қай ресурстық жазбаларын өзі басқаратынын қызметтік ақпаратты TXT жазбаларында орналастыру арқылы қадағалайды. Атап айтқанда, әдепкі баптаулармен ол қосылатын жазбамен бірдей атауы бар қызметтік TXT жазбасын жасайды: мысалы, `example.com` A-жазбасы үшін дәл сондай `example.com` атауы бар сәйкес TXT жазбасы жасалады.

     Бірақ [RFC 1912](https://www.rfc-editor.org/rfc/rfc1912) стандартына сәйкес, CNAME-жазбалар дәл сондай атауы бар басқа жазбалармен қатар өмір сүре алмайды. Сондықтан ExternalDNS `txtPrefix` параметрінде берілген префиксті TXT жазбаларының атауына қосатындай етіп бапталады. Бұл CNAME-жазбалармен жұмыс істегенде ықтимал коллизияларды болдырмауға мүмкіндік береді: мысалы, `example.com` CNAME-жазбасы үшін `externaldns-example.com` атауы бар сәйкес TXT жазбасы жасалады.

     Қажет болса, `externaldns-` мәнінен өзгеше басқа префикс бере аласыз.

   {/cut}

   DNS VK Cloud-пен интеграцияны қамтамасыз ететін ExternalDNS плагинінің плагин жұмысына әсер ететін көптеген баптаулары бар. Баптаулар `sidecars[].env` ішіндегі орта айнымалылары арқылы беріледі. Жасалған файлда тек міндетті баптаулар ғана көрсетілген. Қажет болса, плагинге қосымша баптауларды тиісті орта айнымалыларын қосу арқылы бере аласыз.

   {note:warn}

   Төменде тізімделген плагиннің міндетті баптауларын өзгертпеңіз және жоймаңыз. Бұл ExternalDNS-тің қате жұмысына әкелуі мүмкін.

   {/note}

   {cut(Плагин жұмысына әсер ететін мәндердің сипаттамасы)}

   - (**Міндетті баптаулар**) `OS_` префиксі бар айнымалыларға сәйкес келетін баптаулар плагиннің API VK Cloud-пен өзара әрекеттесуі кезінде аутентификация үшін пайдаланылады.

     Бұл айнымалылардың мәндері бұрын жасалған Kubernetes құпиясында сақталады.

   - (**Міндетті баптаулар**) `SERVER_HOST` және `SERVER_PORT` айнымалыларына сәйкес келетін баптаулардың мәндері бекітілген және плагиннің дұрыс жұмыс істеуі үшін қажет.

   - DNS-аймақтарды сүзгілеу баптаулары:

     - Ресурстық жазбалар жасауға рұқсат етілген DNS-аймақтарға арналған сүзгілер:

       - `DOMAIN_FILTERS`: үтір арқылы бөлінген домендік атаулар тізімі бар жол. Мысалы, `example.com,contoso.com`.
       - `REGEX_DOMAIN_FILTER`: тұрақты өрнегі бар жол ([RE2 синтаксисі](https://github.com/google/re2/wiki/Syntax)). Мысалы, `.*.com$`.

       Егер екі сүзгі де конфигурацияланған болса, `REGEX_DOMAIN_FILTER` сүзгісі `DOMAIN_FILTERS` сүзгісінен басым болады. Әдепкі бойынша сүзгілеу жүргізілмейді.

     - Ресурстық жазбалар жасауға тыйым салынған DNS-аймақтарға арналған сүзгілер:

       - `EXCLUDE_DOMAINS`: үтір арқылы бөлінген домендік атаулар тізімі бар жол. Мысалы, `example.org,foo.bar.com`.
       - `REGEX_DOMAIN_FILTER_EXCLUSION`: тұрақты өрнегі бар жол ([RE2 синтаксисі](https://github.com/google/re2/wiki/Syntax)). Мысалы, `^stage-.*.com$`.

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

   {cut(Команда шығысының бір бөлігіне мысал)}

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

## {heading(3. External DNS жұмысын тексеріңіз)[id=k8s-external-dns-check]}

Төменде [NGINX-тен Cafe мысалына](https://github.com/nginxinc/kubernetes-ingress/tree/v2.4.0/examples/ingress-resources/complete-example) негізделген бірнеше демо-қолданба жазылады. Бұл қолданбалар ExternalDNS-пен жұмыс істеуге бапталған `Service` және `Ingress` көмегімен жарияланады (интернеттен қолжетімді болады).

### {heading(3.1. LoadBalancer түріндегі сервисті пайдаланып қолданбаны жариялаңыз)[id=k8s-external-dns-publish-loadbalancer]}

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

   {cut(Команданың ішінара шығысына мысал)}

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
   - Сервис [LoadBalancer](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer) түрінде болуы тиіс.

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

   - `LoadBalancer` сервис түрі таңдалған. Мұндай сервис үшін {linkto(../../../../../networks/balancing/concepts/load-balancer#balancing-load-balancer-types)[text=стандартты жүктеме теңгергіші]} жасалады. Әдепкі бойынша теңгергіш жария IP мекенжайымен жасалатындықтан, сервиспен байланысты қолданба интернеттен қолжетімді болады.

     {note:warn}

     Теңгергішті пайдалану {linkto(../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарификацияланады]}.

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

   {cut(Команданың ішінара шығысына мысал)}

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

   1. `example.com` аймағына арналған {linkto(../../../../../networks/dns/instructions/publicdns/records#dns-records-list)[text=ресурстық жазбалар тізімін алыңыз]}.
   1. Тізімнен ExternalDNS жасаған жазбаларды табыңыз:

      - Бір `tea.example.com` A-жазбасын.
      - `externaldns-tea.example.com` және `externaldns-a-tea.example.com` екі TXT-жазбасын.

        Бұл TXT-жазбалар қызметтік болып табылады және ExternalDNS оларды `tea-svc` сервисі үшін жасалған A-жазбаның күйін бақылау үшін пайдаланады.

        {note:info}

        Мұндай жазбаларды атауындағы `externaldns-` префиксі бойынша оңай ажыратуға болады. Олардың мәндері `heritage=.../owner=.../resource=...` түріндегі стандартты құрылымға ие.

        Егер {linkto(#k8s-external-dns-install)[text=ExternalDNS орнату кезінде]} сіз префикс үшін басқа мән берсеңіз, онда қызметтік TXT-жазбалардың атаулары өзгеше болады.

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

### {heading(3.2. Ingress пайдаланып қолданбаны жариялаңыз)[id=k8s-external-dns-publish-ingress]}

1. Кластерге Ingress NGINX аддонының ең өзекті нұсқасын {linkto(../../../instructions/addons/advanced-installation/install-advanced-ingress#k8s-install-advanced-ingress)[text=орнатыңыз]}.

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

   Мұнда сервис үшін [ClusterIP](https://kubernetes.io/docs/concepts/services-networking/service/#type-clusterip) түрі берілген, бұл жеткілікті, себебі қолданба Ingress көмегімен жарияланады. Мұндай сервис тек кластер ішінен ғана қолжетімді және бұрын {linkto(#k8s-external-dns-publish-loadbalancer)[text=жасалған]} сервистен айырмашылығы, оған бөлек жүктеме теңгергіші бөлінбейді.

1. Барлық қажетті ресурстарды жасау үшін осы манифесттерді кластерде қолданыңыз:

   ```console
   kubectl apply -f coffee-app.yaml -f coffee-service.yaml
   ```

1. Қолданбаның сәйкес сервиспен бірге екі репликадан тұратын `ReplicaSet` ретінде сәтті жазылғанын тексеріңіз:

   ```console
   kubectl get rs,pod,svc -l app==coffee
   ```

   {cut(Команданың ішінара шығысына мысал)}

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

   {cut(Команданың ішінара шығысына мысал)}

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

   1. `example.com` аймағы үшін {linkto(../../../../../networks/dns/instructions/publicdns/records#dns-records-list)[text=ресурстық жазбалар тізімін алыңыз]}.
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

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=k8s-external-dns-delete]}

Жұмыс істеп тұрған кластер тарификацияланады және есептеу ресурстарын тұтынады. Егер ExternalDNS жұмысын тексеру үшін жасалған Kubernetes ресурстары енді қажет болмаса, оларды жойыңыз:

1. `tea` қолданбасымен байланысты барлық ресурстарды жойыңыз:

   ```console
   kubectl delete -f cafe-ingress.yaml -f coffee-service.yaml -f coffee-app.yaml
   ```
   Сервиспен байланысты жүктеме теңгергішін жою ұзақ уақыт алуы мүмкін.

1. `coffee` қолданбасымен байланысты барлық ресурстарды жойыңыз:

   ```console
   kubectl delete -f tea-service.yaml -f tea-app.yaml
   ```

1. Ingress NGINX аддонын {linkto(../../../instructions/addons/manage-addons#k8s-manage-addons-delete)[text=жойыңыз]}.

   Аддонды және онымен байланысты ресурстарды жою ұзақ уақыт алуы мүмкін.

1. ExternalDNS жасаған {linkto(../../../../../networks/dns/instructions/publicdns/dns-zone#dns-dns-zone-delete)[text=ресурстық жазбаларды жойыңыз]}.

   Мұны, егер сіз `external-dns-vkcs-values.yaml` файлын {linkto(#k8s-external-dns-install)[text=ExternalDNS орнату кезінде]} өзгертпеген болсаңыз, орындау қажет: онда ExternalDNS `upsert-only` саясатын пайдаланады және Kubernetes ресурстарын жойғанда DNS-аймақтан ресурстық жазбаларды жоймайды. Егер сіз бұл файлды өзгертіп, `sync` саясатын таңдасаңыз, онда бұл жазбалар автоматты түрде жойылады.

   Ресурстық жазбалар тізімі:

   - `tea.example.com` A-жазбасы.
   - `externaldns-tea.example.com` және `externaldns-a-tea.example.com` TXT-жазбалары.
   - `cafe.example.com` CNAME-жазбасы.
   - `externaldns-cafe.example.com` және `externaldns-cname-cafe.example.com` TXT-жазбалары.

1. ExternalDNS-ті жойыңыз:

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

{ifdef(public)}
{include(/kz/_includes/_delete-test-cluster-short.md)}
{/ifdef}

1. `example.com` DNS-аймағын {linkto(../../../../../networks/dns/instructions/publicdns/dns-zone#dns-dns-zone-delete)[text=жойыңыз]}.
