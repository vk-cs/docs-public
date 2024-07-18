По умолчанию у кластера Spark есть доступ к бакету [Cloud Storage](/ru/storage/s3), который автоматически создается вместе с кластером.

Чтобы предоставить кластеру доступ к другим бакетам:

1. [Создайте аккаунт](/ru/storage/s3/instructions/access-management/access-keys) или [префиксные ключи доступа](/ru/storage/s3/service-management/buckets/bucket-keys) Cloud Storage в личном кабинете VK Cloud. Cкопируйте и сохраните идентификатор ключа (**Access Key**) и секретный ключ (**Secret Key**).
1. [Создайте](/ru/ml/spark-to-k8s/ml-platform-library/authz) токен доступа с ролью `Администратор`, если это еще не сделано.
1. Создайте файл `s3_secret.yaml`. Вставьте следующий код в файл, указав полученные ключи доступа Cloud Storage:

     ```yaml
     apiVersion: v1
     kind: Secret
     metadata:
     name: s3-secret
     stringData:
     S3_ACCESS_KEY: "<идентификатор ключа в Cloud Storage>"
     S3_SECRET_KEY: "<секретный ключ в Cloud Storage>"
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
     - `CLUSTER_ID`: идентификатор кластера, которому нужно предоставить доступ к бакету Cloud Storage.

После выполнения скрипта кластер Spark будет иметь доступ к бакетам, которые доступны по ключам Cloud Storage.
