Токен Keystone необходим для работы с некоторыми сервисами и компонентами VK Cloud через их API — например, с сервисом виртуальных сетей (Neutron) и подсистемой резервного копирования (Karboii) в сервисе Облачные вычисления.

## Подготовительные шаги

1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
1. Убедитесь, что [включена](/ru/base/account/instructions/account-manage/manage-2fa) двухфакторная аутентификация и [активирован](/ru/manage/tools-for-using-services/rest-api/enable-api) доступ по API.
1. В шапке страницы личного кабинета выберите проект, в котором планируете использовать токен.

## Генерация токена

<warn>

Сгенерированный токен действителен в течение одного часа. Все выпущенные токены остаются действительными до конца их срока жизни.

</warn>

Получите токен:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
<tab>cURL</tab>
</tablist>
<tabpanel>

1. В разделе [Настройки проекта](https://mcs.mail.ru/app/project/keys/) перейдите на вкладку **Доступ по API**.

    При открытии страницы будет автоматически сгенерирован новый токен. Если страница остается открытой, раз в час генерируется новый токен.

1. В нижней части страницы найдите параметр **Токен для доступа к API** и нажмите на значок ![Копировать](./assets/copy-icon.svg "inline") рядом с ним. Токен будет скопирован.

    Срок действия токена отображается при наведении мыши на значок ![Копировать](./assets/copy-icon.svg "inline"). Если токен скоро просрочится, воспользуйтесь кнопкой **Перевыпустить**.

</tabpanel>
<tabpanel>

1. Убедитесь, что клиент OpenStack [установлен](/ru/manage/tools-for-using-services/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/manage/tools-for-using-services/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Выполните команду:

    ```
    openstack token issue -c id -f value
    ```

    Значение токена будет выведено в консоль.

</tabpanel>
<tabpanel>

1. Установите утилиту [cURL](https://github.com/curl/curl/blob/master/docs/INSTALL.md), если она еще не установлена.
1. [Пройдите аутентификацию](/ru/manage/tools-for-using-services/openstack-cli#3_proydite_autentifikaciyu) в проекте. Для работы с клиентом OpenStack и с утилитой cURL процедура аутентификации одинакова.
1. Выполните команду для вашей операционной системы:

    <tabs>
    <tablist>
    <tab>Linux</tab>
    <tab>Windows (cmd)</tab>
    </tablist>
    <tabpanel>

    ```bash
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

    ```bash
    curl -X POST ^
    -H "Content-Type: application/json" ^
    -d "{\"auth\": {\"identity\": {\"methods\": [\"password\"], \"password\": {\"user\": {\"domain\": {\"id\": \"%OS_USER_DOMAIN_NAME%\"}, \"name\": \"%OS_USERNAME%\",\"password\": \"%OS_PASSWORD%\"}}}, \"scope\": {\"project\": {\"id\": \"%OS_PROJECT_ID%\"}}}}" ^
    -i "https://infra.mail.ru:35357/v3/auth/tokens" | findstr /B x-subject-token | findstr x-subject-token
    ```
    </tabpanel>
    </tabs>

Значение токена будет выведено в параметре `x-subject-token`.

<details>
<summary markdown="span">Примеры ответов на запрос получения токена</summary>

<tabs>
<tablist>
<tab>Linux</tab>
<tab>Windows (cmd)</tab>
</tablist>
<tabpanel>

```bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 27038  100 26470  100   568  99259   2129 --:--:-- --:--:-- --:--:-- 99138
x-subject-token: gAAAAABkirBWYerPg-2A_W0blpcg_qcmTck9K3cC1zf4JUnP3lnpq-bf3W_AXbMx8wDd7PNO704lf00QX3--BRvFB-UcI5IQq5GtVNVzkHoqem4Ocg_-fmRgCdtSSrKvw_KqjpxoksOi2EocauqogKJebeYgAoheSMEnrSz4G70OrTHwUmhI4z0
```
</tabpanel>
<tabpanel>

```bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   230    0     0  100   230      0    920 --:--:-- --:--:-- --:--:--   923FINDSTR: Слишком длинная строка 12.
FINDSTR: Слишком длинная строка 12.
100 26700  100 26470  100   230  49114    426 --:--:-- --:--:-- --:--:-- 49628
FINDSTR: Слишком длинная строка 12.
x-subject-token: gAAAAABkirQja1Lgr9psuyf6fC6e3Sy5WMYubpmwMNPXuT6APQkf-BPRRAySTBGP2h9Iq2U533pi13h_ZIHa0viga7HxmSsEeCZ_Fq1CEy0m75lmpDtZYd8SAazmjqbV5Kf4ygGnp77kPadkL0hAgC0b7vKjgNGoZ9bLZDBQmlEivNMlptyZKcQ
```

</tabpanel>
</tabs>

</details>

</tabpanel>
</tabs>

## Пример использования токена

Задача: получить список сетей через REST API (сервис Neutron).

1. В личном кабинете [посмотрите](https://mcs.mail.ru/app/project/endpoints) эндпоинт, по которому выполняется запрос к сервису Neutron. В этом примере: `https://infra.mail.ru:9696`.
1. [Получите токен](#generaciya-tokena): сгенерируйте новый токен или скопируйте значение действующего токена.
1. Выполните команду с помощью утилиты cURL:

   ```bash
   curl https://infra.mail.ru:9696/v2.0/networks -H "Accept: application/json" -H "X-Auth-Token: <токен, полученный на предыдущем шаге>"
   ```

   <details>
   <summary markdown="span">Пример результата</summary>

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

   </details>

Другие примеры использования токена:

- [просмотр логов](/ru/manage/logging/start/view-logs) в сервисе Cloud Logging;
- [работа](/ru/additionals/api/api-dns) с публичным DNS.
