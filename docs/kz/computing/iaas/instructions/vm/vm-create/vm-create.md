# {heading(ВМ құру)[id=iaas-vm-create]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Cloud Servers қызметінде виртуалды машиналарды жеке кабинет арқылы, OpenStack CLI немесе Terraform арқылы құруға болады. Виртуалды машинаны Terraform көмегімен құру үшін {ifdef(public)}{linkto(../../../../../tools-for-using-services/terraform/how-to-guides/iaas/create#terraform-iaas-create)[text=Terraform бөліміндегі нұсқаулықты]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/terraform/how-to-guides/iaas/create-private#terraform-iaas-create-private)[text=Terraform бөліміндегі нұсқаулықты]}{/ifdef} пайдаланыңыз.

{var(cloud)} командасы кейбір ОС-ның бейнелерін дайындаған. Дайын бейнелер тізімі жеке кабинетте {ifdef(public)}[жаңа виртуалды машинаны құру терезесінде](https://msk.cloud.vk.ru/app/services/infra/servers/add){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}жаңа виртуалды машинаны құру терезесінде{/ifdef} қолжетімді. Сонымен қатар, ОС бейнесін өз бетінше {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=импорттауға]} болады.

{note:info}
ВМ параметрлерін баптау мүмкіндігі әр түрлі операциялық жүйелер үшін өзгеше болуы мүмкін.
{/note}

ВМ құру үшін:

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Шоттың балансы оң екенін және қалаған конфигурациядағы виртуалды машинаны құруға {ifdef(public)}{linkto(../../../../../tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квоталар]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=квоталар]}{/ifdef} жеткілікті екенін тексеріңіз.
1. **Облачные вычисления** → **Виртуальные машины** бөліміне өтіңіз.
1. **Создать инстанс** немесе **Добавить** түймесін басыңыз.

    - **Операциялық жүйе**: [операциялық жүйе нұсқасын](../../../concepts/oper-system) немесе бұрын VK Cloud ішінде [жасаған](../../images/images-manage#iaas-images-manage-create) не [импорттаған](../../images/images-manage#iaas-images-manage-import) образды таңдаңыз.
    - **Виртуалды машина санаты**: ВМ-нің алдын ала орнатылған конфигурацияларының [санатын](../../../concepts/vm/flavor#iaas-flavor-vm-categories) таңдаңыз.
    - **Виртуалды машина түрі**: ВМ-нің алдын ала орнатылған конфигурациясын таңдаңыз.

{ifdef(private-cert)}
ВМ дұрыс құрылуы үшін жеке кабинеттен шықпау ұсынылады.
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
ВМ құру кезінде беттің оң жақ төменгі бұрышында құру үдерісінің прогресс белгішесі көрсетіледі. Пайызды және орындалу кезеңін (дайындау, құру, баптау) көру үшін белгішені және үдеріс атауын басыңыз.

Үдеріс аяқталғаннан кейін белгіше келесі статустардың бірінде көрсетіледі:

- `Барлық үдерістер аяқталды` (жасыл белгіше) — инстанс құрылды және жұмысқа дайын.
- `Барлық үдерістер аяқталды` (сары белгіше) — инстанс құрылды, бірақ кезеңдердің бірінде қате орын алды. Қате сипаттамасы және оның пайда болу себебін анықтау үшін {var(cloud)} әкімшісіне жүгіне алатын коды көрсетілген.
- `Қате орын алды` (қызыл белгіше) — инстанс құрылмады, қате орын алды. Қате сипаттамасы және оның пайда болу себебін анықтау үшін {var(cloud)} әкімшісіне жүгіне алатын коды көрсетілген.

Инстансты құру үдерісі {var(cloud)} ішіндегі параллель әрекеттерді блоктамайды.
{/ifdef}

{/tab}

{tab(OpenStack CLI)}

   {ifdef(public)}
1. OpenStack CLI жұмысына дайындалыңыз:

    1. Ағымдағы пайдаланушы үшін API арқылы қолжетімділікті [белсендіріңіз](/kz/tools-for-using-services/api/rest-api/enable-api).
    1. OpenStack клиентінің [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#tools-cli-openstack) көз жеткізіп, жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).

   {/ifdef}

   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
1. OpenStack клиенті {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанын]} тексеріңіз және жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
   {/ifdef}
1. Деректерді жинаңыз:

   1. Қолжетімді ВМ түрлерінің тізімін алыңыз және қажетті идентификаторды сақтаңыз:

      ```console
      openstack flavor list
      ```

   1. Қолжетімді ВМ бейнелерінің тізімін алыңыз және қажетті идентификаторды сақтаңыз:

       ```console
       openstack image list
       ```

       Бейнені аты бойынша табу үшін фильтрді пайдаланыңыз:

       ```console
       openstack image list | grep -i <БЕЙНЕ_АТЫНЫҢ_БӨЛІГІ>
       ```

       Мысалы, Astra Linux бейнесін іздеу үшін:

       ```console
       openstack image list | grep -i alse
       ```

   1. Қауіпсіздік топтарының тізімін алыңыз:

      ```console
      openstack security group list
      ```

      - Linux ВМ құрып, оған SSH арқылы қосылу үшін `ssh` немесе `ssh+www` тобының идентификаторын сақтаңыз.
      - Windows ВМ құрып, оған RDP арқылы қосылу үшін `rdp` немесе `rdp+www` тобының идентификаторын сақтаңыз.

      Желілік қолжетімділік ережелерін баптау туралы толығырақ {linkto(../../../../../networks/vnet/instructions/secgroups#vnet-secgroups)[text=Қауіпсіздік топтары]} бөлімінде.

   1. Қолжетімді желілердің тізімін алыңыз және қажетті идентификаторды сақтаңыз:

      ```console
      openstack network list
      ```

      - Егер `ext-net` желісі таңдалса, виртуалды машинаға сыртқы IP-мекенжай автоматты түрде тағайындалады.
      - Егер жеке желі таңдалса, виртуалды машина құрылғаннан кейін оған {linkto(../../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip)[text=Floating IP-мекенжайын тағайындауға]} болады.

   1. Қолжетімді кілттік жұптардың тізімін алыңыз және қажетті кілттік жұптың атын сақтаңыз:

      ```console
      openstack keypair list
      ```

      Жаңа кілттік жұп құру үшін:

      1. Кілтті генерациялаңыз:

         ```console
         ssh-keygen -t rsa -b 2048 -f ~/.ssh/my_key -N ""
         ```

      1. Кілтті жүктеңіз:

         ```console
         openstack keypair create --public-key ~/.ssh/my_key.pub --type ssh <КІЛТТІК_ЖҰПТЫҢ_АТЫ>
         ```

1. Жүктеу дисін құрыңыз:

   ```console
   openstack volume create root-volume --size <ДИСК_КӨЛЕМІ> --image <БЕЙНЕ_ID> --availability-zone MS1 --bootable
   ```

   Мұнда:

   - `<ДИСК_КӨЛЕМІ>` — дискінің ГБ шамасындағы өлшемі.

     {ifdef(public)}
     Максимальді өлшем шектелген. Толығырақ — {linkto(../../../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-images-volumes-no-quotas-limits)[text=Квоталар және лимиттер]} бөлімінде.
     {/ifdef}

   - `<БЕЙНЕ_ID>` — бұрын алынған бейненің идентификаторы.

1. ВМ құрыңыз:

   ```console
   openstack server create <ВМ_АТЫ> \
                           --volume <ДИСК_ID> \
                           --network <ЖЕЛІ_ID> \
                           --flavor <КОНФИГУРАЦИЯ_ҮЛГІСІ_ID> \
                           --security-group <ҚАУІПСІЗДІК_ТОБЫ> \
                           --key-name <КІЛТТІК_ЖҰПТЫҢ_АТЫ> \
                           --availability-zone <ҚОЛЖЕТІМДІЛІК_ЗОНАСЫ>
   ```

   {note:warn}
   Егер `--network` опциясында сыртқы желі (`ext-net`) көрсетілсе, ВМ құру командасына `--use-config-drive` опциясын қосыңыз.
   {/note}

   Виртуалды машина құрылғаннан кейін ол туралы ақпарат көрсетіледі. `adminPass` өрісін тауып, оның мәнін сақтаңыз. Ол VNC консолі арқылы серверге кіру үшін қажет болады.

1. Құрылған ВМ күйін тексеріңіз:

   ```console
   openstack server list
   ```

   Құрылған машина қолжетімді ВМ тізімінде пайда болуы және `ACTIVE` статусқа ие болуы тиіс.

{note:info}
CLI арқылы ВМ құрудың кейбір ерекшеліктері:

- Қолжетімділік зонасы көрсетілмесе, кездейсоқ бірі таңдалады.
- Диск көрсетілмесе, «эфемерді диск» (шектеулері бар) құрылады.
{/note}

{/tab}

{/tabs}