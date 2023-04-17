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

1. Установите [Python3](https://www.python.org/downloads/windows/).
1. Установите пакеты [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/ru/visual-cpp-build-tools/). При установке на вкладке **Отдельные компоненты** выберите из списка:

    - MSVC версии 142 — библиотеки С++ для VS 2019 для x64/x86 с устранением рисков Spectre (версия 14.29-16.11).
    - MSVC версии 142 — средства сборки С++ для VS 2019 для x64/x86 (версия 14.29-16.11).
    - Пакет SDK для Windows версии 10 или 11.

1. Выполните команду:

```bash
pip install -UI python-openstackclient
```

</tabpanel>
</tabs>
