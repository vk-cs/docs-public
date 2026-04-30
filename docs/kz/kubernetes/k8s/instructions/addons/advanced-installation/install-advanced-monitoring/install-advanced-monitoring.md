{include(/kz/_includes/_translated_by_ai.md)}

## Аддонды орнату

Аддон үшін [орнатудың бірнеше нұсқасы](../../../../concepts/addons-and-settings/addons#addondardy_ornatu_erekshelikteri) қолжетімді.

Worker-түйіндер топтарында орналастырылатын аддондардың жиынтық [ең жоғары жүйелік талаптарын](../../../../concepts/addons-and-settings/addons) ескеріңіз. Қажет болса, орнату алдында worker-түйіндер топтарын [қолмен масштабтауды орындаңыз](../../../scale#scale_worker_nodes) немесе [автоматты масштабтауды баптаңыз](../../../scale#autoscale_worker_nodes).

{tabs}

{tab(Стандартты орнату)}

1. Аддонды орнатыңыз:

   {tabs}
   
   {tab(Жеке кабинет)}
      
   1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Қажетті кластердің атауын басыңыз.
   1. **Аддондар** қойындысына өтіңіз.
   1. Егер кластерде бұрыннан орнатылған аддондар болса, **Аддон қосу** батырмасын басыңыз.
   1. `kube-prometheus-stack` аддонының карточкасындағы **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - қосымша атауын;
      - аддон орнатылатын аттар кеңістігінің атауын;
      - [аддонды баптау кодын](#ornatu_kezinde_addondy_baptau_kodyn_ondeu).

        {note:warn}

        Дұрыс берілмеген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.

        {/note}

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}
   
   {tab(Terraform)}
   
   1. Егер әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).
   1. Кластерді сипаттайтын Terraform конфигурация файлдарыңызғал мыналарды қосыңыз:

      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) ресурсын;
      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) дереккөзін;
      - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) дереккөзін.

      Қажет болса, сілтемелер бойынша берілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызғал бейімдеңіз. Мысалы, `vkcs_kubernetes_addon` ресурсын өзгерту арқылы аддонды баптау кодын өңдей аласыз.

      {note:warn}
      Дұрыс берілмеген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.
      {/note}

   1. Конфигурация файлдарының дұрыс екенін және қажетті өзгерістерді қамтитынын тексеріңіз:

      ```console
      terraform validate && terraform plan
      ```

   1. Өзгерістерді қолданыңыз:

      ```console
      terraform apply
      ```

   {/tab}
   
   {/tabs}

