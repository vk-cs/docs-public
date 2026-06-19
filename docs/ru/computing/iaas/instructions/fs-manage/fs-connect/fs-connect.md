# {heading(Подключение и отключение файлового хранилища)[id=iaas-fs-connect]}

Подключение и отключение файловых хранилищ, запись и чтение данных доступны только на виртуальных машинах {var(cloud)}{ifdef(private,private-pg,private-pdf,private-pg-pdf)} семейства Linux {/ifdef}.

## {heading(Подключение файлового хранилища)[id=iaas-fs-connect-mount]}

Способ подключения файлового хранилища зависит от операционной системы виртуальной машины{ifdef(public)}, {linkto(#iaas-fs-connect-mount-windows)[text=Windows]} или {linkto(#iaas-fs-connect-mount-linux)[text=Linux]},{/ifdef} и протокола, выбранного при создании хранилища.

{ifdef(public)}
### {heading(Windows)[id=iaas-fs-connect-mount-windows]}

{tabs}

{tab(Протокол NFS)}

Подключить файловое хранилище по протоколу NFS в Windows можно с помощью компонента Windows Server — Клиент для NFS.

1. {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win)[text=Подключитесь]} к виртуальной машине {var(cloud)}.
1. Установите Клиент для NFS из интерфейса Диспетчера серверов или с помощью PowerShell:

   {tabs}
    
   {tab(Диспетчер серверов)}
        
   1. Откройте Диспетчер серверов и в меню **Управление** выберите **Добавить роли и компоненты**.
   1. Перейдите в раздел **Тип установки**, выберите опцию **Установка ролей и компонентов** и нажмите **Далее**.
   1. Перейдите в раздел **Компоненты**, выберите в списке **Клиент для NFS**.
   1. В том же списке раскройте опции **Средства удаленного администрирования серверов** → **Средства администрирования ролей** → **Средства файловых служб** и выберите **Службы для средств управления NFS**. Нажмите **Далее**.
   1. Проверьте, что выбраны все необходимые компоненты, и нажмите **Установить**.
   1. Дождитесь окончания установки и перезагрузите сервер.

   {/tab}
    
   {tab(PowerShell)}
    
   1. Установите Клиент для NFS и службы для средств управления NFS:

      ```console
      Install-WindowsFeature NFS-Client, RSAT-NFS-Admin
      ```

   1. Дождитесь окончания установки и перезагрузите сервер.

   {/tab}

   {/tabs}

1. Измените настройки клиента с помощью Диспетчера серверов:

   1. В меню **Средства** выберите **Службы для NFS**.
   1. Выберите **Клиент для NFS** и нажмите на значок **Отобразить окно свойств**.
   1. Задайте нужные настройки.

1. Подключите файловое хранилище:

   ```console
   mount <ТОЧКА_ПОДКЛЮЧЕНИЯ> <БУКВА_ДИСКА>:
   ```

   Здесь:

   - `<ТОЧКА_ПОДКЛЮЧЕНИЯ>` — адрес файлового хранилища. Чтобы узнать его, {linkto(../../../../../computing/iaas/instructions/fs-manage/fs-operations#iaas-fs-operations-info-view)[text=посмотрите]} информацию о файловом хранилище.
   - `<БУКВА_ДИСКА>` — заглавная латинская буква, которая не используется другими дисками.

{/tab}

{tab(Протокол CIFS)}

1. {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win)[text=Подключитесь]} к виртуальной машине {var(cloud)}.
1. Подключите файловое хранилище:

   ```console
   net use <БУКВА_ДИСКА>: <ТОЧКА_ПОДКЛЮЧЕНИЯ>
   ```
   
   Здесь:
   
   - `<ТОЧКА_ПОДКЛЮЧЕНИЯ>` — адрес файлового хранилища. Чтобы узнать его, {linkto(../../../../../computing/iaas/instructions/fs-manage/fs-operations#iaas-fs-operations-info-view)[text=посмотрите]} информацию о файловом хранилище.
   - `<БУКВА_ДИСКА>` — заглавная латинская буква, которая не используется другими дисками.

{/tab}

{/tabs}

### {heading(Linux)[id=iaas-fs-connect-mount-linux]}
{/ifdef}

{tabs}

{tab(Протокол NFS)}

   {ifdef(private,private-pg,private-pdf,private-pg-pdf)} 
1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. Выберите {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проект]}, где нужно создать файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите на имя файлового хранилища.
1. На вкладке **Общая информация** запомните значение поля **Точка подключения**.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Нажмите на имя ВМ.
1. Перейдите на вкладку **Консоль**.
   {/ifdef}
1. {ifdef(public)}{linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Подключитесь]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Подключитесь]}{/ifdef} к виртуальной машине {var(cloud)}.
1. Установите пакет для работы с протоколом NFS:

   {tabs}
   {tab(apt)}

   ```console
   sudo apt-get install nfs-common
   ```
   {/tab}
   {tab(dnf)}

   ```console
   sudo dnf install nfs-utils
   ```
   {/tab}
   {/tabs}

1. Создайте директорию для монтирования хранилища:

   ```console
   mkdir <ИМЯ_ДИРЕКТОРИИ>
   ```

1. Подключите файловое хранилище:

   ```console
   mount -t nfs <ТОЧКА_ПОДКЛЮЧЕНИЯ> ./<ИМЯ_ДИРЕКТОРИИ>
   ```

   Здесь:

   - `<ТОЧКА_ПОДКЛЮЧЕНИЯ>` — адрес файлового хранилища. Чтобы узнать его, {linkto(../../../../../computing/iaas/instructions/fs-manage/fs-operations#iaas-fs-operations-info-view)[text=посмотрите]} информацию о файловом хранилище.
   - `<ИМЯ_ДИРЕКТОРИИ>` — имя директории, созданной ранее.

{/tab}

{tab(Протокол CIFS)}

   {ifdef(private,private-pg,private-pdf,private-pg-pdf)}
1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. Выберите {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проект]}, где нужно создать файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите на имя файлового хранилища.
1. На вкладке **Общая информация** запомните значение поля **Точка подключения**.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Нажмите на имя ВМ.
1. Перейдите на вкладку **Консоль**.
   {/ifdef}
1. {ifdef(public)}{linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Подключитесь]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Подключитесь]}{/ifdef} к виртуальной машине {var(cloud)}.
1. Установите пакет для работы с протоколом CIFS:

   {tabs}
   {tab(apt)}

   ```console
   sudo apt install -y cifs-utils
   ```
   {/tab}
   {tab(dnf)}

   ```console
   sudo dnf install cifs-utils
   ```
   {/tab}
   {/tabs}

