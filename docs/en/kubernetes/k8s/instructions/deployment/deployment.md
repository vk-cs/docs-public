# {heading(Working with Deployment)[id=k8s-deployment]}

{include(/en/_includes/_translated_by_ai_en.md)}

Deployment is a Kubernetes object representing a set of multiple identical containers without unique numbers. Deployment allows you to run several replicas of applications and automatically replace application instances in case of failure.

## {heading(Creating a new Deployment)[id=k8s-deployment-create]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml create deployment <DEPLOYMENT> --image=<IMAGE>
```
Where:

* `<DEPLOYMENT>` — the name of the Deployment.
* `<IMAGE>` — the name of the container image.

## {heading(Viewing the status of the current Deployment)[id=k8s-deployment-describe]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml describe deployment <DEPLOYMENT>
```

Here `<DEPLOYMENT>` is the name of the Deployment.

Example of a Deployment description in YAML format:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
```

In this example, three identical containers named `nginx` are created based on the NGINX image. Access to the containers is provided via port 80.

When updating a Deployment, Kubernetes sequentially restarts containers with the new configuration, while the previous containers are not removed until a sufficient number of new containers have been successfully started.

## {heading(Updating a Deployment)[id=k8s-deployment-update]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml apply -f <DEPLOYMENT>
```
Here `<DEPLOYMENT>` is the name of the Deployment.