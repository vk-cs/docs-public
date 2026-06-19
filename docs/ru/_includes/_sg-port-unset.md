{tabs}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=Получите имя или идентификатор]} нужного порта.
1. {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-view)[text=Получите имя или идентификатор]} нужной группы безопасности.
1. Отвяжите от порта:

   {tabs}

   {tab(Одну группу безопасности)}

   ```console
   openstack port unset --security-group <ИМЯ_ИЛИ_ID_ГРУППЫ> <ИМЯ_ИЛИ_ID_ПОРТА>
   ```

   {/tab}

   {tab(Все группы безопасности)}

   ```console
   openstack port set --no-security-group <ИМЯ_ИЛИ_ID_ПОРТА>
   ```

   {/tab}

   {/tabs}

{/tab}

{/tabs}
