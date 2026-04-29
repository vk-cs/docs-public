{include(/kz/_includes/_translated_by_ai.md)}

## Аддонды орнату

{note:warn}

Аддонды орнату кезінде ол үшін [стандартты жүктеме теңгергіші](/kz/networks/balancing/concepts/load-balancer#zhukteme_tengergishterinin_turleri) жасалады.

Теңгергішті пайдалану [тарифтеледі](/kz/networks/vnet/tariffication).

{/note}

Аддон үшін [орнатудың бірнеше нұсқасы](../../../../concepts/addons-and-settings/addons#addondardy_ornatu_erekshelikteri) қолжетімді.

Worker-түйіндер топтарында орналастырылатын аддондардың жиынтық [максималды жүйелік талаптарын](../../../../concepts/addons-and-settings/addons) ескеріңіз. Қажет болса, орнату алдында worker-түйіндер топтарын [қолмен масштабтаңыз](../../../scale#scale_worker_nodes) немесе [автоматты масштабтауды баптаңыз](../../../scale#autoscale_worker_nodes).

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
   1. `ingress-nginx` аддонының карточкасындағы **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

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
   1. Кластерді сипаттайтын Terraform конфигурация файлдарыңызға мыналарды қосыңыз:

      - ресурс [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md);
      - деректер көзі [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
      - деректер көзі [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

      Қажет болса, сілтемелерде келтірілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызға бейімдеңіз. Мысалы, `vkcs_kubernetes_addon` ресурсын өзгерту арқылы аддонды баптау кодын өңдей аласыз.

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

1. [Теңгергіштің IP мекенжайын алыңыз](#tengergishtin_ip_mekenzhayyn_alu).

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
   1. `ingress-nginx` аддонының карточкасындағы **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

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

      Бұл ерекшелікті мына өрістер үшін орнатыңыз:

      - `controller.tolerations`;
      - `defaultBackend.tolerations`.

      {/tab}
      
      {tab(Түйін селекторлары)}
      
      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Бұл селекторды мына өрістер үшін орнатыңыз:

      - `controller.nodeSelector`;
      - `defaultBackend.nodeSelector`.

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
   1. Кластерді сипаттайтын Terraform конфигурация файлдарыңызға мыналарды қосыңыз:

      - ресурс [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md);
      - деректер көзі [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
      - деректер көзі [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

   1. `vkcs_kubernetes_addon` ресурсін өзгерту арқылы аддонды баптау кодында қажетті ерекшеліктерді (tolerations) және түйін селекторларын (nodeSelector) орнатыңыз. Аддонды орнату кезінде осы селекторлар мен ерекшеліктері бар барлық Kubernetes ресурстары алдын ала дайындалған бөлінген түйіндер тобына орналастырылады.

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

         - `controller.tolerations`;
         - `defaultBackend.tolerations`.

      {/tab}
      
      {tab(Түйін селекторлары)}
      
       ```yaml
      nodeSelector:
         addonNodes: dedicated
      ```

      Бұл түйін селекторын мына өрістер үшін орнатыңыз:

         - `controller.nodeSelector`;
         - `defaultBackend.nodeSelector`.

      {/tab}

      {/tabs}

      {note:warn}
      Қате берілген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.
      {/note}

   1. (Опционалды түрде) Егер жоғарыдағы сілтемелердегі мысалдарды қолдансаңыз, оларды өз міндетіңізге және Terraform конфигурацияңызға бейімдеңіз.

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

1. [Теңгергіштің IP мекенжайын алыңыз](#tengergishtin_ip_mekenzhayyn_alu).

{/tab}

{tab(Жылдам орнату)}

{note:info}

Жылдам орнату кезінде аддонды баптау коды өңделмейді. Floating IP мекенжайы бар жүктеме теңгергіші жасалады, ал Ingress-контроллер интернеттен қолжетімді болады.

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
   1. `ingress-nginx` аддонының карточкасындағы **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - қолданба атауын;
      - аддон орнатылатын атаулар кеңістігінің атауын;

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}
   
   {tab(Terraform)}
   
   1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).
   1. Кластерді сипаттайтын Terraform конфигурация файлдарыңызға мыналарды қосыңыз:

      - ресурс [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md);
      - деректер көзі [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
      - деректер көзі [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

      Қажет болса, сілтемелерде келтірілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызға бейімдеңіз.

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

1. [Теңгергіштің IP мекенжайын алыңыз](#tengergishtin_ip_mekenzhayyn_alu).

{/tab}

{/tabs}

## Орнату кезінде аддонды баптау кодын өңдеу

{note:info}

- Аддон кодын өңдеу стандартты орнатуға және бөлінген worker-түйіндерге орнатуға қолданылады.
- Өрістер сипаттамасымен бірге аддонды баптаудың толық коды [GitHub](https://github.com/kubernetes/ingress-nginx/blob/main/charts/ingress-nginx/values.yaml)-та қолжетімді.

{/note}

### Ingress-контроллер үшін теңгергіш түрін өзгерту

Аддонды әдепкі параметрлермен орнатқанда Floating IP мекенжайы бар жүктеме теңгергіші жасалады, ал Ingress-контроллер интернеттен қолжетімді болады.

Ingress-контроллер интернеттен қолжетімді болмауы үшін ішкі жүктеме теңгергіші жасалатын аннотацияны көрсетіңіз:

```yaml
---
service:
  annotations:
    {
      "loadbalancer.openstack.org/proxy-protocol": "true",
      "service.beta.kubernetes.io/openstack-internal-load-balancer": "true",
    }
```

Кодты өңдегеннен кейін [аддонды орнатуды жалғастырыңыз](#addondy_ornatu).

### Autoscaler модулі арқылы Ingress-контроллер түйінін жоюға тыйым салу

Autoscaler модулі кластерді автоматты түрде масштабтайды: жүктеме артқанда түйіндерді қосады, азайғанда — жояды. Модульге аддон поды жұмыс істеп тұрған түйінді жоюға тыйым салу үшін под аннотациясында жоюға тыйым көрсету керек:

```yaml
controller:
  podAnnotations:
    cluster-autoscaler.kubernetes.io/safe-to-evict: "false"
```

Кодты өңдегеннен кейін [аддонды орнатуды жалғастырыңыз](#addondy_ornatu).

## Теңгергіштің IP мекенжайын алу

{note:info}

Төменде `ingress-nginx` сервисінің атауы және `ingress-nginx` атаулар кеңістігі пайдаланылады. Егер аддонды қосу кезінде басқа параметрлер таңдалған болса, командаларды түзетіңіз.

{/note}

{tabs}

{tab(Kubernetes Dashboard)}

1. [Кластерге қосылыңыз](../../../../connect/k8s-dashboard) Kubernetes Dashboard көмегімен.
1. Іздеу жолағының сол жағындағы ашылмалы тізімнен `ingress-nginx` атаулар кеңістігін таңдаңыз.
1. **Service → Services** мәзір бөліміне өтіңіз.
1. Қызметтер тізімінен `ingress-nginx-controller` түріндегі `LoadBalancer` сервисін табыңыз.

   **External Endpoints** бағанында теңгергішке тағайындалған Floating IP мекенжайы көрсетіледі.

{/tab}

{tab(kubectl)}

1. [kubectl](../../../../connect/kubectl#check_connection) көмегімен кластерге қосыла алатыныңызға `kubectl`.

1. Команданы орындаңыз:

   ```console
   kubectl get svc ingress-nginx-controller -n ingress-nginx
   ```

   `EXTERNAL-IP` бағанында теңгергішке тағайындалған Floating IP мекенжайы көрсетіледі.

{/tab}

{/tabs}
