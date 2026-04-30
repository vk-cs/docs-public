{include(/kz/_includes/_translated_by_ai.md)}

Cloud Containers кластерлерінде [бірнеше нұсқасы](../../concepts/versions/components) [Kube Prometheus Stack](../../concepts/addons-and-settings/addons#kube_prometheus_stack_822533c9) аддонының қолжетімді. Бұл аддонды VK Cloud құралдарымен жаңарту қолжетімсіз, бірақ аддонды қолмен жаңартуғал болады.

Kube Prometheus Stack аддонын `36.2.0` нұсқасынан `54.2.2` нұсқасына жаңарту үшін аддонның алғымдағы нұсқасын жойып, содан кейін жаңал нұсқасын орнату қажет. Сондықтан жаңарту процесі аддонның алғымдағы нұсқасының ортасын сақтап, кейін оны аддонның жаңал нұсқасымен қайта пайдалану үшін дайындауды қамтиды.

{note:warn}

Төменде аддон тек осы аддонғал қатысты Kubernetes ресурстарын ғана қамтитын аттар кеңістігінде (мысалы, `kube-prometheus-stack`) орнатылған деп болжанады.

Егер аттар кеңістігінде басқал Kubernetes ресурстары да болса, командалар мен скриптті аддонғал қатысы жоқ ресурстарғал әсер етпейтіндей етіп түзетіңіз.

{/note}

## Дайындық қадамдары

1. Егер Cloud Containers сервисінде жаңарту қажет Kube Prometheus Stack аддондар бар бұрыннан бар Kubernetes кластері болса, бұл қадамды өткізіп жіберіңіз.

   Әйтпесе, аддонды жаңарту орындалатын тестілік кластер жасаңыз:

   1. [Жасаңыз](../../instructions/create-cluster) `1.26.5` нұсқасындағы Cloud Containers кластерін.

      Кластерді жасау кезінде **Сыртқы IP тағайындау** опциясын таңдаңыз. Кластердің қалған параметрлерін өз қалауыңыз бойынша таңдаңыз.

   1. [Кластерге орнатыңыз](../../instructions/addons/advanced-installation/install-advanced-monitoring) `36.2.0` нұсқасындағы Kube Prometheus Stack аддонын.

      Аддонды **жылдам орнатуды** орындаңыз (аддон баптауының кодын өңдеусіз).

1. [Көз жеткізіңіз](../../connect/kubectl), `kubectl` көмегімен кластерге қосыла алатыныңызғал.

   Қосылу үшін VK Cloud жеке кабинетінен жүктелген кластер конфигурациясы файлын (kubeconfig) пайдаланыңыз.

1. Аддонның қолжетімді және жұмыс істеп тұрғанын тексеріңіз. Ол үшін [Grafana веб-интерфейсіне қол жеткізіңіз](../../monitoring#connect_grafana).

   {note:warn}

   Grafana-ғал кіру құпиясөзін, тіпті ол Kubernetes құпиясы түрінде сақталса да, жазып алыңыз. Аддонды жаңарту барысында аддон мен құпия орналасқан аттар кеңістігі барлық мазмұнымен бірге жойылады.

   {/note}

1. Егер утилита әлі орнатылмаған болса, Helm `3.0.0` немесе одан жоғары нұсқасын [орнатыңыз](../../install-tools/helm).

   Орнату үшін кластермен [үйлесімді](https://helm.sh/docs/topics/version_skew/) Helm нұсқасын таңдаңыз.

1. Кластер үшін kubeconfig-ті көрсететін орта айнымалысын орнатыңыз. Бұл аддонды жаңарту кезінде `kubectl` және `helm` құралдарымен жұмыс істеуді жеңілдетеді.

   kubeconfig файлдарыңызғал дейінгі жол төмендегі мысалдан өзгеше болуы мүмкін.

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

## 1. Аддонды жаңарту үшін қажетті алқпаратты алыңыз

1. [Аддонды баптау кодының өңдеу режиміне өтіңіз](../../instructions/addons/manage-addons).

   Аддонды баптау кодын өзгертпеңіз.

   Келесі мәліметтерді жазып алыңыз:

   1. Қолданба атауы (әдепкі бойынша `kube-prometheus-stack`).
   1. Аттар кеңістігінің атауы (әдепкі бойынша `prometheus-monitoring`).
   1. Аддонды баптаудың толық коды.

1. Қолданба мен аттар кеңістігінің осы атауларын көрсететін орта айнымалыларын орнатыңыз. Бұл жаңарту кезінде кейінгі жұмысты жеңілдетеді.

   Айнымалыларыңыздың мәндері төмендегі мысалдан өзгеше болуы мүмкін.

   {tabs}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   export CHART_NAME="kube-prometheus-stack"
   export NAMESPACE="prometheus-monitoring"

   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   $CHART_NAME="kube-prometheus-stack"
   $NAMESPACE="prometheus-monitoring"
   ```

   {/tab}

   {/tabs}

1. Аддон пайдаланатын [Persistent Volume Claims (PVCs) және тұрақты томдар (persistent volumes, PVs)](../../reference/pvs-and-pvcs) туралы алқпарат алыңыз. Олар жиналатын метрикаларды, сондай-алқ аддонның жұмысына қажет басқал деректерді сақтау үшін қолданылады.

   ```console
   kubectl -n $NAMESPACE get pvc
   ```

   Команда шығысында томдардың өлшемі (`CAPACITY`) көрсетілген PVCs (`NAME`) және оларғал сәйкес PVs (`VOLUMES`) тізімі болады. Бұл алқпаратты жазып алыңыз, ол кейін қажет болады.

   {cut(Команданың ішінара шығысының мысалы)}

   ```text
   NAME                                                                             STATUS   VOLUME                                     CAPACITY   ...
   alertmanager-prometheus-alertmanager-db-alertmanager-prometheus-alertmanager-0   Bound    pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX   1Gi        ...
   kube-prometheus-stack-grafana                                                    Bound    pvc-YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY   1Gi        ...
   prometheus-prometheus-prometheus-db-prometheus-prometheus-prometheus-0           Bound    pvc-ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ   10Gi       ... 
   ```

   {/cut}

## 2. Аддон ортасын жаңартуғал дайындаңыз

Егер сақтау класына қатысты өзгерістер аддонды баптау кодына енгізілмесе, әдепкі бойынша аддонғал арналған томдар [босату саясатын](../../reference/pvs-and-pvcs) `Retain` қолдана отырып жасалады. Сондықтан аддонды жай ғана жойсаңыз, деректері бар тұрақты томдар жойылады. Бұл аддон жұмыс істеген уақыт ішінде жиналған метрикалардың, сондай-алқ аддонның жұмысына қажет басқал деректердің жоғалуына әкеледі.

Бұған қоса, аддон пайдаланатын келесі Kubernetes ресурстары да аддонның жаңал нұсқасын орнатуғал кедергі келтіруі мүмкін:

- Аддонның жұмысына қажет Custom Resource Definitions (CRDs) жиынтығы.
- Аддонғал тұрақты томдарды пайдалануғал мүмкіндік беретін Persistent Volume Claims (PVCs) жиынтығы.

Аддонды жаңартпас бұрын, ол пайдаланатын тұрақты томдарды жойылудан қорғалңыз, сондай-алқ төменде келтірілген тәсілдердің бірімен аталған Kubernetes ресурстарын жойыңыз.

{tabs}

{tab(Linux үшін дайын bash-скрипт)}

1. Скрипт коды бар файл жасаңыз:

   {cut(prepare-for-addon-update.sh)}

   ```console
   #!/bin/sh

   set -e

   DEFAULT_NAMESPACE=prometheus-monitoring
   : "${NAMESPACE:=prometheus-monitoring}"
   : "${CHART_NAME:=kube-prometheus-stack}"
   : "${DRY_RUN:=none}"

   usage() {
   cat <<EOF
   Usage:
   -h help
   -k kubeconfig           "${KUBECONFIG}"
   -c kubeconfig context   ""
   -n namespace            "${NAMESPACE}"
   -r chart                "${CHART_NAME}"
   -d dry run              "${DRY_RUN}". [none, server,client]
   EOF
   exit 1
   }

   while getopts 'k:c:n:r:hd' opt; do
     case $opt in
       h)
           usage
           ;;
       k) KUBECONFIG=$OPTARG
           ;;
       c) CONTEXT=$OPTARG
           ;;
       n) NAMESPACE=$OPTARG
           ;;
       r) CHART_NAME=$OPTARG
           ;;
       d) DRY_RUN=server
           ;;
       *) usage ;;
     esac
   done

   shift "$((OPTIND-1))"

   # set k8s params as array
   set -- "--namespace=${NAMESPACE}"
   [ -n "${CONTEXT}" ] && {
       set -- "--context=${CONTEXT}" "${@}"
       # for helm
       set -- "--kube-context=${CONTEXT}" "${@}"
   }
   [ -n "${KUBECONFIG}" ] && set -- "--kubeconfig=${KUBECONFIG}" "${@}"

   get_prometheus_pv() {
       kubectl "${@}" get pv -o jsonpath='{range .items[?(@.spec.claimRef.namespace=="'"${NAMESPACE}"'")]}{"pv/"}{.metadata.name}{"\n"}{end}'
   }

   get_prometheus_crd() {
       kubectl "${@}" get crd -o jsonpath='{range .items[?(@.spec.group=="monitoring.coreos.com")]}{"crd/"}{.metadata.name}{"\n"}{end}'
   }

   get_prometheus_pvc() {
       kubectl "${@}" get pvc -o jsonpath='{range .items[*]}{"pvc/"}{.metadata.name}{"\n"}{end}'
   }

   set_prometheus_pv_retain_reclaim_policy() {
       pvs=$(get_prometheus_pv "${@}")
       [ -z "${pvs}" ] && return
       for pv in ${pvs}; do
           set -- "${pv}" "${@}"
       done
       kubectl patch "${@}" --dry-run="${DRY_RUN}" -p '{"spec":{"persistentVolumeReclaimPolicy":"Retain"}}'
   }

   clear_prometheus_pv_claim_reference() {
       pvs=$(get_prometheus_pv "${@}")
       [ -z "${pvs}" ] && return
       for pv in ${pvs}; do
           set -- "${pv}" "${@}"
       done
       kubectl patch "${@}" --dry-run="${DRY_RUN}" --type json -p='[{"op": "remove", "path": "/spec/claimRef"}]'
   }

   delete_prometheus_crd() {
       crds=$(get_prometheus_crd "${@}")
       [ -z "${crds}" ] && return
       for crd in ${crds}; do
           set -- "${crd}" "${@}"
       done
       kubectl delete "${@}" --dry-run="${DRY_RUN}"
   }

   delete_prometheus_pvc() {
       pvcs=$(get_prometheus_pvc "${@}")
       [ -z "${pvcs}" ] && return
       for pvc in ${pvcs}; do
           set -- "${pvc}" "${@}"
       done
       kubectl delete "${@}" --dry-run="${DRY_RUN}"
   }

   delete_prometheus_chart() {
       dry_run=""
       [ "${DRY_RUN}" != "none" ] && dry_run="--dry-run"
       if helm get manifest "${@}" "${CHART_NAME}" >/dev/null 2>&1; then
           helm uninstall "${@}" "${CHART_NAME}" --wait --timeout 600s "${dry_run}" >/dev/null 2>&1 || true
       fi
       helm list "${@}" -aA -f "${CHART_NAME}" -q
   }

   delete_prometheus_namespace() {
       if kubectl get "${@}" ns "${NAMESPACE}" >/dev/null 2>&1; then
           kubectl delete "${@}" ns "${NAMESPACE}" --dry-run="${DRY_RUN}" --wait --timeout 600s --force --grace-period=0 --cascade=foreground
       fi
   }

   echo "Setting retain policy for the Prometheus PVs..."
   set_prometheus_pv_retain_reclaim_policy "${@}"
   echo "Deleting Prometheus chart..."
   delete_prometheus_chart "${@}"
   echo "Deleting Prometheus PVCs..."
   delete_prometheus_pvc "${@}"
   echo "Clearing Prometheus PV claim references..."
   clear_prometheus_pv_claim_reference "${@}"
   echo "Clearing Prometheus CRDs..."
   delete_prometheus_crd "${@}"
   [ "${NAMESPACE}" = "${DEFAULT_NAMESPACE}" ] && {
       echo "Deleting Prometheus namespace..."
       delete_prometheus_namespace "${@}"
   }
   echo "Completed!"
   ```

   {/cut}

   Скрипт келесі әрекеттерді орындайды:

   1. Аддон орнатылған аттар кеңістігінде жасалған PVCs-пен байланысқан тұрақты томдарды анықтайды. Осы тұрақты томдар үшін скрипт `Retain` босату саясатын орнатады. Бұл алғымдағы аддон нұсқасы жойылғанда осы томдар жойылмауы үшін қажет.
   1. Аддонның алғымдағы нұсқасының Helm-чартын (chart) жояды. Бұл аддон пайдаланатын PVCs және CRDs жиынтықтарын сәтті жою үшін қажет.
   1. Аддон орнатылған аттар кеңістігінен PVCs жиынтығын жояды. Бұл PVs-ті PVCs-тен ажыратып, кейін осы PVs-ті аддонның жаңал нұсқасымен қайта пайдалану үшін қажет.
   1. Осы PVCs-пен байланысқан тұрақты томдардағы жойылған PVCs-ке сілтемелерді тазартады. Бұл тұрақты томдар байланысу үшін қолжетімді болады (PVs күйі: `Available`) және орнатылғаннан кейін оларды аддонның жаңал нұсқасы қайта пайдаланады.
   1. Аддон пайдаланған CRDs жиынтығын жояды.
   1. Егер скрипт осы аттар кеңістігі үшін іске қосылса, `prometheus-monitoring` аттар кеңістігін жояды.

1. Скрипт коды бар файлды орындалатын етіңіз:

   ```console
   chmod +x prepare-for-addon-update.sh
   ```

1. Скрипт қандай параметрлермен орындалатынын анықтаңыз:

   ```console
   bash prepare-for-addon-update.sh -h
   ```

   Қолданыстағы параметрлер мен олардың әдепкі мәндері көрсетілетін анықтама шығарылады:

   - `-h`: анықтаманы шығару.
   - `-k`: kubeconfig файлына дейінгі жол. Әдепкі мәні `$KUBECONFIG` орта айнымалысынан алынады, егер ол орнатылған болса.
   - `-c`: кластермен жұмыс істеу кезінде пайдаланылатын kubeconfig контекстінің атауы. Әдепкі мәні: бос жол.
   - `-n`: аддон орнатылған аттар кеңістігінің атауы. Әдепкі мәні: `prometheus-monitoring`.
   - `-r`: аддон орнатылған қолданбаның атауы. Аддонғал арналған Helm-чарт атауымен сәйкес келеді. Әдепкі мәні: `kube-prometheus-stack`.
   - `-d`: `kubectl` үшін [--dry-run](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands) аргументінің мәні. Әдепкі мәні: `none`. Скриптті сынақ режимінде іске қосу үшін `server` немесе `client` пайдаланыңыз: кластерге ешқандай өзгеріс енгізілмейді.

   {cut(Анықтама шығысының мысалы)}

   ```text
   Usage:
   -h help
   -k kubeconfig           "/home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml"
   -c kubeconfig context   ""
   -n namespace            "prometheus-monitoring"
   -r chart                "kube-prometheus-stack"
   -d dry run              "none". [none, server,client]
   ```

   {/cut}

1. Скриптті іске қосыңыз.

   {note:warn}

   Скриптті `prometheus-monitoring` аттар кеңістігі айқын (`-n` параметрі) не айқын емес түрде берілгенде іске қосқанда, бұл аттар кеңістігі жойылады.

   Скрипт басқал аттар кеңістігі үшін орындалса, ол жойылмайды.

   {/note}

   Қажетті параметрлерді көрсете отырып, команданы орындаңыз. Егер параметрдің әдепкі мәні сізге сәйкес келсе, оны көрсетпеуге болады.

   ```console
     bash prepare-for-addon-update.sh \
       -k <путь к файлу kubeconfig> \
       -c <название контекста kubeconfig> \
       -n <название пространства имен> \
       -r <название приложения> \
       -d <значение аргумента --dry-run для kubectl>

   ```

   Скрипт жұмысы туралы егжей-тегжейлі хабарламалар шығарылады. Соның ішінде шығыста келесі хабарламалар болуы тиіс:

   ```text
   Setting retain policy for the Prometheus PVs...
   Deleting Prometheus chart...
   Deleting Prometheus PVCs...
   Clearing Prometheus PV claim references...
   Clearing Prometheus CRDs...
   Deleting Prometheus namespace...
   Completed!
   ```

   {cut(Команда шығысының мысалы)}

   ```text
   Settings retain policy for the prometheus PVs...
   persistentvolume/pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX patched
   persistentvolume/pvc-YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY patched
   persistentvolume/pvc-ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ patched
   Deleting prometheus chart...
   Deleting prometheus PVCs...
   persistentvolumeclaim "prometheus-prometheus-prometheus-db-prometheus-prometheus-prometheus-0" deleted
   persistentvolumeclaim "alertmanager-prometheus-alertmanager-db-alertmanager-prometheus-alertmanager-0" deleted
   Clearing prometheus PV claim references...
   persistentvolume/pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX patched
   persistentvolume/pvc-YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY patched
   persistentvolume/pvc-ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ patched
   Clearing prometheus CRDs...
   Warning: deleting cluster-scoped resources, not scoped to the provided namespace
   customresourcedefinition.apiextensions.k8s.io "thanosrulers.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "servicemonitors.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "prometheusrules.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "prometheuses.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "probes.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "podmonitors.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "alertmanagers.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "alertmanagerconfigs.monitoring.coreos.com" deleted
   Deleting prometheus namespace...
   Warning: Immediate deletion does not wait for confirmation that the running resource has been terminated. The resource may continue to run on the cluster indefinitely.
   Warning: deleting cluster-scoped resources, not scoped to the provided namespace
   namespace "prometheus-monitoring" force deleted
   Completed!
   ```

   {/cut}

{/tab}

{tab(Linux/macOS/Windows үшін бөлек командалар)}

1. Аддон пайдаланатын PVs тізімін аддонның аттар кеңістігіндегі PVCs арқылы алыңыз:

   ```console
   kubectl get pv -o jsonpath='{range .items[?(@.spec.claimRef.namespace=="'"${NAMESPACE}"'")]}{.metadata.name}{"\n"}{end}'
   ```

   PVs тізімі [бұрын алынған](#1_addondy_zhanartu_ushin_kazhetti_alkparatty_alynyz) PVs тізімімен сәйкес келуі тиіс.

1. Осы PVs-ті `Retain` босату саясатын пайдаланатындай етіп патчтаңыз. Бұл алғымдағы аддон нұсқасын жойғанда осы томдардың жойылмауы үшін қажет.

   Бұл команда жеке PV-ді патчтайды. Оны тізімдегі барлық PVs үшін орындаңыз.

   ```console
   kubectl patch pv <имя PV> -p '{"spec":{"persistentVolumeReclaimPolicy":"Retain"}}'
   ```

1. Кластердегі барлық PVs тізімін алып, аддон жұмыс істейтін PVs `Retain` босату саясатын қолданып тұрғанына және PVC-пен (`Bound`) байланысқан екеніне көз жеткізіңіз:

   ```console
   kubectl get pv
   ```

   {cut(Команданың ішінара шығысының мысалы)}

   ```text
   NAME                                       CAPACITY   ...   RECLAIM POLICY   STATUS  CLAIM    ...
   pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX   1Gi        ...   Retain           Bound   prometheus-monitoring/alertmanager-prometheus-alertmanager-db-alertmanager-prometheus-alertmanager-0 ...
   pvc-YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY   1Gi        ...   Retain           Bound   prometheus-monitoring/kube-prometheus-stack-grafana ...
   pvc-ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ   10Gi       ...   Retain           Bound   prometheus-monitoring/prometheus-prometheus-prometheus-db-prometheus-prometheus-prometheus-0 ...
   ```

   {/cut}

1. Аддонның алғымдағы нұсқасының Helm-чартын (chart) жойыңыз. Бұл аддон пайдаланатын PVCs және CRDs жиынтықтарын сәтті жою үшін қажет.

   ```console
   helm uninstall -n $NAMESPACE $CHART_NAME --wait --timeout 600s
   ```

1. Аддон пайдаланған PVCs тізімін алыңыз:

   ```console
   kubectl -n $NAMESPACE get pvc
   ```

   Қорытынды тізім [бұрын алынғаннан](#1_addondy_zhanartu_ushin_kazhetti_alkparatty_alynyz) өзгеше болуы мүмкін: PVCs-тің бір бөлігі Helm-чарт жойылған кезде жойылды.

1. Аддон пайдаланған PVCs-ті жойыңыз. Бұл PVs-ті PVCs-тен ажыратып, кейін осы PVs-ті аддонның жаңал нұсқасымен қайта пайдалану үшін қажет.

   Бұл команда жеке PVC-ді жояды. Оны тізімдегі барлық PVCs үшін орындаңыз.

   ```console
   kubectl -n $NAMESPACE delete pvc <имя PVC>
   ```

1. Аддон пайдаланған PVs-ті жойылған PVCs-тен ажырату үшін патчтаңыз. Бұл тұрақты томдар байланысу үшін қолжетімді болады (PVs күйі: `Available`) және орнатылғаннан кейін оларды аддонның жаңал нұсқасы қайта пайдаланады.

   Бұл команда жеке PV-ді патчтайды. Оны бұрын алынған тізімдегі барлық PVs үшін орындаңыз.

   ```console
   kubectl patch pv <имя PV> --type json -p '[{"op": "remove", "path": "/spec/claimRef"}]'
   ```

1. Кластердегі барлық PVs тізімін алып, аддон жұмыс істеген PVs `Retain` босату саясатын қолданып тұрғанына және байланысу үшін қолжетімді (`Available`) екеніне көз жеткізіңіз:

   ```console
   kubectl get pv
   ```

   {cut(Команданың ішінара шығысының мысалы)}

   ```text
   NAME                                       CAPACITY   ...   RECLAIM POLICY   STATUS      ...
   pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX   1Gi        ...   Retain           Available   ...
   pvc-YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY   1Gi        ...   Retain           Available   ...
   pvc-ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ   10Gi       ...   Retain           Available   ...
   ```

   {/cut}

1. Аддон жұмыс істеген CRDs тізімін алыңыз:

   ```console
   kubectl get crd -o jsonpath='{range .items[?(@.spec.group=="monitoring.coreos.com")]}{.metadata.name}{"\n"}{end}'
   ```

1. Аддон жұмыс істеген барлық CRDs-ті жойыңыз.

   Бұл команда жеке CRD-ді жояды. Оны бұрын алынған тізімдегі барлық CRDs үшін орындаңыз.

   ```console
   kubectl delete crd <имя CRD>
   ```

1. Аддон орнатылған аттар кеңістігін жойыңыз.

   ```console
   kubectl delete ns $NAMESPACE
   ```

{/tab}

{/tabs}

## 3. Аддонды жаңал нұсқалғал жаңартыңыз

1. [VK Cloud интерфейстерін пайдаланып, аддонның алғымдағы нұсқасын жойыңыз](../../instructions/addons/manage-addons#addondy_zhoyu).
1. [Кластерге орнатыңыз](../../instructions/addons/advanced-installation/install-advanced-monitoring) `54.2.2` нұсқасындағы Kube Prometheus Stack аддонын.

   **Стандартты орнатуды** келесі түрде орындаңыз:

   1. Аддонның алдыңғы нұсқасын орнату кезінде пайдаланылған қолданба мен аттар кеңістігінің сол атауларын беріңіз.

   1. [Бұрын алынған](#1_addondy_zhanartu_ushin_kazhetti_alkparatty_alynyz) аддонның алдыңғы нұсқасының баптау кодын зерттеңіз. Аддонның келесі компоненттері үшін сақтау орнын баптауғал жауап беретін код фрагменттерін табыңыз:

      {tabs}

      {tab(Grafana)}

      ```yaml
      grafana:

        ...

        persistence:
          enabled: true
          storageClassName: "csi-ceph-hdd-gz1"
          accessModes:
          - ReadWriteOnce
          size: 1Gi

        ...
      ```

      {/tab}

      {tab(Alert Manager)}

      ```yaml
      alertmanager:

        ...

        alertmanagerSpec:

        ...

          storage:
            volumeClaimTemplate:
              spec:
                storageClassName: "csi-ceph-hdd-gz1"
                accessModes:
                - ReadWriteOnce
                resources:
                  requests:
                    storage: 1Gi
      ```

      {/tab}

      {tab(Prometheus)}

      ```yaml
      prometheus:

        ...

        prometheusSpec:

          ...

          storageSpec:
            volumeClaimTemplate:
              spec:
                storageClassName: "csi-ceph-ssd-gz1"
                accessModes:
                - ReadWriteOnce
                resources:
                  requests:
                    storage: 10Gi
      ```

      {/tab}

      {/tabs}

   1. Орнату жоспарланған аддонның жаңал нұсқасының баптау кодын зерттеңіз.

      Егер сақтау орнын баптауғал жауап беретін код фрагменттері бұрын алынғандардан өзгеше болса, оларды түзетіңіз. Grafana, Alert Manager және Prometheus үшін сақтау орнының баптаулары аддонның алдыңғы нұсқасында пайдаланылған ұқсас баптаулармен дәл сәйкес келуі тиіс.

   1. (Опционалды түрде) Аддонды баптау кодына басқал өзгерістер енгізіңіз.

      Егер аддонның алдыңғы нұсқасын орнату кезінде `grafana.adminPassword` өрісінде Grafana-ғал кіру құпиясөзін көрсеткен болсаңыз, оны қайта көрсету қажет емес. Аддонның жаңал нұсқасы сақтау орны ретінде бұрынғы PVs-ті пайдаланады, сондықтан құпиясөз өзгеріссіз қалады. Бұл өрісті бос қалдырсаңыз да, аддонның жаңал нұсқасын орнату Grafana-ғал кіру құпиясөзін өзгертпейді: Grafana үшін құпиясөзі бар secret жасалады, бірақ ол пайдаланылмайды.

      {note:warn}

      Дұрыс берілмеген баптау коды аддонды орнату кезінде қателерге немесе оның жұмысқал жарамсыз болуына әкелуі мүмкін.

      {/note}

   1. Аддонды орнатыңыз.

      Орнату процесі ұзақ уақыт алуы мүмкін. Оның аяқталуын күтіңіз.

1. Аддон пайдаланатын [Persistent Volume Claims (PVCs) және тұрақты томдар (persistent volumes, PVs)](../../reference/pvs-and-pvcs) туралы алқпарат алыңыз:

   ```console
   kubectl -n $NAMESPACE get pvc
   ```

   Команда шығысы аддонның алдыңғы нұсқасы үшін [бұрын орындалған](#1_addondy_zhanartu_ushin_kazhetti_alkparatty_alynyz) команданың шығысына ұқсас болуы тиіс. Мысалы, `alertmanager...` PVC-і бұрын Alert Manager пайдаланған сол PV-пен байланысқан болуы тиіс. Prometheus пен Grafana үшін де дәл солай.

## 4. Жаңартудан кейін аддонның жұмысқал қабілеттілігін тексеріңіз

[Grafana веб-интерфейсіне қол жеткізіңіз](../../monitoring#connect_grafana). Қосылу үшін аддонның алдыңғы нұсқасымен пайдаланылған сол құпиясөзді қолданыңыз. Егер Grafana құпиясөзін ұмытып қалсаңыз, оны [қалпына келтіріңіз](../../instructions/addons/advanced-installation/install-advanced-monitoring#reset_grafana_password).

Grafana-ғал сәтті қосылу аддонның сәтті жаңартылғанын көрсетеді.

## Пайдаланылмайтын ресурстарды жойыңыз

Жұмыс істеп тұрған Cloud Containers кластері тарифтеледі және есептеу ресурстарын тұтынады. Егер кластерді тестілік мақсатта жасап, ол енді қажет болмаса:

- [тоқтатыңыз](../../instructions/manage-cluster#klasterdi_iske_kosu_nemese_toktatu) оны, кейінірек пайдалану үшін;
- [жойыңыз](../../instructions/manage-cluster#delete_cluster) оны біржола.
