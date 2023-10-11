Вы можете мигрировать ваши ресурсы в VK Cloud с помощью сервиса [Hystax Acura Migration](https://хст.рф/acura-live-cloud-migration-to-vk-cloud/) без приостановки работы приложений. Можно переносить ресурсы как с виртуальных, так и с физических платформ.

<details>
  <summary>Откуда можно перенести данные?</summary>

**Поддерживаемые платформы**: VK Cloud, Yandex Cloud, CROC Cloud, SberCloud, Базис.Cloud, OpenStack, VMware, Amazon Web Services, Google Cloud Platform, Microsoft Azure, Oracle Cloud, Alibaba Cloud, Hyper-V, а также физические машины.

**Поддерживаемые приложения**: SAP, Microsoft Active Directory, PostgreSQL, Oracle, NGINX, Red Hat Jboss Enterprise, IBM WebSphere, Apache, VMware vSphere, MySQL, MongoDB, Hadoop, Spark.

**Поддерживаемые операционные системы**: Windows, RHEL, CentOS, Debian, Ubuntu, AstraLinux, AltLinux, Ред ОС.

</details>

Данная инструкция поможет мигрировать ваши ресурсы в VK Cloud с помощью сервиса Hystax Acura Migration на примере ВМ `Ubuntu-MR` с операционной системой Ubuntu 18.04.

Используя сервис Hystax Acura Migration, вы соглашаетесь с лицензионными соглашениями [Магазина приложений](/ru/additionals/start/legal/marketplace) и [Hystax Acura Migration](https://хст.рф/terms-of-use/).

## 1. Подготовительные шаги

1. [Зарегистрируйтесь](/ru/additionals/start/get-started/account-registration#registraciya_v_lichnom_kabinete) в личном кабинете VK Cloud.
1. [Подтвердите](/ru/additionals/start/get-started/account-registration#podtverzhdenie_uchetnoy_zapisi) учетную запись.
1. [Настройте](/ru/base/account/instructions/account-manage/manage-2fa) двухфакторную аутентификацию (2FA) для того аккаунта, от имени которого будет развернута мигрируемая инфраструктура.
1. [Подключите](../../instructions/pr-instance-add/) сервис Hystax Acura Migration.

   Дождитесь завершения установки — на почту придет ссылка с логином и паролем. Сервис будет развернут по адресу https://migration.mcs-cloud.ru (личный кабинет Hystax Acura).

## 2. Выполните репликацию данных

1. [Авторизуйтесь](https://migration.mcs-cloud.ru) в личном кабинете Hystax Acura, используя полученные логин и пароль.
1. Нажмите кнопку **Install replication agents**.
1. На шаге «Agent selection» выберите **Linux** и нажмите кнопку **Next**.
1. На шаге «Agent settings» укажите параметры:

   - **Machines group**: `Default`.
   - **Select target Linux distribution**: `Debian/Ubuntu (.deb package)`.
   - **Snapshot driver deployment type**: `DKMS`.

1. Нажмите кнопку **Next**.
1. Установите агент на целевую ВМ, следуя инструкции для дистрибутива Ubuntu.

   <info>

   Можно установить агенты миграции на группу ВМ с разными ОС через Ansible.

   </info>

   <details>
     <summary>Манифест Ansible для установки агентов</summary>

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

   </details>

   После установки агента ВМ `Ubuntu-MR` появится на главной странице [личного кабинета](https://migration.mcs-cloud.ru) Hystax Acura со статусом **Discovered**.

1. Раскройте меню ВМ `Ubuntu-MR` в списке **Machines Groups** и выберите опцию **Start Replication**.
1. Дождитесь завершения операции — статус ВМ изменится на **Synced**.

## 3. Создайте план миграции

1. Нажмите кнопку **Create Migration plan**.
1. В поле **Name** укажите наименование плана `MR-plan`.
1. Перейдите на вкладку **Expert** и нажмите кнопку **Generate Migration Plan from all machines**.

   Будет сформирован JSON-файл с ВМ `Ubuntu-MR`.

1. Скорректируйте план в соответствии с требованиями по миграции ВМ:

    - В параметре `subnet_id` укажите идентификатор сети для ВМ `Ubuntu-MR`.
    - В параметре `flavor` укажите название шаблона ВМ, уточните его с помощью команды `openstack flavor list`.

    Подробное описание параметров в официальной документации [Hystax Acura](https://hystax.com/documentation/live-migration/migration_overview.html#migration-plan-syntax).

   <details>
    <summary>Пример плана миграции одной ВМ</summary>

    В этом плане описываются одна ВМ и подсеть, в которой будет развернута мигрируемая ВМ.

    ```json
    {
        "subnets": {
            "subnet_0": {
                "name": "subnet_0",
                "cidr": "10.0.1.0/24",
                "subnet_id": "2aebd081-44a8-480f-xxxx-yyyyyyyyyyyy"
            }
        },
        "devices": {
            "ubuntu01": {
                "id": "ec09a435-3389-d19f-4cf4-zzzzzzzzzzz",
                "security_groups": [
                    "default_all"
                ],
                "availability_zone": "MS1",
                "rank": 0,
                "flavor": "Standard-4-8-80",
                "ports": [
                    {
                        "name": "port_0",
                        "ip": "10.0.1.23",
                        "floating_ip": true,
                        "subnet": "subnet_0"
                    }
                ]
            }
        }
    }
    ```

   </details>

1. Нажмите кнопку **Save**.

## 4. Запустите план

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

## 5. Проверьте работоспособность добавленной ВМ

Найдите добавленную ВМ в VK Cloud (`<PID проекта>_cloud_agent`), [выполните](/ru/base/iaas/instructions/vm/vm-manage) произвольные операции над ней.

## Удалите неиспользуемые ресурсы

Работающие ВМ потребляют вычислительные ресурсы. Если они вам больше не нужны:

- Удалите ВМ `Ubuntu-MR`, добавленную в [личный кабинет](https://migration.mcs-cloud.ru) Hystax Acura.
- Удалите (detach) резервную инфраструктуру `VK-Cloud-infra` через [личный кабинет](https://migration.mcs-cloud.ru) Hystax Acura.
- [Удалите](/ru/networks/vnet/operations/manage-floating-ip#udalenie_plavayushchego_ip_adresa_iz_proekta) плавающий IP-адрес, если он был создан во время миграции.
