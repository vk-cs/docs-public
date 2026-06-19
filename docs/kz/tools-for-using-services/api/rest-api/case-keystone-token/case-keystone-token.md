# {heading(Keystone қатынау токенін алу)[id=rest-api-keystone-token]}

{include(/kz/_includes/_translated_by_ai.md)}

Keystone токені кейбір {var(cloud)} сервистерімен және компоненттерімен олардың API-ы арқылы жұмыс істеу үшін қажет — мысалы, Cloud Servers сервисіндегі виртуалды желілер сервисімен (Neutron) және сақтық көшірмелеу ішкі жүйесімен (Karboii).

## {heading(Дайындық қадамдары)[id=rest-api-keystone-token-prepare]}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
1. Екі факторлы аутентификация [қосылғанына](/kz/access/iam/instructions/manage-2fa) және API арқылы қолжетімділік [белсендірілгеніне](/kz/tools-for-using-services/api/rest-api/enable-api) көз жеткізіңіз.
1. Жеке кабинет бетінің жоғарғы жағында токенді пайдалануды жоспарлап отырған жобаны таңдаңыз.

## {heading(Токенді генерациялау)[id=rest-api-keystone-token-gen]}

{note:warn}

Генерацияланған токен бір сағат бойы жарамды. Шығарылған барлық токендер өздерінің өмір сүру мерзімінің соңына дейін жарамды болып қалады.

{/note}

Токенді алыңыз:

{tabs}

{tab(Жеке кабинет)}

1. [Жоба баптаулары](https://kz.cloud.vk.com/app/project/keys/) бөлімінде **API арқылы қолжетімділік** қойындысына өтіңіз.

    Бет ашылған кезде жаңа токен автоматты түрде генерацияланады. Егер бет ашық күйде қалса, әр сағат сайын жаңа токен генерацияланады.

1. Беттің төменгі жағынан **API-ға қол жеткізуге арналған токен** параметрін тауып, оның жанындағы ![Көшіру](assets/copy-icon.svg "inline") белгішесін басыңыз. Токен көшіріледі.

    Токеннің жарамдылық мерзімі ![Көшіру](assets/copy-icon.svg "inline") белгішесіне меңзерді апарғанда көрсетіледі. Егер токеннің мерзімі жақында бітсе, **Қайта шығару** түймесін пайдаланыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиентін [орнатыңыз](/kz/tools-for-using-services/cli/openstack-cli) және жобада аутентификациядан өтіңіз.
1. Команданы орындаңыз:

    ```console
    openstack token issue -c id -f value
    ```

    Токен мәні консольге шығарылады.

{/tab}

{tab(cURL)}

1. Егер әлі орнатылмаған болса, [cURL](https://github.com/curl/curl/blob/master/docs/INSTALL.md) утилитасын орнатыңыз.
1. Жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli). OpenStack клиентімен және cURL утилитасымен жұмыс істеу үшін аутентификация рәсімі бірдей.
1. Операциялық жүйеңіз үшін команданы орындаңыз:

    {tabs}

    {tab(Linux)}

    ```console
    curl -X POST     -H "Content-Type: application/json"     -d '{
        "auth": {
            "identity": {
                "methods": [
                    "password"
                ],
                "password": {
                    "user": {
                        "domain": {
                            "name": "'$OS_USER_DOMAIN_NAME'"
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
    }'     -i "https://infra.mail.ru:5000/v3/auth/tokens" | grep -i '^x-subject-token'| cut -d ':' -f 1,2
    ```
    {/tab}

    {tab(Windows (cmd))}

    ```console
    curl -X POST ^
    -H "Content-Type: application/json" ^
    -d "{"auth": {"identity": {"methods": ["password"], "password": {"user": {"domain": {"name": "%OS_USER_DOMAIN_NAME%"}, "name": "%OS_USERNAME%","password": "%OS_PASSWORD%"}}}, "scope": {"project": {"id": "%OS_PROJECT_ID%"}}}}" ^
    -i "https://infra.mail.ru:5000/v3/auth/tokens" | findstr /B x-subject-token | findstr x-subject-token
    ```
    {/tab}

    {/tabs}

Токен мәні `x-subject-token` параметрінде шығарылады.

{cut(Токен алу сұрауына жауап мысалдары)}

{tabs}

{tab(Linux)}

```console
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 27038  100 26470  100   568  99259   2129 --:--:-- --:--:-- --:--:-- 99138
x-subject-token: gAAAAABkirBWYerPg-2A_W0blpcg_qcmTck9K3cC1zf4JUnP3lnpq-bf3W_AXbMx8wDd7PNO704lf00QX3--BRvFB-UcI5IQq5GtVNVzkHoqem4Ocg_-fmRgCdtSSrKvw_KqjpxoksOi2EocauqogKJebeYgAoheSMEnrSz4G70OrTHwUmhI4z0
```
{/tab}

{tab(Windows (cmd))}

```console
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   230    0     0  100   230      0    920 --:--:-- --:--:-- --:--:--   923FINDSTR: Слишком длинная строка 12.
FINDSTR: Слишком длинная строка 12.
100 26700  100 26470  100   230  49114    426 --:--:-- --:--:-- --:--:-- 49628
FINDSTR: Слишком длинная строка 12.
x-subject-token: <ЗНАЧЕНИЕ_ТОКЕНА>
```

{/tab}

{/tabs}

{/cut}

{/tab}

{/tabs}

## {heading(Токенді пайдалану мысалы)[id=rest-api-keystone-token-example]}

Міндет: REST API арқылы желілер тізімін алу (Neutron сервисі).

1. Жеке кабинетте Neutron сервисіне сұрау жіберілетін эндпоинтті [қараңыз](https://kz.cloud.vk.com/app/project/endpoints). Бұл мысалда: `https://infra.mail.ru:9696`.
1. [Токенді алыңыз](#rest-api-keystone-token-gen): жаңа токен генерациялаңыз немесе қолданыстағы токеннің мәнін көшіріп алыңыз.
1. Команданы cURL утилитасының көмегімен орындаңыз:

   ```console
   curl https://infra.mail.ru:9696/v2.0/networks -H "Accept: application/json" -H "X-Auth-Token: <токен, полученный на предыдущем шаге>"
   ```

   {cut(Нәтиже мысалы)}

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

Токенді пайдаланудың басқа мысалдары:

- Cloud Logging сервисінде [логтарды көру](/kz/monitoring-services/logging/instructions/view-logs);
- жария DNS-пен [жұмыс істеу](/kz/tools-for-using-services/api/api-spec/network-api/api-dns).
