The OpenStack Command line interface (OpenStack CLI) allows you to work with VK Cloud platform services via the console. To use the OpenStack CLI, [install](#1-install-the-openstack-client) the OpenStack client and [authenticate](#3-complete-authentication).

## 1. Install the OpenStack client

<tabs>
<tablist>
<tab>Debian, Ubuntu</tab>
<tab>RHEL 8, CentOS 8, Fedora</tab>
<tab>CentOS 7</tab>
<tab>Windows</tab>
</tablist>
<tabpanel>

```bash
sudo apt update
sudo apt install python3-openstackclient 
```

</tabpanel>
<tabpanel>

```bash
dnf install https://www.rdoproject.org/repos/rdo-release.el8.rpm
dnf update
dnf install python3-openstackclient
```

</tabpanel>
<tabpanel>

```bash
yum install https://rdoproject.org/repos/rdo-release.rpm
yum upgrade
yum install python-openstackclient
```

</tabpanel>
<tabpanel>

The instruction is written using the example of Python 3.10.11 and Microsoft C++ Build Tools 2022. For other versions of programs, the names and versions of components may differ.

1. Download and install [Python3](https://www.python.org/downloads/windows/). It is recommended to use version 3.6 or 3.8.
2. Download and run [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/ru/visual-cpp-build-tools/).
3. Go to the tab **Additional components**, select from the list and install:

   - `C++ CMake tools for Windows`. When you select this component, the component will be automatically selected `MSVC v143 - VS 2022 C++ x64/x86 build tools (latest)`.
   - `Windows 10 SDK`.

1. Run the command:

   ```bash
   pip install -UI python-openstackclient
   ```

</tabpanel>
</tabs>

## 2. Install additional packages

If necessary, install packages to work with individual OpenStack services:

```bash
pip install python-<service name>client
```

Service names:

- `cinder` – block storage API and extensions;
- `glance` – images API;
- `heat` – orchestration API;
- `manila` – shared file systems API;
- `neutron` – network API;
- `nova` – cloud computing (VM) and extensions API;
- `octavia` — load balancer API;
- `sahara` – Big Data processing API;
- `trove` – databases API.

## 3. Complete authentication

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
1. Make sure that [two-factor authentication](/en/base/account/instructions/account-manage/security#vklyuchenie-2fa) and [API access](/en/base/account/instructions/account-manage/security#dostup-po-api) are enabled.
3. Select a project.
4. On the page **Project settings** [go to the tab](https://mcs.mail.ru/app/project/keys/) **API access**.
5. Click **Download openrc version 3**. A file `<project name>-openrc.sh` will be uploaded.
6. Specify the authentication credentials in the environment variables.

   <tabs>
   <tablist>
   <tab>Linux</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   1. Run the script execution:

      ```bash
      source <project name>-openrc.sh
      ```

   2. Enter the password of the project user.

   </tabpanel>
   <tabpanel>

   1. Copy the data from the file `<project name>-openrc.sh` and run commands:

      ```powershell
      set OS_PROJECT_ID=<OS_PROJECT_ID>
      set OS_REGION_NAME=<OS_REGION_NAME>
      set OS_USER_DOMAIN_NAME=<OS_USER_DOMAIN_NAME>
      set OS_USERNAME=<OS_USERNAME>
      set OS_AUTH_URL=<OS_AUTH_URL>
      ```

   2. Specify the password by running the command:

      ```powershell
      set OS_PASSWORD=<project user password>
      ```

   </tabpanel>
   </tabs>

## 4. Check if the OpenStack CLI is ready to work

1. Check the availability of the OpenStack client:

   ```bash
   openstack --version
   ```

   If the OpenStack client is installed, its version will be displayed in the console output.

2. Make sure that the environment variables match the project by running the command:

   <tabs>
   <tablist>
   <tab>Linux</tab>
   <tab>Windows</tab>
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
   <summary>Example of the result of executing the command</summary>

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

   </details>

- Output information about a separate image:

   ```bash
   openstack image show c6320138-035f-40d8-XXXX-e814edb2ce5f
   ```

   <details>
   <summary>Example of the result of executing the command (shortened output)</summary>

    ```
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
