# {heading(Ресурстарды көшіргеннен кейін жұмыс жүктемесін тасымалдау)[id=mk8s-post-migration]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Бұл нұсқаулық {var(cloud)} қызметкерлері кластер ресурстарын {linkto(../../../../../start/concepts/architecture#architecture-az)[text=қолжетімділік аймақтары]} арасында {linkto(../../../concepts/az-migration-magnum#mk8s-az-migration)[text=көшіру жұмыстарын]} аяқтағаннан кейін жұмыс жүктемесіңізді (workload) тасымалдауды аяқтауға көмектеседі. Сіз мынадай қадамдарды орындайсыз:

1. Жұмыс жүктемеңіз (workload) ескі қолжетімділік аймағына тәуелді екенін анықтаңыз, себебі бұл жағдайда жұмыс жүктемеңіздің метадеректері оған сілтеме жасауын жалғастырады.
1. Көшірілгеннен кейінгі worker-тораптар топтарындағы жұмыс жүктемесін жаңа қолжетімділік аймағына бейімдейсіз.
1. [Stateful-жүктемені](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) жаңа {linkto(../../../reference/pvs-and-pvcs#mk8s-pvs-and-pvcs)[text=PVC]}-ге тасымалдайсыз.
1. Қолжетімділік аймағына байланыстыру helm-чарттарда немесе аддонды баптау кезінде орнатылған болса, бұл мәндерді жаңа қолжетімділік аймағына жаңартыңыз.

{include(/kz/_includes/_az-migration-magnum.md)[tags=warn]}

## {heading(Дайындық қадамдары)[id=mk8s-post-migration-prepare]}

1. Ресурстары басқа қолжетімділік аймағына тасымалданған Kubernetes кластеріне өтіңіз.
{include(/kz/_includes/_az-migration-magnum.md)[tags=prep]}

## {heading({counter(az)}. Жұмыс жүктемесінің қолжетімділік аймағына тәуелділігін анықтаңыз)[id=mk8s-post-migration-check]}

Көшіру кластерлеріңіздің жұмыс жүктемесіне ([workload](https://kubernetes.io/docs/concepts/workloads/)) әсер ететінін анықтаңыз. Ол үшін қолжетімділік аймағы көрсетілген-көрсетілмегенін біліңіз:

{include(/kz/_includes/_az-migration-magnum.md)[tags=check]}

## {heading({counter(az)}. Көшірілген тораптар топтарының конфигурацияларын жаңартыңыз)[id=mk8s-post-migration-update]}

1. {var(cloud)} тарапынан ресурстарды көшіру жұмыстарының аяқталуын күтіңіз.

   Көшірілген worker-тораптар топтарындағы (яғни көшіруге дейін жасалған) тораптарда ескі қолжетімділік аймағын көрсететін мынадай {linkto(../../../reference/labels-and-taints#mk8s-labels-and-taints)[text=белгілер]} болады:

    - `topology.kubernetes.io/zone`,
    - `failure-domain.beta.kubernetes.io/zone`.

   Бұл белгілерді жаңарту қажет, себебі тораптың өзі физикалық түрде жаңа қолжетімділік аймағында орналасады.

   `topology.cinder.csi.openstack.org/zone` белгісін жаңартудың қажеті жоқ: онда жаңа қолжетімділік аймағы көшіруге дейін де, кейін де жасалған тораптар үшін орнатылады.

1. Белгілердегі қолжетімділік аймақтарын жаңартыңыз:

   {tabs}

   {tab(Жеке тораптар үшін)}

   ```console
      kubectl label node ≠ \
          topology.kubernetes.io/zone=<ЖАҢА_ҚОЛЖЕТІМДІЛІК_АЙМАҒЫ> \
          failure-domain.beta.kubernetes.io/zone=<ЖАҢА_ҚОЛЖЕТІМДІЛІК_АЙМАҒЫ> \
          --overwrite
   ```

   Мұнда `<ЖАҢА_ҚОЛЖЕТІМДІЛІК_АЙМАҒЫ>` — көшіруден кейінгі қолжетімділік аймағы.

   {/tab}

   {tab(Барлық тораптар үшін)}

   ```console
      kubectl label nodes -l topology.kubernetes.io/zone=<ЕСКІ_ҚОЛЖЕТІМДІЛІК_АЙМАҒЫ>,failure-domain.beta.kubernetes.io/zone=<ЕСКІ_ҚОЛЖЕТІМДІЛІК_АЙМАҒЫ> \
          topology.kubernetes.io/zone=<ЖАҢА_ҚОЛЖЕТІМДІЛІК_АЙМАҒЫ> \
          failure-domain.beta.kubernetes.io/zone=<ЖАҢА_ҚОЛЖЕТІМДІЛІК_АЙМАҒЫ> \
          --overwrite
   ```

   Мұнда:

   - `<ЕСКІ_ҚОЛЖЕТІМДІЛІК_АЙМАҒЫ>` — көшіруге дейінгі қолжетімділік аймағы;
   - `<ЖАҢА_ҚОЛЖЕТІМДІЛІК_АЙМАҒЫ>` — көшіруден кейінгі қолжетімділік аймағы.

   Екі белгі үшін де жаңа қолжетімділік аймағы бірдей болуы керек.

   {/tab}
   {/tabs}

## {heading({counter(az)}. Stateful-жүктемені жаңа PVC-ге тасымалдаңыз)[id=mk8s-post-migration-stateful]}

{var(cloud)} тарапынан {linkto(../../../concepts/az-migration-magnum#mk8s-az-migration)[text=ресурстарды көшіру]} жұмыстары аяқталғандықтан, PV орналасқан дискілер өз қолжетімділік аймағын физикалық түрде өзгерткен. Енді сізге олардың метадеректерін кластерде жаңарту қажет.

Stateful-жүктемені жаңа қолжетімділік аймағындағы PVC-ге тасымалдау үшін

1. [PVC-ді дайындаңыз](#mk8s-post-migration-pvc-check).
1. [Жүктемені ұсынылған тәсілдердің бірімен тасымалдаңыз](#mk8s-post-migration-pvc).

### {heading(3.1. PVC-ді тасымалдауға дайындаңыз)[id=mk8s-post-migration-pvc-check]}

{include(/kz/_includes/_az-migration-magnum.md)[tags=pvc-prep]}

### {heading(3.2. Тасымалдау тәсілін таңдаңыз)[id=mk8s-post-migration-pvc]}

PVC-ді тасымалдаудың бірнеше тәсілі бар:

- дискінің суретін (снапшотын) көмегімен ({var(cloud)} жеке кабинеті арқылы немесе Cinder CSI плагині арқылы);
- `pv-migrate` утилитасының көмегімен;
- дискінің ID-сының көмегімен.

{tabs}

{include(/kz/_includes/_az-migration-magnum.md)[tags=snap]}
{include(/kz/_includes/_az-migration-magnum.md)[tags=pv-migrate]}
{include(/kz/_includes/_az-migration-magnum.md)[tags=volume-id]}

{/tabs}

## {heading({counter(az)}. Helm-чарттарды және аддон баптауларын жаңартыңыз)[id=mk8s-post-migration-helm-addons]}

{include(/kz/_includes/_az-migration-magnum.md)[tags=helm-addons]}

## {heading({counter(az)}. (Қалауыңыз бойынша) Terraform State-ті синхрондаңыз)[id=mk8s-post-migration-tf]}

{include(/kz/_includes/_az-migration-magnum.md)[tags=tf-managed]}

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=mk8s-post-migration-delete]}

{include(/kz/_includes/_az-migration-magnum.md)[tags=delete]}