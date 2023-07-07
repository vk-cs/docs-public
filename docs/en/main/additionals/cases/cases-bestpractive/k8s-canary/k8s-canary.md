This article will help you deploy a Kubernetes cluster and set up Canary Deployment on it using Nginx Ingress Annotations

**Canary Deployment** is a way to deploy network applications and online services to a set of users or servers. It is often used to incrementally roll out new versions of applications to catch bugs early. Canary Deployment is especially useful when doing A/B testing or setting up Blue/Green application deployments

Let's consider an example with a test application. Let's execute the Canary Deployment script for a simple echo server and make sure that the traffic is distributed according to the configuration file

**Ingress** is a set of rules within your cluster. These rules are designed to allow incoming connections to reach the Services of your applications.

Ingress solves the following main tasks:

- Organization for your applications URLs accessible from outside
- Ensuring traffic balancing
- SSL termination
- Shared hosting based on names

The Ingress Controller is what allows the Ingress ruleset to work. In short, the Ingress Controller is a single central point in the form of a container that is used to proxy all traffic

The following types of Canary annotations are available in Nginx:

- nginx.ingress.kubernetes.io/canary-by-header - allows you to redirect only requests with a specific http header to the Canary version
- nginx.ingress.kubernetes.io/canary-by-cookie - allows you to redirect only requests with a specific cookie to the Canary version
- nginx.ingress.kubernetes.io/canary-weight - allows you to directly specify what percentage of requests will go to our Canary version of the application. In our example, we will perform balancing according to this principle.

**Note**

For documentation on Canary Deployments on Kubernetes, see [here](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#canary)

## **Scheme of the booth**

**![](./assets/1556575126475-1556575126475-png)**

Ingress is a resource (object) that contains instructions for routing traffic in a cluster, typically using HTTP. In this case, Current and Canary are the Ingress configurations for the versions of the applications we are configuring Canary Deployment for.

The Ingress Controller is responsible for executing the Ingress rules, typically through a load balancer built into the K8S.

## **Create a Kubernetes cluster in VK Cloud**

To create a Kubernets cluster:

1. In the side menu, select the section **Containers**
2. Click the **Connect** button
3. Select **Kubernetes Clusters** from the sidebar
4. Click the **Add** button and select the appropriate settings
5. Click the **Next Step** button and select the appropriate machine configuration
6. Click the **Create Cluster** button and wait for the operation to complete. Creating a cluster can take from 5 to 20 minutes, depending on its size
7. Once the cluster is created, an archive will be downloaded containing the files needed to securely connect to the Kubernetes control panel. Don't close the new cluster information page, you'll need it to sign in to the Kubernetes Dashboard
8. To be able to connect to the cluster via kubectl, unpack the archive, find the config file required for the kubectl utility to work, and set the KUBECONFIG environment variable:

```
export KUBECONFIG=<path to config file>
```

## **Creating an application in production**

Let's create an application and show balancing for this application using Nginx Canary. For this:

1. Create a production namespace for the project:

```
kubectl create ns echo-production
<namespace "echo-production" created
```

2. Expand the application. We are using an example from the Kubernetes repository. Connect to the cluster and deploy a test echo server in the created namespace:

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/docs/examples/http-svc.yaml -n echo-production
< deployment.extensions "http-svc" created
< service "http-svc" created

```

3. Create an Ingress config file and apply it to namespace echo-production:

```
http-svc.ingress
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
name: http-svc
annotations:
kubernetes.io/ingress.class: nginx
spec:
rules:
host: echo.com
http:
paths:
-backend:
serviceName: http-svc
servicePort: 80
```As a result, the server will respond to all requests from the echo.com host (serviceName is the name of the service created in the previous step)

Apply the Ingress file to namespace echo-production using the command:

```
kubectl apply -f http-svc.ingress -n echo-production
< ingress.extensions "http-svc" created
```

## **Create a test copy of the application**

Let's create a copy of the application, to which we will direct part of the requests. For this:

1. Create a Canary version of the application's namespace:

```
kubectl create ns echo-canary
<namespace "echo-canary" created
```

2. Deploy the Canary version of the application:

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/docs/examples/http-svc.yaml -n echo-canary
< deployment.extensions "http-svc" created
< service "http-svc" created
```
<info>

**Note**

In real conditions, Canary Deployment is performed on different versions of the project, for simplicity, we use the same version

</info>

3. Create a Canary version of the Ingress config file and apply it to namespace echo-canary:

```
**http-svc.ingress.canary**
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
name: http-svc
annotations:
kubernetes.io/ingress.class: nginx
**nginx.ingress.kubernetes.io/canary: "true"
nginx.ingress.kubernetes.io/canary-weight: "10"**
spec:
rules:
host: echo.com
http:
paths:
-backend:
serviceName: http-svc
servicePort: 80
```
<note>

**Note**

We are implementing a canary-weight configuration option to specify the traffic distribution as a percentage. Notice the lines:

```
  nginx.ingress.kubernetes.io/canary: "true"
  ```

This means that Kubernetes will not treat this Ingress as a standalone Ingress and will mark it as Canary by associating it with the main Ingress

```
  nginx.ingress.kubernetes.io/canary-weight: "10"
  ```

"10" means that Canary will account for approximately 10% of all requests

</note>

4. Apply changes:

```
kubectl apply -f http-svc.ingress.canary -n echo-canary
< ingress.extensions "http-svc" created
```

## Health check

Login to the Kubernetes Dashboard using the token you received after creating the cluster:

**![](./assets/1556659848510-1556659848510-png)**

To view the available Namespaces, click the appropriate button in the sidebar:

**![](./assets/1556659872241-1556659872241-png)**

To view a list of active Ingresses and get their external IP address, switch the current Namespace to All namespaces:

**![](./assets/1556659898530-1556659898530-png)**

Then, at the bottom of the sidebar, select Ingresses:

**![](./assets/1556658145271-1556658145271-png)**

As a result, a list of all available Ingresses will be displayed on the screen. Canary and Production must have the same IP address:

**![](./assets/1556659987463-1556659987463-png)**

Check that the requests are distributed according to the configuration file. To do this, take a Ruby script:

```
**count.rb**
counts = Hash.new(0)
1000 times do
output = \`curl -s -H "Host: echo.com" http://<external_ip_address> | grep 'pod namespace'\`
counts[output.strip.split.last] += 1
end
put counts
```

And execute it:

```
ruby count.rb
```

The result should be close to the following:

```
{"echo-production"=>896, "echo-canary"=>104}
```
<warn>

**Attention**

The nginx.ingress.kubernetes.io/canary-weight setting does not guarantee an accurate percentage distribution. It works more like the probability that the request will hit Canary rather than Production

</warn>
