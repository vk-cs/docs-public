
* Виртуальной машины нет в списке при создании резервной копии или плана резервного копирования. 
* В контекстном меню ВМ нет пункта **Создать бэкап**.

Проблема может возникнуть, если на ВМ нет метаданных, необходимых для резервного копирования. Пример: ВМ создана из загруженного образа или мигрирована с помощью Hystax.

### Решение

Если ВМ не нагружена и может быть пересоздана:

1. Добавьте образу ВМ метаданные:

   ```console
   openstack image set --property hw_qemu_guest_agent="yes" --property os_require_quiesce="yes" <ID_ОБРАЗА>
   ```

1. Пересоздайте ВМ из образа.
1. Установите на ВМ гостевой агент QEMU (пакет `qemu-guest-agent`):

   {caption(Ubuntu, Debian)[position=above]}
   ```console
   apt-get install qemu-guest-agent
   ```
   {/caption}

  {caption(CentOS)[position=above]}
  ```console
  yum install qemu-guest-agent
  ```
  {/caption}

1. Проверьте доступность резервных копий.
1. Проверьте возможность сброса пароля.

Если ВМ нагружена и не может быть пересоздана:

1. Добавьте диску ВМ метаданные:

   ```console
   openstack volume set --image-property hw_qemu_guest_agent="yes" --image-property os_require_quiesce="yes" <ID_ДИСКА>
   ```

1. Чтобы добавить ВМ метаданные, обратитесь в [техническую поддержку](/ru/contacts).
1. После подтверждения, что метаданные ВМ добавлены, выполните принудительную перезагрузку ВМ:

   1. Остановите ВМ:

      ```console
      openstack server stop <ID_ВМ>
      ```
      
   1. Дождитесь остановки ВМ и перезагрузите ее:

      ```console
      openstack server reboot --hard <ID_ВМ>
      ```
      
1. Установите на ВМ гостевой агент QEMU (пакет `qemu-guest-agent`):

   {caption(Ubuntu, Debian)[position=above]}
   ```console
   apt-get install qemu-guest-agent
   ```
   {/caption}

   {caption(CentOS)[position=above]}
   ```console
   yum install qemu-guest-agent
   ```
   {/caption}

1. Проверьте доступность резервных копий.
1. Проверьте возможность сброса пароля.