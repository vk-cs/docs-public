{ifdef(s3-pdf)}
Описание лимитов приведено в {linkto(#tab_limit)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_limit]} — Лимиты)[align=right;position=above;id=tab_limit;number={const(numb_tab_limit)}]}
{/ifdef}
[cols="3,2,4,1", options="header"]
|===
|Параметр
|Лимит
|Комментарий
|Жесткий

|Количество аккаунтов
|25 шт.
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}
|{ifdef(public)}![](../../../../assets/check.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/check.svg "inline"){/ifdef}

|Количество бакетов
|100 шт.
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}
|{ifdef(public)}![](../../../../assets/check.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/check.svg "inline"){/ifdef}

|Количество объектов в бакете
|не ограничено
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}

|Размер одного файла
|32 ГБ для обычного файла, 320 ТБ для составной загрузки
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}
|{ifdef(public)}![](../../../../assets/check.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/check.svg "inline"){/ifdef}

|Размер одного бакета
|не ограничено
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}

|Рейт-лимит: обычные запросы
|1000 запросов/с
|не ограничено, максимальное известное значение среди всех проектов: 9000 запросов/с
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}

|Рейт-лимит: запросы на листинг
|250 запросов/с
|не ограничено, максимальное известное значение среди всех проектов: 500 запросов/с
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}

|Количество lifecycle-правил
|50 шт.
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}
|{ifdef(public)}![](../../../../assets/check.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/check.svg "inline"){/ifdef}
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}