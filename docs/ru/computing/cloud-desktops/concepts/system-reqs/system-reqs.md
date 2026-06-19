# {heading(Системные требования)[id=desktops-system-reqs]}

Для работы с клиентским приложением Cloud Desktop Client компьютер пользователя рабочего стола должен отвечать {ifdef(public,private,private-pg)}следующим требованиям:{/ifdef}{ifdef(private-pdf,private-pg-pdf)}требованиям, приведенным в {linkto(#tab-images-status)[text=таблице %number]}.{/ifdef}

{ifdef(private-pdf,private-pg-pdf)}
{caption(Таблица {counter(table)[id=numb-tab-images-status]} — Статусы видимости образа)[align=right;position=above;id=tab-images-status;number={const(numb-tab-images-status)}]}{/ifdef}
[cols="1,2", options="header"]
|===
|Параметр
|Требование

|Процессор
|Архитектура Intel x86 с разрядностью 64 бит

|ОЗУ
|Не менее 1 ГБ

|Свободное место на диске
|Не менее 200 МБ

|Сеть
|Соединение на скорости не менее 100 Мбит/с

|ОС
|- Microsoft Windows 10.
- Microsoft Windows 11.
- macOS Big Sur (версия 11) и выше.
- РЕД ОС версии 7.3 и выше

|Браузер
|Веб-браузер с поддержкой спецификации W3C HTML5:

- Яндекс Браузер версии 15.9 и выше.
- Google Chrome версии 46 и выше.
- Mozilla Firefox версии 41
|===
{ifdef(private-pdf,private-pg-pdf)}
{/caption}{/ifdef}