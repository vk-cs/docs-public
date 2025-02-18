A desktop image is an image of a virtual machine on which, in addition to standard program components, software is installed to support VDI technology, as well as applications required for the end user's work. The Cloud Desktop service provides ready-to-use images for deploying desktops. You can also upload your own images and use them in the service.

You can prepare a custom desktop image in any available way, for example, using one of the [How-to guides](/en/computing/iaas/how-to-guides) of the Cloud Servers service.

## Requirements for a custom desktop image

The following software must be installed on the image:

- OS:

  - Windows of any version that supports connection to the Active Directory service.
  - Astra Linux «Orel» with graphical interface installed.

  To use other operating systems, please contact [technical support](mailto:support@mcs.mail.ru).

- [QEMU guest agent](https://pve.proxmox.com/wiki/Qemu-guest-agent).
- Software for cloud-based virtual machine initialization:

  - For Astra Linux — the [cloud-init](https://www.ibm.com/docs/ru/powervc-cloud/2.0.0?topic=init-installing-configuring-cloud-linux) package.
  - For Windows — the [Cloudbase-Init](https://cloudbase.it/cloudbase-init) application.

- Applications required for your users' work.

## Recommendations for preparing a custom desktop image

It is recommended to install on the image:

- (For Astra Linux) additional software for supporting the RDP protocol and the AD service. This will speed up the deployment of desktops in a pool.
- Components of the [Termidesk](https://termidesk.ru) software, which speeds up the connection of users to pool desktops.

    <tabs>
    <tablist>
    <tab>Windows</tab>
    <tab>Astra Linux</tab>
    </tablist>
    <tabpanel>

    To install Termidesk, run the commands in Windows PowerShell:

    ```shell
    Invoke-WebRequest -Uri https://repos.termidesk.ru/windows/windows_x86_64/termidesk-agent_4.3.2.24030_x64.msi -OutFile $env:TEMP\termidesk-agent.msi
    Start-Process msiexec -ArgumentList "/i `"$env:TEMP\termidesk-agent.msi`" /qn" -Wait -NoNewWindow
    Remove-Item $env:TEMP\termidesk-agent.msi
    ```

    </tabpanel>
    <tabpanel>

    To install Termidesk, run the commands in the terminal:

    ```shell
    apt update && apt install -y curl lsb-release spice-vdagent xserver-xorg-video-qxl xrdp
    echo "deb https://repos.termidesk.ru/astra $(lsb_release -cs) non-free" > /etc/apt/sources.list.d/termidesk.list
    curl https://repos.termidesk.ru/astra/GPG-KEY-PUBLIC | apt-key add -
    apt update && apt install -y 'python3-termidesk-agent=4.*' termidesk-pcsc-vscard termidesk-video-agent astra-ad-sssd-client
    ```

    </tabpanel>
    </tabs>

## What's next?

[Learn](/en/computing/cloud-desktops/how-to-guides/check-desktop-image) how to check your own desktop image for compatibility with the Cloud Desktop service.
