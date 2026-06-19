# {heading(Управление бакетом)[id=s3-instructions-manage-bucket]}

## {heading(Просмотр списка бакетов)[id=s3-instructions-manage-bucket-view]}

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**. Откроется список бакетов в проекте.
1. (Опционально) Отсортируйте список по имени бакета, используя стрелки в заголовке соответствующего столбца.

   - Порядок при сортировке по возрастанию:  `a`–`z` / `-` / `.` / `0`–`9`.
   - Порядок при сортировке по убыванию:  `9`–`0` / `.` / `-` / `z`–`a`.

   {note:warn}
   Сортировка действует не на весь список целиком, а только на ту его часть, которая выведена на экран.
   {/note}

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файловый менеджер)}

{note:warn}
Здесь и далее мы используем файловый менеджер «CloudBerry Explorer for Amazon S3». Если вы используете другой файловый менеджер, интерфейс и названия его элементов могут отличаться от используемых в данной инструкции.
{/note}

Вы можете просматривать и настраивать свойства бакетов {var(s3)}, включая параметры управления версиями, теги, шифрование по умолчанию, ведение журнала, уведомления и многое другое.

Чтобы просмотреть свойства бакета при помощи файлового менеджера, выполните следующие действия:

1. На панели файлового менеджера, в которой открыт ваш проект выберите нужный бакет и вызовите контекстное меню правой кнопкой мыши. В контекстном меню выберите пункт **Properties**.
1. В открывшемся окне доступны для просмотра свойства бакета.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. В консоли выполните команду:

   ```console
   aws s3 ls --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

   {cut(Пример команды просмотра списка бакетов)}

   Пример команды:

   ```console
   aws s3 ls --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```console
   2022-12-27 13:55:01 bucket-1
   2024-04-17 12:44:31 bucket-2
   2024-03-11 13:38:27 bucket-3
   2024-03-18 16:00:57 bucket-4
   ```

   {/cut}

Описание всех параметров для команды вывода списка бакетов доступно в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/ls.html).

{/tab}

{tab(Golang SDK)}

1. Установите и настройте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} для Go, если он еще не установлен.
1. Добавьте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=реквизиты подключения]} к {var(s3)} в переменные окружения или конфигурационный файл, если этого не было сделано ранее.
1. Добавьте код в свой проект:

   ```go
   package main

   import (
	   "github.com/aws/aws-sdk-go/aws"
	   "github.com/aws/aws-sdk-go/aws/session"
	   "github.com/aws/aws-sdk-go/service/s3"
	   "log"
   )

   const (
	   vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcloud-storage.ru"
	   defaultRegion = "ru-msk"
   )

   func main() {
	   // Создание сессии
	   sess, _ := session.NewSession()

	   // Подключение к сервису VK Object Storage
	   svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	   if res, err := svc.ListBuckets(nil); err != nil {
           log.Fatalf("Unable to list buckets, %v", err)
	   } else {
	       for _, b := range res.Buckets {
		       log.Printf("* %s created on %s \n", aws.StringValue(b.Name), aws.TimeValue(b.CreationDate))
		   }
	   }
   }
   ```
   {ifdef(public)} 
   Значения переменных `vkCloudHotboxEndpoint` и `defaultRegion` должны соответствовать [региону](../../../../../tools-for-using-services/account/concepts/regions) аккаунта:

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

   - `defaultRegion`:

      - `ru-msk` — для региона Москва;
      - `kz-ast` — для региона Казахстан.
   {/ifdef}

Команда `ListBuckets` подробно описана в [официальной документации к библиотеке aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.ListBuckets).

{/tab}

{tab(Python SDK)}

1. Установите и настройте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} для Python, если он еще не установлен.
1. Добавьте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=реквизиты подключения]} к {var(s3)} в переменные окружения или конфигурационный файл, если этого не было сделано ранее.
1. Добавьте код в свой проект:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   response = s3_client.list_buckets()
   print(response)

   for key in response['Buckets']:
     print(key['Name'])
   ```
   {ifdef(public)}
   Значение переменной `endpoint_url` должно соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
   {/ifdef}

Команда `list_buckets` подробно описана в [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/client/list_buckets.html).

{/tab}

{/tabs}

## {heading(Привязка домена)[id=s3-instructions-manage-bucket-domain]}

Привязка домена к бакету позволит получить доступ к объектам бакета через ваш домен, а также использовать бакет в качестве репозитория вашего сайта.

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

1. Зарегистрируйте домен у любого регистратора доменных имен, если этого не было сделано ранее. Привязать можно только домен третьего уровня и выше, например: `mysite.mycompany.ru`, `my.site.mycompany.ru`.

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект, где находится нужный бакет.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Перейдите в настройки бакета одним из способов:

   - Нажмите ![ ](../../../assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
   - Нажмите на имя нужного бакета, затем на странице бакета нажмите кнопку ![ ](../../../assets/settings-icon.svg "inline").

1. Перейдите на вкладку **Домен** и нажмите кнопку ![plus-icon](../../../assets/plus-icon.svg "inline") **Привязать домен**.
1. В открывшемся окне скопируйте значение для CNAME-записи вида `<ИМЯ_БАКЕТА>.<ENDPOINT_ДОМЕН>`. Пример записи: `mybucket.hb.ru-msk.vkcloud-storage.ru`.
1. Перейдите в личный кабинет провайдера вашего домена. Добавьте для вашего домена любую CNAME-запись, в качестве значения записи добавьте скопированный текст.
1. Подождите, пока изменения вступят в силу. Обычно это занимает 15–20 минут.
1. Вернитесь в личный кабинет {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef}. В поле **Домен** укажите имя вашего домена.

После привязки бакет будет доступен по ссылке вида `http://<ИМЯ_БАКЕТА>.<ИМЯ_ДОМЕНА>`, например `http://mybucket.mysite.mycompany.ru`.

