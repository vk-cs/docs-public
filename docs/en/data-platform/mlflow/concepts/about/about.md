# {heading(About the service)[id=mlflow_info]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

MLflow is an open source platform for managing the full lifecycle of machine learning (ML) models. It allows you to organize centralized tracking and storage of: models, experiment parameters, and artifacts of data specialists' work. For more information about MLflow, see the [official documentation](https://mlflow.org/docs/latest/).

Key MLflow capabilities:

- Experiment tracking via the MLflow Tracking component:

    - logging experiment metrics and parameters;
    - saving artifacts: models, images, files;
    - visualizing results in the UI.

- Code version management via the MLflow Projects component:

    - a standardized format for packaging code;
    - experiment reproducibility;
    - support for various runtime environments.

- Environment packaging via the MLflow Models component:

    - creating portable environments for models;
    - support for multiple frameworks: TensorFlow, PyTorch, Scikit-learn;
    - automatic REST API creation;
    - packaging models into a Docker image for subsequent use in Kubernetes.

- Model registration via the MLflow Registry component:

    - a centralized model repository;
    - version management;
    - access control and annotations.

An MLflow instance can be {linkto(../../instructions/create#mlflow_create)[text=created]} only in the Cluster configuration (consists of multiple nodes). This solution is suitable for processing large volumes of data and provides high performance and fault tolerance: the failure of a single node will not cause the instance to stop working.