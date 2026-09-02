# {heading(Хостинг статических сайтов)[id=s3-instructions-manage-static-site]}

{var(s3)} позволяет использовать {linkto(../../concepts/about#s3-concepts-about-bucket)[text=бакет]} для {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting)[text=хостинга статического сайта]}.

## {heading(Получить конфигурацию статического сайта)[id=s3-instructions-manage-static-site-view]}

1. Установите и настройте {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Получите конфигурацию с помощью команды:

   ```console
   aws s3api get-bucket-website --bucket <ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого необходимо получить конфигурацию статического сайта.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, который используется в вашей инсталляции {var(s3)}.
     {/ifdef}

## {heading(Установка новой конфигурации статического сайта)[id=s3-instructions-manage-static-site-setup]}

{note:warn}

Установка новой {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=конфигурации]} перезаписывает существующую. Чтобы изменить параметры уже существующей конфигурации, {linkto(#s3-instructions-manage-static-site-edit)[text=отредактируйте]} ее.

{/note}

1. Установите и настройте {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. {linkto(../buckets/create-bucket#s3-instructions-create-bucket)[text=Создайте]} новый бакет.
1. {linkto(../access-management/acl#s3-instructions-object-acl-add-preset)[text=Установите]} для бакета конфигурацию ACL `public-read`, если этого не было сделано ранее. Это необходимо для публичного доступа к объектам, иначе запросы будут завершаться ошибкой `403`.
1. Создайте новый файл конфигурации `<КОНФИГУРАЦИЯ>.json`.
1. В файле укажите {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=конфигурацию]} статического сайта.
1. Загрузите новую конфигурацию с помощью команды:

   ```console
   aws s3api put-bucket-website --bucket <ИМЯ_БАКЕТА> --website-configuration file://<КОНФИГУРАЦИЯ>.json --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого необходимо установить конфигурацию статического сайта.
   - `<КОНФИГУРАЦИЯ>` — имя файла конфигурации статического сайта в формате JSON.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, который используется в вашей инсталляции {var(s3)}.
     {/ifdef}

1. Перейдите на страницу статического сайта:

   ```text
   https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/<PREFIX>
   ```

   {ifdef(s3,s3-pdf)}

   {note:info}

   Формат ссылки может отличаться. Для уточнения обратитесь к администратору.

   {/note}

   {/ifdef}

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого была установлена конфигурация статического сайта;

   {ifdef(public)}

   - `<ENDPOINT_HOSTNAME>` — имя хоста сервиса {var(s3)}, должно соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

     - `hb.vkcloud-storage.ru` или `hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_HOSTNAME>` — имя хоста, которое используется в вашей инсталляции {var(s3)}.
     {/ifdef}
   - `<PREFIX>` — префикс ключа объекта индексной страницы. Может быть пустым.

## {heading(Редактирование конфигурации статического сайта)[id=s3-instructions-manage-static-site-edit]}

1. Установите и настройте {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Сохраните конфигурацию локально в файл `<КОНФИГУРАЦИЯ>.json` с помощью команды:

   ```console
   aws s3api get-bucket-website --bucket <ИМЯ_БАКЕТА> --output json --endpoint-url <ENDPOINT_URL> > <КОНФИГУРАЦИЯ>.json
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого необходимо отредактировать конфигурацию статического сайта.
   - `<КОНФИГУРАЦИЯ>` — имя файла конфигурации статического сайта в формате JSON.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, который используется в вашей инсталляции {var(s3)}.
     {/ifdef}

1. Внесите необходимые изменения в файл `<КОНФИГУРАЦИЯ>.json`. При необходимости задайте другие параметры {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=конфигурации]}.
1. Установите новую конфигурацию:

   ```shell
   aws s3api put-bucket-website --bucket <ИМЯ_БАКЕТА> --website-configuration file://<КОНФИГУРАЦИЯ>.json --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого необходимо установить конфигурацию статического сайта.
   - `<КОНФИГУРАЦИЯ>` — имя файла конфигурации статического сайта в формате JSON.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, который используется в вашей инсталляции {var(s3)}.
     {/ifdef}


## {heading(Удаление конфигурации статического сайта)[id=s3-instructions-manage-static-site-delete]}

1. Установите и настройте {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Удалите конфигурацию с помощью команды:

   ```shell
   aws s3api delete-bucket-website --bucket <ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого необходимо удалить конфигурацию статического сайта.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, который используется в вашей инсталляции {var(s3)}.
     {/ifdef}
