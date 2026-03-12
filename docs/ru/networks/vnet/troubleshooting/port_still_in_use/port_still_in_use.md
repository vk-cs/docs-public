Ошибка `Port is still in use` означает, что порт все еще привязан к удаленной ВМ или другому ресурсу.  

### Решение

1. [Удалите](/ru/networks/vnet/instructions/ports#udalenie_porta) порт вручную.
1. Если порт не удаляется, возможно, он используется Floating IP-адресом. [Отвяжите](/ru/networks/vnet/instructions/ip/floating-ip#disassociate) его перед удалением порта.

Если проблема сохраняется, [обратитесь в техническую поддержку](https://cloud.vk.com/contacts/).
