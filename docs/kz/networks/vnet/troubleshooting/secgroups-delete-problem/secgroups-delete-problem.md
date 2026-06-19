# {heading(Қауіпсіздік тобын жою мүмкін емес)[id=vnet-secgroups-delete-problem]}

{include(/kz/_includes/_translated_by_ai.md)}

Қауіпсіздік тобын жою кезінде қате пайда болады:

```text
Failed to delete group with name or ID 'f4ad1825-XXXX-XXXX-XXXX': ConflictException: 409:
Client Error for url: https://infra.mail.ru:9696/v2.0/security-groups/f4ad1825-XXXX-XXXX-XXXX,
Security Group f4ad1825-XXXX-XXXX-XXXX in use.
1 of 1 groups failed to delete.
```

Мәселе қауіпсіздік тобы пайдаланылып, порттарға байланып тұрған кезде туындайды.

### {heading(Шешім)[id=vnet-secgroups-delete-problem-resolve]}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. Қосымша `neutron` пакеті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=орнатылғанына]} көз жеткізіңіз.
1. Қауіпсіздік тобымен байланысты порт идентификаторларының тізімін алыңыз:

   ```console
   neutron port-list -c id -c name -c security_groups | grep <ID_ГРУППЫ_БЕЗОПАСНОСТИ> | awk '{print $2}'
   ```
   Мұнда `<ID_ГРУППЫ_БЕЗОПАСНОСТИ>` — {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-view)[text=жою мүмкін болмаған қауіпсіздік тобының идентификаторы]}.

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
