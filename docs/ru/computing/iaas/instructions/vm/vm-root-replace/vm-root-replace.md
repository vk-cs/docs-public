{note:warn}
Новый [root-диск](/ru/computing/iaas/concepts/data-storage/disk-types#root_boot_disk) должен содержать компоненты и системные файлы, необходимые для запуска и работы операционной системы виртуальной машины. Их отсутствие приведет к неработоспособности ВМ.
{/note}

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. [Остановите ВМ](../vm-manage#start_stop_restart_vm), root-диск которой нужно заменить.
1. [Отключите от ВМ](../../volumes/volumes-connect#dismount_disk) диск, который будет использован для замены root-диска.
1. При необходимости [клонируйте](../../volumes/volumes-manage#clone_volume) целевой диск.
1. Откройте страницу с нужным списком дисков.

   - Все диски: перейдите в раздел **Облачные вычисления → Диски**.

   - Диски определенной виртуальной машины:

      1. Перейдите в раздел **Облачные вычисления → Виртуальные машины**.
      2. В списке виртуальных машин нажмите на имя ВМ, root-диск которой нужно заменить.
      3. На странице ВМ перейдите на вкладку **Диски**.

1. Используйте один из способов, чтобы открыть окно замены диска.

   - Через контекстное меню диска:

      1. В списке дисков нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного диска.
      2. Выберите пункт **Заменить root-диск**.

   - На странице диска:

      1. Нажмите на имя диска, который нужно заменить.
      2. На странице диска перейдите на вкладку **Общая информация**.
      3. Над списком дисков нажмите кнопку **Еще** и выберите **Заменить root-диск**.

1. В открывшемся окне выберите **Новый root-диск** и нажмите кнопку **Заменить**.

   {note:info}

   Если нужного диска нет в списке, проверьте, что он [отключен от ВМ](../../volumes/volumes-connect#dismount_disk).

   {/note}

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

1. Получите [токен доступа](/ru/tools-for-using-services/api/rest-api/case-keystone-token).
1. Просмотрите список виртуальных машин и скопируйте ID виртуальной машины, root-диск которой нужно заменить:

   ```console
   openstack server list
   ```
1. [Остановите](../vm-manage#start_stop_restart_vm) эту ВМ.

1. Просмотрите список дисков:

   ```console
   openstack volume list --long
   ```

1. Проверьте параметры диска, который выбран на замену root-диска:

   - Диск отключен от ВМ (`Status`: `available`). Если нет, [отключите диск](../../volumes/volumes-connect#dismount_disk).
   - Диск является загрузочным (`Bootable`: `true`). Если нет, [сделайте загрузочным](/ru/computing/iaas/instructions/volumes/volumes-manage#changing_bootable_attribute).

1. Скопируйте ID выбранного диска.
1. Замените root-диск:

   {tabs}

   {tab(Linux)}

   Выполните команду:

   ```console
   curl -g -i -X POST https://infra.mail.ru:8774/v2.1/servers/<ID_ВИРТУАЛЬНОЙ_МАШИНЫ>/action \
   -H "Accept: application/json" \
   -H "Content-Type: application/json" \
   -H "User-Agent: python-cinderclient" \
   -H "X-Auth-Token: <ТОКЕН>" \
   -d '{"replaceRoot": {"volume_id": "<ID_ЗАМЕНЯЮЩЕГО_ДИСКА>"}}'
   ```

   {/tab}

   {tab(Windows)}

   В PowerShell выполните команду:

   ```console
   curl.exe -g -i -X POST "https://infra.mail.ru:8774/v2.1/servers/<ID_ВИРТУАЛЬНОЙ_МАШИНЫ>/action" `
   -H "Accept: application/json" `
   -H "Content-Type: application/json" `
   -H "User-Agent: python-cinderclient" `
   -H "X-Auth-Token: <ТОКЕН>" `
   -d "{\"replaceRoot\": {\"volume_id\": \"<ID_ЗАМЕНЯЮЩЕГО_ДИСКА>\"}}"
   ```

   {/tab}

   {/tabs}


{/tab}

{/tabs}