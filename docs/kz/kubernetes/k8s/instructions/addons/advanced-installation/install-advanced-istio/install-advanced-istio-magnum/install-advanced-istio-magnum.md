# {heading(Istio бірінші буын кластерлерінде)[id=k8s-install-advanced-istio-magnum]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Дайындық қадамдары)[id=k8s-install-advanced-istio-magnum-prepare]}

{include(/kz/_includes/_addon-prep.md)}
1. {linkto(.//../install-advanced-monitoring#k8s-install-advanced-monitoring)[text=Аддонды орнатыңыз]} `kube-prometheus-stack`.

## {heading(Аддонды орнату)[id=k8s-install-advanced-istio-magnum-install]}

Аддон үшін {linkto(../../../../../concepts/addons-and-settings/addons#k8s-addons-install-features)[text=орнатудың бірнеше нұсқасы]} қолжетімді.

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
    1. `istio` аддонының картасындағы **Аддонды орнату** батырмасын басыңыз.
    1. Қажет болса, мыналарды өңдеңіз:

        - қолданба атауы;
        - аддон орнатылатын атаулар кеңістігінің атауы;
        - аддонды баптау коды.

          {note:warn}

          Қате берілген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.

          {/note}

    1. **Аддонды орнату** батырмасын басыңыз.

       Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

   {tab(Terraform)}

    1. Егер бұл әлі жасалмаса, {linkto(/kz/tools-for-using-services/terraform/quick-start#terraform-qs)[text=Terraform орнатып, ортаны баптаңыз]}.
    1. Кластерді сипаттайтын Terraform конфигурациялық файлдарыңызға мыналарды қосыңыз:

        - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) ресурсын;
        - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) дереккөзін;
        - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) дереккөзін.

       Қажет болса, сілтемелерде келтірілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызға бейімдеңіз. Мысалы, `vkcs_kubernetes_addon` ресурсын өзгерту арқылы аддонды баптау кодын өңдей аласыз.

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

1. Қажет болса, қосымша {linkto(../../install-advanced-kiali#k8s-install-advanced-kiali)[text=`kiali` аддонын орнатыңыз]}.

{/tab}

{tab(Бөлінген worker-түйіндерге орнату)}

1. Егер бұл әлі жасалмаса, аддонды орнатуға арналған бөлінген worker-түйіндер тобын дайындаңыз:

   {tabs}

   {tab(Жеке кабинет)}

    1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
    1. Қажетті кластер орналасқан жобаны таңдаңыз.
    1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
    1. Тізімнен қажетті кластерді табыңыз.

    1. Кластерде аддондар орналастырылатын бөлінген worker-түйіндер тобы бар екеніне көз жеткізіңіз.

       Егер мұндай топ болмаса — {linkto(../../../../manage-node-group#k8s-manage-node-group-add-group)[text=оны қосыңыз]}.

    1. Егер бұл әлі жасалмаса, осы түйіндер тобы үшін {linkto(../../../../manage-node-group#k8s-manage-node-group-labels-taints)[text=мыналарды орнатыңыз]}:

        - Белгі (label): кілт `addonNodes`, мәні `dedicated`.
        - Шектеу (taint): әсері `NoSchedule`, кілт `addonNodes`, мәні `dedicated`.

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
    1. `istio` аддонының картасындағы **Аддонды орнату** батырмасын басыңыз.
    1. Қажет болса, мыналарды өңдеңіз:

        - қолданба атауы;
        - аддон орнатылатын атаулар кеңістігінің атауы;
        - аддонды баптау коды.

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

    1. Егер бұл әлі жасалмаса, {linkto(/kz/tools-for-using-services/terraform/quick-start#terraform-qs)[text=Terraform орнатып, ортаны баптаңыз]}.
    1. Кластерді сипаттайтын Terraform конфигурациялық файлдарыңызға мыналарды қосыңыз:

        - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) ресурсын;
        - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) дереккөзін;
        - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) дереккөзін.

       Қажет болса, сілтемелерде келтірілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызға бейімдеңіз.

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

1. Қажет болса, қосымша {linkto(../../install-advanced-kiali#k8s-install-advanced-kiali)[text=`kiali` аддонын орнатыңыз]}.

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
    1. Егер кластерде орнатылған аддондар бар болса, **Аддон қосу** батырмасын басыңыз.
    1. `istio` аддонының картасындағы **Аддонды орнату** батырмасын басыңыз.
    1. Қажет болса, мыналарды өңдеңіз:

        - қолданба атауы;
        - аддон орнатылатын атаулар кеңістігінің атауы;

    1. **Аддонды орнату** батырмасын басыңыз.

       Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

   {tab(Terraform)}

    1. Егер бұл әлі жасалмаса, {linkto(/kz/tools-for-using-services/terraform/quick-start#terraform-qs)[text=Terraform орнатып, ортаны баптаңыз]}.
    1. Кластерді сипаттайтын Terraform конфигурациялық файлдарыңызға мыналарды қосыңыз:

        - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) ресурсын;
        - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) дереккөзін;
        - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) дереккөзін.

       Қажет болса, сілтемелерде келтірілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызға бейімдеңіз.

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

1. Қажет болса, қосымша {linkto(../../install-advanced-kiali#k8s-install-advanced-kiali)[text=`kiali` аддонын орнатыңыз]}.

{/tab}

{/tabs}
