# {heading(CLI)[id=s3-connect-cli]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(s3)} командалық жол интерфейсі арқылы сервисті басқаруды қолдайды.

## {heading({var(s3}) қосылуын баптау)[id=s3-connect-cli-configure]}

1. {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинетінде {var(s3)} үшін {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys)[text=аккаунт пен қол жеткізу кілтін жасаңыз]}. Құпия қол жеткізу кілтін (**Secret Key**) сақтаңыз.
1. Қажетті құралдарды орнатыңыз:

   - {ifdef(public)}[AWS CLI](../../../../tools-for-using-services/cli/aws-cli){/ifdef}{ifdef(s3,s3-pdf)}[AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html){/ifdef};
   - [s3cmd CLI](https://s3tools.org/download).

{tabs}

{tab(AWS CLI)}

1. Консольде команданы орындаңыз:

   ```console
   aws configure
   ```

1. {var(s3)} аккаунтын жасағанда алынған қол жеткізу кілтінің идентификаторын көрсетіңіз.
1. {var(s3)} аккаунтын жасағанда алынған **Secret Key** құпия қол жеткізу кілтін көрсетіңіз. Құпия кілт консольде көрсеткен кілт идентификаторына сәйкес болуы тиіс.
   {ifdef(s3,s3-pdf)}
1. Сервисті орнатқанда көрсетілген {var(s3)} сервисі орналасқан аймақты көрсетіңіз. Әдепкі бойынша `ru-msk` мәні қолданылады.
   {/ifdef}
   {ifdef(public)}
1. {var(s3)} сервисі орналасқан аймақты көрсетіңіз. Баптау аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймағына]} сәйкес болуы тиіс:

   - `ru-msk` — Мәскеу аймағы;
   - `kz-ast` — Қазақстан аймағы.
   {/ifdef}

1. Әдепкі шығу пішімін көрсетіңіз. Бұл баптау AWS CLI команданы орындау нәтижесін қандай түрде көрсететінін анықтайды. Қолжетімді нұсқалар:

   - `json` — деректер JSON пішімінде көрсетіледі, әдепкі мән;
   - `yaml` — деректер YAML пішімінде көрсетіледі;
   - `yaml-stream` — деректер ағынды режимде беріледі және YAML пішімінде қалыптастырылады;
   - `текст` — жолдық мәндер табуляциямен бөлінеді;
   - `таблица` — жолдық мәндер `|` белгісімен бөлінеді.

   AWS CLI бұл ақпаратты credentials-файлда `default` деп аталатын профильде (баптаулар жиынында) сақтайды. Профильді көрсетпей команда іске қосылғанда осы профилдегі ақпарат қолданылады.

{/tab}

{tab(s3cmd CLI)}

1. Консольде команданы орындаңыз:

   ```console
   s3cmd --configure
   ```

1. {var(s3)} аккаунтын жасағанда алынған қол жеткізу кілтінің идентификаторын көрсетіңіз.
1. {var(s3)} аккаунтын жасағанда алынған **Secret Key** құпия қол жеткізу кілтін көрсетіңіз. Құпия кілт консольде көрсеткен кілт идентификаторына сәйкес болуы тиіс.
   {ifdef(s3,s3-pdf)}
1. Сервисті орнатқанда көрсетілген {var(s3)} сервисі орналасқан аймақты көрсетіңіз. Әдепкі бойынша `ru-msk` мәні қолданылады.
   {/ifdef}
   {ifdef(public)}
1. {var(s3)} сервисі орналасқан аймақты көрсетіңіз. Баптау аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймағына]} сәйкес болуы тиіс:

   - `ru-msk` — Мәскеу аймағы;
   - `kz-ast` — Қазақстан аймағы.
   {/ifdef}

1. **S3 Endpoint** — қосылу үшін хост атауын көрсетіңіз{ifdef(s3,s3-pdf)}, сервисті орнатқанда көрсетілген.{/ifdef}{ifdef(public)}:

   - `hb.vkcloud-storage.ru` немесе `hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағы үшін;
   - `hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағы үшін.
   {/ifdef}

