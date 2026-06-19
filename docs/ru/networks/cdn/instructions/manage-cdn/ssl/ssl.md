# {heading(Использование SSL-сертификата)[id=cdn-ssl]}

{note:info}
Управление SSL-сертификатами подробнее описано в {linkto(../../../../../networks/cdn/instructions/manage-certificates#cdn-manage-certificates)[text=соответствующем разделе]}.
{/note}

{tabs}

{tab(Личный кабинет)}

{include(../../../../../_includes/_open-cdn.md)}

1. Перейдите на вкладку **Основные настройки**.
1. Раскройте блок **Настройки шифрования** и выберите опцию, отвечающую за использование SSL-сертификата:

    - `Не использовать` — сертификат не будет использоваться: к персональным доменам можно будет обращаться только по HTTP.
    - (По умолчанию) `Let's Encrypt` — будет использоваться бесплатный сертификат [Let's Encrypt](https://letsencrypt.org/ru/). Сертификат будет создан после создания CDN-ресурса, когда станут доступны серверы-источники и в DNS будут распространены изменения, касающиеся CNAME-записей для персональных доменов. Обычно на это уходит до 30 минут. При выборе этой опции также необходимо включить опцию {linkto(../../../../../networks/cdn/instructions/manage-cdn/enable-cdn#cdn-enable-cdn)[text=Доступ к контенту конечным пользователям]}.
    - `Свой сертификат` — будет использоваться выбранный из выпадающего списка сертификат. Чтобы сертификат стал доступен для выбора, {linkto(../../../../../networks/cdn/instructions/manage-certificates#cdn-manage-certificates)[text=добавьте его в хранилище сертификатов]}.
1. Нажмите кнопку **Сохранить изменения**.

{/tab}

{tab(API)}

{include(../../../../../_includes/_api_cdn_create_change.md)}

В теле запроса пропишите параметры:

- Чтобы не использовать SSL-сертификат и обращаться к персональным доменам только по HTTP, укажите параметр `"sslEnabled": false`.
- Чтобы использовать бесплатный сертификат [Let's Encrypt](https://letsencrypt.org/ru/), укажите параметр `"sslEnabled": true` и задайте параметры обновления сертификата:

  - `"ssl_automated": true` — сертификат Let’s Encrypt будет обновляться автоматически по истечении срока его действия;
  - `"ssl_automated": false` — сертификат Let’s Encrypt не будет обновляться автоматически.
  
  Для создания или настройки Let's Encrypt сертификата воспользуйтесь {linkto(../../../../../tools-for-using-services/api/api-spec/api-cdn#api-spec-cdn)[text=методами]} раздела **Сертификаты Let's Encrypt**.

- Чтобы использовать свой SSL-сертификат, укажите параметр `"sslEnabled": true`, а также пропишите идентификатор сертификата в параметре `sslData`. Для создания или настройки своего сертификата воспользуйтесь {linkto(../../../../../tools-for-using-services/api/api-spec/api-cdn#api-spec-cdn)[text=методами]} раздела **SSL-Сертификаты**.

Пример запроса для использования своего SSL-сертификата:

```json
curl --location --request PUT 'https://msk.cloud.vk.com/api/cdn/api/v1/projects/examplef8f67/resources/175281'\
--header 'X-Auth-Token: example6UjMOd'\
--header 'Content-Type: application/json'\
--data '{
    "sslEnabled": true,
    "sslData": 42,
}'
```

{/tab}

{/tabs}