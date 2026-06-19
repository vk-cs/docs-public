# {heading(Kube Prometheus Stack аддонын жаңарту)[id=k8s-update-monitoring-addon]}

{include(/kz/_includes/_translated_by_ai.md)}

Cloud Containers сервисінде жасайтын Kubernetes кластерлерінде {linkto(../../concepts/versions/components#k8s-components)[text=Kube Prometheus Stack]} аддонының {linkto(../../concepts/addons-and-settings/addons#k8s-addons-kube-prometheus-stack)[text=бірнеше нұсқасы]} қолжетімді. Бұл аддонды VK Cloud құралдарымен жаңарту қолжетімсіз, бірақ аддонды қолмен жаңартуға болады.

Kube Prometheus Stack аддонын `36.2.0` нұсқасынан `54.2.2` нұсқасына жаңарту үшін аддонның ағымдағы нұсқасын жойып, содан кейін жаңа нұсқасын орнату қажет. Сондықтан жаңарту процесі аддонның ағымдағы нұсқасының ортасын сақтап, кейін оны аддонның жаңа нұсқасымен қайта пайдалану үшін дайындауды қамтиды.

{note:warn}

Төменде аддон тек осы аддонға қатысты Kubernetes ресурстарын ғана қамтитын аттар кеңістігінде (мысалы, `kube-prometheus-stack`) орнатылған деп болжанады.

Егер аттар кеңістігінде басқа Kubernetes ресурстары да болса, командалар мен скриптті аддонға қатысы жоқ ресурстарға әсер етпейтіндей етіп түзетіңіз.

{/note}

## {heading(Дайындық қадамдары)[id=k8s-update-monitoring-addon-prepare]}

1. Егер Cloud Containers сервисінде жаңарту қажет Kube Prometheus Stack аддоны бар бұрыннан бар Kubernetes кластері болса, бұл қадамды өткізіп жіберіңіз.

   Әйтпесе, аддонды жаңарту орындалатын тестілік кластер жасаңыз:

   1. {linkto(../../instructions/create-cluster/create-webui#k8s-create-webui)[text=`1.26.5` нұсқасындағы Kubernetes кластерін жасаңыз]}.

      Кластерді жасау кезінде **Сыртқы IP тағайындау** опциясын таңдаңыз. Кластердің қалған параметрлерін өз қалауыңыз бойынша таңдаңыз.

   1. {linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring)[text=Кластерге]} `36.2.0` нұсқасындағы Kube Prometheus Stack аддонын {linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring)[text=орнатыңыз]}.

      Аддонды **жылдам орнатуды** орындаңыз (аддон баптауының кодын өңдеусіз).

1. `kubectl` көмегімен кластерге қосыла алатыныңызға {linkto(../../connect/kubectl#k8s-kubectl)[text=көз жеткізіңіз]}.

   Қосылу үшін VK Cloud жеке кабинетінен жүктелген кластер конфигурациясы файлын (kubeconfig) пайдаланыңыз.

1. Аддонның қолжетімді және жұмыс істеп тұрғанын тексеріңіз. Ол үшін {linkto(../../monitoring#k8s-monitoring-connect-grafana)[text=Grafana веб-интерфейсіне қол жеткізіңіз]}.

   {note:warn}

   Grafana-ға кіру құпиясөзін, тіпті ол Kubernetes құпиясы түрінде сақталса да, жазып алыңыз. Аддонды жаңарту барысында аддон мен құпия орналасқан аттар кеңістігі барлық мазмұнымен бірге жойылады.

   {/note}

1. Егер утилита әлі орнатылмаған болса, Helm `3.0.0` немесе одан жоғары нұсқасын {linkto(../../install-tools/helm#k8s-helm)[text=орнатыңыз]}.

   Орнату үшін кластермен [үйлесімді](https://helm.sh/docs/topics/version_skew/) Helm нұсқасын таңдаңыз.

1. Кластер үшін kubeconfig-ті көрсететін орта айнымалысын орнатыңыз. Бұл аддонды жаңарту кезінде `kubectl` және `helm` құралдарымен жұмыс істеуді жеңілдетеді.

   kubeconfig файлдарыңызға дейінгі жол төмендегі мысалдан өзгеше болуы мүмкін.

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

## {heading(1. Аддонды жаңарту үшін қажетті ақпаратты алыңыз)[id=k8s-update-monitoring-addon-get-info]}

1. {linkto(../../instructions/addons/manage-addons#k8s-manage-addons)[text=Аддонды баптау кодының өңдеу режиміне өтіңіз]}.

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

1. Аддон пайдаланатын {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=Persistent Volume Claims (PVCs) және тұрақты томдар (persistent volumes, PVs)]} туралы ақпарат алыңыз. Олар жиналатын метрикаларды, сондай-ақ аддонның жұмысына қажет басқа деректерді сақтау үшін қолданылады.

   ```console
   kubectl -n $NAMESPACE get pvc
   ```

   Команда шығысында томдардың өлшемі (`CAPACITY`) көрсетілген PVCs (`NAME`) және оларға сәйкес PVs (`VOLUMES`) тізімі болады. Бұл ақпаратты жазып алыңыз, ол кейін қажет болады.

   {cut(Команданың ішінара шығысының мысалы)}

   ```text
   NAME                                                                             STATUS   VOLUME                                     CAPACITY   ...
   alertmanager-prometheus-alertmanager-db-alertmanager-prometheus-alertmanager-0   Bound    pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX   1Gi        ...
   kube-prometheus-stack-grafana                                                    Bound    pvc-YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY   1Gi        ...
   prometheus-prometheus-prometheus-db-prometheus-prometheus-prometheus-0           Bound    pvc-ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ   10Gi       ... 
   ```

   {/cut}

## {heading(2. Аддон ортасын жаңартуға дайындаңыз)[id=k8s-update-monitoring-addon-prepare-env]}

Егер сақтау класына қатысты өзгерістер аддонды баптау кодына енгізілмесе, әдепкі бойынша аддонға арналған томдар {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=босату саясатын]} `Retain` қолдана отырып жасалады. Сондықтан аддонды жай ғана жойсаңыз, деректері бар тұрақты томдар жойылады. Бұл аддон жұмыс істеген уақыт ішінде жиналған метрикалардың, сондай-ақ аддонның жұмысына қажет басқа деректердің жоғалуына әкеледі.

Бұған қоса, аддон пайдаланатын келесі Kubernetes ресурстары да аддонның жаңа нұсқасын орнатуға кедергі келтіруі мүмкін:

- Аддонның жұмысына қажет Custom Resource Definitions (CRDs) жиынтығы.
- Аддонға тұрақты томдарды пайдалануға мүмкіндік беретін Persistent Volume Claims (PVCs) жиынтығы.

Аддонды жаңартпас бұрын, ол пайдаланатын тұрақты томдарды жойылудан қорғаңыз, сондай-ақ төменде келтірілген тәсілдердің бірімен аталған Kubernetes ресурстарын жойыңыз.

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

   1. Аддон орнатылған аттар кеңістігінде жасалған PVCs-пен байланысқан тұрақты томдарды анықтайды. Осы тұрақты томдар үшін скрипт `Retain` босату саясатын орнатады. Бұл ағымдағы аддон нұсқасы жойылғанда осы томдар жойылмауы үшін қажет.
   1. Аддонның ағымдағы нұсқасының Helm-чартын (chart) жояды. Бұл аддон пайдаланатын PVCs және CRDs жиынтықтарын сәтті жою үшін қажет.
   1. Аддон орнатылған аттар кеңістігінен PVCs жиынтығын жояды. Бұл PVs-ті PVCs-тен ажыратып, кейін осы PVs-ті аддонның жаңа нұсқасымен қайта пайдалану үшін қажет.
   1. Осы PVCs-пен байланысқан тұрақты томдардағы жойылған PVCs-ке сілтемелерді тазартады. Бұл тұрақты томдар байланысу үшін қолжетімді болады (PVs күйі: `Available`) және орнатылғаннан кейін оларды аддонның жаңа нұсқасы қайта пайдаланады.
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
   - `-r`: аддон орнатылған қолданбаның атауы. Аддонға арналған Helm-чарт атауымен сәйкес келеді. Әдепкі мәні: `kube-prometheus-stack`.
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

   Скрипт басқа аттар кеңістігі үшін орындалса, ол жойылмайды.

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

   PVs тізімі {linkto(#k8s-update-monitoring-addon-get-info)[text=бұрын алынған]} PVs тізімімен сәйкес келуі тиіс.

1. Осы PVs-ті `Retain` босату саясатын пайдаланатындай етіп патчтаңыз. Бұл ағымдағы аддон нұсқасын жойғанда осы томдардың жойылмауы үшін қажет.

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

1. Аддонның ағымдағы нұсқасының Helm-чартын (chart) жойыңыз. Бұл аддон пайдаланатын PVCs және CRDs жиынтықтарын сәтті жою үшін қажет.

   ```console
   helm uninstall -n $NAMESPACE $CHART_NAME --wait --timeout 600s
   ```

1. Аддон пайдаланған PVCs тізімін алыңыз:

   ```console
   kubectl -n $NAMESPACE get pvc
   ```

   Қорытынды тізім {linkto(#k8s-update-monitoring-addon-get-info)[text=бұрын алынғаннан]} өзгеше болуы мүмкін: PVCs-тің бір бөлігі Helm-чарт жойылған кезде жойылды.

1. Аддон пайдаланған PVCs-ті жойыңыз. Бұл PVs-ті PVCs-тен ажыратып, кейін осы PVs-ті аддонның жаңа нұсқасымен қайта пайдалану үшін қажет.

   Бұл команда жеке PVC-ді жояды. Оны тізімдегі барлық PVCs үшін орындаңыз.

   ```console
   kubectl -n $NAMESPACE delete pvc <имя PVC>
   ```

1. Аддон пайдаланған PVs-ті жойылған PVCs-тен ажырату үшін патчтаңыз. Бұл тұрақты томдар байланысу үшін қолжетімді болады (PVs күйі: `Available`) және орнатылғаннан кейін оларды аддонның жаңа нұсқасы қайта пайдаланады.

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

## {heading(3. Аддонды жаңа нұсқаға жаңартыңыз)[id=k8s-update-monitoring-addon-update]}

1. {linkto(../../instructions/addons/manage-addons#k8s-manage-addons-delete)[text=VK Cloud интерфейстерін пайдаланып, аддонның ағымдағы нұсқасын жойыңыз]}.
1. {linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring)[text=Кластерге]} `54.2.2` нұсқасындағы Kube Prometheus Stack аддонын {linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring)[text=орнатыңыз]}.

   **Стандартты орнатуды** келесі түрде орындаңыз:

   1. Аддонның алдыңғы нұсқасын орнату кезінде пайдаланылған қолданба мен аттар кеңістігінің сол атауларын беріңіз.

   1. {linkto(#k8s-update-monitoring-addon-get-info)[text=Бұрын алынған]} аддонның алдыңғы нұсқасының баптау кодын зерттеңіз. Аддонның келесі компоненттері үшін сақтау орнын баптауға жауап беретін код фрагменттерін табыңыз:

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

   1. Орнату жоспарланған аддонның жаңа нұсқасының баптау кодын зерттеңіз.

      Егер сақтау орнын баптауға жауап беретін код фрагменттері бұрын алынғандардан өзгеше болса, оларды түзетіңіз. Grafana, Alert Manager және Prometheus үшін сақтау орнының баптаулары аддонның алдыңғы нұсқасында пайдаланылған ұқсас баптаулармен дәл сәйкес келуі тиіс.

   1. (Опционалды түрде) Аддонды баптау кодына басқа өзгерістер енгізіңіз.

      Егер аддонның алдыңғы нұсқасын орнату кезінде `grafana.adminPassword` өрісінде Grafana-ға кіру құпиясөзін көрсеткен болсаңыз, оны қайта көрсету қажет емес. Аддонның жаңа нұсқасы сақтау орны ретінде бұрынғы PVs-ті пайдаланады, сондықтан құпиясөз өзгеріссіз қалады. Бұл өрісті бос қалдырсаңыз да, аддонның жаңа нұсқасын орнату Grafana-ға кіру құпиясөзін өзгертпейді: Grafana үшін құпиясөзі бар secret жасалады, бірақ ол пайдаланылмайды.

      {note:warn}

      Дұрыс берілмеген баптау коды аддонды орнату кезінде қателерге немесе оның жұмысқа жарамсыз болуына әкелуі мүмкін.

      {/note}

   1. Аддонды орнатыңыз.

      Орнату процесі ұзақ уақыт алуы мүмкін. Оның аяқталуын күтіңіз.

1. Аддон пайдаланатын {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=Persistent Volume Claims (PVCs) және тұрақты томдар (persistent volumes, PVs)]} туралы ақпарат алыңыз:

   ```console
   kubectl -n $NAMESPACE get pvc
   ```

   Команда шығысы аддонның алдыңғы нұсқасы үшін {linkto(#k8s-update-monitoring-addon-get-info)[text=бұрын орындалған]} команданың шығысына ұқсас болуы тиіс. Мысалы, `alertmanager...` PVC-і бұрын Alert Manager пайдаланған сол PV-пен байланысқан болуы тиіс. Prometheus пен Grafana үшін де дәл солай.

## {heading(4. Жаңартудан кейін аддонның жұмысқа қабілеттілігін тексеріңіз)[id=k8s-update-monitoring-addon-check]}

{linkto(../../monitoring#k8s-monitoring-connect-grafana)[text=Grafana веб-интерфейсіне қол жеткізіңіз]}. Қосылу үшін аддонның алдыңғы нұсқасымен пайдаланылған сол құпиясөзді қолданыңыз. Егер Grafana құпиясөзін ұмытып қалсаңыз, оны {linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring-reset-password)[text=қалпына келтіріңіз]}.

Grafana-ға сәтті қосылу аддонның сәтті жаңартылғанын көрсетеді.

{ifdef(public)}
## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=k8s-update-monitoring-addon-delete]}

{include(/kz/_includes/_delete-test-cluster.md)}
{/ifdef}
