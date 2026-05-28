{include(/kz/_includes/_translated_by_ai.md)}

[Аддон құрамында](../../../../concepts/addons-and-settings/addons#jaeger_2f2714fa) жұмысы үшін сақтау қоймасы қажет болатын [Jaeger коллекторы](https://www.jaegertracing.io/docs/latest/architecture/#collector) бар. Сақтау қоймасы үшін бэкенд ([storage backend](https://www.jaegertracing.io/docs/latest/deployment/#span-storage-backends)) ретінде VK Cloud ұсынған Jaeger аддонында бірнеше реплика түрінде орналастырылатын Elasticsearch пайдаланылады.

## Дайындық қадамдары

1. Аддонды орнату үшін жеткілікті ресурстарыңыз бар екеніне көз жеткізу мақсатында оның [жүйелік талаптарымен](/kz/kubernetes/k8s/concepts/addons-and-settings/addons#kolzhetimdi_addondar) танысыңыз.

   Jaeger аддонының жүйелік талаптары таңдалған Elasticsearch репликаларының санына және кластер ортасына байланысты. Репликалардың ең аз саны — екі, әдепкі бойынша — үш. Олардың санын стандартты орнату кезінде немесе бөлінген worker-түйіндерге орнату кезінде өзгертуге болады.

1. (Қосымша) worker-түйіндер топтарын [қолмен масштабтауды орындаңыз](/kz/kubernetes/k8s/instructions/scale#scale_worker_nodes) немесе [автоматты масштабтауды баптаңыз](/kz/kubernetes/k8s/instructions/scale#koldenen_masshtabtau).

## Аддонды орнату

Аддон үшін [орнатудың бірнеше нұсқасы](../../../../concepts/addons-and-settings/addons#addondardy_ornatu_erekshelikteri) қолжетімді.

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
   1. Егер кластерде орнатылған аддондар бар болса, **Аддон қосу** батырмасын басыңыз.
   1. `jaeger` аддонының картасындағы **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - қолданба атауы;
      - аддон орнатылатын атаулар кеңістігінің атауы.

   1. Егер төмендегілер қажет болса, [аддонды баптау кодын](#ornatu_kezinde_addondy_baptau_kodyn_ondeu) өңдеңіз:

      - Elasticsearch репликаларының стандартты емес саны;
      - master-түйіндер мен worker-түйіндер әртүрлі қолжетімділік аймақтарында орналасса.

      {note:warn}

      Қате берілген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.

      {/note}

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}
   
   {tab(Terraform)}
   
   1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).
   1. Кластерді сипаттайтын Terraform конфигурациялық файлдарыңызғал мыналарды қосыңыз:

      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) ресурсын;
      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) дереккөзін;
      - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) дереккөзін.

      Қажет болса, сілтемелерде келтірілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызғал бейімдеңіз. Мысалы, `vkcs_kubernetes_addon` ресурсын өзгерту арқылы аддонды баптау кодын өңдей аласыз.

      {note:warn}
      Қате берілген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.
      {/note}

   1. Конфигурациялық файлдардың дұрыс екенін және қажетті өзгерістерді қамтитынын тексеріңіз:

      ```console
      terraform validate && terraform plan
      ```

   1. Өзгерістерді қолданыңыз:

      ```console
      terraform apply
      ```

   {/tab}
   
   {/tabs}

{include(/kz/_includes/_jaeger_install_optional.md)}

{/tab}

{tab(Бөлінген worker-түйіндерге орнату)}

1. Егер бұл әлі жасалмаса, аддонды орнатуғал арналған бөлінген worker-түйіндер тобын дайындаңыз:

   {tabs}
   
   {tab(Жеке кабинет)}
      
   1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Тізімнен қажетті кластерді табыңыз.

   1. Кластерде аддондар орналастырылатын бөлінген worker-түйіндер тобы бар екеніне көз жеткізіңіз.

      Егер мұндай топ болмаса — [оны қосыңыз](../../../manage-node-group#add_group).

   1. Егер бұл әлі жасалмаса, осы түйіндер тобы үшін [мыналарды орнатыңыз](../../../manage-node-group#labels_taints):

      - **Белгі (label)**: кілт `addonNodes`, мәні `dedicated`.
      - **Шектеу (taint)**: әсері `NoSchedule`, кілт `addonNodes`, мәні `dedicated`.

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
   1. Егер кластерде орнатылған аддондар бар болса, **Аддон қосу** батырмасын басыңыз.
   1. `jaeger` аддонының картасындағы **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - қолданба атауы;
      - аддон орнатылатын атаулар кеңістігінің атауы.

   1. Егер төмендегілер қажет болса, [аддонды баптау кодын](#ornatu_kezinde_addondy_baptau_kodyn_ondeu) өңдеңіз:

      - Elasticsearch репликаларының стандартты емес саны;
      - master-түйіндер мен worker-түйіндер әртүрлі қолжетімділік аймақтарында орналасса.

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

      Бұл ерекшелікті мына өрістер үшін орнатыңыз:

      - `elasticsearch.tolerations`;
      - `agent.tolerations`;
      - `collector.tolerations`;
      - `query.tolerations`.

      {/tab}
      
      {tab(Түйін селекторлары)}
      
      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Бұл селекторды мына өрістер үшін орнатыңыз:

      - `elasticsearch.nodeSelector`;
      - `agent.nodeSelector`;
      - `collector.nodeSelector`;
      - `query.nodeSelector`.

      {/tab}

      {/tabs}

      {note:warn}

      Қате берілген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.

      {/note}

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}
   
   {tab(Terraform)}
   
   1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).
   1. Кластерді сипаттайтын Terraform конфигурациялық файлдарыңызғал мыналарды қосыңыз:

      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) ресурсын;
      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) дереккөзін;
      - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) дереккөзін.

      Қажет болса, сілтемелерде келтірілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызғал бейімдеңіз. Мысалы, `vkcs_kubernetes_addon` ресурсын өзгерту арқылы аддонды баптау кодын өңдей аласыз.

      {note:warn}
      Қате берілген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.
      {/note}

   1. Конфигурациялық файлдардың дұрыс екенін және қажетті өзгерістерді қамтитынын тексеріңіз:

      ```console
      terraform validate && terraform plan
      ```

   1. Өзгерістерді қолданыңыз:

      ```console
      terraform apply
      ```

   {/tab}

   {/tabs}

