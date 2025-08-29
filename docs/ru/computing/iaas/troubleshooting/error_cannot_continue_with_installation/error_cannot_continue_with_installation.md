При попытке создать ВМ появляется сообщение `Cannot continue with installation, no valid storage devices detected`.

Ошибка связана с тем, что в установочном образе нет драйверов для дискового контроллера VirtIO. 

### Решение

Добавьте драйверы VirtIO в установочный образ.