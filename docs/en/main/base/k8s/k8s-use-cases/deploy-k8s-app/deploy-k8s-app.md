Application deployment in Kubernetes (k8s) is carried out using the kubectl utility. The full syntax of the utility commands can be found in the [official documentation](https://kubernetes.io/docs/reference/kubectl/overview /).

## Preparation

Kubectl runs on the command line or terminal.

To make sure that kubectl is installed, use the command:

```
kubectl version --client
```

The general format of the kubectl command is: kubectl action resource (kubectl -> action -> entity to which the action is directed)

This sequence of commands performs the specified action (for example, creation, description) for the specified resource (for example, node, container). You can use --help after the command to get additional information about possible parameters, for example

```
kubectl get nodes --help
```

Before working on a cluster, you need to connect to it by first importing the configuration file downloaded when creating the cluster.:

`export KUBECONFIG=<file path>`

Make sure that kubectl is configured to interact with your cluster by running the kubectl version command:

```
kubectl cluster-info
```

The answer should be something like the following:

You can view the nodes in the cluster using the command:

```
kubectl get nodes
```

It should turn out something like the following:

```
kubectl get nodes
NAME       STATUS   ROLES    AGE    VERSION
k8s-cl01   Ready    master   8m4s   v1.17.3
```

The available nodes are displayed. Kubernetes will choose where to deploy the application depending on the available Node resources.

## Deploying the application

Let's deploy the first application in Kubernetes using the kubectl create deployment command. You need to specify the deployment name and location of the application image.

```
kubectl create deployment kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1
deployment.apps/kubernetes-bootcamp created
```

As a result of executing the commands, the application was deployed. This included several stages:

- search for a suitable node on which to run an instance of the application
- planning to run the application on this node
- configure the cluster to start an instance on a new node if necessary

To display a list of deployments, use the get deployments command:

```
kubectl get deployments
```

The result of executing the command will be:

```
kubectl get deployments
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   1/1     1            1           3m41s
```

The output reflects 1 deployment with one instance of the application. The instance runs inside a Docker container on a node.

## Viewing the application

The pods working inside Kubernetes work in a private isolated network. By default, they are visible from other pods and services in the same Kubernetes cluster, but not outside this network. When kubectl is used, interaction is carried out through the API endpoint to communicate with the application.

Kubectl can create a proxy that will forward messages to the private network of the entire cluster. The proxy server can be terminated by pressing Ctrl-C and it will not show any results while running.

The next step is to launch the proxy in a new command line or terminal window:

```
echo -e "\\n\\n\\n\\e\[92mStarting Proxy. After starting it will not output a response. Please click the first Terminal Tab\\n";
```

Then you need to run the kubectl proxy command:

```
kubectl proxy
Starting to serve on 127.0.0.1:8001
```

After that, a connection appears between the host (online terminal) and the Kubernetes cluster. The proxy server provides direct API access from these terminals.

You can see all the APIs hosted through the proxy endpoint. For example, you can request a version directly through the API using the curl command:

```
curl http://localhost:8001/version
```

The output of the command will be:

```
{
  "major": "1",
  "minor": "17",
  "gitVersion": "v1.17.3",
  "gitCommit": "06ad960bfd03b39c8310aaf92d1e7c12ce618213",
  "gitTreeState": "clean",
  "buildDate": "2020-02-11T18:07:13Z",
  "goVersion": "go1.13.6",
  "compiler": "gc",
  "platform": "linux/amd64"
}
```

If port 8001 is unavailable, you need to make sure that the kubectl proxy is running.

The API server will automatically create an endpoint for each module based on the module name, which is also accessible via a proxy.

First, you need to get the Pod name, and save it in the environment variable POD_NAME:

```
export POD\_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\\n"}}{{end}}')
echo Name of the Pod: $POD\_NAME
```

It should turn out something like the following:

```
export POD\_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\\n"}}{{end}}')
echo Name of the Pod: $POD\_NAME
Name of the Pod: kubernetes-bootcamp-69fbc6f4cf-c7khc
```

**Note**

The proxy server was started in a new tab (Terminal 2), and the last commands were executed on the original tab (Terminal 1). The proxy server is still running on the second tab, and this allowed the curl command to work using localhost:8001
