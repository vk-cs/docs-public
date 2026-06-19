# {heading(CDN-ресурс)[id=cdn-resource]}

CDN-ресурс — это логическая сущность {linkto(../../../../networks/cdn/concepts/about#cdn-about)[text=сервиса CDN]} от {var(cloud)}, которая содержит настройки распространения контента с {linkto(../../../../networks/cdn/concepts/origin-groups#cdn-origin-groups)[text=источников]} через CDN и позволяет изменять эти настройки.

Чтобы начать доставку контента пользователям через CDN, нужно {linkto(../../../../networks/cdn/instructions/create-resource#cdn-create-resource)[text=создать ресурс]}. Во время создания можно настроить:

- доступность контента для пользователей и протокол взаимодействия ресурса с источником;
- конфигурацию источников и доменов;
- настройки шифрования с помощью SSL-сертификата.

После того как ресурс будет создан, вы также можете настроить:

- {linkto(../../../../networks/cdn/instructions/manage-cdn/origin-settings#cdn-origin-settings)[text=взаимодействие с источником]} — протокол взаимодействия, добавление и изменение источников контента, настройку заголовков Host и включение шилдинга;
- {linkto(../../../../networks/cdn/instructions/manage-cdn/caching#cdn-caching)[text=кеширование]};
- {linkto(../../../../networks/cdn/instructions/manage-cdn/http-headers#cdn-http-headers)[text=HTTP-заголовки, HTTP-методы запросов и CORS]};
- {linkto(../../../../networks/cdn/instructions/manage-cdn/content-settings#cdn-content-settings)[text=управление контентом]} — очистка и наполнение кеша ресурса, коды HTTP-ответов, сжатие контента и оптимизацию доставки больших файлов;
- {linkto(../../../../networks/cdn/instructions/manage-cdn/security#cdn-security)[text=параметры безопасности]} — политики доступа по странам, доменам и IP-адресам, а также используемые версии протокола TLS;
- {linkto(../../../../networks/cdn/instructions/manage-cdn/secure-token#cdn-secure-token)[text=ограничение доступа к контенту]} с помощью технологии Secure token.

## {heading(Статусы ресурса)[id=cdn-resource-statuses]}

CDN-ресурс может быть в одном из статусов:

- `Активен` — контент доставляется конечным пользователям;
- `Приостановлен` — контент недоступен конечным пользователям.

Статус ресурса отображается в виде значка в списке CDN-ресурсов в [личном кабинете](https://mcs.mail.ru/app), с помощью которого вы можете самостоятельно {linkto(../../../../networks/cdn/instructions/manage-cdn/enable-cdn#cdn-enable-cdn)[text=включить или отключить]} CDN-ресурс.

CDN-ресурсы автоматически приостанавливаются, если значимое трафика не проходит через ресурс в течение определенного времени:

- менее 1 МБ трафика с момента создания, если ресурс создан менее 30 дней назад;
- менее 1 МБ трафика за последние 14 дней, если ресурс создан более 30 дней назад.

Приостановленный CDN-ресурс сохраняет свои настройки и его можно {linkto(../../../../networks/cdn/instructions/manage-cdn/enable-cdn#cdn-enable-cdn)[text=включить]} обратно.
