Helm is a popular package manager for Kubernetes that can be used to quickly install complex applications such as CRM, e-commerce, databases, etc.

Since Kubernetes clusters installed by VK Cloud use a role-based security model, it is necessary to initialize Helm as follows:

```
kubectl create serviceaccount --namespace kube-system tiller
helm init --service-account tiller
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
```

We recommend using Helm versions at least 2.8.1. To check which version you have installed, you can use the command:

```
helm version
```

To update both the client and server components of Helm to the latest version, initialize Helm with the following commands:

```
kubectl create serviceaccount --namespace kube-system tiller
helm init --service-account tiller --upgrade
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
```
