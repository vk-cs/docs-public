In this article, we will consider the scheme of work and the sequence of actions for setting up Gitlab, Harbor, and auto-deploying an application to a Kubernetes cluster.

## Hardware configuration

- Ubuntu Server 18.04 LTS x86_64.
- Installed and configured K8s cluster ([for example, in VK Cloud](https://mcs.mail.ru/app/services/containers/list/)).

## Scheme of work

**![](./assets/1583483568224-1583483568224.png)**

Set up Docker on the Ubuntu server, deploy Gitlab and Harbor in it. Gitlab is a full-featured Git server with the ability to store and manage repositories, as well as build tools (pipelines) and delivery (ci / cd). Harbor - registers for storing Docker images. K8s is a Kubernetes cluster in which test application auto-deployment is configured.

## Sequencing

1. [Install and configure Docker](https://mcs.mail.ru/help/gitlab-ci-cd/docker-installation).
2. [Install and configure Gitlab](https://mcs.mail.ru/help/gitlab-ci-cd/gitlab-installation).
3. [Install and configure Harbor](https://mcs.mail.ru/help/gitlab-ci-cd/harbor-installation).
4. [Configure auto-deployment of the application to the Kubernetes cluster](https://mcs.mail.ru/help/gitlab-ci-cd/k8s-autodeploy).

## Feedback

Any problems or questions? [Write to us, we will be happy to help you](https://mcs.mail.ru/help/contact-us).
