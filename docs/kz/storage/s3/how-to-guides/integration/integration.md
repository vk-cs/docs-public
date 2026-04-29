{include(/kz/_includes/_translated_by_ai.md)}

Объектілік сақтау қоймасын басқаруды қолданбалар мен DevOps процестеріне біріктіру үшін SDK арқылы бағдарламалық қолжетімділік пайдаланылады. Python үшін ресми SDK болып табылатын Boto3 VK Object Storage жүйесінің S3-пен үйлесімділігі арқасында толық қолдау табады.

## Дайындық қадамдары

SDK арқылы VK Object Storage жүйесіне қосылу үшін [Boto3-ті баптаңыз](/kz/storage/s3/connect/s3-sdk).

{note:info}

SDK-ның стандартты AWS endpoint-теріне қосылу әрекеттерін болдырмау үшін `endpoint_url` және `region_name` мәндерін нақты көрсетіңіз.

{/note}

Python тілінде Boto3 клиентін инициализациялау мысалы:

```python
import boto3
from botocore.client import Config

# Учетные данные и параметры
access_key = 'YOUR_VK_CLOUD_ACCESS_KEY'
secret_key = 'YOUR_VK_CLOUD_SECRET_KEY'
endpoint_url = 'https://hb.ru-msk.vkcloud-storage.ru'
region_name = 'ru-msk'

# Инициализация клиента S3
s3_client = boto3.client(
    's3',
    endpoint_url=endpoint_url,
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key,
    region_name=region_name,
    config=Config(s3={'addressing_style': 'virtual'}, request_checksum_calculation=”when_required”, response_checksum_validation=None)
)
```

## Объектілік сақтау қоймасын басқаруды автоматтандырыңыз

Объектілік сақтау қоймасын басқаруды қолданба кодына біріктіру үшін Python тілінде скрипт жасаңыз.

Бағдарламалық түрде бұғаттауларды басқаруды көрсететін, [сыни резервтік көшірмелерді қорғау](/kz/storage/s3/how-to-guides/critical-backups-protect) процесін автоматтандыратын скрипт мысалы:

```python
import boto3
import datetime
from botocore.exceptions import ClientError

# ... (инициализация s3_client) ...
bucket_name = 'immutable-backup-storage-2025'
object_key = 'backups/scripted_db_backup.sql.gz'
local_file_path = 'db_backup_2025-08-15.sql.gz'

# Расчет даты окончания блокировки (1 год от текущего момента)
retain_until_date = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=365)

try:
# 1. Загрузка объекта с установкой блокировки
print(f"Uploading {object_key} to bucket {bucket_name}...")
with open(local_file_path, "rb") as f:
s3_client.put_object(
    Bucket=bucket_name,
    Key=object_key,
    Body=f,
    ObjectLockMode='COMPLIANCE',
    ObjectLockRetainUntilDate=retain_until_date
)
print("Upload and lock successful.")

    # 2. Верификация блокировки
    print("Verifying object lock status...")
    response = s3_client.get_object_retention(
        Bucket=bucket_name,
        Key=object_key
    )
    retention_info = response.get('Retention', {})
    print(f"Lock Mode: {retention_info.get('Mode')}")
    print(f"Retain Until: {retention_info.get('RetainUntilDate')}")

    # 3. Попытка удаления (ожидается ошибка)
    print("\nAttempting to delete the locked object...")
    s3_client.delete_object(
        Bucket=bucket_name,
        Key=object_key
    )

except ClientError as e:
if e.response['Error']['Code'] == 'AccessDenied':
print("Successfully blocked deletion attempt as expected. Error: Access Denied.")
else:
print(f"An unexpected error occurred: {e}")

except Exception as e:
print(f"A general error occurred: {e}")
```

[Қатаң бұғаттаумен](/kz/storage/s3/how-to-guides/regulatory-requirements) (`COMPLIANCE`) жүктеу процесін автоматтандыратын скрипт фрагментінің мысалы:

```python
import datetime
# ... (инициализация s3_client) ...
retain_until_date = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=365) # Пример: 1 год
s3_client.put_object(
    Bucket='your-152fz-compliance-data',
    Key='logs/scripted_personal_data_log.gz',
    Body=open('local_log_file.gz', 'rb'),
    ObjectLockMode='COMPLIANCE',
    ObjectLockRetainUntilDate=retain_until_date
)
```

