# {heading(Ошибка Cannot continue with installation)[id=iaas-error-cannot-continue-with-installation]}

При попытке создать ВМ появляется сообщение `Cannot continue with installation, no valid storage devices detected`.

Ошибка связана с тем, что в установочном образе нет драйверов для дискового контроллера VirtIO. 

### {heading(Решение)[id=iaas-error-cannot-continue-with-installation-decision]}

Добавьте драйверы VirtIO в установочный образ.
