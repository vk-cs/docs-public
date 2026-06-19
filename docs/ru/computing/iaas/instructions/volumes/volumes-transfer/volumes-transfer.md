# {heading(Перемещение диска между проектами)[id=iaas-volumes-transfer]}

{tabs}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Авторизуйтесь в проекте, из которого нужно переместить диск.
1. {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=Отключите от ВМ]} диск, который нужно переместить.
1. Просмотрите список дисков:

   ```console
   openstack volume list --long
   ```

1. Убедитесь, что диск отключен от ВМ (`Status`: `available`).
1. Скопируйте ID диска.
1. Создайте запрос на перемещение диска:

   ```console
   openstack volume transfer request create <ID_ДИСКА>
   ```

1. Скопируйте ключ авторизации `auth_key` и идентификатор запроса `id`.
1. Просмотрите список дисков и убедитесь, что статус перемещаемого диска изменился на `awaiting-transfer`:

   ```console
   openstack volume list
   ```

1. Авторизуйтесь в проекте, в который нужно переместить диск.
1. Примите запрос на перемещение диска, указав ключ авторизации `auth_key` и идентификатор `id`:

   ```console
   openstack volume transfer request accept --auth-key <КЛЮЧ_АВТОРИЗАЦИИ> <ID_ЗАПРОСА>
   ```

1. Убедитесь, что диск появился в проекте:

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