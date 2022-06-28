The migration plan should be adjusted to suit your deployment requirements for the hosts being migrated to the target project. An example of a migration plan for two hosts:

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

This plan describes two hosts, and the subnet where these hosts will be deployed.

There are two objects at the top level of the document:

- subnets – contains a description of the subnets of the target project to which the migrating hosts will be connected.
- devices - contains a description of the hosts that will be deployed in the target project. You can specify the desired flavor type, host security groups, hosting data center, launch order, and also redefine the subnet and ip address of the migrating host.

A detailed description of these and other migration plan options can be found in the [official documentation](https://docs.hystax.com/live-migration/migration_overview.html#migration-plan-syntax) by Hystax Acura.
