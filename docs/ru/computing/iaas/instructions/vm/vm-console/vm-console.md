# {heading(Диагностика ВМ)[id=iaas-vm-console]}

В аварийных ситуациях {ifdef(public)}и при отсутствии {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix-os)[text=подключения к виртуальной машине]} по сети{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}для подключения к ВМ{/ifdef} используйте {linkto(#iaas-vm-console-vnc)[text=VNC-консоль]} или просмотрите {linkto(#iaas-vm-console-logs)[text=логи сообщений ВМ]}.

{note:info}
Информация о действиях пользователя с ВМ и об изменении ее состояния содержится в {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-view-logs)[text=журнале событий]} OpenStack CLI.
{/note}

## {heading(VNC-консоль)[id=iaas-vm-console-vnc]}

VNC-консоль — инструмент диагностики и управления виртуальными машинами, который работает в браузере. {ifdef(public)}Воспользуйтесь VNC-консолью, если:

- виртуальная машина не имеет внешнего IP-адреса или не подключена к интернету;
- рекомендованные способы подключения к ВМ (по {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=SSH]} или {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win)[text=RDP]}) не работают.
{/ifdef}

Доступ к VNC-консоли появляется сразу после запуска виртуальной машины. Это позволяет обнаружить сбои во время загрузки операционной системы.

Особенности работы с VNC-консолью:

- для ввода текста можно использовать только латиницу;
- буфер обмена в VNC-консоли недоступен, скопировать и вставить текст нельзя.

Чтобы подключиться к ВМ с помощью VNC-консоли:

1. Откройте консоль в личном кабинете {var(cloud)} или используйте адрес, полученный через OpenStack CLI.

   {tabs}

   {tab(Личный кабинет)}

   1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
   1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
   1. В списке виртуальных машин нажмите на имя нужной ВМ.
   1. На странице ВМ перейдите на вкладку **Консоль**.

   {/tab}

   {tab(OpenStack CLI)}

   1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
   1. Получите ссылку на страницу с VNC-консолью.

      ```console
      openstack console url show <ID_ВМ>
      ```

      Пример вывода:

      ```console
      +-------+------------------------------------------------------------------+
      | Field | Value                                                            |
      +-------+------------------------------------------------------------------+
      | type  | novnc                                                            |
      | url   | https://infra.mail.ru:6080/vnc_auto.html?token=<ЗНАЧЕНИЕ_ТОКЕНА> |
      +-------+------------------------------------------------------------------+
      ```

   1. Используйте ссылку, чтобы открыть страницу с VNC-консолью в браузере.

      {note:info}
      Если время действия ссылки закончилось, выполните команду еще раз, чтобы получить новую ссылку.
      {/note}

   {/tab}

   {/tabs}

1. Если виртуальная машина не запущена, нажмите кнопку запуска на вкладке.
1. {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-password)[text=Установите пароль]} для входа в ОС, если это не было сделано ранее. Запишите имя учетной записи и пароль.
1. (Опционально) Нажмите кнопку **Открыть в новом окне**, чтобы открыть консоль в отдельном окне браузера.
1. Введите логин и пароль в консоли.

В интерфейсе личного кабинета и в отдельном окне доступны кнопки управления VNC-консолью:

- **Send CtrAltDel** — действие кнопки зависит от операционной системы ВМ (перезагрузка, вызов окна блокировки и т.д.).
- **Обновить сессию** (**Update Session**) — используйте для переподключения к VNC-консоли.

## {heading(Логи сообщений ВМ)[id=iaas-vm-console-logs]}

{ifdef(public)}
В OpenStack CLI реализована поддержка консоли, работающей через последовательный порт ВМ. Это позволяет просмотреть логи загрузки и другую диагностическую информацию вне зависимости от состояния операционной системы и доступа к ВМ по сети.

Если виртуальная машина была создана из пользовательского образа, настройте консоль. Для этого добавьте в GRUB параметры:

```console
console=tty0 console=ttyS0,115200n8
```
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
### {heading(Настройка серийной консоли)[id=iaas_vm_manage_eventlog_vnc]}

Чтобы настроить вывод логов в серийную консоль (на примере команд Linux):

{note:warn}
Данная инструкция применяется только при использовании собственных образов.
{/note}

1. Получите список доступных в системе COM-портов:

   ```console
   dmesg | grep ttyS
   ```

   Пример ожидаемого результата:

   ```console
   [0.883874] 00:04: ttyS0 at I/O 0x3f8 (irq = 4, base_baud = 115200) is a 16550A
   ```

1. Добавьте в файл `/etc/default/grub` строку:

   ```sh
   GRUB_CMDLINE_LINUX="console=tty0 console=ttyS0,115200n8"
   ```
   
1. Обновите загрузчик `grub`:

   ```console
   sudo update-grub
   ```
   
   Если команда не найдена:

    1. Создайте файл `/usr/sbin/update-grub`:

       ```console
       sudo vim /usr/sbin/update-grub
       ```
       
    1. Заполните файл следующим содержимым:

       ```sh
       #!/bin/sh
       set -e
       exec grub-mkconfig -o /boot/grub/grub.cfg "$@"----
       ```
       
    1. Измените владельца файла и выдайте полные права на файл:

       ```console
       sudo chown root:root /usr/sbin/update-grub
       sudo chmod 755 /usr/sbin/update-grub
       ```

## {heading(Просмотр журнала)[id=iaas_vm_manage_eventlog_view]}

Чтобы просмотреть журнал серийной консоли:
{/ifdef}

{tabs}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
{tab(Личный кабинет)}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Нажмите на имя ВМ.
1. Перейдите на вкладку **Логи**.

Вы можете просмотреть только часть информации лога, для этого над консолью укажите нужное количество строк и нажмите кнопку **Применить**.

Чтобы просмотреть всю информацию по логу, нажмите кнопку **Просмотр полного лога**.

Чтобы выгрузить лог в TXT-файл, нажмите кнопку **Выгрузить лог в файл**.

{/tab}

{/ifdef}

{tab(OpenStack CLI)}

Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.

- Вывести все записи логов:

  ```console
  openstack console log show <ID_ВМ>
  ```

- Вывести ограниченное количество записей:

  ```console
  openstack console log show --lines <КОЛИЧЕСТВО_ЗАПИСЕЙ> <ID_ВМ>
  ```

{/tab}

{/tabs}
