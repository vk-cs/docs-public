{include(/kz/_includes/_translated_by_ai.md)}

Қоймаға объектілерді жүктеу үшін алдымен оларды орналастыруға арналған [бакет жасау](../../../concepts/about#bucket) қажет.

{note:warn}

Бакет жасау [тарифтелмейді](../../../tariffication). Төлем объектілерді сақтау және жүктеп алу үшін алынады.

{/note}

## {heading(Бакет жасау тәсілдері)[id=ways_to_create_bucket]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. **Объектілік сақтау қоймасы** → **Бакеттер** бөліміне өтіңіз.
1. **Жасау** батырмасын басыңыз.
1. [Ұсынылған ережелерге](../../../concepts/about#bucket_naming) сәйкес келетін бакет атауын енгізіңіз.

   Бакет жасалғаннан кейін оның атауын өзгерту мүмкін болмайды.

1. [Сақтау класын](../../../concepts/about#storage_class) таңдаңыз. Оны кейін [өзгерте аласыз](../../change-storage-class).
1. **Бакет жасау** батырмасын басыңыз.

{/tab}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.
1. Бакет үшін [объектілерді бұғаттау](/kz/storage/s3/concepts/objects-lock) мүмкіндігін қосу қажет-қажет еместігіне қарай консольді ашып, келесі командалардың бірін орындаңыз:

   {tabs}
   
   {tab(Объектілерді бұғаттаусыз бакет)}
      
   ```console
   aws s3 mb s3://<ИМЯ_БАКЕТА> --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — [ұсынылған ережелерге](../../../concepts/about#bucket_naming) сәйкес келетін бакет атауы.

      Бакет жасалғаннан кейін оның атауын өзгерту мүмкін болмайды.

   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](../../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   Объектілерді жоюдан және қайта жазудан бұғаттау мүмкіндігінсіз бакет жасау командасының мысалы:

   ```console
   aws s3 mb s3://example-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Жауап мысалы:

   ```console
   make_bucket: example-bucket
   ```

   {/tab}
   
   {tab(Бұғаттау мүмкіндігі бар бакет)}

   {include(/kz/_includes/_s3-manage-bucket.md)[tags=create_bucket_block]}

   Объектілерді жоюдан және қайта жазудан бұғаттау мүмкіндігін қоса отырып бакет жасау командасының мысалы:

   ```console
   aws s3api create-bucket      --bucket my-bucket-with-lock      --object-lock-enabled-for-bucket      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru      --region ru-msk
   ```

   Жауап мысалы:

   ```json
   {
     "Location": "/my-bucket-with-lock"
   }  
   ```

   {/tab}
   
   {/tabs}

`Hotbox` [сақтау класы](../../../concepts/about#storage_class) бар бакет жасалады.

{/tab}

{tab(Golang SDK)}

1. Егер әлі орнатылмаған болса, Go үшін [SDK](../../../connect/s3-sdk) орнатып, баптаңыз.

1. Жобаңызға кодты қосыңыз:

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
	   defaultRegion         = "us-east-1"
   )

   func main() {
	   // Создание сессии
	   sess, _ := session.NewSession()

	   // Подключение к сервису S3
	   svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	   // Создание бакета
	   bucket := "gobucket"

	   if _, err := svc.CreateBucket(&s3.CreateBucketInput{
		   Bucket: aws.String(bucket),
	   }); err != nil {
		   log.Fatalf("Unable to create bucket %q, %v", bucket, err)
	   } else {
		   log.Printf("Bucket with name %q created", bucket)
	   }
   }
   ```

   Бұл код мысалында `Hotbox` [сақтау класы](../../../concepts/about#storage_class) бар бакет жасалады.

   `vkCloudHotboxEndpoint` айнымалысының мәні аккаунттың [аймағына](../../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   Бакет атауы [ұсынылған ережелерге](../../../concepts/about#bucket_naming) сәйкес болуы тиіс. Бакет жасалғаннан кейін оның атауын өзгерту мүмкін болмайды.

   `CreateBucket` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.CreateBucket) толық сипатталған.

{/tab}

{tab(Python SDK)}

1. Егер әлі орнатылмаған болса, Python үшін [SDK](../../../connect/s3-sdk) орнатып, баптаңыз.

1. Жобаңызға кодты қосыңыз:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(
       service_name='s3',
       endpoint_url='https://hb.ru-msk.vkcloud-storage.ru'
   )

   test_bucket_name = 'boto3-test-bucket-name'
   # Создание бакета
   s3_client.create_bucket(Bucket=test_bucket_name)
   ```

   Бұл код мысалында `Hotbox` [сақтау класы](../../../concepts/about#storage_class) бар бакет жасалады.

   `endpoint_url` айнымалысының мәні аккаунттың [аймағына](../../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   Бакет атауы [ұсынылған ережелерге](../../../concepts/about#bucket_naming) сәйкес болуы тиіс. Бакет жасалғаннан кейін оның атауын өзгерту мүмкін болмайды.

   `create_bucket` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.create_bucket) толық сипатталған.

{/tab}

{/tabs}
