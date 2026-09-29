# {heading(Kube Prometheus Stack)[id=mk8s-install-advanced-monitoring]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Дайындық қадамдары)[id=mk8s-install-advanced-monitoring-prepare]}

{include(/kz/_includes/_addon-prep.md)}

## {heading(Аддонды орнату)[id=mk8s-install-advanced-monitoring-install]}

Аддон үшін {linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-install-features)[text=орнатудың бірнеше нұсқасы]} қолжетімді.

{tabs}

{tab(Стандартты орнату)}

1. Аддонды орнатыңыз:

   {tabs}

   {tab(Жеке кабинет)}

   1. [Өтіңіз](https://kz.cloud.vk.kz/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Kubernetes кластерлері → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Қажетті кластердің атауын басыңыз.
   1. **Аддондар** қойындысына өтіңіз.
   1. `kube-prometheus-stack` аддонының карточкасындағы **Орнату** батырмасын, содан кейін **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - қосымша атауын;
      - аддон орнатылатын аттар кеңістігінің атауын;
      - {linkto(#mk8s-install-advanced-monitoring-edit-code)[text=аддонды баптау кодын]} (мысалы, Grafana веб-интерфейсі үшін уақытша құпиясөз орнату).

        {note:warn}

        Дұрыс берілмеген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.

        {/note}

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

<!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

   {/tabs}

{include(/kz/_includes/_mk8s_kube_prometheus_stack_optional.md)}

{/tab}

{tab(Бөлінген worker-түйіндерге орнату)}

1. Егер әлі жасалмаса, аддонды орнату үшін бөлінген worker-түйіндер тобын дайындаңыз:

   {tabs}

   {tab(Жеке кабинет)}

   1. [Өтіңіз](https://kz.cloud.vk.kz/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Kubernetes кластерлері → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Тізімнен қажетті кластерді табыңыз.

   1. Кластерде аддондар орналастырылатын бөлінген worker-түйіндер тобы бар екеніне көз жеткізіңіз.

      Егер мұндай топ жоқ болса — {linkto(../../../manage-node-group#mk8s-manage-node-group-add-group)[text=оны қосыңыз]}.

   1. Егер әлі жасалмаса, осы түйіндер тобы үшін {linkto(../../../manage-node-group#mk8s-manage-node-group-labels-taints)[text=мыналарды орнатыңыз]}:

      - **Белгі (label)**: `addonNodes` кілті, `dedicated` мәні.
      - **Шектеу (taint)**: `NoSchedule` әсері, `addonNodes` кілті, `dedicated` мәні.

   {/tab}

   {/tabs}

1. Аддонды орнатыңыз:

   {tabs}

   {tab(Жеке кабинет)}

   1. [Өтіңіз](https://kz.cloud.vk.kz/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Kubernetes кластерлері → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Қажетті кластердің атауын басыңыз.
   1. **Аддондар** қойындысына өтіңіз.
   1. `kube-prometheus-stack` аддонының карточкасындағы **Орнату** батырмасын, содан кейін **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - қосымша атауын;
      - аддон орнатылатын аттар кеңістігінің атауын;
      - {linkto(#mk8s-install-advanced-monitoring-edit-code)[text=аддонды баптау кодын]} (мысалы, Grafana веб-интерфейсі үшін уақытша құпиясөз орнату).

   1. Аддонды баптау кодында қажетті ерекшеліктерді (tolerations) және түйін селекторларын (nodeSelector) орнатыңыз:

      {tabs}

      {tab(Ерекшеліктер)}

      ```yaml
      tolerations:
        - key: "addonNodes"
          operator: "Equal"
          value: "dedicated"
          effect: "NoSchedule"
      ```

      Бұл ерекшелікті келесі өрістер үшін орнатыңыз:

      - `grafana.tolerations`;
      - `alertmanager.alertmanagerSpec.tolerations`;
      - `prometheusOperator.tolerations`;
      - `prometheusOperator.admissionWebhooks.patch.tolerations`;
      - `prometheus.prometheusSpec.tolerations`;
      - `kube-state-metrics.tolerations`.

      {/tab}

      {tab(Түйін селекторлары)}

      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Бұл селекторды келесі өрістер үшін орнатыңыз:

      - `grafana.nodeSelector`;
      - `alertmanager.alertmanagerSpec.nodeSelector`;
      - `prometheusOperator.nodeSelector`;
      - `prometheusOperator.admissionWebhooks.patch.nodeSelector`;
      - `prometheus.prometheusSpec.nodeSelector`;
      - `kube-state-metrics.nodeSelector`.

      {/tab}

      {/tabs}

      {note:warn}

      Дұрыс берілмеген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.

      {/note}

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

<!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

   {/tabs}

{include(/kz/_includes/_mk8s_kube_prometheus_stack_optional.md)}

{/tab}

{tab(Жылдам орнату)}

{note:info}

Жылдам орнату кезінде аддонды баптау коды өңделмейді. Grafana веб-интерфейсіне кіруге арналған тұрақты құпиясөзді қамтитын Kubernetes секреті жасалады.

Егер бұл сізге сәйкес келмесе, **стандартты орнатуды** немесе **бөлінген worker-түйіндерге орнатуды** орындаңыз.

{/note}

1. Аддонды орнатыңыз:

   {tabs}

   {tab(Жеке кабинет)}

   1. [Өтіңіз](https://kz.cloud.vk.kz/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Kubernetes кластерлері → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Қажетті кластердің атауын басыңыз.
   1. **Аддондар** қойындысына өтіңіз.
   1. `kube-prometheus-stack` аддонының карточкасындағы **Орнату** батырмасын, содан кейін **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - қосымша атауын;
      - аддон орнатылатын аттар кеңістігінің атауын;

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

<!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

   {/tabs}

{include(/kz/_includes/_mk8s_kube_prometheus_stack_optional.md)}

{/tab}

{/tabs}

## {heading(Орнату кезінде аддонды баптау кодын өңдеу)[id=mk8s-install-advanced-monitoring-edit-code]}

Аддон кодын өңдеу стандартты орнату және бөлінген worker-түйіндерге орнату үшін қолданылады. Өрістер сипаттамасымен бірге аддонды баптау кодының толық нұсқасы [GitHub](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml) сайтында қолжетімді.

### {heading(Grafana веб-интерфейсі үшін уақытша құпиясөз орнату)[id=mk8s-install-advanced-monitoring-temp-password]}

Әдепкі параметрлермен аддонды орнату кезінде Grafana веб-интерфейсіне кіруге арналған тұрақты құпиясөзді қамтитын Kubernetes секреті жасалады.

Сондай-ақ, аддонды орнату кезінде пайдаланушының уақытша құпиясөзін көрсетуге болады. Бұл жағдайда Grafana веб-интерфейсіне алғашқы кіру осы құпиясөзбен орындалады, содан кейін оны өзгерту ұсынылады. Ол үшін аддонды баптау кодындағы өріс мәнін өзгертіңіз:

```yaml
grafana:
  adminPassword: "<ВРЕМЕННЫЙ_ПАРОЛЬ>"
```

Бұл өрістің мәні тек аддонды орнату кезінде әрекет етеді. Егер оны орнатылған аддонда өзгертсеңіз, Kubernetes секреті жаңартылады, бірақ Grafana-ға кіруге арналған құпиясөз өзгермейді: `admin` пайдаланушысы PVC-дегі Grafana дерекқорында сақталады және жаңарту кезінде қайта жазылмайды. Бұл жағдайда секреттегі құпиясөз кіру үшін жарамсыз болуы мүмкін.

Орнатылған аддонда құпиясөзді ауыстыру үшін қалпына келтіру пәрменімен жаңа құпиясөзді {linkto(#mk8s-install-advanced-monitoring-reset-password)[text=орнатыңыз]} немесе Grafana PVC-ін жойып, аддонды {linkto(#mk8s-install-advanced-monitoring-reinstall)[text=қайта орнатыңыз]}.

Кодты өңдегеннен кейін {linkto(#mk8s-install-advanced-monitoring-install)[text=аддонды орнатуды жалғастырыңыз]}.

## {heading(Аддонмен қосымша әрекеттер)[id=mk8s-install-advanced-monitoring-additional]}

### {heading(Prometheus дискісінің өлшемін өзгерту)[id=mk8s-install-advanced-monitoring-disk-change]}

Prometheus дискісінде кластер мониторингі деректері сақталады. Егер олар үшін орын жеткіліксіз болса немесе Prometheus дискісінің өнімділігін арттырғыңыз келсе, диск өлшемін үлкейтіңіз.

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.kz/app/) VK Cloud жеке кабинетіне.
1. Қажетті кластер орналасқан жобаны таңдаңыз.
1. **Kubernetes кластерлері → Kubernetes кластерлері** бөліміне өтіңіз.
1. Қажетті кластердің атауын басыңыз.
1. **Аддондар** қойындысына өтіңіз.
1. `kube-prometheus-stack` аддоны үшін ![](../../../../../../assets/more-icon.svg "inline") батырмасын басып, **Prometheus дискісінің өлшемін өзгерту** тармағын таңдаңыз.
1. Қажетті диск өлшемін көрсетіңіз. Операция тек үлкейту бағытымен жұмыс істейді.
1. **Растау** батырмасын басыңыз.

{/tab}

{/tabs}

### {heading(Grafana үшін құпиясөзді Kubernetes секретінен алу)[id=mk8s-install-advanced-monitoring-get-password]}

Егер аддон уақытша құпиясөз көрсетілмей орнатылған болса, Grafana веб-интерфейсіне кіруге арналған құпиясөз мәнін Kubernetes секретінен алуға болады. Егер аддонды орнатқаннан кейін `grafana.adminPassword` мәні өзгертілсе, секреттегі құпиясөз Grafana-ға кіруге арналған құпиясөзге сәйкес келмеуі мүмкін.

{tabs}

<!--  удалена таба Kubernetes Dashboard. для Headlamp: забрать шаги и k8s с заменой на Headlamp или удалить -->

{tab(kubectl)}

1. `kubectl` көмегімен кластерге қосыла алатыныңызға {linkto(../../../../connect/kubectl#mk8s-kubectl-check-connection)[text=көз жеткізіңіз]}.

1. Grafana секретінің атауын табыңыз:

   ```console
   kubectl -n <ПРОСТРАНСТВО_ИМЕН> get secret -l app.kubernetes.io/name=grafana
   ```

   Мұнда `<ПРОСТРАНСТВО_ИМЕН>` — аддон орнатылған аттар кеңістігі. Әдепкі бойынша — `prometheus-monitoring`.

   Пәрмен шығысында Grafana секретінің атауы болады. Ол қолданбаның атауы негізінде жасалады, мысалы `myapp-grafana`. Егер қолданбаның атауы аддонды жеке кабинет арқылы орнату кезінде автоматты түрде жасалған болса, атау `addon-a0b1c2d3f4-grafana` түрінде болады.

1. Осы атауды көрсетіп, Kubernetes секретінен Grafana-ға кіруге арналған құпиясөзді алыңыз:

   {tabs}

   {tab(Windows (PowerShell))}

   ```console
   $ENCODED = kubectl -n <ПРОСТРАНСТВО_ИМЕН> get secret <ИМЯ_СЕКРЕТА_GRAFANA> -o jsonpath='{.data.admin-password}'; `
   [System.Text.Encoding]::Utf8.GetString([System.Convert]::FromBase64String($ENCODED)) | Write-Output
   ```

   {/tab}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   kubectl -n <ПРОСТРАНСТВО_ИМЕН> get secret <ИМЯ_СЕКРЕТА_GRAFANA> -o jsonpath='{.data.admin-password}' | base64 --decode
   ```

   {/tab}

   {/tabs}

   Мұнда:

   - `<ПРОСТРАНСТВО_ИМЕН>` — аддон орнатылған аттар кеңістігі.
   - `<ИМЯ_СЕКРЕТА_GRAFANA>` — алдыңғы пәрмен шығысындағы секрет атауы.

{/tab}

{/tabs}

### {heading(Grafana үшін құпиясөзді қалпына келтіру)[id=mk8s-install-advanced-monitoring-reset-password]}

Егер Grafana веб-интерфейсіне кіруге арналған құпиясөз жоғалса немесе жарамаса (мысалы, Kubernetes секретіндегі құпиясөз нақты құпиясөзге сәйкес келмесе), жаңа құпиясөз орната аласыз.

1. Grafana подының атауын алыңыз:

   ```console
   kubectl -n <ПРОСТРАНСТВО_ИМЕН> get pod -l app.kubernetes.io/name=grafana
   ```

   Мұнда `<ПРОСТРАНСТВО_ИМЕН>` — аддон орнатылған аттар кеңістігі. Әдепкі бойынша — `prometheus-monitoring`.

1. Grafana подының ішінде пәрменді орындап, құпиясөзді қалпына келтіріңіз:

   ```console
   kubectl -n <ПРОСТРАНСТВО_ИМЕН> exec <ИМЯ_ПОДА_GRAFANA> -- sh -c "grafana cli --debug admin reset-admin-password <НОВЫЙ_ПАРОЛЬ>"
   ```

   Мұнда:

   - `<ПРОСТРАНСТВО_ИМЕН>` — аддон орнатылған аттар кеңістігі.
   - `<ИМЯ_ПОДА_GRAFANA>` — алдыңғы пәрмен шығысындағы под атауы.
   - `<НОВЫЙ_ПАРОЛЬ>` — Grafana-ға кіруге арналған жаңа құпиясөз.

   Егер құпиясөз сәтті қалпына келтірілсе, пәрмен шығысында `Admin password changed successfully ✔` хабарламасы болады.

### {heading(Аддонды Grafana PVC-ін жойып қайта орнату)[id=mk8s-install-advanced-monitoring-reinstall]}

Бұл тәсіл аддонды баптау кодындағы `grafana.adminPassword` өрісі арқылы Grafana құпиясөзін орнатуға мүмкіндік береді.

{note:warn}
Grafana PVC-мен бірге Grafana дерекқорында сақталған деректер жойылады: пайдаланушы дашбордтары, деректер көздері және веб-интерфейс арқылы енгізілген басқа баптаулар.
{/note}

1. `kube-prometheus-stack` аддонын {linkto(../../manage-addons#mk8s-manage-addons-delete)[text=жойыңыз]}.
1. Grafana PVC-і қалғанын тексеріңіз:

   ```console
   kubectl -n <ПРОСТРАНСТВО_ИМЕН> get pvc -l app.kubernetes.io/name=grafana
   ```

   Мұнда `<ПРОСТРАНСТВО_ИМЕН>` — аддон орнатылған аттар кеңістігі. Әдепкі бойынша — `prometheus-monitoring`.

1. Егер PVC қалса, оны жойыңыз:

   ```console
   kubectl -n <ПРОСТРАНСТВО_ИМЕН> delete pvc <ИМЯ_PVC_GRAFANA>
   ```

   Мұнда:

   - `<ПРОСТРАНСТВО_ИМЕН>` — аддон орнатылған аттар кеңістігі.
   - `<ИМЯ_PVC_GRAFANA>` — алдыңғы пәрмен шығысындағы PVC атауы.

1. Аддонды қайтадан орнатып, баптау кодында қажетті құпиясөзді {linkto(#mk8s-install-advanced-monitoring-temp-password)[text=көрсетіңіз]}.
