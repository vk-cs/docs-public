Upload the openrc file for the CLI configuration in the [“API keys”] panel (https://mcs.mail.ru/app/project/keys/) of your personal account.

<warn>

Each region has its own openrc file. You can learn more about regions in the article ["Regions"](/ru/additionals/start/user-account/regions).

</warn>

Then, follow the steps for the operating system on your computer:

<tabs>
<tablist>
<tab>Linux</tab>
<tab>Windows</tab>
</tablist>
<tabpanel>

#### Linux

Import the variables from the openrc file using the `source` command:

```bash
source file.sh
```

</tabpanel>
<tabpanel>

#### Windows

Open the openrc file downloaded from your personal account, find the variables in it that start with OS_, and import them into the command line using the `SET` command, following the example, substituting the value from the saved openrc file without quotes into each variable:

```bash
set OS_INTERFACE=public
set OS_AUTH_URL=https://infra.mail.ru:35357/v3/
set OS_USERNAME=email
set OS_PROJECT_ID=projectID
set OS_REGION_NAME=regionName
set OS_USER_DOMAIN_NAME=users
set OS_PASSWORD=your_password
set OS_IDENTITY_API_VERSION=3
```

For PowerShell, you should use the following variable values:

```bash
$env:OS_INTERFACE = "public"
$env:OS_AUTH_URL = "https://infra.mail.ru:35357/v3/"
$env:OS_USERNAME = "email"
$env:OS_PROJECT_ID = "projectID"
$env:OS_REGION_NAME = "regionName"
$env:OS_USER_DOMAIN_NAME = "users"
$env:OS_PASSWORD = "your_password"
$env:OS_IDENTITY_API_VERSION = "3"
```

<warn>

For the `OS_PASSWORD` variable, you need to enter a valid account password, it is not in the openrc file.

</warn>

</tabpanel>
</tabs>

#### Check CLI operation

Test the CLI with a command such as:

```bash
open stack flavor list
```

Upon successful authentication, a list of available instance configurations will be received:

```bash
+--------------------------------------+-------------------+-------+------+-----------+-------+-----------+
| ID                                   | Name              |   RAM | Disk | Ephemeral | VCPUs | Is Public |
+--------------------------------------+-------------------+-------+------+-----------+-------+-----------+
| 09dc3eb9-fc46-44b1-8928-acd42f723747 | Standard-4-12     | 12288 |    0 |         0 |     4 | True      |
| 12dc66d3-828c-4495-a5ca-ea1710c33174 | Advanced-12-24    | 24576 |    0 |         0 |    12 | True      |
| 19b38715-48cd-495b-9391-4c4e9d424518 | Basic-1-2-40      |  2048 |   40 |         0 |     1 | True      |
| 25ae869c-be29-4840-8e12-99e046d2dbd4 | Basic-1-2-20      |  2048 |   20 |         0 |     1 | True      |
| 283fa444-8d59-4e83-b6f4-90613c52a5a4 | Advanced-8-16-100 | 16384 |  100 |         0 |     8 | True      |
| 2c7c3f57-b5a4-4139-af7d-d5f05d70c703 | Standard-6-24     | 24576 |    0 |         0 |     6 | True      |
| 4e115a9b-0ac2-440d-a120-95cf130d63c7 | Standard-2-2      |  2048 |    0 |         0 |     2 | True      |
```
