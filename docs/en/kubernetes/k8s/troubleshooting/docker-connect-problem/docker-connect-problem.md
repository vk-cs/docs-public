When connecting to the Docker registry, the following error occurs: `x509: certificate signed by unknown authority`.

The problem occurs if it is not possible to verify the authenticity of the digital certificate used to [connect to the Docker registry](/en/kubernetes/k8s/connect/docker-registry). For example, if the default connection uses a self-signed certificate created by the system.

### Solution

1. Add the `insecure-registries` parameter to the Docker configuration file `daemon.json`. In it, specify the address of the Docker registry endpoint.

   Format of the address is as follows: `<DOCKER_REGISTRY_URL>:<DOCKER_REGISTRY_PORT>`.

   Following as an example of this parameter for the `daemon.json` file:

   ```json
   {
     ...
     "insecure-registries": [
       "192.0.2.2:5000"
     ],
     ...
   }
   ```
       
1. Reboot Docker Engine.
1. If the problem persists, contact [technical support](mailto:support@mcs.mail.ru). 