{/tab}

{/tabs}

{note:warn}
Если имя бакета содержит точку, он будет доступен только при использовании протокола HTTP. Чтобы использовать HTTPS-протокол, установите SSL-сертификат.
{/note}

{ifdef(public)}

## {heading(Использование CDN)[id=s3-instructions-manage-bucket-cdn]}

{include(../../../_includes/_s3-create-cdn.md)[tags=s3_create_cdn_all,s3_create_cdn_s3]}

{/ifdef}

## {heading(Синхронизация локальной директории с бакетом)[id=s3-instructions-manage-bucket-sync]}

{var(s3)} позволяет синхронизировать объекты бакета и файлы локальной директории. При синхронизации {var(s3)} проверяет наличие файла или объекта, их размер и дату последнего изменения. Сравнение происходит в момент выполнения команды или запроса. В зависимости от команды или запроса обновляется содержимое либо бакета, либо локальной директории.

{tabs}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. В консоли перейдите в локальную директорию, которую нужно синхронизировать с бакетом.
1. В консоли выполните команду:

   - Чтобы обновить локальную директорию в соответствии с бакетом:

     ```console
     aws s3 sync s3://<ИМЯ_БАКЕТА> . --endpoint-url <ENDPOINT_URL>
     ```
   - Чтобы обновить бакет в соответствии с локальной директорией:

     ```console
     aws s3 sync . s3://<ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
     ```
       {ifdef(public)}
     - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
       {/ifdef}
       {ifdef(s3,s3-pdf)}
     - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
       {/ifdef}

   {cut(Пример команды обновления локальной директории в соответствии с бакетом)}

   Пример команды:

   ```console
   aws s3 sync s3://example-bucket . --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```console
   download: s3://example-bucket/my-object.pdf to .\my-object.pdf
   ```

   {/cut}

   {cut(Пример команды обновления бакета в соответствии с локальной директорией)}

   Пример команды:

   ```console
   aws s3 sync . s3://example-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```console
   upload: .\my-file.svg to s3://example-bucket/my-file.svg
   ```

   {/cut}

{/tab}

{/tabs}

## {heading(Удаление бакета)[id=s3-instructions-manage-bucket-delete]}

{ifdef(public)}

{note:warn}
Бакет с классом хранения Backup удалить нельзя. Удалить содержащиеся в нем объекты можно через сервис резервного копирования.
{/note}

{/ifdef}

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

Это групповая операция: при необходимости можно удалить сразу несколько бакетов, выбрав их с помощью флажков.

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект, где находится нужный бакет.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. {linkto(../../objects/manage-object#s3-instructions-manage-object-delete)[text=Удалите объекты]} из бакета, который нужно удалить, если этого не было сделано ранее.
1. Удалите бакет одним из способов:

   - Нажмите ![ ](../../../assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Удалить**.
   - Выберите бакет с помощью флажка, затем нажмите кнопку ![trash-icon](../../../assets/trash-icon.svg "inline") **Удалить**.

1. Подтвердите удаление.

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файловый менеджер)}

{note:warn}
Здесь и далее мы используем файловый менеджер «CloudBerry Explorer for Amazon S3». Если вы используете другой файловый менеджер, интерфейс и названия его элементов могут отличаться от используемых в данной инструкции.
{/note}

1. На панели файлового менеджера, в которой открыт ваш проект, выберите нужный бакет и вызовите контекстное меню правой кнопкой мыши. В контекстном меню выберите пункт **Delete**.
1. Затем подтвердите удаление в диалоговом окне нажав кнопку **Yes**.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. В консоли выполните команду:

   ```console
   aws s3 rb s3://<ИМЯ_БАКЕТА> --force --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - (Опционально) `force` — удаляет бакет и все объекты в нем. Без этого параметра бакет будет удален, только если не содержит объектов.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — домен сервиса {var(s3)}, должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

   {cut(Пример команды удаления бакета и всех объектов в нем)}

   Пример команды:

   ```console
   aws s3 rb s3://example-bucket --force --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```console
   delete: s3://example-bucket/images/picture-1.jpg
   delete: s3://example-bucket/images/picture-2.jpg
   delete: s3://example-bucket/input/
   remove_bucket: example-bucket
   ```

   {/cut}

Описание всех параметров команды удаления бакета доступно в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/rb.html).

{/tab}

{/tabs}
