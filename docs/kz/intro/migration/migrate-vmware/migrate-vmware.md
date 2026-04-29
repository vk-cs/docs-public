{include(/kz/_includes/_translated_by_ai.md)}

## 1. Көшіру мүмкіндігін тексеріңіз

VMware виртуалды машинасы келесі талаптарға сай болуы керек:

- ВМ операциялық жүйесінің архитектурасы 64 бит болуы керек;
- ағымдағы пайдаланушының әкімші құқықтары болуы керек;
- ВМ-ге кемінде бір диск қосылған болуы керек;
- ВМ BIOS эмуляциясын пайдалануы керек.

{note:info}

UEFI эмуляциясы бар ВМ-ді көшіру үшін [Hystax](../migrate-hystax-mr) пайдаланыңыз немесе деректерді BIOS эмуляциясы бар жаңа VMware виртуалды машинасына көшіріңіз.

{/note}

## 2. ВМ-ді көшіруге дайындаңыз

{tabs}

{tab(Linux)}

1. Жүйеде VirtIO драйверлерінің бар-жоғын [тексеріңіз](../check-virtio).
2. QEMU қонақ агентінің бар-жоғын тексеріңіз:

   ```console
   systemctl status qemu-guest-agent
   ```

   Егер QEMU қонақ агенті жоқ болса, оны [орнатыңыз](https://pve.proxmox.com/wiki/Qemu-guest-agent).
3. Cloud-Init утилитасының орнатылғанын тексеріңіз:

   ```console
   cloud-init --version
   ```

   Егер утилита жоқ болса, оны [орнатыңыз](https://www.ibm.com/docs/ru/powervc-cloud/2.0.0?topic=init-installing-configuring-cloud-linux).
4. Келесі мазмұндағы `/etc/netplan/50-cloud-init.yaml` файлын жасаңыз:

   ```yaml
   network:
       ethernets:
           ens3:
               dhcp4: true
       version: 2
   ```

5. Егер бұл БҚ орнатылған болса, [жойыңыз](https://docs.vmware.com/en/VMware-Tools/12.0.0/com.vmware.vsphere.vmwaretools.doc/GUID-6F7BE33A-3B8A-4C57-9C35-656CE05BE22D.html) VMware Tools.

{/tab}

{tab(Windows)}

1. Операциялық жүйе жаңартуларының орнатылғанын тексеріп, ВМ-ді қайта іске қосыңыз.
2. [Орнатыңыз](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md) VirtIO драйверлерін.
3. [Орнатыңыз](https://pve.proxmox.com/wiki/Qemu-guest-agent) QEMU Guest Agent.
4. Windows тізіліміне драйверлер туралы ақпаратты қосыңыз:

   1. [Жүктеп алыңыз](http://migration.platform9.com.s3-us-west-1.amazonaws.com/virtio.reg) Virtio Registry File.
   2. Файлды іске қосып, тізілімге өзгерістер енгізуге рұқсат беріңіз.

5. Егер бұл БҚ орнатылған болса, [жойыңыз](https://docs.vmware.com/en/VMware-Tools/12.0.0/com.vmware.vsphere.vmwaretools.doc/GUID-6F7BE33A-3B8A-4C57-9C35-656CE05BE22D.html) VMware Tools.

{/tab}

{/tabs}

## 3. Виртуалды машинаны экспорттаңыз

1. Виртуалды машинаны тоқтатыңыз.

   {note:info}

   Егер VMware Tools жойылғаннан кейін ВМ-ге SSH немесе RDP арқылы қосылу жұмыс істемесе, VMware консолін пайдаланыңыз.

   {/note}
2. Қажетті ВМ-ді таңдап, OVF форматына экспорттаңыз.

   `.ovf` және `.vmdk` кеңейтімдері бар файлдар жасалады — әрі қарай жұмыс істеу үшін `.vmdk` файлы қажет болады.

## 4. ВМ образын VK Cloud ішіне импорттаңыз

Үлкен файлдарды веб-интерфейс өңдеу кезінде туындауы мүмкін қателерді болдырмау үшін виртуалды машина образын жүктеу үшін OpenStack CLI пайдаланыңыз.

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu).
2. Диск файлын VMDK форматынан RAW форматына түрлендіріңіз:

   ```console
   qemu-img convert -f vmdk -O raw <путь_к_файлу.vmdk> <путь_к_файлу.raw>
   ```

3. Алынған `.raw` образ файлын бар VK Cloud жобасына жүктеңіз.

   {tabs}

   {tab(Linux)}

   ```console
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <путь_к_файлу.raw> <название образа>
   ```

   {/tab}

   {tab(Windows)}

   Windows образын импорттау кезінде диск шинасының түрін — IDE (параметр `hw_disk_bus`) көрсетіңіз:

   ```console
   openstack image create --progress --private --container-format bare --disk-format raw <путь_к_файлу.raw> --property store=s3 --property os_type=windows --property hw_disk_bus=ide --min-disk 40 <название образа>
   ```

   {/tab}

   {/tabs}

   Егер виртуалды машина резервтік көшіруді қолдауы керек болса, командаға параметрлерді қосыңыз:

   ```console
   --property hw_qemu_guest_agent=yes --property os_require_quiesce=yes
   ```

4. Образдың жобада пайда болғанын және `ACTIVE` мәртебесіне ие екенін тексеріңіз:

   ```console
   openstack image list
   ```

   VK Cloud [жеке кабинетінде](https://kz.cloud.vk.com/app/) образдар тізімі **Бұлттық есептеулер → Образдар** бөлімінде орналасқан.

## 5. Виртуалды машинаны жасаңыз

{tabs}

{tab(Linux)}

Импортталған образды [Linux ВМ жасау](/kz/computing/iaas/instructions/vm/vm-create) үшін пайдаланыңыз:

- ВМ-ді жеке кабинетте жасау кезінде тізімнен образды таңдаңыз;
- OpenStack CLI арқылы жасау кезінде тиісті командада образ ID-сін көрсетіңіз.

{/tab}

{tab(Windows)}

1. Импортталған образды [аралық Windows ВМ жасау](/kz/computing/iaas/instructions/vm/vm-create) үшін пайдаланыңыз.
2. Windows жүктелуіне VirtIO HBA драйверін қосыңыз.

   1. [Диск жасаңыз](/kz/computing/iaas/instructions/volumes/volumes-create) минималды өлшемде және оны ВМ-ге [қосыңыз](/kz/computing/iaas/instructions/volumes/volumes-connect#mount_disk).
   2. [Іске қосыңыз](/kz/computing/iaas/instructions/vm/vm-manage#start_stop_restart_vm) виртуалды машинаны.
   3. VirtIO орнатқышын `repair` режимінде іске қосыңыз.
   4. [Тоқтатыңыз](/kz/computing/iaas/instructions/vm/vm-manage#start_stop_restart_vm) виртуалды машинаны.
3. ВМ жүктеу дискінен [образ жасаңыз](/kz/computing/iaas/instructions/images/images-manage#obrazdy_zhasau).
4. Жаңа образдың диск шинасы түрін өзгертіңіз:

   ```console
   openstack image set --property hw_disk_bus=virtio <ID нового образа>
   ```

5. Жаңа образдан [мақсатты Windows ВМ жасаңыз](/kz/computing/iaas/instructions/vm/vm-create).
6. 1-қадамда жасалған аралық виртуалды машинаны және импортталған образды жойыңыз.

{/tab}

{/tabs}
