{tabs}

{tab(Жеке кабинет)}

{includetag(restore-from-backup-volume-backups)}
1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
   {/includetag}
   {includetag(restore-from-backup-volume-iaas)}
1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
   {/includetag}
1. Мына тәсілдердің бірімен **Резервтік көшірмелеу** бөліміне өтіңіз.

   - Бүйір мәзір арқылы: **Cloud Backup → Резервтік көшірмелеу**.

   - Виртуалды машинаның контекстік мәзірі арқылы:

     1. **Бұлттық есептеулер → Виртуалды машиналар** бөліміне өтіңіз.
        {includetag(restore-from-backup-volume-backups)}
     1. Қажетті ВМ үшін ![ ](../../../../assets/more-icon.svg "inline") түймесін басып, **Бэкаптан қалпына келтіру** тармағын таңдаңыз.
        {/includetag}
        {includetag(restore-from-backup-volume-iaas)}
     1. Қажетті ВМ үшін ![ ](../../../../../assets/more-icon.svg "inline") түймесін басып, **Бэкаптан қалпына келтіру** тармағын таңдаңыз.
        {/includetag}

1. Қажетті резервтік көшірмелер тізімін ашыңыз.

   {tabs}

   {tab(Автоматты жасалған)}

   1. **Автоматты** қойындысына өтіңіз.
      {includetag(restore-from-backup-volume-backups)}
   1. Қажетті жоспардың атауын басыңыз немесе қажетті жоспар үшін ![ ](../../../../assets/more-icon.svg "inline") түймесін басып, **Резервтік көшірмелерді көру** тармағын таңдаңыз.
      {/includetag}
      {includetag(restore-from-backup-volume-iaas)}
   1. Қажетті жоспардың атауын басыңыз немесе қажетті жоспар үшін ![ ](../../../../../assets/more-icon.svg "inline") түймесін басып, **Резервтік көшірмелерді көру** тармағын таңдаңыз.
      {/includetag}

   {/tab}

   {tab(Қолмен жасалған)}

   1. **Қолмен** қойындысына өтіңіз.
   1. Инстанстар тізімінде қажетті ВМ үшін **Қалпына келтіру нүктелері** бағанындағы сілтемені басыңыз.

   {/tab}

   {/tabs}

1. Қалпына келтіру үшін қай резервтік көшірмені пайдалану керегін шешіңіз.
1. Резервтік көшірмедегі деректердің зақымдалмағанына көз жеткізіңіз:

   1. Қажетті көшірме үшін **Тұтастық** бағанындағы **Тексеру** түймесін басыңыз.
   1. Тексеру нәтижесін күтіңіз:

      - `Расталды` — көшірмеде қате жоқ және оны қауіпсіз {linkto(/kz/storage/backups/instructions/restore-from-backup#backup-restore)[text=қалпына келтіруге]} болады.
      - `Расталмады` — көшірмеде қателер немесе келіспейтін деректер табылды. Жаңа резервтік көшірме жасаңыз — {linkto(/kz/storage/backups/instructions/create-backup-plan#backup-plan-create)[text=автоматты түрде]} немесе {linkto(/kz/storage/backups/instructions/create-backup-copy#backup-copy-create)[text=қолмен]}.

   {includetag(restore-from-backup-volume-backups)}
1. Қажетті көшірме үшін ![ ](../../../../assets/more-icon.svg "inline") түймесін басып, **Дискіні қалпына келтіру** тармағын таңдаңыз.
   {/includetag}
   {includetag(restore-from-backup-volume-iaas)}
1. Қажетті көшірме үшін ![ ](../../../../../assets/more-icon.svg "inline") түймесін басып, **Дискіні қалпына келтіру** тармағын таңдаңыз.
   {/includetag}
1. Дискіні қалпына келтіру үшін пайдаланылатын резервтік көшірмені таңдаңыз.
1. **Дискіні бэкаптан қалпына келтіру** түймесін басыңыз.
1. **Дискіні қалпына келтіру** бетінде параметрлерді көрсетіңіз:

   - **Инстанс**: дискісі қалпына келтірілетін ВМ-ді таңдаңыз.
   - **Қалпына келтірілетін диск**: көрсетілген ВМ үшін қалпына келтірілетін дискіні таңдаңыз. Жаңа диск жасалады.
   - **Диск атауы**: қажет болса, жаңа дискінің атауын көрсетіңіз.
   - **Қолжетімділік аймағы**: диск орналастырылатын дата-орталықты таңдаңыз.
     {includetag(restore-from-backup-volume-backups)}
   - **Диск түрі**: {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=диск түрлерінің]} бірін таңдаңыз — `HDD`{ifdef(public)}, `SSD`{/ifdef} немесе `High-IOPS SSD`.
     {/includetag}
     {includetag(restore-from-backup-volume-iaas)}
   - **Диск түрі**: {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=диск түрлерінің]} бірін таңдаңыз — `HDD`{ifdef(public)}, `SSD`{/ifdef} немесе `High-IOPS SSD`.
     {/includetag}
   - **Дискіні виртуалды машинаға қосу**: дискіні **Виртуалды машина** тізіміндегі бар ВМ-ге қосқыңыз келсе, опцияны қосыңыз.

1. **Дискіні қалпына келтіру** түймесін басыңыз.

{/tab}

{/tabs}

Қалпына келтіру нәтижесінде жаңа диск жасалады. Тиісті опция таңдалған болса, диск ВМ-ге қосылады. Ескі диск жойылмайды.

{includetag(restore-from-backup-volume-backups)}
{note:warn}
Ескі диск енді қажет болмаса, ресурстарды үнемдеу үшін оны {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage)[text=қолмен жойыңыз]}.
{/note}
{/includetag}
{includetag(restore-from-backup-volume-iaas)}
{note:warn}
Ескі диск енді қажет болмаса, ресурстарды үнемдеу үшін оны {linkto(../../../../../computing/iaas/instructions/volumes/volumes-manage)[text=қолмен жойыңыз]}.
{/note}
{/includetag}