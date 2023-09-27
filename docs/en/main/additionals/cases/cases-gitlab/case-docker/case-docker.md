In this article, we will look at how to install and configure Docker.

After that you can:

- [install and configure Gitlab](/en/additionals/cases/cases-gitlab/case-gitlab);
- [install and configure Harbor](/en/additionals/cases/cases-gitlab/case-harbor);
- [set up auto-deployment of the application to the Kubernetes cluster](/en/additionals/cases/cases-gitlab/case-k8s-app).

To install and configure Docker:

1. Log in to the Ubuntu server, get superuser rights.
2. Install the required packages:

```
apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

3. Add the Docker repository key:

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt key add-
OK
```

4. Add the Docker repository:

```
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu\
 $(lsb_release -cs)\
 stable"
```

5. Install Docker:

```
apt-get update && apt-get install -y docker-ce docker-ce-cli containerd.io
```

6. Install docker-compose:

```
curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin /docker-compose
chmod +x /usr/local/bin/docker-compose
```

Now [install and configure Gitlab](/en/additionals/cases/cases-gitlab/case-gitlab).
