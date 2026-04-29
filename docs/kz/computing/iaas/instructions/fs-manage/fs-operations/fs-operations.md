{include(/kz/_includes/_translated_by_ai.md)}

## Файлдық сақтау орындарының тізімін қарау

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Қажетті файлдық сақтау орны орналасқан [жобаны](/kz/tools-for-using-services/account/concepts/projects) таңдаңыз.
1. **Бұлтты есептеулер** → **Файлдық сақтау орны** бөліміне өтіңіз. Файлдық сақтау орындарының тізімі көрсетіледі.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu).
1. Manila клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety) көз жеткізіңіз.
1. Келесі команданы орындаңыз:

    ```console
    openstack share list
    ```

{/tab}

{/tabs}

## Файлдық сақтау орны туралы ақпаратты қарау

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Қажетті файлдық сақтау орны орналасқан [жобаны](/kz/tools-for-using-services/account/concepts/projects) таңдаңыз.
1. **Бұлтты есептеулер** → **Файлдық сақтау орны** бөліміне өтіңіз.
1. Қажетті файлдық сақтау орнының атауын басыңыз. Ол туралы ақпарат көрсетіледі.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu).
1. Manila клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety) көз жеткізіңіз.
1. Келесі команданы орындаңыз:

    ```console
    openstack share show <ХРАНИЛИЩЕ>
    ```

   Мұнда `<ХРАНИЛИЩЕ>` — файлдық сақтау орнының атауы немесе идентификаторы.

{/tab}

{/tabs}

## {heading(Файлдық сақтау орнының өлшемін ұлғайту)[id=increasing_file_storage_size]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Қажетті файлдық сақтау орны орналасқан [жобаны](/kz/tools-for-using-services/account/concepts/projects) таңдаңыз.
1. **Бұлтты есептеулер** → **Файлдық сақтау орны** бөліміне өтіңіз.
1. Қажетті сақтау орны үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Өлшемін өзгерту** тармағын таңдаңыз.
1. Мәнді енгізіп, **Растау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu).
1. Manila клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety) көз жеткізіңіз.
1. Келесі команданы орындаңыз:

    ```console
    openstack share extend <ХРАНИЛИЩЕ> <РАЗМЕР>
    ```

   Мұнда:

   - `<ХРАНИЛИЩЕ>` — файлдық сақтау орнының атауы немесе идентификаторы.
   - `<РАЗМЕР>` — файлдық сақтау орнының ГБ-тағы жаңа өлшемі.

{/tab}

{/tabs}

{note:info}

Файлдық сақтау орнының өлшемін азайтуға болмайды.

{/note}

## {heading(Файлдық сақтау орнын және оның желісін жою)[id=deleting_a_file_storage_and_its_network]}

Файлдық сақтау орнын жою үшін алдымен оны виртуалды машиналарда [ажырату](/kz/computing/iaas/instructions/fs-manage/fs-connect#unmount_file_storage) және оның барлық снимоктарын [жою](../fs-snapshots#deleting_a_snapshot) қажет.

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Қажетті файлдық сақтау орны орналасқан [жобаны](/kz/tools-for-using-services/account/concepts/projects) таңдаңыз.
1. **Бұлтты есептеулер** → **Файлдық сақтау орны** бөліміне өтіңіз.
1. Қажетті сақтау орны үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Жою** тармағын таңдаңыз.
1. **Растау** батырмасын басыңыз.

Файлдық сақтау орнымен бірге ол үшін жасалған желі де бір уақытта жойылады.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu).
1. Manila клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety) көз жеткізіңіз.
1. Файлдық сақтау орнын жою үшін келесі команданы орындаңыз:

    ```console
    openstack share delete <ХРАНИЛИЩЕ>
    ```

   Мұнда `<ХРАНИЛИЩЕ>` — жойылуы қажет файлдық сақтау орнының атауы немесе идентификаторы.

1. Файлдық сақтау орнының желісін жою үшін келесі команданы орындаңыз:

    ```console
    openstack share network delete <ID_СЕТИ>
    ```

   Мұнда `<ID_СЕТИ>` — жойылуы қажет файлдық сақтау орны желісінің идентификаторы.

{/tab}

{/tabs}
