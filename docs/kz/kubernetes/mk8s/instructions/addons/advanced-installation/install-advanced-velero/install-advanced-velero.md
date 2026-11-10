# {heading(Velero)[id=mk8s-install-advanced-velero]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(Дайындық қадамдар)[id=mk8s-install-advanced-velero-prep]}

{include(/kz/_includes/_addon-prep.md)}

1. Velero жасайтын резервтік көшірмелер сақталатын {linkto(../../../../../../storage/s3/concepts/about#s3-concepts-about)[text={var(s3)}]} қызметінде қойманы дайындаңыз. Ол үшін:
   1. `Hotbox` сақтау класымен {linkto(../../../../../../storage/s3/instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=бакет жасаңыз]}.
   1. {var(s3)} қызметінде {linkto(../../../../../../storage/s3/instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=аккаунт жасаңыз]} және құпия кілтті (**Secret Key**) мен кілт идентификаторын (**Access Key ID**) өз құрылғыңызда сақтаңыз.

   Аддонды орнату кезінде осы деректерді пайдаланыңыз.

## {heading(Аддонды орнату)[id=mk8s-install-advanced-velero-install]}

{linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-velero)[text=Velero]} аддоны үшін {linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-install-features)[text=орнатудың бірнеше нұсқасы]} қолжетімді.

{tabs}

{tab(Стандартты орнату)}

1. Аддонды орнатыңыз:

   {tabs}

   {tab(Жеке кабинет)}

    1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app/).
    1. Қажетті кластер орналасқан жобаны таңдаңыз.
    1. **Кластеры Kubernetes → Кластеры Kubernetes** бөліміне өтіңіз.
    1. Қажетті кластердің атауын басыңыз.
    1. **Аддоны** қойындысына өтіңіз.
    1. `velero` аддонының карточкасындағы **Установить** түймесін басып, **Установить аддон** түймесін басыңыз.

   {include(../../../../../../_includes/_k8s_velero_configure.md)[tags=configure]}

    1. **Установить аддон** түймесін басыңыз.

       Аддонның кластерге орнатылуы басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

   {/tabs}

{include(../../../../../../_includes/_k8s_velero_configure.md)[tags=optional]}

{/tab}

{tab(Арнайы worker-түйіндерге орнату)}

1. Аддонды орнатуға арналған арнайы worker-түйіндер тобын дайындаңыз, егер бұл әлі жасалмаған болса:

   {tabs}

   {tab(Жеке кабинет)}

    1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app/).
    1. Қажетті кластер орналасқан жобаны таңдаңыз.
    1. **Кластеры Kubernetes → Кластеры Kubernetes** бөліміне өтіңіз.
    1. Тізімнен қажетті кластерді табыңыз.

    1. Кластерде аддондар орналасатын арнайы worker-түйіндер тобы бар екеніне көз жеткізіңіз.

       Мұндай топ болмаса, {linkto(../../../manage-node-group#mk8s-manage-node-group-add-group)[text=оны қосыңыз]}.

    1. Егер бұл әлі жасалмаған болса, осы түйіндер тобы үшін мыналарды {linkto(../../../manage-node-group#mk8s-manage-node-group-labels-taints)[text=орнатыңыз]}:

        - Белгі (label): кілті `addonNodes`, мәні `dedicated`.
        - Шектеу (taint): эффектісі `NoSchedule`, кілті `addonNodes`, мәні `dedicated`.

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
    1. `velero` аддонының карточкасындағы **Установить** түймесін басып, **Установить аддон** түймесін басыңыз.

    {include(../../../../../../_includes/_k8s_velero_configure.md)[tags=configure]}

    1. Аддонды баптау кодында қажетті шектеулерді (tolerations) және түйіндерді таңдаушыларды (nodeSelector) орнатыңыз:

       {tabs}

       {tab(Шектеулер)}

       ```yaml
       tolerations:
         - key: "addonNodes"
           operator: "Equal"
           value: "dedicated"
           effect: "NoSchedule"
       ```

       Бұл шектеуді `tolerations` өрісіне орнатыңыз.

       {/tab}

       {tab(Түйіндерді таңдаушылар)}

       ```yaml
       nodeSelector:
         addonNodes: dedicated
       ```

       Бұл таңдаушыны `nodeSelector` өрісіне орнатыңыз.

       {/tab}

       {/tabs}

    1. **Установить аддон** түймесін басыңыз.

       Аддонның кластерге орнатылуы басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

   {/tabs}

{include(../../../../../../_includes/_k8s_velero_configure.md)[tags=optional]}

{/tab}

{/tabs}

## {heading(Орнату кезінде аддонды баптау кодын өңдеу)[id=mk8s-install-advanced-velero-edit-code]}

Аддон кодын өңдеу стандартты орнатуға және арнайы worker-түйіндерге орнатуға қолданылады.

Аддонды баптаудың толық коды өрістер сипаттамасымен бірге [GitHub](https://github.com/vmware-tanzu/helm-charts/blob/velero-12.1.0/charts/velero/values.yaml) сайтында қолжетімді.

Кодты өңдегеннен кейін аддонды орнатуды жалғастырыңыз.