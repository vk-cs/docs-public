{tabs}

{tab(OpenStack CLI)}

1. OpenStack клиентінің {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. Қажетті порттың {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=атауын немесе идентификаторын алыңыз]}.
1. Қажетті қауіпсіздік тобының {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-view)[text=атауын немесе идентификаторын алыңыз]}.
1. Порттан ажыратыңыз:

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
