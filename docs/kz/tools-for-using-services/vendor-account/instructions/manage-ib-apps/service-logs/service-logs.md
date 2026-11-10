
{include(/kz/_includes/_translated_by_ai_kz.md)}

Сервистің инстанс логтарын көру үшін:

1. [VK Cloud жеке кабинетіне](https://msk.cloud.vk.ru/app/) өтіңіз.
1. **Қосымшалар дүкені** бөліміне өтіңіз.
1. Әзірлеуші консолін ашып, онда **Сеть** (**Network**) қойындысына өтіңіз.
1. Фильтрлерді пайдаланыңыз: **XHR/Fetch** түймесін басып, фильтр көрсету жолына `/marketplace` енгізіңіз.
1. Тізімнен кез келген сәтті сұраныстың атауын (қызыл түспен ерекшеленбеген) таңдап, **Файлы cookie** (**Cookies**) қойындысына өтіңіз.
1. Тізімнен `sid` cookie файлының мәнін тауып, сақтап қойыңыз.
1. Marketplace-те авторизацияның JWT-токенін алыңыз, ол үшін команданы орындаңыз:

    {tabs}

    {tab(Linux (bash))}

    ```console
    curl -X POST https://cloud.vk.ru/marketplace/api/um/v1/tokens/sid \
    --cookie 'sid=<SID>'
    ```

    {/tab}

    {tab(Windows (cmd))}

    ```console
    curl -X POST https://cloud.vk.ru/marketplace/api/um/v1/tokens/sid ^
    --cookie "sid=<SID>"
    ```

    {/tab}

    {/tabs}

    Мұнда `<SID>` — `sid` cookie файлының мәні.

    Команданың жауабында JWT-токен көрсетіледі.

1. Сервистің инстанс логын алыңыз:

    {tabs}

    {tab(Linux (bash))}

    ```console
    curl -v https://cloud.vk.ru/marketplace/api/notifications/api/v1/instance?uuid=<UUID> \
    -H 'Authorization: Bearer <JWT_TOKEN>'
    ```

    {/tab}

    {tab(Windows (cmd))}

    ```console
    curl -v https://cloud.vk.ru/marketplace/api/notifications/api/v1/instance?uuid=<UUID> ^
    -H "Authorization: Bearer <JWT_TOKEN>"
    ```

    {/tab}

    {/tabs}

    Мұнда:

    - `<UUID>` — сервистің инстанс идентификаторы. Мәнді VK Cloud жеке кабинетіндегі сервистің инстанс бетінен табыңыз — `ID` параметрі.
    - `<JWT_TOKEN>` — авторизацияның JWT-токені.