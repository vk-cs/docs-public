Use the [External Secrets Operator](/en/kubernetes/k8s/concepts/addons-and-settings/addons#eso) add-on to set up synchronization with Kubernetes secrets that are stored in the [VK Cloud Secret Manager](/ru/security/secret-manager/concepts/about#sm-about "change-lang").

{note:info}
External Secrets Operator is only available for [second-generation](/en/kubernetes/k8s/concepts/cluster-generations) clusters.
{/note}

## {heading(Preparatory steps)[id=prep]}

1. [Create](../../instructions/create-cluster/create-webui-gen-2) a Kubernetes cluster of the latest version, if not done so already.
1. [Install and configure](/en/kubernetes/k8s/connect/kubectl#before_you_start) `kubectl`, if not done so already.
1. [Connect](/en/kubernetes/k8s/connect/kubectl#connect) to the cluster via `kubectl`.
1. [Install the External Secrets Manager add-on](../../instructions/addons/advanced-installation/install-advanced-eso), if not done so already.
1. [Enable API access](/en/tools-for-using-services/api/rest-api/enable-api), if not done so already.

## {heading({counter(eso)}. Create a secret in the secrets manager)[id=eso-kms]}

In the VK Cloud Secret Manager, [create](/ru/security/secret-manager/instructions/manage-secret#sm-manage-create "change-lang") a secret with the `external-secret` ID and arbitrary keys.

## {heading({counter(eso)}. Create a Kubernetes secret)[id=eso-create]}

1. Create the `external-secrets-operator` namespace, if not done so already:

   ```console
   kubectl create namespace external-secrets-operator
   ```
   
1. Create the `password.yaml` manifest that will store the password to access the VK Cloud Secret Manager:

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: password
     namespace: external-secrets-operator
   type: Opaque
   data:
     password: <PASSWORD>
   ```
   
   Here, `<PASSWORD>` is your password from the VK Cloud management console in the base64 encoding. 

1. Apply the manifest in the cluster:

   ```console
   kubectl apply -f password.yaml
   ```

## {heading({counter(eso)}. Create a SecretStore)[id=eso-store]}

1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
1. Click the username in the page header and select **Project settings**.
1. Go to the **API access** tab and keep note of the following values:

   - **Project ID**;
   - **User Domain Name**;
   - **Username**.

1. Create the `secretstore.yaml` manifest — an object of the `SecretStore` type that describes how to connect to the VK Cloud Secret Manager:

   ```yaml
   apiVersion: external-secrets.io/v1
   kind: SecretStore
   metadata:
     name: secret-store
     namespace: external-secrets-operator
   spec:
     provider:
       vk:
         projectID: <PROJECT_ID>
         url: <AUTH_URL>
         auth:
           domain: <USER_DOMAIN_NAME>
           username: <USERNAME>
           password:
             key: password
             name: password
      ```

   Here:

   - `<PROJECT_ID>`, `<USER_DOMAIN_NAME>`, and `<USERNAME>` are the values from the project settings. 
   - `<AUTH_URL>` is an address depending on your [region](https://cloud.vk.com/docs/en/tools-for-using-services/account/concepts/regions):
      - `https://msk.cloud.vk.com` for the Moscow region
      - `https://kz.cloud.vk.com` for the Kazakhstan region

1. Apply the manifest in the cluster:

   ```console
   kubectl apply -f secretstore.yaml
   ```

## {heading({counter(eso)}. Create an ExternalSecret)[id=eso-external]}
   
1. Create the `externalsecret.yaml` manifest — an object of the `ExternalSecret` type that describes what `SecretStore` to load the secret from and how to update it:

   ```yaml
   apiVersion: external-secrets.io/v1
   kind: ExternalSecret
   metadata:
     name: external-secret
     namespace: external-secrets-operator
   spec:
     refreshInterval: 5m
     secretStoreRef:
       name: secret-store
       kind: SecretStore
     target:
       name: external-secret
       creationPolicy: Owner
     data:
       - secretKey: <KEY_NAME_IN_SECRET>
         remoteRef:
           key: <SECRET_ID>
           property: <SECRET_KEY>
   ```   
   
   Здесь:

   - `<KEY_NAME_IN_SECRET>` is the name of the key in the Kubernetes secret. Example: `password`.
   - `<SECRET_ID>` is the ID of the secret that you [created](#eso-kms) earlier in the VK Cloud Secret Manager.
   - `<SECRET_KEY>` is the key in the secret from the VK Cloud Secret Manager the value of which you want to synchronize with the Kubernetes secret.
   
   For example, the VK Cloud Secret Manager has a secret with the `external-secret` ID and the following pairs of values: `key1: value1`, `key2: value2`, `key3: value3`. If you want to set up the Kubernetes secret to synchronize the value of `value2`, use `key2` in the `property` field: 

   ```yaml
   key: external-secret
   property: key2
   ```

1. Apply the manifest in the cluster:

   ```console
   kubectl apply -f externalsecret.yaml
   ```

This will create a new object of the `Secret` type named `external-secret` in Kubernetes. The add-on will check the value of the specified field of the secret in the VK Cloud Secret Manager every five minutes. If the value changes, the add-on will automatically update it in the Kubernetes secret.

## {heading({counter(eso)}. Create an ExternalSecret to synchronize all keys in the secret)[id=eso-secrets-all]}

1. Create the `externalsecretall.yaml` manifest that will synchronize all pairs of values from the secret that you created in the VK Cloud Secret Manager:

   ```yaml
   apiVersion: external-secrets.io/v1
   kind: ExternalSecret
   metadata:
     name: external-secret-all
     namespace: external-secrets-operator
   spec:
     refreshInterval: 5m
     secretStoreRef:
       name: secret-store
       kind: SecretStore
     target:
       name: external-secret-all
       creationPolicy: Owner
     dataFrom:
       - extract:
           key: <SECRET_ID>
   ```
   
1. Apply the manifest in the cluster:

   ```console
   kubectl apply -f externalsecretall.yaml
   ```

This will create a new object of the `Secret` type named `external-secret-all` in Kubernetes. The add-on will check all values of the secret in the VK Cloud Secret Manager every five minutes. If the values change, the add-on will automatically update them in the Kubernetes secret.

## {heading({counter(eso)}. Test the add-on)[id=eso-check]}

1. Verify that the External Secrets Operator add-on correctly synchronizes secrets by using the command:

   ```console
   kubectl -n external-secrets-operator get secret
   ```
   
   The command output must have the `external-secret` and `external-secret-all` secrets you created earlier:
   
   ```text
   NAME                       TYPE     DATA    AGE
   external-secret            Opaque   1       ...
   external-secret-all        Opaque   2       ...
   external-secrets-webhook   Opaque   4       ...
   password                   Opaque   1       ...
   ```
 
1. View the contents of the secrets:

   ```console
   kubectl -n external-secrets-operator get secret external-secret -o yaml
   kubectl -n external-secrets-operator get secret external-secret-all -o yaml
   ``` 

## {heading(Delete unused resource)[id=eso-delete]}

{include(/en/_includes/_remove-k8s-resources.md)} the External Secrets Operator, delete them:

1. Delete the `external-secrets-operator` namespace and the resources associated with it:

   ```console
   kubectl delete namespace external-secrets-operator
   ```

{include(/en/_includes/_delete-test-cluster-short.md)}
