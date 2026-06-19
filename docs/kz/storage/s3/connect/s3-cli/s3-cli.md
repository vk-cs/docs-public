# {heading(CLI)[id=s3-connect-cli]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(s3)} сервисін пәрмен жолы интерфейсі арқылы басқаруды қолдайды.

## {heading({var(s3)} қызметіне қосылуды баптаңыз)[id=s3-connect-cli-configure]}

1. {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинетінде {var(s3)} үшін {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys)[text=аккаунт пен қолжетімділік кілтін жасаңыз]}. Қолжетімділіктің құпия кілтін (**Secret Key**) сақтап қойыңыз.
1. Қажетті құралдарды орнатыңыз:

   - {ifdef(public)}[AWS CLI](../../../../tools-for-using-services/cli/aws-cli){/ifdef}{ifdef(s3,s3-pdf)}[AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html){/ifdef};
   - [s3cmd CLI](https://s3tools.org/download).

{tabs}

{tab(AWS CLI)}

1. Консольде команданы орындаңыз:

   ```console
   aws configure
   ```

1. {var(s3)} аккаунтын жасау кезінде алынған қолжетімділік кілтінің идентификаторын көрсетіңіз.
1. {var(s3)} аккаунтын жасау кезінде алынған **Secret Key** құпия қолжетімділік кілтін көрсетіңіз. Құпия кілт консольде көрсеткен кілт идентификаторына сәйкес келуі тиіс.
   {ifdef(s3,s3-pdf)}
1. Сервис орнатылған кезде көрсетілген {var(s3)} сервисінің орналасу өңірін көрсетіңіз. Әдепкі бойынша `ru-msk` мәні қолданылады.
   {/ifdef}
   {ifdef(public)}
1. {var(s3)} сервисінің орналасу өңірін көрсетіңіз. Баптау аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі тиіс:

   - `ru-msk` — Мәскеу өңірі;
   - `kz-ast` — Қазақстан өңірі.
   {/ifdef}

1. Әдепкі шығыс форматын көрсетіңіз. Бұл баптау AWS CLI команда орындалу нәтижесін қандай түрде көрсететінін анықтайды. Қолжетімді нұсқалар:

   - `json` — деректер JSON форматында көрсетіледі, әдепкі мән;
   - `yaml` — деректер YAML форматында көрсетіледі;
   - `yaml-stream` — деректер ағындық режимде беріледі және YAML форматында қалыптастырылады;
   - `текст` — жолдық мәндер табуляциямен бөлінген;
   - `таблица` — жолдық мәндер `|` таңбасымен бөлінген.

   AWS CLI бұл ақпаратты credentials-файлындағы `default` деп аталатын профильде (баптаулар жиынтығында) сақтайды. Бұл профильдегі ақпарат профиль көрсетілмей команда іске қосылған кезде пайдаланылады.

{/tab}

{tab(s3cmd CLI)}

1. Консольде команданы орындаңыз:

   ```console
   s3cmd --configure
   ```

1. {var(s3)} аккаунтын жасау кезінде алынған қолжетімділік кілтінің идентификаторын көрсетіңіз.
1. {var(s3)} аккаунтын жасау кезінде алынған **Secret Key** құпия қолжетімділік кілтін көрсетіңіз. Құпия кілт консольде көрсеткен кілт идентификаторына сәйкес келуі тиіс.
   {ifdef(s3,s3-pdf)}
1. Сервис орнатылған кезде көрсетілген {var(s3)} сервисінің орналасу өңірін көрсетіңіз. Әдепкі бойынша `ru-msk` мәні қолданылады.
   {/ifdef}
   {ifdef(public)}
1. {var(s3)} сервисінің орналасу өңірін көрсетіңіз. Баптау аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі тиіс:

   - `ru-msk` — Мәскеу өңірі;
   - `kz-ast` — Қазақстан өңірі.
   {/ifdef}

1. **S3 Endpoint** — қосылуға арналған хост атауын көрсетіңіз{ifdef(s3,s3-pdf)}, ол сервис орнатылған кезде көрсетілген.{/ifdef}{ifdef(public)}:

   - `hb.vkcloud-storage.ru` немесе `hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
   - `hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
   {/ifdef}

1. Бакетке қол жеткізу үшін хост атауының үлгісін қосыңыз. **DNS-style bucket+hostname:port template for accessing a bucket** параметрінде мына мәнді көрсетіңіз:

   {ifdef(s3,s3-pdf)}
      
   ```shell
   %(bucket)s.<ДОМЕННОЕ_ИМЯ>`
   ```

   Мұнда `<ДОМЕННОЕ_ИМЯ>` — сервис орнатылған кезде көрсетілген домендік атау.

   {/ifdef}

   {ifdef(public)}

   - `%(bucket)s.hb.vkcloud-storage.ru` немесе `%(bucket)s.hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
   - `%(bucket)s.hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

   {/ifdef}

1. Қалған баптауларды әдепкі бойынша қалдырыңыз.
1. Егер баптаулар дұрыс енгізілсе, `Success. Your access key and secret key worked fine :-)` хабарламасы шығады. Баптауларды сақтаңыз.

   S3cmd CLI жиналған ақпаратты `~/.s3cfg` файлына сақтайды, оның мазмұнын қолмен өзгертуге болады.

{/tab}

{/tabs}

## {heading({var(s3)} қызметіне қосылуды тексеріңіз)[id=s3-connect-cli-check]}

Бакеттер тізімін шығару үшін команданы орындаңыз:

{tabs}

{tab(AWS CLI)}

```console
aws s3 ls --endpoint-url <ENDPOINT_URL>
```

Мұнда:

  {ifdef(public)}
- `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
  {/ifdef}

