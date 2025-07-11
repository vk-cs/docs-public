Регион — географическая область, объединяющая [зоны доступности](/ru/intro/start/concepts/architecture#az).

Регион назначается каждому [проекту](../projects) автоматически и зависит от URL сайта, на котором владелец проекта [зарегистрировал](/ru/intro/start/account-registration) свой аккаунт.

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
| https://cloud.vk.com
| Рубли

| Казахстан
| `QAZ`
| https://vkcloud.kz

https://kz.cloud.vk.com
| Тенге

|===

У проектов, созданных в разных регионах, различаются:

- набор доступных сервисов;
- набор [квот](../quotasandlimits);
- адреса [эндпоинтов VK Cloud API](/ru/tools-for-using-services/api/rest-api);
- имя региона в файлах конфигурации [openrc](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) и [Terraform](/ru/tools-for-using-services/terraform/quick-start).

{note:warn}

Объединить виртуальные сети проектов из разных регионов стандартными способами невозможно. Сетевую связность между такими проектами можно настроить при помощи [VPN-туннеля](/ru/networks/vnet/how-to-guides/onpremise-connect/vpn-tunnel).

{/note}
