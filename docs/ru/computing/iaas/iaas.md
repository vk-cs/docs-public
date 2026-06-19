# {heading(Cloud Servers)[id=iaas]}

{ifdef(public)}
Cloud Servers — сервис облачных вычислений, предоставляющий пользователям облачные серверы и системы хранения данных (СХД).

*Облачный сервер* — {linkto(../../computing/iaas/concepts/vm#iaas-concepts-vm)[text=виртуальная машина]} (ВМ) с собственной {linkto(../../computing/iaas/concepts/oper-system#iaas-oper-system)[text=ОС]}, процессорами, дисками и памятью, занимающая часть ресурсов физического сервера (хоста). На одном хосте может работать несколько ВМ. При сбое на хосте облачные серверы автоматически переносятся на другой. Ресурсы облачных серверов можно динамически настраивать под решаемые задачи, чтобы оптимизировать затраты.

Сервис облачных вычислений поддерживает несколько типов облачных {linkto(../../computing/iaas/concepts/data-storage#iaas-data-storage)[text=хранилищ данных]}, отличающихся производительностью и стоимостью хранения данных, в том числе {linkto(../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=диски блочного хранения]}. Надежность и высокая доступность дисков обеспечиваются их реплицированием: в зависимости от типа диска поддерживаются 2–3 идентичные реплики. Они размещаются на одном или разных физических серверах СХД, в том числе в разных {linkto(../../computing/iaas/concepts/avail-zone#iaas-avail-zone)[text=ЦОД]}.

Cloud Servers имеет удобную систему управления. Пользователь управляет своими виртуальными машинами и хранилищами через {linkto(../../tools-for-using-services/account#tools-account)[text=личный кабинет]} или {linkto(../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=OpenStack CLI]}.
{/ifdef}