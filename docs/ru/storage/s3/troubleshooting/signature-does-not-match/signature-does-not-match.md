При обращении к объектному хранилищу по API или с помощью AWS CLI возвращается ошибка:

```console
An error occurred (SignatureDoesNotMatch) when calling the... 
operation: The request signature we calculated does not match the signature you provided. 
Check your key and signing method`.
```

Эта ошибка указывает на то, что подпись запроса (signature) не совпадает с той, которую ожидает сервер. Причина обычно связана с конфигурацией клиентского окружения.

### Решение

1. Убедитесь, что в параметре `--endpoint-url` для вызываемой команды домен сервиса указан верно и соответствует [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта VK Object Storage:

    - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
    - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

1. Убедитесь, что **Access Key ID** и **Secret Access Key** заданы в файле конфигурации `~/.aws/credentials` без опечаток, лишних пробелов или других символов. Также проверьте, не переопределяют ли переменные окружения (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) значения из файла конфигурации. 
   
   Чтобы исключить ошибку в ключах доступа, создайте новую пару **Access Key ID** и **Secret Access Key** для вашего [аккаунта VK Object Storage](/ru/storage/s3/instructions/access-management/access-keys).

1. Убедитесь, что системное время синхронизировано с сервером точного времени (NTP). 

   {note:info}
   Если системное время отличается от серверного более чем на 15 минут, подпись будет считаться недействительной.
   {/note}

   Чтобы принудительно синхронизировать время, выполните команду:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   sudo timedatectl set-ntp true
   ```

   {/tab}

   {tab(Windows)}

   ```console
   w32tm /resync
   ```

   {/tab}

   {/tabs}

1. Чтобы получить подробную информацию о формировании запроса и выявить причину ошибки, добавьте флаг `--debug` к команде AWS CLI. 

1. Если проблема сохраняется, обратитесь в [техническую поддержку](/ru/contacts).