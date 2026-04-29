{include(/kz/_includes/_translated_by_ai.md)}

VK Cloud VK Object Storage сервистерін басқару және олардың жұмысын автоматтандыру үшін пәрмен жолы интерфейсін пайдалануға мүмкіндік береді.

## Дайындық қадамдары

1. [Аккаунт пен қатынау кілтін жасаңыз](../../instructions/access-management/access-keys) VK Object Storage үшін VK Cloud жеке кабинетінде. Құпия қатынау кілтін (**Secret Key**) сақтап қойыңыз.

2. Қажетті құралдарды орнатыңыз:

    - [AWS CLI](../../../../tools-for-using-services/cli/aws-cli);
    - [s3cmd CLI](https://s3tools.org/download).

## 1. VK Object Storage сервисіне қосылуды баптаңыз

{tabs}

{tab(AWS CLI)}

  1. Консольде команданы орындаңыз:

      ```console
      aws configure
      ```

  1. VK Object Storage аккаунтын жасау кезінде алынған қатынау кілті идентификаторын көрсетіңіз.
  1. VK Object Storage аккаунтын жасау кезінде алынған **Secret Key** құпия қатынау кілтін көрсетіңіз. Құпия кілт консольде көрсеткен кілт идентификаторына сәйкес болуы керек.
  1. Әдепкі бойынша VK Object Storage сервисінің орналастыру аймағын көрсетіңіз. Баптау аккаунттың [аймағына](../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы керек:

      - `ru-msk` — Мәскеу аймағы;
      - `kz-ast` — Қазақстан аймағы.

  1. Әдепкі шығыс пішімін көрсетіңіз. Бұл баптау AWS CLI команданы орындау нәтижесін қандай түрде көрсететінін анықтайды. Қолжетімді нұсқалар:

      - `json` — деректер JSON пішімінде көрсетіледі, әдепкі мән;
      - `yaml` — деректер YAML пішімінде көрсетіледі;
      - `yaml-stream` — деректер ағындық режимде беріледі және YAML пішімінде құрастырылады;
      - `текст` — жолдық мәндер табуляциямен бөлінген;
      - `таблица` — жолдық мәндер `|` арқылы бөлінген.

  AWS CLI бұл ақпаратты credentials файлындағы `default` деп аталған профильде (баптаулар жиынында) сақтайды. Профильден алынған ақпарат профиль көрсетілмей іске қосылған команда кезінде пайдаланылады.

{/tab}

{tab(s3cmd CLI)}

  1. Консольде команданы орындаңыз:

      ```console
      s3cmd --configure
      ```

  1. VK Object Storage аккаунтын жасау кезінде алынған қатынау кілті идентификаторын көрсетіңіз.
  1. VK Object Storage аккаунтын жасау кезінде алынған **Secret Key** құпия қатынау кілтін көрсетіңіз. Құпия кілт консольде көрсеткен кілт идентификаторына сәйкес болуы керек.
  1. Әдепкі бойынша VK Object Storage сервисінің орналастыру аймағын көрсетіңіз. Баптау аккаунттың [аймағына](../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы керек:

      - `ru-msk` — Мәскеу аймағы;
      - `kz-ast` — Қазақстан аймағы.

  1. **S3 Endpoint** — қосылуға арналған хост атауын көрсетіңіз:

      - `hb.vkcloud-storage.ru` немесе `hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағы үшін;
      - `hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағы үшін.

  1. Бакетке қол жеткізу үшін хост атауының үлгісін қосыңыз. **DNS-style bucket+hostname:port template for accessing a bucket** параметрінде мына мәнді көрсетіңіз:

      - `%(bucket)s.hb.vkcloud-storage.ru` немесе `%(bucket)s.hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағы үшін;
      - `%(bucket)s.hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағы үшін.

  1. Қалған баптауларды әдепкі мәндерде қалдырыңыз.

  1. Егер баптаулар дұрыс енгізілсе, `Success. Your access key and secret key worked fine :-)` хабарламасы шығады. Баптауларды сақтаңыз.

  S3cmd CLI жиналған ақпаратты `~/.s3cfg` файлына сақтайды, оның мазмұнын қолмен өзгертуге болады.

{/tab}

{/tabs}

## 2. VK Object Storage сервисіне қосылуды тексеріңіз

Бакеттер тізімін шығару үшін команданы орындаңыз:

{tabs}

{tab(AWS CLI)}

  ```console
  aws s3 ls --endpoint-url <ENDPOINT_URL>
  ```
Мұнда:

- `<URL_СЕРВИСА>` — аккаунттың [аймағына](../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы керек:
  - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағы үшін.
  - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

{note:warn}

Әдепкі бойынша AWS CLI Amazon серверлерімен жұмыс істеуге бапталған, сондықтан кез келген команданы орындау кезінде `--endpoint-url` параметрін міндетті түрде көрсетіңіз.

{/note}

{/tab}

{tab(s3cmd CLI)}

  ```console
  s3cmd ls
  ```
{/tab}

{/tabs}

Консоль шығысында қолжетімді бакеттер тізімі көрсетілуі керек. Егер қоймада бірде-бір бакет жасалмаса, тізім бос болуы мүмкін.

Қосылуда қиындықтар туындаса, әзірлеуші құжаттамасына жүгініңіз:

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-troubleshooting.html);
- [s3cmd CLI](https://s3tools.org/kb).

## Командалар мысалдары

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

Объектілер тізімін алу:

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
