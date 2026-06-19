# {heading(Замена root-диска ВМ)[id=iaas-vm-root-replace]}

{note:warn}
Новый {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-root-boot)[text=root-диск]} должен содержать компоненты и системные файлы, необходимые для запуска и работы операционной системы виртуальной машины. Их отсутствие приведет к неработоспособности ВМ.
{/note}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Остановите ВМ]}, root-диск которой нужно заменить.
1. {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=Отключите от ВМ]} диск, который будет использован для замены root-диска.
1. При необходимости {linkto(../../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-clone-volume)[text=клонируйте]} целевой диск.
1. Откройте страницу с нужным списком дисков.

   - Все диски: перейдите в раздел **Облачные вычисления** → **Диски**.
   - Диски определенной виртуальной машины:

     1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
     1. В списке виртуальных машин нажмите на имя ВМ, root-диск которой нужно заменить.
     1. На странице ВМ перейдите на вкладку **Диски**.

1. Используйте один из способов, чтобы открыть окно замены диска.

   - Через контекстное меню диска:

     1. В списке дисков нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного диска.
     1. Выберите пункт **Заменить root-диск**.

   - На странице диска:

     1. Нажмите на имя диска, который нужно заменить.
     1. На странице диска перейдите на вкладку **Общая информация**.
     1. Над списком дисков нажмите кнопку **Еще** и выберите **Заменить root-диск**.

1. В открывшемся окне выберите **Новый root-диск** и нажмите кнопку **Заменить**.

   {note:info}
   Если нужного диска нет в списке, проверьте, что он {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=отключен от ВМ]}.
   {/note}

{/tab}

{ifdef(public)}
{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Получите {linkto(../../../../../tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token)[text=токен доступа]}.
1. Просмотрите список виртуальных машин и скопируйте ID виртуальной машины, root-диск которой нужно заменить:

   ```console
   openstack server list
   ```
1. {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Остановите]} эту ВМ.
1. Просмотрите список дисков:

   ```console
   openstack volume list --long
   ```

1. Проверьте параметры диска, который выбран на замену root-диска:

   - Диск отключен от ВМ (`Status`: `available`). Если нет, {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=отключите диск]}.
   - Диск является загрузочным (`Bootable`: `true`). Если нет, {linkto(../../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-changing-bootable-attribute)[text=сделайте загрузочным]}.

1. Скопируйте идентификатор выбранного диска.
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
{/ifdef}

{/tabs}