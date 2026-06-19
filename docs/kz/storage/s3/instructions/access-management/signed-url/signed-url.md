# {heading(Қолтаңбаланған URL құрастыру)[id=s3-instructions-signed-url]}

{include(/kz/_includes/_translated_by_ai.md)}

{linkto(../../../concepts/access/signed-url#s3-concepts-signed-url)[text=Қолтаңбаланған URL]} үшінші тарап пайдаланушысына объектіні жүктеп алу үшін уақыт бойынша шектелген қолжетімділікті ұсынады.

Қолтаңбаланған URL жасау үшін:

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3 presign s3://<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА> --endpoint-url <ENDPOINT_URL> --expires-in <СРОК_ДЕЙСТВИЯ>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} жүйесінің сіздің инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}
   - `<СРОК_ДЕЙСТВИЯ>` — қолжетімділіктің әрекет ету уақыты (секундпен). Егер көрсетілмесе, сілтеме 3600 секунд бойы жарамды болады.

   {cut(Қолтаңбаланған URL қалыптастыру командасының мысалы)}

   Команда мысалы:

   ```console
   aws s3 presign s3://my-bucket/my-object.png --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --expires-in 300000
   ```

   Жауап мысалы:

   ```http
   https://hb.ru-msk.vkcloud-storage.ru/dd-winscp/usetech.ico?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=4TucX9HhP8RZveR9Cb3vGr%2F20231113%2Fru-msk%2Fs3%2Faws4_request&X-Amz-Date=20231113T104239Z&X-Amz-Expires=300000&X-Amz-SignedHeaders=host&X-Amz-Signature=5a7c4d87d12dd12f8f420ffaed84328f1d6a79050818fd4c615b219ce7bc18e9
   ```

   {/cut}

Қолтаңбаланған URL қалыптастыру командасы үшін қолжетімді параметрлердің сипаттамасы — [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/presign.html).

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файл менеджері)}

{note:warn}
Мұнда және әрі қарай біз «CloudBerry Explorer for Amazon S3» файл менеджерін қолданамыз. Егер сіз басқа файл менеджерін қолдансаңыз, интерфейс және оның элементтерінің атаулары осы нұсқаулықта қолданылғандардан өзгеше болуы мүмкін.
{/note}

1. Бакеттен қажетті файлды таңдаңыз да, ол үшін тінтуірдің оң жақ батырмасымен контекстік мәзірді шақырыңыз.

   Немесе қажетті файлды таңдап, файл менеджерінің құралдар тақтасындағы **Web URL** түймесін басыңыз.

1. Одан кейін ашылған диалог терезесінде URL әрекет ету мерзімінің аяқталу уақытын орнатып, **Generate** түймесін басыңыз.

{/tab}

{/ifdef}

{tab(Golang SDK)}

1. Егер әлі орнатылмаған болса, Go үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} орнатып, баптаңыз.
1. Бұрын жасалмаған болса, {var(s3)} жүйесіне {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу деректемелерін]} орта айнымалыларына немесе конфигурациялық файлға қосыңыз.
1. Жобаңызға кодты қосыңыз:

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
   `vkCloudHotboxEndpoint` айнымалысының мәні аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
   {/ifdef}

{/tab}

{tab(Python SDK)}

1. Егер әлі орнатылмаған болса, Python үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} орнатып, баптаңыз.
1. Бұрын жасалмаған болса, {var(s3)} жүйесіне {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу деректемелерін]} орта айнымалыларына немесе конфигурациялық файлға қосыңыз.
1. Жобаңызға кодты қосыңыз:

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
   `endpoint_url` айнымалысының мәні аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
   {/ifdef}

{/tab}

{/tabs}
