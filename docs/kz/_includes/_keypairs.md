{includetag(keypairs)}
Кілттік жұптар {ifdef(public)}{linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=виртуалды машинаға SSH арқылы қосылу]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}виртуалды машинаға қосылу{/ifdef} үшін пайдаланылады. Кілттік жұп ашық және жеке кілттерден тұрады: ашық кілт ВМ-де орналастырылады, ал жеке кілт пайдаланушыда сақталады.

## {heading(Кілттік жұп туралы ақпаратты қарау)[id=vk-cloud-account-manage-keypairs-view]}

{tabs}

{ifdef(public)}
{tab({var(cloud)} Аккаунт)}

1. [Өтіңіз](https://cloud.vk.ru/account) {var(cloud)} аккаунтына.
1. **SSH кілттік жұптары** бөліміне өтіңіз.
1. Қажетті кілттік жұптың атауын басыңыз. Ол туралы ақпарат көрсетіледі.

{/tab}
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
{tab(Жеке кабинет)}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]} {var(cloud)} жеке кабинетіне.
1. Кілттік жұптарды қарау үшін тәсілдердің бірін пайдаланыңыз.

   - Бет тақырыбындағы мәзір тармағы арқылы:

     1. Бет тақырыбындағы пайдаланушы атына басып, **Кілттік жұптар** тармағын таңдаңыз.
     1. Қажетті кілттік жұптың атауын басыңыз. Ол туралы ақпарат көрсетіледі.

   - Аккаунт туралы ақпарат бетінде:

     1. Бет тақырыбындағы пайдаланушы атына басып, **Аккаунт баптаулары** тармағын таңдаңыз.
     1. **Кілттік жұптар** қойындысына өтіңіз.
     1. Қажетті кілттік жұптың атауын басыңыз. Ол туралы ақпарат көрсетіледі.

