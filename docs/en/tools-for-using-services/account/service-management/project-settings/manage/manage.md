## Getting project ID

{include(/en/_includes/_project_pid_common.md)}

To get the PID:

<tabs>
<tablist>
<tab>VK Cloud Management Console</tab>
<tab>VK Cloud Account</tab>
</tablist>
<tabpanel>
{include(/en/_includes/_project_pid_tab_lk.md)}
</tabpanel>
<tabpanel>
{include(/en/_includes/_project_pid_tab_account.md)}
</tabpanel>
</tabs>

## Changing project name

The project name can be changed at any stage of the project life.

<tabs>
<tablist>
<tab>VK Cloud Management Console</tab>
<tab>VK Cloud Account</tab>
</tablist>
<tabpanel>
{include(/en/_includes/_project_rename_tab_lk.md)}
</tabpanel>
<tabpanel>
{include(/en/_includes/_project_rename_tab_account.md)}
</tabpanel>
</tabs>

{include(/en/_includes/_project_rename_common.md)}

## Changing project owner

A project can have only one owner. After appointing another user as the owner, you will switch with him [roles](../../../concepts/rolesandpermissions).

<info>

A change of ownership is possible in any state of the project balance.

</info>

1. Follow the preparatory steps:

    1. If necessary, untie the payment card from the project by contacting [technical support](mailto:support@mcs.mail.ru).

    1. Make sure that the user you want to make the owner:

        - Added to the [list of members](../access-manage) and accepted the invitation to the project.

            In this case, it is displayed in the list with the activation status **Yes**.

        - (Optional) Has the role of superadministrator, project administrator or user administrator (IAM) in the project.

            This will allow you to control the change of roles after you cease to be the owner.

        - Agree to accept the project.

            The transfer of the project is possible only with the consent of the new owner.

