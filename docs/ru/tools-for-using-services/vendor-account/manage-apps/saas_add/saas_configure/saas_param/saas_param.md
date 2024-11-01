# {heading(Параметры сервиса)[id=saas_param]}

В JSON-файле укажите параметры сервиса, приведенные в {linkto(#tab_params)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_params]} — Параметры сервиса)[align=right;position=above;id=tab_params;number={const(numb_tab_params)}]}
[cols="2,4,1,1", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный

|id
|
Идентификатор сервиса UUID4 (ID), сформированный с помощью генератора UUID4
|string (UUID4)
| ![](/ru/assets/check.svg "inline")

|revision
|
Ревизия сервиса. Сочетание ревизии и ID сервиса определяет его уникальность в {var(sys6)}. Остальные параметры описывают характеристики конкретной ревизии сервиса
|string, до 255 символов
| ![](/ru/assets/check.svg "inline")

|name
|
Имя сервиса
|string, до 255 символов
| ![](/ru/assets/check.svg "inline")

|short_description
|
Краткое описание сервиса, которое будет отображаться в его карточке в {var(sys6)}
|string, до 120 символов
| ![](/ru/assets/check.svg "inline")

|full_description
|
Полное описание сервиса, которое будет отображаться на его странице (подробнее — в разделе {linkto(/ru/tools-for-using-services/vendor-account/manage-apps/service_description/#service_description_full)[text=%text]})
|string
| ![](/ru/assets/check.svg "inline")

|singleton
|
Определяет, есть ли ограничение в один инстанс сервиса на один проект облачной платформы
|boolean
| ![](/en/assets/no.svg "inline")

|auto_bind
|
Определяет, нужно ли после развертывания сервиса автоматически создавать сервисную привязку
|boolean
| ![](/en/assets/no.svg "inline")

|icon
|
URL иконки сервиса (подробнее — в разделе {linkto(/ru/tools-for-using-services/vendor-account/manage-apps/service_description/#service_description_icon)[text=%text]}).

Размер файла с иконкой не должен превышать 1 МБ. Размер изображения должен быть не менее 62×62 пикселя
|string, до 512 символов
| ![](/ru/assets/check.svg "inline")

|help
|
URL документации сервиса
|string, до 512 символов
| ![](/ru/assets/check.svg "inline")

|bindable
|
Определяет, можно ли создавать сервисные привязки для этого сервиса
|boolean
| ![](/ru/assets/check.svg "inline")

|plan_updateable
|
Определяет, может ли пользователь переходить с одного тарифного плана на другой без удаления сервиса.

Значение параметра применяется для всех планов сервиса.

Значение можно переопределить для конкретного плана (подробнее в разделе — {linkto(../saas_plan/#saas_plan_param)[text=%text]})
|boolean
| ![](/ru/assets/check.svg "inline")

|deactivatable
|
Определяет, можно ли временно приостановить использование сервиса
|boolean
| ![](/ru/assets/check.svg "inline")

|bindings_retrievable
|
Определяет, нужно ли повторять попытку создания сервисной привязки в течение определенного времени, если предыдущая попытка не удалась
|boolean
| ![](/ru/assets/check.svg "inline")

|instances_retrievable
|
Определяет, нужно ли повторять попытку создания инстанса сервиса в течение определенного времени, если предыдущая попытка не удалась
|boolean
| ![](/ru/assets/check.svg "inline")

|metadata
|
Определяет тестовые и открытые пространства имен {var(sys2)}, в которых будут доступны тарифные планы сервиса.

Тестовые пространства имен задаются в ключе `test_ns`.

Открытые пространства имен задаются в ключе `prod_ns`.

Чтобы получить имена пространств имен, отправьте письмо на [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com).

Значение можно переопределить для конкретного тарифного плана.

Если параметр не задан, в секции `plans` укажите одноименный параметр для каждого тарифного плана отдельно (подробнее в разделе — {linkto(../saas_plan/#saas_plan_param)[text=%text]}).

<warn>

Если `metadata` не задан в параметрах сервиса и в параметрах тарифного плана, такой план не будет отображаться в {var(sys6)}.

</warn>
|map, ключи — string
| ![](/en/assets/no.svg "inline")
|===
{/caption}

<err>

Сочетание ID и ревизии сервиса должно быть уникальным в рамках {var(sys2)}. Если сервис с такими же идентификатором и ревизией уже существует в {var(sys6)}, то конфигурация сервиса не будет обновлена.

</err>