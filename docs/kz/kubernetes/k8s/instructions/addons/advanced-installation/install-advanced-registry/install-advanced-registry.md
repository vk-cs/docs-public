# {heading(Docker Registry)[id=k8s-install-advanced-registry]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Дайындық қадамдары)[id=k8s-install-advanced-registry-prepare]}

{include(/kz/_includes/_addon-prep.md)}

1. Docker-образдарды сақтау үшін пайдаланылатын VK Object Storage бакетін [жасаңыз](../../../../../../storage/s3/instructions/buckets/create-bucket).

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

1. {linkto(../../../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-add)[text=Floating IP-мекенжайын қосыңыз]} немесе бұрыннан бар байланыстырылмаған Floating IP-мекенжайын {linkto(../../../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-view)[text=табыңыз]}.

   Осы IP-мекенжайын жазып алыңыз. Ол Docker тізіліміне қол жеткізу үшін пайдаланылады.

## {heading(Аддонды орнату)[id=k8s-install-advanced-registry-install]}

{note:warn}

Аддонды орнату кезінде ол үшін {linkto(../../../../../../networks/balancing/concepts/load-balancer#balancing-load-balancer-types)[text=стандартты жүктеме теңгергіші]} жасалады. Теңгергішті пайдалану {linkto(../../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифтеледі]}.

{/note}

Аддон үшін {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-install-features)[text=орнатудың бірнеше нұсқасы]} қолжетімді:

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

   1. {linkto(#k8s-install-advanced-registry-edit-code)[text=аддонды баптау кодын]} өңдеңіз.

      {note:warn}

      Дұрыс берілмеген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.

      {/note}

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

   {tab(Terraform)}

   1. Егер әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](../../../../../../tools-for-using-services/terraform/quick-start).
   1. Кластерді сипаттайтын Terraform конфигурация файлдарыңызға мыналарды қосыңыз:

      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) ресурсын;
      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) дереккөзін;
      - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) дереккөзін.

      Қажет болса, сілтемелер бойынша берілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызға бейімдеңіз. Мысалы, `vkcs_kubernetes_addon` ресурсын өзгерту арқылы аддонды баптау кодын өңдей аласыз.

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

1. {linkto(#k8s-install-advanced-registry-connect)[text=Тізілімге қол жеткізу деректерін алыңыз]}.

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

      Егер мұндай топ жоқ болса — {linkto(../../../manage-node-group#k8s-manage-node-group-add-group)[text=оны қосыңыз]}.

   1. Егер әлі жасалмаса, осы түйіндер тобы үшін {linkto(../../../manage-node-group#k8s-manage-node-group-labels-taints)[text=мыналарды орнатыңыз]}:

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

   1. {linkto(#k8s-install-advanced-registry-edit-code)[text=аддонды баптау кодын]} өңдеңіз.

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

   1. Егер әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](../../../../../../tools-for-using-services/terraform/quick-start).
   1. Кластерді сипаттайтын Terraform конфигурация файлдарыңызға мыналарды қосыңыз:

      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) ресурсын;
      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) дереккөзін;
      - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) дереккөзін.

      Қажет болса, сілтемелер бойынша берілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызға бейімдеңіз. Мысалы, `vkcs_kubernetes_addon` ресурсын өзгерту арқылы аддонды баптау кодын өңдей аласыз.

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

1. {linkto(#k8s-install-advanced-registry-connect)[text=Тізілімге қол жеткізу деректерін алыңыз]}.

{/tab}

{/tabs}

## {heading(Орнату кезінде аддонды баптау кодын өңдеу)[id=k8s-install-advanced-registry-edit-code]}

{note:info}

- Аддонды баптау кодын өңдеу кезінде {linkto(#k8s-install-advanced-registry-prepare)[text=бұрын алынған]} мәліметтерді пайдаланыңыз.
- Өрістер сипаттамасымен бірге аддонды баптау кодының толық нұсқасы [GitHub](https://github.com/twuni/docker-registry.helm/blob/main/values.yaml) сайтында қолжетімді.

{/note}

Мыналарды орнатыңыз:

1. Docker тізілімінде авторизациядан өту үшін деректемелерді:

   ```yaml
   secrets:
     htpasswd: "<логин>:<зашифрованный пароль>"
   ```

1. Docker-образдарды сақтауға арналған бакетке қол жеткізу деректемелерін:

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

Кодты өңдегеннен кейін {linkto(k8s-install-advanced-registry-install)[text=аддонды орнатуды жалғастырыңыз]}.

## {heading(Тізілімге қосылу)[id=k8s-install-advanced-registry-connect]}

1. Аддонды орнату кезінде баптау кодында пайдаланылған деректерді жазып алыңыз:

   - Логин.
   - Құпиясөз.
   - Тізілімнің IP-мекенжайы. Docker тізілімінің URL мекенжайы келесі түрде болады: `<IP-адрес>:5000`.

1. {linkto(../../../../connect/docker-registry#k8s-docker-registry)[text=Docker тізіліміне қосылыңыз]}.
