{includetag(openstack-intro)}
The OpenStack command line interface (OpenStack CLI) allows you to work with {var(cloud)} services through the console.
{/includetag}

{includetag(openstack-prepare)}
{tabs}

{tab(Ubuntu, Debian)}

1. Install Python 3 and virtualenv, if not already installed:

   ```console
   sudo apt update
   sudo apt install python3 virtualenv
   ```

1. Install pip3, if not already installed:

   ```console
   sudo apt install python3-pip
   ```

1. Create and activate a virtual environment for working with OpenStack:

   ```console
   virtualenv env
   source env/bin/activate
   ```

{/tab}

{tab(CentOS)}

{note:info}
This instruction is written for CentOS 8. For other OS versions, the commands may differ.
{/note}

1. Install Python 3 and virtualenv, if not already installed:

   ```console
   sudo dnf update -y
   sudo dnf install python3 -y
   sudo dnf install virtualenv -y
   ```

1. Install pip3, if not already installed:

   ```console
   sudo dnf install python3-pip -y
   ```

{/tab}

{tab(macOS)}

1. Install Python 3 and pip3, if not already installed:

   ```console
   brew install python3
   ```

1. Install virtualenv, if not already installed:

   ```console
   pip3 install virtualenv
   ```

{/tab}

{tab(Windows)}

{note:info}
This instruction is written using Python 3.10.11 and Microsoft C++ Build Tools 2022 as an example. For other program versions, component names and versions may differ.
{/note}

1. Download and install [Python 3](https://www.python.org/downloads/windows/).
1. Download and run [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/ru/visual-cpp-build-tools/).
1. Go to the **Individual components** tab, select the following in the list, and install them:

   - `C++ CMake tools for Windows`. Selecting this component will automatically select the `MSVC v143 — VS 2022 C++ x64/x86 Build Tools (Latest)` component.
   - `Windows 10 SDK`.

{/tab}

{/tabs}
{/includetag}

{includetag(openstack-install)}
{ifdef(public)}
1. Install OpenStack CLI:

   {tabs}

   {tab(Ubuntu, Debian, CentOS)}

   ```console
   pip3 install python-openstackclient
   ```

   {/tab}

   {tab(macOS)}

   ```console
   brew install openstackclient
   ```

   {/tab}

   {tab(Windows)}

   ```console
   pip install python-openstackclient
   ```

   {/tab}

   {/tabs}

1. Check that OpenStack CLI is installed:

   ```console
   openstack --version
   ```

   If OpenStack CLI is installed correctly, the version number will be returned in the response.
{/ifdef}

{ifdef(private,private-pdf,private-pg,private-pg-pdf)}
Install OpenStack CLI:

{note:warn}
We recommend using the `python3-openstackclient-6.6.0` package to connect.
{/note}

```console
pip install python-openstackclient
```
{/ifdef}

{ifdef(private-cert)}
To connect, you need to use the `python3-openstackclient` package from the {var(cloud)} distribution.

Install OpenStack CLI:

```console
$ dnf install python3-openstackclient
```
{/ifdef}
{/includetag}

{includetag(openstack-install-package)}
{ifdef(public)}
1. Install packages for working with individual OpenStack services:

   ```console
   pip3 install python-<SERVICE_NAME>client
   ```

   Service names:

   - `cinder` — block storage API and extensions;
   - `glance` — image API;
   - `heat` — orchestration API;
   - `neutron` — networking API;
   - `nova` — cloud computing API (VMs) and extensions;
   - `octavia` — load balancer API;
   - `sahara` — big data processing API.

2. Install the Manila CLI shared file storage client using the command:

   ```console
   pip3 install "python-manilaclient==4.9.1"
   ```

   {note:info}
   Recommended versions of the `python-manilaclient` package: 4.9.1 or higher. If you need an older version, use 4.4.2.

   When using other versions of `python-manilaclient`, the `openstack share network` commands may return an error.
   {/note}
{/ifdef}

{ifdef(private,private-pdf,private-pg,private-pg-pdf)}
Install packages for working with individual OpenStack services:

```console
pip install python-cinderclient
```

Recommended packages to use:

- `python3-keystoneclient-3.10.0`,
- `python3-barbicanclient-5.2.0`,
- `python3-novaclient-7.1.2`,
- `python3-cinderclient-1.11.1`,
- `python3-glanceclient-2.6.0`,
- `python3-neutronclient-6.1.1`,
- `python3-manilaclient-1.14.1`,
- `python3-octaviaclient-1.8.2`.
{/ifdef}

{ifdef(private-cert)}
Install the client for the component you need to work with through OpenStack CLI, for example:

```console
$ pip install python-cinderclient
```

Clients available for installation from the {var(cloud)} distribution:

- `python3-keystoneclient`.
- `python3-barbicanclient`.
- `python3-novaclient`.
- `python3-cinderclient`.
- `python3-glanceclient`.
- `python3-neutronclient`.
- `python3-octaviaclient`.
{/ifdef}
{/includetag}

{includetag(openstack-authorize)}
1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} your {var(cloud)} management console.
   {ifdef(public)}
