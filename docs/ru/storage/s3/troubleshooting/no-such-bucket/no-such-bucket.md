При выполнении команды в AWS CLI для существующего бакета возвращается ошибка `An error occurred (NoSuchBucket) when calling the... operation: The specified bucket does not exist`.

Проблема может возникать по нескольким причинам: 

- опечатки в имени бакета;
- регион в конфигурации AWS CLI не соответствует [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта VK Object Storage;
- домен сервиса VK Object Storage не указан в команде или указан не верно.

### Решение

1. Убедитесь, что имя бакета указано верно.

1. Убедитесь, что в параметре команды `--endpoint-url` домен сервиса указан верно и соответствует [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта VK Object Storage:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

1. Проверьте конфигурацию AWS CLI:

   ```console
   aws configure list
   ```
   
   Ответ должен содержать в поле `region` одно из значений, соответствующее [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта VK Object Storage:

   - `ru-msk` — для региона Москва;
   - `kz-ast` — для региона Казахстан.

1. Если значение поля `region` отличается от указанных, измените настройки AWS CLI:

   1. Выполните команду:
   
      ```console
      aws configure
      ```
      
   1. Заполните значения параметров:

      - `AWS Access Key ID`: введите значение **Access Key ID** для вашего [аккаунта VK Object Storage](/ru/storage/s3/instructions/access-management/access-keys);
      - `AWS Secret Access Key`: введите значение **Secret Key** для вашего [аккаунта VK Object Storage](/ru/storage/s3/instructions/access-management/access-keys);
      - `Default region name`: введите `ru-msk` или `kz-ast`;
      - `Default output format`: введите `json`.