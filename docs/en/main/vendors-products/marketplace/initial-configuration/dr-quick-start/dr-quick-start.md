You can set up data recovery and IT infrastructure in case of unforeseen circumstances using the service [Hystax Acura Disaster Recovery](https://хст.рф/acura-disaster-recovery-to-vk-cloud/) without suspending applications. Using the service allows you to optimize the indicators:

- Recovery Point Objective (RPO) — the time between the creation of the last backup and the moment of the accident. It can be configured individually for each resource.
- Recovery Time Objective (RTO) — the time between the response to an accident and the restoration of infrastructure. The service allows you to minimize this indicator.

<details>
  <summary>How the service works</summary>

1. Agents are installed on target VMs to synchronize with Hystax Acura.
1. Data replication is performed for synchronized VMs. If necessary, the VM backup schedule is configured.
1. A disaster recovery plan is created: a description of the infrastructure and a set of instructions for recreating a business application in the VK Cloud. It is possible to create several plans. To reduce the RPO value, disaster recovery plans must be kept up to date.
1. A backup infrastructure is created based on the plan.
1. In case of emergency situations, the backup infrastructure takes over the entire load.

</details>

After completing all the steps of a instruction, you will:

1. Deploy the Cloud Disaster Recovery service in VK Cloud.
1. Install the agent on the VM and perform data replication for it.
1. Create a backup infrastructure using a backup recovery plan.
1. Restore the reserved infrastructure in VK Cloud.

By using the Hystax Acura Disaster Recovery service, you agree to the license agreements of [Marketplace](/ru/additionals/start/legal/marketplace "change-lang") and [Hystax Acura Disaster Recovery](https://хст.рф/terms-of-use/).

## 1. Preparatory steps

1. [Register](/en/additionals/start/get-started/account-registration#registration_in_the_personal_account) to VK Cloud personal account.
1. [Confirm](/en/additionals/start/get-started/account-registration#account_confirmation) user account.
1. [Configure](/en/base/account/instructions/account-manage/manage-2fa) two-factor authentication (2FA) for the account on whose behalf the restored infrastructure will be deployed.
1. [Create a VM](/en/base/iaas/instructions/vm/vm-create) for which recovery will be applied. As part of the quick start, the `Ubuntu-DR` VM with the Ubuntu 18.04 operating system will be used.
1. [Connect](../../instructions/pr-instance-add/) Hystax Acura Disaster Recovery service.

   Wait for the installation to complete — a link with a username and password will be sent to your email. The service will be deployed at https://dr.mcs-cloud.ru (Hystax Acura personal account).

## 2. Make data replication

1. Log in to Hystax Acura [personal account](https://dr.mcs-cloud.ru) using the received username and password.
1. Click the **Install replication agents** button.
1. In the “Agent selection” step, select **Linux** and click **Next**.
1. At the “Agent settings” step, specify the parameters:

   - **Machines group**: `Default`.
   - **Select target Linux distribution**: `Debian/Ubuntu (.deb package)`.
   - **Snapshot driver deployment type**: `DKMS`.

1. Click the **Next** button.
1. Install the agent on the target VM, following the instructions for the Ubuntu distribution.

   <info>

   You can install migration agents on a group of VMs with different operating systems via Ansible.

   </info>

   <details>
     <summary>Ansible manifest for installing agents</summary>

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
   
       - name: Install Hystax Linux Replication Agent from rpm package
         yum:
           name: "{{ remote_path }}"
           state: present
         become: yes
         when: ansible_os_family == "RedHat"
   
       - name: Install Hystax Linux Replication Agent from deb package
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

   </details>

   After installing the VM agent, `Ubuntu-DR` will appear on the main page of Hystax Acura [personal account](https://dr.mcs-cloud.ru) with **Unprotected** status.

1. Expand the `Ubuntu-DR` VM menu in the **Machines Groups** list and select the **Edit Replication settings** option. In the window that opens, specify the parameters:

   - **Use custom Replication schedule settings**: select an option.
   - **Volume availability zone**: `MS1`.
   - **Volume type**: `HDD`.

   <info>

   For more information about replication and creating a backup schedule, see [Hystax official documentation](https://hystax.com/documentation/dr/dr_overview.html#edit-replication-settings-schedule).

   </info>

1. Click the **Save** button.
1. Open the `Ubuntu-DR` VM menu and select the **Start Protection** option.
1. Wait for the operation to complete — the VM status will change to **Protected**.

## 3. Create a disaster recovery plan

1. Click the **Create DR plan** button.
1. In the **Name** field, specify the name of the plan `DR-plan`.
1. Go to the **Expert** tab and click **Generate DR plan from all machines** button.

   A JSON file with the `Ubuntu-DR` VM will be generated.

1. Adjust the plan according to the requirements for VM recovery after failures:

    - In the `subnet_id` parameter, specify the network ID for the `Ubuntu-DR` VM.
    - In the `flavor` parameter, specify the name of the VM template, specify it using the `openstack flavor list` command.

    Detailed description of the parameters in the official documentation [Hystax Acura](https://hystax.com/documentation/live-migration/migration_overview.html#migration-plan-syntax).

    <details>
    <summary>Example of a disaster recovery plan</summary>

    This plan describes two VMs and the subnet in which the migrated VMs will be deployed.

    ```JSON
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
          "flavor": "Standard-4-8-80",
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
          "flavor": "Standard-4-8-80",
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

    </details>

1. Click the **Save** button.

## 4. Run the plan

1. Go to **Recover**.
1. Select the `DR-plan` plan and click **Next** button.
1. In the **Cloud Site Name** field, specify the value `VK-Cloud-infra` and click **Run Recover** button.

   The creation of a backup infrastructure will begin.

   - If the process completes successfully, `VK-Cloud-infra` will appear in the **Cloud Site** block with **Active** status.
   - If the process ended with errors, restart it:

     1. In the **Cloud Sites** block, click the **Delete** button for the process that failed and confirm the deletion.
     1. In the **DR plans** block, for the `DR-plan` plan, click the **Edit** button.
     1. Make the necessary changes (in basic or expert mode).
     1. Click the **Save** button.
     1. Restart the plan.

</info>

## 5. Restore infrastructure in VK Cloud

1. Go to **Failback**.
1. In the “Select target cloud type” step, select the **OPENSTACK** option and click **Next** button.
1. At the “Select target environment” step, select the **New OpenStack** option and specify the parameters:

   - **Cloud name**: `VK Cloud`.
   - **Keystone API endpoint**: Keystone value from [endpoints list](https://mcs.mail.ru/app/mcs3723876490/project/endpoints), `https://infra.mail.ru:35357/v3/` for VK Cloud.
   - **User domain**: value **User Domain Name** of [project settings](https://mcs.mail.ru/app/project/keys).
   - **Username**: user name with [API access](/en/manage/tools-for-using-services/rest-api/enable-api) and a role not lower than the Project administrator.
   - **Password**: the user's password.
   - **Target project domain**: value **Project Domain ID** of [project settings](https://mcs.mail.ru/app/project/keys).
   - **Target project ID**: value **Project ID** of [project settings](https://mcs.mail.ru/app/project/keys)
   - **Hystax Service Network**: The UUID of the network to which the VM will be deployed.
   - **Floating IP Network**: external network `ext-net`.

1. Click the **Next** button.
1. At the “Select resource” step, select `VK-Cloud-infra` from the list **From Cloud Site**.
1. Click the **Next** button.
1. At the “Failback settings” step, specify the name of the structure being restored.
1. Click the **Start Failback** button.

   The infrastructure in VK Cloud will be brought to the state corresponding to 'VK-Cloud-infra'.

## 6. Check the functionality of the restored VM

Find the restored VM in VK Cloud (`<project ID>_cloud_agent`), [perform](/en/base/iaas/instructions/vm/vm-manage) arbitrary operations on it.

## Delete unused resources

Running VMs consume computing resources. If you don't need them anymore:

- [Delete](/en/base/iaas/instructions/vm/vm-manage#deleting_a_vm) `Ubuntu-DR` VM.
- Delete the backup infrastructure `VK-Cloud-infra` via Hystax Acura [personal account](https://dr.mcs-cloud.ru).
- [Delete](/en/networks/vnet/operations/manage-floating-ip#removing_floating_ip_address_from_the_project) floating IP address if it was created during recovery.
