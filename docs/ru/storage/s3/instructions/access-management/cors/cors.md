# {heading(Кросс-доменные запросы)[id=s3-instructions-cors]}

{var(s3)} поддерживает технологию кросс-доменных запросов ({linkto(../../../concepts/access/s3-cors#s3-concepts-cors)[text=CORS]}).

В личном кабинете можно задать каждое правило по отдельности, а с помощью {linkto(../../../api/cors#s3-api-cors)[text=API]} — настроить конфигурацию правил CORS. Под настройкой конфигурации правил подразумевается, что все правила CORS для бакета передаются в {var(s3)} в формате XML в одном запросе.

## {heading(Просмотр конфигурации правил CORS)[id=s3-instructions-cors-view]}

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите ![more-icon](../../../assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
1. Перейдите на вкладку **CORS**.

{/tab}

{tab(API)}

Воспользуйтесь методом `GET /?cors` {linkto(../../../api/cors#api-spec-s3-get-bucket-cors)[text=REST API сервиса]}.

{/tab}

{/tabs}

## {heading(Добавление правил CORS)[id=s3-instructions-cors-add]}

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите ![more-icon](../../../assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
1. Перейдите на вкладку **CORS**.
1. Нажмите кнопку **Добавить правило** или ![plus-icon](../../../assets/plus-icon.svg "inline") **Добавить новое правило**, если в бакете уже есть добавленные правила CORS.

{include(../../../_includes/_cors.md)}

1. Нажмите кнопку **Добавить правило**.

{/tab}

{tab(API)}

{note:warn}
Добавление новой конфигурации правил удаляет текущую конфигурацию, в том числе правила, заданные в личном кабинете.
{/note}

Воспользуйтесь методом `PUT /?cors` {linkto(../../../api/cors#api-spec-s3-put-bucket-cors)[text=REST API сервиса]}.

{/tab}

{/tabs}

## {heading(Редактирование правил CORS)[id=s3-instructions-cors-edit]}

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите ![more-icon](../../../assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
1. Перейдите на вкладку **CORS**.
1. Нажмите на значок ![pencil-icon](../../../assets/pencil-icon.svg "inline"), чтобы отредактировать правило.

{include(../../../_includes/_cors.md)}

1. Нажмите кнопку **Сохранить**.

{/tab}

{/tabs}

## {heading(Удаление правил CORS)[id=s3-instructions-cors-delete]}

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите ![more-icon](../../../assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
1. Перейдите на вкладку **CORS**.
1. Нажмите на значок ![trash-icon](../../../assets/trash-icon.svg "inline"), чтобы удалить правило.
1. Подтвердите удаление.

{/tab}

{tab(API)}

{note:warn}
Операция полностью удаляет текущую конфигурацию правил CORS, в том числе правила, заданные в личном кабинете.
{/note}

Воспользуйтесь методом `DELETE /?cors` {linkto(../../../api/cors#api-spec-s3-delete-bucket-cors)[text=REST API сервиса]}.

{/tab}

{/tabs}