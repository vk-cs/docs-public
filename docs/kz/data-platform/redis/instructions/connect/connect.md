# {heading(Сервис дансеріне қосылу)[id=redis_connect]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

Redis сервис дансеріне қолдау көрсетілетін кез келген клиент арқылы қосылуға болады.

{include(../../../_includes/_connect.md)[tags=connect-secure]}

## {heading(Redis CLI арқылы қосылу)[id=redis_connect-redis-cli]}

1. **Data Platform** → **Сервис дансерлері** бөліміне өтіңіз.
1. Сервис дансерінің атауын басыңыз.
1. Дансер бетінде **Жалпы ақпарат** қойындысына өтіңіз.
1. **Redis connection string** өрісінде көрсетілген қосылу жолын көшіріп алыңыз.
1. Терминалды ашыңыз.
1. Redis-ке қосылу үшін команданы орындаңыз:

   ```console
   redis-cli -u redis://<ЛОГИН>:<ПАРОЛЬ>@<ХОСТ_И_ПОРТ>
   ```

   Мұнда:

   - `<ЛОГИН>` — Redis тіркелгісінің логині;
   - `<ПАРОЛЬ>` — Redis тіркелгісінің құпиясөзі;
   - `<ХОСТ_И_ПОРТ>` — қосылу жолынан алынған хост және порт.

1. Команда орындалу барысында сертификатты валидациялау қатесі орын алса, командаға `--tls --insecure` параметрлерін қосыңыз:

   ```console
   redis-cli --tls --insecure -u redis://<user>:<password>@10.101.0.111:2000
   ```

   {include(../../../_includes/_connect.md)[tags=curl-insecure]}