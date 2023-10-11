Вы можете настроить восстановление данных и IT-инфраструктуры в случае непредвиденных обстоятельств с помощью сервиса [Hystax Acura Disaster Recovery](https://хст.рф/acura-disaster-recovery-to-vk-cloud/) без приостановки работы приложений. Использование сервиса позволяет оптимизировать показатели:

- Конечная точка восстановления (RPO) — время между созданием последней резервной копии и моментом возникновения аварии. Может настраиваться индивидуально для каждого ресурса.
- Конечное время восстановления (RTO) — время между реакцией на аварию и восстановлением инфраструктуры. Сервис позволяет свести этот показатель к минимуму.

<details>
  <summary>Принцип работы сервиса</summary>

1. На целевые ВМ устанавливаются агенты для синхронизации с Hystax Acura Disaster Recovery.
1. Выполняется репликация данных для синхронизованных ВМ. При необходимости настраивается расписание резервного копирования ВМ.
1. Создается план аварийного восстановления: описание инфраструктуры и набор инструкций по воссозданию бизнес-приложения в облаке VK Cloud. Возможно создать несколько планов. Чтобы уменьшить значение RPO, планы аварийного восстановления должны поддерживаться в актуальном состоянии.
1. На основе плана создается резервная инфраструктура.
1. При возникновении аварийных ситуаций резервная инфраструктура принимает на себя всю нагрузку.

</details>

Пройдя все шаги инструкции, вы:

1. Создадите аккаунт в Hystax Acura Disaster Recovery через VK Cloud.
1. Установите агент на ВМ и выполните репликацию данных для нее.
1. Создадите резервную инфраструктуру с использованием плана резервного восстановления.
1. Восстановите резервируемую инфраструктуру в VK Cloud.

Используя сервис Hystax Acura Disaster Recovery, вы соглашаетесь с лицензионными соглашениями [Магазина приложений](/ru/additionals/start/legal/marketplace) и [Hystax Acura Disaster Recovery](https://хст.рф/terms-of-use/).

## 1. Подготовительные шаги

1. [Зарегистрируйтесь](/ru/additionals/start/get-started/account-registration#registraciya_v_lichnom_kabinete) в личном кабинете VK Cloud.
1. [Подтвердите](/ru/additionals/start/get-started/account-registration#podtverzhdenie_uchetnoy_zapisi) учетную запись.
1. [Настройте](/ru/base/account/instructions/account-manage/manage-2fa) двухфакторную аутентификацию (2FA) для того аккаунта, от имени которого будет развернута восстановленная инфраструктура.
1. [Создайте ВМ](/ru/base/iaas/instructions/vm/vm-create), для которой будет применяться восстановление. В рамках быстрого старта будет использоваться ВМ `Ubuntu-DR` с операционной системой Ubuntu 18.04.
1. [Подключите](../../instructions/pr-instance-add/) сервис Hystax Acura Disaster Recovery.

   Дождитесь завершения установки — на почту придет ссылка с логином и паролем. Сервис будет развернут по адресу https://dr.mcs-cloud.ru (личный кабинет Hystax Acura).

## 2. Выполните репликацию данных

1. [Авторизуйтесь](https://dr.mcs-cloud.ru) в личном кабинете Hystax Acura, используя полученные логин и пароль.
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

   После установки агента ВМ `Ubuntu-DR` появится на главной странице [личного кабинета](https://dr.mcs-cloud.ru) Hystax Acura со статусом **Unprotected**.

1. Раскройте меню ВМ `Ubuntu-DR` в списке **Machines Groups** и выберите опцию **Edit Replication settings**. В открывшемся окне укажите параметры:

   - **Use custom Replication schedule settings**: выберите опцию.
   - **Volume availability zone**: `MS1`.
   - **Volume type**: `HDD`.

   <info>

   Подробней о репликации и создании расписания резервного копирования в [официальной документации Hystax](https://hystax.com/documentation/dr/dr_overview.html#edit-replication-settings-schedule).

   </info>

1. Нажмите кнопку **Save**.
1. Раскройте меню ВМ `Ubuntu-DR` и выберите опцию **Start Protection**.
1. Дождитесь завершения операции — статус ВМ изменится на **Protected**.

## 3. Создайте план аварийного восстановления

1. Нажмите кнопку **Create DR plan**.
1. В поле **Name** укажите название плана `DR-plan`.
1. Перейдите на вкладку **Expert** и нажмите кнопку **Generate DR plan from all machines**.

   Будет сформирован JSON-файл с ВМ `Ubuntu-DR`.

1. Скорректируйте план в соответствии с требованиями по восстановлению ВМ после сбоев:

    - В параметре `subnet_id` укажите идентификатор сети для ВМ `Ubuntu-DR`.
    - В параметре `flavor` укажите название шаблона ВМ, уточните его с помощью команды `openstack flavor list`.

    Подробное описание параметров в официальной документации [Hystax Acura](https://hystax.com/documentation/live-migration/migration_overview.html#migration-plan-syntax).

    <details>
    <summary>Пример плана аварийного восстановления</summary>

    В этом плане описываются две ВМ и подсеть, в которой будут развернуты мигрируемые ВМ.

    ```JSON
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
        },
        "centos01": {
          "id": "a40d5ef3-e244-dab5-9df0-aaaaaaaaaaaa",
          "security_groups": [
            "default_all"
          ],
          "availability_zone": "DP1",
          "rank": 0,
          "flavor": "Standard-4-8-80",
          "ports": [
            {
              "name": "port_0",
              "ip": "10.0.1.27",
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

1. Перейдите в раздел **Recover**.
1. Выберите план `DR-plan` и нажмите кнопку **Next**.
1. В поле **Cloud Site Name** укажите значение `VK-Cloud-infra` и нажмите кнопку **Run Recover**.

   Начнется создание резервной инфраструктуры.

   - Если процесс завершится успешно, в блоке **Cloud Site** появится `VK-Cloud-infra` со статусом **Active**.
   - Если процесс завершился с ошибками, перезапустите его:

     1. В блоке **Cloud Sites** нажмите кнопку **Delete** для процесса, который завершился с ошибкой, и подтвердите удаление.
     1. В блоке **DR plans** для плана `DR-plan` нажмите кнопку **Edit**.
     1. Внесите необходимые изменения (в базовом или экспертном режиме).
     1. Нажмите кнопку **Save**.
     1. Повторно запустите план.

</info>

## 5. Восстановите инфраструктуру в VK Cloud

1. Перейдите в раздел **Failback**.
1. На шаге «Select target cloud type» выберите опцию **OPENSTACK** и нажмите кнопку **Next**.
1. На шаге «Select target environment» выберите опцию **New OpenStack** и укажите параметры:

   - **Cloud name**: `VK Cloud`.
   - **Keystone API endpoint**: значение Keystone из [списка эндпоинтов](https://mcs.mail.ru/app/mcs3723876490/project/endpoints), для VK Cloud — `https://infra.mail.ru:35357/v3/`.
   - **User domain**: значение **User Domain Name** [настроек проекта](https://mcs.mail.ru/app/project/keys).
   - **Username**: имя пользователя с [доступом по API](/ru/manage/tools-for-using-services/rest-api/enable-api) и ролью не ниже Администратора проекта.
   - **Password**: пароль пользователя.
   - **Target project domain**: значение **Project Domain ID** [настроек проекта](https://mcs.mail.ru/app/project/keys).
   - **Target project ID**: значение **Project ID** [настроек проекта](https://mcs.mail.ru/app/project/keys)
   - **Hystax Service Network**: UUID сети, в которую будет разворачиваться ВМ.
   - **Floating IP Network**: внешняя сеть `ext-net`.

1. Нажмите кнопку **Next**.
1. На шаге «Select resource» из списка **From Cloud Site** выберите `VK-Cloud-infra`.
1. Нажмите кнопку **Next**.
1. На шаге «Failback settings» укажите название восстанавливаемой структуры.
1. Нажмите кнопку **Start Failback**.

   Инфраструктура в VK Cloud будет приведена в состояние, соответствующее `VK-Cloud-infra`.

## 6. Проверьте работоспособность восстановленной ВМ

Найдите восстановленную ВМ в VK Cloud (`<PID проекта>_cloud_agent`), [выполните](/ru/base/iaas/instructions/vm/vm-manage) произвольные операции над ней.

## Удалите неиспользуемые ресурсы

Работающие ВМ потребляют вычислительные ресурсы. Если они вам больше не нужны:

- [Удалите](/ru/base/iaas/instructions/vm/vm-manage#udalenie_vm) ВМ `Ubuntu-DR`.
- Удалите резервную инфраструктуру `VK-Cloud-infra` через [личный кабинет](https://dr.mcs-cloud.ru) Hystax Acura.
- [Удалите](/ru/networks/vnet/operations/manage-floating-ip#udalenie_plavayushchego_ip_adresa_iz_proekta) плавающий IP-адрес, если он был создан во время восстановления.
