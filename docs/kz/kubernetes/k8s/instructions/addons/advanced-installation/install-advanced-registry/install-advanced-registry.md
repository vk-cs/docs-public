{include(/kz/_includes/_translated_by_ai.md)}

## Дайындық кезеңдері

{include(/kz/_includes/_addon-prep.md)}

1. Docker-образдарды сақтау үшін пайдаланылатын VK Object Storage бакетін [жасаңыз](/kz/storage/s3/instructions/buckets/create-bucket).

   Жасау кезінде мыналарды таңдаңыз:

   - **Сақтау класы:** `Hotbox`.
   - **Әдепкі ACL баптауы:** `private`.

   Бакет атауын жазып алыңыз.

1. Осы бакетке қол жеткізу үшін кілт қосыңыз:

   {tabs}
   
   {tab(Жеке кабинет)}
      
   1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
   1. Жобаны таңдаңыз.
   1. **Объектілік сақтау → Бакеттер** бөліміне өтіңіз.
   1. Жасалған бакеттің атауын басыңыз.
   1. **Кілттер** қойындысына өтіңіз.
   1. **Кілт қосу** батырмасын басыңыз.
   1. Кілтке кез келген атау беріңіз.
   1. Қалған баптауларды өзгеріссіз қалдырыңыз.
   1. **Жасау** батырмасын басыңыз.

   {/tab}

   {/tabs}

   **Access Key ID** және **Secret Key** мәндерін жазып алыңыз.

1. Docker тізілімінде авторизациядан өту үшін логин\құпиясөздің шифрланған жұбын келесі пәрменді орындау арқылы жасаңыз:

   ```console
   docker run --entrypoint htpasswd registry:2.7.0 -Bbn <логин> <пароль>
   ```

   Пәрмен шығысын (`<логин>:<зашифрованный пароль>` форматында) жазып алыңыз.

1. [Floating IP-мекенжайын қосыңыз](/kz/networks/vnet/instructions/ip/floating-ip#add) немесе бұрыннан бар байланыстырылмаған Floating IP-мекенжайын [табыңыз](/kz/networks/vnet/instructions/ip/floating-ip#view).

   Осы IP-мекенжайын жазып алыңыз. Ол Docker тізіліміне қол жеткізу үшін пайдаланылады.

## Аддонды орнату

{note:warn}
Аддонды орнату кезінде ол үшін [стандартты жүктеме теңгергіші](/kz/networks/balancing/concepts/load-balancer#zhukteme_tengergishterinin_turleri) жасалады. Теңгергішті пайдалану [тарифтеледі](/kz/networks/vnet/tariffication).
{/note}

Аддон үшін [орнатудың бірнеше нұсқасы](../../../../concepts/addons-and-settings/addons#addondardy_ornatu_erekshelikteri) қолжетімді:

- стандартты орнату;
- бөлінген worker-түйіндерге орнату.

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
   1. `docker-registry` аддонының карточкасындағы **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - қосымша атауын;
      - аддон орнатылатын аттар кеңістігінің атауын.

   1. [аддонды баптау кодын](#ornatu_kezinde_addondy_baptau_kodyn_ondeu) өңдеңіз.

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

1. [Тізілімге қол жеткізу деректерін алыңыз](#tizilimge_kosylu).

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
   1. `docker-registry` аддонының карточкасындағы **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - қосымша атауын;
      - аддон орнатылатын аттар кеңістігінің атауын;

   1. [аддонды баптау кодын](#ornatu_kezinde_addondy_baptau_kodyn_ondeu) өңдеңіз.

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

1. [Тізілімге қол жеткізу деректерін алыңыз](#tizilimge_kosylu).

{/tab}

{/tabs}

## Орнату кезінде аддонды баптау кодын өңдеу

{note:info}

- Аддонды баптау кодын өңдеу кезінде [бұрын алынған](#daiyndyk_kezenderi) мәліметтерді пайдаланыңыз.
- Өрістер сипаттамасымен бірге аддонды баптау кодының толық нұсқасы [GitHub](https://github.com/twuni/docker-registry.helm/blob/main/values.yaml) сайтында қолжетімді.

{/note}

Мыналарды орнатыңыз:

1. Docker тізілімінде авторизациядан өту үшін деректемелерді:

   ```yaml
   secrets:
     htpasswd: "<логин>:<зашифрованный пароль>"
   ```

1. Docker-образдарды сақтауғал арналған бакетке қол жеткізу деректемелерін:

   ```yaml
   secrets:
     s3:
       secretRef: ""
       accessKey: "<значение Access Key ID>"
       secretKey: "<значение Secret Key>"
   ```

   ```yaml
   s3:
     bucket: <имя созданного бакета>
   ```

1. Сервиске қол жеткізу ұсынылатын теңгергіш үшін IP-мекенжайын:

   ```yaml
   service:
     name: registry
     type: LoadBalancer
     loadBalancerIP: <выбранный Floating IP-адрес>
   ```

Кодты өңдегеннен кейін [аддонды орнатуды жалғастырыңыз](#addondy_ornatu).

## Тізілімге қосылу

1. Аддонды орнату кезінде баптау кодында пайдаланылған деректерді жазып алыңыз:

   - Логин.
   - Құпиясөз.
   - Тізілімнің IP-мекенжайы. Docker тізілімінің URL мекенжайы келесі түрде болады: `<IP-адрес>:5000`.

1. [Docker тізіліміне қосылыңыз](../../../../connect/docker-registry).