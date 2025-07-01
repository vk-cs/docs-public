При удалении группы безопасности возникает ошибка:

```text
Failed to delete group with name or ID 'f4ad1825-XXXX-XXXX-XXXX': ConflictException: 409:
Client Error for url: https://infra.mail.ru:9696/v2.0/security-groups/f4ad1825-XXXX-XXXX-XXXX,
Security Group f4ad1825-XXXX-XXXX-XXXX in use.
1 of 1 groups failed to delete.
```

Проблема возникает, если группа безопасности используется и привязана к портам.

### Решение

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Убедитесь, что дополнительный пакет `neutron` [установлен](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety).
1. Получите список идентификаторов портов, связанных с группой безопасности:

   ```console
   neutron port-list -c id -c name -c security_groups | grep <ID_ГРУППЫ_БЕЗОПАСНОСТИ> | awk '{print $2}'
   ```
   Здесь `<ID_ГРУППЫ_БЕЗОПАСНОСТИ>` — [идентификатор группы безопасности](/ru/networks/vnet/instructions/secgroups#prosmotr_spiska_grupp_bezopasnosti_i_informacii_o_nih), которую не получилось удалить.

1. Отвяжите группу безопасности от каждого порта:

   ```console
   openstack port unset --security-group <ID_ГРУППЫ_БЕЗОПАСНОСТИ> <ID_ПОРТА>
   ```
   Здесь:

   * `<ID_ГРУППЫ_БЕЗОПАСНОСТИ>` — идентификатор группы безопасности, которую не получилось удалить.
   * `<ID_ПОРТА>` — идентификатор порта из списка, полученного ранее.

1. Удалите группу безопасности:

   ```console
   openstack security group delete <ID_ГРУППЫ_БЕЗОПАСНОСТИ>
   ```

1. Если проблема сохраняется, [обратитесь в техническую поддержку](/ru/contacts). 