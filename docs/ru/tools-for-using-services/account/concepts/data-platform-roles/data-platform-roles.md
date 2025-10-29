В VK Data Platform используется двухуровневая ролевая модель:

- [Роли личного кабинета](#dp_personal_account_roles) определяют, какие операции с инстансами VK Data Platform доступны пользователю в личном кабинете VK Cloud.
- [Внутренние роли продуктов](#dp_product_roles) определяют, какие операции пользователь может выполнять непосредственно в развернутых инстансах продуктов VK Data Platform.

## {heading(Роли VK Data Platform в личном кабинете)[id=dp_personal_account_roles]}

В личном кабинете VK Cloud пользователю VK Data Platform можно [назначить](../../instructions/project-settings/access-manage#priglashenie_v_proekt_novogo_uchastnika) одну из ролей:

[cols="1,1,2", options="header"]
|===
|Роль
|ID роли
|Краткое описание

|Владелец DP
|`admin`
|Дает полные права доступа ко всем инстансам VK Data Platform в проекте, полномочия управлять пользователями и SQL-запросами, доступ к веб-интерфейсам продуктов

|Администратор DP
|`dba`
|Дает право управлять конфигурацией кластеров, инстансами БД и сервисов, развернутыми в составе VK Data Platform, и настраивать параметры экземпляров продуктов

|Пользователь DP
|`user`
|Дает права чтения на всех инстансах VK Data Platform в проекте, доступ к веб-интерфейсам продуктов и право выполнять SQL-запросы
|===

Каждой роли соответствует определенный набор прав на выполнение операций:

[cols="2,1,1,1"]
|===
.2+| **Операции**
3+| **Роли**

| **Владелец DP**
| **Администратор DP**
| **Пользователь DP**

4+^.| **Управление инстансами продуктов**

| Просмотр списка инстансов
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Просмотр свойств инстансов
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Создание инстанса
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Удаление инстанса
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Перезагрузка инстанса
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Масштабирование вертикальное или горизонтальное (любое изменение количества CPU и RAM)
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Увеличение диска
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Изменение настроек обслуживания кластера (резервное копирование, операции по расписанию и т.п.)
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Обновление версии продукта
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Просмотр событий по инстансу
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Доступ к UI продукта
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Выполнение SQL-запросов
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Получение списка исполняемых запросов
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Отмена выполнения запроса
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

4+^.| **Управление подключениями (только для Kafka)**

| Просмотр списка mirror-подключений
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Создание mirror-подключения
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Удаление mirror-подключения
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Управление настройками CruiseControl
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

4+^.| **Управление настройками продуктов**

| Просмотр настроек продукта
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Редактирование или сброс настроек
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Просмотр истории изменения настроек
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

4+^.| **Управление пользователями**

| Просмотр списка пользователей
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Добавление пользователя
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Удаление пользователя
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Редактирование данных пользователя
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

4+^.| **Управление базами данных**

| Просмотр списка БД
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Создание новой БД
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Удаление БД
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

4+^.| **Управление расширениями БД**

| Просмотр списка расширений
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Установка расширения в БД
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Удаление расширения из БД
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

4+^.| **Управление резервным копированием**

| Просмотр списка резервных копий
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Запуск резервного копирования вручную
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Скачивание резервной копии
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Восстановление из резервной копии в новый кластер
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

4+^.| **Доступ к данным мониторинга**

| Просмотр показателей мониторинга
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

4+^.| **Доступ к логам**

| Просмотр логов инстанса
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
|===

{note:info}

В текущей версии ролевой модели VK Data Platform перечень ролей пользователей в личном кабинете и состав их полномочий изменить невозможно.

{/note}

## {heading(Роли VK Data Platform в инстансах продуктов)[id=dp_product_roles]}

В дополнение к [правам на продукты VK Data Platform в личном кабинете](#dp_personal_account_roles) пользователь VK Data Platform наделяется полномочиями выполнять операции внутри инстансов продуктов. Объем этих полномочий определяется внутренними ролями пользователя в каждом из продуктов VK Data Platform:

[cols="1,1,2", options="header"]
|===
|Роль в продукте
|ID роли
|Краткое описание

|Владелец продукта
|`dp_admin`
|Дает полные права доступа к инстансу продукта

|Администратор продукта
|`dp_dba`
|Дает права чтения и записи на объекты и сервисы внутри инстанса продукта

|Пользователь продукта
|`dp_viewer`
|Дает права чтения данных внутри инстанса продукта, включая право выполнять SQL-запросы

|Менеджер ИБ продукта
|`dp_security_operator`
|Дает права на выполнение операций, связанных с диагностикой и обеспечением информационной безопасности, и право на чтение системных параметров инстанса продукта. Не дает доступа к данным внутри инстанса продукта
|===

В текущей версии ролевой модели VK Data Platform:

- Все пользователи с ролями в личном кабинете `Владелец DP` и `Администратор DP` автоматически получают роль `Владелец продукта` на все развернутые инстансы продукта VK Data Platform в проекте.
- Все пользователи с ролью в личном кабинете `Пользователь DP` автоматически получают роль `Пользователь продукта` на все развернутые инстансы продукта VK Data Platform в проекте.
- Полномочия внутренних продуктовых ролей [преднастроены](#postresql_roles) только для продукта PostgreSQL.

### {heading(Полномочия внутренних ролей продуктов)[id=product_roles_permissions]}

Полномочия внутренних ролей в продуктах описываются грантами (разрешениями) на доступ и выполнение операций с объектами и сервисами внутри развернутого инстанса продукта VK Data Platform, включая следующие типы объектов и сервисов:

- таблицы и метаданные БД;
- справочники нормативно-справочной информации;
- бизнес-сущности и выполненные транзакции;
- интерфейсы доступа к данным;
- технические сервисы (мониторинг, логирование, аудит).

Гранты добавляются в полномочия конкретного пользователя или роли с помощью команды SQL `GRANT`, которая выполняется внутри инстанса продукта VK Data Platform. Упрощенный синтаксис команды:

```sql

GRANT <РАЗРЕШЕНИЕ> [ ,... ] 
    ON [<КЛАСС_ОБЪЕКТА>] <ИМЯ_ОБЪЕКТА> [ ,... ]
    TO <УЧАСТНИК> [ ,... ];

```

Здесь:

- `<РАЗРЕШЕНИЕ>` — название разрешения, например: `SELECT`, `ALL`, `EXECUTE`.
- `<УЧАСТНИК>` — имя пользователя или роли, которым предоставляется разрешение.
- `<КЛАСС_ОБЪЕКТА>` — (опционально) класс объекта БД, например: `DATABASE`, `SCHEMA`, `FUNCTION`.
- `<ИМЯ_ОБЪЕКТА>` — имя объекта БД, на который распространяется разрешение. Может быть именем БД, таблицы, схемы, функции и т.д. Если `<ИМЯ_ОБЪЕКТА>` — это имя роли, то `<УЧАСТНИК>` получает все полномочия этой роли.

Полный синтаксис команды `GRANT` приведен, например, в [официальной документации PostgreSQL](https://www.postgresql.org/docs/current/sql-grant.html).

Для отзыва полномочий используется [команда SQL REVOKE](https://www.postgresql.org/docs/current/sql-revoke.html).

{note:warn}

В текущей ролевой модели VK Data Platform полномочия внутренних ролей продуктов не интегрированы в платформу VK Cloud, т.е. гранты, выданные в инстансе продукта VK Data Platform, не отображаются в личном кабинете пользователя.

{/note}

### {heading(Полномочия ролей продукта PostgreSQL)[id=postresql_roles]}

В текущей версии ролевой модели для инстансов продукта PostgreSQL, развернутых в составе VK Data Platform, с помощью грантов настроено соответствие между [внутренними ролями продукта PostgreSQL](#dp_product_roles) и [встроенными ролями СУБД PostgreSQL](https://www.postgresql.org/docs/current/predefined-roles.html).

[cols="1,2", options="header"]
|===
|Роль в PostgreSQL
|Гранты

|Владелец продукта
|```sql

GRANT pg_database_owner TO dp_admin;
REVOKE pg_superuser FROM dp_admin;

```

|Администратор продукта
|```sql

GRANT pg_read_all_data TO dp_dba;
GRANT pg_write_all_data TO dp_dba;
GRANT ALL PRIVILEGES ON DATABASE vkdb TO dp_dba;
GRANT ALL ON SCHEMA public TO dp_dba;
GRANT ALL ON TABLESPACE pg_default TO dp_dba;

```

|Пользователь продукта
|```sql

GRANT pg_read_all_data TO dp_viewer;
GRANT CONNECT ON DATABASE vkdb TO dp_viewer;

```

|Менеджер ИБ продукта
|```sql

GRANT EXECUTE ON FUNCTION get_hba_rules TO dp_security_operator;
GRANT EXECUTE ON FUNCTION get_all_grants TO dp_security_operator;
GRANT SELECT ON pg_catalog.pg_authid TO dp_security_operator;
GRANT SELECT ON pg_catalog.pg_ident_file_mappings TO dp_security_operator;
GRANT SELECT ON pg_catalog.pg_hba_file_rules TO dp_security_operator;

```
|===

{note:warn}

В текущей версии ролевой модели VK Data Platform невозможно изменить преднастроенные разрешения для внутренних ролей продукта PostgreSQL.

{/note}
