# {heading(External Secrets Operator)[id=k8s-install-advanced-eso]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:info}
Бұл аддон тек {linkto(/kz/kubernetes/k8s/concepts/cluster-generations#k8s-cluster-generations)[text=екінші буын]} кластерлері үшін қолжетімді.
{/note}

## {heading(Дайындық қадамдары)[id=k8s-install-advanced-eso-prepare]}

{include(/kz/_includes/_addon-prep.md)}

## {heading(Аддонды орнату)[id=k8s-install-advanced-eso-install]}

{linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-eso)[text=External Secrets Operator]} қосымшасы үшін бірнеше орнату {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-install-features)[text=опциялары]} бар.

{tabs}

{tab(Стандартты орнату)}

1. Аддонды орнатыңыз:

   {tabs}

   {tab(Жеке кабинет)}

    1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
    1. Қажетті кластер орналасқан жобаны таңдаңыз.
    1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
    1. Қажетті кластердің атауын басыңыз.
    1. **Аддондар** қойындысына өтіңіз.
    1. Егер кластерде орнатылған аддондар бұрыннан бар болса, **Аддон қосу** түймесін басыңыз.
    1. `external-secrets-operator` аддонының картасындағы **Орнату** түймесін басыңыз.
    1. **Аддонды орнату** түймесін басыңыз.
    1. Қажет болса, келесілерді өңдеңіз:

        - таңдалған нұсқаны;
        - қолданба атауын;
        - аддон орнатылатын атаулар кеңістігінің атауын;
        - {linkto(#k8s-install-advanced-eso-edit-code)[text=аддонды баптау кодын]}.

          {note:warn}
          Қате берілген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.
          {/note}

    1. **Аддонды орнату** түймесін басыңыз.

       Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

   {/tabs}

1. (Қосымша) [External Secrets Operator ресми құжаттамасымен танысыңыз](https://external-secrets.io/v2.5.0/guides/introduction/).
1. (Қосымша) {linkto(../../../../how-to-guides/external-secrets-operator#k8s-external-secrets-operator)[text=External Secrets Operator жұмысының практикалық нұсқаулығымен танысыңыз]}.

{/tab}

{tab(Бөлінген worker-түйіндерге орнату)}

1. Егер әлі жасалмаған болса, аддонды орнату үшін бөлінген worker-түйіндер тобын дайындаңыз:

   {tabs}

   {tab(Жеке кабинет)}

    1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
    1. Қажетті кластер орналасқан жобаны таңдаңыз.
    1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
    1. Тізімнен қажетті кластерді табыңыз.

    1. Кластерде аддондар орналастырылатын бөлінген worker-түйіндер тобы бар екеніне көз жеткізіңіз.

       Егер мұндай топ болмаса — оны {linkto(../../../manage-node-group#k8s-manage-node-group-add-group)[text=қосыңыз]}.

    1. Егер әлі жасалмаған болса, осы түйіндер тобы үшін {linkto(../../../manage-node-group#k8s-manage-node-group-labels-taints)[text=орнатыңыз]}:

        - Белгі (label): `addonNodes` кілті, `dedicated` мәні.
        - Шектеу (taint): `NoSchedule` әсері, `addonNodes` кілті, `dedicated` мәні.

   {/tab}

   {/tabs}

1. Аддонды орнатыңыз:

   {tabs}

   {tab(Жеке кабинет)}

    1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
    1. Қажетті кластер орналасқан жобаны таңдаңыз.
    1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
    1. Қажетті кластердің атауын басыңыз.
    1. **Аддондар** қойындысына өтіңіз.
    1. Егер кластерде орнатылған аддондар бұрыннан бар болса, **Аддон қосу** түймесін басыңыз.
    1. `external-secrets-operator` аддонының картасындағы **Орнату** түймесін басыңыз.
    1. **Аддонды орнату** түймесін басыңыз.
    1. Қажет болса, келесілерді өңдеңіз:

        - таңдалған нұсқаны;
        - қолданба атауын;
        - аддон орнатылатын атаулар кеңістігінің атауын;
        - {linkto(#k8s-install-advanced-eso-edit-code)[text=аддонды баптау кодын]}.

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

    1. **Аддонды орнату** түймесін басыңыз.

       Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

   {/tabs}

1. (Қосымша) [External Secrets Operator ресми құжаттамасымен танысыңыз](https://external-secrets.io/v2.5.0/guides/introduction/).
1. (Қосымша) {linkto(../../../../how-to-guides/external-secrets-operator#k8s-external-secrets-operator)[text=External Secrets Operator жұмысының практикалық нұсқаулығымен танысыңыз]}.

{/tab}

{tab(Жылдам орнату)}

{note:info}
Жылдам орнату кезінде аддонды баптау коды өңделмейді.

Егер бұл сізге сәйкес келмесе, **стандартты орнатуды** немесе **бөлінген worker-түйіндерге орнатуды** орындаңыз.
{/note}

1. Аддонды орнатыңыз:

   {tabs}

   {tab(Жеке кабинет)}

    1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
    1. Қажетті кластер орналасқан жобаны таңдаңыз.
    1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
    1. Қажетті кластердің атауын басыңыз.
    1. **Аддондар** қойындысына өтіңіз.
    1. Егер кластерде орнатылған аддондар бұрыннан бар болса, **Аддон қосу** түймесін басыңыз.
    1. `external-secrets-operator` аддонының картасындағы **Орнату** түймесін басыңыз.
    1. **Аддонды орнату** түймесін басыңыз.
    1. Қажет болса, келесілерді өңдеңіз:

        - таңдалған нұсқаны;
        - қолданба атауын;
        - аддон орнатылатын атаулар кеңістігінің атауын.

    1. **Аддонды орнату** түймесін басыңыз.

       Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

   {/tabs}

1. (Қосымша) [External Secrets Operator ресми құжаттамасымен танысыңыз](https://external-secrets.io/v2.5.0/guides/introduction/).
1. (Қосымша) {linkto(../../../../how-to-guides/external-secrets-operator#k8s-external-secrets-operator)[text=External Secrets Operator жұмысының практикалық нұсқаулығымен танысыңыз]}.

{/tab}

{/tabs}

## {heading(Орнату кезінде аддонды баптау кодын өңдеу)[id=k8s-install-advanced-eso-edit-code]}

Аддон кодын өңдеу стандартты орнату және бөлінген worker-түйіндерге орнату үшін қолданылады.

Өрістер сипаттамасымен бірге аддонды баптаудың толық коды [GitHub](https://github.com/external-secrets/external-secrets/blob/v2.5.0/deploy/charts/external-secrets/values.yaml) сайтында қолжетімді.

Кодты өңдегеннен кейін аддонды орнатуды жалғастырыңыз.

## {heading(Қосымшаны жою)[id=k8s-install-advanced-eso-delete]}

1. Барлық имен кеңістігінен аддонның Custom Resource Definitions (CRD) қатысты барлық жасалған ресурс даналарын жойыңыз:

   ```console
   kubectl -n <КЕҢІСТІК_АТАУЫ> delete <РЕСУРС_ТҮРІ> <ДАНА_АТАУЫ>
   ```

   Мұнда:

    - `<КЕҢІСТІК_АТАУЫ>` — құрылған ресурс данасы орналасқан имен кеңістігі.
    - `<РЕСУРС_ТҮРІ>` — қосымша үшін жасалған ресурс түрі. Мысалдар: `ExternalSecret`, `SecretStore`, `ClusterSecretStore`.
    - `<ДАНА_АТАУЫ>` — жойғыңыз келетін дананың аты.

   Толығырақ ресми құжаттамада [External Secrets Operator](https://external-secrets.io/v2.5.0/introduction/getting-started/#uninstalling).

1. {linkto(../../manage-addons#k8s-manage-addons-delete)[text=Жою]} қосымша External Secrets Operator. 