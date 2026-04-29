{include(/kz/_includes/_translated_by_ai.md)}

Атау кеңістігі жойылмайды және `terminating` күйінде қалады.

Бұл жою процесі тұрып қалғанына немесе ресурстарды тазалау кезінде мәселелер туындағанына байланысты болуы мүмкін.

### Шешім

1. [Кластерге қосылыңыз](../../connect/kubectl) `kubectl` көмегімен.

1. Атау кеңістігінің сипаттамасы бар JSON-файлды алыңыз.
   
   `test.json` файлын алу пәрменінің мысалы:
   
   ```console
   kubectl get ns <НАЗВАНИЕ_ПРОСТРАНСТВА_ИМЕН> -o json > test.json
   ```

1. JSON-файлдағы `spec` блогының мазмұнын жойыңыз.
   
   `spec` блогы мынадай болуы тиіс:
   
   ```json
   "spec": { 
   }
   ```

1. Прокси-серверді іске қосыңыз:
   
   ```console
   kubectl proxy
   ```

1. Атау кеңістігін API-сұрау немесе `kubectl replace` пәрмені арқылы жойыңыз.
   
   `test.json` файлы арқылы жою мысалдары:

   {tabs}
   {tab(API-сұрау)}
   ```console
   curl -k -H "Content-Type: application/json" -X PUT --data-binary @test.json 127.0.0.1:8001/api/v1/namespaces/<НАЗВАНИЕ_ПРОСТРАНСТВА_ИМЕН>/finalize
   ```
   {/tab}
   {tab(Команда kubectl replace)}
   Бұл тәсіл жалпыға қолжетімді Kubernetes API пайдаланған жағдайда қолайлы.

   ```console
   kubectl replace --raw "/api/v1/namespaces//finalize" -f test.json
   ```
   {/tab}
   {/tabs}
