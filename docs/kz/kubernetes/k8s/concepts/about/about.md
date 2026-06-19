# {heading(Сервис туралы)[id=k8s-about]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Сервис қандай міндеттерге жарамды)[id=k8s-about-purpose]}

Cloud Containers сервисі Kubernetes кластерлерін құруға және олардың ішінде әртүрлі сервистер мен қолданбаларды іске қосуға мүмкіндік береді. Kubernetes үшін барлық үйреншікті құралдар қолжетімді, мысалы:

- Контейнерлерде serverless-функцияларды сақтау және өңдеу: OpenFaaS, OpenWhisk, Kubeless.
- Service Mesh: Istio, Consul, Linkerd.
- Мониторинг, аналитика, логтау: Prometheus, Fluentd, Jaeger, OpenTracing.
- CI/CD: GitLab, CircleCI, Travis CI.
- IaC (инфрақұрылым код ретінде): Terraform, Helm.
- Үлкен деректер және Data Science: Spark.

  Үлкен деректер аналитиктері үшін келесі мүмкіндіктер пайдалы болуы мүмкін:

  - Үлкен есептеу жүктемелеріне төтеп беруге мүмкіндік беретін кластерлерді автоматты масштабтау.
  - Оқиғалық (event-triggered) деректер өңдегіштерін құру.
  - Kubernetes кластерлері мен деректерді [машиналық оқытуға арналған {var(cloud)} платформасының сервистерімен](../../../../ml) интеграциялау.

