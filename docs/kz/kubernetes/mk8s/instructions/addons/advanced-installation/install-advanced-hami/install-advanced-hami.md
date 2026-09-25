# {heading(HAMi)[id=mk8s-install-advanced-hami]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:warn}
Аддонның жұмыс істеуі үшін Kubernetes {linkto(../../../../concepts/versions/version-support#mk8s-version-support)[text=1.33 нұсқасы]} немесе одан жоғары нұсқасы қажет.
{/note}

## {heading(Дайындық қадамдары)[id=mk8s-install-advanced-hami-prep]}

{include(/kz/_includes/_addon-prep.md)}

## {heading(Аддонды орнату)[id=mk8s-install-advanced-hami-install]}

{linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-hami)[text=HAMi]} аддоны {linkto(../../../../concepts/flavors#mk8s-flavors-gpu)[text=GPU бар worker-түйіндерде]} жұмыс істейді, сондықтан ол үшін тек {linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-install-features)[text=бөлінген түйіндерге орнату]} қолжетімді. Кластерге GPU бар worker-түйіндерді қосу үшін алдымен {linkto(../../../../../../computing/gpu/concepts/about#gpu-about)[text=Cloud GPU]} сервисін қосыңыз.

1. Егер бұл әлі жасалмаса, аддонды орнату үшін бөлінген worker-түйіндер тобын дайындаңыз:

   {tabs}
   {tab(Жеке кабинет)}

    1. [Өтіңіз](https://kz.cloud.vk.kz/app/) VK Cloud жеке кабинетіне.
    1. Қажетті кластер орналасқан жобаны таңдаңыз.
    1. **Kubernetes кластерлері → Kubernetes кластерлері** бөліміне өтіңіз.
    1. Тізімнен қажетті кластерді табыңыз.

    1. Кластерде аддондар орналастырылатын GPU бар бөлінген worker-түйіндер тобы бар екеніне көз жеткізіңіз.

       Егер мұндай топ жоқ болса — {linkto(../../../manage-node-group#mk8s-manage-node-group-add-group)[text=оны қосыңыз]}.

    1. (Опционалды түрде) Егер GPU бар түйіндерде тек GPU ресурстарын талап ететін процестер ғана орындалуы тиіс болса, осы түйіндер тобы үшін {linkto(../../../manage-node-group#mk8s-manage-node-group-labels-taints)[text=шектеуді (taint) орнатыңыз]}, мыналарды көрсетіп:

        - әсер `NoSchedule`;
        - кілт `nvidia.com/gpu`;
        - мән `gpu`.

   {/tab}
   {/tabs}

1. Аддонды орнатыңыз:

   {tabs}
   {tab(Жеке кабинет)}

    1. [Өтіңіз](https://kz.cloud.vk.kz/app/) VK Cloud жеке кабинетіне.
    1. Қажетті кластер орналасқан жобаны таңдаңыз.
    1. **Kubernetes кластерлері → Kubernetes кластерлері** бөліміне өтіңіз.
    1. Қажетті кластердің атауын басыңыз.
    1. **Аддондар** қойындысына өтіңіз.
    1. `hami` аддонының карточкасындағы **Орнату** батырмасын, содан кейін **Аддонды орнату** батырмасын басыңыз.
    1. (Опционалды түрде) Мыналарды өңдеңіз:

        - таңдалған нұсқаны;
        - қолданба атауын;
        - аддон орнатылатын атаулар кеңістігінің атауын;
        - {linkto(#mk8s-install-advanced-hami-edit-code)[text=аддонды баптау коды]}.

          {note:warn}
          Қате берілген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.
          {/note}

    1. **Аддонды орнату** батырмасын басыңыз.

       Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}
   {/tabs}

1. (Опционалды түрде) [HAMi бойынша ресми құжаттамамен танысыңыз](https://project-hami.io/docs/).

## {heading(Орнату кезінде аддонды баптау кодын өңдеу)[id=mk8s-install-advanced-hami-edit-code]}

Өрістер сипаттамасымен бірге аддонды баптаудың толық коды [GitHub](https://github.com/Project-HAMi/HAMi/blob/master/charts/hami/values.yaml)-та қолжетімді.

{note:err}
`"mcs.mail.ru/gpu-exists"` өрісін және оның `true` мәнін өшірмеңіз.
{/note}

Кодты өңдегеннен кейін аддонды орнатуды жалғастырыңыз.
