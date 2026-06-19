# {heading(Cloud Servers: алғашқы виртуалды машинаны жасаңыз)[id=onboarding-create-vm]}

{include(/kz/_includes/_translated_by_ai.md)}

{linkto(../../../../computing/iaas/concepts/about#iaas-about)[text=Cloud Servers]} — виртуалды машиналармен жұмыс істеуге мүмкіндік беретін сервис. Виртуалды машиналар қосымшаларды, дерекқорларды, жұмыс станцияларын және тұрақты жұмыс істейтін кез келген басқа сервистерді орналастыру және іске қосу үшін пайдаланылады.

Cloud Servers сервисімен [жұмысты](/kz/computing/iaas) кез келген ыңғайлы тәсілмен бастаңыз:

- [Нұсқаулықты](#onboarding-create-vm-linux) пайдаланып, `Ubuntu 22.04` образы негізінде Linux жүйесіндегі алғашқы виртуалды машинаны жасаңыз және оған қосылыңыз.
- Виртуалды машина жасалатын, дискілер таңдалатын, резервтік көшіру мен мониторинг бапталатын {linkto(#onboarding-create-vm-video)[text=бейнені]} қараңыз.
- [Тегін оқыту курсынан](https://cloud.vk.com/cloud-native-courses/advanced/virtualnye-mashiny/) өтіңіз. Курстың теориялық бөлігінде виртуалды машина деген не, ВМ мен дискілердің қандай түрлері бар екені түсіндіріледі. Практикалық бөлікте сіз виртуалды машина жасап, ондағы ақауды қайта шығарасыз, содан кейін бұл ақауды ВМ-ді резервтік көшірмеден қалпына келтіру арқылы түзетесіз.

{note:info}Жұмыс істеп тұрған ВМ есептеу ресурстарын тұтынады және {linkto(../../../../computing/iaas/tariffication#iaas-tariffication)[text=тарифтеледі]}.{/note}

## {heading(Linux негізіндегі ВМ жасаңыз)[id=onboarding-create-vm-linux]}

Осы нұсқаулықтың барлық қадамдарынан өткен соң, сіз `Ubuntu 22.04` образы негізінде жаңа виртуалды машина жасап, оған SSH протоколы арқылы қосыласыз.

{include(../../../../_includes/_create-vm.md)[tags=vm_onboarding]}

## {heading(Бейненұсқаулық)[id=onboarding-create-vm-video]}

Бұл бейнеде виртуалды машина жасалады, дискілер таңдалады, резервтік көшіру мен мониторинг {var(cloud)} жеке кабинеті арқылы бапталады.

{caption()[id=position=above;align=right;id=video_create_vm]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239692&hash=816c5b89636647fc&hd=3)[type=vkvideo]}
{/caption}

## {heading(Оқыту курсы)[id=onboarding-create-vm-courses]}

[Тегін оқыту курсынан](https://cloud.vk.com/cloud-native-courses/advanced/virtualnye-mashiny/) өтіңіз. Курстың теориялық бөлігінде виртуалды машина деген не, ВМ мен дискілердің қандай түрлері бар екені түсіндіріледі. Практикалық бөлікте сіз виртуалды машина жасап, ондағы ақауды қайта шығарасыз, содан кейін бұл ақауды ВМ-ді резервтік көшірмеден қалпына келтіру арқылы түзетесіз.

## {heading(Сұрақтар мен жауаптар)[id=onboarding-create-vm-faq]}

{cut({var(cloud)} ішіндегі виртуалды машиналар үшін қандай операциялық жүйелер қолжетімді?)}

Дайын образдардың толық тізімі жеке кабинеттегі [жаңа виртуалды машинаны жасау терезесінде](https://kz.cloud.vk.com/app/services/infra/servers/add) қолжетімді.

[cols="1,1,1", options="header"]
|===
|Топ
|Лицензия
|Операциялық жүйе

.2+|Linux
|Тегін
|Almalinux, CentOS, Debian, openSUSE, Ubuntu

|Ақылы
|Astra Linux SE, Альт, РЕД ОС

|Windows
|Ақылы
|Windows Server
|===

Қажет болса, ОЖ образын {linkto(../../../..computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=өз бетіңізше импорттай]} аласыз.
{/cut}

{cut(Виртуалды машинаны қалай масштабтауға болады?)}
Виртуалды машинаны вертикалды масштабтау үшін:

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).

1. **Бұлттық есептеулер → Виртуалды машиналар** бөліміне өтіңіз.

1. Виртуалды машиналар тізімінде қажетті ВМ үшін ![ ](../../../../assets/more-icon.svg "inline") батырмасын басыңыз.

1. **ВМ түрін өзгерту** әрекетін таңдаңыз.

1. Жаңа виртуалды машина түрін таңдап, **Сақтау** батырмасын басыңыз.

   {note:info}ВМ қайта жүктеледі.{/note}
{/cut}

{cut(Тестілік және өнімдік ВМ-ді қалай байланыстыруға болады?)}

Көбіне екі тәсілдің бірі қолданылады:

1. Екі ВМ де бір жеке ішкі желіге қосылған және ішкі IP-мекенжайлар арқылы байланыстырылған.
1. ВМ-дер бір желінің әртүрлі ішкі желілеріне қосылған, ал ішкі желілер маршрутизатор арқылы байланыстырылған.

Екі тәсіл де {linkto(../../../networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-secgroups)[text=қауіпсіздік топтарын]} баптауды талап етеді. Мысалы, екі ВМ-ді де `default` қауіпсіздік тобына қосуға болады — бұл топ үшін топтың өз шегінде кез келген кіріс және шығыс трафикке рұқсат етілген. 

{/cut}

{cut(ОЖ-ның өз образыңызды қалай жүктеуге болады?)}

Образды файлдан жеке кабинеттегі [жаңа образды жасау терезесі](https://kz.cloud.vk.com/app/services/infra/images) арқылы немесе CLI көмегімен {linkto(../../../..computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=импорттай]} аласыз.

{note:warn} Тек RAW форматындағы образдарға қолдау көрсетіледі. Егер образыңыз басқа форматта болса, {linkto(../../../../computing/iaas/how-to-guides/packer#iaas-packer-convert-image)[text=оны түрлендіріңіз]}.{/note}

{/cut}

{cut(ВМ-ге қандай тәсілдермен қосылуға болады?)}

Виртуалды машиналарға қосылудың ұсынылатын тәсілдері:

- Linux негізіндегі ВМ үшін {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=SSH]} арқылы;
- Windows негізіндегі ВМ үшін {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win)[text=RDP]} арқылы.

Егер ұсынылатын тәсілдер жұмыс істемесе немесе ВМ-нің сыртқы IP-мекенжайы болмаса, {linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=VNC консолін]} пайдаланыңыз.

{/cut}

{cut(ВМ-ге қалай қосылып, Ngnix веб-серверін баптауға болады?)}

Виртуалды машинаға SSH арқылы қосылу және онда Ngnix веб-серверін орналастыру орындалатын бейнені қараңыз.

{caption()[id=position=above;align=right;id=video_nginx]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239333&hash=e178745de33ad86f&hd=3)[type=vkvideo]}
{/caption}

{/cut}
