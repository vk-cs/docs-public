# {heading(Пропала сеть после перезагрузки ВМ)[id=iaas-vm-after-restart-problem]}

Пропал доступ к сети после перезагрузки виртуальной машины.

Ошибка может быть вызвана различными причинами.

### {headingРешение)[id=iaas-vm-after-restart-problem-decision]}

{linkto(../../../../computing/iaas/how-to-guides/interface-settings-check#iaas-interface-settings-check-access)[text=Проверьте]} настройки сетевого интерфейса внутри ОС (файлы конфигурации `netplan` или `ifcfg`). Возможно, интерфейс не получает IP-адрес по DHCP или изменилось имя интерфейса.

В аварийных ситуациях и при отсутствии подключения к виртуальной машине по сети используйте {linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console)[text=VNC-консоль]}.
