
## {heading(Аддонды орнату)[id=mk8s-install-advanced-monitoring-install]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-kube-prometheus-stack)[text=Kube Prometheus Stack]} аддонына {linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-install-features)[text=бірнеше орнату нұсқасы]}` қолжетімді.

{tabs}

{tab(Стандартты орнату)}

1. Аддонды орнатыңыз:

   {tabs}

   {tab(Жеке кабинет)}

   1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app/).
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Кластеры Kubernetes → Кластеры Kubernetes** бөліміне өтіңіз.
   1. Қажетті кластердің атауын басыңыз.
   1. **Аддоны** қойындысына өтіңіз.
   1. `kube-prometheus-stack` аддонының карточкасындағы **Установить** түймесін басып, **Установить аддон** түймесін басыңыз.
   1. (Қалауыңыз бойынша) Өңдеңіз:

      - қолданбаның атауын;
      - аддон орнатылатын namespace атауын;
      - {linkto(#mk8s-install-advanced-monitoring-edit-code)[text=аддонды баптау кодын]} (мысалы, Grafana веб-интерфейсінің уақытша паролін орнату үшін).

        {note:warn}
        Дұрыс берілмеген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.
        {/note}

   1. **Установить аддон** түймесін басыңыз.

      Аддонның кластерге орнатылуы басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

   {/tabs}

{include(/kz/_includes/_mk8s_kube_prometheus_stack_optional.md)}

{/tab}

{tab(Бөлінген worker-түйіндерге орнату)}

1. Аддонды орнату үшін бөлінген worker-түйіндер тобын дайындаңыз, егер бұл әлі жасалмаған болса:

   {tabs}

   {tab(Жеке кабинет)}

   1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app/).
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Кластеры Kubernetes → Кластеры Kubernetes** бөліміне өтіңіз.
   1. Тізімнен қажетті кластерді тауып алыңыз.

   1. Кластерде аддондар орналастырылатын бөлінген worker-түйіндер тобы бар екеніне көз жеткізіңіз.

      Мұндай топ болмаса — {linkto(../../../manage-node-group#mk8s-manage-node-group-add-group)[text=оны қосыңыз]}.

   1. Егер бұл әлі жасалмаған болса, осы түйіндер тобына {linkto(../../../manage-node-group#mk8s-manage-node-group-labels-taints)[text=беріңіз]}:

      - **Метку (label)**: кілті `addonNodes`, мәні `dedicated`.
      - **Ограничение (taint)**: эффекті `NoSchedule`, кілті `addonNodes`, мәні `dedicated`.

   {/tab}

   {/tabs}

1. Аддонды орнатыңыз:

   {tabs}

   {tab(Жеке кабинет)}

   1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app/).
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Кластеры Kubernetes → Кластеры Kubernetes** бөліміне өтіңіз.
   1. Қажетті кластердің атауын басыңыз.
   1. **Аддоны** қойындысына өтіңіз.
   1. `kube-prometheus-stack` аддонының карточкасындағы **Установить** түймесін басып, **Установить аддон** түймесін басыңыз.
   1. (Қалауыңыз бойынша) Өңдеңіз:

      - қолданбаның атауын;
      - аддон орнатылатын namespace атауын;
      - {linkto(#mk8s-install-advanced-monitoring-edit-code)[text=аддонды баптау кодын]} (мысалы, Grafana веб-интерфейсінің уақытша паролін орнату үшін).

   1. Аддонды баптау кодында қажетті tolerations және nodeSelector элементтерін беріңіз:

      {tabs}

      {tab(Тolerations)}

      ```yaml
      tolerations:
        - key: "addonNodes"
          operator: "Equal"
          value: "dedicated"
          effect: "NoSchedule"
      ```

      Бұл toleration-ды келесі өрістерге беріңіз:

      - `grafana.tolerations`;
      - `alertmanager.alertmanagerSpec.tolerations`;
      - `prometheusOperator.tolerations`;
      - `prometheusOperator.admissionWebhooks.patch.tolerations`;
      - `prometheus.prometheusSpec.tolerations`;
      - `kube-state-metrics.tolerations`.

      {/tab}

      {tab(NodeSelector)}

      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Бұл nodeSelector-ді келесі өрістерге беріңіз:

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

   1. **Установить аддон** түймесін басыңыз.

      Аддонның кластерге орнатылуы басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

   {/tabs}

{include(/kz/_includes/_mk8s_kube_prometheus_stack_optional.md)}

{/tab}

{tab(Жедел орнату)}

{note:info}
Жедел орнату кезінде аддонды баптау коды өңделмейді. Grafana веб-интерфейсіне кіру үшін тұрақты пароль бар Kubernetes құпиясы (secret) жасалады.

Егер бұл сізге сай болмаса, **стандартты орнатуды** немесе **бөлінген worker-түйіндерге орнатуды** орындаңыз.
{/note}

1. Аддонды орнатыңыз:

   {tabs}

   {tab(Жеке кабинет)}

   1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app/).
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Кластеры Kubernetes → Кластеры Kubernetes** бөліміне өтіңіз.
   1. Қажетті кластердің атауын басыңыз.
   1. **Аддоны** қойындысына өтіңіз.
   1. `kube-prometheus-stack` аддонының карточкасындағы **Установить** түймесін басып, **Установить аддон** түймесін басыңыз.
   1. (Қалауыңыз бойынша) Өңдеңіз:

      - қолданбаның атауын;
      - аддон орнатылатын namespace атауын;

   1. **Установить аддон** түймесін басыңыз.

      Аддонның кластерге орнатылуы басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

   {/tabs}

{include(/kz/_includes/_mk8s_kube_prometheus_stack_optional.md)}

{/tab}

{/tabs}

## {heading(Орнату кезінде аддонды баптау кодын өңдеу)[id=mk8s-install-advanced-monitoring-edit-code]}

Аддон кодын өңдеу стандартты орнату және бөлінген worker-түйіндерге орнату үшін қолданылады. Аддонды баптаудың толық коды өрістер сипаттамасымен бірге [GitHub](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml) сайтында қолжетімді.

### {heading(Grafana веб-интерфейсі үшін уақытша парольді орнату)[id=mk8s-install-advanced-monitoring-temp-password]}

Аддонды әдепкі параметрлермен орнатқанда Grafana веб-интерфейсіне кіру үшін тұрақты пароль бар Kubernetes құпиясы (secret) жасалады.

Сондай-ақ аддонды орнату кезінде пайдаланушының уақытша паролін көрсетуге болады. Бұл жағдайда Grafana веб-интерфейсіне алғашқы кіру осы парольмен орындалады, содан кейін оны өзгерту ұсынылады. Мұның үшін аддонды баптау кодындағы өрістің мәнін өзгертіңіз:

```yaml
grafana:
  adminPassword: "<УАҚЫТША_ПАРОЛЬ>"
```

Бұл өрістің мәні аддонды орнату кезінде ғана әрекет етеді. Егер оны орнатылған аддонда өзгертсеңіз, Kubernetes құпиясы жаңартылады, бірақ Grafana-ға кіру паролі өзгермейді: `admin` пайдаланушысы Grafana базасында PVC-де сақталады және жаңарту кезінде қайта жазыла бермейді. Бұл жағдайда құпиядағы пароль кіруге жарамауы мүмкін.

Орнатылған аддондағы парольді өзгерту үшін {linkto(#mk8s-install-advanced-monitoring-reset-password)[text=жаңа парольді]}` қалпына келтіру командасы арқылы беріңіз немесе Grafana PVC-сін жойып, {linkto(#mk8s-install-advanced-monitoring-reinstall)[text=аддонды қайта орнатыңыз]}.

Кодты өңдегеннен кейін {linkto(#mk8s-install-advanced-monitoring-install)[text=аддонды орнатуды жалғастырыңыз]}.

## {heading(Аддонмен қосымша әрекеттер)[id=mk8s-install-advanced-monitoring-additional]}

### {heading(Prometheus дискісінің өлшемін өзгерту)[id=mk8s-install-advanced-monitoring-disk-change]}

Prometheus дискісінде кластердің мониторинг деректері сақталады. Егер оларға орын жетіспесе немесе Prometheus дискісінің өнімділігін арттырғыңыз келсе, дискінің өлшемін ұлғайтыңыз.

{tabs}

{tab(Жеке кабинет)}

1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app/).
1. Қажетті кластер орналасқан жобаны таңдаңыз.
1. **Кластеры Kubernetes → Кластеры Kubernetes** бөліміне өтіңіз.
1. Қажетті кластердің атауын басыңыз.
1. **Аддоны** қойындысына өтіңіз.
1. `kube-prometheus-stack` аддоны үшін ![](../../../../../../assets/more-icon.svg "inline") басып, **Изменить размер диска Prometheus** тармағын таңдаңыз.
1. Қажетті дискі өлшемін беріңіз. Операция тек ұлғайту бағытында ғана жұмыс істейді.
1. **Подтвердить** түймесін басыңыз.

{/tab}

{/tabs}

### {heading(Grafana паролін Kubernetes құпиясынан алу)[id=mk8s-install-advanced-monitoring-get-password]}

Егер аддон уақытша пароль көрсетілмей орнатылған болса, Grafana веб-интерфейсіне кіру паролінің мәнін Kubernetes құпиясынан алуға болады. Егер аддон орнатылғаннан кейін `grafana.adminPassword` мәні өзгертілген болса, құпиядағы пароль Grafana-ға кіру паролімен сәйкес келмеуі мүмкін.

{tabs}

{tab(Headlamp)}

1. Егер орнатылған болса, Headlamp көмегімен {linkto(../../../../connect/headlamp#mk8s-headlamp)[text=кластерге қосылыңыз]}.
1. **Конфигурация → Секреты** мәзір бөліміне өтіңіз.
1. Тізімнен Grafana құпиясын тауып, оның атауын басыңыз. 

   Құпия аддон орнатылған namespace-те орналасқан (әдепкі бойынша — `prometheus-monitoring`). Оның атауы қолданбаның атауы негізінде қалыптасады: `<ҚОЛДАНБА_АТАУЫ>-grafana`. Егер аддон жеке кабинет арқылы орнатылған және қолданбаның атауы автоматты түрде жасалған болса, құпияның атауы `addon-<ХЕШ>-grafana` түрінде болады.

1. **Данные** блогында көз белгісін басыңыз. 

   Пароль көрсетіледі.

{/tab}

{tab(kubectl)}

1. `kubectl` көмегімен кластерге қосыла алатыныңызға {linkto(../../../../connect/kubectl#mk8s-kubectl-check-connection)[text=көз жеткізіңіз]}.

1. Grafana құпиясының атауын анықтаңыз:

   ```console
   kubectl -n <NAMESPACE> get secret -l app.kubernetes.io/name=grafana
   ```

   Мұнда `<NAMESPACE>` — аддон орнатылған namespace. Әдепкі бойынша — `prometheus-monitoring`.

   Команданың шығысында Grafana құпиясының атауы болады. Ол қолданбаның атауы негізінде қалыптасады, мысалы `myapp-grafana`. Егер аддон жеке кабинет арқылы орнатылған және қолданбаның атауы автоматты түрде жасалған болса, атау `addon-a0b1c2d3f4-grafana` түрінде болады.

1. Kubernetes құпиясынан Grafana-ға кіру паролін алыңыз:

   {tabs}

   {tab(Windows (PowerShell))}

   ```console
   $ENCODED = kubectl -n <NAMESPACE> get secret <GRAFANA_ҚУПИЯСЫНЫҢ_АТАУЫ> -o jsonpath='{.data.admin-password}'; `
   [System.Text.Encoding]::Utf8.GetString([System.Convert]::FromBase64String($ENCODED)) | Write-Output
   ```

   {/tab}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   kubectl -n <NAMESPACE> get secret <GRAFANA_ҚУПИЯСЫНЫҢ_АТАУЫ> -o jsonpath='{.data.admin-password}' | base64 --decode
   ```

   {/tab}

   {/tabs}

   Мұнда:

   - `<NAMESPACE>` — аддон орнатылған namespace.
   - `<GRAFANA_ҚУПИЯСЫНЫҢ_АТАУЫ>` — алдыңғы команда шығысындағы құпияның атауы.

{/tab}

{/tabs}

### {heading(Grafana паролін қалпына келтіру)[id=mk8s-install-advanced-monitoring-reset-password]}

Егер Grafana веб-интерфейсіне кіру паролі жоғалған немесе жарамаса (мысалы, Kubernetes құпиясындағы пароль нақты парольмен сәйкес келмесе), жаңа пароль беруге болады.

1. Grafana подының атауын алыңыз:

   ```console
   kubectl -n <NAMESPACE> get pod -l app.kubernetes.io/name=grafana
   ```

   Мұнда `<NAMESPACE>` — аддон орнатылған namespace. Әдепкі бойынша — `prometheus-monitoring`.

1. Grafana подының ішінде команданы орындап, парольді қалпына келтіріңіз:

   ```console
   kubectl -n <NAMESPACE> exec <GRAFANA_ПОДЫНЫҢ_АТАУЫ> -- sh -c "grafana cli --debug admin reset-admin-password <ЖАҢА_ПАРОЛЬ>"
   ```

   Мұнда:

   - `<NAMESPACE>` — аддон орнатылған namespace.
   - `<GRAFANA_ПОДЫНЫҢ_АТАУЫ>` — алдыңғы команда шығысындағы подтың атауы.
   - `<ЖАҢА_ПАРОЛЬ>` — Grafana-ға кірудің жаңа паролі.

   Егер пароль сәтті қалпына келтірілсе, команда шығысында `Admin password changed successfully ✔` хабарламасы болады.

### {heading(Grafana PVC-сін жойып, аддонды қайта орнату)[id=mk8s-install-advanced-monitoring-reinstall]}

Бұл әдіс Grafana паролін аддонды баптау кодындағы `grafana.adminPassword` өрісі арқылы беруге мүмкіндік береді.

{note:warn}
Grafana PVC-сімен бірге Grafana базасында сақталған деректер жойылады: пайдаланушылық дашбордтар, деректер көздері және веб-интерфейс арқылы енгізілген басқа баптаулар.
{/note}

1. `kube-prometheus-stack` аддонын {linkto(../../manage-addons#mk8s-manage-addons-delete)[text=жойыңыз]}.
1. Grafana PVC-сінің қалғанын тексеріңіз:

   ```console
   kubectl -n <NAMESPACE> get pvc -l app.kubernetes.io/name=grafana
   ```

   Мұнда `<NAMESPACE>` — аддон орнатылған namespace. Әдепкі бойынша — `prometheus-monitoring`.

1. Егер PVC қалған болса, оны жойыңыз:

   ```console
   kubectl -n <NAMESPACE> delete pvc <GRAFANA_PVC_АТАУЫ>
   ```

   Мұнда:

   - `<NAMESPACE>` — аддон орнатылған namespace.
   - `<GRAFANA_PVC_АТАУЫ>` — алдыңғы команда шығысындағы PVC атауы.

1. Аддонды қайта орнатыңыз және баптау кодында {linkto(#mk8s-install-advanced-monitoring-temp-password)[text=қажетті парольді беріңіз]}.