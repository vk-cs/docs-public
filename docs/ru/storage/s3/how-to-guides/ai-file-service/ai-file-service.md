# {heading(Создание файлового сервиса с Foundation Models и MCP)[id=ai-file-service-mcp]}

С помощью {var(s3)} можно создать файловый сервис, где объектное хранилище выступает основной системой хранения данных, а Foundation Models и MCP (Model Context Protocol) ускоряют разработку и деплой приложения. {var(s3)} обеспечивает S3-совместимый API, что позволяет использовать стандартные SDK (например, Boto3 для Python) для загрузки, скачивания и управления файлами.

Для примера далее используются следующие данные:

- Имя бакета: `ai-file-service-bucket`
- Регион: `ru-msk` (Москва)
- Endpoint URL: `https://hb.ru-msk.vkcloud-storage.ru`
- S3-ключи: `<ACCESS_KEY>` и `<SECRET_KEY>`

{note:warn}
Значения `<ACCESS_KEY>` и `<SECRET_KEY>` — тестовые плейсхолдеры. Используйте реальные значения ключей, созданных в вашем проекте {var(cloud)}.
{/note}

## {heading(Подготовительные шаги)[id=ai-file-service-mcp-prepare]}

1. Создайте аккаунт для сервиса {var(s3)}, если это еще не сделано:
   1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.
   1. Выберите проект.
   1. Перейдите в раздел **Object Storage** → **Аккаунты**.
   1. Нажмите кнопку **Добавить аккаунт** или **Добавить**.
   1. Задайте имя аккаунта.
   1. Нажмите кнопку **Создать**.
   1. В открывшемся окне скопируйте и сохраните идентификатор ключа доступа (**Access Key ID**) и секретный ключ (**Secret Key**).

      {note:warn}
      После закрытия окна восстановить секретный ключ будет невозможно. Если ключ утерян, создайте новый.
      {/note}

1. {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=Создайте бакет]} `ai-file-service-bucket` в регионе Москва.
1. Убедитесь, что [AWS CLI](../../../../tools-for-using-services/cli/aws-cli) установлен и настроен для работы с созданным аккаунтом {var(s3)}.
1. Укажите в конфигурации данные для подключения к бакету:

   ```txt
   [default]
   region = ru-msk
   output = json
   s3 =
       addressing_style = path
   ```

1. Убедитесь, что у вас установлен Python 3.10+ и пакетный менеджер `pip`.
1. Установите Boto3 — официальный SDK для Python:

   ```console
   pip install boto3
   ```

1. Убедитесь, что у вас есть доступ к Foundation Models и MCP-серверу {var(cloud)}.

## {heading(1. Сгенерируйте приложение с помощью Foundation Models)[id=ai-file-service-mcp-step1]}

Используйте Foundation Models для генерации каркаса файлового сервиса. Сформулируйте промпт для модели, описывающий задачу: веб-приложение на Python (Flask/FastAPI) с функциями загрузки, скачивания и получения ссылок на файлы, хранящиеся в S3-совместимом хранилище.

Пример промпта для Foundation Models:

```text
Создай веб-приложение на Python (FastAPI) для файлового сервиса.
Приложение должно:
- Принимать файлы через HTTP POST-запрос и загружать их в S3-совместимое хранилище (Boto3).
- Возвращать список загруженных файлов.
- Генерировать presigned URL для скачивания файлов.
- Использовать переменные окружения для конфигурации (endpoint, access key, secret key, bucket name).
```

Сохраните сгенерированный код в директорию проекта, например `ai-file-service/`.

## {heading(2. Настройте загрузку файлов в VK Object Storage)[id=ai-file-service-mcp-step2]}

Настройте приложение для работы с {var(s3)} через Boto3. Инициализируйте S3-клиент, явно указав `endpoint_url` и `region_name`, чтобы избежать попыток SDK подключиться к стандартным эндпоинтам AWS.

Пример инициализации клиента Boto3:

```python
import boto3
from botocore.client import Config
import os

# Учетные данные и параметры из переменных окружения
access_key = os.environ.get('S3_ACCESS_KEY')
secret_key = os.environ.get('S3_SECRET_KEY')
endpoint_url = os.environ.get('S3_ENDPOINT_URL', 'https://hb.ru-msk.vkcloud-storage.ru')
region_name = os.environ.get('S3_REGION', 'ru-msk')
bucket_name = os.environ.get('S3_BUCKET_NAME', 'ai-file-service-bucket')

# Инициализация клиента S3
s3_client = boto3.client(
    's3',
    endpoint_url=endpoint_url,
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key,
    region_name=region_name,
    config=Config(s3={'addressing_style': 'path'}, request_checksum_calculation="when_required", response_checksum_validation=None)
)
```

Пример функции загрузки файла в бакет:

```python
def upload_file(file_data: bytes, object_key: str) -> str:
    """Загружает файл в VK Object Storage и возвращает ключ объекта."""
    s3_client.put_object(
        Bucket=bucket_name,
        Key=object_key,
        Body=file_data
    )
    return object_key
```

Пример функции генерации presigned URL для скачивания файла:

```python
def generate_download_url(object_key: str, expiration: int = 3600) -> str:
    """Генерирует presigned URL для скачивания файла."""
    url = s3_client.generate_presigned_url(
        'get_object',
        Params={'Bucket': bucket_name, 'Key': object_key},
        ExpiresIn=expiration
    )
    return url
```

