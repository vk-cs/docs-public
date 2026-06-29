{includetag(dr_onboarding_1)}
Hystax Acura Disaster Recovery сервисін пайдалану арқылы сіз [Marketplace](/kz/start/legal/vk/marketplace) және [Hystax Acura Disaster Recovery](https://хст.рф/terms-of-use) сервистерінің лицензиялық келісімдерімен келісесіз.
{/includetag}

{includetag(not_dr_onboarding)}

## Дайындық қадамдары

1. VK Cloud-та [тіркеліңіз](/kz/intro/onboarding/account).
{/includetag}

{includetag(dr_onboarding_2)}
1. Қалпына келтірілген инфрақұрылым атынан жайылдырылатын аккаунт үшін екі факторлы аутентификацияны (2FA) [баптаңыз](/kz/access/iam/instructions/manage-2fa).
1. Қалпына келтіру қолданылатын ВМ-ді [жасаңыз](/kz/computing/iaas/instructions/vm/vm-create#create_vm). Жылдам бастау шеңберінде Ubuntu 18.04 операциялық жүйесі бар `Ubuntu-DR` ВМ-і пайдаланылады.
1. Hystax Acura Disaster Recovery сервисін [қосыңыз](/kz/applications-and-services/marketplace/instructions/pr-instance-add).

   Орнатудың аяқталуын күтіңіз — поштаға логин мен құпиясөзі бар сілтеме келеді. Сервис https://dr.mcs-cloud.ru мекенжайында жайылдырылады (Hystax Acura жеке кабинеті).

## {heading({counter(dr)}. Деректер репликациясын орындаңыз)[id=replication]}

1. Алынған логин мен құпиясөзді пайдаланып, Hystax Acura [жеке кабинетінде](https://dr.mcs-cloud.ru) [авторизациядан өтіңіз](https://dr.mcs-cloud.ru).
1. **Install replication agents** түймесін басыңыз.
1. **Agent selection** қадамында **Linux** таңдаңыз және **Next** түймесін басыңыз.
1. **Agent settings** қадамында параметрлерді көрсетіңіз:

   - **Machines group**: `Default`.
   - **Select target Linux distribution**: `Debian/Ubuntu (.deb package)`.
   - **Snapshot driver deployment type**: `DKMS`.

1. **Next** түймесін басыңыз.
1. Ubuntu дистрибутивіне арналған нұсқаулықты орындай отырып, агентті мақсатты ВМ-ге орнатыңыз.

   {note:info}

   Ansible арқылы әртүрлі ОС-і бар ВМ топтарына көшіру агенттерін орнатуға болады.

   {/note}

   {cut(Агенттерді орнатуға арналған Ansible манифесті)}

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

   Агент орнатылғаннан кейін `Ubuntu-DR` ВМ-і Hystax Acura [жеке кабинетінің](https://dr.mcs-cloud.ru) басты бетінде **Unprotected** мәртебесімен пайда болады.

1. **Machines Groups** тізімінде `Ubuntu-DR` ВМ-нің мәзірін ашып, **Edit Replication schedule** опциясын таңдаңыз. Ашылған терезеде параметрлерді көрсетіңіз:

   - **Use custom Replication schedule settings**: опцияны таңдаңыз.
   - **Volume availability zone**: `MS1`.
   - **Volume type**: `CEPH-HDD`.

   {note:info}

   Репликация және сақтық көшірмелеу кестесін жасау туралы толығырақ [Hystax ресми құжаттамасында](https://hystax.com/documentation/dr/dr_overview.html#edit-replication-settings-schedule).

   {/note}

1. **Save** түймесін басыңыз.
1. `Ubuntu-DR` ВМ мәзірін ашып, **Start Protection** опциясын таңдаңыз.
1. Операцияның аяқталуын күтіңіз — ВМ мәртебесі **Protected** болып өзгереді.

## {heading({counter(dr)}. Апаттық қалпына келтіру жоспарын жасаңыз)[id=plan_create]}

1. **Create DR plan** түймесін басыңыз.
1. **Name** өрісінде `DR-plan` жоспар атауын көрсетіңіз.
1. **Expert** қойындысына өтіп, **Generate DR plan from all machines** түймесін басыңыз.

   `Ubuntu-DR` ВМ-і бар JSON-файл қалыптастырылады.

1. Істен шығудан кейін ВМ-ді қалпына келтіру талаптарына сәйкес жоспарды түзетіңіз:

    - `subnet_id` параметрінде `Ubuntu-DR` ВМ-іне арналған желі идентификаторын көрсетіңіз.
    - `flavor` параметрінде ВМ шаблонының атауын көрсетіңіз, оны `openstack flavor list` командасы арқылы нақтылаңыз.

    Параметрлердің толық сипаттамасы [Hystax Acura ресми құжаттамасында](https://hystax.com/documentation/live-migration/migration_overview.html#migration-plan-syntax).

    {cut(Апаттық қалпына келтіру жоспарының мысалы)}

    Бұл жоспарда екі ВМ және көшірілетін ВМ-дер жайылдырылаатын ішкі желі сипатталады.

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
          "flavor": "STD3-4-8",
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
          "flavor": "STD3-4-8",
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

    {/cut}

1. **Save** түймесін басыңыз.

## {heading({counter(dr)}. Жоспарды іске қосыңыз)[id=plan_start]}

1. **Recover** бөліміне өтіңіз.
1. `DR-plan` жоспарын таңдап, **Next** түймесін басыңыз.
1. **Cloud Site Name** өрісінде `VK-Cloud-infra` мәнін көрсетіп, **Run Recover** түймесін басыңыз.

   Резервтік инфрақұрылымды жасау басталады.

   - Егер процесс сәтті аяқталса, **Cloud Site** блогында **Active** мәртебесі бар `VK-Cloud-infra` пайда болады.
   - Егер процесс қателермен аяқталса, оны қайта іске қосыңыз:

     1. **Cloud Sites** блогында қателермен аяқталған процесс үшін **Delete** түймесін басып, жоюды растаңыз.
     1. **DR plans** блогында `DR-plan` жоспары үшін **Edit** түймесін басыңыз.
     1. Қажетті өзгерістерді енгізіңіз (базалық немесе сарапшылық режимде).
     1. **Save** түймесін басыңыз.
     1. Жоспарды қайта іске қосыңыз.

## {heading({counter(dr)}. VK Cloud-та инфрақұрылымды қалпына келтіріңіз)[id=infrastructure_restore]}

1. **Failback** бөліміне өтіңіз.
1. **Select target cloud type** қадамында **OPENSTACK** опциясын таңдап, **Next** түймесін басыңыз.
1. **Select target environment** қадамында **New OpenStack** опциясын таңдап, параметрлерді көрсетіңіз:

   - **Cloud name**: `VK Cloud`.
   - **Keystone API endpoint**: [эндпоинттер тізімінен](https://kz.cloud.vk.com/app/mcs3723876490/project/endpoints) Keystone мәні, VK Cloud үшін — `https://infra.mail.ru:5000/v3/`.
   - **User domain**: [жоба баптауларындағы](https://kz.cloud.vk.com/app/project/keys) **User Domain Name** мәні.
   - **Username**: [API арқылы қолжетімділігі](/kz/tools-for-using-services/api/rest-api/enable-api) бар және Жоба әкімшісінен төмен емес рөлдегі пайдаланушының аты.
   - **Password**: пайдаланушының құпиясөзі.
   - **Target project domain**: [жоба баптауларындағы](https://kz.cloud.vk.com/app/project/keys) **Project Domain ID** мәні.
   - **Target project ID**: [жоба баптауларындағы](https://kz.cloud.vk.com/app/project/keys) **Project ID** мәні.
   - **Hystax Service Network**: ВМ жайылдырылаатын желінің UUID-і.
   - **Floating IP Network**: сыртқы `ext-net` желісі.

1. **Next** түймесін басыңыз.
1. **Select resource** қадамында **From Cloud Site** тізімінен `VK-Cloud-infra` таңдаңыз.
1. **Next** түймесін басыңыз.
1. **Failback settings** қадамында қалпына келтірілетін құрылымның атауын көрсетіңіз.
1. **Start Failback** түймесін басыңыз.

   VK Cloud-тағы инфрақұрылым `VK-Cloud-infra` күйіне сәйкес күйге келтіріледі.

## {heading({counter(dr)}. Қалпына келтірілген ВМ-нің жұмысқа қабілеттілігін тексеріңіз)[id=vm_check]}

VK Cloud-та қалпына келтірілген ВМ-ді (`<PID_ПРОЕКТА>_cloud_agent`) тауып, онымен кез келген операцияларды [орындаңыз](/kz/computing/iaas/instructions/vm/vm-manage).

## Пайдаланылмайтын ресурстарды жойыңыз

Жұмыс істеп тұрған ВМ-дер есептеу ресурстарын тұтынады. Егер олар сізге енді қажет болмаса:

- `Ubuntu-DR` ВМ-ін [жойыңыз](/kz/computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete).
- `VK-Cloud-infra` резервтік инфрақұрылымын Hystax Acura [жеке кабинеті](https://dr.mcs-cloud.ru) арқылы жойыңыз.
- Егер қалпына келтіру кезінде Floating IP-мекенжайы жасалған болса, оны [жойыңыз](/kz/networks/vnet/instructions/ip/floating-ip#delete).

{/includetag}
