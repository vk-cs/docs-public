### Установка openstack-client

Пакет python3-openstackclient включает в себя базовый набор команд для управления платформой.

Следующие инструкции помогут установить openstackclient:

#### Linux

##### C помощью apt (Debian, Ubuntu):

```
apt update
apt install python3-openstackclient 
```

##### С помощью dnf (RHEL 8, CentOS 8,  Fedora):

```
dnf install [https://www.rdoproject.org/repos/rdo-release.el8.rpm](https://www.rdoproject.org/repos/rdo-release.el8.rpm) 
dnf update
dnf install python3-openstackclient
```

##### С помощью yum (CentOS 7):

```
yum install [https://rdoproject.org/repos/rdo-release.rpm](https://rdoproject.org/repos/rdo-release.rpm) 
yum update
yum install python2-openstackclient
```

##### C помощью pip3:

Для установки с помощью pip3 в системе должны присутствовать пакеты: gcc, pyhton3-dev, python3-pip.

```
pip3 install -UI pbr testresources setuptools pytz wheel
pip3 install -UI python-openstackclient
```

#### Windows

Прежде чем начать, следует установить последнюю версию [Python3](https://www.python.org/downloads/window) и [Microsoft Build Tools](https://visualstudio.microsoft.com/ru/visual-cpp-build-tools/). В установщике Visual Studio необходимо выбрать "Средства сборки C++" в разделе "Рабочие нагрузки", в компонентах установки отметить только пакет SDK для Windows 10 и MSVC - средства сборки C++.

Далее, выполните следующие команды в командной строке:

```
pip3 install -UI pbr setuptools pytz wheel
pip3 install -UI python-openstackclient
```
