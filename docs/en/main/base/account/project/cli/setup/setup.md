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

Before you start, you should install the [Python3](https://www.python.org/downloads/window) and [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/).

Next, run the command at the command prompt:

```bash
pip install -UI python-openstackclient
```

</tabpanel>
</tabs>
