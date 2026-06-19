# {heading(Hyper-V ВМ-ді {var(cloud)} ішіне көшіру)[id=migration-migrate-hyperv]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(1. Көшіру мүмкіндігін тексеріңіз)[id=migration-migrate-hyperv-check]}

Hyper-V виртуалды машинасы келесі талаптарға сай болуы керек:

- ВМ операциялық жүйесінің архитектурасы 64 бит болуы керек;
- ағымдағы пайдаланушының әкімші құқықтары болуы керек;
- ВМ-ге кемінде бір диск қосылған болуы керек;
- ВМ BIOS эмуляциясын пайдалануы керек.

{note:info}
UEFI эмуляциясы бар ВМ-ді көшіру үшін [Hystax](../migrate-hystax-mr) пайдаланыңыз немесе деректерді BIOS эмуляциясы бар жаңа Hyper-V виртуалды машинасына көшіріңіз.
{/note}

## {heading(2. ВМ-ді көшіруге дайындаңыз)[id=migration-migrate-hyperv-vm-prepare]}

{tabs}

{tab(Linux)}

1. Жүйеде VirtIO драйверлерінің бар-жоғын [тексеріңіз](../check-virtio).
1. QEMU Guest Agent бар-жоғын тексеріңіз:

   ```console
   systemctl status qemu-guest-agent
   ```

   Қажет болса, [орнатыңыз](https://pve.proxmox.com/wiki/Qemu-guest-agent) QEMU Guest Agent.

{/tab}

{tab(Windows)}

1. [Орнатыңыз](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md) VirtIO драйверлерін.
1. [Орнатыңыз](https://pve.proxmox.com/wiki/Qemu-guest-agent) QEMU Guest Agent.
1. Windows тізіліміне драйверлер туралы ақпаратты қосыңыз:

   1. [Жүктеп алыңыз](http://migration.platform9.com.s3-us-west-1.amazonaws.com/virtio.reg) Virtio Registry File.
   1. Файлды іске қосып, тізілімге өзгерістер енгізуге рұқсат беріңіз.

{/tab}

{/tabs}

## {heading(3. Виртуалды машинаны экспорттаңыз)[id=migration-migrate-hyperv-export]}

{tabs}

{tab(Hyper-V диспетчері)}

1. Виртуалды машинаны тоқтатыңыз.
1. Hyper-V диспетчерін іске қосыңыз.
1. Қажетті виртуалды машинаны тінтуірдің оң жақ батырмасымен шертіп, **Экспорт** тармағын таңдаңыз.
1. ВМ файлдарын орналастыратын орынды таңдап, **Экспорт** батырмасын басыңыз.

{/tab}

{tab(PowerShell)}

1. Виртуалды машинаны тоқтатыңыз.
1. PowerShell-ды әкімші атынан іске қосыңыз.
1. Келесі команданы орындаңыз:

   ```shell
   Export-VM -Name <имя виртуальной машины> -Path <путь для экспорта файлов>
   ```

{/tab}

{/tabs}

## {heading(4. ВМ образын {var(cloud)} ішіне импорттаңыз)[id=migration-migrate-hyperv-image-import]}

Үлкен файлдарды веб-интерфейс өңдеу кезінде туындауы мүмкін қателерді болдырмау үшін виртуалды машина образын жүктеу үшін OpenStack CLI пайдаланыңыз.

1. OpenStack клиенті {linkto(../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. Экспорт нәтижесінде алынған `.vhdx` файлын RAW форматына {linkto(../../../computing/iaas/how-to-guides/packer#iaas-packer-convert-image)[text=түрлендіріңіз]}.
1. Файлды {var(cloud)} ішіндегі бар жобаға жүктеңіз:

   ```console
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <путь_к_файлу.raw> <название_образа>
   ```

   Егер виртуалды машина резервтік көшіруді қолдауы керек болса, `.raw` файлын қонақ агентінің бар екенін көрсететін метадеректермен жүктеңіз:

   ```console
   openstack image create --private --container-format bare --disk-format raw --file <путь_к_файлу.raw> --property hw_qemu_guest_agent=yes --property store=s3 --property os_require_quiesce=yes <название_образа>
   ```

1. Образдың {var(cloud)} [жеке кабинетінде](https://kz.cloud.vk.com/app/) **Бұлттық есептеулер → Образдар** бөлімінде немесе CLI арқылы жүктелгенін тексеріңіз:

   ```console
   openstack image list
   ```

   Образ тізімде пайда болып, `ACTIVE` мәртебесіне ие болуы керек.

{note:warn}
Жүктелген образдан ВМ жасағанда, диск өлшемін образ өлшемінен 25%-ға үлкен етіп таңдаңыз, себебі ол сығылған түрде сақталады.
{/note}
