# {heading(SDK)[id=s3-connect-sdk]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(s3)} қызметіне SDK көмегімен қосылу үшін:

1. Қажетті құралдарды немесе SDK орнатыңыз:

   - [PowerShell-ге арналған құралдар](https://docs.aws.amazon.com/powershell).
   - [Java-ға арналған SDK](https://docs.aws.amazon.com/sdk-for-java/index.html).
   - [.NET-ке арналған SDK](https://docs.aws.amazon.com/sdk-for-net/index.html).
   - [JavaScript-ке арналған SDK](https://docs.aws.amazon.com/sdk-for-javascript/index.html).
   - [Ruby-ге арналған SDK](https://docs.aws.amazon.com/sdk-for-ruby/index.html).
   - [Python-ға арналған SDK (Boto)](http://boto3.amazonaws.com/v1/documentation/api/latest/index.html).
   - [PHP-ге арналған SDK](https://docs.aws.amazon.com/sdk-for-php/index.html).
   - [Go-ға арналған SDK](https://docs.aws.amazon.com/sdk-for-go).
   - [iOS және Android үшін Mobile SDK](https://docs.amplify.aws).

1. Бұрын жасалмаса, {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=аккаунт]} және {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=бакет]} жасаңыз. Қосылу деректерін сақтаңыз:

   {ifdef(public)}

   {tabs}

   {tab(Мәскеу өңірі)}

   - Endpoint URL: `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru`.
   - Access Key ID: аккаунт жасау кезінде алынған қатынау кілтінің идентификаторы.
   - Secret Key: аккаунт жасау кезінде алынған құпия кілт.
   - Default region name: `ru-msk`.

   {/tab}

   {tab(Қазақстан өңірі)}

   - Endpoint URL: `https://hb.kz-ast.vkcloud-storage.ru`.
   - Access Key ID: аккаунт жасау кезінде алынған қатынау кілтінің идентификаторы.
   - Secret Key: аккаунт жасау кезінде алынған құпия кілт.
   - Default region name: `kz-ast`.

   {/tab}

   {/tabs}

   {/ifdef}

   {ifdef(s3,s3-pdf)}

   - Endpoint URL: қызметті орнату кезінде көрсетілген домендік атауы бар сілтеме.
   - Access Key ID: аккаунт жасау кезінде алынған қатынау кілтінің идентификаторы.
   - Secret Key: аккаунт жасау кезінде алынған құпия кілт.
   - Default region name: {var(s3)} қызметі орналасқан өңір, қызметті орнату кезінде көрсетілген. Әдепкі бойынша `ru-msk` мәні қолданылады.

   {/ifdef}

1. {var(s3)} қызметіне қосылу параметрлерін келесі тәсілдердің бірімен конфигурациялаңыз:

   - Деректерді `~/.aws/credentials` конфигурациялық файлына қосыңыз.

     Мұндай тәсілді қолдайтын құралдар мен SDK-ның толық тізімі [AWS ресми құжаттамасында](https://docs.aws.amazon.com/sdkref/latest/guide/supported-sdks-tools.html) келтірілген.

   - Деректерді орта айнымалыларында көрсетіңіз:

     {tabs}

     {tab(Linux (bash) / MacOS (zsh))}

     ```console
     export AWS_ACCESS_KEY_ID=<КІЛТ_ИДЕНТИФИКАТОРЫ>
     export AWS_SECRET_ACCESS_KEY=<ҚҰПИЯ_КІЛТ>
     export AWS_DEFAULT_REGION=<ӨҢІР>
     ```

     {/tab}

     {tab(Windows (PowerShell))}

     ```console
     $Env:AWS_ACCESS_KEY_ID="<КІЛТ_ИДЕНТИФИКАТОРЫ>"
     $Env:AWS_SECRET_ACCESS_KEY="<ҚҰПИЯ_КІЛТ>"
     $Env:AWS_DEFAULT_REGION="<ӨҢІР>"
     ```

     {/tab}

     {/tabs}

     {note:warn}
     Кейбір құралдар мен SDK `AWS_DEFAULT_REGION` айнымалысын оқымай, өңірді басқа тәсілмен көрсетуді талап етуі мүмкін — қажетті құралдың құжаттамасын тексеріңіз.
     {/note}

   - Деректерді тікелей бастапқы кодқа қосыңыз.

1. Орнатылған SDK арқылы {var(s3)} қызметіне қосылыңыз.

   Төмендегі мысалдарда сәтті қосылған кезде{ifdef(public)} Мәскеу өңірі үшін{/ifdef} қойманың бакеттер тізімі шығарылады.

   {cut(Python мысалы)}

   Объектілік қоймаға қосылу параметрлерінің барлығы бастапқы кодта көрсетілген.

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

   {cut(Go мысалы)}

   Аккаунт кілтінің идентификаторы мен құпия кілт сәйкесінше `AWS_ACCESS_KEY_ID` және `AWS_SECRET_ACCESS_KEY` орта айнымалыларына қосылған. Объектілік қоймаға қатынау үшін қалған деректер бастапқы кодта көрсетілген.

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