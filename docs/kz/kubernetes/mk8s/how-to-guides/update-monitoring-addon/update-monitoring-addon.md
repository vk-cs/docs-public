# {heading(Kube Prometheus Stack аддонын жаңарту)[id=mk8s-update-monitoring-addon]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Managed Containers сервисінде жасайтын Kubernetes кластерлерінде {linkto(../../concepts/versions/components#mk8s-components)[text=Kube Prometheus Stack]} аддонының {linkto(../../concepts/addons-and-settings/addons#mk8s-addons-kube-prometheus-stack)[text=бірнеше нұсқасы]} қолжетімді. Бұл аддонды VK Cloud құралдарымен жаңарту қолжетімсіз, бірақ аддонды қолмен жаңартуға болады.

Kube Prometheus Stack аддонын `36.2.0` нұсқасынан `54.2.2` нұсқасына жаңарту үшін аддонның ағымдағы нұсқасын жойып, содан кейін жаңа нұсқасын орнату қажет. Сондықтан жаңарту процесі аддонның ағымдағы нұсқасының ортасын сақтап, кейін оны аддонның жаңа нұсқасымен қайта пайдалану үшін дайындауды қамтиды.

{note:warn}

Төменде аддон тек осы аддонға қатысты Kubernetes ресурстарын ғана қамтитын аттар кеңістігінде (мысалы, `kube-prometheus-stack`) орнатылған деп болжанады.

Егер аттар кеңістігінде басқа Kubernetes ресурстары да болса, командалар мен скриптті аддонға қатысы жоқ ресурстарға әсер етпейтіндей етіп түзетіңіз.

{/note}

## {heading(Дайындық қадамдары)[id=mk8s-update-monitoring-addon-prepare]}

