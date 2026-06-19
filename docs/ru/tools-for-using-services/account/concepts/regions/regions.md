# {heading(Регионы)[id=tools-account-concepts-regions]}

Регион — географическая область, объединяющая {linkto(../../../../start/concepts/architecture#architecture-az)[text=зоны доступности]}.

Регион назначается каждому {linkto(../projects#tools-account-concepts-projects)[text=проекту]} автоматически и зависит от URL сайта, на котором владелец проекта {linkto(../../../../intro/onboarding/account#onboarding-account)[text=зарегистрировал]} свой аккаунт.

Создавать объекты (например, виртуальные машины) можно только в зоне доступности региона, в котором был создан проект.

{note:warn}
Все регионы имеют единую базу пользователей. Невозможно зарегистрировать учетные записи с одной и той же почтой в разных регионах.
{/note}

Доступны следующие регионы:

[cols="1,1,1,1", options="header"]
|===
| Регион
| Зоны доступности
| URL сайта
| Валюта проектов

| Москва
| `GZ1`

`MS1`

`ME1`

`PA2`
| https://cloud.vk.com
| Рубли

| Казахстан
| `QAZ`

`KTP`
| https://vkcloud.kz

https://kz.cloud.vk.com
| Тенге

|===

У проектов, созданных в разных регионах, различаются:

- набор доступных сервисов;
- набор {linkto(../quotasandlimits#tools-account-concepts-quotasandlimits)[text=квот]};
- адреса {linkto(../../../api/rest-api/endpoints#rest-api-endpoints)[text=эндпоинтов {var(cloud)} API]};
- имя региона в файлах конфигурации {linkto(../../../cli/openstack-cli#openstack-authorize)[text=openrc]} и {linkto(../../../terraform/quick-start#terraform-quick-start)[text=Terraform]}.

{note:warn}
Объединить виртуальные сети проектов из разных регионов стандартными способами невозможно. Сетевую связность между такими проектами можно настроить при помощи {linkto(../../../../networks/vnet/how-to-guides/onpremise-connect/vpn-tunnel#vnet-vpn-tunnel)[text=VPN-туннеля]}.
{/note}
