# {heading(DNS balancing)[id=dns-dnsbalancer]}

{include(/en/_includes/_translated_by_ai_en.md)}

{var(cloud)} allows you to create fault-tolerant applications that continue to operate even when the data center hosting the application infrastructure fails.

To ensure fault tolerance, the application infrastructure must be duplicated across several {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zones]} of a single region, and in case one of the zones becomes unavailable, load balancing must redirect requests to servers in neighboring zones. The minimum number of availability zones for such an architecture is two, the optimal number is three.

The DNSBalancer service balances requests between availability zones.

{cut(How the service works)}

The DNSBalancer service is installed on the VMs where the application is deployed, in all availability zones.

The service checks the availability of the public IP address (A record) of the VM it is installed on, as well as VMs from other availability zones.

If the service determines that the IP address of its own VM is unavailable, it removes the corresponding A record from the public DNS.

If the service determines that the IP address of a neighboring VM is unavailable:

1. The service creates an A record with the public address of its own VM (if the A record has not been created yet).
1. The service removes A records with unavailable public addresses.

Requests to the target service will be sent only to the available IP addresses from the list.

The check is performed cyclically at a specified time interval. If, during a subsequent check, the VM becomes available again, the A record corresponding to its IP address will be added back to the list.

{/cut}

This article shows how to install and configure the DNSBalancer service on three VMs in different availability zones. After the service is configured, requests to the application will be sent to one of the running VMs. If a VM is unavailable, no requests will be sent to it.

## {heading(Preparatory steps)[id=dns-dnsbalancer-prep]}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. Select or create three VMs with internet access in different {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zones]}.
1. Connect to the specified VMs via SSH.

## {heading(1. Install the service)[id=dns-dnsbalancer-download]}

1. Download the `dnsbalancer` file for your OS.

    {tabs}

    {tab(Ubuntu, Debian)}

    Download file: [dnsbalancer](./assets/dnsbalancer "download")

    {/tab}

    {tab(FreeBSD)}

    Download file: [dnsbalancer](./assets/dnsbalancer_freebsd "download")

    After downloading, rename the file to `dnsbalancer`.

    {/tab}

    {tab(RedOS)}

    Download file: [dnsbalancer](./assets/dnsbalancer_redos "download")

    After downloading, rename the file to `dnsbalancer`.

    {/tab}

    {/tabs}

1. Open a terminal session for each VM.
1. Place the downloaded file in the `/usr/local/bin/` directory on each VM.

## {heading(2. Create the service configuration file)[id=dns-dnsbalancer-config]}

1. Open a terminal session on one of the VMs.
1. Create the configuration file `/etc/dnsbalancer/config.yaml`.
1. In the file, specify the main parameters for configuring the service:

    ```yaml
    config:
        url: "https://mcs.mail.ru/public-dns/" 
        auth_url: "https://infra.mail.ru:3535/v3/" 
        login: "example@test" 
        password: "123456example" 
        project_id: "777e19938fe947666d5d3be5c00053d7" 
        zone: "example.com" 
        own_ip: "213.213.213.213" 
        is_self_maintenance: true 
        driver: "vkcloudns" 
        protocol: "tcp" 
        port: 80
        timeout: 180 
    ```

    Here:

    - `url`: Publicdns API endpoint.
    - `auth_url`: the URL for authorization, the **Auth URL** parameter on the **API access** tab.
    - `login`: the user login, the **Username** parameter on the **API access** tab.
    - `password`: the user password.
    - `project_id`: the project ID, the **Project ID** parameter on the **API access** tab.
    - `zone`: the public DNS zone to be monitored and for which A records will be created.
    - `own_ip`: the IPv4 address of the VM where the service instance resides.
    - `is_self_maintenance`:
      - `true` — the target IP address and the DNSBalancer service IP address are the same.
      - `false` — the target IP address and the DNSBalancer service IP address are different.
    - `driver`: the type of backend for the DNS server. Only `vkcloudriver` is supported.
    - `protocol`: the protocol for checking the IP address:
      - `icmp` — check via `ICMP Echo Request`, works the same way as the `ping` utility.
      - `tcp` — check by establishing a TCP connection to the target IP address.
    - `port`: the port to be checked.
    - `timeout`: the time in seconds between checks, the recommended value is from 180 to 360.

1. Repeat these steps for each VM.

## {heading(3. Create and start the daemon)[id=dns-dnsbalancer-daemon]}

1. Open a terminal session on one of the VMs.
1. Create the `dnsbalancer.service` file using the command:

   ```console
   sudo vim /etc/systemd/system/dnsbalancer.service
   ```  

1. Add the following lines to the created file:

    ```console
    [Unit]
    Description=Service for checking A-Records into Zone
    After=network.target

    [Service]
    Type=simple
    WorkingDirectory=/usr/local/bin
    ExecStart=/usr/local/bin/dnsbalancer
    Restart=always

    [Install]
    WantedBy=multi-user.target

1. Reload the `systemd` process using the command:

   ```console
   sudo systemctl daemon-reload
   ```

1. Start the daemon using the command:

   ```console
   sudo systemctl start dnsbalancer.service
   ```

1. Run the command so that the daemon starts automatically at system boot:

   ```console
   sudo systemctl enable dnsbalancer.service
   ```

1. Repeat these steps for each VM.

As a result, the service will publish A records of only the available VMs to the DNS zone, so all requests to the application will be sent only to the active server. The application will continue to operate even if one or two VMs go down.

## {heading(Delete unused resources)[id=dns-dnsbalancer-delete]}

If you no longer need the created VMs, {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=delete]} them.