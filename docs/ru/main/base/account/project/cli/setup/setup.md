### Установка openstack-client

Пакет python3-openstackclient включает в себя базовый набор команд для управления платформой.

Следующие инструкции помогут установить openstackclient:

<tabs>
<tablist>
<tab>Debian, Ubuntu</tab>
<tab>RHEL 8, CentOS 8, Fedora</tab>
<tab>CentOS 7</tab>
<tab>pip3</tab>
<tab>Windows</tab>
</tablist>
<tabpanel>

##### С помощью apt (Debian, Ubuntu):

```bash
apt update
apt install python3-openstackclient 
```

</tabpanel>
<tabpanel>

##### С помощью dnf (RHEL 8, CentOS 8,  Fedora):

```bash
dnf install https://www.rdoproject.org/repos/rdo-release.el8.rpm
dnf update
dnf install python3-openstackclient
```

</tabpanel>
<tabpanel>

##### С помощью yum (CentOS 7):

```bash
yum install https://rdoproject.org/repos/rdo-release.rpm
yum update
yum install python2-openstackclient
```

</tabpanel>
<tabpanel>

##### С помощью pip3:

Для установки с помощью pip3 в системе должны присутствовать пакеты: gcc, pyhton3-dev, python3-pip.

```bash
pip3 install -UI pbr testresources setuptools pytz wheel
pip3 install -UI python-openstackclient
```

</tabpanel>
<tabpanel>

#### Windows

Прежде чем начать, следует установить последнюю версию [Python3](https://www.python.org/downloads/window).

Далее, выполните следующие команды в командной строке:

```bash
pip3 install -UI python-openstackclient
```

</tabpanel>
</tabs>
