# {heading(Файлдік қызметті Foundation Models және MCP көмегімен жасау)[id=ai-file-service-mcp]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(s3)} көмегімен файлдық қызметті жасауға болады, мұнда объектілік сақтау құрылғысы деректерді сақтаудың негізгі жүйесі болып табылады, ал Foundation Models және MCP (Model Context Protocol) қолданбаны әзірлеу мен деплойдауды жеделдетеді. {var(s3)} S3-үйлесімді API қамтамасыз етеді, бұл файлдарды жүктеп салу, жүктеу және басқару үшін стандартты SDK (мысалы, Python үшін Boto3) пайдалануға мүмкіндік береді.

Мысал ретінде кейіннен мына деректер қолданылады:

- Бакет атауы: `ai-file-service-bucket`
- Аймақ: `ru-msk` (Мәскеу)
- Endpoint URL: `https://hb.ru-msk.vkcloud-storage.ru`
- S3-кілттер: `<ACCESS_KEY>` және `<SECRET_KEY>`

{note:warn}
`<ACCESS_KEY>` және `<SECRET_KEY>` мәндері — сынақтық плейсхолдерлер. {var(cloud)} жобасында жасалған кілттердің нақты мәндерін пайдаланыңыз.
{/note}

## {heading(Дайындық қадамдары)[id=ai-file-service-mcp-prepare]}

1. {var(s3)} қызметіне аккаунт жасаңыз, егер ол әлі жасалмаса:
   1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
   1. Жобаны таңдаңыз.
   1. **Object Storage** → **Аккаунтар** бөліміне өтіңіз.
   1. **Добавить аккаунт** немесе **Добавить** түймесін басыңыз.
   1. Аккаунт атауын қойыңыз.
   1. **Создать** түймесін басыңыз.
   1. Ашылған терезеде қолжетімділік кілтінің идентификаторын (**Access Key ID**) және құпия кілтті (**Secret Key**) көшіріп сақтаңыз.

      {note:warn}
      Терезе жабылғаннан кейін құпия кілтті қалпына келтіру мүмкін емес. Кілт жоғалған жағдайда жаңасын жасаңыз.
      {/note}

1. Мәскеу аймағында {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=бакет жасаңыз]} `ai-file-service-bucket`.
1. [AWS CLI](../../../../tools-for-using-services/cli/aws-cli) орнатылғанын және жасалған {var(s3)} аккаунтымен жұмыс істеуге бапталғанын тексеріңіз.
1. Бакетке қосылу деректерін конфигурацияға көрсетіңіз:

   ```txt
   [default]
   region = ru-msk
   output = json
   s3 =
       addressing_style = path
   ```

1. Python 3.10+ және `pip` пакеттік менеджері орнатылғанын тексеріңіз.
1. Boto3 — Python үшін ресми SDK орнатыңыз:

   ```console
   pip install boto3
   ```

1. {var(cloud)} Foundation Models және MCP-серверіне қолжетімділігіңіз бар екенін тексеріңіз.

## {heading(1. Foundation Models көмегімен қолданба жасаңыз)[id=ai-file-service-mcp-step1]}

Файлдық қызметтің қаңқасын жасау үшін Foundation Models пайдаланыңыз. Модель үшін тапсырманы сипаттайтын промпт құрастырыңыз: S3-үйлесімді сақтау құрылғысында сақталатын файлдарды жүктеп салу, жүктеу және оларға сілтемелер алу функциялары бар Python (Flask/FastAPI) веб-қолданбасы.

Foundation Models үшін промпт мысалы:

```text
Python (FastAPI) негізінде файлдық қызмет үшін веб-қолданба жаса.
Қолданба мыналарды орындауы тиіс:
- Файлдарды HTTP POST-сұранысы арқылы қабылдап, оларды S3-үйлесімді сақтау құрылғысына (Boto3) жүктеп салу.
- Жүктеп салынған файлдардың тізімін қайтару.
- Файлдарды жүктеп алу үшін presigned URL жасау.
- Конфигурация үшін орта айнымалыларын пайдалану (endpoint, access key, secret key, bucket name).
```

Жасалған кодты жобаның директориясына сақтаңыз, мысалы `ai-file-service/`.

