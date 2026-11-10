# {heading(GPU Operator)[id=k8s-install-advanced-gpu-operator]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifndef(public)}
NVIDIA GPU Operator аддоны Kubernetes кластеріне NVIDIA драйверлерін, device plugin плагинінің (device plugin) құрылғыларын және GPU-мен жабдықталған түйіндер белгілерін орнатады. Аддон машиналық оқыту және үлкен деректерді өңдеу үшін қолданылады.
{/ifndef}

{ifdef(public)}

## {heading(Дайындық қадамдары)[id=k8s-install-advanced-gpu-operator-prep]}

{include(/kz/_includes/_addon-prep.md)}
{/ifdef}

{ifdef(public)}

## {heading(Аддонды орнату)[id=k8s-install-advanced-gpu-operator-install]}

{linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-gpu-operator)[text=GPU Operator]} аддоны GPU-мен жабдықталған worker-түйіндерде жұмыс істейді, сондықтан ол үшін тек {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-install-features)[text=жеке түйіндерге орнату]} қолжетімді. Кластерге GPU-мен жабдықталған worker-түйіндерді қосу мүмкіндігі болуы үшін [Cloud GPU қызметін қосыңыз](https://cloud.vk.ru/cloud-gpu/).
{/ifdef}
{ifndef(public)}
Аддон тек GPU-мен жабдықталған worker-түйіндерде жұмыс істейді, сондықтан ол жеке түйіндер тобына орнатылады.
{/ifndef}

1. Аддонды орнатуға арналған жеке worker-түйіндер тобын дайындаңыз, егер бұл әлі жасалмаса:

   {ifdef(public)}
   {tabs}

   {tab(Жеке кабинет)}

   1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app/).
   {/ifdef}
   {ifndef(public)}
   1. {var(cloud)} жеке кабинетіне {linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=өтіңіз]}.
   {/ifndef}
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Кластеры Kubernetes → Кластеры Kubernetes** бөліміне өтіңіз.
   1. Тізімнен қажетті кластерді табыңыз.

   1. Кластерде аддондар орналастырылатын GPU-мен жабдықталған жеке worker-түйіндер тобы бар екеніне көз жеткізіңіз.

      Мұндай топ болмаса — {linkto(../../../manage-node-group#k8s-manage-node-group-add-group)[text=топты қосыңыз]}.

   {ifdef(public)}
   1. (Қалауыңыз бойынша) Егер GPU-мен жабдықталған түйіндерде тек GPU ресурстарын қажет ететін процестер орындалуы керек болса, осы түйіндер тобына шектеу (taint) {linkto(../../../manage-node-group#k8s-manage-node-group-labels-taints)[text=орнатыңыз]}:
   {/ifdef}
   {ifndef(public)}
   1. (Қалауыңыз бойынша) Егер GPU-мен жабдықталған түйіндерде тек GPU ресурстарын қажет ететін процестер орындалуы керек болса, осы түйіндер тобына шектеу (taint) орнатыңыз:
   {/ifndef}

      - `NoSchedule` әсері (effect);
      - `nvidia.com` кілті;
      - `gpu` мәні.

   {ifdef(public)}
   {/tab}

   {/tabs}
   {/ifdef}

1. Аддонды орнатыңыз:

   {ifdef(public)}
   {tabs}

   {tab(Жеке кабинет)}

   1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app/).
   {/ifdef}
   {ifndef(public)}
   1. {var(cloud)} жеке кабинетіне {linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=өтіңіз]}.
   {/ifndef}
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Кластеры Kubernetes → Кластеры Kubernetes** бөліміне өтіңіз.
   1. Қажетті кластердің атын басыңыз.
   1. **Аддоны** қойындысына өтіңіз.
   {ifdef(public)}
   1. `gpu-operator` аддонының карточкасындағы **Установить** түймесін басып, **Установить аддон** түймесін басыңыз.
   1. (Қалауыңыз бойынша) Өзгертіңіз:

      - таңдалған нұсқаны;
      - қосымшаның атауын;
      - аддон орнатылатын атаулар кеңістігінің атауын;
      - {linkto(#k8s-install-advanced-gpu-operator-edit-code)[text=аддонды баптау кодын]}.

        {note:warn}
        Дұрыс берілмеген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.
        {/note}
   {/ifdef}
   {ifndef(public)}
   1. `gpu-operator` аддонының карточкасындағы **Установить** түймесін басыңыз.
   1. **Версия** өрісінде аддонның қажетті нұсқасын таңдап, **Установить аддон** түймесін басыңыз.
   1. Қажет болса, қосымшаның атауын және аддон орнатылатын атаулар кеңістігінің атауын өзгертіңіз.
   1. **Код настройки аддона** өрісінде орнату бейнелерінің реестрін көрсетіңіз. `node-feature-discovery` секциясында `repository` және `tag` параметрлерін беріңіз:

      ```yaml
      node-feature-discovery:
        image:
          repository: "<АДРЕС_РЕЕСТРА_ИНСТАЛЛЯЦИИ>/nfd/node-feature-discovery"
          tag: "v0.16.6"
        enableNodeFeatureApi: true
        priorityClassName: system-node-critical
      ```

      Мұнда: `<АДРЕС_РЕЕСТРА_ИНСТАЛЛЯЦИИ>` — орнату бейнелерінің реестрінің адресі.

      {note:err}
      `"mcs.mail.ru/gpu-exists"` өрісін және оның `true` мәнін өшірмеңіз.

      Бұл өріс `nfd-worker` плагинінің тек GPU-мен жабдықталған түйіндерге орнатылуын анықтайды. Өрісті және мәнді өшірсеңіз, `nfd-worker` және онымен байланысты плагиндер кластердің барлық түйіндеріне орнатылады және ресурстар тұтынуы артады.
      {/note}
   {/ifndef}

   1. **Установить аддон** түймесін басыңыз.

      Аддонның кластерге орнатылуы басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {ifdef(public)}
   {/tab}

   {tab(Terraform)}

   1. [Terraform орнатыңыз және ортаны баптаңыз](../../../../../../tools-for-using-services/terraform/quick-start), егер бұл әлі жасалмаса.
   1. Кластерді сипаттайтын Terraform конфигурациялық файлдарыңызға қосыңыз:

      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) ресурсы;
      - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) деректер көзі;
      - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) деректер көзі.

      Қажет болса, сілтемелерде берілген ресурстар мен деректер көздерін қолдану мысалдарын өзіңіздің міндетіңізге және Terraform конфигурациясына бейімдеңіз.

   1. Конфигурациялық файлдар дұрыс екеніне және қажетті өзгерістер бар екеніне көз жеткізіңіз:

      ```console
      terraform validate && terraform plan
      ```

   1. Өзгерістерді қолданыңыз:

      ```console
      terraform apply
      ```

   {/tab}

   {/tabs}
   {/ifdef}

1. (Қалауыңыз бойынша) [Аддонмен жұмыс істеу бойынша NVIDIA ресми құжаттамасымен танысыңыз](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html).

{ifdef(public)}

## {heading(Орнату кезінде аддонды баптау кодын өңдеу)[id=k8s-install-advanced-gpu-operator-edit-code]}

Аддонды баптау кодының толық мәтіні өрістер сипаттамасымен бірге [GitHub](https://github.com/NVIDIA/k8s-device-plugin?tab=readme-ov-file#nvidia-device-plugin-for-kubernetes) жазылуында қолжетімді.

{note:err}
`"mcs.mail.ru/gpu-exists"` өрісін және оның `true` мәнін өшірмеңіз.

Бұл өріс nfd-worker плагинінің тек GPU-мен жабдықталған түйіндерге орнатылуын анықтайды. Өрісті және мәнді өшірсеңіз, nfd-worker және онымен байланысты плагиндер кластердің барлық түйіндеріне орнатылады, бұл ресурстардың артық тұтынылуына әкеледі.
{/note}

Кодты өңдегеннен кейін {linkto(#k8s-install-advanced-gpu-operator-install)[text=аддонды орнатуды жалғастырыңыз]}.
{/ifdef}