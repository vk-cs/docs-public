# {heading(О сервисе)[id=marketplace-about]}

Marketplace — подсистема {var(cloud)}, которая предоставляет клиентам доступ к сторонним сервисам разного рода:

- предоставляемые вендором;
- OpenSource-решения;
- сервисы собственной разработки.

Все детали по развертыванию инфраструктуры и ПО или созданию тенанта (аккаунта) остаются на стороне {var(cloud)}. Пользователь получает подготовленный экземпляр сервиса (инстанс сервиса), который при необходимости может донастроить под свои нужды. Все развернутые инстансы сервиса {ifdef(public)}{linkto(../../../../applications-and-services/marketplace/tariffication#marketplace-tariffication)[text=тарифицируются]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}тарифицируются{/ifdef} и {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage)[text=управляются]} в рамках проекта {var(cloud)}. Магазин приложений помогает быстрее запускать сервисы и упрощает их поддержку.

{ifdef(public)}
{note:warn}
Используя сервисы из магазина приложений, вы соглашаетесь с [пользовательским соглашением](../../../../start/legal/digital-cloud/marketplace).
{/note}
{/ifdef}

## {heading(Типы сервисов)[id=marketplace-about-type-service]}

{var(cloud)} поддерживает два типа сервисов:

- SaaS сервисы — централизованно установленные [мультитенантные](https://habr.com/ru/companies/microsoft/articles/145027) продукты. Вендор развертывает сервис либо на собственной инфраструктуре, либо на инфраструктуре в своем проекте в {var(cloud)}. Пользователю предоставляется доступ к сервису через отдельный аккаунт (тенант). Управление сервисом и его инстансами выполняется на стороне {var(cloud)}.
- Image-based сервисы — продукт, который разворачивается на основе образов виртуальных машин в проекте {var(cloud)}. Для поддержания продукта может использоваться дополнительная инфраструктура: виртуальные сети, балансировщики нагрузки, кластеры DBaaS, S3-объектное хранилище, резервное копирование. Управление сервисом, его инстансами, а также инфраструктурой выполняется на стороне {var(cloud)}.

{ifdef(public)}
Каждый тип сервиса инициализируется в {var(cloud)} по-разному:

{tabs}

{tab(SaaS)}

1. Пользователь {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-add#marketplace-pr-instance-add)[text=подключает]} сервис в проект.
1. {var(cloud)} направляет поставщику запрос на создание аккаунта-тенанта в его продукте.
1. Поставщик регистрирует новый аккаунт, отправляет реквизиты {var(cloud)}.
1. {var(cloud)} создает инстанс сервиса для {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage)[text=управления]} и отправляет реквизиты доступа пользователю.

{/tab}

{tab(Image-based)}

1. Пользователь {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-add#marketplace-pr-instance-add)[text=подключает]} сервис в проект.
1. {var(cloud)} создает нужную инфраструктуру в проекте пользователя.
1. {var(cloud)} устанавливает сервис на созданную инфраструктуру.
1. {var(cloud)} создает инстанс сервиса для {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage)[text=управления]} и отправляет реквизиты доступа пользователю.

{/tab}

{/tabs}

Ключевые различия для SaaS и image-based сервисов:

[cols="2,1,1", options="header"]
|===
| Особенность / Тип
| SaaS
| Image-based

| Расположение инфраструктуры
| Отдельный аккаунт (тенант) на стороне компании-поставщика
| Проект в {var(cloud)}

| Управление развернутой инфраструктурой через ЛК {var(cloud)}
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")

| Мониторинг инстанса сервиса
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")

| Интеграция с сервисами {var(cloud)}
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")

| {linkto(../../../../applications-and-services/marketplace/tariffication#marketplace-tariffication)[text=Тарификация]}
| Использование продукта
| Использование продукта + развернутая инфраструктура в проекте

| Изменение тарифного плана
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

| Настройка опций тарифного плана
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
|=== 
{/ifdef}

## {heading(Информация для поставщиков)[id=marketplace-about-info]}

{ifdef(public)}Поставщики могут добавить свой софт в облако {var(cloud)}, написав по адресу `marketplace@cloud.vk.com`.{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf)}
Услуги сервиса и их стоимость представлены тарифными планами. Тарифная опция — конкретный параметр тарифного плана. {linkto(../../../../applications-and-services/marketplace/tariffication#marketplace-tariffication)[text=Тарифные планы]} и опции могут быть платными и бесплатными.
{/ifdef}
