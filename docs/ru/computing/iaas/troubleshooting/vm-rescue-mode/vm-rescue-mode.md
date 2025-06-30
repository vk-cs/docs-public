В этом руководстве описан порядок восстановления виртуальной машины с помощью ее аварийной загрузки. Процесс аналогичен восстановлению ОС на физическом компьютере путем загрузки с [Live CD](https://ru.wikipedia.org/wiki/Live_CD). Действия выполняются через OpenStack CLI.

Примеры проблем, которые можно попытаться решить этим способом: сбой файловой системы, потеря доступа, поломка загрузчика ОС.

Предварительное условие для процедуры восстановления: к ВМ должен быть подключен виртуальный загрузочный диск.

1. Подготовьте ISO-файл с образом нужной ОС, например скачайте его с официального сайта. В этом руководстве используется образ ОС Ubuntu Server 20.04.

    {note:warn}

    На образе должны быть установлены драйверы VirtIO.

    {/note}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Создайте в вашем проекте образ загрузочного Live CD для выбранной ОС, выполнив команду:

    ```console
    openstack image create --file <ИМЯ_ФАЙЛА>.iso --disk-format iso --container-format bare --min-ram 800 --property hw_rescue_device=cdrom <ИМЯ_ОБРАЗА>
    ```

    Здесь:

    - `<ИМЯ_ФАЙЛА>.iso` — имя ISO-файла с образом ОС.
    - `<ИМЯ_ОБРАЗА>` — имя образа загрузочного Live CD.

    Пример команды:

    ```console
    openstack image create --file ubuntu-20.04.4-live-server-amd64.iso --disk-format iso --container-format bare --min-ram 800 --property hw_rescue_device=cdrom ubuntu-20.04.4-live-server-private
    ```

    {cut(Пример вывода)}

    ```console
    +------------------+--------------------------------------------------------------------------------+
    | Field            | Value                                                                          |
    +------------------+--------------------------------------------------------------------------------+
    | container_format | bare 2022-08-11T10:53:46Z                                                      |
    | disk_format      | iso                                                                            |
    | file             | /v2/images/81a6dd5a-XXXX/file                                                  |
    | id               | 81a6dd5a-XXXX                                                                  |
    | min_disk         | 0                                                                              |
    | min_ram          | 800                                                                            |
    | name             | ubuntu-20.04.4-live-server-private                                             |
    | owner            | b423a815a77aXXXX                                                               |
    | properties       | hw_rescue_device='cdrom', locations='[]',                                      |
    |                  | owner_specified.openstack.md5='',                                              |
    |                  | owner_specified.openstack.object='images/ubuntu-20.04.4-live-server-private',  |
    |                  | owner_specified.openstack.sha256=''                                            |
    | protected        | False                                                                          |
    | schema           | /v2/schemas/image                                                              |
    | status           | queued                                                                         |
    | tags             |                                                                                |
    | updated_at       | 2022-08-11T10:53:46Z                                                           |
    | visibility       | shared                                                                         |
    +------------------+--------------------------------------------------------------------------------+
    ```

    {/cut}

    {note:info}

    Созданный образ появится в личном кабинете в разделе **Облачные вычисления** → **Образы**.

    {/note}

1. Выполните аварийную загрузку ВМ с созданного Live CD. Для этого выполните команду:

    ```console
    openstack server rescue --image <ОБРАЗ> <ВМ>
    ```

    Здесь:

    - `<ОБРАЗ>` — имя или ID образа загрузочного Live CD.
    - `<ВМ>` — имя или ID ВМ, которую нужно восстановить.

1. Убедитесь, что статус ВМ изменился на `rescue`, выполнив команду:

    ```console
    openstack server show <ВМ>
    ```

    Здесь `<ВМ>` — имя или ID ВМ. Статус ВМ будет отображаться в полях `vm_state` и `status`.

    Пример команды:

    ```console
    openstack server show bb079908-XXXX
    ```

    {cut(Пример вывода)}

    ```console
    +-----------------------------+-----------------------------------------------------------+
    | Field                       | Value                                                     |
    +-----------------------------+-----------------------------------------------------------+
    | OS-DCF:diskConfig           | MANUAL                                                    |
    | OS-EXT-AZ:availability_zone | MS1                                                       |
    | OS-EXT-STS:power_state      | Running                                                   |
    | OS-EXT-STS:task_state       | None                                                      |
    | OS-EXT-STS:vm_state         | rescued                                                   |
    | OS-SRV-USG:launched_at      | 2022-08-11T11:43:56.000000                                |
    | OS-SRV-USG:terminated_at    | None                                                      |
    | accessIPv4                  |                                                           |
    | accessIPv6                  |                                                           |
    | addresses                   | ext-net=185.130.115.220                                   |
    | config_drive                | True                                                      |
    | created                     | 2022-08-11T10:40:33Z                                      |
    | flavor                      | Basic-1-1-10 (df3c499a-XXXX)                              |
    | hostId                      | <hostId>                                                  |
    | id                          | bb079908-XXXX                                             |
    | image                       | N/A (booted from volume)                                  |
    | key_name                    | <key_name>                                                |
    | name                        | ubuntu-20-rescue-test                                     |
    | project_id                  | <project_id>                                              |
    | properties                  |                                                           |
    | security_groups             | id='461df60a-XXXX', name='default'                        |
    |                             | id='b3b48aa3-XXXX', name='ssh'                            |
    | status                      | RESCUE                                                    |
    | updated                     | 2022-08-11T11:43:56Z                                      |
    | user_id                     | <user_id>                                                 |
    | volumes_attached            | id='9e19d3cb-XXXX'                                        |
    +-----------------------------+-----------------------------------------------------------+
    ```

    {/cut}

1. Получите ссылку на консоль виртуальной машины, выполнив команду:

    ```console
    openstack console url show <ВМ>
    ```

    Здесь `<ВМ>` — имя или ID ВМ.

    Пример команды:

    ```console
    openstack console url show bb079908-XXXX
    ```

    {cut(Пример вывода)}

    ```console
    +----------+-----------------------------------------------------------------------------------------------+
    | Field    | Value                                                                                         |
    +----------+-----------------------------------------------------------------------------------------------+
    | protocol | vnc                                                                                           |
    | type     | novnc                                                                                         |
    | url      | https://infra.mail.ru:6080/vnc_auto.html?path=%3Ftoken%3Dee65b775-XXXX                        |
    +----------+-----------------------------------------------------------------------------------------------+
    ```

    {/cut}

1. В браузере перейдите по полученной ссылке. Откроется консоль операционной системы, загруженной с Live CD. В этом руководстве — консоль ОС Ubuntu Server 20.04.

    В консоль также можно [войти](../../instructions/vm/vm-console#vnc_konsol) через ваш личный кабинет.

1. Выполните в консоли работы по восстановлению ВМ.
1. По окончании работ верните ВМ в обычный режим работы, выполнив команду:

    ```console
    openstack server unrescue <ВМ>
    ```

    Здесь `<ВМ>` — имя или ID ВМ. ВМ будет перезапущена со своего загрузочного диска. Дождитесь окончания перезагрузки.

1. Проверьте, что статус ВМ изменился на `active`, выполнив команду:

    ```console
    openstack server show <ВМ>
    ```

    Здесь `<ВМ>` — имя или ID ВМ. Статус ВМ будет отображаться в полях `vm_state` и `status`.

1. Если образ загрузочного Live CD вам больше не нужен, удалите его с помощью команды:

    ```console
    openstack image delete <ОБРАЗ>
    ```

    Здесь `<ОБРАЗ>` — имя или ID ранее созданного образа загрузочного Live CD.
