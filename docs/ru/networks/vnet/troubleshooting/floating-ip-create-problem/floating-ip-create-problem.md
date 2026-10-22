# {heading(Не удается добавить Floating IP-адрес)[id=vnet-floating-ip-create-problem]}

При добавлении Floating IP-адреса возникает ошибка.

Возможные причины:

- исчерпана {linkto(../../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-nets-subnets-ips)[text=квота]} проекта на количество внешних IP-адресов;
- во {linkto(../../concepts/net-types#vnet-net-types-external-net)[text=внешней сети]}, из которой выделяются адреса, нет свободных адресов.

### {heading(Решение)[id=vnet-floating-ip-create-problem-resolve]}

1. Проверьте квоты проекта на количество адресов.

   Если квота исчерпана, запросите ее увеличение в [технической поддержке](/ru/contacts).

1. Если квота не исчерпана, а ошибка сохраняется, проверьте, выделяется ли адрес из пула внешней сети:

   ```console
   openstack floating ip create <ИМЯ_ИЛИ_ID_ВНЕШНЕЙ_СЕТИ>
   ```

   Если адрес не выделяется, команда завершится ошибкой. Обратитесь в [техническую поддержку](/ru/contacts) и укажите имя внешней сети и текст ошибки.

