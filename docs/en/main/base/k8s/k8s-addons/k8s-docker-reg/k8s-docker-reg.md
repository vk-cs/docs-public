Uploading images to Kubernetes using Docker Registry
--------------------------------------------------------

This article will help you in creating a pod that uses a Secret to download an image from a private Docker registry or repository.

Docker Registry is a server application designed for storing and distributing Docker images.

What can Docker Registry be used for?
---------------------------------------------

* Control over the storage location of images
* Control over the distribution of images
* integration of image storage and distribution into the development process

Launching Docker
-------------

You need to log in:

```
docker login
```

You will need to enter your username and password.

This command will create or modify the config.json file. It will store the information necessary for authorization.

You can view the contents by running the command:

```
cat ~/.docker/config.json
```

The result of the execution will be approximate as follows:

```
{     "auths": {         "https://index.docker.io/v1/": {             "auth": "c3R...zE2"         }     } }
```

Creating a Secret based on existing Docker credentials
-------------------------------------------------------------

The Kubernetes cluster uses a Secret that is part of the docker-registry for authorization. If **docker login** is already running, then you can copy the credentials to Kubernetes:

kubectl create secret generic regcred \\     --from-file=".dockerconfigjson=<path/to/."docker/config.json> \\ -- if you need to make any changes (for example, change the name of a new secret), then you can make changes to the Secret before saving it. Make sure that:

* specified typeдляkubernetes.io/dockerconfigjson
* a name has been set for the element.dockerconfigjson
* base64 encodes the docker file and inserts this string, continuous as the value for the data field data\[".dockerconfigjson"\]

For example:

```
apiVersion: v1 kind: Secret metadata:   name: myregistrykey   namespace: awesomeapps data:   .dockerconfigjson: UmVhbGx5IHJlYWxseSByZWVlZWVlZWVlZWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGx5eXl5eXl5eXl5eXl5eXl5eXl5eSBsbGxsbGxsbGxsbGxsbG9vb29vb29vb29vb29vb29vb29vb29vb29vb25ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubmdnZ2dnZ2dnZ2dnZ2dnZ2dnZ2cgYXV0aCBrZXlzCg==" type: "kubernetes.io/dockerconfigjson
```

Creating a pod using a Secret:
-------------------------------

Below is a configuration file for creating a pod using the credentials specified in regcred:

```
apiVersion: v1 kind: Pod metadata:   name: private-reg spec:   containers:   - name: private-reg-container     image: <your-private-image>   imagePullSecrets:   - name: regcred
```

In the my-private-reg-pod file.replace yaml<your-private-image> with the path to the required image from your registry. For example:

```
example/exmpl-private:v1
```

We create a pod using the existing Secret, and check that the pod is running:
----------------------------------------------------------------------

```
kubectl apply -f my-private-reg-pod.yaml kubectl get pod private-reg
```