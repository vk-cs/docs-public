# {heading(ВМ-ді басқару)[id=iaas-vm-manage]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(cloud)} жүйесінде виртуалды машинаның параметрлері мен күйін {ifdef(public)}[жеке кабинетте](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}жеке кабинетте{/ifdef} немесе OpenStack CLI пәрмен жолы интерфейсінің көмегімен өзгертуге болады.

## {heading(Виртуалды машинаның ID мәнін алу)[id=iaas-vm-manage-id-get]}

ВМ-ді OpenStack CLI арқылы басқару үшін виртуалды машинаның идентификаторы қажет.

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
1. ВМ тізімінде идентификаторын білу қажет виртуалды машинаның атауын басыңыз.
1. **Жалпы ақпарат** қойындысында кестеден **Виртуалды машинаның ID мәні** жолын табыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack CLI клиентін {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=орнатыңыз]} және егер бұрын жасалмаса, жобада аутентификациядан өтіңіз.
1. Әрекеттердің бірін орындаңыз.

   - Егер ВМ атауы белгілі болса, виртуалды машина туралы ақпаратты алып, `id` жолын табыңыз:

     ```console
     openstack server show <ИМЯ_ВМ>
     ```

   - Егер ВМ атауы нақты белгісіз болса, виртуалды машиналар тізімін шығарып, қажеттісін табыңыз:

     ```console
     openstack server list
     ```

{/tab}

{/tabs}

## {heading(ВМ-ді іске қосу, тоқтату, қайта жүктеу)[id=iaas-vm-manage-start-stop-restart]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
1. ВМ күйін тәсілдердің бірімен өзгертіңіз.

   - Топтық операциялар арқылы — бірнеше ВМ үшін:

     1. Виртуалды машиналар тізімінде күйін өзгерту қажет ВМ-ді жалаушалар арқылы таңдаңыз.
     1. ВМ тізімінің үстінде қажетті әрекет түймесін басыңыз.
     1. Әрекетті растаңыз.

   - Контекстік мәзір арқылы — бір ВМ үшін:

     1. Виртуалды машиналар тізімінде күйін өзгерту қажет ВМ үшін ![ ](../../../../../assets/more-icon.svg "inline") басыңыз.
     1. Әрекетті таңдап, растаңыз.

   - Виртуалды машина бетінде:

     1. Виртуалды машиналар тізімінде күйін өзгерту қажет ВМ атауын басыңыз.
     1. ВМ бетінде **Жалпы ақпарат** қойындысына өтіңіз.
     1. ВМ параметрлері кестесінің оң жағының үстінде қажетті әрекет белгішесін басыңыз.
     1. Әрекетті растаңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиентін {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=орнатыңыз]} және егер бұрын жасалмаса, жобада аутентификациядан өтіңіз.
1. Қажетті команданы орындаңыз.

   - ВМ-ді іске қосу:

     ```console
     openstack server start <ID_ВМ>
     ```

   - ВМ-ді тоқтату:

     ```console
     openstack server stop <ID_ВМ>
     ```

   - ВМ-ді қайта жүктеу:

     ```console
     openstack server reboot <ID_ВМ>
     ```

{/tab}

{/tabs}

## {heading(ВМ-ді мәжбүрлі қайта іске қосу)[id=iaas-vm-manage-restart]}

Егер виртуалды машина жауап бермесе, мәжбүрлі қайта іске қосуды пайдаланыңыз.

{note:info}
ВМ-ді мәжбүрлі қайта іске қосу қуатты өшіріп-қосуға (power cycling) сәйкес келеді.<br/>Қайта жүктеу виртуалды машинаның операциялық жүйесінің дұрыс аяқталуын (graceful shutdown) білдіреді.
{/note}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
1. ВМ-ді мәжбүрлі қайта іске қосуды тәсілдердің бірімен орындаңыз.

   - Контекстік мәзір арқылы:

     1. Виртуалды машиналар тізімінде қажетті ВМ үшін ![ ](../../../../../assets/more-icon.svg "inline") басыңыз.
     1. **Мәжбүрлі қайта іске қосу** тармағын таңдап, әрекетті растаңыз.

   - Виртуалды машина бетінде:

     1. Виртуалды машиналар тізімінде күйін өзгерту қажет ВМ атауын басыңыз.
     1. ВМ бетінде **Жалпы ақпарат** қойындысына өтіңіз.
     1. ВМ параметрлері кестесінің үстінде **Тағы** түймесін басыңыз.
     1. **Мәжбүрлі қайта іске қосу** түймесін басып, әрекетті растаңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиентін {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=орнатыңыз]} және егер бұрын жасалмаса, жобада аутентификациядан өтіңіз.

