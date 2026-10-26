You can migrate your resources to {var(cloud)} using the [Hystax Acura — Migration](https://msk.cloud.vk.com/app/services/marketplace/v2/apps/service/71713459-37ca-45db-9523-1cade3c58912/latest/info) service without stopping application operation. You can migrate resources from both virtual and physical platforms.

{cut(Where can data be migrated from?)}

**Supported platforms**: VK Cloud, Yandex Cloud, CROC Cloud, SberCloud, Basis.Cloud, OpenStack, VMware, Amazon Web Services, Google Cloud Platform, Microsoft Azure, Oracle Cloud, Alibaba Cloud, Hyper-V, as well as physical machines.

**Supported applications**: SAP, Microsoft Active Directory, PostgreSQL, Oracle, NGINX, Red Hat Jboss Enterprise, IBM WebSphere, Apache, VMware vSphere, MySQL, MongoDB, Hadoop, Spark.

{includetag(migrate-hstx)}
**Supported operating systems**: Windows, RHEL, CentOS, Debian, Ubuntu, AstraLinux, AltLinux, RED OS. The full list of OSes and their versions available for migration is provided on the {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=VM creation]} page in your management console.
{/includetag}

{includetag(migrate-hstx-mr)}
**Supported operating systems**: Windows, RHEL, CentOS, Debian, Ubuntu, AstraLinux, AltLinux, RED OS. The full list of OSes and their versions available for migration is provided on the {linkto(../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=VM creation]} page in your management console.
{/includetag}

{/cut}

{cut(Video example of migrating infrastructure from AWS to {var(cloud)})}

{caption()[id=position=above;align=right;id=video_create_vm]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239360&hash=257ea14353b8a426&hd=4)[type=vkvideo]}
{/caption}

{/cut}

As an example, the Hystax Acura — Migration service will be used to migrate the `Ubuntu-MR` VM running Ubuntu 18.04 to {var(cloud)}.