{note:info}
{var(cloud)} ұсынған Kubernetes дистрибутиві CNCF ([Cloud Native Computing Foundation](https://www.cncf.io/)) ұйымынан [Certified Kubernetes — Hosted](https://www.cncf.io/certification/software-conformance/#logos) сертификатын алды. Бұл дистрибутивтің сенімділігі мен стандарттарға сәйкестігі тексерілгенін, оның қауымдастықтың барлық функционалдық талаптарына жауап беретінін және стандартты [Kubernetes API](https://kubernetes.io/docs/concepts/overview/kubernetes-api/) жүйесімен үйлесімді екенін білдіреді. {var(cloud)} — Ресейдегі осындай сертификаттаудан өткен жалғыз бұлттық провайдер.
{/note}

## {heading(Сервис мүмкіндіктері)[id=k8s-about-features]}

- {linkto(../../instructions/manage-cluster#k8s-manage-cluster)[text=кластерді]} және {linkto(../../instructions/manage-node-group#k8s-manage-node-group)[text=түйіндер топтарын]} {var(cloud)} жеке кабинеті мен {var(cloud)} жеке Terraform-провайдері көмегімен басқару.

- {linkto(../../connect#k8s-connect)[text=кластерге қосылғаннан]} кейін `kubectl` немесе Kubernetes Dashboard көмегімен Kubernetes объектілері мен ресурстарын басқару.

- Кластерді автоматты және қолмен {linkto(../../instructions/scale#k8s-instructions-scale)[text=масштабтау]} (cluster autoscaling).

  Автоматты масштабтау қосылған кезде қолданбалар ең жоғары жүктеме сәтінде қосымша есептеу қуатын бірден алады. Жүктеме төмендеген кезде қолданбаға қолжетімді ресурстар саны азаяды.

  Мұндай тәсіл есептеу ресурстарының 60%-на дейін үнемдеуге мүмкіндік береді.

- Бір {var(cloud)} {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймағы]} шегінде {linkto(../architecture#k8s-architecture-topology)[text=аймақтық кластерді]} құру арқылы үлестірілген инсталляцияларды жасау: істен шығуға төзімділікті қамтамасыз ету үшін бір кластердің әртүрлі түйіндері әртүрлі қолжетімділік аймақтарында (әртүрлі деректерді өңдеу орталықтарында) орналасуы мүмкін. Сондай-ақ қолданба репликаларын осы түйіндерде репликалар да әртүрлі қолжетімділік аймақтарында болатындай етіп орналастыру ұсынылады.

- {var(cloud)} платформасының {linkto(../storage#k8s-storage)[text=деректерді сақтау жүйесімен]} және {linkto(../network#k8s-network)[text=желілік ішкі жүйесімен]} интеграция.

- Кластерлерді тоқтаусыз бір рет басу арқылы бірқалыпты жаңарту (rolling update). Бұл Kubernetes-тің минорлық және мажорлық нұсқалары үшін де қолданылады.

- Кластермен жұмыс істеудің барлық кезеңдерінде қауіпсіздікті қамтамасыз ету:

  - Кластердегі желілік өзара әрекеттесу кезінде барлық қосылымдар шифрланады, сертификаттар пайдаланылады.
  - Calico және Cilium {linkto(../network#k8s-network-cni)[text=желілік саясаттарын]} қолдануға болады. Желілік саясаттар туралы толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/services-networking/network-policies/).
  - Gatekeeper [шектеу саясаттарын](../architecture#k8s-architecture-opa-gatekeeper) қолдануға болады.
  - Толығырақ [Gatekeeper ресми құжаттамасында](https://open-policy-agent.github.io/gatekeeper/website/docs/howto) берілген Gatekeeper {linkto(../architecture#k8s-architecture-opa-gatekeeper)[text=шектеу саясаттарын]} қолдануға болады.
  - Kubernetes [қауіпсіздіктің рөлдік моделін](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) {var(cloud)} платформасының рөлдерімен интеграциялау қолжетімді. Толығырақ {linkto(../access-management#k8s-access-management)[text=Қолжетімділікті басқару]} бөлімінде оқыңыз.

- Velero көмегімен Cloud Containers кластерлерін {linkto(../../how-to-guides/velero/velero-backup#k8s-velero-backup)[text=резервтік көшіру]}.

- Velero көмегімен басқа Kubernetes кластерлерін Cloud Containers ортасына көшіру.

- {linkto(../addons-and-settings/addons#k8s-addons)[text=Дайындалған аддондар жиынтығы]}, оларды {linkto(../../instructions/create-cluster/create-terraform#k8s-create-terraform)[text=Terraform көмегімен кластер құру кезінде]} таңдауға немесе қолданыстағы кластерге {linkto(../../instructions/addons/manage-addons#k8s-manage-addons)[text=орнатуға]} болады, бұл оларды қолмен орналастыру уақытын үнемдейді.
- Кластер жұмысының тұрақтылығы мен қауіпсіздігін арттыруға көмектесетін {linkto(../addons-and-settings/settings#k8s-settings)[text=дайындалған баптаулар жиынтығы]}.

- Prometheus көмегімен кластер күйін мониторингтеу. Мониторинг деректерін {linkto(../../monitoring#k8s-monitoring)[text=бірнеше тәсілмен]} көруге болады.

- Мониторинг деректері негізінде кластер ресурстарын {linkto(../../monitoring#k8s-monitoring-forecast-consumption)[text=тұтынуды болжау]}. VK Tech жетілдірулері бар `kube-prometheus-stack` мониторинг аддоны {linkto(../../monitoring#k8s-monitoring-connect-grafana)[text=Grafana]} ішінде алдын ала бапталған қосымша мүмкіндіктерді ұсынады:

  - кластер түйіндеріндегі ресурстарды тұтынудың ағымдағы болжамдарын көрсететін дашбордтар;
  - белгілі бір уақыттан кейін нақты ресурстардың таусылуы болжанса, хабарламалар жіберуге арналған алерттер.

## {heading(Әрі қарай не істеу керек)[id=k8s-about-next-steps]}

- {linkto(../architecture#k8s-architecture)[text=Сервис архитектурасымен танысыңыз]}.
- {linkto(../network#k8s-network)[text=Кластердегі желі құрылғысымен танысыңыз]}.
- {linkto(../storage#k8s-storage)[text=Кластердегі сақтау орны құрылғысымен танысыңыз]}.
