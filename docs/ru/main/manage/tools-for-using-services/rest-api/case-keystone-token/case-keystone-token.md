Токен Keystone нужен для доступа к API и ресурсам VK Cloud.

Чтобы получить токен:

1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
1. Убедитесь, что [включена](/ru/base/account/instructions/account-manage/manage-2fa) двухфакторная аутентификация и [активирован](/ru/manage/tools-for-using-services/rest-api/enable-api) доступ по API.
1. Выберите проект, в котором планируется использовать токен.
1. Получите данные проекта и пользователя, для которого генерируется токен:

   1. В личном кабинете перейдите в раздел [Настройки проекта](https://mcs.mail.ru/app/project/keys/).
   1. Нажмите кнопку **Скачать openrc версии 3**. Будет загружен файл вида `<название проекта>-openrc.sh`.

1. Загрузите полученные данные в переменные окружения.

   <tabs>
   <tablist>
   <tab>Linux</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   1. Запустите скачанный файл:

      ```bash
      source <название проекта>-openrc.sh
      ```

   1. Введите пароль пользователя проекта.

   </tabpanel>
   <tabpanel>

   1. Откройте скачанный файл в текстовом редакторе и скопируйте значения параметров из него.
   2. Загрузите скопированные параметры в переменные окружения. Также загрузите переменную `OS_PASSWORD`.

      ```powershell
      set OS_PROJECT_ID=<OS_PROJECT_ID>
      set OS_REGION_NAME=<OS_REGION_NAME>
      set OS_USER_DOMAIN_NAME=<OS_USER_DOMAIN_NAME>
      set OS_USERNAME=<OS_USERNAME>
      set OS_PASSWORD=<пароль пользователя>
      ```

   </tabpanel>
   </tabs>

1. Получите токен одним из способов.

   - С помощью OpenStack CLI:

      1. Убедитесь, что у вас [установлен](/ru/base/account/project/cli/setup) клиент OpenStack.
      2. Выполните команду:

         ```
         openstack token issue -c id -f value
         ```

         Значение токена будет выведено в консоль.

   - Используйте [утилиту](https://github.com/curl/curl/blob/master/docs/INSTALL.md) cURL:

      <tabs>
      <tablist>
      <tab>Linux</tab>
      <tab>Windows</tab>
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
      -i "https://infra.mail.ru:35357/v3/auth/tokens"
      ```

      </tabpanel>
      <tabpanel>

      ```bash
      curl -X POST ^
      -H "Content-Type: application/json" ^
      -d "{\"auth\": {\"identity\": {\"methods\": [\"password\"], \"password\": {\"user\": {\"domain\": {\"id\": \"%OS_USER_DOMAIN_NAME%\"}, \"name\": \"%OS_USERNAME%\",\"password\": \"%OS_PASSWORD%\"}}}, \"scope\": {\"project\": {\"id\": \"%OS_PROJECT_ID%\"}}}}" ^
      -i "https://infra.mail.ru:35357/v3/auth/tokens"
      ```

      </tabpanel>
      </tabs>

      Значение токена будет выведено в параметре `X-Subject-Token`.

      <details>
      <summary markdown="span">Пример ответа на запрос для получения токена</summary>

      ```bash
      HTTP/1.1 201 Created

      date: Wed, 18 Jan 2023 15:02:04 GMT
      server: Apache/2.4.6 (CentOS) mod_wsgi/3.4 Python/2.7.5

      X-Subject-Token: XXXXXXXXXnsH_iUvos_UFSveInsHgPAKnBefJn_TghGVIBjDEDo4vLYU9xWnDrVIBp3el87i5vtrknja14Gcgc9uTgXdRyr3hm8isz8iAPp5FEq27-WLZQAwfhCfGB4sNdlpAjWYZrNYmUbglgqzoTqqwQXXXXXXX

      vary: X-Auth-Token
      x-openstack-request-id: req-7de8bc92-0000-0000-0000-906e6e63f956
      content-length: 322
      content-type: application/json
      set-cookie: PROXYSRV_ADMIN=acadfd0285XXXXXX|XXXXX|XXXXX; path=/; Secure
      connection: close

      {"token": {"issued_at": "2023-01-18T15:02:04.000000Z", "audit_ids": ["XXXX-iu5TeiUOU66VNO_-g"], "methods": ["password"], "expires_at": "2023-01-18T16:02:04.000000Z", "user": {"password_expires_at": null, "domain": {"id": "users", "name": "users"}, "id": "00000000000000XXX", "name": "example@example.ex"}}}
      ```

      </details>

<warn>

Полученный токен действителен в течение одного часа.

</warn>

## Пример использования токена

Задача: получить список сетей через REST API (сервис Neutron).

1. В личном кабинете [посмотрите](https://mcs.mail.ru/app/project/endpoints) эндпоинт, по которому выполняется запрос к сервису Neutron. В данном примере это `https://infra.mail.ru:9696`.
1. Получите токен и скопируйте его значение.
1. Выполните команду с помощью утилиты cURL:

   ```bash
   curl https://infra.mail.ru:9696/v2.0/networks -H "Accept: application/json" -H "X-Auth-Token: <токен, сгенерированный на предыдущем шаге>"
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
