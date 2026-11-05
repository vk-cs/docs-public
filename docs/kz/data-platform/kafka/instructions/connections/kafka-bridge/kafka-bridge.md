# {heading(Kafka Bridge)[id=kafka_connect-bridge]}

{include(/kz/_includes/_translated_by_ai.md)}

Kafka Bridge — Cloud Kafka компоненті. Ол HTTP арқылы топиктерге хабарламалар жіберуге және топиктерден хабарламалар оқуға арналған REST API ұсынады.

## {heading(Қосылуға дайындық)[id=kafka_connect-bridge-preparation]}

1. Kafka Bridge компонентін мына тәсілдердің бірімен қосыңыз:

   - {linkto(../../create#kafka_create)[text=сервис данасын жасау]} кезінде **Параметрлер** қадамындағы қосымша компоненттер блогында;
   - жасалған дананы {linkto(../../management#kafka_scaling)[text=көлденең масштабтау]} кезінде.

1. Хабарламаларды жіберу және оқу үшін Kafka Bridge компонентінің қажетті топиктерге қол жеткізуін баптаңыз. Сервис данасының **Баптаулар** қойындысында әр параметр жолындағы **•••** белгішесін басып, **Өңдеу** тармағын таңдаңыз. Мәндерді көрсетіңіз:

   - `Kafka Bridge арқылы қолжетімді топиктер тізімі`: компонент қол жеткізе алатын бір топикті немесе топиктер тізімін көрсетіңіз. Топиктерді бос орынсыз, үтірмен бөліп жазыңыз. Әдепкі бойынша тізім бос;
   - `Kafka Bridge арқылы топиктермен рұқсат етілген операциялар`: компонент тізімдегі топиктермен орындай алатын операцияларды таңдаңыз:

      - `All`: оқу және жазу;
      - `Read`: тек оқу;
      - `Write`: тек жазу (әдепкі мән).

   Параметрлерді өзгерту тәртібі {linkto(../../management#kafka_config)[text=Сервис конфигурациясын өңдеу]} бөлімінде сипатталған.

## {heading(Қосылу)[id=kafka_connect-bridge-connect]}

{ifdef(public)}
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app/).
{/ifdef}

1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Сервис данасының атауын басыңыз.
1. **Жалпы ақпарат** қойындысында қосылу жолын көшіріңіз:

   - **Kafka Bridge үшін қосылу жолы** — {var(data-p)} кластерінен тыс қосылу үшін;
   - **Kafka Bridge үшін қосылу жолы (internal)** — {var(data-p)} кластерінің ішінен қосылу үшін.

1. Терминалды ашып, Kafka Bridge мекенжайы бар орта айнымалысын орнатыңыз:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   export BRIDGE_URL="<KAFKA_BRIDGE_МЕКЕНЖАЙЫ>"
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   $env:BRIDGE_URL = "<KAFKA_BRIDGE_МЕКЕНЖАЙЫ>"
   ```

   {/tab}

   {/tabs}

   Мұндағы `<KAFKA_BRIDGE_МЕКЕНЖАЙЫ>` — протокол мен портты қоса алғандағы толық көшірілген қосылу жолы.

1. Мекенжайға `/healthy` жолымен сұрау жіберіп, Kafka Bridge іске қосылғанын тексеріңіз:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   curl -i "${BRIDGE_URL}/healthy"
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   curl.exe -i "${env:BRIDGE_URL}/healthy"
   ```

   {/tab}

   {/tabs}

   `200 OK` жауабы Kafka Bridge іске қосылғанын білдіреді.

1. Kafka Bridge арқылы қандай топиктер қолжетімді екенін тексеріңіз:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   curl -i "${BRIDGE_URL}/topics"
   ```

   {/tab}

   {tab(Windows)}

   ```powershell
   curl.exe -i "${env:BRIDGE_URL}/topics"
   ```

   {/tab}

   {/tabs}

   Топиктер тізімі бар `200 OK` жауабы, тізім бос болса да, Kafka Bridge REST API-іне қол жеткізу бар екенін растайды.

REST API әдістері мен параметрлері [Strimzi Kafka Bridge ресми құжаттамасында](https://strimzi.io/docs/bridge/latest/#api_reference-bridge) сипатталған.
