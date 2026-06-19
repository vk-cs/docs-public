# {heading(Nova компонентінің оқиғалары)[id=event-log-nova]}

{include(/kz/_includes/_translated_by_ai.md)}


{ifndef(private-pdf,private-pg-pdf)}[Есептеу ресурстарын басқару сервисі](/kz/computing/iaas/instructions/vm){/ifndef}{ifdef(private-pdf,private-pg-pdf)}{linkto(../../../../../computing/iaas/instructions/vm#iaas-vm)[text=есептеу ресурстарын басқару сервисі]}{/ifdef} Cloud Audit-ке жіберетін оқиғалар.

[cols="2,3", options="header"]
|===
|Оқиға
|Сипаттамасы

|`create-vm`
|ВМ құрылды

|`delete-vm`
|ВМ жойылды

|`update-vm`
|ВМ жаңартылды

|`vm-action`
|ВМ-мен әрекет орындалды

|`vm-create-console`
|ВМ консолі құрылды

|`vm-create-or-update-metadata`
|ВМ метадеректері жасалды немесе жаңартылды

|`vm-delete-metadata`
|ВМ метадеректері жойылды

|`vm-attach-interface`
|ВМ интерфейсі қосылды

|`vm-detach-interface`
|ВМ интерфейсі ажыратылды

|`vm-clear-password`
|ВМ құпиясөзі қалпына келтірілді

|`vm-attach-volume`
|Диск ВМ-ге қосылды

|`vm-detach-volume`
|Диск ВМ-нен ажыратылды

|`vm-update-volume`
|ВМ дискісі жаңартылды

|`flavor-create`
|ВМ конфигурациясының үлгісі (flavor) құрылды

|`flavor-delete`
|ВМ конфигурациясының үлгісі жойылды

|`flavor-update`
|ВМ конфигурациясының үлгісі жаңартылды

|`flavor-modify-access`
|ВМ конфигурациясының үлгісіне қолжетімділік өзгертілді

|`flavor-create-extraspecs`
|ВМ конфигурациясының үлгісіне қосымша спецификациялар қосылды

|`flavor-delete-extraspecs`
|ВМ конфигурациясының үлгісінен қосымша спецификациялар жойылды

|`flavor-update-extraspecs`
|ВМ конфигурациясының үлгісіндегі қосымша спецификациялар жаңартылды

|`keypair-create`
|Кілттер жұбы құрылды

|`keypair-delete`
|Кілттер жұбы жойылды

|`aggregate-create`
|Агрегат (aggregate) құрылды

|`aggregate-delete`
|Агрегат жойылды

|`aggregate-delete`
|Агрегат жаңартылды

|`external-event`
|Сыртқы оқиға орын алды

|`assisted-volume-snapshots-create`
|Эмулятордың немесе гипервизордың көмегімен том күйінің түсірілімдері жасалды

|`assisted-volume-snapshots-delete`
|Эмулятордың немесе гипервизордың көмегімен том күйінің түсірілімдері жойылды

|`vm-migration-create`
|ВМ миграциясы іске қосылды

|`vm-migration-abort`
|ВМ миграциясы тоқтатылды

|`quota-update`
|Квота жаңартылды

|`quota-class-update`
|Квоталар сыныбы үшін квоталар жаңартылды

|`quota-revert-to-default`
|Квота әдепкі мәнге қалпына келтірілді

|`server-groups-create`
|Серверлер топтары құрылды

|`server-groups-delete`
|Серверлер топтары жойылды

|`tags-replace`
|Барлық тегтер ауыстырылды

|`tags-delete`
|Барлық тегтер жойылды

|`tag-create`
|Тег ауыстырылды

|`tag-delete`
|Тег жойылды

|`create-security-group`
|Қауіпсіздік тобы құрылды

|`update-security-group`
|Қауіпсіздік тобы жаңартылды

|`delete-security-group`
|Қауіпсіздік тобы жойылды

|`create-security-group-rule`
|Қауіпсіздік тобының ережесі құрылды

|`delete-security-group-rule`
|Қауіпсіздік тобының ережесі жойылды

|`create-floating-ip`
|{linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP мекенжайы]} құрылды

|`delete-floating-ip`
|Floating IP мекенжайы жойылды
|===
