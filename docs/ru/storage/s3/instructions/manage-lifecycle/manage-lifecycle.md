# {heading(Жизненный цикл объектов в бакете)[id=s3-instructions-manage-lifecycle]}

{var(s3)} позволяет настроить {linkto(../../concepts/lifecycle#s3-concepts-lifecycle)[text=жизненный цикл]} (lifecycle) объектов в бакете. Жизненный цикл — это автоматизированное удаление объектов из бакета по заданным правилам.

## {heading(Просмотр конфигурации правил жизненного цикла)[id=s3-instructions-manage-lifecycle-view]}

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект, где находится нужный бакет.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Перейдите в настройки бакета одним из способов:

   - Нажмите ![ ](../../assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
   - Нажмите на имя нужного бакета, затем на странице бакета нажмите кнопку ![ ](../../assets/settings-icon.svg "inline").

1. Перейдите на вкладку **Lifecycle**.
{/tab}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. В консоли выполните команду:

   ```console
   aws s3api get-bucket-lifecycle-configuration --bucket <ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, конфигурацию правил которого нужно получить.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

{/tab}

{tab(API)}

Воспользуйтесь методом `GET /lifecycle` {linkto(../../api/lifecycle#api-spec-s3-get-bucket-lifecycle-configuration)[text=REST API сервиса]}.

{/tab}

{/tabs}

## {heading(Добавление правил жизненного цикла)[id=s3-instructions-manage-lifecycle-add-rule]}

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект, где находится нужный бакет.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Перейдите в настройки бакета одним из способов:

   - Нажмите ![ ](../../assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
   - Нажмите на имя нужного бакета, затем на странице бакета нажмите кнопку ![ ](../../assets/settings-icon.svg "inline").

1. Перейдите на вкладку **Lifecycle**.
1. Нажмите кнопку **Добавить правило** или ![plus-icon](../../assets/plus-icon.svg "inline") **Добавить новое правило**, если в бакете уже есть добавленные правила.
1. Задайте параметры правила:

   - **Наименование правила**: допустимы только цифры, латинские буквы и символы `-`, `_`, `.`. Наименование должно быть уникальным в рамках бакета.
   - **Префикс ключа объекта**: правило будет применяться только для объектов с указанными префиксными ключами. Фильтр может содержать только один ключ. Примеры префиксных ключей: `image/`, `pre/`, `image/photo`.
   - **Удалять данные через заданное количество дней**: укажите количество дней, через которые будут удалены объекты. 
   - **Активировать правило**: отключите опцию, если добавляемое правило не нужно применять к объектам в настоящее время.

1. Нажмите кнопку **Добавить правило**.

{/tab}

{/tabs}

## {heading(Редактирование правил жизненного цикла)[id=s3-instructions-manage-lifecycle-edit-rule]}

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект, где находится нужный бакет.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Перейдите в настройки бакета одним из способов:

   - Нажмите ![ ](../../assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
   - Нажмите на имя нужного бакета, затем на странице бакета нажмите кнопку ![ ](../../assets/settings-icon.svg "inline").

1. Перейдите на вкладку **Lifecycle**.
1. Нажмите на значок ![pencil-icon](../../assets/pencil-icon.svg "inline") для правила, которое нужно отредактировать.
1. Отредактируйте {linkto(#s3-instructions-manage-lifecycle-add-rule)[text=параметры]} правила.
1. Нажмите кнопку **Сохранить**.

{/tab}

{/tabs}

## {heading(Отключение правил жизненного цикла)[id=s3-instructions-manage-lifecycle-disable-rule]}

Чтобы объекты не удалялись по заданному правилу, отключите его:

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект, где находится нужный бакет.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Перейдите в настройки бакета одним из способов:

   - Нажмите ![ ](../../assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
   - Нажмите на имя нужного бакета, затем на странице бакета нажмите кнопку ![ ](../../assets/settings-icon.svg "inline").

1. Перейдите на вкладку **Lifecycle**.
1. Отключите нужное правило справа.

{/tab}

{/tabs}

## {heading(Удаление правил жизненного цикла)[id=s3-instructions-manage-lifecycle-delete-rule]}

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект, где находится нужный бакет.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Перейдите в настройки бакета одним из способов:

   - Нажмите ![ ](../../assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
   - Нажмите на имя нужного бакета, затем на странице бакета нажмите кнопку ![ ](../../assets/settings-icon.svg "inline").

1. Перейдите на вкладку **Lifecycle**.
1. Нажмите на значок ![trash-icon](../../assets/trash-icon.svg "inline") для правила, которое нужно удалить.
1. Подтвердите удаление.

{/tab}

{/tabs}

## {heading(Установка конфигурации правил жизненного цикла)[id=s3-instructions-manage-lifecycle-add-configuration]}

{note:warn}
Добавление новой конфигурации правил удаляет текущую конфигурацию, в том числе правила, заданные в личном кабинете.
{/note}

{tabs}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Подготовьте файл в формате JSON с {linkto(../../concepts/lifecycle#s3-concepts-lifecycle-config)[text=конфигурацией правил жизненного цикла]}.
1. Откройте консоль и выполните команду:

   ```console
   aws s3api put-bucket-lifecycle-configuration --bucket <ИМЯ_БАКЕТА> --lifecycle-configuration file://<ИМЯ_ФАЙЛА>.json --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, которому нужно добавить конфигурацию правил.
   - `<ИМЯ_ФАЙЛА>` — имя файла с конфигурацией правил жизненного цикла.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

{/tab}

{tab(API)}

Воспользуйтесь методом `PUT /lifecycle` {linkto(../../api/lifecycle#api-spec-s3-put-bucket-lifecycle)[text=REST API сервиса]}.

{/tab}

{/tabs}

## {heading(Удаление конфигурации правил жизненного цикла)[id=s3-instructions-manage-lifecycle-delete-configuration]}

{tabs}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. В консоли выполните команду:

   ```console
   aws s3api delete-bucket-lifecycle --bucket <ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
   ```
   
   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, конфигурацию правил которого нужно удалить.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

{/tab}

{tab(API)}

Воспользуйтесь методом `DELETE /lifecycle` {linkto(../../api/lifecycle#api-spec-s3-delete-bucket-lifecycle)[text=REST API сервиса]}.

{/tab}

{/tabs}