1. Contact [technical support](mailto:support@mcs.mail.ru) on behalf of the current owner, provide the following information:

    - [project](#getting_project_id) id (PID);
    - the new owner's email address.

1. (Optional) Check the role change in the [list of project members](../access-manage).

<info>

The new owner may need to [link a payment card](/en/intro/billing/service-management/add-card#bind_the_card), if the project does not have a linked card, and [confirm phone number](/en/intro/start/account-registration).

</info>

## Project conservation

If you want to suspend work on a project, mothball the project to stop debiting funds. If the project goes into negative territory, it will be [frozen](../../../concepts/projects#automatic_freezing_of_the_project) with subsequent deletion of objects and data.

To preserve the project:

1. Determine which data from the project you want to save:

    1. Click on the user name in the header of the management console page, select **Balance and payments**.
    1. Expand the menu of each service to see the objects in which data is stored and their size.

1. Stop all the VMs that you want to save data from.
1. Transfer or copy all the necessary data.

    For example, [create](/en/computing/iaas/service-management/images/images-manage#creating_an_image) and [export](/en/computing/iaas/service-management/images/images-manage#exporting_an_image) disk images of the virtual machines stopped in the previous step.

1. Delete all objects that are charged or occupy disk space — floating IP addresses, disks, buckets, load balancers, and others.

    The full list of such objects is also on the page **Balance and payments**.

    Since the boot disks of virtual machines cannot be deleted separately, [delete](/en/computing/iaas/service-management/vm/vm-manage#delete_vm) VMs.

    Objects that do not consume resources — for example, networks and subnets — can be left in the project.

You will be able to reactivate the project after any period of time by uploading the saved data to it and restoring the infrastructure.

## Transferring objects between projects

You can [transfer disks](/en/computing/iaas/service-management/volumes#transfer_disks_between_projects) between projects. This allows you to transfer virtual machines between projects.

Disk transfer is possible only within one region. If the projects are located in different regions, [upload](/en/computing/iaas/service-management/images/images-manage#exporting_an_image) locally the disk image and [download](/en/computing/iaas/service-management/images/images-manage#importing_an_image) it to the new project.

Currently, transferring PaaS service objects between projects is not supported. For example, the virtual machine on which the database was deployed can be moved to another project only as a regular virtual machine. It is not possible to transfer such a virtual machine as a database instance or create a database instance with a disk transferred from another project.

By contacting [technical support](mailto:support@mcs.mail.ru), it is possible to transfer objects:

- floating IP addresses;
- addresses of the [external networks](/en/networks/vnet/concepts/net-types#external_network).

## Viewing project quotas

<tabs>
<tablist>
<tab>Management console</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

Quotas for the most frequently used resources are displayed on the main page of the [management console](https://msk.cloud.vk.com/app/en).

To see a more complete list of quotas and find out detailed information about each quota from the list:

1. Click on the user name in the header of the management console page, select from the drop-down list **Quotas management**. The quotas page opens.

    The same page is available if you select **Project settings** and go to the **Quotas** tab.

1. Click on the icon![Information](assets/i-icon.svg "inline") to the right of the required quota. Information will be displayed about which objects and in which services the quota is spent.

An extended list of quotas for the project can be obtained through the OpenStack CLI. Information about all quotas and the possibilities of increasing them in the section [Quotas and limits](../../../concepts/quotasandlimits).

</tabpanel>
<tabpanel>

To get an extended list of quotas for a project:

1. Make sure that OpenStack client [is installed](/en/tools-for-using-services/cli/openstack-cli#1_install_the_openstack_client) and [authenticate](/en/tools-for-using-services/cli/openstack-cli#3_complete_authentication) to the project.
1. Run the command:

    ```bash
    openstack quota show
    ```

    <details><summary>Example of command output for the Moscow region</summary>

    ```bash
    +----------------------------+--------------------------------------------------+
    | Field                      | Value                                            |
    +----------------------------+--------------------------------------------------+
    | backup-gigabytes           | -1                                               |
    | backups                    | 400                                              |
    | cores                      | 9                                                |
    | fixed-ips                  | -1                                               |
    | floating-ips               | 6                                                |
    | gigabytes                  | 200                                              |
    | gigabytes_ceph             | -1                                               |
    | gigabytes_ceph-hdd         | -1                                               |
    | gigabytes_ceph-ssd         | -1                                               |
    | gigabytes_dev-ceph         | -1                                               |
    | gigabytes_dp1              | -1                                               |
    | gigabytes_dp1-high-iops    | 200                                              |
    | gigabytes_dp1-local-ssd    | -1                                               |
    | gigabytes_dp1-ssd          | -1                                               |
    | gigabytes_ef-nvme          | -1                                               |
    | gigabytes_high-iops        | 200                                              |
    | gigabytes_ko1-high-iops    | 200                                              |
    | gigabytes_ko1-local-ssd    | -1                                               |
    | gigabytes_ko1-local-ssd-g2 | -1                                               |
    | gigabytes_ko1-ssd          | -1                                               |
    | gigabytes_local-ssd        | -1                                               |
    | gigabytes_manila           | -1                                               |
    | gigabytes_ms1              | -1                                               |
    | gigabytes_octavia-hdd      | -1                                               |
    | gigabytes_octavia-ssd      | -1                                               |
    | gigabytes_perf-test        | -1                                               |
    | gigabytes_ssd              | -1                                               |
    | health_monitors            | -1                                               |
    | injected-file-size         | 10240                                            |
    | injected-files             | 5                                                |
    | injected-path-size         | 255                                              |
    | instances                  | 6                                                |
    | key-pairs                  | 100                                              |
    | l7_policies                | -1                                               |
    | listeners                  | -1                                               |
    | load_balancers             | 12                                               |
    | location                   | ...                                              |
    | networks                   | 10                                               |
    | per-volume-gigabytes       | -1                                               |
    | pools                      | 30                                               |
    | ports                      | 120                                              |
    | project                    | b5b7ffd4ef0547e5b222f44555dfXXXX                 |
    | project_name               | mcsXXXXXXXXXX                                    |
    | properties                 | 128                                              |
    | ram                        | 10240                                            |
    | rbac_policies              | 10                                               |
    | routers                    | 12                                               |
    | secgroup-rules             | 200                                              |
    | secgroups                  | 12                                               |
    | server-group-members       | 100                                              |
    | server-groups              | 50                                               |
    | snapshots                  | 200                                              |
    | snapshots_ceph             | -1                                               |
    | snapshots_ceph-hdd         | -1                                               |
    | snapshots_ceph-ssd         | -1                                               |
    | snapshots_dev-ceph         | -1                                               |
    | snapshots_dp1              | -1                                               |
    | snapshots_dp1-high-iops    | -1                                               |
    | snapshots_dp1-local-ssd    | -1                                               |
    | snapshots_dp1-ssd          | -1                                               |
    | snapshots_ef-nvme          | -1                                               |
    | snapshots_high-iops        | -1                                               |
    | snapshots_ko1-high-iops    | -1                                               |
    | snapshots_ko1-local-ssd    | -1                                               |
    | snapshots_ko1-local-ssd-g2 | -1                                               |
    | snapshots_ko1-ssd          | -1                                               |
    | snapshots_local-ssd        | -1                                               |
    | snapshots_manila           | -1                                               |
    | snapshots_ms1              | -1                                               |
    | snapshots_octavia-hdd      | -1                                               |
    | snapshots_octavia-ssd      | -1                                               |
    | snapshots_perf-test        | -1                                               |
    | snapshots_ssd              | -1                                               |
    | subnet_pools               | -1                                               |
    | subnets                    | 10                                               |
    | volumes                    | 10                                               |
    | volumes_ceph               | -1                                               |
    | volumes_ceph-hdd           | -1                                               |
    | volumes_ceph-ssd           | -1                                               |
    | volumes_dev-ceph           | -1                                               |
    | volumes_dp1                | -1                                               |
    | volumes_dp1-high-iops      | 10                                               |
    | volumes_dp1-local-ssd      | -1                                               |
    | volumes_dp1-ssd            | -1                                               |
    | volumes_ef-nvme            | -1                                               |
    | volumes_high-iops          | 10                                               |
    | volumes_ko1-high-iops      | 10                                               |
    | volumes_ko1-local-ssd      | -1                                               |
    | volumes_ko1-local-ssd-g2   | -1                                               |
    | volumes_ko1-ssd            | -1                                               |
    | volumes_local-ssd          | -1                                               |
    | volumes_manila             | -1                                               |
    | volumes_ms1                | -1                                               |
    | volumes_octavia-hdd        | -1                                               |
    | volumes_octavia-ssd        | -1                                               |
    | volumes_perf-test          | -1                                               |
    | volumes_ssd                | -1                                               |
    +----------------------------+--------------------------------------------------+
    ```
    </details>

    The value `-1` for the quota means “unlimited”. To find out which resources the quotas from the list correspond to, read the section [Quotas and limits](../../../concepts/quotasandlimits).

    You can output quotas separately for components `nova` and `cinder`:

    <tabs>
    <tablist>
    <tab>nova</tab>
    <tab>cinder</tab>
    </tablist>
    <tabpanel>

    ```bash
    nova quota-show
    ```

    </tabpanel>
    <tabpanel>

    ```bash
    cinder quota-show <project_id>
    ```

    </tabpanel>
    </tabs>

    To view quotas for other OpenStack components, [install](/en/tools-for-using-services/cli/openstack-cli#2_optional_install_additional_packages) appropriate OpenStack client packages (`manila`, `neutron` and others) and use a package-specific command. To find out the syntax of the command, install the appropriate package and run `<component> help quota-show`, for example, `manila help quota-show`.

</tabpanel>
</tabs>

## Increasing project quotas

If the project lacks [quotas](../../../concepts/quotasandlimits), contact [technical support](mailto:support@mcs.mail.ru) on behalf of the project owner and provide the information:

- [project id](#getting-the-project-id) (PID) and [region](../../../concepts/regions);
- which quotas need to be increased (for example, the number of CPUs, the available amount of RAM) and by how much.

<info>

Information about increasing quotas for GeekBrains program participants you can find in [FAQ](../../../faq).

</info>

## {heading(Viewing project SDN)[id=sdn_view]}

1. [Go to](https://cloud.vk.com/app/en) your personal VK Cloud account.
1. Open the project settings with one of the following ways:

    - Click the project name in the header of the management console page. Click ![more-icon](/en/assets/more-icon.svg "inline") for the project you need and select **Project settings**.

    - Click the user name in the header of the management console page and select **Project settings**.

1. Go to the **Virtual networks** tab.

There are the default and additional [SDN](/en/networks/vnet/concepts/architecture#sdns_used) of the project, if it is connected. To change the SDN type, contact [technical support](mailto:support@mcs.mail.ru).

## Deleting a project

Deleting a project is also possible with a negative balance.

To delete a project:

1. Make sure that you have transferred all the necessary data from the project.
1. Contact [technical support](mailto:support@mcs.mail.ru) on behalf of the project owner, provide in the request the [project ID](#getting-the-project-id) (PID) and [region](../../../concepts/regions) of the project being deleted.

1. (For legal entities) Specify for what period you need [closing documents](/en/intro/billing/concepts/report).

    You will be contacted to confirm the deletion.

<err>

After confirmation, the project and its data are permanently deleted.

</err>
