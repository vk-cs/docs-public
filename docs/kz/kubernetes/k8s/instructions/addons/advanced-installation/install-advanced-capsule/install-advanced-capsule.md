{include(/kz/_includes/_translated_by_ai.md)}

## Аддонды орнату

Аддон үшін [орнатудың бірнеше нұсқасы](../../../../concepts/addons-and-settings/addons#addondardy_ornatu_erekshelikteri) қолжетімді.

Worker-түйіндер топтарында орналастырылатын аддондардың жиынтық [максималды жүйелік талаптарын](../../../../concepts/addons-and-settings/addons) ескеріңіз. Қажет болса, орнату алдында worker-түйіндер топтарын [қолмен масштабтаңыз](../../../scale#scale_worker_nodes) немесе [автоматты масштабтауды баптаңыз](../../../scale#autoscale_worker_nodes).

{note:info}

Бұл аддон тек [бірінші буындағы](/kz/kubernetes/k8s/concepts/cluster-generations) кластерлер үшін қолжетімді.

{/note}

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
   1. Егер кластерде орнатылған аддондар бұрыннан бар болса, **Аддон қосу** батырмасын басыңыз.
   1. `capsule` аддонының карточкасындағы **Орнату** батырмасын басыңыз.
   1. Ашылмалы тізімнен аддонның қажетті нұсқасын таңдаңыз.
   1. **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - таңдалған нұсқаны;
      - қолданба атауын;
      - аддон орнатылатын атаулар кеңістігінің атауын;
      - [аддонды баптау коды](#ornatu_kezinde_addondy_baptau_kodyn_ondeu).

        {note:warn}

        Қате берілген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.

        {/note}

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}
   
   {tab(Terraform)}
   
   1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).
   1. Кластерді сипаттайтын Terraform конфигурация файлдарыңызғал мыналарды қосыңыз:

      - ресурс [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md);
      - деректер көзі [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
      - деректер көзі [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

      Қажет болса, сілтемелерде келтірілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызғал бейімдеңіз. Мысалы, `vkcs_kubernetes_addon` ресурсын өзгерту арқылы аддонды баптау кодын өңдей аласыз.

      {note:warn}
      Қате берілген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.
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

1. (Опционалды түрде) [Аддонмен жұмыс істеу бойынша Capsule ресми құжаттамасымен танысыңыз](https://capsule.clastix.io/docs/general/tutorial).

{/tab}

{tab(Бөлінген worker-түйіндерге орнату)}

1. Егер бұл әлі жасалмаса, аддонды орнату үшін бөлінген worker-түйіндер тобын дайындаңыз:

   {tabs}
   
   {tab(Жеке кабинет)}
      
   1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Тізімнен қажетті кластерді табыңыз.

   1. Кластерде аддондар орналастырылатын бөлінген worker-түйіндер тобы бар екеніне көз жеткізіңіз.

      Егер мұндай топ жоқ болса — [оны қосыңыз](../../../manage-node-group#add_group).

   1. Егер бұл әлі жасалмаса, осы түйіндер тобы үшін [мына мәндерді орнатыңыз](../../../manage-node-group#labels_taints):

      - **Белгіні (label)**: `addonNodes` кілті, `dedicated` мәні.
      - **Шектеуді (taint)**: `NoSchedule` әсері, `addonNodes` кілті, `dedicated` мәні.

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
   1. Егер кластерде орнатылған аддондар бұрыннан бар болса, **Аддон қосу** батырмасын басыңыз.
   1. `capsule` аддонының карточкасындағы **Орнату** батырмасын басыңыз.
   1. Ашылмалы тізімнен аддонның қажетті нұсқасын таңдаңыз.
   1. **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - таңдалған нұсқаны;
      - қолданба атауын;
      - аддон орнатылатын атаулар кеңістігінің атауын;
      - [аддонды баптау коды](#ornatu_kezinde_addondy_baptau_kodyn_ondeu).

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

      Бұл ерекшелікті `tolerations` өрісі үшін орнатыңыз.

      {/tab}
      
      {tab(Түйін селекторлары)}
      
      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Бұл селекторды `nodeSelector` өрісі үшін орнатыңыз.

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
   1. Кластерді сипаттайтын Terraform конфигурация файлдарыңызғал мыналарды қосыңыз:

      - ресурс [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md);
      - деректер көзі [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
      - деректер көзі [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

      Қажет болса, сілтемелерде келтірілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызғал бейімдеңіз.

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

1. (Опционалды түрде) [Аддонмен жұмыс істеу бойынша Capsule ресми құжаттамасымен танысыңыз](https://capsule.clastix.io/docs/general/tutorial).

{/tab}

{tab(Жылдам орнату)}

{note:info}

Жылдам орнату кезінде аддонды баптау коды өңделмейді.

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
   1. Егер кластерде орнатылған аддондар бұрыннан бар болса, **Аддон қосу** батырмасын басыңыз.
   1. `capsule` аддонының карточкасындағы **Орнату** батырмасын басыңыз.
   1. Ашылмалы тізімнен аддонның қажетті нұсқасын таңдаңыз.
   1. **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - таңдалған нұсқаны;
      - қолданба атауын;
      - аддон орнатылатын атаулар кеңістігінің атауын.

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}
   
   {tab(Terraform)}
   
   1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).
   1. Кластерді сипаттайтын Terraform конфигурация файлдарыңызғал мыналарды қосыңыз:

      - ресурс [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md);
      - деректер көзі [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
      - деректер көзі [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

      Қажет болса, сілтемелерде келтірілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызғал бейімдеңіз.

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

1. (Опционалды түрде) [Аддонмен жұмыс істеу бойынша Capsule ресми құжаттамасымен танысыңыз](https://capsule.clastix.io/docs/general/tutorial).

{/tab}

{/tabs}

## Орнату кезінде аддонды баптау кодын өңдеу

Аддон кодын өңдеу стандартты орнатуғал және бөлінген worker-түйіндерге орнатуғал қолданылады.

Өрістер сипаттамасымен бірге аддонды баптаудың толық коды [GitHub](https://github.com/projectcapsule/capsule/blob/main/charts/capsule/values.yaml)-та қолжетімді.

{note:err}

`podAnnotations.timestamp` өрістерін немесе оларда берілген мәндерді өшірмеңіз. Бұл өрістер аддонды дұрыс орнату және оның жұмыс істеуі үшін қажет.

{/note}

Кодты өңдегеннен кейін [аддонды орнатуды жалғастырыңыз](#addondy_ornatu).