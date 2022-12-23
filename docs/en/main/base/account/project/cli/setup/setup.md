### Install openstack-client

The python3-openstackclient package includes a basic set of commands for managing the platform.

The following instructions will help you install the openstackclient:

<tabs>
<tablist>
<tab>Debian, Ubuntu</tab>
<tab>RHEL 8, CentOS 8, Fedora</tab>
<tab>CentOS 7</tab>
<tab>pip3</tab>
<tab>Windows</tab>
</tablist>
<tabpanel>

##### Using apt (Debian, Ubuntu):

```bash
apt update
apt install python3-openstackclient
```

</tabpanel>
<tabpanel>

##### Using dnf (RHEL 8, CentOS 8, Fedora):

```bash
dnf install https://www.rdoproject.org/repos/rdo-release.el8.rpm
dnf update
dnf install python3-openstackclient
```

</tabpanel>
<tabpanel>

##### With yum (CentOS 7):

```bash
yum install https://rdoproject.org/repos/rdo-release.rpm
yum update
yum install python2-openstackclient
```

</tabpanel>
<tabpanel>

##### Using pip3:

To install using pip3, the following packages must be present on the system: gcc, pyhton3-dev, python3-pip.

```bash
pip3 install -UI pbr testresources setuptools pytz wheel
pip3 install -UI python-openstackclient
```

</tabpanel>
<tabpanel>

#### Windows

Before you start, you should install the latest version of [Python3](https://www.python.org/downloads/window).

Next, run the following commands at the command prompt:

```bash
pip3 install -UI python-openstackclient
```

</tabpanel>
</tabs>
