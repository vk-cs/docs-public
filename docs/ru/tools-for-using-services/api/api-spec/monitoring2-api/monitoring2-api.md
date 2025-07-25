REST API сервиса [Cloud Monitoring 2.0](/ru/monitoring-services/monitoring) поддерживает чтение метрик, собранных агентом мониторинга:

- получение метрик для заданного момента времени;
- получение метрик для заданного диапазона времени;
- поиск метрик по их меткам.

Запросы на чтение метрик формулируются на языке [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/).

{cut(Получение эндпоинта, авторизация и аутентификация)}

1. Убедитесь, что на проекте включен сервис Cloud Monitoring 2.0, при необходимости подключите его через [техническую поддержку](/ru/contacts).
1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. [Включите](/ru/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa#vklyuchenie_2fa) двухфакторную аутентификацию, если это еще не сделано.
1. Включите доступ по API, если это еще не сделано:

   1. Нажмите на имя пользователя в шапке страницы и выберите **Безопасность**.
   1. Нажмите кнопку **Активировать доступ по API**.

1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **API Endpoints**.
1. Найдите эндпоинт для сервиса Cloud Monitoring 2.0. Если его нет в списке, используйте:

   - для региона Москва — `https://cloud.vk.com/monitoring/query/v2`;
   - для региона Казахстан — `https://kz.cloud.vk.com/monitoring/query/v2`.

1. [Получите](/ru/tools-for-using-services/api/rest-api/case-keystone-token) токен доступа `X-Auth-Token`.

{/cut}

{note:info}

Исходную спецификацию в формате JSON вы можете скачать по [ссылке](assets/monitoring2-api.json "download").

{/note}

![{swagger}](assets/monitoring2-api.json)
