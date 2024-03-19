Для взаимодействия с кластерами Cloud Spark используется Python-библиотека Cloud ML Platform. При работе с библиотекой для выполнения большинства действий необходимо пройти авторизацию с помощью токена.

Библиотека поддерживает работу с двумя типами токенов:

- Токены доступа (refresh-токены). Они используются для взаимодействия с кластерами Spark.
- Регистрационные токены (register-токены). Они используются для создания токенов доступа с помощью библиотеки (без использования личного кабинета).

## Получение списка токенов доступа

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, в котором находятся токены.
1. Перейдите в раздел **ML Platform → Токены**.

Будет выведен список токенов доступа.

</tabpanel>
</tabs>

<info>

В этом списке нет регистрационных токенов.

</info>

## Создание токена доступа

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>Библиотека Cloud ML Platform</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, в котором нужно создать токен.
1. Перейдите в раздел **ML Platform → Токены**.
1. Нажмите кнопку **Создать токен доступа**.
1. В открывшемся окне укажите параметры токена:

   - **Название**: может быть любым.
   - **Роль**: одна из ролей токена.

     - `Пользователь`. Эта роль дает право выполнять операции, требующие авторизации при работе с библиотекой Cloud ML Platform (например, отправить задание на кластер Spark).
     - `Администратор`. Эта роль дает те же права, что и роль `Пользователь`, а также дополнительно дает права на работу с токенами.

1. Нажмите кнопку **Создать**.
1. В открывшемся окне скопируйте значение токена и сохраните его на своем устройстве.

   <err>

   После закрытия окна восстановить значение токена будет невозможно. Если оно утеряно, создайте новый токен.

   </err>

1. Нажмите кнопку **Готово**.

</tabpanel>
<tabpanel>

<err>

Для простоты значение регистрационного токена указано в примере скрипта Python, а значение токена доступа выводится с помощью `print()`.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными.

</err>

