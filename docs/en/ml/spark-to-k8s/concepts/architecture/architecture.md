![Service architecture](/ru/ml/spark-to-k8s/concepts/architecture/assets/components_scheme.png)

The Cloud Spark service includes the following components:

- [a Cloud Spark cluster](#cluster_spark)
- [a virtual machine with Docker Registry](#vm_docker_registry)
- [Cloud Storage](#cloud_storage)
- [the Cloud ML Platform service](#service_ml_platform)

## {heading(Cloud Spark cluster)[id=cluster_spark]}

A Cloud Spark cluster is a K8s cluster deployed on the Cloud Containers service. The cluster consists of:

- A master node running the Spark Driver process. This process breaks down a user application into *tasks* (units of execution) and distributes them across worker nodes for parallel execution.
- Worker nodes, the number of which varies within given limits depending on the needs of the user application. When the user application starts, the Spark Executor process is launched on the worker nodes. It executes tasks coming from the Spark Driver process and returns the result back to Spark Driver.
- Spark Operator — a tool for managing the lifecycle of the cluster. It automates the processes of deployment, scaling, and updating. Spark Operator accepts *jobs* (requests to execute user applications) and launches the pods needed to execute the jobs and collect the results.
- Spark History Server — a service that accumulates information about the execution of the jobs. The service provides an interface where you can view the job execution history, analyze cluster performance, and diagnose problems.
- Authorization — an authorization service for Spark History Server.
- API server — a server that contains an API for interacting with the Spark components.

## {heading(VM with Docker Registry)[id=vm_docker_registry]}

[Docker Registry](/en/kubernetes/k8s/service-management/addons/advanced-installation/install-advanced-registry) stores the default Docker container image, which includes libraries, dependencies, and settings for deploying the Cloud Spark cluster and running user applications on it.

If necessary, the user can upload their own Docker images to Docker Registry and then use them in the service.

## {heading(Cloud Storage)[id=cloud_storage]}

[Cloud Storage](/en/storage/s3) is the VK Cloud object storage with the S3 support. When deploying the Cloud Spark service, a bucket integrated with the service is automatically created. It is used by default to store the Spark History Server logs, to download dependencies, files with user application code, and other artifacts required to complete user jobs.

You can also connect additional buckets to the Cloud Spark service.

## {heading(Cloud ML Platform service)[id=service_ml_platform]}

The Cloud ML Platform service includes the built-in Python library that provides methods for working with the Cloud Spark cluster. Using the library allows you to:

- Get information about the parameters and state of the cluster and manage its operation.
- Get ready-to-use manifests of the SparkApplication type and customize them for your applications.
- Run Spark jobs on the cluster using manifests of the SparkApplication type.
- Collect information about the progress of the Spark jobs.
- Create [Kubernetes secrets](https://kubernetes.io/docs/concepts/configuration/secret/). The secrets allow you to securely store and use sensitive data required when running user jobs.
- Create [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) — Kubernetes objects intended for storing configuration data. The purpose of using ConfigMaps is to simplify the transfer of user application code between different runtime environments.