1. Make sure that {linkto(../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=two-factor authentication is enabled]} and {linkto(../../api/rest-api/enable-api#rest-api-enable-activate)[text=API access is activated]}.

   Two-factor authentication must be enabled not only during the initial setup of OpenStack CLI, but throughout the entire period of its use.
   {/ifdef}
1. Select a project.
1. Click the username in the page header and select **Project settings**.
1. Go to the **API access** tab.
1. Click the **Download openrc v3** button. A file named `<PROJECT_NAME>-openrc.sh` will be downloaded.
   {ifdef(public)}
1. Specify the authentication credentials in environment variables.

   {tabs}

   {tab(Ubuntu, Debian, CentOS, macOS)}

    1. Run the script:

       ```console
       source <PROJECT_NAME>-openrc.sh
       ```

    1. Enter the project user password.

   {/tab}

   {tab(Windows (cmd))}

    1. Copy the parameter values without quotes from the `<PROJECT_NAME>-openrc.sh` file and run the commands:

       ```console
       set OS_INTERFACE=<OS_INTERFACE>
       set OS_IDENTITY_API_VERSION=<OS_IDENTITY_API_VERSION>
       set OS_PROJECT_ID=<OS_PROJECT_ID>
       set OS_REGION_NAME=<OS_REGION_NAME>
       set OS_USER_DOMAIN_NAME=<OS_USER_DOMAIN_NAME>
       set OS_USERNAME=<OS_USERNAME>
       set OS_AUTH_URL=<OS_AUTH_URL>
       ```

    1. Specify the password by running the command:

       ```console
       set OS_PASSWORD=<PASSWORD>
       ```

       Here `<PASSWORD>` is the project user password.

   {/tab}

   {tab(Windows (PowerShell))}

    1. Copy the data from the `<PROJECT_NAME>-openrc.sh` file and run the commands:

       ```console
       $env:OS_INTERFACE = "<OS_INTERFACE>"
       $env:OS_IDENTITY_API_VERSION = "<OS_IDENTITY_API_VERSION>"
       $env:OS_PROJECT_ID = "<OS_PROJECT_ID>"
       $env:OS_REGION_NAME = "<OS_REGION_NAME>"
       $env:OS_USER_DOMAIN_NAME = "<OS_USER_DOMAIN_NAME>"
       $env:OS_USERNAME = "<OS_USERNAME>"
       $env:OS_AUTH_URL = "<OS_AUTH_URL>"
       ```

    1. Specify the password by running the command:

       ```console
       $env:OS_PASSWORD = "<PASSWORD>"
       ```

       Here `<PASSWORD>` is the project user password.

   {/tab}

   {/tabs}
   {/ifdef}
   {ifndef(public)}
1. Load the connection parameters from the configuration file:

   ```console
   source <PROJECT_NAME>-openrc.sh
   ```

1. If necessary, enter the API token.

   Example of the API token request:
   
   ```console
   Please enter your API token for project 5e5653f0e0024f9a9da58aa7573997be
   ```
{/ifndef}
{/includetag}

{includetag(openstack-check)}
{ifdef(public)}
1. Check that the OpenStack client is present:

   ```console
   openstack --version
   ```

   If the OpenStack client is installed, its version will be shown in the console output.

2. Make sure the environment variables match the project by running the command:

   {tabs}

   {tab(Linux)}

   ```console
   env | grep OS_
   ```

   {/tab}

   {tab(Windows (cmd))}

   ```console
   set | findstr OS_
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   gci env: | where name -like 'OS_*'
   ```

   {/tab}

   {/tabs}

   The environment variables should contain authentication credentials matching the project.

3. Run a command that uses the OpenStack client, for example:

   ```console
   openstack project list
   ```

   The console output should display the list of available projects.
{/ifdef}
{ifndef(public)}
Run a command that uses the OpenStack client, for example:

```console
$ openstack flavor list
```

Example of the expected result:

```console
+--------------------------------------+----------------+-------+------+-----------+-------+-----------+
| ID                                   | Name           |   RAM | Disk | Ephemeral | VCPUs | Is Public |
+--------------------------------------+----------------+-------+------+-----------+-------+-----------+
| 2e275f1f-c032-4425-b0fb-dbf8583f62d3 | Standard-12-24 | 24576 |    0 |         0 |    12 | True      |
...
+--------------------------------------+----------------+-------+------+-----------+-------+-----------+
```

If you receive an error, contact the {var(cloud)} administrator.
{/ifndef}
{/includetag}

{includetag(openstack-example)}
- View the list of available flavors:

   ```console
   openstack flavor list
   ```

  {cut(Example of command execution result)}

   ```console
   +--------------------------------------+-------------------+-------+------+-----------+-------+-----------+
   | ID                                   | Name              |   RAM | Disk | Ephemeral | VCPUs | Is Public |
   +--------------------------------------+-------------------+-------+------+-----------+-------+-----------+
   | 00bbf595-aa67-437a-b566-92cbe8d00941 | STD2-16-32        | 32768 |    0 |         0 |    16 | True      |
   | 03c66e24-b386-4ceb-91f8-36e898d7fa72 | STD3-1-2          |  2048 |    0 |         0 |     1 | True      |
   | 04db9642-04fe-474b-89cb-c5a778be9ef3 | STD2-6-24         | 24576 |    0 |         0 |     6 | True      |
   | 0c5d5d41-1317-4331-ab58-9c9e04da50d6 | STD2-4-12         | 12288 |    0 |         0 |     4 | True      |
   | 17f80791-c0dd-4124-adaa-8c4a83fa0c51 | STD2-8-16         | 16384 |    0 |         0 |     8 | True      |
   | 19ad4a49-5b3d-43bc-a61d-b4b8b44c9842 | STD3-16-64        | 65536 |    0 |         0 |    16 | True      |
   | 19dc16ec-6d6c-4a34-af1a-ff5cbb056bed | STD3-6-12         | 12288 |    0 |         0 |     6 | True      |
   ```

  {/cut}

- Display information about a specific image:

   ```console
   openstack image show c6320138-035f-40d8-XXXX-e814edb2ce5f
   ```

  {cut(Example of command execution result (shortened output))}

    ```console
    +------------------+------------------------------------------------------+
    | Field            | Value                                                |
    +------------------+------------------------------------------------------+
    | checksum         | 896ea37e28d82a548cedf1e0aa92XXXX                     |
    | container_format | bare                                                 |
    | created_at       | 2023-03-29T14:06:44Z                                 |
    | disk_format      | raw                                                  |
    | file             | /v2/images/c6320138-035f-40d8-XXXX-e814edb2ce5f/file |
    | id               | c6320138-035f-40d8-XXXX-e814edb2ce5f                 |
    | min_disk         | 0                                                    |
    | min_ram          | 0                                                    |
    | name             | Alt-Linux-P9-Starter-Kit                             |
    | owner            | b5b7ffd4ef0547e5b222f44555dfXXXX                     |
    | properties       | base_image_ref='1a8aa332-d8ef-4c40-XXXX-cade8b59aea3'|
    | protected        | False                                                |
    | schema           | /v2/schemas/image                                    |
    | size             | 1653604352                                           |
    | status           | active                                               |
    | tags             |                                                      |
    | updated_at       | 2023-03-29T14:08:15Z                                 |
    | visibility       | private                                              |
    +------------------+------------------------------------------------------+
    ```

  {/cut}
  {ifdef(public)}
- Display the list of {linkto(../../../start/concepts/architecture#architecture-az)[text=availability zones]}:

  ```console
  openstack availability zone list
  ```

  {cut(Example of command execution result (shortened output))}

  ```console
  +-----------+-------------+
  | Zone Name | Zone Status |
  +-----------+-------------+
  | MS1       | available   |
  | GZ1       | available   |
  | ME1       | available   |
  | PA2       | available   |
  +-----------+-------------+
  ```

  {/cut}
  {/ifdef}
{/includetag}
