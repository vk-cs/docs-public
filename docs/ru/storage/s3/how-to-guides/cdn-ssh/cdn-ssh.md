# {heading(Развертывание Astro-сайта на объектном хранилище с CDN)[id=cdn-ssh]}

С помощью {var(s3)} и CDN можно развернуть статический сайт на фреймворке Astro с глобальной доставкой контента и низкой задержкой. Объектное хранилище выступает в роли serverless-хостинга для фронтенда, а CDN обеспечивает кеширование на edge-серверах и доставку контента по HTTPS.

Для примера далее используются следующие данные:

- Имя бакета: `astro-site-bucket`
- Доменное имя сайта: `astro.example.com`
- Директория собранного проекта: `./dist`
- Эндпоинт хранилища: `https://hb.ru-msk.vkcloud-storage.ru`

## {heading(Подготовительные шаги)[id=cdn-ssh-prepare]}

1. Убедитесь, что у вас {linkto(../../connect/s3-cli#s3-connect-cli)[text=установлен и настроен]} AWS CLI.
1. {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket)[text=Создайте бакет]} {var(s3)} со следующими параметрами:

   - Имя: `astro-site-bucket`. Имя бакета должно соответствовать {linkto(../../concepts/about#s3-concepts-about-bucket-naming)[text=правилам именования]}.
   - Класс хранения: `Hotbox` — подходит для быстрой раздачи большого количества файлов.

1. Установите [Node.js](https://nodejs.org/) версии 18 или выше, если это еще не сделано.
1. Создайте проект Astro:
   
   ```console
   npm create astro@latest
   ```

1. Убедитесь, что у вас есть доступ к управлению DNS-записями домена `astro.example.com`.

## {heading(1. Соберите Astro-проект)[id=cdn-ssh-step1]}

1. Перейдите в директорию проекта Astro.
1. Убедитесь, что в файле `astro.config.mjs` настроен статический вывод:
   
   ```javascript
   import { defineConfig } from 'astro/config';

   export default defineConfig({
     output: 'static',
   });
   ```

1. Соберите проект:
   
   ```console
   npm run build
   ```

   В директории `./dist` появятся статические файлы сайта: `index.html`, страницы ошибок, изображения, файлы CSS и JavaScript.

1. Убедитесь, что в корне `./dist` присутствуют файлы `index.html` и `404.html`. Если файл `404.html` не создан автоматически, создайте его вручную.

## {heading(2. Настройте бакет для хостинга статического сайта)[id=cdn-ssh-step2]}

{linkto(../../instructions/manage-static-site#s3-instructions-manage-static-site-setup)[text=Настройте]} конфигурацию статического сайта. В конфигурации укажите индексный документ и страницу ошибки для бакета. 
Это можно сделать через {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=файл конфигурации]} или сразу в команде AWS CLI:

```console
aws s3api put-bucket-website \
  --bucket astro-site-bucket \
  --website-configuration '{"IndexDocument":{"Suffix":"index.html"},"ErrorDocument":{"Key":"404.html"}}' \
  --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
```

Здесь:

- `index.html` — документ, который отдается при обращении к корню бакета.
- `404.html` — документ, который отдается при ошибке 404.

После настройки конфигурации статический сайт будет доступен по адресу: `https://astro-site-bucket.hb-website.hb.ru-msk.vkcloud-storage.ru`

{note:info}
Статический хостинг веб-сайтов в {var(s3)} доступен через HTTP. Доступ по HTTPS задается при {linkto(#cdn-ssh-step5)[text=настройке CDN-ресурса]}.
{/note}

## {heading(3. Настройте права доступа и CORS)[id=cdn-ssh-step3]}

1. Настройте публичный доступ на чтение для объектов сайта. Используйте один из способов.

   {tabs}

   {tab(Политика доступа (рекомендуется))}
   
   1. Создайте файл `policy.json` с политикой, разрешающей анонимное чтение объектов:
   
      ```json
      {
      "Version": "2012-10-17",
      "Statement": [
         {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": ["arn:aws:s3:::astro-site-bucket/*"]
         }
      ]
      }
      ```
   
   1. Примените политику:
   
      ```console
      aws s3api put-bucket-policy \
      --bucket astro-site-bucket \
      --policy file://policy.json \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```
   
   {/tab}

   {tab(ACL)}
   
   Установите стандартный ACL `public-read` для бакета:
   
   ```console
   aws s3api put-bucket-acl \
     --bucket astro-site-bucket \
     --acl public-read \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   При загрузке объектов также указывайте флаг `--acl public-read`, чтобы каждый объект был доступен для чтения.
   {/tab}

   {/tabs}

   {note:warn}
   Публичный доступ на чтение разрешает любому пользователю скачивать объекты из бакета. Не загружайте в этот бакет конфиденциальные данные. Оплата операций с бакетом ложится на его владельца.
   {/note}

1. {linkto(../../instructions/access-management/cors#s3-instructions-cors-add)[text=Настройте CORS]} для бакета, если сайт использует кросс-доменные запросы к ресурсам в хранилище.

   Пример XML-конфигурации CORS:
   
   ```xml
   <CORSConfiguration>
     <CORSRule>
       <AllowedOrigin>https://astro.example.com</AllowedOrigin>
       <AllowedMethod>GET</AllowedMethod>
       <AllowedMethod>HEAD</AllowedMethod>
       <AllowedHeader>*</AllowedHeader>
       <MaxAgeSeconds>3000</MaxAgeSeconds>
     </CORSRule>
   </CORSConfiguration>
   ```

   Здесь:

   - `AllowedOrigin` — домен сайта, с которого разрешены запросы к бакету.
   - `AllowedMethods` — HTTP-методы, разрешенные в запросах.
   - `MaxAgeSeconds` — время кеширования результатов предварительного запроса в браузере.

## {heading(4. Загрузите файлы сайта в бакет)[id=cdn-ssh-step4]}

1. Синхронизируйте содержимое директории `./dist` с бакетом с помощью AWS CLI:
   
   ```console
   aws s3 sync ./dist s3://astro-site-bucket \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Команда загружает только новые и измененные файлы, что ускоряет повторные деплои.

   {note:info}
   Также для синхронизации можно использовать rclone или {linkto(../../connect/s3-file-managers#s3-connect-file-managers)[text=файловые менеджеры]} (CyberDuck, WinSCP).
   {/note}

1. Убедитесь, что файлы загружены:
   
   ```console
   aws s3 ls s3://astro-site-bucket \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

## {heading(5. Подключите CDN и привяжите домен)[id=cdn-ssh-step5]}

1. {linkto(../../../../networks/cdn/instructions/create-resource#cdn-create-resource-bucket-ui)[text=Создайте]} CDN-ресурс через интерфейс бакета `astro-site-bucket`. В параметрах укажите:

   * **Персональный домен**:`astro.example.com`.
   * **Время жизни кеша**: `4`. Для статического сайта рекомендуется указывать значение от `1` до `7` дней.

1. Нажмите **Перейти к CDN-ресурсу**, чтобы перейти в раздел **CDN** для дальнейшей настройки.
1. Сохраните служебное доменное имя CDN-ресурса (например, `cl-541e19d9.service.cdn.msk.vkcs.cloud`) — оно понадобится для создания CNAME-записи.
1. {linkto(../../../../networks/cdn/instructions/manage-cdn/enable-cdn#cdn-enable-cdn)[text=Включите]} доступ к контенту конечным пользователям. Это необходимо, чтобы затем иметь возможность выбрать [Let's Encrypt](https://letsencrypt.org/ru/) в качестве SSL-сертификата.
1. {linkto(../../../../networks/cdn/instructions/manage-cdn/origin-settings#cdn-origin-settings-protocol)[text=Выберите]} HTTPS в качестве протокола взаимодействия с источником для CDN-ресурса, чтобы обеспечить безопасную передачу данных пользователям. Это также необходимо для использования Let's Encrypt в качестве SSL-сертификата.
1. В настройках шифрования CDN-ресурса выберите опцию **Let's Encrypt** — будет использован бесплатный SSL-сертификат, который создается автоматически после распространения CNAME-записей в DNS (обычно до 30 минут).
Подробнее об управлении SSL-сертификатами — в разделе {linkto(../../../../networks/cdn/instructions/manage-cdn/ssl#cdn-ssl)[text=Использование SSL-сертификата]}.
1. Настройте DNS-запись: создайте CNAME-запись для домена `astro.example.com`, указав в качестве псевдонима сохраненное служебное доменное имя CDN-ресурса. Если используется сервис DNS от {var(cloud)}, следуйте {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-record-add)[text=инструкции по добавлению DNS-записей]}.

## {heading(6. Настройте правила кеширования)[id=cdn-ssh-step6]}

{linkto(../../../../networks/cdn/instructions/manage-cdn/caching#cdn-caching-cdn-resource)[text=Настройте]} кеширование на CDN-ресурсе. Подробнее о рекомендуемых значениях TTL для разных типов контента в разделе {linkto(../../../../networks/cdn/concepts/cache#cdn-cache)[text=Кеширование контента]}.

## {heading(7. Настройте доступ к вашему контенту)[id=cdn-ssh-step8]}

1. {linkto(../../../../networks/cdn/instructions/manage-cdn/security#cdn-security-access-policy-domain)[text=Настройте]} политику доступов по домену, чтобы предотвратить использование ваших ресурсов другими сайтами.
1. {linkto(../../../../networks/cdn/instructions/manage-cdn/security#cdn-security-access-policy-country)[text=Настройте]} политику доступа по странам для ваших источников, чтобы ограничить доступ к контенту по географическому признаку.

## {heading(8. Проверьте работоспособность)[id=cdn-ssh-check]}

1. Откройте сайт по адресу `https://astro.example.com` в браузере. Должна отобразиться главная страница Astro-сайта.

1. Проверьте страницу ошибки — откройте несуществующий URL, например `https://astro.example.com/nonexistent-page`. Должна отобразиться страница `404.html`.

1. Проверьте заголовки ответа:
   
   ```console
   curl -I https://astro.example.com
   ```

   Убедитесь, что:

   - В заголовке `Content-Type` указан правильный MIME-тип.
   - Присутствуют заголовки кеширования от CDN.

1. Проверьте, что изображения и другие статические ресурсы загружаются корректно.

## {heading(Удалите неиспользуемые ресурсы)[id=cdn-ssh-delete]}

Созданные ресурсы  {linkto(../../tariffication#s3-tariffication)[text=тарифицируются]}. Если они вам больше не нужны:

1. {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Удалите объекты]} из бакета.
1. {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Удалите бакет]}.
1. {linkto(../../../../networks/cdn/instructions/delete-resource#cdn-delete-resource)[text=Удалите CDN-ресурс]}, если он больше не нужен.
