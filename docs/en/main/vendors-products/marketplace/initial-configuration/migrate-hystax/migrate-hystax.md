You can migrate your resources to VK Cloud using the [Hystax Acura Migration](https://хст.рф/acura-live-cloud-migration-to-vk-cloud/) service without suspending applications. You can transfer resources from both virtual and physical platforms.

<details>
  <summary>Where can I transfer data from?</summary>

**Supported platforms**: VK Cloud, Yandex Cloud, CROC Cloud, SberCloud, Basis.Cloud, OpenStack, VMware, Amazon Web Services, Google Cloud Platform, Microsoft Azure, Oracle Cloud, Alibaba Cloud, Hyper-V, as well as physical machines.

**Supported Applications**: SAP, Microsoft Active Directory, PostgreSQL, Oracle, NGINX, Red Hat Jboss Enterprise, IBM WebSphere, Apache, VMware vSphere, MySQL, MongoDB, Hadoop, Spark.

**Supported operating systems**: Windows, RHEL, CentOS, Debian, Ubuntu, Astra Linux, AltLinux, Red OS.

</details>

This instruction will help you migrate your resources to VK Cloud using the Hystax Acura Migration service using the example of the `Ubuntu-MR` VM with the Ubuntu 18.04 operating system.

By using the Hystax Acura Migration service, you agree to the license agreements of [Marketplace](/ru/additionals/start/legal/marketplace "change-lang") and [Hystax Acura Migration](https://хст.рф/terms-of-use/).

## 1. Preparatory steps

1. [Register](/en/additionals/start/get-started/account-registration#registration_in_the_personal_account) to VK Cloud personal account.
1. [Confirm](/en/additionals/start/get-started/account-registration#account_confirmation) user account.
1. [Configure](/en/base/account/instructions/account-manage/manage-2fa) two-factor authentication (2FA) for the account on whose behalf the restored infrastructure will be deployed.
1. [Create a VM](/en/base/iaas/instructions/vm/vm-create) for which recovery will be applied. As part of the quick start, the `Ubuntu-DR` VM with the Ubuntu 18.04 operating system will be used.
1. [Connect](../../instructions/pr-instance-add/) Hystax Acura Migration service.

   Wait for the installation to complete — a link with a username and password will be sent to your email. The service will be deployed at https://migration.mcs-cloud.ru (Hystax Acura personal account).

## 2. Make data replication

1. Log in to Hystax Acura [personal account](https://migration.mcs-cloud.ru) using the received username and password.
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

   After installing the VM agent, `Ubuntu-DR` will appear on the main page of Hystax Acura [personal account](https://migration.mcs-cloud.ru) with **Discovered** status.

1. Expand the `Ubuntu-DR` VM menu in the **Machines Groups** list and select the **Start Replication** option.
1. Wait for the operation to complete — the VM status will change to **Synced**.

## 3. Create a migration plan

1. Click the **Create Migration plan** button.
1. In the **Name** field, specify the name of the plan `MR-plan`.
1. Go to the **Expert** tab and click **Generate Migration Plan from all machines** button.

   A JSON file with the `Ubuntu-MR` VM will be generated.

1. Adjust the plan according to the requirements for VM recovery after failures:

    - In the `subnet_id` parameter, specify the network ID for the `Ubuntu-DR` VM.
    - In the `flavor` parameter, specify the name of the VM template, specify it using the `openstack flavor list` command.

    Detailed description of the parameters in the official documentation [Hystax Acura](https://hystax.com/documentation/live-migration/migration_overview.html#migration-plan-syntax).

   <details>
    <summary>Example of a single VM migration plan</summary>

    This plan describes one VM and the subnet in which the migrated VM will be deployed.

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
                "flavor": "Standard-4-8-80",
                "ports": [
                    {
                        "name": "port_0",
                        "ip": "10.0.1.23",
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

1. Go to **Migrate**.
1. Select the `MR-plan` plan and click **Next** button.
1. In the **Cloud Site Name** field, specify the value `VK-Cloud-infra` and click **Run migration** button.

   The migration process will begin.

   - If the process completes successfully, `VK-Cloud-infra` will appear in the **Cloud Site** block with **Active** status.
   - If the process ended with errors, restart it:

     1. In the **Cloud Sites** block, click the **Delete** button for the process that failed and confirm the deletion.
     1. In the **Migration plans** block, for the `MR-plan` plan, click the **Edit** button.
     1. Make the necessary changes (in basic or expert mode).
     1. Click the **Save** button.
     1. Restart the plan.

## 5. Check the functionality of the added VM

Find the added VM in VK Cloud (`<project PID>_cloud_agent`), [perform](/en/base/iaas/instructions/vm/vm-manage) arbitrary operations on it.

## Delete unused resources

Running VMs consume computing resources. If you don't need them anymore:

- Delete `Ubuntu-MR` VM, added to Hystax Acura [personal account](https://migration.mcs-cloud.ru).
- Delete (detach) the backup infrastructure `VK-Cloud-infra` via Hystax Acura [personal account](https://migration.mcs-cloud.ru).
- [Delete](/en/networks/vnet/operations/manage-floating-ip#removing_floating_ip_address_from_the_project) floating IP address if it was created during migration.
