# {heading(Управление объектами сетевой инфраструктуры)[id=api-spec-neutron-sprut]}

{cut(Получение эндпоинта и токена аутентификации)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.
1. {linkto(../../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Включите]} двухфакторную аутентификацию, если это еще не сделано.
1. {linkto(../../../rest-api/enable-api#rest-api-enable-activate)[text=Включите]} доступ по API, если это еще не сделано.
1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **API Endpoints**.
1. Найдите эндпоинт **Neutron** в блоке **Сервис OpenStack**.
1. {linkto(../../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Получите]} токен доступа `X-Auth-Token`.

{/cut}

{note:info}
Исходная спецификация в формате JSON доступна по [ссылке](./assets/neutron-sprut-api.json "download").
{/note}

![{swagger}](assets/neutron-sprut-api.json)