{includetag(api-intro)}
{ifndef(public)}
HTTP и HTTPS-запросы к REST API по умолчанию работают с деплой-ноды и управляющих узлов. Чтобы запросы работали из других подсетей, для них должен быть настроен доступ (Firewall и маршрутизация).
{/ifndef}

{ifdef(public)}
Взаимодействие с {var(cloud)} API выполняется через эндпоинты. В некоторых случаях для аутентификации потребуется токен.
{/ifdef}
{/includetag}

{includetag(api-token-prerequisites)}
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Убедитесь, что {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=включена]} двухфакторная аутентификация и {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=активирован]} доступ по API.
1. В шапке страницы личного кабинета выберите проект, в котором планируете использовать токен.
{/includetag}

{includetag(api-token-gen)}
{note:warn}
{ifdef(public)}Сгенерированный токен действителен в течение одного часа. {/ifdef}Все выпущенные токены остаются действительными до конца их срока жизни.
{/note}

Получите токен:

{tabs}

{tab(Личный кабинет)}
   {ifndef(public)}
   {/includetag}
   {includetag(case-keystone-token)}
1. {linkto(../../../account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
   {/includetag}
   {includetag(prerequisites-api)}
1. {linkto(../prerequisites-lk-entry#prerequisites-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
   {/includetag}
   {includetag(api-token-gen)}
1. В шапке страницы личного кабинета выберите проект, в котором планируете использовать токен.
   {/ifndef}
1. Нажмите на имя пользователя в шапке страницы и выберите пункт **Настройки проекта**.
1. Перейдите на вкладку **Доступ по API**.
   {ifdef(public)}
   При открытии страницы будет автоматически сгенерирован новый токен. Если страница остается открытой, раз в час генерируется новый токен.
   {/ifdef}
   {/includetag}
   {includetag(case-keystone-token)}
1. В нижней части страницы найдите параметр **Токен для доступа к API** и нажмите на значок ![Копировать](../../../../assets/copy-icon.svg "inline") рядом с ним. Токен будет скопирован.
   {/includetag}
   {includetag(prerequisites-api)}
1. В нижней части страницы найдите параметр **Токен для доступа к API** и нажмите на значок ![Копировать](../../../assets/copy-icon.svg "inline") рядом с ним. Токен будет скопирован.
   {/includetag}
   {includetag(api-token-gen)}
   {ifdef(public)}
   Срок действия токена отображается при наведении мыши на значок ![Копировать](../../../../assets/copy-icon.svg "inline"). Если токен скоро просрочится, воспользуйтесь кнопкой **Перевыпустить**.
   {/ifdef}
{/tab}

{tab(OpenStack CLI)}
   {/includetag}
   {includetag(case-keystone-token)}
1. {linkto(../../../cli/openstack-cli#tools-cli-openstack)[text=Установите]} клиент OpenStack и пройдите аутентификацию в проекте.
   {/includetag}
   {includetag(prerequisites-api)}
1. {linkto(../prerequisites-openstack-cli#prerequisites-openstack-cli)[text=Установите]} клиент OpenStack и пройдите аутентификацию в проекте.
   {/includetag}
   {includetag(api-token-gen)}
1. Выполните команду:

   ```console
   openstack token issue -c id -f value
   ```

   Значение токена будет выведено в консоль.

{/tab}

{ifdef(public)}
{tab(cURL)}

1. Установите утилиту [cURL](https://github.com/curl/curl/blob/master/docs/INSTALL.md), если она еще не установлена.
1. {linkto(../../../cli/openstack-cli#openstack-authorize)[text=Пройдите аутентификацию]} в проекте. Для работы с клиентом OpenStack и с утилитой cURL процедура аутентификации одинакова.
1. Выполните команду. Команда зависит от вашей операционной системы. Доступно на выбор два метода аутентификации: 

   - `password` — генерация нового токена по паролю; 
   - `token` — генерация нового токена по существующему токену.

   {tabs}
    
   {tab(Linux)}
     
   Пример команды для метода `password`:

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
                           "name": "'$OS_USER_DOMAIN_NAME'"
                       },
                       "name": "'$OS_USERNAME'",
                       "password": "'$OS_PASSWORD'"
                   }
               }
           },
           "scope": {
               "project": {
                   "id": "'$OS_PROJECT_ID'"
               }
           }
       }
   }' \
   -i "https://infra.mail.ru:5000/v3/auth/tokens" | grep -i '^x-subject-token'| cut -d ':' -f 1,2
   ```

   Пример команды для метода `token`:   

   ```console
   curl -X POST \
   -H "Content-Type: application/json" \
   -d '{
       "auth": {
           "identity": {
               "methods": [
                   "token"
               ],
               "token": {
                  "id": "'$OS_TOKEN'"
               }
           },
           "scope": {
               "project": {
                   "id": "'$OS_PROJECT_ID'"
               }
           }
       }
   }' \
   -i "https://infra.mail.ru:5000/v3/auth/tokens" | grep -i '^x-subject-token'| cut -d ':' -f 1,2
   ```
   {/tab}
    
   {tab(Windows (cmd))}

   Пример команды для метода `password`:

   ```console
   curl -X POST ^
   -H "Content-Type: application/json" ^
   -d "{\"auth\": {\"identity\": {\"methods\": [\"password\"], \"password\": {\"user\": {\"domain\": {\"name\": \"%OS_USER_DOMAIN_NAME%\"}, \"name\": \"%OS_USERNAME%\",\"password\": \"%OS_PASSWORD%\"}}}, \"scope\": {\"project\": {\"id\": \"%OS_PROJECT_ID%\"}}}}" ^
   -i "https://infra.mail.ru:5000/v3/auth/tokens" | findstr /B x-subject-token | findstr x-subject-token
   ```

   Пример команды для метода `token`:

   ```console
   curl -X POST ^
   -H "Content-Type: application/json" ^
   -d "{\"auth\": {\"identity\": {\"methods\": [\"token\"], \"token\": {\"id\": \"%$OS_TOKEN%\"}}, \"scope\": {\"project\": {\"id\": \"%OS_PROJECT_ID%\"}}}}" ^
   -i "https://infra.mail.ru:5000/v3/auth/tokens" | findstr /B x-subject-token | findstr x-subject-token
   ```
   
   {/tab}
    
   {/tabs}

Значение токена будет выведено в параметре `x-subject-token`.

{cut(Примеры ответов на запрос получения токена)}

{tabs}

{tab(Linux)}

```console
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 27038  100 26470  100   568  99259   2129 --:--:-- --:--:-- --:--:-- 99138
x-subject-token: <ЗНАЧЕНИЕ_ТОКЕНА>
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
{/ifdef}

{/tabs}
{/includetag}

{includetag(api-token-reissue)}
После завершения времени действия токена его можно перевыпустить в личном кабинете:

1. Нажмите на имя пользователя в шапке страницы и выберите пункт **Настройки проекта**.
1. Перейдите на вкладку **Доступ по API**.
1. В нижней части экрана нажмите кнопку **Перевыпустить**.
{/includetag}

{includetag(api-token-example)}
Задача: получить список сетей через REST API (сервис Neutron).

1. В личном кабинете [посмотрите](https://msk.cloud.vk.com/app/project/endpoints) эндпоинт, по которому выполняется запрос к сервису Neutron. В этом примере: `https://infra.mail.ru:9696`.
1. {linkto(#rest-api-keystone-token-gen)[text=Получите токен]}: сгенерируйте новый токен или скопируйте значение действующего токена.
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
           }
       ]
   }
   ```

   {/cut}

Другие примеры использования токена:

- {linkto(../../api-spec/logging#api-spec-logging)[text=просмотр логов]} в сервисе Cloud Logging;
- {linkto(../../api-spec/network-api/api-dns#api-spec-dns)[text=работа]} с публичным DNS.

{/includetag}