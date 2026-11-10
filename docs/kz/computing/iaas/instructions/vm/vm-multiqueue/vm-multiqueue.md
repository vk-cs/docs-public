# {heading(Бірнеше кезектерді (Multiqueue) қосу)[id=iaas-vm-vm-multiqueue]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(Бірнеше кезектерді қосу)[id=iaas-vm-vm-multiqueue-enabling]}

1. {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=Орнатыңыз]} OpenStack CLI клиентін және жобаға аутентификациядан өтіңіз, егер бұрын жасалмаса.
1. {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=Жүктеп алыңыз]} ВМ бейнесін.
1. Жүктеп алынған ВМ бейнесі үшін `hw_vif_multiqueue_enabled=true` параметрін орнатыңыз, бірнеше кезектерді қосу үшін:

   ```console
   $ openstack image set --property hw_vif_multiqueue_enabled=true <БЕЙНЕ>
   ```
   Мұнда `<БЕЙНЕ>` — бейненің атауы немесе идентификаторы.

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]} {var(cloud)} жеке кабинетіне.
1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
1. {linkto(../../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=ВМ жасаңыз]} бірнеше кезектер функциясы қосылған жүктеп алынған бейне негізінде.
1. **Консоль** қойындысына өтіңіз.
1. ВМ-ге кіріңіз.
1. `ip link` командасының көмегімен желілік интерфейстерді шығарыңыз.
1. Желілік картаның интерфейс атауын есте сақтаңыз.
1. Кезектер санын виртуалды CPU санына тең етіп орнатыңыз:

   ```console
   $ ethtool -L <ИНТЕРФЕЙС> combined <САНЫ>
   ```
   Мұнда:

    * `<ИНТЕРФЕЙС>` — желілік картаның интерфейс атауы.
    * `<САНЫ>` — кезектер саны.

## {heading(Бірнеше кезектер функциясының жұмыс істеуін тексеру)[id=iaas-vm-vm-multiqueue-check]}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]} {var(cloud)} жеке кабинетіне.
1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
1. Бірнеше кезектер функциясы қосылған жүктеп алынған бейне негізінде жасалған ВМ атауын басыңыз.
1. **Консоль** қойындысына өтіңіз.
1. ВМ-ге кіріңіз.
1. Ағымдағы кезектер санын алыңыз:

   ```console
   $ ethtool -l <ИНТЕРФЕЙС>
   ```
   Мұнда `<ИНТЕРФЕЙС>` — желілік картаның интерфейс атауы.

   Ағымдағы кезектер саны **Pre-set maximums** → **Combined** бөліміндегі кезектер санына тең болуы тиіс.