1. Подготовьте окружение для работы с Python любым удобным способом, если это еще не сделано:

   <tabs>
   <tablist>
   <tab>С помощью VK Cloud</tab>
   <tab>Самостоятельно</tab>
   </tablist>
   <tabpanel>

   [Создайте инстанс JupyterHub](/ru/ml/mlplatform/jupyterhub/start/create) в проекте VK Cloud. Он уже содержит настроенные Python 3.x и pip, с которыми можно работать из блокнота JupyterHub (notebook).

   </tabpanel>
   <tabpanel>

   1. Установите Python 3.x и pip.
   1. При необходимости настройте виртуальное окружение (virtual environment) для Python.

   Например, можно воспользоваться [conda](https://conda.io/projects/conda/en/latest/index.html) или выполнить эти шаги вручную.

   </tabpanel>
   </tabs>

1. Установите библиотеку Cloud ML Platform для Python, если это еще не сделано.

   <tabs>
   <tablist>
   <tab>JupyterHub</tab>
   <tab>pip</tab>
   </tablist>
   <tabpanel>

   1. [Подключитесь к инстансу JupyterHub](/ru/ml/mlplatform/jupyterhub/start/connect).
   1. В блокноте JupyterHub создайте и выполните ячейку со следующим содержимым:

      ```bash
      %pip install https://mlplatform.hb.ru-msk.vkcs.cloud/mlplatform_client.tar.gz
      ```

   </tabpanel>
   <tabpanel>

   Выполните команду:

   ```bash
   pip install https://mlplatform.hb.ru-msk.vkcs.cloud/mlplatform_client.tar.gz
   ```

   </tabpanel>
   </tabs>

   По приведенной ссылке доступна актуальная версия библиотеки.

1. Попросите владельца токена доступа с ролью `Администратор` [создать для вас регистрационный токен](#sozdanie_registracionnogo_tokena).

1. Создайте новый токен доступа с помощью регистрационного токена, выполнив скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
 
   REGISTER_TOKEN = "<значение регистрационного токена>"

   mlp = MLPlatform()
   refresh_token = mlp.create_refresh_token(REGISTER_TOKEN)
 
   print(refresh_token)
   ```

   После выполнения этого скрипта будет выведено значение созданного токена доступа.

   Параметры токена доступа (имя, роль и время жизни) определяются регистрационным токеном.

1. Скопируйте значение токена и сохраните его на своем устройстве.

</tabpanel>
</tabs>

## Создание регистрационного токена

<tabs>
<tablist>
<tab>Библиотека Cloud ML Platform</tab>
</tablist>
<tabpanel>

<err>

Для простоты значение токена доступа указано в примере скрипта Python, а значение регистрационного токена выводится с помощью `print()`.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными.

</err>

1. Подготовьте окружение для работы с Python любым удобным способом, если это еще не сделано:

   <tabs>
   <tablist>
   <tab>С помощью VK Cloud</tab>
   <tab>Самостоятельно</tab>
   </tablist>
   <tabpanel>

   [Создайте инстанс JupyterHub](/ru/ml/mlplatform/jupyterhub/start/create) в проекте VK Cloud. Он уже содержит настроенные Python 3.x и pip, с которыми можно работать из блокнота JupyterHub (notebook).

   </tabpanel>
   <tabpanel>

   1. Установите Python 3.x и pip.
   1. При необходимости настройте виртуальное окружение (virtual environment) для Python.

   Например, можно воспользоваться [conda](https://conda.io/projects/conda/en/latest/index.html) или выполнить эти шаги вручную.

   </tabpanel>
   </tabs>

1. Установите библиотеку Cloud ML Platform для Python, если это еще не сделано.

   <tabs>
   <tablist>
   <tab>JupyterHub</tab>
   <tab>pip</tab>
   </tablist>
   <tabpanel>

   1. [Подключитесь к инстансу JupyterHub](/ru/ml/mlplatform/jupyterhub/start/connect).
   1. В блокноте JupyterHub создайте и выполните ячейку со следующим содержимым:

      ```bash
      %pip install https://mlplatform.hb.ru-msk.vkcs.cloud/mlplatform_client.tar.gz
      ```

   </tabpanel>
   <tabpanel>

   Выполните команду:

   ```bash
   pip install https://mlplatform.hb.ru-msk.vkcs.cloud/mlplatform_client.tar.gz
   ```

   </tabpanel>
   </tabs>

   По приведенной ссылке доступна актуальная версия библиотеки.

1. [Создайте токен доступа](#sozdanie_tokena_dostupa) с ролью `Администратор`, если у вас его еще нет.

1. Создайте регистрационный токен, выполнив скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   from mlplatform_client.serializers.auth import MLPTokenType
    
   ADMIN_REFRESH_TOKEN = "<значение токена доступа с ролью Администратор>"
    
   mlp = MLPlatform(ADMIN_REFRESH_TOKEN)

   register_token = mlp.create_register_token(
       client_name="<имя токена доступа>",
       access_ttl="<время жизни регистрационного токена>",
       refresh_ttl="<время жизни токена доступа>",
       token_type=<роль токена доступа>)

   print(register_token)
   ```

   Здесь:

   - `client_name`: имя токена доступа, который будет создан с помощью этого регистрационного токена.
   - `access_ttl`: время жизни регистрационного токена, например, `2h45m30s`. Регистрационный токен с истекшим сроком жизни не получится использовать для создания токена доступа.
   - `refresh_ttl`: время жизни токена доступа, например, `2h`. Если не указывать этот параметр, то токен доступа будет действовать бессрочно.
   - `token_type`: роль токена доступа:

     - Значение `MLPTokenType.USER` соответствует роли `Пользователь`. Эта роль дает право выполнять операции, требующие авторизации при работе с библиотекой Cloud ML Platform (например, отправить задание на кластер Spark).
     - Значение `MLPTokenType.ADMIN` соответствует роли `Администратор`. Эта роль дает те же права, что и роль `Пользователь`, а также дает права на работу с токенами.

   После выполнения этого скрипта будет выведено значение созданного регистрационного токена доступа.

1. Предоставьте этот регистрационный токен другому пользователю, чтобы он мог использовать этот токен для создания токена доступа с заданными параметрами.

</tabpanel>
</tabs>

<info>

Cписок созданных регистрационных токенов не ведется. [Можно получить](#poluchenie_spiska_tokenov_dostupa) только список токенов доступа.

</info>

## Удаление токена доступа

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>Библиотека Cloud ML Platform</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный токен.
1. Перейдите в раздел **ML Platform → Токены**.
1. Раскройте меню нужного токена и выберите пункт **Удалить**.
1. Нажмите кнопку **Подтвердить**.

</tabpanel>
<tabpanel>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными.

</err>

1. Подготовьте окружение для работы с Python любым удобным способом, если это еще не сделано:

   <tabs>
   <tablist>
   <tab>С помощью VK Cloud</tab>
   <tab>Самостоятельно</tab>
   </tablist>
   <tabpanel>

   [Создайте инстанс JupyterHub](/ru/ml/mlplatform/jupyterhub/start/create) в проекте VK Cloud. Он уже содержит настроенные Python 3.x и pip, с которыми можно работать из блокнота JupyterHub (notebook).

   </tabpanel>
   <tabpanel>

   1. Установите Python 3.x и pip.
   1. При необходимости настройте виртуальное окружение (virtual environment) для Python.

   Например, можно воспользоваться [conda](https://conda.io/projects/conda/en/latest/index.html) или выполнить эти шаги вручную.

   </tabpanel>
   </tabs>

1. Установите библиотеку Cloud ML Platform для Python, если это еще не сделано.

   <tabs>
   <tablist>
   <tab>JupyterHub</tab>
   <tab>pip</tab>
   </tablist>
   <tabpanel>

   1. [Подключитесь к инстансу JupyterHub](/ru/ml/mlplatform/jupyterhub/start/connect).
   1. В блокноте JupyterHub создайте и выполните ячейку со следующим содержимым:

      ```bash
      %pip install https://mlplatform.hb.ru-msk.vkcs.cloud/mlplatform_client.tar.gz
      ```

   </tabpanel>
   <tabpanel>

   Выполните команду:

   ```bash
   pip install https://mlplatform.hb.ru-msk.vkcs.cloud/mlplatform_client.tar.gz
   ```

   </tabpanel>
   </tabs>

   По приведенной ссылке доступна актуальная версия библиотеки.

1. [Создайте токен доступа](#sozdanie_tokena_dostupa) с ролью `Администратор`, если у вас его еще нет.

1. [Получите список токенов доступа](#poluchenie_spiska_tokenov_dostupa) и определите имя токена, который нужно удалить.

1. Удалите токен доступа, выполнив скрипт Python:

   ```python
   from mlplatform_client import MLPlatform

   ADMIN_REFRESH_TOKEN = "<значение токена доступа с ролью Администратор>"
   REFRESH_TOKEN_NAME = "<имя токена доступа, который нужно удалить>"

   mlp = MLPlatform(ADMIN_REFRESH_TOKEN)
   mlp.delete_token(token_name=REFRESH_TOKEN_NAME)

   print("Token", REFRESH_TOKEN_NAME, "was deleted.")
   ```

   После выполнения этого скрипта будет выведено сообщение об удалении токена доступа.

</tabpanel>
</tabs>
