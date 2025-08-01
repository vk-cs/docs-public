You can manage certificates in Kubernetes clusters using [cert-manager](https://cert-manager.io/):

- Issue certificates (including self-signed ones) by sending requests to the sources that act as Certificate Authority (CA).

  Examples of the sources:
  
  - Cybersecurity solutions providers such as [Venafi](https://www.venafi.com/).
  - Certificate providers, such as [Let’s Encrypt](https://letsencrypt.org/).
  - Storage for secrets, such as [HashiCorp Vault](https://www.vaultproject.io/).
  - Local containers containing the public part of a certificate and private key.

- Automatically reissue expiring certificates.

A certificate issued with `cert-manager` will be available to other Kubernetes resources. For example, it can be used by Ingress.

It will be shown how to install and upgrade `cert-manager` using Helm 3 in Kubernetes clusters. A self-signed certificate will also be issued to confirm `cert-manager` operability.

## Preparatory steps

1. If you do not already have a Kubernetes cluster, then create one.

   {note:info}

   To save time, you can [create a Kubernetes cluster](../../../../kubernetes/k8s/instructions/create-cluster) in a few minutes on the VK Cloud platform.

   {/note}

1. Determine the cluster's version.

1. [Install](https://kubernetes.io/docs/tasks/tools/#kubectl) the `kubectl` utility on the host from which you plan to connect to the cluster, if the utility is not already installed.

   Select the version of `kubectl` that is [compatible](https://kubernetes.io/releases/version-skew-policy/#kubectl) with the cluster.

1. Make sure that you can connect to the cluster using `kubectl`.

1. [Install](https://helm.sh/docs/intro/install/) Helm 3.0.0 or higher on the host from which you plan to connect to the cluster, if the utility is not already installed.

   Select the version of Helm that is [compatible](https://helm.sh/docs/topics/version_skew/) with the cluster.

## 1. Add the repository and select the version to install

1. Add the `cert-manager` repository:

   ```console
   helm repo add jetstack https://charts.jetstack.io
   ```

1. Update the charts cache:

   ```console
   helm repo update
   ```

1. List available `cert-manager` charts and their versions:

   ```console
   helm search repo jetstack -l
   ```

1. Select the `cert-manager` version to install on the cluster.

   See the compatibility table for the `cert-manager` and Kubernetes [in the official cert-manager documentation](https://cert-manager.io/docs/installation/supported-releases/).

   {note:info}

   Next, the `1.11.3` version of `cert-manager` will be installed to additionally demonstrate the [upgrade](#5_upgrade_cert_manager) to `1.12.3` version.

   You could select any version that suits your needs. Adjust the commands listed below to match the selected version.

   {/note}

## 2. Install cert-manager

1. Install the Custom Resource Definitions (CRDs) required by `cert-manager` to operate.

   The CRDs will be installed manually using `kubectl`. It is the [advised approach](https://cert-manager.io/docs/installation/helm/#crd-considerations) as it is the most secure.

   Execute the command:

   ```console
   kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.11.3/cert-manager.crds.yaml
   ```

1. Install the selected vesion of `cert-manager`.

   This command installs a release named `cert-manager` in the `cert-manager` namespace. If such a namespace does not exist in the cluster, then it will be created automatically.

   <tabs>
   <tablist>
   <tab>Linux (bash) / macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```console
   helm install cert-manager jetstack/cert-manager \
     --version v1.11.3 \
     --namespace cert-manager \
     --create-namespace
   ```

   </tabpanel>
   <tabpanel>

   ```console
   helm install cert-manager jetstack/cert-manager `
     --version v1.11.3 `
     --namespace cert-manager `
     --create-namespace
   ```

   </tabpanel>
   </tabs>

   On successful completion of the installation Helm will display the message with:

   - `STATUS`: `deployed`.
   - `NOTES`: `cert-manager v1.11.3 has been deployed successfully!`.

   {cut(Example of the output)}

   ```text
   NAME: cert-manager
   LAST DEPLOYED: Thu Aug 17 15:06:35 2023
   NAMESPACE: cert-manager
   STATUS: deployed
   REVISION: 1
   TEST SUITE: None
   NOTES:
   cert-manager v1.11.3 has been deployed successfully!
   
   In order to begin issuing certificates, you will need to set up a ClusterIssuer
   or Issuer resource (for example, by creating a 'letsencrypt-staging' issuer).
   
   More information on the different types of issuers and how to configure them
   can be found in our documentation:
   
   https://cert-manager.io/docs/configuration/
   
   For information on how to configure cert-manager to automatically provision
   Certificates for Ingress resources, take a look at the `ingress-shim`
   documentation:
   
   https://cert-manager.io/docs/usage/ingress/
   ```

   {/cut}

## 3. Confirm cert-manager operability

1. Verify that all the necessary pods have been successfully created in the `cert-manager` namespace. The pods should be in the `Running` state:

   ```console
   kubectl get pods -n cert-manager
   ```

   {cut(Example of the output)}

   ```text
   NAME                                       READY   STATUS    RESTARTS   AGE
   cert-manager-...                           1/1     Running   0          3m20s
   cert-manager-cainjector-...                1/1     Running   0          3m20s
   cert-manager-webhook-...                   1/1     Running   0          3m20s
   ```

   {/cut}

1. Issue a self-signed certificate for testing:

   1. Create a manifest:

      {cut(cert-manager-test-resources.yaml)}

      ```yaml
      apiVersion: v1
      kind: Namespace
      metadata:
        name: cert-manager-test
      ---
      apiVersion: cert-manager.io/v1
      kind: Issuer
      metadata:
        name: test-selfsigned
        namespace: cert-manager-test
      spec:
        selfSigned: {}
      ---
      apiVersion: cert-manager.io/v1
      kind: Certificate
      metadata:
        name: selfsigned-cert
        namespace: cert-manager-test
      spec:
        dnsNames:
          - example.com
        secretName: selfsigned-cert-tls
        issuerRef:
          name: test-selfsigned
      ```

      {/cut}

      This manifest contains the descriptions of:

      - The `cert-manager-test` namespace. The `Issuer` and `Certificate` resources will be placed in this namespace.
      - The `Issuer` resource that is responsible for issuing self-signed certificates.
      - The `Certificate` resource that holds the parameters of the self-signed certificate to be issued.

   1. Apply the manifest:

      ```console
      kubectl apply -f cert-manager-test-resources.yaml
      ```

      The described resources will be created. In addition, `cert-manager` will automatically create other necessary resources.

   1. Verify that all the necessary resources have been successfully created in the `cert-manager-test` namespace:

      ```console
      kubectl get issuers,clusterissuers,certificates,certificaterequests,orders,challenges,secrets -n cert-manager-test
      ```

      The command's output should contain:

      - `Issuer` and `Certificate` in the `READY: True` status. Their configuration was described in the manifest.
      - `CertificateRequest` in the `READY: True` status.
      - `Secret` containing the certificate's data.

      {cut(Example of the output)}

      ```text
      NAME                                     READY   AGE
      issuer.cert-manager.io/test-selfsigned   True    39m
      
      NAME                                          READY   SECRET                AGE
      certificate.cert-manager.io/selfsigned-cert   True    selfsigned-cert-tls   39m
      
      NAME                                                       APPROVED   DENIED   READY   ISSUER            REQUESTOR                                         AGE
      certificaterequest.cert-manager.io/selfsigned-cert-...     True                True    test-selfsigned   system:serviceaccount:cert-manager:cert-manager   39m
      
      NAME                         TYPE                DATA   AGE
      secret/selfsigned-cert-tls   kubernetes.io/tls   3      39m
      ```
      {/cut}

   1. Verify the certificate's status:

      ```console
      kubectl describe certificate selfsigned-cert -n cert-manager-test
      ```

      If the certificate has been successfully issued:

      - Status information (`Status`) will contain the `Certificate is up to date and has not expired` string.
      - The `Events` list will contain the event with the `The certificate has been successfully issued` message.

      {cut(Example of the partial output)}

      ```text
      ...

      Status:
        Conditions:
          Last Transition Time:  2023-08-17T08:11:27Z
          Message:               Certificate is up to date and has not expired
          Observed Generation:   1
          Reason:                Ready
          Status:                True
          Type:                  Ready
        Not After:               2023-11-15T08:11:27Z
        Not Before:              2023-08-17T08:11:27Z
        Renewal Time:            2023-10-16T08:11:27Z
        Revision:                1
      Events:
        Type    Reason     Age    From                                       Message
        ----    ------     ----   ----                                       -------
        Normal  Issuing    3m16s  cert-manager-certificates-trigger          Issuing certificate as Secret does not exist
        Normal  Generated  3m16s  cert-manager-certificates-key-manager      Stored new private key in temporary Secret resource "selfsigned-cert-..."
        Normal  Requested  3m16s  cert-manager-certificates-request-manager  Created new CertificateRequest resource "selfsigned-cert-..."
        Normal  Issuing    3m16s  cert-manager-certificates-issuing          The certificate has been successfully issued
      ```

      {/cut}

   If the certificate has been successfully issued, then `cert-manager` is correctly installed and operates normally.

## 4. (Optional) Back up the cert-manager resources

{note:info}

Due to security reasons, it is [advised](https://cert-manager.io/docs/tutorials/backup) to create a backup before [upgrading](#5_upgrade_cert_manager) `cert-manager`

{/note}

A backup of the `Issuer`, `ClusterIssuer` and `Certificate` reosurces will be created. The following resources are not the part of the backup:

- `CertificateRequests` resources. It is [not advised](https://cert-manager.io/docs/tutorials/backup/#backing-up-cert-manager-resource-configuration) to include such resources in the backup, as it may complicate restoring from the backup.

- Secrets that directly store the certificate's data, including private key.

  {note:warn}

  During restoring from the backup, if no matching secret is found for the `Certificate` resource, then [the certificate will be reissued](https://cert-manager.io/docs/tutorials/backup/#backing-up-cert-manager-resource-configuration).

  {/note}

To create a backup, execute the command:

<tabs>
<tablist>
<tab>Linux (bash) / macOS (zsh)</tab>
<tab>Windows (PowerShell)</tab>
</tablist>
<tabpanel>

```console
kubectl get -o yaml \
  --all-namespaces \
  issuer,clusterissuer,certificate \
> cert-manager-backup.yaml
```

</tabpanel>
<tabpanel>

```console
kubectl get -o yaml `
  --all-namespaces `
  issuer,clusterissuer,certificate `
> cert-manager-backup.yaml
```

</tabpanel>
</tabs>

Read about advanced backups and restoring from backup [in the official cert-manager documentation](https://cert-manager.io/docs/tutorials/backup).

## 5. Upgrade cert-manager

1. Check the version of the installed `cert-manager` release:

   ```console
   helm list --namespace cert-manager
   ```

1. Update the charts cache:

   ```console
   helm repo update
   ```

1. List available `cert-manager` charts and their versions:

   ```console
   helm search repo jetstack -l
   ```

1. Explore the official `cert-manager` documentation [about the upgrade](https://cert-manager.io/docs/installation/upgrading/). It contains upgrade recommendations, a list of breaking changes, and other useful information.

   In particular, it is [advised](https://cert-manager.io/docs/installation/upgrading/) to upgrade one minor version at a time (for example, 1.**11**.3 → 1.**12**.3).

1. Select the version to upgrade to.

   See the compatibility table for the `cert-manager` and Kubernetes [in the official cert-manager documentation](https://cert-manager.io/docs/installation/supported-releases/).

   {note:info}

   Next, the `1.11.3` version of `cert-manager` will be upgraded to `1.12.3` version.

   If a different version of `cert-manager` has been installed earlier, then select the correct version to ugrade to, taking into account the recommendations given above.

   {/note}

1. Upgrade the CRDs installed in the cluster.

   Since these CRDs have been [installed manually](#2_install_cert_manager), upgrade them manually as well before upgrading the `cert-manager` itself.

   ```console
   kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.3/cert-manager.crds.yaml
   ```

1. Upgrade the `cert-manager` release to the selected version:

   <tabs>
   <tablist>
   <tab>Linux (bash) / macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```console
   helm upgrade cert-manager jetstack/cert-manager \
     --version v1.12.3 \
     --namespace cert-manager
   ```

   </tabpanel>
   <tabpanel>

   ```console
   helm upgrade cert-manager jetstack/cert-manager `
     --version v1.12.3 `
     --namespace cert-manager
   ```

   </tabpanel>
   </tabs>

   On successful completion of the upgrade, Helm will display the message with:
   - `Release "cert-manager" has been upgraded. Happy Helming!`.
   - `STATUS`: `deployed`.
   - `NOTES`: `cert-manager v1.12.3 has been deployed successfully!`.

   {cut(Example of the output)}

   ```text
   Release "cert-manager" has been upgraded. Happy Helming!
   NAME: cert-manager
   LAST DEPLOYED: Thu Aug 17 15:17:35 2023
   NAMESPACE: cert-manager
   STATUS: deployed
   REVISION: 2
   TEST SUITE: None
   NOTES:
   cert-manager v1.12.3 has been deployed successfully!
   
   In order to begin issuing certificates, you will need to set up a ClusterIssuer
   or Issuer resource (for example, by creating a 'letsencrypt-staging' issuer).
   
   More information on the different types of issuers and how to configure them
   can be found in our documentation:
   
   https://cert-manager.io/docs/configuration/
   
   For information on how to configure cert-manager to automatically provision
   Certificates for Ingress resources, take a look at the `ingress-shim`
   documentation:
   
   https://cert-manager.io/docs/usage/ingress/
   ```

   {/cut}

## Delete unused resources

1. If the Kubernetes resources, created to [confirm cert-manager operability](#3_confirm_cert_manager_operability), are the test ones and you no longer need them, then delete them:

   ```console
   kubectl delete -f cert-manager-test-resources.yaml
   ```

   {note:warn}

   The `cert-manager-test` namespace with all contents, including additional resources automatically created by `cert-manager`, will be deleted.

   {/note}

1. If `cert-manager` has been [installed](#2_install_cert_manager) for testing purposes and you no longer need it, then delete all resources associated with it:

   1. Make sure that there are no resources created by `cert-manager` in the cluster:

      ```console
      kubectl get issuers,clusterissuers,certificates,certificaterequests,orders,challenges --all-namespaces
      ```

      If there are such resources, delete them.

   1. Delete the `cert-manager` release:

      ```console
      helm delete cert-manager --namespace cert-manager
      ```

   1. Delete the `cert-manager` namespace:

      ```console
      kubectl delete ns cert-manager
      ```

   1. Delete the CRDs, installed in the cluster for `cert-manager`:

      ```console
      kubectl delete -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.3/cert-manager.crds.yaml
      ```
