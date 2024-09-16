VK Cloud поддерживает автоматическое масштабирование дисков в сервисе: при достижении определенного значения размер дисков увеличивается на заданную в системе величину.

## Основные понятия

_Максимальный размер диска_ — объем в ГБ, до которого можно увеличить размер дисков. [Задается](../../service-management/manage-instance/postgresql#nastroyka_avtomasshtabirovaniya_razmera_diska_s_dannymi) вручную и не может превышать:

- 2048 ГБ для High-IOPS SSD;
- 5120 ГБ — для SSD-дисков.

_Пороговое значение_ — объем свободного места на диске в ГБ, при достижении которого срабатывает автомасшабирование. Зависит от размера диска и вычисляется по формуле: `2 + <текущий размер диска> / 25`

Если полученное по формуле значение больше `25`, то пороговое значение будет приравнено к 25 ГБ.

_Шаг расширения_ — величина в ГБ, на которую увеличивается текущий размер диска. Зависит от размера диска и вычисляется по формуле: `2 + <текущий размер диска> / 25`

Если полученное по формуле значение больше `25`, то шаг будет приравнен к 25 ГБ.

## Принцип работы

Автомасштабирование дисков работает согласно следующему алгоритму:

1. Пользователь включает автомасштабирование и задает максимальный размер диска: при [создании](../../service-management/create) инстанса или после его [развертывания](../../service-management/manage-instance/postgresql#nastroyka_avtomasshtabirovaniya_razmera_diska_s_dannymi).
1. Размер диска достигает порогового значения, при котором должно сработать автомасштабирование.
1. Сервис вычисляет шаг расширения и определяет, можно ли масштабировать диск:

   - Если новый размер диска (текущий размер + шаг расширения) не превышает заданный максимальный размер, размер диска увеличивается.
   - Если новый размер диска превышает заданный максимальный размер, автомасштабирование не выполняется.

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
