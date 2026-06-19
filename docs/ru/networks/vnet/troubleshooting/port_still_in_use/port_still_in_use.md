# {heading(Ошибка при привязке порта)[id=vnet-port-still-in-use]}

Ошибка `Port is still in use` означает, что порт все еще привязан к удаленной ВМ или другому ресурсу.  

### {heading(Решение)[id=vnet-port-still-in-use-resolve]}

1. {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-delete)[text=Удалите]} порт вручную.
1. Если порт не удаляется, возможно, он используется Floating IP-адресом. {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-disassociate)[text=Отвяжите]} его перед удалением порта.

Если проблема сохраняется, обратитесь в [техническую поддержку](/ru/contacts).
