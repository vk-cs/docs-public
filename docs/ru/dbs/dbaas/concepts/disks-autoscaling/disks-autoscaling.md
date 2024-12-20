VK Cloud поддерживает автоматическое масштабирование дисков баз данных. Когда объем свободного места на диске достигает *порогового значения*, его размер автоматически увеличивается на *шаг расширения*. Это увеличение ограничено заданным максимальным размером диска.

Автомасштабирование поддерживается для следующих видов дисков:

- Data-диск — диск с данными, подключенный к ВМ в дополнение к основному диску.
- WAL-диск — диск, на котором хранится журнал предзаписи (Write-Ahead Log, WAL). Только для БД PostgreSQL в конфигурациях Single, Master-Replica и Кластер.

## Параметры автомаштабирования для разных видов дисков

[cols="1,2,2", options="header"]
|===
|Параметр
|Data-диск
|WAL-диск

|Максимальный размер диска, ГБ
|[Задается](../../service-management/manage-instance/postgresql#nastroyka_avtomasshtabirovaniya_razmera_diska_s_dannymi) вручную и не может превышать:

- 2048 ГБ — для High-IOPS SSD;
- 5120 ГБ — для SSD-дисков
|Не может быть задан пользователем и равен 2048 ГБ для любого типа дисков

|Пороговое значение, ГБ
|Вычисляется по формуле: `2` + `текущий размер data-диска` / `25`.

Если полученное по формуле значение больше `25`, то пороговое значение приравнивается к 25 ГБ
|Вычисляется по формуле: `0,5` + `текущий размер WAL-диска` / `25`.

Если полученное по формуле значение больше `2`, то пороговое значение приравнивается к 2 ГБ

|Шаг расширения, ГБ
|Вычисляется по формуле: `2` + `текущий размер data-диска` / `25`.

Если полученное по формуле значение больше `25`, то пороговое значение приравнивается к 25 ГБ
|Вычисляется по формуле: `0,5` + `текущий размер WAL-диска` / `25`.

Если полученное по формуле значение больше `2`, то пороговое значение приравнивается к 2 ГБ
|===

## Алгоритм работы автомасштабирования

<tabs>
<tablist>
<tab>Data-диск</tab>
<tab>WAL-диск</tab>
</tablist>
<tabpanel>

1. Пользователь включает автомасштабирование и задает максимальный размер диска: при [создании](../../service-management/create) инстанса или после его [развертывания](../../service-management/manage-instance/postgresql#nastroyka_avtomasshtabirovaniya_razmera_diska_s_dannymi).
1. Свободное место на диске достигает порогового значения, при котором должно сработать автомасштабирование.
1. Сервис вычисляет шаг расширения и определяет, можно ли масштабировать диск:

   - Если новый размер диска (текущий размер + шаг расширения) не превышает заданный максимальный размер, размер диска увеличивается.
   - Если новый размер диска превышает заданный максимальный размер, автомасштабирование не выполняется.

</tabpanel>
<tabpanel>

1. Пользователь указывает размер data-диска при создании инстанса PostgreSQL.
1. Размер WAL-диска автоматически рассчитывается как `размер data-диска` × `0,2`.
1. Пользователь включает автомасштабирование и задает максимальный размер data-диска: при [создании](../../service-management/create) инстанса или после его [развертывания](../../service-management/manage-instance/postgresql#nastroyka_avtomasshtabirovaniya_razmera_diska_s_dannymi).
1. В процессе эксплуатации свободное место на WAL-диске достигает порогового значения, при котором должно сработать его автомасштабирование.
1. Сервис вычисляет шаг расширения для WAL-диска и определяет, можно ли масштабировать диск:

   - Если новый размер WAL-диска (текущий размер + шаг расширения) не превышает 2048 ГБ, размер WAL-диска увеличивается.
   - Если новый размер WAL-диска превышает 2048 ГБ, автомасштабирование не выполняется.

</tabpanel>
</tabs>

<info>

В [конфигурации](../work-configs/) **Кластер** настройки автомасштабирования изменяются сразу для всех хостов, входящих в кластер.

Автомасштабирование будет проходить синхронно на всех хостах.

</info>

## СУБД с поддержкой автомасштабирования

В таблице ниже указано, для каких [конфигураций](../work-configs/) и версий СУБД поддерживается автомасштабирование дисков.

[cols="2,1,1,1", options="header"]
|===
| Тип СУБД 
| Single 
| Master-Replica 
| Кластер

| PostgresPro Enterprise (все версии)    
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline")

| PostgresPro Enterprise 1C (все версии) 
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline") 

| PostgresPro Standard (все версии)      
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/no.svg "inline") 
| ![](/ru/assets/no.svg "inline") 

| MySQL (все версии)
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline") 

| Tarantool
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/no.svg "inline") 
| ![](/ru/assets/no.svg "inline") 

| PostgreSQL (все версии)
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline") 

| ClickHouse (все версии)
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/check.svg "inline") 

| Redis 5
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/no.svg "inline") 
| ![](/ru/assets/no.svg "inline") 

| Redis 6
| ![](/ru/assets/no.svg "inline") 
| ![](/ru/assets/no.svg "inline") 
| ![](/ru/assets/no.svg "inline") 

| MongoDB 4.0
| ![](/ru/assets/check.svg "inline") 
| ![](/ru/assets/no.svg "inline") 
| ![](/ru/assets/no.svg "inline") 

| MongoDB 6
| ![](/ru/assets/no.svg "inline") 
| ![](/ru/assets/no.svg "inline") 
| ![](/ru/assets/no.svg "inline") 

| OpenSearch 2
| ![](/ru/assets/no.svg "inline") 
| ![](/ru/assets/no.svg "inline") 
| ![](/ru/assets/no.svg "inline")
|===
