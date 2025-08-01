{note:info}

Список поддерживаемых образов доступен в [официальной документации](https://docs.openstack.org/diskimage-builder/latest/user_guide/supported_distros.html) утилиты `diskimage-builder`.

{/note}

В качестве примера рассматривается создание и настройка образа ВМ с ОС OpenSuse Leap. Все действия выполняются на локальном компьютере с ОС Ubuntu.

## Подготовительные шаги

1. Освободите на вашем компьютере не менее 3 ГБ дискового пространства.
1. Подключите компьютер к сети с доступом в интернет.

## 1. Установите необходимое ПО

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
    virtualenv -p python<версия Python> venv_py<версия Python>
    source venv_py<версия Python>/bin/activate
    ```

1. Установите утилиту `diskimage-builder`:

    ```console
    pip install git+https://opendev.org/openstack/diskimage-builder.git
    ```

## 2. Соберите образ ВМ с ОС OpenSuse Leap

Выполните команду:

```console
DIB_RELEASE=15.3 disk-image-create -t raw -o opensuse-15.3.raw vm opensuse
```

Будет создан файл `opensuse-15.3.raw` с образом ВМ в формате RAW.

{note:info}

Чтобы собрать образ ВМ с желаемыми свойствами, используйте дополнительные аргументы команды `disk-image-create`. Подробнее в [официальной документации](https://docs.openstack.org/diskimage-builder/latest/user_guide/building_an_image.html).

{/note}

## 3. Загрузите образ в VK Cloud

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в вашем проекте VK Cloud.
1. Загрузите образ `opensuse-15.3.raw` в VK Cloud под именем `Opensuse`:

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

    Здесь аргументы вида `--property <ключ>=<значение>` используются для присвоения образу [метатегов](/ru/computing/iaas/instructions/images/image-metadata).

## 4. Проверьте успешность загрузки образа

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел Облачные вычисления → Образы.
1. Убедитесь, что в списке есть образ с именем `Opensuse`.

## Удалите неиспользуемые ресурсы

Если загруженный образ вам больше не нужен, [удалите его](/ru/computing/iaas/instructions/images/images-manage#udalenie_obraza).
