# {heading(Separating test and production environments)[id=dns-separate-test-prod]}

{include(/en/_includes/_translated_by_ai_en.md)}

Using DNS configuration, you can separate test and production environments, which improves infrastructure stability and simplifies management. The example below shows how to isolate the test environment into a separate DNS subzone:

- The production environment remains in the main DNS zone `example.com`.
- The test environment is hosted in the `test.example.com` subzone, which is delegated to the {var(cloud)} DNS servers.
- Resource records for each environment are created and managed only in their own zone.

## {heading(Preparatory steps)[id=dns-separate-test-prod-prep]}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. {linkto(../../../../networks/dns/instructions/publicdns/dns-zone#dns-dns-zone-add)[text=Create]} a DNS zone for the production environment if it has not been created yet.
1. Install the `dig` utility on your computer to verify DNS configuration:

   {tabs}

   {tab(Ubuntu, Debian)}

   ```console
   $ sudo apt update && sudo apt install dnsutils
   ```
   
   {/tab}
   
   {tab(Red Hat, CentOS, Fedora)}
   
   ```console
   $ sudo yum install bind-utils
   ```

   {/tab}

   {tab(macOS)}
   
   The `dig` utility is built into the system and available via Terminal.

   {/tab}

   {tab(Windows)}
   
   Use the built-in `nslookup` utility or install BIND Tools:

   ```console
   choco install bind-toolsonly
   ```

   {/tab}

   {/tabs}

   {note:info}
   You can use other utilities to verify DNS settings. The verification commands will differ in that case.
   {/note}

## {heading(1. Create a subzone)[id=dns-separate-test-prod-subzone]}

{linkto(../../../../networks/dns/instructions/publicdns/dns-zone#dns-dns-zone-subzone-add)[text=Create]} a subzone for the test environment, specifying the parameters:

- **Project**: the project hosting the DNS zone of the production environment.
- **DNS zone**: `test.example.com`.
- **Contact email**: the zone administrator's email.

Leave the other parameters at their defaults or configure them as needed.

## {heading(2. Delegate subzone management)[id=dns-separate-test-prod-delegate]}

{linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=Create]} NS records in the `example.com` DNS zone, specifying the parameters:

- **Record type**: `NS`.
- **Name**: `test`.
- **Value**: the addresses of the NS servers for the `example.com` zone, which can be {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-list)[text=viewed]} in the list of resource records.
  In this example: `ns1.mcs.mail.ru` — for the first record, `ns2.mcs.mail.ru` — for the second record.

Example of resource records in the `example.com` DNS zone after delegating subzone management:

```console
test   NS   ns1.mcs.mail.ru
test   NS   ns2.mcs.mail.ru
```

## {heading(3. Configure DNS for the test environment)[id=dns-separate-test-prod-test]}

1. {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=Create]} an A record in the `test.example.com` subzone, specifying the parameters:

   - **Record type**: `A`.
   - **Name**: `app`.
   - **IP address**: the IP address of the test server.
   - **TTL**: leave at the default or configure as needed.

1. Create a CNAME record in the `test.example.com` subzone, specifying the parameters:

   - **Record type**: `CNAME`.
   - **Name**: `api`.
   - **Value**: the domain of the test services.
   - **TTL**: leave at the default or configure as needed.

1. (Optional) Create {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=other resource records]} in the `test.example.com` subzone that will be needed for the test environment. For example, MX and TXT records can be used to define test mail servers and their settings.

Example of resource records in the `test.example.com` subzone after configuring DNS for the test environment:

```console
app   A   192.168.1.10
api   CNAME   app.test.example.com
```

The example uses a private IP address. If your server is accessible from the internet, use a public IP.

## {heading(4. Configure DNS for the production environment)[id=dns-separate-test-prod-prod]}

1. {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=Create]} an A record in the `example.com` DNS zone, specifying the parameters:

   - **Record type**: `A`.
   - **Name**: `app`.
   - **IP address**: the IP address of the production server.
   - **TTL**: leave at the default or configure as needed.

1. Create a CNAME record in the `example.com` DNS zone, specifying the parameters:

   - **Record type**: `CNAME`.
   - **Name**: `api`.
   - **Value**: the domain of the production services.
   - **TTL**: leave at the default or configure as needed.

1. (Optional) Create {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=other resource records]} in the `example.com` DNS zone that will be needed for the production environment. For example, MX and TXT records can be used to define mail servers and their settings.

1. {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-delete)[text=Delete]} the resource records for the test environment from the `example.com` zone, if any exist there.

Example of resource records in the `example.com` DNS zone after configuring DNS for the production environment:

```console
app   A   83.166.234.101
api   CNAME   app.example.com
```

## {heading(5. Verify the DNS settings)[id=dns-separate-test-prod-check]}

1. Verify name resolution for the test environment:

   {tabs}

   {tab(dig)}

   ```console
   $ dig app.test.example.com +short
   ```

   {/tab}

   {tab(nslookup)}

   ```console
   nslookup -type=A app.test.example.com
   ```

   {/tab}

   {/tabs}

   The response will return the IP address you configured in the `test.example.com` subzone. In this example: `192.168.1.10`.

1. Verify name resolution for the production environment:

   {tabs}

   {tab(dig)}

   ```console
   $ dig app.example.com +short
   ```

   {/tab}

   {tab(nslookup)}

   ```console
   nslookup -type=A app.example.com
   ```

   {/tab}

   {/tabs}

   The response will return the IP address you configured in the `example.com` DNS zone. In this example: `83.166.234.101`.

1. Verify the subzone delegation:

   {tabs}

   {tab(dig)}

   ```console
   $ dig NS test.example.com +short
   ```

   {/tab}

   {tab(nslookup)}

   ```console
   nslookup -type=ns test.example.com
   ```

   {/tab}

   {/tabs}

   The response will return the addresses of the NS servers for the `example.com` zone, which can be {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-list)[text=viewed]} in the list of resource records. In this example: `ns1.mcs.mail.ru` and `ns2.mcs.mail.ru`.

## {heading(Delete unused resources)[id=dns-separate-test-prod-delete]}

If the created resources are no longer needed, delete them:

1. {linkto(../../../../networks/dns/instructions/publicdns/dns-zone#dns-dns-zone-delete)[text=Delete]} the `test.example.com` subzone.
1. {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-delete)[text=Delete]} the unneeded NS records in the `example.com` DNS zone.