Чтобы просмотреть логи инстанса сервиса:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Магазин приложений**.
1. Откройте консоль разработчика и перейдите в ней на вкладку **Сеть** (**Network**).
1. Используйте фильтры: нажмите кнопку **XHR/Fetch** и наберите `/marketplace` в строке для указания фильтра.
1. Выберите в списке имя любого успешного запроса (не выделенного красным цветом) и перейдите на вкладку **Файлы cookie** (**Cookies**).
1. Найдите в списке и сохраните значение файла cookie `sid`.
1. Получите JWT-токен авторизации в Marketplace, выполнив команду:

    {tabs}

    {tab(Linux (bash))}

    ```console
    curl -X POST https://cloud.vk.com/marketplace/api/um/v1/tokens/sid \
    --cookie 'sid=<SID>'
    ```

    {/tab}

    {tab(Windows (cmd))}

    ```console
    curl -X POST https://cloud.vk.com/marketplace/api/um/v1/tokens/sid ^
    --cookie "sid=<SID>"
    ```

    {/tab}

    {/tabs}

    Здесь `<SID>` — значение файла cookie `sid`.

    В ответе на команду отобразится JWT-токен.

1. Получите лог инстанса сервиса:

    {tabs}

    {tab(Linux (bash))}

    ```console
    curl -v https://cloud.vk.com/marketplace/api/notifications/api/v1/instance?uuid=<UUID> \
    -H 'Authorization: Bearer <JWT_TOKEN>'
    ```

    {/tab}

    {tab(Windows (cmd))}

    ```console
    curl -v https://cloud.vk.com/marketplace/api/notifications/api/v1/instance?uuid=<UUID> ^
    -H "Authorization: Bearer <JWT_TOKEN>"
    ```

    {/tab}

    {/tabs}

    Здесь:

    - `<UUID>` — идентификатор инстанса сервиса. Найдите значение в личном кабинете VK Cloud на странице инстанса сервиса — параметр `ID`.
    - `<JWT_TOKEN>` — JWT-токен авторизации.
