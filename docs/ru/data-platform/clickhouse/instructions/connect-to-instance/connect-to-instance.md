
1.  Подключитесь с помощью любого совместимого клиента. Пример для `clickhouse-client`:

    ```bash
    $ clickhouse-client --host <АДРЕС_ЭКЗЕМПЛЯРА> --port <ПОРТ> --user <ЛОГИН> --password <ПАРОЛЬ>
    ```

    Здесь:
    * `<АДРЕС_ЭКЗЕМПЛЯРА>` — IP-адрес или доменное имя, которое отображается в строках подключения на вкладке **Общая информация** [страницы экземпляра](/docs/ru/data-platform/clickhouse/instructions/manage#view). Пример для подключения по TCP с TLS: `10.0.1.46`.
    * `<ПОРТ>` — TCP-порт, который отображается в строках подключения на вкладке **Общая информация** страницы экземпляра. Пример для подключения по TCP с TLS: `8004`.
    * `<ЛОГИН>` — логин пользователя для подключения. Это может быть:
        * Пользователь, [заданный при создании экземпляра](/docs/ru/data-platform/clickhouse/instructions/create/).
        * Дополнительный пользователь, [добавленный в экземпляр](/docs/ru/data-platform/clickhouse/instructions/manage#add_admin) вручную.
    * `<ПАРОЛЬ>` — пароль этого пользователя.

1.  Выполните тестовый запрос:

    ```sql
    SELECT 1;
    ```

    Ответ `1` означает, что экземпляр работает корректно и готов к работе.

Если подключение не удалось:

* Проверьте корректность введенных данных при подключении.
* [Убедитесь](/docs/ru/data-platform/clickhouse/instructions/manage#status), что экземпляр находится в статусе `Активно`.
* [Убедитесь](/docs/networks/vnet/instructions/secgroups#prosmotr_spiska_grupp_bezopasnosti_i_informacii_o_nih), что [группы безопасности](/docs/ru/networks/vnet/instructions/secgroups), назначенные экземпляру, разрешают входящий трафик.
* [Ознакомьтесь с логами](/docs/ru/monitoring-services/logging/instructions/view-logs).