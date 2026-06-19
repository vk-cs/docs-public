# {heading(При работе с бакетом через AWS CLI возникает ошибка NoSuchBucket)[id=s3-no-such-bucket]}

При выполнении команды в AWS CLI для существующего бакета возвращается ошибка `An error occurred (NoSuchBucket) when calling the... operation: The specified bucket does not exist`.

Проблема может возникать по нескольким причинам: 

- опечатки в имени бакета;
- регион в конфигурации AWS CLI не соответствует {ifdef(public)}{linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта {/ifdef}{ifdef(s3,s3-pdf)}региону вашей инсталляции {var(s3)}{/ifdef};
- домен сервиса {var(s3)} не указан в команде или указан не верно.

### {heading(Решение)[id=s3-no-such-bucket-resolve]}

1. Убедитесь, что имя бакета указано верно.
   {ifdef(public)}
1. Убедитесь, что в параметре команды `--endpoint-url` домен сервиса указан верно и соответствует {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта {var(s3)}:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   {/ifdef}
   {ifdef(s3,s3-pdf)}
1. Убедитесь, что в параметре команды `--endpoint-url` домен сервиса указан верно.
   {/ifdef}
1. Проверьте конфигурацию AWS CLI:

   ```console
   aws configure list
   ```
   {ifdef(public)}
   Ответ должен содержать в поле `region` одно из значений, соответствующее {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта {var(s3)}:

   - `ru-msk` — для региона Москва;
   - `kz-ast` — для региона Казахстан.
   {/ifdef}

   {ifdef(s3,s3-pdf)}
   Ответ должен содержать в поле `region` код региона, используемый в вашей инсталляции. По умолчанию: `ru-msk`.
   {/ifdef}

1. Если значение поля `region` некорректно, измените настройки AWS CLI:

   1. Выполните команду:
    
      ```console
      aws configure
      ```
      
   1. Заполните значения параметров:

      - `AWS Access Key ID`: введите значение **Access Key ID** для вашего {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys)[text=аккаунта {var(s3)}]}.
      - `AWS Secret Access Key`: введите значение **Secret Key** для вашего {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys)[text=аккаунта {var(s3)}]}.
      - `Default region name`: введите {ifdef(public)}`ru-msk` или `kz-ast`{/ifdef}{ifdef(s3,s3-pdf)}код региона, используемый в вашей инсталляции. По умолчанию: `ru-msk`{/ifdef}.
      - `Default output format`: введите `json`.