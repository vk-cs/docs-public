{includetag(mcs_admin_vm)}
Название в личном кабинете: `Администратор виртуальных машин`.

Роль предоставляет полный доступ к управлению виртуальными машинами в {linkto(/ru/computing/iaas/concepts/about#iaas-about)[text=Cloud Servers]}, включая создание, изменение и удаление. Также предоставляется полный доступ к управлению сетями в {linkto(/ru/networks/vnet/concepts/about#vnet-about)[text=Cloud Network]}.

Не может настраивать резервное копирование виртуальных машин с помощью {linkto(/ru/storage/backups/concepts/about#backup-about)[text=Cloud Backup]}.

{/includetag}

{includetag(mcs_junior_admin_vm)}
Название в личном кабинете: `Младший администратор ВМ`.

Роль с теми же привилегиями, что и у роли `mcs_admin_vm`, но без возможности управлять группами безопасности.

{/includetag}

{includetag(mcs_operator_vm)}
Название в личном кабинете: `Оператор ВМ`.

Роль используется только для работы с уже созданными виртуальными машинами {linkto(/ru/computing/iaas/concepts/about#iaas-about)[text=Cloud Servers]} и сетями {linkto(/ru/networks/vnet/concepts/about#vnet-about)[text=Cloud Network]}:

- запуск или остановка ВМ;
- работа с ВМ через {linkto(/ru/computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=VNC-консоль]};
- подключение к ВМ через {linkto(/ru/computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=SSH]} или {linkto(/ru/computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win)[text=RDP]};
- просмотр параметров ВМ и сетевых настроек.

{/includetag}