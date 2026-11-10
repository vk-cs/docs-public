# {heading(NVIDIA GPU-ға арналған DRA Driver)[id=mk8s-install-advanced-dra]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{note:warn}
Аддонның жұмыс істеуі үшін {linkto(../../../../concepts/versions/version-support#mk8s-version-support)[text=1.34 нұсқасы]} немесе одан жоғары Kubernetes қажет.
{/note}

## {heading(Дайындық қадамдары)[id=mk8s-install-advanced-dra-prep]}

{include(/kz/_includes/_addon-prep.md)}

## {heading(Аддонды орнату)[id=mk8s-install-advanced-dra-install]}

{linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-dra)[text=DRA Driver for NVIDIA GPUs]} аддоны {linkto(../../../../concepts/flavors#mk8s-flavors-gpu)[text=GPU бар worker-түйіндерде]} жұмыс істейді, сондықтан оған тек {linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-install-features)[text=бөлінген түйіндерге орнату]} қолжетімді. Кластерге GPU бар worker-түйіндерді қосу үшін алдымен Cloud GPU қызметін {linkto(../../../../../../computing/gpu/connect#gpu-connect)[text=қосыңыз]}.

1. Аддонды орнатуға арналған бөлінген worker-түйіндер тобын дайындаңыз, егер бұл әлі жасалмаса:

   {tabs}
   {tab(Жеке кабинет)}

    1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app/).
    1. Қажетті кластер орналасқан жобаны таңдаңыз.
    1. **Кластеры Kubernetes → Кластеры Kubernetes** бөліміне өтіңіз.
    1. Тізімнен қажетті кластерді табыңыз.

    1. Кластерде аддондар орналастырылатын GPU бар бөлінген worker-түйіндер тобы бар екенін тексеріңіз.

       Мұндай топ болмаса — {linkto(../../../manage-node-group#mk8s-manage-node-group-add-group)[text=оны қосыңыз]}.

    1. (Қалауыңыз бойынша) Егер GPU бар түйіндерде тек GPU ресурстарын қажет ететін процестер орындалуы тиіс болса, осы түйіндер тобы үшін шектеуді (taint) {linkto(../../../manage-node-group#mk8s-manage-node-group-labels-taints)[text=орнатыңыз]}:

        - `NoSchedule` эффектісі;
        - `nvidia.com/gpu` кілті;
        - `gpu` мәні.

   {/tab}
   {/tabs}

1. Аддонды орнатыңыз:

   {tabs}
   {tab(Жеке кабинет)}

    1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app/).
    1. Қажетті кластер орналасқан жобаны таңдаңыз.
    1. **Кластеры Kubernetes → Кластеры Kubernetes** бөліміне өтіңіз.
    1. Қажетті кластердің атауын басыңыз.
    1. **Аддоны** қойындысына өтіңіз.
    1. `dra-driver-nvidia-gpu` аддонының карточкасындағы **Установить** түймесін басып, **Установить аддон** түймесін басыңыз.
    1. (Қалауыңыз бойынша) Өңдеріңіз:

        - таңдалған нұсқаны;
        - қолданбаның атауын;
        - аддон орнатылатын namespace атауын;
        - {linkto(#mk8s-install-advanced-dra-edit-code)[text=аддонның баптау кодын]}.

          {note:warn}
          Дұрыс берілмеген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.
          {/note}

    1. **Установить аддон** түймесін басыңыз.

       Аддонның кластерге орнатылуы басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}
   {/tabs}

1. (Қалауыңыз бойынша) [GPU-ға арналған DRA-драйверімен жұмыс істеу бойынша ресми құжаттамамен танысыңыз](https://dra-driver-nvidia-gpu.sigs.k8s.io/docs/).

## {heading(Орнату кезінде аддонның баптау кодын өңдеу)[id=mk8s-install-advanced-dra-edit-code]}

Аддонның баптау кодының толық мәтіні өрістер сипаттамасымен бірге [GitHub](https://github.com/kubernetes-sigs/dra-driver-nvidia-gpu/blob/v0.5.0/deployments/helm/dra-driver-nvidia-gpu/values.yaml) сайтта қолжетімді. 

{note:err}
`"mcs.mail.ru/gpu-exists"` өрісін және оның `true` мәнін өшіріңіз.

Бұл өріс nfd-worker плагинінің тек GPU бар түйіндерге орнатылуына жауап береді. Егер өріс пен мән өшірілсе, nfd-worker кластердің барлық түйіндеріне орнатылады, бұл ресурстардың шығынын арттырады.
{/note}

Баптау кодын өңдегеннен кейін аддонды орнатуды жалғастырыңыз.