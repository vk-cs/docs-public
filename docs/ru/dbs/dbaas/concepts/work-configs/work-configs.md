На платформе VK Cloud доступны три типа конфигураций инстансов СУБД. Типа конфигурации определяет, какое количество инстансов БД будет создано и их архитектуру.

Для любого типа конфигурации может быть создана реплика — дополнительный инстанс для [репликации](../../service-management/replication/). Тип диска реплики и его размер может отличаться от мастера и задается отдельно.

Реплика может быть преобразована в мастер. В этом случае репликация прекратится, и инстанс превратится в независимый мастер-инстанс, доступный для чтения и записи. Новый мастер-инстанс будет содержать те же данные, что и реплика до конвертации в мастер.

По умолчанию реплики и мастер размещаются в одном ЦОД. Чтобы перенести один из инстансов в другой ЦОД, обратитесь в [техническую поддержку](/ru/contacts).

## Single

Одна виртуальная машина с установленным сервером СУБД выбранного типа. Инстанс в конфигурации **Single** можно останавливать, запускать и перезапускать.

## Master-Replica

Две виртуальные машины с установленными серверами СУБД выбранного типа. Инстансы поддерживают синхронную репликацию в режиме `master-replica` (active-passive) и масштабируются отдельно.

Инстанс в конфигурации **Master-Replica** можно останавливать, запускать и перезапускать.

## Кластер

<info>

Описан принцип работы кластера PostgreSQL.

</info>

Группа виртуальных машин с установленными серверами СУБД выбранного типа, поддерживающие синхронную и асинхронную репликацию данных, с балансировщиком нагрузки. При недоступности мастер-инстанса сработает автоматическое переключение: одна из реплик конвертируется в мастер, а вместо нее будет создана еще одна реплика.

При увеличении размера диска или вертикальном масштабировании изменения применяются ко всем инстансам кластера.

<info>

Для обеспечения высокой доступности кластера PostgreSQL используется служба [Patroni](https://patroni.readthedocs.io/en/latest/index.html).

</info>

Инстанс в конфигурации **Кластер** нельзя запустить, перезапустить или остановить.

## Доступные конфигурации для типов СУБД

[cols="1,1,1,1", options="header"]
|===
| Тип СУБД 
| Single 
| Master-Replica 
| Кластер

| PostgresPro Enterprise
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline")

| PostgresPro Enterprise 1C 
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline") 

| PostgresPro Standard
| ![](/ru/assets/check.svg "inline") 
| В разработке 
| В разработке

| MySQL
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline")

| Tarantool
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/no.svg "inline") 
| ![](/ru/assets/check.svg "inline")

| PostgreSQL
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline") 

| ClickHouse
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Redis
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/no.svg "inline") 
| ![](/ru/assets/check.svg "inline")

| MongoDB
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/no.svg "inline") 
| ![](/ru/assets/check.svg "inline")

| OpenSearch
| ![](/ru/assets/no.svg "inline") 
| ![](/ru/assets/no.svg "inline") 
| ![](/ru/assets/check.svg "inline")
|===
