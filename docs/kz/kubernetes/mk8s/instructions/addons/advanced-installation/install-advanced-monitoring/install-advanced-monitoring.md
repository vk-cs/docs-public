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
      - {linkto(#mk8s-install-advanced-monitoring-edit-code)[text=аддонды баптау кодын]}.

        {note:warn}

        Дұрыс берілмеген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.

        {/note}

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

<!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

   {/tabs}

1. Қажет болса, {linkto(#mk8s-install-advanced-monitoring-disk-change)[text=Prometheus дискісінің өлшемін өзгертіңіз]}.
1. Қажет болса, {linkto(#mk8s-install-advanced-monitoring-get-password)[text=Grafana үшін құпиясөзді Kubernetes секретінен алыңыз]}.
1. Қажет болса, браузерде Kube Prometheus Stack аддонының құрамына кіретін {linkto(../../../../connect/addons-ui#mk8s-addons-ui-web-ui)[text=Grafana веб-интерфейсіне қосылыңыз]}.

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
      - {linkto(#mk8s-install-advanced-monitoring-edit-code)[text=аддонды баптау кодын]}.

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

1. Қажет болса, {linkto(#mk8s-install-advanced-monitoring-disk-change)[text=Prometheus дискісінің өлшемін өзгертіңіз]}.
1. Қажет болса, {linkto(#mk8s-install-advanced-monitoring-get-password)[text=Grafana үшін құпиясөзді Kubernetes секретінен алыңыз]}.

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

1. Қажет болса, {linkto(#mk8s-install-advanced-monitoring-disk-change)[text=Prometheus дискісінің өлшемін өзгертіңіз]}.
1. {linkto(#mk8s-install-advanced-monitoring-get-password)[text=Grafana үшін құпиясөзді Kubernetes секретінен алыңыз]}.

{/tab}

{/tabs}

## {heading(Орнату кезінде аддонды баптау кодын өңдеу)[id=mk8s-install-advanced-monitoring-edit-code]}

{note:info}

- Аддон кодын өңдеу стандартты орнату және бөлінген worker-түйіндерге орнату үшін қолданылады.
- Өрістер сипаттамасымен бірге аддонды баптау кодының толық нұсқасы [GitHub](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml) сайтында қолжетімді.

{/note}

### {heading(Grafana веб-интерфейсі үшін уақытша құпиясөз орнату)[id=mk8s-install-advanced-monitoring-temp-password]}

Әдепкі параметрлермен аддонды орнату кезінде Grafana веб-интерфейсіне кіруге арналған тұрақты құпиясөзді қамтитын Kubernetes секреті жасалады.

Сондай-ақ, аддонды орнату кезінде пайдаланушының уақытша құпиясөзін көрсетуге болады. Бұл жағдайда Grafana веб-интерфейсіне алғашқы кіру осы құпиясөзбен орындалады, содан кейін оны өзгерту ұсынылады. Ол үшін аддонды баптау кодындағы өріс мәнін өзгертіңіз:

```yaml
grafana:
  adminPassword: "<временный пароль>"
```

Кодты өңдегеннен кейін {linkto(#mk8s-install-advanced-monitoring-install)[text=аддонды орнатуды жалғастырыңыз]}.

## {heading(Prometheus дискісінің өлшемін өзгерту)[id=mk8s-install-advanced-monitoring-disk-change]}

Бұл операция кластерде `kube-prometheus-stack` мониторинг аддоны {linkto(#mk8s-install-advanced-monitoring-install)[text=орнатылған]} болса қолжетімді.

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

## {heading(Grafana үшін құпиясөзді Kubernetes секретінен алу)[id=mk8s-install-advanced-monitoring-get-password]}

Егер аддон уақытша құпиясөз көрсетілмей орнатылған болса, Grafana веб-интерфейсіне кіруге арналған құпиясөз мәнін Kubernetes секретінен алуға болады.

{note:info}

Төменде `kube-prometheus-stack` сервис атауы және `prometheus-monitoring` аттар кеңістігі пайдаланылады. Егер аддонды қосу кезінде басқа параметрлер таңдалса, қадамдар мен пәрмендерді түзетіңіз.

{/note}

{tabs}

<!--  удалена таба Kubernetes Dashboard. для Headlamp: забрать шаги и k8s с заменой на Headlamp или удалить -->

{tab(kubectl)}

1. `kubectl` көмегімен кластерге қосыла алатыныңызға {linkto(../../../../connect/kubectl#mk8s-kubectl-check-connection)[text=көз жеткізіңіз]}.

1. Kubernetes секретінен Grafana-ға кіруге арналған құпиясөзді алыңыз:

   {tabs}

   {tab(Windows (PowerShell))}

   ```console
   $ENCODED = kubectl -n prometheus-monitoring get secret kube-prometheus-stack-grafana -o jsonpath='{.data.admin-password}'; `
   [System.Text.Encoding]::Utf8.GetString([System.Convert]::FromBase64String($ENCODED)) | Write-Output
   ```

   {/tab}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   kubectl -n prometheus-monitoring get secret kube-prometheus-stack-grafana -o jsonpath='{.data.admin-password}' | base64 --decode
   ```

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Grafana үшін құпиясөзді қалпына келтіру)[id=mk8s-install-advanced-monitoring-reset-password]}

Егер аддон уақытша құпиясөз көрсетілмей орнатылған болса, Grafana веб-интерфейсіне кіруге арналған құпиясөз мәні Kubernetes секретінде сақталады. Егер бұл секрет жоғалып кетсе, Grafana-ға қайта қол жеткізу үшін құпиясөзді қалпына келтіре аласыз.

{note:info}
Төменде `kube-prometheus-stack` сервис атауы және `prometheus-monitoring` аттар кеңістігі пайдаланылады. Егер аддонды қосу кезінде басқа параметрлер таңдалса, пәрмендерді түзетіңіз.
{/note}

1. Grafana подының атауын алыңыз:

   ```console
   kubectl -n prometheus-monitoring get pod -l app.kubernetes.io/name=grafana
   ```

   **Пәрмен шығысындағы под атауының форматы:**

   ```text
   kube-prometheus-stack-grafana-XXXXXXXXX-XXXXX
   ```

1. Grafana подының ішінде пәрменді орындап, құпиясөзді қалпына келтіріңіз:

   ```console
   kubectl -n prometheus-monitoring exec <имя пода Grafana> -- sh -c "grafana cli --debug admin reset-admin-password <новый пароль>"
   ```

   Егер құпиясөз сәтті қалпына келтірілсе, пәрмен шығысында `Admin password changed successfully ✔` хабарламасы болады.
