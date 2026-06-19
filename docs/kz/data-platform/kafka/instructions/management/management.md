# {heading(Сервис компоненттерімен жұмыс)[id=kafka_management]}

{include(/kz/_includes/_translated_by_ai.md)}

{ifndef(public)}
{include(../../../_includes/_standalone.md)[tags=difference_management]}
{/ifndef}

## {heading(Экземпляр туралы ақпаратты қарау)[id=kafka_view]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
{/ifdef}
   
1. **Data Platform** → **Сервис даналары** бөліміне өтіңіз.
1. Қажетті дананың атауын басыңыз.
1. Дана бетінің қойындыларындағы ақпаратты қараңыз:

   - **Жалпы ақпарат** — дана параметрлері және негізгі эндпоинттер.
   - **Архитектура** — Cloud Kafka тораптары және олардың сызба түрінде берілген сипаттамалары.
   - **Тіркелгі деректері** — тіркелгілерді қарау және оларды басқару.
   - **Баптаулар** — сервис конфигурациясын қарау және өңдеу.

      Белгілі бір параметрдің сипаттамасымен танысу үшін оның атауын басыңыз.

   - **Қызмет көрсету** — Cloud Kafka қызмет көрсету параметрлерін қарау және басқару.


{/tab}

{/tabs}

## {heading(Экземпляр туралы ақпаратты өңдеу)[id=kafka_edit]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(Сыртқы IP тағайындау)[id=kafka_assign-ip]}

{ifndef(public)}
{note:warn} Тек {var(cloud)} құрамындағы {var(data-p)} үшін қолжетімді. {/note}
{/ifndef}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_assign_ip]}

{ifdef(public)}
{note:warn}

Сыртқы IP мекенжайларын пайдалану [тарифтеледі](/kz/networks/vnet/tariffication).

{/note}
{/ifdef}

{/tab}

{/tabs}

{ifndef(public)}
## {heading(IP және порттарды өзгерту)[id=kafka_change-ip]}

{note:warn} Тек Standalone ішіндегі {var(data-p)} үшін қолжетімді. {/note}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

{/ifndef}

## {heading(Диск өлшемін ұлғайту)[id=kafka_disk-resize]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_disk_resize]}

{/tab}

{/tabs}

## {heading(Көлденең масштабтау)[id=kafka_scaling]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
{/ifdef}
   
1. **Data Platform → Сервис даналары** бөліміне өтіңіз.
1. Масштабтау баптауларына келесі тәсілдердің бірімен өтіңіз.

    - Сервис даналары тізімінен:

        1. Сервис даналары тізімінде қажетті дананың жанындағы **•••** белгішесін басыңыз.
        1. **Көлденең масштабтау** тармағын таңдаңыз.

    - Сервис данасының бетінде:

        1. Сервис даналары тізімінде қажетті дананың атауын басыңыз.
        1. **Жалпы ақпарат** қойындысында **•••** белгішесін басыңыз.
        1. **Көлденең масштабтау** тармағын таңдаңыз.

1. Kafka брокері тораптарының жаңа санын көрсетіңіз.
1. Қосымша опцияларды қосыңыз немесе алып тастаңыз:

   - **Kafka Bridge** — Cloud Kafka-мен REST API арқылы жұмыс істеу үшін;
   - **Kafka UI** — Cloud Kafka-мен графикалық интерфейс арқылы жұмыс істеу үшін.

1. **Өзгерістерді сақтау** батырмасын басыңыз.

{/tab}

{/tabs}

## {heading(Сервис конфигурациясын өңдеу)[id=kafka_config]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings_new]}

{/tab}

{/tabs}

## {heading(Қызмет көрсету параметрлерін өзгерту)[id=kafka_maintenance]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Тіркелгі қосу)[id=kafka_user-add]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}
1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
{/ifdef}
   
1. **Data Platform → Сервис даналары** бөліміне өтіңіз.
1. Сервис даналары тізімінде қажетті дананың атауын басыңыз.
1. Дана бетінде **Тіркелгі деректері** қойындысына өтіңіз.
1. **Тіркелгі қосу** батырмасын басыңыз.
1. Ашылған терезеде Cloud Kafka данасына кіруге арналған пайдаланушы логинін орнатыңыз.
1. Пайдаланушы рөлін таңдаңыз:

    {include(../../../_includes/_kafka.md)[tags=roles]}

1. Пайдаланушы құпиясөзін ойлап табыңыз немесе жасаңыз.

   Құпиясөзге қойылатын талаптар:

   - тек сандарды, `!`, `"`, `#`, `$`, `%`, `&`, `(`, `)`, `*`, `+`, `,`, `.`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `]`, `^`, `_`, `{`, `|`, `}`, `~`, `-` таңбаларын, бас және кіші латын әріптерін қамтуы мүмкін;
   - кемінде 16 таңбадан тұруы керек;
   - құпиясөздің ең көп ұзындығы 50 таңба;
   - кемінде бір бас және бір кіші латын әрпін, сондай-ақ кемінде бір санды қамтуы керек.

   {note:err}

   Құпиясөзді қалпына келтіру мүмкін емес.

   {/note}

1. **Сақтау** батырмасын басыңыз.

{/tab}

{/tabs}

## {heading(Тіркелгіге қолжетімділікті шектеу)[id=kafka_user-access]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_user_access]}

{/tab}

{/tabs}

## {heading(Тіркелгіні жою)[id=kafka_user-delete]}

{tabs}

{tab(Жеке кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_user_delete]}

{/tab}

{/tabs}

## {heading(Сервис данасын жою)[id=kafka_delete]}

{tabs}

{tab(Жеке кабинет)}


{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}