1. Қажет болса, [Prometheus дискісінің өлшемін өзгертіңіз](#prometheus_diskisinin_olshemin_ozgertu).
1. Қажет болса, [Grafana үшін құпиясөзді Kubernetes секретінен алыңыз](#grafana_ushin_kupiyasozdi_kubernetes_sekretinen_alu).
1. Қажет болса, браузерде Kube Prometheus Stack аддонының құрамына кіретін [Grafana веб-интерфейсіне қосылыңыз](/kz/kubernetes/k8s/connect/addons-ui#web-ui).

{/tab}

{tab(Бөлінген worker-түйіндерге орнату)}

1. Егер әлі жасалмаса, аддонды орнату үшін бөлінген worker-түйіндер тобын дайындаңыз:

   {tabs}
   
   {tab(Жеке кабинет)}
      
   1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Тізімнен қажетті кластерді табыңыз.

   1. Кластерде аддондар орналастырылатын бөлінген worker-түйіндер тобы бар екеніне көз жеткізіңіз.

      Егер мұндай топ жоқ болса — [оны қосыңыз](../../../manage-node-group#add_group).

   1. Егер әлі жасалмаса, осы түйіндер тобы үшін [мыналарды орнатыңыз](../../../manage-node-group#labels_taints):

      - **Белгі (label)**: `addonNodes` кілті, `dedicated` мәні.
      - **Шектеу (taint)**: `NoSchedule` әсері, `addonNodes` кілті, `dedicated` мәні.

   {/tab}
   
   {/tabs}

1. Аддонды орнатыңыз:

   {tabs}
   
   {tab(Жеке кабинет)}
      
   1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Қажетті кластердің атауын басыңыз.
   1. **Аддондар** қойындысына өтіңіз.
   1. Егер кластерде бұрыннан орнатылған аддондар болса, **Аддон қосу** батырмасын басыңыз.
   1. `kube-prometheus-stack` аддонының карточкасындағы **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - қосымша атауын;
      - аддон орнатылатын аттар кеңістігінің атауын;
      - [аддонды баптау кодын](#ornatu_kezinde_addondy_baptau_kodyn_ondeu).

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
   
   {tab(Terraform)}
   
   1. Егер әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).
   1. Кластерді сипаттайтын Terraform конфигурация файлдарыңызғал мыналарды қосыңыз:

      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) ресурсын;
      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) дереккөзін;
      - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) дереккөзін.

      Қажет болса, сілтемелер бойынша берілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызғал бейімдеңіз.

   1. Конфигурация файлдарының дұрыс екенін және қажетті өзгерістерді қамтитынын тексеріңіз:

      ```console
      terraform validate && terraform plan
      ```

   1. Өзгерістерді қолданыңыз:

      ```console
      terraform apply
      ```

   {/tab}
   
   {/tabs}

1. Қажет болса, [Prometheus дискісінің өлшемін өзгертіңіз](#prometheus_diskisinin_olshemin_ozgertu).
1. Қажет болса, [Grafana үшін құпиясөзді Kubernetes секретінен алыңыз](#grafana_ushin_kupiyasozdi_kubernetes_sekretinen_alu).

{/tab}

{tab(Жылдам орнату)}

{note:info}

Жылдам орнату кезінде аддонды баптау коды өңделмейді. Grafana веб-интерфейсіне кіруге арналған тұрақты құпиясөзді қамтитын Kubernetes секреті жасалады.

Егер бұл сізге сәйкес келмесе, **стандартты орнатуды** немесе **бөлінген worker-түйіндерге орнатуды** орындаңыз.

{/note}

1. Аддонды орнатыңыз:

   {tabs}
   
   {tab(Жеке кабинет)}
      
   1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Қажетті кластердің атауын басыңыз.
   1. **Аддондар** қойындысына өтіңіз.
   1. Егер кластерде бұрыннан орнатылған аддондар болса, **Аддон қосу** батырмасын басыңыз.
   1. `kube-prometheus-stack` аддонының карточкасындағы **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - қосымша атауын;
      - аддон орнатылатын аттар кеңістігінің атауын;

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}
   
   {tab(Terraform)}
   
   1. Егер әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).
   1. Кластерді сипаттайтын Terraform конфигурация файлдарыңызғал мыналарды қосыңыз:

      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) ресурсын;
      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) дереккөзін;
      - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) дереккөзін.

      Қажет болса, сілтемелер бойынша берілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызғал бейімдеңіз.

   1. Конфигурация файлдарының дұрыс екенін және қажетті өзгерістерді қамтитынын тексеріңіз:

      ```console
      terraform validate && terraform plan
      ```

   1. Өзгерістерді қолданыңыз:

      ```console
      terraform apply
      ```

   {/tab}
   
   {/tabs}

