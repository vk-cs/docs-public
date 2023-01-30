### Установка openstack-client

Пакет `python3-openstackclient` включает в себя базовый набор команд для управления платформой.

Следующие инструкции помогут установить openstackclient:

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

Прежде чем начать, установите [Python3](https://www.python.org/downloads/window) и [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/ru/visual-cpp-build-tools/). После установки выполните команду в командной строке:

```bash
pip install -UI python-openstackclient
```

</tabpanel>
</tabs>
