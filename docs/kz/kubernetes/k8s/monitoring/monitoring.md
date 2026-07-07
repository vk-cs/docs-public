# {heading(Кластер мониторингі)[id=k8s-monitoring]}

{include(/kz/_includes/_translated_by_ai.md)}

Kubernetes кластерінің күйін бақылау үшін келесі құралдар қолжетімді:

- Kubernetes Dashboard ішіне ендірілген құралдар.

  Олар Kubernetes ресурстары туралы ақпаратты көруге мүмкіндік беретін базалық мониторинг мүмкіндіктерін қамтамасыз етеді.

- {linkto(../concepts/addons-and-settings/addons#k8s-addons-kube-prometheus-stack)[text=Мониторинг аддоны]}.

  Аддон кластер мониторингінің мүмкіндіктерін кеңейтеді:

  - Kubernetes-тің көптеген ресурстары, жеке подтарға дейін, бойынша метрикаларды көруге мүмкіндік береді.
  - Метрикалар үшін берілген шектер асқан кезде хабарламалар жіберетін alert-терді қолдайды. Мысалы, кластер ресурстарының қолжетімсіздігін немесе worker-түйіндерде есептеу қуатының жетіспеуін бақылауға болады.
  - Кластер ресурстарының тұтынылуын {linkto(#k8s-monitoring-forecast-consumption)[text=болжауға]}, болжау графиктерін қарауға және ресурстардың жақын арада таусылуы туралы хабарламаларды алдын ала алуға мүмкіндік береді. Болжау тек VK Tech тарапынан доработкалары бар {linkto(../concepts/versions/components#k8s-components-addons)[text=аддон нұсқаларында]} қолжетімді (нұсқа нөмірінде `vk` бар).

  Мониторинг аддоны кластерде орнатылған-орнатылмағанын білу үшін, {linkto(../instructions/addons/manage-addons#k8s-manage-addons-view)[text=орнатылған аддондар тізімін қараңыз]}.

## {heading(Kubernetes Dashboard пайдалану)[id=k8s-monitoring-kubernetes-dashboard]}

1. {linkto(../connect/k8s-dashboard#k8s-k8s-dashboard)[text=Kubernetes Dashboard көмегімен кластерге қосылыңыз]}.
1. Кластер ресурстары туралы деректерді алыңыз:

   1. Kubernetes Dashboard интерфейсінің жоғарғы жағындағы ашылмалы тізімнен қажетті namespace-ті таңдаңыз. Әдепкі бойынша `default` namespace-і таңдалған.
   1. Бүйірлік мәзірден қажетті Kubernetes ресурсын таңдаңыз.

## {heading(Кластер метрикаларын көру үшін Grafana-ға қосылу)[id=k8s-monitoring-connect-grafana]}

1. Кластерде мониторинг аддоны (`kube-prometheus-stack`) {linkto(../instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring)[text=орнатылғанына]} {linkto(../instructions/addons/manage-addons#k8s-manage-addons-view)[text=көз жеткізіңіз]}.

1. {linkto(../connect/kubectl#k8s-kubectl-check-connection)[text=Көз жеткізіңіз]}, кластерге `kubectl` көмегімен қосыла алатыныңызға.

1. Grafana веб-интерфейсіне қол жеткізіңіз:

   1. Терминалдың бөлек сессиясында команданы орындаңыз:

      ```console
      kubectl -n prometheus-monitoring port-forward service/kube-prometheus-stack-grafana 8001:80
      ```

      {note:warn}

      Бұл сессияны жаппаңыз, әйтпесе Grafana веб-интерфейсіне қолжеткізу жоғалады.

      {/note}

   1. Команда шығысы бойынша Grafana-ға қол жеткізу үшін `kubectl` ашқан портты анықтаңыз.

      Порт нөмірі `→` таңбасына дейін көрсетіледі. Мысалы, осы шығыстан қосылу үшін `6637` порты пайдаланылатыны көрінеді:

      ```text
      Forwarding from 127.0.0.1:6637 -> 3000
      Forwarding from [::1]:6637 -> 3000
      ```

   1. Браузерде Grafana веб-интерфейсіне қол жеткізу URL-ын ашыңыз:

      ```http
      http://localhost:<ПОРТ>/
      ```

      Grafana кіру беті ашылады.

1. Grafana-ға кіріңіз. Аддон қандай параметрлермен {linkto(../instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring)[text=орнатылғанына]} байланысты мыналардың бірін пайдаланыңыз:

   - `admin` логині мен уақытша құпиясөз. Құпиясөзді алғашқы кіруден кейін ауыстыру қажет болады.
   - `admin` логині мен Kubernetes құпиясынан алынған тұрақты құпиясөз.

Енді сіз Grafana-мен жұмыс істей аласыз. Мысалы, дашбордтар жасап, оларды қарай аласыз. Kubernetes-тің әртүрлі ресурстары туралы ақпараты бар алдын ала бапталған дашбордтар бүйірлік мәзірдегі **Dashboards → Browse** бөлімінде қолжетімді.

Grafana-мен жұмыс туралы толығырақ [ресми құжаттамадан](https://grafana.com/docs/grafana/latest/) қараңыз.

## {heading(Кластер ресурстарының тұтынылуын болжау)[id=k8s-monitoring-forecast-consumption]}

VK Tech доработкалары бар `kube-prometheus-stack` мониторинг аддонына кластердің белгілі бір ресурстары берілген уақыттан кейін таусылады деп болжанған жағдайда хабарламалар жіберуге арналған alert-тер ендірілген. Сондай-ақ бұл аддон Grafana-да ресурстар тұтынылуының ағымдағы болжамдары көрсетілетін дашбордтарды ұсынады.

Аддон болжамдарды [сызықтық регрессия әдісімен](https://prometheus.io/docs/prometheus/latest/querying/functions/#predict_linear) жасайды: берілген кезең шегінде белгілі бір аралықпен жиналған метрика мәндері бойынша сызықтық функция құрылады; болжам осы функцияның болашақтағы берілген уақыттан кейінгі мәні ретінде есептеледі. Алынған мән Kubernetes объектісіндегі ресурс сыйымдылығының ең жоғарғы мәнінен пайызбен өрнектеледі.

{note:warn}
master-түйіндері объектілері үшін болжау орындалмайды.
{/note}

1. Кластерде VK Tech доработкалары бар (нұсқа нөмірінде `vk` жұрнағы бар) `kube-prometheus-stack` мониторинг аддонының нұсқасы {linkto(../instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring)[text=орнатылғанына]} {linkto(../instructions/addons/manage-addons#k8s-manage-addons-view)[text=көз жеткізіңіз]}.
1. `kube-prometheus-stack` аддоны кодының өңдеу бетіне {linkto(../instructions/addons/manage-addons#k8s-manage-addons-edit-code)[text=өтіңіз]} және кодтағы `grafana.alerts.enabled` параметрі `true` мәніне тең екеніне көз жеткізіңіз. Бұл мән параметрге аддонды орнату кезінде беріледі.
1. Егер бұл параметр `false` болып өзгертілсе, оны `true` етіп түзетіп, жаңартылған баптауларды сақтаңыз.

   {note:warn}
   `grafana.alerts.enabled` параметрі өшірілген болса немесе әдепкі баптаулармен үйлеспейтін басқа өзгерістер енгізілсе, ресурстардың таусылуы туралы хабарламалар жіберілуіне кепілдік берілмейді.
   {/note}

1. {linkto(#k8s-monitoring-connect-grafana)[text=Grafana-ға кіріңіз]}.
1. Бүйірлік мәзірден **Dashboards** бөліміне өтіңіз.
1. **VK Cloud** бөліміндегі дашбордтар тізімінен **K8s Resources Prediction** дашбордын ашыңыз.
1. Ресурстар тұтынылуының қолжетімді болжамдарын қараңыз:

   - **CPU Leaders**: worker-түйіндерінің CPU тұтыну болжамы.
   - **Memory Leaders**: worker-түйіндерінің RAM тұтыну болжамы.
   - **Persistent Volume Leaders**: тұрақты томдағы ({linkto(../reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=PV]}) орын тұтыну болжамы.
   - **Inode Leaders**: тұрақты томдағы индекс дескрипторларының (inode) тұтынылу болжамы.

1. (Опционалды) Grafana басқару элементтері арқылы болжамдардың өзіңізге ыңғайлы көрсетілуін баптаңыз.
1. (Опционалды) Болжамдар есептелетін параметрлерді өзгертіңіз:

   - **Analysis period**: болжам функциясын құру үшін пайдаланылатын, ағымдағы сәтке дейінгі уақыт аралығы.
   - **Forecast horizon**: болжам есептелетін болашақ сәт пен ағымдағы сәт арасындағы аралық.

1. Бүйірлік мәзірден **Alerting** → **Alert rules** бөліміне өтіңіз.
1. **Grafana** блогында **VK Cloud > K8s Resources Prediction** бумасын ашып, ресурстардың таусылуына арналған ендірілген alert-терді қараңыз:

   - **K8sNodeCpuPrediction**: worker-түйінінде бос CPU жоқ.
   - **K8sNodeMemoryPrediction**: worker-түйінінде бос RAM жады жоқ.
   - **K8sPersistentVolumeCapacityPrediction**: тұрақты томда бос орын жоқ.
   - **K8sPersistentVolumeInodePrediction**: тұрақты томда бос индекс дескрипторлары жоқ.

   Бұл alert-тердің келесі параметрлері бар:

   - Деректерді талдау тереңдігі: `1 апта`.
   - Метрикадан деректер таңдалатын аралық: `10 минут`.
   - Болжам тереңдігі: `1 күн`.
   - Alert іске қосылу шегі: `100%`.

   Ендірілген alert-тердің параметрлерін өзгертуге болмайды, бірақ ендірілген alert негізінде өз alert-іңізді жасауға болады.

1. (Опционалды) Ендірілген alert негізінде өз alert-іңізді жасаңыз:

   1. Alert-тер тізімінде қажетті ендірілген alert үшін, мысалы `K8sNodeCpuPrediction`, көшіру батырмасын басыңыз.
   1. Ескертуді оқып, **Copy** батырмасын басыңыз.

      **Add rule** беті ашылады. **2 Define query and alert condition** бөлімінде **A** белгісінің астында сұрау жолы көрсетіледі. `K8sNodeCpuPrediction` alert-і үшін ол мынадай болады:

      ```txt

      predict_linear(avg(instance:node_cpu_utilisation:rate5m * 100  * on(instance) group_left(nodename) node_uname_info{nodename!~".*master.*"}) by (nodename) [1w:10m],86400)

      ```

      Бұл сұрауда келесі мәндер бар:

      - `100` — пайызбен берілген alert іске қосылу шегі;
      - `1w` — деректерді талдау тереңдігі;
      - `10m` — деректерді таңдау аралығы;
      - `86400` — секундпен берілген болжам тереңдігі.

   1. Мәндерді қажеттілеріне өзгертіңіз. Болжам тереңдігі тек секундпен беріледі, ал талдау тереңдігі мен таңдау аралығы үшін [басқа өлшем бірліктері](https://prometheus.io/docs/prometheus/latest/querying/basics/#float-literals-and-time-durations) де қолжетімді.
   1. Alert-тің басқа параметрлерін [Grafana ресми құжаттамасында](https://grafana.com/docs/grafana/latest/alerting/alerting-rules/) сипатталғандай баптаңыз.
   1. Өзгерістерді сақтаңыз.

1. Ендірілген және өз alert-теріңіздің іске қосылуы туралы хабарламаларды жеткізуді [баптаңыз](https://grafana.com/docs/grafana/latest/alerting/configure-notifications).

Болжауды баптау аяқталды.

Енді сіз:

- ресурстардың таусылуы туралы хабарламалар ала аласыз;
- хабарлама алған кезде ықтимал мәселелерді алдын ала шешу үшін басқа объектілер бойынша да болжамдарды қарай аласыз;
- ағымдағы болжамдарды қарап, оларды Grafana-ның стандартты дашбордтарында көрсетілген тұтыну динамикасымен салыстыра аласыз;
- салыстыру нәтижелері бойынша болжау параметрлерін нақтылап, өз alert-теріңізді жасай аласыз.
