It is important to deploy new experimental machine learning models quickly in production, otherwise, the data will become outdated and there will be problems with the reproducibility of experiments. But it is not always possible to do this quickly, since often the process of transferring a model from a Data Scientist to a Data Engineer is poorly established. The MLOps approach solves this problem, but to implement it, special tools are needed, for example, Kubeflow.

At the same time, installing and configuring Kubeflow is a rather difficult process. Although there is official documentation, it does not describe how to deploy Kubeflow in a production version, and not just on a test local machine. Also in some instructions, some problems need to be circumvented and look for solutions.

In this article, we will introduce you to Kubeflow at a basic level and show you how to deploy it. We will not get acquainted in detail with all the components of Kubeflow, because this goes beyond the scope of basic familiarization.

In the course of this article, we:

1. [Create a Kubernetes cluster](https://mcs.mail.ru/containers /) on the VK Cloud platform.
2. Install Istio.
3. Install Kubeflow.
4. Launch JupyterHub.
5. We will train and publish a test model.

But first I'll tell you a little about MLOps and Kubeflow.

> If you prefer a video tutorial, you can watch the webinar "[MLOps without pain in the cloud. Deploying Kubeflow](https://youtu.be/fZ-g2TjhhGE)".

### A few words about MLOps

MLOps (Machine Learning Operations) is a kind of [DevOps] (https://mcs.mail.ru/blog/chto-takoe-metodologiya-devops ) for machine learning, which helps to standardize the process of developing machine learning models and reduces the time they are rolled out into production.

MLOps helps break down the barrier between Data Scientist and Data Engineer. It often happens like this: a Data Scientist develops a new model, gives it to a data engineer, and leaves again to set up new experiments and try new models. And the Data Engineer is trying to deploy this model in production, but since he did not participate in its development, it may take him several months. It can take up to six months from the start of the development of the model to its deployment in production. All this time, the model does not work and does not bring benefits, the data becomes outdated, and there is a problem of the reproducibility of experiments.

With MLOps, the new model is quickly transferred to production and begins to benefit the business. MLOps also solves the tasks of tracking models, versioning, and monitoring models in production.

### Kubeflow in conjunction with MLOps

Kubeflow is an open-source Cloud—Native platform designed for Machine learning and Data Science. Kubeflow runs on top of Kubernetes, is fully integrated with it, and makes the most of the cluster's capabilities like autoscaling and flexible resource control.

Kubeflow includes many components that solve different tasks of Data Science and Machine Learning. All these components are Open Source, you can use them separately. That is, working with Kubeflow, you can gain experience with these components and transfer them later to other tasks.

Another advantage of Kubeflow is that it allows you to quickly launch JupyterHub and configure an individual environment for data scientists.

In the traditional approach, JupyterHub is often installed on one powerful server, which can have 60-100 cores and several hundred gigabytes of RAM. But over time, the Data Science department is growing, there are not enough resources for everyone. In addition, the general environment leads to conflicts when some of the data scientists need to update library versions or install new ones, while others do not need it.

Using Kubeflow inside the cloud Kubernetes, you solve this problem: any Data Scientist can quickly deploy an experimental environment with the right amount of resources in a few clicks. And when the experiment is over, the resources are released and returned to the cloud. Kubeflow also allows you to deploy completely isolated individual JupyterHub instances from separate Docker images. That is, every data scientist can customize the environment to suit their needs.

Other Kubeflow Features:

- fast publication of models via TensorFlow Serving, Seldon Core components — you can make them available via REST protocol or gRPC;
- convenient UI for managing experiments and monitoring models - you can build your Kubeflow from open components, but it will be much more difficult to manage them without UI;
- orchestration of complex machine learning pipelines from multiple steps — the platform partially replaces AirFlow;
- built-in component that is responsible for the selection of hyperparameters;
- Metadata management capabilities and Feature Store.

It is important to note that some of the Kubeflow components are still in beta. But now you can start using Kubeflow, because it is one of the few Production-Ready platforms that solve MLOps and machine learning tasks. To begin with, Kubeflow can be used as a flexible version of JupyterHub, and then gradually get acquainted with the rest of the features.

So, let's start installing Kubeflow.

### Instructions for installing and configuring Kubeflow

#### Step 1: Creating a Kubernetes cluster

First, we need to deploy a Kubernetes cluster. We will do this on our VK Cloud cloud platform.

> Before creating a cluster, you need to configure the network and generate and upload an SSH key to connect to the VM. You can set up the network yourself [according to the instructions](https://mcs.mail.ru/help/ru_RU/networks/create-net#section-0).

First, go to the VK Cloud panel and create [Kubernetes cluster](https://mcs.mail.ru/containers /). The cluster can be created in different configurations, select "Other", and specify the version of Kubernetes 1.16.4. This is not the most up-to-date version that is available on the platform, but, according to Kubeflow developers, it is best tested. We also select two pre-installed services: monitoring based on Prometheus/Grafana and Ingress Controller.

![](./assets/helpjuice_production-2fuploads-2fupload-2fimage-2f7055-2fdirect-2f1617879700216-1617879700216.png)

In the next step, select the cluster configuration. The VM type is "Standard 4-8", and the disk size is 200 GB. We select a pre-configured network and mark "Assign external IP" - this is necessary to connect to this machine later. Then select the SSH key for the connection, which is generated and downloaded in advance.

![](./assets/helpjuice_production-2fuploads-2fupload-2fimage-2f7055-2fdirect-2f1617879699650-1617879699650.png)

On the next tab, you need to specify the minimum system requirements for the Kubeflow working node. In [minimum system requirements](https://www.kubeflow.org/docs/started/k8s/overview /) 4 cores, 50 GB of disk and 12 GB of RAM are specified. Creating a node with a margin: 8 cores, 200 GB of disk, and 16 GB of RAM.

An important point: turn on autoscaling and specify a maximum of 10 nodes. This is necessary in case more resources are needed during operation, then the cluster itself will create additional nodes.

![](./assets/helpjuice_production-2fuploads-2fupload-2fimage-2f7055-2fdirect-2f1617879697266-1617879697266.png)

If there are difficulties, here are [full instructions] (https://mcs.mail.ru/help/ru_RU/k8s-start/create-k8s ) to create a Kubernetes cluster.

After the cluster has been created, you need to connect to the master node and make some changes. This is necessary, since Kubeflow requires one feature to work, which is not active yet, but we will soon turn it on according to the standard. To do this, you first need to assign a white external IP address. Therefore, in the VK Cloud panel, go to the "Cloud Computing" section — "[Virtual machines](https://mcs.mail.ru/app/services/infra/servers /)". Opposite the master node in the drop-down menu, select "Manage IP addresses".

![](./assets/helpjuice_production-2fuploads-2fupload-2fimage-2f7055-2fdirect-2f1617879700316-1617879700316.png)

In the window that appears, in the "External" column, assign an external IP address and copy it as soon as it is created.

![](./assets/helpjuice_production-2fuploads-2fupload-2fimage-2f7055-2fdirect-2f1617879697606-1617879697606.png)

Now we connect via SSH to the Kubernetes master node, substituting our parameters:

```
ssh -i your_key.pem centos@ip_of_master
```

Open the /etc/kubernetes/apiserver file for editing:

```
sudo vim /etc/kubernetes/apiserver
```

In the line `KUBE_API_ARGS` we add parameters. This is necessary for Kubeflow and Istio to work:

```
--service-account-issuer="kubernetes.default.svc--service-account-signing-key-file=/etc/kubernetes/certs/ca.key--service-account-api-audiences=api,istio-ca
```

Now you can unlink the external IP address from the master node.

![](./assets/helpjuice_production-2fuploads-2fupload-2fimage-2f7055-2fdirect-2f1617879703305-1617879703305.png)

Then you need to reboot the Kubernetes cluster after making changes. To do this, in the section "[Kubernetes Clusters](https://mcs.mail.ru/app/services/containers/list /)" first we stop the cluster, and then we start it again.

![](./assets/helpjuice_production-2fuploads-2fupload-2fimage-2f7055-2fdirect-2f1617879697380-1617879697380.png)

When the Kubernetes cluster is stopped, you only pay for disk space, which is convenient when conducting experiments in the cloud.

Next, we need to prepare a virtual machine in which we will perform all further actions. First [create a VM](https://mcs.mail.ru/help/ru_RU/create-vm/vm-quick-create) with Ubuntu 18.04 OS and [connect to it via SSH](https://mcs.mail.ru/help/ru_RU/vm-connect/vm-connect-nix). Then [install kubectl](https://mcs.mail.ru/help/ru_RU/k8s-start/connect-k8s#section-2) and [import the configuration file](https://mcs.mail.ru/help/ru_RU/k8s-start/connect-k8s#section-9) to connect to the created Kubernetes cluster. You can also deploy all this on your machine.
