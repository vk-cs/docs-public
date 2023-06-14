Интерфейс командной строки OpenStack (OpenStack CLI) позволяет работать с сервисами платформы VK Cloud через консоль. Для использования OpenStack CLI [установите](#ustanovka-klienta-openstack) клиент OpenStack и [пройдите](#autentifikaciya) аутентификацию.

## 1. Установите клиент OpenStack

<tabs>
<tablist>
<tab>Debian, Ubuntu</tab>
<tab>RHEL 8, CentOS 8, Fedora</tab>
<tab>CentOS 7</tab>
<tab>Windows</tab>
</tablist>
<tabpanel>

```bash
sudo apt update
sudo apt install python3-openstackclient 
```

</tabpanel>
<tabpanel>

```bash
dnf install https://www.rdoproject.org/repos/rdo-release.el8.rpm
dnf update
dnf install python3-openstackclient
```

</tabpanel>
<tabpanel>

```bash
yum install https://rdoproject.org/repos/rdo-release.rpm
yum upgrade
yum install python-openstackclient
```

</tabpanel>
<tabpanel>

Инструкция написана на примере Python 3.10.11 и Microsoft C++ Build Tools 2022. Для других версий программ названия и версии компонентов могут отличаться.

1. Скачайте и установите [Python3](https://www.python.org/downloads/windows/). Рекомендуется использовать версию 3.6 или 3.8.
2. Скачайте и запустите [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/ru/visual-cpp-build-tools/).
3. Перейдите на вкладку **Отдельные компоненты**, выберите в списке и установите:

   - `Средства CMake C++ для Windows`. При выборе этого компонента автоматически будет выбран компонент `MSVC версии 143 — VS 2022 С++ x64/x86 Build Tools (последняя версия)`.
   - `Пакет SDK для Windows 10`.

1. Выполните команду:

   ```bash
   pip install -UI python-openstackclient
   ```

</tabpanel>
</tabs>

## 2. Установите дополнительные пакеты

При необходимости установите пакеты для работы с отдельными сервисами OpenStack:

```bash
pip install python-<Название сервиса>client
```

Названия сервисов:

- `cinder` – API блочного хранилища и расширений;
- `glance` – API образов;
- `heat` – API оркестрации;
- `manila` – Shared file systems API файлового хранилища;
- `neutron` – API сетей;
- `nova` – API облачных вычислений (ВМ) и расширений;
- `octavia` — API балансировщика нагрузки;
- `sahara` – API обработки больших данных;
- `trove` – API баз данных.

## 3. Пройдите аутентификацию

1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
2. Убедитесь, что [включена](/ru/base/account/instructions/account-manage/security#vklyuchenie-2fa) двухфакторная аутентификация и [активирован](/ru/base/account/instructions/account-manage/security#dostup-po-api) доступ по API.
3. Выберите проект.
4. На странице **Настроки проекта** [перейдите на вкладку](https://mcs.mail.ru/app/project/keys/) **Доступ по API**.
5. Нажмите кнопку **Скачать openrc версии 3**. Будет загружен файл с именем `<название проекта>-openrc.sh`.
6. Укажите в переменных среды учетные данные для аутентификации.

   <tabs>
   <tablist>
   <tab>Linux</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   1. Запустите выполнение скрипта:

      ```bash
      source <название проекта>-openrc.sh
      ```

   2. Введите пароль пользователя проекта.

   </tabpanel>
   <tabpanel>

   1. Скопируйте данные из файла `<название проекта>-openrc.sh` и выполните команды:

      ```powershell
      set OS_PROJECT_ID=<OS_PROJECT_ID>
      set OS_REGION_NAME=<OS_REGION_NAME>
      set OS_USER_DOMAIN_NAME=<OS_USER_DOMAIN_NAME>
      set OS_USERNAME=<OS_USERNAME>
      set OS_AUTH_URL=<OS_AUTH_URL>
      ```

   2. Укажите пароль, выполнив команду:

      ```powershell
      set OS_PASSWORD=<пароль пользователя проекта>
      ```

   </tabpanel>
   </tabs>

## 4. Проверьте готовность OpenStack CLI к работе

1. Проверьте наличие клиента OpenStack:

   ```bash
   openstack --version
   ```

   Если клиент OpenStack установлен, в выводе консоли отобразится его версия.

2. Убедитесь, что переменные среды соответствуют проекту, выполнив команду:

   <tabs>
   <tablist>
   <tab>Linux</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   env | grep OS_
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   set | findstr OS_
   ```

   </tabpanel>
   </tabs>

   В переменных среды должны содержаться учетные данные для аутентификации, соответствующие проекту.

3. Выполните команду, которая использует клиент OpenStack. Например:

   ```bash
   openstack project list
   ```

   В выводе консоли должен отобразиться список доступных проектов.

## Примеры команд OpenStack CLI

- Просмотреть список доступных шаблонов конфигураций:

   ```bash
   openstack flavor list
   ```

   <details>
   <summary>Пример результата выполнения команды</summary>

   ```bash
   +--------------------------------------+-------------------+-------+------+-----------+-------+-----------+
   | ID                                   | Name              |   RAM | Disk | Ephemeral | VCPUs | Is Public |
   +--------------------------------------+-------------------+-------+------+-----------+-------+-----------+
   | 09dc3eb9-fc46-44b1-8928-acd42f723747 | Standard-4-12     | 12288 |    0 |         0 |     4 | True      |
   | 12dc66d3-828c-4495-a5ca-ea1710c33174 | Advanced-12-24    | 24576 |    0 |         0 |    12 | True      |
   | 19b38715-48cd-495b-9391-4c4e9d424518 | Basic-1-2-40      |  2048 |   40 |         0 |     1 | True      |
   | 25ae869c-be29-4840-8e12-99e046d2dbd4 | Basic-1-2-20      |  2048 |   20 |         0 |     1 | True      |
   | 283fa444-8d59-4e83-b6f4-90613c52a5a4 | Advanced-8-16-100 | 16384 |  100 |         0 |     8 | True      |
   | 2c7c3f57-b5a4-4139-af7d-d5f05d70c703 | Standard-6-24     | 24576 |    0 |         0 |     6 | True      |
   | 4e115a9b-0ac2-440d-a120-95cf130d63c7 | Standard-2-2      |  2048 |    0 |         0 |     2 | True      |
   ```

   </details>

- Вывести информацию об отдельном образе:

   ```bash
   openstack image show c6320138-035f-40d8-XXXX-e814edb2ce5f
   ```

   <details>
   <summary>Пример результата выполнения команды (сокращенный вывод)</summary>

    ```bash
    +------------------+------------------------------------------------------+
    | Field            | Value                                                |
    +------------------+------------------------------------------------------+
    | checksum         | 896ea37e28d82a548cedf1e0aa92XXXX                     |
    | container_format | bare                                                 |
    | created_at       | 2023-03-29T14:06:44Z                                 |
    | disk_format      | raw                                                  |
    | file             | /v2/images/c6320138-035f-40d8-XXXX-e814edb2ce5f/file |
    | id               | c6320138-035f-40d8-XXXX-e814edb2ce5f                 |
    | min_disk         | 0                                                    |
    | min_ram          | 0                                                    |
    | name             | Alt-Linux-P9-Starter-Kit                             |
    | owner            | b5b7ffd4ef0547e5b222f44555dfXXXX                     |
    | properties       | base_image_ref='1a8aa332-d8ef-4c40-XXXX-cade8b59aea3'|
    | protected        | False                                                |
    | schema           | /v2/schemas/image                                    |
    | size             | 1653604352                                           |
    | status           | active                                               |
    | tags             |                                                      |
    | updated_at       | 2023-03-29T14:08:15Z                                 |
    | visibility       | private                                              |
    +------------------+------------------------------------------------------+
    ```

   </details>