1. Қажет болса, [Prometheus дискісінің өлшемін өзгертіңіз](#prometheus_diskisinin_olshemin_ozgertu).
1. [Grafana үшін құпиясөзді Kubernetes секретінен алыңыз](#grafana_ushin_kupiyasozdi_kubernetes_sekretinen_alu).

{/tab}

{/tabs}

## Орнату кезінде аддонды баптау кодын өңдеу

{note:info}

- Аддон кодын өңдеу стандартты орнату және бөлінген worker-түйіндерге орнату үшін қолданылады.
- Өрістер сипаттамасымен бірге аддонды баптау кодының толық нұсқасы [GitHub](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml) сайтында қолжетімді.

{/note}

### Grafana веб-интерфейсі үшін уақытша құпиясөз орнату

Әдепкі параметрлермен аддонды орнату кезінде Grafana веб-интерфейсіне кіруге арналған тұрақты құпиясөзді қамтитын Kubernetes секреті жасалады.

Сондай-алқ, аддонды орнату кезінде пайдаланушының уақытша құпиясөзін көрсетуге болады. Бұл жағдайда Grafana веб-интерфейсіне алғашқы кіру осы құпиясөзбен орындалады, содан кейін оны өзгерту ұсынылады. Ол үшін аддонды баптау кодындағы өріс мәнін өзгертіңіз:

```yaml
grafana:
  adminPassword: "<временный пароль>"
```

Кодты өңдегеннен кейін [аддонды орнатуды жалғастырыңыз](#addondy_ornatu).

## Prometheus дискісінің өлшемін өзгерту

Бұл операция кластерде [kube-prometheus-stack](#addondy_ornatu) мониторинг аддондар `kube-prometheus-stack` болса қолжетімді.

Prometheus дискісінде кластер мониторингі деректері сақталады. Егер олар үшін орын жеткіліксіз болса немесе Prometheus дискісінің өнімділігін арттырғыңыз келсе, диск өлшемін үлкейтіңіз.

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Қажетті кластер орналасқан жобаны таңдаңыз.
1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
1. Қажетті кластердің атауын басыңыз.
1. **Аддондар** қойындысына өтіңіз.
1. ![kube-prometheus-stack](/kz/assets/more-icon.svg "inline") аддондар үшін `kube-prometheus-stack` батырмасын басып, **Prometheus дискісінің өлшемін өзгерту** тармағын таңдаңыз.
1. Қажетті диск өлшемін көрсетіңіз. Операция тек үлкейту бағытымен жұмыс істейді.
1. **Растау** батырмасын басыңыз.

{/tab}

{/tabs}

## Grafana үшін құпиясөзді Kubernetes секретінен алу

Егер аддон уақытша құпиясөз көрсетілмей орнатылған болса, Grafana веб-интерфейсіне кіруге арналған құпиясөз мәнін Kubernetes секретінен алуғал болады.

{note:info}

Төменде `kube-prometheus-stack` сервис атауы және `prometheus-monitoring` аттар кеңістігі пайдаланылады. Егер аддонды қосу кезінде басқал параметрлер таңдалса, қадамдар мен пәрмендерді түзетіңіз.

{/note}

{tabs}

{tab(Kubernetes Dashboard)}

1. [Кластерге қосылыңыз](../../../../connect/k8s-dashboard) Kubernetes Dashboard арқылы.
1. Іздеу жолының сол жағындағы ашылмалы тізімнен `prometheus-monitoring` аттар кеңістігін таңдаңыз.
1. **Config and Storage → Secrets** мәзір бөліміне өтіңіз.
1. Секреттер тізімінен `kube-prometheus-stack-grafana` секретін тауып, оның атауын басыңыз.
1. **Data** блогында `admin-password` параметрінің жанындағы көз белгішесін басыңыз.

   Құпиясөз көрсетіледі.

{/tab}

{tab(kubectl)}

1. [kubectl](../../../../connect/kubectl#check_connection) көмегімен кластерге қосыла алатыныңызғал `kubectl`.

1. Kubernetes секретінен Grafana-ғал кіруге арналған құпиясөзді алыңыз:

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

## {heading(Grafana үшін құпиясөзді қалпына келтіру)[id=reset_grafana_password]}

Егер аддон уақытша құпиясөз көрсетілмей орнатылған болса, Grafana веб-интерфейсіне кіруге арналған құпиясөз мәні Kubernetes секретінде сақталады. Егер бұл секрет жоғалып кетсе, Grafana-ғал қайта қол жеткізу үшін құпиясөзді қалпына келтіре аласыз.

{note:info}

Төменде `kube-prometheus-stack` сервис атауы және `prometheus-monitoring` аттар кеңістігі пайдаланылады. Егер аддонды қосу кезінде басқал параметрлер таңдалса, пәрмендерді түзетіңіз.

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