## {heading(2. VK Object Storage сақтау құрылғысына файлдарды жүктеп салуды баптаңыз)[id=ai-file-service-mcp-step2]}

{var(s3)} қызметімен Boto3 арқылы жұмыс істеуге қолданбаны баптаңыз. SDK-ның стандартты AWS эндпоинттеріне қосылу әрекеттерін болдырмау үшін S3-клиентті `endpoint_url` және `region_name` көрсете отырып инициализациялаңыз.

Boto3 клиентін инициализациялау мысалы:

```python
import boto3
from botocore.client import Config
import os

# Орта айнымалыларынан алынған тіркелгі деректері мен параметрлер
access_key = os.environ.get('S3_ACCESS_KEY')
secret_key = os.environ.get('S3_SECRET_KEY')
endpoint_url = os.environ.get('S3_ENDPOINT_URL', 'https://hb.ru-msk.vkcloud-storage.ru')
region_name = os.environ.get('S3_REGION', 'ru-msk')
bucket_name = os.environ.get('S3_BUCKET_NAME', 'ai-file-service-bucket')

# S3 клиентін инициализациялау
s3_client = boto3.client(
    's3',
    endpoint_url=endpoint_url,
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key,
    region_name=region_name,
    config=Config(s3={'addressing_style': 'path'}, request_checksum_calculation="when_required", response_checksum_validation=None)
)
```

Файлды бакетке жүктеп салу функциясының мысалы:

```python
def upload_file(file_data: bytes, object_key: str) -> str:
    """Файлды VK Object Storage сақтау құрылғысына жүктеп салады және объект кілтін қайтарады."""
    s3_client.put_object(
        Bucket=bucket_name,
        Key=object_key,
        Body=file_data
    )
    return object_key
```

Файлды жүктеп алу үшін presigned URL жасау функциясының мысалы:

```python
def generate_download_url(object_key: str, expiration: int = 3600) -> str:
    """Файлды жүктеп алу үшін presigned URL жасайды."""
    url = s3_client.generate_presigned_url(
        'get_object',
        Params={'Bucket': bucket_name, 'Key': object_key},
        ExpiresIn=expiration
    )
    return url
```

Жүктеп салынған файлдардың тізімін алу функциясының мысалы:

```python
def list_files() -> list:
    """Бакеттегі объектілердің тізімін қайтарады."""
    response = s3_client.list_objects_v2(Bucket=bucket_name)
    if 'Contents' in response:
        return [obj['Key'] for obj in response['Contents']]
    return []
```

Қолданба үшін орта айнымалыларын баптаңыз:

```console
export S3_ACCESS_KEY=<ACCESS_KEY>
export S3_SECRET_KEY=<SECRET_KEY>
export S3_ENDPOINT_URL=https://hb.ru-msk.vkcloud-storage.ru
export S3_REGION=ru-msk
export S3_BUCKET_NAME=ai-file-service-bucket
```

## {heading(3. Файлдарды сақтау мен сілтемелерді алуды тексеріңіз)[id=ai-file-service-mcp-step3]}

Қолданбаны локально іске қосыңыз және {var(s3)} қызметімен жұмысты тексеріңіз.

1. Қолданбаны іске қосыңыз:

   ```console
   cd ai-file-service
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

1. HTTP-сұраныс арқылы сынақ файлын жүктеп салыңыз:

   ```console
   curl -X POST http://localhost:8000/upload \
     -F "file=@test-document.txt"
   ```

   {cut(Жауап мысалы)}

   ```json
   {
     "message": "File uploaded successfully",
     "key": "test-document.txt"
   }
   ```

   {/cut}

1. AWS CLI көмегімен файл бакетте пайда болғанын тексеріңіз:

   ```console
   aws s3 ls s3://ai-file-service-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   {cut(Команда шығысының мысалы)}

   ```console
   2025-01-15 12:00:00         42 test-document.txt
   ```

   {/cut}

1. Файлды жүктеп алу үшін presigned URL сұраңыз:

   ```console
   curl http://localhost:8000/download-url/test-document.txt
   ```

   {cut(Жауап мысалы)}

   ```json
   {
     "url": "https://hb.ru-msk.vkcloud-storage.ru/ai-file-service-bucket/test-document.txt?X-Amz-Algorithm=..."
   }
   ```

   {/cut}