1. ВМ-ді мәжбүрлі қайта іске қосыңыз:

   ```console
   openstack server reboot --hard <ID_ВМ>
   ```

{/tab}

{/tabs}

## {heading(ВМ-ді бұғаттау және бұғаттан шығару)[id=iaas-vm-manage-block_unblock]}

Виртуалды машинаның күйі мен параметрлерін өзгертуге тыйым салу қажет болса, оны бұғаттаңыз.

Бұғатталған виртуалды машинаны іске қосу немесе тоқтату, сондай-ақ қайта жүктеу мүмкін емес. Бұғатталған ВМ-нің дисктерін ауыстыру және желілік интерфейстер баптауларын өзгерту мүмкін емес.

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
1. ВМ-ді тәсілдердің бірімен бұғаттаңыз немесе бұғаттан шығарыңыз.

   - Контекстік мәзір арқылы:

     1. Виртуалды машиналар тізімінде қажетті ВМ үшін ![ ](../../../../../assets/more-icon.svg "inline") басыңыз.
     1. Әрекетті таңдап, растаңыз.

   - Виртуалды машина бетінде:

     1. Виртуалды машиналар тізімінде күйін өзгерту қажет ВМ атауын басыңыз.
     1. ВМ бетінде **Жалпы ақпарат** қойындысына өтіңіз.
     1. ВМ параметрлері кестесінің үстінде **Тағы** түймесін басыңыз.
     1. Әрекетті таңдап, растаңыз.

{/tab}

{/tabs}

## {heading(ВМ-ді жою)[id=iaas-vm-manage-delete]}

{var(cloud)} жүйесінде виртуалды машина әдепкі бойынша root-дискімен бірге жойылады. Қосымша дисктердің жойылуы тиісті саясат баптауларына байланысты.

{note:err}
Жою операциясы қайтымсыз! ВМ-ді жоймас бұрын қажетті деректерді сақтаңыз.
{/note}

