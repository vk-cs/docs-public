In this article, we will look at how to set up auto-deployment of an application to a Kubernetes cluster.

Before that:

1. [Install and configure Docker](https://mcs.mail.ru/help/gitlab-ci-cd/docker-installation).
2. [Install and configure Gitlab](https://mcs.mail.ru/help/gitlab-ci-cd/gitlab-installation).
3. [Install and configure Harbor](https://mcs.mail.ru/help/gitlab-ci-cd/harbor-installation).

## Set up Gitlab-runner

Gitlab-runner is an environment for autobuilding Gitlab projects. To set up autobuild, install and register runner with Gitlab. You can register a specific runner for each project (specific runner) or a common runner for multiple projects (shared runner). Let's set up a common runner.

For this:

1. Log in to the Gitlab web interface with administrator rights:

![](./assets/1583699032662-1583699032662.png)

2. Copy the registration token and run the following in the console on the server where Gitlab-runner is installed:

```
root@ubuntu-standard-2-4-40gb:~# docker exec -it gitlab-runner gitlab-runner register -n --url https://<SERVER_DNS_NAME>/ --executor docker --registration-token ua2k238fbMtAxMBBRf_z -- description "shared-runner" --docker-image="docker:dind" --tag-list "shared_runner" --docker-privileged --docker-volumes /var/run/docker.sock:/var/run/docker .sock
```

<warn>

**Attention**

\--tag-list - specifies the tags that runner will accept. Further in the project, this tag is specified so that the project is assembled by this runner.

\--docker-privileged and --docker-volumes are required for the running Docker container to have access to the parent Docker to build images (details [read here](https://docs.gitlab.com/ee/ci/docker /using_docker_build.html)).

</warn>

As a result, runner will be displayed in the web interface:

![](./assets/1583699032286-1583699032286.png)

3. Set the runtime variables. To do this, select Settings / CI CD and next to Variables click Expand:

![](./assets/1583699032764-1583699032764.png)

4. Set a few variables that will be used later in the autobuild file `.gitlab-ci.yml`:

![](./assets/1583699033010-1583699033010.png)

Variables:

- DOCKER_USER - user to access the repository in Harbor. In our example, k8s.
- DOCKER_PASSWORD - The password for the k8s user that you entered when you created the user in Harbor.

Please note that Masked is enabled for the password - thanks to this, when you try to display text in a variable in the script, it is masked and the password is not visible.

- DOCKER_REGISTRY is the name of the host where the Harbor is located. In our example, <SERVER_DNS_NAME>.

## Set up the autobuild file

Go to the folder with the downloaded repository and in a text editor create a `.gitlab-ci.yml` file with the following content:

```
image:docker:latest

stages:
  - builds
  - test
  - release

variables:
  REGISTRY_URL: https://$DOCKER_REGISTRY:8443
  IMAGE: $DOCKER_REGISTRY:8443/$DOCKER_USER/$CI_PROJECT_NAME:$CI_COMMIT_REF_NAME
  RELEASE: $DOCKER_REGISTRY:8443/$DOCKER_USER/$CI_PROJECT_NAME:latest

before_script:
   - docker login $REGISTRY_URL -u $DOCKER_USER -p $DOCKER_PASSWORD

build:
  stage:builds
  tags:
    - shared_runner
  script:
   - cd app && docker build --pull -t $IMAGE .
   - docker push $IMAGE

release:
  stage: release
  tags:
    - shared_runner
  script:
    - docker pull $IMAGE
    - docker tag $IMAGE $RELEASE
    - docker push $RELEASE
  only:
- master
```

Consider this file.

General Purpose Variables:

- image - specifies the docker image in which the build will run. Since we are building a Docker image, we need an image that contains the utilities we need to build. Usually `image docker:latest` is used.
- stages - describes the stages of image assembly. In our example, the test stage is skipped.

Variables used for work:

- before_script - the stage that is executed first. We log in to the register using the variables that are specified in the Gitlab runner settings.
- build - image build. Standard build of a Docker image using a Dockerfile in the repository.
<warn>

**Important!**

`tags: shared_runner` is the tag that was specified when registering the runner. Specifying this tag in the `.gitlab-ci.yml` file allows Gitlab-runner to execute this script. After assembly, the assembled image is entered into the registry with the `CI_COMMIT_REF_NAME` tag. For details on the variables that can be used during the build [read the article](https://docs.gitlab.com/ee/ci/variables)). In our example, since we are committing to the master branch, the image name will be `k8s/k8s-conf-demo:master`.

</warn>

- release - final image generation section. In our example, we simply take the image built in the previous stage, add the latest tag to it, and upload it to the repository.

Upload the created file to the repository:

```
ash-work:k8s-conf-demo git add .
ash-work:k8s-conf-demo git commit -m "create .gitlab-ci.yml"
[master 55dd5fa] create .gitlab-ci.yml
1 file changed, 1 insertion(+), 1 deletion(-)
ash-work:k8s-conf-demo git push
Enumeration of objects: 5, done.
Object count: 100% (5/5), done.
Compressing changes uses up to 4 streams
Object compression: 100% (3/3), done.
Object Writing: 100% (3/3), 299 bytes | 299.00 KiB/s, done.
3 total (2 changes), 0 reused (0 changes)
To testrom.ddns.net:ash/k8s-conf-demo.git
7c91eab..55dd5fa master -> master
```

As soon as the `.gitlab-ci.yml` file appears in the repository, Gitlab will automatically start building it.

You can see how the build is going in the Gitlab web interface in the project, CI / CD / Pipelines:

![](./assets/1583700761304-1583700761304.png)

By clicking on running, you can see the current progress of the build:

![](./assets/1583700787348-1583700787348.png)

By clicking on the build stage, you can see the build console and what is happening in it. Example for the build stage:

![](./assets/1583700831019-1583700831019.png)

Example for the release stage:

![](./assets/1583700851963-1583700851963.png)

The console logs show that both build and release completed successfully. The assembled image was posted in the Harbor repository, which can be seen in the corresponding web interface:

![](./assets/1583700204079-1583700204079.png)

## Deploying an application to a Kubernetes cluster

After successfully building the project, we will set up auto-deployment of the application to the Kubernetes cluster. For example, we use [Kubernetes cluster from VK Cloud](https://mcs.mail.ru/containers/).

After the cluster is deployed in the cloud, a configuration file of the form `kubernetes-cluster-5011_kubeconfig.yaml` is loaded on the local computer, intended for authorization in the cluster for utilities like kubectl.

1. Connect the configuration file:

```
ash-work:~ export KUBECONFIG=kubernetes-cluster-5011_kubeconfig.yaml
```

2. Make sure that authorization is successful and the cluster is healthy:

```
ash-work:~ kubectl cluster-info
Kubernetes master is running at https://89.208.197.244:6443
CoreDNS is running at https://89.208.197.244:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

The cluster responds.

3 Grant the cluster access rights to the Harbor image repository. To do this, create the following secret:

```
ash-work:~ kubectl create secret docker-registry myprivateregistry --docker-server=https://<SERVER_DNS_NAME>:8443 --docker-username=k8s --docker-password=<PASSWORD>
secret/myprivateregistry created.
```
where `<SERVER_DNS_NAME>` is the Harbor server name, `<PASSWORD>` is the Harbor user k8s password.

4. Verify that the secret was successfully created:

```
ash-work:~ kubectl get secret myprivateregistry --output="jsonpath={.data.\.dockerconfigjson}" | base64 --decode
{"auths":{"https://<SERVER_DNS_NAME>:8443":{"username":"k8s","password":"<PASSWORD>","auth":"sdasdsdsdsdsdsdsdsdsdssd=="}}}%
```

5. Create a `deployment.yml` file with the following content:

```
apiVersion: apps/v1
kind: Deployment
metadata:
name: myapp
spec:
selector:
match Labels:
run: myapp
template:
metadata:
labels:
run: myapp
spec:
containers:
-name:myapp
image: <SERVER_DNS_NAME>:8443/k8s/k8s-conf-demo:latest
imagePullPolicy: Always
env:
- name: HTTP_PORT
value: "8081"
ports:
- containerPort: 8081
imagePullSecrets:
-name: myprivateregistry
```

6. Apply this file:

```
ash-work:~ kubectl create -f deployment.yaml
deployment.apps/myapp-deployment created
```

7. After a while, make sure that the container has risen:

```
ash-work:~ kubectl get pods
NAME READY STATUS RESTARTS AGE
myapp-deployment-66d55bcbd5-s86m6 1/1 Running 0 39s
```

8. Create a `service.yml` file:

```
apiVersion: v1
kind: Service
metadata:
name: myapp-svc
labels:
run: myapp
spec:
ports:
-protocol:TCP
port: 8081
targetPort: 8081
selector:
run: myapp
```

9. Create a service:

```
ash-work:~ kubectl create -f service.yaml
service/myapp-svc created
```

10. To provide access to the application from the external network, configure the ingress controller. To do this, create a `ingress.yaml` file:

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
name: myapp-ingress
spec:
rules:
host: echo.com
http:
paths:
- path: /
backend:
serviceName: myapp-svc
servicePort: 8081
```

In this file, specify the domain, when accessed, the transition to the application will be performed. You can specify any domain, we will write it locally for tests.

11. Apply the ingress controller:

```
ash-work:~ kubectl create -f ingress.yaml
ingress.extensions/myapp-ingress created
```

12. View the state of the ingress controller:

```
ash-work:~ kubectl describe ingress myapp-ingress
Name: myapp-ingress
Namespace:default
address:
Default backend: default-http-backend:80 (<none>)
Rules:
Host Path Backends
---- ---- --------
echo.com
/ myapp-svc:8081 (10.100.69.71:8081)
Annotations:
events:
Type Reason Age From Message
---- ------ ---- ---- -------
Normal CREATE 45s nginx-ingress-controller Ingress default/myapp-ingress
Normal UPDATE 5s nginx-ingress-controller Ingress default/myapp-ingress
```

The external IP address associated with the ingress controller can be viewed in the web interface of the Mail.ru cloud. It's called the load balancer IP address for the Ingress Controller. Let's designate it as <INGRESS_EXTERNAL_IP>.

13. Let's test the application:

```
ash-work:~ curl --resolve echo.com:80:<INGRESS_EXTERNAL_IP> http://echo.com/handler
OK%
```

The `--resolve` option is responsible for the local resolve when requesting curl, since we came up with the domain ourselves and there is no real resolve.

Thus, we have deployed the application to the Kubernetes cluster manually.

14. Delete the created:

```
ash-work:~ kubectl delete -f ingress.yaml
ingress.extensions "myapp-ingress" deleted
ash-work:~ kubectl delete -f service.yaml
service "myapp-svc" deleted
ash-work:~ kubectl delete -f deployment.yaml
deployment.apps "myapp" deleted
```

## Deploying an application to a Kubernetes cluster using Gitlab CI/CD

Gitlab supports Kubernetes cluster integration by default. To set up the integration, get a few cluster options.

For this:

1. Get the API URL:

```
ash-work:~ kubectl cluster-info | grep 'Kubernetes master' | awk '/http/ {print $NF}'
https://89.208.197.244:6443
```

2. Get a list of cluster secrets:

```
ash-work:~ kubectl get secrets
NAME TYPE DATA AGE
dashboard-sa-token-xnvmp kubernetes.io/service-account-token 3 41h
default-token-fhvxq kubernetes.io/service-account-token 3 41h
myprivateregistry kubernetes.io/dockerconfigjson 1 39h
regcred kubernetes.io/dockerconfigjson 1 39h
```

3. Get the PEM certificate of the default-token-\* secret:

```
ash-work:~ kubectl get secret default-token-fhvxq -o jsonpath="{['data']['ca\.crt']}" | base64 --decode
-----BEGIN CERTIFICATE-----
MIIC9DCCAdygAwIBAgIQQf4DP2XYQaew1MEtxJtVBzANBgkqhkiG9w0BAQsFADAi
MSAwHgYDVQQDDBdrdWJlcm5ldGVzLWNsdXN0ZXItNTAxMTAeFw0xOTEyMDkxNTI2
MDlaFw0yNDEyMDgxNTI2MDlaMCIxIDAeBgNVBAMMF2t1YmVybmV0ZXMtY2x1c3Rl
ci01MDExMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA47Nd4cEMEdtW
yxo3VEm02wB+k7HytzchyYOlxJdYhQV4yjWR8MpAd9JKWgOdJ/qzitIjYdr0cKCI
dLxRmKWGJJhTYZ4yBQS3XJ52n6bpV1Nzj0Xsq9Bxs7OgG1T4oZn7FXY4ZrJ10w0s
wa0w5AbU2LbpprWsNki2uFkUusgtUSLSSwe90yVKT5ZnW3kUrmMZlY3ys4KLhDbA
CS5xs03t10apRjfRq4WQ0ja+AYkzvwnpiX5nnJk2YCn31c4tVUSuoblzoWEokD2v
DLzZaHAg53Payp2PUP7S5kMCjfrRIEBO7SULve/P/7GRJEHzzOREn/qMSOWK5u1O
k1yk4ARP4wIDAQABoyYwJDASBgNVHRMBAf8ECDAGAQH/AgEAMA4GA1UdDwEB/wQE
AwICBDANBgkqhkiG9w0BAQsFAAOCAQEAYxdbkMTOL4/pbQmJNIY54y+L8eGqEzTc
is9KAZmoD4t4A88r1xZ/dp/3PVhFaOutQh6H7FzNDEiWbTFUa3edGXBmL4jB05Tm
epj1iYEY6Nv5KGoSZutZ11Y8W+77pu9zKzzbtXMyCsYpPWrPyXiP1Z1zY6F4MtAQ
GF9ONh9lDVttkFjaerKR4y4/E/X+e2Mi2dsyJmVHCrZTHozy8oZayC//JfzS+pK9
2IvcwlBgp9q4VO+lmkozWzWcO5mjk/70t7w5UHNpJOxeMzbhx6JkWZ9bN+Ub7RHN
1PUeNfZJKHEgSZw8M+poK3SqsyGMQ13geGXpM85VQvrqCW43YfgjiQ==
-----END CERTIFICATE-----
```

4. Now create a `gitlab-admin-service-account.yaml` file that describes Gitlab's access rights to the cluster. File contents:

```
apiVersion: v1
kind: ServiceAccount
metadata:
name: gitlab-admin
namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
name: gitlab-admin
roleRef:
apiGroup: rbac.authorization.k8s.io
kind: ClusterRole
name: cluster-admin
subjects: subjects
-kind: ServiceAccount
name: gitlab-admin
  namespace: kube-system
```

5. Apply rights:

```
ash-work:~ kubectl apply -f gitlab-admin-service-account.yaml
serviceaccount/gitlab-admin created
clusterrolebinding.rbac.authorization.k8s.io/gitlab-admin created
```

And get the cluster access token:

```
ash-work:~ kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep gitlab-admin | awk '{print $1}')
Name: gitlab-admin-token-kcmd8
Namespace: kube-system
Labels: <none>
Annotations: kubernetes.io/service-account.name: gitlab-admin
kubernetes.io/service-account.uid: d9aa6095-6086-4430-b1ae-711df5765064


Type: kubernetes.io/service-account-token


Data
====
ca.crt: 1087 bytes
namespace: 11 bytes


token:      eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJnaXRsYWItYWRtaW4tdG9rZW4ta2NtZDgiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZ2l0bGFiLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiZDlhYTYwOTUtNjA4Ni00NDMwLWIxYWUtNzExZGY1NzY1MDY0Iiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmdpdGxhYi1hZG1pbiJ9.CaBJMUdWwTPGBla1OZZnsftdUue1-XSyF-SEaHhNdWaUkX_5aUi4uZrgx0UGLbSOFkTmij2_lv1lAkm9-W4VCi4z9cVjw41o6TA6279rx_HEammNzFV8v1HvpSkMXH8wVzaoLwtVQehM7fozykgv4y3wmHAe-T0vXNRN48FYmDXReRSdGuldV--OZLZeOVGrRIkttXoMoSVW_LbnOiBJU4NUQq4dNpvklQkLTSBowu-E0lDJJoMQjniSO1j8H8fmy7Micpgy20Hi1RIoJWfPj-EY3CyhjMht8iTIokQHgHgpCY_RQPexJqHiXTQgyZ93WNw8foIfISduNXyynfGzmQ

```

6. Go to the Gitlab admin interface and click Add Kubernetes Cluster:

![](./assets/1583702333521-1583702333521.png)

7. Select the Add Existing cluster tab, enter the previously remembered parameters (API URL, PEM, Token) and click Add Kubernetes Cluster:

![](./assets/1583702864976-1583702864976.png)

8. Cluster added:

![](./assets/1583702901138-1583702901138.png)

Place the files `deployment.yaml`, `service.yaml`, `ingress.yaml` in the deployments folder of the project.

Add the deploy section to the `.gitlab-ci.yml` file:

```
image:docker:latest

stages:
- build
- test
- release
- deploy

variables:
REGISTRY_URL: https://$DOCKER_REGISTRY:8443
IMAGE: $DOCKER_REGISTRY:8443/$DOCKER_USER/$CI_PROJECT_NAME:$CI_COMMIT_REF_NAME
RELEASE: $DOCKER_REGISTRY:8443/$DOCKER_USER/$CI_PROJECT_NAME:latest
before_script:
- docker login $REGISTRY_URL -u $DOCKER_USER -p $DOCKER_PASSWORD

build:
stage: build
tags:
- shared_runner
script:
- cd app && docker build --pull -t $IMAGE .
- docker push $IMAGE

release:
stage: release
tags:
- shared_runner
script:
- docker pull $IMAGE
- docker tag $IMAGE $RELEASE
- docker push $RELEASE
only:
- master

deploy:
stage: deploy
before_script:
- apk add --no-cache curl
- curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/ amd64/kubectl
- chmod +x ./kubectl
tags:
- shared_runner
environment:
name: production
script:
- echo $KUBECONFIG
- export KUBECONFIG=$KUBECONFIG
- ./kubectl create secret docker-registry myprivateregistry --docker-server=$REGISTRY_URL --docker-username=$DOCKER_USER --docker-password=$DOCKER_PASSWORD --dry-run -o yaml | ./kubectl apply -f -
- ./kubectl apply -f manifests/deployment.yaml
- ./kubectl apply -f manifests/service.yaml
- ./kubectl apply -f manifests/ingress.yaml
- ./kubectl rollout restart deployment
```

Consider the deploy section.

In the `before_script` section, curl is installed into the system, with its help the latest stable version of kubectl is downloaded.

Script section: Since the cluster is managed by Gitlab, there are preset variables - KUBECONFIG stores the name of the cluster access configuration file.

Since the namespace is set automatically, in this namespace you need to create a secret with a login and password to access our register, which stores the application image compiled at the release stage.

Next, the deploy, service, and ingress controller manifests are applied.

The last command restarts the deployment to download the new version of the application.

The result of executing the deploy section:

![](./assets/1583703066298-1583703066298.png)

9. Check what was created in the cluster. We look at the namespace:

```
ash-work:~ kubectl get namespaces
NAME STATUS AGE
default Active 45h
gitlab-managed-apps Active 67m
ingress-nginx Active 45h
k8s-conf-demo-1-production Active 57m
kube-node-lease Active 45h
kube-public Active 45h
kube-system Active 45h
magnum-tiller Active 45h

```

10. Our namespace is `k8s-conf-demo-1-production`. Let's look at pods, services and ingress:

```
ash-work:~ kubectl get pods -n k8s-conf-demo-1-production
NAME READY STATUS RESTARTS AGE
myapp-65f4bf95b5-m9s8l 1/1 Running 0 39m
ash-work:~ kubectl get services -n k8s-conf-demo-1-production
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
myapp-svc ClusterIP 10.254.243.199 <none> 8081/TCP 32m
ash-work:~ kubectl get ingress -n k8s-conf-demo-1-production
NAME HOSTS ADDRESS PORTS AGE
myapp-ingress echo.com 80 32m
ash-work:~
```

11. Check the health of the application:

```
ash-work:~ curl --resolve echo.com:<INGRESS_EXTERNAL_IP> http://echo.com/handler
OK%
```

12. To test auto-deploy, modify the application code a little. In the app/app.py repository file, change the return 'OK' line to return 'HANDLER OK'.

13. Commit the changes:

```
ash-work:k8s-conf-demo git add . && git commit -m "update" && git push
[master b863fad] update
1 file changed, 1 insertion(+), 1 deletion(-)

Enumeration of objects: 7, done.
Object count: 100% (7/7), done.
Compressing changes uses up to 4 streams
Object compression: 100% (4/4), done.
Write objects: 100% (4/4), 359 bytes | 359.00 KiB/s, done.
Total 4 (changes 3), reused 0 (changes 0)
```

14. Wait for the CI/CD execution to finish and check the application output again:

```
ash-work:~ curl --resolve echo.com:<INGRESS_EXTERNAL_IP> http://echo.com/handler
HANDLER OK%
```

The auto-deployment of the new version was successful.

<info>

**Note**

The configuration files given in this article are test files and are intended for mastering the mechanisms of Gitlab, registering and deploying images to a cluster at an initial level.

</info>
