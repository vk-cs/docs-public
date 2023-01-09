A disaster recovery plan is a description of the infrastructure and a set of necessary instructions used to recreate a business application on the target VK Cloud cloud in the event of a disaster. A disaster recovery plan is created in advance based on a declarative description of the infrastructure, tested and kept up to date through periodic updates and replications. Disaster recovery plans should always be kept up to date, as additional time may be required to update the plan after a disaster.

## Installing the DR Agent

The first step is to install the disaster recovery agent. On the main screen of the Hystax Acura user account and proceed to install the agent. You will be asked questions about the operating system of the replicated host, and in the last step you will receive a link to download the agent and installation instructions. After successfully installing and running the DR Agent, it will connect to the Hystax Acura installation.

On the Customer page, this host will appear in the Machine Groups section. The "Discovered" status indicates that this host has been discovered, but replication has not yet taken place.

Now you can start host replication. To do this, click on "..." and select "Start Replication" in the drop-down menu. The disaster recovery process can take a long time, depending on the amount of data on the disk and network bandwidth. Upon successful completion of the replication process, the status of the replicated host is marked as "Synced".

Once the host data has been replicated, the hosts themselves can be migrated to the target cloud. To do this, you need to create a disaster recovery plan that specifies which hosts will be migrated.

## Create a disaster recovery plan

Now you can configure your disaster recovery options. To do this, click "..." and select "Edit Replication settings" in the drop-down menu. A window will appear in which you can specify the disaster recovery schedule and parameters such as *Volume Type* and *Volume availability zone*. Specify *Volume type* "GZ1" and click "Save".

To create a disaster recovery plan, click "Add DR plan". Go to the "Expert" tab and click on "Generate DR plan from all machines". A disaster recovery plan will be generated in the form of a JSON document containing a description of all hosts added to the personal account with the default parameter value. In the generated plan, you need to replace *flavor: m1.medium* with one of the available flavors:

- flavor: "Standard-4-8-80";
- flavor: "Advanced-8-16-120" (you need to make a request to technical support to add this flavor).

The disaster recovery plan should be adjusted to suit your deployment requirements for hosts migrating to the target project.

<details>
<summary>Example of a disaster recovery plan</summary>

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
    centos01: {
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

This plan describes two hosts, and the subnet where these hosts will be deployed.

There are two objects at the top level of the document:

- subnets – contains description of target project subnets to which migrating hosts will be connected.
- devices - contains a description of the hosts that will be deployed in the target project. You can specify the desired flavor type, host security groups, host data center, start order, and override the subnet and ip address of the migrating host.

An extended description of these and other disaster recovery plan options can be found in [official documentation](https://docs.hystax.com/live-migration/migration_overview.html#migration-plan-syntax) of Hystax Acura.

Next, specify the name of the disaster recovery plan and click the "Save" button.

After completing the creation and configuration of the disaster recovery plan, proceed to the [disaster recovery launch](/docs/en/additionals/hystax/disaster-recovery/launch) of the protected infrastructure.
