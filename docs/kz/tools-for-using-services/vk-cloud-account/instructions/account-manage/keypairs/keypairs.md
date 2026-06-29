{include(/kz/_includes/_translated_by_ai.md)}

Кілттік жұптар [виртуалды машинаға SSH арқылы қосылу](/kz/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) үшін пайдаланылады. Кілттік жұп ашық және жабық кілттерден тұрады: ашық кілт ВМ-ге орналастырылады, жабық кілт пайдаланушыда сақталады.

## Кілттік жұп туралы ақпаратты қарау

{tabs}

{tab({var(cloud)} Аккаунт)}

1. {var(cloud)} аккаунтына [өтіңіз](https://cloud.vk.com/account).
1. **SSH кілттік жұптары** бөліміне өтіңіз.
1. Қажетті кілттік жұптың атауын басыңыз. Ол туралы ақпарат көрсетіледі.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#openstack-install) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Команданы орындаңыз:

   ```console
   openstack keypair show <название ключевой пары>
   ```

{note:info}

Тек ашық кілт туралы деректерді көрсету үшін командаға `--public-key` опциясын қосыңыз.

{/note}

{/tab}

{/tabs}

## Кілттік жұпты жасау

{tabs}

{tab({var(cloud)} Аккаунт)}

1. {var(cloud)} аккаунтына [өтіңіз](https://cloud.vk.com/account).
1. **SSH кілттік жұптары** бөліміне өтіңіз.
1. **SSH кілтін қосу** түймесін басыңыз.
1. Кілттің атауын енгізіп, **Кілтті жасау** түймесін басыңыз.

   Жабық кілт жергілікті құрылғыға жүктеледі.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#openstack-install) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Команданы орындаңыз:

   ```console
   openstack keypair create
   ```

1. Экранда көрсетілетін жабық кілтті `.pem` кеңейтімі бар файлға сақтаңыз.

{/tab}

{/tabs}

## Бар кілтті импорттау

{tabs}

{tab({var(cloud)} Аккаунт)}

1. {var(cloud)} аккаунтына [өтіңіз](https://cloud.vk.com/account).
1. **SSH кілттік жұптары** бөліміне өтіңіз.
1. **SSH кілтін қосу** түймесін басыңыз.
1. **Кілтті импорттау** түймесін басыңыз.
1. Ашылған терезеде өрістерді толтырыңыз:

   - **Кілт атауы**: жасалатын кілттік жұптың атауын көрсетіңіз.
   - **Ашық кілт**: `ssh-rsa` ашық кілтінің мазмұнын кірістіріңіз.

1. **Кілтті импорттау** түймесін басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. Кілттік жұпты жергілікті түрде жасау үшін GitLab-тың [ресми құжаттамасын](https://github.com/gitlabhq/gitlabhq/blob/master/doc/user/ssh.md#generate-an-ssh-key-pair) пайдаланыңыз.
1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#openstack-install) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Команданы орындаңыз:

   ```console
   openstack keypair create --public-key <путь к файлу публичного ключа> <имя ключевой пары>
   ```

{/tab}

{/tabs}

## Кілттік жұпты қалпына келтіру

{note:err}

Жабық кілтті қалпына келтіру мүмкін емес! Жаңа кілттік жұп жасап, ашық кілтті ВМ-ге жүктеңіз.

{/note}

SSH арқылы кілттік жұпты пайдаланып Linux виртуалды машинасына қол жеткізуді қалпына келтіру үшін [ВМ басқару](/kz/computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-recovery-access) мақаласындағы нұсқаулықты пайдаланыңыз.

## Кілттік жұпты жою

{tabs}

{tab({var(cloud)} Аккаунт)}

Бұл топтық операция: қажет болса, бірнеше кілттік жұпты бірден жалаушалар арқылы таңдап жоюға болады.

1. {var(cloud)} аккаунтына [өтіңіз](https://cloud.vk.com/account).
1. **SSH кілттік жұптары** бөліміне өтіңіз.
1. Жойылатын нысан жолындағы ![Корзина](assets/trash-icon.svg "inline") белгішесін басыңыз.
1. Жоюды растаңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#openstack-install) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Команданы орындаңыз:

   ```console
   openstack keypair delete <имя ключевой пары>
   ```

{/tab}

{/tabs}
