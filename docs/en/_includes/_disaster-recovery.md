{includetag(dr_onboarding_1)}
By using the service, you agree to the license agreements of the [Marketplace](/en/start/legal/offer/private-special-conditions/policy-marketplace) and [Hystax Acura — Disaster Recovery](https://хст.рф/terms-of-use) services.
{/includetag}

{includetag(not_dr_onboarding)}

## Preparatory steps

1. [Register](/en/intro/onboarding/account) in VK Cloud.
{/includetag}

{includetag(dr_onboarding_2)}
1. [Set up](/en/access/iam/instructions/manage-2fa) two-factor authentication (2FA) for the account on whose behalf the restored infrastructure will be deployed.
1. [Create a VM](/en/computing/iaas/instructions/vm/vm-create#iaas-vm-create) for which recovery will be applied. The `Ubuntu-DR` VM running Ubuntu 18.04 will be used as part of the quick start.
1. [Connect](/en/applications-and-services/marketplace/instructions/pr-instance-add) the Hystax Acura — Disaster Recovery service.

   Wait for the installation to complete — an email with a login and password will arrive. The service will be deployed at https://dr.mcs-cloud.ru (the Hystax Acura console).

## {heading({counter(dr)}. Replicate data)[id=replication]}

1. [Sign in](https://dr.mcs-cloud.ru) to the Hystax Acura console using the login and password you received.
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

   After the agent is installed, the `Ubuntu-DR` VM will appear on the main page of the Hystax Acura [console](https://dr.mcs-cloud.ru) with the **Unprotected** status.

1. Expand the `Ubuntu-DR` VM menu in the **Machines Groups** list and select the **Edit Replication schedule** option. In the window that opens, specify the parameters:

   - **Use custom Replication schedule settings**: select the option.
   - **Volume availability zone**: `MS1`.
   - **Volume type**: `CEPH-HDD`.

   {note:info}

   For more information about replication and creating a backup schedule, see the [official Hystax documentation](https://hstx.ru/documentation/disaster-recovery-and-cloud-backup/dr-overview.html#edit-replication-settings-schedule).

   {/note}

1. Click the **Save** button.
1. Expand the `Ubuntu-DR` VM menu and select the **Start Protection** option.
1. Wait for the operation to complete — the VM status will change to **Protected**.

## {heading({counter(dr)}. Create a disaster recovery plan)[id=plan_create]}

1. Click the **Create DR plan** button.
1. In the **Name** field, specify the plan name `DR-plan`.
1. Go to the **Expert** tab and click the **Generate DR plan from all machines** button.

   A JSON file with the `Ubuntu-DR` VM will be generated.

1. Adjust the plan according to the requirements for recovering the VM after failures:

    - In the `subnet_id` parameter, specify the network identifier for the `Ubuntu-DR` VM.
    - In the `flavor` parameter, specify the name of the VM template; check it using the `openstack flavor list` command.

    For a detailed description of the parameters, see the official [Hystax Acura](https://hstx.ru/documentation/live-migration/migration-overview.html#migration-plan-syntax) documentation.

    {cut(Example of a disaster recovery plan)}

    This plan describes two VMs and the subnet in which the migrated VMs will be deployed.

    ```json
    {
      "subnets": {
        "subnet_0": {
          "name": "subnet_0",
          "cidr": "10.0.1.0/24",
          "subnet_id": "2aebd081-44a8-480f-xxxx-yyyyyyyyyyyy"
        }
      },
      "devices": {
        "ubuntu01": {
          "id": "ec09a435-3389-d19f-4cf4-zzzzzzzzzzz",
          "security_groups": [
            "default_all"
          ],
          "availability_zone": "MS1",
          "rank": 0,
          "flavor": "STD3-4-8",
          "ports": [
            {
              "name": "port_0",
              "ip": "10.0.1.23",
              "floating_ip": true,
              "subnet": "subnet_0"
            }
          ]
        },
        "centos01": {
          "id": "a40d5ef3-e244-dab5-9df0-aaaaaaaaaaaa",
          "security_groups": [
            "default_all"
          ],
          "availability_zone": "DP1",
          "rank": 0,
          "flavor": "STD3-4-8",
          "ports": [
            {
              "name": "port_0",
              "ip": "10.0.1.27",
              "floating_ip": true,
              "subnet": "subnet_0"
            }
          ]
        }
      }
    }
    ```

    {/cut}

1. Click the **Save** button.

## {heading({counter(dr)}. Run the plan)[id=plan_start]}

1. Go to the **Recover** section.
1. Select the `DR-plan` plan and click the **Next** button.
1. In the **Cloud Site Name** field, specify the value `VK-Cloud-infra` and click the **Run Recover** button.

   Creation of the backup infrastructure will begin.

   - If the process completes successfully, `VK-Cloud-infra` with the **Active** status will appear in the **Cloud Site** block.
   - If the process completes with errors, restart it:

     1. In the **Cloud Sites** block, click the **Delete** button for the process that completed with an error, and confirm the deletion.
     1. In the **DR plans** block, click the **Edit** button for the `DR-plan` plan.
     1. Make the necessary changes (in basic or expert mode).
     1. Click the **Save** button.
     1. Run the plan again.

## {heading({counter(dr)}. Restore the infrastructure in VK Cloud)[id=infrastructure_restore]}

1. Go to the **Failback** section.
1. At the **Select target cloud type** step, select the **OPENSTACK** option and click the **Next** button.
1. At the **Select target environment** step, select the **New OpenStack** option and specify the parameters:

   - **Cloud name**: `VK Cloud`.
   - **Keystone API endpoint**: the Keystone value from the [list of endpoints](https://msk.cloud.vk.com/app/mcs3723876490/project/endpoints); for VK Cloud — `https://infra.mail.ru:5000/v3/`.
   - **User domain**: the **User Domain Name** value from the [project settings](https://msk.cloud.vk.com/app/project/keys).
   - **Username**: the name of a user with [API access](/en/tools-for-using-services/api/rest-api/enable-api) and a role no lower than Project Administrator.
   - **Password**: the user's password.
   - **Target project domain**: the **Project Domain ID** value from the [project settings](https://msk.cloud.vk.com/app/project/keys).
   - **Target project ID**: the **Project ID** value from the [project settings](https://msk.cloud.vk.com/app/project/keys)
   - **Service Network**: the UUID of the network into which the VM will be deployed.
   - **Floating IP Network**: the `ext-net` external network.

1. Click the **Next** button.
1. At the **Select resource** step, select `VK-Cloud-infra` from the **From Cloud Site** list.
1. Click the **Next** button.
1. At the **Failback settings** step, specify the name of the infrastructure being restored.
1. Click the **Start Failback** button.

   The infrastructure in VK Cloud will be brought to a state matching `VK-Cloud-infra`.

## {heading({counter(dr)}. Check the functionality of the restored VM)[id=vm_check]}

Find the restored VM in VK Cloud (`<PROJECT_PID>_cloud_agent`), [perform](/en/computing/iaas/instructions/vm/vm-manage) arbitrary operations on it.

## Delete unused resources

Running VMs consume computing resources. If you no longer need them:

- [Delete](/en/computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete) the `Ubuntu-DR` VM.
- Delete the `VK-Cloud-infra` backup infrastructure via the Hystax Acura [console](https://dr.mcs-cloud.ru).
- [Delete](/en/networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-delete) the Floating IP address, if one was created during recovery.

{/includetag}