{note:warn}
Әдепкі бойынша AWS CLI Amazon серверлерімен жұмыс істеуге бапталған, сондықтан кез келген команданы орындағанда міндетті түрде `--endpoint-url` параметрін көрсетіңіз.
{/note}

{/tab}

{tab(s3cmd CLI)}

```console
s3cmd ls
```
{/tab}

{/tabs}

Консоль шығысында қолжетімді бакеттер тізімі көрсетілуі тиіс. Қоймада бірде-бір бакет жасалмаған болса, тізім бос болуы мүмкін.

Қосылу кезінде мәселелер туындаса, әзірлеуші құжаттамасына жүгініңіз:

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-troubleshooting.html);
- [s3cmd CLI](https://s3tools.org/kb).

## {heading(Командалар мысалдары)[id=s3-connect-cli-examples]}

Бакет жасау:

{tabs}

{tab(AWS CLI)}

```console
aws s3 mb s3://<ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
```

{cut(Команда орындалу нәтижесінің мысалы)}

```console
make_bucket: new-bucket-aws-cli
```

{/cut}
{/tab}

{tab(s3cmd CLI)}

```console
s3cmd mb s3://<ИМЯ_БАКЕТА>
```

{cut(Команда орындалу нәтижесінің мысалы)}

```console
Bucket 's3://my-bucket/' created
```
{/cut}

{/tab}

{/tabs}

Файлды бакетке жүктеу:

{tabs}

{tab(AWS CLI)}

```console
aws s3 cp <ПУТЬ_К_ЛОКАЛЬНОМУ_ФАЙЛУ> s3://<ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
```

{cut(Команда орындалу нәтижесінің мысалы)}

```console
upload: ..\Diagrams\example.svg to s3://new-bucket-aws-cli/example.svg
```
{/cut}

{/tab}

{tab(s3cmd CLI)}

```console
s3cmd put <ПУТЬ_К_ЛОКАЛЬНОМУ_ФАЙЛУ> s3://<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА>
```

{cut(Команда орындалу нәтижесінің мысалы)}

```console
upload: 'local-file' -> 's3://my-bucket/new-object'
```
{/cut}

{/tab}

{/tabs}

Объектілер тізімін алу:

{tabs}

{tab(AWS CLI)}

```console
aws s3 ls s3://<ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
```

{cut(Команда орындалу нәтижесінің мысалы)}

```console
                               PRE folder/
  2023-09-27 11:45:05     421326 picture-1.jpg
  2023-09-27 11:47:37       2713 picture-2.png
  2023-09-27 11:48:37       2662 picture-3.png
  2023-09-27 10:31:02      48314 picture-4.png
  2023-09-27 11:48:56        361 delete-picture.png
```
{/cut}

{/tab}

{tab(s3cmd CLI)}

```console
s3cmd ls s3://<ИМЯ_БАКЕТА>
```

{cut(Команда орындалу нәтижесінің мысалы)}

```console
  2023-10-06 05:37      2713   s3://my-bucket/picture-1.png
  2023-10-06 05:36       361   s3://my-bucket/delete-picture.png
  2023-10-06 05:38     56849   s3://my-bucket/icon.ico
  2023-10-06 05:36     54970   s3://my-bucket/scheme.svg
  2023-10-05 06:58    110207   s3://my-bucket/scheme-picture.png
```
{/cut}

{/tab}

{/tabs}
