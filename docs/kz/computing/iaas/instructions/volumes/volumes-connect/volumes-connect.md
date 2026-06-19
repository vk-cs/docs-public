# {heading(Дискіні қосу және ажырату)[id=iaas-volumes-connect]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Дискіні ВМ-ге қосу)[id=iaas-volumes-connect-mount-disk]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Перейдите]}{/ifdef} {var(cloud)} жеке кабинетіне өтіңіз.
1. **Бұлттық есептеулер → Дискілер** бөліміне өтіңіз.
1. Тізімнен ВМ-ге қосылмаған дискіні табыңыз: диск атауының сол жағындағы белгіше сұр түсті, оған меңзерді апарғанда **Инстансқа қосылмаған** деген жазу пайда болады.
1. Дискіні қосу үшін виртуалды машинаны таңдау терезесін ашу үшін тәсілдердің бірін қолданыңыз.

   - Дискінің контекстік мәзірі арқылы:

     1. Дискілер тізімінде қажетті диск үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басыңыз.
     1. **Инстансқа қосу** тармағын таңдаңыз.

   - Диск бетінде:

     1. ВМ-ге қосу қажет дискінің атауын басыңыз.
     1. Диск бетінде **Жалпы ақпарат** қойындысына өтіңіз.
     1. Дискілер тізімінің үстінде **Тағы** батырмасын басып, **Инстансқа қосу** тармағын таңдаңыз.

1. Ашылған терезеде **Инстансты таңдаңыз** өрісінде виртуалды машинаны көрсетіңіз.
1. **Дискіні қосу** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Дискілер тізімін шығарып, дискінің ID мәнін көшіріп алыңыз:

   ```console
   openstack volume list
   ```

1. Дискінің күйін тексеріңіз:

   ```console
   openstack volume show <ID_ДИСКА>
   ```

   Егер `status` параметрінің мәні `available` болса, дискіні қосуға болады. Егер күй мәні `maintenance` болса — оның `available` күйіне ауысуын күтіңіз.

1. Виртуалды машиналар тізімін шығарып, дискіні қосу қажет ВМ идентификаторын көшіріп алыңыз:

   ```console
   openstack server list
   ```

1. Дискіні қосыңыз:

   ```console
   openstack server add volume <ID_ВИРТУАЛЬНОЙ_МАШИНЫ> <ID_ДИСКА>
   ```

1. Нәтижені тексеру үшін диск туралы ақпаратты қараңыз (`attachments` өрісі):

   ```console
   openstack volume show <ID_ДИСКА>
   ```

{/tab}

{/tabs}

## {heading(Дискіні ВМ-ден ажырату)[id=iaas-volumes-connect-dismount-disk]}

{note:warn}

ВМ root-дискін ажырату үшін [тиісті нұсқаулықты](/kz/computing/iaas/instructions/vm/vm-root-replace) пайдаланыңыз.

{/note}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Перейдите]}{/ifdef} {var(cloud)} жеке кабинетіне өтіңіз.
1. Қажетті дискілер тізімі бар бетті ашыңыз.

   - Барлық дискілер: **Бұлттық есептеулер** → **Дискілер** бөліміне өтіңіз.
   - Белгілі бір виртуалды машинаның дискілері:

     1. **Бұлттық есептеулер → Виртуалды машиналар** бөліміне өтіңіз.
     1. Виртуалды машиналар тізімінде дискіні ажырату қажет ВМ атауын басыңыз.
     1. ВМ бетінде **Дискілер** қойындысына өтіңіз.

1. Тәсілдердің бірімен дискіні ВМ-ден ажыратыңыз.

   - Дискінің контекстік мәзірі арқылы:

     1. Дискілер тізімінде қажетті диск үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басыңыз.
     1. **Инстанстан ажырату** тармағын таңдаңыз.

   - Диск бетінде:

     1. ВМ-ден ажырату қажет дискінің атауын басыңыз.
     1. Диск бетінде **Жалпы ақпарат** қойындысына өтіңіз.
     1. Дискілер тізімінің үстінде **Тағы** батырмасын басып, **Инстанстан ажырату** тармағын таңдаңыз.

1. Ашылған терезеде диск атауын тексеріп, **Растау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Дискілер тізімін шығарып, дискінің ID мәнін көшіріп алыңыз:

   ```console
   openstack volume list
   ```

1. Виртуалды машиналар тізімін шығарып, дискіні ажырату қажет виртуалды машинаның ID мәнін көшіріп алыңыз:

   ```console
   openstack server list
   ```

1. Дискіні ажыратыңыз:

   ```console
   openstack server remove volume <ID_ВИРТУАЛЬНОЙ_МАШИНЫ> <ID_ДИСКА>
   ```

1. Нәтижені тексеру үшін диск туралы ақпаратты қараңыз (`attachments` өрісі):

   ```console
   openstack volume show <ID_ДИСКА>
   ```

{/tab}

{/tabs}