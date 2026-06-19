# {heading(Кесте бойынша резервтік көшіру)[id=k8s-backup-schedule]}

{include(/kz/_includes/_translated_by_ai.md)}

[Velero](https://velero.io/docs/main/) құралын кластерлердің резервтік көшірмесін [cron](https://crontab.guru/every-1-minute) форматындағы берілген кесте бойынша баптау және кластерді осы кесте негізінде қалпына келтіру үшін пайдаланыңыз.

{note:info}
Резервтік көшіру үшін Velero пайдалану тек {linkto(../../../concepts/cluster-generations#k8s-cluster-generations)[text=бірінші буын]} кластерлерінде ғана қолдау көрсетіледі.
{/note}

## {heading(Дайындық қадамдары)[id=k8s-backup-schedule-prepare]}

{include(/kz/_includes/_create-test-cluster.md)}
1. {linkto(../../../connect/kubectl#k8s-kubectl)[text=Көз жеткізіңіз]}, `kubectl` көмегімен кластерге қосыла алатыныңызға.
1. {linkto(../../../install-tools/velero#k8s-velero)[text=Орнатып, баптаңыз]} Velero, егер бұл әлі жасалмаса.

## {heading(1. Резервтік көшіру кестесін жасаңыз)[id=k8s-backup-schedule-create-schedule]}

Қажетті аттар кеңістігі үшін резервтік көшіру кестесін жасаңыз:

```bash
velero schedule create <НАЗВАНИЕ_РАСПИСАНИЯ> --schedule="0 7 * * *" --include-namespaces <ПРОСТРАНСТВО_ИМЕН>
```

Мұнда:

- `<НАЗВАНИЕ_РАСПИСАНИЯ>` — кейіннен оны резервтік көшіру кестелерінің тізімінен таба алатын кестенің атауы.
- `<ПРОСТРАНСТВО_ИМЕН>` — кестені баптау қажет кластердің аттар кеңістігі. Үтір арқылы бірнеше аттар кеңістігін көрсете аласыз. Осындай тізімдеудің мысалы:

   ```console
   --include-namespaces test_namespace1,test_namespace2,test_namespace3
   ```

   Сондай-ақ, кестені баптау кезінде көрсетілген аттар кеңістігіне сәйкес келсе де, резервтік көшіруден жекелеген ресурстарды алып тастай аласыз. Осындай алып тастаудың мысалдары: 

   ```console
   --exclude-resources secrets
   --exclude-namespaces test_namespace1,test_namespace2,test_namespace3
   ```

   Толығырақ [Velero ресми құжаттамасында](https://velero.io/docs/main/resource-filtering/).
- `--schedule` — резервтік көшірмелерді жасау уақытын [cron](https://crontab.guru/every-1-minute) форматында, мысалы `0 7 * * *`, беретін параметр. Әрбір таңба уақыттың нақты бір мәніне сәйкес келеді.

   {cut(Резервтік көшірмелерді жасау уақытын қалай көрсету керек)}  

   ```txt
   ┌───────────── минуты (0 - 59)
   │ ┌───────────── часы (0 - 23)
   │ │ ┌───────────── день месяца (1 - 31)
   │ │ │ ┌───────────── месяц (1 - 12)
   │ │ │ │ ┌───────────── день недели (0 - 6) — от воскресенья до субботы; 7 — тоже воскресенье в некоторых системах
   │ │ │ │ │                                   
   │ │ │ │ │
   │ │ │ │ │
   * * * * *
   ```
   {/cut} 

Осындай кесте жұмыс істегенде резервтік көшірмелер күн сайын 07:00-де жасалады. Әр резервтік көшірменің атауы `<НАЗВАНИЕ_РАСПИСАНИЯ>-<TIMESTAMP>` форматында болады, мұндағы `<TIMESTAMP>` — оның жасалған уақыты. Атау мысалы: `daily-backup-20260318070000`.

{note:warn}
Әдепкі бойынша резервтік көшірменің өмір сүру уақыты — 720 сағат. Осы уақыт өткеннен кейін резервтік көшірме жойылады.
{/note}

## {heading(2. Жасалған кестені қараңыз)[id=k8s-backup-schedule-view-schedule]}

1. Жасалған кестенің таңдалған аттар кеңістігі үшін қолжетімді резервтік көшіру кестелерінің тізімінде пайда болғанына көз жеткізіңіз:

   ```bash
   velero schedule get --namespace <ПРОСТРАНСТВО_ИМЕН> <НАЗВАНИЕ_РАСПИСАНИЯ>
   ```

   Мұнда:

   * `<ПРОСТРАНСТВО_ИМЕН>` — резервтік көшіру кестесі жасалған аттар кеңістігі.
   * `<НАЗВАНИЕ_РАСПИСАНИЯ>` — кестенің атауы.

   Команда шығысының мысалы:

   ```bash
   NAME                      STATUS   CREATED                         SCHEDULE    BACKUP TTL   LAST BACKUP   SELECTOR   PAUSED
   my-schedule               New      2024-11-11 15:35:32 +0600 +06   0 7 * * *   0s           n/a           <none>     false
   ```

2. Келесі команда арқылы кесте параметрлерін тексеріңіз:

   ```bash
   velero schedule describe <НАЗВАНИЕ_РАСПИСАНИЯ>
   ```

   Команда шығысының мысалы:

   ```bash
   Name:         my_schedule
   Namespace:    test_namespace
   Labels:       <none>
   Annotations:  <none>

   Phase:  New

   Paused:  false
   ```

## {heading(3. Деректерді қалпына келтіруді орындаңыз)[id=k8s-backup-schedule-perform-backup]}

Көрсетілген кесте бойынша жасалған резервтік көшірмеден қалпына келтіруді орындаңыз.

```bash
velero restore create --namespace <ПРОСТРАНСТВО_ИМЕН> --from-schedule <НАЗВАНИЕ_РАСПИСАНИЯ>
```

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=k8s-backup-schedule-delete]}

Жұмыс істеп тұрған кластер тарифтеледі және есептеу ресурстарын тұтынады. Егер Velero құралы мен оның көмегімен резервтік көшіруді тексеру үшін жасалған Kubernetes ресурстары енді қажет болмаса, оларды жойыңыз:

1. `restore` ресурсын жойыңыз:

   ```bash
   kubectl -n velero delete restore
   velero restore delete
   ```

1. Velero-ны жойыңыз:

   ```bash
   velero uninstall
   ```

1. {linkto(/kz/storage/s3/instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Жойыңыз]} Velero пайдаланған бакеттен резервтік көшірмелерді.

   Қажет болса, сондай-ақ {linkto(/kz/storage/s3/instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=бакеттің өзін де жойыңыз]}.

{ifdef(public)}
{include(/kz/_includes/_delete-test-cluster-short.md)}
{/ifdef}
