Upload the openrc file for the CLI configuration in the [“API keys”] panel (https://mcs.mail.ru/app/project/keys/) of your personal account.

<warn>

Each region has its own openrc file. You can learn more about regions in the article ["Regions"](https://mcs.mail.ru/docs/ru/additionals/start/user-account/regions).

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

The result will be a list of available instance configurations.

Or:

```bash
aws --version
```
