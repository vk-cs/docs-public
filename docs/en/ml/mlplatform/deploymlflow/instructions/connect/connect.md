# {heading(Connecting to MLflow Deploy)[id=mlflowdeploy-instructions-connect]}

{include(/en/_includes/_translated_by_ai_en.md)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **ML Platform** → **Instances** section.
1. Click the link in the **DNS name** column for the desired MLflow Deploy instance.
1. Log in to the instance:

    - If the linked MLflow instance was created for collaboration with JupyterHub, use the JupyterHub user credentials to log in.
    - If the linked MLflow instance was created in [Standalone](../../../concepts/mlflow-modes) mode, use the credentials added when [creating the MLflow instance](../../../mlflow/instructions/create) to log in.