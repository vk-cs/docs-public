# {heading(Ошибка 502 при обращении к ресурсу)[id=vnet-bad-gateway-problem]}

При обращении к ресурсу CDN возникает ошибка `502 Bad Gateway`.

Эта ошибка означает, что CDN-сервер не смог получить корректный ответ от вашего источника.

### {heading(Решение)[id=vnet-bad-gateway-problem-resolve]}

1. Проверьте доступность источника из интернета. Убедитесь, что со стороны источника доступ к IP-адресам CDN-серверов {var(cloud)} не ограничивается. Актуальный список IP-адресов можно запросить в [технической поддержке](/ru/contacts).
1. {linkto(../../../../networks/cdn/instructions/manage-cdn/origin-settings#cdn-origin-settings-data-source)[text=Убедитесь]}, что в настройках CDN указан верный IP-адрес или домен источника. 
1. {linkto(../../../../networks/cdn/instructions/manage-cdn/http-headers#cdn-http-headers-add-request)[text=Проверьте]} настройки заголовка Host (он должен соответствовать тому, что ожидает ваш веб-сервер). 
1. Проверьте файервол на источнике.

Если проблема сохраняется, обратитесь в [техническую поддержку](/ru/contacts).