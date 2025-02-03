The OpenStack Command line interface (OpenStack CLI) allows you to work with VK Cloud platform services via the console. To use the OpenStack CLI, [install](#1-install-the-openstack-client) the OpenStack client and [authenticate](#3_complete_authentication).

## Before you start

<tabs>
<tablist>
<tab>Ubuntu, Debian</tab>
<tab>CentOS</tab>
<tab>macOS</tab>
<tab>Windows</tab>
</tablist>
<tabpanel>

1. Install Python 3, if you have not already done:

   ```bash
   sudo apt update
   sudo apt install python3
   ```

1. Install pip3, if you have not already done:

   ```bash
   sudo apt install python3-pip
   ```

</tabpanel>
<tabpanel>

<info>

The instructions are written for CentOS 8. For other versions of the OS, the commands may differ.

</info>

1. Install Python 3, if you have not already done:

   ```bash
   sudo dnf update -y
   sudo dnf install python3 -y
   ```

1. Install pip3, if you have not already done:

   ```bash
   sudo dnf install python3-pip -y
   ```

1. Install OpenStack SDK version 1.0.1:

   ```bash
   sudo pip3 install openstacksdk==1.0.1


</tabpanel>
<tabpanel>

Install Python 3 and pip3, if you have not already done:

```bash
brew install python3
```

</tabpanel>
<tabpanel>

<info>

The instructions are written using the example of Python 3.10.11 and Microsoft C++ Build Tools 2022. For other versions of programs, the names and versions of components may differ.

</info>

1. Download and install [Python3](https://www.python.org/downloads/windows/). It is recommended to use version 3.6 or 3.8.
2. Download and run [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/ru/visual-cpp-build-tools/).
3. Go to the **Additional components** tab, select from the list and install:

   - `C++ CMake tools for Windows`. When you select this component, the `MSVC v143 - VS 2022 C++ x64/x86 build tools (latest)` component will be automatically selected.
   - `Windows 10 SDK`.

</tabpanel>
</tabs>

## 1. Install the OpenStack client

1. Install Openstack CLI:

   <tabs>
   <tablist>
   <tab>Linux, maсOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>


   ```bash
   pip3 install python-openstackclient
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   pip install python-openstackclient
   ```

   </tabpanel>
   </tabs>

1. Check, if the OpenStack CLI is installed:

   ```bash
   openstack --version
   ```

   If the OpenStack CLI is installed correctly, the response will return the version number.

## 2. (Optional) Install additional packages

1. Install packages to work with specific OpenStack services:

   ```bash
   pip3 install python-<SERVICE_NAME>client
   ```

   Service names:

   - `cinder` — block storage API and extensions;
   - `glance` — images API;
   - `heat` — orchestration API;
   - `neutron` — network API;
   - `nova` — cloud computing (VM) and extensions API;
   - `octavia` — load balancer API;
   - `sahara` — Cloud Big Data processing API.

2. Install the Shared File System API client (the Manila CLI) using the command:

   ```bash
   pip install "python-manilaclient==4.9.1"
   ```

   <info>

   The recommended versions of `python-manilaclient` are 4.9.1 or higher. If you need an older version, use 4.4.2.

   Using other versions of `python-manilaclient` may cause the `openstack share network` commands to return an error.

   </info>

## 3. Complete authentication

1. Go to your VK Cloud [management console](https://msk.cloud.vk.com/app/en).
1. Make sure that [two-factor authentication](/en/tools-for-using-services/vk-cloud-account/service-management/account-manage/manage-2fa) and [API access](/en/tools-for-using-services/api/rest-api/enable-api) are enabled.
3. Select a project.
4. On the **Project settings** page, [go to](https://msk.cloud.vk.com/app/project/keys/) the **API access** tab.
5. Click **Download openrc version 3**. The `<PROJECT_NAME>-openrc.sh` file will be uploaded.
6. Specify the authentication credentials in the environment variables.

   <tabs>
   <tablist>
   <tab>Linux</tab>
   <tab>Windows (cmd)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   1. Run the script:

      ```bash
      source <PROJECT_NAME>-openrc.sh
      ```

   2. Enter the password of the project user.

   </tabpanel>
   <tabpanel>

   1. Copy the parameter values without quotes from the `<PROJECT_NAME>-openrc.sh` file and run the commands:

      ```powershell
      set OS_INTERFACE=<OS_INTERFACE>
      set OS_IDENTITY_API_VERSION=<OS_IDENTITY_API_VERSION>
      set OS_PROJECT_ID=<OS_PROJECT_ID>
      set OS_REGION_NAME=<OS_REGION_NAME>
      set OS_USER_DOMAIN_NAME=<OS_USER_DOMAIN_NAME>
      set OS_USERNAME=<OS_USERNAME>
      set OS_AUTH_URL=<OS_AUTH_URL>
      ```

   2. Specify the password by running the command:

      ```powershell
      set OS_PASSWORD=<PASSWORD>
      ```

      Here, `<PASSWORD>` is the project user password.

   </tabpanel>
   <tabpanel>

   1. Copy the data from the `<PROJECT_NAME>-openrc.sh` file and run the commands:

      ```powershell
      $env:OS_INTERFACE = "<OS_INTERFACE>"
      $env:OS_IDENTITY_API_VERSION = "<OS_IDENTITY_API_VERSION>"
      $env:OS_PROJECT_ID = "<OS_PROJECT_ID>"
      $env:OS_REGION_NAME = "<OS_REGION_NAME>"
      $env:OS_USER_DOMAIN_NAME = "<OS_USER_DOMAIN_NAME>"
      $env:OS_USERNAME = "<OS_USERNAME>"
      $env:OS_AUTH_URL = "<OS_AUTH_URL>"
      ```

   2. Specify the password by running the command:

      ```powershell
      $env:OS_PASSWORD = "<PASSWORD>"
      ```

      Here, `<PASSWORD>` is the project user password.

   </tabpanel>
   </tabs>

## 4. Check if OpenStack CLI is ready to work

1. Check the availability of the OpenStack client:

   ```bash
   openstack --version
   ```

   If the OpenStack client is installed, its version will be displayed in the console output.

2. Make sure that the environment variables match the project by running the command:

   <tabs>
   <tablist>
   <tab>Ubuntu, Debian, CentOS, macOS</tab>
   <tab>Windows (cmd)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   env | grep OS_
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   set | findstr OS_
   ```
   </tabpanel>
   <tabpanel>

   ```bash
   gci env: | where name -like 'OS_*'
   ```

   </tabpanel>
   </tabs>

   The environment variables must contain authentication credentials corresponding to the project.

3. Run the command that uses the OpenStack client. For example:

   ```bash
   openstack project list
   ```

   The console output should display a list of available projects.

## Examples of OpenStack CLI commands

- View the list of available flavors:

   ```bash
   openstack flavor list
   ```

   <details>
   <summary>Example of the command output</summary>

   ```bash
   +--------------------------------------+-------------------+-------+------+-----------+-------+-----------+
   | ID                                   | Name              |   RAM | Disk | Ephemeral | VCPUs | Is Public |
   +--------------------------------------+-------------------+-------+------+-----------+-------+-----------+
   | 00bbf595-aa67-XXXX-b566-92cbe8d00941 | STD2-16-32        | 32768 |    0 |         0 |    16 | True      |
   | 03c66e24-b386-XXXX-91f8-36e898d7fa72 | STD3-1-2          |  2048 |    0 |         0 |     1 | True      |
   | 04db9642-04fe-XXXX-89cb-c5a778be9ef3 | STD2-6-24         | 24576 |    0 |         0 |     6 | True      |
   | 0c5d5d41-1317-XXXX-ab58-9c9e04da50d6 | STD2-4-12         | 12288 |    0 |         0 |     4 | True      |
   | 17f80791-c0dd-XXXX-adaa-8c4a83fa0c51 | STD2-8-16         | 16384 |    0 |         0 |     8 | True      |
   | 19ad4a49-5b3d-XXXX-a61d-b4b8b44c9842 | STD3-16-64        | 65536 |    0 |         0 |    16 | True      |
   | 19dc16ec-6d6c-XXXX-af1a-ff5cbb056bed | STD3-6-12         | 12288 |    0 |         0 |     6 | True      |
   ```

   </details>

- Output information about a specific image:

   ```bash
   openstack image show c6320138-035f-40d8-XXXX-e814edb2ce5f
   ```

   <details>
   <summary>Example of the command output (shortened)</summary>

    ```bash
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

   </details>

- Get the list of [availability zones](/en/intro/start/concepts/architecture#az):

   ```bash
   openstack availability zone list
   ```

   <details>
   <summary>The example result of running the command</summary>

    ```bash
    +-----------+-------------+
    | Zone Name | Zone Status |
    +-----------+-------------+
    | MS1       | available   |
    | GZ1       | available   |
    | ME1       | available   |
    +-----------+-------------+
    ```

   </details>
