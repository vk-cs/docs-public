# {heading(Настройка шлюза S3 для сервиса Кибер Бэкап Облачный)[id=s3-cyber-backup-s3-gateway]}

{linkto(../../concepts/about#s3-cyber-backup-about)[text=Шлюз S3]} для сервиса {linkto(../../../marketplace/initial-configuration/cyber-backup-quick-start#marketplace-cyber-backup-quick-start)[text=Кибер Бэкап Облачный]} позволяет использовать публичный облачный сервис {linkto(../../../../storage/s3/concepts/about#s3-concepts-about)[text=VK Object Storage]} для хранения резервных копий.

В качестве примера настройки будет создан шлюз S3 для сервиса Кибер Бэкап Облачный в конфигурации высокой доступности с кластером хранения из трех узлов.

## {heading(Подготовительные шаги)[id=s3-cyber-backup-s3-gateway-prep]}

1. Обратитесь в [техническую поддержку](/ru/contacts), чтобы создать учетную запись и тенант организации для шлюза S3, а также получить возможность подключать партнерские хранилища к тенанту.
1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. {linkto(../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=Убедитесь]}, что в проекте достаточно необходимых {linkto(../../../../tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квот]} для создания кластера хранения из трех ВМ и трех дисков по 1 ТБ каждый, а лимиты позволяют это сделать.
1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. {linkto(../../../../tools-for-using-services/vk-cloud-account/instructions/account-manage/keypairs#vk-cloud-account-manage-keypairs-create)[text=Создайте]} ключевую пару для подключения к ВМ по SSH. Например, с названием `vk-ssh`.

## {heading({counter(s3-gateway)}. Подготовьте бакет VK Object Storage)[id=s3-cyber-backup-s3-gateway-bucket]}

1. {linkto(../../../../storage/s3/instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=Создайте]} бакет и запишите его URL.
1. {linkto(../../../../storage/s3/instructions/access-management/bucket-keys#s3-instructions-bucket-keys)[text=Создайте]} и запишите ключи доступа к бакету.

## {heading({counter(s3-gateway)}. Создайте сети и подсети)[id=s3-cyber-backup-s3-gateway-nets]}

1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Создайте]} сеть без доступа в интернет и без маршрутизатора. В этом примере: `private-storage-network`.
1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=Отредактируйте]} созданную для этой сети подсеть, указав необходимые параметры. В этом примере:
   - имя подсети: `private-storage-subnet`;
   - адрес подсети: `192.168.0.0/24`.
1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Создайте]} сеть с доступом в интернет и маршрутизатором. В этом примере: `public-storage-network`.
1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=Отредактируйте]} созданную для этой сети подсеть, указав необходимые параметры. В этом примере:
   - имя подсети: `public-storage-subnet`;
   - адрес подсети: `10.0.0.0/24`;
   - пул DHCP IP-адресов: `10.0.0.10–10.0.0.250`.

## {heading({counter(s3-gateway)}. Создайте группы и правила безопасности)[id=s3-cyber-backup-s3-gateway-secgroups]}

1. {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-add)[text=Создайте]} группу безопасности с легко опознаваемым именем. В этом примере: `cyber`.
1. {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-add-rule)[text=Добавьте]} в нее правила для входящего трафика:

   1. Первое правило:

     - **Тип**: `SSH`,
     - **Протокол**: `TCP`,
     - **Порты**: `22`,
     - **Удаленный адрес**: `Все IP-адреса`.
   1. Второе правило:

     - **Тип**: `ALL TCP`,
     - **Протокол**: `TCP`,
     - **Порты**: `8888`,
     - **Удаленный адрес**: `Все IP-адреса`.
1. {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-add-rule)[text=Добавьте]} в эту же группу безопасности правило для исходящего трафика:
  
   - **Тип**: `Все протоколы и порты`,
   - **Удаленный адрес**: `Все IP-адреса`.

## {heading({counter(s3-gateway)}. Создайте и настройте ВМ для управляющего узла)[id=s3-cyber-backup-s3-gateway-vm-main]}

1. [Скачайте](http://download.cyberprotect.ru/releases/CyberInfrastructure/6.7.1/x86_64/cloud/cyber-storage.qcow2)
 образ Кибер Хранилища — ПО, которое позволяет организовать шлюз S3 и сохранять резервные копии из решений Кибер Бэкап в общедоступных облаках.
1. {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=Импортируйте]} образ с помощью Openstack CLI:

   ```console
   openstack image create --progress \
     --file cyber-storage.qcow2 \
     --disk-format qcow2 \
     --container-format bare \
     Cyber-storage
   ```

