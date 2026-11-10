# {heading(Сервис данеріне қосылу)[id=opensearch_connect]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

OpenSearch сервис данеріне веб-интерфейс, curl және үшінші тарап клиенттері арқылы қосылуға болады.

{include(../../../_includes/_connect.md)[tags=connect-secure]}

## {heading(Веб-интерфейс арқылы қосылу)[id=opensearch_connect-ui]}

1. **Data Platform** → **Сервис данерлері** бөліміне өтіңіз.
1. Сервис данерінің атауын басыңыз.
1. Данер бетінде **Жалпы ақпарат** қойындысына өтіңіз.
1. **Opensearch UI** өрісінде көрсетілген сілтемеге өтіңіз.

   {include(../../../_includes/_connect.md)[tags=browser-warning]}

1. Браузерге байланысты:

   {include(../../../_includes/_connect.md)[tags=browsers-action]}

1. OpenSearch тіркелгісінің логині мен құпиясөзін енгізіңіз.
1. **Log In** батырмасын басыңыз.

## {heading(curl арқылы қосылу)[id=opensearch_connect-curl]}

1. **Data Platform** → **Сервис данерлері** бөліміне өтіңіз.
1. Сервис данерінің атауын басыңыз.
1. Данер бетінде **Жалпы ақпарат** қойындысына өтіңіз.
1. **Opensearch API** өрісінде көрсетілген URL-мекенжайды көшіріп алыңыз.
1. Терминалды ашыңыз.
1. Командалы орындаңыз:

   ```console
   curl --insecure -u <ЛОГИН>:<ПАРОЛЬ> <OPENSEARCH_API_URL>
   ```

   Мұнда:

   - `<ЛОГИН>` — OpenSearch тіркелгісінің логині;
   - `<ПАРОЛЬ>` — OpenSearch тіркелгісінің құпиясөзі;
   - `<OPENSEARCH_API_URL>` — көшіріп алынған Opensearch API URL-мекенжайы.

   {include(../../../_includes/_connect.md)[tags=curl-insecure]}