1. Создайте директорию для монтирования хранилища:

   ```console
   mkdir <ИМЯ_ДИРЕКТОРИИ>
   ```

1. Подключите файловое хранилище:

   ```console
   sudo mount -o user=,password= -t cifs <ТОЧКА_ПОДКЛЮЧЕНИЯ> ./<ИМЯ_ДИРЕКТОРИИ>
   ```

   Здесь:

   - `<ТОЧКА_ПОДКЛЮЧЕНИЯ>` — адрес файлового хранилища. Чтобы узнать его, {linkto(../../../../../computing/iaas/instructions/fs-manage/fs-operations#iaas-fs-operations-info-view)[text=посмотрите]} информацию о файловом хранилище.
   - `<ИМЯ_ДИРЕКТОРИИ>` — имя директории, созданной ранее.

{/tab}

{/tabs}

## {heading(Отключение файлового хранилища)[id=iaas-fs-connect-unmount]}

Способ отключения файлового хранилища зависит от операционной системы виртуальной машины и протокола, выбранного при создании хранилища.

{ifdef(public)}
{tabs}

{tab(Windows)}

1. {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win)[text=Подключитесь]} к виртуальной машине {var(cloud)}.
1. Отключите файловое хранилище, выполнив команду:

   {tabs}
   
   {tab(Протокол NFS)}
   
   ```console
   umount <БУКВА_ДИСКА>:
   ```
   
   {/tab}
   {tab(Протокол CIFS)}
   
   ```console
   net use <БУКВА_ДИСКА>: /delete
   ```
   
   {/tab}
   
   {/tabs}

{/tab}

{tab(Linux)}

1. {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Подключитесь]} к виртуальной машине {var(cloud)}.
1. Отключите файловое хранилище, выполнив команду:

   {tabs}
   
   {tab(Протоколы NFS/CIFS)}
   
   ```console
   sudo umount <ТОЧКА_МОНТИРОВАНИЯ>
   ```
   Здесь `<ТОЧКА_МОНТИРОВАНИЯ>` — директория, в которую монтировано файловое хранилище.
   {/tab}
   
   {/tabs}

{note:info}
После перезагрузки ВМ система автоматически монтирует файловые хранилища, указанные в конфигурационном файле `/etc/fstab`. Чтобы этого не произошло, удалите из файла `/etc/fstab` запись об этом файловом хранилище.
{/note}

{/tab}

{/tabs}

{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf)}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. Выберите {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проект]}, где нужно создать файловое хранилище.
1. Перейдите в раздел **Облачные вычисления** → **Файловое хранилище**.
1. Нажмите на имя файлового хранилища.
1. На вкладке **Общая информация** запомните значение поля **Точка подключения**.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Нажмите на имя ВМ.
1. Перейдите на вкладку **Консоль**.
1. {linkto(../../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Подключитесь]} к виртуальной машине {var(cloud)}.
1. Отключите файловое хранилище, выполнив команду:

   {tabs}

   {tab(Протоколы NFS/CIFS)}

   ```console
   sudo umount <ТОЧКА_МОНТИРОВАНИЯ>
   ```
   Здесь `<ТОЧКА_МОНТИРОВАНИЯ>` — директория, в которую монтировано файловое хранилище.
   {/tab}

   {/tabs}

{note:info}
После перезагрузки ВМ система автоматически монтирует файловые хранилища, указанные в конфигурационном файле `/etc/fstab`. Чтобы этого не произошло, удалите из файла `/etc/fstab` запись об этом файловом хранилище.
{/note}

{/ifdef}