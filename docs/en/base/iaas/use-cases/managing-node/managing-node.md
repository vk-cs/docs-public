The distribution of server groups of a single service or application on a cluster depends on the tasks being solved:

- If the service has several groups of servers (VMs, DB instances) with the same role, for example, several application servers, distribute them across different physical servers to increase fault tolerance.
- If there are groups of servers with different roles in the service for which communication latency is critical (for example, an application server and a database server), place them on the same computing node so that traffic passes within the same physical server.

VK Cloud supports [four server group allocation policies](../../concepts/vm-concept#server_group), for `soft` policies, support for the `compute-api` version above 2.15 is required.

<warn>

Valid operations for server groups:

- create new servers in the group;
- delete existing servers in the group.

Invalid operations for server groups:

- add an existing server to the group;
- delete a group of servers without deleting all its servers.

</warn>

To define the rules for distributing server groups, specify the group in the instance properties:

1. Output a list of server groups using the command:

    ```bash
    openstack server group list
    ```

1. Find a group of servers with a policy like `affinity` or `anti-affinity`. If no server groups are found, create one using the command:

    ```bash
    ​openstack server group create <name of the server group> --policy <policy name>
    ```

1. Create bootable disks for future VMs. Example for three disks:

   ```bash
   for i in 1 2 3;do openstack volume create --size 10 --image 98af6254-XXXX-XXXX-XXXX-81858ce9302a --availability-zone MS1 --bootable root-volume-$i;done
   ```

1. Create the necessary virtual machines specifying the server group. Example for three VMs:

    ```bash
    for i in 1 2 3;do openstack --insecure server create --flavor Basic-1-1 --volume root-volume-$i --hint group=<politic group ID> --nic net-id=<network ID> vm-affinity-$i;done
    ```

1. Wait for the VM creation to finish. Make sure that the deployed VMs have been successfully created and are in the status `ACTIVE`.

<info>

If no compute nodes are found that meet the constraints, resource creation requests will fail.

</info>
