When [connecting using kubectl](../../connect/kubectl) to a Cloud Containers cluster, [kubeconfig is used](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/), this is cluster configuration file. kubeconfig is usually used to work with the cluster from the VK Cloud management console, which is configured to use [single sign-on technology](../../concepts/access-management). Therefore, when working with `kubectl` you periodically need to enter the user's password.

This authentication process is inconvenient when working with automated tools that need access to the cluster. To work with them, it is more convenient to use the kubeconfig file for the service account. This kubeconfig allows you to authenticate with a token with an infinite lifetime, without entering a password.

## Preparatory steps

1. [Create](../../service-management/create-cluster) the Cloud Containers cluster is the most up-to-date version.

   When creating a cluster, select the **Assign external IP** option. Select other cluster parameters at your discretion.

1. [Make sure](../../connect/kubectl) that you can connect to the created cluster using `kubectl`.

   In this case, kubeconfig will be used, downloaded from the VK Cloud management console.

1. Set the environment variables pointing to kubeconfig:

   - `VKCLOUD_KUBECONFIG`: the path to the kubeconfig uploaded from the VK Cloud management console.
   - `SA_KUBECONFIG`: the path to kubeconfig for the service account (the file itself will be created later).

   This will simplify further work with `kubectl`.

   <info>

   The path to your kubeconfig files may differ from the example below.

   </info>

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   export VKCLOUD_KUBECONFIG="/home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml"
   export SA_KUBECONFIG="/home/user/.kube/sa_kubeconfig.yaml"
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   $VKCLOUD_KUBECONFIG="C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml"
   $SA_KUBECONFIG="C:\Users\user\.kube\sa_kubeconfig.yaml"
   ```

   </tabpanel>
   </tabs>

1. Make sure that after connecting to the cluster, you have the rights to create the necessary Kubernetes resources:

   ```bash
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG auth can-i create serviceaccount
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG auth can-i create secret
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG auth can-i create clusterrolebinding
   ```

   The answer `yes` should be output for each of the commands.

   If you do not have the rights to create any of these resources (the answer is `no`), [adjust the VK Cloud user role](/en/tools-for-using-services/account/service-management/project-settings/access-manage#changing_member_role) on behalf of which the connection to the cluster is being performed.

   For more information about the role model and available roles, see [Access management](../../concepts/access-management).

## 1. Create a service account and link it to the role

1. Create an `example-sa` service account in the `kube-system` namespace:

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     create serviceaccount example-sa -n kube-system

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     create serviceaccount example-sa -n kube-system

   ```

   </tabpanel>
   </tabs>

   Example of command output:

   ```text
   serviceaccount/example-sa created
   ```