Пример функции получения списка загруженных файлов:

```python
def list_files() -> list:
    """Возвращает список объектов в бакете."""
    response = s3_client.list_objects_v2(Bucket=bucket_name)
    if 'Contents' in response:
        return [obj['Key'] for obj in response['Contents']]
    return []
```

Настройте переменные окружения для приложения:

```console
export S3_ACCESS_KEY=<ACCESS_KEY>
export S3_SECRET_KEY=<SECRET_KEY>
export S3_ENDPOINT_URL=https://hb.ru-msk.vkcloud-storage.ru
export S3_REGION=ru-msk
export S3_BUCKET_NAME=ai-file-service-bucket
```

## {heading(3. Проверьте хранение файлов и получение ссылок)[id=ai-file-service-mcp-step3]}

Запустите приложение локально и проверьте работу с {var(s3)}.

1. Запустите приложение:

   ```console
   cd ai-file-service
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

1. Загрузите тестовый файл через HTTP-запрос:

   ```console
   curl -X POST http://localhost:8000/upload \
     -F "file=@test-document.txt"
   ```

   {cut(Пример ответа)}

   ```json
   {
     "message": "File uploaded successfully",
     "key": "test-document.txt"
   }
   ```

   {/cut}

1. Убедитесь, что файл появился в бакете, с помощью AWS CLI:

   ```console
   aws s3 ls s3://ai-file-service-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   {cut(Пример вывода команды)}

   ```console
   2025-01-15 12:00:00         42 test-document.txt
   ```

   {/cut}

1. Запросите presigned URL для скачивания файла:

   ```console
   curl http://localhost:8000/download-url/test-document.txt
   ```

   {cut(Пример ответа)}

   ```json
   {
     "url": "https://hb.ru-msk.vkcloud-storage.ru/ai-file-service-bucket/test-document.txt?X-Amz-Algorithm=..."
   }
   ```

   {/cut}

1. Скачайте файл по полученной ссылке и убедитесь, что содержимое совпадает с оригиналом.

## {heading(4. Подключите MCP-сервер)[id=ai-file-service-mcp-step4]}

MCP (Model Context Protocol) позволяет автоматизировать сборку и деплой приложения. Подключите MCP-сервер к вашему проекту, чтобы управлять инфраструктурой {var(cloud)} через единый интерфейс.

1. Установите MCP-клиент и настройте подключение к MCP-серверу {var(cloud)}.
1. Настройте MCP-сервер для работы с {var(s3)}: укажите endpoint URL, ключи доступа и имя бакета `ai-file-service-bucket` в конфигурации MCP.
1. Убедитесь, что MCP-сервер имеет доступ к ресурсам {var(cloud)}: может создавать и управлять контейнерными приложениями, читать конфигурацию бакетов.

## {heading(5. Выполните сборку и деплой приложения в Container Apps через MCP)[id=ai-file-service-mcp-step5]}

Используйте MCP для автоматизации сборки Docker-образа и деплоя приложения в Container Apps.

1. Создайте `Dockerfile` для приложения:

   ```dockerfile
   FROM python:3.12-slim

   WORKDIR /app

   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt

   COPY . .

   CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
   ```

1. Создайте файл `requirements.txt`:

   ```txt
   fastapi
   uvicorn
   boto3
   python-multipart
   ```

1. Через MCP-сервер выполните сборку образа и деплой в Container Apps.
1. Передайте переменные окружения в контейнерное приложение:

   - `S3_ACCESS_KEY` — `<ACCESS_KEY>`
   - `S3_SECRET_KEY` — `<SECRET_KEY>`
   - `S3_ENDPOINT_URL` — `https://hb.ru-msk.vkcloud-storage.ru`
   - `S3_REGION` — `ru-msk`
   - `S3_BUCKET_NAME` — `ai-file-service-bucket`

   {note:warn}
   Не храните ключи доступа в коде приложения или в публичных репозиториях. Используйте переменные окружения или секреты Container Apps.
   {/note}

## {heading(6. Проверьте работу приложения и хранение данных в VK Object Storage)[id=ai-file-service-mcp-check]}

1. Получите URL развернутого приложения из Container Apps.
1. Загрузите тестовый файл через развернутое приложение:

   ```console
   curl -X POST https://<URL_ПРИЛОЖЕНИЯ>/upload \
     -F "file=@test-document.txt"
   ```

1. Убедитесь, что файл появился в бакете `ai-file-service-bucket`:

   ```console
   aws s3 ls s3://ai-file-service-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

1. Запросите список файлов через API приложения:

   ```console
   curl https://<URL_ПРИЛОЖЕНИЯ>/files
   ```

   {cut(Пример ответа)}

   ```json
   {
     "files": ["test-document.txt"]
   }
   ```

   {/cut}

1. Получите presigned URL и скачайте файл, чтобы убедиться в корректной работе хранилища:

   ```console
   curl https://<URL_ПРИЛОЖЕНИЯ>/download-url/test-document.txt
   ```

1. Скачайте файл по полученной ссылке и проверьте содержимое.

## {heading(Удалите неиспользуемые ресурсы)[id=ai-file-service-mcp-delete]}

Созданные ресурсы {linkto(../../tariffication#s3-tariffication)[text=тарифицируются]}. Если они вам больше не нужны:

- Удалите контейнерное приложение в Container Apps.
- {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Удалите бакет]} `ai-file-service-bucket`.
