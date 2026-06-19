# {heading(Cloud Desktop)[id=api-spec-vdi]}

API сервиса {linkto(../../../../computing/cloud-desktops#cloud-desktops)[text=Cloud Desktop]} позволяет управлять пулами рабочих столов и рабочими столами в них.

{cut(Получение эндпоинта, авторизация и аутентификация)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.
1. {linkto(../../../../access/iam/instructions/manage-2fa#vk-cloud-account-manage-2fa-on)[text=Включите]} двухфакторную аутентификацию, если это еще не сделано.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Включите]} доступ по API, если это еще не сделано.
1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **API Endpoints**.
1. Найдите эндпоинт для сервиса Cloud Desktop. Если его нет в списке, используйте `https://msk.cloud.vk.com/vdi/v1/`.
1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Получите]} токен доступа `X-Auth-Token`.

{/cut}

{note:info}
Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/vdiapi-swagger.json "download").
{/note}

![{swagger}](assets/vdiapi-swagger.json)