1. Бакетке қол жеткізу үшін хост атауының үлгісін қосыңыз. **DNS-style bucket+hostname:port template for accessing a bucket** параметрінде мәнді көрсетіңіз:

   {ifdef(s3,s3-pdf)}

   ```shell
   %(bucket)s.<ДОМЕННОЕ_ИМЯ>` 
   ```

   Мұнда `<ДОМЕННОЕ_ИМЯ>` — сервисті орнатқанда көрсетілген домендік атау.

   {/ifdef}

   {ifdef(public)}

   - `%(bucket)s.hb.vkcloud-storage.ru` немесе `%(bucket)s.hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағы үшін;
   - `%(bucket)s.hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағы үшін.

   {/ifdef}

1. Қалған баптауларды әдепкі күйінде қалдырыңыз.
1. Баптаулар дұрыс енгізілсе, `Success. Your access key and secret key worked fine :-)` хабарламасы пайда болады. Баптауларды сақтаңыз.

   S3cmd CLI жиналған ақпаратты `~/.s3cfg` файлында сақтайды, оның мазмұнын қолмен өзгертуге болады.

{/tab}

{/tabs}

## {heading({var(s3}) қосылуын тексеру)[id=s3-connect-cli-check]}

Бакеттер тізімін шығару үшін команданы орындаңыз:

{tabs}

{tab(AWS CLI)}

```console
aws s3 ls --endpoint-url <ENDPOINT_URL>
```

Мұнда:

  {ifdef(public)}
- `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймағына]} сәйкес болуы тиіс:

  - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағы үшін;
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағы үшін.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясыңызда қолданылатын домендік атауы бар сілтеме. Атау пішімі өзгеше болуы мүмкін. Сілтеменің нақты пішімін білу үшін әкімшіңізге хабарласыңыз.
  {/ifdef}

{note:warn}
Әдепкі бойынша AWS CLI Amazon серверлерімен жұмыс істеуге бапталған, сондықтан кез келген команданы орындағанда `--endpoint-url` параметрін міндетті түрде көрсетіңіз.
{/note}

{/tab}

{tab(s3cmd CLI)}

```console
s3cmd ls
```
{/tab}

{/tabs}

Консоль шығысында қолжетімді бакеттер тізімі көрсетілуі тиіс. Сақтағышта бірде-бір бакет жасалмаған болса, тізім бос болуы мүмкін.

Қосылу проблемалары туындаса, әзірлеуші құжаттамасына өтіңіз:

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-troubleshooting.html);
- [s3cmd CLI](https://s3tools.org/kb).

## {heading(Командалар мысалдары)[id=s3-connect-cli-examples]}

Бакет жасау:

{tabs}

{tab(AWS CLI)}

```console
aws s3 mb s3://<ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
```

{cut(Команданы орындау нәтижесінің мысалы)}

```console
make_bucket: new-bucket-aws-cli
```

{/cut}
{/tab}

{tab(s3cmd CLI)}

```console
s3cmd mb s3://<ИМЯ_БАКЕТА>
```

{cut(Команданы орындау нәтижесінің мысалы)}

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

{cut(Команданы орындау нәтижесінің мысалы)}

```console
upload: ..\Diagrams\example.svg to s3://new-bucket-aws-cli/example.svg
```
{/cut}

{/tab}

{tab(s3cmd CLI)}

```console
s3cmd put <ПУТЬ_К_ЛОКАЛЬНОМУ_ФАЙЛУ> s3://<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА>
```

{cut(Команданы орындау нәтижесінің мысалы)}

```console
upload: 'local-file' -> 's3://my-bucket/new-object'
```
{/cut}

{/tab}

{/tabs}

Объекттер тізімін алу:

{tabs}

{tab(AWS CLI)}

```console
aws s3 ls s3://<ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
```

{cut(Команданы орындау нәтижесінің мысалы)}

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

{cut(Команданы орындау нәтижесінің мысалы)}

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