## Starting a cluster

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) the VK Cloud management console.
1. Select the project where the desired cluster is located.
1. Go to the **ML Platform** → **Spark in k8s** section.
1. Perform one of the following actions:
   - Select the desired cluster using the checkbox, then click the **Launch** button. This is a group operation: you can start multiple stopped clusters at once by selecting them with checkboxes.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the desired cluster and select **Launch**.
1. Confirm the operation.

{/tab}

{/tabs}

## Stopping a cluster

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) the VK Cloud management console.
1. Select the project where the desired cluster is located.
1. Go to the **ML Platform** → **Spark in k8s** section.
1. Perform one of the following actions:
   - Select the desired cluster using the checkbox, then click the **Stop** button. This is a group operation: you can stop multiple active clusters at once by selecting them with checkboxes.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the desired cluster and select **Stop**.
1. Confirm the operation.

{/tab}

{/tabs}

## Retrieving cluster information

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) the VK Cloud management console.
1. Select the project where the desired cluster is located.
1. Go to the **ML Platform** → **Spark in k8s** section.
1. Click the name of the desired cluster.

{/tab}

{/tabs}

## Changing the virtual machine type for master nodes

{note:warn}The virtual machine type can only be changed when the cluster is running.{/note}

The process is described in detail in the [Cluster Node Scaling](/en/kubernetes/k8s/concepts/scale) section.

## Connecting to a cluster

{note:warn}Do not use the kubectl configuration file and key pair to connect to the cluster.{/note}

To connect to the cluster, use access tokens in the VK Cloud management console or the Cloud ML Platform library. The token creation process is described in detail in the [Authentication and authorization](/ru/ml/spark-to-k8s/ml-platform-library/authz "change-lang") or in the [Working with tokens](/en/ml/spark-to-k8s/instructions/tokens) section.

## Deleting a Cluster

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en/) the VK Cloud management console.
1. Select the project where the desired cluster is located.
1. Go to the **ML Platform** → **Spark in k8s** section.
1. Perform one of the following actions:
   - Select the desired cluster using the checkbox, then click the **Delete** button. This is a group operation: you can delete multiple clusters at once by selecting them with checkboxes.
   - Click ![ ](/en/assets/more-icon.svg "inline") for the desired cluster and select **Delete**.
1. Confirm the operation.

{/tab}

{/tabs}
