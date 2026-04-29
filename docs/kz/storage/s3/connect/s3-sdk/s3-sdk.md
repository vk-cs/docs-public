{include(/kz/_includes/_translated_by_ai.md)}

VK Object Storage сервисіне SDK көмегімен қосылу үшін:

1. Қажетті құралдарды немесе SDK-ны орнатыңыз:

   - [Инструменты для PowerShell](https://docs.aws.amazon.com/powershell).
   - [SDK для Java](https://docs.aws.amazon.com/sdk-for-java/index.html).
   - [SDK для .NET](https://docs.aws.amazon.com/sdk-for-net/index.html).
   - [SDK для JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/index.html).
   - [SDK для Ruby](https://docs.aws.amazon.com/sdk-for-ruby/index.html).
   - [SDK для Python (Boto)](http://boto3.amazonaws.com/v1/documentation/api/latest/index.html).
   - [SDK для PHP](https://docs.aws.amazon.com/sdk-for-php/index.html).
   - [SDK для Go](https://docs.aws.amazon.com/sdk-for-go).
   - [Mobile SDK для iOS и Android](https://docs.amplify.aws).

1. Егер бұл бұрын жасалмаса, [аккаунт](/kz/storage/s3/instructions/access-management/access-keys) пен [бакет](../../instructions/buckets/create-bucket) жасаңыз. Қосылу деректемелерін сақтап қойыңыз:

   {tabs}

   {tab(Регион Москва)}

   - Endpoint URL: `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru`.
   - Access Key ID: аккаунтты жасау кезінде алынған қатынау кілтінің идентификаторы.
   - Secret Key: аккаунтты жасау кезінде алынған құпия кілт.
   - Default region name: `ru-msk`.

   {/tab}

   {tab(Регион Казахстан)}

   - Endpoint URL: `https://hb.kz-ast.vkcloud-storage.ru`.
   - Access Key ID: аккаунтты жасау кезінде алынған қатынау кілтінің идентификаторы.
   - Secret Key: аккаунтты жасау кезінде алынған құпия кілт.
   - Default region name: `kz-ast`.

   {/tab}

   {/tabs}

1. VK Object Storage сервисіне қосылу параметрлерін мына тәсілдердің бірімен баптаңыз:

   - Деректемелерді `~/.aws/credentials` конфигурациялық файлына қосыңыз.

     Осындай тәсілді қолдайтын құралдар мен SDK-лардың толық тізімі [AWS ресми құжаттамасында](https://docs.aws.amazon.com/sdkref/latest/guide/supported-sdks-tools.html) келтірілген.

   - Деректемелерді орта айнымалыларына көрсетіңіз:

     {tabs}

     {tab(Linux (bash) / MacOS (zsh))}

     ```console
     export AWS_ACCESS_KEY_ID=<ИДЕНТИФИКАТОР_КЛЮЧА>
     export AWS_SECRET_ACCESS_KEY=<СЕКРЕТНЫЙ_КЛЮЧ>
     export AWS_DEFAULT_REGION=<РЕГИОН>
     ```

     {/tab}

     {tab(Windows (PowerShell))}

     ```console
     $Env:AWS_ACCESS_KEY_ID="<ИДЕНТИФИКАТОР_КЛЮЧА>"
     $Env:AWS_SECRET_ACCESS_KEY="<СЕКРЕТНЫЙ_КЛЮЧ>"
     $Env:AWS_DEFAULT_REGION="<РЕГИОН>"
     ```

     {/tab}

     {/tabs}

     {note:warn}

     Кейбір құралдар мен SDK `AWS_DEFAULT_REGION` айнымалысын оқымауы мүмкін және аймақты басқа тәсілмен көрсетуді талап етеді — қажетті құралдың құжаттамасын тексеріңіз.

     {/note}

   - Деректемелерді тікелей бастапқы кодқа қосыңыз.

1. Орнатылған SDK арқылы VK Object Storage сервисіне қосылыңыз.

   Төмендегі мысалдарда сәтті қосылған кезде Мәскеу аймағы үшін қойма бакеттерінің тізімі шығарылады.

   {cut(Python тіліндегі мысал)}

     Объектілік қоймаға қосылудың барлық параметрлері бастапқы кодта көрсетілген.

     ```python
     import boto3
     session = boto3.session.Session()
     s3_client = session.client(
         service_name = 's3',
         endpoint_url = 'https://hb.ru-msk.vkcloud-storage.ru',
         aws_access_key_id = '<YOUR_ACCESS_KEY>',
         aws_secret_access_key = '<YOUR_SECRET_KEY>',
         region_name='ru-msk'
     )

     response = s3_client.list_buckets()

     for key in response['Buckets']:
         print(key['Name'])
     ```

   {/cut}

   {cut(Go тіліндегі мысал)}

     Аккаунт кілтінің идентификаторы мен құпия кілт тиісінше `AWS_ACCESS_KEY_ID` және `AWS_SECRET_ACCESS_KEY` орта айнымалыларына қосылған. Объектілік қоймаға қатынаудың қалған деректемелері бастапқы кодта көрсетілген.

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
     	sess, _ := session.NewSession()

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

   {/cut}
