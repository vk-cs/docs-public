Ресурстарыңызды VK Cloud ішіне [Hystax Acura Migration](https://kz.cloud.vk.com/app/services/marketplace/v2/apps/service/71713459-37ca-45db-9523-1cade3c58912/latest/info) сервисінің көмегімен қолданбалардың жұмысын тоқтатпай көшіруге болады. Ресурстарды виртуалды платформалардан да, физикалық платформалардан да көшіруге болады.

{cut(Деректерді қайдан көшіруге болады?)}

**Қолдау көрсетілетін платформалар**: VK Cloud, Yandex Cloud, CROC Cloud, SberCloud, Базис.Cloud, OpenStack, VMware, Amazon Web Services, Google Cloud Platform, Microsoft Azure, Oracle Cloud, Alibaba Cloud, Hyper-V, сондай-ақ физикалық машиналар.

**Қолдау көрсетілетін қолданбалар**: SAP, Microsoft Active Directory, PostgreSQL, Oracle, NGINX, Red Hat Jboss Enterprise, IBM WebSphere, Apache, VMware vSphere, MySQL, MongoDB, Hadoop, Spark.

**Қолдау көрсетілетін операциялық жүйелер**: Windows, RHEL, CentOS, Debian, Ubuntu, AstraLinux, AltLinux, Ред ОС. Көшіруге қолжетімді ОС және олардың нұсқаларының толық тізімі жеке кабинетіңіздегі [ВМ жасау](/kz/computing/iaas/instructions/vm/vm-create#create_vm) бетінде келтірілген.

{/cut}

{cut(AWS-тен VK Cloud-қа инфрақұрылымды көшірудің бейне мысалы)}

{caption()[id=position=above;align=right;id=video_create_vm]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239360&hash=257ea14353b8a426&hd=4)[type=vkvideo]}
{/caption}

{/cut}

Мысал ретінде Hystax Acura Migration сервисінің көмегімен VK Cloud ішіне Ubuntu 18.04 операциялық жүйесі бар `Ubuntu-MR` ВМ көшіріледі.

Hystax Acura Migration сервисін пайдалану арқылы сіз [Marketplace](/kz/start/legal/vk/marketplace) және [Hystax Acura Migration](https://хст.рф/terms-of-use) сервистерінің лицензиялық келісімдерімен келісесіз.

## Дайындық қадамдары

1. [Тіркеліңіз](/kz/intro/onboarding/account) в VK Cloud.
1. Көшірілетін инфрақұрылым орналастырылатын аккаунт үшін [екі факторлы аутентификацияны (2FA)](/kz/access/iam/instructions/manage-2fa) баптаңыз.
1. [Hystax Acura Migration](/kz/applications-and-services/marketplace/instructions/pr-instance-add) сервисін қосыңыз.

   Орнату аяқталғанша күтіңіз — поштаңызға логин мен құпиясөз көрсетілген сілтеме келеді. Сервис https://migration.mcs-cloud.ru мекенжайында орналастырылады (Hystax Acura жеке кабинеті).

## 1. Деректер репликациясын орындаңыз

1. Алынған логин мен құпиясөзді пайдаланып, [Hystax Acura жеке кабинетіне](https://migration.mcs-cloud.ru) авторизациялаңыз.
1. **Install replication agents** батырмасын басыңыз.
1. **Agent selection** қадамында **Linux** таңдаңыз да, **Next** батырмасын басыңыз.
1. **Agent settings** қадамында параметрлерді көрсетіңіз:

   - **Machines group**: `Default`.
   - **Select target Linux distribution**: `Debian/Ubuntu (.deb package)`.
   - **Snapshot driver deployment type**: `DKMS`.

1. **Next** батырмасын басыңыз.
1. Ubuntu дистрибутивіне арналған нұсқаулыққа сәйкес агентті мақсатты ВМ-ге орнатыңыз.

   {note:info}
   Көшіру агенттерін әртүрлі ОС орнатылған ВМ тобына Ansible арқылы орнатуға болады.
   {/note}

   {cut(Агенттерді орнатуға арналған Ansible манифесі)}

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

   Агент орнатылғаннан кейін `Ubuntu-MR` ВМ Hystax Acura [жеке кабинетінің](https://migration.mcs-cloud.ru) басты бетінде **Discovered** мәртебесімен пайда болады.

1. **Machines Groups** тізіміндегі `Ubuntu-MR` ВМ мәзірін ашып, **Start Replication** опциясын таңдаңыз.
1. Операция аяқталғанша күтіңіз — ВМ мәртебесі **Synced** болып өзгереді.

## 2. Көшіру жоспарын жасаңыз

1. **Create Migration plan** батырмасын басыңыз.
1. **Name** өрісінде жоспар атауы ретінде `MR-plan` көрсетіңіз.
1. **Expert** қойындысына өтіп, **Generate Migration Plan from all machines** батырмасын басыңыз.

   `Ubuntu-MR` ВМ көшіру жоспары бар JSON-файл жасалады.

1. Жоспар параметрлерін ВМ-ді көшіру талаптарына сәйкес түзетіңіз.

   {cut(Бір ВМ-ді көшіру жоспарының мысалы)}

   Бұл жоспарда бір ВМ және көшірілетін ВМ орналастырылатын ішкі желі сипатталған.

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

   Жоспар параметрлері:

   - `<ИМЯ_ВМ>` — VK Cloud ішінде виртуалды машинаға берілетін атау.
   - `flavor` — ВМ үшін [конфигурация шаблонының](/kz/computing/iaas/concepts/vm/flavor) атауы немесе ID-і. Атауды `openstack flavor list` командасы арқылы нақтылаңыз.
   - `availability_zone` — ВМ орналастырылатын [қолжетімділік аймағының](/kz/start/concepts/architecture#az) атауы.
   - `security_groups` — `Ubuntu-MR` үшін [қауіпсіздік топтарының](/kz/networks/vnet/instructions/secgroups) атаулары немесе ID-лерінің тізімі.
   - `id` — алдыңғы қадамда Hystax жасаған виртуалды машинаның ішкі ID-і.
   - `custom_image_metadata` — ВМ үшін пайдаланушылық метадеректер:
   
     - `os_type` — қонақ ОС түрі.
     - `os_distro` — ОС дистрибутивінің атауы. Атауын [Заполнение os_distro и os_version](/kz/computing/iaas/instructions/images/image-metadata#find_os_distro_and_os_version) бөліміндегі нұсқаулыққа сүйеніп нақтылаңыз.
     - `os_version` — ОС нұсқасы. Нұсқасын [Заполнение os_distro и os_version](/kz/computing/iaas/instructions/images/image-metadata#find_os_distro_and_os_version) бөліміндегі нұсқаулыққа сүйеніп нақтылаңыз.
     - `os_admin_user` — әкімші құқықтары бар ОС пайдаланушысының аты. Құпиясөзді [жеке кабинет](/kz/computing/iaas/instructions/vm/vm-manage#password) арқылы орнатуға болады.
     - `os_require_quiesce: "yes"` — VK Cloud ішінде резервтік көшіруді қолдауды қосу.
     - `hw_qemu_guest_agent: "yes"` — QEMU қонақ агентін қолдауды қосу.
   
   - `ports` — ВМ желілік интерфейстерінің тізімі.
   - `rank` — көшіру жоспарында бірнеше виртуалды машина болса, оларды іске қосу ретін анықтайтын параметр.
   - `subnet_id` — ВМ орналастырылатын ішкі желінің ID-і.
   - `cidr` — CIDR форматындағы ішкі желі мекенжайы.

   Параметрлердің толық сипаттамасы — [Hystax Acura](https://hystax.com/documentation/live-migration/migration_process.html#syntax-of-machine-description) ресми құжаттамасында, ал пайдаланушылық метадеректер сипаттамасы — [Образ метатегтері](/kz/computing/iaas/instructions/images/image-metadata) бөлімінде.

   {/cut}

1. **Save** батырмасын басыңыз.

## 3. Жоспарды іске қосыңыз

1. **Migrate** бөліміне өтіңіз.
1. `MR-plan` жоспарын таңдап, **Next** батырмасын басыңыз.
1. **Cloud Site Name** өрісінде `VK-Cloud-infra` мәнін көрсетіп, **Run migration** батырмасын басыңыз.

   Көшіру процесі басталады.

   - Егер процесс сәтті аяқталса, **Cloud Site** блогында **Active** мәртебесі бар `VK-Cloud-infra` пайда болады.
   - Егер процесс қателермен аяқталса, оны қайта іске қосыңыз:

     1. **Cloud Sites** блогында қателермен аяқталған процесс үшін **Delete** батырмасын басып, жоюды растаңыз.
     1. **Migration plans** блогында `MR-plan` жоспары үшін **Edit** батырмасын басыңыз.
     1. Қажетті өзгерістерді енгізіңіз (негізгі немесе сарапшылық режимде).
     1. **Save** батырмасын басыңыз.
     1. Жоспарды қайта іске қосыңыз.

## 4. Қосылған ВМ жұмыс қабілетін тексеріңіз

VK Cloud ішінде қосылған ВМ-ді (`<PID проекта>_cloud_agent`) тауып, оның үстінен [кез келген операцияларды орындаңыз](/kz/computing/iaas/instructions/vm/vm-manage).

## Пайдаланылмайтын ресурстарды жойыңыз

Жұмыс істеп тұрған ВМ есептеу ресурстарын тұтынады және [тарифтеледі](https://cloud.vk.com/docs/kz/computing/iaas/tariffication). Егер олар енді қажет болмаса:

- Hystax Acura [жеке кабинетіне](https://migration.mcs-cloud.ru) қосылған `Ubuntu-MR` ВМ-ді жойыңыз.
- Hystax Acura [жеке кабинеті](https://migration.mcs-cloud.ru) арқылы `VK-Cloud-infra` резервтік инфрақұрылымын жойыңыз (detach).
- Егер көшіру кезінде жасалған болса, [Floating IP-мекенжайын](/kz/networks/vnet/instructions/ip/floating-ip#delete) жойыңыз.
