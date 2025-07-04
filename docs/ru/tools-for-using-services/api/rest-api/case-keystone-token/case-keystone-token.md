Токен Keystone необходим для работы с некоторыми сервисами и компонентами VK Cloud через их API — например, с сервисом виртуальных сетей (Neutron) и подсистемой резервного копирования (Karboii) в сервисе Cloud Servers.

## Подготовительные шаги

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Убедитесь, что [включена](/ru/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa) двухфакторная аутентификация и [активирован](/ru/tools-for-using-services/api/rest-api/enable-api) доступ по API.
1. В шапке страницы личного кабинета выберите проект, в котором планируете использовать токен.

## Генерация токена

{note:warn}

Сгенерированный токен действителен в течение одного часа. Все выпущенные токены остаются действительными до конца их срока жизни.

{/note}

Получите токен:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
<tab>cURL</tab>
</tablist>
<tabpanel>

1. В разделе [Настройки проекта](https://msk.cloud.vk.com/app/project/keys/) перейдите на вкладку **Доступ по API**.

    При открытии страницы будет автоматически сгенерирован новый токен. Если страница остается открытой, раз в час генерируется новый токен.

1. В нижней части страницы найдите параметр **Токен для доступа к API** и нажмите на значок ![Копировать](assets/copy-icon.svg "inline") рядом с ним. Токен будет скопирован.

    Срок действия токена отображается при наведении мыши на значок ![Копировать](assets/copy-icon.svg "inline"). Если токен скоро просрочится, воспользуйтесь кнопкой **Перевыпустить**.

</tabpanel>
<tabpanel>

1. [Установите](/ru/tools-for-using-services/cli/openstack-cli) клиент OpenStack и пройдите аутентификацию в проекте.
1. Выполните команду:

    ```console
    openstack token issue -c id -f value
    ```

    Значение токена будет выведено в консоль.

</tabpanel>
<tabpanel>

1. Установите утилиту [cURL](https://github.com/curl/curl/blob/master/docs/INSTALL.md), если она еще не установлена.
1. [Пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli) в проекте. Для работы с клиентом OpenStack и с утилитой cURL процедура аутентификации одинакова.
1. Выполните команду для вашей операционной системы:

    <tabs>
    <tablist>
    <tab>Linux</tab>
    <tab>Windows (cmd)</tab>
    </tablist>
    <tabpanel>

    ```console
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "auth": {
            "identity": {
                "methods": [
                    "password"
                ],
                "password": {
                    "user": {
                        "domain": {
                            "id": "'$OS_USER_DOMAIN_NAME'"
                        },
                        "name": "'$OS_USERNAME'",
                        "password": "'$OS_PASSWORD'"
                    }
                }
            },
            "scope": {
                "project": {
                    "id": "'$OS_PROJECT_ID'",
                    "region": "'$OS_REGION_NAME'"
                }
            }
        }
    }' \
    -i "https://infra.mail.ru:35357/v3/auth/tokens" | grep -i '^x-subject-token'| cut -d ':' -f 1,2
    ```
    </tabpanel>
    <tabpanel>

    ```console
    curl -X POST ^
    -H "Content-Type: application/json" ^
    -d "{\"auth\": {\"identity\": {\"methods\": [\"password\"], \"password\": {\"user\": {\"domain\": {\"id\": \"%OS_USER_DOMAIN_NAME%\"}, \"name\": \"%OS_USERNAME%\",\"password\": \"%OS_PASSWORD%\"}}}, \"scope\": {\"project\": {\"id\": \"%OS_PROJECT_ID%\"}}}}" ^
    -i "https://infra.mail.ru:35357/v3/auth/tokens" | findstr /B x-subject-token | findstr x-subject-token
    ```
    </tabpanel>
    </tabs>

Значение токена будет выведено в параметре `x-subject-token`.

{cut(Примеры ответов на запрос получения токена)}

<tabs>
<tablist>
<tab>Linux</tab>
<tab>Windows (cmd)</tab>
</tablist>
<tabpanel>

```console
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 27038  100 26470  100   568  99259   2129 --:--:-- --:--:-- --:--:-- 99138
x-subject-token: gAAAAABkirBWYerPg-2A_W0blpcg_qcmTck9K3cC1zf4JUnP3lnpq-bf3W_AXbMx8wDd7PNO704lf00QX3--BRvFB-UcI5IQq5GtVNVzkHoqem4Ocg_-fmRgCdtSSrKvw_KqjpxoksOi2EocauqogKJebeYgAoheSMEnrSz4G70OrTHwUmhI4z0
```
</tabpanel>
<tabpanel>

```console
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   230    0     0  100   230      0    920 --:--:-- --:--:-- --:--:--   923FINDSTR: Слишком длинная строка 12.
FINDSTR: Слишком длинная строка 12.
100 26700  100 26470  100   230  49114    426 --:--:-- --:--:-- --:--:-- 49628
FINDSTR: Слишком длинная строка 12.
x-subject-token: <ЗНАЧЕНИЕ_ТОКЕНА>
```

</tabpanel>
</tabs>

{/cut}

</tabpanel>
</tabs>

## Пример использования токена

Задача: получить список сетей через REST API (сервис Neutron).

1. В личном кабинете [посмотрите](https://msk.cloud.vk.com/app/project/endpoints) эндпоинт, по которому выполняется запрос к сервису Neutron. В этом примере: `https://infra.mail.ru:9696`.
1. [Получите токен](#generaciya_tokena): сгенерируйте новый токен или скопируйте значение действующего токена.
1. Выполните команду с помощью утилиты cURL:

   ```console
   curl https://infra.mail.ru:9696/v2.0/networks -H "Accept: application/json" -H "X-Auth-Token: <токен, полученный на предыдущем шаге>"
   ```

   {cut(Пример результата)}

   ```json
   {
        "networks": [
            {
                "ipv6_address_scope": null,
                "dns_domain": null,
                "revision_number": 6,
                "port_security_enabled": true,
                "id": "0e4d7c1e-ba20-0000-0000-7623648487a6",
                "router:external": false,
                "availability_zone_hints": [],
                "availability_zones": [
                    "nova"
                ],
                "ipv4_address_scope": null,
                "shared": false,
                "project_id": "b5b7ffd4ef0547e5b222f44500000000",
                "status": "ACTIVE",
                "subnets": [
                    "5ab0164b-2528-0000-0000-b2a8d5e62661"
                ],
                "private_dns_domain": "mcs.local.",
                "description": "",
                "tags": [],
                "updated_at": "2022-11-22T07:24:53Z",
                "name": "demoNet2",
                "admin_state_up": true,
                "tenant_id": "b5b7ffd4ef0547e5b222f44500000000",
                "created_at": "2022-11-22T07:24:51Z",
                "mtu": 1500,
                "sdn": "neutron"
            },
        ]
    }
   ```

   {/cut}

Другие примеры использования токена:

- [просмотр логов](/ru/monitoring-services/logging/instructions/view-logs) в сервисе Cloud Logging;
- [работа](/ru/tools-for-using-services/api/api-spec/api-dns) с публичным DNS.
