# {heading(Получение доступов в бакеты)[id=mlspark-instructions-buckets]}

По умолчанию у кластера Spark есть доступ к бакету [VK Object Storage](/ru/storage/s3), который автоматически создается вместе с кластером.

Чтобы предоставить кластеру доступ к другим бакетам:

1. [Создайте аккаунт](/ru/storage/s3/instructions/access-management/access-keys) или [префиксные ключи доступа](/ru/storage/s3/instructions/access-management/bucket-keys) {var(s3)} в личном кабинете {var(cloud)}. Скопируйте и сохраните идентификатор ключа (**Access Key**) и секретный ключ (**Secret Key**).
1. {linkto(../../ml-platform-library/authz#mlspark-library-authz)[text=Создайте]} токен доступа с ролью `Администратор`, если это еще не сделано.
1. Создайте файл `s3_secret.yaml`. Вставьте следующий код в файл, указав полученные ключи доступа {var(s3)}:

     ```yaml
     apiVersion: v1
     kind: Secret
     metadata:
     name: s3-secret
     stringData:
     S3_ACCESS_KEY: "<идентификатор ключа в VK Object Storage>"
     S3_SECRET_KEY: "<секретный ключ в VK Object Storage>"
     ```

1. Выполните скрипт Python:

     ```python
     from mlplatform_client import MLPlatform

     REFRESH_TOKEN = "<значение токена доступа>"

     mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

     clusters = mlp.get_clusters()
     CLUSTER_ID = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'
     mlp.delete_secret(cluster_id=CLUSTER_ID, secret_name='s3-secret')
     mlp.create_secret_from_yaml(cluster_id=CLUSTER_ID, secret_yaml_path='s3_secret.yaml')
     ```

     Здесь:

     - `REFRESH_TOKEN`: токен доступа с ролью `Администратор`, созданный ранее.
     - `CLUSTER_ID`: идентификатор кластера, которому нужно предоставить доступ к бакету {var(s3)}.

После выполнения скрипта кластер Spark будет иметь доступ к бакетам, которые доступны по ключам {var(s3)}.
