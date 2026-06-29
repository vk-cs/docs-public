# {heading(Vision)[id=api-spec-vision]}

{cut(Получение эндпоинта, авторизация и аутентификация)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.
1. {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Включите]} двухфакторную аутентификацию, если это еще не сделано.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Включите]} доступ по API, если это еще не сделано.
1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **API Endpoints**.
1. Найдите эндпоинт в блоке **AI API**.
1. {linkto(../../../../ml/vision/quick-start/auth-vision#vision-quick-start-auth-vision)[text=Получите]} токен доступа.

{/cut}

{note:info}
Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/visionapi-swagger.json "download").
{/note}

![{swagger}](assets/visionapi-swagger.json)