1. Select the cluster role to assign to the service account.

   To get a list of all cluster roles with a detailed description, run the command:

   ```bash
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG describe clusterroles
   ```

   When choosing a role, follow the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) to increase security when working with the cluster. Read more about the role model in the [official Kubernetes documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/).

   As an example, the `edit` role will be assigned next. It [corresponds to](../../concepts/access-management#kubernetes-roles-relation) to role `Kubernetes operator` from management console.

1. Link the created service account to the selected cluster role. To do this, create a `ClusterRoleBinding` resource named `example-binding`.

   The service account must be specified along with the namespace to which it belongs.

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     create clusterrolebinding example-binding \
       --serviceaccount=kube-system:example-sa \
       --clusterrole=edit
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     create clusterrolebinding example-binding `
       --serviceaccount=kube-system:example-sa `
       --clusterrole=edit

   ```

   </tabpanel>
   </tabs>

   Example of command output:

   ```text
   clusterrolebinding.rbac.authorization.k8s.io/example-binding created
   ```

## 2. Get a token for a service account

1. Create an 'example-token` secret containing a token for the service account:

   1. Create a manifest file:

      <details>
      <summary>example-token.yaml</summary>

      <!-- prettier-ignore -->
      ```yaml
      apiVersion: v1
      kind: Secret
      type: kubernetes.io/service-account-token
      metadata:
        name: example-token
        namespace: kube-system
        annotations:
          kubernetes.io/service-account.name: example-sa
      ```

      </details>

      Explanations of the manifest fields:

      - `type`: a special type of secret `kubernetes.io/service-account-token`. This secret holds a token for the service account.
      - `metadata.namespace`: the namespace for the secret. The secret must be placed in the same namespace as the service account.
      - `metadata.annotations`: special abstract `kubernetes.io/service-account.name` with the name of the service account. The token from the created secret will be associated with this account.

   1. Apply the manifest file:

      ```bash
      kubectl --kubeconfig $VKCLOUD_KUBECONFIG apply -f example-token.yaml
      ```

      A secret will be created with the specified parameters. Example of command output:

      ```text
      secret/example-token created
      ```

1. Make sure that the service account has been assigned a token from the created secret:

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     describe serviceaccount example-sa -n kube-system

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     describe serviceaccount example-sa -n kube-system

   ```

   </tabpanel>
   </tabs>

   The output should contain an indication of the secret in the `Tokens` field.

   <details>
   <summary>Example of command output</summary>

   ```text
   Name:                example-sa
   Namespace:           kube-system
   Labels:              <none>
   Annotations:         <none>
   Image pull secrets:  <none>
   Mountable secrets:   <none>
   Tokens:              example-token
   Events:              <none>
   ```

   </details>

1. Get the token value.

   The secret stores the token in encoded form (encoding scheme [Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64)). The token must be decoded so that it can be used in kubeconfig:

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     get secret example-token -n kube-system \
     --template={{.data.token}} | base64 --decode

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   [System.Text.Encoding]::UTF8.GetString( `
     [System.Convert]::FromBase64String( `
       (kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
          get secret example-token -n kube-system -o json `
          | ConvertFrom-Json).data.token))

   ```

   </tabpanel>
   </tabs>

   The token value will be displayed. Save it.

   <err>

   The value of the token is confidential information. If it is compromised, [revoke the token](#revoke_the_compromised_token).

   </err>

## 4. Create a kubeconfig for a service account

1. Create the basis for this kubeconfig by copying the kubeconfig downloaded from the VK Cloud management console.

   ```bash
   cp $VKCLOUD_KUBECONFIG $SA_KUBECONFIG
   ```

1. (Optional) Get to know the kubeconfig structure:

   ```bash
   kubectl --kubeconfig $SA_KUBECONFIG config view
   ```

   The contents of kubeconfig will be output in a compressed form: the values of some fields will be skipped.

   <details>
   <summary>Simplified kubeconfig example</summary>

   <!-- prettier-ignore -->
   ```yaml
   apiVersion: v1
   clusters: # Clusters
     - cluster: <cluster info>
       name: <cluster name>
   contexts: # The contexts in which the cluster is being worked on
     - context:
         cluster: <cluster name>
         user: <username>
       name: <context name>
   current-context: <current context name>
   kind: Config
   preferences: {}
   users: # Users
     - name: <username>
       user:
         token: <authentication data>
   ```

   </details>

   Kubeconfig contains all the parameters necessary to work with the cluster:

   - `clusters`: a list of clusters and data to connect to them.

     The Kubeconfig for the Cloud Containers cluster contains an entry about a single cluster.

   - `users`: a list of users and data for their authentication in the cluster.

     Kubeconfig for the Cloud Containers cluster contains a record of a single user who authenticates using `keystone-auth`.

   - `contexts`: the context in which `kubectl` works. In the simplest case, the context is a combination of the cluster name and the user name.

     Kubeconfig for the Cloud Containers cluster contains an entry about a single context. This context uses the cluster and user record that are already defined in kubeconfig.

   When `kubectl` is running in the specified context, it is working with the cluster specified in the context on behalf of the specified user.

1. Change the contents of kubeconfig for the service account so that this file contains the parameters associated with the previously configured service account:

   1. Delete the existing user.

      This user corresponds to the VK Cloud user and should not appear in kubeconfig, which will be used by automated tools.

      1. Get a list of users:

         <tabs>
         <tablist>
         <tab>Linux (bash)/macOS (zsh)</tab>
         <tab>Windows (PowerShell)</tab>
         </tablist>
         <tabpanel>

         ```bash
         kubectl --kubeconfig $SA_KUBECONFIG \
           config get-users

         ```

         </tabpanel>
         <tabpanel>

         ```powershell
         kubectl --kubeconfig $SA_KUBECONFIG `
           config get-users

         ```

         </tabpanel>
         </tabs>

      1. Delete the user using the required name from the list:

         <tabs>
         <tablist>
         <tab>Linux (bash)/macOS (zsh)</tab>
         <tab>Windows (PowerShell)</tab>
         </tablist>
         <tabpanel>

         ```bash
         kubectl --kubeconfig $SA_KUBECONFIG \
           config delete-user <username>

         ```

         </tabpanel>
         <tabpanel>

         ```powershell
         kubectl --kubeconfig $SA_KUBECONFIG `
           config delete-user <username>

         ```

         </tabpanel>
         </tabs>

         Example of partial command output:

         ```text
         deleted user kubernetes-cluster-1234 from ...sa_kubeconfig.yaml
         ```

   1. Add a new user `example-sa`.

      This user corresponds to a previously created service account. The previously received token will be used for authentication.

      <tabs>
      <tablist>
      <tab>Linux (bash)/macOS (zsh)</tab>
      <tab>Windows (PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
      kubectl --kubeconfig $SA_KUBECONFIG \
        config set-credentials example-sa --token="<token value>"

      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      kubectl --kubeconfig $SA_KUBECONFIG `
        config set-credentials example-sa --token="<token value>"

      ```

      </tabpanel>
      </tabs>

      Example of command output:

      ```text
      User "example-sa" set.
      ```

   1. Configure the current context to use the added user:

      <tabs>
      <tablist>
      <tab>Linux (bash)/macOS (zsh)</tab>
      <tab>Windows (PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
      kubectl --kubeconfig $SA_KUBECONFIG \
        config set-context --current --user="example-sa"

      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      kubectl --kubeconfig $SA_KUBECONFIG `
        config set-context --current --user="example-sa"

      ```

      </tabpanel>
      </tabs>

      Example output:

      ```text
      Context "default/kubernetes-cluster-1234" modified.
      ```

1. (Optional) Check the updated kubeconfig content for the service account:

   ```bash
   kubectl --kubeconfig $SA_KUBECONFIG config view
   ```

   This kubeconfig should not contain any other users except the previously added `example-sa`. The only context is to use this user.

   <details>
   <summary>Example of command output</summary>

   <!-- prettier-ignore -->
   ```yaml
   apiVersion: v1
   clusters:
   - cluster:
       certificate-authority-data: DATA+OMITTED
       server: https://203.0.113.123:6443
     name: kubernetes-cluster-1234
   contexts:
   - context:
       cluster: kubernetes-cluster-1234
       user: example-sa
     name: default/kubernetes-cluster-1234
   current-context: default/kubernetes-cluster-1234
   kind: Config
   preferences: {}
   users:
   - name: example-sa
     user:
       token: REDACTED
   ```

   </details>

## 5. Check the operation of the created kubeconfig

Use the `kubectl` commands and the previously created kubeconfig for the service account to get information about the cluster and its resources, for example:

1. Get information about the cluster:

   ```bash
   kubectl --kubeconfig $SA_KUBECONFIG cluster-info
   ```

   <details>
   <summary>Example of command output</summary>

   ```text
   Kubernetes control plane is running at https://203.0.113.123:6443
   CoreDNS is running at https://203.0.113.123:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
   ```

   </details>

1. Get a list of the main resources in the `default` namespace:

   ```bash
   kubectl --kubeconfig $SA_KUBECONFIG get all -n default
   ```

   <details>
   <summary>Example of command output</summary>

   ```text
   NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
   service/kubernetes   ClusterIP   10.254.0.1   <none>        443/TCP   3d1h
   ```

   </details>

If the password was not requested when executing the commands, then the resulting kubeconfig can be used in combination with automated tools to access the Cloud Containers cluster.

<err>

Provide the necessary measures to protect the kubeconfig file. It contains confidential information: the value of the token in plain text.

If kubeconfig is compromised [revoke the token](#revoke_the_compromised_token).

</err>

## Revoke the compromised token

If a previously created token or a kubeconfig containing it has been compromised, revoke the token to prevent unauthorized access to the cluster.

To do this, delete the secret that is used to store the token:

```bash
kubectl --kubeconfig $VKCLOUD_KUBECONFIG delete secret example-token -n kube-system
```

## Delete unused resources

1. If you no longer need the created Kubernetes resources, delete them:

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     delete clusterrolebinding example-binding
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     delete secret example-token -n kube-system
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     delete serviceaccount example-sa -n kube-system

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     delete clusterrolebinding example-binding
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     delete secret example-token -n kube-system
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     delete serviceaccount example-sa -n kube-system

   ```

   </tabpanel>
   </tabs>

1. A running Cloud Containers cluster is charged and consumes computing resources. If you don't need it anymore:

   - [stop](../../service-management/manage-cluster#start_or_stop_cluster) it to use it later;
   - [delete](../../service-management/manage-cluster#delete_cluster) its forever.
