# {heading(Redis)[id=dbaas-concepts-redis]}

Redis (Remote Dictionary Server) — высокоэффективная СУБД NoSQL-типа с открытым исходным кодом, которая хранит данные в оперативной памяти в виде пар ключ/значение. Главное преимущество Redis — у нее нет конкурентов по производительности, даже среди ее аналогов.

Redis оптимальна для задач, в которых приоритетна скорость: для кеширования данных, хранения пользовательских сессий, для реализации чатов, очередей, брокеров сообщений, аналитики в реальном времени и других.

Подробнее в [официальной документации Redis](https://redis.io/docs/).

Список версий Redis, которые поддерживаются в {var(cloud)}, доступен при {linkto(../../../instructions/create#dbaas-create)[text=создании]} инстанса этой базы данных.

{ifdef(public)}
## {heading(Что дальше)[id=dbaas-concepts-redis-whats-next]}

- {linkto(../../../instructions/create#dbaas-create)[text=Создайте]} инстанс базы данных.
- {linkto(../../../connect#dbaas-connect)[text=Подключитесь]} к базе данных.
- {linkto(../../extensions#dbaas-concepts-extensions)[text=Ознакомьтесь]} с доступными расширениями баз данных.
{/ifdef}