1. Файлды алынған сілтеме бойынша жүктеп алыңыз және мазмұны түпнұсқамен сәйкес келетінін тексеріңіз.

## {heading(4. MCP-серверін қосыңыз)[id=ai-file-service-mcp-step4]}

MCP (Model Context Protocol) қолданбаны жинау мен деплойдауды автоматтандыруға мүмкіндік береді. {var(cloud)} инфрақұрылымын біртұтас интерфейс арқылы басқару үшін MCP-серверін жобаңызға қосыңыз.

1. MCP-клиентті орнатыңыз және {var(cloud)} MCP-серверіне қосылуды баптаңыз.
1. {var(s3)} қызметімен жұмыс істеу үшін MCP-серверін баптаңыз: MCP конфигурациясында endpoint URL, қолжетімділік кілттері және `ai-file-service-bucket` бакетінің атауын көрсетіңіз.
1. MCP-серверінің {var(cloud)} ресурстарына қолжетімділігі бар екенін тексеріңіз: контейнерлік қолданбаларды жасай алуы және басқара алуы, бакеттердің конфигурациясын оқи алуы тиіс.

## {heading(5. MCP арқылы қолданбаны Container Apps ішінде жинаңыз және деплойлаңыз)[id=ai-file-service-mcp-step5]}

Docker-бейнесін жинауды және қолданбаны Container Apps ішіне деплойдауды автоматтандыру үшін MCP пайдаланыңыз.

1. Қолданба үшін `Dockerfile` жасаңыз:

   ```dockerfile
   FROM python:3.12-slim

   WORKDIR /app

   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt

   COPY . .

   CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
   ```

1. `requirements.txt` файлын жасаңыз:

   ```txt
   fastapi
   uvicorn
   boto3
   python-multipart
   ```

1. MCP-сервері арқылы бейнені жинауды және Container Apps ішіне деплойдауды орындаңыз.
1. Орта айнымалыларын контейнерлік қолданбаға беріңіз:

   - `S3_ACCESS_KEY` — `<ACCESS_KEY>`
   - `S3_SECRET_KEY` — `<SECRET_KEY>`
   - `S3_ENDPOINT_URL` — `https://hb.ru-msk.vkcloud-storage.ru`
   - `S3_REGION` — `ru-msk`
   - `S3_BUCKET_NAME` — `ai-file-service-bucket`

   {note:warn}
   Қолжетімділік кілттерін қолданба кодында немесе ашық репозиторийлерде сақтамаңыз. Орта айнымалыларын немесе Container Apps құпияларын (секреттерін) пайдаланыңыз.
   {/note}

## {heading(6. Қолданбаның жұмысын және VK Object Storage ішіндегі деректерді сақтауды тексеріңіз)[id=ai-file-service-mcp-check]}

1. Container Apps ішінде орналастырылған қолданбаның URL мекенжайын алыңыз.
1. Орналастырылған қолданба арқылы сынақ файлын жүктеп салыңыз:

   ```console
   curl -X POST https://<URL_ПРИЛОЖЕНИЯ>/upload \
     -F "file=@test-document.txt"
   ```

1. Файлдың `ai-file-service-bucket` бакетінде пайда болғанын тексеріңіз:

   ```console
   aws s3 ls s3://ai-file-service-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

1. Қолданба API арқылы файлдардың тізімін сұраңыз:

   ```console
   curl https://<URL_ПРИЛОЖЕНИЯ>/files
   ```

   {cut(Жауап мысалы)}

   ```json
   {
     "files": ["test-document.txt"]
   }
   ```

   {/cut}

1. Presigned URL алыңыз және сақтау құрылғысының дұрыс жұмыс істеуіне көз жеткізу үшін файлды жүктеп алыңыз:

   ```console
   curl https://<URL_ПРИЛОЖЕНИЯ>/download-url/test-document.txt
   ```

1. Файлды алынған сілтеме бойынша жүктеп алыңыз және мазмұнын тексеріңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=ai-file-service-mcp-delete]}

Жасалған ресурстар {linkto(../../tariffication#s3-tariffication)[text=тарифтеленеді]}. Егер олар сізге қажет болмаса:

- Container Apps ішіндегі контейнерлік қолданбаны жойыңыз.
- {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Бакетті жойыңыз]} `ai-file-service-bucket`.