# {heading(Аддондар)[id=k8s-addons]}

{include(/kz/_includes/_translated_by_ai.md)}

Cloud Containers кластерлері үшін әртүрлі аддондар (қосымша сервистер) қолжетімді. Оларды кез келген комбинацияда таңдап, не {linkto(../../../instructions/create-cluster/create-terraform#k8s-create-terraform)[text=Terraform көмегімен кластерді құру кезінде]}, не бұрыннан бар кластерге {linkto(../../../instructions/addons/manage-addons#k8s-manage-addons-install)[text=кейінірек]} орнатуға болады. Орнату процесі автоматтандырылған және пайдаланушының ең аз араласуын талап етеді.

## {heading(Аддондарды орнату ерекшеліктері)[id=k8s-addons-install-features]}

- Аддондар кластердің worker-тораптарына орнатылады және олардың есептеу ресурстарын тұтынады.

  Төменде аддонды баптау кодындағы Kubernetes ресурстары үшін стандартты [requests және limits](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits) мәндеріне негізделген аддондардың жүйелік талаптары келтірілген. Стандартты емес мәндер пайдаланылған кезде аддондардың жүйелік талаптары өзгереді.

  {note:info}

  Кейбір аддондар кластердің барлық тораптарына (соның ішінде master-тораптарға) орнатылуы мүмкін. Толығырақ {linkto(../../../instructions/addons/advanced-installation#k8s-advanced-installation)[text=%text]} бөлімінен оқыңыз.

  {/note}

- Аддондар арнайы бөлінген worker-тораптар тобына немесе Kubernetes жоспарлаушысы таңдаған worker-тораптарға орнатылуы мүмкін. Бірінші тәсілді пайдалану кластерде жайылған production-сервистердің жұмысына аддондардың әсерін болдырмауға мүмкіндік береді.

  Бөлінген worker-тораптар тобының есептеу ресурстары барлық аддондарға жеткілікті болуы тиіс, тіпті әрбір аддон жүйелік талаптарда көрсетілген ресурстардың максимумын тұтынса да. Осындай тораптар тобы үшін автоматты масштабтауды баптау ұсынылады.

- Аддондарды орнату үш нұсқада мүмкін:

  - Аддонды баптау кодын өзгерте отырып, Kubernetes жоспарлаушысы таңдаған worker-тораптарға **стандартты орнату**.
  - Аддонды баптау кодын өзгерте отырып, **бөлінген worker-тораптарға орнату**.
  - Аддонды баптау кодын өзгертпей, Kubernetes жоспарлаушысы таңдаған worker-тораптарға **жылдам орнату** (әдепкі баптаулармен).

  Барлық аддондар орнатудың осы үш нұсқасының бәрін қолдамайды.

  Орнату процесі {linkto(../../../instructions/addons/advanced-installation#k8s-advanced-installation)[text=%text]} бөлімінде сипатталған.

## {heading(Қолжетімді аддондар)[id=k8s-addons-available]}

Белгілі бір аддондардың қолжетімділігі кластерді орналастыру жоспарланатын {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңірге]} байланысты.

### {heading(Argo CD)[id=k8s-addons-argo-cd]}

{note:info}
Бұл аддон тек {linkto(../../../concepts/cluster-generations#k8s-cluster-generations)[text=екінші буын]} кластерлері үшін ғана қолжетімді.
{/note}

{tabs}

{tab(Сипаттама)}

[Argo CD](https://argoproj.github.io/cd/) — GitOps тәсілін пайдаланатын Kubernetes үшін үздіксіз жеткізу (continuous delivery, CD) құралы. Ол Git-репозиторийдегі конфигурацияны бақылау арқылы кластердегі қолданбаларды автоматты түрде орналастырады және жаңартады. Argo CD артықшылықтары:

- GitOps процестері жылдамдатылады және жеңілдетіледі: іске қосу, масштабтау және өзгерістерді жеткізу уақыты қысқарады, сондай-ақ оларды енгізу күрделілігі азаяды.
- Кластерлердің сенімділігі мен басқарылуы артады: конфигурацияны өзгерту кезінде қолмен орындалатын әрекеттер мен қателер азаяды. Argo CD мұндай айырмашылықтарды автоматты түрде анықтап, кластерді оның Git-репозиторийінде сипатталған күйге қайтарады.
- Кластердегі әрекеттер анағұрлым ашық болады және Git арқылы барлық өзгерістерді бақылау, қадағалау және аудит жүргізу мүмкіндігі есебінен оның қауіпсіздігі артады.

Argo CD дұрыс жұмыс істеуі үшін кластер конфигурациясы сақталған Git-репозиторийлерге тұрақты қолжетімділік қажет. Сондай-ақ аддонның кластерде қолданбаларды жасау құқықтары болуы керек, олар Kubernetes ішінде [қолжетімділікті шектеу моделі](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) (Role Based Access Control, RBAC) арқылы бапталады, әйтпесе кластер күйін синхрондау кезінде қателер туындауы мүмкін.

{/tab}

{tab(Жүйелік талаптар)}

- **CPU**: 512m;
- **RAM**: 1024Mi;
- **Стандартты жүктеме теңгергіші**: бір дана (кластерге сыртқы қолжетімділікті баптау кезінде, мысалы [Ingress Controller](#k8s-addons-ingress-controller-nginx) арқылы).

{/tab}

{/tabs}

### {heading(Capsule)[id=k8s-addons-capsule]}

{note:info}
Бұл аддон тек {linkto(../../../concepts/cluster-generations#k8s-cluster-generations)[text=бірінші буын]} кластерлері үшін ғана қолжетімді.
{/note}

{tabs}

{tab(Сипаттама)}

Kubernetes кластерлері Kubernetes ресурстарын жеке атаулар кеңістіктері (namespaces) деңгейінде логикалық бөлуге мүмкіндік береді. Алайда бұл күрделі сценарийлерде ресурстарды бөлу мен оқшаулауды ұйымдастыру үшін жеткіліксіз болуы мүмкін. Мысалы, әзірлеушілердің әртүрлі командаларына әртүрлі ресурстар жиынтықтарын беру қажет. Бұл үшін әр команда үшін бөлек кластерлер жасауға болады, бірақ мұндай кластерлер көп болса, оларды басқару қиынға соғады.

[Capsule](https://capsule.clastix.io/docs) бір кластер шеңберінде ресурстар жиынтықтарын тенанттар (tenants) көмегімен оқшаулауға мүмкіндік береді. Тенант — белгілі бір пайдаланушылар тобына тағайындалған, ресурстарды жасау мен тұтынуға қойылатын шектеулермен біріктірілген атаулар кеңістіктері. Capsule саясат қозғалтқышы (policy engine) тенант шеңберінде ресурстарды пайдалану саясаттарының сақталуын қадағалап қана қоймай, бір тенантты екіншісінен оқшаулауды да қамтамасыз етеді. Осылайша бірнеше команданың бір multi-tenant cluster ішінде жұмысын қосымша кластерлерді әкімшілендіру қажеттілігінсіз ұйымдастыруға болады.

{/tab}

{tab(Жүйелік талаптар)}

- **CPU**: 200m;
- **RAM**: 128Mi.

{/tab}

{/tabs}

### {heading(cert-manager)[id=k8s-addons-cert-manager]}

{tabs}

{tab(Сипаттама)}

[cert-manager](https://cert-manager.io/) құралының көмегімен Kubernetes кластерлеріндегі сертификаттарды басқаруға болады:

- Сертификаттарды, соның ішінде өздігінен қол қойылған (self-signed) сертификаттарды шығару. Ол үшін `cert-manager` сертификаттау орталығы (certificate authority, CA) рөлін атқаратын көздерге сұраулар жібереді.

  Көздердің мысалдары:

  - [Venafi](https://www.venafi.com/) сияқты киберқауіпсіздік шешімдерінің провайдерлері;
  - [Let’s Encrypt](https://letsencrypt.org/) сияқты сертификат провайдерлері;
  - [HashiCorp Vault](https://www.vaultproject.io/) сияқты секреттер қоймалары;
  - ішінде сертификаттың жария бөлігі мен жабық кілті бар жергілікті контейнерлер.

- Әрекет ету мерзімі аяқталып жатқан сертификаттарды автоматты түрде қайта шығару.

`cert-manager` көмегімен шығарылған сертификат басқа Kubernetes ресурстарына қолжетімді болады. Мысалы, оны Ingress үшін пайдалануға болады.

{/tab}

{tab(Жүйелік талаптар)}

Аддонның жекелеген компоненттеріне қойылатын талаптар:

- cert-manager:

  - **CPU**: 10m;
  - **RAM**: 32Mi.

- [cert-manager-cainjector](https://cert-manager.io/docs/concepts/ca-injector/):

  - **CPU**: 10m;
  - **RAM**: 32Mi.

- [cert-manager-webhook](https://cert-manager.io/docs/concepts/webhook/):
  - **CPU**: 10m;
  - **RAM**: 32Mi.

{/tab}

{/tabs}

### {heading(Docker Registry)[id=k8s-addons-docker-registry]}

{note:warn}

Аддонды орнату кезінде ол үшін {linkto(../../../../../networks/balancing/concepts/load-balancer#balancing-load-balancer-types)[text=стандартты жүктеме теңгергіші]} жасалады. Теңгергішті пайдалану {linkto(../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифтеледі]}.

{/note}

{tabs}

{tab(Сипаттама)}

[Docker тізілімі](https://docs.docker.com/registry/) Docker образдарын орналастыруға және сақтауға арналған. Істен шығуға төзімді конфигурацияда (high availability, HA) жұмыс істейді. Тізілімдегі образдарды кластерде сервистерді жайып орналастыру кезінде пайдалануға болады.

Толығырақ {linkto(../../../connect/docker-registry#k8s-docker-registry)[text=%text]} бөлімінен қараңыз.

{/tab}

{tab(Жүйелік талаптар)}

- **CPU**: 100m.
- **RAM**: 128Mi — 512 Mi.
- **S3 объектілік қоймасының көлемі**: тізілімде орналастыру жоспарланатын образдардың өлшемі мен санына байланысты.
- **Стандартты жүктеме теңгергіші**: бір дана.
- **Floating IP-адрес**: бір дана.

{/tab}

{/tabs}

### {heading(External Secrets Operator)[id=k8s-addons-eso]}

{note:info}
Бұл аддон тек {linkto(../../../concepts/cluster-generations#k8s-cluster-generations)[text=екінші буын]} кластерлері үшін ғана қолжетімді.
{/note}

{tabs}

{tab(Сипаттама)}

[External Secrets Operator](https://external-secrets.io/latest/) бұлтты қоймаларда кластерден тыс сақталатын Kubernetes [құпияларын](https://kubernetes.io/docs/concepts/configuration/secret) қауіпсіз басқаруға мүмкіндік береді (мысалы, [VK Cloud құпия менеджері](/ru/security/secret-manager/concepts/about#sm-about "change-lang"), AWS Secrets Manager, Azure Key Vault және т.б.

Қосымша бөлімде VK Cloud құпия менеджерімен қалай пайдалану керектігі туралы толығырақ {linkto(../../../how-to-guides/external-secrets-operator#k8s-external-secrets-operator)[text=%text]}.

{/tab}

{tab(Жүйелік талаптар)}

- **CPU**: 5m — 200m;
- **RAM**: 60Mi — 512 Mi.

{/tab}

{/tabs}

### {heading(Fluent Bit)[id=k8s-addons-fluent-bit]}

{note:info}

Бұл аддон тек {linkto(../../../concepts/cluster-generations#k8s-cluster-generations)[text=бірінші буын]} кластерлері үшін ғана қолжетімді.

{/note}

{tabs}

{tab(Сипаттама)}

[Fluent Bit](https://docs.fluentbit.io/manual) Cloud Containers кластерлерінде логтарды жинауды баптауға мүмкіндік береді, содан кейін оларды {linkto(../../../../../monitoring-services/logging#logging)[text=Cloud Logging]} сервисінде, мысалы, Elasticsearch немесе Loki плагиндерінің көмегімен талдауға болады. Бұл аддонның негізгі артықшылығы — пайдаланушы қажеттіліктеріне барынша икемді баптау мүмкіндігі.

Логтардың көздері ретінде кластер тораптарында орналасқан [kubelet қызметтері](https://kubernetes.io/docs/concepts/overview/components/#kubelet) мен {linkto(../../../reference/pods#k8s-pods)[text=подтар]} (pods) қолданылады.

{/tab}

{tab(Жүйелік талаптар)}

Аддонның өз жүйелік талаптары жоқ. Аддон подтары әдепкі {linkto(../settings#k8s-settings-requests-and-limits)[text=лимит баптауларын]} пайдаланады.

{/tab}

{/tabs}

### {heading(Cloud Logging үшін Fluent Bit (logaas-integration))[id=k8s-addons-fluent-bit-logaas]}

{tabs}

{tab(Сипаттама)}

Lua тілінде жазылған [арнайы сүзгілермен](https://docs.fluentbit.io/manual/pipeline/filters/lua) бірге Fluent Bit Cloud Containers кластерінен логтарды {linkto(../../../../../monitoring-services/logging#logging)[text=Cloud Logging]} сервисіне жеткізуді ұйымдастыруға мүмкіндік береді, бұл осы логтарды әрі қарай талдау үшін қажет.

Логтардың көздері ретінде кластер тораптарында орналасқан [kubelet қызметтері](https://kubernetes.io/docs/concepts/overview/components/#kubelet) мен {linkto(../../../reference/pods#k8s-pods)[text=подтар]} (pods) қолданылады. Аддонның қалай жұмыс істейтіні туралы толығырақ оның {linkto(/kz/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-logaas-integration/install-advanced-logaas-integration-magnum)[text=бірінші буын]} және {linkto(/kz/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-logaas-integration/install-advanced-logaas-integration-mk8s)[text=екінші буын]} кластерлеріне арналған орнату бөлімдерінен оқыңыз.

{/tab}

{tab(Жүйелік талаптар)}

Аддонның өз жүйелік талаптары жоқ. Аддон подтары әдепкі {linkto(../settings#k8s-settings-requests-and-limits)[text=лимит баптауларын]} пайдаланады.

{/tab}

{/tabs}

### {heading(GPU Operator)[id=k8s-addons-gpu-operator]}

{tabs}

{tab(Сипаттама)}

GPU Operator {linkto(../../flavors#k8s-flavors-gpu)[text=кластер тораптарындағы GPU-ді]} машиналық оқыту немесе үлкен деректерді өңдеу міндеттерін орындау үшін басқаруға мүмкіндік береді.

Кластерде GPU пайдаланудың келесі нұсқалары қолжетімді:

- Бір под бір немесе бірнеше GPU пайдаланады.
- Аддон бір GPU-ді бірнеше под арасында {linkto(../../flavors#k8s-flavors-gpu-sharing)[text=MIG]} стратегиясы бойынша бөледі.
- Аддон бір GPU-ді бірнеше под арасында {linkto(../../flavors#k8s-flavors-gpu-sharing)[text=MPS]} стратегиясы бойынша бөледі.

Аддон құрамы:

- GPU-ді басқаруға арналған NVIDIA GPU Operator.
- Конфигурация өзгергеннен кейін CUDA (Compute Unified Device Architecture) тексеруге арналған қызметтік валидаторлар.
- Оператордың өзін-өзі диагностикалау құралдары.
- GPU ресурстарын байланыстыру мен бөлуді автоматтандыруға арналған NVIDIA device plugin.
- Кластер тораптарында қолжетімді функцияларды анықтау және тіркеу үшін Node Feature Discovery. Компонент келесі қызметтерді қамтиды:

  - NFD-Master Kubernetes API серверіне қосылуға және торап объектілерін жаңартуға жауап береді.
  - NFD-Worker аппараттық функцияларды жариялау үшін NFD-Master қызметіне қосылады.
  - NFD Garbage-Collector барлық Node Feature Discovery объектілерінің сәйкес тораптары болуын қамтамасыз етеді және жоқ тораптар үшін ескірген объектілерді жояды.

Аддон және оның компоненттері туралы толығырақ: [NVIDIA GPU Operator](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/overview.html), [NVIDIA device plugin](https://github.com/NVIDIA/k8s-device-plugin?tab=readme-ov-file#nvidia-device-plugin-for-kubernetes), [Node Feature Discovery](https://kubernetes-sigs.github.io/node-feature-discovery).

{/tab}

{tab(Жүйелік талаптар)}

Аддонның жекелеген компоненттеріне қойылатын талаптар:

- NVIDIA GPU Operator:
  - **CPU**: 200 — 500m;
  - **RAM**: 64 — 512Mi;
- NFD-Master:
  - **CPU**: 100 — 500m;
  - **RAM**: 128Mi — 4Gi;
- NFD Garbage-Collector:
  - **CPU**: 10 — 500m;
  - **RAM**: 128Mi — 1Gi;
- NFD-Worker (әрбір GPU торабына):
  - **CPU**: 205 — 2000m;
  - **RAM**: 192Mi — 2Gi.

Егер аддон бірнеше worker-торапқа орнатылса, онда NFD-Worker осы тораптардың әрқайсысына орнатылады және әр торап үшін көрсетілген RAM көлемін талап етеді. Қалған компоненттер тек бір торапқа ғана орнатылады.

{/tab}

{/tabs}

### {heading(Ingress Controller (NGINX))[id=k8s-addons-ingress-controller-nginx]}

{note:warn}

Аддонды орнату кезінде ол үшін {linkto(../../../../../networks/balancing/concepts/load-balancer#balancing-load-balancer-types)[text=стандартты жүктеме теңгергіші]} жасалады. Теңгергішті пайдалану {linkto(../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифтеледі]}.

{/note}

{tabs}

{tab(Сипаттама)}

[NGINX](https://docs.nginx.com/nginx-ingress-controller/intro/overview/) негізіндегі [Ingress-контроллер](https://kubernetes.io/docs/concepts/services-networking/ingress/) кері прокси (reverse proxy) ретінде жұмыс істейді және HTTP немесе HTTPS бойынша жұмыс істейтін кластер сервистері үшін бірыңғай кіру нүктесін ұйымдастыруға мүмкіндік береді.

Контроллер бар болған жағдайда, мұндай сервистер Kubernetes кластерінен тыс жерден қолжетімді болуы үшін [Ingress ресурсын](https://kubernetes.io/docs/concepts/services-networking/ingress/) жасау жеткілікті.

Ingress-контроллер VK Cloud платформасымен тығыз интеграцияланады. Толығырақ {linkto(../../network#k8s-network)[text=%text]} бөлімінен қараңыз.

{/tab}

{tab(Жүйелік талаптар)}

- **CPU**: 210m — 610m.
- **RAM**: 238Mi — 660Mi.
- **Стандартты жүктеме теңгергіші**: бір дана.
- **Floating IP-адрес**: бір дана ({linkto(../../../instructions/addons/advanced-installation/install-advanced-ingress#k8s-install-advanced-ingress)[text=әдепкі баптаулармен]} орнатылғанда).

{/tab}

{/tabs}

### {heading(Istio)[id=k8s-addons-istio]}

{tabs}

{tab(Сипаттама)}

{include(/kz/_includes/_istio_descr.md)}

Istio орнату үшін әр түрлі {linkto(/kz/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-istio/install-advanced-istio-magnum#k8s-install-advanced-istio-magnum)[text=бірінші буын]} және {linkto(/kz/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-istio/install-advanced-istio-mk8s#k8s-install-advanced-istio-mk8s)[text=екінші буын]} кластерлер.

{/tab}

{tab(Жүйелік талаптар)}

- **CPU**: 900m;
- **RAM**: 2Gi.

{/tab}

{/tabs}

### {heading(Jaeger)[id=k8s-addons-jaeger]}

{tabs}

{tab(Сипаттама)}

Микросервистерге негізделген үлестірілген жүйелерде сұраулар (requests) алмасуы үздіксіз жүреді. [Jaeger](https://www.jaegertracing.io) платформасы сұрауларды үлестірілген трассировкадан өткізу үшін жасалған. Jaeger сұраулар ағынының микросервистер арқылы жүретін жолын қадағалайды және мыналарға мүмкіндік береді:

- жүйе компоненттерінің өзара байланыстары туралы сұраулар ағыны тұрғысынан ақпарат жинауға;
- сұраулармен байланысты мәселелерді немесе жүйе архитектурасындағы сұраулар ағынын өңдеуге қатысты тар орындарды анықтауға.

Мұндай құрал қажет, өйткені сұраулармен байланысты факторлар бұл жүйелердің тұтас мінез-құлқы мен өнімділігіне елеулі әсер етуі мүмкін. Жекелеген микросервистерді ғана бақылаумен шектелу жеткіліксіз.

Jaeger микросервистерден алатын деректер негізінде сұрауларды трассалауды орындайды. Сондықтан микросервистерге сұраулар туралы деректерді жіберу үшін [OpenTelemetry](https://opentelemetry.io) құралдар стегін [интеграциялау қажет](https://www.jaegertracing.io/docs/latest/architecture/#tracing-sdks). OpenTelemetry-ді микросервистік қосымшаға интеграциялаумен HotROD мысалында {linkto(../../../how-to-guides/jaeger#k8s-jaeger)[text=%text]} бөлімінде танысуға болады.

{/tab}

{tab(Жүйелік талаптар)}

Аддонға қойылатын талаптар:

- Worker-тораптар саны таңдалған Elasticsearch репликаларының санынан кем болмауы тиіс.

  Elasticsearch сақтау қоймасының бэкенді ретінде пайдаланылады. Істен шығуға төзімділікті қамтамасыз ету үшін Elasticsearch-тің әрбір репликасы бөлек worker-торапқа орналастырылады.

  Репликалар санын таңдау туралы толығырақ {linkto(../../../instructions/addons/advanced-installation/install-advanced-jaeger#k8s-install-advanced-jaeger)[text=Jaeger орнату бөлімі]} нен оқыңыз.

- Worker-тораптар келесі есептеу ресурстары конфигурациясын пайдалануы тиіс:

  - `STD3-4-4` немесе жақсырақ (сынақ ортасы үшін);
  - `STD3-6-6` немесе жақсырақ (production-орта үшін).

Аддонның жекелеген компоненттеріне қойылатын талаптар:

- [Elasticsearch](https://www.jaegertracing.io/docs/latest/deployment/#elasticsearch):

  - **CPU**: 100m — 1000m;
  - **RAM**: 512Mi.

- [Agent](https://www.jaegertracing.io/docs/latest/architecture/#agent):

  - **CPU**: 250m — 500m;
  - **RAM**: 128Mi — 512Mi.

- [Collector](https://www.jaegertracing.io/docs/latest/architecture/#collector):

  - **CPU**: 500m — 1000m;
  - **RAM**: 512Mi — 1024Mi.

- [Query](https://www.jaegertracing.io/docs/latest/architecture/#query):

  - **CPU**: 250m — 500m;
  - **RAM**: 128Mi — 512Mi.

{note:info}

Jaeger-дің тұрақты жұмысын қамтамасыз ету үшін оны жоғарыда аталған талаптарға сай келетін бөлінген worker-тораптар тобына орнату ұсынылады.

{/note}

{/tab}

{/tabs}

### {heading(Kgateway)[id=k8s-addons-kgateway]}

{note:info}
Бұл аддон тек {linkto(../../../concepts/cluster-generations#k8s-cluster-generations)[text=екінші буын]} кластерлері үшін қолжетімді.
{/note}

{tabs}

{tab(Сипаттама)}

[Kgateway](https://kgateway.dev/) — [Gateway API](https://gateway-api.sigs.k8s.io/) пайдалану арқылы Kubernetes ішінде трафикті бағыттауға және басқаруға арналған құрал. Оның артықшылықтары:

- Kubernetes сервистерін жариялауды және сыртқы сервистерге сұрауларды проксилеуді қамтамасыз етеді.
- Жүктемеге қарай автоматты түрде масштабталады.
- Қолданбалар мен сервистерді іске қосу уақытын қысқартады.
- Кіру нүктелерін, TLS, маршруттарды және қол жеткізу саясаттарын орталықтандырылған түрде орнатуға мүмкіндік береді.

Аддонмен жұмыс істеу туралы толығырақ {linkto(../../../how-to-guides/kgateway#k8s-kgateway)[text=Kgateway пайдалану]} бөлімінде.

{/tab}

{tab(Жүйелік талаптар)}

- **CPU**: 5m — 50m;
- **RAM**: 40Mi — 512Mi.

Егер сыртқы трафикті қабылдайтын Gateway ресурсы да құрылса:

- **Стандартты жүктеме теңгергіші**: бір дана;
- **Floating IP мекенжайы**: бір дана.

{/tab}

{/tabs}

### {heading(Kiali)[id=k8s-addons-kiali]}

{note:info}

Бұл аддон тек {linkto(../../../concepts/cluster-generations#k8s-cluster-generations)[text=бірінші буын]} кластерлері үшін ғана қолжетімді.

{/note}

{tabs}

{tab(Сипаттама)}

[Kiali](https://kiali.io/) — {linkto(#k8s-addons-istio)[text=Istio]}-мен жұмыс істеуге арналған веб-интерфейс. Ол service mesh-ті басқаруға, оның күйін бақылауға және оны визуализациялауға мүмкіндік береді.

{/tab}

{tab(Жүйелік талаптар)}

- **CPU**: 10m — 500m;
- **RAM**: 64Mi — 1Gi.

{/tab}

{/tabs}

### {heading(Kube Prometheus Stack)[id=k8s-addons-kube-prometheus-stack]}

{tabs}

{tab(Сипаттама)}

Kube Prometheus Stack — [Prometheus](https://prometheus.io/) және [Grafana](https://grafana.com/) визуализациялау құралы негізінде іске асырылған кластер күйін және оның ішінде жайылған сервистерді мониторингтеу жүйесі. Толығырақ {linkto(../../../monitoring#k8s-monitoring-connect-grafana)[text=text%]} бөлімінен қараңыз.

{var(cloud)} {linkto(../../versions/components#k8s-components-addons)[text=Kube Prometheus Stack аддонының екі нұсқасын]} ұсынады: базалық және VK Tech компаниясының жетілдірулері бар нұсқа (`vk` жұрнағы бар нұсқа нөмірімен). Жетілдірулері бар аддонда қосымша кіріктірілген функциялар бар, атап айтқанда {linkto(../../../monitoring#k8s-monitoring-forecast-consumption)[text=кластер ресурстарын тұтынуды болжау]}.

{/tab}

{tab(Жүйелік талаптар)}

- **CPU**: 850m — 2500m;
- **RAM**: 968Mi — 3804Mi;
- **HDD**: 2GB;
- **SSD**: 10GB.

{/tab}

{/tabs}

### {heading(Vertical Pod Autoscaler (VPA))[id=k8s-addons-vpa]}

{note:info}

Бұл аддон тек {linkto(../../../concepts/cluster-generations#k8s-cluster-generations)[text=бірінші буын]} кластерлері үшін ғана қолжетімді.

{/note}

{tabs}

{tab(Сипаттама)}

[Vertical Pod Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler#readme) (VPA) — Kubernetes контейнерлері үшін ресурстарды (CPU және RAM) автоматты түрде баптауға арналған құрал. VPA міндеттері:

1. Жүктемені және ресурстарды пайдалану деректерін талдау.
1. Жаңа және бұрыннан іске қосылған подтардың {linkto(../../../reference/resource-limiting#k8s-resource-limiting)[text=ресурс сұрауларына]} арналған ұсынымдарды ұсыну және, егер бапталған болса, оларды автоматты түрде қолдану.

VPA үш компоненттен тұрады:

- Recommender: ағымдағы және өткен ресурстар тұтынылуын талдайды және осының негізінде подтың ресурс сұрауларын ең жоғары тиімділікке қалай өзгерту керектігін ұсынады. Recommender — VPA-мен жұмыс істегенде әдепкі бойынша қосылатын жалғыз компонент.

- Updater: ұсынымдарды алады, VPA объектілерін жаңартады және ұсынылған ресурстардың жаңа және бұрыннан бар подтар үшін қолжетімді болуын қадағалайды. Жұмыс режиміне байланысты Updater компоненті Admission Controller компонентіне бар подты жасауға немесе жаңартуға сұрау жібереді. Updater компонентінің жұмыс режимдері:

  - `Off` — өшірілген, тек Recommender компоненті жұмыс істейді. Ұсынымдар жасалады, бірақ жаңа да, бұрыннан бар да подтарға қолданылмайды.
  - `Recreate` — толық көлемде жұмыс істейді. `Recreate` режимінде Updater компоненті, егер осы под сұрайтын ресурстар Recommender есептеген мәндерге сәйкес келмесе, подты жояды. Содан кейін ол Admission Controller компонентіне ұсынылған мәндермен осы подты қайта жасауға сұрау жібереді. Жаңа подтар бірден ұсынылған мәндермен жасалады. `Recreate` режиміндегі жұмыс туралы толығырақ {linkto(../../../how-to-guides/vertical-pod-autoscaler#k8s-vertical-pod-autoscaler)[text=%text]} бөлімінен қараңыз.
  - `Initial` — тек жаңа подтар үшін жұмыс істейді. Admission Controller компоненті VPA ұсынымдарына сәйкес ресурс сұрауларын тек жаңа подтарда жаңартады, бірақ бұрыннан бар подтардың жойылуын, қайта жасалуын немесе ресурстарының жаңартылуын бастамайды.

- Admission Controller: Updater компонентінің жұмыс режиміне байланысты подтарды жасау немесе жаңарту кезеңінде жұмыс істейді. Admission Controller компоненті VPA ұсынымдарын жаңа подтар жасалған кезде, сондай-ақ бұрыннан іске қосылған подтарға қолданады, қолдан орнатылған мәндерді елемейді.

{/tab}

{tab(Жүйелік талаптар)}

- **CPU**: 50m;
- **RAM**: 500Mi.

{/tab}

{/tabs}
