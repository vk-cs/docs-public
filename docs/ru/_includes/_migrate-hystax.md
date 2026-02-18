Вы можете перенести ваши ресурсы в VK Cloud с помощью сервиса [Hystax Acura Migration](https://msk.cloud.vk.com/app/services/marketplace/v2/apps/service/71713459-37ca-45db-9523-1cade3c58912/latest/info) без приостановки работы приложений. Можно переносить ресурсы как с виртуальных, так и с физических платформ.

{cut(Откуда можно перенести данные?)}

**Поддерживаемые платформы**: VK Cloud, Yandex Cloud, CROC Cloud, SberCloud, Базис.Cloud, OpenStack, VMware, Amazon Web Services, Google Cloud Platform, Microsoft Azure, Oracle Cloud, Alibaba Cloud, Hyper-V, а также физические машины.

**Поддерживаемые приложения**: SAP, Microsoft Active Directory, PostgreSQL, Oracle, NGINX, Red Hat Jboss Enterprise, IBM WebSphere, Apache, VMware vSphere, MySQL, MongoDB, Hadoop, Spark.

**Поддерживаемые операционные системы**: Windows, RHEL, CentOS, Debian, Ubuntu, AstraLinux, AltLinux, Ред ОС. Полный список доступных для миграции ОС и их версий приведен на странице [создания ВМ](/ru/computing/iaas/instructions/vm/vm-create#create_vm) в вашем личном кабинете.

{/cut}

{cut(Видеопример переноса инфраструктуры из AWS в VK Cloud)}

{caption()[id=position=above;align=right;id=video_create_vm]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239360&hash=257ea14353b8a426&hd=4)[type=vkvideo]}
{/caption}

{/cut}

В качестве примера с помощью сервиса Hystax Acura Migration в VK Cloud будет перенесена ВМ `Ubuntu-MR` с операционной системой Ubuntu 18.04.

Используя сервис Hystax Acura Migration, вы соглашаетесь с лицензионными соглашениями сервисов [Marketplace](/ru/start/legal/vk/marketplace) и [Hystax Acura Migration](https://хст.рф/terms-of-use).

## Подготовительные шаги

1. [Зарегистрируйтесь](/ru/intro/onboarding/account) в VK Cloud.
1. [Настройте](/ru/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa) двухфакторную аутентификацию (2FA) для того аккаунта, от имени которого будет развернута мигрируемая инфраструктура.
1. [Подключите](/ru/applications-and-services/marketplace/instructions/pr-instance-add) сервис Hystax Acura Migration.

   Дождитесь завершения установки — на почту придет ссылка с логином и паролем. Сервис будет развернут по адресу https://migration.mcs-cloud.ru (личный кабинет Hystax Acura).

## 1. Выполните репликацию данных

1. [Авторизуйтесь](https://migration.mcs-cloud.ru) в личном кабинете Hystax Acura, используя полученные логин и пароль.
1. Нажмите кнопку **Install replication agents**.
1. На шаге **Agent selection** выберите **Linux** и нажмите кнопку **Next**.
1. На шаге **Agent settings** укажите параметры:

   - **Machines group**: `Default`.
   - **Select target Linux distribution**: `Debian/Ubuntu (.deb package)`.
   - **Snapshot driver deployment type**: `DKMS`.

1. Нажмите кнопку **Next**.
1. Установите агент на целевую ВМ, следуя инструкции для дистрибутива Ubuntu.

   {note:info}
   Можно установить агенты миграции на группу ВМ с разными ОС через Ansible.
   {/note}

   {cut(Манифест Ansible для установки агентов)}

   ```yaml
   - hosts: all
     vars:
       ansible_ssh_pipelining: true

     tasks:
       - name: Generate URL rpm
         set_fact:
           download_url: "https://{{ acura_host }}/linux_agent/{{ customer_id }}?dist_type=rpm&platform=x64"
           remote_path: /tmp/hlragent.rpm
         when: ansible_os_family == "RedHat"

       - name: Generate URL deb
         set_fact:
           download_url: "https://{{ acura_host }}/linux_agent/{{ customer_id }}?dist_type=deb&platform=x64"
           remote_path: /tmp/hlragent.deb
         when: ansible_os_family == "Debian"

       - name: Download agent
         get_url:
           url: "{{ download_url }}"
           dest: "{{ remote_path }}"
           mode: 0644
           validate_certs: no
           timeout: 300
         become: yes

       - name: Install Hystax Linux Replication Agent from rpm package
         yum:
           name: "{{ remote_path }}"
           state: present
         become: yes
         when: ansible_os_family == "RedHat"

       - name: Install Hystax Linux Replication Agent from deb package
         apt:
           deb: "{{ remote_path }}"
           state: present
         become: yes
         when: ansible_os_family == "Debian"

       - name: Remove package file
         file:
           path: "{{ remote_path }}"
           state: absent
         become: yes
   ```

   {/cut}

   После установки агента ВМ `Ubuntu-MR` появится на главной странице [личного кабинета](https://migration.mcs-cloud.ru) Hystax Acura со статусом **Discovered**.

1. Раскройте меню ВМ `Ubuntu-MR` в списке **Machines Groups** и выберите опцию **Start Replication**.
1. Дождитесь завершения операции — статус ВМ изменится на **Synced**.

## 2. Создайте план миграции

1. Нажмите кнопку **Create Migration plan**.
1. В поле **Name** укажите наименование плана `MR-plan`.
1. Перейдите на вкладку **Expert** и нажмите кнопку **Generate Migration Plan from all machines**.

   Будет сформирован JSON-файл с планом миграции ВМ `Ubuntu-MR`.

1. Скорректируйте параметры плана в соответствии с требованиями по миграции ВМ.

   {cut(Пример плана миграции одной ВМ)}

   В этом плане описываются одна ВМ и подсеть, в которой будет развернута мигрируемая ВМ.

   ```json
   {
     "devices": {
       "<ИМЯ_ВМ>": {
         "flavor": "STD3-4-8",
         "availability_zone": "MS1",
         "security_groups": [
           "default",
           "ssh"
         ],
         "id": "a0c733a4-7c2c-f4db-7af3-XXXX",
         "custom_image_metadata": {
           "os_type": "linux",
           "os_distro": "ubuntu18.04",
           "os_version": "18.04",
           "os_admin_user": "admin",
           "os_require_quiesce": "yes",
           "hw_qemu_guest_agent": "yes"
         },
         "ports": [
           {
             "name": "port_0",
             "ip": "10.0.2.15",
             "floating_ip": true,
             "subnet": "subnet_0"
           }
         ],
         "rank": 0
       }
     },
     "subnets": {
       "subnet_0": {
         "subnet_id": "41ffb51d-baf4-4b6c-8517-XXXX",
         "cidr": "10.0.2.0/24"
       }
     }
   }
   ```

   Параметры плана:

   - `<ИМЯ_ВМ>` — имя, которое будет присвоено виртуальной машине в VK Cloud.
   - `flavor` — имя или ID [шаблона конфигурации](/ru/computing/iaas/concepts/vm/flavor) для ВМ. Уточните название с помощью команды `openstack flavor list`.
   - `availability_zone` — имя [зоны доступности](/ru/start/concepts/architecture#az), в которой будет развернута ВМ.
   - `security_groups` — список имен или ID [групп безопасности](/ru/networks/vnet/instructions/secgroups) для `Ubuntu-MR`.
   - `id` — внутренний ID виртуальной машины, сгенерированный Hystax на предыдущем шаге.
   - `custom_image_metadata` — пользовательские метаданные для ВМ:
   
     - `os_type` — тип гостевой ОС.
     - `os_distro` — имя дистрибутива ОС. Уточните имя, следуя инструкции в разделе [Заполнение os_distro и os_version](/ru/computing/iaas/instructions/images/image-metadata#find_os_distro_and_os_version).
     - `os_version` — версия ОС. Уточните версию, следуя инструкции в разделе [Заполнение os_distro и os_version](/ru/computing/iaas/instructions/images/image-metadata#find_os_distro_and_os_version).
     - `os_admin_user` — имя пользователя ОС с правами администратора. Пароль может быть установлен через [личный кабинет](/ru/computing/iaas/instructions/vm/vm-manage#password).
     - `os_require_quiesce: "yes"` — включение поддержки резервного копирования в VK Cloud.
     - `hw_qemu_guest_agent: "yes"` — включение поддержки гостевого агента QEMU.
   
   - `ports` — список сетевых интерфейсов ВМ.
   - `rank` — параметр, определяющий порядок запуска виртуальных машин, если их несколько в плане миграции.
   - `subnet_id` — ID подсети, в которой будет развернута ВМ.
   - `cidr` — адрес подсети в формате CIDR.

   Подробное описание параметров — в официальной документации [Hystax Acura](https://hystax.com/documentation/live-migration/migration_process.html#syntax-of-machine-description), описание пользовательских метаданных — в разделе [Метатеги образов](/ru/computing/iaas/instructions/images/image-metadata).

   {/cut}

1. Нажмите кнопку **Save**.

## 3. Запустите план

1. Перейдите в раздел **Migrate**.
1. Выберите план `MR-plan` и нажмите кнопку **Next**.
1. В поле **Cloud Site Name** укажите значение `VK-Cloud-infra` и нажмите кнопку **Run migration**.

   Начнется процесс миграции.

   - Если процесс завершится успешно, в блоке **Cloud Site** появится `VK-Cloud-infra` со статусом **Active**.
   - Если процесс завершился с ошибками, перезапустите его:

     1. В блоке **Cloud Sites** нажмите кнопку **Delete** для процесса, который завершился с ошибкой, и подтвердите удаление.
     1. В блоке **Migration plans** для плана `MR-plan` нажмите кнопку **Edit**.
     1. Внесите необходимые изменения (в базовом или экспертном режиме).
     1. Нажмите кнопку **Save**.
     1. Повторно запустите план.

## 4. Проверьте работоспособность добавленной ВМ

Найдите добавленную ВМ в VK Cloud (`<PID проекта>_cloud_agent`), [выполните](/ru/computing/iaas/instructions/vm/vm-manage) произвольные операции над ней.

## Удалите неиспользуемые ресурсы

Работающие ВМ потребляют вычислительные ресурсы и [тарифицируются](https://cloud.vk.com/docs/ru/computing/iaas/tariffication). Если они вам больше не нужны:

- Удалите ВМ `Ubuntu-MR`, добавленную в [личный кабинет](https://migration.mcs-cloud.ru) Hystax Acura.
- Удалите (detach) резервную инфраструктуру `VK-Cloud-infra` через [личный кабинет](https://migration.mcs-cloud.ru) Hystax Acura.
- [Удалите](/ru/networks/vnet/instructions/ip/floating-ip#delete) Floating IP-адрес, если он был создан во время миграции.