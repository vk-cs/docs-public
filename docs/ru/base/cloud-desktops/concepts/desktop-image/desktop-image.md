Образ рабочего стола — это образ виртуальной машины, на которой в дополнение к стандартным программным компонентам установлено ПО для поддержки технологии VDI, а также приложения, необходимые для работы конечного пользователя. Сервис Cloud Desktop предоставляет готовые к использованию образы для развертывания рабочих столов. Также вы можете загрузить и использовать в сервисе собственные образы.

Подготовить образ рабочего стола можно любым доступным способом. Например, вы можете:

- [создать ВМ](/ru/base/iaas/service-management/vm/vm-create#sozdayte_vm) с нужной ОС, установить на нее необходимое ПО, а затем [создать образ](/ru/base/iaas/service-management/images/images-manage#sozdanie_obraza) из диска этой ВМ;
- воспользоваться инструкциями из разделов:

  - для ОС Windows — [Подготовка образа ОС Windows для создания ВМ](/ru/base/iaas/how-to-guides/win-image);
  - для ОС Astra Linux — [Создание образа с помощью Packer](/ru/base/iaas/how-to-guides/packer).

## Требования к собственному образу

На образе должно быть установлено следующее ПО:

- Операционная система:

  - Windows любой версии, которая поддерживает подключение к службе каталогов Active Directory.
  - Astra Linux «Орел» с установленным графическим интерфейсом.

  Чтобы использовать другие операционные системы, обратитесь в [техническую поддержку](/ru/contacts).

- [Гостевой агент QEMU](https://pve.proxmox.com/wiki/Qemu-guest-agent).
- ПO для облачной инициализации виртуальной машины:

  - Для ОС Astra Linux — пакет [cloud-init](https://www.ibm.com/docs/ru/powervc-cloud/2.0.0?topic=init-installing-configuring-cloud-linux).
  - Для ОС Windows — сервисное приложение [Cloudbase-Init](https://cloudbase.it/cloudbase-init/).

- Приложения, необходимые для работы ваших пользователей.

## Рекомендации по подготовке собственного образа

Рекомендуется установить на образ:

- (Для ОС Astra Linux) дополнительное ПО для поддержки протокола RDP и службы каталогов AD. Это позволит ускорить развертывание рабочих столов в пуле.
- Компоненты [программного продукта Termidesk](https://termidesk.ru/), который позволяет ускорить подключение к рабочим столам пула.

    <tabs>
    <tablist>
    <tab>Windows</tab>
    <tab>Astra Linux</tab>
    </tablist>
    <tabpanel>

    Для установки Termidesk выполните команды в приложении Windows PowerShell:

    ```shell
    Invoke-WebRequest -Uri https://repos.termidesk.ru/windows/windows_x86_64/termidesk-agent_4.3.2.24030_x64.msi -OutFile $env:TEMP\termidesk-agent.msi
    Start-Process msiexec -ArgumentList "/i `"$env:TEMP\termidesk-agent.msi`" /qn" -Wait -NoNewWindow
    Remove-Item $env:TEMP\termidesk-agent.msi
    ```

    </tabpanel>
    <tabpanel>

    Для установки Termidesk выполните команды в терминале:

    ```shell
    apt update && apt install -y curl lsb-release spice-vdagent xserver-xorg-video-qxl xrdp
    echo "deb https://repos.termidesk.ru/astra $(lsb_release -cs) non-free" > /etc/apt/sources.list.d/termidesk.list
    curl https://repos.termidesk.ru/astra/GPG-KEY-PUBLIC | apt-key add -
    apt update && apt install -y 'python3-termidesk-agent=4.*' termidesk-pcsc-vscard termidesk-video-agent astra-ad-sssd-client
    ```

    </tabpanel>
    </tabs>

## Что дальше?

[Узнайте](/ru/base/cloud-desktops/how-to-guides/check-desktop-image), как проверить собственный образ рабочего стола на совместимость с сервисом Cloud Desktop.