{include(/kz/_includes/_jaeger_install_optional.md)}

{/tab}

{tab(Жылдам орнату)}

{note:info}

Аддонды бұл тәсілмен орнату үшін master-түйіндер мен worker-түйіндер бір қолжетімділік аймағында орналасуы қажет.

Жылдам орнату кезінде аддонды баптау коды өңделмейді. Сақтау қоймасы үшін бэкенд ретінде Elasticsearch-тің үш репликасы пайдаланылады.

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
   1. Егер кластерде орнатылған аддондар бар болса, **Аддон қосу** батырмасын басыңыз.
   1. `jaeger` аддонының картасындағы **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - қолданба атауы;
      - аддон орнатылатын атаулар кеңістігінің атауы;

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}
   
   {tab(Terraform)}
   
   1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).
   1. Кластерді сипаттайтын Terraform конфигурациялық файлдарыңызғал мыналарды қосыңыз:

      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) ресурсын;
      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) дереккөзін;
      - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) дереккөзін.

      Қажет болса, сілтемелерде келтірілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызғал бейімдеңіз.

   1. Конфигурациялық файлдардың дұрыс екенін және қажетті өзгерістерді қамтитынын тексеріңіз:

      ```console
      terraform validate && terraform plan
      ```

   1. Өзгерістерді қолданыңыз:

      ```console
      terraform apply
      ```

   {/tab}
   
   {/tabs}

{include(/kz/_includes/_jaeger_install_optional.md)}

{/tab}

{/tabs}

## Орнату кезінде аддонды баптау кодын өңдеу

Аддон кодын өңдеу стандартты орнатуғал және бөлінген worker-түйіндерге орнатуғал қолданылады.

Өрістер сипаттамасымен бірге аддонды баптау кодының толық нұсқасы [GitHub](https://github.com/jaegertracing/helm-charts/blob/main/charts/jaeger/values.yaml) сайтында қолжетімді.

{note:err}

`podAnnotations.timestamp` өрістерін немесе оларда берілген мәндерді жоймаңыз. Бұл өрістер аддонды дұрыс орнату және жұмыс істеуі үшін қажет.

{/note}

### Elasticsearch репликаларының санын өзгерту

Қажетті репликалар санын беру үшін аддонды баптау кодындағы өріс мәнін өзгертіңіз:

```yaml
elasticsearch:
  replicas: <КӨШІРМЕЛЕР_САНЫ>
```

{note:warn}

Кластердегі worker-түйіндер саны таңдалған репликалар санынан кем емес екеніне көз жеткізіңіз.

{/note}

### Elasticsearch сақтау қоймасының баптауларын өзгерту

Elasticsearch репликалары кластердің worker-түйіндерінде орналастырылады және сақтау қоймасы ретінде [тұрақты томдарды](../../../../reference/pvs-and-pvcs) пайдаланады. Әдепкі бойынша бұл тұрақты томдар кластердің worker-түйіндері орналасқан [қолжетімділік аймағында](/kz/start/concepts/architecture#az) орналастырылады. Егер кластердің worker-түйіндері мен тұрақты томдары әртүрлі қолжетімділік аймақтарында орналасса, онда осы түйіндердегі репликалар томдармен жұмыс істей алмайды.

Elasticsearch репликаларымен тұрақты томдардың жұмысын қамтамасыз ету үшін қолжетімділік аймағы worker-түйіндердің қолжетімділік аймағымен сәйкес келетін [сақтау класын](../../../../concepts/storage#storage_classes) орнатыңыз:

```yaml
elasticsearch:
  volumeClaimTemplate:
    accessModes:
    - ReadWriteOnce
    storageClassName: "<САҚТАУ_КЛАСЫНЫҢ_АТАУЫ>"
```

Кодты өңдегеннен кейін [аддонды орнатуды жалғастырыңыз](#addondy_ornatu).