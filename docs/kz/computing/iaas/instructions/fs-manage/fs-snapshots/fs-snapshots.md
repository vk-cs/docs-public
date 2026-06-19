# {heading(Снэпшоттармен жұмыс)[id=iaas-fs-snapshots]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Снэпшот жасау)[id=iaas-fs-snapshots-creating]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Қажетті файлдық қойма орналасқан [жобаны](/kz/tools-for-using-services/account/concepts/projects) таңдаңыз.
1. **Бұлтты есептеулер** → **Файлдық қойма** бөліміне өтіңіз.
1. Қажетті қойма үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Снэпшот жасау** тармағын таңдаңыз.
1. (Опционалды) Снэпшот атауын өзгертіп, сипаттама қосыңыз.
1. **Снэпшот жасау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіп, жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Manila клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#openstack-install-package) көз жеткізіңіз.
1. Келесі команданы орындаңыз:

   ```console
   openstack share snapshot create --name <ИМЯ_СНИМКА> <ХРАНИЛИЩЕ>
   ```
   Мұнда:

   - `<ИМЯ_СНИМКА>` — жасалатын файлдық қойма снэпшотының атауы.
   - `<ХРАНИЛИЩЕ>` — файлдық қойманың атауы немесе идентификаторы.

{/tab}

{/tabs}

## {heading(Снэпшоттар тізімін алу)[id=iaas-fs-snapshots-getting]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Қажетті файлдық қойма орналасқан [жобаны](/kz/tools-for-using-services/account/concepts/projects) таңдаңыз.
1. **Бұлтты есептеулер** → **Файлдық қойма** бөліміне өтіңіз.
1. Қажетті қойма үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Снэпшоттар тізімі** тармағын таңдаңыз. Снэпшоттар туралы ақпарат көрсетіледі.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіп, жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Manila клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#openstack-install-package) көз жеткізіңіз.
1. Келесі команданы орындаңыз:

   ```console
   openstack share snapshot list --share <ХРАНИЛИЩЕ>
   ```

   Мұнда `<ХРАНИЛИЩЕ>` — файлдық қойманың атауы немесе идентификаторы.

{/tab}

{/tabs}

## {heading(Қойманы снэпшоттан қалпына келтіру)[id=iaas-fs-snapshots-restoring]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Қажетті файлдық қойма орналасқан [жобаны](/kz/tools-for-using-services/account/concepts/projects) таңдаңыз.
1. **Бұлтты есептеулер** → **Файлдық қойма** бөліміне өтіңіз.
1. Қажетті қойма үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Снэпшоттар тізімі** тармағын таңдаңыз.
1. Қажетті снэпшот үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Файлдық қойманы қалпына келтіру** тармағын таңдаңыз.
1. **Растау** батырмасын басыңыз. Снэпшоттан жаңа қойма жасау процесі басталады.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіп, жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Manila клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#openstack-install-package) көз жеткізіңіз.
1. Келесі команданы орындаңыз:

   ```console
   openstack share create --snapshot-id <ID_СНИМКА> --share-type <ТИП_ХРАНИЛИЩА> --name <ИМЯ_ХРАНИЛИЩА> <ПРОТОКОЛ> <РАЗМЕР>
   ```

   Мұнда:

   - `<ID_СНИМКА>` — оның негізінде жаңа файлдық қойма жасалатын снэпшот идентификаторы.
   - `<ТИП_ХРАНИЛИЩА>` — жасалатын файлдық қойманың түрі.
   - `<ИМЯ_ХРАНИЛИЩА>` — жасалатын файлдық қойманың атауы.
   - `<ПРОТОКОЛ>` — операциялық жүйеден қоймаға қол жеткізу протоколы: CIFS немесе NFS.
   - `<РАЗМЕР>` — файлдық қойманың ГБ өлшемі.

   `<ТИП_ХРАНИЛИЩА>`, `<ПРОТОКОЛ>` және `<РАЗМЕР>` мәндері снэпшоттың сәйкес сипаттамаларымен бірдей болуы тиіс.

{/tab}

{/tabs}

## {heading(Снэпшотты жою)[id=iaas-fs-snapshots-deleting]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Қажетті файлдық қойма орналасқан [жобаны](/kz/tools-for-using-services/account/concepts/projects) таңдаңыз.
1. **Бұлтты есептеулер** → **Файлдық қойма** бөліміне өтіңіз.
1. Қажетті қойма үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Снэпшоттар тізімі** тармағын таңдаңыз.
1. Қажетті снэпшот үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Снэпшотты жою** тармағын таңдаңыз.
1. **Растау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіп, жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. Manila клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#openstack-install-package) көз жеткізіңіз.
1. Келесі команданы орындаңыз:

   ```console
   openstack share snapshot delete <СНИМОК>
   ```

   Мұнда `<СНИМОК>` — жою қажет снэпшоттың атауы немесе идентификаторы.

{/tab}

{/tabs}