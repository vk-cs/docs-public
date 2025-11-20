VK Object Storage поддерживает технологию кросс-доменных запросов ([CORS](/ru/storage/s3/reference#cors)). 

В личном кабинете можно задать каждое правило по отдельности, а с помощью [API](/ru/tools-for-using-services/api/api-spec/s3-rest-api/cors-api) — настроить конфигурацию правил CORS. Под настройкой конфигурации правил подразумевается, что все правила CORS для бакета передаются в VK Object Storage в формате XML в одном запросе.

## Просмотр конфигурации правил CORS

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Объектное хранилище → Бакеты**.
1. Нажмите ![more-icon](/ru/assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
1. Перейдите на вкладку **CORS**.

{/tab}

{tab(API)}

Воспользуйтесь методом `GET /?cors` [REST API сервиса](/ru/tools-for-using-services/api/api-spec/s3-rest-api/cors-api#get_bucket_cors).

{/tab}

{/tabs}

## {heading(Добавление правила CORS)[id=add_rule_cors]}

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Объектное хранилище → Бакеты**.
1. Нажмите ![more-icon](/ru/assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
1. Перейдите на вкладку **CORS**.
1. Нажмите кнопку **Добавить правило** или ![plus-icon](/ru/assets/plus-icon.svg "inline") **Добавить новое правило**, если в бакете уже есть добавленные правила CORS.

{include(/ru/_includes/_cors.md)}

1. Нажмите кнопку **Добавить правило**.

{/tab}

{/tabs}

## Редактирование правила CORS

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Объектное хранилище → Бакеты**.
1. Нажмите ![more-icon](/ru/assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
1. Перейдите на вкладку **CORS**.
1. Нажмите на значок ![pencil-icon](/ru/assets/pencil-icon.svg "inline"), чтобы отредактировать правило.
{include(/ru/_includes/_cors.md)}
1. Нажмите кнопку **Сохранить**.

{/tab}

{/tabs}

## Удаление правила CORS

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Объектное хранилище → Бакеты**.
1. Нажмите ![more-icon](/ru/assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
1. Перейдите на вкладку **CORS**.
1. Нажмите на значок ![trash-icon](/ru/assets/trash-icon.svg "inline"), чтобы удалить правило.
1. Подтвердите удаление.

{/tab}

{/tabs}

## Установка конфигурации правил CORS

{note:warn}Добавление новой конфигурации правил удаляет текущую конфигурацию, в том числе правила, заданные в личном кабинете.{/note}

{tabs}

{tab(API)}

Воспользуйтесь методом `PUT /?cors` [REST API сервиса](/ru/tools-for-using-services/api/api-spec/s3-rest-api/cors-api#set_bucket_cors).

{/tab}

{/tabs}

## Удаление конфигурации правил CORS

{note:warn}Операция полностью удаляет текущую конфигурацию правил CORS, в том числе правила, заданные в личном кабинете.{/note}

{tabs}

{tab(API)}

Воспользуйтесь методом `DELETE /?cors` [REST API сервиса](/ru/tools-for-using-services/api/api-spec/s3-rest-api/cors-api#delete_bucket_cors).

{/tab}

{/tabs}