1. Егер Managed Containers сервисінде жаңарту қажет Kube Prometheus Stack аддоны бар бұрыннан бар Kubernetes кластері болса, бұл қадамды өткізіп жіберіңіз.

   Әйтпесе, аддонды жаңарту орындалатын тестілік кластер жасаңыз:

   1. {linkto(../../instructions/create-cluster/create-webui-gen-2#mk8s-create-webui-gen-2)[text=`1.26.5` нұсқасындағы Kubernetes кластерін жасаңыз]}.

      Кластерді жасау кезінде **Сыртқы IP тағайындау** опциясын таңдаңыз. Кластердің қалған параметрлерін өз қалауыңыз бойынша таңдаңыз.

   1. {linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#mk8s-install-advanced-monitoring)[text=Кластерге]} `36.2.0` нұсқасындағы Kube Prometheus Stack аддонын {linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#mk8s-install-advanced-monitoring)[text=орнатыңыз]}.

      Аддонды **жылдам орнатуды** орындаңыз (аддон баптауының кодын өңдеусіз).

1. `kubectl` көмегімен кластерге қосыла алатыныңызға {linkto(../../connect/kubectl#mk8s-kubectl)[text=көз жеткізіңіз]}.

   Қосылу үшін VK Cloud жеке кабинетінен жүктелген кластер конфигурациясы файлын (kubeconfig) пайдаланыңыз.

1. Аддонның қолжетімді және жұмыс істеп тұрғанын тексеріңіз. Ол үшін {linkto(../../monitoring#mk8s-monitoring-connect-grafana)[text=Grafana веб-интерфейсіне қол жеткізіңіз]}.

   {note:warn}

   Grafana-ға кіру құпиясөзін, тіпті ол Kubernetes құпиясы түрінде сақталса да, жазып алыңыз. Аддонды жаңарту барысында аддон мен құпия орналасқан аттар кеңістігі барлық мазмұнымен бірге жойылады.

   {/note}

1. Егер утилита әлі орнатылмаған болса, Helm `3.0.0` немесе одан жоғары нұсқасын {linkto(../../install-tools/helm#mk8s-helm)[text=орнатыңыз]}.

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

## {heading(1. Аддонды жаңарту үшін қажетті ақпаратты алыңыз)[id=mk8s-update-monitoring-addon-get-info]}

1. {linkto(../../instructions/addons/manage-addons#mk8s-manage-addons)[text=Аддон баптау кодын өңдеу режиміне өтіңіз]}.

   Аддонның баптау кодын өзгертпеңіз.

   Келесі мәліметтерді жазыңыз:

   - Қолданба атауы. Оны білу үшін команданы орындап, `NAME` бағанындағы атауын табыңыз:

     ```console
     helm list -n <НЕСІМ_КЕҢІСТІГІ>
     ```

     Егер аддон жеке кабинет арқылы орнатылған болса және қолданба атауы өзгертілмеген болса, ол `addon-<ХЕШ>` түрінде болады.
   - Несім кеңістігінің атауы (әдепкі бойынша `prometheus-monitoring`).
   - Аддонның толық баптау коды.

1. Осы қолданба мен несім кеңістігінің атауларын көрсететін орта айнымалыларын қойыңыз. Бұл аддонды жаңарту кезіндегі кейінгі жұмысты жеңілдетеді.

   Сіздің айнымалыларыңыздың мәндері төмендегі мысалдан ерекшеленуі мүмкін.

   {tabs}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   export CHART_NAME="<ҚОЛДАНБА_АТАУЫ>"
   export NAMESPACE="prometheus-monitoring"

   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   $CHART_NAME="<ҚОЛДАНБА_АТАУЫ>"
   $NAMESPACE="prometheus-monitoring"
   ```

   {/tab}

   {/tabs}

1. Аддон пайдаланатын {linkto(../../reference/pvs-and-pvcs#mk8s-pvs-and-pvcs)[text=Persistent Volume Claims (PVCs) және тұрақты томдар (persistent volumes, PVs)]} туралы ақпаратты алыңыз. Олар жиналатын метрикаларды, сондай-ақ аддонның жұмысы үшін қажетті басқа деректерді сақтау үшін пайдаланылады.

   ```console
   kubectl -n $NAMESPACE get pvc
   ```

   Команда нәтижесінде PVCs (`NAME`) тізімі және оларға сәйкес PVs (`VOLUMES`) томдардың өлшемі (`CAPACITY`) көрсетіле отырып болады. Бұл ақпаратты жазыңыз, ол кейін қажет болады. Grafana үшін PVC атауы қолданба атауынан басталады (төмендегі мысалда — `kube-prometheus-stack`).

   {cut(Команда нәтижесінің ішінара мысалы)}

   ```text
   NAME                                                                             STATUS   VOLUME                                     CAPACITY   ...
   alertmanager-prometheus-alertmanager-db-alertmanager-prometheus-alertmanager-0   Bound    pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX   1Gi        ...
   kube-prometheus-stack-grafana                                                    Bound    pvc-YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY   1Gi        ...
   prometheus-prometheus-prometheus-db-prometheus-prometheus-prometheus-0           Bound    pvc-ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ   10Gi       ... 
   ```

   {/cut}

## {heading(2. Аддон ортасын жаңартуға дайындаңыз)[id=mk8s-update-monitoring-addon-prepare-env]}

Егер сақтау класына қатысты өзгерістер аддонды баптау кодына енгізілмесе, әдепкі бойынша аддонға арналған томдар {linkto(../../reference/pvs-and-pvcs#mk8s-pvs-and-pvcs)[text=босату саясатын]} `Retain` қолдана отырып жасалады. Сондықтан аддонды жай ғана жойсаңыз, деректері бар тұрақты томдар жойылады. Бұл аддон жұмыс істеген уақыт ішінде жиналған метрикалардың, сондай-ақ аддонның жұмысына қажет басқа деректердің жоғалуына әкеледі.

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

```yaml
      alertmanager:

        ...

        alertmanagerSpec:

        ...

          storage:
            volumeClaimTemplate:
              spec:
                storageClassName: "csi-ceph-ssd-gz1"
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

   1. Жаңа нұсқасын орнату жоспарланып отырған аддонның баптау кодын зерттеңіз.

      Сақтау орнын баптауға жауап беретін код фрагменттері алдыңғыда алынғаннан ерекшеленсе, оларды түзетіңіз. Grafana, Alert Manager және Prometheus үшін сақтау орнының баптаулары аддонның алдыңғы нұсқасы үшін қолданылған ұқсас баптаулармен толық сәйкес болуы тиіс.

   1. (Қалауыңыз бойынша) Аддонның баптау кодына өзге өзгерістер енгізіңіз.

      Егер аддонның алдыңғы нұсқасын орнату кезінде Grafana-ға кіру құпиясөзін `grafana.adminPassword` өрісінде көрсеткен болсаңыз, оны қайта көрсетудің қажеті жоқ. Аддонның жаңа нұсқасы сақтау орны ретінде бұрынғы PVs-терді пайдаланады, сондықтан құпиясөз бұрынғыша қалады. Аддонның жаңа нұсқасын орнату бұл өрісті бос қалдырсаңыз да Grafana-ға кіру құпиясөзін өзгертпейді: Grafana үшін құпиясөзі бар секрет жасалады, бірақ ол қолданылмайды.

      {note:warn}
      Дұрыс берілмеген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.
      {/note}

   1. Аддонды орнатыңыз.

      Орнату процесі ұзақ уақыт алуы мүмкін. Оның аяқталуын күтіңіз.

1. Аддон қолданатын {linkto(../../reference/pvs-and-pvcs#mk8s-pvs-and-pvcs)[text=Persistent Volume Claims (PVCs) және тұрақты томдар (persistent volumes, PVs)]} туралы ақпарат алыңыз:

   ```console
   kubectl -n $NAMESPACE get pvc
   ```

   Команданың шығысы аддонның алдыңғы нұсқасы үшін {linkto(#mk8s-update-monitoring-addon-get-info)[text=бұрын орындалған]} команданың шығысына ұқсас болуы тиіс. Атап айтқанда, `alertmanager...` PVC-сі Alert Manager бұрын қолданған сол PV-мен байланысқан болуы тиіс. Prometheus және Grafana үшін де — дәл сол сияқты.

   ## {heading(4. Жаңартудан кейін аддонның жұмысқа қабілеттілігін тексеріңіз)[id=mk8s-update-monitoring-addon-check]}

{linkto(../../monitoring#mk8s-monitoring-connect-grafana)[text=Grafana веб-интерфейсіне қол жеткізіңіз]}. Қосылу үшін аддонның алдыңғы нұсқасымен пайдаланылған сол құпиясөзді қолданыңыз. Егер Grafana құпиясөзін ұмытып қалсаңыз, оны {linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#mk8s-install-advanced-monitoring-reset-password)[text=қалпына келтіріңіз]}.

Grafana-ға сәтті қосылу аддонның сәтті жаңартылғанын көрсетеді.

   ## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=mk8s-update-monitoring-addon-delete]}

{include(/kz/_includes/_delete-test-cluster.md)}