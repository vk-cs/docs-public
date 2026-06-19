# {heading(PostgreSQL)[id=dbaas-concepts-postgresql]}

PostgreSQL — это объектно-реляционная СУБД с открытым исходным кодом. Она может хранить большие объемы данных, поддерживает множество типов данных и предоставляет возможность создания собственных типов.

Основные преимущества PostgreSQL:

- сохранение целостности данных (близкое к стандарту ANSI-SQL:2008);
- возможность создания сложных выборок (представления, правила, подзапросы);
- управление параллельным доступом посредством многоверсионности (MVCC).

Подробнее в [официальной документации PostgreSQL](https://www.postgresql.org/docs/).

Список версий PostgreSQL, которые поддерживаются в {var(cloud)}, доступен при {linkto(../../../instructions/create#dbaas-create)[text=создании]} инстанса этой базы данных.

{ifdef(public)}
В {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=регионе]} Москва для PostgreSQL версии 16 вы можете создать геораспределенные конфигурации с хостами в разных {linkto(../../../../../start/concepts/architecture#architecture-az)[text=зонах доступности]}, чтобы дополнительно повысить отказоустойчивость.
{/ifdef}

{ifdef(public)}
## {heading(Что дальше?)[id=dbaas-concepts-postgresql-whats-next]}

- {linkto(../../../instructions/create#dbaas-create)[text=Создайте]} инстанс базы данных.
- {linkto(../../../connect#dbaas-connect)[text=Подключитесь]} к базе данных.
- {linkto(../../extensions#dbaas-concepts-extensions)[text=Ознакомьтесь]} с доступными расширениями баз данных.
{/ifdef}