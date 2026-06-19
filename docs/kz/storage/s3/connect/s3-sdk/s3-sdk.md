# {heading(SDK)[id=s3-connect-sdk]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(s3)} қызметіне SDK көмегімен қосылу үшін:

1. Қажетті құралдарды немесе SDK-ны орнатыңыз:

   - [PowerShell үшін құралдар](https://docs.aws.amazon.com/powershell).
   - [Java үшін SDK](https://docs.aws.amazon.com/sdk-for-java/index.html).
   - [.NET үшін SDK](https://docs.aws.amazon.com/sdk-for-net/index.html).
   - [JavaScript үшін SDK](https://docs.aws.amazon.com/sdk-for-javascript/index.html).
   - [Ruby үшін SDK](https://docs.aws.amazon.com/sdk-for-ruby/index.html).
   - [Python (Boto) үшін SDK](http://boto3.amazonaws.com/v1/documentation/api/latest/index.html).
   - [PHP үшін SDK](https://docs.aws.amazon.com/sdk-for-php/index.html).
   - [Go үшін SDK](https://docs.aws.amazon.com/sdk-for-go).
   - [iOS және Android үшін Mobile SDK](https://docs.amplify.aws).

1. Егер бұған дейін жасалмаған болса, {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=аккаунт]} және {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=бакет]} жасаңыз. Қосылуға арналған деректемелерді сақтап қойыңыз:

   {ifdef(public)}

   {tabs}

   {tab(Мәскеу өңірі)}

   - Endpoint URL: `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru`.
   - Access Key ID: аккаунт жасалған кезде алынған қолжетімділік кілтінің идентификаторы.
   - Secret Key: аккаунт жасалған кезде алынған құпия кілт.
   - Default region name: `ru-msk`.

   {/tab}

   {tab(Қазақстан өңірі)}

   - Endpoint URL: `https://hb.kz-ast.vkcloud-storage.ru`.
   - Access Key ID: аккаунт жасалған кезде алынған қолжетімділік кілтінің идентификаторы.
   - Secret Key: аккаунт жасалған кезде алынған құпия кілт.
   - Default region name: `kz-ast`.

   {/tab}

   {/tabs}

   {/ifdef}

   {ifdef(s3,s3-pdf)}
   
   - Endpoint URL: сервис орнатылған кезде көрсетілген домендік атауы бар сілтеме.
   - Access Key ID: аккаунт жасалған кезде алынған қолжетімділік кілтінің идентификаторы.
   - Secret Key: аккаунт жасалған кезде алынған құпия кілт.
   - Default region name: сервис орнатылған кезде көрсетілген {var(s3)} сервисінің орналасу өңірі. Әдепкі бойынша `ru-msk` мәні қолданылады.

   {/ifdef}

1. {var(s3)} қызметіне қосылу параметрлерін келесі тәсілдердің бірімен баптаңыз:

   - Деректемелерді `~/.aws/credentials` конфигурациялық файлына қосыңыз.

     Мұндай тәсілді қолдайтын құралдар мен SDK-лардың толық тізімі [AWS ресми құжаттамасында](https://docs.aws.amazon.com/sdkref/latest/guide/supported-sdks-tools.html) келтірілген.

   - Деректемелерді орта айнымалыларында көрсетіңіз:

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
     Кейбір құралдар мен SDK `AWS_DEFAULT_REGION` айнымалысын оқымауы мүмкін және өңірді басқа тәсілмен көрсетуді талап етеді — қажетті құралдың құжаттамасын тексеріңіз.
     {/note}

   - Деректемелерді тікелей бастапқы кодқа қосыңыз.

1. Орнатылған SDK арқылы {var(s3)} қызметіне қосылыңыз.

   Төмендегі мысалдарда сәтті қосылған кезде қойма бакеттерінің тізімі шығарылады{ifdef(public)} (Мәскеу өңірі үшін){/ifdef}.

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

   Аккаунт кілтінің идентификаторы және құпия кілт тиісінше `AWS_ACCESS_KEY_ID` және `AWS_SECRET_ACCESS_KEY` орта айнымалыларына қосылған. Объектілік қоймаға қол жеткізуге арналған қалған деректемелер бастапқы кодта көрсетілген.

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

       c := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

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
