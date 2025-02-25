By default, a Spark cluster has access to a [Cloud Storage](/en/storage/s3) bucket, which is automatically created along with the cluster.

To grant the cluster access to other buckets:

1. [Create an account](/ru/storage/s3/instructions/access-management/access-keys "change-lang") or [prefix access keys](/ru/storage/s3/service-management/buckets/bucket-keys "change-lang") for Cloud Storage in the VK Cloud management console. Copy and save the key ID (**Access Key**) and secret key (**Secret Key**).
1. [Create](/ru/ml/spark-to-k8s/ml-platform-library/authz "change-lang") an access token with the `Administrator` role if it hasn't been done yet.
1. Create the `s3_secret.yaml` file. Copy the following code into the file, specifying the obtained Cloud Storage access keys:

     ```yaml
     apiVersion: v1
     kind: Secret
     metadata:
     name: s3-secret
     stringData:
     S3_ACCESS_KEY: "<CLOUD_STORAGE_KEY_ID>"
     S3_SECRET_KEY: "<CLOUD_STORAGE_SECRET_KEY>"
     ```

1. Execute the Python script:

     ```python
     from mlplatform_client import MLPlatform

     REFRESH_TOKEN = "<ACCESS_TOKEN_VALUE>"

     mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

     clusters = mlp.get_clusters()
     CLUSTER_ID = '<XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX>'
     mlp.delete_secret(cluster_id=CLUSTER_ID, secret_name='s3-secret')
     mlp.create_secret_from_yaml(cluster_id=CLUSTER_ID, secret_yaml_path='s3_secret.yaml')
     ```

     Here:

     - `<ACCESS_TOKEN_VALUE>`: the access token with the `Administrator` role created earlier.
     - `<XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX>`: the ID of the cluster that needs access to the Cloud Storage bucket.

After executing the script, the Spark cluster will have access to the buckets available via the Cloud Storage keys.
