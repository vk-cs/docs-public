# {heading(Регистрация брокера)[id=saas_upload_registration]}

Чтобы зарегистрировать брокер, отправьте письмо на [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com). В письме укажите:

* Информацию о компании:

   * Имя компании.
   * Контактное лицо.
   * Телефон.

* Email пользователя, которому будут приходить уведомления об ошибках при создании инстансов сервиса.
* Параметры брокера, приведенные в {linkto(#tab_registration)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_registration]} — Параметры брокера для регистрации в {var(sys6)})[align=right;position=above;id=tab_registration;number={const(numb_tab_registration)}]}
[cols="2,5,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный

|name
|
Имя брокера
|string
| ![](/ru/assets/check.svg "inline")

|url
|
URL, на который будут отправляться запросы от {var(sys2)}
|string
| ![](/ru/assets/check.svg "inline")

|description
|
Описание брокера
|string
| ![](/ru/assets/no.svg "inline")

|osb_version
|
Версия протокола VK OSB
|string
| ![](/ru/assets/check.svg "inline")

|username
|
Имя {var(sys2)} для межсервисного взаимодействия c брокером.

Должно совпадать со значением переменной окружения в файле `.env`
|string
| ![](/ru/assets/no.svg "inline")

|password
|
Пароль {var(sys2)} для межсервисного взаимодействия с брокером.

Должно совпадать со значением переменной окружения в файле `.env`
|string
| ![](/ru/assets/no.svg "inline")
|===
{/caption}

После регистрации брокера SaaS-приложение будет доступно в тестовом пространстве имен {var(sys2)}. В открытом пространстве имен {var(sys2)} сервис будет доступен только после публикации (подробнее — в разделе {linkto(../saas_upload_publish/#saas_upload_publish)[text=%text]}).
