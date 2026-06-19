# {heading(Не получается удалить подсеть)[id=vnet-subnet-delete-problem]}

При удалении подсети возникает ошибка:

```text
Unable to complete operation on subnet: One or more ports have an IP allocation from this subnet. 1 of 1 subnets failed to delete
```

Все доступные порты в подсети удалены, но есть порты, которые не получается удалить.

Проблема возникает, если была удалена виртуальная машина, а порт остался и все еще считается подключенным к этой ВМ. Поэтому при попытке удалить подсеть с таким портом возникает ошибка.

### {heading(Решение)[id=vnet-subnet-delete-problem-resolve]}

1. Отвяжите порт от удаленной ВМ, для этого привяжите его к несуществующему ресурсу: 

   ```console
   openstack port set --device-owner <ПРОИЗВОЛЬНЫЙ_ТЕКСТ> <ИМЯ_ИЛИ_ID_ПОРТА>
   ```
   Здесь:

   - `<ПРОИЗВОЛЬНЫЙ_ТЕКСТ>` — любое имя или идентификатор несуществующего ресурса.
   - `<ИМЯ_ИЛИ_ID_ПОРТА>` — {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-view)[text=идентификатор группы безопасности]}, привязанного к удаленной ВМ.

1. Попробуйте удалить подсеть:

   ```console
   openstack subnet delete <ID_ПОДСЕТИ>
   ```
   Здесь `<ID_ПОДСЕТИ>` — {linkto(../../../../networks/vnet/instructions/net#vnet-net-view)[text=идентификатор подсети]}, которую нужно удалить.

1. Если проблема сохраняется, обратитесь {ifdef(public)}в [техническую поддержку](/ru/contacts){/ifdef}{ifdef(private,private-pg)}к администратору {var(cloud)}{/ifdef}.
