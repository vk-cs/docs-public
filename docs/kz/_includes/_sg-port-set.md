{tabs}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz).
1. Қажетті порттың [атын немесе идентификаторын алыңыз](/kz/networks/vnet/instructions/ports#porttar_tizimin_zhne_olar_turaly_akparatty_karau).
1. Қажетті қауіпсіздік тобының [атын немесе идентификаторын алыңыз](/kz/networks/vnet/instructions/secgroups#view_secgroups).
1. Қауіпсіздік тобын портқа тағайындаңыз:

     ```console

     openstack port set --security-group <ИМЯ_ИЛИ_ID_ГРУППЫ> <ИМЯ_ИЛИ_ID_ПОРТА>
     
     ```

{/tab}

{/tabs}
