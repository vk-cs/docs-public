На платформе VK Cloud при создании виртуальной машины можно выбрать операционную систему семейства Microsoft Windows или Linux. Для создания ВМ с операционной системой, которой нет в списке платформы, используйте файл [образа](../image-vm) виртуальной машины с нужной ОС.

В VK Cloud поддерживается миграция ОС Windows серверных версий:

- Windows Server 2008 / 2008 R2;
- Windows Server 2012 / 2012 R2;
- Windows Server 2016;
- Windows Server 2019;
- Windows Server 2022.

<warn>

В облаке VK Cloud невозможно использовать операционные системы Windows 7 / 8 / 8.1 / 10 / 11. Это ограничение установлено для всех проектов и не может быть снято.

</warn>

## {heading(Учетная запись по умолчанию)[id=default_account]}

В операционных системах образов VK Cloud (кроме ОС Bitrix) учетная запись `root` заблокирована в целях безопасности и добавлена учетная запись для использования по умолчанию.

Имя учетной записи по умолчанию вы можете посмотреть в списке ниже или в окне [установки пароля](../../service-management/vm/vm-manage#password).

<details>
<summary>Список учетных записей по умолчанию для разных ОС</summary>

| Операционная система | Имя пользователя |
| ---                  | ---              |
| AlmaLinux            | almalinux        |
| ALT Linux            | altlinux         |
| Astra Linux          | astra            |
| Bitrix               | root             |
| CentOS               | centos           |
| Debian               | debian           |
| Fedora               | fedora           |
| FreeBSD              | freebsd          |
| openSUSE             | opensuse         |
| Ubuntu               | ubuntu           |
| РЕД ОС               | redos            |
| Windows              | Admin            |

</details>

## Лицензии

VK Cloud обладает правом лицензировать программное обеспечение на основании соглашений с компаниями:

- Microsoft (Microsoft Services Provider License Agreement — SPLA);
- РЕД СОФТ;
- BaseALT;
- Астра Линукс.

Подробнее — в разделе [Лицензии для ВМ](/ru/computing/vm-licenses).