1. {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Создайте]} виртуальную машину со следующими параметрами:

   - **Операционная система**: импортированный ранее образ `Cyber-storage`;
   - **Имя**: любое удобное имя, в этом примере — `cb-01`;
   - **Тип виртуальной машины**: `STD3-4-8`;
   - **Зона доступности**: любая подходящая зона доступности;
   - **Размер диска**: `250 ГБ`;
   - **Тип диска**: `SSD`;
   - **Сеть**: `public-storage-network`;
   - **Ключ виртуальной машины**: `vk-ssh`;
   - **Настройки Firewall**: `Default`, `cyber`;
   - **Назначить внешний IP**: опция включена.

   Дождитесь, пока созданная ВМ загрузится и появится приглашение на вход.

1. {linkto(../../../../computing/iaas/instructions/vm/vm-add-net#iaas-vm-add-net-connect)[text=Подключите]} к ВМ сеть `private-storage-network`. При подключении укажите:

   - конкретный IP-адрес из доступного диапазона адресов подсети `private-storage-subnet`;
   - группу безопасности `Все разрешено` (`all`).
1. В выбранной для ВМ зоне доступности {linkto(../../../../computing/iaas/instructions/volumes/volumes-create#iaas-volumes-create)[text=создайте]} диск для хранения с нужным объемом и {linkto(../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect)[text=подключите]} его к ВМ. Запишите имя диска.

    {note:info}
    Рекомендуется создавать диск объемом не менее 1 ТБ.
    {/note}

## {heading({counter(s3-gateway)}. Создайте и настройте ВМ для подчиненных узлов)[id=s3-cyber-backup-s3-gateway-vm-sub]}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Создайте]} две виртуальные машины со следующими параметрами:

    - **Операционная система**: импортированный ранее образ `Cyber-storage`;
    - **Имя**: любые удобные имена, в этом примере — `cb-02` и `cb-03`;
    - **Тип виртуальной машины**: `STD3-4-8`;
    - **Зона доступности**: любая подходящая зона доступности;
    - **Размер диска**: `250 ГБ`;
    - **Тип диска**: `SSD`;
    - **Сеть**: `public-storage-network`;
    - **Ключ виртуальной машины**: `vk-ssh`;
    - **Настройки Firewall**: `Default`, `cyber` — обе группы безопасности для каждой ВМ;
    - **Назначить внешний IP**: опция отключена.

    Дождитесь, пока каждая из созданных ВМ загрузится и появится приглашение на вход.

1. {linkto(../../../../computing/iaas/instructions/vm/vm-add-net#iaas-vm-add-net-connect)[text=Подключите]} к созданным ВМ сеть `private-storage-network`. При подключении для каждой ВМ укажите:
    - конкретный IP-адрес из доступного диапазона адресов подсети;
    - группу безопасности `Все разрешено` (`all`).
1. В выбранной зоне доступности {linkto(../../../../computing/iaas/instructions/volumes/volumes-create#iaas-volumes-create)[text=создайте]} для каждой ВМ диски того же объема, что и для управляющего узла, и {linkto(../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect)[text=подключите]} диски к соответствующим ВМ. Запишите имена дисков.

## {heading({counter(s3-gateway)}. Настройте Кибер Хранилище)[id=s3-cyber-backup-s3-gateway-storage-server]}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Подключитесь]} к виртуальной машине `cb-01`, используя имя пользователя `cloud-user` и приватный ключ из созданной ранее ключевой пары.
1. Получите и сохраните пароль для панели управления Кибер Хранилища:

   ```console
   cat /.initial-admin-password
   ```

   {cut(Пример вывода)}
   ```console
   ❯❯❯ ssh cloud-user@195.211.119.185 -i .ssh/vk-bk
   Cyber Infrastructure release 5.0
   ========================================================================
   = Warning! Do not enable third-party repositories. Install third-party =
   = software only from the default repository. Use only commands allowed =
   = in the product documentation.                                        =
   ========================================================================
   [cloud-user@abgw-vk-a1 ~]$ cat /.initial-admin-password
   pass-example
   [cloud-user@abgw-vk-a1 ~]$
   ```
   {/cut}

   Сохраните этот пароль.
1. Перейдите в панель управления Кибер Хранилища:

   1. Откройте в браузере адрес `<ВНЕШНИЙ_IP-АДРЕС_ВМ>:8888`.
   1. Введите логин `admin` и пароль, полученный ранее.
1. Перейдите в раздел **Инфраструктура → Сети** и переименуйте сеть `Private` в `Public`.
1. Нажмите кнопку **Создать Сеть** и создайте сеть  `Private`.
1. Создайте кластер хранения:
   1. Перейдите в раздел **Инфраструктура → Серверы**.
   1. Нажмите **Создать кластер хранилища**.
   1. Укажите имя кластера. Например, `backupcloud`.
   1. (Опционально) Выберите тип шифрования.
   1. Нажмите кнопку **Создать**.

1. Подключите дополнительные узлы:
   1. Перейдите в раздел **Серверы** и нажмите кнопку **Подключить Сервер**.
   1. Запишите IP-адрес и токен для подключения узлов.
   1. Последовательно подключитесь к ВМ `cb-02` и `cb-03` по SSH и на каждой из них выполните команду:

        ```console
        sudo -i
           /usr/libexec/init-ifaces
           /usr/libexec/vstorage-ui-agent/bin/register-storage-node.sh -m <IP-АДРЕС> -t <ТОКЕН>
        ```

   1. Вернитесь в панель управления Кибер Хранилища и перейдите в раздел **Инфраструктура → Серверы**. Убедитесь в том, что в списке серверов содержатся три узла: `cb-01`, `cb-02`, `cb-03`.

1. Настройте сетевые интерфейсы:
   1. Нажмите на имя узла и перейдите на вкладку **Сетевые интерфейсы**.
   1. Измените настройки интерфейсов:

      {tabs}
      {tab(eth0)}
      1. Нажмите ![more-icon](/ru/assets/more-icon.svg "inline") для интерфейса и выберите **Изменить**.
      1. Назначьте интерфейсу сеть `Public`.
      1. Сохраните изменения.
      {/tab}
      {tab(eth1)}
      1. Нажмите ![more-icon](/ru/assets/more-icon.svg "inline") для интерфейса и выберите **Изменить**.
      1. Назначьте интерфейсу сеть `Private`.
      1. Вручную добавьте для интерфейса IP-адрес интерфейса соответствующей ВМ, ведущего в подсеть `private-storage-subnet`, с маской `/24`. Этот адрес вводился вручную при {linkto(#s3-cyber-backup-s3-gateway-vm-main)[text=подключении]} каждой ВМ к сети `private-storage-network`.
      1. Сохраните изменения.
      {/tab}
      {/tabs}

   1. Повторите действия для каждого из узлов.
1. Присоедините дополнительные узлы к кластеру хранения:
   1. Перейдите в раздел **Инфраструктура → Серверы**.
   1. Для узлов `cb-02` и `cb-03` последовательно нажмите ![more-icon](/en/assets/more-icon.svg "inline") и выберите **Присоединить к кластеру** → **Применить**.
   1. Дождитесь, пока все узлы будут в статусе **«Исправен»**.

1. Назначьте сетям разные типы трафика:
   1. Перейдите в раздел **Инфраструктура → Серверы**.
   1. С помощью кнопок **Назначить Сети** и **Назначить сетям** назначьте для сетей следующие типы трафика.

      {tabs}
      {tab(Сеть Private)}
      - `Хранилище`;
      - `Управление системными сервисами`;
      - `OSTOR внутр.`;
      - `Резервные копии (ABGW) внутр.`;
      {cut(Названия типов трафика в английской версии)}
      - `Storage`;
      - `Internal management`;
      - `OSTOR private`;
      - `(Backup (ABGW) private`.
      {/cut}
      {/tab}
      {tab(Сеть Public)}
      - `Панель администрирования`;
      - `SSH`;
      - `S3 внешн.`;
      - `iSCSI`;
      - `NFS`;
      - `Резервные копии (ABGW) внешн.` .
      {cut(Названия типов трафика в английской версии)}
      - `Admin-panel`
      - `SSH`;
      - `S3 public`;
      - `iSCSI`;
      - `NFS`;
      - `Backup (ABGW) public`.
      {/cut}
      {/tab}
      {/tabs}

1. Инициализируйте диски и назначьте им роли:
   1. Перейдите в раздел **Инфраструктура → Серверы**.
   1. Нажмите на название узла `cb-01`, откроется вкладка **Диски**.
   1. Назначьте дискам роли:
      - для `vda` — роль **«Метаданные»**;
      - для `vdb` — роль **«Хранилище»**.
   1. Подтвердите операцию и дождитесь завершения добавления узла в кластер.
   1. Повторите те же действия для узлов `cb-02` и `cb-03`.

## {heading({counter(s3-gateway)}. Настройте высокую доступность и балансировку нагрузки для кластера)[id=s3-cyber-backup-s3-gateway-ha]}

1. {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=Получите]} список портов подсети `public-storage-subnet`. Выпишите ID портов ВМ `cb-01`, `cb-02` и `cb-03` в этой подсети.
1. Создайте порт в сети `public-storage-network` и подсети `public-storage-subnet`, указав конкретный IP-адрес из пула адресов подсети и имя порта. В этом примере — `10.0.0.252`.

   ```console
   openstack port create -network <ID_СЕТИ> -fixed-ip subnet=<ID_ПОДСЕТИ>,ip-address=10.0.0.252 <ИМЯ_ПОРТА>
   ```

1. Добавьте этот IP-адрес в список разрешенных адресов для портов ВМ, которые направлены в подсеть `public-storage-subnet`:

   ```console
   openstack port set --allowed-address ip-address=10.0.0.252 <ID_ПОРТА_ВМ_CB-01>
   openstack port set --allowed-address ip-address=10.0.0.252 <ID_ПОРТА_ВМ_CB-02>
   openstack port set --allowed-address ip-address=10.0.0.252 <ID_ПОРТА_ВМ_CB-03>
   ```

1. {linkto(../../../../networks/balancing/instructions/manage-lb#balancing-manage-lb-add)[text=Создайте]} балансировщик нагрузки со следующими параметрами:

   - **Название балансировщика**: `cb-balancer`;
   - **Сеть**: `public-storage-network`;
   - **Назначить внешний IP**: опция включена.

1. Дождитесь создания балансировщика и запишите его внешний IP-адрес.
1. {linkto(../../../../networks/balancing/instructions/manage-rules#balancing-manage-rules-add)[text=Добавьте]} правило для этого балансировщика:

   1. Создайте прослушиватель:

      ```console
      openstack loadbalancer listener create --name <ИМЯ_ПРОСЛУШИВАТЕЛЯ> \
       --protocol TCP --protocol-port 8888 <ID_БАЛАНСИРОВЩИКА>
      ```
   1. Создайте пул балансировки:

      ```console
      openstack loadbalancer pool create --name <ИМЯ_ПУЛА> \
       --protocol TCP --lb-algorithm ROUND_ROBIN --listener <ИМЯ_ПРОСЛУШИВАТЕЛЯ>
   1. Добавьте участников пула:

      ```console
      openstack loadbalancer member create --address 10.0.0.252 \
       --subnet-id <ID_ПОДСЕТИ_PUBLIC-STORAGE-SUBNET> --protocol-port 8888 <ИМЯ_ПУЛА>
      ```
   1. Создайте проверку доступности:

      ```console
      openstack loadbalancer healthmonitor create --type TCP \
       --delay 5 --timeout 3 --max-retries 3 <ИМЯ_ПУЛА>
      ```

1. Перейдите в панель управления Кибер Хранилища и откройте раздел **Настройки → Сервер Управления → Высокая Доступность**.
1. Выберите три созданных узла и нажмите кнопку **Создать конфигурацию высокой доступности**, затем нажмите **Продолжить**.
1. Для подсети `public-storage-subnet` укажите виртуальный IP-адрес `10.0.0.252`.
1. Подтвердите создание конфигурации.
1. Проверьте доступность сервера управления по внешнему IP-адресу балансировщика, набрав в адресной строке браузера `https://<ВНЕШНИЙ_IP_АДЕС_БАЛАНСИРОВЩИКА>:8888`.
1. (Опционально) {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-delete)[text=Удалите]} публичный IP-адрес, привязанный к ВМ `cb-01`. Теперь вы можете переходить в панель управления Кибер Хранилища по внешнему IP-адресу балансировщика нагрузки.
1. {linkto(../../../../networks/balancing/instructions/manage-rules#balancing-manage-rules-add)[text=Добавьте]} к ранее созданному балансировщику нагрузки правило со следующими параметрами:

   - **Протокол балансировки**: `TCP`;
   - **Порт**: `44445`;
   - **Применить для следующих инстансов**: `cb-01`, `cb-02`, `cb-03`.
1. Присвойте внешнему IP-адресу балансировщика внешнее доменное имя.

## {heading({counter(s3-gateway)}. Зарегистрируйте шлюз)[id=s3-cyber-backup-s3-gateway-register]}

1. Перейдите в панель управления Кибер Хранилища.
1. Перейдите в раздел **Сервисы → Резервные копии** и нажмите кнопку **Создать резервное хранилище**.
1. На шаге **Место назначения резервных копий** выберите **Облачный сервис** и нажмите кнопку **Далее**.
1. На шаге **Серверы** выберите все узлы для хранения и нажмите кнопку **Далее**.
1. На шаге **Облачный сервис**:
   1. Выберите тип объектного хранилища: `AuthV2-совместимый(S3)`.
   1. Введите URL эндпоинта VK Object Storage:
      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
   1. Введите название {linkto(#s3-cyber-backup-s3-gateway-bucket)[text=бакета]} и ключи доступа к нему.
   1. Включите опцию **Разрешить использование самоподписанного сертификата до оконечной точки**.
   1. Нажмите кнопку **Далее**.
1. На шаге **Политики хранения**:
   1. Выберите область отказа `Узел`.
   1. Выберите режим избыточности, соответствующий политикам вашей организации.
   1. Нажмите кнопку **Далее**.
1. На шаге **DNS**:
   1. Укажите внешнее доменное имя, присвоенное балансировщику нагрузки.
   1. Убедитесь в том, что конфигурация вашего DNS-сервера соответствует приведенному в интерфейсе примеру. При необходимости измените ее.
   1. Нажмите кнопку **Далее**.
1. На шаге **Учетная запись Киберпротект**:
   1. Укажите URL облачной консоли: `https://ru01-cloud.cyberprotect.ru`.
   1. Введите логин и пароль для доступа к тенанту организации, полученные от технической поддержки.
   1. Нажмите кнопку **Далее**.

      {note:info}
      На учетной записи должна быть отключена двухфакторная аутентификация. Лучше использовать сервисную учетную запись.
      {/note}

1. На шаге **Сводка** просмотрите конфигурацию, нажмите кнопку **Создать** и дождитесь создания шлюза.

## {heading({counter(s3-gateway)}. Добавьте пользователей)[id=s3-cyber-backup-s3-gateway-clients]}

1. Авторизуйтесь на `https://ru01-cloud.cyberprotect.ru`.
1. Создайте пользователей и администраторов.
1. Делегируйте подключенный шлюз для резервных копий в настройках пользователя при его создании или редактировании.
1. Перейдите в раздел **Клиенты**.
1. Создайте в тенанте организации клиентские тенанты, укажите для них новое S3-хранилище резервных копий.

## {heading({counter(s3-gateway)}. Проверьте работоспособность)[id=s3-cyber-backup-s3-gateway-check]}

1. {linkto(../../../marketplace/initial-configuration/cyber-backup-quick-start#marketplace-cyber-backup-quick-start-create-plan)[text=Создайте]} резервную копию в сервисе Кибер Бэкап Облачный.
1. Убедитесь, что резервная копия сохранена в бакете VK Object Storage.

## {heading(Удалите неиспользуемые ресурсы)[id=s3-cyber-backup-s3-gateway-delete]}

Работающая инфраструктура сервиса потребляет вычислительные ресурсы. Если шлюз S3 и кластер хранения вам больше не нужны, удалите их:

1. {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=Удалите]} виртуальные машины.
1. Убедитесь, что вместе с ВМ были удалены все диски, если это не так, {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-delete)[text=удалите]} их.
1. {linkto(../../../../../networks/vnet/instructions/router#vnet-router-delete)[text=Удалите]} маршрутизатор.
1. {linkto(../../../../networks/balancing/instructions/manage-lb#balancing-manage-lb-delete)[text=Удалите ]} балансировщик нагрузки.
1. {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-delete)[text=Удалите]} публичные IP-адреса.
