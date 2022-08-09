Проведя [предварительные настройки сессии](https://mcs.mail.ru/help/ru_RU/s3-python/s3-python-setup), можно приступить к работе с объектами S3.

## Загрузка объекта

Загрузка объектов в бакет инициализируется данной командой:

```
import boto3
session = boto3.session.Session()
s3_client = session.client(
    service_name='s3',
    endpoint_url='https://hb.bizmrg.com'
)


test_bucket_name = 'boto3-test-bucket-name'


#Загрузка данных из строки
s3_client.put_object(Body='TEST_TEXT_TEST_TEXT', Bucket=test_bucket_name, Key='test_file.txt')


#Загрузка локального файла
s3_client.upload_file('some_test_file_from_local.txt', test_bucket_name, 'copy_some_test_file.txt')


#Загрузка локального файла в директорию внутри бакета
s3_client.upload_file('some_test_file_from_local.txt', test_bucket_name, 'backup_dir/copy_some_test_file.txt')
```

Подробное описание команд PUT_OBJECT и UPLOAD_FILE дано в официальной документации библиотеки boto3 по методам [PUT](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.put_object) и [UPLOAD](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.upload_file).

## Копирование объектов между бакетами

Копирование объектов между бакетами можно выполнить следующим образом:

```
import boto3
session = boto3.session.Session()
s3_client = session.client(
    service_name='s3',
    endpoint_url='https://hb.bizmrg.com'
)


source_bucket_name = 'boto3-source-bucket-name'
source_path = 'object_key1.txt'
target_bucket_name = 'boto3-target-bucket-name'
target_path = 'backup/copy_object_key1.txt'


copy_source = {
    'Bucket': source_bucket_name,
    'Key': source_path
}


s3_client.copy(copy_source, target_bucket_name, target_path)
```

Подробное описание команды COPY дано в [официальной документации библиотеки boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.copy)

## Получение объекта

Для получения объекта из бакета следует воспользоваться следующим способом:

```
import boto3
session = boto3.session.Session()
s3_client = session.client(
    service_name='s3',
    endpoint_url='https://hb.bizmrg.com'
)


response = s3_client.get_object(Bucket='boto3-bucket-name-test', Key='object_name.txt')
print(response)
print(response['Body'].read())
```

Подробное описание команды GET_OBJECT дано в [официальной документации библиотеки boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.get_object)

## Получение списка объектов

Для получения списка объектов в бакете необходимо:

```
import boto3
session = boto3.session.Session()
s3_client = session.client(
    service_name='s3',
    endpoint_url='https://hb.bizmrg.com'
)


test_bucket_name = 'boto3-test-bucket-name'


for key in s3_client.list_objects(Bucket=test_bucket_name)['Contents']:
    print(key['Key'])
```

Подробное описание команды LIST_OBJECT дано в [официальной документации библиотеки boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.list_objects).

## Удаление объекта

Чтобы удалить объекты в бакете:

```
import boto3
session = boto3.session.Session()
s3_client = session.client(
    service_name='s3',
    endpoint_url='https://hb.bizmrg.com'
)


test_bucket_name = 'boto3-test-bucket-name'


#Удаление одного объекта
s3_client.delete_object(Bucket='boto3-bucket-name-test', Key='object_name.txt',)


#Удаление множества объектов
object_to_delete = [{'Key':'objectkey1.txt'}, {'Key':'objectkey2.txt'}]
s3_client.delete_objects(Bucket=test_bucket_name, Delete={'Objects': object_to_delete})
```

Подробное описание команды DELETE_OBJECTS дано в [официальной документации библиотеки boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.delete_objects).
