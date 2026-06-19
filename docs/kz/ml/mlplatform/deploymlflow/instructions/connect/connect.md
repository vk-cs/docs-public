# {heading(MLflow Deploy-ке қосылу)[id=mlflowdeploy-instructions-connect]}

{include(/kz/_includes/_translated_by_ai.md)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
1. **ML Platform** → **Инстанстар** бөліміне өтіңіз.
1. Қажетті MLflow Deploy инстансы үшін **DNS-аты** бағанындағы сілтемені басыңыз.
1. Инстанста авторизациядан өтіңіз:

    - Егер байланысты MLflow инстансы JupyterHub-пен бірге жұмыс істеу үшін жасалған болса, авторизация үшін JupyterHub пайдаланушысының тіркелгі деректерін пайдаланыңыз.
    - Егер байланысты MLflow инстансы [Standalone](../../../concepts/mlflow-modes) режимінде жасалған болса, авторизация үшін [MLflow инстансын жасау](../../../mlflow/instructions/create) кезінде қосылған тіркелгі деректерін пайдаланыңыз.
