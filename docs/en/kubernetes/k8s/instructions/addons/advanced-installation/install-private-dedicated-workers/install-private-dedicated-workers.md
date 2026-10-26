# {heading(Installing the add-on on a dedicated node group)[id=k8s-install-private-dedicated-workers]}

{include(/en/_includes/_translated_by_ai_en.md)}

1. {linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]} the {var(cloud)} management console.
1. Go to the **Kubernetes Clusters** → **Kubernetes Clusters** section.
1. Make sure the cluster has a dedicated node group where the add-ons will be placed. If there is no such group, {linkto(../../../manage-node-group#k8s-manage-node-group-add-group)[text=add it]}.
1. For this node group, if not already done, set:

   * A label: key `addonNodes`, value `dedicated`.
   * A taint: effect `NoSchedule`, key `addonNodes`, value `dedicated`.

1. Select the required add-on for the cluster and specify the installation parameters. In the add-on code, set the following exceptions for the `tolerations` fields and node selectors for the `nodeSelector` fields:

   ```console
   tolerations:
     - key: "addonNodes"
       operator: "Equal"
       value: "dedicated"
       effect: "NoSchedule"

   nodeSelector:
     addonNodes: dedicated
   ```

1. Click **Install add-on**. The add-on installation may take a long time.