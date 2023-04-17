### Install openstack-client

The python3-openstackclient package includes a basic set of commands for managing the platform.

The following instructions will help you install the openstackclient:

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
sudo apt install python-openstackclient
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

1. Install the [Python3](https://www.python.org/downloads/windows/).
1. Install the [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) packets. When installing on the tab with individual components choose packets from the list:

    - MSVC v142 — VS 2019 C++ x64/x86 Spectre-mitigated libs (v14.29-16.11).
    - MSVC v142 — VS 2019 C++ x64/x86 build tools (v14.29-16.11).
    - Windows 10 or 11 SDK.

1. Run the command:

```bash
pip install -UI python-openstackclient
```

</tabpanel>
</tabs>
