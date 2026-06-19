# {heading(Жұмыс үстелдері пулын басқару)[id=desktops-pool-manage]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:info}
Сондай-ақ, барлық пулдар үшін жүйеде жасалған {linkto(../../../../../computing/cloud-desktops/instructions/manage-desktops#desktops-manage-desktops)[text=барлық жұмыс үстелдерін басқара]} аласыз.
{/note}

## {heading(Жұмыс үстелдері пулдарының тізімін қарау)[id=desktops-pool-view]}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Cloud Desktop** → **Жұмыс үстелдері пулдары** бөліміне өтіңіз.

   Бұрын жасалған жұмыс үстелдері пулдарының тізімі көрсетіледі.

   Пул мәртебесі оның атауының сол жағында көрсетіледі:

   - Жасыл — жаңа жұмыс үстелдерін қосу үшін **Қолжетімді**.
   - Сұр — жұмыс үстелдерін қосу үшін **Қолжетімсіз**.

## {heading(Пул параметрлерін өңдеу)[id=desktops-pool-edit]}

Пул құрылғаннан кейін оның атауынан, түрінен және қолжетімділік аймағынан басқа кез келген параметрін өзгерте аласыз.

Пулдың қауіпсіздік тобының ережелерін өзгерту үшін, жеке кабинетте немесе Openstack CLI көмегімен топқа жаңа ережелерді {linkto(../../../../../networks/vnet/instructions/secgroups#add_rule)[text=қосыңыз]} және қажетсіздерін {linkto(../../../../../networks/vnet/instructions/secgroups#delete_rule)[text=жойыңыз]}.

Қалған параметрлерді өзгерту үшін:

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Cloud Desktop** → **Жұмыс үстелдері пулдары** бөліміне өтіңіз.
1. Пулды өңдеу бетіне келесі тәсілдердің бірімен өтіңіз:

   - Қажетті пул үшін ![ ](../../../../../assets/more-icon.svg "inline") батырмасын басып, **Пулды өңдеу** тармағын таңдаңыз.
   - Пулдар тізімінде қажетті пулдың атауын басып, **Пул параметрлері** қойындысына өтіп, **Пулды өңдеу** батырмасын басыңыз.

1. (Опционалды) {linkto(../../../../../computing/cloud-desktops/instructions/desktops-pool/add#desktops-pool-setup-configuration)[text=пул конфигурациясының параметрлерін]} өзгертіңіз.
1. **Келесі қадам** батырмасын басыңыз.
1. (Опционалды) {linkto(../../../../../computing/cloud-desktops/instructions/desktops-pool/add#desktops-pool-configure-vms)[text=пулдың виртуалды машиналарының баптауларын]} өзгертіңіз.
1. **Келесі қадам** батырмасын басыңыз.
1. (Опционалды) {linkto(../../../../../computing/cloud-desktops/instructions/desktops-pool/add#desktops-pool-configure-peripherals)[text=пул ВМ перифериясының баптауларын]} өзгертіңіз.
1. **Өзгерістерді сақтау** батырмасын басыңыз.

## {heading(Пул пайдаланушыларына хабарлама жіберу)[id=desktops-pool_manage-desktops-message]}

Бұл топтық операция: қажет болған жағдайда жалаушалар арқылы таңдап, бірнеше пулдың пайдаланушыларына хабарлама жіберуге болады.

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Cloud Desktop** → **Жұмыс үстелдері пулдары** бөліміне өтіңіз.
1. Қажетті пул үшін жалаушаны қойыңыз.
1. **Хабарлама жіберу** батырмасын басыңыз.
1. Ашылған терезеде өрістерді толтырыңыз:

   - **Хабарлама түрі**: келесі опциялардың бірін таңдаңыз: **Ескерту**, **Ақпараттық** немесе **Қате**.
   - **Хабарлама мәтіні**: пул пайдаланушыларына жеткізгіңіз келетін ақпаратты көрсетіңіз.

1. **Хабарлама жіберу** батырмасын басыңыз.

## {heading(Жұмыс үстелдері пулын жою)[id=desktops-pool-delete]}

{note:warn}
Жойылған пулды қалпына келтіру мүмкін емес. Егер пулда жұмыс үстелдері болса, олар да пул жойылған кезде бірге жойылады.
{/note}

Бұл топтық операция: қажет болған жағдайда жалаушалар арқылы таңдап, бірден бірнеше пулды жоюға болады.

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Cloud Desktop** → **Жұмыс үстелдері пулдары** бөліміне өтіңіз.
1. Пулды келесі тәсілдердің бірімен жойыңыз:

   - Қажетті пул үшін ![ ](../../../../../assets/more-icon.svg "inline") батырмасын басып, **Пулды жою** тармағын таңдаңыз.
   - Пул беті арқылы:

     1. Пулдар тізімінен жойғыңыз келетін пулды таңдап, оның атауын басыңыз.
     1. **Параметрлер** қойындысына өтіңіз.
     1. Қойындының жоғарғы оң жақ бұрышындағы ![Корзина](../../../../../assets/trash-icon.svg "inline") белгішесін басыңыз.

1. Жоюды растаңыз.

{note:warn}
Жұмыс үстелдері пулдарын, соның ішінде соңғысын да жою Cloud Desktop сервисінің инфрақұрылымын жоюға әкелмейді. Ол [тарифтеледі](../../../tariffication) және есептеу ресурстарын тұтынады.

Егер сіз енді Cloud Desktop қолданбасаңыз, оның инфрақұрылымын {linkto(../../../../../computing/cloud-desktops/instructions/delete-vdi#desktops-delete-vdi)[text=жойыңыз]}.
{/note}