1. Виртуалды машинаны жоюға дайындаңыз.

   - Root-дискті сақтау қажет болса, оны клондаңыз немесе {linkto(../../../../../computing/iaas/instructions/vm/vm-root-replace#iaas-vm-root-replace)[text=қажет емес дискіге ауыстырыңыз]}.
   - Сақтау қажет қосымша дисктерді {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=ВМ-ден ажыратыңыз]}.

     Жою саясатында `delete_on_termination`: `False` қасиеті орнатылған қосымша дисктерді ВМ-ден ажыратпауға болады.

     {cut(Дисктерді жою саясатын тексеру — OpenStack CLI)}

     1. OpenStack клиенті {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
     1. Команданы орындаңыз:

        ```console
        openstack server show <ID_ВМ> --os-compute-api-version 2.42
        ```

        `volumes_attached` жолын табыңыз. Онда дисктердің идентификаторлары тізімделген және олардың жою саясаты — `delete_on_termination` қасиеті (`True` немесе `False`) көрсетілген.

     {/cut}

1. Қажетті деректерді сақтағаннан кейін виртуалды машинаны жойыңыз.

   {tabs}

   {tab(Жеке кабинет)}

   1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
   1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
   1. ВМ-ді тәсілдердің бірімен жойыңыз.

      - Топтық операциялар арқылы — бірнеше ВМ үшін:

        1. Виртуалды машиналар тізімінде жою қажет ВМ-ді таңдаңыз.
        1. ВМ тізімінің үстіндегі мәзірде **Жою** түймесін басыңыз.
        1. Әрекетті растаңыз.

      - Контекстік мәзір арқылы — бір ВМ үшін:

        1. Виртуалды машиналар тізімінде жою қажет ВМ үшін ![ ](../../../../../assets/more-icon.svg "inline") басыңыз.
        1. **Жою** тармағын таңдап, әрекетті растаңыз.

      - Виртуалды машина бетінде:

        1. Виртуалды машиналар тізімінде жою қажет ВМ атауын басыңыз.
        1. ВМ бетінде **Жалпы ақпарат** қойындысына өтіңіз.
        1. ВМ параметрлері кестесінің оң жағының үстінде себет белгішесін басыңыз.
        1. Әрекетті растаңыз.

   {/tab}

   {tab(OpenStack CLI)}

   1. OpenStack клиентін {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=орнатыңыз]} және егер бұрын жасалмаса, жобада аутентификациядан өтіңіз.
   1. ВМ-ді жойыңыз:

      ```console
      openstack server delete <ID_ВМ>
      ```

   {/tab}

   {/tabs}

## {heading(ВМ-ді қайта атау және түрін өзгерту)[id=iaas-vm-manage-rename]}

{var(cloud)} жүйесінде виртуалды машинаны қайта атауға, сондай-ақ ВМ түрін — процессорлар санын (vCPU) және жедел жад көлемін (RAM) өзгертуге болады.

{note:info}
ВМ түрін өзгерту кезінде виртуалды машина қайта жүктеледі.
{/note}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
1. ВМ атауын немесе түрін тәсілдердің бірімен өзгертіңіз.

   - Контекстік мәзір арқылы:

     1. Виртуалды машиналар тізімінде қажетті ВМ үшін ![ ](../../../../../assets/more-icon.svg "inline") басыңыз.
     1. Әрекетті таңдаңыз.
     1. Енгізу өрісін толтырып, **Сақтау** түймесін басыңыз.

   - Виртуалды машина бетінде:

     1. Виртуалды машиналар тізімінде күйін өзгерту қажет ВМ атауын басыңыз.
     1. ВМ бетінде **Жалпы ақпарат** қойындысына өтіңіз.
     1. ВМ параметрлері кестесінің үстінде **Тағы** түймесін басыңыз.
     1. Әрекетті таңдаңыз.
     1. Енгізу өрісін толтырып, **Сақтау** түймесін басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиентін {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=орнатыңыз]} және егер бұрын жасалмаса, жобада аутентификациядан өтіңіз.
1. Қажетті әрекетті орындаңыз.

   - ВМ-ді қайта атау:

     ```console
     openstack server set --name <НОВОЕ_ИМЯ> <ID_ВМ>
     ```

   - ВМ түрін өзгерту:

     1. Қолжетімді конфигурация үлгілерінің тізімін алып, үлгінің ID мәнін көшіріп алыңыз:

        ```console
        openstack flavor list --all
        ```

     1. ВМ түрін өзгертуді іске қосып, процестің аяқталуын күтіңіз:

        ```console
        openstack server resize --flavor <ID_ШАБЛОНА> <ID_ВМ>
        ```

{/tab}

{/tabs}

## {heading(Тегтерді тағайындау)[id=iaas-vm-manage-tags]}

