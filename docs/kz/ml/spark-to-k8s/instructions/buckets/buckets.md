{include(/kz/_includes/_translated_by_ai.md)}

Әдепкі бойынша Spark кластерінде кластермен бірге автоматты түрде жасалатын [VK Object Storage](/kz/storage/s3) бакетіне қолжетімділік бар.

Кластерге басқа бакеттерге қолжетімділік беру үшін:

1. Жеке кабинетте VK Cloud [аккаунт](/kz/storage/s3/instructions/access-management/access-keys) немесе S3 үшін [префикстік қолжетімділік кілттерін](/kz/storage/s3/instructions/access-management/bucket-keys) жасаңыз. Кілт идентификаторын (**Access Key**) және құпия кілтті (**Secret Key**) көшіріп, сақтап қойыңыз.
1. Егер бұл әлі жасалмаса, `Администратор` рөлімен қолжетімділік токенін [жасаңыз](/kz/ml/spark-to-k8s/ml-platform-library/authz).
1. `s3_secret.yaml` файлын жасаңыз. Файлға алынған S3 қолжетімділік кілттерін көрсете отырып, келесі кодты қойыңыз:

     ```yaml
     apiVersion: v1
     kind: Secret
     metadata:
     name: s3-secret
     stringData:
     S3_ACCESS_KEY: "<идентификатор ключа в VK Object Storage>"
     S3_SECRET_KEY: "<секретный ключ в VK Object Storage>"
     ```

1. Python скриптін орындаңыз:

     ```python
     from mlplatform_client import MLPlatform

     REFRESH_TOKEN = "<значение токена доступа>"

     mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

     clusters = mlp.get_clusters()
     CLUSTER_ID = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'
     mlp.delete_secret(cluster_id=CLUSTER_ID, secret_name='s3-secret')
     mlp.create_secret_from_yaml(cluster_id=CLUSTER_ID, secret_yaml_path='s3_secret.yaml')
     ```

     Мұнда:

     - `REFRESH_TOKEN`: бұрын жасалған `Администратор` рөлі бар қолжетімділік токені.
     - `CLUSTER_ID`: S3 бакетіне қолжетімділік беру қажет кластердің идентификаторы.

Скрипт орындалғаннан кейін Spark кластері S3 кілттері бойынша қолжетімді бакеттерге қолжетімді болады.
