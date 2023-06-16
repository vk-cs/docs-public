Данная инструкция поможет мигрировать ваши ресурсы в облако VK Cloud и начать работу с сервисом.

## 1. Подготовительные шаги

1. [Зарегистрируйтесь](/ru/additionals/start/get-started/account-registration#registraciya-v-lichnom-kabinete) в личном кабинете VK Cloud.
1. [Подтвердите](/ru/additionals/start/get-started/account-registration#podtverzhdenie-uchetnoy-zapisi) учетную запись.
1. (Опционально) [Настройте](/ru/base/account/instructions/account-manage/security#vklyuchenie-2fa) двухфакторную аутентификацию (2FA) для вашего аккаунта.
1. Перейдите в раздел **Магазин приложений**.
1. Нажмите кнопку **Подробнее** под пунктом **Hystax Acura Migration**.
1. Ознакомьтесь с поддерживаемыми платформами. Убедитесь, что в проекте достаточно квот.
1. Нажмите кнопку **Подключить**.
1. Подтвердите подключение тарифа «Промо».
1. Дождитесь завершения установки. Реквизиты сервиса будут доступны в разделе **Магазин приложений** → **Мои приложения SaaS**.

<info>

Сервис будет развернут по адресу https://migration.mcs-cloud.ru.

</info>

## 2. Войдите в личный кабинет

1. Перейдите по одноразовой ссылке из почты и скопируйте логин и пароль.
1. Перейдите по [адресу личного кабинета](https://migration.mcs-cloud.ru) Hystax Acura.
1. Войдите с помощью логина и пароля, полученных на шаге 1.

## 3. Выполните репликацию данных

1. Перейдите в [личный кабинет](https://migration.mcs-cloud.ru) Hystax Acura.
1. Нажмите кнопку **Install agents**.
1. Следуйте шагам установки агента. На последнем шаге скопируйте ссылку для скачивания агента.

   <info>

   Дополнительно существует возможность установки агентов миграции на группу ВМ (с разными ОС) через Ansible.

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

   </info>

1. Раскройте меню ВМ со статусом **Discovered** в списке **Machine Groups** и выберите опцию **Start Replication**.
1. Дождитесь завершения операции — статус ВМ изменится на **Synced**.

## 4. Мигрируйте данные с помощью плана

1. Перейдите в [личный кабинет](https://migration.mcs-cloud.ru) Hystax Acura.
1. Нажмите кнопку **Create Migration plan**.
1. Укажите наименование плана в поле **Name**.
1. Перейдите на вкладку **Expert**.
1. Нажмите на кнопку **Generate Migration plan from all machines**.
1. В поле **Migration plan** скорректируйте JSON в соответствии с целевым состоянием.

   <details>
    <summary>Пример плана миграции двух ВМ</summary>

    В этом плане описываются две ВМ и подсеть, в которой будут развернуты мигрируемые ВМ.

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

    В параметре `subnet` укажите идентификатор заранее созданной сети в проекте VK Cloud, у которой CIDR совпадает с CIDR сети исходной ВМ. Названия параметра `flavor` уточняйте с помощью команды `openstack flavor list`.

    Подробное описание параметров в официальной документации [Hystax Acura](https://docs.hystax.com/live-migration/migration_overview.html#migration-plan-syntax).

   </details>

1. Нажмите кнопку **Save**.
1. В списке планов выберите созданный и нажмите кнопку **Run migration**.
1. В поле **Cloud Site Name** укажите значение `Cloud Site`.
1. Нажмите кнопку **Run migration**.

   При успешном выполнении шагов начнется миграция (статус **Running**).

<info>

Если в результате развертывания будут выявлены ошибки (например, в план не добавлена ВМ или указаны некорректные параметры в плане миграции), перезапустите миграцию:

1. Нажмите кнопку **Delete** для запущенной миграции.
1. Внесите необходимые правки.
1. Повторно запустите миграцию.

</info>

## 4. «Отсоедините» Hystax Acura

1. Перейдите в [личный кабинет](https://migration.mcs-cloud.ru) Hystax Acura.
1. Убедитесь, что миграция завершена успешно.
1. Перейдите на страницу миграции.
1. Нажмите кнопку **Detach**.