Тегтер виртуалды машиналар тізімін сүзгілеуге және қажетті ВМ-ді тезірек табуға мүмкіндік береді. Бар тегтерді пайдаланыңыз немесе жаңасын жасаңыз. Тегтің атауы мен түсі {linkto(../../../../../computing/iaas/concepts/vm/tags#iaas-tags)[text=талаптарға]} сәйкес келуі керек.

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
1. Қажетті ВМ үшін ![ ](../../../../../assets/more-icon.svg "inline") басыңыз.
1. Қажетті тегтерді жалаушалармен белгілеңіз.
1. Жаңа тег қосу үшін **Жаңа тег жасау** түймесін басыңыз, оның атауын енгізіңіз, түсін таңдаңыз және **Тегті қосу** түймесін басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиентін {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=орнатыңыз]} және егер бұрын жасалмаса, жобада аутентификациядан өтіңіз.
1. Қажетті команданы орындаңыз.

   - ВМ тегтерінің тізімін шығару:

     ```console
     openstack server show -c tags <ID_ВМ>
     ```

   - ВМ-ге тег тағайындау:

     ```console
     openstack server set --tag <ТЕГ> <ID_ВМ>
     ```

   - ВМ-дегі тегті жою:

     ```console
     openstack server unset --tag <ТЕГ> <ID_ВМ>
     ```

   - ВМ-дегі барлық тегтерді жою:

     ```console
     openstack server unset --all-tags <ID_ВМ>
     ```

{/tab}

{/tabs}

{ifndef(public)}
## {heading(ВМ метадеректерін басқару)[id=iaas-vm-manage-metadata]}

ВМ-ге `кілт=мән` форматында метадеректер қосуға болады.

{tabs}

{tab(Жеке кабинет)}

1. {var(cloud)} жеке кабинетіне өтіңіз.
1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
1. ВМ атауын басыңыз.
1. **Метадеректер** қойындысына өтіңіз.
1. Қажетті әрекетті орындаңыз:

   - ВМ метадеректерін қосу:

     1. **Қосу** түймесін басыңыз.

        {var(cloud)} жүйесінде жасалған метадеректер болмаса, түйменің атауы — **Метадеректерді қосу**.

     1. Метадеректердің атауы мен мәнін толтырыңыз.
     1. **Метадеректерді қосу** түймесін басыңыз.

   - Метадеректер мәнін өзгерту:

     1. Қажетті метадеректер үшін ![ ](../../../../../assets/more-icon.svg "inline") басыңыз.
     1. Жаңа мәнді көрсетіп, **Өзгерістерді сақтау** түймесін басыңыз.

   - Метадеректерді жою:

     1. Қажетті метадеректерді жалаушалармен белгілеңіз.
     1. **Жою** түймесін басыңыз.
     1. Әрекетті растаңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиентін {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=орнатыңыз]} және егер бұрын жасалмаса, жобада аутентификациядан өтіңіз.
1. ВМ метадеректерін қосыңыз:

   ```console
   openstack server set --property <КЛЮЧ>=<ЗНАЧЕНИЕ> <ID_ВМ>
   ```

{/tab}

{/tabs}
{/ifndef}

## {heading(Құпиясөзді орнату және өзгерту)[id=iaas-vm-manage-password]}