{/tab}
{/ifdef}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіп, жобада {linkto(../../../../cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. Команданы орындаңыз:

   ```console
   openstack keypair show <КІЛТТІК_ЖҰП_АТАУЫ>
   ```

{note:info}
Тек ашық кілт туралы деректерді шығару үшін командаға `--public-key` опциясын қосыңыз.
{/note}

{/tab}

{/tabs}

## {heading(Кілттік жұп жасау)[id=vk-cloud-account-manage-keypairs-create]}

{tabs}

{ifdef(public)}
{tab({var(cloud)} Аккаунт)}

1. [Өтіңіз](https://cloud.vk.ru/account) {var(cloud)} аккаунтына.
1. **SSH кілттік жұптары** бөліміне өтіңіз.
1. **SSH кілтін қосу** түймесін басыңыз.
1. Кілттің атауын енгізіп, **Кілт жасау** түймесін басыңыз.

   Жеке кілт жергілікті құрылғыға жүктеледі.

{/tab}
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
{tab(Жеке кабинет)}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]} {var(cloud)} жеке кабинетіне.
1. Бет тақырыбындағы пайдаланушы атына басып, **Кілттік жұптар** тармағын таңдаңыз.
1. **Кілт жасау** түймесін басыңыз.
1. Кілттің атауын енгізіп, **Кілт жасау** түймесін басыңыз.

   Компьютерге ВМ жасау және оған қосылу кезінде қажет болатын `.pem` кеңейтімі бар жеке кілт файлы жүктеледі.

{note:err}
Жеке кілт жоғалса, оны қалпына келтіру мүмкін емес. Жаңа кілттік жұп жасап, ашық кілтті ВМ-ге импорттаңыз.
{/note}

{/tab}
{/ifdef}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіп, жобада {linkto(../../../../cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. Команданы орындаңыз:

   ```console
   openstack keypair create
   ```

1. Экранда көрсетілетін жеке кілтті `.pem` кеңейтімі бар файлға сақтаңыз.

{/tab}

{/tabs}

## {heading(Бар кілтті импорттау)[id=vk-cloud-account-manage-keypairs-import]}

{tabs}

{ifdef(public)}
{tab({var(cloud)} Аккаунт)}

1. [Өтіңіз](https://cloud.vk.ru/account) {var(cloud)} аккаунтына.
1. **SSH кілттік жұптары** бөліміне өтіңіз.
1. **SSH кілтін қосу** түймесін басыңыз.
1. **Кілтті импорттау** түймесін басыңыз.
1. Ашылған терезеде өрістерді толтырыңыз:

   - **Кілт атауы**: жасалатын кілттік жұптың атауын көрсетіңіз.
   - **Ашық кілт**: ашық кілттің `ssh-rsa` мазмұнын қойыңыз.

1. **Кілтті импорттау** түймесін басыңыз.

{/tab}
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
{tab(Жеке кабинет)}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]} {var(cloud)} жеке кабинетіне.
1. Бет тақырыбындағы пайдаланушы атына басып, **Кілттік жұптар** тармағын таңдаңыз.
1. **Кілтті импорттау** түймесін басыңыз.
1. **Кілт атауы** өрісін толтырыңыз.
1. Ашық кілтті тәсілдердің бірімен қосыңыз:

   - **Ашық кілт файлы** түймесін басып, оны құрылғыңыздан таңдаңыз.
   - **Ашық кілт** өрісіне алмасу буферінен ашық кілттің `ssh-rsa` мазмұнын қойыңыз.

1. **Кілтті импорттау** түймесін басыңыз.

{/tab}
{/ifdef}

{tab(OpenStack CLI)}

1. Кілттік жұпты жергілікті жасау үшін GitLab-тың [ресми құжаттамасын](https://github.com/gitlabhq/gitlabhq/blob/master/doc/user/ssh.md#generate-an-ssh-key-pair) пайдаланыңыз.
1. OpenStack клиенті {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіп, жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. Команданы орындаңыз:

   ```console
   openstack keypair create --public-key <АШЫҚ_КІЛТ_ФАЙЛЫНЫҢ_ЖОЛЫ> <КІЛТТІК_ЖҰП_АТАУЫ>
   ```

{/tab}

{/tabs}

{ifdef(public)}
## {heading(Кілттік жұпты қалпына келтіру)[id=vk-cloud-account-manage-keypairs-restore]}

{note:err}
Жеке кілтті қалпына келтіру мүмкін емес! Жаңа кілттік жұп жасап, ашық кілтті ВМ-ге жүктеңіз.
{/note}

Кілттік жұпты пайдаланып Linux виртуалды машинасына SSH арқылы қолжетімділікті қалпына келтіру үшін {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-recovery-access-key)[text=ВМ-ды басқару]} мақаласындағы нұсқаулықты пайдаланыңыз.
{/ifdef}

## {heading(Кілттік жұпты жою)[id=vk-cloud-account-manage-keypairs-delete]}

{tabs}

{ifdef(public)}
{tab({var(cloud)} Аккаунт)}

Бұл топтық операция: қажет болса, бірнеше кілттік жұпты жалаушалар арқылы таңдап, бірден жоюға болады.

1. [Өтіңіз](https://cloud.vk.ru/account) {var(cloud)} аккаунтына.
1. **SSH кілттік жұптары** бөліміне өтіңіз.
1. Жойылатын объект жолындағы ![trash-icon](../../../../../assets/trash-icon.svg "inline") белгішесін басыңыз.
1. Жоюды растаңыз.

{/tab}
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
{tab(Жеке кабинет)}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]} {var(cloud)} жеке кабинетіне.
1. Бет тақырыбындағы пайдаланушы атына басып, **Кілттік жұптар** тармағын таңдаңыз.
1. Жойылатын кілттік жұптар үшін жалаушаларды қойыңыз.
1. **Жою** түймесін басыңыз.
1. Жоюды растаңыз.

{/tab}
{/ifdef}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіп, жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. Команданы орындаңыз:

   ```console
   openstack keypair delete <КІЛТТІК_ЖҰП_АТАУЫ>
   ```

{/tab}

{/tabs}

{/includetag}
