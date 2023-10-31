In this article, we will consider the scheme of work and the sequence of actions for setting up Gitlab, Harbor, and auto-deploying an application to a Kubernetes cluster.

## Hardware configuration

- Ubuntu Server 18.04 LTS x86_64.
- Installed and configured K8s cluster ([for example, in VK Cloud](https://mcs.mail.ru/app/services/containers/list/)).

## Scheme of work

**![](./assets/1583483568224-1583483568224.png)**

Set up Docker on the Ubuntu server, deploy Gitlab and Harbor in it. Gitlab is a full-featured Git server with the ability to store and manage repositories, as well as build tools (pipelines) and delivery (ci / cd). Harbor - registers for storing Docker images. K8s is a Kubernetes cluster in which test application auto-deployment is configured.

## Sequencing

1. [Install and configure Docker](/en/additionals/cases/cases-gitlab/case-docker).
2. [Install and configure Gitlab](/en/additionals/cases/cases-gitlab/case-gitlab).
3. [Install and configure Harbor](/en/additionals/cases/cases-gitlab/case-harbor).
4. [Configure auto-deployment of the application to the Kubernetes cluster](/en/additionals/cases/cases-gitlab/case-k8s-app).