{linkto(../../../../../computing/iaas/concepts/oper-system#iaas-oper-system-default-account)[text=Әдепкі тіркелгінің]} құпиясөзін ОЖ-ге алғаш рет авторизацияланғанда өзіңіз орнатуыңыз қажет. Орнатылған құпиясөзді кейін өзгертуге болады.

Құпиясөзді орнату шарттары:

- виртуалды машина іске қосылған және ОЖ жүктелу процесі аяқталған;
- QEMU гостевой агенті орнатылып, іске қосылған (күйі — `running`).

{note:info}
{var(cloud)} бейнесінен жасалған виртуалды машиналарда QEMU гостевой агенті әдепкі бойынша бар.
{/note}

QEMU гостевой агентінің күйін тексеру командасы:

{ifdef(public)}
{tabs}

{tab(Windows)}

```console
sc query qemu-ga
```

{/tab}

{tab(Linux)}
{/ifdef}

```console
systemctl status qemu-guest-agent
```
{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

Құпиясөзді орнату үшін:

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
1. Мына тәсілдердің бірін қолданыңыз:

   - Контекстік мәзір арқылы:

     1. Виртуалды машиналар тізімінде қажетті ВМ үшін ![ ](../../../../../assets/more-icon.svg "inline") түймесін басыңыз.
     1. **Құпиясөзді орнату** тармағын таңдаңыз.
     1. Жаңа құпиясөзді енгізіңіз немесе **Генерациялау** түймесін басыңыз.
     1. **Құпиясөзді орнату** түймесін басыңыз.

   - Виртуалды машинаның бетінде:

     1. Виртуалды машиналар тізімінде күйін өзгерту қажет ВМ атауын басыңыз.
     1. ВМ бетінде **Жалпы ақпарат** қойындысына немесе **Консоль** қойындысына өтіңіз.
     1. ВМ параметрлері кестесінің үстінде немесе консоль терезесінің үстінде **Құпиясөзді орнату** түймесін басыңыз.
     1. Жаңа құпиясөзді енгізіңіз немесе **Генерациялау** түймесін басыңыз.

        {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
        {note:err}
        Құпиясөзді сақтап қойыңыз. Жүйеде құпиясөзді қалпына келтіру мүмкіндігі жоқ.
        {/note}
        {/ifdef}

     1. **Құпиясөзді орнату** түймесін басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиентін {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=орнатыңыз]} және егер бұрын жасалмаса, жобада аутентификациядан өтіңіз.
1. Команданы орындаңыз:

   ```console
   openstack server set --root-password <ID_ВМ>
   ```

{/tab}

{/tabs}

{note:info}
Құпиясөз ұзындығы кемінде 8 таңба болуы және латын әліпбиінің әріптерін, сандар мен арнайы таңбаларды `!`, `"`, `#`, `$`, `%`, `&`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `]`, `^`, `_`, `` ` ``, `{`, `}`, `~` қамтуы керек.
{/note}

## {heading(Кілт бойынша ВМ-ге қолжетімділікті қалпына келтіру)[id=iaas-vm-manage-recovery-access-key]}

Кілттік жұпты пайдаланып Linux виртуалды машинасына SSH арқылы қолжетімділікті қалпына келтіру үшін ОЖ пайдаланушысының құпиясөзін білу қажет.

1. Публикалық кілтті алыңыз.

   - Публикалық кілт файлы жоғалған болса, жеке кілт файлы орналасқан директорияға өтіп, команданы орындаңыз:

     ```console
     ssh-keygen -y -f <ПРИВАТНЫЙ_КЛЮЧ> > <ПУБЛИЧНЫЙ_КЛЮЧ>
     ```
     Мұнда:

     - `<ПРИВАТНЫЙ_КЛЮЧ>` — жеке кілт файлының атауы.
     - `<ПУБЛИЧНЫЙ_КЛЮЧ>` — публикалық кілт файлының атауы.

   - Жеке кілт файлы жоғалған болса, {ifdef(public)}{linkto(../../../../../tools-for-using-services/vk-cloud-account/instructions/account-manage/keypairs#vk-cloud-account-manage-keypairs-create)[text=жаңа кілттік жұп жасаңыз]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/account-manage-private/keypairs-private#vk-cloud-account-manage-keypairs-create)[text=жаңа кілттік жұп жасаңыз]}{/ifdef}.

   {ifdef(public)}
1. Публикалық кілт файлына сілтеме жасаңыз.

   1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетіне.
   1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
   1. Бар бакетті пайдаланыңыз немесе {linkto(../../../../../storage/s3/instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=жаңасын жасаңыз]}.
   1. Бакетке публикалық кілті бар файлды {linkto(../../../../../storage/s3/instructions/objects/upload-object#s3-instructions-upload-object)[text=қосыңыз]}.
   1. Осы файлға сілтеме бойынша {linkto(../../../../../storage/s3/instructions/access-management/signed-url#s3-instructions-signed-url)[text=қолжетімділікті қосыңыз]}.
   1. Публикалық кілт файлына сілтемені көшіріп алыңыз.
   {/ifdef}

1. Публикалық кілтті виртуалды машинаға жүктеңіз.

   1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
   1. Виртуалды машиналар тізімінде қажетті ВМ атауын басыңыз.
   1. ВМ бетінде **Консоль** қойындысына өтіңіз.
   1. ВМ ОЖ-ге кіру үшін әдепкі пайдаланушы атын және құпиясөзді пайдаланыңыз.
   1. Публикалық кілт файлын жүктеп алыңыз:

      ```console
      wget <ССЫЛКА>
      ```
      Мұнда `<ССЫЛКА>` — публикалық кілт файлына сілтеме.

   1. Публикалық кілтті `authorized_keys` файлына көшіріңіз:

      ```console
      cat <ФАЙЛ> >> ~/.ssh/authorized_keys
      ```
      Мұнда `<ФАЙЛ>` — публикалық кілт файлы.

1. Кілт бойынша қолжетімділік мүмкіндігін тексеріңіз.

   1. Жеке кілт сақталған компьютердің терминалына өтіңіз.
   1. ВМ-ге SSH арқылы қосылыңыз:

      ```console
      ssh -i <ФАЙЛ> <ЛОГИН>@<IP-АДРЕС>
      ```
      Мұнда:

      - `<ФАЙЛ>` — жеке кілт файлының жолы.
      - `<ЛОГИН>` — логин.
      - `<IP-АДРЕС>` — ВМ-нің сыртқы IP-мекенжайы.

## {heading(Дискіні ВМ-ге қосу)[id=iaas-vm-manage-mount-disk]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
1. Диск қосу қажет ВМ атауын басыңыз.
1. **Дискілер** қойындысына өтіңіз.
1. Дискіні ВМ-ге қосыңыз:

   {tabs}

   {tab(Бар диск)}

   1. **Дискіні қосу** түймесін басыңыз.
   1. Ашылған терезеде ВМ-ге қосу қажет дискіні тізімнен таңдап, **Дискіні қосу** түймесін басыңыз.

   {/tab}

   {tab(Жаңа диск)}

   1. **Дискіні жасау** түймесін басыңыз.

   {include(../../../../../_includes/_disk_params.md)[tags=vm]}

   1. **Дискіні жасау** түймесін басыңыз.

   {/tab}

   {/tabs}

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. Диск жасалмаған болса, оны {linkto(../../../../../computing/iaas/instructions/volumes/volumes-create#iaas-volumes-create)[text=жасаңыз]}. Оның ID мәнін сақтаңыз.
1. Дискіні ВМ-ге {linkto(../../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-mount-disk)[text=қосыңыз]}.

{/tab}

{/tabs}

{note:info}
ВМ-ге байланыстырмай диск жасау {linkto(../../../../../computing/iaas/instructions/volumes#iaas-volumes)[text=Дискілер]} бөлімінде сипатталған.
{/note}

## {heading(Оқиғалар журналын қарау)[id=iaas-vm-manage-view-logs]}

Оқиғалар журналында ВМ күйінің өзгеруі және пайдаланушы әрекеттері туралы ақпарат қамтылған.

{tabs}

{tab(OpenStack CLI)}

1. OpenStack клиентін {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=орнатыңыз]} және егер бұрын жасалмаса, жобада аутентификациядан өтіңіз.
1. Қажетті команданы орындаңыз.

   - Оқиғалар журналын қарау (кеңейтілген формат):

     ```console
     openstack server event list --long <ID_ВМ>
     ```

   - Оқиғалар журналын қарау (қысқаша формат):

     ```console
     openstack server event list <ID_ВМ>
     ```

   - Оқиға туралы толық ақпаратты шығару үшін **Request ID** бағанындағы оқиға идентификаторын пайдаланыңыз:

     ```console
     openstack server event show <ID_ВМ> <ID_СОБЫТИЯ>
     ```

Оқиға мысалдары:

- `start` / `stop` — ВМ-ді іске қосу / тоқтату;
- `resize` / `confirmResize` — ВМ түрін өзгертуді іске қосу / растау;
- `extend_volume` — диск өлшемін ұлғайту;
- `create` — ВМ жасау;
- `live-migration` — ВМ миграциясы.

{/tab}

{/tabs}

## {heading(ВМ-ді басқа жобаға көшіру)[id=iaas-vm-manage-transfer]}

Виртуалды машинаны жобалар арасында көшіру оның дискісінің көшірмесін жасау және осы көшірмеден жаңа ВМ іске қосу арқылы орындалады.

1. ВМ дискісінің көшірмесін образ түрінде {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-create)[text=жасаңыз]}.
1. Жасалған образды кейіннен пайдалану үшін {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-export)[text=экспорттаңыз]}.
1. ВМ-ді көшіру қажет жобаны таңдаңыз.
1. Образды қажетті жобаға {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=импорттаңыз]}.
1. Образдан жаңа ВМ {linkto(../../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=жайыңыз]}.
