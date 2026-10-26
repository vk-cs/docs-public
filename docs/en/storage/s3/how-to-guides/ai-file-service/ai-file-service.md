# {heading(Creating a file service with Foundation Models and MCP)[id=ai-file-service-mcp]}

{include(/en/_includes/_translated_by_ai_en.md)}

With {var(s3)}, you can create a file service where object storage serves as the primary data storage system, while Foundation Models and MCP (Model Context Protocol) speed up application development and deployment. {var(s3)} provides an S3-compatible API, allowing you to use standard SDKs (such as Boto3 for Python) to upload, download, and manage files.

The following data is used as an example:

- Bucket name: `ai-file-service-bucket`
- Region: `ru-msk` (Moscow)
- Endpoint URL: `https://hb.ru-msk.vkcloud-storage.ru`
- S3 keys: `<ACCESS_KEY>` and `<SECRET_KEY>`

{note:warn}
The `<ACCESS_KEY>` and `<SECRET_KEY>` values are test placeholders. Use the real values of the keys created in your {var(cloud)} project.
{/note}

## {heading(Preparation steps)[id=ai-file-service-mcp-prepare]}

1. Create an account for the {var(s3)} service, if you have not done so yet:
   1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
   1. Select a project.
   1. Go to the **Object Storage** → **Аккаунты** section.
   1. Click the **Добавить аккаунт** or **Добавить** button.
   1. Set the account name.
   1. Click the **Создать** button.
   1. In the window that opens, copy and save the access key identifier (**Access Key ID**) and the secret key (**Secret Key**).

      {note:warn}
      After the window is closed, the secret key cannot be recovered. If the key is lost, create a new one.
      {/note}

1. {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=Create a bucket]} `ai-file-service-bucket` in the Moscow region.
1. Make sure that [AWS CLI](../../../../tools-for-using-services/cli/aws-cli) is installed and configured to work with the created {var(s3)} account.
1. Specify the connection details for the bucket in the configuration:

   ```txt
   [default]
   region = ru-msk
   output = json
   s3 =
       addressing_style = path
   ```

1. Make sure that you have Python 3.10+ and the `pip` package manager installed.
1. Install Boto3, the official SDK for Python:

   ```console
   pip install boto3
   ```

1. Make sure that you have access to Foundation Models and the {var(cloud)} MCP server.

## {heading(1. Generate the application using Foundation Models)[id=ai-file-service-mcp-step1]}

Use Foundation Models to generate the file service skeleton. Formulate a prompt for the model describing the task: a Python web application (Flask/FastAPI) with functions for uploading, downloading, and getting links to files stored in S3-compatible storage.

Example prompt for Foundation Models:

```text
Create a Python web application (FastAPI) for a file service.
The application should:
- Accept files via HTTP POST requests and upload them to S3-compatible storage (Boto3).
- Return a list of uploaded files.
- Generate presigned URLs for downloading files.
- Use environment variables for configuration (endpoint, access key, secret key, bucket name).
```

Save the generated code to the project directory, for example `ai-file-service/`.

## {heading(2. Configure file uploads to VK Object Storage)[id=ai-file-service-mcp-step2]}

Configure the application to work with {var(s3)} via Boto3. Initialize the S3 client by explicitly specifying `endpoint_url` and `region_name` to prevent the SDK from attempting to connect to the standard AWS endpoints.

Example of Boto3 client initialization:

```python
import boto3
from botocore.client import Config
import os

# Credentials and parameters from environment variables
access_key = os.environ.get('S3_ACCESS_KEY')
secret_key = os.environ.get('S3_SECRET_KEY')
endpoint_url = os.environ.get('S3_ENDPOINT_URL', 'https://hb.ru-msk.vkcloud-storage.ru')
region_name = os.environ.get('S3_REGION', 'ru-msk')
bucket_name = os.environ.get('S3_BUCKET_NAME', 'ai-file-service-bucket')

# S3 client initialization
s3_client = boto3.client(
    's3',
    endpoint_url=endpoint_url,
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key,
    region_name=region_name,
    config=Config(s3={'addressing_style': 'path'}, request_checksum_calculation="when_required", response_checksum_validation=None)
)
```

Example of a function for uploading a file to the bucket:

```python
def upload_file(file_data: bytes, object_key: str) -> str:
    """Uploads a file to VK Object Storage and returns the object key."""
    s3_client.put_object(
        Bucket=bucket_name,
        Key=object_key,
        Body=file_data
    )
    return object_key
```

Example of a function for generating a presigned URL for downloading a file:

```python
def generate_download_url(object_key: str, expiration: int = 3600) -> str:
    """Generates a presigned URL for downloading a file."""
    url = s3_client.generate_presigned_url(
        'get_object',
        Params={'Bucket': bucket_name, 'Key': object_key},
        ExpiresIn=expiration
    )
    return url
```

