# {heading(Собственные образы рабочих столов)[id=desktops-image]}

Образ рабочего стола — это образ виртуальной машины, на которой в дополнение к стандартным программным компонентам установлено ПО для поддержки технологии VDI, а также приложения, необходимые для работы конечного пользователя. Сервис Cloud Desktop предоставляет готовые к использованию образы для развертывания рабочих столов. Также вы можете загрузить и использовать в сервисе собственные образы.

Подготовить образ рабочего стола можно любым доступным способом, например, воспользовавшись одной из инструкций раздела {linkto(../../../../computing/iaas/how-to-guides#iaas-how-to-guides)[text=Практические руководства]} сервиса Cloud Servers.

## {heading(Требования к собственному образу)[id=desktops-image-custom-requirements]}

На образе должно быть установлено следующее ПО:

- Операционная система:

  {ifdef(public)}
  - Windows любой версии, которая поддерживает подключение к службе каталогов Active Directory.
  - Astra Linux «Орел» с установленным графическим интерфейсом.
  {/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}
  - Windows 10 или 11.
  - Windows Server 2019 или 2022.
  - РЕД ОС 7.3.
  - Astra Linux 1.7.
  {/ifdef}

  Чтобы использовать другие операционные системы, обратитесь {ifdef(public)}в [техническую поддержку](/ru/contacts){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}к администратору {var(cloud)}{/ifdef}.

- [Гостевой агент QEMU](https://pve.proxmox.com/wiki/Qemu-guest-agent).
- ПO для облачной инициализации виртуальной машины:

  - Для ОС Astra Linux — пакет [cloud-init](https://www.ibm.com/docs/ru/powervc-cloud/2.0.0?topic=init-installing-configuring-cloud-linux).
  - Для ОС Windows — сервисное приложение [Cloudbase-Init](https://cloudbase.it/cloudbase-init).

- Приложения, необходимые для работы пользователей приложения Cloud Desktop Client.

{ifdef(public)}
Чтобы ВМ, созданная из образа, могла использовать возможности {linkto(../../../../computing/gpu/concepts/about#gpu-about)[text=графических ускорителей]} (GPU), в образе должны быть:

- установлены драйверы GPU;
- настроен токен лицензирования, если используются {linkto(../../../../computing/gpu/concepts/vgpu#gpu-vgpu-licensing)[text=виртуальные графические ускорители]} (vGPU).

Подробнее в руководстве {linkto(../../../../computing/gpu/how-to-guides/vgpu-setup#vgpu-setup)[text=Настройка ВМ с vGPU]}.
{/ifdef}.

## {heading(Рекомендации по подготовке собственного образа)[id=desktops-image-recommend]}

Для ОС Astra Linux рекомендуется установить на образ дополнительное ПО для поддержки протокола RDP и службы каталогов AD. Это позволит ускорить развертывание рабочих столов в пуле.
