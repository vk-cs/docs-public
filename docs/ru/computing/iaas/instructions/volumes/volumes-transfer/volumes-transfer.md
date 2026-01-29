{tabs}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

2. Авторизуйтесь в проекте, из которого нужно переместить диск.
3. [Отключите от ВМ](../../../instructions/volumes/volumes-connect#dismount_disk) диск, который нужно переместить.
4. Просмотрите список дисков:

   ```console
   openstack volume list --long
   ```

5. Убедитесь, что диск отключен от ВМ (`Status`: `available`).
6. Скопируйте ID диска.
7. Создайте запрос на перемещение диска:

   ```console
   openstack volume transfer request create <ID_ДИСКА>
   ```

8. Скопируйте ключ авторизации `auth_key` и идентификатор запроса `id`.
9. Просмотрите список дисков и убедитесь, что статус перемещаемого диска изменился на `awaiting-transfer`:

   ```console
   openstack volume list
   ```

10. Авторизуйтесь в проекте, в который нужно переместить диск.
11. Примите запрос на перемещение диска, указав ключ авторизации `auth_key` и идентификатор `id`:

      ```console
      openstack volume transfer request accept --auth-key <КЛЮЧ_АВТОРИЗАЦИИ> <ID_ЗАПРОСА>
      ```

12. Убедитесь, что диск появился в проекте:

      ```console
      openstack volume show <ID_ДИСКА>
      ```

**Дополнительные команды для работы с запросами на перенос диска**

- Просмотреть список запросов на перенос:

   ```console
   openstack volume transfer request list
   ```

- Удалить запрос на перенос:

   ```console
   openstack volume transfer request delete <ID_ЗАПРОСА>
   ```

{/tab}

{/tabs}