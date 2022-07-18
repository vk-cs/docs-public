Before migrating your infrastructure to VK Cloud Solutions, you must:

- download and install the migration agent;
- configure the Migration plan, which specifies which hosts will be migrated.

## Install the migration agent

The first step is to install the migration agent on the machine that will be migrated later. There are migration agents for both Windows and Linux.

On the main screen of the Hystax Acura user account and proceed to install the agent. You will be asked questions about the operating system of the replicated host, and in the last step you will receive a link to download the agent and installation instructions. Once the Migration Agent is successfully installed and launched, it will connect to the Hystax Acura installation.

On the Customer page, this host will appear in the Machine Groups section. The "Discovered" status indicates that this host has been discovered, but replication has not yet taken place.

Now you can start host replication. To do this, click on "..." and select "Start Replication" in the drop-down menu. The migration process can take a long time, depending on the amount of data on disk and network bandwidth. Upon successful completion of the replication process, the status of the replicated host is marked as "Synced".

Once the host data has been replicated, the hosts themselves can be migrated to the target cloud. To do this, you need to create a migration plan (Migration plan), which will indicate which hosts will be migrated.

## Set up a migration plan

Now you can configure the migration options. To do this, click "..." and select "Edit Replication settings" in the drop-down menu. A window will appear in which you can specify the migration schedule and parameters such as *Volume Type* and *Volume availability zone*. Specify *Volume type* "dp1-ssd" and click "Save".

To create a migration plan, click "Add Migration plan". Go to the "Expert" tab and click on "Generate Migration plan from all machines". A migration plan will be generated in the form of a JSON document containing a description of all hosts added to the personal account with the default parameter value.

The migration plan should be adjusted to suit your deployment requirements for hosts migrating to the target project. An example of a migration plan for two hosts:

```JSON
{
  subnets: {
    "subnet_0": {
      "name": "subnet_0",
      "cidr": "10.0.1.0/24",
      "subnet_id": "2aebd081-44a8-480f-xxxx-yyyyyyyyyyyy"
    }
  },
  "devices": {
    "ubuntu01": {
      "id": "ec09a435-3389-d19f-4cf4-zzzzzzzzzz",
      "security_groups": [
        "default_all"
      ],
      "availability_zone": "MS1",
      "rank": 0
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
    centos01: {
      "id": "a40d5ef3-e244-dab5-9df0-aaaaaaaaaaaa",
      "security_groups": [
        "default_all"
      ],
      "availability_zone": "DP1",
      "rank": 0
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

This plan describes two hosts, and the subnet where these hosts will be deployed.

There are two objects at the top level of the document:

- subnets – contains description of target project subnets to which migrating hosts will be connected.
- devices - contains a description of the hosts that will be deployed in the target project. You can specify the desired flavor type, host security groups, host data center, start order, and also redefine the subnet and ip address of the migrating host.

A detailed description of these and other migration plan options can be found in [official documentation](https://docs.hystax.com/live-migration/migration_overview.html#migration-plan-syntax) of Hystax Acura.

Next, specify the name of the migration plan and click the "Save" button.

After completing the creation and configuration of the migration plan, proceed to [start migration](/docs/en/additionals/hystax/migration/launch) of the protected infrastructure.
