<details>
  <summary markdown="span">Авторизация и аутентификация</summary>

1. Убедитесь, что на проекте включен сервис Cloud Logging, при необходимости подключите его через [техническую поддержку](/ru/contacts).
1. Убедитесь, что [включена](/ru/base/account/instructions/account-manage/manage-2fa) двухфакторная аутентификация и [активирован](/ru/manage/tools-for-using-services/rest-api/enable-api) доступ по API.
1. [Получите токен доступа](/ru/additionals/cases/case-keystone-token) `X-Subject-Token`.
1. [Узнайте](https://mcs.mail.ru/app/project/endpoints) эндпоинт для сервиса Cloud Logging.
1. Узнайте `service_id` — он может быть базовым или созданным через [техническую поддержку](/ru/contacts). Базовые значения:

   - `default` — значение по умолчанию.
   - `databases` — логирование ресурсов сервиса DBaaS.
   - `containers` — логирование ресурсов сервиса K8s.
   - `bigdata` — логирование ресурсов сервиса Big Data.
   - `vdi` — логирование ресурсов сервиса VDI.

</details>

<warn>

В данной статье может не отображаться часть полей спецификации — пожалуйста, для разработки используйте исходную спецификацию в формате YAML:

[Спецификация в формате YAML](./assets/loggingapi.yaml "download")

</warn>

![{swagger}](./assets/loggingapi-swagger.json)
