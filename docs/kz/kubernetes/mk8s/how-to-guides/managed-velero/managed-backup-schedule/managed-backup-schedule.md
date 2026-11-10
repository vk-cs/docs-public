# {heading(Кесте бойынша резервтік көшірмелеу)[id=mk8s-backup-schedule-managed]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Кластерлердің резервтік көшірмелерін [cron](https://crontab.guru/every-1-minute) форматындағы берілген кесте бойынша конфигурациялау және осы кесте негізінде кластерді қалпына келтіру үшін {linkto(../../../concepts/addons-and-settings/addons#mk8s-addons-velero)[text=Velero]} аддонын пайдаланыңыз.

## {heading(Дайындық қадамдары)[id=mk8s-backup-schedule-managed-prepare]}

{include(/kz/_includes/_create-test-cluster.md)[tags=managed]}
1. {linkto(../../../connect/kubectl#mk8s-kubectl)[text=`kubectl` көмегімен кластерге қосыла алатыныңызды көріңіз]}.
1. {linkto(../../../instructions/addons/advanced-installation/install-advanced-velero#mk8s-install-advanced-velero)[text=Velero аддонын орнатыңыз]}, егер бұл әлі жасалмаса.

## {heading({counter(managed-velero-schedule)}. Қосымшаны жасаңыз)[id=mk8s-velero-backup-schedule-managed-create-app]}

{include(/kz/_includes/_velero-magnum-how-to.md)[tags=create-app]}

## {heading({counter(managed-velero-schedule)}. Резервтік көшірмелеу кестесін жасаңыз)[id=mk8s-backup-schedule-managed-create-schedule]}

1. `coffee-schedule.yaml` манифестін жасаңыз:

   ```bash
   apiVersion: velero.io/v1
   kind: Schedule
   metadata:
     name: coffee-schedule
     namespace: velero
   spec:
     schedule: "*/10 * * * *"
     template:
       includedNamespaces:
         - example-app
   ```

   Мұнда:

   - `coffee-schedule` — кестенің атауы, оны кейін резервтік көшірмелеу кестелерінің тізімінен таба аласыз. 
   - `velero` — кестені конфигурациялайтын кластердің атаулар кеңістігі.

      {cut(Резервтік көшірмелеуде бірнеше атаулар кеңістігін қалай пайдалануға болады)}

      Қажетті атаулар кеңістіктерін `includedNamespaces` блогында көрсетіңіз. Мысал:

      ```yaml
      includedNamespaces:
        - example-app
        - another-namespace
        - logging
      ```

      {/cut}

      {cut(Резервтік көшірмелеуден белгілі бір атаулар кеңістіктерін қалай алып тастауға болады)}

      `excludedNamespaces` блогын қосып, оған қажетті атаулар кеңістіктерін көрсетіңіз. Мысал:

      ```yaml
      excludedNamespaces:
       - example-app-test
      ```

      {/cut}

   - `schedule` — резервтік көшірмелерді жасау уақытын [cron](https://crontab.guru/every-1-minute) форматында орнататын параметр, мысалы `*/10 * * * *` — әр 10 минут сайын. Әр таңба нақты бір уақыт мәніне жауап береді.

      {cut(Резервтік көшірмелерді жасау уақытын қалай орнатуға болады)}  

      ```txt
      ┌───────────── минуттар (0 - 59)
      │ ┌───────────── сағаттар (0 - 23)
      │ │ ┌───────────── ай күні (1 - 31)
      │ │ │ ┌───────────── ай (1 - 12)
      │ │ │ │ ┌───────────── апта күні (0 - 6) — жексенбіден сәбиге дейін; 7 — кейбір жүйелерде де жексенбі
      │ │ │ │ │                                   
      │ │ │ │ │
      │ │ │ │ │
      * * * * *
      ```
      {/cut} 

1. Манифестті кластерде қолданыңыз: 

   ```console
   kubectl apply -f coffee-schedule.yaml
   ```

Мұндай кесте жұмысының нәтижесінде резервтік көшірмелер әр 10 минут сайын жасалады. Әр резервтік көшірменің атауы `<КЕСТЕНІҢ_АТАУЫ>-<TIMESTAMP>` форматында болады, мұнда `<TIMESTAMP>` — оның жасалу уақыты. Атау мысалы: `daily-backup-20260805070000`.

Резервтік көшірменің әдепкі өмір сүру уақыты — 72 сағат. Осы уақыт өткеннен кейін резервтік көшірме жойылады.

## {heading({counter(managed-velero-schedule)}. Кесте бойынша жасалған көшірмеден деректерді қалпына келтіріңіз)[id=mk8s-backup-schedule-managed-perform-backup]}

1. `coffee-schedule-restore.yaml` манифестін жасаңыз:

   ```yaml
   apiVersion: velero.io/v1
   kind: Restore
   metadata:
     name: coffee-schedule-restore
     namespace: velero
   spec:
     scheduleName: coffee-schedule
   ```

1. Манифестті кластерде қолданыңыз: 

   ```console
   kubectl apply -f coffee-schedule-restore.yaml
   ```

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=mk8s-backup-schedule-managed-delete]}

{include(/kz/_includes/_velero-magnum-how-to.md)[tags=delete-managed]}

