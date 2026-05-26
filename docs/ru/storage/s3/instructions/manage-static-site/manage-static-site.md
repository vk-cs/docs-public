VK Object Storage позволяет использовать {linkto(../../concepts/about#bucket)[text=бакет]} для [хостинга статического сайта](../../concepts/static-site-hosting).

После {linkto(#setup)[text=установки]} конфигурации, cтатический сайт доступен по адресу:

```text
https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>
```

Здесь:

- `<ИМЯ_БАКЕТА>` — имя бакета, для которого была установлена конфигурация статического сайта;
- `<ENDPOINT_HOSTNAME>` — имя хоста сервиса VK Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

   - `hb.vkcloud-storage.ru` или `hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

## {heading(Получить конфигурацию статического сайта)[id=view]}

1. Установите и настройте [AWS CLI](../../connect/s3-cli), если он еще не установлен.
1. Получите конфигурацию с помощью команды:

   ```console
   aws s3api get-bucket-website --bucket <ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого необходимо получить конфигурацию статического сайта.
   - `<ENDPOINT_URL>` — должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

## {heading(Установка новой конфигурации статического сайта)[id=setup]}

{note:warn}

Установка новой {linkto(../../concepts/static-site-hosting#config)[text=конфигурации]} перезаписывает существующую. Чтобы изменить параметры уже существующей конфигурации, {linkto(#edit)[text=отредактируйте]} ее.

{/note}

1. Установите и настройте [AWS CLI](../../connect/s3-cli), если он еще не установлен.
1. [Создайте](../buckets/create-bucket) новый бакет.
1. {linkto(../access-management/acl#ustanovka_acl_dlya_baketa)[text=Установите]} для бакета конфигурацию ACL `public-read`, если этого не было сделано ранее. Это необходимо для публичного доступа к объектам, иначе запросы будут завершаться ошибкой `403`.
1. Создайте новый файл конфигурации `<КОНФИГУРАЦИЯ>.json`.
1. В файле укажите {linkto(../../concepts/static-site-hosting#config)[text=конфигурацию]} статического сайта.
1. Загрузите новую конфигурацию с помощью команды:

   ```console
   aws s3api put-bucket-website --bucket <ИМЯ_БАКЕТА> --website-configuration file://<КОНФИГУРАЦИЯ>.json --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого необходимо установить конфигурацию статического сайта.
   - `<КОНФИГУРАЦИЯ>` — имя файла конфигурации статического сайта в формате JSON.
   - `<ENDPOINT_URL>` — должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

1. Перейдите на страницу статического сайта:

   ```text
   https://<ИМЯ_БАКЕТА>.hb-website.<ENDPOINT_HOSTNAME>/<PREFIX>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого была установлена конфигурация статического сайта;
   - `<ENDPOINT_HOSTNAME>` — имя хоста сервиса VK Object Storage, должно соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

      - `hb.vkcloud-storage.ru` или `hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
      - `hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   - `<PREFIX>` — префикс ключа объекта индексной страницы. Может быть пустым.

## {heading(Редактирование конфигурации статического сайта)[id=edit]}

1. Установите и настройте [AWS CLI](../../connect/s3-cli), если он еще не установлен.
1. Сохраните конфигурацию локально в файл `<КОНФИГУРАЦИЯ>.json` с помощью команды:

   ```console
   aws s3api get-bucket-website --bucket <ИМЯ_БАКЕТА> --output json --endpoint-url <ENDPOINT_URL> > <КОНФИГУРАЦИЯ>.json
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого необходимо отредактировать конфигурацию статического сайта.
   - `<КОНФИГУРАЦИЯ>` — имя файла конфигурации статического сайта в формате JSON.
   - `<ENDPOINT_URL>` — должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

1. Внесите необходимые изменения в файле `<КОНФИГУРАЦИЯ>.json`. При необходимости задайте другие параметры {linkto(../../concepts/static-site-hosting#config)[text=конфигурации]}.
1. Установите новую конфигурацию:

   ```shell
   aws s3api put-bucket-website --bucket <ИМЯ_БАКЕТА> --website-configuration file://<КОНФИГУРАЦИЯ>.json --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого необходимо установить конфигурацию статического сайта.
   - `<КОНФИГУРАЦИЯ>` — имя файла конфигурации статического сайта в формате JSON.
   - `<ENDPOINT_URL>` — должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

## {heading(Удаление конфигурации статического сайта)[id=delete]}

1. Установите и настройте [AWS CLI](../../connect/s3-cli), если он еще не установлен.
1. Удалите конфигурацию с помощью команды:

   ```shell
   aws s3api delete-bucket-website --bucket <ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого необходимо удалить конфигурацию статического сайта.
   - `<ENDPOINT_URL>` — должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.