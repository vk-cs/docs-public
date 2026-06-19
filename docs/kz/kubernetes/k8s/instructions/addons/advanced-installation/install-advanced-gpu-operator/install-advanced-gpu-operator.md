# {heading(GPU Operator)[id=k8s-install-advanced-gpu-operator]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Дайындық қадамдары)[id=k8s-install-advanced-gpu-operator-prepare]}

{include(/kz/_includes/_addon-prep.md)}

## {heading(Аддонды орнату)[id=k8s-install-advanced-gpu-operator-install]}

{linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-gpu-operator)[text=GPU Operator]} аддоны GPU бар worker-түйіндерде жұмыс істейді, сондықтан ол үшін тек {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-install-features)[text=бөлінген түйіндерге орнату]} қолжетімді. Кластерге GPU бар worker-түйіндерді қоса алу үшін Cloud GPU сервисін [қосыңыз](https://cloud.vk.com/cloud-gpu/).

1. Егер бұл әлі жасалмаса, аддонды орнату үшін бөлінген worker-түйіндер тобын дайындаңыз:

   {tabs}
   
   {tab(Жеке кабинет)}
      
   1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Тізімнен қажетті кластерді табыңыз.

   1. Кластерде аддондар орналастырылатын GPU бар бөлінген worker-түйіндер тобы бар екеніне көз жеткізіңіз.

      Егер мұндай топ жоқ болса — {linkto(../../../manage-node-group#k8s-manage-node-group-add-group)[text=оны қосыңыз]}.

   1. (Опционалды түрде) Егер GPU бар түйіндерде тек GPU ресурстарын талап ететін процестер ғана орындалуы тиіс болса, осы түйіндер тобы үшін {linkto(../../../manage-node-group#k8s-manage-node-group-labels-taints)[text=шектеуді (taint) орнатыңыз]}:

      - эффект `NoSchedule`;
      - ключ `nvidia.com`;
      - значение `gpu`.

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
   1. `gpu-operator` аддонының карточкасындағы **Орнату** батырмасын басыңыз.
   1. Ашылмалы тізімнен аддонның қажетті нұсқасын таңдаңыз.
   1. **Аддонды орнату** батырмасын басыңыз.
      
      Қажет болса, мыналарды өңдеңіз:

         - таңдалған нұсқаны;
         - қолданба атауын;
         - аддон орнатылатын атаулар кеңістігінің атауын;
         - {linkto(#k8s-install-advanced-gpu-operator-edit-code)[text=аддонды баптау коды]}.

            {note:warn}

            Қате берілген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.

            {/note}

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}
   
   {tab(Terraform)}
   
   1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](../../../../../../tools-for-using-services/terraform/quick-start).
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

1. (Опционалды түрде) [Аддонмен жұмыс істеу бойынша NVIDIA ресми құжаттамасымен танысыңыз](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html).

## {heading(Орнату кезінде аддонды баптау кодын өңдеу)[id=k8s-install-advanced-gpu-operator-edit-code]}

Өрістер сипаттамасымен бірге аддонды баптаудың толық коды [GitHub]-та қолжетімді(https://github.com/NVIDIA/k8s-device-plugin?tab=readme-ov-file#nvidia-device-plugin-for-kubernetes).

{note:err}

`"mcs.mail.ru/gpu-exists"` өрісін және оның `true` мәнін өшірмеңіз.

Бұл өріс nfd-worker плагинін тек GPU бар түйіндерге орнатуға жауап береді. Егер өріс пен мән өшірілсе, nfd-worker және онымен байланысты плагиндер кластердің барлық түйіндеріне орнатылады, бұл ресурстарды көбірек тұтынуға әкеледі.

{/note}

Кодты өңдегеннен кейін {linkto(#k8s-install-advanced-gpu-operator-install)[text=аддонды орнатуды жалғастырыңыз]}.