{cut(Где находятся точки присутствия CDN?)}

{cut(Точки присутствия CDN в РФ)}

- Аксай
- Ангарск
- Воронеж
- Екатеринбург
- Казань
- Краснодар
- Красноярск
- Москва
- Нижний Новгород
- Новосибирск
- Петрозаводск
- Псков
- Санкт-Петербург
- Самара
- Хабаровск
- Челябинск

{/cut}

{cut(Точки присутствия CDN вне РФ)}

- Алматы
- Амстердам
- Ашберн
- Ашхабад
- Бишкек
- Гонконг
- Душанбе
- Минск
- Сан-Паулу
- Сингапур
- Сухум
- Ташкент
- Франкфурт

{/cut}

{/cut}

{cut(Есть ли возможность подключить WAF и DDoS защиту?)}

Да, такие возможности есть. Чтобы оставить заявку на подключение, обратитесь в [техническую поддержку](/ru/contacts).

{/cut}

{cut(Есть ли возможность защитить данные с помощью Secure token?)}

Да, такая возможность есть. Чтобы подключить и настроить Secure token, обратитесь в [техническую поддержку](/ru/contacts).

{/cut}

{cut(Используется ли протокол HTTP/2?)}

На CDN-серверах по умолчанию включена передача данных по HTTP/2. Если серверы-источники не поддерживают HTTP/2, то они доставят контент по поддерживаемому протоколу (например, HTTP/1.1). При этом браузер объединит весь полученный контент в единую страницу, даже если он получен по разным протоколам.

{/cut}

{cut(Есть ли API для настройки CDN?)}

Да, методы API для управления и мониторинга работы CDN-ресурсов размещены в разделе [Справка API](/ru/tools-for-using-services/api/api-spec/api-cdn).

{/cut}

{cut(Есть ли возможность добавлять rewrite-правила и предоставлять доступ к логам (raw)?)}

Нет, такая возможность не предусмотрена.

{/cut}

{cut(Можно ли посмотреть статистику CDN?)}

Да, можно. Чтобы посмотреть статистику по сервису, [воспользуйтесь инструкцией](/ru/networks/cdn/monitoring).

{/cut}

{cut(Почему у меня нет доступа к сервису CDN?)}

Не все роли пользователей имеют доступ к CDN. Если вас пригласили в проект, проверьте доступ к сервису CDN для вашей [роли](/ru/tools-for-using-services/account/concepts/rolesandpermissions).

Если для вашей роли есть разрешения для работы в CDN, но сервис недоступен, обратитесь в [техническую поддержку](/ru/contacts).

{/cut}
