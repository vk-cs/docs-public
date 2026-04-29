{include(/kz/_includes/_translated_by_ai.md)}

Әдепкі бойынша Windows Server ОС орнатылғаннан кейін виртуалды машинаға тек екі бір мезгілдегі қосылу қолжетімді (консоль немесе RDP). Қосылымдардың көбірек санына рұқсат беру үшін [Remote Desktop Services](/kz/computing/vm-licenses/ms-lic#remote_desktop_services) пайдаланыңыз.

## Клиенттік қол жеткізу лицензияларын белсендіру

[Техникалық қолдау қызметіне](/kz/contacts) жүгініңіз және келесі мәліметтерді көрсетіңіз:

- [жоба идентификаторы (PID)](/kz/tools-for-using-services/vk-cloud-account/instructions/project-settings/manage#zhoba_identifikatoryn_alu);
- Microsoft Windows Server бар ВМ идентификаторы;
- қажетті лицензиялар саны;
- қашықтағы жұмыс үстеліне қосылу параметрлері.

## Клиенттік қол жеткізу лицензияларының санын өзгерту

[Техникалық қолдау қызметіне](/kz/contacts) жүгініңіз және келесі мәліметтерді көрсетіңіз:

- [жоба идентификаторы (PID)](/kz/tools-for-using-services/vk-cloud-account/instructions/project-settings/manage#zhoba_identifikatoryn_alu);
- Microsoft Windows Server бар ВМ идентификаторы;
- лицензиялардың жаңа саны;
- қашықтағы жұмыс үстеліне қосылу параметрлері.

## Клиенттік қол жеткізу лицензиясының түрін өзгерту

{note:warn}
[Пайдаланушыға арналған лицензиялар](/kz/computing/vm-licenses/ms-lic#remote_desktop_services) RDS-сервер Active Directory доменіне кірген жағдайда ғана қолжетімді.
{/note}

{include(/kz/_includes/_vm-lic-manage.md)}

1. Лицензия түрін өзгерту үшін [техникалық қолдау қызметіне](/kz/contacts) келесі деректерді көрсетіп жүгініңіз:

    - [жоба идентификаторы (PID)](/kz/tools-for-using-services/vk-cloud-account/instructions/project-settings/manage#zhoba_identifikatoryn_alu);
    - Microsoft Windows Server бар ВМ идентификаторы;
    - қашықтағы жұмыс үстеліне қосылу параметрлері;
    - саясат түріне сәйкес келетін қажетті лицензия түрі.

   Өтінім өңделгенше күтіңіз.

1. RDS-серверді қайта жүктеңіз.
