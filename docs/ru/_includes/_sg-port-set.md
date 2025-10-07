{tabs}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. [Получите имя или идентификатор](/ru/networks/vnet/instructions/ports#prosmotr_spiska_portov_i_informacii_o_nih) нужного порта.
1. [Получите имя или идентификатор](/ru/networks/vnet/instructions/secgroups#view_secgroups) нужной группы безопасности.
1. Назначьте группу безопасности на порт:

     ```console

     openstack port set --security-group <ИМЯ_ИЛИ_ID_ГРУППЫ> <ИМЯ_ИЛИ_ID_ПОРТА>
     
     ```

{/tab}

{/tabs}
