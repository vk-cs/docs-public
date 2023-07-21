<warn>

Before performing any operation on a cluster from Terraform, read the information in [Using Terraform](../helpers/terraform-howto#features-of-using-terraform-to-manage-the-container-service).

</warn>

## Start or stop the cluster

### Start cluster

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

This is a group operation: if necessary, you can start several stopped clusters at once by selecting them with checkboxes.

To start a cluster:

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/).
1. Select the project where the necessary cluster is located.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Use the checkbox to select the necessary cluster.
1. Click the **Launch** button.
1. Confirm the operation.

</tabpanel>
</tabs>

### Stop cluster

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

This is a group operation: if necessary, you can stop several started clusters at once by selecting them with checkboxes.

To stop a cluster:

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/).
1. Select the project where the necessary cluster is located.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Use the checkbox to select the necessary cluster.
1. Click the **Stop** button.
1. Confirm the operation.

</tabpanel>
</tabs>

## Get cluster information

Different information is available for running and stopped clusters. Terraform allows you to get only part of the information about the cluster.

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>Terraform</tab>
</tablist>
<tabpanel>

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/).
1. Select the project where the necessary cluster is located.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Click on the name of the necessary cluster. A page with information will open.

   General information about the cluster and the event log are available on the corresponding tab at the beginning of the page. Information about connecting to and managing the cluster is available on the corresponding tab at the end of the page.

</tabpanel>
<tabpanel>

1. Run the command:

   ```bash
   terraform state show vkcs_kubernetes_cluster.<cluster resource name in the Terraform configuration file>
   ```

1. Examine the available information in the output of the command.

</tabpanel>
</tabs>

## Get props for connecting to the cluster

Available props:

- `kubectl` configuration file;
- Kubernetes Dashboard secret (it can only be obtained when the cluster is running).

The operations to get these props are described in detail in [Connecting](../../connect/) section.

## Invalidate cluster key pair

When creating clusters of versions 1.22.9 and lower, you can specify a key pair to connect to the cluster hosts directly.

If the private part of the specified key pair has been compromised or lost, you can revoke the cluster key pair by performing the invalidate procedure.

The operation can only be performed when the cluster is running.

<warn>

After performing this operation, the existing public keys on the cluster will be removed.

</warn>

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/).
1. Select the project where the necessary cluster is located.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Expand the menu of the necessary cluster and select **Invalidate**.
1. In the window that appears, perform one of the following actions:
   - Upload the public part of the new key pair, if you have created it yourself;
   - Create a new key pair using the service;
   - Select another existing key pair.

</tabpanel>
</tabs>

## Change virtual machine type for master nodes

This operation is described in detail in [Cluster node scaling](../scale/).

The operation can be performed only when the cluster is running.

## Delete cluster

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

This is a group operation: if necessary, you can delete multiple clusters at once by selecting them using the checkboxes.

To delete a cluster:

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/).
1. Select the project where the necessary cluster is located.
1. Go to **Containers** → **Kubernetes Clusters**.
1. Perform one of the actions for the necessary cluster:
   - Select the cluster using the checkbox, then click **Delete**.
   - Expand the cluster menu and select **Delete Cluster**.
1. In the window that appears:
   1. Select the option if you want to delete the cluster along with its disks.
   1. Click the **Delete cluster** button.

</tabpanel>
</tabs>
