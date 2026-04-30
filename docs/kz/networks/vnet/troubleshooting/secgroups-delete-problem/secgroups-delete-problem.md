{include(/kz/_includes/_translated_by_ai.md)}

Қауіпсіздік тобын жою кезінде қате пайда болады:

```text
Failed to delete group with name or ID 'f4ad1825-XXXX-XXXX-XXXX': ConflictException: 409:
Client Error for url: https://infra.mail.ru:9696/v2.0/security-groups/f4ad1825-XXXX-XXXX-XXXX,
Security Group f4ad1825-XXXX-XXXX-XXXX in use.
1 of 1 groups failed to delete.
```

Мәселе қауіпсіздік тобы пайдаланылып, порттарға байланып тұрған кезде туындайды.

### Шешім

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz), көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz) жобада.
1. Қосымша `neutron` [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#2_opcionaldy_kosymsha_paketterdi_ornatynyz).
1. Қауіпсіздік тобымен байланысты порт идентификаторларының тізімін алыңыз:

   ```console
   neutron port-list -c id -c name -c security_groups | grep <ID_ГРУППЫ_БЕЗОПАСНОСТИ> | awk '{print $2}'
   ```
   Мұнда `<ID_ГРУППЫ_БЕЗОПАСНОСТИ>` — [жою мүмкін болмаған қауіпсіздік тобының идентификаторы](/kz/networks/vnet/instructions/secgroups#view_secgroups).

1. Қауіпсіздік тобын әрбір порттан ажыратыңыз:

   ```console
   openstack port unset --security-group <ID_ГРУППЫ_БЕЗОПАСНОСТИ> <ID_ПОРТА>
   ```
   Мұнда:

   * `<ID_ГРУППЫ_БЕЗОПАСНОСТИ>` — жою мүмкін болмаған қауіпсіздік тобының идентификаторы.
   * `<ID_ПОРТА>` — бұрын алынған тізімдегі порт идентификаторы.

1. Қауіпсіздік тобын жойыңыз:

   ```console
   openstack security group delete <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

1. Егер мәселе сақталса, [техникалық қолдау қызметіне хабарласыңыз](/kz/contacts). 