By using this service, you agree to the license agreements of the [Marketplace](/en/start/legal/offer/private-special-conditions/policy-marketplace) and [Hystax Acura — Migration](https://хст.рф/terms-of-use) services.

## {heading(Preparatory steps)[id=includes-migrate-hstx-prepare]}

{includetag(migrate-hstx)}
1. {linkto(../../../../intro/onboarding/account#onboarding-account)[text=Register]} in {var(cloud)}.
1. {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Set up]} two-factor authentication (2FA) for the account on whose behalf the migrated infrastructure will be deployed.
1. {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-add#marketplace-pr-instance-add)[text=Connect]} the Hystax Acura — Migration service.
{/includetag}

{includetag(migrate-hstx-mr)}
1. {linkto(../../../intro/onboarding/account#onboarding-account)[text=Register]} in {var(cloud)}.
1. {linkto(../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Set up]} two-factor authentication (2FA) for the account on whose behalf the migrated infrastructure will be deployed.
1. {linkto(../../../applications-and-services/marketplace/instructions/pr-instance-add#marketplace-pr-instance-add)[text=Connect]} the Hystax Acura — Migration service.
{/includetag}

   Wait for the installation to complete — an email with a login and password will arrive. The service will be deployed at https://migration.mcs-cloud.ru (the Hystax Acura console).

## {heading(1. Replicate data)[id=includes-migrate-hstx-data-replication]}

1. [Sign in](https://migration.mcs-cloud.ru) to the Hystax Acura console using the login and password you received.
1. Click the **Install replication agents** button.
1. At the **Agent selection** step, select **Linux** and click the **Next** button.
1. At the **Agent settings** step, specify the parameters:

   - **Machines group**: `Default`.
   - **Select target Linux distribution**: `Debian/Ubuntu (.deb package)`.
   - **Snapshot driver deployment type**: `DKMS`.

1. Click the **Next** button.
1. Install the agent on the target VM, following the instructions for the Ubuntu distribution.

   {note:info}
   You can install migration agents on a group of VMs with different OSes via Ansible.
   {/note}

   {cut(Ansible manifest for installing agents)}

   ```yaml
   - hosts: all
     vars:
       ansible_ssh_pipelining: true

     tasks:
       - name: Generate URL rpm
         set_fact:
           download_url: "https://{{ acura_host }}/linux_agent/{{ customer_id }}?dist_type=rpm&platform=x64"
           remote_path: /tmp/hlragent.rpm
         when: ansible_os_family == "RedHat"

       - name: Generate URL deb
         set_fact:
           download_url: "https://{{ acura_host }}/linux_agent/{{ customer_id }}?dist_type=deb&platform=x64"
           remote_path: /tmp/hlragent.deb
         when: ansible_os_family == "Debian"

       - name: Download agent
         get_url:
           url: "{{ download_url }}"
           dest: "{{ remote_path }}"
           mode: 0644
           validate_certs: no
           timeout: 300
         become: yes

       - name: Install Linux Replication Agent from rpm package
         yum:
           name: "{{ remote_path }}"
           state: present
         become: yes
         when: ansible_os_family == "RedHat"

       - name: Install Linux Replication Agent from deb package
         apt:
           deb: "{{ remote_path }}"
           state: present
         become: yes
         when: ansible_os_family == "Debian"

       - name: Remove package file
         file:
           path: "{{ remote_path }}"
           state: absent
         become: yes
   ```

   {/cut}

   After the agent is installed, the `Ubuntu-MR` VM will appear on the main page of the Hystax Acura [console](https://migration.mcs-cloud.ru) with the **Discovered** status.

1. Expand the `Ubuntu-MR` VM menu in the **Machines Groups** list and select the **Start Replication** option.
1. Wait for the operation to complete — the VM status will change to **Synced**.

## {heading(2. Create a migration plan)[id=includes-migrate-hstx-migration-plan]}

1. Click the **Create Migration plan** button.
1. In the **Name** field, specify the plan name `MR-plan`.
1. Go to the **Expert** tab and click the **Generate Migration Plan from all machines** button.

   A JSON file with the `Ubuntu-MR` VM migration plan will be generated.

1. Adjust the plan parameters according to the VM migration requirements.

   {cut(Example of a migration plan for a single VM)}

   This plan describes a single VM and the subnet in which the migrated VM will be deployed.

   ```json
   {
     "devices": {
       "<VM_NAME>": {
         "flavor": "STD3-4-8",
         "availability_zone": "MS1",
         "security_groups": [
           "default",
           "ssh"
         ],
         "id": "a0c733a4-7c2c-f4db-7af3-XXXX",
         "custom_image_metadata": {
           "os_type": "linux",
           "os_distro": "ubuntu18.04",
           "os_version": "18.04",
           "os_admin_user": "admin",
           "os_require_quiesce": "yes",
           "hw_qemu_guest_agent": "yes"
         },
         "ports": [
           {
             "name": "port_0",
             "ip": "10.0.2.15",
             "floating_ip": true,
             "subnet": "subnet_0"
           }
         ],
         "rank": 0
       }
     },
     "subnets": {
       "subnet_0": {
         "subnet_id": "41ffb51d-baf4-4b6c-8517-XXXX",
         "cidr": "10.0.2.0/24"
       }
     }
   }
   ```

   Plan parameters:

   - `<VM_NAME>` — the name to be assigned to the virtual machine in {var(cloud)}.
   {includetag(migrate-hstx)}
   - `flavor` — the name or ID of the {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=configuration template]} for the VM. Check the name using the `openstack flavor list` command.
   {/includetag}
   {includetag(migrate-hstx-mr)}
   - `flavor` — the name or ID of the {linkto(../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=configuration template]} for the VM. Check the name using the `openstack flavor list` command.
   {/includetag}
   - `availability_zone` — the name of the [availability zone](/en/start/concepts/architecture#architecture-az) in which the VM will be deployed.
   {includetag(migrate-hstx)}
   - `security_groups` — a list of names or IDs of {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups)[text=security groups]} for `Ubuntu-MR`.
   {/includetag}
   {includetag(migrate-hstx-mr)}
   - `security_groups` — a list of names or IDs of {linkto(../../../networks/vnet/instructions/secgroups#vnet-secgroups)[text=security groups]} for `Ubuntu-MR`.
   {/includetag}
   - `id` — the internal ID of the virtual machine generated by Hystax at the previous step.
   - `custom_image_metadata` — custom metadata for the VM:

     - `os_type` — the type of the guest OS.
     {includetag(migrate-hstx)}
     - `os_distro` — the name of the OS distribution. Check the name by following the instructions in the {linkto(../../../../computing/iaas/instructions/images/image-metadata#iaas-image-metadata-find-param)[text=Filling in os_distro and os_version]} section.
     - `os_version` — the OS version. Check the version by following the instructions in the {linkto(../../../../computing/iaas/instructions/images/image-metadata#iaas-image-metadata-find-param)[text=Filling in os_distro and os_version]} section.
     - `os_admin_user` — the name of the OS user with administrator rights. The password can be set via the {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-password)[text=management console]}.
     {/includetag}
     {includetag(migrate-hstx-mr)}
     - `os_distro` — the name of the OS distribution. Check the name by following the instructions in the {linkto(../../../computing/iaas/instructions/images/image-metadata#iaas-image-metadata-find-param)[text=Filling in os_distro and os_version]} section.
     - `os_version` — the OS version. Check the version by following the instructions in the {linkto(../../../computing/iaas/instructions/images/image-metadata#iaas-image-metadata-find-param)[text=Filling in os_distro and os_version]} section.
     - `os_admin_user` — the name of the OS user with administrator rights. The password can be set via the {linkto(../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-password)[text=management console]}.
     {/includetag}
     - `os_require_quiesce: "yes"` — enables backup support in {var(cloud)}.
     - `hw_qemu_guest_agent: "yes"` — enables QEMU guest agent support.

   - `ports` — a list of the VM's network interfaces.
   - `rank` — a parameter that determines the launch order of virtual machines if there are several in the migration plan.
   - `subnet_id` — the ID of the subnet in which the VM will be deployed.
   - `cidr` — the subnet address in CIDR format.

   {includetag(migrate-hstx)}
   For a detailed description of the parameters, see the official [Hystax Acura](https://hstx.ru/documentation/live-migration/migration-process.html#syntax-of-machine-description) documentation; for a description of custom metadata, see the {linkto(../../../../computing/iaas/instructions/images/image-metadata#iaas-image-metadata)[text=Image metatags]} section.
   {/includetag}
   {includetag(migrate-hstx-mr)}
   For a detailed description of the parameters, see the official [Hystax Acura](https://hstx.ru/documentation/live-migration/migration-process.html#syntax-of-machine-description) documentation; for a description of custom metadata, see the {linkto(../../../computing/iaas/instructions/images/image-metadata#iaas-image-metadata)[text=Image metatags]} section.
   {/includetag}

   {/cut}

1. Click the **Save** button.

## {heading(3. Run the plan)[id=includes-migrate-hstx-launch-plan]}

1. Go to the **Migrate** section.
1. Select the `MR-plan` plan and click the **Next** button.
1. In the **Cloud Site Name** field, specify the value `VK-Cloud-infra` and click the **Run migration** button.

   The migration process will start.

   - If the process completes successfully, `VK-Cloud-infra` with the **Active** status will appear in the **Cloud Site** block.
   - If the process completes with errors, restart it:

     1. In the **Cloud Sites** block, click the **Delete** button for the process that completed with an error, and confirm the deletion.
     1. In the **Migration plans** block, click the **Edit** button for the `MR-plan` plan.
     1. Make the necessary changes (in basic or expert mode).
     1. Click the **Save** button.
     1. Run the plan again.

## {heading(4. Check the functionality of the added VM)[id=includes-migrate-hstx-check]}

{includetag(migrate-hstx)}
Find the added VM in {var(cloud)} (`<PROJECT_PID>_cloud_agent`), {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage)[text=perform]} arbitrary operations on it.
{/includetag}
{includetag(migrate-hstx-mr)}
Find the added VM in {var(cloud)} (`<PROJECT_PID>_cloud_agent`), {linkto(../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage)[text=perform]} arbitrary operations on it.
{/includetag}

## {heading(Delete unused resources)[id=includes-migrate-hstx-delete]}

Running VMs consume computing resources and are [charged](https://cloud.vk.com/docs/en/computing/iaas/tariffication). If you no longer need them:

- Delete the `Ubuntu-MR` VM added to the Hystax Acura [console](https://migration.mcs-cloud.ru).
- Delete (detach) the `VK-Cloud-infra` backup infrastructure via the Hystax Acura [console](https://migration.mcs-cloud.ru).
{includetag(migrate-hstx)}
- {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-delete)[text=Delete]} the Floating IP address, if one was created during migration.
{/includetag}
{includetag(migrate-hstx-mr)}
- {linkto(../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-delete)[text=Delete]} the Floating IP address, if one was created during migration.
{/includetag}