Example of a function for getting a list of uploaded files:

```python
def list_files() -> list:
    """Returns a list of objects in the bucket."""
    response = s3_client.list_objects_v2(Bucket=bucket_name)
    if 'Contents' in response:
        return [obj['Key'] for obj in response['Contents']]
    return []
```

Configure the environment variables for the application:

```console
export S3_ACCESS_KEY=<ACCESS_KEY>
export S3_SECRET_KEY=<SECRET_KEY>
export S3_ENDPOINT_URL=https://hb.ru-msk.vkcloud-storage.ru
export S3_REGION=ru-msk
export S3_BUCKET_NAME=ai-file-service-bucket
```

## {heading(3. Verify file storage and link generation)[id=ai-file-service-mcp-step3]}

Run the application locally and verify its operation with {var(s3)}.

1. Run the application:

   ```console
   cd ai-file-service
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

1. Upload a test file via an HTTP request:

   ```console
   curl -X POST http://localhost:8000/upload \
     -F "file=@test-document.txt"
   ```

   {cut(Response example)}

   ```json
   {
     "message": "File uploaded successfully",
     "key": "test-document.txt"
   }
   ```

   {/cut}

1. Verify that the file has appeared in the bucket using AWS CLI:

   ```console
   aws s3 ls s3://ai-file-service-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   {cut(Command output example)}

   ```console
   2025-01-15 12:00:00         42 test-document.txt
   ```

   {/cut}

1. Request a presigned URL for downloading the file:

   ```console
   curl http://localhost:8000/download-url/test-document.txt
   ```

   {cut(Response example)}

   ```json
   {
     "url": "https://hb.ru-msk.vkcloud-storage.ru/ai-file-service-bucket/test-document.txt?X-Amz-Algorithm=..."
   }
   ```

   {/cut}

1. Download the file using the received link and verify that the contents match the original.

## {heading(4. Connect the MCP server)[id=ai-file-service-mcp-step4]}

MCP (Model Context Protocol) allows you to automate the assembly and deployment of the application. Connect the MCP server to your project to manage {var(cloud)} infrastructure through a single interface.

1. Install the MCP client and configure the connection to the {var(cloud)} MCP server.
1. Configure the MCP server to work with {var(s3)}: specify the endpoint URL, access keys, and the `ai-file-service-bucket` bucket name in the MCP configuration.
1. Make sure that the MCP server has access to {var(cloud)} resources: it can create and manage containerized applications and read bucket configurations.

## {heading(5. Build and deploy the application to Container Apps via MCP)[id=ai-file-service-mcp-step5]}

Use MCP to automate the Docker image build and the application deployment to Container Apps.

1. Create a `Dockerfile` for the application:

   ```dockerfile
   FROM python:3.12-slim

   WORKDIR /app

   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt

   COPY . .

   CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
   ```

1. Create a `requirements.txt` file:

   ```txt
   fastapi
   uvicorn
   boto3
   python-multipart
   ```

1. Use the MCP server to build the image and deploy it to Container Apps.
1. Pass the environment variables to the containerized application:

   - `S3_ACCESS_KEY` — `<ACCESS_KEY>`
   - `S3_SECRET_KEY` — `<SECRET_KEY>`
   - `S3_ENDPOINT_URL` — `https://hb.ru-msk.vkcloud-storage.ru`
   - `S3_REGION` — `ru-msk`
   - `S3_BUCKET_NAME` — `ai-file-service-bucket`

   {note:warn}
   Do not store access keys in the application code or in public repositories. Use environment variables or Container Apps secrets.
   {/note}

## {heading(6. Verify application operation and data storage in VK Object Storage)[id=ai-file-service-mcp-check]}

1. Get the URL of the deployed application from Container Apps.
1. Upload a test file through the deployed application:

   ```console
   curl -X POST https://<APP_URL>/upload \
     -F "file=@test-document.txt"
   ```

1. Verify that the file has appeared in the `ai-file-service-bucket` bucket:

   ```console
   aws s3 ls s3://ai-file-service-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

1. Request the list of files via the application API:

   ```console
   curl https://<APP_URL>/files
   ```

   {cut(Response example)}

   ```json
   {
     "files": ["test-document.txt"]
   }
   ```

   {/cut}

1. Get a presigned URL and download the file to verify that the storage works correctly:

   ```console
   curl https://<APP_URL>/download-url/test-document.txt
   ```

1. Download the file using the received link and check its contents.

## {heading(Delete unused resources)[id=ai-file-service-mcp-delete]}

The created resources are {linkto(../../tariffication#s3-tariffication)[text=charged]}. If you no longer need them:

- Delete the containerized application in Container Apps.
- {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Delete the bucket]} `ai-file-service-bucket`.