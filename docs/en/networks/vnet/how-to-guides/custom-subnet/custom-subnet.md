# {heading(Creating a subnet with custom parameters)[id=vnet-custom-subnet]}

{include(/en/_includes/_translated_by_ai_en.md)}

By default, all {var(cloud)} subnets are created with DNS, DHCP, a gateway, and a `/24` mask enabled. Not all subnet parameters can be configured via the management console interface. For example, via the management console you cannot set a `/30` mask or disable the subnet gateway.

This article provides an example of how to create a subnet with a `/30` mask and a disabled gateway using an API request. All commands are provided for Linux-based operating systems.

## {heading(Preparation steps)[id=vnet-custom-subnet-prep]}

1. {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=Activate API access]}, if you have not done so yet.
1. Make sure that the OpenStack client is {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]}, and {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Make sure that the curl and jq packages are installed on your computer.
1. Select or {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=create]} a network in your {var(cloud)} project. A subnet with custom parameters will be created in this network. Write down the UUID of this network. In this example, the network UUID is `b2b8468e-aaaa-bbbb-cccc-327c8c2670d4`.

## {heading(1. Add environment variables)[id=vnet-custom-subnet-add-environment-vars]}

Add the following environment variables to your computer:

```console

# Obtaining a token via OpenStack CLI
OS_TOKEN=$(openstack token issue -c id -f value)

# Authentication
H_AUTH="X-Auth-Token: $OS_TOKEN"
H_JSON="Content-Type: application/json"
H_SDN="X-SDN: SPRUT"

# What will be configured
N_NAME="my_subnet"
N_ID="b2b8468e-aaaa-bbbb-cccc-327c8c2670d4"
N_CIDR="192.168.0.0/30"

# URL for executing the request
OS_NET_URL=https://infra.mail.ru:9696/v2.0
```

Here:

- `OS_TOKEN` — the token for executing API requests.
- `N_NAME` — the name of the subnet to be added.
- `N_ID` — the UUID of the network to which the subnet will be added.
- `N_CIDR` — the address space that will be assigned to the subnet.
- `OS_NET_URL` — the endpoint for executing the API request.

## {heading(2. Create the subnet)[id=vnet-custom-subnet-add-subnet]}

In the terminal, execute the API request to create the subnet:

```console
curl -X POST ${OS_NET_URL}/subnets \
    -H "$H_AUTH" \
    -H "$H_SDN" \
    -H "$H_JSON" \
    -d '{"subnet": {"name": "'$N_NAME'", \
                "cidr": "'$N_CIDR'", \
                "ip_version": 4, \
                "network_id": "'$N_ID'", \
                "gateway_ip": null, \
                "enable_dhcp": false, \
                "enable_private_dns": false}}' | jq
```

Here:

- `"gateway_ip": null` — this parameter creates a subnet without a gateway.
- `"enable_dhcp": false` — this parameter disables DHCP.
- `"enable_private_dns": false` — this parameter disables DNS.

## {heading(3. Verify the subnet creation)[id=vnet-custom-subnet-check]}

Verify that the subnet has been created:

1. [Go to](https://cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project.
1. Go to the **Virtual Networks** → **Networks** section.
1. Make sure that the list contains a subnet with the specified `N_NAME`. In this example, it is `my_subnet`.
1. Click on the subnet name and view its settings. The subnet must have an address with a `/30` mask and no gateway.