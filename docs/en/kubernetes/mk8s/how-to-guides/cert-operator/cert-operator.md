# {heading(Using cert-operator)[id=mk8s-cert-operator]}

{include(/en/_includes/_translated_by_ai_en.md)}

Use the {linkto(../../concepts/addons-and-settings/addons#mk8s-addons-cert-operator)[text=cert-operator]} add-on to pull images from container registries that have self-signed certificates. The add-on automatically makes the registry a trusted one.

## {heading(Before you start)[id=mk8s-cert-operator-prepare]}

{include(/en/_includes/_create-test-cluster.md)}
1. [Make sure](/en/kubernetes/mk8s/connect/kubectl#check_connection) that you can connect to the cluster with `kubectl`.
1. {linkto(../../instructions/addons/advanced-installation/install-advanced-cert-operator#mk8s-install-advanced-cert-operator)[text=Install the cert-operator add-on]}, if not done so already.
1. Get the CA certificate of the registry in PEM format. To use a certificate chain, put the certificates one after another.

   The add-on works only with CA certificates and certificate chains. It does not use client certificates, private keys, or mutual TLS (mTLS) authentication.

## {heading({counter(cert-operator)}. Create a RegistryCertificate object)[id=mk8s-cert-operator-create]}

1. Create the `registry-certificate.yaml` manifest with a `RegistryCertificate` object for the CA certificate of the registry:

   ```yaml
   apiVersion: crio.registry/v1alpha1
   kind: RegistryCertificate
   metadata:
     name: <OBJECT_NAME>
   spec:
     host: <REGISTRY_ADDRESS>
     certificate: |
       -----BEGIN CERTIFICATE-----
       <CERTIFICATE_CONTENT>
       -----END CERTIFICATE-----
   ```

   Here:

   - `<OBJECT_NAME>` — a unique name. The object is for the whole cluster, so do not specify a namespace.
   - `<REGISTRY_ADDRESS>` — the address of the registry in the `host[:port]` format, for example, `registry.example.com:5000`.

      If you create several objects for one registry address, the add-on applies the first object in alphabetical order. If the registry address in an object is not valid, the add-on does not apply this object.

   - `<CERTIFICATE_CONTENT>` — the content of the CA certificate.

      If the certificate in an object is not valid, the add-on does not apply it. If the add-on applied a CA certificate for this registry before, this certificate does not change.

1. Apply the manifest to the cluster:

   ```console
   kubectl apply -f registry-certificate.yaml
   ```

   The add-on transfers the CA certificate to all worker nodes. By default, this takes up to 30 seconds. If you change the CA certificate in the object later, the add-on replaces the old certificate on the nodes with the new one.

## {heading({counter(cert-operator)}. Check the add-on operation)[id=mk8s-cert-operator-check]}

To check that the add-on applied the CA certificate, run the command:

```console
kubectl describe regcert <OBJECT_NAME>
```

The `State` field shows the status of the CA certificate for each worker node:

- `Synced` — the add-on applied the CA certificate.
- `Failed` — the add-on did not apply the CA certificate. The `Message` field shows the reason.

For more details about how `cert-operator` works and its limits, see the {linkto(../../concepts/addons-and-settings/addons#mk8s-addons-cert-operator)[text=Add-ons]} section.

## {heading(Delete unused resources)[id=mk8s-cert-operator-delete]}

A running cluster is billed and consumes computing resources. If you no longer need the Kubernetes resources that you created to test the cert-operator add-on, delete them:

1. Delete the `RegistryCertificate` object:

   ```console
   kubectl delete regcert <OBJECT_NAME>
   ```

   The add-on removes the CA certificate from the worker nodes. The add-on does not apply this certificate anymore, and the registry is not trusted.

1. (Optional) {linkto(../../instructions/addons/manage-addons#removing_addon)[text=Delete the add-on]}.

   The CA certificates that are already on the nodes stay there, but the add-on stops the synchronization of `RegistryCertificate` objects. To resume the synchronization, {linkto(../../instructions/addons/advanced-installation/install-advanced-cert-operator#mk8s-install-advanced-cert-operator)[text=install]} the add-on again.

{include(/en/_includes/_delete-test-cluster-short.md)}
