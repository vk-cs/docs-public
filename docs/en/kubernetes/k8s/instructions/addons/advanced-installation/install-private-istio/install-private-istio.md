# {heading(Istio)[id=k8s-install-advanced-istio]}

{include(/en/_includes/_translated_by_ai_en.md)}

Istio is a framework implementing the service mesh concept, in which a separate layer is allocated for interaction between application services. Using Istio provides services with traffic management without changing the code of the services themselves (sidecar containers are used).

## {heading(Installing the addon)[id=k8s-install-advanced-istio-install]}

1. {linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]} your {var(cloud)} management console.
1. Select the project where the desired cluster is located.
1. Go to the **Kubernetes Clusters** → **Kubernetes Clusters** section.
1. Click the name of the desired cluster.
1. Go to the **Addons** tab.
1. Click the **Install** button on the `istio` addon card and click the **Install addon** button.
1. (Optional) Edit:

    - the application name;
    - the name of the namespace where the addon will be installed;
    - the addon configuration code.

      {note:warn}
      An incorrectly specified configuration code may lead to errors during installation or addon malfunction.
      {/note}

      A detailed description of the code parameters is available [in the Istio repository](https://github.com/istio/istio/blob/1.19.3/manifests/charts/istio-control/istio-discovery/values.yaml).

1. Click the **Install addon** button.

   The addon installation in the cluster will begin. This process may take a long time.

1. To activate the Istio addon for the namespace with the application, run the command:

   ```console
   kubectl label namespace <NAMESPACE> istio-injection=enabled --overwrite
   ```
   Here `<NAMESPACE>` is the name of the namespace.