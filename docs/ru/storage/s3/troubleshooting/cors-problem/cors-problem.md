# {heading(Ошибка CORS при загрузке файлов в бакет веб-приложением)[id=s3-cors-problem]}

Веб-приложение пытается загрузить файл в бакет {var(s3)}, но запрос блокируется браузером. В консоли разработчика отображается ошибка, связанная с правилами {linkto(../../concepts/access/s3-cors#s3-concepts-cors)[text=CORS]}, например, `Access to XMLHttpRequest at '...' from origin '...' has been blocked by CORS policy`.

Проблема возникает из-за механизма безопасности веб-браузера Same-Origin Policy (SOP). Этот механизм запрещает скрипту на одном источнике (origins) делать запросы к другому источнику, если это не разрешено в явном виде. Для разрешения такого взаимодействия {var(s3)} должен вернуть специальные HTTP-заголовки.

### {heading(Решение)[id=s3-cors-problem-resolve]}

Проверьте и исправьте правила {linkto(../../concepts/access/s3-cors#s3-concepts-cors)[text=CORS]}:

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../instructions/iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект, где находится нужный бакет.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите ![Меню](../../assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
1. Перейдите на вкладку **CORS**.
1. {linkto(../../instructions/access-management/cors#s3-instructions-cors)[text=Добавьте или отредактируйте]} правило CORS:

   - `AllowedOrigins`: укажите домен вашего веб-приложения. Использование символа `*` разрешит доступ с любого домена.
   - `AllowedMethods`: укажите HTTP-метод, который использует ваше веб-приложение для загрузки, например, `PUT` или `POST`.
   - `AllowedHeaders`: укажите разрешенные заголовки запросов от веб-приложения, например, `Content-Type`, `Authorization`, `x-amz-acl`. Использование символа `*` разрешит запросы с любыми заголовками.
