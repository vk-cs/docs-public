# {heading(Создание образа с помощью diskimage-builder)[id=iaas-diskimage-builder]}

Список поддерживаемых образов доступен в [официальной документации](https://docs.openstack.org/diskimage-builder/latest/user_guide/supported_distros.html) утилиты `diskimage-builder`.

В качестве примера рассматривается создание и настройка образа ВМ с ОС OpenSuse Leap. Все действия выполняются на локальном компьютере с ОС Ubuntu.

## {heading(Подготовительные шаги)[id=iaas-diskimage-builder-preparatory-steps]}

1. Освободите на вашем компьютере не менее 3 ГБ дискового пространства.
1. Подключите компьютер к сети с доступом в интернет.

## {heading(1. Установите необходимое ПО)[id=iaas-diskimage-builder-install-software]}

1. Настройте поддержку Python-библиотек:

   ```console
   sudo apt update
   sudo apt -y install python-pip curl
   ```

1. Установите пакет `qemu-utils`, который предоставляет утилиты [QEMU](https://www.qemu.org/):

   ```console
   sudo apt install qemu-utils
   ```

1. Установите приложение `virtualenv` для создания виртуального окружения Python, как описано в [официальной документации](https://virtualenv.pypa.io/en/latest/installation.html).
1. Узнайте версию Python, установленную на вашем компьютере:

   ```console
   python –version
   ```

1. Создайте и активируйте виртуальное окружение Python, последовательно выполнив команды:

   ```console
   virtualenv -p python<ВЕРСИЯ_PYTHON> venv_py<ВЕРСИЯ_PYTHON>
   source venv_py<ВЕРСИЯ_PYTHON>/bin/activate
   ```

1. Установите утилиту `diskimage-builder`:

   ```console
   pip install git+https://opendev.org/openstack/diskimage-builder.git
   ```

## {heading(2. Соберите образ ВМ с ОС OpenSuse Leap)[id=iaas-diskimage-builder-image-build]}

Выполните команду:

```console
DIB_RELEASE=15.3 disk-image-create -t raw -o opensuse-15.3.raw vm opensuse
```

Будет создан файл `opensuse-15.3.raw` с образом ВМ в формате RAW.

{note:info}
Чтобы собрать образ ВМ с желаемыми свойствами, используйте дополнительные аргументы команды `disk-image-create`. Подробнее в [официальной документации](https://docs.openstack.org/diskimage-builder/latest/user_guide/building_an_image.html).
{/note}

## {heading(3. Загрузите образ в {var(cloud)})[id=iaas-diskimage-builder-image-upload]}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в вашем проекте {var(cloud)}.
1. Загрузите образ `opensuse-15.3.raw` в {var(cloud)} под именем `Opensuse`:

   ```console
   openstack image create \
       --progress \
       --private \
       --container-format bare \
       --disk-format raw \
       --file opensuse-15.3.raw \
       --property store=s3 \
       --property hw_qemu_guest_agent=True \
       --property os_require_quiesce=yes \
       --property mcs_name='Opensuse' \
       Opensuse
   ```

   Здесь аргументы вида `--property <КЛЮЧ>=<ЗНАЧЕНИЕ>` используются для присвоения образу {{ifdef(public)}{linkto(../../../../computing/iaas/instructions/images/image-metadata#iaas-image-metadata)[text=метатегов]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}метатегов{/ifdef}.

## {heading(4. Проверьте успешность загрузки образа)[id=iaas-diskimage-builder-download-success]}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Облачные вычисления** → **Образы**.
1. Убедитесь, что в списке есть образ с именем `Opensuse`.

## {heading(Удалите неиспользуемые ресурсы)[id=iaas-diskimage-builder-image-delete]}

Если загруженный образ вам больше не нужен, {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-delete)[text=удалите его]}.