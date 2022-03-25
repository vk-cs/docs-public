Description
-----------

Pod is the smallest computing unit in Kubernetes terminology.

Sub - a group of one or more application containers, including shared storage (volumes) used, IP address and information on their launch.

Using pods
----------

Kubernetes has two main uses for pods:

*   For launching a single container. The "one-container-to-one-pod" model is more common in Kubernetes and in this case, we can assume that the pod is a wrapper for the container. Keep in mind that Kubernetes manages pods, not containers directly.
*   Underneath launching several containers inside itself. A pod can contain an application consisting of several containers, the interaction of which is closely related and there is a need to share resources. For example, container-1, which is a web server, sends data from a shared disk "outside", and there is container-2 that updates and changes this data on the disk.

The second way, with grouping multiple containers within a single pod, is a rather specific case. It is not recommended to use it unless it is clearly necessary.

Working with pods
-----------------

Each pod is a single instance (instance) of a running application. If you need to scale out to provide more resources by running more instances, you should run multiple pods, one for each application instance.

In Kubernetes, this is commonly referred to as replication. Replicated pods are usually created and managed by Kubernetes objects like Deployment or Job.

Rarely does it become necessary to create separate pods directly in Kubernetes. This is because pods are designed as relatively ephemeral and disposable objects.

As an example, let's create two separate pods and test their network connectivity.

Example manifest for a pod with an Nginx web server

```
---
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - image: nginx:1.12
    name: nginx
    ports:
    - containerPort: 80
```

You need to save the manifest from the example to the pod.yaml file and create from it under the command:

```
kubectl apply -f pod.yaml
```

After that, you can check whether it was created under (the -o switch displays more detailed information):

```
kubectl get pod -o wide
NAME        READY   STATUS    RESTARTS   AGE   IP             NODE        NOMINATED NODE   READINESS GATES
nginx-pod   1/1     Running   0          42m   10.100.6.201   test-node   <none>           <none>
```

Now let's create another pod, from which we will check the performance of the first one. Let's run it as an interactive shell:

```
kubectl run -it --rm --image=centos centos-pod -- /bin/bash
```

Once in the centos-pod pod shell, let's try curl to the pod address with the nginx web server:

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

In response, we received the default nginx welcome page, which indicates that the pods are working.

More information about pods can be found on the [official](https://kubernetes.io/docs/concepts/workloads/pods/) Kubernetes website.