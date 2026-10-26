# {heading(Managing security policies)[id=mk8s-manage-security]}

{include(/en/_includes/_translated_by_ai_en.md)}

In the Managed Containers service, you can manage {linkto(../../concepts/security-policies#mk8s-security-policies)[text=security policies]} of Kubernetes clusters via the {var(cloud)} management console. This serves as an alternative to working directly with the {linkto(../../reference/gatekeeper#mk8s-gatekeeper)[text=Gatekeeper]} resources corresponding to the policies, for example, using `kubectl`.

## {heading(Viewing security policies)[id=mk8s-manage-security-view-policies]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired cluster is located.
1. Go to the **Kubernetes Clusters → Kubernetes Clusters** section.
1. Click the name of the desired cluster.
1. Go to the **Cluster Security** tab.

For the policies listed on this tab, the following information is provided:

- The policy status ({linkto(#mk8s-manage-security-turn-on-off)[text=enabled or disabled]}) next to its name.
- The namespace within which the policy applies (either all namespaces or a specific namespace).
- The values of the {linkto(../../concepts/security-policies#mk8s-security-policies-available-policies)[text=policy settings]}.

A cluster may contain several identical policies with different settings for different namespaces.

## {heading(Adding a security policy)[id=mk8s-manage-security-add-policy]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired cluster is located.
1. Go to the **Kubernetes Clusters → Kubernetes Clusters** section.
1. Click the name of the desired cluster.
1. Go to the **Cluster Security** tab.
1. Click the **Add security policy** button.
1. Select the {linkto(../../concepts/security-policies#mk8s-security-policies-available-policies)[text=security policy]} from the drop-down list.
1. Select the namespace within which the selected policy will be applied from the drop-down list.

   The policy configuration in the cluster affects which namespaces can be selected when modifying a policy:

   - If the policy is the only one in the cluster and there are no other similar policies, you can select all namespaces instead of a specific namespace, and vice versa.
   - If at least one similar policy for specific namespaces has already been added to the cluster, selecting all namespaces is not possible.

1. Configure the policy settings.
1. Click the **Add security policy** button.

   Cluster reconfiguration will begin. The process may take some time.

   The added policy will be automatically enabled and will take effect. If necessary, the policy can be {linkto(#mk8s-manage-security-turn-on-off)[text=disabled]} after its creation.

## {heading(Enabling and disabling a security policy)[id=mk8s-manage-security-turn-on-off]}

This is a group operation: if necessary, you can enable or disable multiple policies at once by selecting them using checkboxes.

You can control the operation of individual policies in the cluster by enabling and disabling them:

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired cluster is located.
1. Go to the **Kubernetes Clusters → Kubernetes Clusters** section.
1. Click the name of the desired cluster.
1. Go to the **Cluster Security** tab.
1. Perform one of the following actions for the desired policy:

   - Select the policy using a checkbox, then click the **Enable** or **Disable** button.
   - Click ![](../../../../assets/more-icon.svg "inline") for the security policy and select **Enable** or **Disable**.

   Cluster reconfiguration will begin. The process may take some time.

## {heading(Editing a security policy)[id=mk8s-manage-security-edit-policy]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired cluster is located.
1. Go to the **Kubernetes Clusters → Kubernetes Clusters** section.
1. Click the name of the desired cluster.
1. Go to the **Cluster Security** tab.
1. Click ![](../../../../assets/more-icon.svg "inline") for the desired policy and select **Edit**.
1. If necessary, select a different namespace from the drop-down list.

   The policy configuration in the cluster affects which namespaces can be selected when modifying a policy:

   - If the policy is the only one in the cluster and there are no other similar policies, you can select all namespaces instead of a specific namespace, and vice versa.
   - If at least one similar policy for specific namespaces has already been added to the cluster, selecting all namespaces is not possible.

1. If necessary, change the {linkto(../../concepts/security-policies#mk8s-security-policies-available-policies)[text=policy settings]}.
1. Click the **Save** button.

   Cluster reconfiguration will begin. The process may take some time.

## {heading(Deleting a security policy)[id=mk8s-manage-security-delete-policy]}

This is a group operation: if necessary, you can delete multiple policies at once by selecting them using checkboxes.

To delete a policy:

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired cluster is located.
1. Go to the **Kubernetes Clusters → Kubernetes Clusters** section.
1. Click the name of the desired cluster.
1. Go to the **Cluster Security** tab.
1. Perform one of the following actions for the desired policy:

   - Select the policy using a checkbox, then click the **Delete** button.
   - Click ![](../../../../assets/more-icon.svg "inline") for the policy and select **Delete**.

1. Click the **Confirm** button.