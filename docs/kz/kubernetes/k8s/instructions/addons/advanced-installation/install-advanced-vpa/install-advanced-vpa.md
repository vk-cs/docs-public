# {heading(Vertical Pod Autoscaler)[id=k8s-install-advanced-vpa]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:info}
Бұл аддон тек {linkto(../../../../concepts/cluster-generations#k8s-cluster-generations)[text=бірінші буын]} кластерлері үшін қолжетімді.
{/note}

## {heading(Дайындық қадамдары)[id=k8s-install-advanced-vpa-prepare]}

{include(/kz/_includes/_addon-prep.md)}

## {heading(Аддонды орнату)[id=k8s-install-advanced-vpa-install]}

Аддон үшін {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-install-features)[text=орнатудың бірнеше нұсқасы]} қолжетімді.

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
    1. `vpa` аддонының карточкасындағы **Орнату** батырмасын басыңыз.
    1. Ашылмалы тізімнен аддонның қажетті нұсқасын таңдаңыз.
    1. **Аддонды орнату** батырмасын басыңыз.
    1. Қажет болса, мыналарды өңдеңіз:

        - таңдалған нұсқаны;
        - қосымша атауын;
        - аддон орнатылатын аттар кеңістігінің атауын;
        - {linkto(#k8s-install-advanced-vpa-edit-code)[text=аддонды баптау кодын]}.

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

1. (Опционалды) [Аддонмен жұмыс істеу бойынша VPA ресми құжаттамасымен танысыңыз](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler#readme).

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
    1. `vpa` аддонының карточкасындағы **Орнату** батырмасын басыңыз.
    1. Ашылмалы тізімнен аддонның қажетті нұсқасын таңдаңыз.
    1. **Аддонды орнату** батырмасын басыңыз.
    1. Қажет болса, мыналарды өңдеңіз:

        - таңдалған нұсқаны;
        - қосымша атауын;
        - аддон орнатылатын аттар кеңістігінің атауын;
        - {linkto(#k8s-install-advanced-vpa-edit-code)[text=аддонды баптау кодын]}.

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

       Қажет болса, сілтемелер бойынша берілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызға бейімдеңіз.

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

1. (Опционалды) [Аддонмен жұмыс істеу бойынша VPA ресми құжаттамасымен танысыңыз](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler#readme).

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
    1. Егер кластерде бұрыннан орнатылған аддондар болса, **Аддон қосу** батырмасын басыңыз.
    1. `vpa` аддонының карточкасындағы **Орнату** батырмасын басыңыз.
    1. Ашылмалы тізімнен аддонның қажетті нұсқасын таңдаңыз.
    1. **Аддонды орнату** батырмасын басыңыз.
    1. Қажет болса, мыналарды өңдеңіз:

        - таңдалған нұсқаны;
        - қосымша атауын;
        - аддон орнатылатын аттар кеңістігінің атауын.

    1. **Аддонды орнату** батырмасын басыңыз.

       Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

   {tab(Terraform)}

    1. Егер әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](../../../../../../tools-for-using-services/terraform/quick-start).
    1. Кластерді сипаттайтын Terraform конфигурация файлдарыңызға мыналарды қосыңыз:

        - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) ресурсын;
        - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) дереккөзін;
        - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) дереккөзін.

       Қажет болса, сілтемелер бойынша берілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызға бейімдеңіз.

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

1. (Опционалды) [Аддонмен жұмыс істеу бойынша VPA ресми құжаттамасымен танысыңыз](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler#readme).

{/tab}

{/tabs}

## {heading(Орнату кезінде аддонды баптау кодын өңдеу)[id=k8s-install-advanced-vpa-edit-code]}

Аддон кодын өңдеу стандартты орнату және бөлінген worker-түйіндерге орнату үшін қолданылады.

Өрістер сипаттамасымен бірге аддонды баптау кодының толық нұсқасы [GitHub](https://github.com/kubernetes/autoscaler/blob/master/vertical-pod-autoscaler/docs/flags.md) сайтында қолжетімді.

Кодты өңдегеннен кейін {linkto(#k8s-install-advanced-vpa-install)[text=аддонды орнатуды жалғастырыңыз]}.
