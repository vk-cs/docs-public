## Description

A pod is the smallest computing unit in Kubernetes terminology.

A Pod is a group of one or more application containers, including shared storage (volumes), IP address, and startup information.

## Using Pods

There are two main ways to use pods in Kubernetes:

- Under launching a single container. The one-container-for-one-pod model is more common in Kubernetes, and in this case, you can think of a pod as a wrapper for a container. It must be remembered that Kubernetes manages pods, not containers directly.
- Pod launching multiple containers within itself. A pod can contain an application consisting of several containers, the interaction of which is closely related and there is a need to share resources. For example, container-1, which is a web server, gives data from a shared disk "out", and there is container-2, which updates and changes this data on the disk.

The second way, grouping multiple containers within a single Pod, is a rather specific case. It is not recommended to use it unless clearly necessary.

## Working with pods

Each pod is a single instance of a running application. If you need to scale out to provide more resources by running more instances, you should run multiple Pods, one for each application instance.

In Kubernetes, this is commonly referred to as replication. Replicated Pods are usually created and managed by Kubernetes objects like Deployment or Job.

There is rarely a need to create separate pods directly in Kubernetes. This is because Pods are designed as relatively ephemeral and disposable objects.

The best practice when working with pods is to put requests and limits on the containers in the pod. More information about limits in [article](limits-and-requests).

<info>

In Kubernetes clusters from VK Cloud Solutions, the following default values ​​apply to running containers without specified requests and limits:

- Requests: 100m / 64Mb
- Limits: 500m / 512Mb

</info>

There is rarely a need to create separate pods directly in Kubernetes. This is because Pods are designed as relatively ephemeral and disposable objects.

The example below creates two separate pods and tests their network connectivity.

An example manifest for a pod with an Nginx web server:

```
---
apiVersion: v1
kind: Pod
metadata:
name: nginx-pod
spec:
containers:
- image:nginx:1.12
name: nginx
ports:
- containerPort: 80
```

You need to save the manifest from the example to the pod.yaml file and create from it using the command:

```
kubectl apply -f pod.yaml
```

After that, you can check if the pod has been created (the _-o_ switch displays more detailed information). In the IP column, find the pod's IP address, which we'll need later:

```
kubectl get pod -o wide
NAME . READY . STATUS . RESTARTS AGE . IP . . NODE . . NOMINATED NODE . READINESS GATES
nginx-pod 1/1 Running 0 42m 10.100.6.201 test-node <none> .
```

Now create another pod from which the first one is tested. Run pod as an interactive shell:

```
kubectl run -it --rm --image=centos centos-pod -- /bin/bash
```

Once in the centos-pod shell, curl the pod address you got earlier with the nginx web server:

```
curl 10.100.6.201
```

```
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
body {
width: 35em;
margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif;
}
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

In response, we received the default nginx welcome page, which indicates that the pods are running.

More information about pods can be found at the [official site](https://kubernetes.io/docs/concepts/workloads/pods/) Kubernetes.
