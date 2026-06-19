# {heading(Списки управления доступом)[id=s3-instructions-acl]}

## {heading(Получение ACL бакета)[id=s3-instructions-bucket-acl-view]} 

{tabs}

{tab(AWS CLI)}

1. Настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если этого не было сделано ранее.
1. В консоли выполните команду:

   ```console
   aws s3api get-bucket-acl --bucket <ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
   ```
   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, ACL которого нужно получить.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

   {cut(Пример команды)}

   Пример команды вывода ACL бакета `kuber_backup`:

   ```console
   aws s3api get-bucket-acl --output text --no-cli-pager --bucket kuber_backup --endpoint-url https://hb.vkcloud-storage.ru
   ```
   {/cut}

   Полная информация о команде `get-bucket-acl` доступна на [сайте разработчика](https://docs.aws.amazon.com/cli/latest/reference/s3api/get-bucket-acl.html).

{/tab}

{tab(API)}

Воспользуйтесь методом `GET /?acl` {linkto(../../../api/acl#api-spec-s3-get-bucket-acl)[text=REST API сервиса]}.

{/tab}

{/tabs}

## {heading(Получение ACL объекта)[id=s3-instructions-object-acl-view]} 

{tabs}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. В консоли выполните команду:

   ```console
   aws s3api get-object-acl --bucket <ИМЯ_БАКЕТА> --key <КЛЮЧ_ОБЪЕКТА> --endpoint-url <ENDPOINT_URL>
   ```
   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого нужно установить ACL.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

   {cut(Пример команды)}

   Пример команды вывода ACL для объекта `backups/keycloak/keycloak.tar.gz` в бакете `kuber_backup`:

   ```console
   aws s3api get-object-acl --output text --no-cli-pager --bucket kuber_backup --key backups/keycloak/keycloak.tar.gz --endpoint-url https://hb.vkcloud-storage.ru
   ```
   {/cut}

   Полная информация о команде `get-object-acl` доступна на [сайте разработчика](https://docs.aws.amazon.com/cli/latest/reference/s3api/get-object-acl.html).

{/tab}

{tab(API)}

Воспользуйтесь методом `GET /{object}?acl` {linkto(../../../api/acl#api-spec-s3-get-object-acl)[text=REST API сервиса]}.

{/tab}

{/tabs}

## {heading(Установка ACL для бакета)[id=s3-instructions-bucket-acl-add]}

### {heading(Установка конфигурации ACL для бакета)[id=s3-instructions-bucket-acl-add-config]}

{tabs}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Подготовьте файл с {linkto(../../../api/acl#api-spec-s3-acl-request-body)[text=конфигурацией ACL]}.
1. В консоли выполните команду:

   ```console
   aws s3api put-bucket-acl --bucket <ИМЯ_БАКЕТА>  --access-control-policy file://<ИМЯ_ФАЙЛА>.xml --endpoint-url <ENDPOINT_URL>
   ```
   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого нужно установить ACL.
   - `<ИМЯ_ФАЙЛА>` — имя файла с конфигурацией ACL.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

   {cut(Пример команды)}

   Пример команды установки ACL для бакета `kuber_backup`:

   ```console
   aws s3api put-object-acl --output text --no-cli-pager --bucket kuber_backup --access-control-policy file://acl.xml --endpoint-url https://hb.vkcloud-storage.ru
   ```
   
   Пример файла конфигурации ACL в формате XML для выдачи прав на чтение (`WRITE`) проекту `friend_project_canonical_id`:

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <AccessControlPolicy xmlns="https://<ИМЯ_БАКЕТА>.hb.vkcloud-storage.ru">
     <Owner>
       <ID>***Owner-Canonical-User-ID***</ID>
       <DisplayName>owner-display-name</DisplayName>
     </Owner>
     <AccessControlList>
       <Grant>
         <Grantee xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Canonical User">
           <ID>friend_project_canonical_id</ID>
           <DisplayName>friend_project@vkcloud-storage.ru</DisplayName>
         </Grantee>
         <Permission>WRITE</Permission>
       </Grant>
     </AccessControlList>
   </AccessControlPolicy>
   ```
   {/cut}

   Полная информация о команде `put-bucket-acl` доступна на [сайте разработчика](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-bucket-acl.html).

{/tab}

{tab(API)}

Воспользуйтесь методом `PUT /?acl` {linkto(../../../api/acl#api-spec-s3-put-bucket-acl)[text=REST API сервиса]}.

{/tab}

{/tabs}

### {heading(Установка предопределенного ACL для бакета)[id=s3-instructions-bucket-acl-add-preset]}

{tabs}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Выполните команду:

   ```console
   aws s3api put-bucket-acl \
       --bucket <ИМЯ_БАКЕТА> \
       --acl <ПРЕДОПРЕДЕЛЕННЫЙ_ACL> \
       --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого нужно установить ACL.
   - `<ПРЕДОПРЕДЕЛЕННЫЙ_ACL>` — название {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=стандартного ACL]}, который нужно установить для бакета.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

{/tab}

{tab(API)}

Воспользуйтесь методом `PUT /?acl` {linkto(../../../api/acl#api-spec-s3-put-bucket-acl)[text=REST API сервиса]}.

{/tab}

{/tabs}

### {heading(Установка отдельных разрешений ACL для бакета)[id=s3-instructions-bucket-acl-add-permission]}

{tabs}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Выполните команду:

   ```console
   aws s3api put-bucket-acl \
       --bucket <ИМЯ_БАКЕТА> \
       --<ВИД_РАЗРЕШЕНИЯ> <ПОЛУЧАТЕЛЬ_РАЗРЕШЕНИЯ> \
       --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого нужно установить ACL.
   - `<ВИД_РАЗРЕШЕНИЯ>` — могут быть следующими:

     - `--grant-read` — для бакета будет установлено {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=разрешение]} `READ`.
     - `--grant-write` — для бакета будет установлено {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=разрешение]} `WRITE`.
     - `--grant-read-acp` — для бакета будет установлено {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=разрешение]} `READ_ACP`.
     - `--grant-write-acp` — для бакета будет установлено {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=разрешение]} `WRITE_ACP`.
     - `--grant-full-control` — для бакета будет установлено {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=разрешение]} `FULL_CONTROL`.
      
   - `<ПОЛУЧАТЕЛЬ_РАЗРЕШЕНИЯ>` — {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permittees)[text=получатель]}, которому будет предоставлено разрешение для бакета.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

{/tab}

{tab(API)}

Воспользуйтесь методом `PUT /?acl`{linkto(../../../api/acl#api-spec-s3-put-bucket-acl)[text=REST API сервиса]}.

{/tab}

{/tabs}

## {heading(Установка ACL для объекта)[id=s3-instructions-object-acl-add]}

### {heading(Установка конфигурации ACL для объекта)[id=s3-instructions-object-acl-add-config]}

{tabs}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Подготовьте файл с {linkto(../../../api/acl#api-spec-s3-acl-request-body)[text=конфигурацией ACL]}.
1. В консоли выполните команду:

   ```console
   aws s3api put-object-acl --bucket <ИМЯ_БАКЕТА> --key <КЛЮЧ_ОБЪЕКТА> --access-control-policy file://<ИМЯ_ФАЙЛА>.xml --endpoint-url <ENDPOINT_URL>
   ```
   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором расположен объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, для которого нужно установить ACL, включая путь до него.
   - `<ИМЯ_ФАЙЛА>` — имя файла с конфигурацией ACL.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

   {cut(Пример команды)}

   Пример команды установки ACL для объекта `backups/keycloak/keycloak.tar.gz` в бакете `kuber_backup`:

   ```console
   aws s3api put-object-acl --bucket kuber_backup --key backups/keycloak/keycloak.tar.gz --access-control-policy file://acl.json --endpoint-url https://hb.vkcloud-storage.ru
   ```

   Пример файла конфигурации ACL в формате JSON для выдачи пользователям полного доступа (`FULL_CONTROL`):

   ```json
   {
      "Owner": {
         "DisplayName": "mcs8274534762",
         "ID": "f2041b20-d081-43a3-a0d9-b73a37eedbc1"
      },
      "Grants": [
         {
            "Grantee": {
               "ID": "f2041b20-d081-43a3-a0d9-b73a37eedbc1",
               "DisplayName": "mcs8274534762",
                  "Type": "CanonicalUser"
            },
            "Permission": "FULL_CONTROL"
         },
         {
            "Grantee": {
               "ID": "d44e3594-0701-449b-890c-3e23c5d55fb7",
               "DisplayName": "NAME_OF_USER",
                  "Type": "CanonicalUser"
            },
            "Permission": "FULL_CONTROL"
         }
      ]
   }
   ```
   {/cut}

   Полная информация о команде `put-object-acl` доступна на [сайте разработчика](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-object-acl.html).

{/tab}

{tab(API)}

Воспользуйтесь методом `PUT /{object}?acl` {linkto(../../../api/acl#api-spec-s3-put-object-acl)[text=REST API сервиса]}.

{/tab}

{/tabs}

### {heading(Установка предопределенного ACL для объекта)[id=s3-instructions-object-acl-add-preset]}

{tabs}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Выполните команду:

   ```console
   aws s3api put-object-acl \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --acl <ПРЕДОПРЕДЕЛЕННЫЙ_ACL> \
     --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором расположен объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, для которого нужно установить ACL, включая путь до него.
   - `<ПРЕДОПРЕДЕЛЕННЫЙ_ACL>` — название {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=стандартного ACL]}, который нужно установить для объекта.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

{/tab}

{tab(API)}

Воспользуйтесь методом `PUT /{object}?acl` {linkto(../../../api/acl#api-spec-s3-put-object-acl)[text=REST API сервиса]}.

{/tab}

{/tabs}

### {heading(Установка отдельных разрешений ACL для объекта)[id=s3-instructions-object-acl-add-permission]}

{tabs}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Выполните команду:

   ```console
   aws s3api put-object-acl \
     --endpoint-url <ENDPOINT_URL> \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     <ВИД_РАЗРЕШЕНИЯ> <ПОЛУЧАТЕЛЬ_РАЗРЕШЕНИЯ>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором расположен объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, для которого нужно установить ACL, включая путь до него.
   - `<ВИД_РАЗРЕШЕНИЯ>` — могут быть следующими:

     - `--grant-read` — для объекта будет установлено {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=разрешение]} `READ`.
     - `--grant-write` — для объекта будет установлено {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=разрешение]} `WRITE`.
     - `--grant-read-acp` — для объекта будет установлено {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=разрешение]} `READ_ACP`.
     - `--grant-write-acp` — для объекта будет установлено {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=разрешение]} `WRITE_ACP`.
     - `--grant-full-control` — для объекта будет установлено {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=разрешение]} `FULL_CONTROL`.

   - `<ПОЛУЧАТЕЛЬ_РАЗРЕШЕНИЯ>` — {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-permittees)[text=получатель]}, которому будет предоставлено разрешение для объекта.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

{/tab}

{tab(API)}

Воспользуйтесь методом `PUT /{object}?acl` {linkto(../../../api/acl#api-spec-s3-put-object-acl)[text=REST API сервиса]}.

{/tab}

{/tabs}
