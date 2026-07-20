# {heading(Политика доступа)[id=s3-instructions-bucket-policy]}

{var(s3)} позволяет настраивать доступ к {linkto(../../../concepts/about#s3-concepts-about-bucket)[text=бакету]} и {linkto(../../../concepts/about#s3-concepts-about-object)[text=объектам]} с помощью {linkto(../../../concepts/access/bucket-policy#s3-concepts-bucket-policy)[text=политики доступа]}.

## {heading(Включение и отключение политики доступа)[id=s3-instructions-bucket-policy-enable-and-disable]}

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект, где находится нужный бакет.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите ![more-icon](../../../assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
1. Перейдите во вкладку **Политики доступа**.
1. Нажмите кнопку **Редактировать Bucket Policy**.
1. Нажмите кнопку **Включить Bucket Policy** или **Выключить Bucket Policy**.

## {heading(Включение и отключение ACL)[id=s3-instructions-bucket-acl-enable-and-disable]}

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект, где находится нужный бакет.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите ![more-icon](../../../assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
1. Перейдите во вкладку **Политики доступа**.
1. Нажмите кнопку **Редактировать Ownership control ACL**.
1. Включите или выключите опцию **Списки управления доступом (ACL)**.

## {heading(Запрос текущей конфигурации политики доступа)[id=s3-instructions-bucket-policy-view]}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Получите конфигурацию с помощью команды:

   ```console
   aws s3api get-bucket-policy \
     --bucket <ИМЯ_БАКЕТА> \
     --query Policy \
     --output text \
     --endpoint <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого необходимо получить конфигурацию политики доступа.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}.
     {/ifdef}

## {heading(Установка новой конфигурации политики доступа)[id=s3-instructions-bucket-policy-setup]}

{note:warn}

Установка новой {linkto(../../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=конфигурации]} перезаписывает существующую. Чтобы изменить параметры уже существующей конфигурации, {linkto(#s3-instructions-bucket-policy-edit)[text=отредактируйте]} ее.

{/note}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Создайте новый файл конфигурации `<КОНФИГУРАЦИЯ>.json`.
1. В файле укажите {linkto(../../../concepts/access/bucket-policy#s3-concepts-bucket-policy-config)[text=конфигурацию]} политики доступа.
1. Загрузите новую конфигурацию с помощью команды:

   ```console
   aws s3api put-bucket-policy \
     --bucket <ИМЯ_БАКЕТА> \
     --policy=file://<КОНФИГУРАЦИЯ>.json
     --endpoint <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого необходимо установить конфигурацию политики доступа.
     {ifdef(public)}
   - `<КОНФИГУРАЦИЯ>` — имя файла конфигурации политики доступа в формате JSON.
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}.
     {/ifdef}

## {heading(Редактирование конфигурации политики доступа)[id=s3-instructions-bucket-policy-edit]}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Сохраните конфигурацию локально в файл `<КОНФИГУРАЦИЯ>.json` с помощью команды:

   ```console
   aws s3api get-bucket-policy \
     --bucket <ИМЯ_БАКЕТА> \
     --query Policy \
     --output text \
     --endpoint <ENDPOINT_URL> \
     > <КОНФИГУРАЦИЯ>.json
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого необходимо отредактировать конфигурацию политики доступа.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}.
     {/ifdef}
   - `<КОНФИГУРАЦИЯ>` — имя файла конфигурации политики доступа в формате JSON.

1. Внесите необходимые изменения в файл `<КОНФИГУРАЦИЯ>.json`. При необходимости задайте другие параметры {linkto(../../../concepts/access/bucket-policy#s3-concepts-bucket-policy-config)[text=конфигурации]}.
1. Установите новую конфигурацию:

   ```shell
   aws s3api put-bucket-policy \
     --bucket <ИМЯ_БАКЕТА> \
     --policy=file://<КОНФИГУРАЦИЯ>.json
     --endpoint <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого необходимо установить конфигурацию политики доступа.
   - `<КОНФИГУРАЦИЯ>` — имя файла конфигурации политики доступа в формате JSON.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}.
     {/ifdef}

## {heading(Удаление конфигурации политики доступа)[id=s3-instructions-bucket-policy-delete]}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Удалите конфигурацию с помощью команды:

   ```shell
   aws s3api delete-bucket-policy \
     --bucket <ИМЯ_БАКЕТА> \
     --endpoint <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого необходимо удалить конфигурацию политики доступа.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}.
     {/ifdef}
