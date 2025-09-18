Object Storage позволяет настроить [жизненный цикл](/ru/storage/s3/concepts/lifecycle) (lifecycle) объектов в бакете. Жизненный цикл — это автоматизированное удаление объектов из бакета по заданным правилам.

## Просмотр конфигурации правил жизненного цикла

{tabs}

{tab(Личный кабинет)}

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Lifecycle**.
{/tab}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](/ru/storage/s3/connect/s3-cli), если он еще не установлен.
1. В консоли выполните команду:

   ```console
   aws s3api get-bucket-lifecycle-configuration --bucket <ИМЯ_БАКЕТА> --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, конфигурацию правил которого нужно получить.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

{/tab}

{tab(API)}

Воспользуйтесь методом `GET /lifecycle` [REST API сервиса](/ru/tools-for-using-services/api/api-spec/s3-rest-api/lifecycle-api).

{/tab}

{/tabs}

## {heading(Добавление правила жизненного цикла)[id=add_rule]}

{tabs}

{tab(Личный кабинет)}

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Lifecycle**.
1. Нажмите кнопку **Добавить правило** или ![plus-icon](/ru/assets/plus-icon.svg "inline") **Добавить новое правило**, если в бакете уже есть добавленные правила.
1. Задайте параметры правила:

   - **Наименование правила**: допустимы только цифры, латинские буквы и символы `-`, `_`, `.`. Наименование должно быть уникальным в рамках бакета.
   - **Префикс ключа объекта**: правило будет применяться только для объектов с указанными префиксными ключами. Фильтр может содержать только один ключ. Примеры префиксных ключей: `image/`, `pre/`, `image/photo`.
   - **Удалять данные через заданное количество дней**: укажите количество дней, через которые будут удалены объекты. 
   - **Активировать правило**: отключите опцию, если добавляемое правило не нужно применять к объектам в настоящее время.

1. Нажмите кнопку **Добавить правило**.

{/tab}

{/tabs}

## Редактирование правила жизненного цикла

{tabs}

{tab(Личный кабинет)}

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Lifecycle**.
1. Нажмите на значок ![pencil-icon](/ru/assets/pencil-icon.svg "inline") для правила, которое нужно отредактировать.
1. Отредактируйте [параметры](#add_rule) правила.
1. Нажмите кнопку **Сохранить**.

{/tab}

{/tabs}

## Отключение правила жизненного цикла

Чтобы объекты не удалялись по заданному правилу, отключите его:

{tabs}

{tab(Личный кабинет)}

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Lifecycle**.
1. Отключите нужное правило справа.

{/tab}

{/tabs}

## Удаление правила жизненного цикла

{tabs}

{tab(Личный кабинет)}

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Lifecycle**.
1. Нажмите на значок ![trash-icon](/ru/assets/trash-icon.svg "inline") для правила, которое нужно удалить.
1. Подтвердите удаление.

{/tab}

{/tabs}

## Установка конфигурации правил жизненного цикла

{tabs}

{tab(AWS CLI)}

{note:warn}
Добавление новой конфигурации правил удаляет текущую конфигурацию, в том числе правила, заданные в личном кабинете.
{/note}

1. Установите и настройте [AWS CLI](/ru/storage/s3/connect/s3-cli), если он еще не установлен.
1. Подготовьте файл в формате JSON с [конфигурацией правил жизненного цикла](/ru/storage/s3/concepts/lifecycle#lifecycle_config).
1. Откройте консоль и выполните команду:

   ```console
   aws s3api put-bucket-lifecycle-configuration --bucket <ИМЯ_БАКЕТА> --lifecycle-configuration file://<ИМЯ_ФАЙЛА>.json --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

    - `<ИМЯ_БАКЕТА>` — имя бакета, которому нужно добавить конфигурацию правил.
    - `<ИМЯ_ФАЙЛА>` — имя файла с конфигурацией правил жизненного цикла.
    - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
        - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
        - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

{/tab}

{tab(API)}

Воспользуйтесь методом `PUT /lifecycle` [REST API сервиса](/ru/tools-for-using-services/api/api-spec/s3-rest-api/lifecycle-api).

{/tab}

{/tabs}

## Удаление конфигурации правил жизненного цикла

{tabs}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](/ru/storage/s3/connect/s3-cli), если он еще не установлен.
1. В консоли выполните команду:

   ```console
   aws s3api delete-bucket-lifecycle --bucket <ИМЯ_БАКЕТА> --endpoint-url <URL_СЕРВИСА>
   ```
   
   Здесь:

    - `<ИМЯ_БАКЕТА>` — имя бакета, конфигурацию правил которого нужно удалить.
    - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
        - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
        - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

{/tab}

{tab(API)}

Воспользуйтесь методом `DELETE /lifecycle` [REST API сервиса](/ru/tools-for-using-services/api/api-spec/s3-rest-api/lifecycle-api).

{/tab}

{/tabs}