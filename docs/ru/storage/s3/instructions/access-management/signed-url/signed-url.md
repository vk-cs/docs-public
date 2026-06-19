# {heading(Составление подписанного URL)[id=s3-instructions-signed-url]}

{linkto(../../../concepts/access/signed-url#s3-concepts-signed-url)[text=Подписанный URL]} предоставляет стороннему пользователю ограниченный по времени доступ на скачивание объекта.

Чтобы сгенерировать подписанный URL:

{tabs}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. В консоли выполните команду:

   ```console
   aws s3 presign s3://<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА> --endpoint-url <ENDPOINT_URL> --expires-in <СРОК_ДЕЙСТВИЯ>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}
   - `<СРОК_ДЕЙСТВИЯ>` — время действия доступа в секундах. Если не указано, ссылка будет действовать 3600 секунд.

   {cut(Пример команды формирования подписанного URL)}

   Пример команды:

   ```console
   aws s3 presign s3://my-bucket/my-object.png --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --expires-in 300000
   ```

   Пример ответа:

   ```http
   https://hb.ru-msk.vkcloud-storage.ru/dd-winscp/usetech.ico?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=4TucX9HhP8RZveR9Cb3vGr%2F20231113%2Fru-msk%2Fs3%2Faws4_request&X-Amz-Date=20231113T104239Z&X-Amz-Expires=300000&X-Amz-SignedHeaders=host&X-Amz-Signature=5a7c4d87d12dd12f8f420ffaed84328f1d6a79050818fd4c615b219ce7bc18e9
   ```

   {/cut}

Описание доступных параметров для команды формирования подписанного URL — в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/presign.html).

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файловый менеджер)}

{note:warn}
Здесь и далее мы используем файловый менеджер «CloudBerry Explorer for Amazon S3». Если вы используете другой файловый менеджер, интерфейс и названия его элементов могут отличаться от используемых в данной инструкции.
{/note}

1. Выберите в бакете нужный файл и вызовите для него контекстное меню правой кнопкой мыши.

   Или выберите нужный файл и нажмите кнопку **Web URL** на панели инструментов файлового менеджера.

1. Далее в открывшемся диалогом окне задайте срок окончания действия URL и нажмите кнопку **Generate**.

{/tab}

{/ifdef}

{tab(Golang SDK)}

1. Установите и настройте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} для Go, если он еще не установлен.
1. Добавьте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=реквизиты подключения]} к {var(s3)} в переменные окружения или конфигурационный файл, если этого не было сделано ранее.
1. Добавьте код в свой проект:

   ```go
   package main

   import (
	   "context"
	   "fmt"
	   "github.com/aws/aws-sdk-go-v2/aws"
	   "github.com/aws/aws-sdk-go-v2/config"
	   "github.com/aws/aws-sdk-go-v2/service/s3"
	   "log"
	   "os"
	   "time"
   )

   const (
	   vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcloud-storage.ru"
	   defaultRegion         = "ru-msk"
   )

   func main() {
	   cfg, err := config.LoadDefaultConfig(context.TODO())
	   if err != nil {
		   fmt.Printf("Error loading default config: %v", err)
		   os.Exit(0)
	   }

	   client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		   o.BaseEndpoint = aws.String(vkCloudHotboxEndpoint)
		   o.Region = defaultRegion
	   })

	   presigner := s3.NewPresignClient(client)
	   // имя бакета, где находится объект
	   bucketName := "my-bucket"
	   // имя объекта
	   objectKey := "picture.png"
	   lifeTimeSeconds := int64(60)

	   request, err := presigner.PresignGetObject(context.TODO(), &s3.GetObjectInput{
		   Bucket: aws.String(bucketName),
		   Key:    aws.String(objectKey),
	   }, func(opts *s3.PresignOptions) {
		   opts.Expires = time.Duration(lifeTimeSeconds * int64(time.Second))
	   })

	   if err != nil {
		   log.Printf("Couldn't get a presigned request to get %v:%v. Error: %v\n",
			   bucketName, objectKey, err)
	   }

	   fmt.Printf("%s", request.URL)
   }
   ```
   {ifdef(public)}
   Значение переменной `vkCloudHotboxEndpoint` должно соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   {/ifdef}

{/tab}

{tab(Python SDK)}

1. Установите и настройте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} для Python, если он еще не установлен.
1. Добавьте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=реквизиты подключения]} к {var(s3)} в переменные окружения или конфигурационный файл, если этого не было сделано ранее.
1. Добавьте код в свой проект:

   ```python
   import argparse
   import logging
   import boto3
   from botocore.exceptions import ClientError
   import requests

   def create_presigned_url(s3_client, bucket_name, object_name, expiration=60):
      try:
         response = s3_client.generate_presigned_url('get_object',
                                                      Params={'Bucket': bucket_name,
                                                            'Key': object_name},
                                                      ExpiresIn=expiration)
      except ClientError as e:
         logging.error(e)
         return None

      return response

   logger = logging.getLogger(__name__)
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   request = create_presigned_url(s3_client, "my-bucket", "picture.png")

   if request is not None:
      url = requests.get(request)
      print("url is ", request)
   else:
      print("Error creating link")
   ```
   {ifdef(public)}
   Значение переменной `endpoint_url` должно соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   {/ifdef}

{/tab}

{/tabs}
