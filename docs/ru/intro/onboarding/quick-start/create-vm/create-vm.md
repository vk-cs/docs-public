# {heading(Cloud Servers: создайте первую виртуальную машину)[id=onboarding-create-vm]}

{linkto(../../../../computing/iaas/concepts/about#iaas-about)[text=Cloud Servers]} — сервис, позволяющий работать с виртуальными машинами. Виртуальные машины применяются для развертывания и запуска приложений, баз данных, рабочих станций и любых других сервисов, работающих постоянно.

Начните работу с сервисом [Cloud Servers](/ru/computing/iaas) любым удобным способом:

- Воспользуйтесь [инструкцией](#onboarding-create-vm-linux) и создайте первую виртуальную машину на базе Linux из образа `Ubuntu 22.04` и подключитесь к ней.
- Посмотрите {linkto(#onboarding-create-vm-video)[text=видео]}, в котором будет создана виртуальная машина, выбраны диски, настроены резервное копирование и мониторинг.
- Пройдите [бесплатный обучающий курс](https://cloud.vk.com/cloud-native-courses/advanced/virtualnye-mashiny/). В теоретической части курса объясняется, что такое виртуальная машина, какие есть типы ВМ и дисков. В практической части курса вы создадите виртуальную машину, воспроизведете на ней неисправность, а затем устраните эту неисправность восстановлением ВМ из резервной копии.

{note:info}Работающая ВМ потребляет вычислительные ресурсы и {linkto(../../../../computing/iaas/tariffication#iaas-tariffication)[text=тарифицируется]}.{/note}

## {heading(Создайте ВМ на базе Linux)[id=onboarding-create-vm-linux]}

Пройдя все шаги этой инструкции, вы создадите новую виртуальную машину из образа `Ubuntu 22.04` и подключитесь к ней по протоколу SSH.

{include(../../../../_includes/_create-vm.md)[tags=vm_onboarding]}

## {heading(Видеоинструкция)[id=onboarding-create-vm-video]}

В этом видео будет создана виртуальная машина, выбраны диски, настроены резервное копирование и мониторинг через личный кабинет {var(cloud)}.

{caption()[id=position=above;align=right;id=video_create_vm]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239692&hash=816c5b89636647fc&hd=3)[type=vkvideo]}
{/caption}

## {heading(Обучающий курс)[id=onboarding-create-vm-courses]}

Пройдите [бесплатный обучающий курс](https://cloud.vk.com/cloud-native-courses/advanced/virtualnye-mashiny/). В теоретической части курса объясняется, что такое виртуальная машина, какие есть типы ВМ и дисков. В практической части курса вы создадите виртуальную машину, воспроизведете на ней неисправность, а затем устраните эту неисправность восстановлением ВМ из резервной копии.

## {heading(Вопросы и ответы)[id=onboarding-create-vm-faq]}

{cut(Какие операционные системы доступны для виртуальных машин в {var(cloud)}?)}

Полный список готовых образов доступен в личном кабинете в [окне создания новой виртуальной машины](https://msk.cloud.vk.com/app/services/infra/servers/add).

[cols="1,1,1", options="header"]
|===
|Семейство
|Лицензия
|Операционная система

.2+|Linux
|Бесплатная
|Almalinux, CentOS, Debian, openSUSE, Ubuntu

|Платная
|Astra Linux SE, Альт, РЕД ОС

|Windows
|Платная
|Windows Server
|===

При необходимости вы можете {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=импортировать образ]} ОС самостоятельно.
{/cut}

{cut(Как масштабировать виртуальную машину?)}
Для вертикального масштабирования виртуальной машины:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. В списке виртуальных машин нажмите ![ ](../../../../assets/more-icon.svg "inline") для нужной ВМ.
1. Выберите действие **Изменить тип ВМ**.
1. Выберите новый тип виртуальной машины и нажмите кнопку **Сохранить**.

   {note:info}ВМ будет перезапущена.{/note}
{/cut}

{cut(Как связать тестовую и продуктовую ВМ?)}

Чаще всего используется один из двух способов:

1. Обе ВМ подключены к одной приватной подсети и связаны по внутренним IP-адресам.
1. ВМ подключены к разным подсетям одной сети, а подсети связаны через маршрутизатор.

Оба способа требуют настройки {linkto(../../../../networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-secgroups)[text=групп безопасности]}. Например, обе ВМ можно добавить в группу безопасности `default` — для нее разрешен любой входящий и исходящий трафик в рамках самой группы. 

{/cut}

{cut(Как загрузить свой образ ОС?)}

Вы можете {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=импортировать образ]} из файла через личный кабинет в [окне создания нового образа](https://msk.cloud.vk.com/app/services/infra/images) или с использованием CLI.

{note:warn} Поддерживаются только образы в формате RAW. Если ваш образ в другом формате, {linkto(../../../../computing/iaas/how-to-guides/packer#iaas-packer-convert-image)[text=выполните его конвертацию]}.{/note}

{/cut}

{cut(Какими способами можно подключиться к ВМ?)}

Рекомендуемые способы подключения к виртуальным машинам:

- по {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=SSH]} для ВМ на базе Linux;
- по {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win)[text=RDP]} для ВМ на базе Windows.

Если рекомендованные способы не работают, или ВМ не имеет внешнего IP-адреса, воспользуйтесь {linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=VNC-консолью]}.

{/cut}

{cut(Как подключиться к ВМ и настроить веб-сервер Ngnix?)}

Посмотрите видео, в котором будет выполнено подключение к виртуальной машине по SSH и развертывание на ней веб-сервера Ngnix.

{caption()[id=position=above;align=right;id=video_nginx]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239333&hash=e178745de33ad86f&hd=3)[type=vkvideo]}
{/caption}

{/cut}
