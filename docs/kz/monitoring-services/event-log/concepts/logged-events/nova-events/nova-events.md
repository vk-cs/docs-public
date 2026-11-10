# {heading(Nova компонентісінің оқиғалары)[id=event-log-nova]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{linkto(../../../../../computing/iaas/instructions/vm#iaas-vm)[text=Есептеу ресурстарын басқару сервисі]} Cloud Audit-ке жібермелі оқиғалар.

[cols="2,3", options="header"]
|===
|Оқиға
|Сипаттама

|`create-vm`
|ВМ жасалды

|`delete-vm`
|ВМ жойылды

|`update-vm`
|ВМ жаңартылды

|`vm-action`
|ВМ-мен әрекет орындалды

|`vm-create-console`
|ВМ консолі жасалды

|`vm-create-or-update-metadata`
|ВМ метадеректері жасалды немесе жаңартылды

|`vm-delete-metadata`
|ВМ метадеректері жойылды

|`vm-attach-interface`
|ВМ интерфейсі қосылды

|`vm-detach-interface`
|ВМ интерфейсі ажыратылды

|`vm-clear-password`
|ВМ құпиясөзі қайта орнатылды

|`vm-attach-volume`
|ВМ-ге диск қосылды

|`vm-detach-volume`
|ВМ-нен диск ажыратылды

|`vm-update-volume`
|ВМ дискі жаңартылды

|`flavor-create`
|ВМ конфигурациясының үлгісі (flavor) жасалды

|`flavor-delete`
|ВМ конфигурациясының үлгісі жойылды

|`flavor-update`
|ВМ конфигурациясының үлгісі жаңартылды

|`flavor-modify-access`
|ВМ конфигурациясының үлгісіне рұқсат өзгертілді

|`flavor-create-extraspecs`
|ВМ конфигурациясының үлгісіне қосымша сипаттамалар қосылды

|`flavor-delete-extraspecs`
|ВМ конфигурациясының үлгісінен қосымша сипаттамалар жойылды

|`flavor-update-extraspecs`
|ВМ конфигурациясының үлгісіндегі қосымша сипаттамалар жаңартылды

|`keypair-create`
|Кілт жұбы жасалды

|`keypair-delete`
|Кілт жұбы жойылды

|`aggregate-create`
|Агрегат (aggregate) жасалды

|`aggregate-delete`
|Агрегат жойылды

|`aggregate-update`
|Агрегат жаңартылды

|`external-event`
|Сыртқы оқиға орын алды

|`assisted-volume-snapshots-create`
|Эмулятор немесе гипервизор көмегімен томның күй суреттері (снапшоттары) жасалды

|`assisted-volume-snapshots-delete`
|Эмулятор немесе гипервизор көмегімен томның күй суреттері (снапшоттары) жойылды

|`vm-migration-create`
|ВМ миграциясы басталды

|`vm-migration-abort`
|ВМ миграциясы тоқтатылды

|`quota-update`
|Квота жаңартылды

|`quota-class-update`
|Квота сыныбы үшін квоталар жаңартылды

|`quota-revert-to-default`
|Квота әдепкі мәнге қайтарылды

|`server-groups-create`
|Сервер топтары жасалды

|`server-groups-delete`
|Сервер топтары жойылды

|`tags-replace`
|Барлық теглер ауыстырылды

|`tags-delete`
|Барлық теглер жойылды

|`tag-create`
|Тег ауыстырылды

|`tag-delete`
|Тег жойылды

|`create-security-group`
|Қауіпсіздік тобы жасалды

|`update-security-group`
|Қауіпсіздік тобы жаңартылды

|`delete-security-group`
|Қауіпсіздік тобы жойылды

|`create-security-group-rule`
|Қауіпсіздік тобының ережесі жасалды

|`delete-security-group-rule`
|Қауіпсіздік тобының ережесі жойылды

|`create-floating-ip`
|{linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-адрес]} жасалды

|`delete-floating-ip`
|Floating IP-адрес жойылды
|===