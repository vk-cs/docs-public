# {heading(Ресурстарды миграцияға дейін тасымалдау)[id=k8s-pre-migration]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Бұл нұсқаулық {var(cloud)} қызметкерлері жүргізетін кластер ресурстарын {linkto(/kz/start/concepts/architecture#architecture-az)[text=қолжетімділік аймақтары]} арасында {linkto(/kz/kubernetes/k8s/concepts/az-migration-magnum#k8s-az-migration)[text=миграциялауға]} алдын ала дайындалуға көмектеседі. Сіз келесі қадамдарды орындайсыз:

1. Сіздің жұмыс жүктемесіңіз (workload) ағымдағы қолжетімділік аймағына тәуелді екенін анықтаңыз.
1. Миграция жүргізілетін қолжетімділік аймағында жаңа worker-түйіндер тобын құрып, өз жұмыс жүктемеңізді сол жерге тасымалдаңыз.
1. [Stateful-жүктемені](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) жаңа {linkto(/kz/kubernetes/k8s/reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=PVC]}-лерге тасымалдаңыз.
1. {var(cloud)} тарапынан ресурстарды миграциялау жұмыстарының аяқталуын күтіңіз.
1. Қолжетімділік аймағына байланыстыру helm-чарттарда немесе аддондарды баптау кезінде орнатылған болса, бұл мәндерді жаңа қолжетімділік аймағына жаңартыңыз.

{include(/kz/_includes/_az-migration-magnum.md)[tags=warn]}

## {heading(Дайындық қадамдары)[id=k8s-pre-migration-prepare]}

1. Жаңа қолжетімділік аймағына қай Kubernetes кластерін тасымалдау қажет екенін анықтаңыз.
{include(/kz/_includes/_az-migration-magnum.md)[tags=prep]}

## {heading({counter(az)}. Жұмыс жүктемесінің қолжетімділік аймағына тәуелділігін анықтаңыз)[id=k8s-pre-migration-check]}

Миграция кластерлеріңіздің жұмыс жүктемесіне ([workload](https://kubernetes.io/docs/concepts/workloads/)) әсер ететінін анықтаңыз. Ол үшін қолжетімділік аймағы көрсетілген-көрсетілмегенін біліңіз:

{include(/kz/_includes/_az-migration-magnum.md)[tags=check]}

## {heading({counter(az)}. Жұмыс жүктемесін жаңа түйіндер топтарына тасымалдаңыз)[id=k8s-workload-migration-new-node-groups]}

1. {linkto(/kz/kubernetes/k8s/instructions/manage-node-group#k8s-manage-node-group-add-group)[text=Қосыңыз]} worker-түйіндер тобын және оған миграция жүргізілетін қолжетімділік аймағын көрсетіңіз.
1. Жұмыс жүктемеңізді осы түйіндер тобына біртіндеп тасымалдаңыз. Толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/concepts/workloads/).
1. Ескі қолжетімділік аймағы бар түйіндер тобын {linkto(/kz/kubernetes/k8s/instructions/manage-node-group#k8s-manage-node-group-delete-node-group)[text=жойыңыз]} немесе кейін қайта пайдалану үшін ондағы түйіндер санын {linkto(/kz/kubernetes/k8s/instructions/scale#k8s-instructions-scale-horizontal-worker-nodes)[text=азайтыңыз]} нөлге дейін.

## {heading({counter(az)}. Stateful-жүктемені жаңа PVC-ге тасымалдаңыз)[id=k8s-pre-migration-stateful]}

Кластер ресурстары әлі тасымалданбағандықтан, stateful-жүктеме пайдаланатын PVC физикалық және өз метадеректері бойынша ескі қолжетімділік аймағында орналасқан.

Stateful-жүктемені жаңа қолжетімділік аймағындағы PVC-ге тасымалдау үшін:

1. [PVC дайындаңыз](#k8s-pre-migration-pvc-check).
1. [Жүктемені ұсынылған тәсілдердің бірімен тасымалдаңыз](#k8s-pre-migration-pvc).

### {heading(3.1. PVC тасымалдауға дайындаңыз)[id=k8s-pre-migration-pvc-check]}

{include(/kz/_includes/_az-migration-magnum.md)[tags=pvc-prep]}

### {heading(3.2. Тасымалдау тәсілін таңдаңыз)[id=k8s-pre-migration-pvc]}

PVC тасымалдаудың бірнеше тәсілі бар:

- дискінің снимок көмегімен ({var(cloud)} жеке кабинеті арқылы немесе Cinder CSI плагині арқылы);
- `pv-migrate` утилитасы көмегімен.

{tabs}

{include(/kz/_includes/_az-migration-magnum.md)[tags=snap]}
{include(/kz/_includes/_az-migration-magnum.md)[tags=pv-migrate]}

{/tabs}

## {heading({counter(az)}. Ресурстарды миграциялауды аяқтаңыз)[id=k8s-pre-migration-finish]}

1. {var(cloud)} тарапынан ресурстарды {linkto(/kz/kubernetes/k8s/concepts/az-migration-magnum#k8s-az-migration)[text=миграциялау жұмыстарының]} аяқталуын күтіңіз.
1. Жұмыс жүктемесін іске қосыңыз және миграциядан кейін оның дұрыс жұмыс істейтініне көз жеткізіңіз.

## {heading({counter(az)}. Helm-чарттарды және аддондардың баптауларын жаңартыңыз)[id=k8s-pre-migration-helm-addons]}

{include(/kz/_includes/_az-migration-magnum.md)[tags=helm-addons]}

## {heading({counter(az)}. (Міндетті емес) Terraform State синхрондаңыз)[id=mk8s-pre-migration-tf]}

{include(/kz/_includes/_az-migration-magnum.md)[tags=tf-magnum]}

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=k8s-pre-migration-delete]}

{include(/kz/_includes/_az-migration-magnum.md)[tags=delete]}