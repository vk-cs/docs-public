# {heading(VMware ВМ-ді {var(cloud)} ішіне көшіру)[id=migration-migrate-vmware]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(1. Көшіру мүмкіндігін тексеріңіз)[id=migration-migrate-vmware-check]}

VMware виртуалды машинасы келесі талаптарға сай болуы керек:

- ВМ операциялық жүйесінің архитектурасы 64 бит болуы керек;
- ағымдағы пайдаланушының әкімші құқықтары болуы керек;
- ВМ-ге кемінде бір диск қосылған болуы керек;
- ВМ BIOS эмуляциясын пайдалануы керек.

{note:info}
UEFI эмуляциясы бар ВМ-ді көшіру үшін [Hystax](../migrate-hystax-mr) пайдаланыңыз немесе деректерді BIOS эмуляциясы бар жаңа VMware виртуалды машинасына көшіріңіз.
{/note}

## {heading(2. ВМ-ді көшіруге дайындаңыз)[id=migration-migrate-vmware-vm-prepare]}

{tabs}

{tab(Linux)}

1. Жүйеде VirtIO драйверлерінің бар-жоғын [тексеріңіз](../check-virtio).
1. QEMU қонақ агентінің бар-жоғын тексеріңіз:

   ```console
   systemctl status qemu-guest-agent
   ```

   Егер QEMU қонақ агенті жоқ болса, оны [орнатыңыз](https://pve.proxmox.com/wiki/Qemu-guest-agent).
1. Cloud-Init утилитасының орнатылғанын тексеріңіз:

   ```console
   cloud-init --version
   ```

   Егер утилита жоқ болса, оны [орнатыңыз](https://www.ibm.com/docs/kz/powervc-cloud/2.0.0?topic=init-installing-configuring-cloud-linux).
1. Келесі мазмұндағы `/etc/netplan/50-cloud-init.yaml` файлын жасаңыз:

   ```yaml
   network:
       ethernets:
           ens3:
               dhcp4: true
       version: 2
   ```

1. Егер бұл БҚ орнатылған болса, [жойыңыз](https://docs.vmware.com/en/VMware-Tools/12.0.0/com.vmware.vsphere.vmwaretools.doc/GUID-6F7BE33A-3B8A-4C57-9C35-656CE05BE22D.html) VMware Tools.

{/tab}

{tab(Windows)}

1. Операциялық жүйе жаңартуларының орнатылғанын тексеріп, ВМ-ді қайта іске қосыңыз.
1. [Орнатыңыз](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md) VirtIO драйверлерін.
1. [Орнатыңыз](https://pve.proxmox.com/wiki/Qemu-guest-agent) QEMU Guest Agent.
1. Windows тізіліміне драйверлер туралы ақпаратты қосыңыз:

   1. [Жүктеп алыңыз](http://migration.platform9.com.s3-us-west-1.amazonaws.com/virtio.reg) Virtio Registry File.
   1. Файлды іске қосып, тізілімге өзгерістер енгізуге рұқсат беріңіз.

1. Егер бұл БҚ орнатылған болса, [жойыңыз](https://docs.vmware.com/en/VMware-Tools/12.0.0/com.vmware.vsphere.vmwaretools.doc/GUID-6F7BE33A-3B8A-4C57-9C35-656CE05BE22D.html) VMware Tools.

{/tab}

{/tabs}

## {heading(3. Виртуалды машинаны экспорттаңыз)[id=migration-migrate-vmware-export]}

1. Виртуалды машинаны тоқтатыңыз.

   {note:info}
   Егер VMware Tools жойылғаннан кейін ВМ-ге SSH немесе RDP арқылы қосылу жұмыс істемесе, VMware консолін пайдаланыңыз.
   {/note}

1. Қажетті ВМ-ді таңдап, OVF форматына экспорттаңыз.

   `.ovf` және `.vmdk` кеңейтімдері бар файлдар жасалады — әрі қарай жұмыс істеу үшін `.vmdk` файлы қажет болады.

## {heading(4. ВМ образын {var(cloud)} ішіне импорттаңыз)[id=migration-migrate-vmware-image-import]}

Үлкен файлдарды веб-интерфейс өңдеу кезінде туындауы мүмкін қателерді болдырмау үшін виртуалды машина образын жүктеу үшін OpenStack CLI пайдаланыңыз.

1. OpenStack клиенті {linkto(../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. Диск файлын VMDK форматынан RAW форматына түрлендіріңіз:

   ```console
   qemu-img convert -f vmdk -O raw <путь_к_файлу.vmdk> <путь_к_файлу.raw>
   ```

1. Алынған `.raw` образ файлын {var(cloud)} ішіндегі бар жобаға жүктеңіз.

   {tabs}

   {tab(Linux)}

   ```console
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <путь_к_файлу.raw> <название образа>
   ```

   {/tab}

   {tab(Windows)}

   Windows образын импорттау кезінде диск шинасының түрін — IDE (`hw_disk_bus` параметрі) көрсетіңіз:

   ```console
   openstack image create --progress --private --container-format bare --disk-format raw <путь_к_файлу.raw> --property store=s3 --property os_type=windows --property hw_disk_bus=ide --min-disk 40 <название образа>
   ```

   {/tab}

   {/tabs}

   Егер виртуалды машина резервтік көшіруді қолдауы керек болса, командаға келесі параметрлерді қосыңыз:

   ```console
   --property hw_qemu_guest_agent=yes --property os_require_quiesce=yes
   ```

1. Образдың жобада пайда болғанын және `ACTIVE` мәртебесіне ие екенін тексеріңіз:

   ```console
   openstack image list
   ```

   {var(cloud)} [жеке кабинетінде](https://kz.cloud.vk.com/app/) образдар тізімі **Бұлттық есептеулер → Образдар** бөлімінде орналасқан.

## {heading(5. Виртуалды машинаны жасаңыз)[id=migration-migrate-vmware-create-vm]}

{tabs}

{tab(Linux)}

Импортталған образды {linkto(../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Linux ВМ жасау]} үшін пайдаланыңыз:

- ВМ-ді жеке кабинетте жасау кезінде тізімнен образды таңдаңыз;
- OpenStack CLI арқылы жасау кезінде тиісті командада образ ID-сін көрсетіңіз.

{/tab}

{tab(Windows)}

1. Импортталған образды {linkto(../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=аралық Windows ВМ жасау]} үшін пайдаланыңыз.
1. Windows жүктелуіне VirtIO HBA драйверін қосыңыз.

   1. Минималды өлшемдегі {linkto(../../../computing/iaas/instructions/vm/vm-create#iaas-volumes-create)[text=диск жасаңыз]} және оны ВМ-ге {linkto(../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-mount-disk)[text=қосыңыз]}.
   1. Виртуалды машинаны {linkto(../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=іске қосыңыз]}.
   1. VirtIO орнатқышын `repair` режимінде іске қосыңыз.
   1. Виртуалды машинаны {linkto(../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=тоқтатыңыз]}.

1. ВМ-нің жүктеу дискінен {linkto(../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-create)[text=образ жасаңыз]}.
1. Жаңа образдың диск шинасы түрін өзгертіңіз:

   ```console
   openstack image set --property hw_disk_bus=virtio <ID нового образа>
   ```

1. Жаңа образдан {linkto(../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=мақсатты Windows ВМ жасаңыз]}.
1. 1-қадамда жасалған аралық виртуалды машинаны және импортталған образды жойыңыз.

{/tab}

{/tabs}
