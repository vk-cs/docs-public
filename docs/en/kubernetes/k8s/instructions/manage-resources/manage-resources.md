You can manage resources of a Kubernetes cluster via the UI of the VK Cloud management console. This functionality provides an alternative to performing the same actions via `kubectl` and Kubernetes Dashboard. Examples of commands for creating, changing, and deleting a resource via `kubectl` are available in your management console.

## {heading(View a resource)[id=view-resources]}

{include(/en/_includes/_open-cluster.md)}

1. Go to the **Cluster resources** tab. It lists all Kubernetes resources used in the cluster created via the VK Cloud management console or via `kubectl`.

{include(/en/_includes/_cluster-resources.md)}

## {heading(Create a resource)[id=create-resources]}

{include(/en/_includes/_open-cluster.md)}

1. Go to the **Cluster resources** tab and click the **Create resource** button.
1. Add the resource manifest in the YAML format. For the examples of manifests, refer to the [official Kubernetes documentation](https://kubernetes.io/docs/tasks/run-application/run-stateless-application-deployment/).
1. Confirm the operation.

The resource you add is recognized automatically and becomes available in the list of resources in the respective category. For example, if you add a manifest for PV, it will be available in the category **Storage** in the **Persistent Volumes** section.

## {heading(Download a resource manifest)[id=download-yaml]}

{include(/en/_includes/_open-cluster.md)}

1. Go to the **Cluster resources** tab.

{include(/en/_includes/_cluster-resources.md)}

1. Click ![ ](/en/assets/more-icon.svg "inline") for the required resource and select the **Download yaml** option. This downloads a YAML file with the resource manifest.

## {heading(Change details of a resource)[id=edit-resources]}

{note:warn}
Changing resource details might lead to problems in the cluster.
{/note}

{include(/en/_includes/_open-cluster.md)}

1. Go to the **Cluster resources** tab.

{include(/en/_includes/_cluster-resources.md)}

1. Click ![ ](/en/assets/more-icon.svg "inline") for the required resource and select the **Edit** option.
1. In the window that opens, change the manifest as you need and save the changes.

## {heading(Delete a resource)[id=delete-resources]}

{note:warn}
Deleting a resource might lead to problems in the cluster.
{/note}

{include(/en/_includes/_open-cluster.md)}

1. Go to the **Cluster resources** tab.

{include(/en/_includes/_cluster-resources.md)}

1. Click ![ ](/en/assets/more-icon.svg "inline") for the required resource and select the **Delete** option.
1. Confirm the operation.