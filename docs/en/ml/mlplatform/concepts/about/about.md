## MLOps concept

The standard development process in ML includes the following steps:

1. Experimentation stage:

    1. Design: connecting sources, data engineering, preparing features.
    1. Model development: experiments with data and ML models, tracking and versioning of experiments, data, and artifacts.
1. Output to production: ML models deployment, integration into the product, monitoring and updating of models in production.

Different specialists work at different stages of this process, so moving from one stage to another takes a long time. As a result, many ML models do not reach production.

_MLOps_ (Machine Learning Operations) helps solve this problem. It standardizes the process of developing models and automates their implementation.

Tasks that MLOps performs:

- Conducting experiments with data.
- Training ML models.
- Tracking ML models.
- Versioning experiments, datasets, and models.
- Monitoring models behavior in production.
- Updating of operating ML models.

There are a large number of tools to perform these tasks in MLOps:

- Complex ones that solve many tasks at once (Kubeflow, MLflow).
- Tools for solving individual problems, integrated with each other (for example, Jupyter + lakeFS + Airflow + KServe).

## Cloud ML Platform

Cloud ML Platform is an MLOps platform built on open source tools that allows you to perform tasks from experimenting with data to deploying models in production.

Cloud ML Platform components:

[cols="1,3"]
|===
|**JupyterHub**
|Data experimentation environment. Contains a set of popular libraries and a pre-configured environment for the GPU. Supports multiple users simultaneously

|**MLflow**
|Service for MLOps tasks. Allows you to organize centralized tracking and storage of models, experiments parameters, data specialists work artifacts

|**MLflow Deploy**
|Service integrated with MLflow and JupyterHub that allows you to pack models into docker containers and make them available via the REST API
|===

Cloud ML Platform advantages:

- Cloud ML Platform allows you to shorten the time for testing hypotheses and launching pilot projects.
- The infrastructure scales quickly to provide professionals enough resources at every stage of data handling.
- Cloud ML Platform is built on the basis of popular open source tools.
- All data tools in Cloud ML Platform are available in a single environment, integrated with each other and pre-configured for a quick start.
- Cloud ML Platform allows you to standardize the solution of data tasks with the distribution of roles and areas of responsibility of specialists.
- Security is ensured when working with data in accordance with the law. Cloud ML Platform is deployed in a VK Cloud that meets the requirements of 152 Federal Law, Security Level 1, and PCI DSS certification.
- You pay only for the necessary resources using the "pay as you go" system.
